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

## Checks

```bash
npm run check
npm run vite:build
```

`npm run check` validates the Node scripts and TypeScript.

## Environment

All environment variables are optional for local development.

```bash
SITE_EMAIL=hello@seramd.com
ADMIN_TOKEN=
INBOX_EMAIL_TOKEN=
PORT=4173
```

- `SITE_EMAIL`: email address displayed on the site and admin dashboard.
- `ADMIN_TOKEN`: when set, admin API routes require `Authorization: Bearer <token>`.
- `INBOX_EMAIL_TOKEN`: when set, `POST /api/inbox` requires `Authorization: Bearer <token>`.
- `PORT`: local server port.

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
