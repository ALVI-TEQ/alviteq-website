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
