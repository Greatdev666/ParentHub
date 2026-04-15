import React from "react";
import { PortableText } from "@portabletext/react";

interface CalloutProps {
  type: "info" | "warning" | "tip" | "research" | "quote" | "accentDark";
  variant?: "box" | "side-accent";
  title?: string;
  content: any[];
}

const TYPE_STYLES = {
  info: "bg-blue-50 border-blue-200 text-blue-800",
  warning: "bg-amber-50 border-amber-200 text-amber-900",
  tip: "bg-emerald-50 border-emerald-200 text-emerald-900",
  research: "bg-[#F0F7FF] border-[#D1E9FF] text-brand-navy",
  quote: "bg-[#FDF7F2] border-l-[6px] border-l-brand-orange border-y-0 border-r-0 rounded-none text-brand-navy italic",
  accentDark: "bg-brand-navy text-white border-0 shadow-xl text-center py-10 px-12",
};

export function Callout({ type, variant = "box", title, content }: CalloutProps) {
  const isSideAccent = variant === "side-accent";
  const typeStyles = TYPE_STYLES[type] || TYPE_STYLES.info;
  
  const containerClasses = isSideAccent
    ? "bg-[#FFF9F6] border-l-[5px] border-l-[#BD552A] rounded-r-2xl rounded-l-md border-y-0 border-r-0"
    : `rounded-2xl border-2 ${typeStyles}`;

  return (
    <div className={`my-10 p-8 ${containerClasses} shadow-sm transition-all duration-300`}>
      {title && (
        <div className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-[#BD552A]">
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
                  className="text-[#BD552A] underline decoration-[#BD552A]/30 underline-offset-4 font-bold hover:text-[#A34E24] transition-colors"
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
