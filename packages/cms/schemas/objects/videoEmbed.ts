import { defineField, defineType } from "sanity";
export const videoEmbed = defineType({
  name: "videoEmbed",
  title: "Video Embed",
  type: "object",
  fields: [
    defineField({ name: "url", title: "Video URL", type: "url", validation: (r) => r.required() }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
  ],
});
