#!/usr/bin/env node
/**
 * Sync AT Protocol document records with local posts
 *
 * Usage:
 *   node sync-posts.js [--dry-run] [--skip-delete] [--commit]
 *
 * Environment variables:
 *   ATPROTO_HANDLE   - Handle for the account
 *   ATPROTO_PASSWORD - App password for authentication
 *   ATPROTO_PDS_URL  - PDS URL (optional, defaults to https://bsky.social)
 */

import { AtpAgent } from '@atproto/api';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, '../..');
const POSTS_DIR = path.join(REPO_ROOT, '_posts');
const DATA_DIR = path.join(REPO_ROOT, '_data');
const DOCUMENTS_FILE = path.join(DATA_DIR, 'atproto_documents.yml');

const SITE_URL = 'https://hypha.coop';

function generateRecordKey() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp.toString(36)}${random}`;
}

function markdownToPlainText(markdown) {
  let text = markdown.replace(/<[^>]*>/g, '');
  text = text
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/`{3}[\s\S]*?`{3}/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
    .replace(/^>\s+/gm, '')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/---+/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return text;
}

function parsePost(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter, content: body } = matter(content);

  const filename = path.basename(filePath, '.md');
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
  if (!match) return null;

  const [, dateStr, slug] = match;
  const postPath = `/dripline/${slug}/`;

  const publishedAt = frontmatter.date
    ? new Date(frontmatter.date).toISOString()
    : new Date(`${dateStr}T00:00:00.000Z`).toISOString();

  const textContent = markdownToPlainText(body).slice(0, 10000);

  return {
    path: postPath,
    title: frontmatter.title || slug.replace(/-/g, ' '),
    description: frontmatter.excerpt || textContent.slice(0, 300),
    publishedAt,
    textContent,
    tags: frontmatter.tags || [],
  };
}

function buildRecord(post) {
  const record = {
    $type: 'site.standard.document',
    site: SITE_URL,
    path: post.path,
    title: post.title,
    description: post.description.slice(0, 300),
    publishedAt: post.publishedAt,
    textContent: post.textContent,
  };

  if (post.tags?.length > 0) record.tags = post.tags.slice(0, 100);
  return record;
}

function normalizeRecord(record) {
  return {
    $type: record.$type || 'site.standard.document',
    site: record.site,
    path: record.path,
    title: record.title,
    description: record.description,
    publishedAt: record.publishedAt,
    textContent: record.textContent,
    tags: record.tags || [],
  };
}

function recordsEqual(a, b) {
  return JSON.stringify(normalizeRecord(a)) === JSON.stringify(normalizeRecord(b));
}

function loadDocuments() {
  if (!fs.existsSync(DOCUMENTS_FILE)) return {};

  const content = fs.readFileSync(DOCUMENTS_FILE, 'utf8');
  const docs = {};

  for (const line of content.split('\n')) {
    if (line.startsWith('#') || !line.trim()) continue;
    const match = line.match(/^"([^"]+)":\s*"([^"]+)"$/);
    if (match) docs[match[1]] = match[2];
  }

  return docs;
}

function saveDocuments(docs) {
  const lines = [
    '# AT Protocol Document Records',
    `# Updated: ${new Date().toISOString()}`,
    '# Maps post paths to record keys (rkeys)',
    '',
  ];

  for (const [postPath, rkey] of Object.entries(docs).sort()) {
    lines.push(`"${postPath}": "${rkey}"`);
  }

  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DOCUMENTS_FILE, `${lines.join('\n')}\n`);
}

function commitDocumentsFile() {
  const commitMessage = process.env.ATPROTO_COMMIT_MESSAGE || 'Update AT Protocol document records';
  const relativePath = path.relative(REPO_ROOT, DOCUMENTS_FILE);
  execFileSync('git', ['add', relativePath], { stdio: 'inherit', cwd: REPO_ROOT });
  execFileSync('git', ['commit', '-m', commitMessage], { stdio: 'inherit', cwd: REPO_ROOT });
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const skipDelete = args.includes('--skip-delete');
  const commit = args.includes('--commit');

  const handle = process.env.ATPROTO_HANDLE;
  const password = process.env.ATPROTO_PASSWORD;
  const pdsUrl = process.env.ATPROTO_PDS_URL || 'https://bsky.social';

  const allowRemote = !dryRun || (handle && password);
  if (!allowRemote) {
    console.log('Dry run without auth; update detection will be skipped.');
  }
  if (!dryRun && (!handle || !password)) {
    console.error('Error: ATPROTO_HANDLE and ATPROTO_PASSWORD required');
    process.exit(1);
  }

  const postFiles = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  const posts = new Map();

  for (const file of postFiles) {
    const post = parsePost(path.join(POSTS_DIR, file));
    if (post) posts.set(post.path, post);
  }

  const docs = loadDocuments();
  let mappingChanged = false;
  let skippedUpdates = 0;

  let agent = null;
  if (allowRemote) {
    agent = new AtpAgent({ service: pdsUrl });
    await agent.login({ identifier: handle, password });
    console.log('Logged in');
  }

  for (const [postPath, post] of posts.entries()) {
    const record = buildRecord(post);
    const existingRkey = docs[postPath];

    if (!existingRkey) {
      if (dryRun) {
        console.log(`Would create: ${post.title} (${postPath})`);
        continue;
      }

      const rkey = generateRecordKey();
      const response = await agent.api.com.atproto.repo.createRecord({
        repo: agent.session.did,
        collection: 'site.standard.document',
        rkey,
        record,
      });

      console.log(`Created: ${response.data.uri}`);
      docs[postPath] = rkey;
      mappingChanged = true;
      continue;
    }

    if (!allowRemote) {
      skippedUpdates += 1;
      continue;
    }

    let remoteRecord = null;
    try {
      const response = await agent.api.com.atproto.repo.getRecord({
        repo: agent.session.did,
        collection: 'site.standard.document',
        rkey: existingRkey,
      });
      remoteRecord = response.data.value;
    } catch (err) {
      console.warn(`Could not fetch ${postPath}: ${err.message}`);
    }

    if (!remoteRecord) {
      if (dryRun) {
        console.log(`Would recreate missing record: ${post.title} (${postPath})`);
        continue;
      }

      await agent.api.com.atproto.repo.putRecord({
        repo: agent.session.did,
        collection: 'site.standard.document',
        rkey: existingRkey,
        record,
      });
      console.log(`Recreated: ${postPath}`);
      continue;
    }

    if (!recordsEqual(remoteRecord, record)) {
      if (dryRun) {
        console.log(`Would update: ${post.title} (${postPath})`);
        continue;
      }

      await agent.api.com.atproto.repo.putRecord({
        repo: agent.session.did,
        collection: 'site.standard.document',
        rkey: existingRkey,
        record,
      });
      console.log(`Updated: ${postPath}`);
    }
  }

  if (!skipDelete) {
    for (const [postPath, rkey] of Object.entries(docs)) {
      if (posts.has(postPath)) continue;

      if (dryRun) {
        console.log(`Would delete: ${postPath}`);
        continue;
      }

      await agent.api.com.atproto.repo.deleteRecord({
        repo: agent.session.did,
        collection: 'site.standard.document',
        rkey,
      });
      console.log(`Deleted: ${postPath}`);
      delete docs[postPath];
      mappingChanged = true;
    }
  }

  if (skippedUpdates > 0) {
    console.log(`Skipped update checks for ${skippedUpdates} post(s).`);
  }

  if (!dryRun && mappingChanged) {
    saveDocuments(docs);
    console.log(`Updated ${DOCUMENTS_FILE}`);

    if (commit) {
      commitDocumentsFile();
    }
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
