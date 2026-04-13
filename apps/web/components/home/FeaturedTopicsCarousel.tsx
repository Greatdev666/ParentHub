"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";

export function FeaturedTopicsCarousel({ articles }: { articles: any[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (!articles || articles.length === 0) return null;

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-20 relative overflow-hidden transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy dark:text-white tracking-tight mb-2 transition-colors">
              Featured Topics
            </h2>
            <p className="text-brand-navy/60 dark:text-gray-500 text-lg transition-colors">Editor's picks and trending stories</p>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <Link href="/featured-topics" className="text-sm font-bold tracking-widest text-brand-teal hover:underline uppercase mr-4">
              See All
            </Link>
            <button 
              onClick={scrollLeft}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-brand-dark-card border border-brand-navy/10 dark:border-brand-dark-border text-brand-navy dark:text-gray-300 hover:text-brand-teal hover:border-brand-teal transition-colors shadow-sm"
              aria-label="Scroll left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button 
              onClick={scrollRight}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-brand-dark-card border border-brand-navy/10 dark:border-brand-dark-border text-brand-navy dark:text-gray-300 hover:text-brand-teal hover:border-brand-teal transition-colors shadow-sm"
              aria-label="Scroll right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative -mx-4 px-4 lg:mx-0 lg:px-0">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar"
          >
            {articles.map((article) => {
              const catSlug = article.category?.slug?.current || article.category?.slug;
              const subSlug = article.subcategory?.slug?.current || article.subcategory?.slug;
              const artSlug = article.slug?.current || article.slug;
              const href = subSlug ? `/${catSlug}/${subSlug}/${artSlug}` : `/${catSlug}/${artSlug}`;

              return (
                <Link 
                  key={article._id}
                  href={href}
                  className="group flex-none w-[300px] md:w-[340px] bg-white dark:bg-brand-dark-card rounded-2xl overflow-hidden border border-brand-navy/10 dark:border-brand-dark-border shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-dark-hover transition-all duration-300 snap-start flex flex-col hover:-translate-y-1"
                >
                  <div className="relative w-full aspect-[16/10] bg-brand-navy/5 dark:bg-brand-dark overflow-hidden">
                    <Image
                      src={urlForImage(article.mainImage).url()}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 300px, 340px"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    {article.category && (
                      <span className="text-xs font-bold uppercase tracking-widest text-brand-teal mb-2 block">
                        {article.category.title}
                      </span>
                    )}
                    <h3 className="text-xl font-display font-bold text-brand-navy dark:text-white mb-2 group-hover:text-brand-teal transition-colors line-clamp-2 leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-brand-navy/70 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 transition-colors">
                      {article.excerpt}
                    </p>
                    {article.author && (
                      <div className="mt-auto pt-3 flex items-center gap-2 border-t border-brand-navy/5 dark:border-white/5 mt-3 transition-colors">
                        {article.author.image && (
                          <Image
                            src={urlForImage(article.author.image).url()}
                            alt={article.author.name}
                            width={24}
                            height={24}
                            className="rounded-full object-cover w-6 h-6"
                          />
                        )}
                        <span className="text-xs text-brand-navy/50 dark:text-gray-500 uppercase tracking-widest font-bold transition-colors">
                          By {article.author.name}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex justify-center md:hidden">
          <Link href="/featured-topics" className="text-sm font-bold tracking-widest text-brand-teal hover:underline uppercase">
            See All Featured &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
