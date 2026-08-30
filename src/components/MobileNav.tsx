"use client";

import { useState } from "react";
import Link from "next/link";

type Cat = { slug: string; name: string; emoji: string };

export function MobileNav({ categories }: { categories: Cat[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="rounded-md border border-sand px-3 py-2 text-sm font-medium text-ink"
      >
        {open ? "Close ✕" : "Menu ☰"}
      </button>
      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-16 z-50 border-b border-sand bg-cream px-4 py-4 shadow-lg"
        >
          <nav aria-label="Mobile" className="grid gap-1">
            <Link
              href="/start-here"
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 font-semibold text-accent"
            >
              🇰🇷 Start Here
            </Link>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-ink/90 hover:bg-sand/40"
              >
                {c.emoji} {c.name}
              </Link>
            ))}
            <Link href="/search" onClick={() => setOpen(false)} className="rounded-md px-2 py-2 text-ink/90">
              ⌕ Search
            </Link>
            <Link href="/about" onClick={() => setOpen(false)} className="rounded-md px-2 py-2 text-ink/90">
              About
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
