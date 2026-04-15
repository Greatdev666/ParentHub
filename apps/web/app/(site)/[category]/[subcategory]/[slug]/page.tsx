import { notFound } from "next/navigation";
import { getArticle } from "@/lib/sanity/queries";
import { ArticleView } from "@/components/content/ArticleView";
import type { Metadata } from "next";

type Props = { params: { category: string; subcategory: string; slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle(params.slug);
  if (!article) return {};
  return {
    title: article.seo?.title || article.title,
    description: article.seo?.description || article.excerpt,
    openGraph: { type: "article", title: article.title, images: article.mainImage ? [{ url: article.mainImage.url }] : [] },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticle(params.slug);
  if (!article) notFound();
  
  return (
    <ArticleView 
      article={article} 
      category={params.category} 
      subcategory={params.subcategory} 
    />
  );
}
