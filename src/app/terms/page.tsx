import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms that apply when you use the Nice Korean Friend website.",
  alternates: { canonical: absoluteUrl("/terms") },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="2026-08-30">
      <p>
        Welcome to <strong>{site.name}</strong>. By accessing or using{" "}
        <a href={site.url}>{site.url}</a> (the “Site”), you agree to these Terms of Use. If you do
        not agree, please do not use the Site.
      </p>

      <h2>1. What the Site is</h2>
      <p>
        The Site publishes editorial guides, in English, about travelling to and living in South
        Korea. Content is provided for general information only — see our{" "}
        <Link href="/disclaimer">Disclaimer</Link> for important limits on how you should rely on
        it.
      </p>

      <h2>2. Using the Site</h2>
      <p>You agree not to:</p>
      <ul>
        <li>scrape, harvest or bulk-download content for republication or model training without our written permission;</li>
        <li>interfere with the Site’s operation or attempt to gain unauthorized access to it;</li>
        <li>use the contact form to send spam, abuse or unlawful material;</li>
        <li>frame or mirror the Site or misrepresent your affiliation with us.</li>
      </ul>

      <h2>3. Intellectual property</h2>
      <p>
        All content on the Site — text, graphics, logos and design — is owned by {site.name} or its
        licensors and protected by copyright and other laws. You may share short excerpts with a
        link and clear attribution. Any other reproduction, distribution or commercial use requires
        our prior written consent.
      </p>

      <h2>4. Third-party links and services</h2>
      <p>
        Guides link to third-party websites, apps and services (for example official government
        sites, transit apps or booking platforms). We do not control them and are not responsible
        for their content, availability, pricing or policies. Some links may be affiliate links —
        see the <Link href="/disclaimer">Disclaimer &amp; Disclosure</Link>.
      </p>

      <h2>5. No warranties</h2>
      <p>
        The Site is provided “as is” and “as available”. Prices, schedules, visa rules and other
        facts about Korea change frequently; while we work to keep guides current (see our{" "}
        <Link href="/editorial-policy">Editorial Policy</Link>), we make no warranty that any
        content is accurate, complete or up to date, and we disclaim all implied warranties to the
        fullest extent permitted by law.
      </p>

      <h2>6. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {site.name} and its authors will not be liable for
        any indirect, incidental, consequential or special damages, or for any loss arising from
        reliance on Site content — including missed flights, visa refusals, financial losses or
        travel disruptions. Where liability cannot be excluded, it is limited to the amount you
        paid us to use the Site (which is zero).
      </p>

      <h2>7. Changes</h2>
      <p>
        We may update the Site and these Terms at any time. The date above shows the latest
        revision; continued use after changes means you accept them.
      </p>

      <h2>8. Governing law</h2>
      <p>
        These Terms are governed by the laws of the Republic of Korea, without regard to conflict
        of law rules. Mandatory consumer protections of your country of residence remain
        unaffected.
      </p>

      <h2>9. Contact</h2>
      <p>
        Questions about these Terms: <a href={`mailto:${site.email}`}>{site.email}</a> or the{" "}
        <Link href="/contact">contact form</Link>.
      </p>
    </LegalPage>
  );
}
