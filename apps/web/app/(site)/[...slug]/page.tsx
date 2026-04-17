import { notFound, redirect } from "next/navigation";
import { getPage, getArticle, getCategory, getCategoryArticles, getSubcategoryArticles } from "@/lib/sanity/queries";
import { ArticleBody } from "@/components/content/ArticleBody";
import { ArticleView } from "@/components/content/ArticleView";
import { ArticleCard } from "@/components/content/ArticleCard";
import type { Metadata } from "next";

type Props = { params: { slug: string[] } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const depth = params.slug.length;
  const categorySegment = params.slug[0];

  // 0. Ignore Sanity-reserved paths
  if (categorySegment === "studio" || categorySegment === "structure") {
    return { title: "CMS" };
  }

  const lastSegment = params.slug[depth - 1];
  const fullSlug = params.slug.join("/");

  // 1. Try Article first (most common for deep links)
  const article = await getArticle(lastSegment);
  if (article) {
    return {
      title: article.seo?.title || article.title,
      description: article.seo?.description || article.excerpt,
    };
  }

  // 2. Try Category / Subcategory
  const category = await getCategory(lastSegment);
  if (category) {
    return {
      title: category.title,
      description: category.description,
    };
  }

  // 3. Try Static Page
  const page = await getPage(fullSlug);
  if (page) {
    return {
      title: page.seo?.title || page.title,
      description: page.seo?.description,
    };
  }

  return { title: "Page Not Found" };
}

export default async function UniversalResolver({ params }: Props) {
  const depth = params.slug.length;
  const categorySegment = params.slug[0];

  // 0. Ignore Sanity-reserved paths (let the dedicated /studio route handle them)
  if (categorySegment === "studio" || categorySegment === "structure") {
    return notFound();
  }

  const lastSegment = params.slug[depth - 1];
  const subcategorySegment = depth > 1 ? params.slug[1] : null;
  const fullSlug = params.slug.join("/");

  // --- ATTEMPT 1: ARTICLE ---
  const article = await getArticle(lastSegment);
  if (article) {
    return (
      <ArticleView 
        article={article} 
        category={categorySegment} 
      />
    );
  }

  // --- ATTEMPT 2: CATEGORY / SUBCATEGORY ---
  const cat = await getCategory(lastSegment);
  if (cat) {
    let articles = [];
    if (depth === 1) {
      articles = await getCategoryArticles(lastSegment);
    } else {
      articles = await getSubcategoryArticles(categorySegment, lastSegment);
    }

    return (
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-4xl font-display font-bold text-brand-navy dark:text-gray-100">{cat.title}</h1>
        <p className="mt-2 text-lg text-brand-navy/70 dark:text-gray-400">{cat.description}</p>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles?.map((a: any) => <ArticleCard key={a._id} article={a} />)}
        </div>
        
        {(!articles || articles.length === 0) && (
          <p className="mt-8 text-neutral-500 dark:text-gray-500">No articles found in this section yet.</p>
        )}
      </section>
    );
  }

  // --- ATTEMPT 3: STATIC PAGE ---
  const page = await getPage(fullSlug);
  if (page) {
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

  // --- FALLBACK: PLACEHOLDER OR 404 ---
  // To avoid immediate 404s for new slugs, we can show the editorial placeholder
  const displayTitle = lastSegment.split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="mx-auto max-w-4xl px-4 py-24">
      <h1 className="text-5xl md:text-6xl font-display font-bold mb-12 text-brand-navy border-b pb-8">
        {displayTitle}
      </h1>
      <div className="prose prose-xl max-w-none text-brand-navy/80 space-y-8 leading-relaxed">
        <p className="font-semibold text-2xl text-brand-teal">
          Coming Soon: Expert Editorial Content
        </p>
        <p>
          We are currently crafting in-depth, expert-reviewed resources for this topic. 
          Check back soon for latest pregnancy and parenting advice from our medical board.
        </p>
        <div className="bg-brand-teal/5 p-8 rounded-2xl border border-brand-teal/10 my-12">
          <p className="m-0 italic">
            "Knowledge is the foundation of confident parenting. Our team is dedicated to bringing you the most accurate and up-to-date information."
          </p>
        </div>
      </div>
    </div>
  );
}
