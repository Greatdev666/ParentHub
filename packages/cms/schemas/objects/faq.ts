import { defineField, defineType } from "sanity";
export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "object",
  fields: [
    defineField({ name: "items", title: "Questions", type: "array", of: [{ type: "object", fields: [
      defineField({ name: "question", title: "Question", type: "string" }),
      defineField({ name: "answer", title: "Answer", type: "text" }),
    ]}]}),
  ],
});
