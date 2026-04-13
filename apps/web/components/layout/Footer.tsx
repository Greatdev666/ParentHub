import Link from "next/link";
import { getFooterData } from "@/lib/sanity/queries";

const SOCIAL_ICONS = {
  instagram: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
  ),
  facebook: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  ),
  twitter: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.2-18 11.6 7.2.7 20.2-11.7 15.5-18.2 0 0-4.5 9.7-11.7 4.7"/></svg>
  ),
  pinterest: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="11" y1="20" y2="10"/><path d="M6 15c-1-1-2-3-2-5 a7 7 0 0 1 14 0 c0 3-1 7-4 8 c-2 1-3.5-1-3.5-3 c0-2 1.5-6 1.5-6"/><circle cx="12" cy="12" r="10" strokeWidth="1" strokeDasharray="2 2"/></svg>
  ),
  youtube: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
  ),
  tiktok: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
  ),
};

export async function Footer() {
  const { settings, footer, categories } = await getFooterData();

  const socialLinks = settings?.socialLinks || {};

  return (
    <footer className="bg-[#F0EFEB] dark:bg-brand-dark-card pt-16 pb-8 border-t border-brand-navy/5 dark:border-white/5 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        
        {/* Brand Header */}
        <div className="flex flex-col mb-12">
          <Link href="/" className="text-6xl font-display font-bold text-brand-navy dark:text-white mb-8 tracking-tight transition-colors">
            ParentHub
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center gap-8 justify-between">
            <Link 
              href="/newsletter"
              className="inline-block border-2 border-brand-navy dark:border-white px-12 py-3 text-sm font-bold tracking-widest text-brand-navy dark:text-white hover:bg-brand-navy hover:text-white dark:hover:bg-white dark:hover:text-brand-navy transition-colors text-center uppercase"
            >
              Newsletters
            </Link>
            
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-navy/60 dark:text-gray-500 transition-colors">Follow Us</span>
              <div className="flex items-center gap-6 text-brand-navy/80 dark:text-gray-400">
                {Object.entries(SOCIAL_ICONS).map(([key, icon]) => (
                  socialLinks[key] ? (
                    <a key={key} href={socialLinks[key]} target="_blank" rel="noopener noreferrer" className="hover:text-brand-teal transition-colors">
                      {icon}
                    </a>
                  ) : null
                ))}
              </div>
            </div>
          </div>
        </div>

        <hr className="border-brand-navy/10 dark:border-white/10 mb-12 transition-colors" />

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          {/* Column 1: Topics */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-tighter text-brand-navy dark:text-white mb-6 transition-colors">Topics</h3>
            <ul className="flex flex-col gap-4">
              {categories?.map((cat: any) => (
                <li key={cat._id}>
                  <Link href={`/${cat.slug}`} className="text-sm font-bold uppercase tracking-tighter text-brand-navy dark:text-gray-300 hover:text-brand-teal transition-colors">
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: About */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-tighter text-brand-navy dark:text-white mb-6 transition-colors">About Us</h3>
            <ul className="flex flex-col gap-4">
              {footer?.companyLinks?.length > 0 ? (
                footer.companyLinks.map((link: any, i: number) => (
                  <li key={i}>
                    <Link href={link.href} className="text-sm text-brand-navy/80 dark:text-gray-400 hover:text-brand-teal transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li><Link href="/about" className="text-sm text-brand-navy/80 dark:text-gray-400 hover:text-brand-teal transition-colors">About Us</Link></li>
                  <li><Link href="/editorial-guidelines" className="text-sm text-brand-navy/80 dark:text-gray-400 hover:text-brand-teal transition-colors">Editorial Guidelines</Link></li>
                  <li><Link href="/careers" className="text-sm text-brand-navy/80 dark:text-gray-400 hover:text-brand-teal transition-colors">Careers</Link></li>
                  <li><Link href="/contact" className="text-sm text-brand-navy/80 dark:text-gray-400 hover:text-brand-teal transition-colors">Contact</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-tighter text-brand-navy dark:text-white mb-6 transition-colors">Support</h3>
            <ul className="flex flex-col gap-4">
              <li><Link href="/expert-review-board" className="text-sm text-brand-navy/80 dark:text-gray-400 hover:text-brand-teal transition-colors">Expert Review Board</Link></li>
              <li><Link href="/product-review-guidelines" className="text-sm text-brand-navy/80 dark:text-gray-400 hover:text-brand-teal transition-colors">Product Review Guidelines</Link></li>
              <li><Link href="/advertise" className="text-sm text-brand-navy/80 dark:text-gray-400 hover:text-brand-teal transition-colors">Advertise</Link></li>
              <li><Link href="/support" className="text-sm text-brand-navy/80 dark:text-gray-400 hover:text-brand-teal transition-colors">Help & Support</Link></li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-tighter text-brand-navy dark:text-white mb-6 transition-colors">Privacy</h3>
            <ul className="flex flex-col gap-4">
              {footer?.legalLinks?.length > 0 ? (
                footer.legalLinks.map((link: any, i: number) => (
                  <li key={i}>
                    <Link href={link.href} className="text-sm text-brand-navy/80 dark:text-gray-400 hover:text-brand-teal transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li><Link href="/privacy-policy" className="text-sm text-brand-navy/80 dark:text-gray-400 hover:text-brand-teal transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms-of-service" className="text-sm text-brand-navy/80 dark:text-gray-400 hover:text-brand-teal transition-colors">Terms of Service</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-brand-navy/10 dark:border-white/10 transition-colors">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <span className="text-lg font-display font-bold text-brand-navy dark:text-white transition-colors">ParentHub</span>
            <span className="text-sm text-brand-navy/60 dark:text-gray-500 transition-colors">
               {footer?.copyrightText || "ParentHub is part of the ParentHub publishing family."}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
