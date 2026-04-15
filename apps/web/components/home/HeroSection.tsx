import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-10 pb-8 md:pt-32 md:pb-24 transition-colors duration-300">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=2070&auto=format&fit=crop"
          alt="Mother and daughter laughing and playing closely"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Multi-layered Overlay for Maximum Readability */}
        <div className="absolute inset-0 bg-white/60 dark:bg-brand-dark/70 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-transparent dark:from-brand-dark/40"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-brand-teal/10 dark:bg-brand-teal/20 rounded-full blur-3xl pointer-events-none z-1"></div>
      
      <div className="mx-auto max-w-7xl px-4 lg:px-8 relative z-10 text-center flex flex-col items-center">
        <div className="max-w-4xl p-2 md:p-10 rounded-3xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-brand-navy dark:text-white tracking-tight leading-tight max-w-4xl text-balance transition-colors drop-shadow-sm">
            Navigating parenthood with confidence and clarity.
          </h1>
          <p className="mt-6 md:mt-8 text-xl md:text-2xl text-brand-navy/80 dark:text-gray-200 leading-relaxed max-w-2xl text-pretty transition-colors font-medium">
            Expert-vetted advice, compassionate support, and the real talk you need for every stage of your child's life.
          </p>
          <div className="mt-6 md:mt-12">
            <Link 
              href="#latest" 
              className="inline-block px-10 py-4 bg-brand-navy dark:bg-brand-teal text-white font-bold tracking-widest uppercase hover:bg-brand-teal dark:hover:bg-brand-teal/80 transition-all duration-300 rounded-sm shadow-md hover:shadow-lg hover:-translate-y-1"
            >
              Read Our Latest
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
