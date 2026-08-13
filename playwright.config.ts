import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  retries: 1,
  outputDir: "test-results/artifacts",
  reporter: [["list"], ["html", { open: "never", outputFolder: "playwright-report" }]],
  use: { baseURL: "http://127.0.0.1:4173", trace: "retain-on-failure", screenshot: "only-on-failure" },
  webServer: { command: "npm run preview", url: "http://127.0.0.1:4173", reuseExistingServer: true },
  projects: [
    { name: "chrome-desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox-desktop", use: { ...devices["Desktop Firefox"] } },
    { name: "safari-desktop", use: { ...devices["Desktop Safari"] } },
    { name: "chrome-android", use: { ...devices["Pixel 7"] } },
    { name: "safari-iphone", use: { ...devices["iPhone 14"] } },
  ],
});
