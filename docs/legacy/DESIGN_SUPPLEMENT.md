# SeraMD — Design Execution Supplement for Claude Code

> Append to `BRIEF.md` after Section 4 ("Brand & design direction").
> This document encodes a competitive analysis of nine direct competitors and translates it into specific build instructions, anti-patterns to avoid, and an image strategy that works within Claude Code's capabilities.

---

## A. Competitive context (read first)

Before building any component, understand the field SeraMD is entering. Nine D2C peptide / GLP-1 telehealth brands were analyzed: Fridays, Noom, NativeMed, Amble, CitizenMeds, ProvNRx, ReadyRx, JoinWeightCare, MaleMD.

### The convergent competitor pattern

These brands are visually and structurally interchangeable. They all do the following:

- Lead with **GLP-1 weight loss** (semaglutide / tirzepatide / Ozempic-alternative messaging)
- Add the same upsells: NAD+, Sermorelin, Glutathione, Lipo-B, Lipo-C
- Price at **$99–179/month** with BNPL (Affirm / Klarna / Afterpay)
- Display heavy social proof: "100,000+ members," "115,000+ members"
- Use the same flow: quiz → 3-minute provider review → ship medication
- Lean on paid before/after testimonials and lifestyle photography
- Vague clinical signals ("licensed providers in all 50 states")
- Soft pastels (peach, mint, blush), rounded sans-serif type, gradient buttons
- Hero photography of attractive 25–40-year-olds smiling

**Visually they are all the same brand wearing different shirts.** SeraMD's job is not to be a better version of them. SeraMD's job is to look and read like a fundamentally different category — premium clinical, not mass-market wellness.

### The gaps SeraMD owns

Across all nine competitors, the following are completely absent:

1. Third-party batch lab testing with patient-accessible Certificate of Analysis (COA)
2. Bloodwork-personalization as the lead thesis (not an afterthought)
3. AI clinical decision support as a real product story
4. A premium pricing tier ($300–600/month)
5. Single-vertical focus on peptide medicine (no weight-loss-only positioning)
6. Operator-grade compliance posture publicly stated
7. A partnership-facing site surface
8. An editorial / clinical-premium visual identity instead of mass-market wellness

The brand promise is: **"Peptide medicine without the guesswork."** Three pillars: verified safety, US clinical oversight, bloodwork-personalized AI calibration.

---

## B. Anti-patterns (DO NOT REPLICATE)

These are direct anti-patterns from the competitor set. Every one of these is something competitors do that SeraMD must explicitly *not* do.

### Visual anti-patterns

- ❌ Soft pastel palettes (peach, mint, blush, coral) — every competitor uses these
- ❌ Gradient buttons or gradient backgrounds — universal D2C health trope
- ❌ Rounded sans-serif type (DM Sans, Poppins, default Inter) as the display face
- ❌ AI-illustrated or stock 3D-rendered glass vials with theatrical lighting
- ❌ Lifestyle photography of attractive young people smiling
- ❌ DNA helix imagery (peptides aren't DNA — it's the wrong category)
- ❌ Floating molecule renders or cyan-on-black "biotech sci-fi" aesthetic
- ❌ Stock medical iconography (heart with pulse line, pill capsules, doctor silhouettes)
- ❌ Trustpilot star widgets as prominent hero elements
- ❌ "As seen on Forbes / Vogue / Men's Health" logo bars
- ❌ Before/after photo carousels with weight numbers

### Copy anti-patterns

- ❌ Discount codes in the header banner ("$100 OFF" / "SHOP100")
- ❌ "From $X/month" pricing in the hero
- ❌ "Buy 3 get 1 free" or any subscription gimmick language
- ❌ "Lose up to 23% of your body weight" or any weight-loss outcome claim
- ❌ "100% online," "no insurance needed," "approved in 5 minutes"
- ❌ "Lose weight your way" / "feel better, age smarter" — generic wellness pablum
- ❌ Specific peptide names (Semaglutide, Tirzepatide, Sermorelin, NAD+) on public marketing pages
- ❌ Naming branded drugs (Ozempic, Wegovy, Mounjaro, Zepbound) anywhere
- ❌ "Members" framing ("100,000+ members" social proof)
- ❌ "Journey" language ("your journey," "start your journey")
- ❌ "Backed by science" — empty signal, everyone says it
- ❌ "Same active ingredient as Ozempic®" — direct compounded-substitute marketing
- ❌ Calculator widgets (BMI, TDEE, calorie deficit) — competitor lead-gen tropes

### UX anti-patterns

- ❌ Quiz-led funnel as the primary CTA ("Take the 2-minute quiz")
- ❌ Sticky bottom "Get Started" bar on mobile
- ❌ Exit-intent popups with discount offers
- ❌ Live chat widgets bottom-right
- ❌ Trustpilot review carousels
- ❌ FAQ accordions with 20+ questions covering insurance, refunds, side effects
- ❌ Multiple CTAs per section ("Get started" + "Learn more" + "Find your treatment")

---

## C. The SeraMD positive pattern (what to build instead)

For every anti-pattern above, here is the SeraMD-tier alternative:

| Instead of | Build this |
|---|---|
| Pastel gradient background | Clinical white (`#FFFFFF`) with warm off-white surface elevation (`#F7F5F0`) |
| Gradient buttons | Solid ink (`#111111`) buttons with monospace label text, oxblood hover state |
| Rounded sans display type | Instrument Serif for display (sparingly), Bricolage Grotesque for body, JetBrains Mono for data/labels |
| Hero with smiling person + vial | Hero with the specimen card (typographic peptide sequence in FASTA notation) as the visual anchor |
| Before/after weight photos | Editorial layout featuring the clinical model, the AI methodology, the COA documentation |
| "From $179/month" hero pricing | No pricing on homepage. Pricing lives behind charter intake or in a dedicated `/charter` page. |
| "100,000+ members" badge | No volume claims. SeraMD is pre-launch. Trust signals are methodological, not aggregate. |
| "Backed by science" empty signal | Specific operational facts: "Every batch independently lab-verified. COA delivered with every shipment." |
| Quiz-led CTA | Charter list signup as the primary CTA — invitation-toned, not transactional |
| 20-question FAQ accordion | A short, substantive FAQ covering trust questions (lab testing, sourcing, physician credentials) — 6–8 questions, prose answers |
| Multiple CTAs per section | One CTA per section, always |
| Sticky bottom CTA bar | No sticky bar. Confidence over conversion-optimization theater. |

---

## D. Image and asset strategy (this is the part that matters)

Since SeraMD does not have a photography budget and Claude Code cannot generate brand-quality photography, the image strategy is **typographic and structural — not photographic.**

### What to use for visual interest

1. **Typographic compositions** — large display serif headlines, monospace eyebrows, oversized numerals. The "specimen card" is the prototype: an editorial-tier visual built entirely from type and hairlines.
2. **Hairline-bordered specification panels** — boxes with thin (1px) borders in `--hairline` color, containing structured data or text in a museum-label aesthetic.
3. **Numbered lists and tables** — used structurally (not decoratively) for process steps, formulary categories, partner types. Numbering encodes a real sequence.
4. **Generous whitespace** — restraint is the design. 60–120px vertical padding between sections on desktop.
5. **Single-color accent moments** — use the oxblood `--accent` for one or two elements per section, no more. Restraint amplifies impact.
6. **Subtle CSS animations on load and scroll** — use only `transform` and `opacity` transitions. Reduced-motion respected. No parallax. No scroll-jacking.

### What NOT to use

1. **No AI-generated imagery** anywhere — no Midjourney vials, no Stable Diffusion product shots, no generative medical art. Patients can detect these instantly and it crushes credibility.
2. **No stock photography** of people in clinical settings or wellness scenes.
3. **No icon libraries** (Heroicons, Lucide, Phosphor) for decoration. Icons only when truly informational, drawn from a single restrained set, monochrome.
4. **No 3D renders** of vials, syringes, molecules, or DNA.
5. **No emoji** anywhere.
6. **No animated GIFs.**

### If imagery is essential

For specific moments where an image genuinely serves the design (e.g., a single product moment on `/clinical`, a founder photo on `/company`), the only acceptable sources are:

1. **Real product photography** of the actual SeraMD COA documents, packaging, or product (once those exist) — shot flat-lay on a neutral background
2. **Real founder/team photography** — a single B&W headshot of David, professionally shot, no smiling, editorial tone. Direct him to a Brooklyn or Manhattan portrait photographer ($500–1200) — do not use a phone selfie
3. **Public-domain scientific imagery** when used as deliberate editorial reference (e.g., a historical pharmacopoeia page treated as wallpaper texture for a specific section)

Until real assets exist, **leave image slots as typographic compositions or omit them entirely.** A page with strong type and no images is more premium than a page with weak images.

---

## E. Specific component recipes for Claude Code

These are the components to build first, in priority order.

### 1. `<SpecimenCard />` — the signature element

Already specified in the existing landing page HTML. Hairline-bordered box, museum-label header row, FASTA-notation amino sequence in JetBrains Mono with wide letter-spacing, structured metadata grid below. Reuse pattern across pages with different content (peptide sequence on home, protocol category on `/clinical`, partner type on `/partnerships`).

### 2. `<TypeHero />` — the hero pattern

- Eyebrow (mono, 11px, uppercase, tracked 0.18em) → optional accent color
- Display headline (Instrument Serif, 56–116px, line-height 0.96, letter-spacing -0.015em) — supports `<em>` for accent-colored italic emphasis on key phrases
- Lede paragraph (17–19px, line-height 1.55, max 30em, `--muted` color)
- Single primary CTA (mono label, ink background, oxblood hover)
- Right-column or below: a SpecimenCard or a typographic composition specific to the page

### 3. `<ProcessSteps />` — numbered sequence

Four columns at desktop, two at tablet, one at mobile. Top border on each step (1px solid ink), numbered eyebrow ("01 · Bloodwork") in mono + accent color, serif step title, muted body copy. Use only when the content is actually sequential — process flows, build phases, evaluation steps. Do not use for non-sequential content.

### 4. `<SpecPanel />` — structured data display

Hairline-bordered panel with a label row at top, content area, and a metadata grid at bottom. The "spec sheet" aesthetic. Used for: formulary category descriptions, partnership tier details, methodology disclosures, FAQ-style content blocks.

### 5. `<TrustStrip />` — the trust row

Four columns. Each column: mono eyebrow with accent dot bullet ("·  01") at top, serif statement of trust below. No icons. No badges. The typography IS the trust signal. Already specified in the landing page HTML.

### 6. `<EditorialPullQuote />` — for thesis statements

Large Instrument Serif text (26–38px) in a constrained column with significant breathing room. Use sparingly — once per page maximum. Drives the "this site has a point of view" feeling.

### 7. `<PartnershipCard />` — for `/partnerships` page

Each partnership type (pharmacy, physicians, research, capital) gets its own card. Mono eyebrow, serif title, prose paragraph describing what SeraMD is looking for, single CTA button to a contact form filtered by partnership type. Use a vertical list at mobile, two-column grid at desktop. No icons or imagery — pure type and structure.

---

## F. Quality benchmarks — when is a page "done"?

For each page, the Phase 4 review checks:

### Visual quality

- [ ] Renders at 360px width without horizontal scroll
- [ ] Type scale is consistent across pages (same H1 size, same body size)
- [ ] No pastel gradients, no rounded sans display, no AI imagery
- [ ] Oxblood accent appears in 1–2 places per section maximum
- [ ] Hairlines are 1px, consistent color, used structurally
- [ ] Whitespace is generous — no section feels cramped
- [ ] At least one typographic moment per page that wouldn't appear on any of the nine competitor sites

### Copy quality

- [ ] No specific peptide names anywhere in marketing copy
- [ ] No disease claims, no weight-loss claims, no anti-aging guarantees
- [ ] No "members" / "patients" / "users" volume claims
- [ ] No discount codes, BNPL mentions, or price-led messaging
- [ ] No "journey" language, no "100% online" badges
- [ ] One CTA per section, never more
- [ ] Disclaimer block present in footer
- [ ] Reads in a confident, sober, editorial register — not promotional

### Technical quality

- [ ] Lighthouse: Performance ≥95, Accessibility ≥95, Best Practices ≥95, SEO ≥95
- [ ] LCP < 1.5s
- [ ] All interactive elements keyboard-accessible
- [ ] `prefers-reduced-motion` respected
- [ ] No layout shift on font load
- [ ] All forms submit successfully and deliver email
- [ ] No third-party analytics that send PHI

### The smell test

Before declaring done, look at the SeraMD site beside Amble, Fridays, and NativeMed in three browser tabs. Ask: **does SeraMD look like a different category of brand?** If it looks like a darker / better-typed version of those sites, the design has failed. If it looks like it belongs next to *Function Health, Whoop, or a high-end medical journal* instead of next to Amble/Fridays — the design has succeeded.

---

## G. The honest budget reality

Some quality ceilings are below what photography-driven competitors achieve, no matter how good the code is. Specifically:

- **Product photography** — Fridays' product vial renders cost $5–15K to produce. SeraMD does not need this at seed stage. Replace with the specimen card and typographic compositions.
- **Founder photography** — a single B&W portrait of David from a professional photographer in NYC. Budget: $500–1200. Do not skip this — it goes on `/company` and matters for credibility.
- **Logo wordmark** — if the current "SeraMD" set in Instrument Serif is not enough, hire a wordmark designer for one round. Budget: $1500–4000 via Working Not Working, Dribbble pros, or local boutiques. **Do not use Fiverr or a logo generator.** Until then, the type-set wordmark in Instrument Serif is genuinely sufficient.
- **Custom illustration** — not needed. The typographic system replaces it.
- **One-time design polish pass** — after Claude Code completes Phase 4, optionally engage a designer for one focused review pass to refine spacing, typography micro-decisions, and any specific moments that need a human eye. Budget: $2–5K for a half-day with a senior designer.

Total brand-asset spend to launch at premium tier: **$3–8K.** Compare to a comparable agency build at $40–80K. The trade-off is real but acceptable at seed stage.

---

## H. The Claude Code launch instruction

When you're ready to start the build, paste this into Claude Code as the opening prompt:

```
Read BRIEF.md and DESIGN_SUPPLEMENT.md as the source of truth for this 
project. Both must be obeyed; the supplement overrides the brief where they 
conflict.

Goals:
1. Build a Next.js 14+ App Router site with Tailwind and TypeScript
2. Five pages: /, /clinical, /partnerships, /company, /charter
3. Brand system: oxblood (#6B1F2F) accent, clinical white base, 
   Instrument Serif + Bricolage Grotesque + JetBrains Mono
4. Signature element: the SpecimenCard component, reused across pages
5. Build to the quality benchmarks in DESIGN_SUPPLEMENT.md Section F

Constraints:
- No AI-generated imagery
- No specific peptide names in public copy
- No price-led marketing
- No quiz-led CTAs (charter list signup is the primary CTA)
- All competitor anti-patterns in DESIGN_SUPPLEMENT.md Section B are 
  forbidden

Start with Phase 1 (Foundation) per BRIEF.md Section 7. Stop after 
deploying the scaffold so I can review before Phase 2.
```

---

*End of design supplement.*
