import { urlForImage } from "@/lib/sanity/image";
import { Badge } from "@/components/ui";
import { formatDate } from "@/lib/utils/formatting";

export function ArticleHeader({ article }: { article: any }) {
  return (
    <header className="mb-10 transition-colors">
      {article.category && <Badge variant="teal" className="mb-4">{article.category.title}</Badge>}
      <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight text-balance text-brand-navy dark:text-white transition-colors">
        {article.title}
      </h1>
      <p className="mt-4 text-lg text-brand-navy/60 dark:text-gray-300 transition-colors">
        {article.excerpt}
      </p>
      <div className="mt-6 flex items-center gap-4">
        {article.author?.image && (
          <img 
            src={urlForImage(article.author.image).width(48).height(48).url()} 
            alt={article.author.name} 
            className="w-12 h-12 rounded-full object-cover border-2 border-brand-navy/5 dark:border-white/10" 
          />
        )}
        <div className="flex flex-col text-sm">
          <p className="font-bold text-brand-navy dark:text-gray-100">{article.author?.name}</p>
          {article.author?.role && (
            <p className="text-brand-navy/60 dark:text-gray-400 italic">
              {article.author.role}
            </p>
          )}
          <p className="mt-1 text-brand-navy/50 dark:text-gray-500">
            {formatDate(article.publishedAt)} &middot; {article.readingTime || 5} min read
          </p>
        </div>
      </div>
      {article.mainImage && (
        <img src={urlForImage(article.mainImage).width(1200).height(630).url()} alt={article.mainImage.alt || article.title} className="mt-8 w-full rounded-2xl object-cover aspect-video" />
      )}
    </header>
  );
}
