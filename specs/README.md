# FHIR IQ Website Spec Kit

## Overview
This directory contains the complete specification kit for the FHIR IQ website redesign using spec-driven development methodology. Each specification is designed to be implementable by Claude Code in iterative cycles.

## Spec Kit Structure

```
specs/
├── design-system/       # Visual identity, components, design tokens
│   ├── accessibility-performance.md
│   ├── brand-guidelines.md
│   ├── brand-identity.md
│   ├── component-library.md
│   ├── motion-interactions.md
│   └── wix-implementation.md
├── site-architecture/   # IA, navigation, page structure
│   ├── complete-sitemap.md
│   ├── information-architecture.md
│   ├── seo-strategy.md
│   └── wix-cms-collections.md
├── features/           # AI chatbot, tools, interactive components
│   ├── ai-chatbot.md
│   ├── commerce-system-complete.md
│   ├── fhir-app-builder-complete.md
│   ├── fhir-builder-ai.md
│   ├── fhir-iq-copilot-complete.md
│   ├── partners-testimonials-complete.md
│   └── tools-catalog-complete.md
├── integrations/       # Wix Studio, Velo, third-party APIs
│   ├── third-party-apis.md
│   └── wix-commerce.md
├── content/           # Content strategy, CMS structure
│   └── content-strategy.md
├── strategy/          # Business strategy and competitive positioning
│   ├── competitive-analysis.md
│   ├── content-positioning.md
│   ├── design-differentiation.md
│   └── implementation-roadmap.md
└── workflows/         # Development process, deployment, security
    ├── deployment-process.md
    ├── security-compliance.md
    ├── spec-driven-development.md
    └── testing-strategy.md
```

## Specification Coverage

### Core Areas Covered
- **28 Specification Files** covering all aspects of development
- **25,000+ Lines** of detailed implementation guidance
- **Complete FHIR Focus** with healthcare compliance requirements
- **Production-Ready** security and compliance specifications
- **Wix Studio Optimized** for rapid deployment platform

## Development Philosophy

**Spec-Driven**: Every feature starts with a detailed specification before implementation
**AI-Assisted**: Claude Code implements from specs in tight feedback loops
**Iterative**: Build, test, refine in small cycles
**Wix-Native**: Leverage Wix Studio + Velo for rapid deployment

## Implementation Process

1. **Spec Review**: Read and understand the specification
2. **Component Build**: Implement using Wix Studio + Velo
3. **Integration Test**: Verify against spec requirements
4. **Iteration**: Refine based on testing and feedback
5. **Documentation**: Update specs with learnings

## Getting Started

1. Review `/docs/prd/fhir-iq-prd.md` for project overview
2. Start with `/specs/design-system/` for visual foundation
3. Progress through `/specs/site-architecture/` for structure
4. Implement features from `/specs/features/` directory
5. Follow workflows in `/specs/workflows/` for process

## Spec Format

Each spec follows this template:
- **Purpose**: What this component achieves
- **Requirements**: Functional and non-functional needs
- **Acceptance Criteria**: Testable success conditions
- **Implementation Notes**: Wix/Velo specific guidance
- **Dependencies**: What must exist first
- **Testing**: How to verify correctness