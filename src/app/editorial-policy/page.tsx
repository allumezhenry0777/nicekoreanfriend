import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "How Nice Korean Friend researches, verifies, updates and corrects its guides — and how we keep advertising away from editorial decisions.",
  alternates: { canonical: absoluteUrl("/editorial-policy") },
};

export default function EditorialPolicyPage() {
  return (
    <LegalPage title="Editorial Policy" updated="2026-08-30">
      <p>
        Our promise is in the name: we tell you what a nice Korean friend would tell you — honestly,
        specifically, and without pretending things are simpler (or more complicated) than they
        are. This page explains how we hold ourselves to that.
      </p>

      <h2>How guides are made</h2>
      <ul>
        <li>
          <strong>First-hand first.</strong> Guides are written or reviewed by people who live in
          Korea and have done the thing themselves — ridden the bus, opened the bank account, sat
          in the immigration office.
        </li>
        <li>
          <strong>Official sources for facts.</strong> Prices, visa rules, schedules and procedures
          are checked against official sources (government portals, operators’ own sites) at the
          time of writing. Every published fact of this kind must have a source the editor can
          point to.
        </li>
        <li>
          <strong>Drafts are labeled.</strong> Unfinished articles carry a visible DRAFT banner,
          are excluded from our sitemap and feeds, and use <code>[VERIFY]</code> placeholders
          instead of unconfirmed figures. We never publish a number we haven’t checked.
        </li>
      </ul>

      <h2>Updates and corrections</h2>
      <ul>
        <li>Every guide shows the date it was last updated.</li>
        <li>
          Guides covering fast-moving topics (visas, prices, transit) are reviewed on a recurring
          schedule; others are updated when readers or news tell us something changed.
        </li>
        <li>
          When we get something wrong, we fix the article promptly. Material corrections are noted
          in the article. You can report errors via the <Link href="/contact">contact form</Link> —
          correction reports go to the top of the queue.
        </li>
      </ul>

      <h2>Independence: ads, affiliates and gifts</h2>
      <ul>
        <li>
          Advertising (Google AdSense) is served by Google’s systems and clearly distinguishable
          from editorial content. Advertisers have no access to, or influence over, editorial
          decisions.
        </li>
        <li>
          Affiliate partnerships never decide what we recommend. Writers pick recommendations
          first; monetization is applied afterwards, and only where it doesn’t change the advice.
          See the <Link href="/disclaimer">Disclaimer &amp; Disclosure</Link>.
        </li>
        <li>
          We do not publish paid posts or “advertorials”. If that ever changes, they will be
          conspicuously labeled as sponsored.
        </li>
        <li>Press trips or free products, if accepted, are disclosed in the relevant article.</li>
      </ul>

      <h2>Use of AI</h2>
      <p>
        We may use AI tools for research assistance, outlining and translation support. Every
        published guide is verified, edited and approved by a human editor, and facts are checked
        against primary sources by a person — never published on an AI’s word alone.
      </p>

      <h2>Who is responsible</h2>
      <p>
        Editorial responsibility rests with the {`site's`} editors, listed on the{" "}
        <Link href="/about">About page</Link>. Questions about this policy:{" "}
        <Link href="/contact">contact us</Link>.
      </p>
    </LegalPage>
  );
}
