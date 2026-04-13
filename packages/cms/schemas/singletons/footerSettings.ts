import { defineField, defineType } from "sanity";

export const footerSettings = defineType({
  name: "footerSettings",
  title: "Footer Settings",
  type: "document",
  fields: [
    defineField({
      name: "companyLinks",
      title: "Company Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", title: "Label" }),
            defineField({ name: "href", type: "string", title: "URL/Path" }),
          ],
        },
      ],
    }),
    defineField({
      name: "legalLinks",
      title: "Legal Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", title: "Label" }),
            defineField({ name: "href", type: "string", title: "URL/Path" }),
          ],
        },
      ],
    }),
    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "string",
      initialValue: "ParentHub is part of the ParentHub publishing family."
    }),
  ],
});
