import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllCategories, getArticlesByCategory, getCategory } from "@/lib/content";
import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLdScript } from "@/components/JsonLdScript";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { MdxRenderer } from "@/components/MdxRenderer";
import { AdSlot } from "@/components/AdSlot";
import { absoluteUrl, site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: c.slug }));
}

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return {
    title: cat.frontmatter.name,
    description: cat.frontmatter.shortDescription,
    alternates: { canonical: absoluteUrl(`/${cat.slug}`) },
    openGraph: {
      title: `${cat.frontmatter.name} · ${site.name}`,
      description: cat.frontmatter.shortDescription,
      url: absoluteUrl(`/${cat.slug}`),
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();
  const articles = getArticlesByCategory(cat.slug);
  const published = articles.filter((a) => a.frontmatter.status === "published");
  const drafts = articles.filter((a) => a.frontmatter.status === "draft");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <JsonLdScript
        data={breadcrumbJsonLd([
          { name: "Home", url: site.url },
          { name: cat.frontmatter.name, url: absoluteUrl(`/${cat.slug}`) },
        ])}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: cat.frontmatter.name }]} />

      <header className="mt-6 max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          <span aria-hidden className="mr-2">
            {cat.frontmatter.emoji}
          </span>
          {cat.frontmatter.name}
        </h1>
        <div className="nkf-prose mt-4">
          <MdxRenderer source={cat.body} />
        </div>
      </header>

      <AdSlot slot="category-top" />

      <section className="mt-10" aria-label={`${cat.frontmatter.name} guides`}>
        {published.length === 0 ? (
          <p className="text-ink/60">The first guides in this section are being researched now.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {published.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        )}
      </section>

      {drafts.length > 0 && (
        <section className="mt-12" aria-labelledby="upcoming-heading">
          <h2 id="upcoming-heading" className="text-lg font-bold text-ink/70">
            In the works
          </h2>
          <p className="mt-1 text-sm text-ink/50">
            Being researched and fact-checked — previews are marked as drafts.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {drafts.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/${a.frontmatter.category}/${a.slug}`}
                  className="group flex items-baseline gap-2 rounded-lg border border-dashed border-sand bg-white/60 px-4 py-3 text-sm text-ink/60 hover:border-accent/40 hover:text-ink"
                >
                  <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
                    DRAFT
                  </span>
                  <span className="group-hover:text-accent">{a.frontmatter.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
