import { defineField, defineType } from "sanity";

export const statGrid = defineType({
  name: "statGrid",
  title: "Statistics Grid",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Stat Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Value (e.g. 50%)", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "description", title: "Description", type: "string" }),
            defineField({
              name: "shape",
              title: "Shape",
              type: "string",
              options: {
                list: [
                  { title: "Square / Rounded", value: "square" },
                  { title: "Circle", value: "circle" },
                  { title: "Triangle", value: "triangle" },
                  { title: "Rectangle", value: "rectangle" },
                ],
                layout: "radio",
              },
              initialValue: "square",
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(1).max(4),
    }),
  ],
  preview: {
    select: {
      items: "items",
    },
    prepare({ items }) {
      return {
        title: `Stat Grid (${items?.length || 0} items)`,
        subtitle: items?.map((i: any) => i.value).join(", "),
      };
    },
  },
});
