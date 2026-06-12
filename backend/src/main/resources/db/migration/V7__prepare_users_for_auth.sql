ALTER TABLE users
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT now();

UPDATE users
SET password_hash = '$2a$10$N9qo8uLOickgx2ZMRZoMye.IjZAgcfl7p92ldGxad68LJZdL17lhWy'
WHERE email = 'ehsan@test.com'
  AND password_hash = '{noop}dev';