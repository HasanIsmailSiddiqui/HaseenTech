const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function captureAtelierRieber() {
  console.log('Capturing Atelier Rieber live website via Playwright...');
  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2
    });

    console.log('Navigating to https://atelier-rieber.de/ ...');
    await page.goto('https://atelier-rieber.de/', { waitUntil: 'networkidle', timeout: 45000 });

    // Wait a brief moment for page loader / animations
    await page.waitForTimeout(3000);

    const outDirs = [
      path.resolve(__dirname, '../assets/portfolio'),
      path.resolve(__dirname, '../public/portfolio')
    ];
    for (const d of outDirs) {
      if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
    }

    const targetPath1 = path.resolve(__dirname, '../assets/portfolio/atelier-rieber.png');
    const targetPath2 = path.resolve(__dirname, '../public/portfolio/atelier-rieber.png');

    await page.screenshot({ path: targetPath1, clip: { x: 0, y: 0, width: 1440, height: 900 } });
    fs.copyFileSync(targetPath1, targetPath2);

    console.log('Successfully saved Atelier Rieber screenshots to:');
    console.log(targetPath1);
    console.log(targetPath2);
  } catch (err) {
    console.error('Failed to capture:', err);
  } finally {
    await browser.close();
  }
}

captureAtelierRieber();
