import { notFound } from "next/navigation";
import { getCategory, getSubcategoryArticles } from "@/lib/sanity/queries";
import { ArticleCard } from "@/components/content/ArticleCard";
import type { Metadata } from "next";

type Props = { params: { category: string; subcategory: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = await getCategory(params.subcategory);
  if (!cat) return {};
  return { title: cat.title, description: cat.description };
}

export default async function SubcategoryPage({ params }: Props) {
  const cat = await getCategory(params.subcategory);
  if (!cat) notFound();
  
  const articles = await getSubcategoryArticles(params.category, params.subcategory);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-display font-bold text-brand-navy dark:text-gray-100">{cat.title}</h1>
      <p className="mt-2 text-lg text-brand-navy/70 dark:text-gray-400">{cat.description}</p>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles?.map((a: any) => <ArticleCard key={a._id} article={a} />)}
      </div>
      
      {(!articles || articles.length === 0) && (
        <p className="mt-8 text-neutral-500 dark:text-gray-500">No articles found for this subcategory yet.</p>
      )}
    </section>
  );
}
