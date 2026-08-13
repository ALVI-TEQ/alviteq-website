export const contactTopics = ["general", "ownkeep", "hms", "partnership", "security", "privacy", "careers", "media"] as const;
export const contactProducts = ["", "ownkeep", "alviteq-hms"] as const;

export type ContactTopic = typeof contactTopics[number];
export type ContactProduct = typeof contactProducts[number];

export interface ContactPayload {
  topic: ContactTopic;
  product: ContactProduct;
  name: string;
  email: string;
  organisation: string;
  country: string;
  role: string;
  subject: string;
  message: string;
  privacyAccepted: boolean;
  turnstileToken: string;
  website?: string;
}

export interface ContactFieldErrors {
  [field: string]: string;
}
