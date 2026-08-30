import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Nice Korean Friend collects, uses and protects your data — including Google Analytics 4, Google AdSense cookies, and your rights under GDPR and CCPA.",
  alternates: { canonical: absoluteUrl("/privacy-policy") },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="2026-08-30">
      <p>
        This Privacy Policy explains how <strong>{site.name}</strong> (“we”, “us”, “our”), the
        website available at <a href={site.url}>{site.url}</a>, collects, uses and shares
        information about you when you visit the site. We keep this simple on purpose: we run an
        editorial website, not a data business, and we collect as little as we can.
      </p>

      <h2>1. Who we are</h2>
      <p>
        {site.name} is an independent English-language publication about visiting and living in
        South Korea. For any privacy question or request, contact us at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> or through the{" "}
        <Link href="/contact">contact form</Link>.
      </p>

      <h2>2. Information we collect</h2>
      <h3>Information you give us</h3>
      <ul>
        <li>
          <strong>Contact form:</strong> your name, email address and message. We use these only to
          reply to you.
        </li>
      </ul>
      <h3>Information collected automatically</h3>
      <ul>
        <li>
          <strong>Analytics (Google Analytics 4):</strong> if you accept cookies, we use GA4 to
          understand which pages are read and how visitors find us. GA4 sets cookies and collects
          device information, approximate location derived from a truncated IP address, and pages
          viewed. We have enabled IP anonymization and do not use analytics data to identify
          individuals.
        </li>
        <li>
          <strong>Advertising (Google AdSense):</strong> if advertising is enabled on the site and
          you accept cookies, Google AdSense and its certified partners set third-party cookies
          (such as the DoubleClick cookie) to serve ads and, where you have consented, to
          personalize them based on your visits to this and other websites.
        </li>
        <li>
          <strong>Server logs:</strong> our hosting provider (Vercel) records standard technical
          logs (IP address, user agent, requested URL) for security and reliability.
        </li>
      </ul>
      <h3>Information stored only on your device</h3>
      <p>
        Some features use your browser’s local storage and never send data to us: your cookie
        consent choice and your “Start Here” checklist progress. This data stays on your device and
        you can clear it at any time in your browser settings.
      </p>

      <h2>3. Cookies and your choices</h2>
      <p>
        On your first visit we show a consent banner. Analytics and advertising scripts load{" "}
        <strong>only if you choose “Accept”</strong>. If you decline, we do not load Google
        Analytics or Google AdSense at all. You can change your mind at any time by clearing this
        site’s data in your browser, which will make the banner appear again.
      </p>
      <p>You can also opt out independently of our banner:</p>
      <ul>
        <li>
          Google’s ads settings: <a href="https://adssettings.google.com">adssettings.google.com</a>
        </li>
        <li>
          GA4 opt-out add-on:{" "}
          <a href="https://tools.google.com/dlpage/gaoptout">tools.google.com/dlpage/gaoptout</a>
        </li>
        <li>
          Industry opt-outs: <a href="https://www.aboutads.info/choices">aboutads.info/choices</a>{" "}
          and <a href="https://www.youronlinechoices.eu">youronlinechoices.eu</a>
        </li>
      </ul>
      <p>
        How Google uses data from sites that use its services is described at{" "}
        <a href="https://policies.google.com/technologies/partner-sites">
          policies.google.com/technologies/partner-sites
        </a>
        .
      </p>

      <h2>4. Legal bases (GDPR)</h2>
      <p>If you are in the European Economic Area or the UK, we process personal data under:</p>
      <ul>
        <li>
          <strong>Consent</strong> (Art. 6(1)(a)) — analytics and advertising cookies, which you may
          withdraw at any time;
        </li>
        <li>
          <strong>Legitimate interests</strong> (Art. 6(1)(f)) — security logging and replying to
          messages you send us.
        </li>
      </ul>
      <p>
        You have the right to access, correct, delete, restrict or object to the processing of your
        personal data, the right to data portability, and the right to lodge a complaint with your
        supervisory authority. To exercise any of these rights, email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>5. Your California privacy rights (CCPA/CPRA)</h2>
      <p>
        If you are a California resident, you have the right to know what personal information we
        collect, to request its deletion, and to opt out of its “sale” or “sharing” as those terms
        are defined in the CCPA/CPRA. We do not sell personal information for money. Third-party
        advertising cookies may constitute “sharing” under the CPRA; you can opt out by declining
        cookies in our banner or via the links in Section 3. We will not discriminate against you
        for exercising your rights. Requests: <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>6. Data retention</h2>
      <ul>
        <li>Contact form messages: kept as long as needed to handle your inquiry, then deleted.</li>
        <li>Analytics data: retained per our GA4 settings (14 months), then deleted by Google.</li>
        <li>Consent choice and checklist progress: stored on your device until you clear it.</li>
      </ul>

      <h2>7. International transfers</h2>
      <p>
        Our hosting and analytics providers may process data in the United States and other
        countries. Where required, transfers rely on safeguards such as the EU Standard Contractual
        Clauses and the EU–US Data Privacy Framework.
      </p>

      <h2>8. Children</h2>
      <p>
        The site is not directed at children under 16 and we do not knowingly collect their
        personal data. If you believe a child has provided us personal data, contact us and we will
        delete it.
      </p>

      <h2>9. Changes to this policy</h2>
      <p>
        We will post any changes on this page and update the date at the top. Significant changes
        will be highlighted on the homepage.
      </p>
    </LegalPage>
  );
}
