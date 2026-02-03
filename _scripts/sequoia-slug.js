#!/usr/bin/env node
/**
 * Sequoia Slug
 * 
 * Add slug to post frontmatter from filename (strip YYYY-MM-DD-), matching Jekyll's default.
 * Run before `sequoia publish` so paths match Jekyll URLs exactly.
 * 
 * Usage:
 *   node sequoia-slug.js
 * 
 * Environment variables:
 *   POSTS_DIR - Directory to search for posts
 * 
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.join(__dirname, '../_posts');

const JEKYLL_DATE_RE = /^(\d{4}-\d{2}-\d{2})-(.+)$/;

for (const name of fs.readdirSync(POSTS_DIR)) {
  if (!name.endsWith('.md') && !name.endsWith('.mdx')) continue;
  const base = name.replace(/\.mdx?$/, '');
  const match = base.match(JEKYLL_DATE_RE);
  if (!match) continue;
  const slug = match[2];

  const filePath = path.join(POSTS_DIR, name);
  let content = fs.readFileSync(filePath, 'utf8');
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) continue;
  let fm = fmMatch[1];

  // Set or overwrite slug to match filename (Jekyll default)
  if (/^slug:\s/m.test(fm)) {
    fm = fm.replace(/^slug:\s*.+$/m, `slug: ${slug}`);
  } else {
    fm = `slug: ${slug}\n${fm}`;
  }
  content = content.replace(/^---\n[\s\S]*?\n---/, `---\n${fm}\n---`);
  fs.writeFileSync(filePath, content);
  console.log(`slug: ${slug} -> ${name}`);
}
