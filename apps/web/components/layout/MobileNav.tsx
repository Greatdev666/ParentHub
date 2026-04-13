"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

export function MobileNav({ categories }: { categories: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const toggleDropdown = (categoryId: string) => {
    setOpenDropdown(openDropdown === categoryId ? null : categoryId);
  };

  return (
    <div className="md:hidden flex items-center">
      <button
        onClick={() => setIsOpen(true)}
        className="w-10 h-10 flex items-center justify-center rounded-full text-brand-navy dark:text-white hover:bg-brand-navy/5 dark:hover:bg-white/5 transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Fullscreen Overlay via Portal */}
      {mounted && createPortal(
        <div 
          className={`fixed inset-0 z-[99999] bg-white dark:bg-brand-dark transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center justify-between px-4 border-b border-brand-navy/5 dark:border-white/5">
            <span className="text-xl font-display font-bold text-brand-teal">
              ParentHub
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full text-brand-navy dark:text-white hover:bg-brand-navy/5 dark:hover:bg-white/5 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="h-[calc(100vh-4rem)] overflow-y-auto px-6 py-8">
            <ul className="flex flex-col gap-6">
              <li className="border-b border-brand-navy/5 dark:border-white/5 pb-4">
                <Link href="/" className="text-xl font-bold text-brand-navy dark:text-white">
                  Home
                </Link>
              </li>
              
              {categories.map((category) => (
                <li key={category._id} className="border-b border-brand-navy/5 dark:border-white/5 pb-4">
                  {category.subcategories && category.subcategories.length > 0 ? (
                    <div>
                      <button 
                        onClick={() => toggleDropdown(category._id)}
                        className="flex items-center justify-between w-full text-xl font-bold text-brand-navy dark:text-white text-left"
                      >
                        {category.title}
                        <ChevronDown 
                          className={`w-5 h-5 text-brand-navy/50 dark:text-gray-400 transition-transform ${
                            openDropdown === category._id ? "rotate-180" : ""
                          }`} 
                        />
                      </button>
                      
                      <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          openDropdown === category._id ? "max-h-96 mt-4 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <ul className="flex flex-col gap-4 pl-4 border-l-2 border-brand-teal/20 ml-2">
                          <li>
                            <Link 
                              href={`/${category.slug}`}
                              className="block text-lg font-medium text-brand-teal"
                            >
                              All {category.title}
                            </Link>
                          </li>
                          {category.subcategories.map((sub: any) => (
                            <li key={sub._id}>
                              <Link 
                                href={`/${category.slug}/${sub.slug}`}
                                className="block text-lg font-medium text-brand-navy/70 dark:text-gray-300 hover:text-brand-teal"
                              >
                                {sub.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <Link 
                      href={`/${category.slug}`}
                      className="block text-xl font-bold text-brand-navy dark:text-white"
                    >
                      {category.title}
                    </Link>
                  )}
                </li>
              ))}
              
              <li className="pt-2">
                <Link href="/about" className="text-xl font-bold text-brand-navy dark:text-white">
                  About Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>,
        document.body
      )}
    </div>
  );
}
