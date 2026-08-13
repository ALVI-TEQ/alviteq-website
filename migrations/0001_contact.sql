CREATE TABLE IF NOT EXISTS contact_submissions (
  public_id TEXT PRIMARY KEY,
  topic TEXT NOT NULL,
  product TEXT NOT NULL DEFAULT '',
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  organisation TEXT,
  country TEXT,
  role TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  privacy_accepted_at INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS contact_submissions_expiry ON contact_submissions(expires_at);

CREATE TABLE IF NOT EXISTS contact_rate_events (
  source_hash TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS contact_rate_source_time ON contact_rate_events(source_hash, created_at);
CREATE INDEX IF NOT EXISTS contact_rate_expiry ON contact_rate_events(expires_at);

CREATE TABLE IF NOT EXISTS contact_idempotency (
  key_hash TEXT PRIMARY KEY,
  public_id TEXT NOT NULL,
  expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS contact_idempotency_expiry ON contact_idempotency(expires_at);

CREATE TABLE IF NOT EXISTS contact_conversion_counters (
  day TEXT NOT NULL,
  topic TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (day, topic)
);
