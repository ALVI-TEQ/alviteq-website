# ALVITEQ Website v2.1 — Contact Security

## Architecture

The three form locations use one React component and one Cloudflare Pages Function: `POST /api/contact`. Accepted enquiries are stored in D1. No attachment, account, CRM, or marketing workflow is included.

## Required bindings

- `CONTACT_DB`: D1 database binding.
- `TURNSTILE_SECRET_KEY`: secret Turnstile key.
- `RATE_LIMIT_SALT`: long random server-only secret.
- `TURNSTILE_HOSTNAME`: `alviteq.com`.
- `CONTACT_ALLOWED_ORIGIN`: `https://alviteq.com`.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: public build-time site key.

## Controls

The endpoint enforces same-origin requests, JSON-only content, a 16 KiB body limit, strict enums and field lengths, consent, a honeypot, control-character/HTML/header-injection rejection, Turnstile Siteverify, hostname and `contact` action checks, source-hash rate limits, duplicate idempotency keys, generic errors, and no content logging.

Turnstile tokens are never stored. Source addresses are salted and hashed into a short-lived rate-event table. Enquiry rows contain only the approved fields and expire after 90 days while their status remains `new`. Conversion counters contain only day, topic, and count.

## Operations

Apply `migrations/0001_contact.sql` before adding the production bindings. The service fails closed when D1, Turnstile, or rate-limit configuration is missing. Review new enquiries through a controlled D1 operational process until a separate secure delivery workflow is approved.

Never log request bodies, Turnstile tokens, raw headers, patient information, credentials, or message contents.
