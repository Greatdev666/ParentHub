// Content migration script template
// Usage: npx tsx infrastructure/scripts/migrate-content.ts
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
});

async function migrate() {
  console.log("Starting content migration...");
  // Add migration logic here
  console.log("Migration complete.");
}

migrate().catch(console.error);
