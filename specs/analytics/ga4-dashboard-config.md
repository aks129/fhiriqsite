# Google Analytics 4 Dashboard Configuration

## Dashboard Overview

This document defines the complete GA4 setup for FHIR IQ, including custom events, conversion goals, audiences, and dashboard configurations for comprehensive analytics tracking.

---

## GA4 Property Setup

### Basic Configuration
```yaml
property_settings:
  property_name: "FHIR IQ Website"
  property_id: "GA_MEASUREMENT_ID"
  industry_category: "Technology/Software"
  business_size: "Small Business"
  data_retention: "14 months"
  enhanced_measurement: true

enhanced_measurement_events:
  - page_view
  - scroll (75%, 90%)
  - outbound_link_click
  - site_search
  - video_engagement
  - file_download

custom_dimensions:
  user_scoped:
    - user_segment (text)
    - activation_score (number)
    - first_traffic_source (text)
    - cohort_week (text)

  event_scoped:
    - content_category (text)
    - tool_type (text)
    - engagement_quality (number)
    - conversion_path (text)
```

---

## Custom Events Configuration

### Acquisition Events
```yaml
acquisition_events:
  organic_search_landing:
    parameters:
      - search_keyword (text)
      - search_position (number)
      - landing_page_type (text)
      - content_category (text)

  linkedin_traffic:
    parameters:
      - campaign_type (text)
      - content_type (text)
      - user_segment (text)
      - engagement_level (text)

  podcast_referral:
    parameters:
      - episode_title (text)
      - podcast_platform (text)
      - guest_name (text)
      - landing_page (text)

  attribution_touchpoint:
    parameters:
      - touchpoint_number (number)
      - attribution_source (text)
      - customer_journey_stage (text)
      - time_since_first_visit (number)
```

### Activation Events
```yaml
activation_events:
  cta_click:
    parameters:
      - cta_id (text)
      - cta_text (text)
      - destination (text)
      - cta_category (text)
      - page_location (text)
      - scroll_depth (number)

  demo_started:
    parameters:
      - demo_type (text)
      - demo_context (text)
      - user_segment (text)
      - traffic_source (text)
      - session_depth (number)

  demo_step_completed:
    parameters:
      - demo_type (text)
      - step_name (text)
      - step_number (number)
      - step_duration (number)

  demo_completed:
    parameters:
      - demo_type (text)
      - completion_outcome (text)
      - total_duration (number)
      - steps_completed (number)
      - completion_rate (number)

  quiz_started:
    parameters:
      - quiz_type (text)
      - question_count (number)
      - user_segment (text)
      - learning_goal (text)

  quiz_question_answered:
    parameters:
      - quiz_type (text)
      - question_id (text)
      - question_number (number)
      - is_correct (boolean)
      - time_spent (number)

  quiz_completed:
    parameters:
      - quiz_type (text)
      - final_score (number)
      - correct_answers (number)
      - total_duration (number)
      - quiz_passed (boolean)

  activation_score_updated:
    parameters:
      - new_score (number)
      - action_taken (text)
      - points_added (number)
      - activation_level (text)
```

### Conversion Events
```yaml
conversion_events:
  consultation_booked:
    conversion_value: true
    parameters:
      - service_type (text)
      - booking_source (text)
      - funnel_completion_time (number)
      - booking_value (currency)

  purchase:
    conversion_value: true
    parameters:
      - transaction_id (text)
      - value (currency)
      - currency (text: "USD")
      - items (item_array)

  course_enrolled:
    conversion_value: true
    parameters:
      - course_type (text)
      - enrollment_value (currency)
      - cohort_date (text)
      - enrollment_source (text)

  newsletter_subscribed:
    parameters:
      - subscription_source (text)
      - content_category (text)
      - user_segment (text)
```

### Engagement Events
```yaml
engagement_events:
  chatbot_interaction:
    parameters:
      - interaction_type (text)
      - conversation_id (text)
      - message_count (number)
      - session_duration (number)

  chatbot_feedback:
    parameters:
      - conversation_id (text)
      - message_id (text)
      - is_helpful (boolean)
      - conversation_length (number)

  documentation_engagement:
    parameters:
      - engagement_type (text)
      - content_category (text)
      - reading_time (number)
      - scroll_depth (number)

  return_visit:
    parameters:
      - visit_number (number)
      - days_since_last_visit (number)
      - visitor_segment (text)
      - engagement_progression (number)
```

---

## Conversion Goals Setup

### Primary Conversions
```yaml
primary_conversions:
  consultation_booked:
    event_name: "consultation_booked"
    counting: "once_per_session"
    attribution_model: "data_driven"
    conversion_window: "30_days"

  purchase:
    event_name: "purchase"
    counting: "once_per_event"
    attribution_model: "data_driven"
    conversion_window: "90_days"

  course_enrolled:
    event_name: "course_enrolled"
    counting: "once_per_event"
    attribution_model: "data_driven"
    conversion_window: "60_days"

secondary_conversions:
  newsletter_subscribed:
    event_name: "newsletter_subscribed"
    counting: "once_per_session"
    attribution_model: "first_click"
    conversion_window: "7_days"

  demo_completed:
    event_name: "demo_completed"
    counting: "once_per_session"
    attribution_model: "linear"
    conversion_window: "30_days"

  quiz_completed:
    event_name: "quiz_completed"
    counting: "once_per_session"
    attribution_model: "time_decay"
    conversion_window: "14_days"
```

---

## Audience Definitions

### Behavioral Audiences
```yaml
behavioral_audiences:
  highly_activated_users:
    conditions:
      - custom_parameter.activation_score >= 75
      - events.activation_score_updated in_last_30_days

  demo_completers:
    conditions:
      - events.demo_completed in_last_60_days
      - exclude: events.purchase

  quiz_takers:
    conditions:
      - events.quiz_started in_last_30_days
      - custom_parameter.user_segment = "training_interested"

  consultation_interested:
    conditions:
      - pages_viewed: "/solutions", "/book"
      - events.cta_click where cta_category = "consultation"

traffic_source_audiences:
  organic_visitors:
    conditions:
      - traffic_source = "google"
      - medium = "organic"

  linkedin_professionals:
    conditions:
      - traffic_source = "linkedin"
      - custom_parameter.user_segment = "b2b_professional"

  podcast_audience:
    conditions:
      - traffic_source = "podcast"
      - events.podcast_referral in_last_90_days

engagement_audiences:
  return_visitors:
    conditions:
      - events.return_visit
      - session_count >= 2

  engaged_readers:
    conditions:
      - events.documentation_engagement
      - custom_parameter.engagement_quality >= 70

  tool_users:
    conditions:
      - events.demo_started
      - pages_viewed contains "/tools"
```

---

## Dashboard Configurations

### Executive Dashboard
```yaml
executive_dashboard:
  name: "FHIR IQ Executive Overview"

  widgets:
    kpi_summary:
      type: "scorecard"
      metrics:
        - total_users (monthly)
        - new_users (monthly)
        - conversions.consultation_booked (monthly)
        - revenue (monthly)
      comparison: "previous_period"

    traffic_sources:
      type: "pie_chart"
      metric: "users"
      dimension: "first_user_default_channel_grouping"
      date_range: "last_30_days"

    conversion_funnel:
      type: "funnel"
      steps:
        1: "page_view (homepage)"
        2: "cta_click"
        3: "consultation_booked"
      date_range: "last_30_days"

    revenue_attribution:
      type: "table"
      dimensions: ["source", "medium", "campaign"]
      metrics: ["conversions", "conversion_value"]
      date_range: "last_90_days"

    user_journey:
      type: "path_exploration"
      starting_point: "page_view (homepage)"
      ending_point: "consultation_booked"
      date_range: "last_30_days"
```

### Acquisition Dashboard
```yaml
acquisition_dashboard:
  name: "FHIR IQ Acquisition Performance"

  widgets:
    organic_search_performance:
      type: "table"
      dimensions: ["landing_page", "custom.search_keyword"]
      metrics: ["users", "sessions", "conversions"]
      filters: ["medium = organic"]

    linkedin_campaign_analysis:
      type: "line_chart"
      metric: "users"
      dimension: "date"
      filters: ["source = linkedin"]
      secondary_dimension: "custom.campaign_type"

    podcast_referral_tracking:
      type: "bar_chart"
      metric: "users"
      dimension: "custom.episode_title"
      filters: ["source = podcast"]
      date_range: "last_90_days"

    acquisition_costs:
      type: "table"
      dimensions: ["source", "medium"]
      metrics: ["users", "cost_per_acquisition", "return_on_ad_spend"]
      calculated_metrics:
        - cpa: "ad_cost / conversions"
        - roas: "conversion_value / ad_cost"

    channel_performance_trends:
      type: "area_chart"
      metric: "users"
      dimension: "date"
      breakdown: "default_channel_grouping"
      date_range: "last_6_months"
```

### Activation Dashboard
```yaml
activation_dashboard:
  name: "FHIR IQ User Activation"

  widgets:
    activation_score_distribution:
      type: "histogram"
      metric: "users"
      dimension: "custom.activation_score"
      bins: [0-24, 25-49, 50-74, 75-99, 100+]

    cta_performance_matrix:
      type: "table"
      dimensions: ["custom.cta_id", "custom.cta_category"]
      metrics: ["events.cta_click", "click_through_rate", "conversion_rate"]
      calculated_metrics:
        - ctr: "cta_clicks / page_views"
        - cvr: "conversions / cta_clicks"

    demo_completion_funnel:
      type: "funnel"
      steps:
        1: "demo_started"
        2: "demo_step_completed (step_number >= 3)"
        3: "demo_completed"
      breakdown: "custom.demo_type"

    quiz_engagement_analysis:
      type: "line_chart"
      metrics: ["events.quiz_started", "events.quiz_completed"]
      dimension: "date"
      secondary_dimension: "custom.quiz_type"

    activation_progression:
      type: "cohort_analysis"
      cohort_criteria: "first_visit_date"
      return_criteria: "activation_score_updated"
      cohort_size: "weekly"
```

### Conversion Dashboard
```yaml
conversion_dashboard:
  name: "FHIR IQ Conversion Analysis"

  widgets:
    conversion_overview:
      type: "scorecard"
      metrics:
        - conversions.consultation_booked
        - conversions.purchase
        - conversions.course_enrolled
        - total_conversion_value

    booking_funnel_analysis:
      type: "funnel"
      steps:
        1: "page_view (/solutions)"
        2: "cta_click (consultation)"
        3: "page_view (/book)"
        4: "consultation_booked"
      breakdown: "custom.service_type"

    purchase_attribution:
      type: "attribution_model_comparison"
      conversion_event: "purchase"
      models: ["first_click", "last_click", "linear", "time_decay", "data_driven"]
      dimensions: ["source", "medium"]

    customer_lifetime_value:
      type: "cohort_analysis"
      cohort_criteria: "first_purchase_date"
      value_criteria: "purchase_revenue"
      time_periods: [30, 60, 90, 180, 365]

    conversion_path_analysis:
      type: "multi_channel_funnels"
      conversion_event: "consultation_booked"
      lookback_window: "30_days"
      interaction_types: ["paid_search", "organic", "social", "referral", "direct"]
```

### Engagement Dashboard
```yaml
engagement_dashboard:
  name: "FHIR IQ User Engagement"

  widgets:
    chatbot_satisfaction_trends:
      type: "line_chart"
      metrics: ["chatbot_helpful_rate", "average_conversation_length"]
      dimension: "date"
      calculated_metrics:
        - helpful_rate: "helpful_votes / total_votes"

    documentation_usage_patterns:
      type: "table"
      dimensions: ["page_title", "custom.content_category"]
      metrics: ["average_engagement_time", "scroll_depth", "bounce_rate"]
      filters: ["page_location contains '/docs'"]

    return_visitor_behavior:
      type: "cohort_analysis"
      cohort_criteria: "first_visit_date"
      return_criteria: "return_visit"
      retention_periods: [1, 7, 14, 30, 90]

    engagement_quality_scoring:
      type: "scatter_plot"
      x_axis: "session_duration"
      y_axis: "custom.engagement_quality"
      size: "page_views"
      color: "custom.user_segment"

    content_performance_matrix:
      type: "table"
      dimensions: ["page_title", "custom.content_category"]
      metrics: ["views", "average_engagement_time", "conversion_rate"]
      filters: ["page_location not_contains '/admin'"]
```

---

## Advanced Analytics Setup

### Enhanced E-commerce Configuration
```yaml
ecommerce_setup:
  currency: "USD"

  item_parameters:
    item_id: "required"
    item_name: "required"
    category: "required"
    quantity: "optional"
    price: "required"
    item_brand: "FHIR IQ"
    item_variant: "optional"

  purchase_events:
    purchase: "completed_transaction"
    add_to_cart: "item_added_to_cart"
    remove_from_cart: "item_removed_from_cart"
    begin_checkout: "checkout_initiated"
    add_payment_info: "payment_info_added"

  custom_item_parameters:
    tool_type: "text"
    subscription_tier: "text"
    course_difficulty: "text"
    service_category: "text"
```

### Attribution Modeling
```yaml
attribution_setup:
  default_model: "data_driven"

  conversion_windows:
    consultation_booked: "30_days"
    purchase: "90_days"
    course_enrolled: "60_days"
    newsletter_subscribed: "7_days"

  attribution_dimensions:
    - source
    - medium
    - campaign
    - content
    - term

  custom_attribution_events:
    - touchpoint_added
    - journey_milestone_reached
    - conversion_path_completed
```

### Data Import Configuration
```yaml
data_imports:
  cost_data:
    source: "marketing_platforms"
    frequency: "daily"
    dimensions: ["source", "medium", "campaign"]
    metrics: ["cost", "impressions", "clicks"]

  crm_data:
    source: "salesforce_hubspot"
    frequency: "daily"
    dimensions: ["customer_id", "deal_stage", "deal_value"]
    join_key: "client_id"

  email_marketing:
    source: "mailchimp_convertkit"
    frequency: "daily"
    dimensions: ["campaign_name", "list_segment"]
    metrics: ["opens", "clicks", "unsubscribes"]
```

---

## Reporting Automation

### Automated Reports
```yaml
scheduled_reports:
  weekly_executive_summary:
    recipients: ["eugene@fhiriq.com", "team@fhiriq.com"]
    schedule: "monday_9am_utc"
    template: "executive_dashboard"
    format: "pdf"

  monthly_performance_review:
    recipients: ["stakeholders@fhiriq.com"]
    schedule: "first_monday_month"
    template: "comprehensive_analysis"
    format: "pdf_and_email"

  real_time_alerts:
    traffic_spike:
      condition: "users > 150% of daily_average"
      notification: "email_and_slack"

    conversion_drop:
      condition: "conversion_rate < 75% of weekly_average"
      notification: "email_immediate"

    goal_achievement:
      condition: "monthly_conversions >= target"
      notification: "celebration_email"
```

### Custom Calculated Metrics
```yaml
calculated_metrics:
  activation_rate:
    formula: "users_with_activation_score_75+ / total_users"
    format: "percentage"

  customer_acquisition_cost:
    formula: "total_marketing_cost / new_customers"
    format: "currency"

  average_deal_size:
    formula: "total_revenue / total_conversions"
    format: "currency"

  content_engagement_score:
    formula: "(time_on_page * scroll_depth * interactions) / 1000"
    format: "number"

  user_lifetime_value:
    formula: "average_deal_size * repeat_purchase_rate * customer_lifespan"
    format: "currency"
```

This GA4 configuration provides comprehensive tracking and analysis capabilities for all aspects of the FHIR IQ business, from acquisition through conversion and ongoing engagement.