import { defineField, defineType } from "sanity";
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Site Title", type: "string" }),
    defineField({ name: "description", title: "Site Description", type: "text" }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({ name: "socialLinks", title: "Social", type: "object", fields: [
      defineField({ name: "twitter", type: "url", title: "Twitter" }),
      defineField({ name: "facebook", type: "url", title: "Facebook" }),
      defineField({ name: "instagram", type: "url", title: "Instagram" }),
      defineField({ name: "pinterest", type: "url", title: "Pinterest" }),
      defineField({ name: "youtube", type: "url", title: "YouTube" }),
      defineField({ name: "tiktok", type: "url", title: "TikTok" }),
      defineField({ name: "flipboard", type: "url", title: "Flipboard" }),
    ]}),
    defineField({ name: "gtmId", title: "GTM Container ID", type: "string" }),
  ],
});
