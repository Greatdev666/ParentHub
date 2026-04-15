import { defineField, defineType } from "sanity";

export const tableBlock = defineType({
  name: "tableBlock",
  title: "Table",
  type: "object",
  fields: [
    defineField({
      name: "table",
      title: "Table Data",
      type: "table",
    }),
    defineField({
      name: "alignment",
      title: "Cell Alignment",
      type: "string",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Center", value: "center" },
          { title: "Right", value: "right" }
        ]
      },
      initialValue: "center"
    }),
    defineField({
      name: "showIndex",
      title: "Show Row Numbers (Index)",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      table: "table",
    },
    prepare({ table }) {
      return {
        title: "Table Block",
        subtitle: `${table?.rows?.length || 0} rows`,
      };
    },
  },
});
