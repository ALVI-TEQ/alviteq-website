# ALVITEQ Website v2.1 — Deferrals

| ID | Status | Scope |
| --- | --- | --- |
| WEB-DEFER-001 | Implementation complete; production activation pending | Secure contact form, Turnstile, D1, rate limiting, retention, and counters require real Cloudflare bindings and live verification. |
| WEB-DEFER-002 | Partially resolved | Anonymous page/performance analytics integration is ready; custom product-event analytics remains deferred because Cloudflare Web Analytics does not provide that event model. |
| WEB-DEFER-003 | Resolved locally | Five 1200×630 Open Graph images and product-aware metadata are implemented; live crawler validation remains a release gate. |
| WEB-DEFER-004 | Deferred | OwnKeep store/download links await verified public destinations. |
| WEB-DEFER-005 | Deferred | Leadership and company details await confirmation and publication approval. |

Analytics must not correlate contact identities with browsing activity or contain message, patient, health, document, or form-field content.
