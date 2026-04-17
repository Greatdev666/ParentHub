import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { deskStructure } from "./desk/structure";
import { PreviewView } from "./desk/PreviewView";

import { table } from "@sanity/table";
import { presentationTool } from "sanity/presentation";

export default defineConfig({
  name: "parenthub",
  basePath: "/studio",
  title: "ParentHub CMS",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ofams2gz",
  dataset: process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [
    structureTool({ 
      structure: deskStructure,
      defaultDocumentNode: (S, { schemaType }) => {
        if (schemaType === "article") {
          return S.document().views([
            S.view.form(),
            S.view.component(PreviewView).title("Preview"),
          ]);
        }
        return S.document().views([S.view.form()]);
      },
    }),
    table(),
    visionTool({ defaultApiVersion: "2024-01-01" }),
  ],
  schema: { types: schemaTypes },
});
