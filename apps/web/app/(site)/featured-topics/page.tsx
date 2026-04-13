import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/lib/sanity/fetch";
import { urlForImage } from "@/lib/sanity/image";

export const metadata = {
  title: "Featured Topics | ParentHub",
  description: "Browse our editor's picks and most popular featured articles.",
};

async function getFeaturedArticles() {
  return sanityFetch({
    query: `*[_type == "article" && featured == true] | order(publishedAt desc) {
      _id, title, slug, excerpt, mainImage, publishedAt, readingTime,
      category->{slug, title}, subcategory->{slug, title}, author->{name, image}
    }`,
    tags: ["article"],
  });
}

export default async function FeaturedTopicsPage() {
  const articles = await getFeaturedArticles();

  return (
    <div className="transition-colors">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#F4F9F9] to-[#E5F2F2] dark:from-brand-dark dark:to-brand-dark-card pt-20 pb-16 md:pt-28 md:pb-20 border-b border-brand-navy/5 dark:border-white/5 transition-colors">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-brand-navy dark:text-white tracking-tight mb-6 transition-colors">
            Featured Topics
          </h1>
          <p className="text-xl md:text-2xl text-brand-navy/70 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed transition-colors">
            Editor's picks — our most impactful, heavily researched, and reader-favorite articles.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="mx-auto max-w-7xl px-4 lg:px-8 py-16 md:py-24">
        {articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article: any) => {
              const catSlug = article.category?.slug?.current || article.category?.slug;
              const subSlug = article.subcategory?.slug?.current || article.subcategory?.slug;
              const artSlug = article.slug?.current || article.slug;
              const href = subSlug ? `/${catSlug}/${subSlug}/${artSlug}` : `/${catSlug}/${artSlug}`;

              return (
                <Link
                  key={article._id}
                  href={href}
                  className="group bg-white dark:bg-brand-dark-card rounded-2xl overflow-hidden border border-brand-navy/10 dark:border-brand-dark-border shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-dark-hover transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  <div className="relative w-full aspect-[16/10] bg-brand-navy/5 dark:bg-brand-dark overflow-hidden">
                    <Image
                      src={urlForImage(article.mainImage).url()}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    {article.category && (
                      <span className="text-xs font-bold uppercase tracking-widest text-brand-teal mb-2 block">
                        {article.category.title}
                      </span>
                    )}
                    <h2 className="text-xl md:text-2xl font-display font-bold text-brand-navy dark:text-white mb-3 group-hover:text-brand-teal transition-colors leading-tight line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-brand-navy/70 dark:text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4 transition-colors">
                      {article.excerpt}
                    </p>
                    {article.author && (
                      <div className="mt-auto pt-3 flex items-center gap-2 border-t border-brand-navy/5 dark:border-white/5 transition-colors">
                        {article.author.image && (
                          <Image
                            src={urlForImage(article.author.image).url()}
                            alt={article.author.name}
                            width={28}
                            height={28}
                            className="rounded-full object-cover w-7 h-7"
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
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-brand-navy/50 dark:text-gray-500 transition-colors">
              No featured articles yet. Toggle the "Featured" switch on articles in the CMS to see them here.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
