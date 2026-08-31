import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  articleFrontmatterSchema,
  categoryFrontmatterSchema,
  authorFrontmatterSchema,
  type ArticleFrontmatter,
  type CategoryFrontmatter,
  type AuthorFrontmatter,
  type CategorySlug,
} from "./schema";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Article = {
  slug: string;
  frontmatter: ArticleFrontmatter;
  body: string;
  readingMinutes: number;
  heroImage?: string;
  inlineImage?: string;
};

export type Category = {
  slug: CategorySlug;
  frontmatter: CategoryFrontmatter;
  body: string;
};

export type Author = {
  slug: string;
  frontmatter: AuthorFrontmatter;
  body: string;
};

class FrontmatterError extends Error {
  constructor(file: string, issues: string) {
    super(`Invalid frontmatter in ${file}:\n${issues}`);
    this.name = "FrontmatterError";
  }
}

function listMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .sort();
}

function formatIssues(error: { issues: { path: PropertyKey[]; message: string }[] }): string {
  return error.issues
    .map((i) => `  • ${i.path.join(".") || "(root)"}: ${i.message}`)
    .join("\n");
}

function readingTime(body: string): number {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

const PUBLIC_DIR = path.join(process.cwd(), "public");

function imageIfExists(relPath: string): string | undefined {
  return fs.existsSync(path.join(PUBLIC_DIR, relPath)) ? relPath : undefined;
}

/**
 * Every article gets two brand illustrations: a hero (rendered by the page
 * template) and an inline one injected before the article's 2nd H2. Published
 * articles use their own art; drafts fall back to their category's art.
 */
function resolveArtwork(fm: ArticleFrontmatter, slug: string) {
  const own = `/images/articles/${slug}`;
  const cat = `/images/categories/${fm.category}`;
  const hero =
    imageIfExists(`${own}-1.svg`) ?? imageIfExists(`${cat}-1.svg`);
  const inline =
    imageIfExists(`${own}-2.svg`) ?? imageIfExists(`${cat}-2.svg`);
  return { hero, inline };
}

function injectInlineImage(body: string, imgPath: string, alt: string): string {
  const marker = "\n## ";
  const first = body.indexOf(marker);
  const second = first === -1 ? -1 : body.indexOf(marker, first + 1);
  const md = `\n![${alt}](${imgPath} "${alt}")\n`;
  if (second === -1) return body + md;
  return body.slice(0, second) + md + body.slice(second);
}

// Caches survive within one server process / build worker.
let articleCache: Article[] | null = null;
let categoryCache: Category[] | null = null;
let authorCache: Author[] | null = null;

export function getAllArticles(): Article[] {
  if (articleCache) return articleCache;
  const dir = path.join(CONTENT_DIR, "articles");
  const articles = listMdxFiles(dir).map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const { data, content } = matter(raw);
    const parsed = articleFrontmatterSchema.safeParse(data);
    if (!parsed.success) {
      throw new FrontmatterError(`content/articles/${file}`, formatIssues(parsed.error));
    }
    const slug = file.replace(/\.mdx?$/, "");
    const art = resolveArtwork(parsed.data, slug);
    const body =
      art.inline !== undefined
        ? injectInlineImage(content, art.inline, `${parsed.data.title} — illustration`)
        : content;
    return {
      slug,
      frontmatter: parsed.data,
      body,
      readingMinutes: readingTime(content),
      heroImage: art.hero,
      inlineImage: art.inline,
    };
  });
  const seen = new Set<string>();
  for (const a of articles) {
    if (seen.has(a.slug)) throw new Error(`Duplicate article slug: ${a.slug}`);
    seen.add(a.slug);
  }
  articleCache = articles.sort(
    (a, b) => Date.parse(b.frontmatter.datePublished) - Date.parse(a.frontmatter.datePublished),
  );
  return articleCache;
}

export function getArticle(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter((a) => a.frontmatter.category === category);
}

export function getPublishedArticles(): Article[] {
  return getAllArticles().filter((a) => a.frontmatter.status === "published");
}

export function getAllCategories(): Category[] {
  if (categoryCache) return categoryCache;
  const dir = path.join(CONTENT_DIR, "categories");
  const categories = listMdxFiles(dir).map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const { data, content } = matter(raw);
    const parsed = categoryFrontmatterSchema.safeParse(data);
    if (!parsed.success) {
      throw new FrontmatterError(`content/categories/${file}`, formatIssues(parsed.error));
    }
    return {
      slug: file.replace(/\.mdx?$/, "") as CategorySlug,
      frontmatter: parsed.data,
      body: content,
    };
  });
  categoryCache = categories.sort((a, b) => a.frontmatter.order - b.frontmatter.order);
  return categoryCache;
}

export function getCategory(slug: string): Category | undefined {
  return getAllCategories().find((c) => c.slug === slug);
}

export function getAllAuthors(): Author[] {
  if (authorCache) return authorCache;
  const dir = path.join(CONTENT_DIR, "authors");
  authorCache = listMdxFiles(dir).map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const { data, content } = matter(raw);
    const parsed = authorFrontmatterSchema.safeParse(data);
    if (!parsed.success) {
      throw new FrontmatterError(`content/authors/${file}`, formatIssues(parsed.error));
    }
    return { slug: file.replace(/\.mdx?$/, ""), frontmatter: parsed.data, body: content };
  });
  return authorCache;
}

export function getAuthor(slug: string): Author | undefined {
  return getAllAuthors().find((a) => a.slug === slug);
}
