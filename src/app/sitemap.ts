import type { MetadataRoute } from "next";
import { getAllCategories, getPublishedArticles } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "daily", priority: 1 },
    { url: absoluteUrl("/start-here"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/about"), changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/editorial-policy"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/privacy-policy"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/terms"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/disclaimer"), changeFrequency: "yearly", priority: 0.2 },
  ];

  const categories: MetadataRoute.Sitemap = getAllCategories().map((c) => ({
    url: absoluteUrl(`/${c.slug}`),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Draft articles are noindexed, so they stay out of the sitemap.
  const articles: MetadataRoute.Sitemap = getPublishedArticles().map((a) => ({
    url: absoluteUrl(`/${a.frontmatter.category}/${a.slug}`),
    lastModified: a.frontmatter.dateModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...categories, ...articles];
}
