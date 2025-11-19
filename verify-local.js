const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  console.log('Starting verification of LOCAL build...');
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  // Target Local File
  const filePath = path.resolve(__dirname, 'index.html');
  const url = `file://${filePath}`;
  
  try {
    await page.goto(url, { waitUntil: 'networkidle0' });
    console.log(`Navigated to ${url}`);

    // 1. Check Title
    const title = await page.title();
    console.log(`Page Title: ${title}`);
    if (!title.includes('Kahoa')) throw new Error('Title does not contain "Kahoa"');

    // 2. Check for Camp 1 Content (Detailed)
    // We look for specific strings that were missing in the simplified version
    const camp1Text = await page.$eval('.camp[data-camp="1"]', el => el.textContent);
    if (!camp1Text.includes('The Kahoa Approach')) throw new Error('Camp 1 missing "The Kahoa Approach"');
    if (!camp1Text.includes('1.6x more likely')) throw new Error('Camp 1 missing specific stats');
    console.log('✅ Camp 1 content verified (Detailed)');

    // 3. Check for Camp 8 Content (Detailed)
    const camp8Text = await page.$eval('.camp[data-camp="8"]', el => el.textContent);
    if (!camp8Text.includes('12 Core Leadership Competencies')) throw new Error('Camp 8 missing detailed content');
    if (!camp8Text.includes('Klarna')) throw new Error('Camp 8 missing Case Studies');
    console.log('✅ Camp 8 content verified (Detailed)');

    // 4. Check for Canvas (Background)
    const canvasExists = await page.$('#bg-canvas') !== null;
    if (!canvasExists) throw new Error('Background canvas missing');
    console.log('✅ Background canvas verified');

    console.log('SUCCESS: Local build passed all content integrity checks.');
  } catch (error) {
    console.error('FAILED:', error.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
