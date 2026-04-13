import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://parenthub.com";

export function buildMetadata(overrides: Partial<Metadata> & { path?: string } = {}): Metadata {
  const url = overrides.path ? `${BASE_URL}${overrides.path}` : BASE_URL;
  return {
    ...overrides,
    metadataBase: new URL(BASE_URL),
    alternates: { canonical: url },
    openGraph: { url, type: "website", siteName: "ParentHub", ...overrides.openGraph as any },
  };
}
