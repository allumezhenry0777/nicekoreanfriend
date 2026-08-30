"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

type PagefindResult = {
  id: string;
  data: () => Promise<{
    url: string;
    meta: { title?: string };
    excerpt: string;
  }>;
};

type Pagefind = {
  search: (q: string) => Promise<{ results: PagefindResult[] }>;
};

type ResultRow = { url: string; title: string; excerpt: string };

export function SearchClient() {
  const params = useSearchParams();
  const initialQuery = params.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<ResultRow[]>([]);
  const [state, setState] = useState<"idle" | "loading" | "ready" | "unavailable">("idle");
  const pagefindRef = useRef<Pagefind | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // The pagefind bundle is generated at build time (postbuild script)
        // and served from /pagefind/. It does not exist in `next dev`.
        const pf = (await import(
          /* webpackIgnore: true */ /* @vite-ignore */ "/pagefind/pagefind.js" as string
        )) as Pagefind;
        if (!cancelled) {
          pagefindRef.current = pf;
          setState("ready");
        }
      } catch {
        if (!cancelled) setState("unavailable");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const runSearch = useCallback(async (q: string) => {
    const pf = pagefindRef.current;
    if (!pf || !q.trim()) {
      setResults([]);
      return;
    }
    setState("loading");
    const res = await pf.search(q);
    const rows = await Promise.all(
      res.results.slice(0, 20).map(async (r) => {
        const d = await r.data();
        return {
          url: d.url.replace(/\.html$/, "").replace(/\/index$/, "/"),
          title: d.meta.title ?? d.url,
          excerpt: d.excerpt,
        };
      }),
    );
    setResults(rows);
    setState("ready");
  }, []);

  useEffect(() => {
    if (state === "ready" && initialQuery) void runSearch(initialQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state === "ready"]);

  useEffect(() => {
    if (state !== "ready" && state !== "loading") return;
    const t = setTimeout(() => void runSearch(query), 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div>
      <label htmlFor="site-search" className="sr-only">
        Search articles
      </label>
      <input
        id="site-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Try “T-money”, “bank account”, “SIM card”…"
        autoFocus
        className="w-full rounded-xl border border-sand bg-white px-5 py-4 text-lg text-ink shadow-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
      />

      {state === "unavailable" && (
        <p className="mt-6 rounded-lg border border-sand bg-white p-4 text-sm text-ink/70">
          Search isn’t available in this environment. The search index is generated during the
          production build (<code>npm run build</code>) — it does not exist in dev mode.
        </p>
      )}

      <ul className="mt-6 grid gap-4" aria-live="polite">
        {results.map((r) => (
          <li key={r.url} className="rounded-xl border border-sand bg-white p-5">
            <a href={r.url} className="text-lg font-bold text-ink hover:text-accent">
              {r.title}
            </a>
            <p
              className="mt-1 text-sm leading-relaxed text-ink/70 [&_mark]:bg-accent/20 [&_mark]:text-ink"
              dangerouslySetInnerHTML={{ __html: r.excerpt }}
            />
          </li>
        ))}
      </ul>

      {state === "ready" && query.trim() && results.length === 0 && (
        <p className="mt-6 text-ink/60">No results for “{query}”.</p>
      )}
    </div>
  );
}
