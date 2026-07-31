# SERA MD

SERA MD is a physician-led **aesthetic medicine, cosmetic surgery, and
longevity institute** opening in Middletown, New Jersey. This repository is
the pre-launch coming-soon site at [seramd.com](https://seramd.com):
a single-page editorial experience that introduces the institute and
captures founding-list leads (email + mobile with SMS consent).

> Note: this is the third concept for the SERA MD brand. Documents under
> `docs/legacy/` (BRIEF.md, DESIGN_SUPPLEMENT.md, etc.) describe the earlier
> peptide telehealth concept and are retained for history only — do not
> follow them.

## Stack

- Next.js (App Router) + TypeScript, deployed on Vercel
- Tailwind v4 for tokens, hand-written component CSS in `app/globals.css`
- Cormorant Garamond (display serif) + Manrope (sans), self-hosted via
  Fontsource
- Upstash Redis (via REST) for lead storage and rate limiting
- Optional Resend for lead notification emails

## Design tokens

Near-black `#0B0B0B` · warm ivory `#F4F1EA` · soft stone `#D8D4CB` ·
muted champagne `#B8A47C` (accent only) · deep graphite `#202020` · white.
All tokens live in `app/globals.css` (`@theme` + CSS custom properties for
spacing, motion, and containers).

## Page structure (`app/page.tsx`)

Header · Hero · InstituteIntroduction · Disciplines · GlobalStandard ·
BrandStatement · Location · FoundingAccessForm · Footer — one component
each under `components/`. Plus `/privacy` and `/terms`. Old routes
(`/clinical`, `/partnerships`, `/company`, `/charter`) redirect to `/`.

## Lead capture

`POST /api/founding` — first/last name, email, mobile, primary interest,
required email+SMS consent. Validated server-side, honeypot spam trap,
per-IP rate limit (6 requests / 10 min), stored in Redis under
`seramd:founding-leads` (deduped by email), optional Resend notification
to `NOTIFY_EMAIL`. Returns 503 with a clear message if storage is not
configured.

Earlier concepts' data remains untouched in Redis under `seramd:waitlist`,
`seramd:emails`, and `seramd:contacts`.

## Environment variables

- `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` (or the
  `KV_REST_API_*` names) — set automatically by the Vercel/Upstash
  integration; required for the form to accept submissions
- `RESEND_API_KEY` — optional; enables email notification per lead
- `NOTIFY_EMAIL` — notification recipient (default `david@seramd.com`)
- `NOTIFY_FROM` — sender (default Resend onboarding address until
  seramd.com is verified in Resend)
- `NEXT_PUBLIC_SITE_URL` — optional canonical override

## Images

Art-directed placeholders (generated abstract light/stone compositions)
live in `public/` under their final names — replace the files with real
photography without touching code:

- `sera-hero-clinic.webp` (2400×1350)
- `sera-aesthetics.webp`, `sera-surgical-suite.webp`,
  `sera-longevity-diagnostics.webp` (1200×1500)
- `sera-middletown-location.webp` (1400×1600)
- `og-image.png` (1200×630 share card) and `app/icon.png` (favicon)

## Commands

```bash
npm install
npm run dev      # dev server
npm run build    # production build
npm run check    # TypeScript check
```
