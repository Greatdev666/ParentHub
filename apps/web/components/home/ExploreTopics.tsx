import Link from "next/link";

export function ExploreTopics({ categories }: { categories: any[] }) {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="bg-brand-navy/5 dark:bg-brand-dark-card/50 py-14 md:py-16 border-y border-brand-navy/10 dark:border-white/5 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="text-center text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-brand-navy/60 dark:text-gray-500 mb-8 transition-colors">
          Explore Topics
        </h2>
        
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {categories.map((cat) => (
            <Link 
              key={cat._id || cat.slug}
              href={`/${cat.slug}`}
              className="group relative px-6 py-3 md:px-8 md:py-4 bg-white dark:bg-brand-dark-card border border-brand-navy/10 dark:border-brand-dark-border rounded-full font-display font-semibold text-brand-navy dark:text-white md:text-lg shadow-sm hover:shadow-card dark:hover:shadow-card-dark hover:border-brand-teal dark:hover:border-brand-teal hover:text-brand-teal transition-all duration-300 transform hover:-translate-y-0.5 text-center"
            >
              {cat.title}
              {cat.description && (
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-2 bg-brand-navy dark:bg-white text-white dark:text-brand-navy text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap max-w-[250px] truncate">
                  {cat.description}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
