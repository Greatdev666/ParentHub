import { defineField, defineType } from "sanity";

export const numberedCardList = defineType({
  name: "numberedCardList",
  title: "Numbered Card List",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      items: "items",
    },
    prepare({ items }) {
      return {
        title: `Numbered List (${items?.length || 0} cards)`,
        subtitle: items?.[0]?.title,
      };
    },
  },
});
