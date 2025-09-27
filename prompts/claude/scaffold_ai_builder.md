# Claude Code Prompt: AI FHIR App Builder

You are implementing the AI FHIR App Builder feature specification located in `/specs/features/fhir-app-builder-complete.md`.

## Context
Read the following specification files in order:
1. `/specs/site.yaml` - Global objectives and project context
2. `/specs/design-tokens.yaml` - Design system tokens and styling
3. `/specs/collections.yaml` - CMS data models
4. `/specs/features/fhir-app-builder-complete.md` - Feature specification

## Implementation Requirements

### Core Functionality
Create a Wix Studio page with Velo backend that implements:

1. **Builder Interface** (`/tools/ai-builder`)
   - Form to collect user requirements:
     - FHIR server URL or CapabilityStatement URL
     - Target stack selection (Node.js + HAPI FHIR, .NET + Firely, Python + FastAPI)
     - FHIR resources selection (Patient, Encounter, Observation, etc.)
     - Application type (SMART on FHIR, standalone, etc.)
   - Real-time validation of inputs
   - Progress indicator during generation

2. **API Endpoint** (`/api/scaffold`)
   - Velo backend function that accepts:
     ```javascript
     {
       capabilityStatementUrl: string,
       stack: "node_hapi" | "dotnet_firely" | "python_fastapi",
       resources: string[],
       appType: "smart_on_fhir" | "standalone",
       projectName: string
     }
     ```
   - Fetches and validates CapabilityStatement
   - Generates project scaffold using templates
   - Returns downloadable ZIP file

3. **Template System**
   - Use templates from `/templates/` directory
   - Support for multiple technology stacks
   - Include Docker Compose setup for local development
   - Generate basic CRUD operations for selected resources
   - Include authentication setup (SMART on FHIR or basic auth)

### Technical Implementation

#### Wix Studio Components
- Create reusable form components following design system
- Implement responsive design for mobile/tablet/desktop
- Use Wix design system elements where possible
- Add proper loading states and error handling

#### Velo Backend
- Implement secure API endpoints
- Add rate limiting and input validation
- Store API keys in Wix Secrets
- Implement proper error handling and logging
- Add analytics tracking for feature usage

#### Generated Code Quality
- TypeScript for Node.js stacks
- ESLint and Prettier configuration
- Basic unit tests for generated endpoints
- Docker setup for easy local development
- README with setup and usage instructions
- Environment variable configuration

### Constraints
- Follow Wix Studio and Velo best practices
- Ensure HIPAA-conscious development (no PHI storage)
- Implement proper security measures
- Use design tokens from design system
- Follow existing code patterns in the project

### Testing Requirements
- Test CapabilityStatement fetching with public FHIR servers
- Validate generated project structure
- Ensure ZIP download functionality works
- Test with different stack combinations
- Verify mobile responsiveness

### Success Criteria
- User can generate a working FHIR application in under 5 minutes
- Generated code follows best practices for the chosen stack
- Application includes proper error handling and logging
- ZIP download contains all necessary files for immediate development
- Feature usage is tracked for analytics

## Output Format
Provide implementation in the following order:
1. Wix Studio page structure and components
2. Velo backend API functions
3. Template files for code generation
4. Testing strategy and validation
5. Summary of implemented features and any limitations

Focus on creating a production-ready feature that demonstrates FHIR IQ's technical capabilities while providing real value to users.