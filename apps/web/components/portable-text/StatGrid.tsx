import React from "react";

interface StatItem {
  value: string;
  label: string;
  description?: string;
  shape?: "square" | "circle" | "triangle" | "rectangle";
}

export function StatGrid({ items }: { items: StatItem[] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="my-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      {items.map((item, i) => {

        const shape = (item.shape || "").toLowerCase();
        
        // Base styles for all cards
        let shapeClasses = "relative flex flex-col items-center justify-center p-6 text-center transition-all duration-300 overflow-hidden ";
        
        // Inline styles for absolute geometric precision
        let inlineStyles: React.CSSProperties = {
          minWidth: '160px',
          minHeight: '160px'
        };
        
        if (shape === "circle" || shape.includes("circle")) {
          shapeClasses += "rounded-full bg-brand-orange/20 dark:bg-brand-orange/30 border-4 border-brand-orange shadow-lg";
          inlineStyles.borderRadius = '9999px';
          inlineStyles.aspectRatio = '1/1';
        } else if (shape === "triangle" || shape.includes("triangle")) {
          shapeClasses += "bg-brand-orange/20 dark:bg-brand-orange/30 pt-16 pb-4 px-10 border-0 shadow-lg";
          inlineStyles.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
          inlineStyles.WebkitClipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
          inlineStyles.aspectRatio = '1/1';
        } else if (shape === "rectangle" || shape.includes("rectangle")) {
          shapeClasses += "bg-white dark:bg-brand-dark-card border border-brand-navy/10 dark:border-white/10 rounded-2xl shadow-sm px-10";
          inlineStyles.aspectRatio = '2/1';
        } else {
          // Default Square
          shapeClasses += "bg-white dark:bg-brand-dark-card border border-brand-navy/10 dark:border-white/10 rounded-2xl shadow-sm";
        }

        return (
          <div key={i} className={shapeClasses} style={inlineStyles}>
            <div className={`font-display font-bold text-brand-orange ${shape.includes('triangle') ? 'text-2xl md:text-3xl mt-4 shrink-0' : 'text-3xl md:text-4xl'} mb-1`}>
              {item.value || "0%"}
            </div>
            <div className="text-[10px] md:text-xs font-bold text-brand-navy dark:text-gray-100 uppercase tracking-widest leading-tight px-2">
              {item.label || "STAT"}
            </div>
            

          </div>
        );
      })}
    </div>
  );
}
