import Link from "next/link";
import { getNavCategories } from "@/lib/sanity/queries";
import { ThemeToggle } from "./ThemeToggle";
import { SearchBar } from "./SearchBar";
import { MobileNav } from "./MobileNav";

export async function Header() {
  const categories = await getNavCategories();

  return (
    <header className="sticky top-0 z-50 border-b border-brand-navy/5 dark:border-white/5 bg-white/80 dark:bg-brand-dark/80 backdrop-blur-lg transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 lg:px-8 h-16">
        <Link href="/" className="text-xl font-display font-bold text-brand-teal">
          ParentHub
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 h-full">
          {categories.map((category: any) => (
            <div key={category._id} className="group relative flex items-center h-full">
              <Link 
                href={`/${category.slug}`}
                className="text-sm font-medium text-brand-navy/70 dark:text-gray-300 hover:text-brand-teal dark:hover:text-brand-teal transition-colors py-2"
              >
                {category.title}
              </Link>
              
              {category.subcategories && category.subcategories.length > 0 && (
                <div className="absolute top-full left-0 w-56 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                  <div className="bg-white dark:bg-brand-dark-card rounded-xl shadow-xl dark:shadow-card-dark border border-brand-navy/5 dark:border-brand-dark-border overflow-hidden p-2">
                    {category.subcategories.map((sub: any) => (
                      <Link
                        key={sub._id}
                        href={`/${category.slug}/${sub.slug}`}
                        className="block px-4 py-2.5 text-sm text-brand-navy/70 dark:text-gray-300 hover:bg-brand-teal/5 hover:text-brand-teal rounded-lg transition-colors"
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          <Link 
            href="/about"
            className="text-sm font-medium text-brand-navy/70 dark:text-gray-300 hover:text-brand-teal dark:hover:text-brand-teal transition-colors py-2"
          >
            About Us
          </Link>
        </nav>

        <div className="flex items-center gap-1 md:gap-2">
          <ThemeToggle />
          <SearchBar />
          <MobileNav categories={categories} />
        </div>
      </div>
    </header>
  );
}
