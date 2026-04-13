import { defineField, defineType } from "sanity";
export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Meta Title", type: "string", validation: (r) => r.max(70) }),
    defineField({ name: "description", title: "Meta Description", type: "text", rows: 3, validation: (r) => r.max(160) }),
    defineField({ name: "ogImage", title: "OG Image", type: "image" }),
    defineField({ name: "noIndex", title: "No Index", type: "boolean", initialValue: false }),
  ],
});
