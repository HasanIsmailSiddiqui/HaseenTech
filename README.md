# HaseenTech — Agency Website

Production-ready marketing site for **HaseenTech** (Modern Websites. Real Results.) built with Next.js, TypeScript, and Tailwind CSS.

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy environment template:

   ```bash
   copy .env.example .env.local
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Email & inquiry workflow

The contact form posts to `/api/inquiry` with server-side validation, honeypot, rate limiting, and optional file upload (PDF/images/ZIP, max 5MB).

Configure [Resend](https://resend.com) (or swap `src/lib/email.ts` for another provider):

| Variable | Purpose |
| -------- | ------- |
| `RESEND_API_KEY` | Resend API key (server only) |
| `BUSINESS_EMAIL` | Inbox for inquiries |
| `EMAIL_FROM` | Verified sender domain in Resend |
| `INQUIRY_STORE` | Set `true` to append JSON lines to `.data/inquiries.jsonl` |

Until `RESEND_API_KEY` and `BUSINESS_EMAIL` are set, the API returns **503** and the UI shows that delivery is pending—never a false success.

## WhatsApp CTA

Set `NEXT_PUBLIC_WHATSAPP_NUMBER` in international format without `+` (e.g. `923001234567`).

## Editable content

| Area | File |
| ---- | ---- |
| Site & nav | `src/data/site.ts` |
| Services | `src/data/services.ts` |
| Portfolio | `src/data/projects.ts` |
| Packages | `src/data/packages.ts` |
| About | `src/data/about.ts` |
| Home FAQs | `src/data/faq.ts` |

Replace portfolio placeholders in `public/portfolio/` with real screenshots. Run `npm run gen:portfolio` to regenerate styled placeholders.

Logo assets: `public/brand/` and `public/favicon.svg`.

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | ESLint |
| `npm run test` | Vitest unit tests |
| `npm run test:e2e` | Playwright smoke tests (run `npx playwright install chromium` once first) |
| `npm run gen:portfolio` | Regenerate portfolio SVG previews |

## Deploy on Vercel

1. Push the repository to GitHub/GitLab.
2. Import the project in [Vercel](https://vercel.com).
3. Add environment variables from `.env.example`.
4. Deploy. `NEXT_PUBLIC_*` variables are exposed to the browser; keep API keys server-only.

## Verification

See [VERIFICATION.md](./VERIFICATION.md) for tests run and launch checklist items.
