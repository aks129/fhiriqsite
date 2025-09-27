// FHIR IQ Analytics Tracking - Wix Velo Backend
// Comprehensive tracking implementation for GA4, PostHog, and custom analytics

import { webMethod } from 'wix-web-module';
import { fetch } from 'wix-fetch';
import { getSecret } from 'wix-secrets-backend';

// Analytics configuration
const ANALYTICS_CONFIG = {
  ga4_measurement_id: 'GA_MEASUREMENT_ID',
  posthog_api_key: 'POSTHOG_API_KEY',
  tracking_enabled: true,
  debug_mode: false
};

// Core analytics tracking service
export const analyticsService = {
  // Track acquisition events
  trackAcquisition: webMethod(async (eventData) => {
    try {
      const {
        source,
        medium,
        campaign,
        content,
        userProperties,
        pageData
      } = eventData;

      // GA4 acquisition tracking
      await sendGA4Event('acquisition_tracked', {
        traffic_source: source,
        traffic_medium: medium,
        campaign_name: campaign,
        campaign_content: content,
        page_location: pageData.url,
        user_segment: userProperties.segment
      });

      // PostHog acquisition tracking
      await sendPostHogEvent('acquisition_tracked', {
        source,
        medium,
        campaign,
        content,
        user_properties: userProperties,
        page_data: pageData
      });

      // Store acquisition data for attribution
      await storeAcquisitionData({
        source,
        medium,
        campaign,
        timestamp: Date.now(),
        userAgent: pageData.userAgent,
        referrer: pageData.referrer
      });

      return { success: true, message: 'Acquisition event tracked' };

    } catch (error) {
      console.error('Acquisition tracking error:', error);
      return { success: false, error: error.message };
    }
  }),

  // Track activation events (CTAs, demos, quizzes)
  trackActivation: webMethod(async (eventData) => {
    try {
      const {
        activationType,
        activationContext,
        userProperties,
        performanceData
      } = eventData;

      // Calculate activation score
      const activationScore = calculateActivationScore(activationType, activationContext);

      // GA4 activation tracking
      await sendGA4Event('activation_event', {
        activation_type: activationType,
        activation_context: JSON.stringify(activationContext),
        activation_score: activationScore,
        user_segment: userProperties.segment,
        session_depth: performanceData.sessionDepth
      });

      // PostHog activation tracking
      await sendPostHogEvent('activation_event', {
        activation_type: activationType,
        activation_context: activationContext,
        activation_score: activationScore,
        user_properties: userProperties,
        performance_data: performanceData
      });

      // Update user activation profile
      await updateUserActivationProfile(userProperties.userId, {
        activationType,
        activationScore,
        timestamp: Date.now()
      });

      return {
        success: true,
        activationScore,
        activationLevel: getActivationLevel(activationScore)
      };

    } catch (error) {
      console.error('Activation tracking error:', error);
      return { success: false, error: error.message };
    }
  }),

  // Track conversion events (bookings, purchases, enrollments)
  trackConversion: webMethod(async (eventData) => {
    try {
      const {
        conversionType,
        conversionValue,
        conversionData,
        attributionData,
        userProperties
      } = eventData;

      // GA4 conversion tracking with enhanced ecommerce
      await sendGA4Event('conversion', {
        conversion_type: conversionType,
        value: conversionValue,
        currency: 'USD',
        transaction_id: conversionData.transactionId,
        items: conversionData.items || [],
        user_segment: userProperties.segment,
        attribution_source: attributionData.source
      });

      // PostHog conversion tracking
      await sendPostHogEvent('conversion', {
        conversion_type: conversionType,
        conversion_value: conversionValue,
        conversion_data: conversionData,
        attribution_data: attributionData,
        user_properties: userProperties
      });

      // Revenue tracking
      await trackRevenue({
        amount: conversionValue,
        type: conversionType,
        source: attributionData.source,
        userId: userProperties.userId,
        timestamp: Date.now()
      });

      // Update conversion funnel metrics
      await updateConversionFunnelMetrics(conversionType, attributionData);

      return {
        success: true,
        conversionId: conversionData.transactionId,
        attributedSource: attributionData.source
      };

    } catch (error) {
      console.error('Conversion tracking error:', error);
      return { success: false, error: error.message };
    }
  }),

  // Track engagement events (chatbot, docs, return visits)
  trackEngagement: webMethod(async (eventData) => {
    try {
      const {
        engagementType,
        engagementData,
        sessionData,
        userProperties
      } = eventData;

      // Calculate engagement quality score
      const engagementQuality = calculateEngagementQuality(
        engagementType,
        engagementData,
        sessionData
      );

      // GA4 engagement tracking
      await sendGA4Event('engagement_event', {
        engagement_type: engagementType,
        engagement_quality: engagementQuality,
        session_duration: sessionData.duration,
        page_views: sessionData.pageViews,
        user_segment: userProperties.segment
      });

      // PostHog engagement tracking
      await sendPostHogEvent('engagement_event', {
        engagement_type: engagementType,
        engagement_data: engagementData,
        engagement_quality: engagementQuality,
        session_data: sessionData,
        user_properties: userProperties
      });

      // Update user engagement profile
      await updateUserEngagementProfile(userProperties.userId, {
        engagementType,
        engagementQuality,
        timestamp: Date.now()
      });

      return {
        success: true,
        engagementQuality,
        engagementLevel: getEngagementLevel(engagementQuality)
      };

    } catch (error) {
      console.error('Engagement tracking error:', error);
      return { success: false, error: error.message };
    }
  }),

  // Generate weekly analytics report
  generateWeeklyReport: webMethod(async (reportParams) => {
    try {
      const { startDate, endDate, recipients } = reportParams;

      // Collect data from all sources
      const reportData = await collectReportData(startDate, endDate);

      // Generate report sections
      const report = {
        executiveSummary: generateExecutiveSummary(reportData),
        acquisitionMetrics: generateAcquisitionReport(reportData),
        activationMetrics: generateActivationReport(reportData),
        conversionMetrics: generateConversionReport(reportData),
        engagementMetrics: generateEngagementReport(reportData)
      };

      // Send email report
      await sendWeeklyReport(report, recipients);

      // Store report for historical analysis
      await storeWeeklyReport(report, startDate, endDate);

      return { success: true, reportId: generateReportId(startDate) };

    } catch (error) {
      console.error('Report generation error:', error);
      return { success: false, error: error.message };
    }
  })
};

// Helper functions for analytics calculations

function calculateActivationScore(activationType, context) {
  const scoreMap = {
    'page_visit': 1,
    'cta_click': 5,
    'demo_started': 15,
    'demo_completed': 50,
    'quiz_started': 10,
    'quiz_completed': 75,
    'newsletter_signup': 20,
    'consultation_booked': 100,
    'tool_trial': 60,
    'course_enrollment': 150
  };

  let baseScore = scoreMap[activationType] || 0;

  // Apply context multipliers
  if (context.completionRate && context.completionRate > 0.8) {
    baseScore *= 1.2; // 20% bonus for high completion
  }

  if (context.timeSpent && context.timeSpent > 300000) { // 5+ minutes
    baseScore *= 1.1; // 10% bonus for engagement time
  }

  return Math.round(baseScore);
}

function calculateEngagementQuality(type, data, session) {
  switch (type) {
    case 'chatbot_interaction':
      return calculateChatbotQuality(data, session);
    case 'documentation_reading':
      return calculateDocumentationQuality(data, session);
    case 'return_visit':
      return calculateReturnVisitQuality(data, session);
    default:
      return 50; // Default quality score
  }
}

function calculateChatbotQuality(data, session) {
  let quality = 50; // Base score

  // Message count factor
  if (data.messageCount >= 5) quality += 20;
  else if (data.messageCount >= 3) quality += 10;

  // Helpful votes factor
  if (data.helpfulVotes && data.helpfulVotes > 0) {
    const helpfulRate = data.helpfulVotes / (data.helpfulVotes + (data.unhelpfulVotes || 0));
    quality += Math.round(helpfulRate * 30);
  }

  // Code copy actions
  if (data.codeCopyCount > 0) quality += 15;

  // Conversation export
  if (data.conversationExported) quality += 20;

  return Math.min(quality, 100);
}

function calculateDocumentationQuality(data, session) {
  let quality = 30; // Base score

  // Reading time factor
  const readingTimeMinutes = (data.readingTime || 0) / 60000;
  if (readingTimeMinutes >= 5) quality += 30;
  else if (readingTimeMinutes >= 3) quality += 20;
  else if (readingTimeMinutes >= 1) quality += 10;

  // Scroll depth factor
  const scrollDepth = data.scrollDepth || 0;
  quality += Math.round(scrollDepth * 0.2); // Max 20 points for 100% scroll

  // Code copy actions
  if (data.codeCopyCount > 0) quality += 15;

  // Search usage
  if (data.searchQueries > 0) quality += 10;

  return Math.min(quality, 100);
}

function calculateReturnVisitQuality(data, session) {
  let quality = 40; // Base score for returning

  // Visit frequency factor
  const daysSinceLastVisit = data.daysSinceLastVisit || 0;
  if (daysSinceLastVisit <= 1) quality += 30; // Same day return
  else if (daysSinceLastVisit <= 7) quality += 20; // Weekly return
  else if (daysSinceLastVisit <= 30) quality += 10; // Monthly return

  // Session depth improvement
  const sessionDepthImprovement = (session.pageViews || 1) - (data.averagePageViews || 1);
  if (sessionDepthImprovement > 0) quality += Math.min(sessionDepthImprovement * 5, 20);

  // Engagement progression
  if (data.conversionEventCount > 0) quality += 15;

  return Math.min(quality, 100);
}

// Analytics data sending functions

async function sendGA4Event(eventName, parameters) {
  if (!ANALYTICS_CONFIG.tracking_enabled) return;

  try {
    const ga4Endpoint = `https://www.google-analytics.com/mp/collect?measurement_id=${ANALYTICS_CONFIG.ga4_measurement_id}&api_secret=${await getSecret('GA4_API_SECRET')}`;

    const payload = {
      client_id: parameters.client_id || generateClientId(),
      events: [{
        name: eventName,
        params: parameters
      }]
    };

    await fetch(ga4Endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

  } catch (error) {
    console.error('GA4 tracking error:', error);
  }
}

async function sendPostHogEvent(eventName, properties) {
  if (!ANALYTICS_CONFIG.tracking_enabled) return;

  try {
    const posthogEndpoint = 'https://app.posthog.com/capture/';
    const apiKey = await getSecret('POSTHOG_API_KEY');

    const payload = {
      api_key: apiKey,
      event: eventName,
      properties: {
        ...properties,
        timestamp: Date.now(),
        distinct_id: properties.user_id || generateUserId()
      }
    };

    await fetch(posthogEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

  } catch (error) {
    console.error('PostHog tracking error:', error);
  }
}

// Data storage and retrieval functions

async function storeAcquisitionData(data) {
  // Store in Wix Data collection for attribution analysis
  try {
    const { insert } = await import('wix-data');

    await insert('AcquisitionData', {
      source: data.source,
      medium: data.medium,
      campaign: data.campaign,
      timestamp: new Date(data.timestamp),
      userAgent: data.userAgent,
      referrer: data.referrer
    });
  } catch (error) {
    console.error('Acquisition data storage error:', error);
  }
}

async function updateUserActivationProfile(userId, activationData) {
  try {
    const { query, update } = await import('wix-data');

    const existingProfile = await query('UserActivationProfiles')
      .eq('userId', userId)
      .find();

    if (existingProfile.items.length > 0) {
      // Update existing profile
      const profile = existingProfile.items[0];
      const newScore = (profile.totalActivationScore || 0) + activationData.activationScore;

      await update('UserActivationProfiles', {
        ...profile,
        totalActivationScore: newScore,
        lastActivation: new Date(activationData.timestamp),
        activationEvents: [...(profile.activationEvents || []), activationData]
      });
    } else {
      // Create new profile
      await insert('UserActivationProfiles', {
        userId: userId,
        totalActivationScore: activationData.activationScore,
        firstActivation: new Date(activationData.timestamp),
        lastActivation: new Date(activationData.timestamp),
        activationEvents: [activationData]
      });
    }
  } catch (error) {
    console.error('User activation profile update error:', error);
  }
}

async function trackRevenue(revenueData) {
  try {
    const { insert } = await import('wix-data');

    await insert('RevenueTracking', {
      amount: revenueData.amount,
      revenueType: revenueData.type,
      source: revenueData.source,
      userId: revenueData.userId,
      timestamp: new Date(revenueData.timestamp)
    });
  } catch (error) {
    console.error('Revenue tracking error:', error);
  }
}

// Report generation functions

async function collectReportData(startDate, endDate) {
  try {
    const { query } = await import('wix-data');

    // Collect acquisition data
    const acquisitionData = await query('AcquisitionData')
      .between('timestamp', new Date(startDate), new Date(endDate))
      .find();

    // Collect conversion data
    const conversionData = await query('RevenueTracking')
      .between('timestamp', new Date(startDate), new Date(endDate))
      .find();

    // Collect activation data
    const activationData = await query('UserActivationProfiles')
      .between('lastActivation', new Date(startDate), new Date(endDate))
      .find();

    return {
      acquisition: acquisitionData.items,
      conversions: conversionData.items,
      activations: activationData.items
    };
  } catch (error) {
    console.error('Report data collection error:', error);
    return { acquisition: [], conversions: [], activations: [] };
  }
}

async function sendWeeklyReport(report, recipients) {
  try {
    const emailService = await getSecret('EMAIL_SERVICE_API_KEY');

    const emailTemplate = generateReportEmailTemplate(report);

    // Send email using preferred service (SendGrid, Mailgun, etc.)
    await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: recipients,
        subject: `FHIR IQ Weekly Analytics Report - ${new Date().toISOString().split('T')[0]}`,
        html: emailTemplate
      })
    });
  } catch (error) {
    console.error('Weekly report email error:', error);
  }
}

// Utility functions

function generateClientId() {
  return 'client_' + Math.random().toString(36).substr(2, 9) + Date.now();
}

function generateUserId() {
  return 'user_' + Math.random().toString(36).substr(2, 9) + Date.now();
}

function getActivationLevel(score) {
  if (score >= 100) return 'highly_activated';
  if (score >= 75) return 'well_activated';
  if (score >= 50) return 'moderately_activated';
  if (score >= 25) return 'lightly_activated';
  return 'not_activated';
}

function getEngagementLevel(quality) {
  if (quality >= 80) return 'highly_engaged';
  if (quality >= 60) return 'engaged';
  if (quality >= 40) return 'moderately_engaged';
  return 'low_engagement';
}