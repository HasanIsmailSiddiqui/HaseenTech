const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const PORT = 4123;
const ROOT_DIR = path.resolve(__dirname, '..');

// Basic HTTP static file server
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.json': 'application/json',
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
  const filePath = path.join(ROOT_DIR, reqPath);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found: ' + reqPath);
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(res);
});

async function runStage1Tests() {
  console.log('--- Starting Stage 1 Automated Test Suite ---');
  let failures = [];

  function assert(condition, message) {
    if (!condition) {
      console.error(`  FAIL: ${message}`);
      failures.push(message);
    } else {
      console.log(`  PASS: ${message}`);
    }
  }

  await new Promise(resolve => server.listen(PORT, resolve));
  console.log(`Test server running at http://localhost:${PORT}`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  const failedRequests = [];
  page.on('requestfailed', request => {
    failedRequests.push(`${request.method()} ${request.url()} - ${request.failure()?.errorText}`);
  });

  try {
    // 1. Load Page
    console.log('\n[1] Page Load & Asset Verification:');
    const response = await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'networkidle' });
    assert(response && response.status() === 200, 'index.html loads with HTTP 200');
    assert(consoleErrors.length === 0, `No console errors (errors: ${consoleErrors.join(', ')})`);
    assert(failedRequests.length === 0, `No failed network requests (failed: ${failedRequests.join(', ')})`);

    const title = await page.title();
    assert(title.includes('HaseenTech') && title.includes('Modern Websites. Real Results.'), `Title is correct: "${title}"`);

    // 2. Navigation & Mobile Drawer
    console.log('\n[2] Navigation & Responsive Menu:');
    await page.setViewportSize({ width: 375, height: 667 });
    const isDesktopNavHidden = await page.$eval('.nav-desktop', el => window.getComputedStyle(el).display === 'none');
    assert(isDesktopNavHidden, 'Desktop navigation is hidden on mobile (375px)');

    const isToggleVisible = await page.$eval('#menu-toggle', el => window.getComputedStyle(el).display !== 'none');
    assert(isToggleVisible, 'Mobile menu toggle button is visible on mobile');

    // Open mobile drawer
    await page.click('#menu-toggle');
    const isDrawerOpen = await page.$eval('#mobile-drawer', el => el.classList.contains('open'));
    const isToggleExpanded = await page.$eval('#menu-toggle', el => el.getAttribute('aria-expanded') === 'true');
    assert(isDrawerOpen && isToggleExpanded, 'Mobile drawer opens and aria-expanded is true');

    // Close on Escape key
    await page.keyboard.press('Escape');
    const isDrawerClosedEsc = await page.$eval('#mobile-drawer', el => !el.classList.contains('open'));
    assert(isDrawerClosedEsc, 'Mobile drawer closes on Escape key');

    // Switch to desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    const isDesktopNavVisible = await page.$eval('.nav-desktop', el => window.getComputedStyle(el).display !== 'none');
    assert(isDesktopNavVisible, 'Desktop navigation is visible on desktop (1280px)');

    // 3. Hero Section
    console.log('\n[3] Hero Section:');
    const heroHeadline = await page.$eval('#hero-heading', el => el.innerText);
    assert(heroHeadline.includes('Modern Websites') && heroHeadline.includes('Real Results'), 'Hero headline contains required tagline');

    const heroPrimaryCta = await page.$eval('.hero-actions .btn-primary', el => el.getAttribute('href'));
    const heroSecondaryCta = await page.$eval('.hero-actions .btn-secondary', el => el.getAttribute('href'));
    assert(heroPrimaryCta === '#contact', 'Hero primary CTA links to #contact');
    assert(heroSecondaryCta === '#portfolio', 'Hero secondary CTA links to #portfolio');

    // 4. Trust Section (No fake statistics)
    console.log('\n[4] Trust / Experience Section:');
    const trustCards = await page.$$('.trust-card');
    assert(trustCards.length === 4, `4 verified trust/principle cards found (count: ${trustCards.length})`);
    const trustText = await page.$eval('.trust-section', el => el.innerText);
    const hasFakeNumbers = /\b99%|\b100%|\b500\+ clients|\b10\+ years/i.test(trustText);
    assert(!hasFakeNumbers, 'No invented percentage or fake client counts found in trust section');

    // 5. Services Section
    console.log('\n[5] Services Section:');
    const serviceCards = await page.$$('.service-card');
    assert(serviceCards.length === 6, `6 specialized service cards found (count: ${serviceCards.length})`);

    // 6. Portfolio Section (Real verified projects)
    console.log('\n[6] Portfolio & Filtering:');
    const portfolioCards = await page.$$('.portfolio-card');
    assert(portfolioCards.length === 5, `5 verified projects found (Izak10, SyncTech, KUZ, Zoby, GiftsPak)`);

    // Filter to E-Commerce
    await page.click('button[data-filter="ecommerce"]');
    const visibleAfterEcommerce = await page.$$eval('.portfolio-card:not(.hidden)', els => els.length);
    assert(visibleAfterEcommerce === 1, `1 project visible for E-Commerce filter (GiftsPak)`);

    // Filter to Consulting
    await page.click('button[data-filter="consulting"]');
    const visibleAfterConsulting = await page.$$eval('.portfolio-card:not(.hidden)', els => els.length);
    assert(visibleAfterConsulting === 2, `2 projects visible for Consulting filter (KUZ, Zoby)`);

    // Filter to Business
    await page.click('button[data-filter="business"]');
    const visibleAfterBusiness = await page.$$eval('.portfolio-card:not(.hidden)', els => els.length);
    assert(visibleAfterBusiness === 2, `2 projects visible for Business filter (Izak10, SyncTech)`);

    // Filter back to All
    await page.click('button[data-filter="all"]');
    const visibleAfterAll = await page.$$eval('.portfolio-card:not(.hidden)', els => els.length);
    assert(visibleAfterAll === 5, `All 5 projects visible when All is selected`);

    // Check external links have rel="noopener noreferrer"
    const externalLinksSafe = await page.$$eval('.portfolio-card a[target="_blank"]', els =>
      els.every(el => el.getAttribute('rel')?.includes('noopener'))
    );
    assert(externalLinksSafe, 'All portfolio external links include rel="noopener noreferrer"');

    // 7. About Section
    console.log('\n[7] About Section:');
    const aboutText = await page.$eval('#about', el => el.innerText);
    assert(aboutText.includes('Hasan Ismail') && aboutText.includes('Karachi, Pakistan'), 'Founder name Hasan Ismail and location Karachi present in About section');
    assert(aboutText.includes('Outcomes over ornament'), 'Founder philosophy "Outcomes over ornament" present');

    // 8. Country-Aware Pricing
    console.log('\n[8] Country-Aware Pricing Logic:');
    const countrySelect = await page.$('#country-select');
    assert(countrySelect !== null, 'Country select element exists');

    // Change to UK (GB)
    await page.selectOption('#country-select', 'GB');
    const gbpSymbol = await page.$eval('.pricing-currency-symbol', el => el.textContent);
    const gbpStarter = await page.$eval('[data-price="starter"]', el => el.textContent);
    const gbpBusiness = await page.$eval('[data-price="business"]', el => el.textContent);
    assert(gbpSymbol === '£' && gbpStarter === '249' && gbpBusiness === '499', `UK rates verified: £${gbpStarter}, £${gbpBusiness}`);

    // Change to Pakistan (PK)
    await page.selectOption('#country-select', 'PK');
    const pkrSymbol = await page.$eval('.pricing-currency-symbol', el => el.textContent);
    const pkrStarter = await page.$eval('[data-price="starter"]', el => el.textContent);
    const pkrBusiness = await page.$eval('[data-price="business"]', el => el.textContent);
    assert(pkrSymbol.trim() === 'PKR' && pkrStarter === '20,000' && pkrBusiness === '40,000', `Pakistan rates verified: PKR ${pkrStarter}, PKR ${pkrBusiness}`);

    // Change to UAE (AE)
    await page.selectOption('#country-select', 'AE');
    const aedStarter = await page.$eval('[data-price="starter"]', el => el.textContent);
    assert(aedStarter === '999', `UAE Starter rate verified: AED ${aedStarter}`);

    // Click "Inquire About Business"
    await page.click('.pricing-card.featured a[data-package-trigger="business"]');
    const selectedServiceVal = await page.$eval('#contact-service', el => el.value);
    assert(selectedServiceVal === 'business', 'Clicking Inquire pre-selected "business" package in contact form dropdown');

    // 9. Process & FAQ Sections
    console.log('\n[9] Process & FAQ Sections:');
    const processSteps = await page.$$('.process-step');
    assert(processSteps.length === 5, `5 project process steps found (count: ${processSteps.length})`);

    const faqItems = await page.$$('.faq-item');
    assert(faqItems.length === 6, `6 FAQ accordion items found (count: ${faqItems.length})`);

    // 10. Contact Form Validation
    console.log('\n[10] Contact Form Validation & Transparent Dispatch:');
    // Try submitting empty
    await page.click('#btn-submit-inquiry');
    const hasErrorClass = await page.$eval('.form-group.has-error', el => el !== null);
    const statusMsg = await page.$eval('#form-status-message', el => el.textContent);
    assert(hasErrorClass && statusMsg.includes('Please correct'), 'Empty form submission displays inline error styling & notice');

    // Fill valid data
    await page.fill('#contact-name', 'Test Client');
    await page.fill('#contact-email', 'client@example.com');
    await page.fill('#contact-country', 'United Kingdom');
    await page.selectOption('#contact-service', 'business');
    await page.fill('#contact-message', 'We need a bespoke WordPress website for our consulting company in London.');

    // Submit valid form
    await page.click('#btn-submit-inquiry');
    const isSuccessNoticeVisible = await page.$eval('#form-status-message.success', el => window.getComputedStyle(el).display !== 'none');
    assert(isSuccessNoticeVisible, 'Valid submission displays transparent inquiry preparation panel');

    const emailBtnHref = await page.$eval('#btn-dispatch-email', el => el.getAttribute('href'));
    assert(emailBtnHref.startsWith('mailto:hello@haseentech.com'), 'Email dispatch button has valid mailto: link');
    assert(emailBtnHref.includes('Test%20Client') || emailBtnHref.includes('Test+Client') || emailBtnHref.includes('Test'), 'Mailto link contains client name');

    // 11. Footer
    console.log('\n[11] Footer & Legal Links:');
    const privacyLink = await page.$eval('footer a[href="privacy-policy.html"]', el => el.textContent);
    const termsLink = await page.$eval('footer a[href="terms.html"]', el => el.textContent);
    assert(privacyLink.includes('Privacy Policy'), 'Privacy Policy link present');
    assert(termsLink.includes('Terms of Service'), 'Terms of Service link present');

    const backToTop = await page.$('#back-to-top');
    assert(backToTop !== null, 'Back to top button present');

  } catch (err) {
    console.error('Test execution error:', err);
    failures.push('Exception: ' + err.message);
  } finally {
    await browser.close();
    server.close();
  }

  console.log('\n----------------------------------------');
  if (failures.length === 0) {
    console.log('ALL STAGE 1 TESTS PASSED SUCCESSFULLY! (0 failures)');
    process.exit(0);
  } else {
    console.error(`TESTS FAILED with ${failures.length} errors:`);
    failures.forEach(f => console.error(`  - ${f}`));
    process.exit(1);
  }
}

runStage1Tests();
