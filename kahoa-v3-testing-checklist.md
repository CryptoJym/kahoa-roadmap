# Kahoa Roadmap V3 - Testing Checklist

## File Location
**Test File:** `/Users/jamesbrady/kahoa-roadmap-phase1-fixed-v3.html`

## Pre-Test Setup

1. ✅ Open the file in a web browser (Chrome, Firefox, or Safari)
2. ✅ Open Browser Developer Tools (Press F12 or Right-Click → Inspect)
3. ✅ Switch to the **Console** tab
4. ✅ Refresh the page to see initialization logs

## Expected Console Output on Page Load

You should see:
```
=== CAMP MANAGER INITIALIZED ===
Total camps found: 8
Total waypoints found: 8
Camp 1: data-camp="1"
Camp 2: data-camp="2"
Camp 3: data-camp="3"
Camp 4: data-camp="4"
Camp 5: data-camp="5"
Camp 6: data-camp="6"
Camp 7: data-camp="7"
Camp 8: data-camp="8"
Waypoint 1: data-camp="1"
Waypoint 2: data-camp="2"
Waypoint 3: data-camp="3"
Waypoint 4: data-camp="4"
Waypoint 5: data-camp="5"
Waypoint 6: data-camp="6"
Waypoint 7: data-camp="7"
Waypoint 8: data-camp="8"
=== ATTACHING WAYPOINT LISTENERS ===
Waypoint 1: Attaching click listener for camp 1
✓ Listeners attached to waypoint 1
Waypoint 2: Attaching click listener for camp 2
✓ Listeners attached to waypoint 2
...
Waypoint 8: Attaching click listener for camp 8
✓ Listeners attached to waypoint 8
=== ALL WAYPOINT LISTENERS ATTACHED ===
```

### ❌ If you see different numbers:
- If "Total camps found" < 8 → HTML camps are missing
- If "Total waypoints found" < 8 → SVG waypoints are missing
- If any waypoint shows data-camp="undefined" → Missing data attribute

## Test 1: Waypoint 1 (Camp 1: Overview)

### Steps:
1. Scroll to the top of the page
2. Click on Waypoint 1 (the first circle on the elevation map)

### Expected Behavior:
✅ Console logs:
```
===================================
WAYPOINT CLICKED: Camp 1
Event target: [SVG circle element]
Current target: [SVG g element]
===================================
Step 1: Collapsing all camps
Step 2: Scrolling to camp 1
scrollToCamp called for camp 1
Scrolling to camp 1 element: [section element]
✓ Scroll initiated for camp 1
Step 3: Expanding camp 1
expandOverview called for camp 1
✓ Camp 1 expanded
Step 4: Re-scrolling to ensure heading at top
scrollToCamp called for camp 1
```

✅ Visual behavior:
- Page smoothly scrolls
- "Camp 1: Overview" heading appears at the **TOP** of the viewport
- Camp overview section expands below the heading
- Waypoint 1 circle changes color (becomes active)

### ❌ If this fails:
- Check console for errors
- Verify "WAYPOINT CLICKED: Camp 1" appears
- If no console log appears, waypoint 1 click listener is not attached

## Test 2: Waypoint 2 (Camp 2: AI Audit) - CRITICAL TEST

### Steps:
1. Click on Waypoint 2 (second circle on the elevation map)

### Expected Behavior:
✅ Console logs similar to Test 1 but for Camp 2

✅ Visual behavior:
- Camp 1 collapses
- Page smoothly scrolls
- **"Camp 2: AI Audit" heading appears at the TOP** (NOT at the bottom!)
- Camp 2 overview section expands below the heading
- Waypoint 2 circle becomes active

### ❌ CRITICAL: If heading appears at BOTTOM of viewport:
This means the fix didn't work. The re-scroll timing may need adjustment.

## Test 3: Waypoint 3-5 (Camps 3-5)

### Steps:
1. Click Waypoint 3 → Verify Camp 3 heading at top
2. Click Waypoint 4 → Verify Camp 4 heading at top
3. Click Waypoint 5 → Verify Camp 5 heading at top

### Expected Behavior:
Each camp should:
- Collapse the previous camp
- Scroll to show the heading at the **TOP**
- Expand the overview
- Re-scroll to keep heading at top

## Test 4: Waypoint 6 (Camp 6: MIP) - CRITICAL TEST

### Steps:
1. Click on Waypoint 6 (sixth circle on the elevation map)

### Expected Behavior:
✅ Console shows:
```
===================================
WAYPOINT CLICKED: Camp 6
===================================
```

✅ Visual behavior:
- Previous camp collapses
- Page scrolls to Camp 6
- **"Camp 6: Managed Intelligence Provider" heading appears at TOP**
- Camp 6 overview expands

### ❌ CRITICAL: If nothing happens:
- Check console - if no "WAYPOINT CLICKED" message appears:
  - Waypoint 6 click listener was not attached
  - Waypoint 6 might be covered by another element
  - Event propagation might be blocked
- If console shows click but no scroll:
  - Check for error: "Camp 6 not found!"
  - Verify camp section exists in HTML

## Test 5: Waypoint 7 (Camp 7: Culture) - CRITICAL TEST

### Steps:
1. Click on Waypoint 7 (seventh circle on the elevation map)

### Expected Behavior:
✅ Camp 7 heading appears at **TOP** of viewport
✅ Overview expands
✅ Console logs show all 4 steps

### ❌ If waypoint 7 is unclickable:
- It may be outside the SVG viewBox
- Check if waypoint 7 circle is visible on screen
- Try zooming out to see the entire elevation map

## Test 6: Waypoint 8 (Camp 8: Leadership) - CRITICAL TEST

### Steps:
1. Click on Waypoint 8 (eighth and final circle on the elevation map)

### Expected Behavior:
✅ Camp 8 heading appears at **TOP** of viewport
✅ "Camp 8: Leadership for Hybrid Teams" overview expands
✅ Console logs show all 4 steps

### ❌ If waypoint 8 is unclickable:
Same debugging steps as Test 5

## Test 7: Rapid Clicking (Debounce Test)

### Steps:
1. Rapidly click Waypoint 2, then Waypoint 3, then Waypoint 4 (click fast!)

### Expected Behavior:
✅ Only the FIRST click is processed
✅ Console shows "Click debounced, ignoring" for subsequent clicks
✅ Page scrolls to only the first clicked camp
✅ After 600ms, clicks work again

### ❌ If all clicks process:
Debounce is not working - animation may stutter

## Test 8: Keyboard Navigation (Accessibility Test)

### Steps:
1. Press Tab key repeatedly until Waypoint 1 is focused (has outline)
2. Press Enter or Space key

### Expected Behavior:
✅ Waypoint 1 activates
✅ Console shows: "Waypoint 1 activated via keyboard"
✅ Same scroll and expand behavior as mouse click

## Test 9: Heading Position Verification

### For EACH camp (1-8):
1. Click the waypoint
2. **Measure** the position of the camp heading

### Expected:
✅ The heading text should be approximately 150-200px from the top of the viewport
✅ The heading should be FULLY VISIBLE (not cut off)
✅ The heading should NOT be at the bottom of the screen

### How to measure:
1. Right-click the heading → Inspect
2. Check the element's position in the DOM
3. Or use browser's measuring tool

## Test 10: Multiple Expand/Collapse Cycles

### Steps:
1. Click Waypoint 2 → Expands Camp 2
2. Click Waypoint 5 → Camp 2 collapses, Camp 5 expands
3. Click Waypoint 2 again → Camp 5 collapses, Camp 2 expands
4. Click Waypoint 8 → Camp 2 collapses, Camp 8 expands

### Expected:
✅ Only one camp is expanded at a time
✅ Each heading appears at the top
✅ No visual glitches or layout jumps

## Success Criteria Summary

| Test | Status | Notes |
|------|--------|-------|
| Console shows 8 camps found | ⬜ |  |
| Console shows 8 waypoints found | ⬜ |  |
| Waypoint 1 works | ⬜ | Heading at top? |
| Waypoint 2 works | ⬜ | **CRITICAL: Heading at top?** |
| Waypoint 3 works | ⬜ | Heading at top? |
| Waypoint 4 works | ⬜ | Heading at top? |
| Waypoint 5 works | ⬜ | Heading at top? |
| Waypoint 6 works | ⬜ | **CRITICAL: Does it click?** |
| Waypoint 7 works | ⬜ | **CRITICAL: Does it click?** |
| Waypoint 8 works | ⬜ | **CRITICAL: Does it click?** |
| Debouncing prevents rapid clicks | ⬜ |  |
| Keyboard navigation works | ⬜ |  |

## If Tests Fail: Debugging Steps

### If Waypoints 6-8 don't respond to clicks:

1. **Check console for initialization**
   - Does it show "Waypoint 6: Attaching click listener for camp 6"?
   - If NO → Waypoint 6 was not found in the DOM

2. **Inspect the SVG element**
   - Right-click on Waypoint 6 circle → Inspect
   - Verify it has `class="waypoint"` and `data-camp="6"`

3. **Check z-index**
   - Another element might be covering waypoints 6-8
   - In DevTools, hover over the waypoint to see if it highlights

4. **Check event listeners**
   - In DevTools, Elements tab, select waypoint 6 circle
   - Look at Event Listeners panel → Should show "click" event

### If camps scroll to bottom instead of top:

1. **Check timing**
   - The re-scroll happens 300ms after expand
   - May need to increase to 500ms if animations are slow

2. **Check scroll-margin-top CSS**
   - Line 364 sets `scroll-margin-top: 150px`
   - This controls offset from top

3. **Disable smooth scroll temporarily**
   - Change `behavior: 'smooth'` to `behavior: 'auto'`
   - This removes animation to debug pure positioning

## Browser Compatibility

Tested in:
- ⬜ Chrome/Edge (recommended)
- ⬜ Firefox
- ⬜ Safari

## Final Validation

✅ ALL 8 waypoints are clickable
✅ ALL 8 camps scroll to show heading at TOP of viewport
✅ Console logs provide clear debugging information
✅ No JavaScript errors in console
✅ Smooth animations work correctly
✅ Keyboard navigation works

---

**If all tests pass:** The fix is successful! ✅

**If tests fail:** Review the console logs - they will tell you exactly where the issue is occurring.
