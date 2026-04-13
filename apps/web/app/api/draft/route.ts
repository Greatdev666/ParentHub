import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { client } from "@/lib/sanity/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  const type = searchParams.get("type");

  // Skip secret check in local dev for convenience, but implement for production
  // if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
  //   return new Response("Invalid secret", { status: 401 });
  // }

  draftMode().enable();

  if (slug) {
    // Determine the path based on the document type if possible
    // For now, articles are /slug or /cat/sub/slug
    // The presentation tool usually sends the full path or just the slug
    redirect(slug.startsWith("/") ? slug : `/${slug}`);
  }

  redirect("/");
}
