import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/about",
  "/services",
  "/services/wordpress-development",
  "/portfolio",
  "/packages",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions",
];

for (const route of routes) {
  test(`route loads: ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("main")).toBeVisible();
    await expect(
      page.getByRole("banner").getByRole("link", { name: "HaseenTech home" }),
    ).toBeVisible();
  });
}

test("contact form prefills package query param", async ({ page }) => {
  await page.goto("/contact?package=business&service=elementor-design");
  await expect(page.getByLabel(/Service required/i)).toHaveValue("elementor-design");
  await expect(page.getByLabel(/^Package/i)).toHaveValue("business");
});

test("no horizontal overflow on home at mobile width", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
});
