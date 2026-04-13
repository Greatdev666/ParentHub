import { getRelatedArticles } from "@/lib/sanity/queries";
import { ArticleCard } from "./ArticleCard";

export async function RelatedArticles({ articleId, category }: { articleId: string; category: string }) {
  const articles = await getRelatedArticles(articleId, category);
  if (!articles?.length) return null;
  return (
    <section className="mt-16 border-t border-brand-navy/10 pt-12">
      <h2 className="text-2xl font-display font-semibold mb-8">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((a: any) => <ArticleCard key={a._id} article={a} />)}
      </div>
    </section>
  );
}
