# Seramd

Seramd is a coming-soon website for a bloodwork-powered peptide telehealth platform. The project includes:

- A React/Vite public landing page.
- A small Node HTTP server.
- A local waitlist API.
- A local admin/email dashboard at `/admin`.
- shadcn-style UI primitives under `src/components/ui`.

The company name is **Seramd**. Do not reintroduce any old placeholder branding in this project.

## Quick Start

```bash
npm install
npm run dev
```

Open:

- Public site: `http://localhost:4173`
- Admin dashboard: `http://localhost:4173/admin`

`npm run dev` builds the Vite app into `dist/`, then starts `server.js` on port `4173`.

## Vercel

The app now lives at the GitHub repository root, so Vercel can use the default
Vite settings:

```bash
npm ci
npm run build
```

The Vercel output directory is `dist`. The build also copies the admin
dashboard (`admin.html`, `admin.css`, `admin.js`) into `dist`, and
`vercel.json` rewrites `/admin` to it.

The waitlist/admin/inbox APIs are deployed as Vercel serverless functions from
the `api/` directory. They store data in Upstash Redis, so production needs:

1. An Upstash Redis database connected to the Vercel project (Vercel
   Marketplace → Upstash). This provides `UPSTASH_REDIS_REST_URL` and
   `UPSTASH_REDIS_REST_TOKEN` (the legacy `KV_REST_API_URL`/`KV_REST_API_TOKEN`
   names are also accepted).
2. `ADMIN_TOKEN` set in the Vercel project environment variables. The admin
   API refuses all requests until it is set.
3. Optionally `INBOX_EMAIL_TOKEN` (required before `POST /api/inbox` will
   accept anything) and `SITE_EMAIL`.

Until the Redis database is connected, the API responds with a clear 503
error instead of silently failing. Messages composed in the admin dashboard
are stored as "queued" records; no email-sending provider is wired in yet.

The local Node server (`server.js`) still powers the same APIs during local
development, using `data/*.json` files for storage.

## Checks

```bash
npm run check
npm run vite:build
```

`npm run check` validates the Node scripts and TypeScript.

## Environment

```bash
SITE_EMAIL=david@seramd.com
ADMIN_TOKEN=choose-a-secret
INBOX_EMAIL_TOKEN=
PORT=4173
```

- `SITE_EMAIL`: email address displayed on the site and admin dashboard.
- `ADMIN_TOKEN`: required for the admin API. Routes under `/api/admin/*`
  require `Authorization: Bearer <token>` and are disabled (503) until this is
  set. The `/admin` dashboard prompts for the token on first load.
- `INBOX_EMAIL_TOKEN`: required for `POST /api/inbox`, which is disabled (503)
  until this is set.
- `PORT`: local server port.

The public site and waitlist signup work without any environment variables in
local development; only the admin/inbox APIs require tokens.

## Runtime Data

The server writes local runtime data to:

- `data/waitlist.json`
- `data/emails.json`

Those JSON files are ignored by git because they can contain visitor emails and message history. `data/.gitkeep` keeps the folder in the repo.

## Important Files

- `src/App.tsx`: primary React landing page.
- `src/index.css`: Tailwind 4 CSS, theme tokens, and page-specific styling.
- `src/components/ui/*`: shadcn-style primitives used by the React page.
- `server.js`: static file server plus waitlist/admin/inbox APIs.
- `admin.html`, `admin.css`, `admin.js`: local admin/email dashboard.
- `index.html`: Vite shell and static fallback markup.
- `assets/*`: visual assets used by the page.
- `PRODUCT.md`, `DESIGN.md`: product and design-system context.
- `NOTES.md`: detailed handoff notes for future agents.

## GitHub Upload Notes

Do not upload these generated/local folders:

- `node_modules/`
- `dist/`
- `.tmp-*/`
- `.impeccable/`
- `data/*.json`

They are already covered by `.gitignore`. A future agent should run `npm install` and `npm run dev` after cloning.
