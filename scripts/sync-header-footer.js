/**
 * scripts/sync-header-footer.js
 * Single Source of Truth for HaseenTech Header, Mobile Drawer, and Footer across all 17 HTML pages.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

// All 17 production pages
const PAGES = [
  'index.html',
  'about.html',
  'services.html',
  'service-wordpress.html',
  'service-woocommerce.html',
  'service-custom-web.html',
  'service-ai-chatbots.html',
  'service-whatsapp-automation.html',
  'service-landing-pages.html',
  'service-redesign.html',
  'service-maintenance.html',
  'service-seo-speed.html',
  'portfolio.html',
  'pricing.html',
  'contact.html',
  'privacy.html',
  'terms.html',
];

function getHeaderHtml(activePage) {
  // Determine top nav active states
  const isHome = activePage === 'index.html';
  const isWork = activePage === 'portfolio.html';
  const isServicesGroup = activePage.startsWith('service') || activePage === 'services.html';
  const isStudio = activePage === 'about.html';
  const isPricing = activePage === 'pricing.html';
  const isContact = activePage === 'contact.html';

  const services = [
    { href: 'services.html', label: 'All Services Overview ↗', isOverview: true },
    { href: 'service-wordpress.html', label: 'WordPress Development' },
    { href: 'service-woocommerce.html', label: 'WooCommerce Stores' },
    { href: 'service-custom-web.html', label: 'Custom Web Development' },
    { href: 'service-ai-chatbots.html', label: 'AI Chatbots &amp; Agents' },
    { href: 'service-whatsapp-automation.html', label: 'WhatsApp &amp; Automations' },
    { href: 'service-landing-pages.html', label: 'Landing Pages' },
    { href: 'service-redesign.html', label: 'Website Redesign' },
    { href: 'service-maintenance.html', label: 'Maintenance &amp; Support' },
    { href: 'service-seo-speed.html', label: 'SEO &amp; Speed Optimization' },
  ];

  const dropdownItemsHtml = services.map(s => {
    const isActive = activePage === s.href;
    const activeClass = isActive ? ' active' : '';
    const ariaCurrent = isActive ? ' aria-current="page"' : '';
    const overviewStyle = s.isOverview ? ' style="font-weight: 600; color: var(--color-orange); border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem; margin-bottom: 0.25rem;"' : '';
    return `              <a href="${s.href}" class="dropdown-item${activeClass}" role="menuitem"${overviewStyle}${ariaCurrent}>${s.label}</a>`;
  }).join('\n');

  return `  <!-- Header -->
  <header class="site-header">
    <div class="container header-container">
      <a href="index.html" class="brand-logo" aria-label="HaseenTech Home">
        <img src="assets/brand/logo.svg" alt="HaseenTech" width="160" height="32">
      </a>

      <nav class="nav-desktop" aria-label="Primary Navigation">
        <ul class="nav-list">
          <li><a href="index.html" class="nav-link${isHome ? ' active' : ''}"${isHome ? ' aria-current="page"' : ''}>Home</a></li>
          <li><a href="portfolio.html" class="nav-link${isWork ? ' active' : ''}"${isWork ? ' aria-current="page"' : ''}>Work</a></li>
          <li class="nav-item-dropdown">
            <a href="services.html" class="nav-link dropdown-trigger${isServicesGroup ? ' active' : ''}" aria-haspopup="true" aria-expanded="false"${activePage === 'services.html' ? ' aria-current="page"' : ''}>
              Services
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
            </a>
            <div class="dropdown-menu" role="menu">
${dropdownItemsHtml}
            </div>
          </li>
          <li><a href="about.html" class="nav-link${isStudio ? ' active' : ''}"${isStudio ? ' aria-current="page"' : ''}>Studio</a></li>
          <li><a href="pricing.html" class="nav-link${isPricing ? ' active' : ''}"${isPricing ? ' aria-current="page"' : ''}>Pricing</a></li>
          <li><a href="contact.html" class="nav-link${isContact ? ' active' : ''}"${isContact ? ' aria-current="page"' : ''}>Contact</a></li>
        </ul>
      </nav>

      <div class="header-actions">
        <div class="status-indicator-header">
          <span class="pill-badge"><span class="pulse-dot"></span> Available Q4/2026</span>
        </div>
        <a href="contact.html" class="btn btn-primary btn-sm">Start a Project ↗</a>
        <button id="menu-toggle" class="mobile-toggle-btn" aria-label="Toggle Navigation Menu" aria-expanded="false">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
        </button>
      </div>
    </div>
  </header>`;
}

function getDrawerHtml(activePage) {
  const isHome = activePage === 'index.html';
  const isWork = activePage === 'portfolio.html';
  const isServices = activePage === 'services.html';
  const isStudio = activePage === 'about.html';
  const isPricing = activePage === 'pricing.html';
  const isContact = activePage === 'contact.html';

  const sublinks = [
    { href: 'services.html', label: 'All Capabilities Overview ↗', style: ' style="color: var(--color-orange); font-weight: 600;"' },
    { href: 'service-wordpress.html', label: 'WordPress Development' },
    { href: 'service-woocommerce.html', label: 'WooCommerce Stores' },
    { href: 'service-custom-web.html', label: 'Custom Web Development' },
    { href: 'service-ai-chatbots.html', label: 'AI Chatbots &amp; Agents' },
    { href: 'service-whatsapp-automation.html', label: 'WhatsApp &amp; Automations' },
    { href: 'service-landing-pages.html', label: 'Landing Pages' },
    { href: 'service-redesign.html', label: 'Website Redesign' },
    { href: 'service-maintenance.html', label: 'Maintenance &amp; Bug Fixes' },
    { href: 'service-seo-speed.html', label: 'SEO &amp; Speed Optimization' },
  ];

  const sublinksHtml = sublinks.map(s => {
    const isActive = activePage === s.href;
    const activeClass = isActive ? ' active' : '';
    const ariaCurrent = isActive ? ' aria-current="page"' : '';
    return `          <a href="${s.href}" class="drawer-sublink${activeClass}"${s.style || ''}${ariaCurrent}>${s.label}</a>`;
  }).join('\n');

  return `  <!-- Mobile Drawer -->
  <div id="mobile-drawer" class="mobile-drawer" aria-hidden="true">
    <div class="drawer-header">
      <a href="index.html" class="brand-logo" aria-label="HaseenTech Home">
        <img src="assets/brand/logo.svg" alt="HaseenTech" width="140" height="28">
      </a>
      <button id="menu-close" class="mobile-toggle-btn" aria-label="Close Navigation Menu">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>
    <ul class="drawer-nav-list">
      <li><a href="index.html" class="drawer-link${isHome ? ' active' : ''}"${isHome ? ' aria-current="page"' : ''}>Home</a></li>
      <li><a href="portfolio.html" class="drawer-link${isWork ? ' active' : ''}"${isWork ? ' aria-current="page"' : ''}>Selected Work</a></li>
      <li>
        <a href="services.html" class="drawer-link${isServices ? ' active' : ''}"${isServices ? ' aria-current="page"' : ''}>Services Overview</a>
        <div class="drawer-submenu">
${sublinksHtml}
        </div>
      </li>
      <li><a href="about.html" class="drawer-link${isStudio ? ' active' : ''}"${isStudio ? ' aria-current="page"' : ''}>Studio &amp; Founder</a></li>
      <li><a href="pricing.html" class="drawer-link${isPricing ? ' active' : ''}"${isPricing ? ' aria-current="page"' : ''}>Packages &amp; Pricing</a></li>
      <li><a href="contact.html" class="drawer-link${isContact ? ' active' : ''}"${isContact ? ' aria-current="page"' : ''}>Contact &amp; Inquiries</a></li>
    </ul>
    <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--color-border);">
      <a href="contact.html" class="btn btn-primary" style="width: 100%;">Start a Project ↗</a>
    </div>
  </div>`;
}

function getFooterHtml() {
  return `  <!-- Site Footer -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top-grid">
        <!-- Column 1: Brand -->
        <div class="footer-col-brand">
          <a href="index.html" class="brand-logo" aria-label="HaseenTech Home">
            <img src="assets/brand/logo.svg" alt="HaseenTech" width="160" height="32">
          </a>
          <p class="footer-brand-desc">
            Independent creative technology studio founded by Hasan Ismail. Delivering modern, high-performance web engineering for ambitious international businesses.
          </p>
          <div class="footer-brand-meta" style="font-family: var(--font-mono); font-size: var(--fs-xs); color: var(--color-muted);">
            Karachi, Pakistan &middot; Remote Worldwide
          </div>
          <div class="status-indicator-footer" style="display: inline-flex; align-items: center; gap: 0.5rem; margin-top: 0.25rem;">
            <span class="pulse-dot"></span>
            <span style="font-family: var(--font-mono); font-size: var(--fs-xs); color: var(--color-muted);">Active Studio Status</span>
          </div>
        </div>

        <!-- Column 2: Services -->
        <div class="footer-col-services">
          <h4 class="footer-col-title">Services</h4>
          <ul class="footer-links-list">
            <li><a href="services.html" class="footer-link">Web Design &amp; Development</a></li>
            <li><a href="service-custom-web.html" class="footer-link">Custom Web Development</a></li>
            <li><a href="service-wordpress.html" class="footer-link">WordPress &amp; WooCommerce</a></li>
            <li><a href="service-ai-chatbots.html" class="footer-link">AI Chatbots &amp; Agents</a></li>
            <li><a href="service-whatsapp-automation.html" class="footer-link">WhatsApp Automation</a></li>
            <li><a href="service-seo-speed.html" class="footer-link">SEO &amp; Performance</a></li>
          </ul>
        </div>

        <!-- Column 3: Company -->
        <div class="footer-col-company">
          <h4 class="footer-col-title">Company</h4>
          <ul class="footer-links-list">
            <li><a href="about.html" class="footer-link">About</a></li>
            <li><a href="services.html" class="footer-link">Services</a></li>
            <li><a href="portfolio.html" class="footer-link">Portfolio</a></li>
            <li><a href="pricing.html" class="footer-link">Pricing</a></li>
            <li><a href="contact.html" class="footer-link">Contact</a></li>
          </ul>
        </div>

        <!-- Column 4: Contact -->
        <div class="footer-col-contact">
          <h4 class="footer-col-title">Contact</h4>
          <ul class="footer-links-list">
            <li><a href="mailto:hello@haseentech.com" class="footer-link">hello@haseentech.com</a></li>
            <li><span style="font-size: var(--fs-sm); color: var(--text-secondary);">Direct WhatsApp upon project brief</span></li>
            <li style="margin-top: 0.75rem;">
              <a href="contact.html" class="btn btn-secondary btn-sm" style="display: inline-flex;">Start a Project ↗</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom-bar">
        <div>
          &copy; <span id="current-year">2026</span> HaseenTech. All rights reserved. Founded by Hasan Ismail.
        </div>
        <div class="footer-legal-links">
          <a href="privacy.html" class="footer-link">Privacy Policy</a>
          <a href="terms.html" class="footer-link">Terms &amp; Conditions</a>
        </div>
      </div>
    </div>
  </footer>`;
}

function syncPage(pageName, dryRun = false) {
  const filePath = path.join(ROOT_DIR, pageName);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Replace Header and Drawer: from <!-- Header --> (or <header) up to <main id="main-content">
  const headerStartRegex = /(?:<!-- Header -->\s*)?<header class="site-header">[\s\S]*?(?:<!-- Mobile Drawer -->[\s\S]*?)?(?=<main id="main-content">)/;
  
  if (!headerStartRegex.test(content)) {
    console.error(`[ERROR] Could not find header/drawer block in ${pageName}`);
    return false;
  }

  const newHeaderAndDrawer = `${getHeaderHtml(pageName)}\n\n${getDrawerHtml(pageName)}\n\n  `;
  content = content.replace(headerStartRegex, newHeaderAndDrawer);

  // 2. Replace Footer: from <!-- Site Footer --> (or <!-- Footer --> or <footer class="site-footer">) up to before <script
  const footerStartRegex = /(?:<!-- (?:Site )?Footer -->\s*)?<footer class="site-footer">[\s\S]*?<\/footer>/;
  if (!footerStartRegex.test(content)) {
    console.error(`[ERROR] Could not find footer block in ${pageName}`);
    return false;
  }

  content = content.replace(footerStartRegex, getFooterHtml());

  if (!dryRun) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[SYNCED] ${pageName}`);
  } else {
    console.log(`[DRY-RUN OK] ${pageName}`);
  }
  return true;
}

function runSync(dryRun = false) {
  console.log(`=== STARTING HEADER & FOOTER SYNC (dryRun=${dryRun}) ===`);
  let successCount = 0;
  for (const page of PAGES) {
    if (syncPage(page, dryRun)) {
      successCount++;
    }
  }
  console.log(`\nCompleted ${successCount} / ${PAGES.length} pages.`);
}

module.exports = {
  PAGES,
  getHeaderHtml,
  getDrawerHtml,
  getFooterHtml,
  syncPage,
  runSync
};

if (require.main === module) {
  const dryRun = process.argv.includes('--dry-run');
  runSync(dryRun);
}
