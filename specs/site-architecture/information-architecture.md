# Information Architecture Specification

## Purpose
Define the site structure, navigation, and content organization for fhiriq.com to maximize user engagement and conversion.

## Site Hierarchy

### Primary Navigation (Main Menu)
```
Home
├── About
├── Services
│   ├── Consulting
│   ├── Training
│   └── Custom Development
├── Tools
│   ├── FHIR Builder AI
│   ├── Data Quality Scanner
│   └── API Testing Suite
├── Resources
│   ├── Blog
│   ├── Podcast
│   ├── Documentation
│   └── Case Studies
└── Contact
```

### Secondary Navigation (Footer)
```
Company
├── About Us
├── Team
├── Careers
└── Partners

Resources
├── FHIR Guides
├── API Documentation
├── Community Forum
└── Support

Legal
├── Privacy Policy
├── Terms of Service
└── HIPAA Compliance
```

## Page Specifications

### 1. Homepage (`/`)
**Purpose**: Convert visitors into leads and demonstrate FHIR IQ's unique value

**Content Blocks**:
- Hero: "Build FHIR Apps with AI" + demo CTA
- Value Props: Three-column feature grid
- AI Tools Preview: Interactive showcases
- Social Proof: Client logos + testimonials
- Latest Content: Blog posts + podcast episodes
- Newsletter Signup: Lead capture

**User Flows**:
- Primary: Home → AI Demo → Contact/Consultation
- Secondary: Home → Blog/Resources → Newsletter
- Tertiary: Home → Tools → Purchase/Trial

### 2. About (`/about`)
**Purpose**: Build trust and credibility with FHIR expertise

**Content Blocks**:
- Mission Statement: FHIR IQ's vision
- Founder Story: Gene's background and expertise
- Team: Key team members and advisors
- Timeline: Company milestones and achievements
- Partners: Industry relationships and collaborations

### 3. Services Landing (`/services`)
**Purpose**: Convert prospects into consultation bookings

**Content Blocks**:
- Service Overview: Consulting, training, development
- Case Studies: Success stories with metrics
- Process: How FHIR IQ works with clients
- Pricing: Transparent pricing tiers
- Consultation CTA: Book a call

#### 3a. Consulting (`/services/consulting`)
- FHIR Implementation Strategy
- Data Migration and Integration
- Compliance and Security Assessment
- API Development and Optimization

#### 3b. Training (`/services/training`)
- FHIR Fundamentals Course
- Advanced API Development
- AI-Assisted Development Workshop
- Custom Team Training

#### 3c. Custom Development (`/services/development`)
- FHIR Application Development
- Custom Integration Solutions
- AI Tool Development
- Ongoing Support and Maintenance

### 4. Tools Landing (`/tools`)
**Purpose**: Showcase AI-driven tools and drive subscriptions

**Content Blocks**:
- Tool Overview: AI-first approach to FHIR
- Featured Tools: Three main tools with previews
- Demo Videos: Tool walkthroughs
- Pricing: Subscription tiers
- Free Trial: Lead capture + tool access

#### 4a. FHIR Builder AI (`/tools/fhir-builder`)
- Interactive app builder interface
- Template library
- Code generation and export
- Integration guides

#### 4b. Data Quality Scanner (`/tools/data-quality`)
- Upload and scan FHIR data
- Quality reports and recommendations
- Compliance checking
- Export findings

#### 4c. API Testing Suite (`/tools/api-testing`)
- Endpoint testing interface
- Automated test generation
- Performance monitoring
- Integration with CI/CD

### 5. Resources Landing (`/resources`)
**Purpose**: Establish thought leadership and drive engagement

**Content Blocks**:
- Content Categories: Blog, podcast, docs, case studies
- Featured Content: Latest and most popular
- Search and Filter: Find relevant content
- Newsletter: Subscribe for updates

#### 5a. Blog (`/blog`)
- Article listing with categories
- Search and tag filtering
- Related articles
- Author profiles
- Social sharing

#### 5b. Podcast (`/podcast`)
- Episode player and archive
- Show notes and transcripts
- Guest profiles
- Subscription links
- Episode search

#### 5c. Documentation (`/docs`)
- FHIR implementation guides
- API reference documentation
- Code examples and tutorials
- Best practices
- FAQ section

#### 5d. Case Studies (`/case-studies`)
- Client success stories
- Implementation details
- Results and metrics
- Industry-specific examples

### 6. Contact (`/contact`)
**Purpose**: Facilitate multiple contact methods and lead capture

**Content Blocks**:
- Contact Form: Consultation request
- Calendar Integration: Direct booking
- Contact Information: Phone, email, address
- Office Hours: Availability
- Support Options: Different support channels

## URL Structure

### SEO-Optimized URLs
```
/ (homepage)
/about
/services
/services/consulting
/services/training
/services/development
/tools
/tools/fhir-builder
/tools/data-quality
/tools/api-testing
/resources
/blog
/blog/[slug]
/podcast
/podcast/[episode-slug]
/docs
/docs/[guide-slug]
/case-studies
/case-studies/[case-slug]
/contact
```

### Dynamic Content URLs
```
/blog/category/[category-slug]
/blog/tag/[tag-slug]
/blog/author/[author-slug]
/tools/demo/[tool-name]
/services/booking/[service-type]
```

## Navigation Patterns

### Primary Navigation
- Fixed header with horizontal menu
- Logo links to homepage
- Services and Tools have dropdown menus
- Mobile: Hamburger menu with slide-out drawer
- Search icon in header (resources search)
- CTA button: "Book Consultation"

### Breadcrumbs
- Displayed on all pages except homepage
- Format: Home > Section > Page
- Enhances navigation and SEO
- Mobile: Collapsed on small screens

### Footer Navigation
- Four-column layout on desktop
- Company, Resources, Legal, Contact
- Social media links
- Newsletter signup
- Copyright and legal links

## Content Management System

### Wix CMS Collections

#### Blog Posts
```javascript
{
  title: String,
  slug: String,
  excerpt: String,
  content: RichText,
  featuredImage: Image,
  author: Reference(Authors),
  publishDate: Date,
  categories: MultiReference(Categories),
  tags: MultiReference(Tags),
  seoTitle: String,
  seoDescription: String,
  featured: Boolean
}
```

#### Podcast Episodes
```javascript
{
  title: String,
  slug: String,
  description: String,
  audioFile: Media,
  duration: String,
  episodeNumber: Number,
  publishDate: Date,
  guests: MultiReference(Guests),
  transcript: RichText,
  showNotes: RichText,
  featuredImage: Image
}
```

#### Case Studies
```javascript
{
  title: String,
  slug: String,
  client: String,
  industry: String,
  challenge: RichText,
  solution: RichText,
  results: RichText,
  metrics: RichText,
  testimonial: String,
  featuredImage: Image,
  technologies: MultiReference(Technologies)
}
```

#### Tools
```javascript
{
  name: String,
  slug: String,
  description: String,
  features: MultiReference(Features),
  pricing: RichText,
  demoUrl: String,
  documentation: String,
  status: String, // 'live', 'beta', 'coming-soon'
  icon: Image,
  screenshots: Gallery
}
```

## User Experience Flows

### Primary Conversion Flow
1. **Discovery**: Land on homepage or blog post
2. **Interest**: Explore AI tools or services
3. **Evaluation**: Read case studies, try demos
4. **Contact**: Book consultation or start trial
5. **Conversion**: Become client or subscriber

### Content Consumption Flow
1. **Entry**: Blog post or podcast episode
2. **Engagement**: Read/listen to content
3. **Exploration**: Related content recommendations
4. **Subscription**: Newsletter or podcast follow
5. **Conversion**: Tool trial or consultation

### Tool Evaluation Flow
1. **Discovery**: Tools landing page
2. **Demo**: Try AI builder or scanner
3. **Education**: Documentation and guides
4. **Trial**: Free account creation
5. **Purchase**: Subscription or consultation

## Mobile-First Considerations

### Mobile Navigation
- Touch-friendly menu items (44px minimum)
- Swipe gestures for content browsing
- Sticky CTA buttons on long pages
- Progressive disclosure for complex content

### Mobile Content
- Shorter paragraphs and bullet points
- Larger tap targets for links and buttons
- Optimized images with fast loading
- Simplified forms with autofill support

### Performance
- Core Web Vitals optimization
- Image lazy loading
- Minimal JavaScript for critical path
- Progressive web app features

## SEO Strategy

### Keyword Targeting
- Primary: "FHIR", "FHIR development", "healthcare interoperability"
- Secondary: "FHIR consultant", "healthcare API", "medical data integration"
- Long-tail: "build FHIR application", "FHIR data quality", "AI FHIR tools"

### Content SEO
- Topic clusters around FHIR implementation
- Pillar pages for services and tools
- Internal linking strategy
- Schema markup for rich snippets

### Technical SEO
- XML sitemaps for all content types
- Clean URL structure
- Meta descriptions and titles
- Open Graph and Twitter Card tags

## Implementation Notes

### Wix Studio Setup
- Create page templates for each page type
- Set up CMS collections for dynamic content
- Configure navigation menus and breadcrumbs
- Implement search functionality for resources

### Velo Integration
- Dynamic page routing for blog and tools
- Search and filter functionality
- Form handling and validation
- Analytics and conversion tracking

## Acceptance Criteria

- [ ] All 10 core pages designed and developed
- [ ] Navigation works across all devices
- [ ] CMS collections created and populated
- [ ] URL structure implements SEO best practices
- [ ] Mobile navigation provides excellent UX
- [ ] Search functionality works for resources
- [ ] Breadcrumbs display correctly
- [ ] Page load times under 3 seconds
- [ ] Conversion tracking implemented

## Dependencies
- Design system implementation
- Content creation and migration
- Wix Studio CMS configuration
- SEO keyword research completion