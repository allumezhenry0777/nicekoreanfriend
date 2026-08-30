function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Extracts H2 headings from raw MDX and renders an "On this page" box. */
export function TableOfContents({ body }: { body: string }) {
  const headings = [...body.matchAll(/^##\s+(.+)$/gm)]
    .map((m) => m[1].trim())
    .filter(Boolean);

  if (headings.length < 3) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="my-6 rounded-xl border border-sand bg-white p-5"
    >
      <p className="text-xs font-bold uppercase tracking-widest text-ink/50">On this page</p>
      <ol className="mt-2 grid gap-1.5 text-[0.95rem]">
        {headings.map((h) => (
          <li key={h}>
            <a
              href={`#${slugify(h)}`}
              className="text-ink/75 underline decoration-sand underline-offset-2 hover:text-accent hover:decoration-accent"
            >
              {h}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
