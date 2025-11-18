const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Kahoa Roadmap Final Tests', () => {

  test('all 8 camps scroll to top position', async ({ page }) => {
    const filePath = path.resolve(__dirname, 'kahoa-roadmap-phase1-FINAL.html');
    await page.goto(`file://${filePath}`);

    // Wait for page to load
    await page.waitForTimeout(500);

    const results = [];

    for (let i = 1; i <= 8; i++) {
      // Click waypoint
      await page.click(`[data-camp="${i}"]`);

      // Wait for scroll and expansion (reduced timeout)
      await page.waitForTimeout(800);

      // Get camp position
      const camp = await page.locator(`section.camp[data-camp="${i}"]`);
      const box = await camp.boundingBox();

      // Camp should be near top (within 100px of top)
      const isNearTop = box.y < 100 && box.y > -10;

      results.push({
        camp: i,
        y: box.y,
        pass: isNearTop
      });

      console.log(`Camp ${i}: y=${box.y.toFixed(2)}px ${isNearTop ? '✓ PASS' : '✗ FAIL'}`);

      // Assert for this camp
      expect(box.y).toBeLessThan(100);
      expect(box.y).toBeGreaterThan(-10);
    }

    // Summary
    console.log('\n=== SCROLL POSITION SUMMARY ===');
    results.forEach(r => {
      console.log(`Camp ${r.camp}: y=${r.y.toFixed(2)}px - ${r.pass ? '✓' : '✗'}`);
    });

    const allPass = results.every(r => r.pass);
    console.log(`\nAll camps passed: ${allPass ? 'YES ✓' : 'NO ✗'}`);
  });

  test('no text clipping on descenders', async ({ page }) => {
    const filePath = path.resolve(__dirname, 'kahoa-roadmap-phase1-FINAL.html');
    await page.goto(`file://${filePath}`);

    await page.waitForTimeout(500);

    const textsToCheck = [
      { selector: 'header h1', name: 'Header H1' },
      { selector: '.camp[data-camp="1"] .camp-header h2', name: 'Camp 1 Training' },
      { selector: '.camp[data-camp="2"] .camp-header h2', name: 'Camp 2 Programs' },
      { selector: 'footer h2', name: 'Footer Organization' }
    ];

    console.log('\n=== TEXT DESCENDER TESTS ===\n');

    for (const item of textsToCheck) {
      const element = await page.locator(item.selector).first();
      const text = await element.textContent();

      const styles = await element.evaluate(el => {
        const computed = getComputedStyle(el);
        return {
          lineHeight: computed.lineHeight,
          paddingBottom: computed.paddingBottom,
          fontSize: computed.fontSize,
          overflow: computed.overflow
        };
      });

      const lineHeightPx = parseFloat(styles.lineHeight);
      const fontSizePx = parseFloat(styles.fontSize);
      const lineHeightRatio = lineHeightPx / fontSizePx;
      const paddingBottomPx = parseFloat(styles.paddingBottom);

      console.log(`${item.name}: "${text.trim().substring(0, 20)}..."`);
      console.log(`  Line Height Ratio: ${lineHeightRatio.toFixed(2)}`);
      console.log(`  Padding Bottom: ${paddingBottomPx.toFixed(1)}px`);
      console.log(`  Overflow: ${styles.overflow}`);

      // Line height should be at least 1.8
      expect(lineHeightRatio).toBeGreaterThanOrEqual(1.8);

      // Padding bottom should be at least 5px
      expect(paddingBottomPx).toBeGreaterThanOrEqual(5);

      // No overflow hidden
      expect(styles.overflow).not.toBe('hidden');

      console.log(`  ✓ PASS\n`);
    }

    console.log('=== ALL TEXT TESTS PASSED ===\n');
  });
});
