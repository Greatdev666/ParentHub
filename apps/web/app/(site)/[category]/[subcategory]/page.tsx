import { notFound } from "next/navigation";
import { getCategory, getSubcategoryArticles, getArticle } from "@/lib/sanity/queries";
import { ArticleCard } from "@/components/content/ArticleCard";
import { ArticleView } from "@/components/content/ArticleView";
import type { Metadata } from "next";

type Props = { params: { category: string; subcategory: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Try Category first
  const cat = await getCategory(params.subcategory);
  if (cat) return { title: cat.title, description: cat.description };

  // Try Article second
  const article = await getArticle(params.subcategory);
  if (article) {
    return {
      title: article.seo?.title || article.title,
      description: article.seo?.description || article.excerpt,
    };
  }

  return {};
}

export default async function SubcategoryPage({ params }: Props) {
  // Try to find a subcategory first
  const cat = await getCategory(params.subcategory);
  
  if (!cat) {
    // If no category remains, try to find an article with this slug
    const article = await getArticle(params.subcategory);
    
    // If it's an article, render the article view
    if (article) {
      return (
        <ArticleView 
          article={article} 
          category={params.category} 
        />
      );
    }
    
    // If neither, then not found
    notFound();
  }
  
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
