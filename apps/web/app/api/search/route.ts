import { NextResponse } from "next/server";
import { searchArticles } from "@/lib/sanity/queries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query || query.trim().length === 0) {
    return NextResponse.json({ results: [] });
  }

  try {
    const results = await searchArticles(query);
    return NextResponse.json({ results: results.slice(0, 5) }); // Top 5 for dropdown
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: "Failed to fetch search results" }, { status: 500 });
  }
}
