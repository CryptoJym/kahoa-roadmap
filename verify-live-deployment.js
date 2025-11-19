const puppeteer = require('puppeteer');

(async () => {
  console.log('Starting verification of live deployment...');
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  // Target URL (from Vercel output)
  const url = 'https://kahoa-3j392n9ug-vuplicity.vercel.app';
  
  try {
    await page.goto(url, { waitUntil: 'networkidle0' });
    console.log(`Navigated to ${url}`);

    // 1. Check Title
    const title = await page.title();
    console.log(`Page Title: ${title}`);
    if (!title.includes('Kahoa')) throw new Error('Title does not contain "Kahoa"');

    // 2. Check for Camp 1 Content (Detailed)
    const camp1Text = await page.$eval('.camp[data-camp="1"]', el => el.innerText);
    if (!camp1Text.includes('Experience → Belief → Action')) throw new Error('Camp 1 missing detailed content');
    console.log('✅ Camp 1 content verified');

    // 3. Check for Camp 8 Content (Detailed)
    const camp8Text = await page.$eval('.camp[data-camp="8"]', el => el.innerText);
    if (!camp8Text.includes('12 Core Leadership Competencies')) throw new Error('Camp 8 missing detailed content');
    console.log('✅ Camp 8 content verified');

    // 4. Check for Canvas (Background)
    const canvasExists = await page.$('#bg-canvas') !== null;
    if (!canvasExists) throw new Error('Background canvas missing');
    console.log('✅ Background canvas verified');

    console.log('SUCCESS: All checks passed for live deployment.');
  } catch (error) {
    console.error('FAILED:', error.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
