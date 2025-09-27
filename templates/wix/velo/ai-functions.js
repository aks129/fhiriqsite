// FHIR IQ AI Functions - Velo Backend
// Backend functions for AI-powered features

import { webMethod } from 'wix-web-module';
import { fetch } from 'wix-fetch';
import { getSecret } from 'wix-secrets-backend';

// AI Copilot API for FHIR Q&A
export const fhirCopilotAPI = {
    sendMessage: webMethod(async (message, chatHistory = []) => {
        try {
            const startTime = Date.now();

            // Rate limiting check
            const rateLimitResult = await checkRateLimit();
            if (!rateLimitResult.allowed) {
                throw new Error('Rate limit exceeded. Please wait before sending another message.');
            }

            // Get OpenAI API key from secrets
            const openaiKey = await getSecret('OPENAI_API_KEY');
            if (!openaiKey) {
                throw new Error('OpenAI API key not configured');
            }

            // Prepare system prompt for FHIR expertise
            const systemPrompt = `You are FHIR IQ Copilot, an expert AI assistant specializing in FHIR (Fast Healthcare Interoperability Resources) standards and implementation. You provide accurate, helpful guidance on:

- FHIR R4 specification and resources
- HL7 standards and healthcare interoperability
- Implementation patterns and best practices
- Code examples in various programming languages
- SMART on FHIR authentication and authorization
- Healthcare data exchange protocols
- Troubleshooting common FHIR implementation issues

Always provide practical, actionable advice with code examples when relevant. Format code blocks properly and explain technical concepts clearly.`;

            // Build conversation context
            const messages = [
                { role: 'system', content: systemPrompt },
                ...chatHistory.slice(-10), // Keep last 10 messages for context
                { role: 'user', content: message }
            ];

            // Call OpenAI API
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${openaiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: messages,
                    max_tokens: 1000,
                    temperature: 0.7,
                    presence_penalty: 0.1,
                    frequency_penalty: 0.1
                })
            });

            if (!response.ok) {
                throw new Error(`OpenAI API error: ${response.status}`);
            }

            const data = await response.json();
            const responseTime = Date.now() - startTime;

            // Extract and validate response
            const assistantMessage = data.choices[0]?.message?.content;
            if (!assistantMessage) {
                throw new Error('Invalid response from OpenAI API');
            }

            // Log interaction for analytics
            await logChatInteraction({
                userMessage: message,
                assistantResponse: assistantMessage,
                responseTime,
                model: 'gpt-4',
                tokensUsed: data.usage?.total_tokens || 0
            });

            return {
                message: assistantMessage,
                responseTime,
                hasCodeExample: assistantMessage.includes('```'),
                tokensUsed: data.usage?.total_tokens || 0
            };

        } catch (error) {
            console.error('FHIR Copilot error:', error);

            // Return user-friendly error message
            return {
                message: 'I apologize, but I encountered an error processing your request. Please try again in a moment.',
                error: true,
                responseTime: 0
            };
        }
    })
};

// AI App Builder API for generating FHIR applications
export const appBuilderAPI = {
    generateApp: webMethod(async (config) => {
        try {
            // Validate input configuration
            const validatedConfig = validateAppConfig(config);

            // Fetch and validate CapabilityStatement
            const capabilityStatement = await fetchCapabilityStatement(validatedConfig.capabilityStatementUrl);

            // Generate application scaffold
            const scaffold = await generateAppScaffold(validatedConfig, capabilityStatement);

            // Create ZIP file
            const zipBuffer = await createZipFile(scaffold);

            // Log generation for analytics
            await logAppGeneration(validatedConfig);

            return {
                success: true,
                downloadUrl: await uploadZipFile(zipBuffer, validatedConfig.projectName),
                generatedFiles: Object.keys(scaffold.files).length,
                estimatedSetupTime: '5 minutes'
            };

        } catch (error) {
            console.error('App Builder error:', error);
            throw new Error(`Failed to generate application: ${error.message}`);
        }
    })
};

// Helper Functions

async function checkRateLimit() {
    // Implement rate limiting logic
    // For demo purposes, allowing all requests
    return { allowed: true };
}

async function fetchCapabilityStatement(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch CapabilityStatement: ${response.status}`);
        }

        const capabilityStatement = await response.json();

        // Validate it's a proper CapabilityStatement
        if (capabilityStatement.resourceType !== 'CapabilityStatement') {
            throw new Error('URL does not point to a valid CapabilityStatement');
        }

        return capabilityStatement;
    } catch (error) {
        throw new Error(`Invalid CapabilityStatement URL: ${error.message}`);
    }
}

function validateAppConfig(config) {
    const required = ['capabilityStatementUrl', 'stack', 'projectName'];
    const missing = required.filter(field => !config[field]);

    if (missing.length > 0) {
        throw new Error(`Missing required fields: ${missing.join(', ')}`);
    }

    const validStacks = ['node_hapi', 'dotnet_firely', 'python_fastapi'];
    if (!validStacks.includes(config.stack)) {
        throw new Error(`Invalid stack. Must be one of: ${validStacks.join(', ')}`);
    }

    return {
        ...config,
        resources: config.resources || ['Patient', 'Observation'],
        appType: config.appType || 'standalone'
    };
}

async function generateAppScaffold(config, capabilityStatement) {
    // Get template for the selected stack
    const template = await getStackTemplate(config.stack);

    // Generate files based on configuration
    const files = {};

    // Generate main application files
    files['package.json'] = generatePackageJson(config);
    files['README.md'] = generateReadme(config);
    files['docker-compose.yml'] = generateDockerCompose(config);
    files['.env.example'] = generateEnvExample(config);

    // Generate resource-specific files
    config.resources.forEach(resource => {
        const resourceFiles = generateResourceFiles(resource, config, template);
        Object.assign(files, resourceFiles);
    });

    // Generate test files
    const testFiles = generateTestFiles(config);
    Object.assign(files, testFiles);

    return { files, config };
}

async function getStackTemplate(stack) {
    // Return template configuration for the specified stack
    const templates = {
        node_hapi: {
            framework: 'Express.js + HAPI FHIR',
            language: 'JavaScript/TypeScript',
            testFramework: 'Jest',
            port: 3000
        },
        dotnet_firely: {
            framework: '.NET Core + Firely SDK',
            language: 'C#',
            testFramework: 'xUnit',
            port: 5000
        },
        python_fastapi: {
            framework: 'FastAPI + FHIR-Parser',
            language: 'Python',
            testFramework: 'pytest',
            port: 8000
        }
    };

    return templates[stack];
}

function generatePackageJson(config) {
    // Generate package.json based on stack and configuration
    const basePackage = {
        name: config.projectName.toLowerCase().replace(/\s+/g, '-'),
        version: '1.0.0',
        description: `FHIR application generated by FHIR IQ AI Builder`,
        main: 'index.js',
        scripts: {
            start: 'node index.js',
            dev: 'nodemon index.js',
            test: 'jest',
            'docker:up': 'docker-compose up -d',
            'docker:down': 'docker-compose down'
        },
        dependencies: {},
        devDependencies: {}
    };

    // Add stack-specific dependencies
    if (config.stack === 'node_hapi') {
        basePackage.dependencies = {
            'express': '^4.18.0',
            'fhir-kit-client': '^1.9.0',
            'node-fhir-server-core': '^2.2.0',
            'dotenv': '^16.0.0'
        };
        basePackage.devDependencies = {
            'nodemon': '^2.0.0',
            'jest': '^29.0.0',
            'supertest': '^6.0.0'
        };
    }

    return JSON.stringify(basePackage, null, 2);
}

function generateReadme(config) {
    return `# ${config.projectName}

FHIR application generated by FHIR IQ AI Builder.

## Stack
- **Framework**: ${config.stack}
- **Resources**: ${config.resources.join(', ')}
- **App Type**: ${config.appType}

## Quick Start

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Copy environment variables:
   \`\`\`bash
   cp .env.example .env
   \`\`\`

3. Start the FHIR server:
   \`\`\`bash
   npm run docker:up
   \`\`\`

4. Run the application:
   \`\`\`bash
   npm run dev
   \`\`\`

## Generated Features

- ✅ FHIR server integration
- ✅ Basic CRUD operations for selected resources
- ✅ Docker Compose setup
- ✅ Unit tests
- ✅ Environment configuration

## Next Steps

1. Configure your FHIR server connection in \`.env\`
2. Review and customize the generated resource handlers
3. Add authentication if required
4. Deploy to your preferred platform

---
Generated with ❤️ by [FHIR IQ](https://fhiriq.com)
`;
}

function generateDockerCompose(config) {
    return `version: '3.8'

services:
  fhir-server:
    image: hapiproject/hapi:latest
    ports:
      - "8080:8080"
    environment:
      - spring.datasource.url=jdbc:h2:mem:testdb
      - hapi.fhir.validation_requests_enabled=true
      - hapi.fhir.fhirpath_interceptor_enabled=true
    volumes:
      - hapi-data:/data/hapi

volumes:
  hapi-data:
`;
}

function generateEnvExample(config) {
    return `# FHIR Server Configuration
FHIR_BASE_URL=http://localhost:8080/fhir
FHIR_VERSION=R4

# Application Configuration
PORT=3000
NODE_ENV=development

# Authentication (if using SMART on FHIR)
CLIENT_ID=your-client-id
CLIENT_SECRET=your-client-secret
REDIRECT_URI=http://localhost:3000/callback

# Logging
LOG_LEVEL=info
`;
}

function generateResourceFiles(resource, config, template) {
    // Generate resource-specific handler files
    const files = {};

    if (config.stack === 'node_hapi') {
        files[`src/resources/${resource.toLowerCase()}.js`] = generateNodeResourceHandler(resource);
        files[`src/routes/${resource.toLowerCase()}.js`] = generateNodeRoutes(resource);
    }

    return files;
}

function generateNodeResourceHandler(resource) {
    return `// ${resource} Resource Handler
const FhirKitClient = require('fhir-kit-client');

class ${resource}Handler {
    constructor() {
        this.client = new FhirKitClient({
            baseUrl: process.env.FHIR_BASE_URL
        });
    }

    async search(params = {}) {
        try {
            const response = await this.client.search({
                resourceType: '${resource}',
                searchParams: params
            });
            return response;
        } catch (error) {
            throw new Error(\`Failed to search ${resource}: \${error.message}\`);
        }
    }

    async read(id) {
        try {
            const response = await this.client.read({
                resourceType: '${resource}',
                id: id
            });
            return response;
        } catch (error) {
            throw new Error(\`Failed to read ${resource}: \${error.message}\`);
        }
    }

    async create(resource) {
        try {
            const response = await this.client.create({
                resourceType: '${resource}',
                body: resource
            });
            return response;
        } catch (error) {
            throw new Error(\`Failed to create ${resource}: \${error.message}\`);
        }
    }

    async update(id, resource) {
        try {
            const response = await this.client.update({
                resourceType: '${resource}',
                id: id,
                body: resource
            });
            return response;
        } catch (error) {
            throw new Error(\`Failed to update ${resource}: \${error.message}\`);
        }
    }

    async delete(id) {
        try {
            const response = await this.client.delete({
                resourceType: '${resource}',
                id: id
            });
            return response;
        } catch (error) {
            throw new Error(\`Failed to delete ${resource}: \${error.message}\`);
        }
    }
}

module.exports = ${resource}Handler;
`;
}

function generateNodeRoutes(resource) {
    return `// ${resource} Routes
const express = require('express');
const ${resource}Handler = require('../resources/${resource.toLowerCase()}');

const router = express.Router();
const ${resource.toLowerCase()}Handler = new ${resource}Handler();

// Search ${resource}s
router.get('/', async (req, res) => {
    try {
        const result = await ${resource.toLowerCase()}Handler.search(req.query);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get specific ${resource}
router.get('/:id', async (req, res) => {
    try {
        const result = await ${resource.toLowerCase()}Handler.read(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Create ${resource}
router.post('/', async (req, res) => {
    try {
        const result = await ${resource.toLowerCase()}Handler.create(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update ${resource}
router.put('/:id', async (req, res) => {
    try {
        const result = await ${resource.toLowerCase()}Handler.update(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete ${resource}
router.delete('/:id', async (req, res) => {
    try {
        await ${resource.toLowerCase()}Handler.delete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
`;
}

function generateTestFiles(config) {
    const files = {};

    config.resources.forEach(resource => {
        files[`tests/${resource.toLowerCase()}.test.js`] = generateNodeTest(resource);
    });

    return files;
}

function generateNodeTest(resource) {
    return `// ${resource} Tests
const request = require('supertest');
const app = require('../app');

describe('${resource} API', () => {
    describe('GET /${resource.toLowerCase()}', () => {
        it('should return ${resource} list', async () => {
            const response = await request(app)
                .get('/${resource.toLowerCase()}')
                .expect(200);

            expect(response.body).toBeDefined();
        });
    });

    describe('GET /${resource.toLowerCase()}/:id', () => {
        it('should return specific ${resource}', async () => {
            // This test requires a valid ${resource} ID
            // Replace 'test-id' with an actual ID for integration tests
            const response = await request(app)
                .get('/${resource.toLowerCase()}/test-id')
                .expect(404); // Expecting 404 since 'test-id' doesn't exist
        });
    });
});
`;
}

async function createZipFile(scaffold) {
    // In a real implementation, you would use a ZIP library
    // For this template, returning a mock buffer
    return Buffer.from('mock-zip-content');
}

async function uploadZipFile(zipBuffer, projectName) {
    // Upload to Wix Media and return download URL
    // For demo purposes, returning a mock URL
    return `https://static.wixstatic.com/downloads/${projectName}-${Date.now()}.zip`;
}

async function logChatInteraction(data) {
    // Log chat interaction for analytics
    console.log('Chat interaction:', {
        timestamp: new Date().toISOString(),
        responseTime: data.responseTime,
        tokensUsed: data.tokensUsed,
        hasCodeExample: data.hasCodeExample
    });
}

async function logAppGeneration(config) {
    // Log app generation for analytics
    console.log('App generated:', {
        timestamp: new Date().toISOString(),
        stack: config.stack,
        resources: config.resources,
        appType: config.appType
    });
}