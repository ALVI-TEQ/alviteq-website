# ALVITEQ Website v2.1 — Browser Matrix

The repository includes Playwright projects for Chromium desktop, Firefox desktop, WebKit desktop, Pixel 7, and iPhone 14. The suite covers dropdown and mobile navigation, keyboard operation, Escape/focus return, outside click, route navigation, skip link, nested reloads, 404, reduced motion, focus visibility, axe scans, and horizontal overflow at 320, 375, 768, 1024, 1440, and 1920 pixels.

| Target | Automated result | Manual result |
| --- | --- | --- |
| Chrome desktop | Not run — browser backend unavailable in current session | Pending |
| Safari desktop / WebKit | Not run — browser backend unavailable in current session | Pending |
| Firefox desktop | Not run — browser backend unavailable in current session | Pending |
| Chrome Android viewport | Not run — browser backend unavailable in current session | Pending |
| Safari iPhone viewport | Not run — browser backend unavailable in current session | Pending |

Run `npm run build`, install the Playwright browsers, then run `npm run test:e2e`. Automated WebKit is an approximation; final Safari checks require Safari on macOS and iOS hardware or an approved device service.
