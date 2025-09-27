# FHIR IQ Brand & Design System Guidelines

## Brand Philosophy

### Design Principles
**Modern, Authentic, High-Trust**
- **Low-gloss, High-craft**: Substance over flashiness
- **Authentic Authority**: Real expertise, not marketing veneer
- **Trustworthy Innovation**: Cutting-edge but reliable
- **Accessible Excellence**: Professional without pretension

### Visual Language
- Clean, purposeful layouts with breathing room
- Subtle depth through shadows, not gradients
- Authentic photography over generic stock
- Data visualizations that inform, not just decorate
- Typography that respects the reader

## Color System

### Primary Palette

#### Neutral Foundation
```css
:root {
  /* Slate/Stone Neutrals - Primary UI colors */
  --neutral-50:  #FAFAF9;   /* Off-white backgrounds */
  --neutral-100: #F5F5F4;   /* Light backgrounds */
  --neutral-200: #E7E5E4;   /* Borders, dividers */
  --neutral-300: #D6D3D1;   /* Disabled states */
  --neutral-400: #A8A29E;   /* Placeholder text */
  --neutral-500: #78716C;   /* Secondary text */
  --neutral-600: #57534E;   /* Body text */
  --neutral-700: #44403C;   /* Emphasized text */
  --neutral-800: #292524;   /* Headlines */
  --neutral-900: #1C1917;   /* Maximum emphasis */
  --neutral-950: #0C0A09;   /* True black (sparingly) */
}
```

#### Brand Accents
```css
:root {
  /* Ember/Orange - FHIR-adjacent primary accent */
  --ember-50:  #FFF7ED;
  --ember-100: #FFEDD5;
  --ember-200: #FED7AA;
  --ember-300: #FDBA74;
  --ember-400: #FB923C;
  --ember-500: #F97316;  /* Primary ember */
  --ember-600: #EA580C;
  --ember-700: #C2410C;
  --ember-800: #9A3412;
  --ember-900: #7C2D12;

  /* Cobalt - Secondary accent for trust/authority */
  --cobalt-50:  #EFF6FF;
  --cobalt-100: #DBEAFE;
  --cobalt-200: #BFDBFE;
  --cobalt-300: #93C5FD;
  --cobalt-400: #60A5FA;
  --cobalt-500: #3B82F6;  /* Primary cobalt */
  --cobalt-600: #2563EB;
  --cobalt-700: #1D4ED8;
  --cobalt-800: #1E40AF;
  --cobalt-900: #1E3A8A;
}
```

#### Semantic Colors
```css
:root {
  /* Success - Mint */
  --success-50:  #F0FDF4;
  --success-100: #DCFCE7;
  --success-200: #BBF7D0;
  --success-300: #86EFAC;
  --success-400: #4ADE80;
  --success-500: #22C55E;  /* Primary success */
  --success-600: #16A34A;
  --success-700: #15803D;

  /* Warning - Amber */
  --warning-50:  #FFFBEB;
  --warning-100: #FEF3C7;
  --warning-200: #FDE68A;
  --warning-300: #FCD34D;
  --warning-400: #FBBF24;
  --warning-500: #F59E0B;  /* Primary warning */
  --warning-600: #D97706;
  --warning-700: #B45309;

  /* Error - Rose */
  --error-50:  #FEF2F2;
  --error-100: #FEE2E2;
  --error-200: #FECACA;
  --error-300: #FCA5A5;
  --error-400: #F87171;
  --error-500: #EF4444;  /* Primary error */
  --error-600: #DC2626;
  --error-700: #B91C1C;
}
```

### Color Usage Guidelines

```javascript
const COLOR_USAGE = {
  backgrounds: {
    primary: 'neutral-50',      // Main background
    secondary: 'neutral-100',   // Section backgrounds
    elevated: 'white',          // Cards, modals
    inverse: 'neutral-900'      // Dark sections
  },

  text: {
    primary: 'neutral-800',     // Headlines
    body: 'neutral-600',        // Body text
    secondary: 'neutral-500',   // Secondary text
    disabled: 'neutral-400',    // Disabled state
    inverse: 'neutral-50'       // On dark backgrounds
  },

  interactive: {
    primary_cta: 'ember-500',   // Primary buttons, CTAs
    secondary_cta: 'cobalt-500', // Secondary actions
    links: 'cobalt-600',        // Text links
    hover: 'ember-600',         // Hover states
    focus: 'cobalt-500'         // Focus indicators
  },

  feedback: {
    success: 'success-500',
    warning: 'warning-500',
    error: 'error-500',
    info: 'cobalt-500'
  }
};
```

## Typography

### Font Families
```css
:root {
  /* UI Typography - Clean, modern, readable */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
               'Helvetica Neue', Arial, sans-serif;

  /* Alternative: Satoshi for more personality */
  --font-alt: 'Satoshi', 'Inter', -apple-system, sans-serif;

  /* Long-form Reading - Editorial feel */
  --font-serif: 'Newsreader', 'Source Serif Pro', Georgia, serif;

  /* Code - Monospace */
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Source Code Pro', monospace;
}
```

### Type Scale
```css
:root {
  /* Fluid type scale using clamp() for responsive typography */
  --text-xs:   clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);    /* 12-14px */
  --text-sm:   clamp(0.875rem, 0.825rem + 0.25vw, 1rem);     /* 14-16px */
  --text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);      /* 16-18px */
  --text-lg:   clamp(1.125rem, 1.05rem + 0.375vw, 1.25rem);  /* 18-20px */
  --text-xl:   clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem);      /* 20-24px */
  --text-2xl:  clamp(1.5rem, 1.35rem + 0.75vw, 1.875rem);    /* 24-30px */
  --text-3xl:  clamp(1.875rem, 1.65rem + 1.125vw, 2.25rem);  /* 30-36px */
  --text-4xl:  clamp(2.25rem, 1.9rem + 1.75vw, 3rem);        /* 36-48px */
  --text-5xl:  clamp(3rem, 2.5rem + 2.5vw, 3.75rem);         /* 48-60px */
}
```

### Typography Styles
```css
/* Headlines - Sans serif, strong */
.headline-1 {
  font-family: var(--font-sans);
  font-size: var(--text-4xl);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--neutral-900);
}

.headline-2 {
  font-family: var(--font-sans);
  font-size: var(--text-3xl);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: var(--neutral-800);
}

.headline-3 {
  font-family: var(--font-sans);
  font-size: var(--text-2xl);
  font-weight: 600;
  line-height: 1.3;
  color: var(--neutral-800);
}

/* Body Text - Optimized for reading */
.body-default {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: 400;
  line-height: 1.6;
  color: var(--neutral-600);
}

.body-large {
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  font-weight: 400;
  line-height: 1.7;
  color: var(--neutral-600);
}

/* Long-form Content - Serif for readability */
.article-body {
  font-family: var(--font-serif);
  font-size: var(--text-lg);
  font-weight: 400;
  line-height: 1.8;
  color: var(--neutral-700);
  max-width: 65ch; /* Optimal reading width */
}

/* UI Text - Clean and functional */
.ui-label {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 500;
  letter-spacing: 0.01em;
  color: var(--neutral-700);
}

.ui-caption {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 400;
  color: var(--neutral-500);
}
```

## Component Library

### Card Component
```css
.card {
  background: white;
  border: 1px solid var(--neutral-200);
  border-radius: 12px;
  padding: 24px;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.card-icon {
  width: 40px;
  height: 40px;
  padding: 8px;
  background: var(--ember-50);
  border-radius: 8px;
  color: var(--ember-600);
}

.card-title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--neutral-800);
}

.card-description {
  font-size: var(--text-base);
  line-height: 1.6;
  color: var(--neutral-600);
}
```

### Stat Block Component
```css
.stat-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
  background: var(--neutral-50);
  border-radius: 8px;
}

.stat-value {
  font-family: var(--font-sans);
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--ember-600);
  line-height: 1;
}

.stat-label {
  font-size: var(--text-sm);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--neutral-500);
}

.stat-change {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: var(--text-sm);
  font-weight: 500;
}

.stat-change.positive {
  color: var(--success-600);
}

.stat-change.negative {
  color: var(--error-600);
}
```

### Tabbed Section Component
```css
.tabs {
  border-bottom: 1px solid var(--neutral-200);
}

.tabs-list {
  display: flex;
  gap: 32px;
  margin-bottom: -1px;
}

.tab-trigger {
  padding: 12px 4px;
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--neutral-600);
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-trigger:hover {
  color: var(--neutral-800);
}

.tab-trigger[aria-selected="true"] {
  color: var(--ember-600);
  border-bottom-color: var(--ember-500);
}

.tab-content {
  padding: 32px 0;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### Code Block Component
```css
.code-block {
  position: relative;
  background: var(--neutral-950);
  border-radius: 8px;
  overflow: hidden;
  font-family: var(--font-mono);
  font-size: 14px;
  line-height: 1.6;
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: var(--neutral-900);
  border-bottom: 1px solid var(--neutral-800);
}

.code-language {
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--neutral-400);
  text-transform: uppercase;
}

.code-copy {
  padding: 4px 8px;
  font-size: var(--text-xs);
  color: var(--neutral-400);
  background: var(--neutral-800);
  border: 1px solid var(--neutral-700);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.code-copy:hover {
  color: var(--neutral-200);
  background: var(--neutral-700);
}

.code-content {
  padding: 16px;
  overflow-x: auto;
  color: var(--neutral-200);
}

/* Syntax highlighting */
.token.keyword { color: #F472B6; }
.token.string { color: #A5F3FC; }
.token.number { color: #FDE68A; }
.token.comment { color: var(--neutral-500); }
.token.function { color: #C084FC; }
```

### Timeline Component
```css
.timeline {
  position: relative;
  padding-left: 32px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background: var(--neutral-200);
}

.timeline-item {
  position: relative;
  margin-bottom: 32px;
}

.timeline-marker {
  position: absolute;
  left: -24px;
  top: 8px;
  width: 16px;
  height: 16px;
  background: white;
  border: 2px solid var(--ember-500);
  border-radius: 50%;
}

.timeline-item.completed .timeline-marker {
  background: var(--ember-500);
}

.timeline-content {
  padding: 8px 16px;
  background: var(--neutral-50);
  border-radius: 8px;
}

.timeline-date {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--neutral-500);
  margin-bottom: 4px;
}

.timeline-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--neutral-800);
  margin-bottom: 8px;
}

.timeline-description {
  font-size: var(--text-base);
  color: var(--neutral-600);
}
```

### Steps Component
```css
.steps {
  display: flex;
  justify-content: space-between;
  margin-bottom: 48px;
}

.step {
  flex: 1;
  position: relative;
  text-align: center;
}

.step:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 20px;
  left: 50%;
  width: 100%;
  height: 2px;
  background: var(--neutral-200);
}

.step.completed:not(:last-child)::after {
  background: var(--ember-500);
}

.step-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: white;
  border: 2px solid var(--neutral-300);
  border-radius: 50%;
  font-weight: 600;
  color: var(--neutral-600);
  position: relative;
  z-index: 1;
}

.step.active .step-number {
  background: var(--ember-500);
  border-color: var(--ember-500);
  color: white;
}

.step.completed .step-number {
  background: var(--success-500);
  border-color: var(--success-500);
  color: white;
}

.step-label {
  margin-top: 12px;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--neutral-600);
}
```

### Pricing Component
```css
.pricing-card {
  background: white;
  border: 2px solid var(--neutral-200);
  border-radius: 12px;
  padding: 32px;
  position: relative;
  transition: all 0.3s ease;
}

.pricing-card.featured {
  border-color: var(--ember-500);
  transform: scale(1.05);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.pricing-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 16px;
  background: var(--ember-500);
  color: white;
  border-radius: 20px;
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.pricing-tier {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--neutral-800);
  margin-bottom: 8px;
}

.pricing-price {
  display: flex;
  align-items: baseline;
  margin-bottom: 24px;
}

.pricing-currency {
  font-size: var(--text-xl);
  color: var(--neutral-600);
}

.pricing-amount {
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--neutral-900);
  margin: 0 4px;
}

.pricing-period {
  font-size: var(--text-base);
  color: var(--neutral-500);
}

.pricing-features {
  list-style: none;
  padding: 0;
  margin: 24px 0;
}

.pricing-feature {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  font-size: var(--text-base);
  color: var(--neutral-600);
}

.pricing-feature::before {
  content: '✓';
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: var(--success-50);
  color: var(--success-600);
  border-radius: 50%;
  font-size: 12px;
  font-weight: bold;
  flex-shrink: 0;
}

.pricing-cta {
  width: 100%;
  padding: 12px 24px;
  font-size: var(--text-base);
  font-weight: 600;
  color: white;
  background: var(--ember-500);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pricing-cta:hover {
  background: var(--ember-600);
  transform: translateY(-1px);
}
```

### Testimonial Carousel Component
```css
.testimonial-carousel {
  position: relative;
  overflow: hidden;
  padding: 40px 0;
}

.testimonial-track {
  display: flex;
  transition: transform 0.5s ease;
}

.testimonial-slide {
  flex: 0 0 100%;
  padding: 0 20px;
}

.testimonial-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.testimonial-quote {
  font-family: var(--font-serif);
  font-size: var(--text-xl);
  line-height: 1.6;
  color: var(--neutral-700);
  margin-bottom: 24px;
  position: relative;
}

.testimonial-quote::before {
  content: '"';
  position: absolute;
  top: -20px;
  left: -40px;
  font-size: 80px;
  color: var(--ember-200);
  font-family: var(--font-serif);
}

.testimonial-author {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.testimonial-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.testimonial-info {
  text-align: left;
}

.testimonial-name {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--neutral-800);
}

.testimonial-role {
  font-size: var(--text-sm);
  color: var(--neutral-500);
}

.testimonial-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
}

.testimonial-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--neutral-300);
  cursor: pointer;
  transition: all 0.3s ease;
}

.testimonial-dot.active {
  width: 24px;
  border-radius: 4px;
  background: var(--ember-500);
}
```

### Partner Grid Component
```css
.partner-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1px;
  background: var(--neutral-200);
  border: 1px solid var(--neutral-200);
  border-radius: 12px;
  overflow: hidden;
}

.partner-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background: white;
  transition: all 0.3s ease;
}

.partner-item:hover {
  background: var(--neutral-50);
}

.partner-logo {
  max-width: 120px;
  max-height: 40px;
  filter: grayscale(100%);
  opacity: 0.6;
  transition: all 0.3s ease;
}

.partner-item:hover .partner-logo {
  filter: grayscale(0%);
  opacity: 1;
}
```

### CTA Bar Component
```css
.cta-bar {
  background: linear-gradient(135deg, var(--ember-50) 0%, var(--neutral-50) 100%);
  border: 1px solid var(--ember-100);
  border-radius: 12px;
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.cta-content {
  flex: 1;
}

.cta-title {
  font-size: var(--text-2xl);
  font-weight: 600;
  color: var(--neutral-900);
  margin-bottom: 8px;
}

.cta-description {
  font-size: var(--text-lg);
  color: var(--neutral-600);
}

.cta-actions {
  display: flex;
  gap: 12px;
}

.cta-button {
  padding: 12px 24px;
  font-size: var(--text-base);
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.cta-button.primary {
  background: var(--ember-500);
  color: white;
}

.cta-button.primary:hover {
  background: var(--ember-600);
  transform: translateY(-1px);
}

.cta-button.secondary {
  background: white;
  color: var(--ember-600);
  border: 1px solid var(--ember-200);
}

.cta-button.secondary:hover {
  background: var(--ember-50);
}
```

## Motion & Interactions

### Animation Principles
```css
/* Subtle, purposeful animations */
:root {
  --ease-out: cubic-bezier(0.215, 0.61, 0.355, 1);
  --ease-in-out: cubic-bezier(0.645, 0.045, 0.355, 1);
  --duration-fast: 150ms;
  --duration-base: 250ms;
  --duration-slow: 350ms;
}

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Micro-interactions
```css
/* Button interactions */
.button {
  transition: all var(--duration-fast) var(--ease-out);
}

.button:hover {
  transform: translateY(-1px);
}

.button:active {
  transform: translateY(0);
}

/* Link hover effect */
.link {
  position: relative;
  color: var(--cobalt-600);
  text-decoration: none;
  transition: color var(--duration-fast) ease;
}

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

.link:hover::after {
  transform: scaleX(1);
}

/* Focus states */
:focus-visible {
  outline: 2px solid var(--cobalt-500);
  outline-offset: 2px;
}

/* Loading states */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--neutral-200) 25%,
    var(--neutral-100) 50%,
    var(--neutral-200) 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s ease infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

## Accessibility Standards

### WCAG 2.2 AA Compliance
```css
/* Minimum contrast ratios */
.text-contrast {
  /* Normal text: 4.5:1 minimum */
  /* Large text (18pt+): 3:1 minimum */
  /* UI components: 3:1 minimum */
}

/* Focus indicators */
:focus-visible {
  outline: 2px solid var(--cobalt-500);
  outline-offset: 2px;
  border-radius: 2px;
}

/* Skip to main content */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  padding: 8px;
  background: var(--neutral-900);
  color: white;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

### ARIA Implementation
```html
<!-- Accordion example -->
<div class="accordion" role="region" aria-labelledby="accordion-heading">
  <h3 id="accordion-heading">FAQ</h3>
  <button
    class="accordion-trigger"
    aria-expanded="false"
    aria-controls="panel-1"
  >
    Question 1
  </button>
  <div
    id="panel-1"
    class="accordion-panel"
    role="region"
    aria-labelledby="trigger-1"
    hidden
  >
    Answer content
  </div>
</div>

<!-- Tab example -->
<div class="tabs">
  <div role="tablist" aria-label="Features">
    <button
      role="tab"
      aria-selected="true"
      aria-controls="panel-1"
      id="tab-1"
    >
      Tab 1
    </button>
  </div>
  <div
    role="tabpanel"
    id="panel-1"
    aria-labelledby="tab-1"
  >
    Content
  </div>
</div>
```

## Performance Standards

### Core Web Vitals Targets
```javascript
const PERFORMANCE_TARGETS = {
  LCP: {
    target: '< 2.5s',
    good: '< 2.5s',
    needsImprovement: '2.5s - 4s',
    poor: '> 4s'
  },
  FID: {
    target: '< 100ms',
    good: '< 100ms',
    needsImprovement: '100ms - 300ms',
    poor: '> 300ms'
  },
  CLS: {
    target: '< 0.1',
    good: '< 0.1',
    needsImprovement: '0.1 - 0.25',
    poor: '> 0.25'
  }
};
```

### Performance Optimization
```html
<!-- Image lazy loading -->
<img
  src="placeholder.jpg"
  data-src="actual-image.jpg"
  loading="lazy"
  alt="Description"
/>

<!-- Font preloading -->
<link rel="preload" href="/fonts/Inter-Regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/Newsreader-Regular.woff2" as="font" type="font/woff2" crossorigin>

<!-- Critical CSS inline -->
<style>
  /* Critical above-the-fold styles */
</style>
```

### Resource Optimization
```javascript
// Image optimization settings
const IMAGE_OPTIMIZATION = {
  formats: ['webp', 'avif', 'jpg'],
  sizes: {
    thumbnail: 150,
    small: 300,
    medium: 600,
    large: 1200,
    hero: 1920
  },
  quality: {
    webp: 85,
    avif: 80,
    jpg: 85
  }
};

// Static rendering strategy
const RENDERING_STRATEGY = {
  static: ['homepage', 'about', 'services', 'contact'],
  dynamic: ['blog', 'tools', 'dashboard'],
  hybrid: ['product pages with static header/footer']
};
```

## Implementation Checklist

### Brand Foundation
- [ ] Color system implemented with CSS custom properties
- [ ] Typography scale responsive and fluid
- [ ] Font files optimized and preloaded
- [ ] Brand voice guidelines documented

### Components
- [ ] All components built and tested
- [ ] Responsive behavior verified
- [ ] Dark mode variants considered
- [ ] Component documentation complete

### Accessibility
- [ ] WCAG 2.2 AA compliance verified
- [ ] Keyboard navigation fully functional
- [ ] Screen reader testing completed
- [ ] Focus states properly implemented

### Performance
- [ ] LCP < 2.5s on 4G connection
- [ ] CLS < 0.1 across all pages
- [ ] Images lazy-loaded and optimized
- [ ] Critical CSS extracted and inlined

### Motion
- [ ] Animations respect prefers-reduced-motion
- [ ] Micro-interactions enhance not distract
- [ ] Loading states implemented
- [ ] Transitions smooth and purposeful