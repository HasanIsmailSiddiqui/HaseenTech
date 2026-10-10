import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/about.html",
  "/services.html",
  "/service-wordpress.html",
  "/service-woocommerce.html",
  "/service-landing-pages.html",
  "/service-redesign.html",
  "/service-maintenance.html",
  "/service-seo-speed.html",
  "/portfolio.html",
  "/pricing.html",
  "/contact.html",
  "/privacy.html",
  "/terms.html",
];

for (const route of routes) {
  test(`route loads: ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("header.site-header")).toBeVisible();
    await expect(page.locator("footer.site-footer")).toBeVisible();
  });
}

test("no horizontal overflow on home at mobile width", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/");
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
});

test("mobile drawer toggles cleanly", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/");
  await page.click("#menu-toggle");
  await expect(page.locator("#mobile-drawer")).toHaveClass(/open/);
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-drawer")).not.toHaveClass(/open/);
});
