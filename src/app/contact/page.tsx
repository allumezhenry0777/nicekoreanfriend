import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Ask a question, report something outdated, or suggest a topic — the Nice Korean Friend team reads everything.",
  alternates: { canonical: absoluteUrl("/contact") },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact" }]} />
      <h1 className="mt-6 text-3xl font-extrabold text-ink">Contact us</h1>
      <p className="mt-3 leading-relaxed text-ink/70">
        Found something outdated? Have a question a guide didn’t answer? Want us to cover a topic?
        Write below — corrections jump the queue. You can also email{" "}
        <a href={`mailto:${site.email}`} className="text-accent underline">
          {site.email}
        </a>
        .
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </div>
  );
}
