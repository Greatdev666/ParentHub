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
