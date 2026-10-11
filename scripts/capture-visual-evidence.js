const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const PORT = 4175;
const ROOT = path.resolve(__dirname, '..');
const SCREENSHOT_DIR = path.resolve(ROOT, 'screenshots');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  let reqUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(reqUrl.pathname);
  if (pathname === '/' || pathname === '') pathname = '/index.html';

  let filePath = path.join(ROOT, pathname);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('Not Found');
  }

  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

async function runVisualEvidenceCapture() {
  await new Promise(resolve => server.listen(PORT, resolve));
  console.log(`Server listening on port ${PORT} for screenshot capture...`);

  const browser = await chromium.launch({ headless: true });

  try {
    // 1. Desktop Screenshots
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    const desktopPage = await desktopContext.newPage();

    console.log('Capturing Desktop Home...');
    await desktopPage.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'networkidle' });
    await desktopPage.screenshot({ path: path.join(SCREENSHOT_DIR, '01-home-desktop.png'), fullPage: false });
    await desktopPage.screenshot({ path: path.join(SCREENSHOT_DIR, '01-home-fullpage.png'), fullPage: true });

    console.log('Capturing Desktop Portfolio...');
    await desktopPage.goto(`http://localhost:${PORT}/portfolio.html`, { waitUntil: 'networkidle' });
    await desktopPage.screenshot({ path: path.join(SCREENSHOT_DIR, '02-portfolio-desktop.png'), fullPage: false });

    console.log('Capturing Desktop Services...');
    await desktopPage.goto(`http://localhost:${PORT}/services.html`, { waitUntil: 'networkidle' });
    await desktopPage.screenshot({ path: path.join(SCREENSHOT_DIR, '03-services-desktop.png'), fullPage: false });

    console.log('Capturing Desktop Studio / About...');
    await desktopPage.goto(`http://localhost:${PORT}/about.html`, { waitUntil: 'networkidle' });
    await desktopPage.screenshot({ path: path.join(SCREENSHOT_DIR, '04-about-desktop.png'), fullPage: false });

    console.log('Capturing Desktop Pricing...');
    await desktopPage.goto(`http://localhost:${PORT}/pricing.html`, { waitUntil: 'networkidle' });
    await desktopPage.screenshot({ path: path.join(SCREENSHOT_DIR, '05-pricing-desktop.png'), fullPage: false });

    console.log('Capturing Desktop Contact...');
    await desktopPage.goto(`http://localhost:${PORT}/contact.html`, { waitUntil: 'networkidle' });
    await desktopPage.screenshot({ path: path.join(SCREENSHOT_DIR, '06-contact-desktop.png'), fullPage: false });

    console.log('Capturing Desktop Custom Web...');
    await desktopPage.goto(`http://localhost:${PORT}/service-custom-web.html`, { waitUntil: 'networkidle' });
    await desktopPage.screenshot({ path: path.join(SCREENSHOT_DIR, '07-service-custom-web-desktop.png'), fullPage: false });

    console.log('Capturing Desktop AI Chatbots...');
    await desktopPage.goto(`http://localhost:${PORT}/service-ai-chatbots.html`, { waitUntil: 'networkidle' });
    await desktopPage.screenshot({ path: path.join(SCREENSHOT_DIR, '08-service-ai-chatbots-desktop.png'), fullPage: false });

    console.log('Capturing Desktop WordPress Service Detail...');
    await desktopPage.goto(`http://localhost:${PORT}/service-wordpress.html`, { waitUntil: 'networkidle' });
    await desktopPage.screenshot({ path: path.join(SCREENSHOT_DIR, '10-service-wordpress-desktop.png'), fullPage: false });

    console.log('Capturing Desktop Privacy Policy...');
    await desktopPage.goto(`http://localhost:${PORT}/privacy.html`, { waitUntil: 'networkidle' });
    await desktopPage.screenshot({ path: path.join(SCREENSHOT_DIR, '11-privacy-desktop.png'), fullPage: false });

    await desktopContext.close();

    // 2. Mobile Screenshots
    const mobileContext = await browser.newContext({
      viewport: { width: 375, height: 812 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();

    console.log('Capturing Mobile Home...');
    await mobilePage.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'networkidle' });
    await mobilePage.screenshot({ path: path.join(SCREENSHOT_DIR, '07-home-mobile.png'), fullPage: false });

    console.log('Capturing Mobile Drawer Open...');
    await mobilePage.click('#menu-toggle');
    await mobilePage.waitForTimeout(300);
    await mobilePage.screenshot({ path: path.join(SCREENSHOT_DIR, '08-mobile-drawer.png'), fullPage: false });

    await mobileContext.close();

    console.log('\nAll visual evidence screenshots captured successfully in:', SCREENSHOT_DIR);
  } catch (err) {
    console.error('Screenshot capture failed:', err);
  } finally {
    await browser.close();
    server.close();
  }
}

runVisualEvidenceCapture();
