import { defineField, defineType } from "sanity";
export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({ name: "alt", title: "Alt Text", type: "string", validation: (r) => r.required() }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
  ],
});
