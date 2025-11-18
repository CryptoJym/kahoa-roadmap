# Kahoa Roadmap: Animation Timing Specification

## Easing Curves Reference

### Material Design Standard Curves

```css
/* Standard - Most common, balanced entrance/exit */
cubic-bezier(0.4, 0.0, 0.2, 1)
Duration: 200-400ms
Use for: General transitions, hover effects, color changes

/* Decelerate - Element entering screen */
cubic-bezier(0.0, 0.0, 0.2, 1)
Duration: 200-300ms
Use for: Modals appearing, elements fading in, expansions

/* Accelerate - Element exiting screen */
cubic-bezier(0.4, 0.0, 1, 1)
Duration: 150-250ms
Use for: Modals closing, elements fading out, collapses

/* Sharp - Quick, decisive movements */
cubic-bezier(0.4, 0.0, 0.6, 1)
Duration: 100-200ms
Use for: Instant feedback, button clicks, toggles
```

### Custom Curves

```css
/* Bounce - Playful overshoot */
cubic-bezier(0.68, -0.55, 0.265, 1.55)
Duration: 400-600ms
Use for: Achievement unlocks, badge reveals, celebrations

/* Elastic - Strong overshoot */
cubic-bezier(0.68, -0.6, 0.32, 1.6)
Duration: 500-800ms
Use for: Easter eggs, confetti, major milestones

/* Smooth - Gentle sine wave */
cubic-bezier(0.25, 0.46, 0.45, 0.94)
Duration: 300-500ms
Use for: Parallax effects, cursor trails, ambient animations

/* Liquid - Fluid, water-like */
cubic-bezier(0.4, 0.0, 0.2, 1)
Duration: 600-1000ms
Use for: Progress bar fills, path drawing, scroll animations
```

### Easing Visualization

```
Linear (no easing):
0.0  0.25  0.5  0.75  1.0
|----|----|----|----|

Ease-In (slow start):
0.0  0.06  0.25  0.56  1.0
|----|----|----|----|

Ease-Out (slow end):
0.0  0.44  0.75  0.94  1.0
|----|----|----|----|

Ease-In-Out (slow both ends):
0.0  0.13  0.5  0.87  1.0
|----|----|----|----|

Bounce:
0.0  0.25  0.5  1.15  1.0
|----|----|----|----|
                ↑ overshoot
```

---

## Duration Guidelines by Interaction Type

### Instant (0-50ms)
**Purpose**: Imperceptible, feels immediate
**Use Cases**:
- Cursor position updates
- Scroll position tracking
- State changes without visual feedback

```css
transition: none; /* 0ms */
transition-duration: 0ms;
```

---

### Micro (50-150ms)
**Purpose**: Noticeable but extremely quick
**Use Cases**:
- Button press feedback
- Toggle switches
- Checkbox/radio clicks
- Input focus states
- Hover color changes

```css
/* Button click feedback */
transition: transform 100ms cubic-bezier(0.4, 0.0, 1, 1);

/* Hover state */
transition: background-color 150ms cubic-bezier(0.4, 0.0, 0.2, 1);

/* Focus ring */
transition: outline 100ms ease-out;
```

**Example Timeline**:
```
0ms   -> User clicks button
10ms  -> Button starts scaling down
100ms -> Button returns to normal (complete)
```

---

### Quick (150-250ms)
**Purpose**: Fast but clearly visible
**Use Cases**:
- Tooltip appearances
- Dropdown menus
- Hover lift effects
- Icon rotations
- Badge pulses

```css
/* Tooltip fade-in */
transition: opacity 200ms cubic-bezier(0.0, 0.0, 0.2, 1);

/* Hover lift */
transition: transform 200ms cubic-bezier(0.4, 0.0, 0.2, 1),
            box-shadow 250ms ease-out;

/* Icon rotation */
transition: transform 200ms cubic-bezier(0.4, 0.0, 0.6, 1);
```

**Example Timeline**:
```
0ms   -> Hover starts
50ms  -> Element begins lifting
200ms -> Full lift achieved
250ms -> Shadow fully expanded (complete)
```

---

### Normal (250-400ms)
**Purpose**: Standard, balanced transitions
**Use Cases**:
- Card flips
- Accordion expansions (initial movement)
- Modal fade-ins
- Tab switches
- Page transitions

```css
/* Card flip */
transition: transform 300ms cubic-bezier(0.4, 0.0, 0.2, 1);

/* Accordion expand */
transition: max-height 350ms cubic-bezier(0.4, 0.0, 0.2, 1),
            opacity 300ms ease-out;

/* Modal appearance */
transition: opacity 300ms cubic-bezier(0.0, 0.0, 0.2, 1),
            transform 350ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

**Example Timeline**:
```
0ms   -> User clicks "Expand"
50ms  -> Opacity begins changing
100ms -> Height starts increasing
300ms -> Opacity complete
350ms -> Height complete (visible bounce at end)
```

---

### Moderate (400-600ms)
**Purpose**: Noticeable, draws attention
**Use Cases**:
- Camp card expansions
- Waypoint ripple effects
- Achievement toasts
- Progress bar updates
- Image reveals

```css
/* Camp expansion */
transition: max-height 500ms cubic-bezier(0.4, 0.0, 0.2, 1),
            opacity 400ms ease-out 100ms; /* 100ms delay */

/* Ripple effect */
animation: ripple 600ms ease-out;

/* Achievement toast */
animation: slideInRight 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

**Example Timeline with Stagger**:
```
0ms   -> Expansion triggered
100ms -> Opacity starts (100ms delay)
200ms -> Height 20% complete
500ms -> Height 100% complete (with slight overshoot)
600ms -> All animations complete
```

---

### Slow (600-1000ms)
**Purpose**: Deliberate, storytelling pace
**Use Cases**:
- Path drawing animations
- Stat counter animations
- Complex multi-stage reveals
- Hero section entrances
- Scroll-triggered sequences

```css
/* Path drawing */
animation: drawPath 800ms cubic-bezier(0.65, 0, 0.35, 1);

/* Counter animation */
transition: --counter-value 1000ms cubic-bezier(0.25, 0.46, 0.45, 0.94);

/* Multi-stage reveal */
animation: fadeSlideScale 900ms cubic-bezier(0.4, 0.0, 0.2, 1);
```

**Example Timeline (Path Drawing)**:
```
0ms   -> Scroll triggers path animation
100ms -> Path 10% drawn
400ms -> Path 50% drawn (accelerating)
700ms -> Path 90% drawn (decelerating)
800ms -> Path 100% drawn (complete)
```

---

### Deliberate (1000-2000ms)
**Purpose**: Ceremonial, celebratory
**Use Cases**:
- Summit confetti celebration
- Achievement unlock sequences
- Onboarding animations
- Loading screens with personality
- Ambient background loops

```css
/* Confetti fall */
animation: confetti-fall 1500ms ease-in forwards;

/* Achievement sequence */
animation:
  scaleIn 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55) 0ms,
  bounce 1000ms ease-in-out 400ms,
  fadeOut 400ms ease-in 1400ms;

/* Ambient pulse */
animation: ambientPulse 2000ms ease-in-out infinite;
```

**Example Timeline (Achievement Unlock)**:
```
0ms    -> Achievement triggered
0-400ms   -> Icon scales in with bounce
400ms     -> Icon fully visible
400-1400ms -> Icon bounces subtly
1400ms    -> Fade-out begins
1800ms    -> Achievement fully hidden (complete)
```

---

## Stagger Delays by Context

### Tight Stagger (50-75ms)
**Use Cases**: List items, inline elements, text lines

```css
/* Sequential list reveal */
.list-item:nth-child(1) { animation-delay: 0ms; }
.list-item:nth-child(2) { animation-delay: 50ms; }
.list-item:nth-child(3) { animation-delay: 100ms; }
.list-item:nth-child(4) { animation-delay: 150ms; }
```

**Perceived Effect**: Smooth cascade, reads quickly

---

### Normal Stagger (100-150ms)
**Use Cases**: Card grids, stat cards, waypoints

```css
/* Stat card grid reveal */
.stat-card:nth-child(1) { animation-delay: 0ms; }
.stat-card:nth-child(2) { animation-delay: 100ms; }
.stat-card:nth-child(3) { animation-delay: 200ms; }
.stat-card:nth-child(4) { animation-delay: 300ms; }
```

**Perceived Effect**: Noticeable but not slow, professional

---

### Loose Stagger (150-200ms)
**Use Cases**: Major sections, sequential reveals, storytelling

```css
/* Camp sequential expansion */
.camp:nth-child(1) { animation-delay: 0ms; }
.camp:nth-child(2) { animation-delay: 150ms; }
.camp:nth-child(3) { animation-delay: 300ms; }
.camp:nth-child(4) { animation-delay: 450ms; }
```

**Perceived Effect**: Dramatic, draws attention to each item

---

### Spacious Stagger (200-400ms)
**Use Cases**: Hero sequences, Easter egg reveals, celebrations

```css
/* Confetti burst sequence */
.confetti-burst:nth-child(1) { animation-delay: 0ms; }
.confetti-burst:nth-child(2) { animation-delay: 300ms; }
.confetti-burst:nth-child(3) { animation-delay: 600ms; }
```

**Perceived Effect**: Epic, celebratory, memorable

---

## Interaction-Specific Timing Orchestration

### Button Click Feedback
```css
/* Total duration: 300ms */
button {
  transition:
    transform 100ms cubic-bezier(0.4, 0.0, 1, 1),        /* Down: 0-100ms */
    background 100ms ease-out 100ms,                     /* Color: 100-200ms */
    box-shadow 200ms ease-out 100ms;                     /* Shadow: 100-300ms */
}

button:active {
  transform: scale(0.95);
}

button:not(:active) {
  transform: scale(1);
  transition: transform 200ms cubic-bezier(0.0, 0.0, 0.2, 1); /* Up: slower */
}
```

**Timeline**:
```
0ms   -> Click starts
0-100ms  -> Scale down to 0.95 (sharp)
100ms    -> Background color starts changing
100-200ms -> Background reaches new color
100-300ms -> Box-shadow expands
300ms    -> Release click
300-500ms -> Scale back to 1.0 (gentle)
500ms    -> Complete
```

---

### Camp Expansion Sequence
```css
/* Total duration: 700ms */
.camp-overview.expanded {
  /* Simultaneous animations with different timings */
  animation:
    expandHeight 500ms cubic-bezier(0.4, 0.0, 0.2, 1) 0ms,
    fadeIn 400ms ease-out 100ms,
    slideContent 400ms ease-out 150ms;
}
```

**Timeline**:
```
0ms   -> Expand triggered
0-500ms  -> Max-height increases (smooth curve)
100ms    -> Opacity starts (delayed start for polish)
150ms    -> Content slides up
500ms    -> Height animation complete
550ms    -> Opacity complete (400ms from 100ms start)
550ms    -> Slide complete (400ms from 150ms start)
Total: 550ms actual completion
```

---

### Waypoint Click → Camp Navigate
```css
/* Total orchestrated duration: 1200ms */
.waypoint-click {
  /* Immediate feedback */
  animation: waypointScale 100ms cubic-bezier(0.4, 0.0, 1, 1) 0ms;
}

.waypoint-ripple {
  /* Ripple spreads */
  animation: ripple 800ms ease-out 50ms;
}

.scroll-to-camp {
  /* Smooth scroll */
  scroll-behavior: smooth;
  /* Duration: ~500ms browser-controlled */
}

.camp-auto-expand {
  /* Expansion after scroll */
  animation: expandOverview 500ms ease-out 500ms; /* Delayed until scroll complete */
}
```

**Timeline**:
```
0ms     -> User clicks waypoint
0-100ms    -> Waypoint scales briefly
50ms       -> First ripple starts
850ms      -> Ripples complete
0-500ms    -> Scroll to camp (smooth)
500ms      -> Scroll complete
500-1000ms -> Camp expands
1000ms     -> Complete
```

---

### Achievement Unlock Full Sequence
```css
/* Total orchestrated duration: 4400ms */
.achievement-toast {
  /* Entry */
  animation:
    slideInRight 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55) 0ms,
    /* Hold (visible duration) */
    /* Exit */
    slideOutRight 300ms cubic-bezier(0.4, 0.0, 1, 1) 4100ms;
}

.achievement-icon {
  /* Icon bounces while visible */
  animation: bounce 1000ms ease-in-out 400ms infinite;
}
```

**Timeline**:
```
0ms      -> Achievement triggered
0-400ms     -> Toast slides in (with bounce)
400ms       -> Toast fully visible
400-4000ms  -> Icon bounces (3.6s visible time)
4100ms      -> Exit animation starts
4100-4400ms -> Toast slides out
4400ms      -> Toast removed from DOM
```

---

### Path Drawing with Waypoint Reveals
```css
/* Total orchestrated duration: 2400ms */
.elevation-path {
  stroke-dashoffset: 2000;
  animation: drawPath 2000ms cubic-bezier(0.65, 0, 0.35, 1);
}

.waypoint {
  opacity: 0;
  animation: waypointReveal 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.waypoint:nth-child(1) { animation-delay: 200ms; }
.waypoint:nth-child(2) { animation-delay: 400ms; }
.waypoint:nth-child(3) { animation-delay: 600ms; }
/* ... */
.waypoint:nth-child(8) { animation-delay: 1600ms; }
```

**Timeline**:
```
0ms      -> Page load / scroll trigger
0-2000ms    -> Path draws progressively
200ms       -> Waypoint 1 reveals
400ms       -> Waypoint 2 reveals
600ms       -> Waypoint 3 reveals
800ms       -> Waypoint 4 reveals
1000ms      -> Waypoint 5 reveals
1200ms      -> Waypoint 6 reveals
1400ms      -> Waypoint 7 reveals
1600ms      -> Waypoint 8 reveals
2000ms      -> Path drawing complete
2000ms      -> Waypoint 8 reveal complete (400ms from 1600ms)
```

---

## Multi-Stage Animation Keyframes

### Complex Bounce with Hold
```css
@keyframes bounceWithHold {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  15% {
    transform: scale(1.1);
    opacity: 1;
  }
  30% {
    transform: scale(0.95);
  }
  45% {
    transform: scale(1.05);
  }
  60% {
    transform: scale(0.98);
  }
  75%, 90% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Usage */
animation: bounceWithHold 800ms cubic-bezier(0.4, 0.0, 0.2, 1);
```

**Breakdown**:
- 0-60%: Bounce sequence (480ms)
- 60-100%: Hold stable (320ms)

---

### Fade Slide Scale Combination
```css
@keyframes fadeSlideScale {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  40% {
    opacity: 1;
  }
  60% {
    transform: translateY(0) scale(1.02);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Usage */
animation: fadeSlideScale 600ms cubic-bezier(0.4, 0.0, 0.2, 1);
```

**Breakdown**:
- 0-40%: Fade in completes first (240ms)
- 0-60%: Slide and scale most of the way (360ms)
- 60-100%: Gentle settle from overshoot (240ms)

---

## Performance Considerations

### GPU-Accelerated Properties (60fps capable)
**Fast** (always animate these):
- `transform` (translate, scale, rotate)
- `opacity`
- `filter` (blur, brightness, etc.)

**Slow** (avoid animating):
- `width`, `height` (triggers layout)
- `top`, `left` (triggers layout)
- `margin`, `padding` (triggers layout)

### Recommended Approach
```css
/* ❌ BAD: Animates width (triggers layout reflow) */
.bad {
  transition: width 300ms ease;
}

/* ✅ GOOD: Animates transform (GPU-accelerated) */
.good {
  transition: transform 300ms ease;
  transform: scaleX(0); /* Start */
}
.good.expanded {
  transform: scaleX(1); /* End */
}
```

---

## Easing Comparison Chart

```
Duration: 400ms animation comparison

Linear:
Progress: ▓▓▓▓▓▓▓▓▓▓
Time:     0  100 200 300 400ms

Ease-Out (decelerate):
Progress: ▓▓▓▓▓▓▓▓░░
Time:     0  100 200 300 400ms
          ↑ Fast start, slow end

Ease-In (accelerate):
Progress: ░░▓▓▓▓▓▓▓▓
Time:     0  100 200 300 400ms
          ↑ Slow start, fast end

Ease-In-Out:
Progress: ░▓▓▓▓▓▓▓░░
Time:     0  100 200 300 400ms
          ↑ Slow both ends

Bounce:
Progress: ▓▓▓▓▓▓▓▓▓█
Time:     0  100 200 300 400ms
                      ↑ Overshoot
```

---

## Testing Animation Timing

### Browser DevTools Timeline
1. Open Chrome DevTools → Performance tab
2. Record interaction
3. Look for "Animation" tracks
4. Verify:
   - Duration matches spec
   - No jank (consistent 60fps)
   - Animations overlap as intended

### Slow Motion Testing
```css
/* Add to <body> for testing */
body.slow-motion * {
  animation-duration: calc(var(--duration) * 5) !important;
  transition-duration: calc(var(--duration) * 5) !important;
}
```

### FPS Counter
```javascript
let lastTime = performance.now();
let fps = 60;

function measureFPS() {
  const now = performance.now();
  fps = 1000 / (now - lastTime);
  lastTime = now;
  console.log(`FPS: ${fps.toFixed(1)}`);
  requestAnimationFrame(measureFPS);
}

measureFPS();
```

---

## Animation Budget

**Total page load animation time**: ~3-4 seconds
- Hero fade-in: 600ms
- Path drawing: 2000ms (overlaps hero)
- Waypoint reveals: 2000ms (overlaps path)
- Initial camp fade-ups: 1200ms (staggered)

**Per-interaction budget**: ~500ms max
- User clicks → Feedback complete in <500ms
- Exception: Scroll-triggered sequences (can be longer)

**Idle animations**: 2-4 second loops
- Waypoint pulse: 2000ms
- Progress bar shimmer: 2000ms
- Ambient particles: 40000ms (40s)

---

## Recommended Testing Matrix

| Interaction | Duration | Easing | Expected Feel |
|-------------|----------|--------|---------------|
| Button hover | 200ms | Standard | Instant response |
| Button click | 100ms down, 200ms up | Accelerate/Decelerate | Satisfying feedback |
| Camp expand | 500ms | Standard | Smooth, not rushed |
| Camp collapse | 400ms | Sharp | Snappy, decisive |
| Achievement toast | 400ms in, 300ms out | Bounce/Accelerate | Playful entrance, quick exit |
| Waypoint click | 100ms + 800ms ripple | Sharp + Ease-out | Immediate + spreading |
| Path drawing | 2000ms | Custom | Storytelling pace |
| Scroll reveals | 600ms | Standard | Noticeable but not slow |

---

## Summary: Quick Reference

### Default Timings by Category
- **Instant feedback**: 100ms, sharp easing
- **Hover effects**: 200ms, standard easing
- **Expansions**: 400-500ms, standard easing
- **Celebrations**: 600-1000ms, bounce easing
- **Storytelling**: 1000-2000ms, smooth easing

### Stagger Defaults
- **List items**: 50ms
- **Cards**: 100ms
- **Sections**: 150ms
- **Epic moments**: 300ms

### Always Remember
1. **Consistency**: Use the same timing for similar interactions
2. **Purposeful**: Every animation should enhance UX, not decorate
3. **Performance**: Prefer `transform` and `opacity`
4. **Accessibility**: Respect `prefers-reduced-motion`
5. **Test**: Verify 60fps on target devices
