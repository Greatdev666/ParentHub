import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";

export function FeaturedPost({ article }: { article: any }) {
  if (!article) return null;

  const catSlug = article.category?.slug?.current || article.category?.slug;
  const subSlug = article.subcategory?.slug?.current || article.subcategory?.slug;
  const artSlug = article.slug?.current || article.slug;
  const href = subSlug ? `/${catSlug}/${subSlug}/${artSlug}` : `/${catSlug}/${artSlug}`;

  const imageSrc = urlForImage(article.mainImage).url();

  return (
    <section className="mx-auto max-w-7xl px-4 lg:px-8 py-12 pt-0">
      <Link href={href} className="group relative block w-full bg-brand-navy rounded-xl overflow-hidden shadow-card-hover dark:shadow-card-dark-hover">
        {/* Background Image */}
        <div className="relative w-full aspect-[4/3] md:aspect-[21/9] overflow-hidden opacity-90 group-hover:opacity-100 transition-opacity duration-500">
          <Image
            src={imageSrc}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            sizes="100vw"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-transparent md:bg-gradient-to-r md:from-brand-navy md:via-brand-navy/80 md:to-transparent" />
        </div>

        {/* Text */}
        <div className="absolute inset-0 flex flex-col justify-end md:justify-center p-6 md:p-12 lg:p-20 text-white w-full md:max-w-[65%]">
          {article.category && (
            <span className="inline-block px-3 py-1 bg-brand-teal text-white text-xs font-bold uppercase tracking-widest mb-4 md:mb-6 w-fit rounded-sm">
              {article.category.title}
            </span>
          )}
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-4 group-hover:underline underline-offset-8 decoration-4 decoration-brand-teal/60">
            {article.title}
          </h2>
          
          <p className="text-white/80 line-clamp-2 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mb-6">
            {article.excerpt}
          </p>
          
          {article.author && (
            <div className="flex items-center gap-3 pt-6 border-t border-white/20 w-fit pr-8">
              {article.author.image && (
                <Image 
                  src={urlForImage(article.author.image).url()} 
                  alt={article.author.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover w-10 h-10 border-2 border-white/20"
                />
              )}
              <span className="text-sm md:text-base font-bold text-white/90 uppercase tracking-widest">
                By {article.author.name}
              </span>
            </div>
          )}
        </div>
      </Link>
    </section>
  );
}
