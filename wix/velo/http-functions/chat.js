/**
 * HTTP Function: FHIR IQ Chat API
 * @module http-functions/chat
 *
 * Provides HTTP endpoints for the FHIR knowledge chatbot
 * Handles message processing, feedback collection, and analytics
 */

import { ok, badRequest, serverError, methodNotAllowed } from 'wix-http-functions';
import {
  handleChatMessage,
  recordUserFeedback,
  getChatAnalytics
} from 'backend/chat/index';

/**
 * Validate chat message request schema
 * @param {Object} body - Request body
 * @returns {Object} Validation result
 */
function validateChatRequest(body) {
  const errors = [];

  if (!body.message || typeof body.message !== 'string') {
    errors.push('message is required and must be a string');
  }

  if (body.message && body.message.length > 2000) {
    errors.push('message must be less than 2000 characters');
  }

  if (!body.sessionId || typeof body.sessionId !== 'string') {
    errors.push('sessionId is required and must be a string');
  }

  if (body.conversationHistory && !Array.isArray(body.conversationHistory)) {
    errors.push('conversationHistory must be an array');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate feedback request schema
 * @param {Object} body - Request body
 * @returns {Object} Validation result
 */
function validateFeedbackRequest(body) {
  const errors = [];

  if (!body.sessionId || typeof body.sessionId !== 'string') {
    errors.push('sessionId is required and must be a string');
  }

  if (!body.messageId || typeof body.messageId !== 'string') {
    errors.push('messageId is required and must be a string');
  }

  if (!body.rating || !['up', 'down'].includes(body.rating)) {
    errors.push('rating is required and must be "up" or "down"');
  }

  if (body.comment && typeof body.comment !== 'string') {
    errors.push('comment must be a string');
  }

  if (body.comment && body.comment.length > 1000) {
    errors.push('comment must be less than 1000 characters');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * POST /chat - Send message to FHIR IQ chatbot
 * @param {Object} request - HTTP request object
 * @returns {Promise<Object>} HTTP response with chat response and citations
 *
 * Request body:
 * {
 *   "message": "What is FHIR?",
 *   "sessionId": "unique-session-id",
 *   "conversationHistory": [
 *     {"role": "user", "content": "previous question"},
 *     {"role": "assistant", "content": "previous response"}
 *   ]
 * }
 *
 * Response:
 * {
 *   "success": true,
 *   "response": "FHIR is...",
 *   "citations": [...],
 *   "sessionId": "unique-session-id",
 *   "messageId": "generated-message-id"
 * }
 */
export async function post_chat(request) {
  const startTime = new Date();

  try {
    // Parse and validate request body
    let body;
    try {
      body = JSON.parse(request.body);
    } catch (parseError) {
      return badRequest({
        body: JSON.stringify({
          success: false,
          error: 'Invalid JSON in request body',
          details: parseError.message
        }),
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate request schema
    const validation = validateChatRequest(body);
    if (!validation.isValid) {
      return badRequest({
        body: JSON.stringify({
          success: false,
          error: 'Invalid request format',
          details: validation.errors
        }),
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Rate limiting check (basic implementation)
    // TODO: Implement more sophisticated rate limiting with user tracking
    const userAgent = request.headers['user-agent'] || 'unknown';
    const clientIP = request.ip || 'unknown';

    console.log('Chat request received:', {
      sessionId: body.sessionId,
      messageLength: body.message.length,
      hasHistory: body.conversationHistory && body.conversationHistory.length > 0,
      clientIP,
      userAgent,
      timestamp: startTime
    });

    // Generate unique message ID for this interaction
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // Process chat message
    const chatResponse = await handleChatMessage({
      message: body.message.trim(),
      sessionId: body.sessionId,
      conversationHistory: body.conversationHistory || []
    });

    // Log processing completion
    const endTime = new Date();
    console.log('Chat response generated:', {
      sessionId: body.sessionId,
      messageId,
      success: chatResponse.success,
      responseLength: chatResponse.response ? chatResponse.response.length : 0,
      citationsCount: chatResponse.citations ? chatResponse.citations.length : 0,
      processingTime: endTime - startTime,
      isOutOfScope: chatResponse.isOutOfScope || false
    });

    // Return successful response
    return ok({
      body: JSON.stringify({
        ...chatResponse,
        messageId,
        timestamp: endTime.toISOString(),
        httpProcessingTime: endTime - startTime
      }),
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*' // Configure based on your domain
      }
    });

  } catch (error) {
    const endTime = new Date();

    console.error('Chat endpoint error:', {
      error: error.message,
      stack: error.stack,
      processingTime: endTime - startTime,
      timestamp: endTime
    });

    return serverError({
      body: JSON.stringify({
        success: false,
        error: 'Internal server error',
        message: 'Failed to process chat message. Please try again.',
        timestamp: endTime.toISOString(),
        processingTime: endTime - startTime
      }),
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

/**
 * POST /chat/feedback - Record user feedback for chat responses
 * @param {Object} request - HTTP request object
 * @returns {Promise<Object>} HTTP response confirming feedback recorded
 *
 * Request body:
 * {
 *   "sessionId": "unique-session-id",
 *   "messageId": "message-id-from-chat-response",
 *   "rating": "up" | "down",
 *   "comment": "optional feedback comment",
 *   "timestamp": "2023-12-01T10:00:00Z"
 * }
 */
export async function post_chatFeedback(request) {
  try {
    // Parse request body
    let body;
    try {
      body = JSON.parse(request.body);
    } catch (parseError) {
      return badRequest({
        body: JSON.stringify({
          success: false,
          error: 'Invalid JSON in request body'
        }),
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate feedback request
    const validation = validateFeedbackRequest(body);
    if (!validation.isValid) {
      return badRequest({
        body: JSON.stringify({
          success: false,
          error: 'Invalid feedback format',
          details: validation.errors
        }),
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('Feedback received:', {
      sessionId: body.sessionId,
      messageId: body.messageId,
      rating: body.rating,
      hasComment: !!body.comment,
      timestamp: new Date()
    });

    // Record feedback
    const result = await recordUserFeedback({
      sessionId: body.sessionId,
      messageId: body.messageId,
      rating: body.rating,
      comment: body.comment || null,
      timestamp: body.timestamp || new Date().toISOString()
    });

    return ok({
      body: JSON.stringify(result),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('Feedback endpoint error:', error);

    return serverError({
      body: JSON.stringify({
        success: false,
        error: 'Failed to record feedback',
        message: error.message
      }),
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

/**
 * GET /chat/analytics - Get chat analytics (admin endpoint)
 * @param {Object} request - HTTP request object
 * @returns {Promise<Object>} HTTP response with analytics data
 *
 * Query parameters:
 * - startDate: ISO date string (optional)
 * - endDate: ISO date string (optional)
 * - responseType: 'rag' | 'out_of_scope' | 'error' (optional)
 */
export async function get_chatAnalytics(request) {
  try {
    // Basic admin authentication - check for admin key
    // TODO: Implement proper admin authentication
    const adminKey = request.headers['x-admin-key'];
    if (!adminKey || adminKey !== 'your-admin-key') { // Replace with actual admin key
      return badRequest({
        body: JSON.stringify({
          success: false,
          error: 'Admin authentication required'
        }),
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Parse query parameters
    const url = new URL(request.url);
    const filters = {
      startDate: url.searchParams.get('startDate'),
      endDate: url.searchParams.get('endDate'),
      responseType: url.searchParams.get('responseType')
    };

    console.log('Analytics requested with filters:', filters);

    // Get analytics data
    const analytics = await getChatAnalytics(filters);

    return ok({
      body: JSON.stringify(analytics),
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });

  } catch (error) {
    console.error('Analytics endpoint error:', error);

    return serverError({
      body: JSON.stringify({
        success: false,
        error: 'Failed to retrieve analytics',
        message: error.message
      }),
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

/**
 * GET /chat/health - Health check endpoint
 * @param {Object} request - HTTP request object
 * @returns {Object} HTTP response with service health status
 */
export function get_chatHealth(request) {
  return ok({
    body: JSON.stringify({
      status: 'healthy',
      service: 'fhir-iq-chatbot',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    }),
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    }
  });
}

/**
 * OPTIONS endpoint for CORS support
 * @param {Object} request - HTTP request object
 * @returns {Object} HTTP response with CORS headers
 */
export function options_chat(request) {
  return ok({
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Key',
      'Access-Control-Max-Age': '86400'
    }
  });
}

export function options_chatFeedback(request) {
  return ok({
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
}

export function options_chatAnalytics(request) {
  return ok({
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
      'Access-Control-Max-Age': '86400'
    }
  });
}

// Handle unsupported methods
export function get_chat(request) {
  return methodNotAllowed({
    body: JSON.stringify({
      error: 'Method not allowed',
      message: 'Use POST to send chat messages'
    }),
    headers: { 'Content-Type': 'application/json' }
  });
}

export function get_chatFeedback(request) {
  return methodNotAllowed({
    body: JSON.stringify({
      error: 'Method not allowed',
      message: 'Use POST to submit feedback'
    }),
    headers: { 'Content-Type': 'application/json' }
  });
}

export function post_chatAnalytics(request) {
  return methodNotAllowed({
    body: JSON.stringify({
      error: 'Method not allowed',
      message: 'Use GET to retrieve analytics'
    }),
    headers: { 'Content-Type': 'application/json' }
  });
}