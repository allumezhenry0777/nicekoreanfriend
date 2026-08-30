import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllArticles, getAllAuthors, getAuthor } from "@/lib/content";
import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MdxRenderer } from "@/components/MdxRenderer";
import { absoluteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllAuthors().map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return {};
  return {
    title: `${author.frontmatter.name} — ${author.frontmatter.role}`,
    description: author.frontmatter.shortBio,
    alternates: { canonical: absoluteUrl(`/authors/${slug}`) },
  };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();

  const articles = getAllArticles().filter((a) => a.frontmatter.author === slug);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: author.frontmatter.name }]} />
      <header className="mt-6">
        <h1 className="text-3xl font-extrabold text-ink">{author.frontmatter.name}</h1>
        <p className="mt-1 font-medium text-accent">{author.frontmatter.role}</p>
      </header>
      <div className="nkf-prose mt-6">
        <MdxRenderer source={author.body} />
      </div>

      <section className="mt-10" aria-labelledby="author-articles">
        <h2 id="author-articles" className="text-xl font-bold text-ink">
          Guides by {author.frontmatter.name}
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
    </div>
  );
}
