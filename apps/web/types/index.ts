export interface SanityDocument { _id: string; _type: string; _createdAt: string; _updatedAt: string; }
export interface SanityImage { asset: { _ref: string }; alt?: string; caption?: string; url?: string; }
export interface SEO { title?: string; description?: string; ogImage?: SanityImage; noIndex?: boolean; }
export interface Article extends SanityDocument { title: string; slug: { current: string }; excerpt: string; body: any[]; mainImage?: SanityImage; publishedAt: string; readingTime?: number; category?: Category; author?: Author; seo?: SEO; }
export interface Category extends SanityDocument { title: string; slug: { current: string }; description?: string; }
export interface Author extends SanityDocument { name: string; slug: { current: string }; bio?: string; image?: SanityImage; }
export interface Tag extends SanityDocument { title: string; slug: { current: string }; }
