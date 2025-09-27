# Wix Studio Implementation Guide

## Overview

This guide provides specific instructions for implementing the FHIR IQ design system in Wix Studio, translating our design specifications into Wix's component and styling system.

## Wix Studio Setup

### Design Tokens in Wix
```javascript
// Wix Global Site Colors
const WIX_COLOR_PALETTE = {
  // Primary Colors
  'color-1': '#F97316',   // ember-500 (primary)
  'color-2': '#EA580C',   // ember-600 (hover)
  'color-3': '#3B82F6',   // cobalt-500 (secondary)
  'color-4': '#2563EB',   // cobalt-600 (secondary hover)
  'color-5': '#22C55E',   // success-500

  // Neutral Colors
  'color-6': '#1C1917',   // neutral-900 (text primary)
  'color-7': '#57534E',   // neutral-600 (text body)
  'color-8': '#A8A29E',   // neutral-400 (text secondary)
  'color-9': '#E7E5E4',   // neutral-200 (borders)
  'color-10': '#FAFAF9',  // neutral-50 (backgrounds)

  // Semantic Colors
  'color-11': '#F59E0B',  // warning-500
  'color-12': '#EF4444',  // error-500
  'color-13': '#FFFFFF',  // white
  'color-14': '#000000',  // black
  'color-15': '#F5F5F4'   // neutral-100
};

// Wix Font Assignments
const WIX_FONTS = {
  'font-1': 'Inter',      // Primary UI font
  'font-2': 'Newsreader', // Long-form content
  'font-3': 'Inter',      // Alternative/backup
  'font-4': 'JetBrains Mono', // Code font
  'font-5': 'Inter'       // Additional slot
};
```

### Theme Configuration
```javascript
// File: public/global-styles.js
export function configureWixTheme() {
  // Apply global CSS custom properties
  document.documentElement.style.setProperty('--ember-500', '#F97316');
  document.documentElement.style.setProperty('--cobalt-500', '#3B82F6');
  document.documentElement.style.setProperty('--neutral-600', '#57534E');
  // ... continue for all design tokens
}
```

## Component Implementation in Wix

### Card Component
```javascript
// File: src/components/Card.js
import wixWindow from 'wix-window';

$w.onReady(function () {
  // Initialize all card components
  $w('[data-card]').forEach(initializeCard);
});

function initializeCard(card) {
  // Add hover effects
  card.onMouseIn(() => {
    card.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
    card.style.transform = 'translateY(-2px)';
  });

  card.onMouseOut(() => {
    card.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.04)';
    card.style.transform = 'translateY(0)';
  });
}

// Wix Editor Settings for Card
const CARD_SETTINGS = {
  element: 'container',
  background: '#FFFFFF',
  border: '1px solid #E7E5E4',
  borderRadius: '12px',
  padding: '24px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
};
```

### Button Components
```javascript
// File: src/components/Button.js
$w.onReady(function () {
  initializeButtons();
});

function initializeButtons() {
  // Primary buttons
  $w('[data-button="primary"]').forEach(button => {
    button.style.backgroundColor = '#F97316'; // ember-500
    button.style.color = '#FFFFFF';
    button.style.borderRadius = '8px';
    button.style.padding = '12px 24px';
    button.style.fontWeight = '600';
    button.style.transition = 'all 0.2s ease';

    button.onMouseIn(() => {
      button.style.backgroundColor = '#EA580C'; // ember-600
      button.style.transform = 'translateY(-1px)';
    });

    button.onMouseOut(() => {
      button.style.backgroundColor = '#F97316';
      button.style.transform = 'translateY(0)';
    });
  });

  // Secondary buttons
  $w('[data-button="secondary"]').forEach(button => {
    button.style.backgroundColor = '#FFFFFF';
    button.style.color = '#F97316';
    button.style.border = '1px solid #F97316';
    button.style.borderRadius = '8px';
    button.style.padding = '12px 24px';
    button.style.fontWeight = '600';

    button.onMouseIn(() => {
      button.style.backgroundColor = '#FFF7ED'; // ember-50
    });

    button.onMouseOut(() => {
      button.style.backgroundColor = '#FFFFFF';
    });
  });
}
```

### Stats Block Component
```javascript
// File: src/components/StatsBlock.js
export function createStatsBlock(container, data) {
  container.style.background = '#FAFAF9'; // neutral-50
  container.style.borderRadius = '8px';
  container.style.padding = '20px';
  container.style.textAlign = 'center';

  // Stat value
  const valueElement = container.querySelector('[data-stat-value]');
  if (valueElement) {
    valueElement.style.fontSize = 'clamp(1.875rem, 1.65rem + 1.125vw, 2.25rem)';
    valueElement.style.fontWeight = '700';
    valueElement.style.color = '#F97316'; // ember-600
    valueElement.style.lineHeight = '1';
    valueElement.text = data.value;
  }

  // Stat label
  const labelElement = container.querySelector('[data-stat-label]');
  if (labelElement) {
    labelElement.style.fontSize = '0.875rem';
    labelElement.style.fontWeight = '500';
    labelElement.style.textTransform = 'uppercase';
    labelElement.style.letterSpacing = '0.05em';
    labelElement.style.color = '#A8A29E'; // neutral-400
    labelElement.style.marginTop = '8px';
    labelElement.text = data.label;
  }
}

// Usage in page code
$w.onReady(function () {
  const statsData = [
    { value: '500+', label: 'FHIR Apps Built' },
    { value: '99.9%', label: 'Data Quality' },
    { value: '10x', label: 'Faster Development' }
  ];

  statsData.forEach((data, index) => {
    const container = $w(`#statsBlock${index + 1}`);
    createStatsBlock(container, data);
  });
});
```

### Tabbed Sections
```javascript
// File: src/components/Tabs.js
$w.onReady(function () {
  initializeTabs();
});

function initializeTabs() {
  const tabContainers = $w('[data-tabs]');

  tabContainers.forEach(container => {
    const tabs = container.querySelectorAll('[data-tab-trigger]');
    const panels = container.querySelectorAll('[data-tab-panel]');

    tabs.forEach((tab, index) => {
      // Style tab triggers
      tab.style.padding = '12px 4px';
      tab.style.fontSize = '1rem';
      tab.style.fontWeight = '500';
      tab.style.color = '#57534E'; // neutral-600
      tab.style.background = 'transparent';
      tab.style.border = 'none';
      tab.style.borderBottom = '2px solid transparent';
      tab.style.cursor = 'pointer';
      tab.style.transition = 'all 0.2s ease';

      tab.onClick(() => {
        // Remove active state from all tabs
        tabs.forEach(t => {
          t.style.color = '#57534E';
          t.style.borderBottomColor = 'transparent';
        });

        // Hide all panels
        panels.forEach(p => p.hide());

        // Activate clicked tab
        tab.style.color = '#F97316'; // ember-600
        tab.style.borderBottomColor = '#F97316';

        // Show corresponding panel
        panels[index].show();
      });

      // Set first tab as active by default
      if (index === 0) {
        tab.style.color = '#F97316';
        tab.style.borderBottomColor = '#F97316';
        panels[index].show();
      } else {
        panels[index].hide();
      }
    });
  });
}
```

### Code Block Component
```javascript
// File: src/components/CodeBlock.js
export function createCodeBlock(container, code, language = 'javascript') {
  container.style.background = '#0C0A09'; // neutral-950
  container.style.borderRadius = '8px';
  container.style.overflow = 'hidden';
  container.style.fontFamily = 'JetBrains Mono, monospace';
  container.style.fontSize = '14px';
  container.style.lineHeight = '1.6';

  // Create header
  const header = container.querySelector('[data-code-header]');
  if (header) {
    header.style.display = 'flex';
    header.style.alignItems = 'center';
    header.style.justifyContent = 'space-between';
    header.style.padding = '12px 16px';
    header.style.background = '#292524'; // neutral-900
    header.style.borderBottom = '1px solid #44403C'; // neutral-800

    // Language label
    const langLabel = header.querySelector('[data-language]');
    if (langLabel) {
      langLabel.style.fontSize = '0.75rem';
      langLabel.style.fontWeight = '500';
      langLabel.style.color = '#A8A29E'; // neutral-400
      langLabel.style.textTransform = 'uppercase';
      langLabel.text = language;
    }

    // Copy button
    const copyBtn = header.querySelector('[data-copy-btn]');
    if (copyBtn) {
      copyBtn.style.padding = '4px 8px';
      copyBtn.style.fontSize = '0.75rem';
      copyBtn.style.color = '#A8A29E';
      copyBtn.style.background = '#44403C';
      copyBtn.style.border = '1px solid #57534E';
      copyBtn.style.borderRadius = '4px';
      copyBtn.style.cursor = 'pointer';

      copyBtn.onClick(() => {
        copyToClipboard(code);
        copyBtn.text = 'Copied!';
        setTimeout(() => {
          copyBtn.text = 'Copy';
        }, 2000);
      });
    }
  }

  // Create content area
  const content = container.querySelector('[data-code-content]');
  if (content) {
    content.style.padding = '16px';
    content.style.overflow = 'auto';
    content.style.color = '#E7E5E4'; // neutral-200
    content.html = highlightSyntax(code, language);
  }
}

function highlightSyntax(code, language) {
  // Basic syntax highlighting for common languages
  const keywords = {
    javascript: ['function', 'const', 'let', 'var', 'if', 'else', 'return', 'import', 'export'],
    python: ['def', 'class', 'if', 'else', 'elif', 'return', 'import', 'from'],
    json: []
  };

  let highlighted = code;

  // Highlight keywords
  if (keywords[language]) {
    keywords[language].forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      highlighted = highlighted.replace(regex, `<span style="color: #F472B6">${keyword}</span>`);
    });
  }

  // Highlight strings
  highlighted = highlighted.replace(/"([^"]*)"/g, '<span style="color: #A5F3FC">"$1"</span>');
  highlighted = highlighted.replace(/'([^']*)'/g, '<span style="color: #A5F3FC">\'$1\'</span>');

  // Highlight numbers
  highlighted = highlighted.replace(/\b\d+\b/g, '<span style="color: #FDE68A">$&</span>');

  // Highlight comments
  highlighted = highlighted.replace(/\/\/.*$/gm, '<span style="color: #A8A29E">$&</span>');
  highlighted = highlighted.replace(/\/\*[\s\S]*?\*\//g, '<span style="color: #A8A29E">$&</span>');

  return highlighted;
}

function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
}
```

### Timeline Component
```javascript
// File: src/components/Timeline.js
export function createTimeline(container, items) {
  container.style.position = 'relative';
  container.style.paddingLeft = '32px';

  // Create timeline line
  const line = document.createElement('div');
  line.style.position = 'absolute';
  line.style.left = '8px';
  line.style.top = '8px';
  line.style.bottom = '8px';
  line.style.width = '2px';
  line.style.background = '#E7E5E4'; // neutral-200
  container.appendChild(line);

  items.forEach((item, index) => {
    const timelineItem = container.querySelector(`[data-timeline-item="${index}"]`);
    if (!timelineItem) return;

    timelineItem.style.position = 'relative';
    timelineItem.style.marginBottom = '32px';

    // Create marker
    const marker = document.createElement('div');
    marker.style.position = 'absolute';
    marker.style.left = '-24px';
    marker.style.top = '8px';
    marker.style.width = '16px';
    marker.style.height = '16px';
    marker.style.background = item.completed ? '#F97316' : '#FFFFFF';
    marker.style.border = '2px solid #F97316';
    marker.style.borderRadius = '50%';
    timelineItem.appendChild(marker);

    // Style content
    const content = timelineItem.querySelector('[data-timeline-content]');
    if (content) {
      content.style.padding = '8px 16px';
      content.style.background = '#FAFAF9';
      content.style.borderRadius = '8px';
    }

    // Style date
    const date = timelineItem.querySelector('[data-timeline-date]');
    if (date) {
      date.style.fontSize = '0.875rem';
      date.style.fontWeight = '500';
      date.style.color = '#A8A29E';
      date.style.marginBottom = '4px';
      date.text = item.date;
    }

    // Style title
    const title = timelineItem.querySelector('[data-timeline-title]');
    if (title) {
      title.style.fontSize = '1.125rem';
      title.style.fontWeight = '600';
      title.style.color = '#44403C';
      title.style.marginBottom = '8px';
      title.text = item.title;
    }

    // Style description
    const description = timelineItem.querySelector('[data-timeline-description]');
    if (description) {
      description.style.fontSize = '1rem';
      description.style.color = '#57534E';
      description.text = item.description;
    }
  });
}
```

### Pricing Component
```javascript
// File: src/components/Pricing.js
export function createPricingCard(container, plan) {
  container.style.background = '#FFFFFF';
  container.style.border = plan.featured ? '2px solid #F97316' : '2px solid #E7E5E4';
  container.style.borderRadius = '12px';
  container.style.padding = '32px';
  container.style.position = 'relative';
  container.style.transition = 'all 0.3s ease';

  if (plan.featured) {
    container.style.transform = 'scale(1.05)';
    container.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';

    // Add featured badge
    const badge = document.createElement('div');
    badge.style.position = 'absolute';
    badge.style.top = '-12px';
    badge.style.left = '50%';
    badge.style.transform = 'translateX(-50%)';
    badge.style.padding = '4px 16px';
    badge.style.background = '#F97316';
    badge.style.color = '#FFFFFF';
    badge.style.borderRadius = '20px';
    badge.style.fontSize = '0.75rem';
    badge.style.fontWeight = '600';
    badge.style.textTransform = 'uppercase';
    badge.style.letterSpacing = '0.05em';
    badge.textContent = 'Popular';
    container.appendChild(badge);
  }

  // Plan name
  const planName = container.querySelector('[data-plan-name]');
  if (planName) {
    planName.style.fontSize = '1.25rem';
    planName.style.fontWeight = '600';
    planName.style.color = '#44403C';
    planName.style.marginBottom = '8px';
    planName.text = plan.name;
  }

  // Price
  const price = container.querySelector('[data-plan-price]');
  if (price) {
    price.style.display = 'flex';
    price.style.alignItems = 'baseline';
    price.style.marginBottom = '24px';

    const currency = price.querySelector('[data-currency]');
    if (currency) {
      currency.style.fontSize = '1.25rem';
      currency.style.color = '#57534E';
      currency.text = '$';
    }

    const amount = price.querySelector('[data-amount]');
    if (amount) {
      amount.style.fontSize = 'clamp(2.25rem, 1.9rem + 1.75vw, 3rem)';
      amount.style.fontWeight = '700';
      amount.style.color = '#1C1917';
      amount.style.margin = '0 4px';
      amount.text = plan.price;
    }

    const period = price.querySelector('[data-period]');
    if (period) {
      period.style.fontSize = '1rem';
      period.style.color = '#A8A29E';
      period.text = plan.period;
    }
  }

  // Features list
  const featuresList = container.querySelector('[data-features-list]');
  if (featuresList) {
    featuresList.style.listStyle = 'none';
    featuresList.style.padding = '0';
    featuresList.style.margin = '24px 0';

    plan.features.forEach(feature => {
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.alignItems = 'center';
      li.style.gap = '12px';
      li.style.padding = '8px 0';
      li.style.fontSize = '1rem';
      li.style.color = '#57534E';

      const checkmark = document.createElement('span');
      checkmark.style.display = 'flex';
      checkmark.style.alignItems = 'center';
      checkmark.style.justifyContent = 'center';
      checkmark.style.width = '20px';
      checkmark.style.height = '20px';
      checkmark.style.background = '#DCFCE7'; // success-100
      checkmark.style.color = '#16A34A'; // success-600
      checkmark.style.borderRadius = '50%';
      checkmark.style.fontSize = '12px';
      checkmark.style.fontWeight = 'bold';
      checkmark.textContent = '✓';

      li.appendChild(checkmark);
      li.appendChild(document.createTextNode(feature));
      featuresList.appendChild(li);
    });
  }

  // CTA button
  const ctaButton = container.querySelector('[data-cta-button]');
  if (ctaButton) {
    ctaButton.style.width = '100%';
    ctaButton.style.padding = '12px 24px';
    ctaButton.style.fontSize = '1rem';
    ctaButton.style.fontWeight = '600';
    ctaButton.style.color = '#FFFFFF';
    ctaButton.style.background = '#F97316';
    ctaButton.style.border = 'none';
    ctaButton.style.borderRadius = '8px';
    ctaButton.style.cursor = 'pointer';
    ctaButton.style.transition = 'all 0.2s ease';
    ctaButton.text = plan.ctaText;

    ctaButton.onMouseIn(() => {
      ctaButton.style.background = '#EA580C';
      ctaButton.style.transform = 'translateY(-1px)';
    });

    ctaButton.onMouseOut(() => {
      ctaButton.style.background = '#F97316';
      ctaButton.style.transform = 'translateY(0)';
    });
  }
}
```

## Responsive Implementation

### Breakpoint Strategy in Wix
```javascript
// File: src/utils/responsive.js
export const BREAKPOINTS = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
  wide: 1440
};

export function applyResponsiveStyles() {
  const isMobile = wixWindow.viewMode === 'mobile';
  const isTablet = wixWindow.viewMode === 'tablet';
  const isDesktop = wixWindow.viewMode === 'desktop';

  if (isMobile) {
    // Apply mobile-specific styles
    $w('[data-responsive]').forEach(element => {
      element.style.padding = '16px';
      element.style.fontSize = '14px';
    });
  } else if (isTablet) {
    // Apply tablet-specific styles
    $w('[data-responsive]').forEach(element => {
      element.style.padding = '20px';
      element.style.fontSize = '16px';
    });
  } else {
    // Apply desktop styles
    $w('[data-responsive]').forEach(element => {
      element.style.padding = '24px';
      element.style.fontSize = '16px';
    });
  }
}

// Initialize responsive behavior
$w.onReady(function () {
  applyResponsiveStyles();

  // Listen for viewport changes
  wixWindow.onViewportEnter('mobile', applyResponsiveStyles);
  wixWindow.onViewportEnter('tablet', applyResponsiveStyles);
  wixWindow.onViewportEnter('desktop', applyResponsiveStyles);
});
```

## Performance Optimization

### Image Optimization
```javascript
// File: src/utils/images.js
export function optimizeImages() {
  $w('Image').forEach(img => {
    // Enable lazy loading
    img.fitMode = 'fitAndCrop';
    img.displayMode = 'fit';

    // Set appropriate quality based on device
    const isHighDPI = window.devicePixelRatio > 1;
    img.quality = isHighDPI ? 85 : 80;

    // Implement progressive loading
    img.onLoad(() => {
      img.style.opacity = '1';
      img.style.filter = 'none';
    });

    // Initial state for progressive loading
    img.style.opacity = '0';
    img.style.filter = 'blur(5px)';
    img.style.transition = 'opacity 0.3s ease, filter 0.3s ease';
  });
}
```

### Font Loading Optimization
```html
<!-- In site header -->
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" as="style">
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Newsreader:wght@400;600&display=swap" as="style">
```

## Accessibility Implementation

### Focus Management
```javascript
// File: src/utils/accessibility.js
export function initializeAccessibility() {
  // Skip to main content link
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  skipLink.style.position = 'absolute';
  skipLink.style.top = '-40px';
  skipLink.style.left = '0';
  skipLink.style.padding = '8px';
  skipLink.style.background = '#1C1917';
  skipLink.style.color = '#FFFFFF';
  skipLink.style.textDecoration = 'none';
  skipLink.style.zIndex = '100';

  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
  });

  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });

  document.body.insertBefore(skipLink, document.body.firstChild);

  // Enhanced focus indicators
  $w('[data-focusable]').forEach(element => {
    element.style.transition = 'outline 0.2s ease';

    element.onFocus(() => {
      element.style.outline = '2px solid #3B82F6';
      element.style.outlineOffset = '2px';
    });

    element.onBlur(() => {
      element.style.outline = 'none';
    });
  });
}
```

### ARIA Implementation
```javascript
// File: src/components/Accordion.js
export function initializeAccordion() {
  $w('[data-accordion]').forEach(accordion => {
    const triggers = accordion.querySelectorAll('[data-accordion-trigger]');
    const panels = accordion.querySelectorAll('[data-accordion-panel]');

    triggers.forEach((trigger, index) => {
      const panel = panels[index];

      // Set ARIA attributes
      trigger.setAttribute('aria-expanded', 'false');
      trigger.setAttribute('aria-controls', `panel-${index}`);
      panel.setAttribute('id', `panel-${index}`);
      panel.setAttribute('aria-labelledby', `trigger-${index}`);
      trigger.setAttribute('id', `trigger-${index}`);

      // Initially hide panels
      panel.hide();

      trigger.onClick(() => {
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
          trigger.setAttribute('aria-expanded', 'false');
          panel.hide();
        } else {
          trigger.setAttribute('aria-expanded', 'true');
          panel.show();
        }
      });

      // Keyboard navigation
      trigger.onKeyPress((event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          trigger.click();
        }
      });
    });
  });
}
```

## Implementation Checklist

### Wix Studio Setup
- [ ] Color palette configured in Wix global colors
- [ ] Font assignments set up in Wix theme
- [ ] Responsive breakpoints configured
- [ ] Component templates created

### Core Components
- [ ] Card component with hover effects
- [ ] Button variants with proper states
- [ ] Stats blocks with animation
- [ ] Tabbed sections with keyboard navigation
- [ ] Code blocks with syntax highlighting
- [ ] Timeline with progress indicators
- [ ] Pricing cards with featured state
- [ ] Testimonial carousel
- [ ] Partner grid with hover effects
- [ ] CTA bars with responsive layout

### Accessibility
- [ ] Skip link implemented
- [ ] Focus indicators enhanced
- [ ] ARIA attributes properly set
- [ ] Keyboard navigation functional
- [ ] Screen reader testing completed

### Performance
- [ ] Images lazy loaded and optimized
- [ ] Fonts preloaded appropriately
- [ ] Critical CSS inlined
- [ ] JavaScript optimized for Wix
- [ ] Core Web Vitals targets met

### Testing
- [ ] Cross-browser compatibility verified
- [ ] Mobile responsiveness tested
- [ ] Accessibility audit passed
- [ ] Performance benchmarks achieved
- [ ] User experience validated