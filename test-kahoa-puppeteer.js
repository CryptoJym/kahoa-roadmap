const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log('Starting Kahoa Roadmap Tests...\n');

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const filePath = path.resolve(__dirname, 'kahoa-roadmap-phase1-FINAL.html');

  await page.goto(`file://${filePath}`, { waitUntil: 'networkidle2' });

  console.log('=== TEST 1: SCROLL POSITION FOR ALL 8 CAMPS ===\n');

  const scrollResults = [];

  for (let i = 1; i <= 8; i++) {
    // Click waypoint
    await page.click(`[data-camp="${i}"]`);

    // Wait for: collapse (550ms) + scroll (700ms) + settle (300ms) = 1550ms
    await new Promise(r => setTimeout(r, 1600));

    // Get camp position
    const position = await page.evaluate((campId) => {
      const camp = document.querySelector(`.camp[data-camp="${campId}"]`);
      const rect = camp.getBoundingClientRect();
      return { y: rect.y, top: rect.top };
    }, i);

    const pass = position.y < 100 && position.y > -50;
    scrollResults.push({ camp: i, y: position.y, pass });

    console.log(`Camp ${i}: y=${position.y.toFixed(2)}px ${pass ? '✓ PASS' : '✗ FAIL'}`);
  }

  const allScrollPass = scrollResults.every(r => r.pass);
  console.log(`\nScroll Position Tests: ${allScrollPass ? 'ALL PASS ✓' : 'SOME FAILED ✗'}\n`);

  console.log('=== TEST 2: TEXT DESCENDER CLIPPING ===\n');

  const textTests = [
    { selector: 'header h1', name: 'Header "AI Transformation"' },
    { selector: '.camp[data-camp="1"] .camp-header h2', name: 'Camp 1 "Training"' },
    { selector: '.camp[data-camp="2"] .camp-header h2', name: 'Camp 2 "Programs"' },
    { selector: '.camp[data-camp="3"] .camp-header h2', name: 'Camp 3 "Scaling"' },
    { selector: 'footer h2', name: 'Footer "Organization"' }
  ];

  const textResults = [];

  for (const test of textTests) {
    const styles = await page.evaluate((selector) => {
      const el = document.querySelector(selector);
      const computed = getComputedStyle(el);
      const text = el.textContent.trim();
      return {
        text,
        lineHeight: computed.lineHeight,
        paddingBottom: computed.paddingBottom,
        fontSize: computed.fontSize,
        overflow: computed.overflow
      };
    }, test.selector);

    const lineHeightPx = parseFloat(styles.lineHeight);
    const fontSizePx = parseFloat(styles.fontSize);
    const ratio = lineHeightPx / fontSizePx;
    const paddingPx = parseFloat(styles.paddingBottom);

    const passRatio = ratio >= 1.8;
    const passPadding = paddingPx >= 5;
    const passOverflow = styles.overflow !== 'hidden';
    const pass = passRatio && passPadding && passOverflow;

    textResults.push({ name: test.name, pass });

    console.log(`${test.name}:`);
    console.log(`  Text: "${styles.text.substring(0, 30)}..."`);
    console.log(`  Line Height: ${ratio.toFixed(2)} ${passRatio ? '✓' : '✗'}`);
    console.log(`  Padding Bottom: ${paddingPx.toFixed(1)}px ${passPadding ? '✓' : '✗'}`);
    console.log(`  Overflow: ${styles.overflow} ${passOverflow ? '✓' : '✗'}`);
    console.log(`  Overall: ${pass ? 'PASS ✓' : 'FAIL ✗'}\n`);
  }

  const allTextPass = textResults.every(r => r.pass);
  console.log(`Text Clipping Tests: ${allTextPass ? 'ALL PASS ✓' : 'SOME FAILED ✗'}\n`);

  // Summary
  console.log('=== FINAL SUMMARY ===\n');
  console.log(`Scroll Position Tests: ${allScrollPass ? '✓ PASS' : '✗ FAIL'}`);
  console.log(`Text Clipping Tests: ${allTextPass ? '✓ PASS' : '✗ FAIL'}\n`);

  if (allScrollPass && allTextPass) {
    console.log('🎉 ALL TESTS PASSED! 🎉\n');
  } else {
    console.log('⚠️  SOME TESTS FAILED ⚠️\n');
  }

  // Write results to file
  const results = {
    timestamp: new Date().toISOString(),
    scrollTests: scrollResults,
    textTests: textResults,
    summary: {
      scrollPass: allScrollPass,
      textPass: allTextPass,
      overallPass: allScrollPass && allTextPass
    }
  };

  fs.writeFileSync(
    path.resolve(__dirname, 'kahoa-final-test-results.json'),
    JSON.stringify(results, null, 2)
  );

  console.log('Results saved to: kahoa-final-test-results.json\n');

  await browser.close();
})();
