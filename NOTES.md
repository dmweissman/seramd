# Seramd Project Notes

These notes are for Paul, future developers, and AI agents working on the Seramd website. They explain what the project is, why it is structured this way, what should be changed carefully, and what should not be uploaded as source.

## Current State

The active project folder is:

```text
/Users/paul/Desktop/seramd
```

The local development site runs at:

```text
http://localhost:4173
```

The local admin dashboard runs at:

```text
http://localhost:4173/admin
```

The company/site name is **Seramd**. Do not reintroduce old placeholder branding in copy, filenames, docs, metadata, or package-facing text.

## Product Intent

Seramd is a premium clinical biotech-style coming-soon site for a bloodwork-powered peptide telehealth platform. The site should make the service feel medically careful, high-trust, and clinician-reviewed.

The page should communicate:

- Lab-guided peptide care.
- Licensed clinician review.
- Patient-specific pharmacy fulfillment.
- Follow-up labs and clinical workflow.
- AI-assisted recommendations, but not AI-prescribed medication.
- A calm private launch waitlist, not aggressive scarcity.

Avoid:

- Miracle-cure claims.
- Supplement-bro performance language.
- Crypto/AI hype language.
- Copy that implies AI prescribes medication.
- Unsupported medical outcomes.

## Why This Stack Exists

The project started as a static landing-page concept and was later converted into a React/Vite app with a tiny Node backend. That is why both classic static files and React source files exist.

The stack is intentionally small:

- **Vite + React** powers the public interactive site.
- **Tailwind 4 CSS** and local CSS tokens define the visual system.
- **shadcn-style primitives** provide accessible buttons, inputs, cards, badges, accordion, labels, separator, and textarea components.
- **Node `http` server** serves the built site and handles simple local APIs.
- **JSON files in `data/`** are local runtime storage for waitlist and email records.

There is no database, auth provider, deployment platform, or email provider wired in yet. That is deliberate. The current project is a lightweight coming-soon site and local capture/admin prototype.

## How To Run

Install dependencies:

```bash
npm install
```

Run the local app:

```bash
npm run dev
```

This command does two things:

1. Runs `npm run vite:build`.
2. Starts `node server.js`.

The server serves files from `dist/`. If the React source changes, restart `npm run dev` so `dist/` is rebuilt.

## Validation Commands

Run these before handing off changes:

```bash
npm run check
npm run vite:build
```

`npm run check` runs:

- `node --check server.js`
- `node --check script.js`
- `node --check admin.js`
- `tsc --noEmit`

`npm run vite:build` confirms the frontend bundle builds successfully.

## Source File Map

### Frontend

```text
src/App.tsx
```

Primary React landing page. It includes:

- Hero section.
- Waitlist form.
- Clinical-system cards.
- Protocol graphic.
- Workflow/process steps.
- FAQ accordion.

The waitlist form posts to:

```text
POST /api/waitlist
```

### Styling

```text
src/index.css
```

Main styling for the React app. It includes:

- Tailwind 4 imports.
- Theme tokens.
- Dark clinical graphite/aqua visual language.
- Landing-page layout and responsive styles.
- Animation and reduced-motion behavior.

```text
styles.css
```

Legacy/static/fallback page styling. Keep it unless the static fallback is intentionally removed.

```text
admin.css
```

Styling for the `/admin` dashboard.

### UI Components

```text
src/components/ui/
```

Local shadcn-style primitives. These are source files, not generated runtime output. Keep them in the repo.

Current primitives:

- `accordion.tsx`
- `badge.tsx`
- `button.tsx`
- `card.tsx`
- `input.tsx`
- `label.tsx`
- `separator.tsx`
- `textarea.tsx`

```text
src/components/seramd-converted-ui.tsx
```

This is a retained component module from the shadcn conversion pass. It exports reusable examples/components such as the waitlist form, clinical card, FAQ accordion, and admin composer. It is not the primary app entry today, but it is useful reference code and should keep the Seramd name.

### Entry Points

```text
src/main.tsx
```

React entry point mounted into `#root`.

```text
index.html
```

Vite HTML shell. It includes fallback HTML inside `#root` so the page is not blank before JavaScript loads. This fallback should also stay branded as Seramd.

### Backend

```text
server.js
```

Small Node HTTP server. It:

- Serves `/` and static built assets from `dist/`.
- Serves `/admin` via `admin.html`.
- Handles the waitlist endpoint.
- Handles admin waitlist/email endpoints.
- Handles a basic inbox webhook endpoint.
- Writes data to `data/waitlist.json` and `data/emails.json`.

This is not an Express app. It intentionally uses Node built-ins to keep the server minimal and easy to inspect.

### Admin Dashboard

```text
admin.html
admin.css
admin.js
```

Static local dashboard for:

- Viewing captured waitlist emails.
- Viewing queued/received emails.
- Saving outbound email records.
- Replying to inbound email addresses.

If `ADMIN_TOKEN` is set, the dashboard prompts for a token and stores it in `localStorage` under:

```text
seramdAdminToken
```

### Assets

```text
assets/
```

The assets folder contains generated biotech/clinical visuals used by the site:

- Hero vial/lab visual.
- Molecular banner.
- Bloodwork dashboard.
- Molecular page background.

Both AVIF and PNG versions are included where useful. AVIF is preferred by modern browsers; PNG acts as a fallback.

## API Notes

### `GET /api/config`

Returns:

```json
{ "siteEmail": "hello@seramd.com" }
```

The value comes from `SITE_EMAIL` or defaults to `hello@seramd.com`.

### `POST /api/waitlist`

Accepts:

```json
{
  "email": "person@example.com",
  "goals": "optional context"
}
```

Writes/updates a waitlist record in `data/waitlist.json`. For a new email, it also creates an automatic queued welcome email in `data/emails.json`.

### `GET /api/admin/waitlist`

Returns waitlist records and site email. Protected by `ADMIN_TOKEN` only if `ADMIN_TOKEN` is set.

### `GET /api/admin/emails`

Returns waitlist records plus email history. Protected by `ADMIN_TOKEN` only if `ADMIN_TOKEN` is set.

### `POST /api/admin/messages`

Saves an outbound email record. It does not send a real email. It marks the message as queued/local.

### `POST /api/inbox`

Webhook-style endpoint for inbound email capture. Protected by `INBOX_EMAIL_TOKEN` only if `INBOX_EMAIL_TOKEN` is set.

## Runtime Data And Privacy

These files may contain visitor emails and message history:

```text
data/waitlist.json
data/emails.json
```

They are ignored by git and should not be uploaded. Keep only:

```text
data/.gitkeep
```

If the app is run locally and those JSON files are recreated, that is expected.

## What Not To Commit Or Upload

Do not upload:

```text
node_modules/
dist/
.tmp-*/
.impeccable/
data/*.json
.env
.env.*
.DS_Store
```

Why:

- `node_modules/` is recreated with `npm install`.
- `dist/` is recreated with `npm run vite:build`.
- `.tmp-*` folders are screenshot/design artifacts.
- `.impeccable/` is local design-tool context.
- `data/*.json` may contain private waitlist/email data.
- `.env*` may contain secrets.

## GitHub Upload Guidance

Best path:

1. Keep this folder as a git repo.
2. Push with git after GitHub auth is configured.
3. Let GitHub receive only tracked files.

If manually uploading through the GitHub website, upload the source files and folders only. Do not drag in `node_modules`, `dist`, temp folders, or runtime JSON.

## Current Git State

At the time these notes were written, the local repo had an initial commit:

```text
Initial Seramd site
```

GitHub push may still require authentication. If `git push` fails with an auth error, configure GitHub CLI or SSH first.

## Design System Notes

The visual identity is dark clinical biotech:

- Graphite/black background.
- Aqua/cyan clinical signal color.
- Blue and gold as minor support colors.
- Restrained premium typography.
- Vial, molecular, and bloodwork dashboard imagery.

The site should look advanced but not hype-driven. The copy should be medically careful and conservative.

Primary design docs:

```text
PRODUCT.md
DESIGN.md
```

Use those before making major visual/copy changes.

## AI Agent Instructions

Before editing:

1. Run `npm run check`.
2. Run a case-insensitive scan for old placeholder branding, excluding `node_modules`, `dist`, and `.git`, and confirm no matches.
3. Read `PRODUCT.md`, `DESIGN.md`, and this `NOTES.md`.

When editing:

- Keep the company name as Seramd.
- Preserve the conservative clinical positioning.
- Avoid overpromising medical outcomes.
- Keep AI as assistive, not prescribing.
- Do not commit runtime email/waitlist JSON.
- Do not commit build output or dependencies.
- Prefer small scoped changes with checks after each pass.

Before handoff:

```bash
npm run check
npm run vite:build
rg -n -i "<old-placeholder-brand>" . -g '!node_modules/**' -g '!dist/**' -g '!.git/**'
git status --short
```

The `rg` command should print no matches.

## Known Gaps / Future Work

- Real email sending is not implemented. Outbound messages are saved locally as queued records.
- Local JSON storage is not suitable for production.
- Admin authentication is optional and token-based only.
- No production deployment config is included.
- No automated test suite exists beyond TypeScript/script checks and Vite build.
- The admin dashboard is useful for local review, but it is not a hardened production admin system.

## Reasoning Behind The Current Shape

The code is intentionally simple so another agent can understand it quickly:

- The React app owns the polished public experience.
- The Node server owns only static serving and basic local APIs.
- The admin dashboard is plain HTML/CSS/JS to avoid adding routing/backend complexity.
- Runtime data stays in local JSON so the waitlist can work without a database.
- shadcn-style primitives improve component consistency without introducing a full design-system package.
- Generated assets are included because the brand depends on the dark clinical visual system.

This is a good base for a coming-soon site and prototype dashboard. Before production launch, replace local JSON and queued email records with real infrastructure.
