import { defineType, defineField } from "sanity";

export const codeBlock = defineType({
  name: "codeBlock",
  title: "Code Snippet",
  type: "object",
  icon: () => "💻",
  fields: [
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "HTML", value: "html" },
          { title: "CSS", value: "css" },
          { title: "JavaScript", value: "javascript" },
          { title: "TypeScript", value: "typescript" },
          { title: "Python", value: "python" },
          { title: "JSON", value: "json" },
          { title: "Bash/Shell", value: "bash" },
        ],
      },
      initialValue: "html",
    }),
    defineField({
      name: "filename",
      title: "Filename (Optional)",
      type: "string",
      placeholder: "e.g. index.html",
    }),
    defineField({
      name: "code",
      title: "Code",
      type: "text",
      rows: 10,
    }),
    defineField({
      name: "showPreview",
      title: "Enable Live Preview / Sandbox",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "output",
      title: "Expected Output (Optional Simulation)",
      type: "text",
      rows: 5,
      description: "For Python, Bash, or JSON, type the result here to show it in the Terminal Preview tab.",
    }),
  ],
  preview: {
    select: {
      language: "language",
      filename: "filename",
    },
    prepare({ language, filename }) {
      return {
        title: filename || `Code (${language})`,
        subtitle: `Renders as a syntax-highlighted block`,
      };
    },
  },
});
