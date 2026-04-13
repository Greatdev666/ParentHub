import Link from "next/link";
import { urlForImage } from "@/lib/sanity/image";

export function AuthorCard({ author }: { author: any }) {
  if (!author) return null;

  return (
    <div className="my-12 p-6 md:p-8 rounded-2xl bg-brand-navy/5 dark:bg-brand-dark-card border border-brand-navy/10 dark:border-white/5 flex flex-col md:flex-row gap-6 items-start md:items-center">
      {author.image && (
        <img
          src={urlForImage(author.image).width(120).height(120).url()}
          alt={author.name}
          className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shrink-0 ring-4 ring-white dark:ring-brand-navy"
        />
      )}
      <div className="flex-grow">
        <h3 className="text-xl font-display font-bold text-brand-navy dark:text-white">
          {author.name}
        </h3>
        {author.role && (
          <p className="text-sm font-bold text-brand-orange uppercase tracking-wider mt-1">
            {author.role}
          </p>
        )}
        {author.shortBio && (
          <p className="mt-3 text-brand-navy/70 dark:text-gray-400 text-sm md:text-base leading-relaxed">
            {author.shortBio}
          </p>
        )}
      </div>
      {author.slug && (
        <div className="shrink-0 mt-4 md:mt-0">
          <Link
            href={`/author/${author.slug}`}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-brand-teal text-white font-bold text-sm hover:bg-brand-teal/90 transition-colors"
          >
            Read full bio
          </Link>
        </div>
      )}
    </div>
  );
}
