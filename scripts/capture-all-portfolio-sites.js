const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const sites = [
  { id: 'ifkkpakistan', url: 'https://ifkkpakistan.com/' },
  { id: 'aquaseafood', url: 'https://www.aquaseafood.co.uk/' },
  { id: 'izak10', url: 'https://izak10.com' },
  { id: 'synctechsol', url: 'https://synctechsol.com' },
  { id: 'zobyconsulting', url: 'https://zobyconsulting.com' },
  { id: 'kuzconsultancy', url: 'https://kuzconsultancy.co.uk' },
  { id: 'giftspak', url: 'http://giftspak.com' },
];

async function captureAll() {
  console.log('--- Capturing Real Production Screenshots for Portfolio ---');
  const browser = await chromium.launch({ headless: true });

  const targetDirs = [
    path.resolve(__dirname, '../assets/portfolio'),
    path.resolve(__dirname, '../public/portfolio'),
  ];
  for (const d of targetDirs) {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  }

  for (const item of sites) {
    console.log(`Navigating to ${item.id} -> ${item.url}...`);
    try {
      const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 1.5,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      });
      const page = await context.newPage();
      
      await page.goto(item.url, { waitUntil: 'domcontentloaded', timeout: 35000 });
      // Brief settling time for hero images and CSS transitions
      await page.waitForTimeout(3000);

      // Attempt to dismiss common cookie notices if present
      try {
        const acceptBtn = await page.$('button:has-text("Accept"), button:has-text("Agree"), a:has-text("Accept"), button:has-text("OK")');
        if (acceptBtn) await acceptBtn.click({ timeout: 1000 }).catch(() => {});
      } catch (e) {}

      const outPath1 = path.resolve(__dirname, `../assets/portfolio/${item.id}.png`);
      const outPath2 = path.resolve(__dirname, `../public/portfolio/${item.id}.png`);

      await page.screenshot({
        path: outPath1,
        clip: { x: 0, y: 0, width: 1440, height: 900 },
      });
      fs.copyFileSync(outPath1, outPath2);
      console.log(`[SAVED] ${item.id}.png successfully captured.`);
      await context.close();
    } catch (err) {
      console.error(`[ERROR] Failed to capture ${item.id}:`, err.message);
    }
  }

  await browser.close();
  console.log('--- All live screenshots capture complete ---');
}

captureAll();
