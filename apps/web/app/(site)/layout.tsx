import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://parenthub.com"),
  title: { default: "ParentHub — Expert Parenting Advice & Resources", template: "%s | ParentHub" },
  description: "Trusted parenting advice on pregnancy, baby care, toddler development, and family health from medical experts.",
  openGraph: { type: "website", locale: "en_US", siteName: "ParentHub" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled: preview } = draftMode();

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('parenthub-theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="transition-colors duration-300">
        <ThemeProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          {preview && <VisualEditing />}
        </ThemeProvider>
      </body>
    </html>
  );
}
