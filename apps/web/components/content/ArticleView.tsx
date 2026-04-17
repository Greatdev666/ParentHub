import { ArticleHeader } from "./ArticleHeader";
import { ArticleBody } from "./ArticleBody";
import { AuthorCard } from "./AuthorCard";
import { EmailArticleForm } from "./EmailArticleForm";
import { RelatedArticles } from "./RelatedArticles";
import { TableOfContents } from "./TableOfContents";
import { CommentSection } from "../interactive/comments/CommentSection";
import { LikeAction } from "../interactive/comments/LikeAction";
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
    <div className="mx-auto max-w-7xl px-4 py-12">
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: category.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()), url: `/${category}` },
        { name: article.title, url: currentPath },
      ]} />
      <ArticleJsonLd article={article} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content Column */}
        <article className="lg:col-span-8">
          <ArticleHeader article={article} />
          
          {/* Mobile Table of Contents (Hidden on Large Screens) */}
          <div className="lg:hidden mt-8">
            <TableOfContents body={article.body} />
          </div>

          <div className="mt-8">
            <ArticleBody body={article.body} />
          </div>
          
          <div className="mt-8 flex justify-start items-center gap-3">
             <span className="text-sm font-bold uppercase tracking-widest text-brand-navy/50 dark:text-gray-400">Loved this article?</span>
             <LikeAction id={article._id} type="article" initialLikes={article.likes} showCount={true} className="border border-brand-navy/10 dark:border-white/10 rounded-full px-4 py-2 hover:bg-brand-navy/5 dark:hover:bg-white/5" />
          </div>
          
          <CommentSection articleId={article._id} />

          <EmailArticleForm 
            article={article} 
            categorySlug={category} 
            subcategorySlug={subcategory || "general"} 
          />

          <AuthorCard author={article.author} />

          <RelatedArticles articleId={article._id} category={category} />
        </article>

        {/* Sidebar Column (Desktop Only) */}
        <aside className="hidden lg:block lg:col-span-4">
          <TableOfContents body={article.body} />
        </aside>
      </div>
    </div>
  );
}
