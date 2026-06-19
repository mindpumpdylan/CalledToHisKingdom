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
3. Run `supabase/booking_sync_trigger.sql` next — it adds a security-definer trigger
   that keeps `trainer_availability.is_booked` in sync whenever a booking is
   created, updated, or cancelled (RLS alone can't do this, since the client who
   books a slot isn't the trainer who owns it).
4. Optionally run `supabase/seed.sql` to seed 40 days of daily scripture (public
   domain KJV text) so the homepage's "Verse of the Day" rotates immediately.
5. Browsing (prayers, trainers, scripture) is public; posting/booking requires auth.

## What's built
- Home: daily scripture, mission story, how-it-works, destination cards, values,
  FAQ, and a closing CTA (`app/page.tsx`)
- Prayer Wall: live data, category filters, anonymous posting, "I'm praying"
  reactions, answered badge (`app/prayer/`)
- Find a Trainer: live data, mode/specialty filters, trainer detail pages with
  open availability and a request-to-book flow (`app/trainers/`)
- Profile: member details; trainers can add/remove availability and manage
  incoming booking requests; everyone sees their own booking history
  (`app/profile/`)
- Auth wired to Supabase (`app/login`, `app/signup`, `app/actions/auth.ts`),
  session refresh in `proxy.ts`
- Supabase clients (`lib/supabase/`), shared types (`lib/types.ts`), server
  actions per domain (`app/actions/`)
- Branding: logo used in the nav, footer, favicon/app icons, and Open Graph image

## Roadmap (what's left)
1. **Trainer vetting** — a `providers` table + admin review flow for licensed
   roles; see the parked section in `schema.sql`.
2. **Notifications** — email/SMS when a booking is requested, confirmed, or a
   prayer gets a new "amen".
3. **Comments on prayers** — `prayer_interactions.type = 'comment'` already
   exists in the schema; no UI yet.
4. **Recurring availability** — let trainers set a weekly pattern instead of
   adding one-off slots.
