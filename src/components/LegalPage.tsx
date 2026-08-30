import { Breadcrumbs } from "./Breadcrumbs";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: title }]} />
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-ink">{title}</h1>
      {updated && (
        <p className="mt-2 text-sm text-ink/60">
          Last updated: <time dateTime={updated}>{updated}</time>
        </p>
      )}
      <div className="nkf-prose mt-6">{children}</div>
    </div>
  );
}
