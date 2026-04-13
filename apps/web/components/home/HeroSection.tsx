import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#F4F9F9] to-[#E5F2F2] dark:from-brand-dark dark:to-brand-dark-card pt-20 pb-24 md:pt-28 md:pb-32 border-b border-brand-navy/5 dark:border-white/5 transition-colors duration-300">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-brand-teal/5 dark:bg-brand-teal/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-72 h-72 bg-brand-navy/5 dark:bg-brand-teal/5 rounded-full blur-2xl pointer-events-none"></div>
      
      <div className="mx-auto max-w-7xl px-4 lg:px-8 relative z-10 text-center flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-brand-navy dark:text-white tracking-tight leading-tight max-w-4xl text-balance transition-colors">
          Navigating parenthood with confidence and clarity.
        </h1>
        <p className="mt-6 md:mt-8 text-xl md:text-2xl text-brand-navy/70 dark:text-gray-400 leading-relaxed max-w-2xl text-pretty transition-colors">
          Expert-vetted advice, compassionate support, and the real talk you need for every stage of your child's life.
        </p>
        <div className="mt-10 md:mt-12">
          <Link 
            href="#latest" 
            className="inline-block px-10 py-4 bg-brand-navy dark:bg-brand-teal text-white font-bold tracking-widest uppercase hover:bg-brand-teal dark:hover:bg-brand-teal/80 transition-all duration-300 rounded-sm shadow-md hover:shadow-lg hover:-translate-y-1"
          >
            Read Our Latest
          </Link>
        </div>
      </div>
    </section>
  );
}
