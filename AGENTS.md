XC                  N0N M,L;'
'
JHT[PUTRR6890-=0    !~!₹
₹';,M NKP[][4LKLP1ASD# Project Instructions

## Repository Purpose

Static-exportable Next.js marketing/product website for `alviteq.com`, governed by ALVITEQ brand and website-system assets.

## Important Directories

- `src/app/`: pages, metadata, sitemap, manifest, and global styles.
- `src/lib/`: shared SEO and site utilities.
- `public/`: production assets and redirect configuration.
- `out/`: generated static export; do not hand-edit.

## Architecture And Conventions

- Follow the approved ALVITEQ brand, logo, typography, color, and content system.
- Keep pages statically exportable and accessible.
- Update shared SEO/metadata utilities with new public pages.

## Common Commands

- Install: `npm install`.
- Development: `npm run dev`.
- Lint: `npm run lint`.
- Build/static export: `npm run build`.

## Deployment Constraints

- Deploy `out/` to Cloudflare Pages using the settings in `README.md`.
- Preserve mail-related DNS records when changing nameservers or domains.
