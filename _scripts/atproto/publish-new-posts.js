#!/usr/bin/env node
/**
 * Publish any new posts that aren't in the tracking file
 * Called by GitHub Action after deploy
 * 
 * Usage:
 *   node publish-new-posts.js [--dry-run]
 */

import { AtpAgent } from '@atproto/api';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.join(__dirname, '../../_posts');
const DATA_DIR = path.join(__dirname, '../../_data');
const DOCUMENTS_FILE = path.join(DATA_DIR, 'atproto_documents.yml');

const SITE_URL = 'https://hypha.coop';

/**
 * Generate a timestamp-based record key
 */
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
        : new Date(dateStr + 'T00:00:00.000Z').toISOString();

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
    fs.writeFileSync(DOCUMENTS_FILE, lines.join('\n') + '\n');
}

async function main() {
    const dryRun = process.argv.includes('--dry-run');

    const handle = process.env.ATPROTO_HANDLE;
    const password = process.env.ATPROTO_PASSWORD;
    const pdsUrl = process.env.ATPROTO_PDS_URL || 'https://bsky.social';

    if (!dryRun && (!handle || !password)) {
        console.error('Error: ATPROTO_HANDLE and ATPROTO_PASSWORD required');
        process.exit(1);
    }

    // Find new posts
    const postFiles = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
    const docs = loadDocuments();

    const newPosts = [];
    for (const file of postFiles) {
        const post = parsePost(path.join(POSTS_DIR, file));
        if (post && !docs[post.path]) {
            newPosts.push({ file, post });
        }
    }

    if (newPosts.length === 0) {
        console.log('No new posts to publish');
        return;
    }

    console.log(`Found ${newPosts.length} new post(s) to publish`);

    if (dryRun) {
        console.log('\n--- DRY RUN ---');
        for (const { post } of newPosts) {
            console.log(`Would publish: ${post.title} (${post.path})`);
        }
        return;
    }

    const agent = new AtpAgent({ service: pdsUrl });
    await agent.login({ identifier: handle, password });
    console.log('Logged in');

    for (const { post } of newPosts) {
        console.log(`Publishing: ${post.title}`);

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

        const rkey = generateRecordKey();

        try {
            const response = await agent.api.com.atproto.repo.createRecord({
                repo: agent.session.did,
                collection: 'site.standard.document',
                rkey,
                record,
            });

            console.log(`  ✓ ${response.data.uri}`);
            docs[post.path] = rkey;
        } catch (err) {
            console.error(`  ✗ Failed: ${err.message}`);
        }
    }

    saveDocuments(docs);
    console.log('Done!');
}

main();
