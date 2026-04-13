type BreadcrumbItem = { label: string; href?: string };
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-brand-navy/50 mb-6">
      <ol className="flex items-center gap-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span>/</span>}
            {item.href ? <a href={item.href} className="hover:text-brand-teal transition">{item.label}</a> : <span className="text-brand-navy">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
