import { FeaturedCard } from "./FeaturedCard";
import { ArticleListItem } from "./ArticleListItem";

export function LatestSection({ latest }: { latest: { featured: any; list: any[] } }) {
  if (!latest?.featured && !latest?.list?.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 lg:px-8 py-16 transition-colors">
      <div className="flex items-center gap-4 mb-10">
        <h2 className="text-4xl font-display font-bold text-brand-navy dark:text-white tracking-tight transition-colors">The Latest</h2>
        <div className="flex-1 h-px bg-brand-navy/10 dark:bg-white/10 mt-2 transition-colors"></div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Large Featured Article */}
        <div className="lg:col-span-8">
          <FeaturedCard article={latest.featured} large={true} />
        </div>

        {/* Right: Stacked Articles */}
        <div className="lg:col-span-4 flex flex-col justify-start">
          <h3 className="text-sm font-bold uppercase tracking-widest text-brand-navy/50 dark:text-gray-500 mb-6 pb-4 border-b border-brand-navy/10 dark:border-white/10 transition-colors">
            More Recent Stories
          </h3>
          <div className="flex flex-col">
            {latest.list.map((article) => (
              <ArticleListItem key={article._id} article={article} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
