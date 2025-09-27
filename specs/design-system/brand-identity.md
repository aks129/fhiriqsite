# Brand Identity Specification

## Purpose
Establish FHIR IQ's visual identity to compete with leading FHIR vendors while maintaining differentiation through AI-first positioning.

## Brand Positioning
**Professional Healthcare Tech** meets **AI Innovation**
- Credible and trustworthy (healthcare industry standards)
- Forward-thinking and innovative (AI-driven solutions)
- Accessible and educational (knowledge sharing focus)

## Color System

### Primary Palette
```css
--primary-blue: #2563EB;     /* Trust, healthcare tech */
--primary-green: #059669;    /* Growth, FHIR ecosystem */
--primary-navy: #1E293B;     /* Authority, depth */
```

### Secondary Palette
```css
--accent-purple: #7C3AED;    /* AI, innovation */
--accent-orange: #EA580C;    /* Energy, call-to-action */
--neutral-gray: #64748B;     /* Professional, readable */
```

### Semantic Colors
```css
--success: #10B981;
--warning: #F59E0B;
--error: #EF4444;
--info: #3B82F6;
```

### Background System
```css
--bg-primary: #FFFFFF;
--bg-secondary: #F8FAFC;
--bg-accent: #EEF2FF;
--bg-dark: #0F172A;
```

## Typography

### Primary Typeface: Inter
- **Headings**: Inter, 600-700 weight
- **Body**: Inter, 400-500 weight
- **Code**: JetBrains Mono, 400 weight

### Type Scale
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
```

## Logo System

### Primary Logo
- FHIR IQ wordmark with custom "IQ" treatment
- Blue + green gradient on "IQ" to suggest AI intelligence
- Clean, modern sans-serif typography

### Logo Variations
- Horizontal full logo
- Stacked logo for square spaces
- Icon-only version for social media
- Monochrome versions for single-color applications

### Usage Guidelines
- Minimum size: 120px width for horizontal
- Clear space: 2x the height of the logo
- Never stretch, rotate, or modify colors
- Always use on appropriate contrast backgrounds

## Iconography

### Style Guidelines
- **Style**: Outlined icons with 2px stroke
- **Corner Radius**: Slightly rounded (2-4px)
- **Size System**: 16px, 24px, 32px, 48px
- **Color**: Match text color or use accent colors

### Icon Categories
- Navigation: Menu, close, arrow, external link
- Features: AI/brain, code, chart, tool, book
- Actions: Play, download, share, bookmark
- Status: Check, warning, error, info

## Spacing System

### Scale (8px base)
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

## Component Patterns

### Cards
- White background with subtle shadow
- 8px border radius
- 24px internal padding
- 1px border in light gray

### Buttons
- **Primary**: Blue background, white text, hover darkens
- **Secondary**: White background, blue border/text
- **Tertiary**: Transparent, blue text, hover background
- Height: 40px (base), 48px (large), 32px (small)

### Forms
- Clean, minimal styling
- Focus states with blue border
- Clear error messaging
- Consistent spacing and alignment

## Implementation Notes

### Wix Studio Integration
- Create color palette in Wix design system
- Upload brand fonts to Wix font library
- Build reusable component templates
- Set up global design tokens

### Responsive Considerations
- Typography scales down 20% on mobile
- Spacing reduces proportionally on smaller screens
- Logo switches to stacked version under 768px
- Touch targets minimum 44px on mobile

## Acceptance Criteria

- [ ] Color system implemented in Wix design tokens
- [ ] Typography loads correctly across all browsers
- [ ] Logo displays crisp at all sizes and devices
- [ ] Components maintain brand consistency
- [ ] Accessibility contrast ratios meet WCAG AA standards
- [ ] Design system documented for team use

## Dependencies
- Brand logo design completion
- Wix Studio project setup
- Design token configuration in Wix