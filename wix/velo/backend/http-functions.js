import { ok, notFound, serverError, forbidden, badRequest } from 'wix-http-functions';
import { getSecret } from 'wix-secrets-backend';

// AI Builder proxy endpoint
export async function post_builder(request) {
  try {
    const builderServiceUrl = await getSecret('BUILDER_SERVICE_URL');

    if (!builderServiceUrl) {
      return serverError({ error: 'Builder service not configured' });
    }

    // Proxy request to external builder service
    const response = await fetch(`${builderServiceUrl}/api/builder/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'FHIR-IQ-Site/1.0'
      },
      body: request.body
    });

    if (!response.ok) {
      throw new Error(`Builder service error: ${response.status}`);
    }

    const result = await response.json();
    return ok(result);

  } catch (error) {
    console.error('Builder proxy error:', error);
    return serverError({
      error: 'Builder service unavailable',
      message: error.message
    });
  }
}

// Chatbot endpoint
export async function post_chat(request) {
  try {
    const { message, sessionId } = JSON.parse(request.body);

    if (!message) {
      return badRequest({ error: 'Message is required' });
    }

    const openaiApiKey = await getSecret('OPENAI_API_KEY');

    if (!openaiApiKey) {
      return serverError({ error: 'Chat service not configured' });
    }

    // Simple FHIR knowledge response (can be enhanced with vector search)
    const response = await generateChatResponse(message, openaiApiKey);

    return ok({
      message: response,
      sessionId: sessionId || generateSessionId(),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    return serverError({
      error: 'Chat service unavailable',
      message: error.message
    });
  }
}

// Commerce webhooks
export async function post_webhooks_commerce(request) {
  try {
    const webhookData = JSON.parse(request.body);

    // Verify webhook authenticity (implement signature verification)
    const isValid = await verifyWebhookSignature(request);

    if (!isValid) {
      return forbidden({ error: 'Invalid webhook signature' });
    }

    // Handle different webhook events
    switch (webhookData.eventType) {
      case 'order.paid':
        await handleOrderPaid(webhookData.data);
        break;
      case 'order.cancelled':
        await handleOrderCancelled(webhookData.data);
        break;
      default:
        console.log('Unhandled webhook event:', webhookData.eventType);
    }

    return ok({ status: 'processed' });

  } catch (error) {
    console.error('Webhook error:', error);
    return serverError({
      error: 'Webhook processing failed',
      message: error.message
    });
  }
}

// Health check endpoint
export function get_health(request) {
  return ok({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    service: 'FHIR IQ Velo Backend'
  });
}

// Capability statement proxy
export async function get_fhir_capabilities(request) {
  try {
    const { url } = request.query;

    if (!url) {
      return badRequest({ error: 'Capability statement URL is required' });
    }

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/fhir+json, application/json',
        'User-Agent': 'FHIR-IQ-Site/1.0'
      },
      timeout: 10000
    });

    if (!response.ok) {
      throw new Error(`FHIR server error: ${response.status}`);
    }

    const capabilities = await response.json();

    return ok({
      success: true,
      url,
      capabilities,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('FHIR capabilities error:', error);
    return serverError({
      error: 'Failed to fetch capability statement',
      message: error.message
    });
  }
}

// Helper functions
async function generateChatResponse(message, apiKey) {
  // Simple FHIR knowledge base responses
  const fhirKeywords = {
    'patient': 'The Patient resource represents an individual receiving health services.',
    'observation': 'Observations are measurements and assertions about a patient.',
    'condition': 'Conditions represent problems, diagnoses, or clinical states.',
    'medication': 'Medication resources represent substances used in healthcare.',
    'encounter': 'Encounters represent interactions between patients and healthcare providers.',
    'fhir': 'FHIR (Fast Healthcare Interoperability Resources) is a standard for healthcare data exchange.'
  };

  const lowerMessage = message.toLowerCase();

  for (const [keyword, response] of Object.entries(fhirKeywords)) {
    if (lowerMessage.includes(keyword)) {
      return `${response} Would you like to know more about FHIR resources or explore our AI Builder tool?`;
    }
  }

  return "I'm here to help with FHIR-related questions. Try asking about Patient, Observation, Condition, or other FHIR resources!";
}

function generateSessionId() {
  return 'session_' + Math.random().toString(36).substr(2, 9);
}

async function verifyWebhookSignature(request) {
  // Implement webhook signature verification
  // This is a placeholder - implement actual signature verification
  return true;
}

async function handleOrderPaid(orderData) {
  // Import license generation logic
  const { createLicense } = await import('./commerce/licenseManager.js');
  await createLicense(orderData);
}

async function handleOrderCancelled(orderData) {
  // Handle order cancellation
  console.log('Order cancelled:', orderData.orderId);
}