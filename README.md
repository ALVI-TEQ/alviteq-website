# Alviteq website

Static-exportable Next.js website for `alviteq.com`.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production validation

```bash
npm run lint
npm run build
npm run test:contact
npm run test:e2e
npm run test:lighthouse
```

The deployable static site is generated in `out/`.

## Cloudflare Pages

Create a Pages project connected to the GitHub repository with:

- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `out`
- Root directory: `/`
- Node.js version: `20` or newer

Add `alviteq.com` and `www.alviteq.com` under **Custom domains**. Keep
`alviteq.com` as the canonical host; `public/_redirects` redirects `www`.

Before changing nameservers, copy every existing DNS record—especially MX,
TXT, DKIM, SPF, and DMARC records—to Cloudflare.

### Website v2.1 bindings

The secure enquiry endpoint is a Cloudflare Pages Function at `POST /api/contact`.
Configure these production values in Cloudflare Pages; never commit their values:

- D1 binding `CONTACT_DB`, migrated with `migrations/0001_contact.sql`.
- Secret `TURNSTILE_SECRET_KEY`.
- Secret `RATE_LIMIT_SALT` containing a long random value.
- Variable `TURNSTILE_HOSTNAME=alviteq.com`.
- Variable `CONTACT_ALLOWED_ORIGIN=https://alviteq.com`.
- Build variable `NEXT_PUBLIC_TURNSTILE_SITE_KEY` containing the public site key.
- Build variable `NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN` containing the Cloudflare Web Analytics token.

Apply the D1 migration before enabling the public form. The endpoint fails closed
with `503` when required bindings are absent. Cloudflare Web Analytics is omitted
from the bundle when its public token is not configured.

The Playwright suite requires Chromium, Firefox, and WebKit binaries. Install them
on the QA runner with `npx playwright install chromium firefox webkit`.
