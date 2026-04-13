import { defineCliConfig } from "sanity/cli";
export default defineCliConfig({
  api: { projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ofams2gz", dataset: "production" },
});
