ALTER TABLE sets ADD COLUMN IF NOT EXISTS created_at timestamptz;--adds column if missing

UPDATE sets s
SET created_at = COALESCE(s.created_at, sess.started_at, now())
FROM sessions sess
WHERE s.session_id = sess.id AND s.created_at IS NULL;--to backfill nulls

--enforce NOT NULL+ default for future inserts
ALTER TABLE sets ALTER COLUMN created_at SET NOT NULL;
ALTER TABLE sets ALTER COLUMN created_at SET DEFAULT now();