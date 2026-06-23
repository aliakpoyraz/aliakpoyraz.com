import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:3002';
const OUTPUT_DIR = 'public/img/readme';

const screenshots = [
  // Desktop screenshots (1440x900)
  { name: 'aliakpoyrazcom-desktop-light-en', url: '/en', width: 1440, height: 900, colorScheme: 'light' },
  { name: 'aliakpoyrazcom-desktop-dark-en', url: '/en', width: 1440, height: 900, colorScheme: 'dark' },
  { name: 'aliakpoyrazcom-desktop-light-tr', url: '/', width: 1440, height: 900, colorScheme: 'light' },
  { name: 'aliakpoyrazcom-desktop-dark-tr', url: '/', width: 1440, height: 900, colorScheme: 'dark' },
  
  // Desktop blog screenshots
  { name: 'aliakpoyrazcom-blog-en', url: '/en/blog', width: 1440, height: 900, colorScheme: 'dark' },
  { name: 'aliakpoyrazcom-blog-tr', url: '/blog', width: 1440, height: 900, colorScheme: 'dark' },
  
  // Mobile screenshots (375x812 - iPhone X)
  { name: 'aliakpoyrazcom-mobile-light-en', url: '/en', width: 375, height: 812, colorScheme: 'light' },
  { name: 'aliakpoyrazcom-mobile-dark-en', url: '/en', width: 375, height: 812, colorScheme: 'dark' },
  { name: 'aliakpoyrazcom-mobile-light-tr', url: '/', width: 375, height: 812, colorScheme: 'light' },
  { name: 'aliakpoyrazcom-mobile-dark-tr', url: '/', width: 375, height: 812, colorScheme: 'dark' },
];

/**
 * Smoothly scroll through the entire page to trigger all
 * IntersectionObserver-based lazy-loading and scroll animations.
 */
async function scrollThroughPage(page) {
  // Get the page height
  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const viewportHeight = await page.evaluate(() => window.innerHeight);
  
  // Scroll step = viewport height (so each section gets fully visible)
  const step = viewportHeight;
  const totalSteps = Math.ceil(pageHeight / step);
  
  for (let i = 0; i <= totalSteps; i++) {
    const scrollY = Math.min(i * step, pageHeight - viewportHeight);
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), scrollY);
    // Wait a bit for IntersectionObserver callbacks to fire & animations to start
    await page.waitForTimeout(200);
  }
  
  // Scroll back to top
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(300);
  
  // Do a second pass scrolling more granularly to ensure 100% coverage
  for (let i = 0; i <= totalSteps * 2; i++) {
    const scrollY = Math.min(i * (step / 2), pageHeight - viewportHeight);
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), scrollY);
    await page.waitForTimeout(100);
  }
  
  // Scroll back to top for final screenshot capture
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(500);
}

async function takeScreenshots() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    deviceScaleFactor: 2,
    locale: 'en-US',
  });

  for (const s of screenshots) {
    const page = await context.newPage();
    
    // Set color scheme via emulation
    await page.emulateMedia({ colorScheme: s.colorScheme });
    
    // Set viewport size
    await page.setViewportSize({ width: s.width, height: s.height });
    
    console.log(`→ Navigating to ${s.url} (${s.width}x${s.height}, ${s.colorScheme})`);
    
    // Navigate and wait for content to load
    await page.goto(`${BASE_URL}${s.url}`, { waitUntil: 'networkidle', timeout: 30000 });
    
    // Wait for the page to fully render (suspense boundaries to resolve)
    await page.waitForTimeout(2000);
    
    // Wait for the main content to appear (no more loading placeholders)
    try {
      await page.waitForFunction(() => {
        const main = document.querySelector('main');
        if (!main) return false;
        // Check if there's no div with animate-pulse class (loading skeleton)
        return !main.querySelector('.animate-pulse');
      }, { timeout: 10000 });
    } catch {
      // If timeout, just continue
    }
    
    console.log(`  → Scrolling through page to trigger lazy animations...`);
    
    // Scroll through the entire page to trigger all IntersectionObserver animations
    if (s.width >= 768) {
      // Full scrolling for desktop pages
      await scrollThroughPage(page);
    } else {
      // For mobile, still scroll but less aggressively
      await scrollThroughPage(page);
    }
    
    console.log(`  → Taking screenshot...`);
    
    // Take full page screenshot for desktop, viewport for mobile
    const outputPath = `${OUTPUT_DIR}/${s.name}.png`;
    
    await page.screenshot({ 
      path: outputPath, 
      fullPage: s.width >= 768  // full page for desktop, viewport for mobile
    });
    
    // Verify the file was created
    const fs = await import('fs');
    const stats = fs.statSync(outputPath);
    console.log(`  ✓ ${s.name}.png (${(stats.size / 1024).toFixed(0)} KB)`);
    
    await page.close();
  }

  await browser.close();
  console.log('\n✅ All screenshots taken successfully!');
}

takeScreenshots().catch(console.error);
