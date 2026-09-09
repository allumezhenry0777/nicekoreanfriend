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
          <strong>Honest advice, without the tourist hype.</strong> We share what locals genuinely
          think — what is worth your time, what is not, and what you should know before you go.
        </li>
        <li>
          <strong>Practical answers, clearly explained.</strong> We start with the information you
          need most, then add the context that helps you understand Korea better.
        </li>
        <li>
          <strong>Local insight with a global perspective.</strong> We combine firsthand knowledge
          of Korea with an understanding of the questions and challenges international visitors
          often face.
        </li>
        <li>
          <strong>Current and carefully checked.</strong> Korea changes quickly, so we review our
          guides regularly and clearly note when information may need confirmation.
        </li>
        <li>
          <strong>Respect goes both ways.</strong> We help visitors understand Korean culture and
          customs so they can explore with confidence, curiosity, and consideration.
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
