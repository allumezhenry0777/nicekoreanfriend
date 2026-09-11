type Props = {
  sources: string[];
  checkedDate: string;
};

function sourceLabel(source: string) {
  try {
    return new URL(source).hostname.replace(/^www\./, "");
  } catch {
    return source;
  }
}

export function ArticleSources({ sources, checkedDate }: Props) {
  if (sources.length === 0) return null;

  const formattedDate = new Date(`${checkedDate}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <section className="mt-10 border-t border-sand pt-7" aria-labelledby="sources-heading">
      <h2 id="sources-heading" className="text-xl font-bold text-ink">
        Sources and last checked
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-ink/65">
        Operational details and time-sensitive facts were last checked on {formattedDate}.
      </p>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-ink/70">
        {sources.map((source) => (
          <li key={source}>
            <a
              href={source}
              target="_blank"
              rel="noreferrer"
              className="break-words text-accent underline underline-offset-2"
            >
              {sourceLabel(source)}
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
