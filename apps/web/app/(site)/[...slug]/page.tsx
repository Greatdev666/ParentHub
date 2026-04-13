import { notFound } from "next/navigation";
import { getPage } from "@/lib/sanity/queries";
import { ArticleBody } from "@/components/content/ArticleBody";
import type { Metadata } from "next";

type Props = { params: { slug: string[] } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug.join("/");
  const page = await getPage(slug);
  if (!page) {
    return {
      title: slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
    };
  }
  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description,
  };
}

export default async function StaticPage({ params }: Props) {
  const slug = params.slug.join("/");
  const page = await getPage(slug);

  // Formatting the display title from the slug
  const displayTitle = slug.split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const placeholderContent = (
    <div className="mx-auto max-w-4xl px-4 py-24">
      <h1 className="text-5xl md:text-6xl font-display font-bold mb-12 text-brand-navy border-b pb-8">
        {displayTitle}
      </h1>
      <div className="prose prose-xl max-w-none text-brand-navy/80 space-y-8 leading-relaxed">
        <p className="font-semibold text-2xl text-brand-teal">
          This page is currently being updated with our latest expert resources. 
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <div className="bg-brand-teal/5 p-8 rounded-2xl border border-brand-teal/10 my-12">
          <p className="m-0 italic">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          </p>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );

  if (!page) {
    // Return dummy content instead of 404 as requested
    return placeholderContent;
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-24 font-inter">
      <h1 className="text-5xl md:text-6xl font-display font-bold mb-12 text-brand-navy dark:text-white border-b border-brand-navy/10 dark:border-white/10 pb-8 transition-colors">
        {page.title}
      </h1>
      <div className="transition-colors">
        <ArticleBody body={page.body} />
      </div>
    </article>
  );
}
