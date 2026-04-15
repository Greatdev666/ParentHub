import React from "react";
import Link from "next/link";
import { Clock } from "lucide-react";

interface ArticleReference {
  _id: string;
  title: string;
  slug: { current: string };
  category?: { title: string; slug: { current: string } };
  readingTime?: number;
}

interface ArticleEmbedListProps {
  title?: string;
  articles: ArticleReference[];
}

export function ArticleEmbedList({ title, articles }: ArticleEmbedListProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="my-10 flex flex-col gap-3">
      <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-brand-navy/40 mb-2 ml-2">
        {title || "In this post"}
      </h3>
      
      <div className="flex flex-col gap-3">
        {articles.map((article, i) => {
          const categorySlug = article.category?.slug?.current;
          const href = categorySlug 
            ? `/${categorySlug}/${article.slug?.current}` 
            : `/${article.slug?.current}`;

          return (
            <Link 
              key={article._id || i}
              href={href}
              className="group flex flex-col gap-1.5 bg-[#FFF9F6] dark:bg-brand-dark-card border border-[#FFEDE0] dark:border-white/5 rounded-2xl p-4 md:px-6 md:py-4 hover:border-[#FDBA74] hover:shadow-sm transition-all duration-300 no-underline"
            >
            <span className="text-lg md:text-[1.3rem] font-display font-bold text-[#A34E24] dark:text-brand-orange group-hover:text-brand-orange-dark transition-colors duration-300 leading-tight">
              {article.title}
            </span>
            
            <div className="flex items-center gap-3 text-[10px] font-bold text-brand-navy/40 dark:text-gray-400 uppercase tracking-widest leading-none">
              <span>{article.category?.title || "Editorial"}</span>
              {article.readingTime && (
                <>
                  <span className="w-1 h-1 rounded-full bg-[#A34E24]/20" />
                  <span>{article.readingTime} min read</span>
                </>
              )}
            </div>
          </Link>
        );
      })}
      </div>
    </div>
  );
}
