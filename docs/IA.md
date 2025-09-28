# FHIR IQ Information Architecture

> Site structure, navigation, and routing from `ia.yaml`

## 🗺️ Site Map

### Homepage
- **Path**: `/`
- **Title**: FHIR IQ - Build on FHIR with AI
- **Description**: Expert FHIR consulting, AI-powered tools, and comprehensive training

### Main Sections

#### 📘 Services
- **Path**: `/services`
- **Title**: Services
- **Children**:
  - **FHIR Consulting** - `/services/consulting`
  - **Implementation Services** - `/services/implementation`
  - **Training & Certification** - `/services/training`

#### 🛠️ Tools
- **Path**: `/tools`
- **Title**: Tools
- **Children**:
  - **AI FHIR App Builder** - `/tools/ai-builder`
  - **FHIR IQ Copilot** - `/tools/copilot`
  - **Tools Catalog** - `/tools/catalog`

#### 📚 Resources
- **Path**: `/resources`
- **Title**: Resources
- **Children**:
  - **Blog** - `/blog`
  - **Podcast** - `/podcast`
  - **Case Studies** - `/case-studies`
  - **Implementation Guides** - `/guides`

#### 👥 About
- **Path**: `/about`
- **Title**: About
- **Children**:
  - **Team** - `/about/team`
  - **Partners** - `/about/partners`
  - **Testimonials** - `/about/testimonials`

### Utility Pages
- **Contact** - `/contact`
- **Pricing** - `/pricing`
- **Book Consultation** - `/book`

## 🧭 Navigation Structure

### Primary Navigation
1. Services
2. Tools
3. Resources
4. About
5. Contact

### Secondary Navigation
1. Blog
2. Podcast
3. Book Consultation (CTA button)

### Footer Navigation

#### Company
- About
- Team
- Partners
- Contact

#### Resources
- Blog
- Podcast
- Case Studies
- Guides

#### Tools
- AI Builder
- Copilot
- Tools Catalog

#### Legal
- Privacy Policy
- Terms of Service
- Cookie Policy

## 🔀 Dynamic Routes

### Content Types with Dynamic Routing

| Content Type | Route Pattern | Example |
|--------------|---------------|---------|
| Blog Posts | `/blog/[slug]` | `/blog/implementing-fhir-r4` |
| Podcast Episodes | `/podcast/[slug]` | `/podcast/episode-42-smart-on-fhir` |
| Case Studies | `/case-studies/[slug]` | `/case-studies/mayo-clinic-integration` |
| Tools | `/tools/[slug]` | `/tools/fhir-validator-pro` |

## 🔄 Redirects

| From | To | Type | Reason |
|------|----|------|--------|
| `/old-blog` | `/blog` | 301 | Legacy URL structure |
| `/services/development` | `/services/implementation` | 301 | Service naming update |

## 📊 Content Sources

### Blog Posts
- **Collection**: `blogPosts`
- **URL Field**: `slug`
- **Display**: List view with pagination
- **Categories**: Filterable by category reference

### Podcast Episodes
- **Collection**: `podcastEpisodes`
- **URL Field**: `slug`
- **Display**: Episode player with show notes
- **Sorting**: By episode number descending

### Case Studies
- **Collection**: `caseStudies`
- **URL Field**: `slug`
- **Display**: Full case study layout
- **Featured**: Highlighted on homepage

### Tools
- **Collection**: `tools`
- **URL Field**: `slug`
- **Display**: Tool detail page with demo
- **Categories**: Filterable by tool category

## 🎯 Navigation Implementation

### Desktop Navigation
```javascript
// Primary nav structure
const primaryNav = [
  {
    label: 'Services',
    path: '/services',
    children: [
      { label: 'FHIR Consulting', path: '/services/consulting' },
      { label: 'Implementation Services', path: '/services/implementation' },
      { label: 'Training & Certification', path: '/services/training' }
    ]
  },
  // ... other items
];
```

### Mobile Navigation
- Hamburger menu trigger
- Full-screen overlay
- Nested accordion for child items
- Close on navigation

### Active State Logic
```javascript
// Determine active nav item
const currentPath = window.location.pathname;
const isActive = (navPath) => {
  return currentPath === navPath ||
         currentPath.startsWith(navPath + '/');
};
```

## 🔍 SEO Considerations

### URL Structure
- Clean, descriptive URLs
- Hyphenated slugs
- No special characters
- Consistent hierarchy

### Canonical URLs
- Homepage: `https://fhiriq.com/`
- Blog posts: `https://fhiriq.com/blog/[slug]`
- Services: `https://fhiriq.com/services/[service-name]`

### Meta Data Sources
- **Title**: From `seoTitle` or `title` field
- **Description**: From `excerpt` or `description` field
- **OG Image**: From `featuredImage` field

## 📱 Responsive Behavior

### Mobile (< 768px)
- Hamburger navigation
- Single column layouts
- Stacked CTAs
- Simplified tool cards

### Tablet (768px - 1023px)
- Condensed navigation
- Two column grids
- Medium spacing

### Desktop (≥ 1024px)
- Full navigation bar
- Multi-column layouts
- Side-by-side components
- Maximum content width: 1440px

## 🚀 Implementation Notes

### Wix Velo Routing
```javascript
// Router configuration in Wix
import wixLocation from 'wix-location';

// Dynamic routing for blog
export function blog_Router(request) {
  const slug = request.path[0];
  return wixData.query('blogPosts')
    .eq('slug', slug)
    .find()
    .then(results => {
      if (results.items.length > 0) {
        return {
          title: results.items[0].title,
          data: results.items[0]
        };
      }
      return wixLocation.to('/404');
    });
}
```

### Navigation Component
```javascript
// Navigation initialization
$w.onReady(() => {
  setupPrimaryNavigation();
  setupMobileMenu();
  highlightActiveRoute();
  setupDropdownBehavior();
});
```

### Analytics Tracking
- Track navigation clicks
- Monitor drop-off points
- Measure engagement by section
- A/B test navigation variations

## 🔗 Quick Links Reference

### High-Traffic Pages
1. Homepage - `/`
2. AI Builder - `/tools/ai-builder`
3. Book Consultation - `/book`
4. Blog - `/blog`
5. Services Overview - `/services`

### Conversion Pages
1. Book Consultation - `/book`
2. Pricing - `/pricing`
3. Contact - `/contact`
4. Tool Demos - `/tools/[tool-name]/demo`

### Support Pages
1. Documentation - `/docs`
2. FAQ - `/faq`
3. Contact Support - `/contact`
4. Implementation Guides - `/guides`