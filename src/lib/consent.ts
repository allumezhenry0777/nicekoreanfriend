export type ConsentValue = "accepted" | "declined";

const KEY = "nkf-cookie-consent";
const EVENT = "nkf-consent-change";

export function getConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "accepted" || v === "declined" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: ConsentValue): void {
  try {
    window.localStorage.setItem(KEY, value);
  } catch {
    // storage unavailable (private mode) — treat as session-only choice
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: value }));
}

export function onConsentChange(cb: (value: ConsentValue) => void): () => void {
  const handler = (e: Event) => cb((e as CustomEvent<ConsentValue>).detail);
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
