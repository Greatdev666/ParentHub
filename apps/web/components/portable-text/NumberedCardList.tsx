import React from "react";

interface CardItem {
  title: string;
  text: string;
}

export function NumberedCardList({ items }: { items: CardItem[] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="my-10 flex flex-col gap-6">
      {items.map((item, i) => (
        <div 
          key={i} 
          className="group relative bg-[#FDFCFB]/50 dark:bg-brand-dark-card/50 border border-brand-navy/5 dark:border-white/5 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <h3 className="flex items-baseline gap-4 text-xl md:text-2xl font-display font-bold text-brand-navy dark:text-white mb-3 leading-tight">
            <span className="text-2xl md:text-3xl font-display font-bold text-brand-orange leading-none shrink-0 tabular-nums">
              {i + 1}
            </span>
            <span>{item.title}</span>
          </h3>
          
          <div className="pl-0 md:pl-10">
            <p className="text-brand-navy/70 dark:text-gray-400 text-lg leading-relaxed">
              {item.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
