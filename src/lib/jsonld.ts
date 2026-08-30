import { absoluteUrl, site } from "./site";
import type { Article, Author, Category } from "./content";

type JsonLd = Record<string, unknown>;

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/logo.png"),
    sameAs: [site.instagram],
  };
}

export function webSiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: site.name,
    url: site.url,
    inLanguage: "en",
    publisher: { "@id": absoluteUrl("/#organization") },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: absoluteUrl("/search?q={search_term_string}"),
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function articleJsonLd(article: Article, author: Author, category: Category): JsonLd {
  const url = absoluteUrl(`/${category.slug}/${article.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: article.frontmatter.title,
    description: article.frontmatter.description,
    inLanguage: "en",
    mainEntityOfPage: url,
    image: [absoluteUrl(`/api/og?title=${encodeURIComponent(article.frontmatter.title)}`)],
    datePublished: article.frontmatter.datePublished,
    dateModified: article.frontmatter.dateModified,
    author: {
      "@type": "Person",
      name: author.frontmatter.name,
      url: absoluteUrl(`/authors/${author.slug}`),
    },
    publisher: { "@id": absoluteUrl("/#organization") },
    articleSection: category.frontmatter.name,
    keywords: article.frontmatter.tags.join(", "),
  };
}

export function faqPageJsonLd(faqs: { question: string; answer: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
