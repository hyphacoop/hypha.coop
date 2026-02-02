#!/usr/bin/env node
/**
 * Publish a single site.standard.document record to AT Protocol
 * 
 * Usage:
 *   node publish-document.js <post-file.md> [--dry-run]
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
const DATA_DIR = path.join(__dirname, '../../_data');
const DOCUMENTS_FILE = path.join(DATA_DIR, 'atproto_documents.yml');
const PUBLICATION_FILE = path.join(DATA_DIR, 'atproto_publication.yml');

const SITE_URL = 'https://hypha.coop';

/**
 * Generate a timestamp-based record key
 */
function generateRecordKey() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `${timestamp.toString(36)}${random}`;
}

/**
 * Convert markdown to plain text
 */
function markdownToPlainText(markdown) {
    // Remove HTML tags that might be in the markdown
    let text = markdown.replace(/<[^>]*>/g, '');

    // Remove markdown formatting
    text = text
        .replace(/#{1,6}\s+/g, '')           // headers
        .replace(/\*\*([^*]+)\*\*/g, '$1')   // bold
        .replace(/\*([^*]+)\*/g, '$1')       // italic
        .replace(/__([^_]+)__/g, '$1')       // bold
        .replace(/_([^_]+)_/g, '$1')         // italic
        .replace(/`{3}[\s\S]*?`{3}/g, '')    // code blocks
        .replace(/`([^`]+)`/g, '$1')         // inline code
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links
        .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // images
        .replace(/^>\s+/gm, '')              // blockquotes
        .replace(/^[-*+]\s+/gm, '')          // unordered lists
        .replace(/^\d+\.\s+/gm, '')          // ordered lists
        .replace(/---+/g, '')                // horizontal rules
        .replace(/\n{3,}/g, '\n\n')          // multiple newlines
        .trim();

    return text;
}

/**
 * Parse Jekyll post file
 */
function parsePost(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content: body } = matter(content);

    // Extract filename for slug
    const filename = path.basename(filePath, '.md');
    const match = filename.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);

    if (!match) {
        throw new Error(`Invalid post filename: ${filename}`);
    }

    const [, dateStr, slug] = match;
    const postPath = `/dripline/${slug}/`;

    // Parse date
    const publishedAt = frontmatter.date
        ? new Date(frontmatter.date).toISOString()
        : new Date(dateStr + 'T00:00:00.000Z').toISOString();

    // Get plain text content (truncate to reasonable size)
    const textContent = markdownToPlainText(body).slice(0, 10000);

    return {
        path: postPath,
        title: frontmatter.title || slug.replace(/-/g, ' '),
        description: frontmatter.excerpt || textContent.slice(0, 300),
        publishedAt,
        textContent,
        // Could extract tags from content or front matter if present
        tags: frontmatter.tags || [],
    };
}

/**
 * Load existing documents tracking file
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
 * Save documents tracking file
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
    const postFile = args.find(a => !a.startsWith('--'));

    if (!postFile) {
        console.error('Usage: publish-document.js <post-file.md> [--dry-run]');
        process.exit(1);
    }

    const handle = process.env.ATPROTO_HANDLE;
    const password = process.env.ATPROTO_PASSWORD;
    const pdsUrl = process.env.ATPROTO_PDS_URL || 'https://bsky.social';

    if (!dryRun && (!handle || !password)) {
        console.error('Error: ATPROTO_HANDLE and ATPROTO_PASSWORD environment variables are required');
        process.exit(1);
    }

    // Parse the post
    const postPath = path.resolve(postFile);
    console.log(`Parsing: ${postPath}`);

    const post = parsePost(postPath);
    console.log(`\nPost: ${post.title}`);
    console.log(`Path: ${post.path}`);
    console.log(`Published: ${post.publishedAt}`);

    // Check if already published
    const docs = loadDocuments();
    if (docs[post.path]) {
        console.log(`\nAlready published with rkey: ${docs[post.path]}`);
        console.log('Skipping...');
        return;
    }

    // Build the record
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

    if (dryRun) {
        console.log('\n--- DRY RUN MODE ---\n');
        console.log('Would create record:');
        console.log(JSON.stringify(record, null, 2));
        return;
    }

    // Create agent and login
    const agent = new AtpAgent({ service: pdsUrl });

    try {
        await agent.login({ identifier: handle, password });
        console.log('\nLogged in successfully');
    } catch (err) {
        console.error('Login failed:', err.message);
        process.exit(1);
    }

    // Generate a record key
    const rkey = generateRecordKey();

    try {
        const response = await agent.api.com.atproto.repo.createRecord({
            repo: agent.session.did,
            collection: 'site.standard.document',
            rkey,
            record,
        });

        console.log('\nDocument record created successfully!');
        console.log('URI:', response.data.uri);
        console.log('CID:', response.data.cid);

        // Update tracking file
        docs[post.path] = rkey;
        saveDocuments(docs);
        console.log(`\nDocument tracking updated in ${DOCUMENTS_FILE}`);

    } catch (err) {
        console.error('Failed to create record:', err.message);
        if (err.error) console.error('Error details:', err.error);
        process.exit(1);
    }
}

main();
