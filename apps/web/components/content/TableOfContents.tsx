"use client";

import { useEffect, useState } from "react";

interface TOCHeading {
  text: string;
  id: string;
  level: number;
}

export function TableOfContents({ body }: { body: any[] }) {
  const [headings, setHeadings] = useState<TOCHeading[]>([]);

  useEffect(() => {
    if (!body) return;

    // Helper to generate the exact same IDs as our serializers
    const slugify = (text: string) => 
      text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

    // Extract headings from Portable Text blocks
    const extractedHeadings: TOCHeading[] = body
      .filter((block: any) => block._type === "block" && /h[2-3]/.test(block.style))
      .map((block: any) => {
        const text = block.children?.map((child: any) => child.text).join("") || "";
        return {
          text,
          id: slugify(text) || block._key,
          level: parseInt(block.style.replace("h", ""), 10),
        };
      });

    setHeadings(extractedHeadings);
  }, [body]);

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-24">
      <nav className="bg-brand-teal/5 dark:bg-brand-teal/10 border border-brand-teal/10 rounded-2xl p-6 md:p-8">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-teal mb-6">
          In This Post
        </h2>
        <ul className="space-y-4">
          {headings.map((h) => (
            <li 
              key={h.id} 
              className={`${h.level === 3 ? "pl-4 text-xs" : "text-sm"} group`}
            >
              <a 
                href={`#${h.id}`} 
                className="text-brand-navy/80 dark:text-gray-200 hover:text-brand-teal dark:hover:text-brand-teal transition-all duration-300 font-semibold leading-relaxed block group-hover:translate-x-1"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="border-b border-brand-teal/30 group-hover:border-brand-teal transition-colors">
                  {h.text}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
