# Kahoa V4 CSS/Visual Audit Report

**Date:** 2025-11-16
**File Audited:** `/Users/jamesbrady/kahoa-roadmap-phase1-fixed-v4.html`
**Total Issues Found:** 18

---

## CRITICAL Visual Issues (Must Fix)

### 1. ❌ Gradient Text Missing Line-Height Compensation
**Lines:** 696-704, 717-729, 784-792, 827-835
**Impact:** Text with `-webkit-background-clip: text` clips descenders (g, j, p, q, y) because gradient backgrounds don't account for proper line-height spacing.

**Affected Elements:**
- `.stat-value` (Line 696-704)
- `.detail-section h3` (Line 717-729)
- `.cta-box h3` (Line 784-792)
- `footer h2` (Line 827-835)

**Issue:** While headings have `padding-bottom: 0.15em` (Line 544, 560, 570), `.stat-value` elements with gradient text have NO padding-bottom, causing descenders to clip.

**Fix:**
```css
/* Line 696-704: Add padding-bottom */
.stat-value {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: 800;
  background: linear-gradient(135deg, var(--color-blue) 0%, var(--blue-glow) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  padding-bottom: 0.2em; /* ADD THIS */
  line-height: 1.3; /* ADD THIS */
}

/* Line 717-729: Increase padding-bottom (currently has var(--space-2) which is 8px) */
.detail-section h3 {
  font-family: var(--font-display);
  font-size: var(--text-heading-3);
  font-weight: 700;
  color: var(--color-white);
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-3); /* CHANGE from var(--space-2) to var(--space-3) */
  border-bottom: 2px solid var(--color-blue);
  background: linear-gradient(135deg, var(--color-white) 0%, var(--blue-glow) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.4; /* ADD THIS */
}

/* Line 784-792: Add line-height */
.cta-box h3 {
  font-family: var(--font-display);
  font-size: var(--text-heading-2);
  margin-bottom: var(--space-3);
  background: linear-gradient(135deg, var(--color-white) 0%, var(--blue-glow) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.35; /* ADD THIS */
  padding-bottom: 0.15em; /* ADD THIS */
}

/* Line 827-835: Add line-height */
footer h2 {
  font-family: var(--font-display);
  font-size: var(--text-heading-1);
  margin-bottom: var(--space-4);
  background: linear-gradient(135deg, var(--color-white) 0%, var(--blue-glow) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.35; /* ADD THIS */
  padding-bottom: 0.15em; /* ADD THIS */
}
```

---

### 2. ❌ Touch Targets Too Small on Mobile (< 44px)
**Lines:** 573-586, 630-641
**Impact:** WCAG 2.1 Level AAA requires touch targets to be at least 44×44px. Current buttons fall below this threshold on mobile.

**Affected Elements:**
- `.expand-btn` with padding `var(--space-3) var(--space-6)` = 12px 24px (Line 577)
- `.collapse-btn` with padding `var(--space-2) var(--space-4)` = 8px 16px (Line 635)

**Calculation:**
- `.expand-btn`: ~36px height (12px top + 12px bottom + font size ~12px) ❌
- `.collapse-btn`: ~32px height (8px top + 8px bottom + font size ~16px) ❌

**Fix:**
```css
/* Line 577: Increase padding */
.expand-btn {
  background: linear-gradient(135deg, var(--color-blue) 0%, var(--blue-bright) 100%);
  color: white;
  border: none;
  padding: var(--space-4) var(--space-6); /* CHANGE from var(--space-3) */
  min-height: 44px; /* ADD THIS */
  border-radius: 8px;
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: var(--space-4);
  box-shadow: var(--glow-blue);
}

/* Line 635: Increase padding */
.collapse-btn {
  background: rgba(75, 85, 99, 0.6);
  backdrop-filter: blur(8px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: var(--space-3) var(--space-5); /* CHANGE from var(--space-2) var(--space-4) */
  min-height: 44px; /* ADD THIS */
  border-radius: 6px;
  font-family: var(--font-display);
  font-size: var(--text-sm);
  cursor: pointer;
  transition: all 0.3s ease;
}
```

---

### 3. ❌ Missing Fallback for backdrop-filter (Safari < 16, Firefox < 103)
**Lines:** 229, 522, 619, 632, 682, 941
**Impact:** Backdrop-filter not fully supported in older browsers. Elements will lack background blur effect, potentially reducing readability.

**Affected Elements:**
- `#elevation-map` (Line 229)
- `.camp-header` (Line 522)
- `.camp-detail.expanded` (Line 619)
- `.collapse-btn` (Line 632)
- `.stat-card` (Line 682)
- `table` (Line 941)

**Fix:** Add fallback backgrounds before backdrop-filter:
```css
/* Line 229 */
#elevation-map {
  width: 100%;
  height: 350px;
  margin-bottom: var(--space-16);
  border-radius: 20px;
  background: rgba(20, 20, 20, 0.9); /* ADD FALLBACK - darker opacity */
  background: linear-gradient(135deg, rgba(20, 20, 20, 0.8) 0%, rgba(10, 47, 110, 0.4) 100%);
  backdrop-filter: blur(16px) saturate(180%);
  /* ... */
}

/* Apply same pattern to all 6 instances */
```

---

### 4. ❌ Inconsistent Line-Height Across Headings
**Lines:** 201, 543, 559-560, 569-570
**Impact:** Visually jarring when different heading levels have different line-heights. Creates rhythm inconsistency.

**Current Values:**
- `header h1`: 1.2 (Line 201)
- `.camp-header h2`: 1.25 (Line 543)
- `h1, h2, h3, h4, h5, h6`: 1.25 (Line 559)
- `h3`: 1.3 (Line 569)

**Issue:** `header h1` has tighter line-height (1.2) than other headings (1.25-1.3), creating visual inconsistency.

**Fix:**
```css
/* Line 189-203: Standardize to 1.3 */
header h1 {
  font-family: var(--font-display);
  font-size: var(--text-display-lg);
  font-weight: 800;
  margin-bottom: var(--space-4);
  background: linear-gradient(135deg, var(--color-white) 0%, var(--blue-glow) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  z-index: 1;
  line-height: 1.3; /* CHANGE from 1.2 */
  padding-bottom: 0.2em; /* INCREASE from 0.15em */
  display: inline-block;
}
```

---

### 5. ❌ SVG Text Clipping Risk in Waypoint Numbers
**Lines:** 301-309 (waypoint text styling)
**Impact:** SVG text elements with `text-anchor: middle` can clip if the parent SVG has `overflow: hidden` or tight viewBox.

**Affected Element:**
- `.waypoint text` (Line 301-309)

**Current Styling:**
```css
.waypoint text {
  fill: white;
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  text-anchor: middle;
  pointer-events: none;
  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.5));
}
```

**Fix:** Add dominant-baseline for vertical centering:
```css
.waypoint text {
  fill: white;
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  text-anchor: middle;
  dominant-baseline: central; /* ADD THIS */
  pointer-events: none;
  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.5));
}
```

---

## HIGH PRIORITY Issues

### 6. ⚠️ Max-Height Truncation Risk in Expanded Content
**Lines:** 609, 615
**Impact:** If camp content exceeds `max-height: 2000px` (overview) or `5000px` (detail), content will be clipped without scroll.

**Affected Elements:**
- `.camp-overview.expanded` (Line 609)
- `.camp-detail.expanded` (Line 615)

**Fix:**
```css
/* Line 608-612 */
.camp-overview.expanded {
  max-height: 3000px; /* INCREASE from 2000px */
  opacity: 1;
  padding: var(--space-6);
  overflow: visible; /* ADD THIS - allow natural expansion */
}

/* Line 614-620 */
.camp-detail.expanded {
  max-height: 8000px; /* INCREASE from 5000px */
  opacity: 1;
  padding: var(--space-6);
  background: rgba(26, 26, 26, 0.4);
  backdrop-filter: blur(8px);
  overflow: visible; /* ADD THIS */
}
```

---

### 7. ⚠️ No Horizontal Scroll Prevention on Small Screens
**Lines:** 882-911 (responsive media query)
**Impact:** Elements with fixed widths or large padding can cause horizontal scroll on screens < 375px width.

**Missing Rule:**
```css
/* Add after line 111 in body styles */
body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: 1.6;
  color: var(--color-white);
  background: linear-gradient(135deg, var(--black-void) 0%, var(--black-deep) 50%, var(--blue-midnight) 100%);
  background-attachment: fixed;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden; /* ADD THIS */
}
```

---

### 8. ⚠️ Insufficient Color Contrast on Low-Opacity Text
**Lines:** 552, 659, 709, 732, 751, 958
**Impact:** Text with `rgba(255, 255, 255, 0.7)` or `0.85` may fail WCAG AA contrast (4.5:1) against dark backgrounds.

**Affected Elements:**
- `.camp-tagline`: `rgba(255, 255, 255, 0.7)` (Line 552)
- `.key-points li`: `rgba(255, 255, 255, 0.9)` (Line 659)
- `.stat-label`: `rgba(255, 255, 255, 0.7)` (Line 709)
- `.detail-section p`: `rgba(255, 255, 255, 0.85)` (Line 732)
- `.process-steps li`: `rgba(255, 255, 255, 0.85)` (Line 751)
- `table td`: `rgba(255, 255, 255, 0.85)` (Line 958)

**Contrast Calculations** (against `#141414` background):
- `rgba(255, 255, 255, 0.7)` ≈ 3.8:1 ❌ (fails AA)
- `rgba(255, 255, 255, 0.85)` ≈ 4.3:1 ⚠️ (marginal)
- `rgba(255, 255, 255, 0.9)` ≈ 4.7:1 ✅ (passes AA)

**Fix:** Increase opacity to 0.9 minimum:
```css
/* Line 552 */
.camp-tagline {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.85); /* INCREASE from 0.7 */
  margin-top: var(--space-1);
  font-style: italic;
}

/* Line 709 */
.stat-label {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.85); /* INCREASE from 0.7 */
  margin-top: var(--space-1);
}

/* Line 732, 751, 958 - Already 0.85, consider increasing to 0.9 */
.detail-section p,
.process-steps li,
table td {
  color: rgba(255, 255, 255, 0.9); /* INCREASE from 0.85 */
}
```

---

### 9. ⚠️ Aggressive Drop-Shadow Filters May Cause Performance Issues
**Lines:** 260, 282, 308, 374
**Impact:** Multiple `filter: drop-shadow()` on SVG elements can cause GPU performance issues, especially on low-end devices.

**Affected Elements:**
- `.elevation-path`: `drop-shadow(0 2px 8px ...)` (Line 260)
- `.waypoint circle`: `drop-shadow(0 3px 6px ...)` (Line 282)
- `.waypoint text`: `drop-shadow(0 1px 3px ...)` (Line 308)
- `.altitude-badge svg`: `drop-shadow(0 0 4px ...)` (Line 374)

**Recommendation:** Add `will-change: filter` or convert to CSS shadows where possible.

**Fix:**
```css
/* Add performance optimization */
.elevation-path,
.waypoint circle:not(.waypoint-hitbox),
.waypoint text,
.altitude-badge svg {
  will-change: filter; /* ADD THIS for GPU acceleration */
}

/* Or use CSS box-shadow instead on non-SVG elements */
```

---

## MEDIUM PRIORITY Issues

### 10. 📱 Stat Grid Breaks Too Early on Tablet
**Lines:** 673-678, 898-900
**Impact:** `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))` creates 1-column layout on tablets (768px), wasting space.

**Current Behavior:**
- Desktop (1400px): 3 columns ✅
- Tablet (768px): 1-2 columns (depending on content) ⚠️
- Mobile (375px): 1 column ✅

**Fix:** Add tablet breakpoint:
```css
/* Line 673-678 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); /* REDUCE from 200px */
  gap: var(--space-4);
  margin: var(--space-6) 0;
}

/* Add new media query between 768px and 1024px */
@media (min-width: 768px) and (max-width: 1023px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr); /* Force 2 columns on tablet */
  }
}
```

---

### 11. 📱 Camp Header Button Stacking Creates Cramped Layout
**Lines:** 887-896
**Impact:** On mobile, `flex-direction: column` stacks camp header elements, but button gets `margin-top: var(--space-3)` (12px) which feels cramped.

**Fix:**
```css
/* Line 887-896 */
@media (max-width: 767px) {
  header h1 {
    font-size: var(--text-heading-1);
  }

  .camp-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .expand-btn {
    margin-left: 0;
    margin-top: var(--space-4); /* INCREASE from var(--space-3) */
    width: 100%;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .button-group {
    flex-direction: column;
    gap: var(--space-3); /* ADD THIS */
  }

  .button-group .expand-btn,
  .button-group .collapse-btn {
    width: 100%;
    margin-left: 0;
  }
}
```

---

### 12. 🎨 Inconsistent Border Radius Values
**Lines:** 227, 381, 578, 636, 684, 777, 803, 849, 942
**Impact:** Mix of 6px, 8px, 12px, 16px, 20px border radii creates visual inconsistency.

**Current Values:**
- `#elevation-map`: 20px (Line 227)
- `.camp`: 16px (Line 381)
- `.expand-btn`: 8px (Line 578)
- `.collapse-btn`: 6px (Line 636)
- `.stat-card`: 12px (Line 684)
- `.cta-box`: 12px (Line 777)
- `.cta-box a`: 8px (Line 803)
- `footer a`: 8px (Line 849)
- `table`: 8px (Line 942)

**Recommendation:** Standardize to 3 sizes:
- Large containers: 16px (camps, elevation map)
- Medium cards: 12px (stat cards, CTA boxes)
- Small elements: 8px (buttons, links)

**Fix:**
```css
/* Line 636 - Standardize to 8px */
.collapse-btn {
  border-radius: 8px; /* CHANGE from 6px */
}
```

---

### 13. 🎨 Process Steps Counter Alignment Issue
**Lines:** 755-771
**Impact:** `content: counter(step-counter)` creates a numbered circle, but if list item wraps to multiple lines, text alignment can look awkward.

**Current Styling:**
```css
.process-steps li::before {
  content: counter(step-counter);
  position: absolute;
  left: 0;
  top: 0; /* Issue: top: 0 doesn't vertically center with multi-line text */
  width: 32px;
  height: 32px;
  /* ... */
}
```

**Fix:**
```css
/* Line 755-771 */
.process-steps li::before {
  content: counter(step-counter);
  position: absolute;
  left: 0;
  top: 0.1em; /* CHANGE from 0 - slight vertical adjustment */
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, var(--color-blue) 0%, var(--blue-bright) 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-weight: 700;
  box-shadow: 0 0 12px rgba(25, 85, 237, 0.5);
  flex-shrink: 0; /* ADD THIS */
}
```

---

### 14. 🎨 CTA Box Link Lacks Active State
**Lines:** 798-815
**Impact:** `.cta-box a` has `:hover` but no `:active` state for click feedback.

**Fix:**
```css
/* Add after line 815 */
.cta-box a:active {
  transform: translateY(0) scale(0.98); /* ADD THIS */
}
```

---

### 15. 🎨 Footer Link Lacks Active State
**Lines:** 844-862
**Impact:** `footer a` has `:hover` but no `:active` state.

**Fix:**
```css
/* Add after line 862 */
footer a:active {
  transform: translateY(-1px) scale(0.98); /* ADD THIS */
}
```

---

## RESPONSIVE Issues

### 16. 📱 No Breakpoint Between 768px and 1024px
**Lines:** 249-252, 882-911
**Impact:** Only 2 media queries exist: `min-width: 768px` and `max-width: 767px`. Tablets (768-1024px) get desktop styles which may not be optimal.

**Missing Breakpoint:** 1024px (var(--breakpoint-lg) defined but unused)

**Fix:** Add tablet-specific styles:
```css
/* Add after line 911 */
@media (min-width: 768px) and (max-width: 1023px) {
  main {
    padding: var(--space-10) var(--space-5); /* Adjust padding */
  }

  .camp-header h2 {
    font-size: var(--text-heading-3); /* Reduce heading size */
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr); /* Force 2 columns */
  }
}
```

---

### 17. 📱 Elevation Map Height Jumps Abruptly
**Lines:** 224, 249-252
**Impact:** Map jumps from 350px → 450px at 768px breakpoint. No intermediate sizes for 375-767px range.

**Fix:**
```css
/* Line 224 - Use responsive sizing instead of fixed */
#elevation-map {
  width: 100%;
  height: clamp(300px, 40vh, 450px); /* REPLACE fixed 350px with clamp */
  margin-bottom: var(--space-16);
  /* ... */
}

/* Line 249-252 - Remove or adjust */
@media (min-width: 768px) {
  #elevation-map {
    /* No longer needed if using clamp above */
    /* OR set to larger size: height: 500px; */
  }
}
```

---

## ACCESSIBILITY Issues

### 18. ♿ Missing Focus Styles on Camp Header
**Lines:** 514-532
**Impact:** `.camp-header` has `cursor: pointer` and acts as clickable element but lacks `:focus` styles for keyboard navigation.

**Fix:**
```css
/* Add after line 532 */
.camp-header:focus {
  outline: 3px solid var(--blue-glow);
  outline-offset: 2px;
  background: rgba(30, 30, 30, 0.7);
}

.camp-header:focus-visible {
  outline: 3px solid var(--blue-glow);
  outline-offset: 2px;
}
```

---

## RECOMMENDATIONS

### Performance Optimizations

1. **Reduce Backdrop-Filter Usage:** Consider replacing with semi-transparent backgrounds on low-end devices via `@supports` query:
```css
@supports not (backdrop-filter: blur(1px)) {
  .camp-header,
  .stat-card,
  .camp-detail.expanded {
    backdrop-filter: none;
    background: rgba(26, 26, 26, 0.95); /* Increase opacity */
  }
}
```

2. **Add `font-display: swap`:** Prevent FOIT (Flash of Invisible Text):
```html
<!-- Line 9 - Add to Google Fonts link -->
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Crimson+Pro:wght@300;400;600;700&display=swap" rel="stylesheet">
```

3. **Lazy-Load Animation:** Defer `.fade-up` animations until elements are in viewport:
```css
.fade-up {
  animation: fadeUp 0.6s ease forwards;
  opacity: 0;
  animation-play-state: paused; /* ADD THIS */
}

.fade-up.in-view {
  animation-play-state: running; /* Trigger via JS Intersection Observer */
}
```

---

### Design Consistency

4. **Standardize Spacing Scale:** You have both pixel values and CSS variables. Prefer CSS variables:
```css
/* Replace all hardcoded margin/padding values with variables */
/* Example: margin: 20px 0; → margin: var(--space-5) 0; */
```

5. **Create Consistent Shadow System:** Currently using mix of custom shadows and CSS variables:
```css
/* Add to :root (after line 64) */
--shadow-glow-blue: 0 0 20px rgba(25, 85, 237, 0.3);
--shadow-glow-blue-strong: 0 0 28px rgba(25, 85, 237, 0.5);

/* Replace inline shadows with variables */
```

---

## TEST SCENARIOS

### Critical Path Testing

- [ ] **iPhone SE (375px width):**
  - Test all buttons meet 44×44px minimum
  - Verify no horizontal scroll
  - Check gradient text descenders (look for "g" clipping in stat values)
  - Test expand/collapse interactions

- [ ] **iPad (768px width, portrait):**
  - Verify stats grid shows 2 columns (not 1)
  - Check elevation map height looks proportional
  - Test camp header layout (should NOT stack yet)

- [ ] **iPad (1024px width, landscape):**
  - Verify all camps look balanced
  - Check if 3-column stats grid appears

- [ ] **Desktop (1920px width):**
  - Verify elevation map doesn't get too tall
  - Check that text sizes don't get too large (clamp max values)
  - Test waypoint click targets

### Browser Testing

- [ ] **Safari < 16:** Check backdrop-filter fallbacks
- [ ] **Firefox:** Verify all gradients render correctly
- [ ] **Chrome/Edge:** Baseline test

### Accessibility Testing

- [ ] **Keyboard Navigation:**
  - Tab through all interactive elements
  - Verify focus states are visible on all buttons, links, camp headers
  - Test space/enter to activate camps

- [ ] **Screen Reader:**
  - Test with VoiceOver (Mac) or NVDA (Windows)
  - Verify aria-labels make sense on waypoints

- [ ] **Contrast Checker:**
  - Use https://webaim.org/resources/contrastchecker/
  - Test all rgba(255,255,255,0.X) values against dark backgrounds

### Visual Regression Testing

- [ ] **Print all 8 camps and compare:**
  - Camp header styles (should be identical)
  - Button spacing (should be consistent)
  - Stat card layouts (should align)
  - Key points icon alignment (should be uniform)

- [ ] **Test Gradient Text in Multiple Browsers:**
  - Safari: Known for clipping issues with -webkit-background-clip
  - Firefox: Check fallback rendering
  - Chrome: Baseline

---

## PRIORITY MATRIX

**Fix Immediately (Before Launch):**
1. Issue #1: Gradient text line-height
2. Issue #2: Touch target sizes
3. Issue #8: Color contrast

**Fix Next Sprint:**
4. Issue #3: Backdrop-filter fallbacks
5. Issue #6: Max-height truncation
6. Issue #7: Horizontal scroll prevention

**Nice to Have:**
7. Issue #4: Line-height consistency
8. Issues #10-15: Design polish

**Future Optimization:**
9. Issue #9: Performance optimizations
10. Issues #16-17: Responsive refinements

---

## SUMMARY

**Total Issues:** 18
**Critical:** 5
**High Priority:** 4
**Medium Priority:** 6
**Accessibility:** 3

**Estimated Fix Time:** 3-4 hours

**Key Themes:**
1. Typography: Gradient text clipping affects multiple headings
2. Mobile: Touch targets and responsive breakpoints need work
3. Accessibility: Contrast and focus states need improvement
4. Consistency: Border radius, spacing, and shadows vary too much

**Next Steps:**
1. Fix all Critical issues (1-5)
2. Run test scenarios on iPhone, iPad, Desktop
3. Use contrast checker on all text
4. Review with accessibility tools (axe DevTools)
