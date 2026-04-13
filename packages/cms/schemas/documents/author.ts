import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "shortBio", title: "Short Bio", type: "text", rows: 3, description: "Displayed on the author card below articles." }),
    defineField({ name: "fullBio", title: "Full Bio", type: "array", of: [{ type: "block" }], description: "Extended biography for the dedicated author page." }),
    defineField({ name: "expertise", title: "Areas of Expertise", type: "array", of: [{ type: "string" }], description: "e.g., Pediatrics, Nutrition, Sleep Training" }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "socialLinks", title: "Social Links", type: "object", fields: [
      defineField({ name: "twitter", title: "Twitter", type: "url" }),
      defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
    ]}),
  ],
  preview: { select: { title: "name", media: "image" } },
});
