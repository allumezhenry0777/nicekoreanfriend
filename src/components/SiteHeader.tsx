import Link from "next/link";
import { getAllCategories } from "@/lib/content";
import { MobileNav } from "./MobileNav";

export function SiteHeader() {
  const categories = getAllCategories();
  return (
    <header className="sticky top-0 z-40 border-b border-sand bg-cream/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-baseline gap-1 font-bold tracking-tight text-ink">
          <span className="text-xl">Nice Korean Friend</span>
          <span aria-hidden className="text-accent">
            .
          </span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-6 text-sm font-medium text-ink/80 md:flex">
          <Link href="/start-here" className="hover:text-accent">
            Start Here
          </Link>
          <Link href="/first-72-hours" className="hover:text-accent">
            First 72 Hours
          </Link>
          <Link href="/getting-around" className="hover:text-accent">
            Getting Around
          </Link>
          <Link href="/food-dining" className="hover:text-accent">
            Food
          </Link>
          <Link href="/about" className="hover:text-accent">
            About
          </Link>
          <Link
            href="/search"
            className="rounded-full border border-sand px-3 py-1.5 text-ink/70 hover:border-accent hover:text-accent"
          >
            Search ⌕
          </Link>
        </nav>
        <MobileNav
          categories={categories.map((c) => ({
            slug: c.slug,
            name: c.frontmatter.name,
            emoji: c.frontmatter.emoji,
          }))}
        />
      </div>
    </header>
  );
}
