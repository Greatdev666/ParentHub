import { defineField, defineType } from "sanity";

export const comment = defineType({
  name: "comment",
  title: "Comment",
  type: "document",
  fields: [
    defineField({ 
      name: "name", 
      title: "Name", 
      type: "string", 
      readOnly: true 
    }),
    defineField({ 
      name: "text", 
      title: "Comment", 
      type: "text" 
    }),
    defineField({
      name: "editToken",
      title: "Edit Token",
      type: "string",
      description: "Secure token for guest editing",
      hidden: true
    }),
    defineField({
      name: "isDeleted",
      title: "Deleted",
      type: "boolean",
      initialValue: false,
      description: "Whether this comment has been removed by the author"
    }),
    defineField({ 
      name: "article", 
      title: "Article", 
      type: "reference", 
      to: [{ type: "article" }],
      readOnly: true
    }),
    defineField({ 
      name: "parentComment", 
      title: "Parent Comment", 
      type: "reference", 
      to: [{ type: "comment" }],
      description: "If this is a reply to another comment",
      readOnly: true
    }),
    defineField({ 
      name: "likes", 
      title: "Likes", 
      type: "number", 
      initialValue: 0 
    }),
    defineField({ 
      name: "publishedAt", 
      title: "Published At", 
      type: "datetime", 
      initialValue: (new Date()).toISOString(),
      readOnly: true
    }),
    defineField({ 
      name: "isApproved", 
      title: "Approved", 
      type: "boolean", 
      initialValue: true,
      description: "Uncheck to hide this comment from the site"
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "text",
      articleTitle: "article.title",
    },
    prepare({ title, subtitle, articleTitle }) {
      return {
        title: `${title} on "${articleTitle || 'Unknown Article'}"`,
        subtitle: subtitle,
      };
    },
  },
});
