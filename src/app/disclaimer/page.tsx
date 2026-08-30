import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer & Disclosure",
  description:
    "How Nice Korean Friend makes money (ads and affiliate links), and the limits of relying on our travel and living guides.",
  alternates: { canonical: absoluteUrl("/disclaimer") },
};

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer & Disclosure" updated="2026-08-30">
      <h2>General information only</h2>
      <p>
        Everything on {site.name} is general information for travellers and new residents, written
        in plain English. It is <strong>not</strong> legal, immigration, financial, tax or medical
        advice. Visa rules, prices, opening hours, transit routes and government procedures in
        Korea change often and sometimes without notice. Always confirm critical details with the
        official source — for example the Korea Immigration Service (
        <a href="https://www.hikorea.go.kr">hikorea.go.kr</a>), your embassy, or the service
        provider — before making decisions that matter.
      </p>

      <h2>Advertising disclosure</h2>
      <p>
        The Site may display advertising served by <strong>Google AdSense</strong>. Ads are labeled
        as such and are chosen by Google’s systems, not by our editors. Advertisers never see or
        influence a guide before publication, and we do not accept payment for positive coverage.
        See our <Link href="/editorial-policy">Editorial Policy</Link> for how we keep ads and
        editorial separate.
      </p>

      <h2>Affiliate disclosure</h2>
      <p>
        Some links on the Site are <strong>affiliate links</strong>: if you click one and buy a
        product or book a service, we may earn a commission at <strong>no extra cost to you</strong>.
        This is disclosed here site-wide and applies wherever we link to bookable services (for
        example SIM/eSIM providers, travel insurance, or booking platforms). We only link to
        services we would genuinely recommend to a friend, and a link’s affiliate status never
        changes our verdict — recommendations are decided first, monetization second.
      </p>
      <p>
        This disclosure is made in accordance with the U.S. FTC’s Endorsement Guides (16 CFR Part
        255) and equivalent consumer protection rules elsewhere.
      </p>

      <h2>Accuracy and “[VERIFY]” marks</h2>
      <p>
        Draft articles are clearly labeled with a DRAFT banner and may contain placeholders such as{" "}
        <code>[VERIFY]</code> where a figure has not yet been independently confirmed. Do not rely
        on draft content. Published guides show a “last updated” date; if you spot something
        outdated, please <Link href="/contact">tell us</Link>.
      </p>

      <h2>External links</h2>
      <p>
        We link out to third-party sites we do not control. A link is not an endorsement of
        everything on the destination site, and we are not responsible for third-party content,
        pricing or privacy practices.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {site.name} accepts no liability for loss or damage
        arising from use of, or reliance on, the Site’s content. See also our{" "}
        <Link href="/terms">Terms of Use</Link>.
      </p>
    </LegalPage>
  );
}
