import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const accessibilityRoutes = ["/", "/products/", "/products/ownkeep/", "/products/hospital-management-system/", "/trust/", "/security/", "/accessibility/", "/contact/", "/about/", "/careers/", "/does-not-exist/"];

test("Products dropdown works by mouse, outside click, and route navigation", async ({ page }) => {
  test.skip((page.viewportSize()?.width || 0) < 850, "Desktop navigation is hidden at mobile widths");
  await page.goto("/");
  const trigger = page.locator(".products-nav summary");
  await trigger.click();
  await expect(page.locator(".products-nav")).toHaveJSProperty("open", true);
  await page.locator("main").click({ position: { x: 10, y: 10 } });
  await expect(page.locator(".products-nav")).toHaveJSProperty("open", false);
  await trigger.click();
  await page.getByRole("link", { name: "ALVITEQ HMS" }).first().click();
  await expect(page).toHaveURL(/hospital-management-system\/$/);
});

test("Products dropdown supports keyboard open, Escape, and focus return", async ({ page }) => {
  test.skip((page.viewportSize()?.width || 0) < 850, "Desktop navigation is hidden at mobile widths");
  await page.goto("/");
  const trigger = page.locator(".products-nav summary");
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".products-nav")).toHaveJSProperty("open", true);
  await page.keyboard.press("Escape");
  await expect(page.locator(".products-nav")).toHaveJSProperty("open", false);
  await expect(trigger).toBeFocused();
  await page.keyboard.press("Space");
  await expect(page.locator(".products-nav")).toHaveJSProperty("open", true);
});

test("Mobile navigation opens, closes, and returns focus", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const trigger = page.locator(".mobile-nav summary");
  await trigger.focus(); await page.keyboard.press("Enter");
  await expect(page.locator(".mobile-nav")).toHaveJSProperty("open", true);
  await page.keyboard.press("Escape");
  await expect(page.locator(".mobile-nav")).toHaveJSProperty("open", false);
  await expect(trigger).toBeFocused();
});

test("Skip link reaches main content and focus remains visible", async ({ page }) => {
  await page.goto("/"); await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to main content" });
  await expect(skip).toBeFocused(); await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
  await page.keyboard.press("Tab");
  const focused = page.locator(":focus");
  expect(await focused.evaluate(element => getComputedStyle(element).outlineStyle)).not.toBe("none");
});

test("Nested routes reload and unknown routes render the custom 404", async ({ page }) => {
  await page.goto("/products/hospital-management-system/"); await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("hospital operations");
  const response = await page.goto("/does-not-exist/");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("isn't here");
});

test("Reduced motion disables non-essential animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" }); await page.goto("/");
  const duration = await page.locator(".reveal").first().evaluate(element => getComputedStyle(element).animationDuration);
  expect(parseFloat(duration)).toBeLessThanOrEqual(.001);
});

test("Important routes have no horizontal overflow at required widths", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Viewport sweep runs once in Chromium");
  for (const width of [320, 375, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/products/", "/products/ownkeep/", "/products/hospital-management-system/", "/trust/", "/contact/", "/about/", "/security/", "/accessibility/"]) {
      await page.goto(route);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `${route} overflows at ${width}px`).toBeLessThanOrEqual(1);
    }
  }
});

for (const route of accessibilityRoutes) test(`axe has no critical or serious violations on ${route}`, async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Accessibility scan runs once in Chromium");
  await page.goto(route);
  const results = await new AxeBuilder({ page }).analyze();
  const blocking = results.violations.filter(violation => violation.impact === "critical" || violation.impact === "serious");
  expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
});
