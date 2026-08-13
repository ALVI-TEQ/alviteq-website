import assert from "node:assert/strict";
import test from "node:test";
import { onRequestPost, validateContact } from "../functions/api/contact";

const validPayload = {
  topic: "hms", product: "alviteq-hms", name: "Example Name", email: "name@example.com",
  organisation: "Example Hospital", country: "IN", role: "Hospital Administrator",
  subject: "HMS design partner discussion", message: "We would like to discuss the product in more detail.",
  privacyAccepted: true, turnstileToken: "verified-token", website: "",
};

class Statement {
  values: unknown[] = [];
  constructor(public sql: string, private db: FakeDb) {}
  bind(...values: unknown[]) { this.values = values; return this; }
  async first<T>() {
    if (this.sql.includes("contact_idempotency")) return this.db.duplicate as T | null;
    if (this.sql.includes("contact_rate_events")) return this.db.limits as T;
    return null;
  }
  async run() { return { success: true }; }
}

class FakeDb {
  duplicate: { public_id: string } | null = null;
  limits = { recent: 0, daily: 0 };
  failBatch = false;
  batches: Statement[][] = [];
  prepare(sql: string) { return new Statement(sql, this); }
  async batch(statements: Statement[]) { if (this.failBatch) throw new Error("storage unavailable"); this.batches.push(statements); return statements.map(() => ({ success: true })); }
}

function request(payload = validPayload, headers: Record<string, string> = {}) {
  return new Request("https://alviteq.com/api/contact", {
    method: "POST", body: JSON.stringify(payload), headers: {
      origin: "https://alviteq.com", "content-type": "application/json", "idempotency-key": "0123456789abcdef",
      "cf-connecting-ip": "203.0.113.10", ...headers,
    },
  });
}

function context(db = new FakeDb(), payload = validPayload, headers: Record<string, string> = {}) {
  return { request: request(payload, headers), env: {
    CONTACT_DB: db, TURNSTILE_SECRET_KEY: "test-secret", TURNSTILE_HOSTNAME: "alviteq.com",
    CONTACT_ALLOWED_ORIGIN: "https://alviteq.com", RATE_LIMIT_SALT: "test-rate-limit-salt",
  } } as never;
}

async function body(response: Response) { return response.json() as Promise<Record<string, unknown>>; }

test("accepts a valid verified submission without logging content", async () => {
  const originalFetch = globalThis.fetch; const originalLog = console.log; let logged = false;
  globalThis.fetch = async () => new Response(JSON.stringify({ success: true, hostname: "alviteq.com", action: "contact" }));
  console.log = () => { logged = true; };
  try { const db = new FakeDb(); const result = await onRequestPost(context(db)); assert.equal(result.status, 201); assert.match(String((await body(result)).reference), /^AVQ-/); assert.equal(logged, false); assert.equal(db.batches.length, 2); }
  finally { globalThis.fetch = originalFetch; console.log = originalLog; }
});

test("reports field errors for missing required values", () => {
  const result = validateContact({});
  for (const field of ["topic", "name", "email", "subject", "message", "privacyAccepted", "turnstileToken"]) assert.ok(result.errors[field]);
});

test("rejects invalid email, enums, country, and missing consent", () => {
  const result = validateContact({ ...validPayload, topic: "sales", product: "other", email: "bad", country: "IND", privacyAccepted: false });
  for (const field of ["topic", "product", "email", "country", "privacyAccepted"]) assert.ok(result.errors[field]);
});

test("rejects oversized messages, honeypots, HTML, script, and header injection", () => {
  assert.ok(validateContact({ ...validPayload, message: "x".repeat(4001) }).errors.message);
  assert.ok(validateContact({ ...validPayload, website: "spam.example" }).errors.website);
  assert.ok(validateContact({ ...validPayload, message: "This contains <script>alert(1)</script> markup." }).errors.message);
  assert.ok(validateContact({ ...validPayload, subject: "Valid subject\r\nBcc: victim@example.com" }).errors.subject);
});

test("rejects wrong origin and content type", async () => {
  assert.equal((await onRequestPost(context(new FakeDb(), validPayload, { origin: "https://evil.example" }))).status, 403);
  assert.equal((await onRequestPost(context(new FakeDb(), validPayload, { "content-type": "text/plain" }))).status, 400);
});

test("rejects oversized requests before parsing", async () => {
  const result = await onRequestPost(context(new FakeDb(), validPayload, { "content-length": "20000" }));
  assert.equal(result.status, 400); assert.equal((await body(result)).code, "INVALID_REQUEST");
});

test("rejects missing and invalid Turnstile tokens", async () => {
  assert.equal((await onRequestPost(context(new FakeDb(), { ...validPayload, turnstileToken: "" }))).status, 422);
  const originalFetch = globalThis.fetch; globalThis.fetch = async () => new Response(JSON.stringify({ success: false }));
  try { assert.equal((await onRequestPost(context())).status, 403); } finally { globalThis.fetch = originalFetch; }
});

for (const [label, verification] of [
  ["wrong hostname", { success: true, hostname: "example.com", action: "contact" }],
  ["wrong action", { success: true, hostname: "alviteq.com", action: "login" }],
  ["expired or reused token", { success: false, "error-codes": ["timeout-or-duplicate"] }],
] as const) test(`rejects ${label}`, async () => {
  const originalFetch = globalThis.fetch; globalThis.fetch = async () => new Response(JSON.stringify(verification));
  try { assert.equal((await onRequestPost(context())).status, 403); } finally { globalThis.fetch = originalFetch; }
});

test("handles temporary verification failure generically", async () => {
  const originalFetch = globalThis.fetch; globalThis.fetch = async () => new Response("unavailable", { status: 503 });
  try { const result = await onRequestPost(context()); assert.equal(result.status, 503); assert.equal((await body(result)).code, "SERVICE_UNAVAILABLE"); }
  finally { globalThis.fetch = originalFetch; }
});

test("rate limits without revealing the triggering signal", async () => {
  const db = new FakeDb(); db.limits = { recent: 5, daily: 5 };
  const result = await onRequestPost(context(db)); assert.equal(result.status, 429); assert.equal((await body(result)).code, "RATE_LIMITED");
});

test("returns the original reference for a duplicate idempotency key", async () => {
  const db = new FakeDb(); db.duplicate = { public_id: "AVQ-EXISTING" };
  const result = await onRequestPost(context(db)); assert.equal(result.status, 201); assert.equal((await body(result)).reference, "AVQ-EXISTING");
});

test("fails safely when storage is unavailable", async () => {
  const db = new FakeDb(); db.failBatch = true;
  const result = await onRequestPost(context(db)); assert.equal(result.status, 503); assert.equal((await body(result)).code, "SERVICE_UNAVAILABLE");
});
