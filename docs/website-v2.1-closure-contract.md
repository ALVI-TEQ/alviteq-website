# ALVITEQ Website v2.1 — Closure Contract

V2.1 adds operational trust and conversion infrastructure without redesigning v2.0.

The release may be marked `PASS / FROZEN` only when all of the following are evidenced:

- lint, production build, and static routes pass;
- Playwright interaction and browser-matrix tests pass;
- manual keyboard checks pass;
- axe reports zero critical and serious violations;
- contact validation, Turnstile, rate limits, idempotency, D1 storage, and retention pass in production;
- no secrets or form contents appear in client bundles, analytics, or logs;
- Cloudflare Web Analytics and the Privacy Policy match;
- all Open Graph images and metadata validate;
- live routes, API behavior, security.txt, and asset hashes pass;
- Lighthouse budgets meet the documented thresholds.

Until every gate passes, use `IN PROGRESS` or `DEPLOYED / NOT FROZEN`; never infer a pass from implementation alone.
