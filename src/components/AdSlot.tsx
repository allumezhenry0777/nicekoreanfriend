"use client";

import { useEffect, useRef, useState } from "react";
import { getConsent, onConsentChange } from "@/lib/consent";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const ADSENSE_ENABLED = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";

/**
 * Renders nothing at all unless NEXT_PUBLIC_ADSENSE_ENABLED=true.
 * Even when enabled, the ad only initializes after the visitor has
 * accepted cookies via the consent banner (GDPR/CCPA).
 */
export function AdSlot({
  slot,
  format = "auto",
  className = "",
}: {
  slot: string;
  format?: string;
  className?: string;
}) {
  const ref = useRef<HTMLModElement>(null);
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    setConsented(getConsent() === "accepted");
    return onConsentChange((c) => setConsented(c === "accepted"));
  }, []);

  useEffect(() => {
    if (!ADSENSE_ENABLED || !consented || !ref.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense script not loaded yet; it picks up existing <ins> tags on load.
    }
  }, [consented]);

  if (!ADSENSE_ENABLED || !ADSENSE_CLIENT) return null;

  return (
    <div className={`nkf-ad my-8 text-center ${className}`} aria-label="Advertisement">
      <span className="mb-1 block text-[10px] uppercase tracking-widest text-ink/40">
        Advertisement
      </span>
      <ins
        ref={ref}
        className="adsbygoogle block"
        style={{ display: "block", minHeight: 90 }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
