/**
 * Booking Web Module - Wix Velo Backend
 *
 * Handles consultation booking operations and Calendly integration
 * This file lives in /backend/booking.web.js in Wix Studio
 *
 * @fileoverview Backend web module for consultation booking
 */

import { webMethod } from 'wix-web-module';
import { fetch } from 'wix-fetch';
import { getSecret } from 'wix-secrets-backend';
import wixData from 'wix-data';

/**
 * Submit consultation booking form
 * @param {Object} bookingData - Booking form data
 * @param {string} bookingData.name - Client name
 * @param {string} bookingData.email - Client email
 * @param {string} bookingData.company - Company name
 * @param {string} bookingData.serviceType - Type of service needed
 * @param {string} bookingData.challenge - Description of challenge
 * @param {string} bookingData.timeline - Project timeline
 * @param {string} bookingData.budget - Budget range
 * @returns {Promise<Object>} Booking submission result
 */
export const submitConsultationBooking = webMethod(async (bookingData) => {
  try {
    // Validate required fields
    const requiredFields = ['name', 'email', 'company', 'serviceType', 'challenge'];
    for (const field of requiredFields) {
      if (!bookingData[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(bookingData.email)) {
      throw new Error('Invalid email format');
    }

    // Generate booking ID
    const bookingId = `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Store booking in CMS
    const bookingRecord = {
      bookingId,
      name: bookingData.name,
      email: bookingData.email,
      company: bookingData.company,
      serviceType: bookingData.serviceType,
      challenge: bookingData.challenge,
      timeline: bookingData.timeline || '',
      budget: bookingData.budget || '',
      status: 'pending',
      submittedDate: new Date(),
      source: bookingData.source || 'website'
    };

    // TODO: Create BookingRequests collection in Wix CMS
    await wixData.insert('BookingRequests', bookingRecord);

    // Send to CRM (HubSpot integration)
    await createCRMLead(bookingData, bookingId);

    // Send notification email to team
    await sendBookingNotification(bookingData, bookingId);

    // Send confirmation email to client
    await sendBookingConfirmation(bookingData, bookingId);

    return {
      success: true,
      bookingId,
      message: 'Booking request submitted successfully',
      nextSteps: 'You will receive a confirmation email shortly with next steps.'
    };

  } catch (error) {
    console.error('Error submitting consultation booking:', error);

    // Send error notification to team
    await sendErrorNotification('booking_submission_failed', error, bookingData);

    throw new Error(error.message || 'Failed to submit booking request');
  }
});

/**
 * Get available consultation time slots (Calendly integration)
 * @param {string} serviceType - Type of consultation service
 * @param {string} timezone - Client timezone
 * @returns {Promise<Object>} Available time slots
 */
export const getAvailableTimeSlots = webMethod(async (serviceType, timezone = 'UTC') => {
  try {
    // TODO: Store Calendly API token in Wix Secrets as CALENDLY_API_TOKEN
    const calendlyToken = await getSecret('CALENDLY_API_TOKEN');

    if (!calendlyToken) {
      console.warn('Calendly API token not configured');
      return {
        success: false,
        message: 'Booking calendar not available'
      };
    }

    // Get event type based on service
    const eventTypeMap = {
      'implementation': 'fhir-implementation-consultation',
      'architecture': 'fhir-architecture-review',
      'smart_development': 'smart-on-fhir-consultation',
      'general': 'general-fhir-consultation'
    };

    const eventType = eventTypeMap[serviceType] || eventTypeMap.general;

    // Fetch available times from Calendly
    const response = await fetch(`https://api.calendly.com/scheduling_links`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${calendlyToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        max_event_count: 1,
        owner: 'https://api.calendly.com/users/YOUR_USER_UUID', // TODO: Replace with actual user UUID
        owner_type: 'User'
      })
    });

    if (!response.ok) {
      throw new Error(`Calendly API error: ${response.status}`);
    }

    const data = await response.json();

    return {
      success: true,
      bookingUrl: data.booking_url,
      eventType: serviceType,
      timezone
    };

  } catch (error) {
    console.error('Error fetching time slots:', error);

    // Fallback: return manual booking option
    return {
      success: false,
      fallback: true,
      message: 'Please contact us directly to schedule your consultation',
      contact: {
        email: 'hello@fhiriq.com',
        phone: '+1 (555) 123-FHIR'
      }
    };
  }
});

/**
 * Handle Calendly webhook for booking confirmations
 * @param {Object} webhookData - Calendly webhook payload
 * @returns {Promise<Object>} Webhook processing result
 */
export const handleCalendlyWebhook = webMethod(async (webhookData) => {
  try {
    const { event, payload } = webhookData;

    if (event === 'invitee.created') {
      // Update booking status in CMS
      const inviteeEmail = payload.email;

      const bookingResults = await wixData.query('BookingRequests')
        .eq('email', inviteeEmail)
        .eq('status', 'pending')
        .find();

      if (bookingResults.items.length > 0) {
        const booking = bookingResults.items[0];

        await wixData.update('BookingRequests', {
          ...booking,
          status: 'confirmed',
          scheduledDate: new Date(payload.scheduled_event.start_time),
          calendlyEventId: payload.uuid,
          calendlyEventUri: payload.uri
        });

        // Update CRM with meeting details
        await updateCRMLead(booking.bookingId, {
          status: 'meeting_scheduled',
          meetingDate: payload.scheduled_event.start_time,
          meetingType: payload.event_type.name
        });
      }
    }

    return { success: true, processed: event };

  } catch (error) {
    console.error('Error processing Calendly webhook:', error);
    throw new Error('Failed to process webhook');
  }
});

/**
 * Create lead in CRM system (HubSpot)
 * @param {Object} bookingData - Booking form data
 * @param {string} bookingId - Unique booking ID
 * @returns {Promise<void>}
 */
async function createCRMLead(bookingData, bookingId) {
  try {
    // TODO: Store HubSpot API key in Wix Secrets as HUBSPOT_API_KEY
    const hubspotKey = await getSecret('HUBSPOT_API_KEY');

    if (!hubspotKey) {
      console.warn('HubSpot API key not configured');
      return;
    }

    const leadData = {
      properties: {
        firstname: bookingData.name.split(' ')[0],
        lastname: bookingData.name.split(' ').slice(1).join(' ') || '',
        email: bookingData.email,
        company: bookingData.company,
        website: bookingData.website || '',
        hs_lead_status: 'NEW',
        lifecyclestage: 'lead',
        lead_source: 'Website Consultation Form',
        booking_id: bookingId,
        service_interest: bookingData.serviceType,
        project_challenge: bookingData.challenge,
        project_timeline: bookingData.timeline || '',
        budget_range: bookingData.budget || ''
      }
    };

    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${hubspotKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(leadData)
    });

    if (!response.ok) {
      console.error('HubSpot API error:', response.status, await response.text());
    }

  } catch (error) {
    console.error('Error creating CRM lead:', error);
  }
}

/**
 * Update lead in CRM with meeting details
 * @param {string} bookingId - Booking ID
 * @param {Object} updateData - Data to update
 * @returns {Promise<void>}
 */
async function updateCRMLead(bookingId, updateData) {
  try {
    const hubspotKey = await getSecret('HUBSPOT_API_KEY');

    if (!hubspotKey) return;

    // Search for contact by booking_id
    const searchResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${hubspotKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filterGroups: [{
          filters: [{
            propertyName: 'booking_id',
            operator: 'EQ',
            value: bookingId
          }]
        }]
      })
    });

    if (searchResponse.ok) {
      const searchData = await searchResponse.json();

      if (searchData.results.length > 0) {
        const contactId = searchData.results[0].id;

        // Update contact with meeting details
        await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${hubspotKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            properties: {
              hs_lead_status: updateData.status?.toUpperCase() || 'CONNECTED',
              meeting_scheduled_date: updateData.meetingDate,
              meeting_type: updateData.meetingType
            }
          })
        });
      }
    }

  } catch (error) {
    console.error('Error updating CRM lead:', error);
  }
}

/**
 * Send booking notification to team
 * @param {Object} bookingData - Booking form data
 * @param {string} bookingId - Booking ID
 * @returns {Promise<void>}
 */
async function sendBookingNotification(bookingData, bookingId) {
  try {
    // TODO: Implement email notification using Wix Triggered Emails
    // or external email service like SendGrid

    console.log('New booking notification:', {
      bookingId,
      client: bookingData.name,
      company: bookingData.company,
      serviceType: bookingData.serviceType,
      email: bookingData.email
    });

    // Email template for team notification would be configured in Wix
    // or sent via external service

  } catch (error) {
    console.error('Error sending booking notification:', error);
  }
}

/**
 * Send booking confirmation to client
 * @param {Object} bookingData - Booking form data
 * @param {string} bookingId - Booking ID
 * @returns {Promise<void>}
 */
async function sendBookingConfirmation(bookingData, bookingId) {
  try {
    // TODO: Implement confirmation email using Wix Triggered Emails

    console.log('Booking confirmation sent to:', bookingData.email, {
      bookingId,
      nextSteps: 'Calendly scheduling link will be provided'
    });

    // Confirmation email template would be configured in Wix

  } catch (error) {
    console.error('Error sending booking confirmation:', error);
  }
}

/**
 * Send error notification to team
 * @param {string} errorType - Type of error
 * @param {Error} error - Error object
 * @param {Object} context - Additional context
 * @returns {Promise<void>}
 */
async function sendErrorNotification(errorType, error, context = {}) {
  try {
    console.error('System error notification:', {
      type: errorType,
      message: error.message,
      context,
      timestamp: new Date().toISOString()
    });

    // TODO: Implement error notification system
    // Could use Slack webhook, email alert, or logging service

  } catch (notificationError) {
    console.error('Error sending error notification:', notificationError);
  }
}