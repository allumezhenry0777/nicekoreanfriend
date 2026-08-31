import Link from "next/link";
import { getAllCategories } from "@/lib/content";
import { site } from "@/lib/site";

export function SiteFooter() {
  const categories = getAllCategories();
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-sand bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-dark.svg"
            alt="Nice Korean Friend"
            width={455}
            height={80}
            className="h-8 w-auto"
          />
          <p className="mt-3 text-sm text-cream/70">{site.tagline}</p>
          <p className="mt-4 text-xs leading-relaxed text-cream/60">
            Some pages may contain ads or affiliate links. If you buy through them, we may earn a
            commission at no extra cost to you. See our{" "}
            <Link href="/disclaimer" className="underline">
              disclaimer
            </Link>
            .
          </p>
        </div>
        <nav aria-label="Guides">
          <p className="text-sm font-semibold uppercase tracking-wide text-cream/50">Guides</p>
          <ul className="mt-3 grid gap-2 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/${c.slug}`} className="text-cream/80 hover:text-white">
                  {c.frontmatter.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Site">
          <p className="text-sm font-semibold uppercase tracking-wide text-cream/50">Site</p>
          <ul className="mt-3 grid gap-2 text-sm">
            <li><Link href="/start-here" className="text-cream/80 hover:text-white">Start Here</Link></li>
            <li><Link href="/search" className="text-cream/80 hover:text-white">Search</Link></li>
            <li><Link href="/about" className="text-cream/80 hover:text-white">About</Link></li>
            <li><Link href="/contact" className="text-cream/80 hover:text-white">Contact</Link></li>
            <li><Link href="/editorial-policy" className="text-cream/80 hover:text-white">Editorial Policy</Link></li>
            <li>
              <a href="/feed.xml" className="text-cream/80 hover:text-white">
                RSS
              </a>
            </li>
          </ul>
        </nav>
        <nav aria-label="Legal">
          <p className="text-sm font-semibold uppercase tracking-wide text-cream/50">Legal</p>
          <ul className="mt-3 grid gap-2 text-sm">
            <li><Link href="/privacy-policy" className="text-cream/80 hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms" className="text-cream/80 hover:text-white">Terms of Use</Link></li>
            <li><Link href="/disclaimer" className="text-cream/80 hover:text-white">Disclaimer &amp; Disclosure</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-cream/50">
        © {year} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
