import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { getAllAuthors } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Nice Korean Friend is the friend you wish you had in Korea — honest, practical English guides to visiting and living here, written by locals.",
  alternates: { canonical: absoluteUrl("/about") },
};

export default function AboutPage() {
  const authors = getAllAuthors();
  return (
    <LegalPage title="About Nice Korean Friend">
      <p>
        Imagine you land at Incheon and a Korean friend is waiting for you — someone who tells you
        which SIM plan is actually worth it, which subway card to buy, what that button on the
        table does, and which “must-see” you can safely skip. Most visitors don’t have that friend.{" "}
        <strong>That’s the job of this site.</strong>
      </p>

      <h2>What we believe</h2>
      <ul>
        <li>
          <strong>Say the real thing.</strong> If the airport rail express isn’t worth it from your
          terminal, we say so. If a tourist favorite is overpriced, we say that too — nicely, the
          way a friend would.
        </li>
        <li>
          <strong>Answer first, story later.</strong> Every guide opens with a Quick Answer, because
          you might be reading it on airport WiFi with 4% battery.
        </li>
        <li>
          <strong>Dates on everything.</strong> Korea changes fast. Every guide shows when it was
          last checked, and we’d rather mark a number “[VERIFY]” than guess.
        </li>
        <li>
          <strong>Respect both sides.</strong> We explain Korean customs so visitors get more out
          of Korea — and so Korea gets nicer visitors.
        </li>
      </ul>

      <h2>Who writes this</h2>
      {authors.map((a) => (
        <p key={a.slug}>
          <Link href={`/authors/${a.slug}`}>
            <strong>{a.frontmatter.name}</strong>
          </Link>{" "}
          — {a.frontmatter.role}. {a.frontmatter.shortBio}
        </p>
      ))}

      <h2>How the site is funded</h2>
      <p>
        The site is free to read and may show ads and use affiliate links, clearly disclosed in our{" "}
        <Link href="/disclaimer">Disclaimer &amp; Disclosure</Link>. Money never decides what we
        recommend — our <Link href="/editorial-policy">Editorial Policy</Link> explains the
        firewall.
      </p>

      <h2>Say hi</h2>
      <p>
        Corrections, questions, topic requests — we read everything.{" "}
        <Link href="/contact">Contact us here</Link>.
      </p>
    </LegalPage>
  );
}
