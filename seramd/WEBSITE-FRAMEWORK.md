# Seramd Website Framework

## Goal

Create a polished coming-soon website for a bloodwork-powered peptide telehealth platform. The page should feel premium, clinical, and investor-grade while staying public-facing and compliance-conscious.

## Visual Direction

- Dark scientific interface with black graphite surfaces.
- Cyan/aqua bioluminescent molecular graphics.
- Glassmorphism panels with thin borders and soft blur.
- Full-page molecular science background, like a cinematic biotech landing page, with edge-framed molecule clusters.
- DNA/peptide overlays should stay subtle so the background reads photographic instead of illustrated.
- Hero-level helix rail behind the vial artwork, kept faint.
- Hero focal object: glowing peptide vial.
- Secondary graphics: molecule orbs, DNA helix, protocol cards.
- Compact credibility tiles instead of generic marketing blocks.
- Lower-page sections should preserve the same visual system as the hero: translucent graphite cards, aqua edge glows, precise lab-style dividers, and compact clinical labels.

## Generated Assets

- `assets/hero-vial-lab.avif` / `.png` - primary hero visual with vial, lab lighting, and molecular graphics.
- `assets/molecular-page-bg.avif` / `.png` - full-page molecular website background inspired by the latest reference.
- `assets/molecular-banner.avif` / `.png` - wide peptide-chain texture for the science section.
- `assets/bloodwork-dashboard.avif` / `.png` - abstract biomarker/protocol dashboard image for the platform preview card.

## Page Structure

1. Header
   - Brand: Seramd.
   - Navigation: Science, Process, FAQ.
   - Primary action: Waitlist.

2. Hero
   - Coming soon label.
   - Primary headline: "Bloodwork-powered peptides. Physician-prescribed for you."
   - Supporting copy: AI-assisted protocols, licensed clinician review, 503A fulfillment, 90-day labs.
   - Waitlist form.
   - Vial graphic and compliance badges.

3. Platform Highlights
   - Bloodwork-driven.
   - Clinician reviewed.
   - Compliant model.
   - Longitudinal care.

4. Platform Preview
   - Personalized peptide protocols.
   - Lab marker / goal / contraindication signal pills.
   - Transparent sourcing.
   - Education-first onboarding.
   - Molecular/DNA visual card.

5. Process
   - Connected glass timeline with numbered nodes.
   - Intake.
   - Bloodwork.
   - Review.
   - Ship.

6. FAQ
   - Medical service positioning.
   - AI support but not AI prescribing.
   - Launch timing.
   - Final private beta CTA.

## Copy Rules

- Avoid guaranteed outcome claims.
- Avoid "cures," "reverses," "proven to fix," or performance promises.
- Say "AI-assisted" rather than "AI-prescribed."
- Say "licensed provider review" and "patient-specific pharmacy fulfillment."
- Keep "informational only; not medical advice" in the footer.

## Implementation

Current starter is a static site:

- `index.html`
- `styles.css`
- `script.js`
- `server.js`
- `admin.html`
- `admin.css`
- `admin.js`
- `assets/*.avif`
- `assets/*.png`

No build step is required for the public page. Run `npm run dev` to enable the local waitlist backend and messaging dashboard.

## Backend and Messaging Dashboard

- `POST /api/waitlist` stores launch-list emails in `data/waitlist.json` and queues an automatic welcome email in `data/emails.json`.
- `GET /api/admin/waitlist` returns captured emails.
- `GET /api/admin/emails` returns captured emails plus Inbox and sent email history.
- `POST /api/admin/messages` saves a local outbound email draft against an email record.
- `POST /api/inbox` is the mailbox webhook target. It saves domain email into `data/emails.json`, so it stays in the Inbox.
- `/admin` serves the dashboard.
- `SITE_EMAIL` controls the website email shown on the public page and dashboard.
- `ADMIN_TOKEN` optionally protects admin API endpoints with `Authorization: Bearer <token>`.
- `INBOX_EMAIL_TOKEN` optionally protects `POST /api/inbox` with `Authorization: Bearer <token>`.

The dashboard has two separate areas:

1. Captured emails and auto messages: every waitlist submission, plus the automatic queued welcome message.
2. Email dashboard: a single Inbox section for domain email, plus a separate Send Email panel for outgoing messages.

A production email provider such as Resend, Postmark, or SendGrid can be connected behind `POST /api/admin/messages`. Their mailbox webhook should post to `POST /api/inbox` with fields such as `from: "patient@domainname.com"`, `to`, `subject`, and `body`.
