export function FaqSection({ faqs }: { faqs: { question: string; answer: string }[] }) {
  if (faqs.length === 0) return null;
  return (
    <section aria-labelledby="faq-heading" className="mt-12">
      <h2 id="faq-heading" className="text-2xl font-bold text-ink">
        Frequently asked questions
      </h2>
      <div className="mt-4 divide-y divide-sand rounded-xl border border-sand bg-white">
        {faqs.map((f) => (
          <details key={f.question} className="group px-5 py-4">
            <summary className="cursor-pointer list-none font-semibold text-ink marker:content-none">
              <span className="mr-2 inline-block text-accent transition-transform group-open:rotate-90">
                ›
              </span>
              {f.question}
            </summary>
            <p className="mt-2 pl-5 leading-relaxed text-ink/80">{f.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
