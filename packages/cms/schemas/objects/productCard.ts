import { defineField, defineType } from "sanity";
export const productCard = defineType({
  name: "productCard",
  title: "Product Card",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Product Name", type: "string" }),
    defineField({ name: "image", title: "Image", type: "image" }),
    defineField({ name: "price", title: "Price", type: "string" }),
    defineField({ name: "url", title: "Affiliate URL", type: "url" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
  ],
});
