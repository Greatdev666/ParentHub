import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";

export function FeaturedCard({ article, large = false }: { article: any; large?: boolean }) {
  if (!article) return null;

  const catSlug = article.category?.slug?.current || article.category?.slug;
  const subSlug = article.subcategory?.slug?.current || article.subcategory?.slug;
  const artSlug = article.slug?.current || article.slug;
  const href = subSlug ? `/${catSlug}/${subSlug}/${artSlug}` : `/${catSlug}/${artSlug}`;

  const imageSrc = urlForImage(article.mainImage).url();

  return (
    <Link href={href} className="group block h-full flex flex-col">
      <div className={`relative w-full overflow-hidden rounded-lg mb-6 shadow-card dark:shadow-card-dark group-hover:shadow-card-hover dark:group-hover:shadow-card-dark-hover transition-shadow duration-300 ${large ? 'aspect-[4/3] lg:aspect-[16/9]' : 'aspect-square md:aspect-[4/3]'}`}>
        <Image
          src={imageSrc}
          alt={article.title}
          fill
          className="object-cover bg-neutral-100 dark:bg-brand-dark-card group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="flex flex-col flex-1">
        {article.category && (
          <span className="text-xs font-bold uppercase tracking-widest text-brand-teal mb-3 block">
            {article.category.title}
          </span>
        )}
        <h3 className={`font-display font-bold text-brand-navy dark:text-white leading-tight mb-3 group-hover:text-brand-teal transition-colors duration-200 ${large ? 'text-3xl lg:text-5xl' : 'text-2xl lg:text-3xl'}`}>
          {article.title}
        </h3>
        <p className="text-brand-navy/70 dark:text-gray-400 line-clamp-3 text-lg leading-relaxed transition-colors">
          {article.excerpt}
        </p>
        
        {article.author && (
          <div className="mt-auto flex items-center gap-3 pt-4 border-t border-brand-navy/10 dark:border-white/10 mt-4 transition-colors">
            {article.author.image && (
              <Image 
                src={urlForImage(article.author.image).url()} 
                alt={article.author.name}
                width={32}
                height={32}
                className="rounded-full object-cover w-8 h-8"
              />
            )}
            <span className="text-sm font-medium text-brand-navy/60 dark:text-gray-500 transition-colors">
              By {article.author.name}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
