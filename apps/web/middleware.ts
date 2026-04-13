import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Managed redirects could be loaded from Sanity at build time
  // and applied here at the edge for < 1ms latency.
  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next|studio|api|favicon.ico).*)"] };
