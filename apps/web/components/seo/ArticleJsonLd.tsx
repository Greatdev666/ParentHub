export function ArticleJsonLd({ article }: { article: any }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.mainImage?.url,
    datePublished: article.publishedAt,
    dateModified: article._updatedAt,
    author: { "@type": "Person", name: article.author?.name },
    publisher: { "@type": "Organization", name: "ParentHub", logo: { "@type": "ImageObject", url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.png` } },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
