import { z } from "zod";

export const CATEGORY_SLUGS = [
  "first-72-hours",
  "money-banking",
  "getting-around",
  "phone-internet",
  "food-dining",
  "living-in-korea",
  "health-safety",
  "culture-etiquette",
] as const;

export const TEMPLATES = ["how-to", "explainer", "listicle", "comparison"] as const;

export const AUTHOR_SLUGS = ["minji", "jun"] as const;

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "must be an ISO date (YYYY-MM-DD)")
  .refine((d) => !Number.isNaN(Date.parse(d)), "must be a valid date");

export const faqSchema = z.object({
  question: z.string().min(8, "FAQ question too short"),
  answer: z.string().min(20, "FAQ answer too short"),
});

export const articleFrontmatterSchema = z
  .object({
    title: z.string().min(10).max(120),
    description: z
      .string()
      .min(50, "description under 50 chars — too short for a meta description")
      .max(170, "description over 170 chars — will be truncated in SERPs"),
    category: z.enum(CATEGORY_SLUGS),
    template: z.enum(TEMPLATES),
    author: z.enum(AUTHOR_SLUGS),
    datePublished: isoDate,
    dateModified: isoDate,
    tags: z.array(z.string().min(2)).min(1).max(8),
    quickAnswer: z.string().min(40, "quickAnswer must be a real 2–4 sentence answer"),
    faqs: z.array(faqSchema).min(3, "every article needs at least 3 FAQs"),
    status: z.enum(["draft", "published"]),
    heroAlt: z.string().optional(),
    sources: z.array(z.string()).optional(),
  })
  .strict()
  .refine((f) => Date.parse(f.dateModified) >= Date.parse(f.datePublished), {
    message: "dateModified must not be earlier than datePublished",
    path: ["dateModified"],
  });

export const categoryFrontmatterSchema = z
  .object({
    name: z.string().min(3).max(40),
    shortDescription: z.string().min(30).max(200),
    order: z.number().int().min(1).max(99),
    emoji: z.string().min(1).max(8),
  })
  .strict();

export const authorFrontmatterSchema = z
  .object({
    name: z.string().min(2).max(60),
    role: z.string().min(3).max(80),
    shortBio: z.string().min(30).max(300),
  })
  .strict();

export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>;
export type CategoryFrontmatter = z.infer<typeof categoryFrontmatterSchema>;
export type AuthorFrontmatter = z.infer<typeof authorFrontmatterSchema>;
export type CategorySlug = (typeof CATEGORY_SLUGS)[number];
export type AuthorSlug = (typeof AUTHOR_SLUGS)[number];
