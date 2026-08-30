import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchClient } from "@/components/SearchClient";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Search",
  description: "Search every Nice Korean Friend guide — SIM cards, banking, food, etiquette and more.",
  alternates: { canonical: absoluteUrl("/search") },
  robots: { index: false },
};

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-extrabold text-ink">Search</h1>
      <p className="mt-2 text-ink/70">Every guide on the site, one search box.</p>
      <div className="mt-6">
        <Suspense fallback={null}>
          <SearchClient />
        </Suspense>
      </div>
    </div>
  );
}
