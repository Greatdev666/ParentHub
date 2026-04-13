import { article, author, category, tag, page, teamMember } from "./documents";
import { seo, portableText, imageWithAlt, callout, videoEmbed, productCard, faq, statGrid, numberedCardList, tableBlock } from "./objects";
import { siteSettings, navigation, homepage, footerSettings } from "./singletons";

export const schemaTypes = [
  article, author, category, tag, page, teamMember,
  seo, portableText, imageWithAlt, callout, videoEmbed, productCard, faq, statGrid, numberedCardList, tableBlock,
  siteSettings, navigation, homepage, footerSettings,
];
