#!/usr/bin/env node
/**
 * Backfill all existing posts to AT Protocol
 * 
 * Usage:
 *   node backfill-posts.js [--dry-run] [--limit N]
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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.join(__dirname, '../../_posts');
const DATA_DIR = path.join(__dirname, '../../_data');
const DOCUMENTS_FILE = path.join(DATA_DIR, 'atproto_documents.yml');

const SITE_URL = 'https://hypha.coop';

// Rate limiting: wait between requests
const DELAY_MS = 500;

/**
 * Generate a timestamp-based record key
 */
function generateRecordKey() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `${timestamp.toString(36)}${random}`;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Convert markdown to plain text
 */
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

/**
 * Parse Jekyll post file
 */
function parsePost(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content: body } = matter(content);

    const filename = path.basename(filePath, '.md');
    const match = filename.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);

    if (!match) {
        throw new Error(`Invalid post filename: ${filename}`);
    }

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

/**
 * Load existing documents tracking
 */
function loadDocuments() {
    if (!fs.existsSync(DOCUMENTS_FILE)) {
        return {};
    }

    const content = fs.readFileSync(DOCUMENTS_FILE, 'utf8');
    const docs = {};

    for (const line of content.split('\n')) {
        if (line.startsWith('#') || !line.trim()) continue;
        const match = line.match(/^"([^"]+)":\s*"([^"]+)"$/);
        if (match) {
            docs[match[1]] = match[2];
        }
    }

    return docs;
}

/**
 * Save documents tracking
 */
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
    const args = process.argv.slice(2);
    const dryRun = args.includes('--dry-run');
    const limitIdx = args.indexOf('--limit');
    const limitArg = limitIdx >= 0 ? args[limitIdx + 1] : null;
    let limit = Infinity;
    if (limitArg != null) {
        const parsed = parseInt(limitArg, 10);
        if (isNaN(parsed) || parsed < 1) {
            console.error('Error: --limit requires a positive number (e.g. --limit 5)');
            process.exit(1);
        }
        limit = parsed;
    }

    const handle = process.env.ATPROTO_HANDLE;
    const password = process.env.ATPROTO_PASSWORD;
    const pdsUrl = process.env.ATPROTO_PDS_URL || 'https://bsky.social';

    if (!dryRun && (!handle || !password)) {
        console.error('Error: ATPROTO_HANDLE and ATPROTO_PASSWORD required');
        process.exit(1);
    }

    // Get all posts
    const postFiles = fs.readdirSync(POSTS_DIR)
        .filter(f => f.endsWith('.md'))
        .sort();

    console.log(`Found ${postFiles.length} posts`);

    // Load existing tracking
    const docs = loadDocuments();
    const alreadyPublished = Object.keys(docs).length;
    console.log(`Already published: ${alreadyPublished}`);

    // Filter to unpublished
    const toPublish = [];
    for (const file of postFiles) {
        try {
            const post = parsePost(path.join(POSTS_DIR, file));
            if (!docs[post.path]) {
                toPublish.push({ file, post });
            }
        } catch (err) {
            console.warn(`Skipping ${file}: ${err.message}`);
        }
    }

    console.log(`To publish: ${toPublish.length}`);

    if (toPublish.length === 0) {
        console.log('Nothing to do!');
        return;
    }

    const batch = toPublish.slice(0, limit);
    console.log(`Publishing ${batch.length} posts...`);

    if (dryRun) {
        console.log('\n--- DRY RUN MODE ---\n');
        for (const { file, post } of batch) {
            console.log(`Would publish: ${post.title}`);
            console.log(`  Path: ${post.path}`);
            console.log(`  Published: ${post.publishedAt}`);
            console.log();
        }
        return;
    }

    // Login
    const agent = new AtpAgent({ service: pdsUrl });

    try {
        await agent.login({ identifier: handle, password });
        console.log('Logged in successfully\n');
    } catch (err) {
        console.error('Login failed:', err.message);
        process.exit(1);
    }

    // Publish each post
    let published = 0;
    let failed = 0;

    for (const { file, post } of batch) {
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

        if (post.tags && post.tags.length > 0) {
            record.tags = post.tags.slice(0, 100);
        }

        const rkey = generateRecordKey();

        try {
            const response = await agent.api.com.atproto.repo.createRecord({
                repo: agent.session.did,
                collection: 'site.standard.document',
                rkey,
                record,
            });

            console.log(`  ✓ Created: ${response.data.uri}`);
            docs[post.path] = rkey;
            published++;

            // Save after each successful publish
            saveDocuments(docs);

        } catch (err) {
            console.error(`  ✗ Failed: ${err.message}`);
            failed++;
        }

        // Rate limit
        await sleep(DELAY_MS);
    }

    console.log(`\nDone! Published: ${published}, Failed: ${failed}`);
}

main();
