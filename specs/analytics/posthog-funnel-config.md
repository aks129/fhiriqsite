# PostHog Funnel Analysis Configuration

## PostHog Setup Overview

PostHog provides advanced product analytics, funnel analysis, session recordings, and cohort analysis to complement GA4 data and provide deeper insights into user behavior patterns.

---

## PostHog Project Configuration

### Basic Setup
```yaml
project_settings:
  project_name: "FHIR IQ Product Analytics"
  project_id: "fhir-iq-prod"
  data_retention: "12_months"
  session_recording: true
  heatmaps: true
  feature_flags: true

data_capture_settings:
  autocapture: false  # Manual event tracking for precision
  capture_pageview: true
  capture_pageleave: true
  mask_all_text: false
  mask_all_inputs: true  # Privacy protection
  session_recording_sample_rate: 0.1  # 10% of sessions
```

### Person Properties
```yaml
person_properties:
  identification:
    - user_id (text)
    - email (text, hashed)
    - user_segment (text)

  acquisition:
    - first_visit_date (datetime)
    - original_traffic_source (text)
    - utm_source_first (text)
    - utm_medium_first (text)
    - utm_campaign_first (text)

  behavioral:
    - activation_score (number)
    - total_sessions (number)
    - total_page_views (number)
    - conversion_events_count (number)

  business:
    - customer_type (text)
    - ltv_bucket (text)
    - subscription_tier (text)
    - industry (text)
```

---

## Core Funnels Configuration

### 1. Consultation Booking Funnel
```yaml
consultation_funnel:
  name: "Consultation Booking Journey"
  description: "Track users from homepage to booked consultation"

  steps:
    step_1:
      event: "page_viewed"
      filters:
        - property: "pathname"
          operator: "equals"
          value: "/"

    step_2:
      event: "page_viewed"
      filters:
        - property: "pathname"
          operator: "contains"
          value: "/solutions"

    step_3:
      event: "cta_clicked"
      filters:
        - property: "cta_category"
          operator: "equals"
          value: "consultation"

    step_4:
      event: "page_viewed"
      filters:
        - property: "pathname"
          operator: "equals"
          value: "/book"

    step_5:
      event: "consultation_booked"

  conversion_window: "30_days"

  breakdown_properties:
    - "user_segment"
    - "traffic_source"
    - "device_type"

  exclusion_events:
    - "consultation_booked" (in previous sessions)
```

### 2. Tool Trial Funnel
```yaml
tool_trial_funnel:
  name: "Tool Trial to Subscription"
  description: "Track users from tool discovery to paid subscription"

  steps:
    step_1:
      event: "page_viewed"
      filters:
        - property: "pathname"
          operator: "contains"
          value: "/tools"

    step_2:
      event: "page_viewed"
      filters:
        - property: "pathname"
          operator: "regex"
          value: "^/tools/[^/]+$"  # Individual tool pages

    step_3:
      event: "demo_started"

    step_4:
      event: "demo_completed"
      filters:
        - property: "completion_outcome"
          operator: "equals"
          value: "success"

    step_5:
      event: "cta_clicked"
      filters:
        - property: "cta_text"
          operator: "contains"
          value: "trial"

    step_6:
      event: "purchase_completed"
      filters:
        - property: "product_category"
          operator: "equals"
          value: "tool_subscription"

  conversion_window: "60_days"

  breakdown_properties:
    - "tool_type"
    - "demo_type"
    - "user_segment"
```

### 3. Training Enrollment Funnel
```yaml
training_funnel:
  name: "Training Discovery to Enrollment"
  description: "Track learning journey from content to course purchase"

  steps:
    step_1:
      event: "page_viewed"
      filters:
        - property: "pathname"
          operator: "contains"
          value: "/training"

    step_2:
      event: "curriculum_explored"

    step_3:
      event: "quiz_started"

    step_4:
      event: "quiz_completed"
      filters:
        - property: "quiz_passed"
          operator: "equals"
          value: true

    step_5:
      event: "pricing_viewed"

    step_6:
      event: "enrollment_started"

    step_7:
      event: "course_enrolled"

  conversion_window: "45_days"

  breakdown_properties:
    - "course_type"
    - "quiz_type"
    - "pricing_tier"
```

### 4. Content Engagement Funnel
```yaml
content_engagement_funnel:
  name: "Content to Lead Generation"
  description: "Track content consumption to newsletter signup"

  steps:
    step_1:
      event: "page_viewed"
      filters:
        - property: "page_type"
          operator: "in"
          value: ["blog", "podcast", "case_study"]

    step_2:
      event: "content_engagement"
      filters:
        - property: "engagement_quality"
          operator: "greater_than"
          value: 60

    step_3:
      event: "newsletter_signup_viewed"

    step_4:
      event: "newsletter_subscribed"

  conversion_window: "7_days"

  breakdown_properties:
    - "content_category"
    - "traffic_source"
    - "content_type"
```

---

## Cohort Analysis Configuration

### User Cohorts by Acquisition
```yaml
acquisition_cohorts:
  organic_search_cohort:
    definition:
      - performed_event: "acquisition_tracked"
      - property_filters:
          - property: "source"
            value: "google"
          - property: "medium"
            value: "organic"

  linkedin_cohort:
    definition:
      - performed_event: "linkedin_traffic"
      - date_range: "last_90_days"

  podcast_cohort:
    definition:
      - performed_event: "podcast_referral"
      - date_range: "last_90_days"

  returning_visitor_cohort:
    definition:
      - performed_event: "return_visit"
      - property_filters:
          - property: "visit_number"
            operator: "greater_than"
            value: 1
```

### Behavioral Cohorts
```yaml
behavioral_cohorts:
  highly_activated_users:
    definition:
      - has_property:
          - property: "activation_score"
            operator: "greater_than_or_equal"
            value: 75

  demo_completers:
    definition:
      - performed_event: "demo_completed"
      - date_range: "last_60_days"
      - did_not_perform_event: "purchase_completed"

  content_consumers:
    definition:
      - performed_event: "documentation_engagement"
      - property_filters:
          - property: "reading_time"
            operator: "greater_than"
            value: 180000  # 3 minutes

  quiz_enthusiasts:
    definition:
      - performed_event: "quiz_completed"
      - property_filters:
          - property: "quiz_passed"
            value: true
```

### Revenue Cohorts
```yaml
revenue_cohorts:
  paying_customers:
    definition:
      - performed_event: "purchase_completed"
      - date_range: "all_time"

  consultation_bookers:
    definition:
      - performed_event: "consultation_booked"
      - date_range: "last_180_days"

  training_students:
    definition:
      - performed_event: "course_enrolled"
      - date_range: "all_time"

  high_value_customers:
    definition:
      - performed_event: "purchase_completed"
      - property_filters:
          - property: "purchase_value"
            operator: "greater_than"
            value: 1000
```

---

## Retention Analysis Setup

### User Retention Metrics
```yaml
retention_analysis:
  weekly_retention:
    cohort_period: "weekly"
    return_event: "page_viewed"
    retention_periods: [1, 2, 4, 8, 12, 24]  # weeks

  feature_retention:
    ai_builder_retention:
      initial_event: "demo_started"
      initial_filters:
        - property: "demo_type"
          value: "ai_app_builder"
      return_event: "demo_started"
      return_filters:
        - property: "demo_type"
          value: "ai_app_builder"

    chatbot_retention:
      initial_event: "chatbot_interaction"
      return_event: "chatbot_interaction"
      retention_periods: [1, 3, 7, 14, 30]  # days

  content_retention:
    blog_reader_retention:
      initial_event: "page_viewed"
      initial_filters:
        - property: "page_type"
          value: "blog"
      return_event: "page_viewed"
      return_filters:
        - property: "page_type"
          value: "blog"
```

---

## Session Analysis Configuration

### Session Recording Rules
```yaml
session_recording:
  sample_rate: 0.1  # 10% of all sessions

  priority_recording_conditions:
    high_value_users:
      - has_property:
          property: "activation_score"
          operator: "greater_than"
          value: 75
      - sample_rate: 0.5  # 50% of high-value users

    conversion_sessions:
      - performed_event: "consultation_booked"
      - sample_rate: 1.0  # 100% of conversion sessions

    error_sessions:
      - performed_event: "javascript_error"
      - sample_rate: 0.8  # 80% of error sessions

  masking_rules:
    - selector: "input[type='email']"
      mask_type: "text"
    - selector: "input[type='password']"
      mask_type: "text"
    - selector: ".sensitive-data"
      mask_type: "block"
```

### Heatmap Configuration
```yaml
heatmaps:
  enabled_pages:
    - path: "/"
      name: "Homepage"
    - path: "/solutions"
      name: "Solutions Page"
    - path: "/tools/*"
      name: "Tool Pages"
    - path: "/training"
      name: "Training Page"
    - path: "/book"
      name: "Booking Page"

  heatmap_types:
    - "click"
    - "move"
    - "scroll"

  minimum_sample_size: 100
  update_frequency: "daily"
```

---

## Feature Flags & A/B Testing

### A/B Test Configuration
```yaml
feature_flags:
  homepage_cta_test:
    name: "Homepage CTA Button Color"
    variants:
      control:
        rollout_percentage: 50
        description: "Blue CTA button (current)"

      variant_a:
        rollout_percentage: 50
        description: "Teal CTA button (new)"

    targeting:
      - property: "user_segment"
        operator: "not_equals"
        value: "existing_customer"

    success_metrics:
      primary: "cta_clicked"
      secondary: ["consultation_booked", "demo_started"]

  pricing_page_layout:
    name: "Pricing Table Layout Test"
    variants:
      control:
        rollout_percentage: 33.33
        description: "Current 3-column layout"

      variant_a:
        rollout_percentage: 33.33
        description: "Feature comparison table"

      variant_b:
        rollout_percentage: 33.34
        description: "Tiered pricing cards"

    targeting:
      - property: "page_viewed"
        operator: "contains"
        value: "/pricing"

    success_metrics:
      primary: "purchase_completed"
      secondary: ["pricing_viewed", "demo_started"]
```

---

## Custom Insights & Analysis

### User Journey Analysis
```yaml
journey_analysis:
  path_analysis:
    consultation_paths:
      start_event: "page_viewed"
      start_filters:
        - property: "pathname"
          value: "/"
      end_event: "consultation_booked"
      max_steps: 10

    tool_discovery_paths:
      start_event: "organic_search_landing"
      end_event: "demo_started"
      breakdown: "search_keyword"

  correlation_analysis:
    activation_correlations:
      target_event: "activation_score_updated"
      correlation_events:
        - "cta_clicked"
        - "demo_started"
        - "quiz_completed"
        - "documentation_engagement"

    conversion_correlations:
      target_event: "consultation_booked"
      correlation_events:
        - "case_study_viewed"
        - "pricing_viewed"
        - "testimonial_read"
```

### Performance Insights
```yaml
performance_insights:
  page_performance:
    tracked_pages:
      - "/"
      - "/solutions"
      - "/tools/*"
      - "/training"
      - "/book"

    metrics:
      - "page_load_time"
      - "first_contentful_paint"
      - "largest_contentful_paint"
      - "cumulative_layout_shift"

  user_experience_metrics:
    engagement_quality:
      calculation: "(scroll_depth * time_on_page * interactions) / 1000"
      segments: ["high", "medium", "low"]

    frustration_signals:
      rage_clicks:
        definition: "more than 3 clicks in 1 second"
        threshold: "10+ per session"

      dead_clicks:
        definition: "clicks with no response"
        threshold: "5+ per session"
```

---

## Integration with Other Tools

### GA4 Data Sync
```yaml
ga4_integration:
  shared_events:
    - "page_viewed"
    - "cta_clicked"
    - "consultation_booked"
    - "purchase_completed"

  unique_posthog_events:
    - "session_recorded"
    - "heatmap_generated"
    - "feature_flag_evaluated"
    - "correlation_identified"

  data_validation:
    - event_count_variance: "< 5%"
    - user_count_variance: "< 3%"
    - conversion_rate_variance: "< 2%"
```

### CRM Integration
```yaml
crm_sync:
  hubspot_integration:
    sync_frequency: "daily"

    person_properties:
      - "activation_score"
      - "user_segment"
      - "feature_usage_score"
      - "engagement_quality"

    event_triggers:
      - event: "consultation_booked"
        action: "create_lead"
      - event: "purchase_completed"
        action: "create_deal"
      - event: "course_enrolled"
        action: "add_to_nurture_sequence"
```

---

## Reporting & Alerts

### Automated Insights
```yaml
automated_insights:
  weekly_cohort_report:
    schedule: "monday_10am"
    recipients: ["analytics@fhiriq.com"]
    content:
      - "retention_trends"
      - "conversion_funnel_performance"
      - "feature_adoption_rates"

  conversion_anomaly_detection:
    monitoring:
      - metric: "consultation_booking_rate"
        threshold: "20% decrease"
      - metric: "demo_completion_rate"
        threshold: "15% decrease"

    alert_channels:
      - "email"
      - "slack"

  user_behavior_insights:
    frequency: "weekly"
    analysis_types:
      - "new_user_onboarding_patterns"
      - "feature_adoption_trends"
      - "conversion_path_optimization"
```

### Custom Dashboards
```yaml
posthog_dashboards:
  product_overview:
    widgets:
      - "active_users_trend"
      - "feature_usage_matrix"
      - "conversion_funnel_summary"
      - "user_journey_insights"

  acquisition_analysis:
    widgets:
      - "traffic_source_breakdown"
      - "cohort_performance_comparison"
      - "attribution_analysis"
      - "campaign_effectiveness"

  engagement_deep_dive:
    widgets:
      - "session_quality_distribution"
      - "content_engagement_heatmap"
      - "user_flow_analysis"
      - "retention_cohort_table"
```

This PostHog configuration provides comprehensive product analytics capabilities that complement the GA4 setup, offering deeper insights into user behavior, product usage patterns, and optimization opportunities.