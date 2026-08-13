import { contactProducts, contactTopics, type ContactFieldErrors, type ContactPayload } from "../../src/lib/contact-contract";

interface D1Result<T = unknown> { results?: T[]; success: boolean }
interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  run(): Promise<D1Result>;
}
interface D1Database { prepare(query: string): D1PreparedStatement; batch(statements: D1PreparedStatement[]): Promise<D1Result[]> }
interface Env {
  CONTACT_DB: D1Database;
  TURNSTILE_SECRET_KEY: string;
  TURNSTILE_HOSTNAME?: string;
  CONTACT_ALLOWED_ORIGIN?: string;
  RATE_LIMIT_SALT: string;
}
interface PagesContext { request: Request; env: Env }

const JSON_HEADERS = { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" };
const MAX_REQUEST_BYTES = 16_384;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const htmlPattern = /<\/?[a-z][^>]*>/i;

function response(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

function text(value: unknown) { return typeof value === "string" ? value.trim() : ""; }
function validLength(value: string, min: number, max: number) { return value.length >= min && value.length <= max; }
function unsafeText(value: string) { return /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(value) || htmlPattern.test(value); }

export function validateContact(input: unknown): { data?: ContactPayload; errors: ContactFieldErrors } {
  const raw = input && typeof input === "object" ? input as Record<string, unknown> : {};
  const data: ContactPayload = {
    topic: text(raw.topic) as ContactPayload["topic"], product: text(raw.product) as ContactPayload["product"],
    name: text(raw.name), email: text(raw.email).toLowerCase(), organisation: text(raw.organisation),
    country: text(raw.country).toUpperCase(), role: text(raw.role), subject: text(raw.subject),
    message: text(raw.message), privacyAccepted: raw.privacyAccepted === true,
    turnstileToken: text(raw.turnstileToken), website: text(raw.website),
  };
  const errors: ContactFieldErrors = {};
  if (!contactTopics.includes(data.topic)) errors.topic = "Choose a valid topic.";
  if (!contactProducts.includes(data.product)) errors.product = "Choose a valid product.";
  if (!validLength(data.name, 2, 100) || unsafeText(data.name) || /[\r\n]/.test(data.name)) errors.name = "Enter a valid name.";
  if (!validLength(data.email, 3, 254) || !emailPattern.test(data.email) || /[\r\n]/.test(data.email)) errors.email = "Enter a valid email address.";
  if (data.organisation && (!validLength(data.organisation, 1, 150) || unsafeText(data.organisation))) errors.organisation = "Enter a valid organisation.";
  if (data.country && !/^[A-Z]{2}$/.test(data.country)) errors.country = "Use a two-letter country code.";
  if (data.role && (!validLength(data.role, 1, 100) || unsafeText(data.role))) errors.role = "Enter a valid role.";
  if (!validLength(data.subject, 5, 150) || unsafeText(data.subject) || /[\r\n]/.test(data.subject)) errors.subject = "Enter a valid subject.";
  if (!validLength(data.message, 20, 4000) || unsafeText(data.message)) errors.message = "Enter a message between 20 and 4,000 characters without HTML.";
  if (!data.privacyAccepted) errors.privacyAccepted = "Privacy acknowledgement is required.";
  if (!data.turnstileToken || data.turnstileToken.length > 2048) errors.turnstileToken = "Verification is required.";
  if (data.website) errors.website = "Unable to accept this submission.";
  return Object.keys(errors).length ? { errors } : { data, errors };
}

async function sha256(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, "0")).join("");
}

function publicReference() {
  const time = Date.now().toString(36).toUpperCase().padStart(9, "0");
  const random = [...crypto.getRandomValues(new Uint8Array(8))].map(value => value.toString(36).padStart(2, "0")).join("").toUpperCase();
  return `AVQ-${time}${random}`.slice(0, 28);
}

async function verifyTurnstile(token: string, remoteip: string, idempotencyKey: string, env: Env) {
  const form = new FormData();
  form.set("secret", env.TURNSTILE_SECRET_KEY);
  form.set("response", token);
  if (remoteip) form.set("remoteip", remoteip);
  form.set("idempotency_key", idempotencyKey);
  const result = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form });
  if (!result.ok) throw new Error("verification unavailable");
  const body = await result.json() as { success?: boolean; hostname?: string; action?: string };
  const expectedHostname = env.TURNSTILE_HOSTNAME || "alviteq.com";
  return body.success === true && body.hostname === expectedHostname && body.action === "contact";
}

export async function onRequestPost(context: PagesContext): Promise<Response> {
  const { request, env } = context;
  const origin = request.headers.get("origin") || "";
  const allowedOrigin = env.CONTACT_ALLOWED_ORIGIN || "https://alviteq.com";
  if (origin !== allowedOrigin) return response(403, { success: false, code: "VERIFICATION_REJECTED", message: "Unable to accept this submission." });
  if (request.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase() !== "application/json") return response(400, { success: false, code: "INVALID_REQUEST", message: "Unable to accept this submission." });
  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > MAX_REQUEST_BYTES) return response(400, { success: false, code: "INVALID_REQUEST", message: "Unable to accept this submission." });

  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) return response(400, { success: false, code: "INVALID_REQUEST", message: "Unable to accept this submission." });
  let parsed: unknown;
  try { parsed = JSON.parse(rawBody); } catch { return response(400, { success: false, code: "INVALID_REQUEST", message: "Unable to accept this submission." }); }
  if (parsed && typeof parsed === "object" && text((parsed as Record<string, unknown>).website)) return response(400, { success: false, code: "INVALID_REQUEST", message: "Unable to accept this submission." });
  const validation = validateContact(parsed);
  if (!validation.data) return response(422, { success: false, code: "VALIDATION_FAILED", message: "Please review the highlighted fields.", fields: validation.errors });
  if (!env.CONTACT_DB || !env.TURNSTILE_SECRET_KEY || !env.RATE_LIMIT_SALT) return response(503, { success: false, code: "SERVICE_UNAVAILABLE", message: "Submission service temporarily unavailable." });

  const idempotencyKey = text(request.headers.get("idempotency-key"));
  if (!/^[A-Za-z0-9_-]{16,100}$/.test(idempotencyKey)) return response(400, { success: false, code: "INVALID_REQUEST", message: "Unable to accept this submission." });
  try {
    await env.CONTACT_DB.batch([
      env.CONTACT_DB.prepare("DELETE FROM contact_rate_events WHERE expires_at <= unixepoch()"),
      env.CONTACT_DB.prepare("DELETE FROM contact_idempotency WHERE expires_at <= unixepoch()"),
      env.CONTACT_DB.prepare("DELETE FROM contact_submissions WHERE expires_at <= unixepoch() AND status = 'new'"),
    ]);
  } catch { return response(503, { success: false, code: "SERVICE_UNAVAILABLE", message: "Submission service temporarily unavailable." }); }
  const idempotencyHash = await sha256(`${env.RATE_LIMIT_SALT}:${idempotencyKey}`);
  const existing = await env.CONTACT_DB.prepare("SELECT public_id FROM contact_idempotency WHERE key_hash = ? AND expires_at > unixepoch()").bind(idempotencyHash).first<{ public_id: string }>();
  if (existing) return response(201, { success: true, reference: existing.public_id });

  const source = request.headers.get("cf-connecting-ip") || "unknown";
  const sourceHash = await sha256(`${env.RATE_LIMIT_SALT}:${source}`);
  const limits = await env.CONTACT_DB.prepare("SELECT SUM(CASE WHEN created_at > unixepoch() - 900 THEN 1 ELSE 0 END) AS recent, COUNT(*) AS daily FROM contact_rate_events WHERE source_hash = ? AND created_at > unixepoch() - 86400").bind(sourceHash).first<{ recent: number; daily: number }>();
  if ((limits?.recent || 0) >= 5 || (limits?.daily || 0) >= 20) return response(429, { success: false, code: "RATE_LIMITED", message: "Unable to accept this submission right now." });
  try { await env.CONTACT_DB.prepare("INSERT INTO contact_rate_events (source_hash, created_at, expires_at) VALUES (?, unixepoch(), unixepoch() + 86400)").bind(sourceHash).run(); }
  catch { return response(503, { success: false, code: "SERVICE_UNAVAILABLE", message: "Submission service temporarily unavailable." }); }

  let verified = false;
  try { verified = await verifyTurnstile(validation.data.turnstileToken, source === "unknown" ? "" : source, idempotencyKey, env); }
  catch { return response(503, { success: false, code: "SERVICE_UNAVAILABLE", message: "Submission service temporarily unavailable." }); }
  if (!verified) return response(403, { success: false, code: "VERIFICATION_REJECTED", message: "Unable to accept this submission." });

  const publicId = publicReference();
  const data = validation.data;
  try {
    await env.CONTACT_DB.batch([
      env.CONTACT_DB.prepare("INSERT INTO contact_submissions (public_id, topic, product, name, email, organisation, country, role, subject, message, privacy_accepted_at, status, created_at, expires_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, unixepoch(), 'new', unixepoch(), unixepoch() + 7776000)").bind(publicId, data.topic, data.product, data.name, data.email, data.organisation || null, data.country || null, data.role || null, data.subject, data.message),
      env.CONTACT_DB.prepare("INSERT INTO contact_idempotency (key_hash, public_id, expires_at) VALUES (?, ?, unixepoch() + 86400)").bind(idempotencyHash, publicId),
      env.CONTACT_DB.prepare("INSERT INTO contact_conversion_counters (day, topic, count) VALUES (date('now'), ?, 1) ON CONFLICT(day, topic) DO UPDATE SET count = count + 1").bind(data.topic),
    ]);
  } catch { return response(503, { success: false, code: "SERVICE_UNAVAILABLE", message: "Submission service temporarily unavailable." }); }
  return response(201, { success: true, reference: publicId });
}

export async function onRequest(): Promise<Response> {
  return response(405, { success: false, code: "METHOD_NOT_ALLOWED", message: "Method not allowed." });
}
