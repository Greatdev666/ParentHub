import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TableRow {
  _key: string;
  cells: string[];
}

interface TableData {
  rows: TableRow[];
}

export function TableBlock({ 
  table, 
  alignment = "center", 
  showIndex = false 
}: { 
  table: TableData; 
  alignment?: "left" | "center" | "right";
  showIndex?: boolean;
}) {
  if (!table?.rows || table.rows.length === 0) return null;

  const rows = table.rows;
  const alignmentClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[alignment];

  return (
    <div className="my-12 overflow-hidden rounded-2xl border border-brand-navy/10 dark:border-white/10 shadow-sm bg-white dark:bg-brand-dark-card transition-all duration-300">
      <div className="overflow-x-auto hide-scrollbar">
        <table className={`w-full border-collapse ${alignmentClass}`}>
          <thead>
            <tr className="bg-brand-navy dark:bg-black/40">
              {showIndex && (
                <th className="px-6 py-5 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] !text-white border-r border-white/5 text-center w-12">
                  #
                </th>
              )}
              {rows[0].cells.map((cell, i) => (
                <th 
                  key={i} 
                  className={cn(
                    "px-8 py-5 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] !text-white whitespace-nowrap border-r border-white/5 last:border-0",
                    i === 0 && "pl-12",
                    i === rows[0].cells.length - 1 && "pr-12",
                    `!${alignmentClass}`
                  )}
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-navy/5 dark:divide-white/5">
            {rows.slice(1).map((row, rowIndex) => (
              <tr 
                key={row._key} 
                className="group hover:bg-brand-cream/30 dark:hover:bg-white/[0.02] transition-colors"
              >
                {showIndex && (
                  <td className="px-6 py-6 text-sm font-black text-brand-orange text-center bg-brand-navy/[0.02] border-r border-brand-navy/5 pl-10">
                    {rowIndex + 1}
                  </td>
                )}
                {row.cells.map((cell, j) => (
                  <td 
                    key={j} 
                    className={cn(
                      "px-8 py-6 text-sm md:text-base text-brand-navy/80 dark:text-gray-300 font-medium leading-relaxed",
                      j === 0 && !showIndex && "pl-12",
                      j === row.cells.length - 1 && "pr-12",
                      `!${alignmentClass}`
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
