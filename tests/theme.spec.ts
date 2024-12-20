import { test, expect } from "@playwright/test";

test.describe("Dark Mode Tests", () => {
  test("should initialise in light or dark mode based on localStorage", async ({
    page,
  }) => {
    await page.goto("/");
    expect(
      await page.evaluate(() =>
        document.documentElement.classList.contains("dark"),
      ),
    ).toBe(false);

    await page.evaluate(() => localStorage.setItem("theme", "dark"));
    await page.reload();
    expect(
      await page.evaluate(() =>
        document.documentElement.classList.contains("dark"),
      ),
    ).toBe(true);
  });

  test("should toggle dark mode", async ({ page }) => {
    await page.goto("/");

    const toggleButton = page.locator(
      'button[data-test-id="dark-mode-toggle"]',
    );
    await toggleButton.click();
    expect(
      await page.evaluate(() =>
        document.documentElement.classList.contains("dark"),
      ),
    ).toBe(true);

    await toggleButton.click();
    expect(
      await page.evaluate(() =>
        document.documentElement.classList.contains("dark"),
      ),
    ).toBe(false);
  });
});
