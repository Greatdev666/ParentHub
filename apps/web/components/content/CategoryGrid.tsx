import Link from "next/link";
export function CategoryGrid({ categories }: { categories: any[] }) {
  const colors = ["bg-brand-teal", "bg-brand-orange", "bg-brand-navy", "bg-emerald-600", "bg-purple-600", "bg-rose-500"];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {categories?.map((cat: any, i: number) => (
        <Link key={cat._id} href={`/${cat.slug?.current || cat.slug}`} className={`${colors[i % colors.length]} rounded-2xl p-6 text-white transition-transform hover:scale-[1.02]`}>
          <h3 className="text-xl font-display font-semibold">{cat.title}</h3>
          <p className="mt-1 text-sm text-white/70">{cat.description}</p>
        </Link>
      ))}
    </div>
  );
}
