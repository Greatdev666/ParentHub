import React from "react";

interface TableRow {
  _key: string;
  cells: string[];
}

interface TableData {
  rows: TableRow[];
}

export function TableBlock({ table }: { table: TableData }) {
  if (!table?.rows || table.rows.length === 0) return null;

  const rows = table.rows;

  return (
    <div className="my-12 overflow-hidden rounded-2xl border border-brand-navy/10 dark:border-white/10 shadow-sm bg-white dark:bg-brand-dark-card transition-all duration-300">
      <div className="overflow-x-auto hide-scrollbar">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="bg-brand-navy dark:bg-black/40">
              {rows[0].cells.map((cell, i) => (
                <th 
                  key={i} 
                  className="px-8 py-5 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] !text-white whitespace-nowrap border-r border-white/5 last:border-0 !text-center"
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-navy/5 dark:divide-white/5">
            {rows.slice(1).map((row) => (
              <tr 
                key={row._key} 
                className="group hover:bg-brand-cream/30 dark:hover:bg-white/[0.02] transition-colors"
              >
                {row.cells.map((cell, j) => (
                  <td 
                    key={j} 
                    className="px-8 py-6 text-sm md:text-base text-brand-navy/80 dark:text-gray-300 font-medium leading-relaxed !text-center"
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
