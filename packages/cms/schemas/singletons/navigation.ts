import { defineField, defineType } from "sanity";
export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({ name: "items", title: "Nav Items", type: "array", of: [{ type: "object", fields: [
      defineField({ name: "label", title: "Label", type: "string" }),
      defineField({ name: "href", title: "URL", type: "string" }),
      defineField({ name: "children", title: "Dropdown", type: "array", of: [{ type: "object", fields: [
        defineField({ name: "label", type: "string", title: "Label" }),
        defineField({ name: "href", type: "string", title: "URL" }),
      ]}]}),
    ]}]}),
  ],
});
