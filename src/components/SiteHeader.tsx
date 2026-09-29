import Link from "next/link";
import { getAllCategories } from "@/lib/content";
import { MobileNav } from "./MobileNav";

export function SiteHeader() {
  const categories = getAllCategories();
  return (
    <header className="sticky top-0 z-40 border-b border-sand bg-cream/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Nice Korean Friend — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-light.svg"
            alt="Nice Korean Friend"
            width={455}
            height={80}
            className="h-8 w-auto sm:h-9"
          />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-6 text-sm font-medium text-ink/80 md:flex">
          <Link href="/start-here" className="hover:text-accent">
            Start Here
          </Link>
          <Link href="/places-ive-been" className="font-semibold text-accent hover:underline">
            My Local Picks
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
      <nav aria-label="Guide topics" className="hidden border-t border-sand/70 md:block">
        <ul className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2 text-xs font-medium text-ink/80 xl:text-[13px]">
          {categories.filter((c) => c.slug !== "places-ive-been").map((c) => (
            <li key={c.slug}>
              <Link href={`/${c.slug}`} className="block rounded py-1 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                {c.frontmatter.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
