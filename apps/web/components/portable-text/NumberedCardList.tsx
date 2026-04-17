import React from "react";

interface CardItem {
  title: string;
  subtitle?: string;
  text: string;
  tip?: string;
  tags?: string[];
}

export function NumberedCardList({ items }: { items: CardItem[] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="my-10 flex flex-col gap-10">
      {items.map((item, i) => (
        <div 
          key={i} 
          className="group relative bg-white dark:bg-brand-dark-card border border-brand-navy/10 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
        >
          <div className="flex flex-col md:flex-row">
            {/* Left Number Bar */}
            <div className="w-full md:w-20 bg-[#BD552A] flex items-center justify-center p-4 md:p-0">
              <span className="text-3xl font-display font-black text-white/50">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 md:p-10">
              <div className="mb-6">
                <h3 className="text-2xl font-display font-bold text-brand-navy dark:text-white leading-tight mb-1">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-brand-orange italic font-serif text-lg opacity-80">
                    {item.subtitle}
                  </p>
                )}
              </div>
              
              <div className="prose prose-lg dark:prose-invert max-w-none mb-6 text-brand-navy/80 dark:text-gray-300 leading-relaxed font-outfit">
                {item.text}
              </div>

              {item.tip && (
                <div className="bg-[#FFFBEB] dark:bg-amber-950/30 border-l-4 border-amber-200 dark:border-amber-900/50 p-5 rounded-r-xl mb-6 transition-colors">
                  <p className="text-amber-900 dark:text-amber-100 text-base leading-relaxed">
                    {item.tip}
                  </p>
                </div>
              )}

              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-auto">
                  {item.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-4 py-1.5 bg-[#BD552A]/5 dark:bg-[#BD552A]/10 text-[#BD552A] text-xs font-bold rounded-full border border-[#BD552A]/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
