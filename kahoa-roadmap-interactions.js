/**
 * Kahoa Roadmap - Advanced Interactive Experience Module
 *
 * Features:
 * - Journey Progress Tracker
 * - Scroll Storytelling Engine
 * - Micro-Interaction Handlers
 * - Achievement System
 * - State Persistence
 * - Custom Cursor Effects
 * - Audio Feedback
 * - Easter Eggs
 */

// ============================================================================
// CONFIGURATION & CONSTANTS
// ============================================================================

const CONFIG = {
  totalCamps: 8,
  storageKey: 'kahoa_roadmap_progress',

  // Animation timings (ms)
  timing: {
    instant: 0,
    micro: 100,
    quick: 200,
    normal: 300,
    moderate: 400,
    slow: 600,
    deliberate: 800,
    epic: 1000,
  },

  // Easing curves
  easing: {
    standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    elastic: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
    smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },

  // Feature flags
  features: {
    sound: true,
    haptics: true,
    customCursor: true,
    parallax: true,
    achievements: true,
  }
};

const ACHIEVEMENTS = {
  explorer: {
    id: 'explorer',
    title: 'Curious Explorer',
    description: 'Visit 3 camps',
    icon: '🧭',
    condition: (state) => state.visitedCamps.size >= 3,
  },
  summitSeeker: {
    id: 'summitSeeker',
    title: 'Summit Seeker',
    description: 'Reach Camp 8',
    icon: '🏔️',
    condition: (state) => state.visitedCamps.has(8),
  },
  deepDiver: {
    id: 'deepDiver',
    title: 'Deep Diver',
    description: 'Read 5 full detail sections',
    icon: '🤿',
    condition: (state) => state.detailsViewed >= 5,
  },
  speedRunner: {
    id: 'speedRunner',
    title: 'Speed Runner',
    description: 'Complete journey in under 5 minutes',
    icon: '⚡',
    condition: (state) => state.visitedCamps.size === 8 && state.journeyTime < 300,
  },
  methodical: {
    id: 'methodical',
    title: 'Methodical Climber',
    description: 'Visit all camps in order',
    icon: '📋',
    condition: (state) => state.visitedInOrder,
  },
  pathfinder: {
    id: 'pathfinder',
    title: 'Pathfinder',
    description: 'Use waypoint navigation 5 times',
    icon: '🗺️',
    condition: (state) => state.waypointClicks >= 5,
  },
  secretClimber: {
    id: 'secretClimber',
    title: 'Secret Climber',
    description: 'Discovered the Konami Code',
    icon: '🎮',
    condition: (state) => state.konamiUnlocked,
  }
};

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

class JourneyState {
  constructor() {
    this.visitedCamps = new Set();
    this.expandedCamps = new Set();
    this.achievements = new Set();
    this.detailsViewed = 0;
    this.waypointClicks = 0;
    this.journeyTime = 0;
    this.startTime = Date.now();
    this.lastCampVisited = null;
    this.visitedInOrder = true;
    this.scrollDepth = 0;
    this.konamiUnlocked = false;
    this.preferences = {
      soundEnabled: true,
      musicEnabled: false,
      reducedMotion: false,
      theme: 'auto',
    };

    this.load();
    this.startTimeTracking();
  }

  load() {
    try {
      const saved = localStorage.getItem(CONFIG.storageKey);
      if (saved) {
        const data = JSON.parse(saved);
        this.visitedCamps = new Set(data.visitedCamps || []);
        this.expandedCamps = new Set(data.expandedCamps || []);
        this.achievements = new Set(data.achievements || []);
        this.detailsViewed = data.detailsViewed || 0;
        this.waypointClicks = data.waypointClicks || 0;
        this.journeyTime = data.journeyTime || 0;
        this.lastCampVisited = data.lastCampVisited || null;
        this.visitedInOrder = data.visitedInOrder !== false;
        this.scrollDepth = data.scrollDepth || 0;
        this.konamiUnlocked = data.konamiUnlocked || false;
        if (data.preferences) {
          this.preferences = { ...this.preferences, ...data.preferences };
        }
      }
    } catch (e) {
      console.error('Failed to load progress:', e);
    }
  }

  save() {
    try {
      const data = {
        visitedCamps: Array.from(this.visitedCamps),
        expandedCamps: Array.from(this.expandedCamps),
        achievements: Array.from(this.achievements),
        detailsViewed: this.detailsViewed,
        waypointClicks: this.waypointClicks,
        journeyTime: this.journeyTime,
        lastCampVisited: this.lastCampVisited,
        visitedInOrder: this.visitedInOrder,
        scrollDepth: this.scrollDepth,
        konamiUnlocked: this.konamiUnlocked,
        preferences: this.preferences,
        lastVisit: new Date().toISOString(),
      };
      localStorage.setItem(CONFIG.storageKey, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save progress:', e);
    }
  }

  visitCamp(campId) {
    if (!this.visitedCamps.has(campId)) {
      // Check if visiting in order
      if (this.lastCampVisited !== null && campId !== this.lastCampVisited + 1) {
        this.visitedInOrder = false;
      }

      this.visitedCamps.add(campId);
      this.lastCampVisited = campId;
      this.save();
      this.checkAchievements();
    }
  }

  expandCamp(campId) {
    this.expandedCamps.add(campId);
    this.save();
  }

  collapseCamp(campId) {
    this.expandedCamps.delete(campId);
    this.save();
  }

  viewDetail() {
    this.detailsViewed++;
    this.save();
    this.checkAchievements();
  }

  clickWaypoint() {
    this.waypointClicks++;
    this.save();
    this.checkAchievements();
  }

  updateScrollDepth(depth) {
    if (depth > this.scrollDepth) {
      this.scrollDepth = depth;
      this.save();
    }
  }

  unlockKonami() {
    this.konamiUnlocked = true;
    this.save();
    this.checkAchievements();
  }

  startTimeTracking() {
    // Track time spent actively on page
    let lastUpdate = Date.now();

    const updateTime = () => {
      if (!document.hidden) {
        const now = Date.now();
        this.journeyTime += (now - lastUpdate) / 1000; // Convert to seconds
        lastUpdate = now;
      }
    };

    setInterval(() => {
      updateTime();
      this.save();
    }, 10000); // Save every 10 seconds

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        updateTime();
      } else {
        lastUpdate = Date.now();
      }
    });

    window.addEventListener('beforeunload', () => {
      updateTime();
      this.save();
    });
  }

  checkAchievements() {
    Object.values(ACHIEVEMENTS).forEach(achievement => {
      if (!this.achievements.has(achievement.id) && achievement.condition(this)) {
        this.unlockAchievement(achievement);
      }
    });
  }

  unlockAchievement(achievement) {
    this.achievements.add(achievement.id);
    this.save();

    // Trigger achievement notification
    window.dispatchEvent(new CustomEvent('achievement-unlocked', {
      detail: achievement
    }));
  }

  getCompletionPercentage() {
    return (this.visitedCamps.size / CONFIG.totalCamps) * 100;
  }

  clear() {
    if (confirm('Clear all progress? This cannot be undone.')) {
      localStorage.removeItem(CONFIG.storageKey);
      location.reload();
    }
  }
}

// ============================================================================
// JOURNEY PROGRESS UI
// ============================================================================

class ProgressTracker {
  constructor(state) {
    this.state = state;
    this.init();
  }

  init() {
    this.createProgressBar();
    this.createBadgeGrid();
    this.createTimeTracker();

    // Update on state changes
    window.addEventListener('achievement-unlocked', (e) => {
      this.showAchievementToast(e.detail);
    });
  }

  createProgressBar() {
    const bar = document.createElement('div');
    bar.className = 'journey-progress-bar';
    bar.innerHTML = `
      <div class="progress-fill" style="width: ${this.state.getCompletionPercentage()}%"></div>
      <div class="progress-tooltip" role="tooltip" aria-live="polite"></div>
    `;

    document.body.prepend(bar);

    bar.addEventListener('mouseenter', () => {
      const tooltip = bar.querySelector('.progress-tooltip');
      const percentage = this.state.getCompletionPercentage().toFixed(1);
      tooltip.textContent = `${this.state.visitedCamps.size} of ${CONFIG.totalCamps} camps explored (${percentage}%)`;
      tooltip.style.opacity = '1';
    });

    bar.addEventListener('mouseleave', () => {
      bar.querySelector('.progress-tooltip').style.opacity = '0';
    });

    this.progressBar = bar;
  }

  updateProgressBar() {
    const fill = this.progressBar.querySelector('.progress-fill');
    const percentage = this.state.getCompletionPercentage();

    fill.style.width = `${percentage}%`;

    // Pulse animation on progress
    fill.classList.add('pulse');
    setTimeout(() => fill.classList.remove('pulse'), 500);
  }

  createBadgeGrid() {
    const grid = document.createElement('div');
    grid.className = 'badge-grid';
    grid.setAttribute('role', 'navigation');
    grid.setAttribute('aria-label', 'Camp navigation badges');

    for (let i = 1; i <= CONFIG.totalCamps; i++) {
      const badge = document.createElement('button');
      badge.className = 'camp-badge';
      badge.dataset.camp = i;
      badge.setAttribute('aria-label', `Navigate to Camp ${i}`);

      if (this.state.visitedCamps.has(i)) {
        badge.classList.add('visited');
        badge.innerHTML = `<span class="checkmark">✓</span>`;
      } else {
        badge.innerHTML = `<span class="number">${i}</span>`;
      }

      badge.addEventListener('click', () => {
        this.navigateToCamp(i);
      });

      grid.appendChild(badge);
    }

    document.body.appendChild(grid);
    this.badgeGrid = grid;
  }

  updateBadgeGrid() {
    const badges = this.badgeGrid.querySelectorAll('.camp-badge');
    badges.forEach((badge, index) => {
      const campId = index + 1;
      if (this.state.visitedCamps.has(campId)) {
        badge.classList.add('visited');
        badge.innerHTML = `<span class="checkmark">✓</span>`;
      }
    });
  }

  createTimeTracker() {
    const tracker = document.createElement('div');
    tracker.className = 'time-tracker';
    tracker.setAttribute('role', 'status');
    tracker.setAttribute('aria-live', 'polite');

    this.updateTimeDisplay(tracker);

    setInterval(() => {
      this.updateTimeDisplay(tracker);
    }, 10000); // Update every 10 seconds

    this.badgeGrid.appendChild(tracker);
  }

  updateTimeDisplay(tracker) {
    const minutes = Math.floor(this.state.journeyTime / 60);
    const seconds = Math.floor(this.state.journeyTime % 60);
    tracker.textContent = `Exploring for ${minutes}m ${seconds}s`;
  }

  navigateToCamp(campId) {
    const camp = document.querySelector(`.camp[data-camp="${campId}"]`);
    if (camp) {
      camp.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Trigger expand after scroll
      setTimeout(() => {
        window.campManager.expandOverview(campId);
      }, 500);
    }
  }

  showAchievementToast(achievement) {
    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.innerHTML = `
      <div class="achievement-icon">${achievement.icon}</div>
      <div class="achievement-content">
        <div class="achievement-title">${achievement.title}</div>
        <div class="achievement-description">${achievement.description}</div>
      </div>
    `;

    document.body.appendChild(toast);

    // Sound effect
    if (this.state.preferences.soundEnabled) {
      this.playSound('achievement');
    }

    // Haptic feedback
    if (this.state.preferences.soundEnabled && 'vibrate' in navigator) {
      navigator.vibrate([50, 100, 50, 100, 200]);
    }

    // Animate in
    setTimeout(() => toast.classList.add('show'), 10);

    // Auto-dismiss after 4 seconds
    const dismissTimeout = setTimeout(() => {
      this.dismissToast(toast);
    }, 4000);

    // Click to dismiss
    toast.addEventListener('click', () => {
      clearTimeout(dismissTimeout);
      this.dismissToast(toast);
    });

    // Pause auto-dismiss on hover
    toast.addEventListener('mouseenter', () => clearTimeout(dismissTimeout));
    toast.addEventListener('mouseleave', () => {
      setTimeout(() => this.dismissToast(toast), 2000);
    });
  }

  dismissToast(toast) {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }

  playSound(type) {
    // Placeholder - would integrate Web Audio API
    console.log(`Playing sound: ${type}`);
  }
}

// ============================================================================
// SCROLL STORYTELLING ENGINE
// ============================================================================

class ScrollStoryEngine {
  constructor(state) {
    this.state = state;
    this.init();
  }

  init() {
    this.setupPathAnimation();
    this.setupScrollTriggers();
    this.setupParallax();
    this.trackScrollDepth();
  }

  setupPathAnimation() {
    const path = document.querySelector('.elevation-path');
    if (!path) return;

    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    window.addEventListener('scroll', () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      const drawLength = pathLength * scrollPercent;
      path.style.strokeDashoffset = pathLength - drawLength;

      // Update gradient based on scroll
      const hue = 220 + (scrollPercent * 20); // 220 (blue) to 240
      path.style.stroke = `hsl(${hue}, 85%, 55%)`;
    });
  }

  setupScrollTriggers() {
    // Intersection Observer for viewport reveals
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.triggerReveal(entry.target);
        }
      });
    }, observerOptions);

    // Observe stat cards
    document.querySelectorAll('.stat-card').forEach(card => {
      observer.observe(card);
    });

    // Observe camp sections
    document.querySelectorAll('.camp').forEach(camp => {
      observer.observe(camp);
    });
  }

  triggerReveal(element) {
    if (element.classList.contains('stat-card')) {
      this.animateStatCard(element);
    }

    element.classList.add('revealed');
  }

  animateStatCard(card) {
    const valueElement = card.querySelector('.stat-value');
    if (!valueElement || valueElement.dataset.animated) return;

    const finalValue = valueElement.textContent.trim();
    const numericValue = parseFloat(finalValue.replace(/[^0-9.]/g, ''));
    const suffix = finalValue.replace(/[0-9.]/g, '');

    if (isNaN(numericValue)) return;

    valueElement.dataset.animated = 'true';

    this.animateValue(valueElement, 0, numericValue, 1500, (val) => {
      return Math.round(val) + suffix;
    });
  }

  animateValue(element, start, end, duration, formatter) {
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;

      element.textContent = formatter(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  setupParallax() {
    if (!CONFIG.features.parallax) return;

    const parallaxLayers = document.querySelectorAll('[data-parallax]');

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;

      parallaxLayers.forEach(layer => {
        const speed = parseFloat(layer.dataset.parallax) || 0.5;
        const yPos = -(scrollY * speed);
        layer.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  trackScrollDepth() {
    let maxScroll = 0;

    window.addEventListener('scroll', () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        this.state.updateScrollDepth(scrollPercent);
      }
    });
  }
}

// ============================================================================
// MICRO-INTERACTION HANDLERS
// ============================================================================

class MicroInteractions {
  constructor(state) {
    this.state = state;
    this.init();
  }

  init() {
    this.setupButtonRipples();
    this.setupHoverEffects();
    this.setupWaypointInteractions();
    this.setupCampInteractions();
  }

  setupButtonRipples() {
    document.querySelectorAll('.expand-btn, .cta-box a, footer a').forEach(button => {
      button.addEventListener('click', (e) => {
        this.createRipple(e, button);
      });
    });
  }

  createRipple(e, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ripple.className = 'ripple-effect';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    element.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }

  setupHoverEffects() {
    // Magnetic pull on CTA buttons
    document.querySelectorAll('.cta-box a, footer a').forEach(button => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      document.addEventListener('mousemove', (e) => {
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const strength = 1 - (distance / 100);
          const translateX = dx * strength * 0.1;
          const translateY = dy * strength * 0.1;
          button.style.transform = `translate(${translateX}px, ${translateY}px)`;
        } else {
          button.style.transform = '';
        }
      });
    });
  }

  setupWaypointInteractions() {
    document.querySelectorAll('.waypoint').forEach(waypoint => {
      // Pulse animation for active waypoint
      waypoint.addEventListener('mouseenter', () => {
        this.createWaypointRipple(waypoint);
      });

      waypoint.addEventListener('click', () => {
        this.state.clickWaypoint();

        // Multiple ripples on click
        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
            this.createWaypointRipple(waypoint);
          }, i * 150);
        }
      });
    });
  }

  createWaypointRipple(waypoint) {
    const circle = waypoint.querySelector('circle');
    const cx = circle.getAttribute('cx');
    const cy = circle.getAttribute('cy');

    const ripple = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    ripple.setAttribute('cx', cx);
    ripple.setAttribute('cy', cy);
    ripple.setAttribute('r', '18');
    ripple.setAttribute('fill', 'none');
    ripple.setAttribute('stroke', 'var(--color-blue)');
    ripple.setAttribute('stroke-width', '2');
    ripple.setAttribute('opacity', '0.6');
    ripple.classList.add('waypoint-ripple');

    waypoint.appendChild(ripple);

    // Animate
    let r = 18;
    let opacity = 0.6;
    const animate = () => {
      r += 2;
      opacity -= 0.02;

      ripple.setAttribute('r', r);
      ripple.setAttribute('opacity', opacity);

      if (opacity > 0) {
        requestAnimationFrame(animate);
      } else {
        ripple.remove();
      }
    };

    requestAnimationFrame(animate);
  }

  setupCampInteractions() {
    document.querySelectorAll('.camp').forEach(camp => {
      const header = camp.querySelector('.camp-header');

      // Click feedback (thunk effect)
      header.addEventListener('click', () => {
        header.style.transform = 'scale(0.98)';
        setTimeout(() => {
          header.style.transform = '';
        }, 100);
      });
    });
  }
}

// ============================================================================
// CUSTOM CURSOR
// ============================================================================

class CustomCursor {
  constructor() {
    if (!CONFIG.features.customCursor) return;

    this.cursor = null;
    this.trail = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.init();
  }

  init() {
    // Create main cursor
    this.cursor = document.createElement('div');
    this.cursor.className = 'custom-cursor';
    document.body.appendChild(this.cursor);

    // Create trail dots
    for (let i = 0; i < 8; i++) {
      const dot = document.createElement('div');
      dot.className = 'cursor-trail';
      dot.style.opacity = (8 - i) / 16; // Fade out
      document.body.appendChild(dot);
      this.trail.push({ element: dot, x: 0, y: 0 });
    }

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      // Update context-based cursor
      this.updateCursorContext(e.target);
    });

    // Animation loop
    this.animate();

    // Hide on touch devices
    if ('ontouchstart' in window) {
      this.cursor.style.display = 'none';
      this.trail.forEach(t => t.element.style.display = 'none');
    }
  }

  animate() {
    // Update main cursor
    this.cursor.style.left = `${this.mouseX}px`;
    this.cursor.style.top = `${this.mouseY}px`;

    // Update trail with lag
    this.trail[0].x += (this.mouseX - this.trail[0].x) * 0.3;
    this.trail[0].y += (this.mouseY - this.trail[0].y) * 0.3;

    for (let i = 1; i < this.trail.length; i++) {
      this.trail[i].x += (this.trail[i-1].x - this.trail[i].x) * 0.25;
      this.trail[i].y += (this.trail[i-1].y - this.trail[i].y) * 0.25;
    }

    this.trail.forEach(t => {
      t.element.style.left = `${t.x}px`;
      t.element.style.top = `${t.y}px`;
    });

    requestAnimationFrame(() => this.animate());
  }

  updateCursorContext(target) {
    // Reset
    this.cursor.className = 'custom-cursor';

    // Check context
    if (target.closest('button, a, .waypoint')) {
      this.cursor.classList.add('cursor-pointer');
    }

    if (target.closest('.camp-header')) {
      this.cursor.classList.add('cursor-expand');
    }

    if (target.closest('.waypoint')) {
      this.cursor.classList.add('cursor-navigate');
    }
  }
}

// ============================================================================
// EASTER EGGS
// ============================================================================

class EasterEggs {
  constructor(state) {
    this.state = state;
    this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    this.konamiProgress = 0;
    this.init();
  }

  init() {
    this.setupKonamiCode();
    this.setupDoubleClickPath();
    this.setupTripleClickSummit();
    this.setupLogoHover();
  }

  setupKonamiCode() {
    document.addEventListener('keydown', (e) => {
      if (e.key === this.konamiCode[this.konamiProgress]) {
        this.konamiProgress++;

        if (this.konamiProgress === this.konamiCode.length) {
          this.activateKonami();
          this.konamiProgress = 0;
        }
      } else {
        this.konamiProgress = 0;
      }
    });
  }

  activateKonami() {
    this.state.unlockKonami();

    // Rainbow gradient on path
    const path = document.querySelector('.elevation-path');
    if (path) {
      path.style.stroke = 'url(#rainbow)';

      // Create rainbow gradient
      const svg = document.querySelector('#elevation-map');
      const defs = svg.querySelector('defs');
      const rainbow = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
      rainbow.id = 'rainbow';
      rainbow.innerHTML = `
        <stop offset="0%" style="stop-color:#FF0000" />
        <stop offset="17%" style="stop-color:#FF7F00" />
        <stop offset="33%" style="stop-color:#FFFF00" />
        <stop offset="50%" style="stop-color:#00FF00" />
        <stop offset="67%" style="stop-color:#0000FF" />
        <stop offset="83%" style="stop-color:#4B0082" />
        <stop offset="100%" style="stop-color:#9400D3" />
      `;
      defs.appendChild(rainbow);
    }

    // Spin waypoints
    document.querySelectorAll('.waypoint').forEach(waypoint => {
      waypoint.style.animation = 'spin 2s ease-in-out';
    });

    // Expand all camps in cascade
    for (let i = 1; i <= CONFIG.totalCamps; i++) {
      setTimeout(() => {
        window.campManager.expandOverview(i);
      }, i * 300);
    }

    alert('🎮 KONAMI CODE ACTIVATED! 🌈');
  }

  setupDoubleClickPath() {
    const path = document.querySelector('.elevation-path');
    if (!path) return;

    let lastClick = 0;
    path.addEventListener('click', () => {
      const now = Date.now();
      if (now - lastClick < 300) {
        // Double click detected
        const randomCamp = Math.floor(Math.random() * CONFIG.totalCamps) + 1;
        this.teleportToCamp(randomCamp);
      }
      lastClick = now;
    });
  }

  teleportToCamp(campId) {
    // Flash effect
    const flash = document.createElement('div');
    flash.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: white;
      opacity: 1;
      z-index: 10000;
      pointer-events: none;
      transition: opacity 100ms;
    `;
    document.body.appendChild(flash);

    setTimeout(() => {
      flash.style.opacity = '0';
      setTimeout(() => flash.remove(), 100);
    }, 100);

    // Scroll to camp
    const camp = document.querySelector(`.camp[data-camp="${campId}"]`);
    if (camp) {
      camp.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        window.campManager.expandOverview(campId);
        this.createConfetti(camp);
      }, 500);
    }
  }

  setupTripleClickSummit() {
    const summit = document.querySelector('.waypoint[data-camp="8"]');
    if (!summit) return;

    let clickCount = 0;
    let clickTimer = null;

    summit.addEventListener('click', () => {
      clickCount++;

      if (clickTimer) clearTimeout(clickTimer);

      if (clickCount === 3) {
        this.summitCelebration();
        clickCount = 0;
      } else {
        clickTimer = setTimeout(() => {
          clickCount = 0;
        }, 500);
      }
    });
  }

  summitCelebration() {
    // Massive confetti
    this.createConfetti(document.body, 500);

    // Fireworks (simplified)
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight * 0.5;
        this.createFirework(x, y);
      }, i * 400);
    }

    // Achievement
    setTimeout(() => {
      alert('🎆 ULTIMATE SUMMIT CHAMPION! 🏆');
    }, 2000);
  }

  createConfetti(container, count = 200) {
    const colors = ['#1955ED', '#144AC7', '#0066CC', '#4B9EFF', '#7AB8FF'];

    for (let i = 0; i < count; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.cssText = `
        position: absolute;
        width: ${Math.random() * 10 + 5}px;
        height: ${Math.random() * 10 + 5}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${Math.random() * 100}%;
        top: -20px;
        opacity: ${Math.random() * 0.5 + 0.5};
        transform: rotate(${Math.random() * 360}deg);
        animation: confetti-fall ${Math.random() * 3 + 2}s linear forwards;
      `;

      container.appendChild(confetti);

      setTimeout(() => confetti.remove(), 5000);
    }
  }

  createFirework(x, y) {
    const particles = 30;
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#FF1493', '#00CED1'];

    for (let i = 0; i < particles; i++) {
      const particle = document.createElement('div');
      const angle = (i / particles) * Math.PI * 2;
      const velocity = Math.random() * 100 + 50;

      particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
      `;

      document.body.appendChild(particle);

      // Animate
      let posX = x;
      let posY = y;
      let velX = Math.cos(angle) * velocity;
      let velY = Math.sin(angle) * velocity;
      let opacity = 1;

      const animate = () => {
        velY += 2; // Gravity
        posX += velX * 0.05;
        posY += velY * 0.05;
        opacity -= 0.02;

        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.opacity = opacity;

        if (opacity > 0) {
          requestAnimationFrame(animate);
        } else {
          particle.remove();
        }
      };

      requestAnimationFrame(animate);
    }
  }

  setupLogoHover() {
    const logo = document.querySelector('header h1');
    if (!logo) return;

    let hoverTimer = null;

    logo.addEventListener('mouseenter', () => {
      hoverTimer = setTimeout(() => {
        this.showLogoTooltip(logo);
      }, 3000);
    });

    logo.addEventListener('mouseleave', () => {
      if (hoverTimer) clearTimeout(hoverTimer);
    });
  }

  showLogoTooltip(logo) {
    const tooltip = document.createElement('div');
    tooltip.className = 'logo-tooltip';
    tooltip.textContent = 'Did you know? Kahoa means "rope" in Hawaiian 🌺';
    tooltip.style.cssText = `
      position: absolute;
      bottom: -40px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0,0,0,0.9);
      color: white;
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 14px;
      white-space: nowrap;
      z-index: 1000;
      animation: fadeIn 300ms ease-out;
    `;

    logo.style.position = 'relative';
    logo.appendChild(tooltip);

    // Jiggle animation
    logo.style.animation = 'jiggle 0.5s ease-in-out';

    setTimeout(() => {
      tooltip.remove();
      logo.style.animation = '';
    }, 3000);
  }
}

// ============================================================================
// KEYBOARD SHORTCUTS
// ============================================================================

class KeyboardShortcuts {
  constructor() {
    this.shortcuts = {
      'j': () => this.navigateCamps(1),
      'k': () => this.navigateCamps(-1),
      'h': () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      'G': () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }),
      '?': () => this.showShortcutsModal(),
    };

    this.init();
  }

  init() {
    document.addEventListener('keydown', (e) => {
      // Ignore if typing in input
      if (e.target.matches('input, textarea')) return;

      const handler = this.shortcuts[e.key];
      if (handler) {
        e.preventDefault();
        handler();
      }

      // Number keys (1-8)
      if (e.key >= '1' && e.key <= '8') {
        e.preventDefault();
        const campId = parseInt(e.key);
        window.progressTracker.navigateToCamp(campId);
      }
    });
  }

  navigateCamps(direction) {
    const currentCamp = window.journeyState.lastCampVisited || 1;
    const nextCamp = Math.max(1, Math.min(CONFIG.totalCamps, currentCamp + direction));
    window.progressTracker.navigateToCamp(nextCamp);
  }

  showShortcutsModal() {
    const modal = document.createElement('div');
    modal.className = 'shortcuts-modal';
    modal.innerHTML = `
      <div class="shortcuts-content">
        <h2>Keyboard Shortcuts</h2>
        <table>
          <tr><td><kbd>j</kbd></td><td>Next camp</td></tr>
          <tr><td><kbd>k</kbd></td><td>Previous camp</td></tr>
          <tr><td><kbd>h</kbd></td><td>Go to top</td></tr>
          <tr><td><kbd>G</kbd></td><td>Go to bottom</td></tr>
          <tr><td><kbd>1-8</kbd></td><td>Jump to camp</td></tr>
          <tr><td><kbd>?</kbd></td><td>Show shortcuts</td></tr>
          <tr><td><kbd>Esc</kbd></td><td>Close/collapse</td></tr>
        </table>
        <button class="close-modal">Close</button>
      </div>
    `;

    document.body.appendChild(modal);

    setTimeout(() => modal.classList.add('show'), 10);

    const close = () => {
      modal.classList.remove('show');
      setTimeout(() => modal.remove(), 300);
    };

    modal.querySelector('.close-modal').addEventListener('click', close);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });

    document.addEventListener('keydown', function onEscape(e) {
      if (e.key === 'Escape') {
        close();
        document.removeEventListener('keydown', onEscape);
      }
    });
  }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize state
  window.journeyState = new JourneyState();

  // Initialize systems
  window.progressTracker = new ProgressTracker(window.journeyState);
  window.scrollEngine = new ScrollStoryEngine(window.journeyState);
  window.microInteractions = new MicroInteractions(window.journeyState);
  window.customCursor = new CustomCursor();
  window.easterEggs = new EasterEggs(window.journeyState);
  window.keyboardShortcuts = new KeyboardShortcuts();

  // Enhance existing CampManager
  const originalExpandOverview = window.campManager.expandOverview;
  window.campManager.expandOverview = function(campId) {
    originalExpandOverview.call(this, campId);
    window.journeyState.visitCamp(parseInt(campId));
    window.progressTracker.updateProgressBar();
    window.progressTracker.updateBadgeGrid();
  };

  const originalExpandDetail = window.campManager.expandDetail;
  window.campManager.expandDetail = function(campId) {
    originalExpandDetail.call(this, campId);
    window.journeyState.viewDetail();
  };

  // Check for summit reach
  window.journeyState.checkAchievements();

  // Show resume journey prompt if returning user
  if (window.journeyState.visitedCamps.size > 0) {
    showResumePrompt();
  }
});

function showResumePrompt() {
  const prompt = document.createElement('div');
  prompt.className = 'resume-prompt';
  prompt.innerHTML = `
    <p>Welcome back! Resume your journey?</p>
    <button class="resume-btn">Resume</button>
    <button class="fresh-btn">Start Fresh</button>
  `;

  document.body.appendChild(prompt);

  setTimeout(() => prompt.classList.add('show'), 100);

  prompt.querySelector('.resume-btn').addEventListener('click', () => {
    // Scroll to last position
    window.scrollTo({ top: window.journeyState.scrollDepth, behavior: 'smooth' });
    prompt.remove();
  });

  prompt.querySelector('.fresh-btn').addEventListener('click', () => {
    window.journeyState.clear();
  });
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    JourneyState,
    ProgressTracker,
    ScrollStoryEngine,
    MicroInteractions,
    CustomCursor,
    EasterEggs,
    KeyboardShortcuts,
  };
}
