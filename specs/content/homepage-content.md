# Homepage Content Specification

## Hero Section

### Primary Headline
**"Build on FHIR with AI - 80% Faster Implementation"**

### Supporting Headline
**"Expert FHIR consulting, AI-powered tools, and comprehensive training to accelerate your healthcare interoperability projects"**

### Value Proposition Points
- ✅ **Reduce FHIR mapping time from months to weeks**
- ✅ **AI-powered code generation with expert validation**
- ✅ **End-to-end implementation support from spec to production**

### Primary CTA
**Button**: "Build Your FHIR App with AI" → `/tools/ai-builder`
**Style**: Large blue button, prominent placement

### Secondary CTA
**Button**: "Book Free Consultation" → `/book`
**Style**: Outline button, secondary positioning

---

## Trust Metrics Bar

### Key Statistics (Horizontal Layout)
1. **"500+ FHIR Implementations Delivered"**
   - Subtext: "Proven expertise across healthcare organizations"

2. **"80% Faster Time-to-Market"**
   - Subtext: "With our AI-powered development tools"

3. **"95% Client Satisfaction Rate"**
   - Subtext: "Based on post-project surveys"

---

## Podcast Guests & Collaborators Strip

### Section Title
**"Featured on the FHIR IQ Podcast"** or **"Podcast Guests & Collaborators"**

### Organization Categories (NOT Partners)
- **Podcast Guests**: NCQA, HTD Health, Flexpa, Fasten Health
- **Standards Bodies**: HL7, FHIR (community involvement)
- **Other Collaborators**: [Only include with explicit permission]

**IMPORTANT**: Do NOT claim partnerships with organizations unless formal partnership agreements exist.

### Display Format
- Grayscale logos on light background
- Rotating carousel on mobile
- Static grid on desktop
- Maximum 6-8 logos visible at once
- Caption: "Organizations featured on our podcast and community collaborations"

---

## Featured Tools Section

### Section Header
**"AI-Powered FHIR Development Tools"**
**Subtext**: "Build, test, and deploy FHIR applications faster than ever before"

### Tool Cards (3-Column Layout)

#### Tool Card 1: AI FHIR App Builder
```
[Screenshot: App builder interface]

**Headline**: "AI FHIR App Builder"
**Description**: "Generate production-ready FHIR applications in minutes. Just provide your CapabilityStatement and select your tech stack."

**Key Features**:
• Node.js, .NET, Python support
• Docker environment included
• SMART on FHIR ready
• Full test suite generated

**CTA Button**: "Try Free Demo"
**Link**: `/tools/ai-builder`
```

#### Tool Card 2: FHIR IQ Copilot
```
[Screenshot: Chat interface with code example]

**Headline**: "FHIR IQ Copilot"
**Description**: "Your AI assistant for FHIR implementation. Get instant answers, code examples, and best practices."

**Key Features**:
• Natural language queries
• Code generation & validation
• Implementation guidance
• 24/7 availability

**CTA Button**: "Start Conversation"
**Link**: `/tools/copilot`
```

#### Tool Card 3: Implementation Accelerator
```
[Screenshot: Template library interface]

**Headline**: "Implementation Accelerator"
**Description**: "Complete project templates, patterns, and guides for faster FHIR implementation."

**Key Features**:
• Production-tested templates
• Security best practices
• Performance optimization
• Deployment automation

**CTA Button**: "Explore Templates"
**Link**: `/tools/accelerator`
```

---

## Latest Content Section

### Section Header
**"Latest Insights & Resources"**
**Subtext**: "Stay current with FHIR best practices and industry trends"

### Content Layout (2-Column)

#### Featured Blog Post
```
[Featured Image]

**Category Badge**: "Implementation Guide"
**Headline**: "[Latest Blog Post Title]"
**Excerpt**: "[First 120 characters of post...]"
**Meta**: "By Eugene Vestel • [Date] • 5 min read"

**CTA**: "Read Full Article" → `/blog/[slug]`
```

#### Latest Podcast Episode
```
[Episode Artwork]

**Category Badge**: "Podcast"
**Headline**: "[Episode Title]"
**Description**: "[Episode description first 120 characters...]"
**Meta**: "Episode #[X] • [Guest Name] • [Duration]"

**CTA**: "Listen Now" → `/podcast/[slug]`
```

---

## Case Study Highlight

### Featured Case Study (Full Width Card)
```
**Client Logo**: [HealthTech Company Logo]
**Industry Badge**: "Healthcare Startup"

**Challenge**: "Needed FHIR integration for Epic App Orchard marketplace launch"

**Solution**: "FHIR IQ implemented SMART on FHIR authentication and R4 compliance in 6 weeks"

**Results**:
• Launched 6 weeks ahead of schedule
• Saved $200K in development costs
• Achieved Epic certification on first submission

**Quote**: "FHIR IQ transformed our timeline from impossible to achievable. Their AI tools and expertise made the difference."
— Jane Smith, CTO, HealthTech Inc.

**CTA**: "Read Full Case Study" → `/case-studies/[slug]`
```

---

## Final CTA Section

### Section Design
**Background**: Light blue gradient
**Alignment**: Center-aligned content

### Content
**Headline**: "Ready to Accelerate Your FHIR Implementation?"
**Subtext**: "Join 500+ healthcare organizations who trust FHIR IQ for their interoperability needs"

### Dual CTAs
**Primary**: "Start Building with AI" → `/tools/ai-builder`
**Secondary**: "Schedule Consultation" → `/book`

### Contact Alternative
**Text**: "Prefer to talk first? Call us at (555) 123-FHIR"

---

## Mobile Optimizations

### Hero Section Mobile
- Stack headline and subheading vertically
- Single CTA button (primary only)
- Condensed value props to 3 bullet points

### Tools Section Mobile
- Single column card layout
- Carousel navigation with dots
- "View All Tools" CTA at bottom

### Content Section Mobile
- Stack blog and podcast vertically
- Reduce text lengths by 30%
- Larger tap targets for CTAs

---

## SEO Optimizations

### Meta Tags
```html
<title>FHIR IQ - AI-Powered FHIR Development Tools & Expert Consulting</title>
<meta name="description" content="Build FHIR applications 80% faster with AI tools. Expert consulting, training, and implementation services for healthcare interoperability projects.">
<meta name="keywords" content="FHIR, healthcare interoperability, AI development tools, SMART on FHIR, HL7, healthcare consulting">
```

### Open Graph Tags
```html
<meta property="og:title" content="Build on FHIR with AI - 80% Faster Implementation">
<meta property="og:description" content="Expert FHIR consulting, AI-powered tools, and training to accelerate healthcare interoperability projects.">
<meta property="og:image" content="[Homepage Hero Image URL]">
<meta property="og:url" content="https://fhiriq.com">
```

### Schema Markup
- Organization schema for FHIR IQ
- Service schema for consulting offerings
- Review schema for testimonials
- FAQ schema for common questions

---

## Performance Requirements

### Core Web Vitals Targets
- **Largest Contentful Paint**: < 2.5 seconds
- **First Input Delay**: < 100 milliseconds
- **Cumulative Layout Shift**: < 0.1

### Image Optimization
- Hero image: WebP format, multiple sizes
- Tool screenshots: Optimized for retina displays
- Partner logos: SVG format preferred
- Lazy loading for below-fold content

### Content Loading Strategy
- Critical CSS inlined
- Hero content prioritized
- Tool cards loaded progressively
- Analytics scripts deferred

---

## A/B Testing Framework

### Test Elements
1. **Hero Headline**: Current vs "Transform Healthcare Data Integration with AI"
2. **CTA Colors**: Blue vs Teal (from design tokens)
3. **Tool Card Order**: AI Builder first vs Copilot first
4. **Trust Metrics**: Numbers vs Descriptive text

### Success Metrics
- **Primary**: Consultation booking rate
- **Secondary**: Tool trial signups
- **Engagement**: Time on page, scroll depth
- **Conversion**: Email newsletter signups