# Third-Party API Integrations Specification

## Purpose
Define integrations with external services to enhance FHIR IQ's functionality, automate workflows, and provide comprehensive business intelligence.

## Core Integrations

### 1. OpenAI API Integration

#### Configuration
```javascript
// File: backend/openai-client.js
import { getSecret } from 'wix-secrets-backend';
import { fetch } from 'wix-fetch';

const OPENAI_CONFIG = {
  apiUrl: 'https://api.openai.com/v1',
  models: {
    chatbot: 'gpt-4',
    codeGeneration: 'gpt-4',
    contentGeneration: 'gpt-4',
    embedding: 'text-embedding-ada-002'
  },
  maxTokens: {
    chatbot: 500,
    codeGeneration: 2000,
    contentGeneration: 1500
  },
  temperature: {
    chatbot: 0.7,
    codeGeneration: 0.3,
    contentGeneration: 0.8
  }
};

export async function callOpenAI(prompt, model = 'gpt-4', options = {}) {
  try {
    const apiKey = await getSecret('OPENAI_API_KEY');

    const response = await fetch(`${OPENAI_CONFIG.apiUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        messages: prompt,
        max_tokens: options.maxTokens || OPENAI_CONFIG.maxTokens[model] || 500,
        temperature: options.temperature || OPENAI_CONFIG.temperature[model] || 0.7,
        ...options
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${data.error.message}`);
    }

    return {
      success: true,
      content: data.choices[0].message.content,
      usage: data.usage
    };

  } catch (error) {
    console.error('OpenAI API call failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}
```

#### Usage Monitoring
```javascript
export async function trackOpenAIUsage(userId, model, tokens, cost) {
  await storeUsageRecord({
    userId: userId,
    service: 'openai',
    model: model,
    tokens: tokens,
    cost: cost,
    timestamp: new Date()
  });

  // Check usage limits for free tier users
  const monthlyUsage = await getMonthlyUsage(userId, 'openai');
  if (monthlyUsage.cost > FREE_TIER_LIMIT) {
    await notifyUsageLimitReached(userId);
  }
}
```

### 2. Substack API Integration

#### Blog Post Import
```javascript
// File: backend/substack-integration.js
export async function importSubstackPosts() {
  try {
    const substackApiKey = await getSecret('SUBSTACK_API_KEY');
    const publicationId = await getSecret('SUBSTACK_PUBLICATION_ID');

    // Fetch posts from Substack API
    const response = await fetch(`https://api.substack.com/v1/publications/${publicationId}/posts`, {
      headers: {
        'Authorization': `Bearer ${substackApiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    // Process and import posts
    for (const post of data.posts) {
      await importBlogPost(post);
    }

    return {
      success: true,
      imported: data.posts.length
    };

  } catch (error) {
    console.error('Substack import failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

async function importBlogPost(substackPost) {
  // Convert Substack post to Wix CMS format
  const blogPost = {
    title: substackPost.title,
    slug: generateSlug(substackPost.title),
    content: convertToWixFormat(substackPost.body_html),
    excerpt: substackPost.subtitle || generateExcerpt(substackPost.body_html),
    publishDate: new Date(substackPost.post_date),
    author: 'gene-vestel', // Reference to author CMS item
    categories: extractCategories(substackPost.tags),
    sourceUrl: substackPost.canonical_url,
    imported: true,
    importDate: new Date()
  };

  // Check if post already exists
  const existingPost = await findBlogPostBySlug(blogPost.slug);

  if (existingPost) {
    // Update existing post
    await updateBlogPost(existingPost._id, blogPost);
  } else {
    // Create new post
    await createBlogPost(blogPost);
  }
}
```

#### Newsletter Sync
```javascript
export async function syncSubstackSubscribers() {
  const subscribers = await fetchSubstackSubscribers();

  for (const subscriber of subscribers) {
    await addToNewsletterList(subscriber.email, {
      source: 'substack_import',
      subscriptionDate: subscriber.created_at,
      isPaid: subscriber.is_paid_subscriber
    });
  }
}
```

### 3. Podcast Platform Integration

#### RSS Feed Management
```javascript
// File: backend/podcast-integration.js
export async function generatePodcastRSS() {
  const episodes = await getPodcastEpisodes();
  const podcastMeta = await getPodcastMetadata();

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <title>${podcastMeta.title}</title>
    <description>${podcastMeta.description}</description>
    <link>${podcastMeta.websiteUrl}</link>
    <language>en-us</language>
    <itunes:author>${podcastMeta.author}</itunes:author>
    <itunes:image href="${podcastMeta.artworkUrl}"/>
    <itunes:category text="Technology"/>
    <itunes:category text="Business"/>

    ${episodes.map(episode => `
    <item>
      <title>${episode.title}</title>
      <description>${episode.description}</description>
      <enclosure url="${episode.audioUrl}" type="audio/mpeg" length="${episode.fileSize}"/>
      <guid>${episode.guid}</guid>
      <pubDate>${episode.publishDate}</pubDate>
      <itunes:duration>${episode.duration}</itunes:duration>
      <itunes:episode>${episode.episodeNumber}</itunes:episode>
    </item>
    `).join('')}
  </channel>
</rss>`;

  return rssXml;
}
```

#### Distribution Platform Sync
```javascript
export async function syncToPodcastPlatforms(episodeId) {
  const episode = await getPodcastEpisode(episodeId);

  // Submit to major podcast platforms
  await Promise.all([
    submitToSpotify(episode),
    submitToApplePodcasts(episode),
    submitToGooglePodcasts(episode)
  ]);
}
```

### 4. Calendar Integration (Calendly/Cal.com)

#### Booking Widget Embed
```javascript
// File: pages/consultation-booking.js
$w.onReady(function () {
  setupCalendlyWidget();
});

function setupCalendlyWidget() {
  // Load Calendly widget script
  const script = document.createElement('script');
  script.src = 'https://assets.calendly.com/assets/external/widget.js';
  script.async = true;
  document.head.appendChild(script);

  script.onload = function() {
    // Initialize Calendly widget
    Calendly.initInlineWidget({
      url: 'https://calendly.com/fhiriq/consultation',
      parentElement: $w('#calendlyWidget').target,
      prefill: {
        name: getCurrentUserName(),
        email: getCurrentUserEmail()
      },
      utm: {
        utmCampaign: 'website',
        utmSource: 'consultation_page',
        utmMedium: 'widget'
      }
    });
  };
}
```

#### Booking Confirmation Workflow
```javascript
export async function handleBookingConfirmation(bookingData) {
  // Store booking in CRM
  await createBookingRecord({
    calendlyEventId: bookingData.event.uuid,
    customerEmail: bookingData.invitee.email,
    customerName: bookingData.invitee.name,
    scheduledDate: bookingData.event.start_time,
    serviceType: bookingData.event.event_type.name,
    status: 'confirmed'
  });

  // Send confirmation email
  await sendBookingConfirmationEmail(bookingData.invitee.email, bookingData);

  // Add to CRM pipeline
  await addToCRMPipeline(bookingData.invitee.email, 'consultation_booked');

  // Schedule follow-up reminders
  await scheduleBookingReminders(bookingData);
}
```

### 5. Email Service Provider (Mailchimp/ConvertKit)

#### Newsletter Management
```javascript
// File: backend/email-marketing.js
export async function addToNewsletterList(email, metadata = {}) {
  try {
    const mailchimpApiKey = await getSecret('MAILCHIMP_API_KEY');
    const listId = await getSecret('MAILCHIMP_LIST_ID');

    const response = await fetch(`https://us1.api.mailchimp.com/3.0/lists/${listId}/members`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${mailchimpApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: metadata.firstName || '',
          LNAME: metadata.lastName || '',
          COMPANY: metadata.company || '',
          ROLE: metadata.role || ''
        },
        tags: metadata.tags || ['website_signup']
      })
    });

    if (response.ok) {
      await trackEmailSignup(email, metadata);
      return { success: true };
    } else {
      const error = await response.json();
      throw new Error(error.detail);
    }

  } catch (error) {
    console.error('Newsletter signup failed:', error);
    return { success: false, error: error.message };
  }
}
```

#### Automated Email Sequences
```javascript
export async function triggerEmailSequence(email, sequenceName, personalization = {}) {
  const sequences = {
    welcome_series: [
      { delay: 0, template: 'welcome', subject: 'Welcome to FHIR IQ!' },
      { delay: 2, template: 'getting_started', subject: 'Getting started with FHIR' },
      { delay: 5, template: 'tools_introduction', subject: 'Meet our AI-powered FHIR tools' },
      { delay: 10, template: 'case_studies', subject: 'How others are succeeding with FHIR' }
    ],
    trial_nurture: [
      { delay: 0, template: 'trial_welcome', subject: 'Your FHIR Builder trial is ready!' },
      { delay: 3, template: 'trial_tips', subject: 'Pro tips for your FHIR Builder trial' },
      { delay: 7, template: 'trial_reminder', subject: 'How\'s your FHIR app coming along?' },
      { delay: 12, template: 'trial_ending', subject: 'Your trial ends soon - upgrade to keep building' }
    ]
  };

  const sequence = sequences[sequenceName];
  if (!sequence) return;

  for (const email of sequence) {
    await scheduleEmail(email, email, personalization, email.delay);
  }
}
```

### 6. CRM Integration (HubSpot/Pipedrive)

#### Contact Management
```javascript
// File: backend/crm-integration.js
export async function syncContactToCRM(contactData) {
  try {
    const hubspotApiKey = await getSecret('HUBSPOT_API_KEY');

    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${hubspotApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        properties: {
          email: contactData.email,
          firstname: contactData.firstName,
          lastname: contactData.lastName,
          company: contactData.company,
          jobtitle: contactData.role,
          website: contactData.website,
          phone: contactData.phone,
          lead_source: contactData.source || 'website',
          fhir_experience: contactData.fhirExperience,
          company_size: contactData.companySize,
          use_case: contactData.useCase
        }
      })
    });

    const result = await response.json();

    if (response.ok) {
      return {
        success: true,
        contactId: result.id,
        hubspotUrl: `https://app.hubspot.com/contacts/${result.id}`
      };
    } else {
      throw new Error(result.message);
    }

  } catch (error) {
    console.error('CRM sync failed:', error);
    return { success: false, error: error.message };
  }
}
```

#### Deal Pipeline Management
```javascript
export async function createDeal(contactId, dealData) {
  const deal = {
    properties: {
      dealname: dealData.name,
      amount: dealData.value,
      dealstage: dealData.stage || 'initial_contact',
      pipeline: 'consulting_pipeline',
      closedate: dealData.expectedCloseDate,
      deal_type: dealData.type, // consulting, training, tools
      fhir_project_scope: dealData.projectScope
    },
    associations: [{
      to: { id: contactId },
      types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }] // Contact to Deal
    }]
  };

  return await createHubSpotDeal(deal);
}
```

### 7. Analytics Integration (Google Analytics 4)

#### Enhanced E-commerce Tracking
```javascript
// File: public/analytics.js
// Google Analytics 4 configuration
gtag('config', 'G-XXXXXXXXXX', {
  currency: 'USD',
  custom_map: {
    custom_parameter_1: 'fhir_experience_level',
    custom_parameter_2: 'company_size',
    custom_parameter_3: 'use_case'
  }
});

// Track purchase events
export function trackPurchase(transactionData) {
  gtag('event', 'purchase', {
    transaction_id: transactionData.id,
    value: transactionData.total,
    currency: 'USD',
    items: transactionData.items.map(item => ({
      item_id: item.sku,
      item_name: item.name,
      category: item.category,
      quantity: item.quantity,
      price: item.price
    })),
    fhir_experience_level: transactionData.customerData.fhirExperience,
    company_size: transactionData.customerData.companySize
  });
}

// Track tool usage
export function trackToolUsage(toolName, action, details = {}) {
  gtag('event', 'tool_interaction', {
    tool_name: toolName,
    action: action,
    value: details.value || 1,
    custom_parameter_1: details.complexity || 'basic',
    custom_parameter_2: details.duration || 0
  });
}
```

#### Custom Conversion Events
```javascript
const CONVERSION_EVENTS = {
  consultation_booking: {
    eventName: 'consultation_booked',
    value: 250, // Average consultation value
    parameters: ['service_type', 'booking_date']
  },
  trial_signup: {
    eventName: 'trial_started',
    value: 49, // Monthly subscription value
    parameters: ['tool_name', 'trial_length']
  },
  newsletter_signup: {
    eventName: 'newsletter_subscribe',
    value: 5, // Lead value
    parameters: ['source', 'content_type']
  }
};
```

### 8. Social Media Integration

#### LinkedIn API Integration
```javascript
// File: backend/social-media.js
export async function postToLinkedIn(content, imageUrl = null) {
  try {
    const accessToken = await getSecret('LINKEDIN_ACCESS_TOKEN');
    const companyId = await getSecret('LINKEDIN_COMPANY_ID');

    const postData = {
      author: `urn:li:organization:${companyId}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: content
          },
          shareMediaCategory: imageUrl ? 'IMAGE' : 'NONE'
        }
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
      }
    };

    if (imageUrl) {
      // Upload image first, then add to post
      const imageAsset = await uploadLinkedInImage(imageUrl, accessToken);
      postData.specificContent['com.linkedin.ugc.ShareContent'].media = [{
        status: 'READY',
        description: { text: 'FHIR IQ content' },
        media: imageAsset
      }];
    }

    const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });

    return response.ok;

  } catch (error) {
    console.error('LinkedIn posting failed:', error);
    return false;
  }
}
```

## API Rate Limiting and Error Handling

### Rate Limiting Strategy
```javascript
// File: backend/rate-limiting.js
const RATE_LIMITS = {
  openai: {
    requests_per_minute: 60,
    tokens_per_minute: 90000,
    requests_per_day: 1000
  },
  hubspot: {
    requests_per_second: 10,
    requests_per_day: 40000
  },
  mailchimp: {
    requests_per_second: 10,
    requests_per_month: 1000000
  }
};

export async function checkRateLimit(service, requestType = 'request') {
  const key = `rate_limit:${service}:${requestType}`;
  const limit = RATE_LIMITS[service][`${requestType}s_per_minute`];

  // Implementation depends on your caching solution
  const currentCount = await getFromCache(key) || 0;

  if (currentCount >= limit) {
    throw new Error(`Rate limit exceeded for ${service}`);
  }

  await incrementCounter(key, 60); // 60 second TTL
}
```

### Retry Logic with Exponential Backoff
```javascript
export async function retryWithBackoff(fn, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }

      // Exponential backoff: 1s, 2s, 4s
      const delay = Math.pow(2, attempt - 1) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```

## Monitoring and Alerting

### API Health Monitoring
```javascript
export async function checkAPIHealth() {
  const services = ['openai', 'hubspot', 'mailchimp', 'calendly', 'stripe'];
  const healthStatus = {};

  for (const service of services) {
    try {
      const isHealthy = await pingService(service);
      healthStatus[service] = {
        status: isHealthy ? 'healthy' : 'degraded',
        lastChecked: new Date(),
        responseTime: isHealthy.responseTime
      };
    } catch (error) {
      healthStatus[service] = {
        status: 'down',
        lastChecked: new Date(),
        error: error.message
      };
    }
  }

  // Alert if critical services are down
  const criticalServices = ['openai', 'stripe'];
  const downServices = criticalServices.filter(service =>
    healthStatus[service].status === 'down'
  );

  if (downServices.length > 0) {
    await sendAlertEmail('Critical API services down', downServices);
  }

  return healthStatus;
}
```

## Implementation Timeline

### Phase 1: Core APIs (Week 1)
- OpenAI integration for chatbot and code generation
- Stripe integration for payments
- Basic error handling and monitoring

### Phase 2: Content & Marketing (Week 2)
- Substack blog import
- Email marketing platform setup
- Podcast RSS feed generation
- Calendar booking integration

### Phase 3: CRM & Analytics (Week 3)
- HubSpot/CRM integration
- Google Analytics 4 setup
- Lead scoring automation
- Social media posting

### Phase 4: Optimization (Week 4)
- Rate limiting implementation
- Advanced error handling and retries
- API health monitoring
- Performance optimization

## Security Considerations

### API Key Management
- Store all API keys in Wix Secrets
- Rotate keys regularly (quarterly)
- Use different keys for development/production
- Monitor API key usage for anomalies

### Data Privacy
- Ensure GDPR compliance for EU users
- Implement data retention policies
- Provide user data export/deletion options
- Audit third-party data sharing

### Security Monitoring
- Monitor for unusual API usage patterns
- Log all API calls for security auditing
- Implement IP whitelisting where possible
- Use HTTPS for all API communications

## Acceptance Criteria

- [ ] All third-party APIs integrate successfully with error handling
- [ ] Rate limiting prevents API quota exhaustion
- [ ] Webhook handling is secure and reliable
- [ ] Data synchronization works bidirectionally where needed
- [ ] API health monitoring alerts for service issues
- [ ] Security best practices implemented for all integrations
- [ ] Documentation complete for all API integrations
- [ ] Testing covers all integration scenarios
- [ ] Performance benchmarks met for API response times
- [ ] Backup/fallback solutions work when APIs are unavailable

## Dependencies
- Wix Secrets configuration for API keys
- Third-party service accounts and API access
- Webhook endpoint setup and SSL certificates
- Monitoring and alerting infrastructure
- Testing environment for API integration validation