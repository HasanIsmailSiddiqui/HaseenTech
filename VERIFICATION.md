# HaseenTech — Static Architecture & Verification Report

## Verification Summary

- **Architecture:** Pure Static HTML5 / CSS3 / Vanilla JavaScript
- **Framework Status:** 100% Free of React, Next.js, TSX, JSX, and build-time dependencies.
- **Node Modules Status:** Removed completely (`0` dependencies required at runtime).
- **Test Suite Result:** **1,131 assertions passed, 0 failures.**

---

## Retained Pages & Structure

### Root Pages (8)
1. `index.html` — Agency Homepage (Hero sculpture, philosophy, featured client work, service rows, authentic endorsements, country-aware pricing, FAQs)
2. `about.html` — Studio narrative, engineering principles, and Founder profile (Hasan Ismail)
3. `services.html` — Full capabilities directory organized into 4 engineering pillars
4. `portfolio.html` — 8 production client case studies with live URLs and verified screenshots
5. `pricing.html` — Complete transparent rates with PKR vs USD/GBP/EUR switcher
6. `contact.html` — Project discovery brief form & direct contact links
7. `privacy.html` — Client confidentiality and data privacy policy
8. `terms.html` — Terms of service & intellectual property terms

### Services Directory (`services/`) (9)
1. `services/service-ai-chatbots.html` — AI Chatbots & Custom AI Agents
2. `services/service-custom-web.html` — Custom Web Development
3. `services/service-landing-pages.html` — High-Converting Landing Pages
4. `services/service-maintenance.html` — Maintenance, Bug Fixes & Retainers
5. `services/service-redesign.html` — Website Modernization & Redesign
6. `services/service-seo-speed.html` — Technical SEO & Speed Optimization
7. `services/service-whatsapp-automation.html` — WhatsApp Chatbots & Automations
8. `services/service-woocommerce.html` — Custom WooCommerce Storefronts
9. `services/service-wordpress.html` — Custom WordPress CMS Development

---

## Assets & Images Preserved

- `assets/brand/logo.png` & root `favicon.png` — Official HaseenTech chrome HT metallic emblem (used across all headers, drawers, footers & favicons)
- `assets/brand/logo.svg` & variants
- `assets/brand/favicon.svg` & root `favicon.svg`
- `assets/images/studio-space.jpg` — Karachi studio environment photo (used in studio sections of `index.html` and `about.html`)
- `assets/images/hasan-ismail.png` (and original `Hasan Ismail.png`) — Personal founder portrait in leadership card (`about.html`)
- `assets/images/hero-sculpture.jpg` — Obsidian liquid chrome geometry sculpture
- `assets/portfolio/*.png` — High-resolution production homepage screenshots:
  - `atelier-rieber.png` (https://atelier-rieber.de)
  - `aquaseafood.png` (https://www.aquaseafood.co.uk)
  - `ifkkpakistan.png` (https://ifkkpakistan.com)
  - `izak10.png` (https://izak10.com)
  - `giftspak.png` (http://giftspak.com)
  - `synctechsol.png` (https://synctechsol.com)
  - `zobyconsulting.png` (https://zobyconsulting.com)
  - `kuzconsultancy.png` (https://kuzconsultancy.co.uk)

---

## Automated Verification Suite

Run verification anytime using:
```bash
npm test
# or
node scripts/verify-static-site.js
```

### Test Coverage
- **HTML Presence:** Confirms existence of all 17 HTML files.
- **Dependency Isolation:** Scans all HTML files to confirm 0 references to React, Next.js, `_next`, or `node_modules`.
- **CSS Link Integrity:** Confirms `<link rel="stylesheet">` paths resolve on disk for all pages.
- **Script Integrity:** Confirms `<script src="...">` paths resolve on disk for all pages.
- **Image Integrity:** Confirms all image tags point to non-empty assets on disk.
- **Internal Link Integrity:** Confirms all `<a href="...">` cross-links (nav dropdowns, drawer links, footer links, case studies) resolve to valid target files.
- **HTTP 200 Live Server Test:** Starts a static Node server and verifies that every page, clean URL, and static asset returns HTTP 200 OK.
