import { defineField, defineType } from "sanity";
export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({ name: "heroTitle", title: "Hero Title", type: "string" }),
    defineField({ name: "heroSubtitle", title: "Hero Subtitle", type: "text" }),
    defineField({ name: "featuredArticles", title: "Featured", type: "array", of: [{ type: "reference", to: [{ type: "article" }] }] }),
  ],
});
