import { defineField, defineType } from "sanity";

export const articleEmbedList = defineType({
  name: "articleEmbedList",
  title: "Related Articles Card",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "In this post",
    }),
    defineField({
      name: "articles",
      title: "Articles",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "article" }],
        },
      ],
      validation: (Rule) => Rule.min(1).max(5),
    }),
  ],
  preview: {
    select: {
      title: "title",
      articles: "articles",
    },
    prepare({ title, articles }) {
      return {
        title: title || "Related Articles",
        subtitle: `${articles?.length || 0} articles selected`,
      };
    },
  },
});
