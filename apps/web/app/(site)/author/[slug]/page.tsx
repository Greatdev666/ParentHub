import { notFound } from "next/navigation";
import { getAuthorBySlug, getArticlesByAuthor } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/components/portable-text/serializers";
import { ArticleCard } from "@/components/content/ArticleCard";
import type { Metadata } from "next";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const author = await getAuthorBySlug(params.slug);
  if (!author) return {};
  return {
    title: `${author.name} | Author at ParentHub`,
    description: author.shortBio || `Read articles by ${author.name} on ParentHub.`,
  };
}

export default async function AuthorPage({ params }: Props) {
  const author = await getAuthorBySlug(params.slug);
  if (!author) notFound();

  const articles = await getArticlesByAuthor(author._id);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:py-20">
      {/* Profile Header */}
      <header className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
        {author.image && (
          <img
            src={urlForImage(author.image).width(200).height(200).url()}
            alt={author.name}
            className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover shrink-0 ring-4 ring-brand-teal/10 dark:ring-white/10"
          />
        )}
        <div className="flex-grow text-center md:text-left mt-4 md:mt-0">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-navy dark:text-white">
            {author.name}
          </h1>
          {author.role && (
            <p className="mt-3 text-lg font-bold text-brand-orange uppercase tracking-wider">
              {author.role}
            </p>
          )}
          
          {author.socialLinks && (
            <div className="mt-6 flex gap-4 justify-center md:justify-start">
              {author.socialLinks.twitter && (
                <a href={author.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-brand-teal hover:text-brand-navy dark:hover:text-white underline underline-offset-4 text-sm font-bold transition-colors">
                  Twitter
                </a>
              )}
              {author.socialLinks.linkedin && (
                <a href={author.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-brand-teal hover:text-brand-navy dark:hover:text-white underline underline-offset-4 text-sm font-bold transition-colors">
                  LinkedIn
                </a>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Expertise Tags */}
      {author.expertise && author.expertise.length > 0 && (
        <section className="mb-12">
          <h2 className="text-sm font-bold text-brand-navy/60 dark:text-gray-400 uppercase tracking-widest mb-4 text-center md:text-left">
            Areas of Expertise
          </h2>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {author.expertise.map((tag: string, i: number) => (
              <span key={i} className="px-4 py-1.5 bg-brand-navy/5 dark:bg-white/10 text-brand-navy dark:text-white rounded-full text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Full Bio */}
      {author.fullBio && (
        <section className="mb-20 prose prose-lg prose-brand dark:prose-invert max-w-none text-brand-navy/80 dark:text-gray-300">
          <PortableText value={author.fullBio} components={portableTextComponents} />
        </section>
      )}

      {/* Recent Articles */}
      <section>
        <h2 className="text-3xl font-display font-bold text-brand-navy dark:text-white mb-8 border-t border-brand-navy/10 dark:border-white/10 pt-12">
          Articles by {author.name}
        </h2>
        
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article: any) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-brand-navy/60 dark:text-gray-400 text-center py-10 bg-brand-navy/5 dark:bg-white/5 rounded-2xl">
            No articles published yet.
          </p>
        )}
      </section>
    </div>
  );
}
