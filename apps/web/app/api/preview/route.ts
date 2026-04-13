import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { previewClient } from "@/lib/sanity/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("No ID provided", { status: 400 });
  }

  // Enable Draft Mode
  draftMode().enable();

  const baseId = id.replace("drafts.", "");

  // Fetching the article with draft perspective
  const article = await previewClient.fetch(
    `*[_id == $id || _id == "drafts." + $id][0] {
      "slug": slug.current,
      "category": category->slug.current,
      "subcategory": subcategory->slug.current
    }`,
    { id: baseId }
  );

  if (!article || !article.slug) {
    return new Response(`Article not found for ID: ${id}. Please ensure Category and Slug are assigned correctly in the editor.`, { status: 404 });
  }

  const catPath = article.category || "uncategorized";
  const subPath = article.subcategory || "general";
  const finalPath = `/${catPath}/${subPath}/${article.slug}`;
  
  redirect(finalPath);
}
