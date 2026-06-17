# Called To His Kingdom

A Christian workout community — a communal space for **prayer requests**, **daily
scripture**, and **volunteer personal training** offered freely to those who
can't afford it.

Built with **Next.js (App Router) · Supabase · Tailwind CSS v4**, deployed on **Vercel**.

## Design language
- **Palette:** ivory `#FDFBF6` + white, antique gold `#C5A047` (only chroma),
  deep bronze `#9A7B1F`, warm ink `#2A2620`. Tokens live in `app/globals.css`.
- **Type:** Cormorant Garamond (display) + Inter (body), loaded in `app/layout.tsx`.
- **Buttons:** large, rounded, high-contrast (`.btn-gold` / `.btn-outline`).
- **Signature:** the daily verse as a gold-framed "illuminated" card (`ScriptureCard`).

## Getting started
```bash
npm install
cp .env.local.example .env.local   # then paste your Supabase URL + anon key
npm run dev                        # http://localhost:3000
```

## Database
1. In Supabase: **SQL Editor → New query**, paste all of `supabase/schema.sql`, Run.
2. This creates the tables, RLS policies, enums, and a trigger that auto-creates a
   `profiles` row on signup.
3. Browsing (prayers, trainers, scripture) is public; posting/booking requires auth.

## What's built (the scaffold)
- Home with daily scripture + destination cards (`app/page.tsx`)
- Prayer Wall, browsable, with a post CTA (`app/prayer/`)
- Find a Trainer with filters + cards (`app/trainers/`)
- Profile with member/trainer split (`app/profile/`)
- Auth + form placeholder pages (`app/login`, `app/signup`, `app/prayer/new`, `app/trainers/volunteer`)
- Supabase clients (`lib/supabase/`) and types (`lib/types.ts`)

> Pages currently render demo data. Every spot to connect Supabase is marked with a
> `// TODO:` comment — good first prompts for Claude Code.

## Roadmap (suggested build order with Claude Code)
1. **Auth** — wire `/login` + `/signup` to Supabase Auth; add middleware to refresh sessions.
2. **Prayer Wall live** — read `prayer_requests`; gate posting + "I'm praying" behind auth.
3. **Daily scripture** — query `scriptures` by today's date; seed a year of verses.
4. **Trainer availability calendar** — let trainers add slots; clients book (`bookings`).
5. **Trainer matching** — filter by location + mode + specialty.
6. **Profiles** — editable member fields + trainer onboarding toggle.
7. *(Later)* therapist/provider vetting flow — see the parked section in `schema.sql`.
