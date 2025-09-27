# Component Library Specification

## Purpose
Define reusable UI components for consistent implementation across the FHIR IQ website using Wix Studio + Velo.

## Component Hierarchy

### Foundation Components
1. **Buttons** - Primary actions, CTAs
2. **Forms** - Input fields, validation
3. **Cards** - Content containers
4. **Navigation** - Menus, breadcrumbs
5. **Typography** - Headers, body text, code

### Composite Components
1. **Hero Sections** - Landing page headers
2. **Feature Blocks** - Service/product showcases
3. **Testimonials** - Customer quotes and logos
4. **Content Blocks** - Blog posts, articles
5. **AI Chat Interface** - Chatbot components

## Foundation Components

### Buttons

#### Primary Button
```javascript
// Wix Velo Implementation
export function createPrimaryButton(text, onClick) {
  return {
    style: {
      backgroundColor: '#2563EB',
      color: '#FFFFFF',
      padding: '12px 24px',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    text: text,
    onClick: onClick,
    hoverStyle: {
      backgroundColor: '#1D4ED8'
    }
  }
}
```

#### Variants
- **Primary**: Blue background, white text
- **Secondary**: White background, blue border
- **Tertiary**: Transparent, blue text
- **Danger**: Red background for destructive actions

#### Sizes
- **Small**: 32px height, 14px font
- **Medium**: 40px height, 16px font (default)
- **Large**: 48px height, 18px font

### Form Components

#### Input Field
```javascript
// Wix Velo Implementation
export function createInputField(config) {
  return {
    type: config.type || 'text',
    placeholder: config.placeholder,
    required: config.required || false,
    style: {
      width: '100%',
      height: '40px',
      padding: '8px 12px',
      border: '1px solid #D1D5DB',
      borderRadius: '6px',
      fontSize: '16px',
      fontFamily: 'Inter'
    },
    focusStyle: {
      borderColor: '#2563EB',
      outline: 'none',
      boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)'
    },
    validation: config.validation
  }
}
```

#### Form Validation
- Real-time validation feedback
- Error states with red border + message
- Success states with green checkmark
- Required field indicators

### Cards

#### Standard Card
```javascript
export function createCard(content) {
  return {
    style: {
      backgroundColor: '#FFFFFF',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #E5E7EB'
    },
    content: content,
    hoverStyle: {
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transform: 'translateY(-2px)'
    }
  }
}
```

#### Card Variants
- **Feature Card**: Icon + title + description
- **Tool Card**: Tool preview with CTA
- **Blog Card**: Image + title + excerpt + date
- **Partner Card**: Logo + description

## Composite Components

### Hero Section

#### Homepage Hero
```javascript
export function createHeroSection(config) {
  return {
    layout: 'two-column',
    leftColumn: {
      headline: config.headline,
      subheadline: config.subheadline,
      cta: {
        primary: config.primaryCTA,
        secondary: config.secondaryCTA
      }
    },
    rightColumn: {
      media: config.heroImage || config.heroVideo,
      type: config.mediaType
    },
    style: {
      padding: '80px 0',
      background: 'linear-gradient(135deg, #EEF2FF 0%, #FFFFFF 100%)'
    }
  }
}
```

#### Page-Specific Heroes
- **About**: Photo + mission statement
- **Services**: Service overview + consultation CTA
- **Tools**: Tool showcase + demo CTA
- **Training**: Course preview + enrollment CTA

### Feature Blocks

#### Three-Column Feature
```javascript
export function createFeatureBlock(features) {
  return {
    layout: 'grid-3-column',
    spacing: '32px',
    features: features.map(feature => ({
      icon: feature.icon,
      title: feature.title,
      description: feature.description,
      link: feature.link
    })),
    style: {
      padding: '60px 0',
      backgroundColor: '#F8FAFC'
    }
  }
}
```

### AI Chat Interface

#### Chat Container
```javascript
export function createChatInterface(config) {
  return {
    container: {
      height: '500px',
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      border: '1px solid #E5E7EB',
      display: 'flex',
      flexDirection: 'column'
    },
    header: {
      title: 'FHIR IQ Assistant',
      subtitle: 'Ask me anything about FHIR',
      style: {
        padding: '16px',
        borderBottom: '1px solid #E5E7EB',
        backgroundColor: '#F8FAFC'
      }
    },
    messages: {
      container: {
        flex: 1,
        padding: '16px',
        overflow: 'auto'
      }
    },
    input: {
      style: {
        padding: '16px',
        borderTop: '1px solid #E5E7EB'
      }
    }
  }
}
```

## Responsive Behavior

### Breakpoints
```css
--mobile: 320px to 767px
--tablet: 768px to 1023px
--desktop: 1024px and up
```

### Component Adaptations
- **Navigation**: Hamburger menu on mobile
- **Hero**: Stacked layout on mobile
- **Feature Blocks**: Single column on mobile, 2-column on tablet
- **Cards**: Full width on mobile with increased padding

## Animation Guidelines

### Micro-interactions
- Button hover: 200ms ease transition
- Card hover: Transform + shadow change
- Form focus: Border color + shadow animation
- Page transitions: Fade in 300ms

### Loading States
- Skeleton screens for content areas
- Spinner for form submissions
- Progressive image loading

## Accessibility Standards

### WCAG 2.1 AA Compliance
- Color contrast ratios minimum 4.5:1
- Focus indicators on all interactive elements
- Keyboard navigation support
- Screen reader compatibility
- Alt text for all images

### Implementation Requirements
- Semantic HTML structure
- ARIA labels and roles
- Tab order management
- Error announcement for screen readers

## Wix Studio Implementation

### Component Creation Process
1. Design component in Wix Studio visual editor
2. Add Velo code for interactivity
3. Create reusable templates
4. Document component API
5. Test across devices and browsers

### Naming Conventions
- Components: `FhirComponent` (PascalCase)
- CSS Classes: `fhir-component` (kebab-case)
- Functions: `createComponent` (camelCase)
- Variables: `componentConfig` (camelCase)

## Testing Requirements

### Component Testing Checklist
- [ ] Visual appearance matches design
- [ ] Responsive behavior works correctly
- [ ] Interactive states function properly
- [ ] Accessibility standards met
- [ ] Performance benchmarks passed
- [ ] Cross-browser compatibility verified

## Dependencies
- Wix Studio project setup
- Brand identity implementation
- Design token configuration
- Velo development environment

## Acceptance Criteria
- [ ] All foundation components implemented and tested
- [ ] Composite components built using foundation components
- [ ] Responsive behavior verified across breakpoints
- [ ] Accessibility compliance validated
- [ ] Component documentation complete
- [ ] Wix Studio templates created for reuse