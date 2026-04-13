"use client";
export function ShareButtons({ url, title }: { url: string; title: string }) {
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  return (
    <div className="flex items-center gap-3 mt-8 pt-6 border-t border-brand-navy/10">
      <span className="text-sm font-medium text-brand-navy/50">Share:</span>
      <a href={`https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`} target="_blank" rel="noopener" className="text-brand-navy/40 hover:text-brand-teal transition">X</a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`} target="_blank" rel="noopener" className="text-brand-navy/40 hover:text-brand-teal transition">Facebook</a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`} target="_blank" rel="noopener" className="text-brand-navy/40 hover:text-brand-teal transition">LinkedIn</a>
    </div>
  );
}
