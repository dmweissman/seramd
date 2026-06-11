---
name: Seramd
description: Premium clinical biotech landing page for bloodwork-powered peptide telehealth.
colors:
  clinical-black: "#030608"
  graphite-bg: "#070a0d"
  panel-veil: "#0e1114d1"
  panel-strong: "#14181deb"
  panel-soft: "#ffffff0e"
  cyan-line: "#cef8ff2e"
  cyan-line-strong: "#d2fff761"
  text-primary: "#f6fbff"
  text-soft: "#b8c4c8"
  text-dim: "#7c8b90"
  aqua: "#69f5e4"
  lab-blue: "#83d8ff"
  assay-gold: "#c8ae63"
  button-ink: "#041014"
  success: "#8ff7bf"
  danger: "#ffb4b4"
typography:
  display:
    fontFamily: "\"Sora\", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: "clamp(2.75rem, 5.6vw, 4.625rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "\"Sora\", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.875rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  title:
    fontFamily: "\"Sora\", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: "clamp(1.625rem, 2vw, 2rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  body:
    fontFamily: "\"Source Sans 3\", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.58
    letterSpacing: "0"
  label:
    fontFamily: "\"Sora\", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.06em"
rounded:
  control: "10px"
  admin-control: "8px"
  card: "16px"
  image-card: "20px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "30px"
  section: "72px"
components:
  button-primary:
    backgroundColor: "{colors.aqua}"
    textColor: "{colors.button-ink}"
    rounded: "{rounded.control}"
    padding: "0 18px"
    height: "54px"
  button-pill:
    backgroundColor: "{colors.aqua}"
    textColor: "{colors.button-ink}"
    rounded: "{rounded.pill}"
    padding: "14px 20px"
    height: "52px"
  card-marketing:
    backgroundColor: "{colors.panel-veil}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.card}"
    padding: "24px"
  field:
    backgroundColor: "{colors.clinical-black}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "54px"
---

# Design System: Seramd

## 1. Overview

**Creative North Star: "The Clinical Signal Chamber"**

Seramd should feel like a private clinical biotech environment: dark, precise, luminous, and careful. The system uses graphite surfaces, aqua molecular light, vial imagery, bloodwork dashboard graphics, and restrained copy to make peptide telehealth feel medically reviewed rather than hyped.

The design is cinematic enough to feel premium, but every visual flourish needs to point back to the care model: labs, licensed clinician review, patient-specific fulfillment, and follow-up. It rejects anything that feels scammy, hype-driven, or full of unsupported claims.

**Key Characteristics:**
- Dark clinical shell with aqua/cyan light as the primary signal.
- Image-led homepage with generated vial, molecular, and dashboard assets.
- High-density trust cues presented calmly, not aggressively.
- Distilled homepage structure: one primary waitlist action, one hero visual, one bento-style clinical-system section, one ordered workflow, one FAQ boundary section.
- Rounded surfaces are controlled: 16px for marketing panels, 8 to 10px for admin controls, full pills only for chips and CTAs.
- Admin surfaces reuse the palette but reduce spectacle for repeated operational work.

## 2. Colors

The palette is a graphite lab environment lit by aqua diagnostic signal, with blue and gold used only as support accents.

### Primary
- **Diagnostic Aqua** (#69f5e4): Primary action, focus, molecular glow, active state, timeline points, and clinical signal details. It should stay rare enough to feel like instrument light, not decoration.

### Secondary
- **Lab Blue** (#83d8ff): Secondary glow, molecular rails, and subtle gradient support when aqua needs depth.

### Tertiary
- **Assay Gold** (#c8ae63): Limited trust/accreditation accent. Use sparingly for pharmacy, oversight, or quality cues if needed.

### Neutral
- **Clinical Black** (#030608): Page base and deep field behind the homepage imagery.
- **Graphite Background** (#070a0d): Main dark neutral for admin and secondary surfaces.
- **Panel Veil** (#0e1114d1): Translucent marketing panels and glass-adjacent surfaces.
- **Panel Strong** (#14181deb): Stronger utility panels.
- **Panel Soft** (#ffffff0e): Hover fills and subtle inactive surface tint.
- **Primary Text** (#f6fbff): Main copy and headings on dark surfaces.
- **Soft Text** (#b8c4c8): Body copy, helper text, and explanatory paragraphs.
- **Dim Text** (#7c8b90): Metadata, timestamps, low-priority hints. Do not use for essential body copy.
- **Cyan Line** (#cef8ff2e): Default borders and dividers.
- **Strong Cyan Line** (#d2fff761): Focusable borders, hero frame, and primary panel outlines.

### Named Rules

**The Signal Rarity Rule.** Aqua is the diagnostic signal. Use it for action, focus, and scientific emphasis, not broad backgrounds or decorative saturation.

**The No Purple Gradient Rule.** This brand is graphite, aqua, lab blue, and limited gold. Do not drift into generic AI/SaaS purple gradients.

## 3. Typography

**Display Font:** Sora, with system fallbacks.
**Body Font:** Source Sans 3, with system fallbacks.
**Label/Mono Font:** Sora, with system fallbacks.

**Character:** Sora gives the homepage a precise instrument-panel edge for headlines, labels, and actions. Source Sans 3 keeps clinical copy more readable on dark surfaces without feeling generic or decorative.

### Hierarchy
- **Display** (Sora 800, `clamp(2.75rem, 5.6vw, 4.625rem)`, 0.98): Hero headline only. Keep the measure tight enough to make the phrase break with intent.
- **Headline** (Sora 800, `clamp(1.75rem, 3vw, 2.875rem)`, 1.04): Section headings and major CTAs.
- **Title** (Sora 800, `clamp(1.625rem, 2vw, 2rem)`, 1.08): Card titles and major component headings.
- **Body** (Source Sans 3 400 to 500, 1.0625rem, 1.58 to 1.62): Paragraphs, FAQ body, and supporting copy. Keep long prose around 58 to 75 characters when possible.
- **Label** (Sora 700 to 800, 0.8125rem to 0.9375rem, 0.06em, uppercase only when short): Eyebrows, card kickers, metric labels, and compact metadata.

### Named Rules

**The Plain Clinical Type Rule.** Do not introduce decorative display fonts or mono-as-technical styling. The brand's distinctiveness comes from layout, imagery, light, and restraint.

## 4. Elevation

Depth is a hybrid of tonal layering, translucent panels, blur, and aqua glow. Shadows exist, but they should feel like optical depth in a dark clinical space rather than generic floating cards.

### Shadow Vocabulary
- **Hero Chamber** (`0 38px 140px rgba(0, 0, 0, 0.76), 0 0 0 1px rgba(255, 255, 255, 0.02) inset, 0 0 80px rgba(105, 245, 228, 0.12)`): Use only for the homepage hero container.
- **Product Image Glow** (`0 42px 110px rgba(0, 0, 0, 0.58), 0 0 64px rgba(105, 245, 228, 0.16)`): Use for clinical imagery and hero visuals.
- **Panel Depth** (`0 18px 64px rgba(0, 0, 0, 0.26), inset 0 1px 0 rgba(255, 255, 255, 0.055)`): Use for marketing info cards.
- **Operational Flat**: Admin panels use borders and tonal fills more than large shadows. Keep them flatter for scanning and repeated use.
- **Focus Glow** (`0 0 0 4px rgba(105, 245, 228, 0.14)`): Use for form fields and interactive focus states.

### Named Rules

**The Glow Has a Job Rule.** Aqua glow should indicate focus, scientific signal, or image depth. Do not add it to every card or create separate decorative molecular layers when the background image and hero art already carry the signal.

## 5. Components

### Buttons
- **Shape:** Homepage form buttons use 10px radius; bottom CTAs and nav actions can use full-pill radius.
- **Primary:** Aqua gradient from near-white aqua to deep teal, dark ink text (#041014), 800 weight, 52 to 54px height.
- **Hover / Focus:** Focus uses aqua border or focus ring. Active can move down 1px. Avoid large decorative hover shadows beyond existing glow.
- **Admin Primary:** Solid aqua on dark ink, 8px radius, 40px minimum height. Admin buttons should be quieter than homepage CTAs.

### Chips
- **Style:** Full-pill radius, aqua-tinted background (`rgba(105, 245, 228, 0.08)`), aqua border, light aqua text.
- **State:** Use for signal lists, trust cues, and compact attributes. Do not turn every label into a chip.

### Cards / Containers
- **Corner Style:** 16px for homepage panels, 20px for large image cards, 10px for admin panel blocks.
- **Background:** Use translucent graphite panels over the molecular background. Marketing cards may use subtle gradients; admin cards should use solid dark fills.
- **Shadow Strategy:** Marketing cards use panel depth and glow sparingly. Admin cards use borders and tonal fills.
- **Border:** Default cyan line, strong cyan line for hero frames and selected states.
- **Internal Padding:** 24px for marketing cards, 16px for admin panels, 18px for waitlist forms.
- **Homepage Layout:** The clinical-system section uses an asymmetric bento rhythm: one large lead card, one visual card, and two compact support cards. Do not revert it into four equal cards.

### Inputs / Fields
- **Style:** Dark fill, cyan border, 10px homepage radius or 8px admin radius, high-contrast text.
- **Focus:** Aqua border plus 4px translucent aqua ring.
- **Error / Disabled:** Use text plus color. Danger is #ffb4b4; success is #8ff7bf. Do not rely on color alone.

### Navigation
- **Homepage:** Brand mark plus one compact waitlist action. Avoid extra section links unless the page gains enough length to justify them.
- **Admin:** Sticky left sidebar, 220px wide, subdued hover states, active item in panel-soft fill. Keep admin navigation utilitarian.

### Signature Component

**Molecular Field:** The page background, hero image, molecule particles, and hero helix rail create the brand's biotech signal. Keep these atmospheric and non-blocking. Do not layer separate DNA strands, peptide ribbons, highlight strips, and banners unless each one carries new information. Reduced-motion rules must disable animation for visitors who request it.

## 6. Do's and Don'ts

### Do:
- **Do** preserve the dark clinical biotech identity: graphite surfaces, aqua molecular light, vial/dashboard assets, and restrained medical copy.
- **Do** use Diagnostic Aqua (#69f5e4) for focus, actions, and scientific signal.
- **Do** keep claims conservative and specific: labs, licensed clinician review, patient-specific pharmacy fulfillment, and follow-up.
- **Do** maintain WCAG AA contrast, visible focus states, keyboard-friendly forms, meaningful alt text, and reduced-motion support.
- **Do** keep admin UI flatter and denser than the homepage.

### Don't:
- **Don't** make the brand feel scammy, hype-driven, or full of unsupported claims.
- **Don't** use crypto/AI hype aesthetics, supplement-bro performance marketing, generic SaaS filler, miracle-cure medical advertising, aggressive scarcity tactics, or vague wellness promises.
- **Don't** imply guaranteed outcomes, AI-prescribed medication, or treatment without licensed clinician judgment.
- **Don't** use purple gradients, beige wellness backgrounds, cartoon medical illustrations, or generic stock healthcare smiles.
- **Don't** over-round cards beyond the current system. Cards stay around 16px; controls stay around 8 to 10px; pills are only for pills.
- **Don't** use colored side-stripe borders, gradient text, repeated decorative card grids, or numbered section markers unless the content is truly sequential.
