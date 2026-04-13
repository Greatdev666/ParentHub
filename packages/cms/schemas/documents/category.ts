import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({ name: "image", title: "Featured Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "parent", title: "Parent Category", type: "reference", to: [{ type: "category" }] }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 0 }),
  ],
  preview: {
    select: { title: "title", media: "image", parentTitle: "parent.title" },
    prepare({ title, parentTitle }) {
      return {
        title,
        subtitle: parentTitle ? `Subcategory of ${parentTitle}` : "Main Category",
      };
    },
  },
});
