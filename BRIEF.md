# SeraMD — Project Brief for Claude Code

> Paste this file into your repo root as `BRIEF.md` (or `CLAUDE.md`). It contains everything Claude Code needs to build the SeraMD pre-launch website from scratch.

---

## 0. Context for Claude Code

You are building the pre-launch website for **SeraMD**, a seed-stage premium peptide telehealth platform. The site has one mission: **establish enough credibility for the founder to close strategic partnerships, recruit a Medical Director, secure 503A pharmacy partners, and raise a $4.5M seed round.**

The previous version at seramd.vercel.app was a single-page "Coming Soon" placeholder. That is being replaced. The new site must read as a serious operating company in stealth, not a side project.

You are not building the patient product. You are building the company's front door.

---

## 1. What SeraMD is

### One-line description

SeraMD is a bloodwork-personalized peptide telehealth platform that pairs licensed-physician oversight with AI-informed clinical decision support, delivering 503A-compounded protocols via monthly subscription with 90-day clinical re-evaluations.

### The model

- **Patient flow:** Charter signup → intake questionnaire → bloodwork (at-home phlebotomy or national lab draw) → physician review with AI clinical decision support → personalized peptide protocol prescribed → 503A-compounded monthly fulfillment → 90-day re-evaluation cycle.
- **Corporate structure:** MSO (Delaware C-Corp, the fundable entity) + friendly-PC structure in each operating state, with a single physician owner. Standard venture-stage telehealth model.
- **Pharmacy:** 2 licensed 503A compounding pharmacy partners (under MSA) for redundancy and capacity.
- **Lab:** Quest or Labcorp partnership + at-home phlebotomy network (Getlabs or Speedy Sticks) for premium tier.
- **Tech stack:** HIPAA-compliant EHR (Healthie/Elation/OpenLoop), HIPAA-eligible AI for clinical decision support (physician retains all prescribing authority — AI is *informational only*, never autonomous).

### Positioning

- **Category:** Premium personalized peptide medicine.
- **Audience:** 30–55 years old, $100K+ household income, longevity- and performance-conscious, willing to pay $300–600/month for personalized clinical care.
- **Comparables for brand tier:** Function Health (longevity diagnostics), One Medical (premium clinical UX), Hims (D2C polish), Maven Clinic (vertical telehealth depth). **The site must read like it belongs in that company — not below it.**
- **Initial launch markets:** Florida + Texas (regulatory-friendly, dense affluent demographics, strong 503A infrastructure).

### Compliance posture (NON-NEGOTIABLE — see Section 8)

- 503A compounded medications, individualized prescriptions only — never marketed as FDA-approved products
- No GLP-1 (semaglutide, tirzepatide) marketing as a primary lever post-FDA shortage-list delisting; the model centers non-GLP-1 peptides
- HIPAA-compliant throughout (all PHI handling)
- No disease claims, no weight-loss claims, no anti-aging guarantees on public-facing copy

### Brand name

- **SeraMD** (styled as one word with capitalized "MD"; the wordmark may render as `SeraMD` or `Sera<sup>MD</sup>` depending on context).
- The "Sera" root references blood serum — directly thematic to the bloodwork-personalization story.

---

## 2. Audiences the site must serve

The current placeholder fails because it speaks to no one in particular. The new site must give each of these audiences something specific and credible:

| Audience | What they need to see | Conversion event |
|---|---|---|
| **Prospective patients (charter list)** | Premium clinical credibility, clear "how it works," indication that this is built for someone like them | Email capture on charter waitlist |
| **Physician candidates / Medical Director** | A real clinical model worth their career, equity opportunity, scientific rigor | Form submission on `/clinical` or `/company` with role interest |
| **503A pharmacy partners** | Operational seriousness, scale potential, compliance posture | Contact form on `/partnerships` |
| **Investors (seed round)** | Operator quality, market thesis, defensibility | Contact form on `/company`; data room linked privately |
| **Strategic partners (labs, CROs, family offices)** | Specific paths to engage, dedicated contact | Contact form on `/partnerships` |

**Each audience must find their page in ≤2 clicks from the homepage.**

---

## 3. Site architecture

Five pages. App Router structure (Next.js 14+):

```
/                        Home          — brand, thesis, how-it-works, charter CTA
/clinical                Clinical      — the clinical model, physician oversight, science of personalization
/partnerships            Partnerships  — pharmacy, labs, research, capital — with contact paths
/company                 Company       — vision, founder note, careers, contact
/charter                 Charter       — long-form waitlist with intake questions (richer than homepage)
```

### Navigation

Sticky top nav with: wordmark (left), nav links (center: Clinical · Partnerships · Company), CTA "Request access" (right).

Footer with: brand block, page links, compliance disclaimer block, social (LinkedIn link placeholder), copyright.

---

## 4. Brand & design direction

The previous landing page (delivered separately as `seramd-landing.html`) sets the established brand direction. Use it as the source of truth for palette, typography, and signature elements. Carry that direction through every page.

### Palette (CSS variables)

```css
--bg:        #FFFFFF;       /* base */
--surface:   #F7F5F0;       /* warm off-white for elevated sections */
--ink:       #111111;       /* primary text */
--muted:     #6B665F;       /* secondary text */
--hairline:  #D8D4CC;       /* dividers */
--accent:    #6B1F2F;       /* oxblood — apothecary, premium, unexpected for healthtech */
--accent-soft: #F3E8E8;     /* soft accent wash */
```

**Why oxblood:** every healthtech competitor reaches for clinical blue, sage green, terracotta, or warm peach. Oxblood is apothecary-coded — old pharmacopoeia, premium leather goods, classical medicine. It signals serious medicine without looking corporate.

### Typography (Google Fonts)

- **Display:** Instrument Serif (used sparingly — headlines, callouts, occasional italic emphasis)
- **Body / UI:** Bricolage Grotesque (variable, modern, used at 400–500 weight)
- **Data / mono:** JetBrains Mono (for eyebrows, labels, numerics, the peptide-sequence "specimen" element)

```html
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300..800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet">
```

### Signature element

A **"specimen card"** — a typographic peptide sequence treatment in FASTA single-letter notation, framed like a museum or laboratory specimen tag. It anchors the hero on the homepage and appears in modified form on `/clinical`. This is the brand's single most recognizable visual asset.

### Voice and copy register

- Confident, clinical, sparing with adjectives
- Active voice, sentence case (no Title Case headlines)
- Never sells — describes
- No exclamation points, no "transform your life," no "revolutionary"
- Reads like the about-page of a serious medical institution that happens to have premium taste
- Reference points: Function Health's marketing voice, the Mayo Clinic patient-facing copy, Apple's product-page tone

### What to avoid (default AI design tropes)

- Warm cream + serif headline + terracotta accent (this is the literal Function Health palette and is the most common AI-generated wellness brand look) — **we use oxblood instead**
- Big gradient hero with a single button and a small caption
- Stat blocks like "10,000+ patients" or "98% satisfaction" (we have none of this yet — don't fabricate)
- Stock photos of attractive people, especially fitness/lifestyle imagery
- Floating glassmorphism cards
- AI-illustrated DNA helices or molecule renders

---

## 5. Page-by-page content brief

### `/` — Home

Sections, in order:

1. **Hero** — Eyebrow ("Personalized peptide medicine"), display headline ("Medicine, calibrated to you."), 1-sentence lede, primary CTA → `/charter`. Right column: the specimen card (see existing landing page for exact treatment).
2. **Thesis** — One-paragraph block on why personalized medicine matters. "The future of medicine isn't generalized for the average patient — it's calibrated to the individual."
3. **How it works** — 4-step process (Bloodwork · Review · Protocol · Delivered). Use 01/02/03/04 numbering — this is a real sequence, so numbering encodes information.
4. **Trust strip** — 4 columns: Prescribed by licensed physicians · 503A pharmacy-compounded · Bloodwork-personalized · HIPAA-secure end to end.
5. **For partners** — A horizontal split row pointing physicians, pharmacies, and investors to `/partnerships`. Single paragraph, clear link out.
6. **Charter CTA** — Email capture, brief framing ("Limited charter access · SeraMD launches by invitation").
7. **Footer** — Standard.

### `/clinical` — Clinical model

This page exists to convince a Medical Director candidate and a sophisticated investor that SeraMD has thought hard about clinical rigor.

Sections:

1. **Hero** — "A clinical model built around the individual." Subhead: 1–2 sentences on physician-led, AI-supported, bloodwork-informed protocols.
2. **The clinical philosophy** — 3 columns or stacked sections:
   - *Personalized to bloodwork* — Comprehensive panels inform every protocol. Baseline panel includes hormonal, metabolic, inflammatory, and longevity biomarkers.
   - *Prescribed by physicians* — Every protocol reviewed and prescribed by a licensed physician. AI is clinical decision support; the physician is the prescriber of record.
   - *Compounded by 503A pharmacies* — Individualized prescriptions filled by licensed compounding pharmacies, with full chain-of-custody and quality documentation.
3. **The protocol library** — Brief abstract description of protocol *categories* (Longevity, Performance, Metabolic, Hormonal optimization). **Do NOT name specific peptides on the public site.** Use category descriptions only.
4. **AI clinical decision support** — A standalone section. The platform's AI surfaces relevant clinical context, flags abnormalities, and proposes protocol candidates for the physician's review. The physician retains full prescribing authority. Include language about audit logging, model versioning, and physician override documentation.
5. **Medical Director invitation** — A small inline block: "We are recruiting our founding Medical Director." With a link to `/company#careers` or a contact form.
6. **CTA** — Back to charter or partnerships, as appropriate.

### `/partnerships` — Strategic partnerships

This is the page that drives real outbound business outcomes. Structure it as multiple distinct cards/sections — one per partnership type — each with its own contact path.

Sections:

1. **Hero** — "Built with partners." Subhead: 1 sentence on SeraMD's partnership model.
2. **Pharmacy partnerships** — For 503A compounding pharmacies. What we're looking for: licensed in 5+ states, PCAB-accredited, sterile compounding capabilities, cold-chain shipping infrastructure. Contact form: name, pharmacy, state(s), brief note.
3. **Physician network** — For licensed physicians interested in joining the prescribing network or the Medical Director role. Contact form: name, specialty, state license(s), role interest.
4. **Research & clinical trials** — For CROs and research organizations interested in collaborating on outcome studies of personalized peptide protocols. Brief, professional, signal we care about evidence.
5. **Capital partners** — Brief paragraph for institutional investors and family offices. Link to a deck-request form. Do not list valuation or terms publicly.
6. **General inquiry** — Catch-all contact.

Each section should have its own form (or one form with a "type of partnership" dropdown) that routes to a single inbox.

### `/company` — Company

Sections:

1. **Hero** — "On building." A short, sober statement of purpose. 2–3 sentences. No mission/vision language.
2. **Founder note** — A signed paragraph from David Weissman explaining why he is building SeraMD. **Leave a placeholder for this if you don't have copy yet — do not generate fake personal narrative.**
3. **Leadership** — Placeholder section. List David's name and a brief credibility line (background to be provided by founder). Reserve slots for Medical Director and other team — show as "Recruiting" placeholders without inventing people.
4. **Careers** — One paragraph: SeraMD is recruiting its founding clinical and operational team. Contact form for inquiries.
5. **Contact** — General contact + investor relations contact + press contact.

### `/charter` — Charter waitlist

A longer-form waitlist intake that tells the patient this isn't a generic newsletter signup. Fields:

- Email (required)
- First name (required)
- State of residence (required, dropdown)
- "What brings you to SeraMD?" (optional, free text)
- Acknowledgment checkbox: "I understand SeraMD is pre-launch and services are not yet available in my state."

Submit to the same backend as the homepage waitlist; flag charter submissions distinctly.

---

## 6. Technical specifications

### Stack

- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS (configure `tailwind.config.ts` with the palette from Section 4 as theme extensions)
- **Fonts:** Google Fonts via `next/font/google`
- **Forms:** Server actions with form data → Resend (or SendGrid, fallback Formspree) email delivery; store submissions in a simple Supabase or Vercel KV table for retention
- **Hosting:** Vercel
- **Analytics:** Plausible or Fathom (privacy-first, HIPAA-safer than GA4 even for marketing site). **Do NOT use Google Analytics on this property.**
- **No:** localStorage for PHI, third-party trackers, Meta Pixel without compliance review

### Performance and quality floor

- Lighthouse score ≥ 95 on Performance, Accessibility, Best Practices, SEO
- LCP < 1.5s on simulated 4G
- All interactive elements keyboard-accessible with visible focus rings
- `prefers-reduced-motion` respected
- Responsive down to 360px width
- All images served as Next/Image with proper sizes
- No layout shift on font load (use `font-display: swap` and proper fallback metrics)

### SEO

- Per-page `<title>` and `<meta description>` tuned for the audience
- Open Graph + Twitter card images (1200×630) per page
- `sitemap.xml` and `robots.txt`
- JSON-LD structured data: `Organization` schema with founder, contact
- Canonical URLs throughout

### Email delivery

- Domain: `seramd.com` (or `.health` if different — confirm with founder)
- Configure SPF, DKIM, DMARC records before deploying
- Notification emails for form submissions go to a single founder inbox initially

### Repo structure

```
/app
  /(marketing)
    /page.tsx              — Home
    /clinical/page.tsx
    /partnerships/page.tsx
    /company/page.tsx
    /charter/page.tsx
  /api
    /waitlist/route.ts     — POST handler for waitlist
    /contact/route.ts      — POST handler for partnership contact
  /layout.tsx
  /globals.css
/components
  /Nav.tsx
  /Footer.tsx
  /SpecimenCard.tsx        — the signature element
  /ProcessSteps.tsx
  /TrustStrip.tsx
  /forms/...
/lib
  /email.ts                — Resend/SendGrid wrapper
  /db.ts                   — Supabase/KV wrapper
/public
  /og/...                  — OG images per page
  /favicon.ico
tailwind.config.ts
next.config.js
BRIEF.md                   — this file
README.md
```

---

## 7. Build phases

Build in this order. Do not skip ahead.

### Phase 1: Foundation (start here)

- Scaffold Next.js + Tailwind + TypeScript
- Configure fonts, palette tokens, global styles
- Build `Nav` and `Footer` components
- Build `SpecimenCard` component (the signature element)
- Deploy a "scaffold deployed" placeholder to verify Vercel pipeline

### Phase 2: Home page

- Build `/` end-to-end matching the existing landing-page design
- Wire up the homepage waitlist form to a working backend (Resend + Supabase/KV)
- Test the form submission flow end-to-end

### Phase 3: Inner pages

- Build `/clinical`, `/partnerships`, `/company`, `/charter` in that order
- Wire up partnership and contact forms
- Cross-link pages naturally (no over-linking)

### Phase 4: Polish

- OG images per page
- Sitemap, robots, structured data
- Lighthouse audit pass
- Mobile QA at 360, 390, 414, 768, 1024, 1440 widths
- Reduced-motion + keyboard-nav audit

### Phase 5: Domain + DNS

- Point `seramd.com` at Vercel
- Configure email DNS (SPF, DKIM, DMARC)
- Verify all form delivery paths

---

## 8. Compliance guardrails (DO NOT VIOLATE)

These are non-negotiable. Every piece of copy on the site must pass these rules:

1. **Never name specific peptides** in public marketing copy (no "BPC-157," no "Semaglutide," no "Sermorelin"). Use category descriptions only ("longevity protocols," "metabolic protocols," "hormonal optimization protocols").
2. **Never make disease claims.** No "treats," "cures," "reverses," "prevents" + any condition.
3. **Never claim weight loss outcomes.** Especially: do not reference GLP-1 medications, Ozempic, Wegovy, Mounjaro, etc., even adjacently.
4. **Never claim FDA approval** of compounded preparations.
5. **Never fabricate stats** (no "98% patient satisfaction," no "10,000+ patients") — SeraMD is pre-launch.
6. **Never invent named team members** beyond the founder. Use "Recruiting" placeholders for unfilled roles.
7. **Always include the disclaimer block** in the footer: "SeraMD is a forthcoming telehealth service. Availability will vary by state and is subject to regulatory clearance. The content of this site is for informational purposes and does not constitute medical advice. Statements have not been evaluated by the FDA. SeraMD is not intended to diagnose, treat, cure, or prevent any disease."
8. **Honor "Pre-launch" framing** throughout — this is a charter list, not an active service. "Forthcoming," "launching," "by invitation," "limited charter access."

When in doubt, write less, not more.

---

## 9. Reference materials

Study these before writing copy or building components:

- **Function Health** (functionhealth.com) — brand voice, charter framing, how they describe bloodwork-personalization
- **One Medical** (onemedical.com) — premium clinical UX
- **Hims & Hers** (hims.com) — D2C telehealth polish, conversion architecture
- **Maven Clinic** (mavenclinic.com) — vertical telehealth depth
- **Cooper Aerobics** (cooperaerobics.com) — premium longevity positioning, more conservative reference

Do not copy them. Read them to calibrate the tier.

---

## 10. What to ask the founder before building

If any of the following are unclear, ask explicitly before starting:

1. Has the domain `seramd.com` been registered and pointed at Vercel? (current site is at `seramd.vercel.app`)
2. Is the brand wordmark `SeraMD` or `Sera MD` with a space? (use `SeraMD` unless told otherwise)
3. Which email address should receive form submissions during pre-launch?
4. Is there a founder bio paragraph ready for `/company`, or should that be a placeholder?
5. Are there any specific partnership types beyond the four listed in Section 5 that should be featured?

---

## 11. Done definition

You're done with Phase 1–4 when:

- All 5 pages live on Vercel preview deployment
- All forms submit successfully and deliver email
- Lighthouse ≥ 95 across the board
- Mobile tested at the listed breakpoints
- Compliance disclaimer present in footer of every page
- No specific peptide names anywhere in copy
- No fabricated stats or team members
- The site reads, on first impression, like a real seed-stage healthcare company in stealth — not a placeholder

When in doubt about a design or copy choice, default to:

- Less, not more
- Confident, not promotional
- Specific, not aspirational
- Restrained, not decorative

---

*End of brief.*
