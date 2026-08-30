import Link from "next/link";
import type { Article } from "@/lib/content";

export function ArticleCard({
  article,
  categoryName,
}: {
  article: Article;
  categoryName?: string;
}) {
  const fm = article.frontmatter;
  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-sand bg-white p-5 transition-shadow hover:shadow-md">
      <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-ink/50">
        {categoryName && <span className="text-accent">{categoryName}</span>}
        {fm.status === "draft" && (
          <span className="rounded bg-amber-100 px-1.5 py-0.5 font-bold text-amber-800">DRAFT</span>
        )}
      </div>
      <h3 className="text-lg font-bold leading-snug text-ink">
        <Link href={`/${fm.category}/${article.slug}`} className="after:absolute after:inset-0">
          <span className="group-hover:text-accent">{fm.title}</span>
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink/70">
        {fm.description}
      </p>
      <p className="mt-3 text-xs text-ink/50">
        <time dateTime={fm.dateModified}>
          Updated{" "}
          {new Date(fm.dateModified).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>{" "}
        · {article.readingMinutes} min read
      </p>
    </article>
  );
}
