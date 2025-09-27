# Motion & Interaction Design Specification

## Motion Design Philosophy

### Principles
**Purposeful, Not Decorative**
- Every animation serves a functional purpose
- Movements guide user attention and understanding
- Micro-interactions provide feedback and delight
- Performance and accessibility are paramount

**Subtle and Respectful**
- Gentle, understated animations
- No heavy parallax or overwhelming effects
- Respects `prefers-reduced-motion` preferences
- Maintains professional credibility

**Consistent and Predictable**
- Unified timing and easing across all interactions
- Consistent visual language for similar actions
- Predictable outcomes for user actions

## Animation System

### Timing & Easing
```css
:root {
  /* Duration Scale */
  --duration-instant: 0ms;
  --duration-fast: 150ms;      /* Quick feedback */
  --duration-base: 250ms;      /* Standard transitions */
  --duration-slow: 350ms;      /* Complex animations */
  --duration-slower: 500ms;    /* Page transitions */

  /* Easing Functions */
  --ease-linear: linear;
  --ease-out: cubic-bezier(0.215, 0.61, 0.355, 1);     /* Natural deceleration */
  --ease-in: cubic-bezier(0.55, 0.055, 0.675, 0.19);   /* Accelerate */
  --ease-in-out: cubic-bezier(0.645, 0.045, 0.355, 1); /* Smooth both ends */
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Gentle bounce */
}

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: var(--duration-instant) !important;
    animation-iteration-count: 1 !important;
    transition-duration: var(--duration-instant) !important;
    scroll-behavior: auto !important;
  }
}
```

### Motion Tokens
```css
:root {
  /* Entrance Animations */
  --motion-fade-in: fadeIn var(--duration-base) var(--ease-out);
  --motion-slide-up: slideUp var(--duration-base) var(--ease-out);
  --motion-scale-in: scaleIn var(--duration-base) var(--ease-out);
  --motion-slide-in-left: slideInLeft var(--duration-base) var(--ease-out);

  /* Interactive Feedback */
  --motion-hover-lift: translateY(-2px);
  --motion-hover-scale: scale(1.02);
  --motion-press-down: translateY(1px) scale(0.98);
  --motion-focus-ring: 0 0 0 3px rgba(59, 130, 246, 0.2);

  /* State Changes */
  --motion-expand: scaleY(1) var(--duration-base) var(--ease-out);
  --motion-collapse: scaleY(0) var(--duration-base) var(--ease-in);
  --motion-reveal: opacity 1 var(--duration-base) var(--ease-out);
  --motion-hide: opacity 0 var(--duration-fast) var(--ease-in);
}
```

## Micro-Interactions

### Button Interactions
```css
.button {
  position: relative;
  overflow: hidden;
  transition: all var(--duration-fast) var(--ease-out);
  transform-origin: center;
}

/* Hover state */
.button:hover {
  transform: var(--motion-hover-lift);
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.25);
}

/* Active/pressed state */
.button:active {
  transform: var(--motion-press-down);
  transition-duration: var(--duration-instant);
}

/* Focus state */
.button:focus-visible {
  outline: none;
  box-shadow: var(--motion-focus-ring);
}

/* Ripple effect for primary buttons */
.button-primary {
  position: relative;
  overflow: hidden;
}

.button-primary::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width var(--duration-slow) var(--ease-out),
              height var(--duration-slow) var(--ease-out);
}

.button-primary:hover::before {
  width: 300px;
  height: 300px;
}

/* Loading state */
.button[aria-busy="true"] {
  color: transparent;
  pointer-events: none;
}

.button[aria-busy="true"]::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 16px;
  height: 16px;
  margin: -8px 0 0 -8px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Link Interactions
```css
.link {
  position: relative;
  color: var(--cobalt-600);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}

/* Underline animation */
.link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--ember-500);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--duration-base) var(--ease-out);
}

.link:hover {
  color: var(--cobalt-700);
}

.link:hover::after {
  transform: scaleX(1);
}

/* Animated arrow for external links */
.link-external::before {
  content: '↗';
  display: inline-block;
  margin-left: 4px;
  transition: transform var(--duration-fast) var(--ease-out);
}

.link-external:hover::before {
  transform: translate(2px, -2px);
}
```

### Card Interactions
```css
.card {
  transition: all var(--duration-base) var(--ease-out);
  transform-origin: center bottom;
}

.card:hover {
  transform: var(--motion-hover-lift);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

/* Staggered card entrance animations */
.card-grid .card {
  opacity: 0;
  transform: translateY(20px);
  animation: var(--motion-fade-in), var(--motion-slide-up);
  animation-fill-mode: forwards;
}

.card-grid .card:nth-child(1) { animation-delay: 0ms; }
.card-grid .card:nth-child(2) { animation-delay: 100ms; }
.card-grid .card:nth-child(3) { animation-delay: 200ms; }
.card-grid .card:nth-child(4) { animation-delay: 300ms; }
.card-grid .card:nth-child(5) { animation-delay: 400ms; }
.card-grid .card:nth-child(6) { animation-delay: 500ms; }

/* Card flip animation for tools showcase */
.card-flip {
  perspective: 1000px;
}

.card-flip-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform var(--duration-slow) var(--ease-out);
  transform-style: preserve-3d;
}

.card-flip:hover .card-flip-inner {
  transform: rotateY(180deg);
}

.card-flip-front,
.card-flip-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: inherit;
}

.card-flip-back {
  transform: rotateY(180deg);
}
```

### Form Interactions
```css
.form-field {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--neutral-200);
  border-radius: 8px;
  font-size: var(--text-base);
  transition: all var(--duration-fast) var(--ease-out);
  background: white;
}

/* Focus state */
.form-input:focus {
  outline: none;
  border-color: var(--cobalt-500);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  transform: translateY(-1px);
}

/* Valid state */
.form-input:valid {
  border-color: var(--success-500);
}

/* Invalid state */
.form-input:invalid {
  border-color: var(--error-500);
  animation: shake var(--duration-base) var(--ease-out);
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

/* Floating label animation */
.form-field-floating {
  position: relative;
}

.form-label-floating {
  position: absolute;
  top: 12px;
  left: 16px;
  font-size: var(--text-base);
  color: var(--neutral-500);
  pointer-events: none;
  transition: all var(--duration-fast) var(--ease-out);
  transform-origin: left;
}

.form-input:focus + .form-label-floating,
.form-input:not(:placeholder-shown) + .form-label-floating {
  top: -8px;
  left: 12px;
  font-size: var(--text-sm);
  color: var(--cobalt-600);
  background: white;
  padding: 0 4px;
  transform: scale(0.875);
}
```

## Component Animations

### Tab Transitions
```css
.tab-content {
  opacity: 0;
  transform: translateY(8px);
  transition: all var(--duration-base) var(--ease-out);
}

.tab-content.active {
  opacity: 1;
  transform: translateY(0);
}

/* Tab indicator sliding animation */
.tab-indicator {
  position: absolute;
  bottom: 0;
  height: 2px;
  background: var(--ember-500);
  transition: all var(--duration-base) var(--ease-out);
  border-radius: 1px;
}
```

### Accordion Animations
```css
.accordion-panel {
  overflow: hidden;
  transition: all var(--duration-base) var(--ease-out);
  max-height: 0;
  opacity: 0;
}

.accordion-panel.open {
  max-height: 500px; /* Adjust based on content */
  opacity: 1;
}

.accordion-trigger {
  transition: all var(--duration-fast) var(--ease-out);
}

.accordion-trigger[aria-expanded="true"] {
  color: var(--ember-600);
}

/* Arrow rotation */
.accordion-arrow {
  transition: transform var(--duration-fast) var(--ease-out);
}

.accordion-trigger[aria-expanded="true"] .accordion-arrow {
  transform: rotate(180deg);
}
```

### Modal Animations
```css
.modal-overlay {
  opacity: 0;
  transition: opacity var(--duration-base) var(--ease-out);
  backdrop-filter: blur(0px);
}

.modal-overlay.open {
  opacity: 1;
  backdrop-filter: blur(4px);
}

.modal-content {
  transform: scale(0.9) translateY(20px);
  opacity: 0;
  transition: all var(--duration-base) var(--ease-out);
}

.modal-overlay.open .modal-content {
  transform: scale(1) translateY(0);
  opacity: 1;
}
```

### Loading States
```css
/* Skeleton loading animation */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--neutral-200) 25%,
    var(--neutral-100) 50%,
    var(--neutral-200) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s ease infinite;
  border-radius: 4px;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Pulse loading for buttons */
.loading-pulse {
  animation: pulse 2s ease infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Spinner animation */
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid var(--neutral-200);
  border-top-color: var(--ember-500);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Progress bar animation */
.progress-bar {
  position: relative;
  overflow: hidden;
  background: var(--neutral-100);
  border-radius: 4px;
  height: 8px;
}

.progress-fill {
  height: 100%;
  background: var(--ember-500);
  border-radius: inherit;
  transition: width var(--duration-slow) var(--ease-out);
  position: relative;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 100%
  );
  animation: progress-shimmer 2s ease infinite;
}

@keyframes progress-shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

## Scroll Animations

### Intersection Observer Animations
```javascript
// File: src/utils/scroll-animations.js
export function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe elements with animation classes
  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });
}

// CSS for scroll animations
const SCROLL_ANIMATIONS = `
  [data-animate] {
    opacity: 0;
    transform: translateY(30px);
    transition: all var(--duration-slow) var(--ease-out);
  }

  [data-animate].animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  [data-animate="fade"] {
    transform: none;
  }

  [data-animate="slide-left"] {
    transform: translateX(-30px);
  }

  [data-animate="slide-right"] {
    transform: translateX(30px);
  }

  [data-animate="scale"] {
    transform: scale(0.9);
  }

  [data-animate="scale"].animate-in {
    transform: scale(1);
  }
`;
```

### Staggered Animations
```css
/* Stagger utility for lists and grids */
.stagger-children > * {
  opacity: 0;
  transform: translateY(20px);
  animation: var(--motion-fade-in), var(--motion-slide-up);
  animation-fill-mode: forwards;
  animation-delay: calc(var(--stagger-delay, 100ms) * var(--index, 0));
}

/* Progressive reveal for content blocks */
.progressive-reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: all var(--duration-slow) var(--ease-out);
}

.progressive-reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Stats counter animation */
.stat-number {
  font-variant-numeric: tabular-nums;
}

.stat-number[data-animate-number] {
  animation: countUp var(--duration-slower) var(--ease-out);
}

@keyframes countUp {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

## Page Transitions

### Route Change Animations
```css
.page-transition-enter {
  opacity: 0;
  transform: translateY(20px);
}

.page-transition-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: all var(--duration-base) var(--ease-out);
}

.page-transition-exit {
  opacity: 1;
  transform: translateY(0);
}

.page-transition-exit-active {
  opacity: 0;
  transform: translateY(-20px);
  transition: all var(--duration-fast) var(--ease-in);
}
```

## Interactive Feedback

### Success/Error Animations
```css
/* Success checkmark animation */
.success-checkmark {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--success-500);
  position: relative;
}

.success-checkmark::after {
  content: '';
  position: absolute;
  top: 6px;
  left: 9px;
  width: 6px;
  height: 12px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  animation: checkmark var(--duration-base) var(--ease-bounce);
}

@keyframes checkmark {
  0% {
    height: 0;
    width: 0;
    opacity: 1;
  }
  20% {
    height: 0;
    width: 6px;
    opacity: 1;
  }
  40% {
    height: 12px;
    width: 6px;
    opacity: 1;
  }
  100% {
    height: 12px;
    width: 6px;
    opacity: 1;
  }
}

/* Error shake animation */
.error-shake {
  animation: errorShake var(--duration-base) var(--ease-out);
}

@keyframes errorShake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  75% { transform: translateX(8px); }
}

/* Notification slide-in */
.notification {
  transform: translateX(100%);
  opacity: 0;
  transition: all var(--duration-base) var(--ease-out);
}

.notification.show {
  transform: translateX(0);
  opacity: 1;
}

.notification.hide {
  transform: translateX(100%);
  opacity: 0;
  transition: all var(--duration-fast) var(--ease-in);
}
```

## Performance Optimization

### Animation Performance
```css
/* Use transform and opacity for better performance */
.performant-animation {
  will-change: transform, opacity;
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Avoid animating expensive properties */
.avoid-layout-thrashing {
  /* Good: Only transforms and opacity */
  transition: transform var(--duration-base) var(--ease-out),
              opacity var(--duration-base) var(--ease-out);

  /* Avoid: These cause layout/paint */
  /* transition: width, height, top, left; */
}

/* Use CSS containment for isolated animations */
.animation-container {
  contain: layout style paint;
}
```

### Hardware Acceleration
```css
.hardware-accelerated {
  transform: translateZ(0); /* Force layer creation */
  /* or */
  will-change: transform; /* Hint to browser */
}

/* Clean up after animation */
@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

.slide-in-element {
  animation: slideIn var(--duration-base) var(--ease-out) forwards;
}

.slide-in-element.animation-complete {
  will-change: auto; /* Remove hint after animation */
}
```

## Implementation in Wix Studio

### JavaScript Animation Helpers
```javascript
// File: src/utils/animations.js
export function animateElement(element, animation, options = {}) {
  const {
    duration = 250,
    easing = 'ease-out',
    delay = 0,
    callback = null
  } = options;

  return new Promise((resolve) => {
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.style.transition = 'none';
      if (callback) callback();
      resolve();
      return;
    }

    element.style.transition = `all ${duration}ms ${easing}`;

    if (delay > 0) {
      setTimeout(() => {
        element.classList.add(animation);
      }, delay);
    } else {
      element.classList.add(animation);
    }

    setTimeout(() => {
      if (callback) callback();
      resolve();
    }, duration + delay);
  });
}

export function staggerAnimation(elements, animation, staggerDelay = 100) {
  return Promise.all(
    Array.from(elements).map((element, index) =>
      animateElement(element, animation, { delay: index * staggerDelay })
    )
  );
}

// Number counting animation
export function animateNumber(element, endValue, duration = 1000) {
  const startValue = 0;
  const startTime = performance.now();

  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function (ease-out)
    const easedProgress = 1 - Math.pow(1 - progress, 3);

    const currentValue = Math.round(startValue + (endValue - startValue) * easedProgress);
    element.text = currentValue.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    }
  }

  requestAnimationFrame(updateNumber);
}
```

### Wix-Specific Implementation
```javascript
// File: src/components/AnimatedComponents.js
$w.onReady(function () {
  initializeAnimations();
});

function initializeAnimations() {
  // Animate stats on scroll into view
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statValue = entry.target.querySelector('[data-stat-value]');
        const endValue = parseInt(statValue.getAttribute('data-end-value'));
        animateNumber(statValue, endValue);
        statsObserver.unobserve(entry.target);
      }
    });
  });

  $w('[data-animate-stats]').forEach(stat => {
    statsObserver.observe(stat);
  });

  // Stagger card animations
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.card');
        staggerAnimation(cards, 'animate-in', 150);
        cardObserver.unobserve(entry.target);
      }
    });
  });

  $w('[data-stagger-cards]').forEach(container => {
    cardObserver.observe(container);
  });
}
```

## Accessibility Considerations

### Motion Sensitivity
```css
@media (prefers-reduced-motion: reduce) {
  /* Remove all animations for sensitive users */
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* Keep essential animations but make them instant */
  .focus-indicator {
    transition: none;
  }

  .loading-spinner {
    animation: none;
  }

  /* Provide alternative feedback for reduced motion users */
  .success-checkmark {
    animation: none;
  }

  .success-checkmark::after {
    animation: none;
    opacity: 1;
  }
}

/* Alternative reduced motion styles */
@media (prefers-reduced-motion: reduce) {
  .card:hover {
    transform: none;
    outline: 2px solid var(--ember-500);
  }

  .button:hover {
    transform: none;
    background-color: var(--ember-600);
  }
}
```

## Implementation Checklist

### Animation Foundation
- [ ] Timing and easing variables defined
- [ ] Motion tokens implemented
- [ ] Reduced motion preferences respected
- [ ] Performance optimization applied

### Micro-Interactions
- [ ] Button hover and focus states
- [ ] Link underline animations
- [ ] Form field interactions
- [ ] Loading state animations

### Component Animations
- [ ] Tab transitions
- [ ] Accordion expand/collapse
- [ ] Modal enter/exit
- [ ] Card hover effects

### Scroll Animations
- [ ] Intersection observer setup
- [ ] Staggered entrance animations
- [ ] Progressive content reveal
- [ ] Number counting animations

### Accessibility
- [ ] Reduced motion support
- [ ] Alternative feedback methods
- [ ] Focus management
- [ ] Screen reader compatibility

### Performance
- [ ] Hardware acceleration utilized
- [ ] Layout thrashing avoided
- [ ] Animation cleanup implemented
- [ ] 60fps target maintained