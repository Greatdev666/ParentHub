import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";

export function ArticleListItem({ article }: { article: any }) {
  if (!article) return null;

  const catSlug = article.category?.slug?.current || article.category?.slug;
  const subSlug = article.subcategory?.slug?.current || article.subcategory?.slug;
  const artSlug = article.slug?.current || article.slug;
  const href = subSlug ? `/${catSlug}/${subSlug}/${artSlug}` : `/${catSlug}/${artSlug}`;

  const imageSrc = urlForImage(article.mainImage).url();

  return (
    <Link href={href} className="group flex gap-5 py-5 border-b border-brand-navy/10 dark:border-white/10 last:border-0 items-start transition-colors">
      <div className="relative w-28 md:w-32 shrink-0 aspect-square overflow-hidden rounded-lg bg-neutral-100 dark:bg-brand-dark-card shadow-card dark:shadow-card-dark group-hover:shadow-card-hover dark:group-hover:shadow-card-dark-hover transition-shadow duration-300">
        <Image
          src={imageSrc}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="128px"
        />
      </div>
      <div className="flex flex-col flex-1 justify-center min-h-[7rem]">
        {article.category && (
          <span className="text-xs font-bold uppercase tracking-widest text-brand-teal mb-2 block">
            {article.category.title}
          </span>
        )}
        <h3 className="text-lg md:text-xl font-display font-semibold leading-tight text-brand-navy dark:text-white group-hover:text-brand-teal transition-colors duration-200 mb-2 line-clamp-3">
          {article.title}
        </h3>
        {article.author && (
          <span className="text-sm text-brand-navy/50 dark:text-gray-500 transition-colors">
            By {article.author.name}
          </span>
        )}
      </div>
    </Link>
  );
}
