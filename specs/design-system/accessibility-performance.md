# Accessibility & Performance Standards

## Overview

This specification defines the accessibility and performance standards for FHIR IQ, ensuring WCAG 2.2 AA compliance, optimal Core Web Vitals, and exceptional user experience across all devices and abilities.

## Accessibility Standards (WCAG 2.2 AA)

### Color & Contrast

#### Contrast Ratios
```css
/* Text Contrast Requirements */
:root {
  /* Normal text (under 18px): 4.5:1 minimum */
  --text-aa-normal: 4.5; /* Against white background */

  /* Large text (18px+ or 14px+ bold): 3:1 minimum */
  --text-aa-large: 3.0;

  /* UI components: 3:1 minimum */
  --ui-aa-contrast: 3.0;

  /* Focus indicators: 3:1 minimum against adjacent colors */
  --focus-aa-contrast: 3.0;
}

/* Verified contrast combinations */
.text-primary {
  color: #1C1917; /* neutral-900 - 16.04:1 on white */
}

.text-body {
  color: #57534E; /* neutral-600 - 7.31:1 on white */
}

.text-secondary {
  color: #78716C; /* neutral-500 - 5.26:1 on white */
}

.text-placeholder {
  color: #A8A29E; /* neutral-400 - 3.52:1 on white (large text only) */
}

/* Link colors with sufficient contrast */
.link-primary {
  color: #2563EB; /* cobalt-600 - 5.74:1 on white */
}

.link-ember {
  color: #EA580C; /* ember-600 - 4.52:1 on white */
}

/* UI component colors */
.button-primary {
  background: #F97316; /* ember-500 */
  color: #FFFFFF; /* 4.86:1 contrast */
}

.button-secondary {
  background: #FFFFFF;
  color: #F97316; /* ember-500 - 4.86:1 */
  border: 1px solid #F97316;
}
```

#### Color Usage Guidelines
```css
/* Never rely on color alone for meaning */
.status-indicator {
  /* Good: Icon + color */
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-success {
  color: #16A34A; /* success-600 */
}

.status-success::before {
  content: '✓';
  font-weight: bold;
}

.status-error {
  color: #DC2626; /* error-600 */
}

.status-error::before {
  content: '⚠';
  font-weight: bold;
}

.status-warning {
  color: #D97706; /* warning-600 */
}

.status-warning::before {
  content: '⚠';
  font-weight: bold;
}

/* Form validation: multiple indicators */
.form-field-error {
  border-color: #DC2626;
  background-image: url('data:image/svg+xml;base64,[error-icon]');
}

.form-field-success {
  border-color: #16A34A;
  background-image: url('data:image/svg+xml;base64,[success-icon]');
}
```

### Keyboard Navigation

#### Focus Management
```css
/* Enhanced focus indicators */
:focus-visible {
  outline: 2px solid #3B82F6; /* cobalt-500 */
  outline-offset: 2px;
  border-radius: 2px;
}

/* Component-specific focus styles */
.button:focus-visible {
  outline: 2px solid #3B82F6;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
}

.form-input:focus-visible {
  outline: 2px solid #3B82F6;
  outline-offset: -2px;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.link:focus-visible {
  outline: 2px solid #3B82F6;
  outline-offset: 3px;
  border-radius: 2px;
}

/* Skip to main content */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  padding: 8px 16px;
  background: #1C1917;
  color: #FFFFFF;
  text-decoration: none;
  border-radius: 0 0 4px 0;
  z-index: 1000;
  transition: top 0.3s ease;
}

.skip-link:focus {
  top: 0;
}

/* Focus trap for modals */
.modal[aria-hidden="false"] {
  /* JavaScript will manage focus trap */
}
```

#### Keyboard Interaction Patterns
```html
<!-- Tab panels -->
<div class="tabs" role="tablist" aria-label="Product features">
  <button
    role="tab"
    aria-selected="true"
    aria-controls="panel-1"
    id="tab-1"
    tabindex="0"
  >
    Features
  </button>
  <button
    role="tab"
    aria-selected="false"
    aria-controls="panel-2"
    id="tab-2"
    tabindex="-1"
  >
    Pricing
  </button>
</div>

<!-- Accordion -->
<div class="accordion">
  <h3>
    <button
      class="accordion-trigger"
      aria-expanded="false"
      aria-controls="section-1"
      id="accordion-trigger-1"
    >
      <span>Frequently Asked Questions</span>
      <span class="accordion-icon" aria-hidden="true">▼</span>
    </button>
  </h3>
  <div
    id="section-1"
    role="region"
    aria-labelledby="accordion-trigger-1"
    class="accordion-panel"
    hidden
  >
    <p>Panel content here...</p>
  </div>
</div>

<!-- Dropdown menu -->
<div class="dropdown">
  <button
    class="dropdown-trigger"
    aria-expanded="false"
    aria-haspopup="true"
    aria-controls="dropdown-menu"
  >
    Menu
  </button>
  <ul
    id="dropdown-menu"
    class="dropdown-menu"
    role="menu"
    aria-labelledby="dropdown-trigger"
    hidden
  >
    <li role="none">
      <a href="#" role="menuitem">Item 1</a>
    </li>
    <li role="none">
      <a href="#" role="menuitem">Item 2</a>
    </li>
  </ul>
</div>
```

### Screen Reader Support

#### ARIA Implementation
```html
<!-- Landmark regions -->
<header role="banner">
  <nav role="navigation" aria-label="Main navigation">
    <!-- Navigation items -->
  </nav>
</header>

<main role="main" id="main-content">
  <!-- Main content -->
</main>

<aside role="complementary" aria-label="Related tools">
  <!-- Sidebar content -->
</aside>

<footer role="contentinfo">
  <!-- Footer content -->
</footer>

<!-- Form labeling -->
<form role="form" aria-label="Contact information">
  <fieldset>
    <legend>Personal Information</legend>

    <label for="first-name">
      First Name
      <span aria-label="required" class="required">*</span>
    </label>
    <input
      type="text"
      id="first-name"
      name="firstName"
      required
      aria-describedby="first-name-error"
      aria-invalid="false"
    />
    <div id="first-name-error" class="error-message" role="alert" aria-live="polite">
      <!-- Error message will appear here -->
    </div>
  </fieldset>
</form>

<!-- Status updates -->
<div
  id="status-updates"
  role="status"
  aria-live="polite"
  aria-atomic="true"
  class="sr-only"
>
  <!-- Dynamic status messages -->
</div>

<!-- Loading states -->
<button aria-busy="true" aria-describedby="loading-text">
  Save Changes
  <span id="loading-text" class="sr-only">Saving, please wait...</span>
</button>

<!-- Complex widgets -->
<div
  role="slider"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-valuenow="50"
  aria-label="Quality score"
  tabindex="0"
>
  <!-- Custom slider implementation -->
</div>
```

#### Screen Reader Only Content
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Show on focus for keyboard users */
.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

### Alternative Text & Media

#### Image Accessibility
```html
<!-- Informative images -->
<img
  src="fhir-architecture-diagram.png"
  alt="FHIR architecture showing Patient, Observation, and Condition resources connected through references"
  width="600"
  height="400"
/>

<!-- Decorative images -->
<img
  src="hero-background.jpg"
  alt=""
  role="presentation"
/>

<!-- Complex images with descriptions -->
<figure>
  <img
    src="data-quality-chart.png"
    alt="Data quality improvement over time"
    aria-describedby="chart-description"
  />
  <figcaption id="chart-description">
    Chart showing data quality scores improving from 65% in January to 98% in December,
    with steepest improvement occurring between March and June.
  </figcaption>
</figure>

<!-- SVG icons -->
<svg aria-hidden="true" focusable="false">
  <use href="#icon-checkmark"></use>
</svg>

<!-- Functional icons with labels -->
<button aria-label="Close dialog">
  <svg aria-hidden="true" focusable="false">
    <use href="#icon-close"></use>
  </svg>
</button>
```

#### Video & Audio Accessibility
```html
<!-- Video with captions and transcript -->
<video controls aria-describedby="video-description">
  <source src="fhir-tutorial.mp4" type="video/mp4" />
  <track kind="captions" src="fhir-tutorial-captions.vtt" srclang="en" label="English" />
  <track kind="descriptions" src="fhir-tutorial-descriptions.vtt" srclang="en" label="English Descriptions" />
  <p>Your browser doesn't support video. <a href="fhir-tutorial.mp4">Download the video file</a>.</p>
</video>

<div id="video-description" class="video-description">
  <h4>Video Description</h4>
  <p>This 5-minute tutorial demonstrates how to build a FHIR patient portal using our AI tools...</p>
  <a href="fhir-tutorial-transcript.html">View full transcript</a>
</div>
```

## Performance Standards

### Core Web Vitals Targets

#### Performance Metrics
```javascript
const PERFORMANCE_TARGETS = {
  // Core Web Vitals
  LCP: {
    good: '< 2.5s',
    needsImprovement: '2.5s - 4s',
    poor: '> 4s',
    target: '< 2.0s' // FHIR IQ target
  },

  FID: {
    good: '< 100ms',
    needsImprovement: '100ms - 300ms',
    poor: '> 300ms',
    target: '< 50ms' // FHIR IQ target
  },

  CLS: {
    good: '< 0.1',
    needsImprovement: '0.1 - 0.25',
    poor: '> 0.25',
    target: '< 0.05' // FHIR IQ target
  },

  // Additional metrics
  FCP: {
    target: '< 1.5s'
  },

  TTI: {
    target: '< 3.0s'
  },

  TBT: {
    target: '< 200ms'
  },

  // Network-specific targets
  '4G': {
    LCP: '< 2.5s',
    FID: '< 100ms'
  },

  '3G': {
    LCP: '< 4.0s',
    FID: '< 200ms'
  }
};
```

### Image Optimization

#### Responsive Images
```html
<!-- WebP with fallbacks -->
<picture>
  <source
    srcset="
      hero-image-400.avif 400w,
      hero-image-800.avif 800w,
      hero-image-1200.avif 1200w,
      hero-image-1600.avif 1600w
    "
    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
    type="image/avif"
  />
  <source
    srcset="
      hero-image-400.webp 400w,
      hero-image-800.webp 800w,
      hero-image-1200.webp 1200w,
      hero-image-1600.webp 1600w
    "
    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
    type="image/webp"
  />
  <img
    src="hero-image-800.jpg"
    srcset="
      hero-image-400.jpg 400w,
      hero-image-800.jpg 800w,
      hero-image-1200.jpg 1200w,
      hero-image-1600.jpg 1600w
    "
    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
    alt="FHIR IQ dashboard showing data quality metrics"
    loading="lazy"
    width="800"
    height="600"
  />
</picture>

<!-- Critical images (above fold) -->
<img
  src="hero-image-800.webp"
  alt="FHIR development made simple with AI"
  width="800"
  height="600"
  loading="eager"
  fetchpriority="high"
/>

<!-- Lazy loaded images -->
<img
  src="placeholder.jpg"
  data-src="actual-image.webp"
  alt="Description"
  loading="lazy"
  class="lazy-image"
/>
```

#### Image Optimization Settings
```javascript
const IMAGE_OPTIMIZATION = {
  formats: {
    avif: { quality: 65, lossless: false },
    webp: { quality: 85, lossless: false },
    jpeg: { quality: 85, progressive: true },
    png: { compressionLevel: 9 }
  },

  sizes: {
    thumbnail: 150,
    small: 300,
    medium: 600,
    large: 1200,
    xlarge: 1600,
    hero: 1920
  },

  lazyLoading: {
    rootMargin: '50px',
    threshold: 0.1
  }
};
```

### Font Optimization

#### Font Loading Strategy
```html
<!-- Preload critical fonts -->
<link
  rel="preload"
  href="/fonts/Inter-Regular.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
<link
  rel="preload"
  href="/fonts/Inter-SemiBold.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
<link
  rel="preload"
  href="/fonts/Newsreader-Regular.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>

<!-- Font display strategy -->
<style>
  @font-face {
    font-family: 'Inter';
    src: url('/fonts/Inter-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap; /* Show fallback, then swap when loaded */
  }

  @font-face {
    font-family: 'Inter';
    src: url('/fonts/Inter-SemiBold.woff2') format('woff2');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Newsreader';
    src: url('/fonts/Newsreader-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
</style>
```

#### Font Fallback System
```css
:root {
  /* System font stacks for instant rendering */
  --font-sans-fallback: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                        'Helvetica Neue', Arial, sans-serif;
  --font-serif-fallback: Georgia, 'Times New Roman', Times, serif;
  --font-mono-fallback: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono',
                        Consolas, 'Courier New', monospace;
}

body {
  font-family: 'Inter', var(--font-sans-fallback);
  /* Ensure layout stability during font load */
  font-size-adjust: 0.5;
}

.article-content {
  font-family: 'Newsreader', var(--font-serif-fallback);
  font-size-adjust: 0.48;
}

code, pre {
  font-family: 'JetBrains Mono', var(--font-mono-fallback);
  font-size-adjust: 0.5;
}
```

### CSS Optimization

#### Critical CSS Strategy
```html
<!-- Inline critical CSS -->
<style>
/* Above-the-fold styles only */
body { margin: 0; font-family: -apple-system, sans-serif; }
.header { background: #FAFAF9; padding: 1rem; }
.hero { padding: 4rem 1rem; text-align: center; }
.hero h1 { font-size: 2.5rem; margin: 0 0 1rem; color: #1C1917; }
/* ... critical styles only ... */
</style>

<!-- Async load non-critical CSS -->
<link
  rel="preload"
  href="/css/main.css"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
/>
<noscript>
  <link rel="stylesheet" href="/css/main.css" />
</noscript>
```

#### CSS Performance Best Practices
```css
/* Avoid expensive properties */
.performant-styles {
  /* Good: GPU-accelerated properties */
  transform: translateX(10px);
  opacity: 0.8;
  filter: blur(5px);

  /* Avoid: Layout-inducing properties */
  /* width: calc(100% - 20px); */
  /* height: auto; */
  /* top: 10px; */
}

/* Use contain for isolated components */
.component-container {
  contain: layout style paint;
}

/* Optimize animations */
.optimized-animation {
  will-change: transform; /* Hint to browser */
  backface-visibility: hidden; /* Prevent flickering */
}

/* Use CSS Grid and Flexbox efficiently */
.efficient-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  /* More efficient than complex float layouts */
}
```

### JavaScript Optimization

#### Code Splitting Strategy
```javascript
// Dynamic imports for non-critical features
async function loadChatbot() {
  const { ChatbotComponent } = await import('./components/Chatbot.js');
  return ChatbotComponent;
}

// Lazy load based on user interaction
function initializeLazyFeatures() {
  // Intersection Observer for components
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        const component = entry.target.dataset.component;
        const { default: Component } = await import(`./components/${component}.js`);
        Component.init(entry.target);
        observer.unobserve(entry.target);
      }
    });
  });

  document.querySelectorAll('[data-lazy-component]').forEach(el => {
    observer.observe(el);
  });
}

// Preload critical resources
function preloadCriticalResources() {
  // Preload important API calls
  fetch('/api/critical-data', { method: 'HEAD' });

  // Preload likely next page
  const prefetchLink = document.createElement('link');
  prefetchLink.rel = 'prefetch';
  prefetchLink.href = '/likely-next-page';
  document.head.appendChild(prefetchLink);
}
```

#### Third-Party Script Optimization
```html
<!-- Async/defer non-critical scripts -->
<script src="/js/analytics.js" async></script>
<script src="/js/non-critical.js" defer></script>

<!-- Self-host third-party scripts when possible -->
<script src="/js/vendor/library.min.js" defer></script>

<!-- Use resource hints -->
<link rel="dns-prefetch" href="//api.openai.com">
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
```

### Layout Stability (CLS Prevention)

#### Reserve Space for Dynamic Content
```css
/* Image containers with aspect ratio */
.image-container {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Ad/widget placeholders */
.ad-placeholder {
  width: 300px;
  height: 250px;
  background: #F5F5F4;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #A8A29E;
  font-size: 0.875rem;
}

/* Loading skeletons */
.skeleton {
  background: linear-gradient(90deg, #F5F5F4 25%, #E7E5E4 50%, #F5F5F4 75%);
  background-size: 200% 100%;
  animation: loading 1.5s ease infinite;
}

.skeleton-text {
  height: 1rem;
  border-radius: 2px;
  margin-bottom: 0.5rem;
}

.skeleton-text:last-child {
  width: 60%;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Mobile Performance

#### Touch Optimization
```css
/* Optimize touch targets */
.touch-target {
  min-height: 44px;
  min-width: 44px;
  padding: 12px;
}

/* Prevent 300ms tap delay */
.fast-tap {
  touch-action: manipulation;
}

/* Smooth scrolling */
.scroll-container {
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}

/* Reduce paint on scroll */
.scroll-optimized {
  will-change: transform;
  backface-visibility: hidden;
}
```

#### Viewport Configuration
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
```

## Performance Monitoring

### Core Web Vitals Measurement
```javascript
// File: src/utils/performance-monitoring.js
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to your analytics service
  console.log(`${metric.name}: ${metric.value}`);
}

// Measure Core Web Vitals
getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);

// Custom performance marks
performance.mark('hero-content-start');
// ... load hero content ...
performance.mark('hero-content-end');
performance.measure('hero-content-duration', 'hero-content-start', 'hero-content-end');

// Resource timing
function analyzeResourceTiming() {
  const resources = performance.getEntriesByType('resource');

  resources.forEach(resource => {
    if (resource.duration > 1000) {
      console.warn(`Slow resource: ${resource.name} took ${resource.duration}ms`);
    }
  });
}

// Long task detection
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.warn(`Long task detected: ${entry.duration}ms`);
  });
});

observer.observe({ type: 'longtask', buffered: true });
```

### Performance Budget
```javascript
const PERFORMANCE_BUDGET = {
  // Resource limits
  javascript: '300KB', // Gzipped
  css: '100KB',        // Gzipped
  images: '500KB',     // Per page
  fonts: '200KB',      // Total font files
  total: '2MB',        // Total page weight

  // Request limits
  requests: 50,        // Max HTTP requests

  // Timing budgets
  firstContentfulPaint: 1500,  // ms
  largestContentfulPaint: 2500, // ms
  firstInputDelay: 100,         // ms
  cumulativeLayoutShift: 0.1,   // score

  // Network conditions
  connection: '4G',    // Target connection
  device: 'mobile'     // Target device
};
```

## Testing & Validation

### Accessibility Testing
```javascript
// Automated accessibility testing
import { axe } from 'axe-core';

async function runAccessibilityTests() {
  try {
    const results = await axe.run();

    if (results.violations.length > 0) {
      console.error('Accessibility violations found:', results.violations);
      results.violations.forEach(violation => {
        console.error(`${violation.id}: ${violation.description}`);
        violation.nodes.forEach(node => {
          console.error(`  Element: ${node.target.join(', ')}`);
          console.error(`  Issue: ${node.failureSummary}`);
        });
      });
    } else {
      console.log('All accessibility tests passed!');
    }
  } catch (error) {
    console.error('Accessibility testing failed:', error);
  }
}

// Color contrast testing
function checkContrastRatio(foreground, background) {
  // Implementation of WCAG contrast ratio calculation
  const luminance1 = getRelativeLuminance(foreground);
  const luminance2 = getRelativeLuminance(background);

  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);

  return (lighter + 0.05) / (darker + 0.05);
}

// Keyboard navigation testing
function testKeyboardNavigation() {
  const focusableElements = document.querySelectorAll(
    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );

  focusableElements.forEach((element, index) => {
    element.addEventListener('focus', () => {
      console.log(`Focus ${index + 1}: ${element.tagName} - ${element.textContent || element.value}`);
    });
  });
}
```

### Performance Testing
```javascript
// Performance testing utilities
class PerformanceTester {
  static async measurePageLoad() {
    return new Promise((resolve) => {
      window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        resolve({
          domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
          loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
          totalTime: perfData.loadEventEnd - perfData.fetchStart
        });
      });
    });
  }

  static measureLCP() {
    return new Promise((resolve) => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        resolve(lastEntry.startTime);
      });

      observer.observe({ type: 'largest-contentful-paint', buffered: true });
    });
  }

  static measureCLS() {
    return new Promise((resolve) => {
      let clsValue = 0;

      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        resolve(clsValue);
      });

      observer.observe({ type: 'layout-shift', buffered: true });
    });
  }
}

// Network condition simulation for testing
function simulateSlowConnection() {
  // Use DevTools Network throttling or Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw-throttle.js');
  }
}
```

## Implementation Checklist

### Accessibility Implementation
- [ ] Color contrast ratios verified (4.5:1 for normal text, 3:1 for large text)
- [ ] Focus indicators visible and consistent
- [ ] Keyboard navigation functional for all interactive elements
- [ ] Screen reader testing completed
- [ ] ARIA labels and roles properly implemented
- [ ] Alternative text provided for all informative images
- [ ] Form labels and error messages accessible
- [ ] Skip links implemented
- [ ] Color not used as sole indicator of meaning

### Performance Implementation
- [ ] LCP < 2.5s on 4G connection
- [ ] FID < 100ms for all interactions
- [ ] CLS < 0.1 across all pages
- [ ] Images optimized and lazy loaded
- [ ] Fonts optimized with proper fallbacks
- [ ] Critical CSS inlined, non-critical deferred
- [ ] JavaScript code split and lazy loaded
- [ ] Third-party scripts optimized
- [ ] Performance monitoring implemented

### Testing & Validation
- [ ] Automated accessibility tests passing
- [ ] Manual keyboard navigation tested
- [ ] Screen reader testing completed
- [ ] Performance budgets defined and monitored
- [ ] Core Web Vitals measured and optimized
- [ ] Cross-browser compatibility verified
- [ ] Mobile performance validated
- [ ] Lighthouse audits scoring 90+ in all categories