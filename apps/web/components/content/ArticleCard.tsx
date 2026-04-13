import Link from "next/link";
import { Card } from "@/components/ui";
import { Badge } from "@/components/ui";
import { urlForImage } from "@/lib/sanity/image";

export function ArticleCard({ article }: { article: any }) {
  const catSlug = article.category?.slug?.current || article.category?.slug;
  const subSlug = article.subcategory?.slug?.current || article.subcategory?.slug;
  const artSlug = article.slug?.current || article.slug;
  
  const href = subSlug ? `/${catSlug}/${subSlug}/${artSlug}` : `/${catSlug}/${artSlug}`;

  return (
    <Card>
      {article.mainImage && (
        <Link href={href}>
          <img src={urlForImage(article.mainImage).width(600).height(340).url()} alt={article.mainImage.alt || article.title} className="aspect-video w-full object-cover" loading="lazy" />
        </Link>
      )}
      <div className="p-5">
        {article.category && <Badge variant="teal">{article.category.title}</Badge>}
        <Link href={href}>
          <h3 className="mt-2 text-lg font-display font-semibold text-brand-navy dark:text-gray-100 hover:text-brand-teal dark:hover:text-brand-teal transition line-clamp-2">
            {article.title}
          </h3>
        </Link>
        <p className="mt-2 text-sm text-brand-navy/60 dark:text-gray-400 line-clamp-2">
          {article.excerpt}
        </p>
        <div className="mt-4 flex items-center gap-2 text-xs text-brand-navy/40 dark:text-gray-500">
          {article.author?.name && <span>By {article.author.name}</span>}
          {article.readingTime && <span>&middot; {article.readingTime} min read</span>}
        </div>
      </div>
    </Card>
  );
}
