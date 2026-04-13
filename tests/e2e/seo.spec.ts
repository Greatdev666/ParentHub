import { test, expect } from "@playwright/test";

test("article page has structured data", async ({ page }) => {
  await page.goto("/pregnancy/first-trimester/sample-article");
  const jsonLd = await page.locator('script[type="application/ld+json"]').first().textContent();
  expect(jsonLd).toBeTruthy();
  const data = JSON.parse(jsonLd!);
  expect(data["@type"]).toBe("Article");
});

test("sitemap.xml is accessible", async ({ page }) => {
  const res = await page.goto("/sitemap.xml");
  expect(res?.status()).toBe(200);
});

test("robots.txt blocks studio", async ({ page }) => {
  const res = await page.goto("/robots.txt");
  const text = await res?.text();
  expect(text).toContain("Disallow: /studio/");
});
