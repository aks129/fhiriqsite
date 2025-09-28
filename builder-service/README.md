# FHIR IQ Builder Service

External service for generating FHIR application scaffolds. This service accepts configuration parameters and generates complete, runnable FHIR applications with documentation.

## Overview

The Builder Service is a Node.js/TypeScript application that:

1. **Analyzes FHIR Capability Statements** to understand server capabilities
2. **Generates Application Scaffolds** using configurable templates
3. **Creates ZIP Downloads** with complete application code
4. **Provides RESTful API** for integration with Wix and other frontends

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The service will start on http://localhost:3001

### Production

```bash
npm run build
npm start
```

## API Endpoints

### POST /api/builder/generate

Generates a FHIR application scaffold.

**Request Body:**
```json
{
  "capabilityStatementUrl": "https://hapi.fhir.org/baseR4/metadata",
  "stack": "node_hapi",
  "resources": ["Patient", "Observation", "Condition"],
  "appName": "My FHIR App",
  "description": "A healthcare application"
}
```

**Response:**
```json
{
  "success": true,
  "buildId": "uuid-here",
  "downloadUrl": "/api/builder/download/uuid-here",
  "expiresAt": "2024-01-01T00:00:00.000Z",
  "metadata": {
    "stack": "node_hapi",
    "resources": ["Patient", "Observation", "Condition"],
    "generatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### GET /api/builder/download/:buildId

Downloads the generated application ZIP file.

### GET /api/builder/capability-statement

Analyzes a FHIR Capability Statement.

**Query Parameters:**
- `url`: URL to the capability statement

**Response:**
```json
{
  "success": true,
  "url": "https://hapi.fhir.org/baseR4/metadata",
  "analysis": {
    "serverUrl": "https://hapi.fhir.org/baseR4",
    "version": "4.0.1",
    "supportedResources": ["Patient", "Observation", "..."],
    "interactions": {
      "Patient": ["read", "search-type", "create", "update"]
    },
    "searchParameters": {
      "Patient": ["_id", "identifier", "name", "family"]
    },
    "recommendedResources": ["Patient", "Observation", "Condition"]
  }
}
```

### GET /health

Health check endpoint.

## Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```env
PORT=3001
NODE_ENV=development
LOG_LEVEL=INFO
ALLOWED_ORIGINS=http://localhost:3000,https://*.wixsite.com
MAX_FILE_SIZE=50mb
BUILD_RETENTION_HOURS=24
```

### Supported Stacks

- **node_hapi**: Node.js + HAPI FHIR + React
- **next_fhir**: Next.js + FHIR Client (Coming Soon)
- **python_flask**: Python + Flask + FHIR Client (Coming Soon)

## Template System

Templates are stored in `/templates/{stack-name}/` and support variable replacement:

### Template Variables

- `{{APP_NAME}}`: Application name
- `{{APP_DESCRIPTION}}`: Application description
- `{{FHIR_SERVER_URL}}`: FHIR server base URL
- `{{FHIR_RESOURCES}}`: JSON array of selected resources
- `{{GENERATED_AT}}`: Generation timestamp

### Template Loops

```javascript
{{#EACH_RESOURCE}}
// This block is repeated for each selected resource
const {{RESOURCE_NAME_LOWER}}Routes = require('./routes/{{RESOURCE_NAME_LOWER}}');
{{/EACH_RESOURCE}}
```

### Conditional Blocks

```javascript
{{#IF_RESOURCE:Patient}}
// This block is only included if Patient resource is selected
const patientService = require('./services/patient');
{{/IF_RESOURCE:Patient}}
```

## Architecture

```
builder-service/
├── src/
│   ├── index.ts              # Express server setup
│   ├── routes/
│   │   └── builder.ts        # API routes
│   ├── services/
│   │   ├── BuilderService.ts # Main build orchestration
│   │   ├── TemplateService.ts # Template processing
│   │   └── FHIRAnalyzer.ts   # Capability statement analysis
│   ├── middleware/
│   │   └── errorHandler.ts   # Error handling
│   └── utils/
│       └── logger.ts         # Logging utilities
├── templates/
│   └── node_hapi/           # HAPI FHIR template
└── builds/                  # Generated ZIP files (temporary)
```

## Deployment

### Vercel

```bash
npm run deploy:vercel
```

### Google Cloud Run

```bash
# Build container
docker build -t gcr.io/YOUR_PROJECT/fhir-builder .

# Deploy to Cloud Run
gcloud run deploy fhir-builder \
  --image gcr.io/YOUR_PROJECT/fhir-builder \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### AWS Lambda

```bash
# Package for Lambda deployment
npm run build
zip -r function.zip dist/ node_modules/

# Deploy with AWS CLI or Serverless Framework
```

### Railway

```bash
# Connect to Railway
railway login
railway link

# Deploy
railway up
```

## Development

### Adding New Templates

1. Create template directory: `/templates/new-stack/`
2. Add template files with `.template` extension
3. Use template variables and conditionals
4. Update `TECH_STACKS` in Builder.jsx
5. Test with sample capability statement

### Adding New Features

1. Update API types in `routes/builder.ts`
2. Extend `TemplateService` for new functionality
3. Add tests in `/tests/`
4. Update documentation

### Testing

```bash
# Unit tests
npm test

# Integration tests (requires running service)
npm run test:integration

# Load testing
npm run test:load
```

## Monitoring

### Metrics Endpoint

GET `/metrics` provides application metrics:

```json
{
  "timestamp": "2024-01-01T00:00:00.000Z",
  "application": "@fhiriq/builder-service",
  "process": {
    "uptime": 3600,
    "memory": {
      "heapUsed": 50,
      "heapTotal": 100
    }
  },
  "builds": {
    "total": 150,
    "active": 3,
    "failed": 2
  }
}
```

### Health Checks

- `/health`: Application health
- `/ready`: Readiness for load balancer
- `/live`: Kubernetes liveness probe

### Logging

Structured JSON logging with configurable levels:

```bash
LOG_LEVEL=DEBUG npm start
```

## Security

### Rate Limiting

Configurable rate limiting per IP:

```env
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100  # 100 requests per window
```

### CORS

Configure allowed origins:

```env
ALLOWED_ORIGINS=https://yourdomain.com,https://*.wixsite.com
```

### File Size Limits

```env
MAX_FILE_SIZE=50mb
```

## Troubleshooting

### Common Issues

1. **"Template not found" errors**
   - Verify template directory exists
   - Check file permissions
   - Ensure template files have `.template` extension

2. **"Capability statement analysis failed"**
   - Verify FHIR server URL is accessible
   - Check CORS configuration on FHIR server
   - Validate capability statement format

3. **Memory issues with large builds**
   - Increase Node.js heap size: `--max-old-space-size=4096`
   - Optimize template file sizes
   - Implement build cleanup

### Debug Mode

```bash
DEBUG=* npm run dev
```

### Logging

Check logs for detailed error information:

```bash
tail -f logs/application.log
```

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-template`
3. Make changes and add tests
4. Submit pull request

## License

MIT License - see LICENSE file for details.

## Support

- Documentation: https://docs.fhiriq.com/builder
- Issues: https://github.com/fhiriq/builder-service/issues
- Email: support@fhiriq.com