import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const title = req.nextUrl.searchParams.get("title") || "ParentHub";
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", background: "linear-gradient(135deg, #00838F, #1A2530)", color: "white", fontFamily: "sans-serif", padding: 60 }}>
        <div style={{ fontSize: 64, fontWeight: 700, textAlign: "center", lineHeight: 1.2 }}>{title}</div>
        <div style={{ fontSize: 28, marginTop: 24, opacity: 0.8 }}>parenthub.com</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
