"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { contactProducts, contactTopics, type ContactFieldErrors, type ContactProduct, type ContactTopic } from "@/lib/contact-contract";

declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

const topicLabels: Record<ContactTopic, string> = {
  general: "General enquiry", ownkeep: "OwnKeep support", hms: "ALVITEQ HMS", partnership: "Partnership",
  security: "Security", privacy: "Privacy", careers: "Careers", media: "Media",
};

export default function ContactForm({ defaultTopic = "general", defaultProduct = "" }: { defaultTopic?: ContactTopic; defaultProduct?: ContactProduct }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
  const widgetElement = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string>("");
  const [token, setToken] = useState("");
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [reference, setReference] = useState("");

  useEffect(() => {
    if (!siteKey || !widgetElement.current) return;
    const render = () => {
      if (!window.turnstile || !widgetElement.current || widgetId.current) return;
      widgetId.current = window.turnstile.render(widgetElement.current, {
        sitekey: siteKey, action: "contact", theme: "light", size: "flexible",
        callback: (value: string) => setToken(value),
        "expired-callback": () => setToken(""),
        "error-callback": () => setToken(""),
      });
    };
    const existing = document.querySelector<HTMLScriptElement>('script[data-alviteq-turnstile="true"]');
    if (existing) { if (window.turnstile) render(); else existing.addEventListener("load", render, { once: true }); }
    else {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true; script.defer = true; script.dataset.alviteqTurnstile = "true";
      script.addEventListener("load", render, { once: true }); document.head.appendChild(script);
    }
    return () => { if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current); widgetId.current = ""; };
  }, [siteKey]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const payload = {
      topic: values.get("topic"), product: values.get("product"), name: values.get("name"), email: values.get("email"),
      organisation: values.get("organisation"), country: values.get("country"), role: values.get("role"),
      subject: values.get("subject"), message: values.get("message"), privacyAccepted: values.get("privacyAccepted") === "on",
      turnstileToken: token, website: values.get("website"),
    };
    setStatus("sending"); setErrors({}); setReference("");
    try {
      const result = await fetch("/api/contact", {
        method: "POST", headers: { "content-type": "application/json", "idempotency-key": crypto.randomUUID() },
        body: JSON.stringify(payload), credentials: "same-origin",
      });
      const body = await result.json() as { success?: boolean; reference?: string; fields?: ContactFieldErrors; message?: string };
      if (!result.ok || !body.success) {
        setErrors(body.fields || {}); setStatus("error");
        if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current); setToken(""); return;
      }
      setReference(body.reference || ""); setStatus("success"); form.reset();
      if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current); setToken("");
    } catch { setStatus("error"); }
  }

  return <div className="contact-form-wrap">
    <div className="sensitive-warning" role="note"><strong>Do not submit sensitive information.</strong><span>Do not send patient names, medical records, clinical information, credentials, passwords, recovery material, or other sensitive data.</span></div>
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
      <div className="form-grid">
        <label>Topic<select name="topic" defaultValue={defaultTopic} required>{contactTopics.map(value => <option value={value} key={value}>{topicLabels[value]}</option>)}</select>{errors.topic && <span className="field-error">{errors.topic}</span>}</label>
        <label>Product<select name="product" defaultValue={defaultProduct}>{contactProducts.map(value => <option value={value} key={value}>{value === "" ? "Not product-specific" : value === "ownkeep" ? "OwnKeep" : "ALVITEQ HMS"}</option>)}</select>{errors.product && <span className="field-error">{errors.product}</span>}</label>
        <label>Name<input name="name" minLength={2} maxLength={100} autoComplete="name" required />{errors.name && <span className="field-error">{errors.name}</span>}</label>
        <label>Work email<input name="email" type="email" maxLength={254} autoComplete="email" required />{errors.email && <span className="field-error">{errors.email}</span>}</label>
        <label>Organisation <small>Optional</small><input name="organisation" maxLength={150} autoComplete="organization" />{errors.organisation && <span className="field-error">{errors.organisation}</span>}</label>
        <label>Country code <small>Optional</small><input name="country" minLength={2} maxLength={2} autoComplete="country" placeholder="IN" />{errors.country && <span className="field-error">{errors.country}</span>}</label>
        <label className="form-wide">Role <small>Optional</small><input name="role" maxLength={100} autoComplete="organization-title" />{errors.role && <span className="field-error">{errors.role}</span>}</label>
        <label className="form-wide">Subject<input name="subject" minLength={5} maxLength={150} required />{errors.subject && <span className="field-error">{errors.subject}</span>}</label>
        <label className="form-wide">Message<textarea name="message" minLength={20} maxLength={4000} rows={8} required />{errors.message && <span className="field-error">{errors.message}</span>}</label>
      </div>
      <label className="privacy-check"><input name="privacyAccepted" type="checkbox" required /><span>I have read the <Link href="/privacy">Privacy Policy</Link> and understand how this enquiry will be handled.</span></label>
      {errors.privacyAccepted && <span className="field-error">{errors.privacyAccepted}</span>}
      {siteKey ? <div ref={widgetElement} className="turnstile-slot" aria-label="Security verification" /> : <p className="form-configuration-note">Secure form verification is not configured in this build. Please use the verified email routes below.</p>}
      {errors.turnstileToken && <span className="field-error">{errors.turnstileToken}</span>}
      <button className="button" type="submit" disabled={status === "sending" || !siteKey || !token}>{status === "sending" ? "Sending…" : "Send enquiry"}</button>
      <div className="form-status" aria-live="polite">{status === "success" && <p><strong>Enquiry accepted.</strong> Your reference is <code>{reference}</code>.</p>}{status === "error" && <p>We could not accept the enquiry. Review the form or try again later.</p>}</div>
    </form>
  </div>;
}
