/**
 * Validates every MDX file in /content against the zod frontmatter schemas.
 * Exits non-zero (failing CI / the build) on the first invalid file.
 * Run: npm run validate-content
 */
import { getAllArticles, getAllAuthors, getAllCategories } from "../src/lib/content";
import { AUTHOR_SLUGS, CATEGORY_SLUGS } from "../src/lib/schema";

try {
  const categories = getAllCategories();
  const authors = getAllAuthors();
  const articles = getAllArticles();

  // Referential integrity beyond per-file schemas.
  const catSlugs = new Set(categories.map((c) => c.slug));
  for (const expected of CATEGORY_SLUGS) {
    if (!catSlugs.has(expected)) {
      throw new Error(`Missing category hub file: content/categories/${expected}.mdx`);
    }
  }
  const authorSlugs = new Set(authors.map((a) => a.slug));
  for (const expected of AUTHOR_SLUGS) {
    if (!authorSlugs.has(expected)) {
      throw new Error(`Missing author profile: content/authors/${expected}.mdx`);
    }
  }
  for (const a of articles) {
    if (!authorSlugs.has(a.frontmatter.author)) {
      throw new Error(`Article ${a.slug} references unknown author "${a.frontmatter.author}"`);
    }
    if (a.frontmatter.status === "published" && /\[VERIFY\]/.test(a.body)) {
      throw new Error(
        `Article ${a.slug} is status:published but still contains [VERIFY] placeholders`,
      );
    }
  }

  const drafts = articles.filter((a) => a.frontmatter.status === "draft").length;
  console.log(
    `✅ Content valid: ${articles.length} articles (${drafts} drafts), ${categories.length} categories, ${authors.length} authors.`,
  );
} catch (err) {
  console.error("❌ Content validation failed:\n");
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
}
