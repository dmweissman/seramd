# SeraMD

SeraMD is a clinical platform for peptide medicine: independently
lab-verified batches, US physician oversight, and protocols calibrated to
bloodwork. The brand promise is **"Peptide medicine without the guesswork."**

This repository is the public site — a Next.js (App Router) build with
Tailwind CSS and TypeScript.

**Source of truth for design and copy:** `BRIEF.md` (pending upload) and
`DESIGN_SUPPLEMENT.md`. The supplement overrides the brief where they
conflict. Read both before changing any page.

## Pages

- `/` — home (hero + SpecimenCard)
- `/clinical` — clinical model (Phase 3)
- `/partnerships` — pharmacy / physician / research / capital (Phase 3)
- `/company` — team and thesis (Phase 3)
- `/charter` — charter list signup, the site's primary CTA (Phase 3)

## Brand system

Founder decision (2026-06-11): the site uses the vibrant warm-cream
direction from `seramd-landing.html` (v4), superseding the oxblood palette
in `BRIEF.md` Section 4. CTA framing is "Join the waitlist" (also a
founder decision). All compliance/copy rules in `BRIEF.md` Section 8
still apply unchanged.

- Palette: warm cream `#F4EFE3`, surface white, ink `#1B1612`, terracotta
  accent `#B85540`, plus green/amber status accents
- Type: Fraunces (display), Bricolage Grotesque (body), JetBrains Mono
  (eyebrows, labels, data)
- Signature component: `components/SpecimenCard.tsx` (the "diagnostic
  printout" protocol card)
- Tokens live in `app/globals.css` (Tailwind v4 `@theme` + ported
  reference styles)

## Build phases

1. Foundation: scaffold, fonts, palette, Nav, Footer, SpecimenCard ✓
2. Home page (match `seramd-landing.html` reference)
3. `/clinical`, `/partnerships`, `/company`, `/charter`
4. Polish, Lighthouse, mobile QA
5. DNS / domain pointing

Each phase stops for review before the next begins.

## Quick start

```bash
npm install
npm run dev      # dev server
npm run build    # production build
npm run check    # TypeScript check
```

## Deployment

Vercel auto-detects Next.js; no special configuration. Environment
variables (needed once the charter intake form is wired):

- `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` — signup storage
  (connect Upstash via the Vercel Marketplace)
- `ADMIN_TOKEN` — required before any admin endpoint will respond
- `SITE_EMAIL` — defaults to `david@seramd.com`

Signup/contact domain logic from the v1 site is preserved in
`lib/waitlist.js` and `lib/storage.js` for reuse as Next.js route handlers.
The v1 Vite coming-soon site lives in git history before the
"Phase 1: Next.js scaffold" commit.
