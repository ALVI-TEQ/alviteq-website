# ALVITEQ Website v2.1 — Validation Report

## Current state

```text
ALVITEQ Website v2.0 — DEPLOYED / NOT FROZEN
ALVITEQ Website v2.1 — IN PROGRESS
```

## Implemented locally

- shared contact form at all three required locations;
- Cloudflare Pages Function and D1 schema;
- server validation, Turnstile verification, rate limiting, idempotency, retention, and aggregate counters;
- privacy-policy update and sensitive-data warnings;
- conditional Cloudflare Web Analytics integration;
- five product-specific Open Graph images and metadata routing;
- security.txt;
- contact unit/negative tests, Playwright/axe suite, and Lighthouse CI budgets.

## Pending production evidence

- real Turnstile site/secret keys and hostname verification;
- D1 creation, binding, migration, storage inspection, and retention operation;
- Cloudflare Web Analytics token and dashboard confirmation;
- Playwright browsers, axe results, manual keyboard checks, and real Safari/device checks;
- Lighthouse results and console/network review;
- live API negative tests and final asset hashes.

No freeze status may be recorded until these items pass.
