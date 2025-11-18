/**
 * Kahoa Roadmap - Performance Optimization Module
 * 60fps GPU-accelerated interactions
 * <100ms response time
 */

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

/**
 * Debounce function - Limits execution rate
 * @param {Function} func - Function to debounce
 * @param {Number} wait - Delay in ms
 * @returns {Function} Debounced function
 */
function debounce(func, wait = 150) {
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

/**
 * Throttle function - Limits execution frequency
 * @param {Function} func - Function to throttle
 * @param {Number} limit - Min time between calls in ms
 * @returns {Function} Throttled function
 */
function throttle(func, limit = 16) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * RequestAnimationFrame wrapper for smooth updates
 * @param {Function} callback - Function to execute on next frame
 */
function rafThrottle(callback) {
  let rafId = null;
  return function(...args) {
    if (rafId !== null) return;
    rafId = requestAnimationFrame(() => {
      callback(...args);
      rafId = null;
    });
  };
}

/* ============================================
   PERFORMANCE MONITOR (DEV TOOL)
   ============================================ */

class PerformanceMonitor {
  constructor() {
    this.fps = 60;
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.enabled = false; // Set to true for dev mode
    this.overlay = null;
  }

  init() {
    if (!this.enabled) return;

    // Create overlay
    this.overlay = document.createElement('div');
    this.overlay.className = 'perf-overlay fps-good';
    this.overlay.innerHTML = 'FPS: 60';
    document.body.appendChild(this.overlay);

    // Start monitoring loop
    this.measure();
  }

  measure() {
    this.frameCount++;
    const currentTime = performance.now();

    // Update every second
    if (currentTime >= this.lastTime + 1000) {
      this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
      this.frameCount = 0;
      this.lastTime = currentTime;

      this.updateOverlay();
    }

    requestAnimationFrame(() => this.measure());
  }

  updateOverlay() {
    if (!this.overlay) return;

    this.overlay.innerHTML = `FPS: ${this.fps}`;

    // Color code based on performance
    this.overlay.className = 'perf-overlay';
    if (this.fps >= 55) {
      this.overlay.classList.add('fps-good');
    } else if (this.fps >= 40) {
      this.overlay.classList.add('fps-ok');
    } else {
      this.overlay.classList.add('fps-bad');
    }
  }
}

/* ============================================
   LAZY LOADING SYSTEM
   ============================================ */

class LazyLoader {
  constructor() {
    this.observer = null;
    this.loadedCamps = new Set();
  }

  init() {
    // Intersection Observer for lazy content loading
    const options = {
      root: null,
      rootMargin: '200px', // Preload 200px before entering viewport
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.loadedCamps.has(entry.target)) {
          this.loadCampDetails(entry.target);
        }
      });
    }, options);

    // Observe all camps
    document.querySelectorAll('.camp').forEach(camp => {
      this.observer.observe(camp);
    });
  }

  loadCampDetails(camp) {
    const campId = camp.dataset.camp;
    this.loadedCamps.add(camp);

    // Mark as ready for expansion
    camp.dataset.detailsLoaded = 'true';

    // Could fetch additional content here if needed
    // For now, content is already in DOM
  }
}

/* ============================================
   PRELOAD SYSTEM
   ============================================ */

class PreloadManager {
  constructor() {
    this.preloadedCamps = new Set();
  }

  init() {
    // Preload adjacent camps on hover
    document.querySelectorAll('.camp').forEach((camp, index, camps) => {
      camp.addEventListener('mouseenter', () => {
        // Preload next and previous camps
        if (camps[index + 1]) this.preloadCamp(camps[index + 1]);
        if (camps[index - 1]) this.preloadCamp(camps[index - 1]);
      }, { passive: true });
    });
  }

  preloadCamp(camp) {
    if (this.preloadedCamps.has(camp)) return;

    // Mark as preloaded
    this.preloadedCamps.add(camp);

    // Trigger any lazy-loaded content
    camp.dataset.preloaded = 'true';

    // Could prefetch images or data here
  }
}

/* ============================================
   MAGNETIC BUTTON EFFECT
   ============================================ */

class MagneticButtons {
  constructor() {
    this.buttons = [];
  }

  init() {
    this.buttons = document.querySelectorAll('.expand-btn');

    this.buttons.forEach(btn => {
      btn.addEventListener('mousemove', rafThrottle((e) => {
        this.handleMouseMove(btn, e);
      }), { passive: true });

      btn.addEventListener('mouseleave', () => {
        this.resetButton(btn);
      }, { passive: true });
    });
  }

  handleMouseMove(btn, e) {
    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Limit magnetic pull to 20% of distance
    const pullX = deltaX * 0.2;
    const pullY = deltaY * 0.2;

    // Apply transform
    btn.style.transform = `translate(${pullX}px, ${pullY}px)`;
    btn.classList.add('magnetic-active');
  }

  resetButton(btn) {
    btn.style.transform = '';
    btn.classList.remove('magnetic-active');
  }
}

/* ============================================
   TILT CARD EFFECT
   ============================================ */

class TiltCards {
  constructor() {
    this.cards = [];
  }

  init() {
    this.cards = document.querySelectorAll('.stat-card');

    this.cards.forEach(card => {
      card.addEventListener('mousemove', rafThrottle((e) => {
        this.handleMouseMove(card, e);
      }), { passive: true });

      card.addEventListener('mouseleave', () => {
        this.resetCard(card);
      }, { passive: true });
    });
  }

  handleMouseMove(card, e) {
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / rect.width;
    const deltaY = (e.clientY - centerY) / rect.height;

    // Calculate tilt angles (max 10 degrees)
    const tiltX = deltaY * -10;
    const tiltY = deltaX * 10;

    // Apply 3D transform
    card.style.transform = `
      perspective(1000px)
      rotateX(${tiltX}deg)
      rotateY(${tiltY}deg)
      scale3d(1.03, 1.03, 1.03)
    `;

    card.classList.add('tilt');
  }

  resetCard(card) {
    card.style.transform = '';
    card.classList.remove('tilt');
  }
}

/* ============================================
   STAGGER ANIMATION CONTROLLER
   ============================================ */

class StaggerAnimations {
  constructor() {
    this.staggerDelay = 100; // ms between each element
  }

  init() {
    // Stagger camp sections when detail expands
    document.addEventListener('campDetailExpanded', (e) => {
      const sections = e.detail.camp.querySelectorAll('.detail-section');
      this.staggerElements(sections);
    });
  }

  staggerElements(elements) {
    elements.forEach((el, index) => {
      // Remove existing animation
      el.style.animation = 'none';

      // Trigger reflow
      void el.offsetWidth;

      // Apply staggered animation
      el.style.animationDelay = `${index * this.staggerDelay}ms`;
    });
  }
}

/* ============================================
   SMOOTH SCROLL CONTROLLER
   ============================================ */

class SmoothScroll {
  constructor() {
    this.scrolling = false;
  }

  init() {
    // Polyfill for Safari if needed
    if (!('scrollBehavior' in document.documentElement.style)) {
      this.enablePolyfill();
    }

    // Add passive listeners for scroll events
    window.addEventListener('scroll', throttle(() => {
      this.handleScroll();
    }, 16), { passive: true });
  }

  handleScroll() {
    // Handle scroll-triggered animations
    // Already handled by IntersectionObserver in main code
  }

  enablePolyfill() {
    // Simple smooth scroll polyfill
    const originalScrollTo = window.scrollTo;
    window.scrollTo = function(x, y) {
      if (typeof x === 'object') {
        if (x.behavior === 'smooth') {
          smoothScrollTo(x.top || x.left || 0);
          return;
        }
      }
      originalScrollTo.call(window, x, y);
    };

    function smoothScrollTo(target) {
      const start = window.pageYOffset;
      const distance = target - start;
      const duration = 500;
      let startTime = null;

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        // Easing function (ease-out-cubic)
        const ease = 1 - Math.pow(1 - progress, 3);
        window.scrollTo(0, start + distance * ease);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      }

      requestAnimationFrame(animation);
    }
  }
}

/* ============================================
   ENHANCED CAMP MANAGER WITH PERFORMANCE OPTIMIZATIONS
   ============================================ */

class CampManagerPerformance {
  constructor() {
    this.camps = document.querySelectorAll('.camp');
    this.waypoints = document.querySelectorAll('.waypoint');
    this.activeCamp = null;
    this.activeLevel = 'collapsed';
    this.rafId = null;
  }

  init() {
    this.setupCampHandlers();
    this.setupWaypointHandlers();
    this.setupKeyboardNav();
    this.setupScrollAnimations();
  }

  setupCampHandlers() {
    this.camps.forEach(camp => {
      const header = camp.querySelector('.camp-header');
      const expandBtn = header.querySelector('.expand-btn');
      const overview = camp.querySelector('.camp-overview');
      const detail = camp.querySelector('.camp-detail');
      const overviewExpandBtn = overview?.querySelector('.expand-btn');
      const overviewCollapseBtn = overview?.querySelector('.collapse-btn');
      const detailCollapseBtn = detail?.querySelector('.collapse-btn');

      // Use passive listeners where possible
      const showOverview = (e) => {
        e.stopPropagation();
        const campId = camp.dataset.camp;
        this.expandOverview(campId);
      };

      header.addEventListener('click', showOverview, { passive: false });
      expandBtn.addEventListener('click', showOverview, { passive: false });

      if (overviewExpandBtn) {
        overviewExpandBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const campId = camp.dataset.camp;
          this.expandDetail(campId);
        }, { passive: false });
      }

      if (overviewCollapseBtn) {
        overviewCollapseBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const campId = camp.dataset.camp;
          this.collapse(campId);
        }, { passive: false });
      }

      if (detailCollapseBtn) {
        detailCollapseBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const campId = camp.dataset.camp;
          this.collapse(campId);
        }, { passive: false });
      }

      // Keyboard support
      header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          showOverview(e);
        }
      }, { passive: false });
    });
  }

  setupWaypointHandlers() {
    this.waypoints.forEach(waypoint => {
      waypoint.addEventListener('click', (e) => {
        const campId = waypoint.dataset.camp;
        this.scrollToCamp(campId);
        this.expandOverview(campId);
      }, { passive: true });

      waypoint.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const campId = waypoint.dataset.camp;
          this.scrollToCamp(campId);
          this.expandOverview(campId);
        }
      }, { passive: false });
    });
  }

  setupKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activeCamp) {
        this.collapse(this.activeCamp);
      }

      if ((e.ctrlKey || e.metaKey) && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
        e.preventDefault();
        const direction = e.key === 'ArrowDown' ? 1 : -1;
        this.navigateCamps(direction);
      }
    }, { passive: false });
  }

  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Use RAF for animation start
          requestAnimationFrame(() => {
            entry.target.style.animationPlayState = 'running';
          });
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => {
      el.style.animationPlayState = 'paused';
      observer.observe(el);
    });
  }

  expandOverview(campId) {
    // Batch DOM reads and writes using RAF
    requestAnimationFrame(() => {
      const camp = document.querySelector(`.camp[data-camp="${campId}"]`);
      if (!camp) return;

      // Collapse other camps first
      this.collapseAll();

      // Read phase
      const overview = camp.querySelector('.camp-overview');
      const header = camp.querySelector('.camp-header');
      const expandBtn = header.querySelector('.expand-btn');
      const collapseBtn = overview.querySelector('.collapse-btn');

      // Write phase (batched)
      requestAnimationFrame(() => {
        // Add will-change hint before animation
        camp.classList.add('expanding');
        overview.style.willChange = 'transform, opacity';

        overview.classList.add('expanded');
        overview.setAttribute('aria-hidden', 'false');
        header.setAttribute('aria-expanded', 'true');
        camp.classList.add('active');

        if (expandBtn) expandBtn.style.display = 'none';
        if (collapseBtn) collapseBtn.style.display = 'inline-block';

        this.activeCamp = campId;
        this.activeLevel = 'overview';
        this.updateWaypoint(campId, 'active');

        // Remove will-change after animation completes
        setTimeout(() => {
          overview.style.willChange = 'auto';
          camp.classList.remove('expanding');
          overview.classList.add('settled');
        }, 500);

        // Focus management
        setTimeout(() => {
          const firstBtn = overview.querySelector('.expand-btn');
          if (firstBtn) firstBtn.focus();
        }, 300);
      });
    });
  }

  expandDetail(campId) {
    requestAnimationFrame(() => {
      const camp = document.querySelector(`.camp[data-camp="${campId}"]`);
      if (!camp) return;

      const overview = camp.querySelector('.camp-overview');
      const detail = camp.querySelector('.camp-detail');
      const overviewExpandBtn = overview?.querySelector('.expand-btn');

      requestAnimationFrame(() => {
        // Add will-change hint
        detail.style.willChange = 'transform, opacity';

        detail.classList.add('expanded');
        detail.setAttribute('aria-hidden', 'false');

        if (overviewExpandBtn) overviewExpandBtn.style.display = 'none';

        this.activeLevel = 'detail';

        // Dispatch custom event for stagger animations
        const event = new CustomEvent('campDetailExpanded', { detail: { camp } });
        document.dispatchEvent(event);

        // Remove will-change after animation
        setTimeout(() => {
          detail.style.willChange = 'auto';
        }, 800);

        setTimeout(() => {
          detail.querySelector('h3')?.focus();
        }, 300);
      });
    });
  }

  collapse(campId) {
    requestAnimationFrame(() => {
      const camp = document.querySelector(`.camp[data-camp="${campId}"]`);
      if (!camp) return;

      const overview = camp.querySelector('.camp-overview');
      const detail = camp.querySelector('.camp-detail');
      const header = camp.querySelector('.camp-header');
      const expandBtn = header.querySelector('.expand-btn');
      const overviewExpandBtn = overview?.querySelector('.expand-btn');
      const overviewCollapseBtn = overview?.querySelector('.collapse-btn');

      requestAnimationFrame(() => {
        overview.classList.remove('expanded', 'settled');
        detail.classList.remove('expanded');
        overview.setAttribute('aria-hidden', 'true');
        detail.setAttribute('aria-hidden', 'true');
        header.setAttribute('aria-expanded', 'false');
        camp.classList.remove('active', 'expanding');

        if (expandBtn) expandBtn.style.display = 'inline-block';
        if (overviewExpandBtn) overviewExpandBtn.style.display = 'inline-block';
        if (overviewCollapseBtn) overviewCollapseBtn.style.display = 'none';

        this.activeCamp = null;
        this.activeLevel = 'collapsed';
        this.updateWaypoint(campId, 'inactive');

        header.focus();
      });
    });
  }

  collapseAll() {
    this.camps.forEach(camp => {
      const campId = camp.dataset.camp;
      if (this.activeCamp === campId) {
        this.collapse(campId);
      }
    });
  }

  scrollToCamp(campId) {
    const camp = document.querySelector(`.camp[data-camp="${campId}"]`);
    if (camp) {
      camp.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  navigateCamps(direction) {
    const currentIdx = this.activeCamp ? parseInt(this.activeCamp) - 1 : 0;
    const nextIdx = Math.max(0, Math.min(this.camps.length - 1, currentIdx + direction));
    const nextCampId = String(nextIdx + 1);

    this.scrollToCamp(nextCampId);
    this.expandOverview(nextCampId);
  }

  updateWaypoint(campId, state) {
    const waypoint = document.querySelector(`.waypoint[data-camp="${campId}"]`);
    if (!waypoint) return;

    requestAnimationFrame(() => {
      waypoint.classList.remove('active', 'completed');

      if (state === 'active') {
        waypoint.classList.add('active');
      } else if (state === 'completed') {
        waypoint.classList.add('completed');
      }
    });
  }
}

/* ============================================
   INITIALIZATION
   ============================================ */

function initPerformanceOptimizations() {
  // Initialize performance monitor (dev mode)
  const perfMonitor = new PerformanceMonitor();
  // perfMonitor.enabled = true; // Uncomment for dev mode
  perfMonitor.init();

  // Initialize lazy loading
  const lazyLoader = new LazyLoader();
  lazyLoader.init();

  // Initialize preloading
  const preloadManager = new PreloadManager();
  preloadManager.init();

  // Initialize magnetic buttons
  const magneticButtons = new MagneticButtons();
  magneticButtons.init();

  // Initialize tilt cards
  const tiltCards = new TiltCards();
  tiltCards.init();

  // Initialize stagger animations
  const staggerAnimations = new StaggerAnimations();
  staggerAnimations.init();

  // Initialize smooth scroll
  const smoothScroll = new SmoothScroll();
  smoothScroll.init();

  // Initialize enhanced camp manager
  const campManager = new CampManagerPerformance();
  campManager.init();

  console.log('Performance optimizations initialized');
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPerformanceOptimizations);
} else {
  initPerformanceOptimizations();
}

/* ============================================
   EXPORT FOR MODULE USAGE
   ============================================ */

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    debounce,
    throttle,
    rafThrottle,
    PerformanceMonitor,
    LazyLoader,
    PreloadManager,
    MagneticButtons,
    TiltCards,
    StaggerAnimations,
    SmoothScroll,
    CampManagerPerformance
  };
}
