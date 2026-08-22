import { test, expect } from "@playwright/test";

test("host app loads and links to Storybook", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Storybook Lab" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "localhost:6006" }),
  ).toHaveAttribute("href", "http://localhost:6006");
});
