import { ArticleHeader } from "./ArticleHeader";
import { ArticleBody } from "./ArticleBody";
import { AuthorCard } from "./AuthorCard";
import { EmailArticleForm } from "./EmailArticleForm";
import { RelatedArticles } from "./RelatedArticles";
import { ArticleJsonLd } from "../seo/ArticleJsonLd";
import { BreadcrumbJsonLd } from "../seo/BreadcrumbJsonLd";

interface ArticleViewProps {
  article: any;
  category: string;
  subcategory?: string;
}

export function ArticleView({ article, category, subcategory }: ArticleViewProps) {
  const currentPath = subcategory 
    ? `/${category}/${subcategory}/${article.slug.current}`
    : `/${category}/${article.slug.current}`;

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: category.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()), url: `/${category}` },
        { name: article.title, url: currentPath },
      ]} />
      <ArticleJsonLd article={article} />
      <ArticleHeader article={article} />
      <div className="mt-8">
        <ArticleBody body={article.body} />
      </div>
      
      <AuthorCard author={article.author} />
      
      <EmailArticleForm 
        article={article} 
        categorySlug={category} 
        subcategorySlug={subcategory || "general"} 
      />
      
      <RelatedArticles articleId={article._id} category={category} />
    </article>
  );
}
