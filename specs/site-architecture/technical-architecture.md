# Technical Architecture Specification - Wix Studio + Velo + External Services

## Purpose
Define the complete technical architecture for FHIR IQ platform, integrating Wix Studio's visual development capabilities with Velo's custom code functionality and external services to deliver advanced AI-powered FHIR development tools while maintaining platform simplicity and scalability.

## Architecture Overview

### System Architecture Diagram
```
┌─────────────────────────────────────────────────────────────────────┐
│                           Frontend Layer                            │
├─────────────────────────────────────────────────────────────────────┤
│  Wix Studio Templates + Design System Tokens                       │
│  ├── Static Pages (Home, About, Pricing)                          │
│  ├── Dynamic Pages (Tools, Courses, Blog)                         │
│  └── Custom Velo Components (Chatbot, FHIR Builder)               │
├─────────────────────────────────────────────────────────────────────┤
│                          Backend Layer                              │
├─────────────────────────────────────────────────────────────────────┤
│  Wix Velo HTTP Functions                                           │
│  ├── API Proxying (GitHub, Stripe, AI Services)                   │
│  ├── Webhook Handlers (Stripe, GitHub, Calendly)                  │
│  ├── Data Processing (Vector embeddings, Quiz scoring)            │
│  └── Authentication & Authorization (Role-based access)           │
├─────────────────────────────────────────────────────────────────────┤
│                         Data Layer                                  │
├─────────────────────────────────────────────────────────────────────┤
│  Wix Collections (CMS, Products, Users)                           │
│  ├── Content Management (Tools, Courses, Blog)                    │
│  ├── E-commerce Data (Products, Orders, Payments)                 │
│  ├── User Management (Profiles, Subscriptions, Progress)          │
│  └── Analytics Data (Events, Funnels, Performance)               │
│                                                                     │
│  External Postgres (Optional)                                      │
│  ├── Quiz Progress & Detailed Analytics                           │
│  ├── License Management & Usage Tracking                          │
│  └── Advanced Reporting & Data Warehousing                       │
├─────────────────────────────────────────────────────────────────────┤
│                       External Services                             │
├─────────────────────────────────────────────────────────────────────┤
│  AI Services: Claude (Anthropic) + OpenAI                         │
│  Vector Database: Pinecone/Weaviate/Supabase Vector              │
│  GitHub App: Repository scaffolding & management                  │
│  Calendly: Meeting scheduling & booking                           │
│  Stripe: Payment processing & subscription management             │
│  Analytics: GA4, PostHog, Uptime monitoring                       │
└─────────────────────────────────────────────────────────────────────┘
```

## Frontend Architecture

### Wix Studio Template System
```javascript
// File: frontend/template-structure.js
export const TemplateArchitecture = {
  // Static template pages
  staticPages: {
    homepage: {
      template: 'wix-studio-homepage',
      customizations: ['hero-section', 'feature-grid', 'testimonials'],
      designTokens: ['colors.primary', 'typography.headings', 'spacing.sections']
    },

    about: {
      template: 'wix-studio-about',
      customizations: ['team-grid', 'company-story', 'values-section'],
      designTokens: ['colors.secondary', 'typography.body', 'components.cards']
    },

    pricing: {
      template: 'wix-studio-pricing',
      customizations: ['pricing-tiers', 'feature-comparison', 'faq-section'],
      designTokens: ['colors.accent', 'components.buttons', 'layouts.grid']
    }
  },

  // Dynamic content pages
  dynamicPages: {
    tools: {
      template: 'dynamic-tool-detail',
      dataSource: 'Tools collection',
      customFields: ['screenshots-gallery', 'pricing-display', 'demo-embed'],
      seoFields: ['metaTitle', 'metaDescription', 'structuredData']
    },

    courses: {
      template: 'dynamic-course-detail',
      dataSource: 'Courses collection',
      customFields: ['schedule-display', 'instructor-bio', 'enrollment-form'],
      integrations: ['calendly-booking', 'stripe-checkout']
    },

    blog: {
      template: 'dynamic-blog-post',
      dataSource: 'BlogPosts collection',
      customFields: ['author-bio', 'related-posts', 'social-sharing'],
      syndication: ['canonical-urls', 'cross-posting']
    }
  }
};
```

### Design System Token Integration
```javascript
// File: frontend/design-tokens.js
export const DesignSystemTokens = {
  // Color tokens mapped to Wix color palette
  colors: {
    primary: {
      wixVariable: '--color-1',
      value: '#F97316', // Ember Orange
      usage: ['buttons', 'links', 'highlights']
    },

    secondary: {
      wixVariable: '--color-2',
      value: '#1E40AF', // Cobalt Blue
      usage: ['headers', 'navigation', 'accents']
    },

    neutral: {
      wixVariable: '--color-3',
      value: '#64748B', // Slate Gray
      usage: ['text', 'borders', 'backgrounds']
    }
  },

  // Typography tokens
  typography: {
    headings: {
      fontFamily: 'Inter',
      wixStyle: 'font_0',
      weights: [600, 700, 800]
    },

    body: {
      fontFamily: 'Inter',
      wixStyle: 'font_1',
      weights: [400, 500, 600]
    },

    code: {
      fontFamily: 'JetBrains Mono',
      wixStyle: 'font_2',
      weights: [400, 500]
    }
  },

  // Component tokens
  components: {
    buttons: {
      primary: {
        background: 'var(--color-1)',
        text: '#FFFFFF',
        borderRadius: '8px',
        padding: '12px 24px'
      },

      secondary: {
        background: 'transparent',
        text: 'var(--color-1)',
        border: '2px solid var(--color-1)',
        borderRadius: '8px'
      }
    },

    cards: {
      background: '#FFFFFF',
      border: '1px solid #E2E8F0',
      borderRadius: '12px',
      shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }
  }
};
```

### Custom Velo Components
```javascript
// File: frontend/velo-components/ai-chatbot.js
import { anthropic } from 'backend/ai-services';
import { wixData } from 'wix-data';

export class AIChatbot {
  constructor(containerId) {
    this.container = $w(containerId);
    this.conversationHistory = [];
    this.initializeUI();
  }

  initializeUI() {
    // Create chat interface elements
    this.container.html = `
      <div id="chatContainer" class="chat-container">
        <div id="messagesArea" class="messages-area"></div>
        <div id="inputArea" class="input-area">
          <input id="messageInput" type="text" placeholder="Ask about FHIR..." />
          <button id="sendButton">Send</button>
        </div>
      </div>
    `;

    // Bind events
    $w('#sendButton').onClick(() => this.sendMessage());
    $w('#messageInput').onKeyPress((event) => {
      if (event.key === 'Enter') this.sendMessage();
    });
  }

  async sendMessage() {
    const userMessage = $w('#messageInput').value;
    if (!userMessage.trim()) return;

    // Add user message to chat
    this.addMessage(userMessage, 'user');
    $w('#messageInput').value = '';

    // Show typing indicator
    this.showTypingIndicator();

    try {
      // Get AI response with FHIR context
      const response = await this.getAIResponse(userMessage);
      this.hideTypingIndicator();
      this.addMessage(response, 'assistant');

      // Log conversation for analytics
      await this.logConversation(userMessage, response);

    } catch (error) {
      this.hideTypingIndicator();
      this.addMessage('Sorry, I encountered an error. Please try again.', 'error');
    }
  }

  async getAIResponse(message) {
    // Call Velo backend function
    const response = await wixWindow.backend.processAIQuery({
      message,
      conversationHistory: this.conversationHistory,
      context: 'fhir-support'
    });

    this.conversationHistory.push(
      { role: 'user', content: message },
      { role: 'assistant', content: response.message }
    );

    return response.message;
  }

  addMessage(content, type) {
    const messageElement = `
      <div class="message ${type}">
        <div class="message-content">${content}</div>
        <div class="message-time">${new Date().toLocaleTimeString()}</div>
      </div>
    `;

    $w('#messagesArea').html += messageElement;

    // Scroll to bottom
    $w('#messagesArea').scrollTo();
  }

  async logConversation(userMessage, aiResponse) {
    await wixData.insert('ChatLogs', {
      userMessage,
      aiResponse,
      timestamp: new Date(),
      userId: wixUsers.currentUser.id,
      sessionId: this.sessionId
    });
  }
}
```

```javascript
// File: frontend/velo-components/fhir-builder.js
export class FHIRBuilder {
  constructor(containerId) {
    this.container = $w(containerId);
    this.currentStep = 1;
    this.builderState = {};
    this.initializeBuilder();
  }

  initializeBuilder() {
    this.container.html = `
      <div id="builderContainer" class="fhir-builder">
        <div id="stepIndicator" class="step-indicator"></div>
        <div id="stepContent" class="step-content"></div>
        <div id="navigationButtons" class="navigation-buttons">
          <button id="prevButton">Previous</button>
          <button id="nextButton">Next</button>
          <button id="generateButton" style="display:none">Generate Code</button>
        </div>
      </div>
    `;

    this.renderCurrentStep();
    this.bindEvents();
  }

  renderCurrentStep() {
    const steps = {
      1: this.renderUseCaseSelection,
      2: this.renderResourceConfiguration,
      3: this.renderImplementationOptions,
      4: this.renderCodeGeneration
    };

    const stepRenderer = steps[this.currentStep];
    if (stepRenderer) {
      stepRenderer.call(this);
    }

    this.updateStepIndicator();
    this.updateNavigationButtons();
  }

  renderUseCaseSelection() {
    $w('#stepContent').html = `
      <div class="use-case-selection">
        <h3>Select Your FHIR Use Case</h3>
        <div class="use-case-grid">
          <div class="use-case-card" data-usecase="patient-portal">
            <h4>Patient Portal</h4>
            <p>Build a patient-facing application</p>
          </div>
          <div class="use-case-card" data-usecase="provider-ehr">
            <h4>Provider EHR Integration</h4>
            <p>Connect with electronic health records</p>
          </div>
          <div class="use-case-card" data-usecase="analytics-dashboard">
            <h4>Analytics Dashboard</h4>
            <p>Create reporting and analytics tools</p>
          </div>
        </div>
      </div>
    `;

    // Bind use case selection
    $w('.use-case-card').onClick((event) => {
      const useCase = event.currentTarget.dataset.usecase;
      this.builderState.useCase = useCase;
      this.currentStep = 2;
      this.renderCurrentStep();
    });
  }

  async generateCode() {
    $w('#generateButton').label = 'Generating...';
    $w('#generateButton').disable();

    try {
      const codeGeneration = await wixWindow.backend.generateFHIRCode({
        useCase: this.builderState.useCase,
        resources: this.builderState.resources,
        implementation: this.builderState.implementation,
        userId: wixUsers.currentUser.id
      });

      this.displayGeneratedCode(codeGeneration);

    } catch (error) {
      this.showError('Code generation failed. Please try again.');
    } finally {
      $w('#generateButton').label = 'Generate Code';
      $w('#generateButton').enable();
    }
  }

  displayGeneratedCode(codeGeneration) {
    $w('#stepContent').html = `
      <div class="code-generation-results">
        <h3>Generated FHIR Application</h3>

        <div class="code-preview">
          <div class="code-tabs">
            <button class="tab-button active" data-tab="overview">Overview</button>
            <button class="tab-button" data-tab="code">Code</button>
            <button class="tab-button" data-tab="deployment">Deployment</button>
          </div>

          <div class="tab-content">
            <div id="overview-tab" class="tab-pane active">
              <p><strong>Application Type:</strong> ${codeGeneration.applicationType}</p>
              <p><strong>FHIR Version:</strong> ${codeGeneration.fhirVersion}</p>
              <p><strong>Resources Used:</strong> ${codeGeneration.resources.join(', ')}</p>

              <div class="action-buttons">
                <button id="downloadCode">Download Code</button>
                <button id="deployGitHub">Deploy to GitHub</button>
                <button id="deployVercel">Deploy to Vercel</button>
              </div>
            </div>

            <div id="code-tab" class="tab-pane">
              <pre><code>${codeGeneration.sourceCode}</code></pre>
            </div>

            <div id="deployment-tab" class="tab-pane">
              <div class="deployment-instructions">
                ${codeGeneration.deploymentInstructions}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindCodeActions(codeGeneration);
  }
}
```

## Backend Architecture

### Wix Velo HTTP Functions
```javascript
// File: backend/http-functions.js

// AI Service Proxy Functions
export async function post_processAIQuery(request) {
  const { message, conversationHistory, context } = request.body;

  try {
    // Validate request
    if (!message || message.trim().length === 0) {
      return {
        status: 400,
        body: { error: 'Message is required' }
      };
    }

    // Get FHIR context and knowledge base
    const fhirContext = await getFHIRContext(context);

    // Process with AI service
    const aiResponse = await processWithClaude({
      message,
      conversationHistory,
      context: fhirContext
    });

    // Log for analytics
    await logAIInteraction({
      userId: request.userId,
      message,
      response: aiResponse,
      context,
      timestamp: new Date()
    });

    return {
      status: 200,
      body: {
        message: aiResponse.content,
        tokens_used: aiResponse.usage,
        confidence: aiResponse.confidence
      }
    };

  } catch (error) {
    console.error('AI processing error:', error);

    return {
      status: 500,
      body: {
        error: 'AI service temporarily unavailable',
        fallback: 'Please try again or contact support'
      }
    };
  }
}

// GitHub Integration Functions
export async function post_createGitHubRepo(request) {
  const { repoName, description, codeFiles, userId } = request.body;

  try {
    // Validate user permissions
    const user = await wixUsers.getUser(userId);
    if (!user || !hasGitHubPermission(user)) {
      return {
        status: 403,
        body: { error: 'GitHub integration not available for your plan' }
      };
    }

    // Create repository via GitHub App
    const repoCreation = await githubApp.createRepository({
      name: repoName,
      description,
      private: false,
      template: 'fhir-application-template'
    });

    // Upload generated code files
    for (const file of codeFiles) {
      await githubApp.createFile({
        repo: repoCreation.name,
        path: file.path,
        content: file.content,
        message: `Initial commit: ${file.description}`
      });
    }

    // Log the creation
    await wixData.insert('GitHubRepos', {
      userId,
      repoName: repoCreation.name,
      repoUrl: repoCreation.html_url,
      createdDate: new Date(),
      useCase: request.body.useCase
    });

    return {
      status: 200,
      body: {
        repoUrl: repoCreation.html_url,
        cloneUrl: repoCreation.clone_url,
        deploymentGuide: generateDeploymentGuide(repoCreation)
      }
    };

  } catch (error) {
    console.error('GitHub repo creation error:', error);

    return {
      status: 500,
      body: { error: 'Repository creation failed' }
    };
  }
}

// Stripe Webhook Handler
export async function post_stripeWebhook(request) {
  const sig = request.headers['stripe-signature'];

  try {
    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event.data.object);
        break;

      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object);
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionCancelled(event.data.object);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return {
      status: 200,
      body: { received: true }
    };

  } catch (error) {
    console.error('Stripe webhook error:', error);

    return {
      status: 400,
      body: { error: 'Webhook signature verification failed' }
    };
  }
}

// Vector Database Integration
export async function post_createVectorEmbedding(request) {
  const { content, contentType, metadata } = request.body;

  try {
    // Generate embedding using OpenAI
    const embedding = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: content
    });

    // Store in vector database (Pinecone)
    const vectorId = await pinecone.upsert({
      vectors: [{
        id: generateUniqueId(),
        values: embedding.data[0].embedding,
        metadata: {
          content,
          contentType,
          timestamp: new Date().toISOString(),
          ...metadata
        }
      }]
    });

    return {
      status: 200,
      body: {
        vectorId,
        dimensions: embedding.data[0].embedding.length
      }
    };

  } catch (error) {
    console.error('Vector embedding error:', error);

    return {
      status: 500,
      body: { error: 'Vector embedding failed' }
    };
  }
}
```

### Authentication and Authorization
```javascript
// File: backend/auth-functions.js
import { wixUsers } from 'wix-users-backend';

export const UserRoles = {
  FREE: 'free',
  STUDENT: 'student',
  PRO: 'pro',
  ENTERPRISE: 'enterprise'
};

export const PermissionMatrix = {
  [UserRoles.FREE]: [
    'view_public_content',
    'access_basic_chatbot',
    'view_tools_catalog'
  ],

  [UserRoles.STUDENT]: [
    'view_public_content',
    'access_full_chatbot',
    'view_tools_catalog',
    'enroll_courses',
    'take_quizzes',
    'download_resources'
  ],

  [UserRoles.PRO]: [
    'view_public_content',
    'access_full_chatbot',
    'view_tools_catalog',
    'enroll_courses',
    'take_quizzes',
    'download_resources',
    'use_fhir_builder',
    'create_github_repos',
    'priority_support'
  ],

  [UserRoles.ENTERPRISE]: [
    'view_public_content',
    'access_full_chatbot',
    'view_tools_catalog',
    'enroll_courses',
    'take_quizzes',
    'download_resources',
    'use_fhir_builder',
    'create_github_repos',
    'priority_support',
    'bulk_user_management',
    'analytics_dashboard',
    'custom_integrations'
  ]
};

export async function checkUserPermission(userId, permission) {
  try {
    const user = await wixUsers.getUser(userId);
    if (!user) return false;

    // Get user role from profile or subscription
    const userRole = await getUserRole(userId);
    const allowedPermissions = PermissionMatrix[userRole] || [];

    return allowedPermissions.includes(permission);

  } catch (error) {
    console.error('Permission check error:', error);
    return false;
  }
}

export async function getUserRole(userId) {
  try {
    // Check active subscription
    const subscription = await wixData.query('Subscriptions')
      .eq('userId', userId)
      .eq('status', 'active')
      .find();

    if (subscription.items.length > 0) {
      return subscription.items[0].plan;
    }

    // Check one-time purchases
    const purchases = await wixData.query('Orders')
      .eq('userId', userId)
      .eq('status', 'completed')
      .find();

    if (purchases.items.length > 0) {
      return UserRoles.STUDENT;
    }

    return UserRoles.FREE;

  } catch (error) {
    console.error('Role determination error:', error);
    return UserRoles.FREE;
  }
}

export async function upgradeUserRole(userId, newRole, transactionId) {
  try {
    // Update user profile
    await wixUsers.updateUserProfile(userId, {
      role: newRole,
      upgradeDate: new Date(),
      transactionId
    });

    // Log role change
    await wixData.insert('RoleChanges', {
      userId,
      previousRole: await getUserRole(userId),
      newRole,
      transactionId,
      timestamp: new Date()
    });

    // Trigger welcome sequence for new role
    await triggerRoleWelcomeSequence(userId, newRole);

    return true;

  } catch (error) {
    console.error('Role upgrade error:', error);
    return false;
  }
}
```

## External Service Integrations

### AI Services Configuration
```javascript
// File: backend/ai-services.js
import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';

// Anthropic Claude Configuration
export const anthropic = new Anthropic({
  apiKey: getSecret('ANTHROPIC_API_KEY'),
  maxRetries: 3,
  timeout: 30000
});

// OpenAI Configuration
export const openai = new OpenAI({
  apiKey: getSecret('OPENAI_API_KEY'),
  maxRetries: 3,
  timeout: 30000
});

export async function processWithClaude(params) {
  const { message, conversationHistory, context } = params;

  try {
    const systemPrompt = buildFHIRSystemPrompt(context);

    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 4000,
      temperature: 0.7,
      system: systemPrompt,
      messages: [
        ...conversationHistory,
        { role: 'user', content: message }
      ]
    });

    return {
      content: response.content[0].text,
      usage: response.usage,
      confidence: calculateConfidence(response)
    };

  } catch (error) {
    console.error('Claude API error:', error);
    throw new Error('AI service unavailable');
  }
}

export async function generateFHIRCode(params) {
  const { useCase, resources, implementation, userId } = params;

  try {
    // Check user permissions
    if (!await checkUserPermission(userId, 'use_fhir_builder')) {
      throw new Error('FHIR Builder not available for your plan');
    }

    // Build code generation prompt
    const codePrompt = buildCodeGenerationPrompt({
      useCase,
      resources,
      implementation
    });

    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 8000,
      temperature: 0.3,
      system: 'You are an expert FHIR developer. Generate production-ready code.',
      messages: [{ role: 'user', content: codePrompt }]
    });

    // Parse and structure the generated code
    const codeGeneration = parseCodeGeneration(response.content[0].text);

    // Log generation for analytics
    await logCodeGeneration({
      userId,
      useCase,
      resources,
      implementation,
      codeLength: codeGeneration.sourceCode.length,
      timestamp: new Date()
    });

    return codeGeneration;

  } catch (error) {
    console.error('Code generation error:', error);
    throw error;
  }
}

function buildFHIRSystemPrompt(context) {
  return `You are FHIR IQ Assistant, an expert in FHIR (Fast Healthcare Interoperability Resources) and healthcare data standards.

Your expertise includes:
- FHIR R4 and R5 specifications
- Healthcare data interoperability
- Implementation guides and profiles
- Clinical terminology (SNOMED CT, LOINC, ICD-10)
- Healthcare integration patterns
- Privacy and security in healthcare (HIPAA)

Context: ${context}

Guidelines:
- Provide accurate, actionable FHIR guidance
- Include relevant code examples when helpful
- Reference official FHIR specifications
- Consider security and privacy implications
- Be concise but thorough
- Ask clarifying questions when needed`;
}
```

### Vector Database Integration
```javascript
// File: backend/vector-database.js
import { PineconeClient } from '@pinecone-database/pinecone';

export const pinecone = new PineconeClient({
  apiKey: getSecret('PINECONE_API_KEY'),
  environment: getSecret('PINECONE_ENVIRONMENT')
});

export async function initializeVectorDB() {
  try {
    // Initialize Pinecone index
    const indexName = 'fhir-knowledge-base';

    const indexExists = await pinecone.describeIndex({ indexName });

    if (!indexExists) {
      await pinecone.createIndex({
        indexName,
        dimension: 1536, // OpenAI embedding dimension
        metric: 'cosine',
        replicas: 1
      });
    }

    return pinecone.Index(indexName);

  } catch (error) {
    console.error('Vector DB initialization error:', error);
    throw error;
  }
}

export async function searchSimilarContent(query, limit = 5) {
  try {
    // Generate query embedding
    const embedding = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: query
    });

    // Search vector database
    const index = await initializeVectorDB();
    const searchResults = await index.query({
      vector: embedding.data[0].embedding,
      topK: limit,
      includeMetadata: true
    });

    return searchResults.matches.map(match => ({
      content: match.metadata.content,
      score: match.score,
      contentType: match.metadata.contentType,
      source: match.metadata.source
    }));

  } catch (error) {
    console.error('Vector search error:', error);
    return [];
  }
}

export async function buildKnowledgeBase() {
  try {
    // Index FHIR documentation
    await indexFHIRDocumentation();

    // Index course content
    await indexCourseContent();

    // Index blog posts and articles
    await indexBlogContent();

    // Index tool documentation
    await indexToolDocumentation();

    console.log('Knowledge base indexing completed');

  } catch (error) {
    console.error('Knowledge base building error:', error);
  }
}

async function indexFHIRDocumentation() {
  // Implementation for indexing FHIR spec content
  const fhirResources = await fetchFHIRSpecification();

  for (const resource of fhirResources) {
    await createVectorEmbedding({
      content: resource.description,
      contentType: 'fhir-documentation',
      metadata: {
        resourceType: resource.type,
        version: resource.version,
        url: resource.url
      }
    });
  }
}
```

### GitHub App Integration
```javascript
// File: backend/github-integration.js
import { App } from '@octokit/app';

export const githubApp = new App({
  appId: getSecret('GITHUB_APP_ID'),
  privateKey: getSecret('GITHUB_PRIVATE_KEY'),
  webhooks: {
    secret: getSecret('GITHUB_WEBHOOK_SECRET')
  }
});

export async function createFHIRRepository(params) {
  const { repoName, description, template, userId } = params;

  try {
    // Get installation for the organization/user
    const installation = await githubApp.getInstallationOctokit(
      getSecret('GITHUB_INSTALLATION_ID')
    );

    // Create repository from template
    const repo = await installation.rest.repos.createUsingTemplate({
      template_owner: 'fhir-iq',
      template_repo: template || 'fhir-app-template',
      owner: 'fhir-iq', // Or user's GitHub username
      name: repoName,
      description,
      private: false,
      include_all_branches: false
    });

    // Set up initial configuration
    await setupRepoConfiguration(installation, repo.data);

    return {
      name: repo.data.name,
      html_url: repo.data.html_url,
      clone_url: repo.data.clone_url,
      ssh_url: repo.data.ssh_url
    };

  } catch (error) {
    console.error('GitHub repo creation error:', error);
    throw error;
  }
}

async function setupRepoConfiguration(installation, repo) {
  try {
    // Create initial README
    await installation.rest.repos.createOrUpdateFileContents({
      owner: repo.owner.login,
      repo: repo.name,
      path: 'README.md',
      message: 'Initial README for FHIR application',
      content: Buffer.from(generateREADME(repo)).toString('base64')
    });

    // Set up GitHub Actions workflow
    await installation.rest.repos.createOrUpdateFileContents({
      owner: repo.owner.login,
      repo: repo.name,
      path: '.github/workflows/deploy.yml',
      message: 'Add deployment workflow',
      content: Buffer.from(generateDeploymentWorkflow()).toString('base64')
    });

    // Configure repository settings
    await installation.rest.repos.update({
      owner: repo.owner.login,
      repo: repo.name,
      has_issues: true,
      has_projects: true,
      has_wiki: false,
      allow_squash_merge: true,
      allow_merge_commit: false,
      allow_rebase_merge: false
    });

  } catch (error) {
    console.error('Repo configuration error:', error);
  }
}
```

### Payment Processing Integration
```javascript
// File: backend/payment-integration.js
import Stripe from 'stripe';

export const stripe = new Stripe(getSecret('STRIPE_SECRET_KEY'), {
  apiVersion: '2023-10-16'
});

export async function createSubscriptionCheckout(params) {
  const { userId, priceId, successUrl, cancelUrl } = params;

  try {
    // Get or create Stripe customer
    const customer = await getOrCreateStripeCustomer(userId);

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1
      }],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId,
        source: 'fhir-iq-website'
      }
    });

    return {
      sessionId: session.id,
      checkoutUrl: session.url
    };

  } catch (error) {
    console.error('Stripe checkout error:', error);
    throw error;
  }
}

export async function handlePaymentSuccess(paymentIntent) {
  try {
    const { customer, metadata } = paymentIntent;
    const userId = metadata.userId;

    // Update user subscription status
    await wixData.insert('Orders', {
      userId,
      stripePaymentId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: 'completed',
      createdDate: new Date()
    });

    // Upgrade user role based on purchase
    const priceId = metadata.priceId;
    const newRole = mapPriceToRole(priceId);

    if (newRole) {
      await upgradeUserRole(userId, newRole, paymentIntent.id);
    }

    // Send confirmation email
    await sendPaymentConfirmationEmail(userId, paymentIntent);

  } catch (error) {
    console.error('Payment success handling error:', error);
  }
}

async function getOrCreateStripeCustomer(userId) {
  try {
    // Check if customer exists in Wix
    const existingCustomer = await wixData.query('StripeCustomers')
      .eq('userId', userId)
      .find();

    if (existingCustomer.items.length > 0) {
      return { id: existingCustomer.items[0].stripeCustomerId };
    }

    // Get user details from Wix
    const user = await wixUsers.getUser(userId);

    // Create new Stripe customer
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.profile.nickname || user.email,
      metadata: {
        wixUserId: userId
      }
    });

    // Store customer mapping
    await wixData.insert('StripeCustomers', {
      userId,
      stripeCustomerId: customer.id,
      createdDate: new Date()
    });

    return customer;

  } catch (error) {
    console.error('Customer creation error:', error);
    throw error;
  }
}
```

## Data Layer Architecture

### Wix Collections Integration
```javascript
// File: backend/data-layer.js
import { wixData } from 'wix-data-backend';

export class DataLayer {
  constructor() {
    this.collections = {
      tools: 'Tools',
      products: 'Products',
      courses: 'Courses',
      users: 'Members',
      orders: 'Orders',
      subscriptions: 'Subscriptions',
      chatLogs: 'ChatLogs',
      codeGenerations: 'CodeGenerations'
    };
  }

  async getTools(filters = {}) {
    let query = wixData.query(this.collections.tools)
      .eq('status', 'active');

    if (filters.category) {
      query = query.eq('category', filters.category);
    }

    if (filters.tags && filters.tags.length > 0) {
      query = query.hasSome('tags', filters.tags);
    }

    if (filters.featured) {
      query = query.eq('featured', true);
    }

    return await query
      .ascending('popularityScore')
      .limit(filters.limit || 50)
      .find();
  }

  async getCourses(filters = {}) {
    let query = wixData.query(this.collections.courses)
      .eq('status', 'active');

    if (filters.level) {
      query = query.eq('level', filters.level);
    }

    if (filters.availability === 'open') {
      query = query.gt('seatsRemaining', 0);
    }

    return await query
      .ascending('startDate')
      .find();
  }

  async logUserActivity(userId, activity, metadata = {}) {
    try {
      await wixData.insert('UserActivity', {
        userId,
        activity,
        metadata,
        timestamp: new Date(),
        ipAddress: metadata.ipAddress,
        userAgent: metadata.userAgent
      });
    } catch (error) {
      console.error('Activity logging error:', error);
    }
  }

  async getUserProgress(userId, contentType) {
    try {
      const progress = await wixData.query('UserProgress')
        .eq('userId', userId)
        .eq('contentType', contentType)
        .find();

      return progress.items.map(item => ({
        contentId: item.contentId,
        progress: item.progress,
        completed: item.completed,
        lastAccessed: item.lastAccessed
      }));

    } catch (error) {
      console.error('Progress retrieval error:', error);
      return [];
    }
  }

  async updateUserProgress(userId, contentId, contentType, progress) {
    try {
      const existing = await wixData.query('UserProgress')
        .eq('userId', userId)
        .eq('contentId', contentId)
        .find();

      const progressData = {
        userId,
        contentId,
        contentType,
        progress,
        completed: progress >= 100,
        lastAccessed: new Date()
      };

      if (existing.items.length > 0) {
        await wixData.update('UserProgress', {
          _id: existing.items[0]._id,
          ...progressData
        });
      } else {
        await wixData.insert('UserProgress', progressData);
      }

    } catch (error) {
      console.error('Progress update error:', error);
    }
  }
}
```

### External Postgres Integration (Optional)
```javascript
// File: backend/postgres-integration.js
import { Pool } from 'pg';

export const postgresPool = new Pool({
  host: getSecret('POSTGRES_HOST'),
  port: getSecret('POSTGRES_PORT'),
  database: getSecret('POSTGRES_DATABASE'),
  user: getSecret('POSTGRES_USER'),
  password: getSecret('POSTGRES_PASSWORD'),
  ssl: {
    rejectUnauthorized: false
  },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

export class AdvancedAnalytics {
  async trackDetailedUserBehavior(userId, event, properties) {
    const client = await postgresPool.connect();

    try {
      await client.query(
        'INSERT INTO user_events (user_id, event_type, properties, timestamp) VALUES ($1, $2, $3, $4)',
        [userId, event, JSON.stringify(properties), new Date()]
      );
    } catch (error) {
      console.error('Analytics tracking error:', error);
    } finally {
      client.release();
    }
  }

  async getAdvancedReports(reportType, dateRange) {
    const client = await postgresPool.connect();

    try {
      let query;

      switch (reportType) {
        case 'user-engagement':
          query = `
            SELECT
              DATE(timestamp) as date,
              COUNT(DISTINCT user_id) as active_users,
              COUNT(*) as total_events,
              AVG(session_duration) as avg_session_duration
            FROM user_events
            WHERE timestamp BETWEEN $1 AND $2
            GROUP BY DATE(timestamp)
            ORDER BY date DESC
          `;
          break;

        case 'feature-usage':
          query = `
            SELECT
              event_type,
              COUNT(*) as usage_count,
              COUNT(DISTINCT user_id) as unique_users
            FROM user_events
            WHERE timestamp BETWEEN $1 AND $2
            GROUP BY event_type
            ORDER BY usage_count DESC
          `;
          break;

        default:
          throw new Error('Invalid report type');
      }

      const result = await client.query(query, [dateRange.start, dateRange.end]);
      return result.rows;

    } catch (error) {
      console.error('Report generation error:', error);
      return [];
    } finally {
      client.release();
    }
  }

  async trackQuizPerformance(userId, quizId, answers, score) {
    const client = await postgresPool.connect();

    try {
      // Insert quiz attempt
      const attemptResult = await client.query(
        'INSERT INTO quiz_attempts (user_id, quiz_id, score, completed_at) VALUES ($1, $2, $3, $4) RETURNING id',
        [userId, quizId, score, new Date()]
      );

      const attemptId = attemptResult.rows[0].id;

      // Insert individual answers
      for (const answer of answers) {
        await client.query(
          'INSERT INTO quiz_answers (attempt_id, question_id, answer_given, is_correct) VALUES ($1, $2, $3, $4)',
          [attemptId, answer.questionId, answer.answer, answer.isCorrect]
        );
      }

      return attemptId;

    } catch (error) {
      console.error('Quiz tracking error:', error);
      return null;
    } finally {
      client.release();
    }
  }
}
```

## Analytics and Observability

### Google Analytics 4 Integration
```javascript
// File: frontend/analytics.js
export class AnalyticsManager {
  constructor() {
    this.gaEnabled = true;
    this.posthogEnabled = true;
    this.initializeAnalytics();
  }

  initializeAnalytics() {
    // Initialize GA4
    if (this.gaEnabled) {
      gtag('config', 'G-XXXXXXXXXX', {
        custom_map: {
          'custom_parameter_1': 'user_role',
          'custom_parameter_2': 'subscription_tier'
        }
      });
    }

    // Initialize PostHog
    if (this.posthogEnabled) {
      posthog.init('phc_xxxxxxxxx', {
        api_host: 'https://app.posthog.com',
        loaded: (posthog) => {
          if (wixUsers.currentUser.loggedIn) {
            posthog.identify(wixUsers.currentUser.id);
          }
        }
      });
    }
  }

  trackEvent(eventName, properties = {}) {
    // Enhanced properties
    const enhancedProperties = {
      ...properties,
      timestamp: new Date().toISOString(),
      page_url: wixLocation.url,
      user_id: wixUsers.currentUser.loggedIn ? wixUsers.currentUser.id : null,
      session_id: this.getSessionId()
    };

    // Send to GA4
    if (this.gaEnabled) {
      gtag('event', eventName, enhancedProperties);
    }

    // Send to PostHog
    if (this.posthogEnabled) {
      posthog.capture(eventName, enhancedProperties);
    }

    // Send server-side event for advanced analytics
    this.sendServerEvent(eventName, enhancedProperties);
  }

  async sendServerEvent(eventName, properties) {
    try {
      await wixWindow.backend.logAnalyticsEvent({
        event: eventName,
        properties,
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Server analytics error:', error);
    }
  }

  trackFunnelStep(funnelName, stepName, properties = {}) {
    this.trackEvent('funnel_step', {
      funnel_name: funnelName,
      step_name: stepName,
      ...properties
    });
  }

  trackCourseProgress(courseId, progress, timeSpent) {
    this.trackEvent('course_progress', {
      course_id: courseId,
      progress_percentage: progress,
      time_spent_minutes: timeSpent
    });
  }

  trackAIInteraction(interactionType, details) {
    this.trackEvent('ai_interaction', {
      interaction_type: interactionType,
      ...details
    });
  }

  trackToolUsage(toolName, action, duration) {
    this.trackEvent('tool_usage', {
      tool_name: toolName,
      action,
      duration_seconds: duration
    });
  }

  getSessionId() {
    let sessionId = sessionStorage.getItem('analytics_session_id');

    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('analytics_session_id', sessionId);
    }

    return sessionId;
  }
}

// Initialize global analytics
export const analytics = new AnalyticsManager();
```

### Uptime Monitoring Integration
```javascript
// File: backend/monitoring.js
export class UptimeMonitoring {
  constructor() {
    this.endpoints = [
      { name: 'homepage', url: 'https://fhiriq.com' },
      { name: 'api_health', url: 'https://fhiriq.com/_functions/health' },
      { name: 'chatbot_api', url: 'https://fhiriq.com/_functions/processAIQuery' },
      { name: 'fhir_builder', url: 'https://fhiriq.com/tools/fhir-builder' }
    ];
  }

  async performHealthChecks() {
    const results = [];

    for (const endpoint of this.endpoints) {
      try {
        const startTime = Date.now();
        const response = await fetch(endpoint.url, {
          method: 'GET',
          timeout: 10000
        });
        const endTime = Date.now();

        results.push({
          endpoint: endpoint.name,
          status: response.status,
          responseTime: endTime - startTime,
          healthy: response.status >= 200 && response.status < 400,
          timestamp: new Date()
        });

      } catch (error) {
        results.push({
          endpoint: endpoint.name,
          status: 0,
          responseTime: -1,
          healthy: false,
          error: error.message,
          timestamp: new Date()
        });
      }
    }

    // Store results
    await this.storeHealthCheckResults(results);

    // Alert if any endpoints are down
    await this.checkForAlerts(results);

    return results;
  }

  async storeHealthCheckResults(results) {
    for (const result of results) {
      await wixData.insert('HealthChecks', result);
    }
  }

  async checkForAlerts(results) {
    const failedEndpoints = results.filter(r => !r.healthy);

    if (failedEndpoints.length > 0) {
      await this.sendAlert({
        type: 'endpoint_down',
        endpoints: failedEndpoints,
        timestamp: new Date()
      });
    }

    // Check for slow response times
    const slowEndpoints = results.filter(r => r.responseTime > 5000);

    if (slowEndpoints.length > 0) {
      await this.sendAlert({
        type: 'slow_response',
        endpoints: slowEndpoints,
        timestamp: new Date()
      });
    }
  }

  async sendAlert(alert) {
    // Send to monitoring service (e.g., PagerDuty, Slack)
    try {
      await fetch('https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `🚨 FHIR IQ Alert: ${alert.type}`,
          attachments: [{
            color: 'danger',
            fields: alert.endpoints.map(ep => ({
              title: ep.endpoint,
              value: `Status: ${ep.status}, Response: ${ep.responseTime}ms`,
              short: true
            }))
          }]
        })
      });
    } catch (error) {
      console.error('Alert sending failed:', error);
    }
  }
}
```

## Performance Optimization

### Caching Strategy
```javascript
// File: backend/caching.js
export class CacheManager {
  constructor() {
    this.cachePrefix = 'fhiriq_';
    this.defaultTTL = 300; // 5 minutes
  }

  async get(key) {
    try {
      const cachedData = await wixData.query('Cache')
        .eq('key', this.cachePrefix + key)
        .gt('expiresAt', new Date())
        .find();

      if (cachedData.items.length > 0) {
        return JSON.parse(cachedData.items[0].value);
      }

      return null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  async set(key, value, ttl = this.defaultTTL) {
    try {
      const expiresAt = new Date(Date.now() + ttl * 1000);
      const cacheKey = this.cachePrefix + key;

      // Check if key exists
      const existing = await wixData.query('Cache')
        .eq('key', cacheKey)
        .find();

      const cacheData = {
        key: cacheKey,
        value: JSON.stringify(value),
        expiresAt,
        createdAt: new Date()
      };

      if (existing.items.length > 0) {
        await wixData.update('Cache', {
          _id: existing.items[0]._id,
          ...cacheData
        });
      } else {
        await wixData.insert('Cache', cacheData);
      }

    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  async invalidate(pattern) {
    try {
      const keysToDelete = await wixData.query('Cache')
        .contains('key', this.cachePrefix + pattern)
        .find();

      for (const item of keysToDelete.items) {
        await wixData.remove('Cache', item._id);
      }
    } catch (error) {
      console.error('Cache invalidation error:', error);
    }
  }

  async cleanExpired() {
    try {
      const expiredItems = await wixData.query('Cache')
        .lt('expiresAt', new Date())
        .find();

      for (const item of expiredItems.items) {
        await wixData.remove('Cache', item._id);
      }
    } catch (error) {
      console.error('Cache cleanup error:', error);
    }
  }
}

// Usage in HTTP functions
export async function get_cachedToolsList(request) {
  const cache = new CacheManager();
  const cacheKey = 'tools_list_' + JSON.stringify(request.query);

  // Try cache first
  let tools = await cache.get(cacheKey);

  if (!tools) {
    // Fetch from database
    tools = await new DataLayer().getTools(request.query);

    // Cache for 10 minutes
    await cache.set(cacheKey, tools, 600);
  }

  return {
    status: 200,
    body: tools,
    headers: {
      'Cache-Control': 'public, max-age=300',
      'X-Cache': tools ? 'HIT' : 'MISS'
    }
  };
}
```

## Security Implementation

### Input Validation and Sanitization
```javascript
// File: backend/security.js
export class SecurityManager {
  validateInput(input, type) {
    switch (type) {
      case 'email':
        return this.validateEmail(input);
      case 'slug':
        return this.validateSlug(input);
      case 'html':
        return this.sanitizeHTML(input);
      case 'sql':
        return this.preventSQLInjection(input);
      default:
        return this.sanitizeGeneral(input);
    }
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? email.toLowerCase() : null;
  }

  validateSlug(slug) {
    const slugRegex = /^[a-z0-9-]+$/;
    return slugRegex.test(slug) ? slug : null;
  }

  sanitizeHTML(html) {
    // Use DOMPurify or similar
    return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  }

  preventSQLInjection(input) {
    // For Wix Data, this is less critical but still good practice
    const dangerousPatterns = [
      /(\b(ALTER|CREATE|DELETE|DROP|EXEC(UTE)?|INSERT|SELECT|UNION|UPDATE)\b)/gi,
      /([\'\";])/g
    ];

    for (const pattern of dangerousPatterns) {
      if (pattern.test(input)) {
        return null;
      }
    }

    return input;
  }

  sanitizeGeneral(input) {
    return input.toString()
      .replace(/[<>]/g, '')
      .trim()
      .substring(0, 1000); // Limit length
  }

  generateSecureToken() {
    return crypto.randomBytes(32).toString('hex');
  }

  hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
  }
}
```

## Implementation Timeline

### Phase 1: Core Infrastructure (Week 1)
- Set up Wix Studio environment with design system
- Implement basic Velo HTTP functions
- Configure external service integrations (APIs, auth)
- Set up data layer with core collections

### Phase 2: AI Integration (Week 2)
- Implement Claude/OpenAI integration
- Build vector database and knowledge base
- Create AI chatbot component
- Develop FHIR Builder functionality

### Phase 3: E-commerce and User Management (Week 3)
- Integrate Stripe payment processing
- Implement user roles and permissions
- Set up subscription management
- Configure course enrollment system

### Phase 4: Advanced Features (Week 4)
- GitHub App integration for code generation
- Advanced analytics and reporting
- Performance optimization and caching
- Security hardening and monitoring

### Phase 5: Testing and Deployment (Week 5)
- Comprehensive testing of all integrations
- Performance testing and optimization
- Security audit and penetration testing
- Production deployment and monitoring setup

### Phase 6: Optimization and Scaling (Week 6)
- Performance monitoring and tuning
- User feedback integration
- Feature refinement and bug fixes
- Documentation and team training

## Acceptance Criteria

- [ ] Wix Studio templates integrated with design system tokens
- [ ] All custom Velo components functional (chatbot, FHIR builder)
- [ ] HTTP functions handling all external API integrations
- [ ] AI services (Claude, OpenAI) fully integrated and responding
- [ ] Vector database operational with FHIR knowledge base
- [ ] GitHub App creating and managing repositories
- [ ] Stripe payment processing and subscription management working
- [ ] User authentication and role-based access control implemented
- [ ] Analytics tracking all user interactions and conversions
- [ ] Performance optimization achieving < 3s page load times
- [ ] Security measures implemented and tested
- [ ] Monitoring and alerting systems operational
- [ ] All external service integrations tested and documented
- [ ] Error handling and fallback mechanisms in place
- [ ] Data backup and recovery procedures established

## Dependencies
- Wix Studio account and development environment access
- External service API keys and credentials (Claude, OpenAI, Stripe, etc.)
- GitHub App configuration and permissions
- Domain setup and SSL certificate configuration
- Analytics tracking code setup (GA4, PostHog)
- Monitoring service configuration
- Team training on Wix Velo development practices