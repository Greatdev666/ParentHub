import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }
  const body = await req.json();
  const tag = body._type || "global";
  revalidateTag(tag);
  return NextResponse.json({ revalidated: true, tag, now: Date.now() });
}
