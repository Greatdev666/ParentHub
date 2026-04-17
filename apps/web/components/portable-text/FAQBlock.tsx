export function FAQBlock({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="my-8 space-y-4">
      {items?.map((item, i) => (
        <details key={i} className="group rounded-xl border border-brand-navy/10 dark:border-white/10 p-4 transition-colors">
          <summary className="cursor-pointer font-medium text-brand-navy dark:text-gray-200">{item.question}</summary>
          <p className="mt-2 text-brand-navy/70 dark:text-gray-400">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
