type Item = { name: string; url: string };
export function BreadcrumbJsonLd({ items }: { items: Item[] }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: `${baseUrl}${item.url}` })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
