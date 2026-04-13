import type { StructureBuilder } from "sanity/structure";

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      S.listItem().title("Articles").child(S.documentTypeList("article").title("Articles")),
      S.listItem().title("Authors").child(S.documentTypeList("author").title("Authors")),
      S.listItem().title("Team Members").child(S.documentTypeList("teamMember").title("Team Members")),
      S.listItem().title("Categories").child(S.documentTypeList("category").title("Categories")),
      S.listItem().title("Tags").child(S.documentTypeList("tag").title("Tags")),
      S.divider(),
      S.listItem().title("Pages").child(S.documentTypeList("page").title("Pages")),
      S.divider(),
      S.listItem().title("Settings").child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem().title("Footer Settings").child(S.document().schemaType("footerSettings").documentId("footerSettings")),
      S.listItem().title("Navigation").child(S.document().schemaType("navigation").documentId("navigation")),
      S.listItem().title("Homepage").child(S.document().schemaType("homepage").documentId("homepage")),
    ]);
