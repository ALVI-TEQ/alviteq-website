import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

const targets = [
  ["home", "/"], ["products", "/products/"],
  ["hms", "/products/hospital-management-system/"], ["contact", "/contact/"],
];
const minimums = { performance: .90, accessibility: .95, "best-practices": .95, seo: .95 };
const server = spawn("./node_modules/.bin/serve", ["out", "-l", "4173", "--no-clipboard"], { stdio: "ignore" });

async function waitForServer() {
  for (let attempt = 0; attempt < 30; attempt++) {
    try { if ((await fetch("http://127.0.0.1:4173/")).ok) return; } catch {}
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  throw new Error("Static preview did not start.");
}

let chrome;
let failed = false;
try {
  await waitForServer();
  chrome = await chromeLauncher.launch({ chromeFlags: ["--headless", "--no-sandbox", "--disable-gpu"] });
  await mkdir("test-results/lighthouse", { recursive: true });
  for (const [name, path] of targets) {
    const result = await lighthouse(`http://127.0.0.1:4173${path}`, { port: chrome.port, output: "json", logLevel: "error", onlyCategories: Object.keys(minimums) });
    if (!result) throw new Error(`No Lighthouse result for ${path}`);
    await writeFile(`test-results/lighthouse/${name}.json`, JSON.stringify(result.lhr, null, 2));
    const scores = Object.fromEntries(Object.keys(minimums).map(key => [key, result.lhr.categories[key].score || 0]));
    const cls = result.lhr.audits["cumulative-layout-shift"].numericValue || 0;
    console.log(`${name}: ${Object.entries(scores).map(([key, value]) => `${key}=${Math.round(value * 100)}`).join(" ")} cls=${cls.toFixed(3)}`);
    for (const [key, minimum] of Object.entries(minimums)) if (scores[key] < minimum) failed = true;
    if (cls > .10) failed = true;
  }
} finally {
  if (chrome) await chrome.kill();
  server.kill("SIGTERM");
}
if (failed) process.exitCode = 1;
