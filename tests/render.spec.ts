import { test, expect } from "@playwright/test";

test.describe("App Load and Render Tests", () => {
  test("should load the app and render header and footer", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });
});
