import { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://parenthub.com";
  const slugs = await getAllSlugs();
  const articleUrls = slugs.map((s: any) => {
    const path = s.subcategory 
      ? `${s.category}/${s.subcategory}/${s.slug}`
      : `${s.category}/${s.slug}`;
      
    return {
      url: `${baseUrl}/${path}`,
      lastModified: s._updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    };
  });
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    ...articleUrls,
  ];
}