// FHIR IQ Frontend Analytics Tracking
// Client-side tracking implementation for Wix Studio

// Analytics initialization and configuration
class FHIRIQAnalytics {
  constructor() {
    this.isInitialized = false;
    this.config = {
      ga4_measurement_id: 'GA_MEASUREMENT_ID',
      posthog_api_key: 'POSTHOG_API_KEY',
      debug_mode: false
    };

    // User session data
    this.sessionData = {
      startTime: Date.now(),
      pageViews: 0,
      interactions: [],
      activationScore: this.getStoredActivationScore(),
      userSegment: this.getUserSegment()
    };

    this.initialize();
  }

  async initialize() {
    if (this.isInitialized) return;

    try {
      // Initialize GA4
      await this.initializeGA4();

      // Initialize PostHog
      await this.initializePostHog();

      // Set up automatic tracking
      this.setupAutomaticTracking();

      // Track initial page view
      this.trackPageView();

      this.isInitialized = true;
      console.log('FHIR IQ Analytics initialized successfully');

    } catch (error) {
      console.error('Analytics initialization error:', error);
    }
  }

  // Google Analytics 4 Setup
  async initializeGA4() {
    // Load GA4 script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.ga4_measurement_id}`;
    document.head.appendChild(script);

    // Configure GA4
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      dataLayer.push(arguments);
    };

    gtag('js', new Date());
    gtag('config', this.config.ga4_measurement_id, {
      // Enhanced measurement
      enhanced_ecommerce: true,

      // Custom parameters
      custom_map: {
        'custom_parameter_1': 'user_segment',
        'custom_parameter_2': 'activation_score',
        'custom_parameter_3': 'traffic_source_detail',
        'custom_parameter_4': 'content_category'
      },

      // User properties
      user_properties: {
        user_segment: this.sessionData.userSegment,
        activation_score: this.sessionData.activationScore
      }
    });
  }

  // PostHog Setup
  async initializePostHog() {
    // Load PostHog script
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]);var n=t;if("undefined"!=typeof e)try{n=t[e]}catch(t){}return"function"==typeof n?n:!1}var d=e;"undefined"!=typeof a&&(d=e[a]);var u=["capture","register","register_once","unregister","identify","alias","group","track","ready","on","off","track_pageview","track_links","track_forms","capture_pageview"];for(var c=0;c<u.length;c++)g(d,u[c])||(d[u[c]]=function(t){return function(){return d._i.push([t].concat(Array.prototype.slice.call(arguments,0))),d}}(u[c]));d._i.push(["init",i,s,a])},e.__SV=1)}(document,window.posthog||[]);

    posthog.init(this.config.posthog_api_key, {
      api_host: 'https://app.posthog.com',
      capture_pageview: false, // We'll handle this manually
      autocapture: false // We want manual control
    });

    // Identify user
    posthog.identify(this.getUserId(), {
      user_segment: this.sessionData.userSegment,
      activation_score: this.sessionData.activationScore,
      first_visit: this.getFirstVisitDate()
    });
  }

  // Automatic tracking setup
  setupAutomaticTracking() {
    // Track all CTA clicks
    this.setupCTATracking();

    // Track form interactions
    this.setupFormTracking();

    // Track scroll depth
    this.setupScrollTracking();

    // Track time on page
    this.setupTimeTracking();

    // Track external link clicks
    this.setupExternalLinkTracking();

    // Track video interactions
    this.setupVideoTracking();
  }

  // Acquisition Tracking Methods
  trackAcquisition(source, medium, campaign, content = '') {
    const acquisitionData = {
      source,
      medium,
      campaign,
      content,
      timestamp: Date.now(),
      referrer: document.referrer,
      landing_page: window.location.pathname,
      user_agent: navigator.userAgent
    };

    // GA4 tracking
    gtag('event', 'acquisition_tracked', {
      traffic_source: source,
      traffic_medium: medium,
      campaign_name: campaign,
      campaign_content: content,
      page_location: window.location.href
    });

    // PostHog tracking
    posthog.capture('acquisition_tracked', acquisitionData);

    // Store for attribution
    this.storeAcquisitionData(acquisitionData);
  }

  trackOrganicSearch(keyword, position, page) {
    gtag('event', 'organic_search_landing', {
      search_keyword: keyword,
      search_position: position,
      search_page: page,
      landing_page_type: this.getPageType(),
      content_category: this.getContentCategory()
    });

    posthog.capture('organic_search_landing', {
      keyword,
      position,
      page,
      landing_page_type: this.getPageType()
    });
  }

  trackLinkedInTraffic(campaignType, contentType) {
    gtag('event', 'linkedin_traffic', {
      campaign_type: campaignType,
      content_type: contentType,
      user_segment: this.sessionData.userSegment
    });

    posthog.capture('linkedin_traffic', {
      campaign_type: campaignType,
      content_type: contentType,
      page_url: window.location.href
    });
  }

  trackPodcastReferral(episodeTitle, platform, guestName = '') {
    gtag('event', 'podcast_referral', {
      episode_title: episodeTitle,
      podcast_platform: platform,
      guest_name: guestName,
      landing_page: window.location.pathname
    });

    posthog.capture('podcast_referral', {
      episode_title: episodeTitle,
      platform,
      guest_name: guestName,
      referral_context: this.getPodcastContext()
    });

    // Set podcast visitor flag
    localStorage.setItem('podcast_visitor', 'true');
    localStorage.setItem('podcast_episode', episodeTitle);
  }

  // Activation Tracking Methods
  trackCTAClick(ctaId, ctaText, destination, category = 'primary') {
    const activationData = {
      cta_id: ctaId,
      cta_text: ctaText,
      destination: destination,
      category: category,
      page_location: window.location.href,
      scroll_depth: this.getCurrentScrollDepth(),
      time_on_page: Date.now() - this.sessionData.startTime
    };

    gtag('event', 'cta_click', activationData);

    posthog.capture('cta_clicked', {
      ...activationData,
      user_segment: this.sessionData.userSegment,
      session_depth: this.sessionData.pageViews
    });

    // Update activation score
    this.updateActivationScore('cta_click', ctaId, 5);
  }

  trackDemoStart(demoType, demoContext = {}) {
    const demoData = {
      demo_type: demoType,
      demo_context: JSON.stringify(demoContext),
      user_segment: this.sessionData.userSegment,
      traffic_source: this.getTrafficSource(),
      session_depth: this.sessionData.pageViews
    };

    gtag('event', 'demo_started', demoData);

    posthog.capture('demo_started', {
      demo_type: demoType,
      demo_context: demoContext,
      start_time: Date.now(),
      user_properties: this.getUserProperties()
    });

    this.updateActivationScore('demo_started', demoType, 15);

    return new DemoTracker(demoType, demoContext);
  }

  trackQuizStart(quizType, questionCount) {
    gtag('event', 'quiz_started', {
      quiz_type: quizType,
      question_count: questionCount,
      user_segment: this.sessionData.userSegment,
      learning_goal: this.getLearningGoal()
    });

    posthog.capture('quiz_started', {
      quiz_type: quizType,
      question_count: questionCount,
      start_time: Date.now()
    });

    this.updateActivationScore('quiz_started', quizType, 10);

    return new QuizTracker(quizType, questionCount);
  }

  // Conversion Tracking Methods
  trackConsultationBooking(serviceType, bookingData) {
    const conversionValue = this.getConsultationValue(serviceType);

    // GA4 conversion tracking
    gtag('event', 'purchase', {
      transaction_id: bookingData.bookingId,
      value: conversionValue,
      currency: 'USD',
      items: [{
        item_id: `consultation_${serviceType}`,
        item_name: `${serviceType} Consultation`,
        category: 'consultation',
        quantity: 1,
        price: conversionValue
      }]
    });

    // PostHog conversion tracking
    posthog.capture('consultation_booked', {
      service_type: serviceType,
      booking_value: conversionValue,
      booking_data: bookingData,
      attribution_source: this.getAttributionSource()
    });

    this.updateActivationScore('consultation_booked', serviceType, 100);
  }

  trackPurchase(productData, transactionData) {
    // GA4 enhanced ecommerce
    gtag('event', 'purchase', {
      transaction_id: transactionData.id,
      value: transactionData.total,
      currency: 'USD',
      items: transactionData.items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        category: item.category,
        quantity: item.quantity || 1,
        price: item.price
      }))
    });

    // PostHog revenue tracking
    posthog.capture('purchase_completed', {
      transaction_id: transactionData.id,
      revenue: transactionData.total,
      products: transactionData.items,
      payment_method: transactionData.paymentMethod,
      user_ltv: this.calculateUserLTV()
    });

    this.updateActivationScore('purchase_completed', productData.category, 200);
    this.updateUserSegment('paying_customer');
  }

  trackCourseEnrollment(courseType, enrollmentData) {
    gtag('event', 'course_enrolled', {
      course_type: courseType,
      enrollment_value: enrollmentData.value,
      cohort_date: enrollmentData.cohortDate,
      enrollment_source: this.getTrafficSource()
    });

    posthog.capture('course_enrolled', {
      course_type: courseType,
      enrollment_data: enrollmentData,
      user_properties: this.getUserProperties()
    });

    this.updateActivationScore('course_enrolled', courseType, 150);
    this.updateUserSegment('training_student');
  }

  // Engagement Tracking Methods
  trackChatbotInteraction(interactionType, interactionData) {
    gtag('event', 'chatbot_interaction', {
      interaction_type: interactionType,
      conversation_id: interactionData.conversationId,
      message_count: interactionData.messageCount || 1,
      session_duration: Date.now() - this.sessionData.startTime
    });

    posthog.capture('chatbot_interaction', {
      interaction_type: interactionType,
      interaction_data: interactionData,
      user_engagement_level: this.calculateEngagementLevel()
    });

    if (interactionType === 'helpful_vote') {
      this.updateActivationScore('chatbot_helpful', 'positive', 10);
    }
  }

  trackDocumentationEngagement(engagementType, engagementData) {
    gtag('event', 'documentation_engagement', {
      engagement_type: engagementType,
      content_category: this.getContentCategory(),
      reading_time: engagementData.readingTime || 0,
      scroll_depth: engagementData.scrollDepth || 0
    });

    posthog.capture('documentation_engagement', {
      engagement_type: engagementType,
      engagement_data: engagementData,
      content_quality_score: this.calculateContentQuality(engagementData)
    });

    if (engagementType === 'code_copied') {
      this.updateActivationScore('doc_code_copied', engagementData.language, 20);
    }
  }

  trackReturnVisit() {
    const visitorData = this.getVisitorData();
    const daysSinceLastVisit = this.calculateDaysSinceLastVisit();

    gtag('event', 'return_visit', {
      visit_number: visitorData.visitCount,
      days_since_last_visit: daysSinceLastVisit,
      visitor_segment: this.sessionData.userSegment,
      engagement_progression: this.calculateEngagementProgression()
    });

    posthog.capture('return_visit', {
      visit_number: visitorData.visitCount,
      days_since_last_visit: daysSinceLastVisit,
      retention_quality: this.calculateRetentionQuality(),
      user_properties: this.getUserProperties()
    });
  }

  // Automatic tracking implementations
  setupCTATracking() {
    document.addEventListener('click', (event) => {
      const ctaElement = event.target.closest('[data-cta]');
      if (ctaElement) {
        const ctaData = JSON.parse(ctaElement.getAttribute('data-cta'));
        this.trackCTAClick(ctaData.id, ctaData.text, ctaData.destination, ctaData.category);
      }
    });
  }

  setupFormTracking() {
    document.addEventListener('submit', (event) => {
      const form = event.target;
      if (form.tagName === 'FORM') {
        const formId = form.id || form.className;
        const formType = form.getAttribute('data-form-type') || 'unknown';

        gtag('event', 'form_submit', {
          form_id: formId,
          form_type: formType,
          page_location: window.location.href
        });

        posthog.capture('form_submitted', {
          form_id: formId,
          form_type: formType,
          user_segment: this.sessionData.userSegment
        });
      }
    });
  }

  setupScrollTracking() {
    let maxScroll = 0;
    let scrollTimeout;

    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollPercent = Math.round(
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        );

        if (scrollPercent > maxScroll) {
          maxScroll = scrollPercent;

          // Track milestone scrolls
          if (maxScroll % 25 === 0 && maxScroll > 0) {
            gtag('event', 'scroll_milestone', {
              scroll_depth: maxScroll,
              content_category: this.getContentCategory(),
              time_to_depth: Date.now() - this.sessionData.startTime
            });
          }
        }
      }, 250);
    });
  }

  setupTimeTracking() {
    // Track time milestones
    const timeCheckpoints = [30, 60, 120, 300, 600]; // seconds

    timeCheckpoints.forEach(checkpoint => {
      setTimeout(() => {
        if (!document.hidden) {
          gtag('event', 'time_on_page', {
            time_checkpoint: checkpoint,
            page_type: this.getPageType(),
            engagement_quality: this.calculateEngagementQuality()
          });
        }
      }, checkpoint * 1000);
    });
  }

  setupExternalLinkTracking() {
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (link && link.hostname && link.hostname !== window.location.hostname) {
        gtag('event', 'external_link_click', {
          link_url: link.href,
          link_text: link.textContent.substring(0, 100),
          page_location: window.location.href
        });

        posthog.capture('external_link_clicked', {
          link_url: link.href,
          link_context: this.getLinkContext(link)
        });
      }
    });
  }

  // Helper methods
  updateActivationScore(action, context, points) {
    this.sessionData.activationScore += points;
    localStorage.setItem('fhir_activation_score', this.sessionData.activationScore.toString());

    // Send activation update to backend
    this.sendActivationUpdate(action, context, points);
  }

  sendActivationUpdate(action, context, points) {
    // Call Wix backend to update activation profile
    import('wix-backend').then(backend => {
      backend.analyticsService.trackActivation({
        activationType: action,
        activationContext: { context, points },
        userProperties: this.getUserProperties(),
        performanceData: this.getPerformanceData()
      });
    });
  }

  getUserProperties() {
    return {
      userId: this.getUserId(),
      segment: this.sessionData.userSegment,
      activationScore: this.sessionData.activationScore,
      sessionDepth: this.sessionData.pageViews,
      trafficSource: this.getTrafficSource()
    };
  }

  getPerformanceData() {
    return {
      sessionDuration: Date.now() - this.sessionData.startTime,
      pageViews: this.sessionData.pageViews,
      interactions: this.sessionData.interactions.length,
      scrollDepth: this.getCurrentScrollDepth()
    };
  }

  // Utility methods
  getUserId() {
    let userId = localStorage.getItem('fhir_user_id');
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substr(2, 9) + Date.now();
      localStorage.setItem('fhir_user_id', userId);
    }
    return userId;
  }

  getUserSegment() {
    // Determine user segment based on behavior and attributes
    const storedSegment = localStorage.getItem('fhir_user_segment');
    if (storedSegment) return storedSegment;

    // Default segmentation logic
    if (this.isPodcastVisitor()) return 'podcast_audience';
    if (this.isLinkedInTraffic()) return 'linkedin_professional';
    if (this.isOrganicSearch()) return 'organic_searcher';

    return 'new_visitor';
  }

  getStoredActivationScore() {
    return parseInt(localStorage.getItem('fhir_activation_score') || '0');
  }

  trackPageView() {
    this.sessionData.pageViews++;

    gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_type: this.getPageType(),
      content_category: this.getContentCategory(),
      user_segment: this.sessionData.userSegment
    });

    posthog.capture('page_viewed', {
      page_title: document.title,
      page_location: window.location.href,
      page_type: this.getPageType(),
      visit_number: this.sessionData.pageViews
    });
  }

  getPageType() {
    const path = window.location.pathname;
    if (path === '/') return 'homepage';
    if (path.startsWith('/solutions')) return 'solutions';
    if (path.startsWith('/tools')) return 'tools';
    if (path.startsWith('/training')) return 'training';
    if (path.startsWith('/blog')) return 'blog';
    if (path.startsWith('/podcast')) return 'podcast';
    if (path.startsWith('/book')) return 'booking';
    return 'other';
  }

  getContentCategory() {
    const path = window.location.pathname;
    if (path.includes('implementation')) return 'implementation';
    if (path.includes('smart')) return 'smart_on_fhir';
    if (path.includes('ai')) return 'ai_tools';
    if (path.includes('training')) return 'education';
    return 'general';
  }

  getTrafficSource() {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');

    if (utmSource) return utmSource;
    if (document.referrer.includes('linkedin.com')) return 'linkedin';
    if (document.referrer.includes('google.com')) return 'google';
    if (document.referrer.includes('podcast')) return 'podcast';

    return 'direct';
  }

  getCurrentScrollDepth() {
    return Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    );
  }
}

// Demo tracking class
class DemoTracker {
  constructor(demoType, context) {
    this.demoType = demoType;
    this.context = context;
    this.startTime = Date.now();
    this.stepCount = 0;
    this.interactions = [];
  }

  trackStep(stepName, stepData = {}) {
    this.stepCount++;
    const stepDuration = Date.now() - this.startTime;

    gtag('event', 'demo_step_completed', {
      demo_type: this.demoType,
      step_name: stepName,
      step_number: this.stepCount,
      step_duration: stepDuration
    });

    this.interactions.push({
      step: stepName,
      duration: stepDuration,
      data: stepData
    });
  }

  trackCompletion(outcome) {
    const totalDuration = Date.now() - this.startTime;

    gtag('event', 'demo_completed', {
      demo_type: this.demoType,
      completion_outcome: outcome,
      total_duration: totalDuration,
      steps_completed: this.stepCount
    });

    // High activation score for completion
    window.fhirAnalytics.updateActivationScore('demo_completed', this.demoType, 50);
  }
}

// Quiz tracking class
class QuizTracker {
  constructor(quizType, questionCount) {
    this.quizType = quizType;
    this.questionCount = questionCount;
    this.startTime = Date.now();
    this.answers = [];
    this.currentQuestion = 0;
  }

  trackAnswer(questionId, answer, isCorrect, timeSpent) {
    this.currentQuestion++;

    gtag('event', 'quiz_question_answered', {
      quiz_type: this.quizType,
      question_id: questionId,
      question_number: this.currentQuestion,
      is_correct: isCorrect,
      time_spent: timeSpent
    });

    this.answers.push({
      questionId,
      answer,
      isCorrect,
      timeSpent
    });
  }

  trackCompletion() {
    const totalDuration = Date.now() - this.startTime;
    const correctAnswers = this.answers.filter(a => a.isCorrect).length;
    const score = Math.round((correctAnswers / this.questionCount) * 100);

    gtag('event', 'quiz_completed', {
      quiz_type: this.quizType,
      final_score: score,
      correct_answers: correctAnswers,
      total_duration: totalDuration
    });

    // Significant activation score for quiz completion
    window.fhirAnalytics.updateActivationScore('quiz_completed', this.quizType, score >= 70 ? 75 : 50);
  }
}

// Initialize analytics when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  window.fhirAnalytics = new FHIRIQAnalytics();
});

// Export for use in other components
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FHIRIQAnalytics, DemoTracker, QuizTracker };
}