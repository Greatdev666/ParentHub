import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/lib/sanity/image";

export function TeamSection({ team }: { team: any[] }) {
  if (!team || team.length === 0) return null;

  return (
    <section className="bg-brand-navy/5 dark:bg-brand-dark-card/50 py-24 border-t border-brand-navy/10 dark:border-white/5 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left: Text & CTA */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-brand-navy dark:text-white tracking-tight mb-6 transition-colors">
              Our Expert Medical Review Board
            </h2>
            <p className="text-lg text-brand-navy/70 dark:text-gray-400 leading-relaxed mb-8 transition-colors">
              At ParentHub, your family's health and happiness are our top priority. That's why every article is heavily vetted, reviewed, and approved by our board of certified pediatricians, psychologists, and specialists. 
            </p>
            <div>
              <Link 
                href="/expert-review-board"
                className="inline-block border-2 border-brand-navy dark:border-white px-8 py-3 text-sm font-bold tracking-widest text-brand-navy dark:text-white hover:bg-brand-navy hover:text-white dark:hover:bg-white dark:hover:text-brand-navy transition-colors uppercase"
              >
                Meet the Full Board
              </Link>
            </div>
          </div>

          {/* Right: Team Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-12">
            {team.slice(0, 6).map((member) => (
              <div key={member._id} className="flex flex-col group items-center text-center">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden mb-4 border-4 border-white dark:border-brand-dark-card shadow-lg bg-white dark:bg-brand-dark-card transition-colors">
                  {member.image ? (
                    <Image
                      src={urlForImage(member.image).url()}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                      sizes="(max-width: 640px) 128px, 160px"
                    />
                  ) : (
                    <div className="w-full h-full bg-brand-navy/10 dark:bg-white/10" />
                  )}
                </div>
                <h3 className="text-lg font-display font-bold text-brand-navy dark:text-white leading-tight mb-1 group-hover:text-brand-teal transition-colors">
                  {member.name}
                </h3>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-navy/50 dark:text-gray-500 transition-colors">
                  {member.role}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
