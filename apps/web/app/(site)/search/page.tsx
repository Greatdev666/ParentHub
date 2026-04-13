import { searchArticles } from "@/lib/sanity/queries";
import { ArticleCard } from "@/components/content/ArticleCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Results | ParentHub",
  description: "Search for parenting advice, expert articles, and tips on ParentHub.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = typeof searchParams.q === "string" ? searchParams.q : "";
  let results: any[] = [];

  if (query.trim().length > 0) {
    results = await searchArticles(query);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 lg:px-8 py-12 md:py-20">
      <header className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-navy dark:text-white mb-4">
          Search Results
        </h1>
        {query ? (
          <p className="text-xl text-brand-navy/70 dark:text-gray-400">
            Showing results for <span className="font-bold text-brand-teal">"{query}"</span>
          </p>
        ) : (
          <p className="text-xl text-brand-navy/70 dark:text-gray-400">
            Enter a keyword in the navigation bar to start searching.
          </p>
        )}
      </header>

      {query.trim().length > 0 && (
        <>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-brand-navy/5 dark:bg-white/5 rounded-3xl">
              <h2 className="text-2xl font-bold text-brand-navy dark:text-white mb-4">
                No matches found
              </h2>
              <p className="text-brand-navy/70 dark:text-gray-400 max-w-md mx-auto">
                We couldn't find any articles matching exactly "{query}". Try checking your spelling or using broader keywords like "toddler" or "sleep".
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
