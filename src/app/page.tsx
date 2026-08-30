import Link from "next/link";
import { getAllCategories, getPublishedArticles } from "@/lib/content";
import { ArticleCard } from "@/components/ArticleCard";
import { JsonLdScript } from "@/components/JsonLdScript";
import { organizationJsonLd, webSiteJsonLd } from "@/lib/jsonld";
import { AdSlot } from "@/components/AdSlot";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: site.url },
};

export default function HomePage() {
  const categories = getAllCategories();
  const latest = getPublishedArticles().slice(0, 6);
  const categoryNames = new Map(categories.map((c) => [c.slug, c.frontmatter.name]));

  return (
    <>
      <JsonLdScript data={[organizationJsonLd(), webSiteJsonLd()]} />

      <section className="border-b border-sand bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <p className="text-sm font-bold uppercase tracking-widest text-accent">
            안녕! Welcome to Korea
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
            Korea, explained like a <span className="text-accent">friend</span> would.
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/70">
            No fluff, no outdated tips. Practical English guides for visiting and living in Korea —
            from your first T-money card to opening a bank account.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/start-here"
              className="rounded-xl bg-accent px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-accent/90"
            >
              Start Here → your first 72 hours
            </Link>
            <Link
              href="/search"
              className="rounded-xl border border-sand bg-cream px-6 py-3 font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Search the guides
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12" aria-labelledby="browse-heading">
        <h2 id="browse-heading" className="text-2xl font-bold text-ink">
          Browse by topic
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="group rounded-xl border border-sand bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="text-2xl" aria-hidden>
                {c.frontmatter.emoji}
              </span>
              <h3 className="mt-2 font-bold text-ink group-hover:text-accent">
                {c.frontmatter.name}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-ink/60">
                {c.frontmatter.shortDescription}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <AdSlot slot="home-mid" className="mx-auto max-w-6xl px-4" />

      <section className="mx-auto max-w-6xl px-4 py-12" aria-labelledby="latest-heading">
        <h2 id="latest-heading" className="text-2xl font-bold text-ink">
          Latest guides
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((a) => (
            <ArticleCard
              key={a.slug}
              article={a}
              categoryName={categoryNames.get(a.frontmatter.category)}
            />
          ))}
        </div>
      </section>
    </>
  );
}
