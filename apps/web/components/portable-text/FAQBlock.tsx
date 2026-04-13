export function FAQBlock({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="my-8 space-y-4">
      {items?.map((item, i) => (
        <details key={i} className="group rounded-xl border border-brand-navy/10 p-4">
          <summary className="cursor-pointer font-medium">{item.question}</summary>
          <p className="mt-2 text-brand-navy/70">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
