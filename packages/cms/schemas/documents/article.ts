import { defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required().max(100) }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3, validation: (r) => r.required().max(300) }),
    defineField({ name: "mainImage", title: "Main Image", type: "imageWithAlt" }),
    defineField({ name: "body", title: "Body", type: "portableText" }),
    defineField({ 
      name: "category", 
      title: "Category", 
      type: "reference", 
      to: [{ type: "category" }], 
      validation: (r) => r.required(),
      options: {
        filter: "!defined(parent)", // Only show Top-Level Categories
      }
    }),
    defineField({ 
      name: "subcategory", 
      title: "Subcategory", 
      type: "reference", 
      to: [{ type: "category" }],
      options: {
        filter: ({ document }) => {
          // If no main category is selected yet, don't show any subcategories
          if (!document.category) {
            return { filter: "false" };
          }
          // Only show subcategories that have the currently selected category as their parent
          return {
            filter: "parent._ref == $categoryId",
            params: { categoryId: (document.category as any)._ref }
          };
        }
      }
    }),
    defineField({ name: "author", title: "Author", type: "reference", to: [{ type: "author" }], validation: (r) => r.required() }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "reference", to: [{ type: "tag" }] }] }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "readingTime", title: "Reading Time (min)", type: "number" }),
    defineField({ 
      name: "likes", 
      title: "Loves/Likes", 
      type: "number", 
      initialValue: 0,
      description: "Counter for community engagement" 
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    select: { title: "title", subtitle: "category.title", media: "mainImage" },
  },
  orderings: [{ title: "Published", name: "publishedAt", by: [{ field: "publishedAt", direction: "desc" }] }],
});
