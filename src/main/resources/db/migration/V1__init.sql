-- base tables for users ad their strength training

create table users (
  id uuid primary key,
  email text unique not null,
  password_hash text not null,
  created_at timestamptz not null default now()
);

create table exercises (
  id uuid primary key,
  user_id uuid references users(id),
  name text not null,
  category text not null,
  tags text[] not null default '{}',
  is_custom boolean not null default false
);

create table sessions (
  id uuid primary key,
  user_id uuid not null references users(id),
  started_at timestamptz not null,
  notes text
);

create table sets (
  id uuid primary key,
  session_id uuid not null references sessions(id) on delete cascade,
  exercise_id uuid not null references exercises(id),
  weight_kg numeric,
  reps int,
  rpe numeric,
  notes text
);

create index idx_sessions_user_started on sessions(user_id, started_at desc);
create index idx_sets_session_ex on sets(session_id, exercise_id);
