import { client, previewClient } from "./client";
import { draftMode } from "next/headers";

type FetchParams = { query: string; params?: Record<string, any>; tags?: string[] };

export async function sanityFetch<T = any>({ query, params = {}, tags = [] }: FetchParams): Promise<T> {
  const isDraftMode = draftMode().isEnabled;
  
  if (isDraftMode) {
    return previewClient.fetch<T>(query, params, {
      next: { revalidate: 0 }, // Never cache drafts
    });
  }

  return client.fetch<T>(query, params, {
    next: { 
      tags, 
      revalidate: 10 // Revalidate every 10 seconds to ensure the homepage stays fresh
    },
  });
}
