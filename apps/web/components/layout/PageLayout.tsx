import React from "react";
import Link from "next/link";

interface PageLayoutProps {
  title: string;
  intro?: string;
  children: React.ReactNode;
  showContactCTA?: boolean;
}

export function PageLayout({ title, intro, children, showContactCTA = false }: PageLayoutProps) {
  return (
    <article className="mx-auto max-w-4xl px-4 py-20 lg:py-32 font-inter transition-colors">
      {/* Header */}
      <header className="mb-16 border-b border-brand-navy/10 dark:border-white/10 pb-12 transition-colors">
        <h1 className="text-5xl md:text-6xl font-display font-bold text-brand-navy dark:text-white mb-8 leading-tight tracking-tight transition-colors">
          {title}
        </h1>
        {intro && (
          <p className="text-xl md:text-2xl text-brand-navy/70 dark:text-gray-400 leading-relaxed max-w-3xl transition-colors">
            {intro}
          </p>
        )}
      </header>

      {/* Content */}
      <div className="prose prose-lg md:prose-xl prose-headings:font-display prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-p:text-brand-navy/80 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-brand-teal prose-strong:text-brand-navy dark:prose-strong:text-white prose-li:text-brand-navy/80 dark:prose-li:text-gray-300 prose-headings:text-brand-navy dark:prose-headings:text-white max-w-none mb-24 transition-colors">
        {children}
      </div>

      {/* Optional global CTA */}
      {showContactCTA && (
        <div className="bg-brand-navy/5 dark:bg-brand-dark-card p-10 md:p-16 rounded-2xl text-center border border-brand-navy/10 dark:border-brand-dark-border mt-16 transition-colors">
          <h2 className="text-3xl font-display font-bold text-brand-navy dark:text-white mb-6 transition-colors">Need more help?</h2>
          <p className="text-brand-navy/70 dark:text-gray-400 mb-10 text-lg max-w-lg mx-auto transition-colors">
            Our support team and editorial staff are always here to answer questions or listen to your feedback.
          </p>
          <Link 
            href="/contact" 
            className="inline-block px-10 py-4 bg-brand-navy dark:bg-brand-teal text-white font-bold tracking-widest uppercase hover:bg-brand-teal dark:hover:bg-brand-teal/80 transition-colors rounded-sm"
          >
            Contact Us
          </Link>
        </div>
      )}
    </article>
  );
}
