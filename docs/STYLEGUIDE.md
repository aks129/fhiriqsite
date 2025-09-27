# FHIR IQ Style Guide

> Design system tokens and component guidelines from `design-tokens.yaml`

## 🎨 Color System

### Primary Colors (Blue)
- **Primary 500**: `#0087FF` - Main brand blue
- **Primary 600**: `#006ACC` - Hover state
- **Primary 700**: `#004D99` - Active state
- **Primary 100**: `#CCE7FF` - Light backgrounds
- **Primary 50**: `#E6F3FF` - Very light tints

### Secondary Colors (Teal)
- **Secondary 500**: `#00CDA0` - Secondary brand color
- **Secondary 600**: `#00A480` - Hover state
- **Secondary 700**: `#007B60` - Active state
- **Secondary 100**: `#B3F5E8` - Light backgrounds
- **Secondary 50**: `#E6FFFA` - Very light tints

### Neutral Colors
- **White**: `#FFFFFF`
- **Gray 50**: `#F9FAFB` - Backgrounds
- **Gray 100**: `#F3F4F6` - Light backgrounds
- **Gray 300**: `#D1D5DB` - Borders
- **Gray 500**: `#6B7280` - Body text
- **Gray 700**: `#374151` - Headings
- **Gray 900**: `#111827` - Dark text
- **Black**: `#000000`

### Semantic Colors
- **Success**: `#10B981` - Success states
- **Warning**: `#F59E0B` - Warning states
- **Error**: `#EF4444` - Error states
- **Info**: `#3B82F6` - Information states

## 📝 Typography

### Font Families
```css
/* Primary Font Stack */
font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* Monospace Font Stack */
font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
```

### Type Scale
| Size | Value | Usage |
|------|-------|-------|
| `xs` | 12px | Small labels, captions |
| `sm` | 14px | Secondary text, meta information |
| `base` | 16px | Body text (default) |
| `lg` | 18px | Lead paragraphs, emphasized text |
| `xl` | 20px | Section subtitles |
| `2xl` | 24px | Section headings |
| `3xl` | 30px | Page headings |
| `4xl` | 36px | Hero headings |
| `5xl` | 48px | Large hero text |
| `6xl` | 60px | Extra large displays |

### Font Weights
- **Light**: 300
- **Normal**: 400 (body text)
- **Medium**: 500
- **Semibold**: 600 (buttons, emphasis)
- **Bold**: 700 (headings)
- **Extrabold**: 800 (hero text)

### Line Heights
- **Tight**: 1.25 - Headings
- **Snug**: 1.375 - Subheadings
- **Normal**: 1.5 - Body text
- **Relaxed**: 1.625 - Readable paragraphs
- **Loose**: 2.0 - Single lines, buttons

## 📐 Spacing System

Base unit: 4px

| Token | Value | Usage |
|-------|-------|-------|
| 0 | 0px | No spacing |
| 1 | 4px | Tight spacing |
| 2 | 8px | Small gaps |
| 3 | 12px | Component padding |
| 4 | 16px | Default spacing |
| 5 | 20px | Medium spacing |
| 6 | 24px | Large spacing |
| 8 | 32px | Section spacing |
| 10 | 40px | Component gaps |
| 12 | 48px | Large gaps |
| 16 | 64px | Section margins |
| 20 | 80px | Hero spacing |
| 24 | 96px | Page sections |

## 📱 Breakpoints

| Breakpoint | Value | Description |
|------------|-------|-------------|
| Mobile | 320px | Small phones |
| Tablet | 768px | Tablets and large phones |
| Desktop | 1024px | Desktops and laptops |
| Wide | 1440px | Large screens |

## 🎭 Shadows

| Level | Usage |
|-------|-------|
| `sm` | Subtle elevation for cards |
| `base` | Default shadow for dropdowns |
| `md` | Medium elevation for modals |
| `lg` | High elevation for popovers |
| `xl` | Maximum elevation for sticky elements |

## 🔄 Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| none | 0px | Sharp corners |
| sm | 2px | Subtle rounding |
| base | 4px | Default radius |
| md | 6px | Medium rounding |
| lg | 8px | Cards, buttons |
| xl | 12px | Large components |
| 2xl | 16px | Extra large cards |
| full | 9999px | Pills, circles |

## ⚡ Transitions

- **Fast**: 150ms - Hover effects
- **Normal**: 250ms - Default transitions
- **Slow**: 350ms - Complex animations

Timing Function: `cubic-bezier(0.4, 0, 0.2, 1)` (ease-in-out)

## 🧩 Component Guidelines

### Buttons
- **Primary**: Blue background, white text, semibold
- **Secondary**: Teal background, white text, semibold
- **Padding**: 12px vertical, 24px horizontal
- **Border Radius**: 8px (lg)
- **Transition**: 250ms all properties

### Cards
- **Background**: White
- **Border Radius**: 8px (lg)
- **Shadow**: Medium (md)
- **Padding**: 24px (spacing-6)

### Forms
- **Input Height**: 44px minimum (accessibility)
- **Border**: 1px solid gray-300
- **Border Radius**: 6px (md)
- **Focus State**: Primary-500 border with shadow
- **Padding**: 12px vertical, 16px horizontal

### Navigation
- **Height**: 64px desktop, 56px mobile
- **Background**: White with shadow-sm
- **Links**: Gray-700, hover Primary-500
- **Active State**: Primary-500 with underline

## 🎯 Usage Examples

### Hero Section
```css
.hero-title {
  font-size: 48px; /* 5xl */
  font-weight: 800; /* extrabold */
  line-height: 1.25; /* tight */
  color: #111827; /* gray-900 */
}

.hero-subtitle {
  font-size: 20px; /* xl */
  font-weight: 400; /* normal */
  line-height: 1.625; /* relaxed */
  color: #6B7280; /* gray-500 */
}
```

### Button Component
```css
.btn-primary {
  background: #0087FF; /* primary-500 */
  color: #FFFFFF;
  padding: 12px 24px; /* spacing-3, spacing-6 */
  border-radius: 8px; /* radius-lg */
  font-weight: 600; /* semibold */
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary:hover {
  background: #006ACC; /* primary-600 */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); /* shadow-lg */
}
```

### Card Component
```css
.card {
  background: #FFFFFF;
  border-radius: 8px; /* radius-lg */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); /* shadow-md */
  padding: 24px; /* spacing-6 */
}

.card-title {
  font-size: 24px; /* 2xl */
  font-weight: 700; /* bold */
  color: #111827; /* gray-900 */
  margin-bottom: 16px; /* spacing-4 */
}
```

## 📋 Implementation Notes

1. **CSS Variables**: All tokens are available as CSS variables in `/wix/velo/public/styles/site-tokens.css`
2. **Wix Integration**: Apply these tokens through custom CSS classes in Wix Studio
3. **Consistency**: Always use tokens instead of hardcoded values
4. **Accessibility**: Maintain WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text)
5. **Responsive**: Use breakpoint tokens for responsive design decisions

## 🔗 Quick Reference

```javascript
// Import in Velo
import { tokens } from 'public/styles/site-tokens.css';

// Apply in code
$w('#myButton').style.backgroundColor = 'var(--color-primary-500)';
$w('#myText').style.fontSize = 'var(--font-size-lg)';
$w('#myCard').style.boxShadow = 'var(--shadow-md)';
```