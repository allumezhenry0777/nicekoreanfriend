/**
 * Checks every internal link in MDX content and the Start Here checklist
 * against the set of routes the site actually generates.
 * Run: npm run check-links
 */
import fs from "node:fs";
import path from "node:path";
import { getAllArticles, getAllAuthors, getAllCategories } from "../src/lib/content";

const STATIC_ROUTES = new Set([
  "/",
  "/start-here",
  "/search",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/disclaimer",
  "/editorial-policy",
  "/feed.xml",
  "/ads.txt",
]);

const routes = new Set(STATIC_ROUTES);
for (const c of getAllCategories()) routes.add(`/${c.slug}`);
for (const a of getAllArticles()) routes.add(`/${a.frontmatter.category}/${a.slug}`);
for (const a of getAllAuthors()) routes.add(`/authors/${a.slug}`);

const LINK_RE = /\[[^\]]*\]\((\/[^)\s#?]*)[^)]*\)|href=["'](\/[^"'#?]*)["']/g;

type Broken = { file: string; link: string };
const broken: Broken[] = [];
let checked = 0;

function checkSource(file: string, text: string) {
  for (const m of text.matchAll(LINK_RE)) {
    const link = (m[1] ?? m[2] ?? "").replace(/\/$/, "") || "/";
    if (link.startsWith("/api/") || link.startsWith("/pagefind/")) continue;
    checked++;
    if (!routes.has(link)) broken.push({ file, link });
  }
}

// 1. MDX content
const contentDir = path.join(process.cwd(), "content");
function walk(dir: string) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.mdx?$/.test(entry.name)) {
      checkSource(path.relative(process.cwd(), full), fs.readFileSync(full, "utf8"));
    }
  }
}
walk(contentDir);

// 2. App source files that hardcode internal hrefs (checklist, nav, footer…)
const srcDir = path.join(process.cwd(), "src");
function walkSrc(dir: string) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkSrc(full);
    else if (/\.tsx?$/.test(entry.name)) {
      checkSource(path.relative(process.cwd(), full), fs.readFileSync(full, "utf8"));
    }
  }
}
walkSrc(srcDir);

if (broken.length > 0) {
  console.error(`❌ ${broken.length} broken internal link(s):\n`);
  for (const b of broken) console.error(`  ${b.file} → ${b.link}`);
  process.exit(1);
}
console.log(`✅ ${checked} internal links checked, all resolve to real routes.`);
