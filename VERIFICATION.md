# HaseenTech — Verification Report



Last verified: **10 October 2026** (local build session)



## Automated tests performed



| Test | Command | Result |

| ---- | ------- | ------ |

| Unit — inquiry validation | `npm run test` | **Pass** (7 tests) |

| Unit — packages & navigation | `npm run test` | **Pass** (included above) |

| E2E — route smoke, form prefill, mobile overflow | `npm run test:e2e` | **Pass** (22 tests; requires `npx playwright install chromium`) |

| Production build | `npm run build` | **Pass** (23 static/partial routes) |

| ESLint | `npm run lint` | **Pass** (0 errors) |



### Build fixes applied (Oct 2026)



- Removed incompatible `runtime` export from `/api/inquiry` (Next.js 16 `cacheComponents`).

- Footer copyright year via client `useEffect` for stable prerender.

- Zod v4 validation messages; custom package `currency` field; `@testing-library/dom` dev dependency.



Re-run `npm run test:e2e` after pulling changes. Playwright starts `npm run dev` automatically.



## Manual checks recommended before launch



- [ ] Replace `public/about/hasan-placeholder.svg` with an approved professional photo

- [ ] Upload CV to `public/downloads/hasan-ismail-cv.pdf` and set `cvAvailable: true` in `src/data/about.ts`

- [ ] Replace portfolio SVG previews with real screenshots for verified URLs

- [ ] Confirm `gunsandaccessories.com` and `manddroyalty.com` DNS or update URLs in `src/data/projects.ts`

- [ ] Configure Resend domain and `.env.local` / Vercel env vars; send a test inquiry

- [ ] Set `NEXT_PUBLIC_WHATSAPP_NUMBER` and test prefilled WhatsApp link from `/packages`

- [ ] Set `NEXT_PUBLIC_SITE_URL` to production domain for sitemap and Open Graph

- [ ] Review Privacy Policy and Terms with legal counsel for your jurisdictions

- [ ] Add real testimonials only when approved (homepage section omitted until supplied)



## Portfolio URL verification (10 Oct 2026)



| URL | Result |

| --- | ------ |

| https://izak10.com | HTTP 200 |

| https://synctechsol.com | HTTP 200 (prior session) |

| https://zobyconsulting.com | HTTP 200 (prior session) |

| https://kuzconsultancy.co.uk | HTTP 200 (prior session) |

| http://giftspak.com | HTTP 200 (HTTPS may need hosting fix) |

| https://gunsandaccessories.com | **DNS did not resolve** |

| https://manddroyalty.com | **DNS did not resolve** |



Placeholder previews: `public/portfolio/*.svg` (run `npm run gen:portfolio` to regenerate).



## Configuration pending by default



- Transactional email (`RESEND_API_KEY`, `BUSINESS_EMAIL`, `EMAIL_FROM`)

- WhatsApp number (`NEXT_PUBLIC_WHATSAPP_NUMBER`)

- Optional social profile URLs

- International currency display beyond PKR defaults (use contact form currency field)



## Route checklist (all implemented)



`/`, `/about`, `/services`, `/services/[8 slugs]`, `/portfolio`, `/packages`, `/contact`, `/privacy-policy`, `/terms-and-conditions`, `/api/inquiry`, `/sitemap.xml`, `/robots.txt`



