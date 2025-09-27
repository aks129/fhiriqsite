# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FHIRIQSite is a comprehensive redesign of the FHIR IQ business website (fhiriq.com), transitioning from a founder-built site to a polished product & services platform. The project uses **Spec-Driven Development** methodology with **Wix Studio + Velo** as the primary platform.

**Key Objectives:**
- Establish trust parity with leading FHIR vendors (Firely, Smile, Vermonster)
- Showcase AI-driven "Build on FHIR" capabilities
- Convert visitors to consultations, tool subscriptions, and training enrollments
- Demonstrate thought leadership in FHIR + AI space

## Technology Stack

**Platform:** Wix Studio with Velo for custom functionality
**Methodology:** Spec-Driven Development with Claude Code implementation
**Deployment:** Wix hosting with custom domain (fhiriq.com)

**Core Technologies:**
- Frontend: Wix Studio visual editor + custom components
- Backend: Wix Velo (JavaScript/Node.js runtime)
- Database: Wix Data (CMS collections)
- Payments: Wix Stores + Stripe integration
- AI Services: OpenAI API for chatbot and code generation

## Spec-Driven Development Approach

This project follows a **spec-first methodology** where every feature begins with a detailed specification before implementation.

### Development Process
1. **Review Specification**: Start by reading the relevant spec in `/specs/` directory
2. **Ask Clarifying Questions**: Ensure understanding of requirements and acceptance criteria
3. **Plan Implementation**: Break down feature into Wix Studio + Velo components
4. **Implement Iteratively**: Build and test in small cycles
5. **Validate Against Spec**: Ensure all acceptance criteria are met

### Specification Structure
Each spec includes:
- **Purpose**: What the feature achieves
- **Requirements**: Functional and non-functional needs
- **Implementation Notes**: Wix/Velo specific guidance
- **Acceptance Criteria**: Testable success conditions
- **Dependencies**: Prerequisites and integrations

## Key Specifications to Review

### Design System
- `/specs/design-system/brand-identity.md` - Colors, typography, logo usage
- `/specs/design-system/component-library.md` - Reusable UI components

### Site Architecture
- `/specs/site-architecture/information-architecture.md` - Site structure and navigation
- `/specs/content/content-strategy.md` - Content organization and SEO

### Core Features
- `/specs/features/ai-chatbot.md` - FHIR knowledge chatbot
- `/specs/features/fhir-builder-ai.md` - AI-powered FHIR app builder

### Integrations
- `/specs/integrations/wix-commerce.md` - E-commerce and subscriptions
- `/specs/integrations/third-party-apis.md` - External service integrations

### Workflows
- `/specs/workflows/spec-driven-development.md` - Development methodology
- `/specs/workflows/deployment-process.md` - Deployment and quality gates

## Development Commands

### Wix Studio Development
```bash
# No traditional build commands - development happens in Wix Studio
# Access: studio.wix.com/[site-id]
```

### Local Development Setup
```bash
# Install Wix CLI (if using local development)
npm install -g @wix/cli

# Connect to Wix site
wix login
wix site:connect [site-id]

# Start local development
wix dev
```

### Testing and Validation
```bash
# Run in Wix Studio Preview mode
# Test mobile responsiveness
# Validate form submissions
# Check third-party integrations
```

## Implementation Guidelines

### Wix Studio Best Practices
- Use Wix design system components when possible
- Create reusable custom components for complex functionality
- Implement responsive design for all screen sizes
- Follow Wix SEO best practices for page structure

### Velo Code Standards
- Use modern JavaScript (ES6+)
- Implement proper error handling and validation
- Follow security best practices for API calls
- Document complex functions and integrations

### FHIR-Specific Considerations
- Ensure HIPAA compliance for any healthcare data handling
- Follow FHIR R4 standards for any healthcare integrations
- Implement proper security for AI-generated code examples
- Validate FHIR resource examples for accuracy

## Content Management

### Wix CMS Collections
- **Blog Posts**: Title, content, author, categories, SEO
- **Podcast Episodes**: Audio, show notes, guests, transcripts
- **Case Studies**: Client, challenge, solution, results
- **Tools**: Name, description, features, pricing, demos

### Content Migration
- Substack blog posts → Wix Blog CMS
- Podcast episodes → Wix Media + CMS
- Existing content → SEO-optimized pages

## Key Integrations

### Required APIs
- **OpenAI**: Chatbot and code generation
- **Stripe**: Payment processing
- **Mailchimp/ConvertKit**: Email marketing
- **Calendly**: Consultation booking
- **HubSpot**: CRM and lead management

### Security Requirements
- Store API keys in Wix Secrets
- Implement rate limiting for AI features
- Use HTTPS for all communications
- Follow GDPR compliance for EU users

## Quality Standards

### Performance Targets
- Core Web Vitals score > 90
- Page load time < 3 seconds
- Mobile performance optimized

### Accessibility Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Color contrast ratios met

### SEO Standards
- Technical SEO optimized
- Content structured for featured snippets
- Internal linking strategy implemented
- Schema markup for rich snippets

## Common Development Tasks

### Creating New Features
1. Read specification in `/specs/features/[feature-name].md`
2. Create Wix Studio components following design system
3. Implement Velo backend code for dynamic functionality
4. Test against acceptance criteria
5. Validate performance and accessibility

### Adding Content
1. Use appropriate Wix CMS collection
2. Follow content strategy guidelines
3. Optimize for SEO keywords
4. Ensure mobile-friendly formatting

### Integrating APIs
1. Store credentials in Wix Secrets
2. Implement error handling and retries
3. Add usage monitoring and rate limiting
4. Test in development and staging environments

## Deployment Process

### Environments
- **Development**: Wix Studio Preview (active development)
- **Staging**: Wix Studio Preview (stakeholder review)
- **Production**: Published Wix site (fhiriq.com)

### Quality Gates
- All specifications requirements met
- Performance benchmarks achieved
- Security scan passed
- Mobile experience verified
- Stakeholder approval received

## Support and Escalation

### Technical Issues
- Check Wix Studio documentation
- Review relevant specification for requirements
- Test in different environments
- Contact Wix support for platform issues

### Business Questions
- Refer to `/docs/prd/fhir-iq-prd.md` for business requirements
- Check specification acceptance criteria
- Escalate to product owner for scope changes

## Success Metrics

### Technical Metrics
- Core Web Vitals > 90
- Zero security vulnerabilities
- 99.9% uptime
- < 3 second page load times

### Business Metrics
- Consultation booking rate > 2%
- Newsletter signup rate > 5%
- Tool trial conversion > 15%
- Time on site > 3 minutes

When implementing features, always start by thoroughly reading the relevant specification, ask clarifying questions if needed, and ensure all acceptance criteria are met before considering the feature complete.