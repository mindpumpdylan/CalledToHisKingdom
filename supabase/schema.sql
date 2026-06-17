-- ============================================================================
-- Called To His Kingdom — database schema
-- Run in Supabase: SQL Editor → paste → Run. Or use the Supabase CLI.
-- Postgres + Row Level Security (RLS). Auth is handled by Supabase Auth;
-- `profiles` extends the built-in `auth.users` table.
-- ============================================================================

-- ---------- enums ----------
create type user_role        as enum ('member', 'trainer', 'admin');
create type training_mode    as enum ('online', 'in_person', 'both');
create type session_mode     as enum ('online', 'in_person');
create type interaction_type as enum ('praying', 'amen', 'comment');
create type booking_status   as enum ('requested', 'confirmed', 'completed', 'cancelled');

-- ---------- profiles (1:1 with auth.users) ----------
create table profiles (
  id                  uuid primary key references auth.users(id) on delete cascade,
  display_name        text not null,
  full_name           text,
  avatar_url          text,
  bio                 text,
  role                user_role not null default 'member',
  is_trainer          boolean not null default false,
  location_city       text,
  location_state      text,
  location_country    text,
  training_preference training_mode,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- ---------- trainer_profiles (1:1 with a profile, only when is_trainer) ----------
create table trainer_profiles (
  id                uuid primary key default gen_random_uuid(),
  profile_id        uuid not null unique references profiles(id) on delete cascade,
  specialties       text[] not null default '{}',
  certifications    text,
  years_experience  int,
  modes             training_mode not null default 'both',
  long_bio          text,
  accepting_clients boolean not null default true
);

-- ---------- prayer requests ----------
create table prayer_requests (
  id           uuid primary key default gen_random_uuid(),
  author_id    uuid not null references profiles(id) on delete cascade,
  title        text not null,
  body         text not null,
  category     text not null default 'Other',
  is_anonymous boolean not null default false,
  is_answered  boolean not null default false,
  created_at   timestamptz not null default now()
);
create index on prayer_requests (created_at desc);

-- ---------- prayer interactions (praying / amen / comment) ----------
create table prayer_interactions (
  id                uuid primary key default gen_random_uuid(),
  prayer_request_id uuid not null references prayer_requests(id) on delete cascade,
  user_id           uuid not null references profiles(id) on delete cascade,
  type              interaction_type not null,
  comment_body      text,
  created_at        timestamptz not null default now()
);
create index on prayer_interactions (prayer_request_id);
-- one "praying"/"amen" per user per prayer (comments can repeat)
create unique index uniq_reaction
  on prayer_interactions (prayer_request_id, user_id, type)
  where type in ('praying', 'amen');

-- ---------- daily scripture ----------
create table scriptures (
  id           uuid primary key default gen_random_uuid(),
  reference    text not null,
  text         text not null,
  translation  text not null default 'ESV',
  feature_date date unique
);

-- ---------- trainer availability ----------
create table trainer_availability (
  id         uuid primary key default gen_random_uuid(),
  trainer_id uuid not null references profiles(id) on delete cascade,
  starts_at  timestamptz not null,
  ends_at    timestamptz not null,
  mode       session_mode not null,
  is_booked  boolean not null default false
);
create index on trainer_availability (trainer_id, starts_at);

-- ---------- bookings ----------
create table bookings (
  id              uuid primary key default gen_random_uuid(),
  trainer_id      uuid not null references profiles(id) on delete cascade,
  client_id       uuid not null references profiles(id) on delete cascade,
  availability_id uuid references trainer_availability(id) on delete set null,
  status          booking_status not null default 'requested',
  mode            session_mode not null,
  notes           text,
  scheduled_at    timestamptz,
  created_at      timestamptz not null default now()
);

-- ============================================================================
-- Auto-create a profile row whenever a new auth user signs up
-- ============================================================================
create function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', 'Friend'));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- Row Level Security
-- Browsing (prayers, trainers, scripture, profiles) is PUBLIC.
-- Writing requires being the authenticated owner.
-- ============================================================================
alter table profiles             enable row level security;
alter table trainer_profiles     enable row level security;
alter table prayer_requests      enable row level security;
alter table prayer_interactions  enable row level security;
alter table scriptures           enable row level security;
alter table trainer_availability enable row level security;
alter table bookings             enable row level security;

-- profiles: anyone can read; you can edit only your own
create policy "profiles are public"        on profiles for select using (true);
create policy "update own profile"          on profiles for update using (auth.uid() = id);

-- trainer_profiles: public read; owner write
create policy "trainer profiles public"     on trainer_profiles for select using (true);
create policy "manage own trainer profile"  on trainer_profiles for all
  using (auth.uid() = profile_id) with check (auth.uid() = profile_id);

-- prayer_requests: public read; authored insert/update/delete by owner
create policy "prayers are public"          on prayer_requests for select using (true);
create policy "insert own prayer"           on prayer_requests for insert with check (auth.uid() = author_id);
create policy "update own prayer"           on prayer_requests for update using (auth.uid() = author_id);
create policy "delete own prayer"           on prayer_requests for delete using (auth.uid() = author_id);

-- prayer_interactions: public read; authenticated users add their own
create policy "interactions are public"     on prayer_interactions for select using (true);
create policy "insert own interaction"      on prayer_interactions for insert with check (auth.uid() = user_id);
create policy "delete own interaction"      on prayer_interactions for delete using (auth.uid() = user_id);

-- scriptures: public read; writes restricted to admins (service role bypasses RLS)
create policy "scriptures are public"       on scriptures for select using (true);

-- trainer_availability: public read; owning trainer manages
create policy "availability is public"      on trainer_availability for select using (true);
create policy "manage own availability"     on trainer_availability for all
  using (auth.uid() = trainer_id) with check (auth.uid() = trainer_id);

-- bookings: visible to the two parties; client creates; either party updates
create policy "see own bookings"            on bookings for select
  using (auth.uid() = client_id or auth.uid() = trainer_id);
create policy "client creates booking"      on bookings for insert with check (auth.uid() = client_id);
create policy "parties update booking"      on bookings for update
  using (auth.uid() = client_id or auth.uid() = trainer_id);

-- ============================================================================
-- FUTURE (parked): a `providers` table + admin vetting flow for therapists
-- and other licensed volunteers. Mirror trainer_profiles with a
-- `verified_by`/`verified_at` and a `provider_type` enum, kept behind review.
-- ============================================================================
