# AI Chatbot Specification

## Purpose
Implement an AI-powered chatbot that provides FHIR expertise and guidance, demonstrating FHIR IQ's AI capabilities while capturing leads and providing value to website visitors.

## Functional Requirements

### Core Capabilities
1. **FHIR Knowledge Base**: Answer questions about FHIR standards, implementation, and best practices
2. **Tool Guidance**: Help users understand and navigate FHIR IQ's tools and services
3. **Lead Qualification**: Collect visitor information and route to appropriate sales/support channels
4. **Code Examples**: Provide FHIR code snippets and implementation examples
5. **Resource Recommendations**: Suggest relevant blog posts, documentation, and tools

### Knowledge Domains

#### FHIR Standards
- FHIR R4 and R5 specifications
- Resource types and relationships
- Implementation guides (US Core, etc.)
- Terminology and code systems
- RESTful API patterns

#### Implementation Guidance
- Project planning and strategy
- Common implementation patterns
- Integration approaches
- Testing and validation
- Security and compliance (HIPAA, etc.)

#### FHIR IQ Services
- Consulting services and methodologies
- Training programs and curricula
- Tool capabilities and use cases
- Pricing and engagement models

## Technical Architecture

### Wix Velo Implementation

#### Chat Interface Component
```javascript
// File: backend/chatbot.js
import { getSecret } from 'wix-secrets-backend';
import { fetch } from 'wix-fetch';

export async function sendMessage(userMessage, conversationId, userId) {
  try {
    const apiKey = await getSecret('OPENAI_API_KEY');

    // Prepare conversation context
    const context = await buildContext(conversationId, userMessage);

    // Call OpenAI API with FHIR-specific system prompt
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: FHIR_IQ_SYSTEM_PROMPT
          },
          ...context,
          {
            role: 'user',
            content: userMessage
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Store conversation and return response
    await storeConversation(conversationId, userMessage, aiResponse, userId);

    return {
      success: true,
      message: aiResponse,
      suggestions: generateSuggestions(aiResponse)
    };

  } catch (error) {
    console.error('Chatbot error:', error);
    return {
      success: false,
      message: "I'm having trouble right now. Please try again or contact our support team.",
      suggestions: []
    };
  }
}
```

#### System Prompt Configuration
```javascript
const FHIR_IQ_SYSTEM_PROMPT = `
You are the FHIR IQ Assistant, an expert AI chatbot specializing in FHIR (Fast Healthcare Interoperability Resources) standards and implementation. You represent FHIR IQ, a leading consultancy that combines deep FHIR expertise with AI-driven development tools.

Key Guidelines:
1. FHIR Expertise: Provide accurate, up-to-date information about FHIR R4/R5, implementation guides, and best practices
2. FHIR IQ Services: When relevant, mention FHIR IQ's consulting, training, and AI tools
3. Code Examples: Provide practical FHIR JSON/XML examples when helpful
4. Lead Qualification: For complex questions, suggest booking a consultation
5. Resource Recommendations: Direct users to relevant blog posts, documentation, or tools
6. Professional Tone: Maintain a helpful, knowledgeable, and professional demeanor
7. Limitations: Acknowledge when questions are outside your scope or require human expertise

FHIR IQ Services:
- Consulting: FHIR implementation strategy, data migration, API development
- Training: FHIR fundamentals, advanced development, AI-assisted workflows
- AI Tools: FHIR Builder AI, Data Quality Scanner, API Testing Suite

Never provide medical advice or diagnose conditions. Focus on technical implementation and standards guidance.
`;
```

### RAG (Retrieval-Augmented Generation) System

#### Knowledge Base Sources
```javascript
// Vector embeddings for RAG system
const KNOWLEDGE_SOURCES = [
  {
    type: 'fhir_docs',
    source: 'HL7 FHIR Specification',
    lastUpdated: '2024-01-15',
    chunks: 'fhir-spec-embeddings.json'
  },
  {
    type: 'fhir_iq_content',
    source: 'FHIR IQ Blog Posts',
    lastUpdated: '2024-09-26',
    chunks: 'blog-embeddings.json'
  },
  {
    type: 'implementation_guides',
    source: 'US Core Implementation Guide',
    lastUpdated: '2024-06-01',
    chunks: 'us-core-embeddings.json'
  },
  {
    type: 'fhir_iq_tools',
    source: 'Tool Documentation',
    lastUpdated: '2024-09-26',
    chunks: 'tools-embeddings.json'
  }
];

export async function buildContext(conversationId, userMessage) {
  // Retrieve relevant context using vector similarity
  const relevantChunks = await retrieveRelevantContext(userMessage);

  // Build conversation history
  const conversationHistory = await getConversationHistory(conversationId, 5); // Last 5 messages

  // Combine context
  const contextMessage = {
    role: 'system',
    content: `Relevant Context:\n${relevantChunks.join('\n\n')}`
  };

  return [contextMessage, ...conversationHistory];
}
```

### Frontend Integration

#### Chat Widget UI
```javascript
// File: pages/chatbot-widget.js
import { sendMessage } from 'backend/chatbot';

$w.onReady(function () {
  // Initialize chat widget
  $w('#chatInput').onKeyPress((event) => {
    if (event.key === 'Enter') {
      sendUserMessage();
    }
  });

  $w('#sendButton').onClick(() => {
    sendUserMessage();
  });

  // Add quick start suggestions
  displayQuickStartSuggestions();
});

async function sendUserMessage() {
  const userMessage = $w('#chatInput').value.trim();
  if (!userMessage) return;

  // Display user message
  addMessageToChat('user', userMessage);
  $w('#chatInput').value = '';

  // Show typing indicator
  showTypingIndicator();

  try {
    // Get conversation ID (stored in session or generated)
    const conversationId = getConversationId();
    const userId = getCurrentUserId(); // From Wix Members

    // Send to backend
    const response = await sendMessage(userMessage, conversationId, userId);

    hideTypingIndicator();

    if (response.success) {
      addMessageToChat('bot', response.message);

      // Show suggestions if provided
      if (response.suggestions && response.suggestions.length > 0) {
        showSuggestions(response.suggestions);
      }
    } else {
      addMessageToChat('bot', response.message);
    }

  } catch (error) {
    hideTypingIndicator();
    addMessageToChat('bot', "Sorry, I'm having trouble right now. Please try again or contact our support team.");
  }
}

function displayQuickStartSuggestions() {
  const suggestions = [
    "What is FHIR and how does it work?",
    "How do I start a FHIR implementation project?",
    "What FHIR tools does FHIR IQ offer?",
    "Show me a FHIR Patient resource example",
    "What are common FHIR implementation challenges?"
  ];

  showSuggestions(suggestions);
}
```

## User Experience Flows

### First-Time Visitor Flow
1. **Welcome Message**: "Hi! I'm the FHIR IQ Assistant. I can help you with FHIR standards, implementation guidance, and our AI-powered tools. What would you like to know?"
2. **Quick Suggestions**: Display 4-5 common question buttons
3. **Progressive Disclosure**: Based on responses, ask follow-up questions
4. **Lead Capture**: For complex queries, offer consultation booking

### Returning Visitor Flow
1. **Personalized Greeting**: "Welcome back! How can I help you today?"
2. **Context Awareness**: Reference previous conversations if available
3. **Tailored Suggestions**: Based on previous interactions and interests

### Lead Qualification Flow
```javascript
const QUALIFICATION_TRIGGERS = [
  'implementation project',
  'consulting help',
  'custom development',
  'team training',
  'budget',
  'timeline',
  'proposal'
];

function shouldQualifyLead(userMessage, conversationHistory) {
  // Check for trigger phrases
  const hasTrigger = QUALIFICATION_TRIGGERS.some(trigger =>
    userMessage.toLowerCase().includes(trigger)
  );

  // Check conversation depth (3+ exchanges suggests serious interest)
  const conversationDepth = conversationHistory.length;

  return hasTrigger || conversationDepth >= 6;
}
```

## Content and Responses

### Response Templates

#### FHIR Basics
```
FHIR (Fast Healthcare Interoperability Resources) is a standard for exchanging healthcare information electronically. Here are the key concepts:

🔹 **Resources**: Building blocks like Patient, Observation, Medication
🔹 **RESTful API**: HTTP-based interactions (GET, POST, PUT, DELETE)
🔹 **Formats**: JSON and XML representations
🔹 **Profiles**: Constraints for specific use cases

Would you like me to:
- Show you a specific resource example
- Explain FHIR implementation steps
- Discuss FHIR IQ's tools for getting started
```

#### Implementation Guidance
```
Starting a FHIR implementation involves several key phases:

📋 **1. Planning**
- Define use cases and requirements
- Choose FHIR version (R4 recommended)
- Select implementation guides (US Core, etc.)

🏗️ **2. Development**
- Set up FHIR server (HAPI, Firely, etc.)
- Implement resource profiles
- Build client applications

✅ **3. Testing & Validation**
- Test against reference servers
- Validate resource conformance
- Performance and security testing

FHIR IQ can help accelerate this process with our AI-powered tools and consulting services. Would you like to schedule a consultation to discuss your specific needs?
```

#### Tool Demonstrations
```
FHIR Builder AI is our flagship tool that helps you create FHIR applications quickly:

🤖 **AI-Powered**: Describe your app in plain English
📱 **Code Generation**: Get working FHIR client code
🔧 **Customizable**: Modify and extend generated code
📚 **Best Practices**: Follows FHIR implementation guides

Try it yourself: [FHIR Builder Demo]

Other tools you might find useful:
- Data Quality Scanner: Validate FHIR data
- API Testing Suite: Test FHIR endpoints

Would you like to see a demo or start a free trial?
```

### Error Handling and Fallbacks

#### Knowledge Limitations
```
That's a great question about [topic]. While I have extensive knowledge of FHIR standards and implementation, this specific issue might benefit from human expertise.

I'd recommend:
📞 **Book a consultation** with our FHIR experts
📚 **Check our documentation** for detailed guides
💬 **Join our community forum** for peer discussions

Would you like me to help you schedule a consultation?
```

#### Technical Issues
```
I'm experiencing some technical difficulties right now. Here are alternative ways to get help:

📧 **Email**: support@fhiriq.com
📞 **Phone**: [phone number]
💬 **Community**: [forum link]
📖 **Documentation**: [docs link]

Our team typically responds within 2 hours during business hours.
```

## Analytics and Optimization

### Conversation Tracking
```javascript
// Analytics data structure
const CONVERSATION_ANALYTICS = {
  conversationId: String,
  userId: String,
  startTime: Date,
  endTime: Date,
  messageCount: Number,
  topics: Array, // Extracted topics/intents
  leadQualified: Boolean,
  conversionEvent: String, // 'consultation', 'trial', 'newsletter', etc.
  satisfaction: Number, // If user provides feedback
  exitPoint: String // Where conversation ended
};
```

### Performance Metrics
- **Response Accuracy**: User satisfaction ratings
- **Conversation Completion**: Percentage of conversations that reach resolution
- **Lead Conversion**: Rate of qualified leads to actual conversions
- **Topic Coverage**: Which FHIR topics are most requested
- **User Engagement**: Average conversation length and return rate

### A/B Testing Opportunities
- Different greeting messages
- Suggestion button variations
- Response length and detail level
- Visual design and positioning
- Lead qualification timing

## Implementation Timeline

### Phase 1: Basic Chat (Week 1)
- Set up Wix Velo backend for chat functionality
- Implement OpenAI integration with system prompt
- Create basic chat UI component
- Test with simple FHIR questions

### Phase 2: Enhanced Knowledge (Week 2)
- Implement RAG system with FHIR documentation
- Add FHIR IQ content to knowledge base
- Create response templates and fallbacks
- Implement conversation storage

### Phase 3: Lead Qualification (Week 3)
- Add lead qualification logic
- Integrate with Wix CRM/email
- Create consultation booking flow
- Implement analytics tracking

### Phase 4: Optimization (Week 4)
- A/B test different approaches
- Optimize response quality
- Add advanced features (file upload, etc.)
- Performance tuning and monitoring

## Security and Privacy

### Data Protection
- Encrypt conversation data at rest
- Implement data retention policies (90 days)
- Provide conversation deletion option
- GDPR compliance for EU visitors

### API Security
- Secure OpenAI API key storage in Wix Secrets
- Rate limiting to prevent abuse
- Input sanitization and validation
- Monitor for inappropriate content

### Privacy Considerations
- Clear privacy notice in chat widget
- Option to chat anonymously
- Data usage transparency
- User consent for data storage

## Acceptance Criteria

- [ ] Chat widget displays and functions on all pages
- [ ] AI responses are accurate and helpful for FHIR questions
- [ ] Lead qualification flow captures contact information
- [ ] Conversation history persists across sessions
- [ ] Response time under 3 seconds for typical queries
- [ ] Mobile-responsive chat interface
- [ ] Analytics tracking captures key metrics
- [ ] Error handling provides useful fallback options
- [ ] Privacy compliance and data protection implemented
- [ ] A/B testing framework ready for optimization

## Dependencies
- Wix Velo backend setup
- OpenAI API account and key management
- FHIR documentation processing for RAG
- CRM integration for lead management
- Analytics platform configuration