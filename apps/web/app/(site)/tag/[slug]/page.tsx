import { getTagArticles } from "@/lib/sanity/queries";
import { ArticleCard } from "@/components/content/ArticleCard";
type Props = { params: { slug: string } };
export default async function TagPage({ params }: Props) {
  const articles = await getTagArticles(params.slug);
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-display font-bold capitalize">#{params.slug.replace(/-/g, " ")}</h1>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((a: any) => <ArticleCard key={a._id} article={a} />)}
      </div>
    </section>
  );
}
