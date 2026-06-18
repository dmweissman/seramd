# Eyewear Store Blueprint — "Copy EyeBuyDirect" Build Spec

A hand-off document for your **developer** and **web designer**. It reverse-engineers
what [EyeBuyDirect](https://www.eyebuydirect.com/) actually is — as a business and as a
software product — and lays out exactly what to build so you get the same experience under
**your own brand**, with the **same class of tech stack**, selling **private-label / designer
frames** you control.

> Replace every `[YOUR BRAND]` placeholder with your brand name before sharing.

---

## 0. TL;DR for a busy founder

EyeBuyDirect is **not** a magic technology — it's three things bolted together:

1. **A fast, custom e-commerce storefront** (React-based, server-rendered, very image-heavy
   product grid) with a **prescription-lens configurator** as the heart of the buy flow.
2. **A virtual try-on** powered by a specialist vendor (the market leader is **Fittingbox**,
   which now also owns **Ditto** — the engine Zenni/Ace & Tate/Quay use). You license this; you
   don't build it.
3. **A vertically-integrated supply chain**: they design/private-label most frames, manufacture
   in China, and cut prescription lenses in their own labs before drop-shipping to the customer.
   Their in-house premium line is **RFLKT**; they also resell name brands (Ray-Ban, Oakley).
   EyeBuyDirect is owned by **EssilorLuxottica**.

To "copy" it you need to reproduce **all three**, not just the website. The website is the
cheap part. The **lens lab + private-label frame supply chain is the real business** — and the
part you can outsource on day one (see §7).

---

## 1. What you're actually copying (feature inventory)

Walk the live site with your developer/designer and confirm each of these. This is the scope.

### Storefront & merchandising
- Home page: hero, "best sellers", category tiles, social proof, promo banners.
- **Collection/PLP pages** with heavy faceted filtering: **shape, color, material, size,
  frame width, rim type, gender, price, features (blue-light, progressive-ready, etc.)**.
- **Product Detail Page (PDP)**: large gallery, color/size swatches, "Try On" button,
  fit/measurements (lens width–bridge–temple), price, reviews, "frame only" vs "with lenses".
- Search + autocomplete.
- Editorial **/guides** content hub (SEO engine — how-to-read-a-prescription, PD guide, etc.).

### The buy flow (the hard part)
This is the differentiator vs. a normal Shopify store. The flow is a **multi-step configurator**:

1. Choose frame → color → size.
2. **"Select Usage"**: Single Vision (distance/reading) · Progressive · Bifocal ·
   Non-prescription · Readers · Frame only.
3. **Lens type / index**: 1.50 standard, 1.59, 1.61, 1.67, 1.74 (thinner = pricier).
4. **Lens treatments / add-ons**: anti-reflective, blue-light filter, photochromic
   (transitions), tint/sunglasses, polarized, UV, scratch coat, mirror.
5. **Enter prescription**: manual entry (OD/OS sphere, cylinder, axis, add, **PD**), upload a
   photo of the Rx, or "send it later" / "my doctor will provide".
6. Price updates live as options are picked → Add to cart → checkout.

### Conversion / trust features
- **Virtual Try-On** (live webcam + photo upload + recorded video for people who need glasses
  to see the screen).
- Reviews & ratings, 14-day returns / first-pair guarantee messaging.
- Accepts insurance / FSA-HSA messaging, digital wallets (Apple/Google Pay, PayPal).
- Promo engine (frames "from $6", BOGO, % codes).

### Account & post-purchase
- Saved prescriptions, reorder, order tracking, returns/replacement flow.

---

## 2. Recommended tech stack

EyeBuyDirect runs a bespoke platform (it predates and is bigger than what an off-the-shelf
store needs). You should **not** rebuild their internal platform. Instead, match the *feel and
performance* with a modern headless stack. Three viable paths — **Path A is recommended**.

### ⭐ Path A — Headless: Next.js storefront + Shopify commerce backend (RECOMMENDED)
This gives you EyeBuyDirect's fast, fully-custom front end **and** a real commerce/ops backend
without building payments, tax, orders, or admin yourself.

| Layer | Technology | Why |
|---|---|---|
| Frontend | **Next.js (App Router) + React + TypeScript + Tailwind CSS** | Same class of stack as modern DTC eyewear; matches this repo already. Server components = fast image grids + SEO. |
| Commerce backend | **Shopify** (Storefront API / Hydrogen-style headless) | Handles checkout (PCI), payments, orders, inventory, customers, discounts, tax out of the box. A Shopify MCP is already connected to this project. |
| Lens configurator | **Custom React module** on top of Shopify product variants + line-item properties / a product-options app | This is your IP. The frame is a Shopify product; lens choices ride along as configurable add-ons and metadata. |
| Virtual try-on | **Fittingbox** (or Ditto) embed/API | License, don't build. Drops into any platform. |
| Hosting/CDN | **Vercel** | Already this repo's target; zero-config Next.js. |
| Search & filters | **Algolia** or **Shopify Search & Discovery** | Faceted PLP filtering at speed. |
| CMS for /guides | **Sanity** or **Shopify metaobjects** | SEO content hub. |

**Why A:** fastest path to "looks and feels like EBD," real checkout on day one, and the
custom configurator/try-on you actually care about stays fully custom.

### Path B — Pure Shopify theme + apps (fastest / cheapest, least custom)
Standard Shopify store + a **prescription-lens / product-options app** (e.g. a lens-builder
app) + a **Fittingbox/try-on app** + a review app. You lose pixel-level control of the buy
flow and the configurator UX won't be as slick as EBD's, but you can launch in weeks. Good for
validating the business before investing in Path A.

### Path C — Fully custom (what EBD literally does) — NOT recommended for launch
Next.js + your own Node/Go API + Postgres + Stripe + custom OMS/lab integration. Maximum
control, maximum cost/time, you rebuild checkout/PCI/tax/fraud yourself. Only makes sense at
scale once Shopify's limits actually bite.

> **Recommendation to give the dev:** Build **Path A**. Keep the door open to Path C by keeping
> the storefront decoupled from the backend via the Storefront API.

---

## 3. Site map / page inventory (for the designer)

```
/                         Home (hero, bestsellers, category tiles, trust, promo)
/eyeglasses               PLP — all optical frames (+ faceted filters)
/sunglasses               PLP — sunglasses
/eyeglasses/men           PLP variants by gender / shape / material / brand
/eyeglasses/women
/eyeglasses/[shape]       round / square / cat-eye / aviator / rectangle ...
/collections/[brand]      house line ([YOUR BRAND] Signature) + name brands
/products/[handle]        PDP + configurator entry
/lens                     "Prescription lenses & coatings explained"
/virtual-try-on           Try-on landing/explainer
/guides                   Editorial hub (SEO)
/guides/[slug]            How to read your Rx, what is PD, frame fit, etc.
/cart                     Cart (frame + lens options as line-item detail)
/checkout                 (Shopify-hosted in Path A/B)
/account                  Orders, saved prescriptions, reorder, returns
/account/prescriptions    Saved Rx management
/about /contact /faq /returns /shipping /insurance   Static/marketing + policy
```

### The configurator is a flow, not a page
Design it as a **stepper/wizard overlay** launched from the PDP, with a persistent live-price
rail. Steps from §1. Must be mobile-first (most traffic is phone). Provide a "skip / send Rx
later" escape hatch at the prescription step — forcing Rx entry kills conversion.

---

## 4. Core data model (give this to the dev)

Frames are products; **lenses are a configurable system layered on top**. In Shopify (Path A):

- **Frame product**: title, brand (house vs name), gallery, materials, shape, rim type,
  gender, price (frame-only), and **size metafields**: `lens_width`, `bridge`, `temple_length`,
  `frame_width`, `weight`.
- **Variants** = color × size.
- **Lens options** (modelled as a product-options app, metaobjects, or a "lens" line-item add-on):
  - `usage` (single-vision / progressive / bifocal / non-rx / readers / frame-only)
  - `lens_index` (1.50 / 1.59 / 1.61 / 1.67 / 1.74) → price delta
  - `coatings[]` (AR, blue-light, photochromic, polarized, tint, mirror, UV) → price deltas
  - computed `lens_price` added to the line item
- **Prescription** (stored against the customer/order, **encrypted**, see §8):
  `OD: sphere/cyl/axis/add`, `OS: sphere/cyl/axis/add`, `PD`, `prism` (optional),
  source = manual | upload | doctor-to-provide.

Each cart line carries: frame variant + chosen lens config + Rx reference, so the **lab** can
fulfill it. That line-item payload is the contract between your store and your lab (§7).

---

## 5. Key third-party integrations

| Need | Vendor options | Notes |
|---|---|---|
| **Virtual try-on** | **Fittingbox** (owns Ditto), Luna | API/embed, platform-agnostic, used by major eyewear retailers. The single most important "EBD-like" integration. Requires your frames to be 3D-scanned/added to their asset library. |
| Payments + wallets | Shopify Payments / Stripe; Apple/Google Pay, PayPal, Affirm/Klarna | Path A/B = handled by Shopify checkout. |
| Reviews | Okendo, Judge.me, Yotpo | Trust + SEO. |
| Search/faceting | Algolia, Shopify Search & Discovery | The PLP filters in §1. |
| Rx photo upload / OCR | Custom upload + manual review, or an Rx-OCR service | Start with upload + human verification. |
| Insurance / FSA-HSA | FSA cards work as normal cards; out-of-network insurance = provide itemized receipt | Messaging + receipt generation, not a hard integration at launch. |
| Analytics | GA4, Shopify analytics, a session-replay tool | Optimize the configurator funnel. |

---

## 6. Design system / branding direction (for the web designer)

The brief is "same experience, your branding." Concretely, replicate the **patterns**, not the
pixels:

- **Visual language:** clean, white/neutral canvas, oversized frame photography on consistent
  flat-lay + on-model shots, generous whitespace, a single confident accent color. Frames are
  the hero — UI recedes.
- **Photography spec (most important deliverable):** every frame needs (a) flat front, (b) 45°,
  (c) folded/side, (d) on-model, all on identical backgrounds/lighting. This consistency is
  what makes the grid look premium. Write a shot-list standard now.
- **Component kit:** product card (image swap on hover, color dots, price, "Try On"),
  filter rail / filter chips, swatch picker, the **lens configurator stepper** with live price,
  size/fit diagram (lens-bridge-temple), review stars, trust badges, sticky add-to-cart on
  mobile.
- **Type & color tokens:** define a Tailwind theme (`@theme` tokens like this repo's
  `app/globals.css`). One display face, one clean grotesque for UI, a mono for measurements/Rx
  numbers reads well for an optical brand.
- **Accessibility:** AA contrast, keyboard-navigable configurator, alt text on every frame.
- Deliver as a **Figma file**: tokens → components → page templates (Home, PLP, PDP,
  Configurator, Cart, Guide). Hand the dev a Storybook to match.

---

## 7. The supply chain — "designer / private-label frames" (the real business)

This is what makes it a *brand*, not a reseller, and it's separate from the website. You have
three sourcing models — most new entrants combine **1 + 3**:

1. **Private-label / OEM frames (own the brand).** Order stock or custom frames from an OEM/ODM
   eyewear manufacturer and put **your logo** on them (laser, print, or metal temple stamp).
   Typical timeline ~25–35 working days concept→delivery; MOQs apply. Search terms for your
   sourcing: *"private label eyewear manufacturer / OEM ODM optical frames."* This is the
   EyeBuyDirect "RFLKT / house line" model — most of their catalog is private label, made in
   China.
2. **Wholesale designer/name brands (resell).** Carry recognized brands alongside your house
   line for credibility, at lower margin. EBD added Ray-Ban/Oakley/Coach this way.
3. **Prescription-lens lab + drop-ship fulfillment.** You do **not** need your own lab to start.
   Use an **eyewear fulfillment / Rx lab partner** that: receives the order (frame + lens config
   + Rx from §4), edges and mounts the prescription lenses, does Rx verification, and
   **drop-ships to your customer in your branded packaging**. This is the operational core EBD
   built in-house; you rent it on day one.

**Action for you (non-engineering):**
- Get samples + quotes from 2–3 private-label frame OEMs; lock a starter collection (~30–60 SKUs).
- Sign a **Rx lens lab / fulfillment partner** and confirm their **order-intake format** — the
  dev must map your cart line-item payload (§4) to that format (CSV/API/EDI). This integration
  is the bridge between the website and physical fulfillment.
- Decide branded packaging (case, cloth, insert card) — part of the "premium" feel.

> **Reality check:** the website (§2–6) is ~the smaller half of this project. The frame
> sourcing + lab/fulfillment contracts + the order→lab integration is the half that determines
> margins, turnaround, and returns. Budget time for it in parallel, not after.

---

## 8. Compliance & risk (don't skip)

Selling prescription eyewear is regulated and Rx data is sensitive.

- **Valid prescription required.** US sellers of Rx eyewear must obtain a valid, unexpired
  prescription (FTC Eyeglass Rule). Build the "verify / doctor-to-provide / upload" paths and a
  verification step — don't just ship whatever's typed in.
- **Prescription = sensitive personal/health-adjacent data.** Encrypt at rest, restrict access,
  minimize retention, and put it behind auth. Get a privacy review before launch.
- **PD / measurement accuracy** drives returns — surface a "how to measure your PD" guide and
  generous return policy (EBD uses 14-day returns + a one-time replacement).
- **Standards:** lens/frame quality should meet relevant optical standards (e.g. impact for
  sunglasses); your lab partner should certify this. **ABO-style** Rx verification on the lab
  side.
- **Accessibility (ADA):** an e-commerce site is a frequent ADA-litigation target — bake in AA
  compliance from the start.

---

## 9. Suggested build phases (for the dev)

1. **Foundation** — Next.js + Tailwind + TS scaffold (this repo), design tokens, Shopify
   Storefront API wired, header/footer/nav.
2. **Catalog** — PLP with faceted filters + PDP + search. Load a real starter collection.
3. **Configurator** — the lens stepper with live pricing + cart line-item payload (§4). The core.
4. **Prescription capture** — manual/upload/later, encrypted storage, account saved-Rx.
5. **Checkout + accounts** — Shopify checkout, orders, reorder, returns.
6. **Virtual try-on** — Fittingbox/Ditto integration once frames are scanned.
7. **Lab/fulfillment integration** — map orders → lab intake format; test an end-to-end order.
8. **Content/SEO** — /guides hub, reviews, schema markup.
9. **Polish/QA** — mobile, Lighthouse, accessibility, funnel analytics.

Each phase ends in a review before the next (same cadence this repo already uses).

---

## 10. What to decide before development starts

- **Platform path:** A (headless Next.js + Shopify, recommended) vs B (Shopify theme + apps,
  fastest) vs C (fully custom). Pick A unless you need to validate cheaply first → B.
- **Brand name, logo, packaging** → unblocks the designer.
- **Frame sourcing partner(s)** and **starter SKU list** → unblocks photography + catalog.
- **Rx lens lab / fulfillment partner** and their **order intake format** → unblocks the
  configurator data model and the lab integration.
- **Try-on vendor** (Fittingbox quote) → unblocks the try-on phase.

---

## Sources

- [EyeBuyDirect — Wikipedia](https://en.wikipedia.org/wiki/Eyebuydirect)
- [EyeBuyDirect company/supplier analysis (Accio)](https://www.accio.com/biz-company/eyebuydirect)
- [EyeBuyDirect virtual try-on launch (PR Newswire)](https://www.prnewswire.com/news-releases/eyebuydirect-enhances-shopping-experience-with-new-virtual-try-on-feature-301225117.html)
- [EyeBuyDirect enhances try-on / digital payments (Chain Store Age)](https://chainstoreage.com/eyebuydirect-enhances-virtual-try-feature-accepts-digital-payments)
- [How to buy Rx eyeglasses online (EyeBuyDirect guide)](https://www.eyebuydirect.com/guides/how-to-buy-prescription-eyeglasses-online)
- [Prescription lenses & coatings explained (EyeBuyDirect)](https://www.eyebuydirect.com/prescription-lens)
- [Fittingbox acquires Ditto (Eyecare Business)](https://www.eyecarebusiness.com/news/2023/fittingbox-acquires-virtual-eyewear-try-on-tech-company-ditto-technologies-inc/)
- [Fittingbox virtual try-on FAQ (platform/API integration)](https://fittingbox.com/en/resources/faq-eyewear-virtual-try-on-technology)
- [Private Label Eyewear 101 (EyewearBeyond)](https://eyewearbeyond.com/private-label-eyewear-manufacturer-build-your-brand-with-eyewearbeyond/)
- [Eyewear fulfillment / Rx lab drop-ship (Rush Order)](https://rushorder.com/industries/eyewear-fulfillment)
- [Hermitin Optical — OEM/ODM private-label manufacturer](https://www.hermitin.com/)
- [Building e-commerce with Next.js + Shopify (Vercel)](https://vercel.com/kb/guide/building-ecommerce-sites-with-next-js-and-shopify)
