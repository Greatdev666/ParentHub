import React from "react";
import { PortableText } from "@portabletext/react";

interface CalloutProps {
  type: "info" | "warning" | "tip" | "research";
  title?: string;
  content: any[];
}

const TYPE_STYLES = {
  info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800/50",
  warning: "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-900/20 dark:border-amber-800/50",
  tip: "bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-900/20 dark:border-emerald-800/50",
  research: "bg-[#F0F7FF] border-[#D1E9FF] text-brand-navy dark:bg-brand-dark-card dark:border-brand-teal/30",
};

export function Callout({ type, title, content }: CalloutProps) {
  const styles = TYPE_STYLES[type] || TYPE_STYLES.info;

  return (
    <div className={`my-10 p-8 rounded-2xl border-2 ${styles} shadow-sm transition-colors duration-300`}>
      {title && (
        <div className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-brand-teal">
          {title}
        </div>
      )}
      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
        <PortableText 
          value={content} 
          components={{
            marks: {
              link: ({ value, children }) => (
                <a 
                  href={value?.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-brand-teal underline decoration-2 underline-offset-4 font-bold"
                >
                  {children}
                </a>
              ),
            }
          }}
        />
      </div>
    </div>
  );
}
