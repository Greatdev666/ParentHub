import Link from "next/link";
import { FeaturedCard } from "./FeaturedCard";
import { ArticleListItem } from "./ArticleListItem";

export function CategorySection({ category }: { category: { title: string; slug?: string; featured: any; articles: any[]; layout: "left" | "right" } }) {
  if (!category?.featured && !category?.articles?.length) return null;

  const isLeft = category.layout === "left";
  const categorySlug = category.slug || category.title.toLowerCase().replace(/\s+/g, '-');

  return (
    <section className="mx-auto max-w-7xl px-4 lg:px-8 py-16 border-t border-brand-navy/5 dark:border-white/5 transition-colors">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-navy dark:text-white tracking-tight text-center transition-colors">
          {category.title}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Featured Block */}
        <div className={`lg:col-span-6 xl:col-span-7 ${isLeft ? 'lg:order-1' : 'lg:order-2'}`}>
          <FeaturedCard article={category.featured} large={false} />
        </div>

        {/* List Block */}
        <div className={`lg:col-span-6 xl:col-span-5 flex flex-col ${isLeft ? 'lg:order-2' : 'lg:order-1'}`}>
          <div className="flex flex-col flex-1">
            {category.articles.map((article) => (
              <ArticleListItem key={article._id} article={article} />
            ))}
          </div>
          
          <div className="mt-8 flex justify-start">
            <Link 
              href={`/${categorySlug}`}
              className="group flex items-center gap-2 text-brand-teal font-bold tracking-widest uppercase text-xs hover:gap-3 transition-all duration-200"
            >
              See More
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
