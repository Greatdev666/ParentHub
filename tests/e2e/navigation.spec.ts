import { test, expect } from "@playwright/test";

test("homepage loads and has correct title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/ParentHub/);
  await expect(page.locator("h1")).toBeVisible();
});

test("navigation links are clickable", async ({ page }) => {
  await page.goto("/");
  const nav = page.locator("header nav");
  await expect(nav).toBeVisible();
});
