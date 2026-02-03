#!/usr/bin/env node
/**
 * Add slug to post frontmatter, simulating Jekyll's :title slugify.
 * Run before `sequoia publish` so paths match Jekyll URLs exactly.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.join(__dirname, '../_posts');

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getFrontmatterValue(fm, key) {
  const match = fm.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  return match ? match[1].replace(/^["']|["']$/g, '').trim() : null;
}

for (const name of fs.readdirSync(POSTS_DIR)) {
  if (!name.endsWith('.md') && !name.endsWith('.mdx')) continue;
  const filePath = path.join(POSTS_DIR, name);
  let content = fs.readFileSync(filePath, 'utf8');
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) continue;
  const fm = fmMatch[1];
  if (/^slug:\s/m.test(fm)) continue;
  const title = getFrontmatterValue(fm, 'title');
  if (!title) continue;
  const slug = slugify(title);
  const newFm = `slug: ${slug}\n${fm}`;
  content = content.replace(/^---\n[\s\S]*?\n---/, `---\n${newFm}\n---`);
  fs.writeFileSync(filePath, content);
  console.log(`Added slug: ${slug} -> ${name}`);
}
