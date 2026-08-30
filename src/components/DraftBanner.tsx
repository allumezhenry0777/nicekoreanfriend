export function DraftBanner() {
  return (
    <div
      role="status"
      className="mb-6 rounded-lg border-2 border-dashed border-amber-400 bg-amber-50 p-4 text-sm text-amber-900"
    >
      <p className="font-bold">⚠️ DRAFT — not fact-checked yet</p>
      <p className="mt-1">
        This article is an unpublished working draft. Figures marked{" "}
        <code className="rounded bg-amber-100 px-1">[VERIFY]</code> have not been confirmed. Do not
        rely on it until this banner is gone.
      </p>
    </div>
  );
}
