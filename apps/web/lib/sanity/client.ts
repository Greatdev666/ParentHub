import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dummy",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published",
  stega: {
    enabled: false,
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "http://localhost:3333",
  },
});

export const previewClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dummy",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: "previewDrafts",
  stega: {
    enabled: false,
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "http://localhost:3333",
  },
});
