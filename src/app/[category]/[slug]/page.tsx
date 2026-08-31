import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllArticles, getArticle, getAuthor, getCategory } from "@/lib/content";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DraftBanner } from "@/components/DraftBanner";
import { FaqSection } from "@/components/FaqSection";
import { JsonLdScript } from "@/components/JsonLdScript";
import { MdxRenderer } from "@/components/MdxRenderer";
import { QuickAnswer } from "@/components/QuickAnswer";
import { TableOfContents } from "@/components/TableOfContents";
import { AdSlot } from "@/components/AdSlot";
import { ArticleCard } from "@/components/ArticleCard";
import { articleJsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/jsonld";
import { absoluteUrl, site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ category: a.frontmatter.category, slug: a.slug }));
}

type Props = { params: Promise<{ category: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const article = getArticle(slug);
  if (!article || article.frontmatter.category !== category) return {};
  const fm = article.frontmatter;
  const url = absoluteUrl(`/${category}/${slug}`);
  const catName = getCategory(fm.category)?.frontmatter.name ?? "";
  const ogImage = absoluteUrl(
    `/api/og?title=${encodeURIComponent(fm.title)}&category=${encodeURIComponent(catName)}`,
  );
  return {
    title: fm.title,
    description: fm.description,
    alternates: { canonical: url },
    robots: fm.status === "draft" ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      title: fm.title,
      description: fm.description,
      url,
      publishedTime: fm.datePublished,
      modifiedTime: fm.dateModified,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: fm.title, description: fm.description },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { category, slug } = await params;
  const article = getArticle(slug);
  if (!article || article.frontmatter.category !== category) notFound();

  const fm = article.frontmatter;
  const cat = getCategory(fm.category);
  const author = getAuthor(fm.author);
  if (!cat || !author) notFound();

  const isDraft = fm.status === "draft";
  const siblings = getAllArticles().filter(
    (a) => a.frontmatter.category === fm.category && a.slug !== slug,
  );
  // Published guides first; drafts only fill leftover slots.
  const related = [
    ...siblings.filter((a) => a.frontmatter.status === "published"),
    ...siblings.filter((a) => a.frontmatter.status === "draft"),
  ].slice(0, 3);

  const jsonLd: Record<string, unknown>[] = [
    breadcrumbJsonLd([
      { name: "Home", url: site.url },
      { name: cat.frontmatter.name, url: absoluteUrl(`/${cat.slug}`) },
      { name: fm.title, url: absoluteUrl(`/${cat.slug}/${slug}`) },
    ]),
  ];
  if (!isDraft) {
    jsonLd.push(articleJsonLd(article, author, cat), faqPageJsonLd(fm.faqs));
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10" data-pagefind-body>
      <JsonLdScript data={jsonLd} />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: cat.frontmatter.name, href: `/${cat.slug}` },
          { name: fm.title },
        ]}
      />

      <article className="mt-6">
        {isDraft && <DraftBanner />}

        <header>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            {fm.title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink/70">{fm.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink/60">
            <Link href={`/authors/${author.slug}`} className="font-semibold text-ink hover:text-accent">
              {author.frontmatter.name}
            </Link>
            <span aria-hidden>·</span>
            <time dateTime={fm.dateModified}>
              Updated{" "}
              {new Date(fm.dateModified).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span aria-hidden>·</span>
            <span>{article.readingMinutes} min read</span>
          </div>
        </header>

        {article.heroImage && (
          <figure className="mt-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.heroImage}
              alt={`${fm.title} — editorial photo`}
              width={800}
              height={450}
              className="w-full rounded-2xl border border-sand bg-white"
            />
          </figure>
        )}

        <QuickAnswer>{fm.quickAnswer}</QuickAnswer>

        <TableOfContents body={article.body} />

        <AdSlot slot="article-top" />

        <div className="nkf-prose">
          <MdxRenderer source={article.body} />
        </div>

        <FaqSection faqs={fm.faqs} />

        <AdSlot slot="article-bottom" />

        <footer className="mt-10 rounded-xl border border-sand bg-white p-5 text-sm text-ink/70">
          <p>
            <strong className="text-ink">Spotted something outdated?</strong> Korea moves fast.{" "}
            <Link href="/contact" className="text-accent underline">
              Tell us
            </Link>{" "}
            and we’ll fix it — see our{" "}
            <Link href="/editorial-policy" className="text-accent underline">
              editorial policy
            </Link>
            .
          </p>
        </footer>
      </article>

      {related.length > 0 && (
        <section className="mt-12" aria-labelledby="related-heading">
          <h2 id="related-heading" className="text-xl font-bold text-ink">
            More in {cat.frontmatter.name}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
