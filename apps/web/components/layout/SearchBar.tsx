"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, Loader2 } from "lucide-react";
import { urlForImage } from "@/lib/sanity/image";

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (!query || query.trim().length === 0) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const delayDebounceFn = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const toggleSearch = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div ref={containerRef} className="relative flex items-center">
      {/* Expanded Search Input */}
      <div 
        className={`flex items-center overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "w-48 md:w-64 opacity-100 mr-2" : "w-0 opacity-0 m-0"
        }`}
      >
        <form onSubmit={handleSumbit} className="w-full relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search articles..."
            className="w-full bg-brand-navy/5 dark:bg-white/5 border border-brand-navy/10 dark:border-white/10 rounded-full py-2 pl-4 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal text-brand-navy dark:text-white"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {isLoading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Loader2 className="w-4 h-4 animate-spin text-brand-teal" />
            </div>
          )}
        </form>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={toggleSearch}
        className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full text-brand-navy/50 dark:text-gray-400 hover:text-brand-teal dark:hover:text-brand-teal hover:bg-brand-navy/5 dark:hover:bg-white/5 transition-all"
        aria-label="Toggle search"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
      </button>

      {/* Dropdown Results */}
      {isOpen && query.length > 0 && (
        <div className="absolute top-full right-0 mt-4 w-72 md:w-80 bg-white dark:bg-brand-dark-card rounded-2xl shadow-2xl border border-brand-navy/10 dark:border-white/10 overflow-hidden z-50">
          <div className="p-2">
            <h3 className="px-3 py-2 text-xs font-bold text-brand-navy/50 dark:text-gray-400 uppercase tracking-wider">
              {isLoading ? "Searching..." : results.length > 0 ? "Top Results" : "No results found"}
            </h3>
            
            {results.map((article) => {
              const catSlug = article.category?.slug?.current || article.category?.slug;
              const subSlug = article.subcategory?.slug?.current || article.subcategory?.slug;
              const artSlug = article.slug?.current || article.slug;
              const href = subSlug ? `/${catSlug}/${subSlug}/${artSlug}` : `/${catSlug}/${artSlug}`;

              return (
              <div key={article._id} className="block group">
                <Link 
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-brand-navy/5 dark:hover:bg-white/5 transition-colors"
                >
                  {article.mainImage ? (
                    <img 
                      src={urlForImage(article.mainImage).width(60).height(60).url()} 
                      alt="" 
                      className="w-10 h-10 rounded shadow-sm object-cover shrink-0 ring-1 ring-brand-navy/5 dark:ring-white/5"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded bg-brand-navy/10 dark:bg-white/10 shrink-0" />
                  )}
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold text-brand-navy dark:text-white truncate group-hover:text-brand-teal transition-colors">
                      {article.title}
                    </p>
                    <p className="text-xs text-brand-navy/60 dark:text-gray-400 truncate">
                      {article.category?.title}
                    </p>
                  </div>
                </Link>
              </div>
            )})}

            {results.length > 0 && (
              <div className="mt-1 border-t border-brand-navy/5 dark:border-white/5 pt-1">
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2.5 text-center text-sm font-bold text-brand-teal hover:bg-brand-teal/5 rounded-lg transition-colors"
                >
                  View all results
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
