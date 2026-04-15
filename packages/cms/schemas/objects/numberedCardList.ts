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
            defineField({ name: "subtitle", title: "Subtitle (Optional)", type: "string", description: "e.g. Why it works, The science behind it" }),
            defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
            defineField({ name: "tip", title: "Tip / Bottom Note (Optional)", type: "text", rows: 2, description: "Displays in a highlighted yellow inset box" }),
            defineField({ 
              name: "tags", 
              title: "Tags (Optional)", 
              type: "array", 
              of: [{ type: "string" }],
              options: { layout: "tags" }
            }),
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
