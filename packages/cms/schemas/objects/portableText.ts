import { defineArrayMember, defineType } from "sanity";
export const portableText = defineType({
  name: "portableText",
  title: "Body",
  type: "array",
  of: [
    defineArrayMember({ type: "block", styles: [{ title: "Normal", value: "normal" }, { title: "H2", value: "h2" }, { title: "H3", value: "h3" }, { title: "H4", value: "h4" }, { title: "Quote", value: "blockquote" }], marks: { decorators: [{ title: "Bold", value: "strong" }, { title: "Italic", value: "em" }, { title: "Code", value: "code" }], annotations: [{ name: "link", type: "object", title: "URL", fields: [{ name: "href", type: "url", title: "URL" }] }, { name: "internalLink", type: "object", title: "Internal Link", fields: [{ name: "reference", type: "reference", to: [{ type: "article" }] }] }] } }),
    defineArrayMember({ type: "imageWithAlt" }),
    defineArrayMember({ type: "callout" }),
    defineArrayMember({ type: "statGrid" }),
    defineArrayMember({ type: "numberedCardList" }),
    defineArrayMember({ type: "tableBlock" }),
    defineArrayMember({ type: "videoEmbed" }),
    defineArrayMember({ type: "faq" }),
    defineArrayMember({ type: "articleEmbedList" }),
    defineArrayMember({ type: "codeBlock" }),
  ],
});
