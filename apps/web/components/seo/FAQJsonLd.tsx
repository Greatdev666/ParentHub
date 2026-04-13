export function FAQJsonLd({ items }: { items: { question: string; answer: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.question, acceptedAnswer: { "@type": "Answer", text: i.answer } })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
