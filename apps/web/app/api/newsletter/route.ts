import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });
  // TODO: integrate with email provider (Resend, Mailchimp, ConvertKit)
  console.log("Newsletter signup:", email);
  return NextResponse.json({ success: true });
}
