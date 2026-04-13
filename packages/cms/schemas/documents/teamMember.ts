import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "role", title: "Role", type: "string", validation: (r) => r.required() }),
    defineField({ name: "bio", title: "Bio", type: "text", rows: 4 }),
    defineField({ 
      name: "socialLinks", 
      title: "Social Links", 
      type: "object", 
      fields: [
        defineField({ name: "twitter", title: "Twitter", type: "url" }),
        defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
      ]
    }),
  ],
  preview: { 
    select: { title: "name", subtitle: "role", media: "image" } 
  },
});
