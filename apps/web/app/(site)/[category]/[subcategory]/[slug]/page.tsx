import { notFound } from "next/navigation";
import { getArticle } from "@/lib/sanity/queries";
import { ArticleHeader } from "@/components/content/ArticleHeader";
import { ArticleBody } from "@/components/content/ArticleBody";
import { AuthorCard } from "@/components/content/AuthorCard";
import { EmailArticleForm } from "@/components/content/EmailArticleForm";
import { RelatedArticles } from "@/components/content/RelatedArticles";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
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
    <article className="mx-auto max-w-3xl px-4 py-12">
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: params.category, url: `/${params.category}` },
        { name: article.title, url: `/${params.category}/${params.subcategory}/${params.slug}` },
      ]} />
      <ArticleJsonLd article={article} />
      <ArticleHeader article={article} />
      <ArticleBody body={article.body} />
      
      <AuthorCard author={article.author} />
      
      <EmailArticleForm 
        article={article} 
        categorySlug={params.category} 
        subcategorySlug={params.subcategory} 
      />
      
      <RelatedArticles articleId={article._id} category={params.category} />
    </article>
  );
}
