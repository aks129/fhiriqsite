/**
 * FHIR IQ Chat Backend Module
 * @module backend/chat/index
 *
 * Handles FHIR domain-specific chat queries with RAG (Retrieval-Augmented Generation)
 * Uses curated FHIR documentation chunks and vector search for accurate responses
 */

import { fetch } from 'wix-fetch';
import { getSecret } from 'wix-secrets-backend';
import wixData from 'wix-data';

// Vector DB abstraction layer - TODO: Implement with hosted vector store
// Recommended options: Pinecone, Weaviate, or Supabase Vector
const VectorStore = {
  // TODO: Replace with actual vector store implementation
  async search(query, limit = 5) {
    // Placeholder implementation - replace with actual vector search
    // This should embed the query and search against curated FHIR docs
    console.log('Vector search placeholder - query:', query);

    // Mock curated FHIR knowledge chunks for development
    const mockResults = [
      {
        content: "FHIR (Fast Healthcare Interoperability Resources) is a standard for health information exchange.",
        source: "FHIR R4 Specification - Overview",
        url: "https://hl7.org/fhir/R4/overview.html",
        score: 0.95,
        metadata: {
          section: "introduction",
          category: "overview"
        }
      },
      {
        content: "FHIR resources are the basic building blocks of the FHIR specification, representing clinical and administrative concepts.",
        source: "FHIR R4 Specification - Resources",
        url: "https://hl7.org/fhir/R4/resource.html",
        score: 0.87,
        metadata: {
          section: "resources",
          category: "architecture"
        }
      }
    ];

    return mockResults.slice(0, limit);
  },

  // TODO: Implement vector store initialization
  async initialize() {
    // Initialize connection to vector store
    // Load curated FHIR documentation chunks
    console.log('Vector store initialization placeholder');
  }
};

/**
 * FHIR domain scope validation
 * @param {string} query - User query
 * @returns {Object} Validation result with scope status
 */
function validateFHIRScope(query) {
  const fhirKeywords = [
    'fhir', 'hl7', 'healthcare', 'interoperability', 'ehr', 'electronic health',
    'patient', 'observation', 'medication', 'practitioner', 'organization',
    'bundle', 'resource', 'api', 'rest', 'json', 'xml', 'conformance',
    'profile', 'extension', 'terminology', 'valueset', 'codesystem',
    'implementation guide', 'ig', 'r4', 'r5', 'dstu', 'stu'
  ];

  const businessKeywords = [
    'fhir iq', 'fhiriq', 'consulting', 'implementation', 'training',
    'ai development', 'build on fhir', 'custom solutions'
  ];

  const queryLower = query.toLowerCase();

  const hasFHIRTerms = fhirKeywords.some(keyword =>
    queryLower.includes(keyword)
  );

  const hasBusinessTerms = businessKeywords.some(keyword =>
    queryLower.includes(keyword)
  );

  // Check for clearly out-of-scope queries
  const outOfScopePatterns = [
    /weather|climate/i,
    /sports|football|basketball/i,
    /cooking|recipe/i,
    /politics|election/i,
    /cryptocurrency|bitcoin/i,
    /travel|vacation/i
  ];

  const isOutOfScope = outOfScopePatterns.some(pattern =>
    pattern.test(query)
  );

  return {
    inScope: (hasFHIRTerms || hasBusinessTerms) && !isOutOfScope,
    hasFHIRTerms,
    hasBusinessTerms,
    isOutOfScope,
    confidence: hasFHIRTerms ? 0.9 : hasBusinessTerms ? 0.7 : 0.1
  };
}

/**
 * Generate LLM response with RAG context
 * @param {string} userQuery - User's question
 * @param {Array} contextChunks - Retrieved document chunks
 * @param {string} conversationHistory - Previous messages for context
 * @returns {Promise<Object>} LLM response with citations
 */
async function generateRAGResponse(userQuery, contextChunks, conversationHistory = '') {
  try {
    // Get OpenAI API key from Wix Secrets
    // TODO: Configure this secret in Wix Dashboard -> Settings -> Secrets Manager
    const openaiApiKey = await getSecret('OPENAI_API_KEY');

    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured in Wix Secrets Manager');
    }

    // Build context from retrieved chunks
    const context = contextChunks.map((chunk, index) =>
      `[${index + 1}] ${chunk.content}\nSource: ${chunk.source}`
    ).join('\n\n');

    // System prompt for FHIR IQ chatbot
    const systemPrompt = `You are FHIR IQ's AI assistant, specializing in FHIR (Fast Healthcare Interoperability Resources) and healthcare interoperability.

Your knowledge includes:
- FHIR R4 and R5 specifications
- Healthcare data standards and APIs
- EHR integration and implementation
- FHIR IQ's consulting and development services

Guidelines:
1. Provide accurate, helpful information about FHIR and healthcare interoperability
2. Reference the provided context documents when possible
3. Include citations using [1], [2], etc. format matching the context sources
4. If unsure, acknowledge limitations and suggest consulting FHIR IQ experts
5. Keep responses concise but comprehensive
6. Use technical accuracy while remaining accessible

Context from curated FHIR documentation:
${context}

Previous conversation:
${conversationHistory}`;

    const userPrompt = `User question: ${userQuery}

Please provide a helpful response about FHIR or healthcare interoperability, using the provided context and including appropriate citations.`;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview', // Use latest GPT-4 model
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3, // Lower temperature for more factual responses
        max_tokens: 1000,
        top_p: 0.9
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message?.content;

    if (!assistantMessage) {
      throw new Error('No response generated from OpenAI');
    }

    // Extract citations from response
    const citationPattern = /\[(\d+)\]/g;
    const citationMatches = [...assistantMessage.matchAll(citationPattern)];
    const citedSources = citationMatches
      .map(match => parseInt(match[1]) - 1)
      .filter(index => index >= 0 && index < contextChunks.length)
      .map(index => contextChunks[index]);

    // Remove duplicates
    const uniqueCitations = citedSources.filter((source, index, arr) =>
      arr.findIndex(s => s.url === source.url) === index
    );

    return {
      success: true,
      response: assistantMessage,
      citations: uniqueCitations,
      tokensUsed: data.usage?.total_tokens || 0,
      model: 'gpt-4-turbo-preview'
    };

  } catch (error) {
    console.error('Error generating RAG response:', error);
    return {
      success: false,
      error: error.message,
      response: "I'm sorry, I encountered an error while processing your question. Please try again or contact FHIR IQ support for assistance."
    };
  }
}

/**
 * Generate out-of-scope response
 * @param {string} userQuery - User's question
 * @returns {Object} Polite refusal with connection offer
 */
function generateOutOfScopeResponse(userQuery) {
  return {
    success: true,
    response: `I specialize in FHIR (Fast Healthcare Interoperability Resources) and healthcare data standards. Your question about "${userQuery}" appears to be outside my area of expertise.

I'd be happy to help you with:
- FHIR implementation questions
- Healthcare interoperability challenges
- EHR integration guidance
- FHIR IQ's consulting services

Would you like to speak with a FHIR IQ expert about your healthcare technology needs? I can help connect you with our team.`,
    isOutOfScope: true,
    suggestedAction: 'contact_expert',
    citations: []
  };
}

/**
 * Log chat interaction for analytics and improvement
 * @param {Object} interaction - Chat interaction data
 */
async function logChatInteraction(interaction) {
  try {
    const logEntry = {
      timestamp: new Date(),
      sessionId: interaction.sessionId,
      userQuery: interaction.userQuery,
      responseType: interaction.responseType, // 'rag', 'out_of_scope', 'error'
      inScope: interaction.inScope,
      citationsCount: interaction.citations?.length || 0,
      tokensUsed: interaction.tokensUsed || 0,
      userFeedback: null, // Will be updated when feedback is received
      processingTime: interaction.processingTime,
      vectorSearchResults: interaction.vectorSearchResults || 0
    };

    // Store in Wix Data for analytics
    await wixData.insert('ChatLogs', logEntry);

    console.log('Chat interaction logged:', {
      sessionId: interaction.sessionId,
      responseType: interaction.responseType,
      inScope: interaction.inScope
    });

  } catch (error) {
    console.error('Error logging chat interaction:', error);
    // Don't throw - logging failure shouldn't break chat
  }
}

/**
 * Main chat handler - processes user queries with RAG
 * @param {Object} request - Chat request object
 * @returns {Promise<Object>} Chat response with citations
 */
export async function handleChatMessage(request) {
  const startTime = new Date();

  try {
    const {
      message: userQuery,
      sessionId,
      conversationHistory = []
    } = request;

    if (!userQuery || typeof userQuery !== 'string') {
      throw new Error('Invalid message format');
    }

    // Validate FHIR scope
    const scopeValidation = validateFHIRScope(userQuery);

    // If out of scope, return polite refusal
    if (!scopeValidation.inScope) {
      const response = generateOutOfScopeResponse(userQuery);

      await logChatInteraction({
        sessionId,
        userQuery,
        responseType: 'out_of_scope',
        inScope: false,
        citations: [],
        processingTime: new Date() - startTime
      });

      return response;
    }

    // Perform vector search for relevant FHIR documentation
    const relevantChunks = await VectorStore.search(userQuery, 5);

    console.log(`Found ${relevantChunks.length} relevant chunks for query:`, userQuery);

    // Generate RAG response
    const response = await generateRAGResponse(
      userQuery,
      relevantChunks,
      conversationHistory.slice(-4).map(msg => `${msg.role}: ${msg.content}`).join('\n')
    );

    // Log interaction
    await logChatInteraction({
      sessionId,
      userQuery,
      responseType: response.success ? 'rag' : 'error',
      inScope: true,
      citations: response.citations || [],
      tokensUsed: response.tokensUsed,
      processingTime: new Date() - startTime,
      vectorSearchResults: relevantChunks.length
    });

    return {
      ...response,
      processingTime: new Date() - startTime,
      vectorSearchResults: relevantChunks.length,
      sessionId
    };

  } catch (error) {
    console.error('Error in handleChatMessage:', error);

    await logChatInteraction({
      sessionId: request.sessionId,
      userQuery: request.message,
      responseType: 'error',
      inScope: null,
      citations: [],
      processingTime: new Date() - startTime
    });

    return {
      success: false,
      error: error.message,
      response: "I'm experiencing technical difficulties. Please try again in a moment or contact FHIR IQ support if the issue persists.",
      processingTime: new Date() - startTime
    };
  }
}

/**
 * Record user feedback for continuous improvement
 * @param {Object} feedback - User feedback data
 * @returns {Promise<Object>} Feedback recording result
 */
export async function recordUserFeedback(feedback) {
  try {
    const {
      sessionId,
      messageId,
      rating, // 'up' | 'down'
      comment,
      timestamp
    } = feedback;

    // Update chat log with feedback
    const chatLogs = await wixData.query('ChatLogs')
      .eq('sessionId', sessionId)
      .descending('timestamp')
      .limit(10)
      .find();

    if (chatLogs.items.length > 0) {
      // Find the most recent relevant log entry
      const logEntry = chatLogs.items[0];

      await wixData.update('ChatLogs', {
        ...logEntry,
        userFeedback: {
          rating,
          comment,
          timestamp: new Date(timestamp)
        }
      });
    }

    // Store detailed feedback record
    await wixData.insert('ChatFeedback', {
      sessionId,
      messageId,
      rating,
      comment,
      timestamp: new Date(timestamp),
      dateCreated: new Date()
    });

    console.log('User feedback recorded:', { sessionId, rating, hasComment: !!comment });

    return {
      success: true,
      message: 'Feedback recorded successfully'
    };

  } catch (error) {
    console.error('Error recording user feedback:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Get chat analytics and feedback summary
 * @param {Object} filters - Optional filters for analytics
 * @returns {Promise<Object>} Analytics data
 */
export async function getChatAnalytics(filters = {}) {
  try {
    const { startDate, endDate, responseType } = filters;

    let query = wixData.query('ChatLogs');

    if (startDate) {
      query = query.ge('timestamp', new Date(startDate));
    }

    if (endDate) {
      query = query.le('timestamp', new Date(endDate));
    }

    if (responseType) {
      query = query.eq('responseType', responseType);
    }

    const results = await query.find();
    const logs = results.items;

    // Calculate metrics
    const totalChats = logs.length;
    const successfulChats = logs.filter(log => log.responseType === 'rag').length;
    const outOfScopeChats = logs.filter(log => log.responseType === 'out_of_scope').length;
    const errorChats = logs.filter(log => log.responseType === 'error').length;

    const feedbackLogs = logs.filter(log => log.userFeedback);
    const positiveRatings = feedbackLogs.filter(log => log.userFeedback.rating === 'up').length;
    const negativeRatings = feedbackLogs.filter(log => log.userFeedback.rating === 'down').length;

    const avgTokens = logs.length > 0
      ? logs.reduce((sum, log) => sum + (log.tokensUsed || 0), 0) / logs.length
      : 0;

    const avgProcessingTime = logs.length > 0
      ? logs.reduce((sum, log) => sum + (log.processingTime || 0), 0) / logs.length
      : 0;

    return {
      success: true,
      analytics: {
        totalChats,
        successfulChats,
        outOfScopeChats,
        errorChats,
        successRate: totalChats > 0 ? (successfulChats / totalChats) * 100 : 0,
        feedbackCount: feedbackLogs.length,
        positiveRatings,
        negativeRatings,
        satisfactionRate: feedbackLogs.length > 0 ? (positiveRatings / feedbackLogs.length) * 100 : 0,
        avgTokensUsed: Math.round(avgTokens),
        avgProcessingTime: Math.round(avgProcessingTime),
        period: {
          startDate: startDate || 'all-time',
          endDate: endDate || 'now'
        }
      }
    };

  } catch (error) {
    console.error('Error getting chat analytics:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// TODO: Vector Store Implementation Notes
//
// Replace the VectorStore placeholder with one of these hosted solutions:
//
// 1. PINECONE IMPLEMENTATION:
// const pinecone = new PineconeClient();
// await pinecone.init({
//   environment: await getSecret('PINECONE_ENVIRONMENT'),
//   apiKey: await getSecret('PINECONE_API_KEY')
// });
//
// 2. WEAVIATE IMPLEMENTATION:
// const weaviate = weaviate.client({
//   scheme: 'https',
//   host: await getSecret('WEAVIATE_HOST'),
//   apiKey: { apiKey: await getSecret('WEAVIATE_API_KEY') }
// });
//
// 3. SUPABASE VECTOR IMPLEMENTATION:
// const supabase = createClient(
//   await getSecret('SUPABASE_URL'),
//   await getSecret('SUPABASE_ANON_KEY')
// );
//
// 4. EMBEDDINGS GENERATION:
// Use OpenAI embeddings API to generate vectors for both:
// - User queries (at search time)
// - FHIR documentation chunks (pre-computed and stored)
//
// 5. CURATED CONTENT SOURCES:
// - FHIR R4 Specification (selected sections)
// - FHIR IQ blog posts and guides
// - Common implementation patterns
// - Frequently asked questions
// - FHIR IQ service descriptions