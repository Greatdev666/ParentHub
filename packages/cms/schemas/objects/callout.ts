import { defineField, defineType } from "sanity";
export const callout = defineType({
  name: "callout",
  title: "Callout",
  type: "object",
  fields: [
    defineField({ 
      name: "type", 
      title: "Type", 
      type: "string", 
      options: { 
        list: [
          { title: "Standard Info", value: "info" },
          { title: "Warning / Attention", value: "warning" },
          { title: "Tip / Recommendation", value: "tip" },
          { title: "From the Research", value: "research" },
          { title: "Quote", value: "quote" },
          { title: "Accent Dark CTA", value: "accentDark" }
        ] 
      }, 
      initialValue: "research" 
    }),
    defineField({ 
      name: "variant", 
      title: "Display Style", 
      type: "string", 
      options: { 
        list: [
          { title: "Rounded Box", value: "box" },
          { title: "Side-Accent Line", value: "side-accent" }
        ] 
      }, 
      initialValue: "box" 
    }),
    defineField({ 
      name: "title", 
      title: "Title (Optional)", 
      type: "string",
      placeholder: "e.g. FROM THE RESEARCH"
    }),
    defineField({ 
      name: "content", 
      title: "Content", 
      type: "array",
      of: [{ type: "block", styles: [], lists: [], marks: { decorators: [{ title: 'Bold', value: 'strong' }, { title: 'Italic', value: 'em' }], annotations: [{ name: 'link', type: 'object', title: 'Link', fields: [{ name: 'href', type: 'url' }] }] } }]
    }),
  ],
  preview: { 
    select: { 
      title: "title", 
      type: "type" 
    },
    prepare({ title, type }) {
      return {
        title: title || "Callout",
        subtitle: `Type: ${type}`
      }
    }
  },
});
