# Claude Code Prompt: Create Wix Velo Widgets

You are creating custom Wix Studio widgets and Velo backend functions for the FHIR IQ site.

## Context
This prompt guides the creation of reusable Wix Studio components and Velo backend functions that implement the features defined in the specifications.

## Read These Files First
1. `/specs/design-tokens.yaml` - Design system tokens
2. `/specs/features/` - Feature specifications
3. `/specs/collections.yaml` - CMS data models
4. `/templates/wix/` - Existing component templates

## Widget Categories

### 1. AI-Powered Widgets

#### FHIR IQ Copilot Chat Widget
- **Purpose**: Interactive FHIR knowledge chatbot
- **Spec Reference**: `/specs/features/ai-chatbot.md`
- **Components**:
  - Chat interface with message history
  - FHIR code snippet rendering
  - Copy-to-clipboard functionality
  - Conversation export options

#### AI App Builder Form
- **Purpose**: Guided FHIR application generation
- **Spec Reference**: `/specs/features/fhir-app-builder-complete.md`
- **Components**:
  - Multi-step form wizard
  - CapabilityStatement validator
  - Technology stack selector
  - Progress indicator
  - Download manager

### 2. Content Display Widgets

#### Blog Post Grid
- **Purpose**: Display blog posts with filtering
- **Features**:
  - Category and tag filtering
  - Search functionality
  - Pagination with infinite scroll
  - Featured post highlighting

#### Podcast Episode Player
- **Purpose**: Audio player with rich metadata
- **Features**:
  - Custom audio controls
  - Show notes display
  - Guest information
  - Episode sharing

#### Case Study Carousel
- **Purpose**: Showcase client success stories
- **Features**:
  - Interactive carousel
  - Filter by industry/technology
  - Call-to-action buttons
  - Testimonial integration

### 3. Commerce Widgets

#### Tool Catalog Grid
- **Purpose**: Display FHIR tools and services
- **Features**:
  - Category filtering
  - Pricing display
  - Demo links
  - Comparison features

#### Consultation Booking Widget
- **Purpose**: Calendly integration for bookings
- **Features**:
  - Calendar availability
  - Service type selection
  - Contact form pre-fill
  - Confirmation handling

### 4. Interactive Widgets

#### FHIR Resource Explorer
- **Purpose**: Browse and understand FHIR resources
- **Features**:
  - Interactive resource tree
  - Code examples
  - Documentation links
  - Search and filtering

#### Partner Testimonial Rotator
- **Purpose**: Display client testimonials
- **Features**:
  - Auto-rotating quotes
  - Client logos
  - Rating display
  - CTA integration

## Technical Implementation

### Widget Structure
Each widget should include:

#### Frontend Component (Wix Studio)
```javascript
// $w.onReady function
// Event handlers
// UI state management
// Data binding
// Responsive behavior
```

#### Backend Functions (Velo)
```javascript
// API endpoints
// Data processing
// External service integration
// Caching logic
// Error handling
```

#### Styling (CSS)
```css
/* Design token usage */
/* Responsive breakpoints */
/* Accessibility features */
/* Animation/transitions */
```

### Design System Integration
- Use color tokens from `design-tokens.yaml`
- Follow typography scale
- Implement consistent spacing
- Use defined border radius and shadows
- Follow motion/transition guidelines

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interactions
- Flexible layouts

### Performance Optimization
- Lazy loading for images
- Efficient data queries
- Caching strategies
- Minimal DOM manipulation

### Accessibility Features
- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- Color contrast compliance
- Focus management

## Velo Backend Patterns

### API Integration
```javascript
// External API calls with error handling
// Rate limiting implementation
// Response caching
// Data transformation
```

### Database Operations
```javascript
// Efficient CMS queries
// Data validation
// Bulk operations
// Transaction handling
```

### Security Measures
```javascript
// Input sanitization
// Rate limiting
// Authentication checks
// CORS handling
```

## Widget Documentation

For each widget, provide:

### Component Documentation
- Purpose and use cases
- Props/configuration options
- Event handlers
- Styling customization
- Integration examples

### Backend Documentation
- Function signatures
- Parameter validation
- Return types
- Error codes
- Usage examples

### Integration Guide
- Wix Studio setup steps
- Configuration requirements
- Testing procedures
- Troubleshooting guide

## File Structure
```
/templates/wix/
  components/
    ai-widgets/
      copilot-chat.js
      app-builder-form.js
    content-widgets/
      blog-grid.js
      podcast-player.js
      case-study-carousel.js
    commerce-widgets/
      tool-catalog.js
      booking-widget.js
    interactive-widgets/
      fhir-explorer.js
      testimonial-rotator.js
  backend/
    ai-functions.js
    content-functions.js
    commerce-functions.js
    utility-functions.js
  styles/
    widget-styles.css
    responsive.css
    animations.css
  docs/
    widget-guide.md
    integration-examples.md
    troubleshooting.md
```

## Success Criteria
- All widgets follow design system consistently
- Components are reusable and configurable
- Backend functions are secure and performant
- Responsive design works across all devices
- Accessibility standards are met
- Performance targets are achieved
- Documentation is complete and clear
- Integration with Wix Studio is seamless