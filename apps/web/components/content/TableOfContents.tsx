export function TableOfContents({ headings }: { headings: { text: string; level: number; id: string }[] }) {
  if (!headings?.length) return null;
  return (
    <nav className="rounded-xl border border-brand-navy/10 p-5 mb-8">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-navy/50 mb-3">In this article</h2>
      <ul className="space-y-2">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: `${(h.level - 2) * 16}px` }}>
            <a href={`#${h.id}`} className="text-sm text-brand-navy/70 hover:text-brand-teal transition">{h.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
