# Kahoa Roadmap: Interactive Experience Design Specification

## Executive Summary

Transform the Kahoa AI Transformation Roadmap from functional to **delightful** through sophisticated micro-interactions, scroll storytelling, and journey gamification. This specification elevates the user experience to Apple/Linear/Stripe quality standards.

---

## 1. Journey Progress System

### 1.1 Visual Progress Tracking

**Progress Bar Component**
- **Location**: Fixed top of viewport (sticky header)
- **Visual Design**:
  - 3px height bar with gradient fill (gray → blue as progress increases)
  - Shows 0-100% journey completion
  - Smooth liquid fill animation (500ms cubic-bezier(0.4, 0.0, 0.2, 1))
  - Glow effect at leading edge when active
- **Interaction**:
  - Hover reveals tooltip: "3 of 8 camps explored (37.5%)"
  - Click segments to jump to specific camps
  - Pulse animation when new camp visited

**Camp Completion Badges**
- **Visual States**:
  - **Locked**: Gray circle with lock icon, 40% opacity
  - **Active**: Blue circle with pulsing glow (2s infinite)
  - **Visited**: Gray checkmark with subtle scale-in animation
  - **Current**: Blue with larger pulse, prominent glow
- **Badge Grid**: Mini-map in top-right corner (collapsible)
  - 8 circular badges in grid layout
  - Tooltips show camp name on hover
  - Click to navigate to camp

**Summit Celebration**
- **Trigger**: User reaches Camp 8 and expands detail view
- **Animation Sequence**:
  1. Confetti cannon from summit waypoint (3s duration)
  2. Trophy icon scales in with bounce (800ms)
  3. Achievement modal slides up from bottom
  4. Progress bar fills to 100% with satisfying "ding" sound
  5. Social share prompt appears
- **Confetti Specs**:
  - 200+ particles, varied colors (blue gradient)
  - Physics-based falling with rotation
  - Gravity + air resistance simulation
  - Cleanup after 5 seconds

**Journey Time Tracker**
- **Display**: Subtle timestamp in footer or badge grid
- **Format**: "You've been exploring for 3m 24s"
- **Interactions**:
  - Updates every 10 seconds
  - Pauses when tab backgrounded (Page Visibility API)
  - Milestone celebrations: "5 min explorer badge unlocked!"

### 1.2 Gamification System

**Achievement System**
```javascript
const ACHIEVEMENTS = {
  explorer: {
    title: "Curious Explorer",
    condition: "Visit 3 camps",
    icon: "🧭",
    unlock: "expandOverview triggered 3x"
  },
  summitSeeker: {
    title: "Summit Seeker",
    condition: "Reach Camp 8",
    icon: "🏔️",
    unlock: "camp8 expanded"
  },
  deepDiver: {
    title: "Deep Diver",
    condition: "Read 5 full detail sections",
    icon: "🤿",
    unlock: "expandDetail triggered 5x"
  },
  speedRunner: {
    title: "Speed Runner",
    condition: "Complete journey in under 5 minutes",
    icon: "⚡",
    unlock: "allCampsVisited && time < 300s"
  },
  methodical: {
    title: "Methodical Climber",
    condition: "Visit all camps in order",
    icon: "📋",
    unlock: "sequential camp visits 1→8"
  },
  pathfinder: {
    title: "Pathfinder",
    condition: "Use waypoint navigation 5 times",
    icon: "🗺️",
    unlock: "waypointClick >= 5"
  }
};
```

**Achievement Toast Notification**
- **Animation**: Slide in from right (300ms elastic easing)
- **Display Duration**: 4 seconds
- **Visual**: Icon + Title + Description
- **Sound**: Soft "achievement unlocked" chime (optional)
- **Interaction**: Click to dismiss early, hover pauses auto-dismiss

**Completion Percentage Widget**
- **Calculation**: (visitedCamps / totalCamps) * 100
- **Display**: Circular progress chart (animated stroke-dashoffset)
- **Location**: Badge grid area or floating bottom-right
- **Updates**: Real-time as camps explored

**Share Progress Feature**
- **Trigger**: Summit celebration modal or badge grid
- **Options**:
  - Copy link with encoded progress state
  - Twitter/LinkedIn share with dynamic image
  - Download progress certificate (SVG/PNG)
- **Link Format**: `?progress=10101010&time=324&achievements=explorer,deepDiver`

---

## 2. Advanced Scroll Storytelling

### 2.1 Elevation Path Animation

**SVG Path Drawing (Stroke-Dashoffset)**
```css
.elevation-path {
  stroke-dasharray: 2000; /* Total path length */
  stroke-dashoffset: 2000; /* Start fully hidden */
  animation: drawPath 2s cubic-bezier(0.65, 0, 0.35, 1) forwards;
}

@keyframes drawPath {
  to { stroke-dashoffset: 0; }
}
```

**Progressive Drawing on Scroll**
- **Trigger**: Window scroll position
- **Calculation**:
  ```javascript
  const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  const pathLength = 2000;
  const drawLength = pathLength * scrollPercent;
  path.style.strokeDashoffset = pathLength - drawLength;
  ```
- **Visual Enhancements**:
  - Gradient stroke transitions from gray → blue as drawn
  - Glow effect follows drawing edge
  - Path pulses subtly when fully revealed

**Waypoint Sequential Reveal**
- **Trigger**: Scroll proximity or path drawing progress
- **Animation Sequence** (per waypoint):
  1. Scale from 0 → 1 (400ms, bounce easing)
  2. Opacity fade in simultaneously
  3. Ripple effect emanates outward (1s)
  4. Label fades in from bottom (300ms delay)
- **Stagger Delay**: 150ms between waypoints

**Current Position Indicator**
- **Design**: Animated climber icon or glowing dot
- **Behavior**: Follows user's scroll position along path
- **Calculation**: Map scroll % to path coordinates
- **Visual**: Leave trail of footsteps/breadcrumbs behind

**Camera Follow Effect**
- **Parallax Layers**:
  - Background: 0.3x scroll speed
  - Path: 1.0x scroll speed
  - Foreground elements: 1.2x scroll speed
- **Smooth Interpolation**: LERP for butter-smooth following
  ```javascript
  currentY += (targetY - currentY) * 0.1; // 10% catch-up
  ```

### 2.2 Scroll-Triggered Content Reveals

**Stats Counter Animation**
- **Trigger**: Element enters viewport (Intersection Observer)
- **Animation**: Count up from 0 to target value
- **Duration**: 1500ms
- **Easing**: Ease-out (fast start, slow finish)
- **Example**:
  ```javascript
  // "70%" counts up: 0 → 10 → 25 → 45 → 65 → 70
  animateValue(element, 0, 70, 1500, (val) => `${Math.round(val)}%`);
  ```

**Chart/Graph Animations**
- **Bar Charts**: Grow from 0 height to full (800ms, ease-out)
- **Pie Charts**: Arc drawing animation (1000ms, ease-in-out)
- **Line Graphs**: Path drawing similar to elevation path
- **Stagger**: 100ms delay between bars/segments

**Image Reveals**
- **Animation**: Simultaneous fade + scale
  ```css
  opacity: 0 → 1
  transform: scale(0.95) → scale(1)
  ```
- **Duration**: 600ms
- **Easing**: Cubic-bezier(0.4, 0.0, 0.2, 1)
- **Enhancement**: Blur effect (10px → 0px) for depth

**Text Line-by-Line Reveal**
- **Approach**: Split text into `<span>` per line
- **Animation**: Fade + slide up per line
  ```css
  opacity: 0 → 1
  transform: translateY(20px) → translateY(0)
  ```
- **Stagger**: 50ms per line
- **Optional**: Typewriter effect for key headings (15ms per character)

### 2.3 Parallax Layering System

**Layer Stack** (back to front):
1. **Background Sky Gradient**: Fixed, no parallax
2. **Mountain Silhouettes**: 0.2x scroll speed (slowest)
3. **Elevation Path**: 0.5x scroll speed
4. **Camp Cards**: 1.0x scroll speed (normal)
5. **Floating UI Elements**: 1.2x scroll speed (fastest)

**Atmospheric Elements**
- **Floating Particles**:
  - 30-50 subtle dots/shapes
  - Slow upward drift (20-40s animation)
  - Slight horizontal sway
  - Blur for depth of field
  - Fade in/out randomly
- **Gradient Overlays**:
  - Vertical gradient shifts with scroll (warm → cool)
  - Opacity changes based on section
- **Cloud Layers** (optional):
  - SVG clouds at different depths
  - Horizontal drift animation (60-120s)
  - Parallax scrolling

**Depth Cues**
- Elements further back: lower saturation, higher blur
- Foreground: sharp, vibrant colors
- Use CSS `filter: blur()` and `opacity` for atmospheric perspective

---

## 3. Micro-Interactions Catalog

### 3.1 Button Interactions

**Expand/Collapse Button Morph**
- **States**: "Learn More" → "Collapse"
- **Animation Sequence**:
  1. Icon rotates 180° (300ms)
  2. Text cross-fades (200ms)
  3. Background color shifts (300ms)
  4. Width adjusts smoothly if text length differs
- **Hover**:
  - Lift effect: `translateY(-2px)` + shadow increase
  - Background brightness +10%
  - Cursor changes to pointer with scale pulse

**Learn More CTA**
- **Ripple Effect on Click**:
  1. Create circular `<div>` at click coordinates
  2. Scale from 0 → 2.5 (600ms)
  3. Fade opacity from 0.3 → 0
  4. Remove element after animation
- **Implementation**:
  ```javascript
  button.addEventListener('click', (e) => {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple');
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
  ```

**Primary CTA Buttons (Footer, CTAs)**
- **Magnetic Pull on Hover**:
  - Detect cursor proximity (100px radius)
  - Button translates toward cursor (max 10px)
  - Smooth LERP interpolation
  ```javascript
  const dx = cursorX - buttonCenterX;
  const dy = cursorY - buttonCenterY;
  const distance = Math.sqrt(dx*dx + dy*dy);
  if (distance < 100) {
    const strength = 1 - (distance / 100);
    button.style.transform = `translate(${dx * strength * 0.1}px, ${dy * strength * 0.1}px)`;
  }
  ```
- **Glow Effect**:
  - Animated box-shadow on hover (300ms)
  - From: `0 2px 8px rgba(25,85,237,0.2)`
  - To: `0 8px 24px rgba(25,85,237,0.4), 0 0 20px rgba(25,85,237,0.3)`

**Waypoint SVG Buttons**
- **Pulse Animation** (idle state):
  ```css
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.8; }
  }
  ```
  - Duration: 2s infinite
  - Only active waypoint pulses
- **Tooltip on Hover**:
  - Appear: 200ms delay, fade + slide up
  - Position: Above waypoint, centered
  - Arrow pointer to waypoint
  - Content: Camp name + tagline

### 3.2 Camp Card Interactions

**Header Hover**
- **Lift Effect**:
  ```css
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  ```
  - Transition: 250ms ease-out
- **Background Shift**:
  - From: `var(--gray-50)`
  - To: `var(--gray-100)`
  - Transition: 200ms

**Click Feedback**
- **"Thunk" Feeling**:
  1. Scale down to 0.98 (100ms, ease-in)
  2. Scale back to 1.0 (200ms, ease-out)
- **Optional**: Brief background color flash
- **Audio** (optional): Short bass "thunk" sound (50ms)

**Expand Animation**
- **Overview Section**:
  1. `max-height: 0` → `max-height: 2000px` (500ms)
  2. `opacity: 0` → `opacity: 1` (400ms, 100ms delay)
  3. `padding: 0` → `padding: 24px` (500ms)
  4. Easing: `cubic-bezier(0.4, 0.0, 0.2, 1)` (standard Material Design)
- **Bounce Enhancement**:
  - Overshoot slightly at end (1.02 scale → 1.0)
  - Duration: 150ms after main animation

**Collapse Animation**
- **Snappy Return**:
  1. `max-height` collapses (400ms)
  2. `opacity` fades (300ms)
  3. `padding` reduces (400ms)
  4. Easing: `cubic-bezier(0.6, 0.04, 0.98, 0.34)` (sharp Material Design)
- **Elastic Effect**:
  - Slight "snap back" feeling
  - Scale to 0.98 briefly (50ms) then normal

### 3.3 SVG Waypoint Advanced Interactions

**Hover State**
- **Scale Animation**: 1.0 → 1.15 (200ms, ease-out)
- **Glow Effect**:
  ```css
  filter: drop-shadow(0 0 8px rgba(25,85,237,0.6));
  ```
- **Tooltip Reveal**: Fade + slide up (250ms, 100ms delay)
- **Cursor**: Custom pointer with "navigate" icon

**Click Animation**
- **Ripple Emanation**:
  1. Create SVG `<circle>` at waypoint center
  2. Radius animates: 18px → 60px (800ms)
  3. Opacity: 0.6 → 0 (800ms)
  4. Multiple ripples (3) with 150ms stagger
- **Simultaneous**:
  - Waypoint scales to 1.2 briefly (100ms) then to 1.0
  - Smooth scroll initiates to associated camp

**Active State** (current position)
- **Pulsing Glow**:
  ```css
  @keyframes activeGlow {
    0%, 100% {
      filter: drop-shadow(0 0 12px rgba(25,85,237,0.8));
      transform: scale(1.1);
    }
    50% {
      filter: drop-shadow(0 0 20px rgba(25,85,237,1));
      transform: scale(1.15);
    }
  }
  animation: activeGlow 2s ease-in-out infinite;
  ```

**Completed State**
- **Checkmark Draw-In**:
  1. Checkmark path appears (SVG `<path>`)
  2. Stroke-dashoffset animation (400ms)
  3. Checkmark draws from top to bottom
  4. Color: Green (`#10B981`)
- **Badge Appearance**:
  - Small success badge icon scales in (300ms, bounce)
  - Positioned at top-right of waypoint

### 3.4 Content Reveal Animations

**Stat Cards**
- **Entry Animation** (on viewport intersection):
  1. Scale from 0.9 → 1.0 (400ms)
  2. Opacity 0 → 1 (400ms)
  3. Slide up: `translateY(20px)` → `0` (400ms)
  4. Stagger: 100ms delay per card
- **Hover**:
  - Lift: `translateY(-4px)`
  - Shadow increase
  - Border glow (blue)
  - Transition: 200ms

**Process Steps**
- **Sequential Reveal**:
  - Each step fades + slides in sequentially
  - 150ms stagger between steps
  - Numbered circles pulse briefly on reveal
- **Hover**:
  - Step highlights with background color shift
  - Number circle scales slightly (1.1x)

**CTA Boxes**
- **Gradient Shift on Hover**:
  - Background gradient shifts position
  - Creates "shimmer" effect across surface
  ```css
  background: linear-gradient(135deg, #1955ED 0%, #144AC7 100%);
  background-size: 200% 200%;
  transition: background-position 0.5s ease;

  &:hover {
    background-position: 100% 100%;
  }
  ```

---

## 4. Cursor Effects

### 4.1 Custom Cursor System

**Base Cursor Replacement**
```css
* {
  cursor: none; /* Hide default */
}

.custom-cursor {
  width: 12px;
  height: 12px;
  border: 2px solid var(--color-blue);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: width 0.2s, height 0.2s, border-color 0.2s;
}

.custom-cursor-trail {
  width: 6px;
  height: 6px;
  background: var(--color-blue);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  opacity: 0.3;
  z-index: 9998;
  transition: opacity 0.3s;
}
```

**Context-Aware Cursor**
- **Over Interactive Elements**:
  - Scale to 20px diameter (200ms)
  - Fill with color instead of outline
  - Inner dot appears
- **Over Expandable Sections**:
  - Cursor morphs to expand icon (↓)
  - Rotation when hovering collapsed vs expanded
- **Over Waypoints**:
  - Cursor becomes navigation arrow (→)
  - Color shifts to match waypoint state
- **Over Draggable Areas**:
  - Four-way arrows or hand icon
  - Slight rotation on mouse movement

**Cursor Trail Effect**
- **Implementation**:
  - 10-15 trail dots following main cursor
  - Each dot lags behind with increasing delay
  - Fade out from front to back
  ```javascript
  const trail = [];
  for (let i = 0; i < 12; i++) {
    trail[i] = { x: 0, y: 0 };
  }

  function updateTrail() {
    trail[0].x = mouseX;
    trail[0].y = mouseY;
    for (let i = 1; i < trail.length; i++) {
      trail[i].x += (trail[i-1].x - trail[i].x) * 0.3;
      trail[i].y += (trail[i-1].y - trail[i].y) * 0.3;
    }
  }
  ```

### 4.2 Hover Preview System

**Waypoint Mini-Preview**
- **Trigger**: Hover waypoint for 500ms
- **Visual**:
  - Card slides up from waypoint (300ms)
  - Contains: Camp icon, title, 1-line description
  - Semi-transparent backdrop blur
  - Max-width: 200px
- **Positioning**: Above waypoint with arrow pointer
- **Dismissal**: Mouse moves away, 200ms delay then fade out

**Camp Number Preview**
- **Trigger**: Hover camp number in header
- **Content**: Full camp title fades in above number
- **Animation**: 150ms fade, no movement
- **Style**: Small tooltip with arrow

**Stats Tooltip**
- **Trigger**: Hover stat card for 300ms
- **Content**:
  - Data source citation
  - Methodology note
  - Related statistic
- **Position**: Below stat card, centered
- **Animation**: Fade + slight slide down

---

## 5. Modal/Overlay System

### 5.1 Deep-Dive Modals (Optional)

**Trigger**
- Special "Deep Dive" buttons in detail sections
- Links to extended content, case studies, resources

**Backdrop Effect**
- **Glass-morphism**:
  ```css
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px) saturate(150%);
  -webkit-backdrop-filter: blur(20px) saturate(150%);
  ```
- **Animation**: Fade in (300ms)

**Modal Entry Animation**
- **Scale-In from Clicked Element**:
  1. Get click coordinates
  2. Modal starts scaled to 0 at that point
  3. Scales to full size (400ms, ease-out)
  4. Simultaneous fade in
  5. Slight overshoot (scale to 1.03 then back to 1.0)

**Content Stagger Reveal**
- **Sequence** (inside modal after open):
  1. Header fades in (200ms)
  2. Divider line draws across (300ms, 100ms delay)
  3. Content sections fade + slide up sequentially (100ms stagger)
  4. Footer CTA fades in last

**Close Interactions**
- **Escape Key**: Immediate close with reverse animation
- **Click Outside**: Same reverse animation
- **X Button**:
  - Hover: Rotate 90° + scale 1.1
  - Click: Rotate 180° during close animation

**Focus Trap**
- **Implementation**:
  - On open, focus first focusable element
  - Tab cycles through modal elements only
  - Shift+Tab reverses
  - Store previous focus, restore on close

---

## 6. Audio Feedback (Optional)

### 6.1 Sound Effect Library

**Subtle UI Sounds** (20-200ms duration):
```javascript
const SOUNDS = {
  waypointClick: 'pop.mp3',        // Soft pop, 50ms
  campExpand: 'whoosh-down.mp3',   // Gentle whoosh, 200ms
  campCollapse: 'whoosh-up.mp3',   // Reverse whoosh, 150ms
  achievementUnlock: 'chime.mp3',  // Success chime, 400ms
  summitReached: 'fanfare.mp3',    // Triumphant, 800ms
  buttonHover: 'tick.mp3',         // Tiny tick, 20ms
  statsCount: 'beep-soft.mp3',     // During counter animation, 30ms
};
```

**Volume Levels**
- Default: 30% of max
- User control in settings
- Mute toggle easily accessible

**User Controls**
- **Audio Toggle**: Icon in top-right corner
- **States**: On, Off, Auto (sound only on interaction, not ambient)
- **Persistence**: Save preference to localStorage

**Ambient Background Music**
- **Track**: Subtle, atmospheric instrumental
- **Volume**: Very low (10-15% max)
- **Loop**: Seamless 2-3 minute track
- **User Control**:
  - Toggle on/off independently from effects
  - Volume slider
  - "Music by [Artist]" credit link

**Accessibility**
- Respect `prefers-reduced-motion` (disable sounds)
- Never auto-play on page load
- Clear visual indicators when sound plays

---

## 7. Easter Eggs & Delighters

### 7.1 Hidden Interactions

**Double-Click Elevation Path**
- **Action**: Randomly teleport to a camp (1-8)
- **Animation**:
  1. Screen flash white (100ms)
  2. Smooth scroll to random camp
  3. Camp auto-expands overview
  4. Confetti burst at destination
- **Tooltip Hint**: "Psst... try double-clicking the path"

**Konami Code** (↑↑↓↓←→←→BA)
- **Trigger**: Sequence detected via keyboard listener
- **Effect**:
  - Elevation path turns rainbow gradient
  - Waypoints spin 360°
  - All camps auto-expand in sequence (cascade)
  - Achievement unlocked: "Secret Climber"
  - Disco mode: Background pulses with colors

**Logo Hover (3 seconds)**
- **Trigger**: Continuous hover on Kahoa logo
- **Effect**:
  - Tooltip appears: "Did you know? Kahoa means 'rope' in Hawaiian 🌺"
  - Logo jiggles slightly
  - Optional: Link to "About the Name" page

**Triple-Click Summit Waypoint**
- **Trigger**: Click waypoint 8 three times rapidly
- **Effect**:
  - Massive confetti explosion
  - Fireworks SVG animation
  - Modal: "Ultimate Summit Champion!"
  - Special downloadable certificate

**Scroll Speed Detection**
- **Trigger**: User scrolls very fast (velocity > threshold)
- **Effect**:
  - Brief "whoosh" animation across screen
  - Speed lines appear temporarily
  - Badge: "Speedrunner"

### 7.2 Seasonal/Time-Based Variations

**Time of Day Themes**
- **Morning (6am-12pm)**: Warm sunrise gradient, lighter palette
- **Afternoon (12pm-6pm)**: Bright daylight, standard colors
- **Evening (6pm-10pm)**: Cooler sunset gradient, amber accents
- **Night (10pm-6am)**: Dark mode, star particles, moon icon

**Holiday Themes** (opt-in toggle)
- **Winter**: Snowflake particles instead of standard
- **Spring**: Flower petals floating
- **Summer**: Sun rays and lighter atmosphere
- **Fall**: Falling leaves

**Special Dates**
- **User's First Visit Anniversary**: Celebration modal
- **Company Milestones**: Subtle badge on waypoint

---

## 8. Mobile-Specific Interactions

### 8.1 Touch Gestures

**Swipe Between Camps**
- **Implementation**: Touch event listeners
  ```javascript
  let touchStartX = 0;
  element.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });

  element.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) navigateNext();
      else navigatePrevious();
    }
  });
  ```
- **Visual Feedback**:
  - Cards shift slightly during swipe
  - Rubber-band effect at boundaries
  - Momentum scrolling

**Pull-to-Refresh** (for dynamic content)
- **Gesture**: Pull down from top of page
- **Visual**:
  - Rubber-band stretch
  - Loading spinner appears
  - Refresh icon rotates
- **Action**: Reload content or show "Already up to date!"

**Long-Press Context Menu**
- **Trigger**: Press and hold on camp card (500ms)
- **Menu Options**:
  - Share camp
  - Bookmark camp
  - Skip to next
  - Print camp details
- **Haptic Feedback**: Vibration on menu open

**Pinch-to-Zoom SVG** (optional)
- **Target**: Elevation map SVG
- **Behavior**:
  - Two-finger pinch zooms in/out
  - Pan with two-finger drag
  - Reset button to return to default view

### 8.2 Mobile Optimizations

**Touch Target Sizing**
- **Minimum**: 44x44px for all interactive elements
- **Padding**: Adequate spacing between targets (8px minimum)
- **Visual**: Targets may appear smaller, but hit area is full size

**Haptic Feedback** (Vibration API)
```javascript
if ('vibrate' in navigator) {
  // Light tap (10ms)
  navigator.vibrate(10);

  // Double tap pattern
  navigator.vibrate([10, 50, 10]);

  // Achievement unlock pattern
  navigator.vibrate([50, 100, 50, 100, 200]);
}
```
- **Use Cases**:
  - Button press: 10ms
  - Camp expand: 15ms
  - Achievement: [50, 100, 50]
  - Error: [100, 50, 100]

**Swipe Hints**
- **First Visit**: Subtle arrows or animation showing swipe
- **Duration**: 3 seconds, then fade out
- **Trigger**: After 2 seconds of inactivity on first camp
- **Dismissal**: User swipes or clicks "Got it"

**Mobile Navigation**
- **Bottom Tab Bar** (optional):
  - Home, Progress, Achievements, Share
  - Fixed to bottom of screen
  - Animated active state indicator
- **Floating Action Button** (FAB):
  - Quick access to progress/achievements
  - Expandable menu on tap

---

## 9. Accessibility-First Interactions

### 9.1 Keyboard Shortcuts

**Global Shortcuts**
```javascript
const KEYBOARD_SHORTCUTS = {
  'j': 'Navigate to next camp (vim-style down)',
  'k': 'Navigate to previous camp (vim-style up)',
  'Space': 'Expand/collapse current camp',
  'Enter': 'Activate focused element',
  'Escape': 'Close modal or collapse camp',
  'ArrowUp': 'Previous camp (when in waypoint)',
  'ArrowDown': 'Next camp (when in waypoint)',
  'ArrowLeft': 'Collapse current camp',
  'ArrowRight': 'Expand current camp',
  '1-8': 'Jump directly to camp N',
  'h': 'Go to home/top',
  'g g': 'Go to top (double-tap g)',
  'G': 'Go to bottom/last camp',
  '/': 'Focus search (if implemented)',
  '?': 'Show keyboard shortcuts overlay',
};
```

**Shortcut Overlay Modal**
- **Trigger**: Press `?` key
- **Content**: Table of all shortcuts with descriptions
- **Visual**: Clean, scannable layout
- **Dismissal**: `Escape`, `?` again, or click outside

**Visual Indicators**
- **Focused Elements**: Blue outline ring
- **Active Shortcuts**: Brief tooltip when shortcut used
  - Example: Press `j` → shows "Next Camp" tooltip (500ms)

### 9.2 Screen Reader Enhancements

**Live Region Updates**
```html
<div role="status" aria-live="polite" aria-atomic="true" class="sr-only">
  <!-- Dynamically updated text -->
</div>
```

**Announcement Examples**:
- "3 of 8 camps explored. 37% complete."
- "Camp 2: AI Audit expanded. Showing overview."
- "Achievement unlocked: Curious Explorer"
- "Summit reached! Congratulations!"

**Descriptive ARIA Labels**
```html
<button aria-label="Expand Camp 2: AI Audit to view overview details">
  Learn More
</button>

<div role="progressbar" aria-valuenow="37" aria-valuemin="0" aria-valuemax="100" aria-label="Journey progress: 37% complete">
  <!-- Progress bar visual -->
</div>

<svg aria-label="AI transformation journey elevation map showing 8 camps from base to summit">
  <!-- SVG content -->
</svg>
```

**Skip Links**
- **"Skip to Camp List"**: Jump past SVG/intro
- **"Skip to Progress Summary"**: Jump to completion info
- **"Skip to Navigation"**: Jump to main nav

### 9.3 Focus Management

**Focus Indicators**
```css
*:focus-visible {
  outline: 3px solid var(--color-blue);
  outline-offset: 3px;
  border-radius: 4px;
}
```

**Focus Trapping** (in modals)
```javascript
function trapFocus(modal) {
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });
}
```

**Focus Restoration**
- Store `document.activeElement` before modal opens
- Restore focus on close
- Ensure user doesn't lose place

---

## 10. State Persistence

### 10.1 LocalStorage Schema

```javascript
const STORAGE_KEY = 'kahoa_roadmap_progress';

const progressState = {
  visitedCamps: [1, 2, 3], // Array of camp IDs
  expandedCamps: [2],      // Currently expanded
  achievements: ['explorer', 'pathfinder'],
  journeyTime: 324,        // Seconds spent on page
  lastVisit: '2025-01-15T10:30:00Z',
  completionPercentage: 37.5,
  waypointClicks: 5,
  scrollDepth: 2400,       // Max scroll position
  preferences: {
    soundEnabled: true,
    musicEnabled: false,
    reducedMotion: false,
    theme: 'auto'          // auto, light, dark
  }
};

// Save
localStorage.setItem(STORAGE_KEY, JSON.stringify(progressState));

// Load
const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
```

### 10.2 Resume Journey Feature

**On Page Load**
- Check for saved progress
- If found:
  1. Show toast: "Welcome back! Resume your journey?" [Resume] [Start Fresh]
  2. If Resume: Scroll to last position, restore expanded camps
  3. If Start Fresh: Clear storage, start from top

**Visual Restoration**
- Visited camps show checkmarks on waypoints
- Progress bar fills to saved percentage
- Achievement badges display earned achievements
- Time tracker shows cumulative time (paused while away)

**Auto-Save Triggers**
- Camp expand/collapse (debounced 500ms)
- Scroll position (debounced 1000ms)
- Achievement unlock (immediate)
- Page unload (beforeunload event)

### 10.3 Clear Progress Option

**Location**: Settings menu or footer link
**Confirmation Modal**:
- Title: "Clear Journey Progress?"
- Message: "This will reset all camps, achievements, and progress. This action cannot be undone."
- Actions: [Cancel] [Clear Progress]

**On Confirm**:
1. Clear localStorage
2. Reset UI to initial state
3. Show success toast: "Progress cleared. Fresh start!"
4. Optional confetti to celebrate new beginning

---

## Animation Timing Reference

### Easing Curves
```javascript
const EASING = {
  // Material Design
  standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',      // Most transitions
  decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',    // Entering screen
  accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',      // Exiting screen
  sharp: 'cubic-bezier(0.4, 0.0, 0.6, 1)',         // Quick returns

  // Custom
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Overshoot
  elastic: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',   // More overshoot
  smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',   // Smooth sine
  liquid: 'cubic-bezier(0.4, 0.0, 0.2, 1)',         // Fluid movement
};
```

### Duration Guidelines
```javascript
const DURATION = {
  instant: 0,           // Immediate
  micro: 100,           // Tiny feedback (button press)
  quick: 200,           // Hover effects
  normal: 300,          // Standard transitions
  moderate: 400,        // Card expansions
  slow: 600,            // Complex animations
  deliberate: 800,      // Storytelling moments
  epic: 1000,           // Hero animations
  ambient: 2000,        // Background loops
};
```

### Stagger Delays
```javascript
const STAGGER = {
  tight: 50,            // List items
  normal: 100,          // Card grids
  loose: 150,           // Sequential reveals
  spacious: 200,        // Dramatic effect
};
```

---

## Performance Optimization

### GPU Acceleration
```css
/* Force GPU acceleration for smooth animations */
.accelerated {
  transform: translateZ(0);
  will-change: transform, opacity;
  backface-visibility: hidden;
}
```

**Use Sparingly**: Only on actively animating elements
**Remove After**: Set `will-change: auto` after animation completes

### Intersection Observer (instead of scroll events)
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Trigger animations
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
});
```

### Debouncing/Throttling
```javascript
// Debounce for save operations
const debouncedSave = debounce(() => saveProgress(), 500);

// Throttle for scroll tracking
const throttledScroll = throttle(() => updateScrollProgress(), 100);
```

### Reduce Motion Respect
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* Show end states immediately */
  .fade-in { opacity: 1; }
  .slide-in { transform: translateY(0); }
}
```

---

## Browser Support

**Target Browsers**:
- Chrome/Edge 90+ (95% coverage)
- Firefox 88+ (4% coverage)
- Safari 14+ (mobile + desktop)

**Graceful Degradation**:
- Backdrop-filter fallback: solid background
- CSS Grid fallback: Flexbox
- Intersection Observer polyfill for older browsers
- Web Audio API: silent fail if unsupported

**Feature Detection**:
```javascript
const hasBackdropFilter = CSS.supports('backdrop-filter', 'blur(10px)');
const hasIntersectionObserver = 'IntersectionObserver' in window;
const hasVibrate = 'vibrate' in navigator;
```

---

## Implementation Priority

### Phase 1: Foundation (Week 1)
- Journey progress bar
- Scroll-triggered reveals (stats, content)
- Basic path drawing animation
- Achievement system structure
- State persistence (localStorage)

### Phase 2: Delight (Week 2)
- Micro-interactions (buttons, hovers)
- Waypoint animations (pulse, ripple)
- Custom cursor system
- Parallax layers
- Sound effects integration

### Phase 3: Polish (Week 3)
- Easter eggs
- Mobile gestures
- Keyboard shortcuts overlay
- Modal system
- Summit celebration

### Phase 4: Optimization (Week 4)
- Performance tuning
- Accessibility audit
- Cross-browser testing
- Analytics integration
- Documentation

---

## Success Metrics

**Engagement**:
- Average time on page (target: 5+ minutes)
- Camps explored per visit (target: 4+)
- Scroll depth (target: 80%+)
- Return visit rate (target: 15%+)

**Delight Indicators**:
- Achievement unlock rate
- Easter egg discovery rate
- Social share rate
- "Resume Journey" usage

**Accessibility**:
- Keyboard-only navigation success rate
- Screen reader task completion rate
- Zero accessibility violations (axe, WAVE)

---

## Conclusion

This specification transforms the Kahoa roadmap from a functional information delivery system into an **immersive journey experience** that delights users at every interaction. By combining sophisticated micro-interactions, scroll storytelling, gamification, and accessibility-first design, we create a memorable experience that reflects the quality and care of the Kahoa brand.

The roadmap becomes not just informative, but **inspiring**—a digital experience that mirrors the transformative journey it describes.
