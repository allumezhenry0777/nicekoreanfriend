"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export type ChecklistItem = {
  id: string;
  label: string;
  detail: string;
  href?: string;
};

export type ChecklistGroup = {
  title: string;
  items: ChecklistItem[];
};

const STORAGE_KEY = "nkf-start-here-checklist";

function loadDone(): Record<string, boolean> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

export function StartHereChecklist({ groups }: { groups: ChecklistGroup[] }) {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setDone(loadDone());
    setHydrated(true);
  }, []);

  const toggle = (id: string) => {
    setDone((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // private mode — progress just won't persist
      }
      return next;
    });
  };

  const total = groups.reduce((n, g) => n + g.items.length, 0);
  const completed = groups.reduce(
    (n, g) => n + g.items.filter((i) => done[i.id]).length,
    0,
  );
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div>
      <div className="sticky top-16 z-10 -mx-4 border-b border-sand bg-cream/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-sand">
            <div
              className="h-full rounded-full bg-accent transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-sm font-semibold tabular-nums text-ink" aria-live="polite">
            {hydrated ? `${completed}/${total} done` : `0/${total} done`}
          </span>
        </div>
      </div>

      <div className="mt-8 grid gap-8">
        {groups.map((group) => (
          <section key={group.title} aria-label={group.title}>
            <h2 className="text-xl font-bold text-ink">{group.title}</h2>
            <ul className="mt-3 grid gap-2">
              {group.items.map((item) => {
                const checked = Boolean(done[item.id]);
                return (
                  <li key={item.id}>
                    <label
                      className={`flex cursor-pointer gap-3 rounded-xl border p-4 transition-colors ${
                        checked
                          ? "border-accent/40 bg-accent/5"
                          : "border-sand bg-white hover:border-ink/20"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggle(item.id)}
                        className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-accent)]"
                      />
                      <span>
                        <span
                          className={`font-semibold ${checked ? "text-ink/50 line-through" : "text-ink"}`}
                        >
                          {item.label}
                        </span>
                        <span className="mt-0.5 block text-sm text-ink/70">
                          {item.detail}
                          {item.href && (
                            <>
                              {" "}
                              <Link
                                href={item.href}
                                className="font-medium text-accent underline"
                                onClick={(e) => e.stopPropagation()}
                              >
                                Read the guide →
                              </Link>
                            </>
                          )}
                        </span>
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
