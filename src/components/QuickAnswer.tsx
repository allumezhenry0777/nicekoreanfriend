export function QuickAnswer({ children }: { children: React.ReactNode }) {
  return (
    <aside
      aria-label="Quick answer"
      className="my-6 rounded-xl border border-accent/30 bg-accent/5 p-5"
    >
      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">Quick answer</p>
      <div className="text-[1.05rem] leading-relaxed text-ink">{children}</div>
    </aside>
  );
}
