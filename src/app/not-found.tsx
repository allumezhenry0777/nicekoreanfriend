import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <p className="text-6xl">🧭</p>
      <h1 className="mt-4 text-3xl font-extrabold text-ink">Page not found</h1>
      <p className="mt-3 text-ink/70">
        That page moved or never existed. 길을 잃으셨나요? (Lost your way?)
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="rounded-xl bg-accent px-5 py-3 font-semibold text-white hover:bg-accent/90"
        >
          Back home
        </Link>
        <Link
          href="/search"
          className="rounded-xl border border-sand bg-white px-5 py-3 font-semibold text-ink hover:border-accent"
        >
          Search guides
        </Link>
      </div>
    </div>
  );
}
