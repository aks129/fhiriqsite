# Wix Commerce Integration Specification

## Purpose
Implement e-commerce functionality for FHIR IQ's digital products, training courses, and consulting services using Wix Stores with Stripe payment processing.

## Product Catalog

### Digital Products

#### 1. FHIR Builder AI Subscriptions
```javascript
const FHIR_BUILDER_PRODUCTS = [
  {
    name: "FHIR Builder AI - Pro",
    sku: "FHIR-BUILDER-PRO-MONTHLY",
    type: "subscription",
    interval: "monthly",
    price: 49.00,
    features: [
      "Unlimited app generations",
      "Advanced templates",
      "Priority support",
      "One-click deployment",
      "Custom branding"
    ],
    freeTrialDays: 14
  },
  {
    name: "FHIR Builder AI - Enterprise",
    sku: "FHIR-BUILDER-ENT-MONTHLY",
    type: "subscription",
    interval: "monthly",
    price: 199.00,
    features: [
      "Everything in Pro",
      "Custom templates",
      "White-label solutions",
      "Dedicated support",
      "On-premise deployment",
      "SLA guarantees"
    ],
    customQuoteRequired: true
  }
];
```

#### 2. Training Courses
```javascript
const TRAINING_PRODUCTS = [
  {
    name: "FHIR Fundamentals Course",
    sku: "TRAINING-FHIR-FUNDAMENTALS",
    type: "one-time",
    price: 299.00,
    includes: [
      "8-hour video course",
      "Hands-on labs",
      "Certificate of completion",
      "6 months access",
      "Course materials download"
    ],
    deliveryMethod: "online"
  },
  {
    name: "AI-Assisted FHIR Development Workshop",
    sku: "TRAINING-AI-FHIR-WORKSHOP",
    type: "one-time",
    price: 499.00,
    includes: [
      "Live 2-day workshop",
      "AI tools training",
      "Real-world projects",
      "Certificate of completion",
      "1 month follow-up support"
    ],
    deliveryMethod: "live"
  },
  {
    name: "Custom Team Training",
    sku: "TRAINING-CUSTOM-TEAM",
    type: "service",
    price: 2500.00,
    priceUnit: "per day",
    includes: [
      "Customized curriculum",
      "On-site or remote delivery",
      "Up to 20 participants",
      "Training materials",
      "Follow-up support"
    ],
    requiresConsultation: true
  }
];
```

#### 3. Consulting Services
```javascript
const CONSULTING_PRODUCTS = [
  {
    name: "FHIR Strategy Consultation",
    sku: "CONSULT-STRATEGY-HOUR",
    type: "service",
    price: 250.00,
    priceUnit: "per hour",
    minimumHours: 2,
    description: "Expert guidance on FHIR implementation strategy",
    bookingRequired: true
  },
  {
    name: "FHIR Implementation Package",
    sku: "CONSULT-IMPLEMENTATION",
    type: "service",
    price: 15000.00,
    priceType: "starting_from",
    description: "Complete FHIR implementation with AI-assisted development",
    requiresCustomQuote: true
  }
];
```

### Digital Downloads
```javascript
const DIGITAL_DOWNLOADS = [
  {
    name: "FHIR Implementation Checklist",
    sku: "DOWNLOAD-FHIR-CHECKLIST",
    type: "digital_download",
    price: 49.00,
    fileType: "PDF",
    description: "Comprehensive 50-page implementation guide"
  },
  {
    name: "FHIR Resource Templates Library",
    sku: "DOWNLOAD-TEMPLATES",
    type: "digital_download",
    price: 99.00,
    fileType: "ZIP",
    description: "Ready-to-use FHIR resource templates and examples"
  }
];
```

## Wix Stores Configuration

### Store Setup
```javascript
// Wix Stores Configuration
const STORE_CONFIG = {
  currency: "USD",
  taxCalculation: "automatic", // Based on customer location
  shippingRequired: false, // Digital products only
  inventoryTracking: false, // Services and digital products
  checkoutFlow: "express", // Streamlined for B2B
  guestCheckout: true,
  accountCreation: "optional"
};
```

### Product Collections
```javascript
// Wix CMS Collections for Products
const PRODUCT_COLLECTIONS = {
  subscriptions: {
    name: "Subscriptions",
    fields: {
      title: "Text",
      description: "Rich Text",
      price: "Number",
      features: "Multi-Reference",
      billingPeriod: "Text",
      freeTrialDays: "Number",
      stripeProductId: "Text"
    }
  },
  courses: {
    name: "Training Courses",
    fields: {
      title: "Text",
      description: "Rich Text",
      price: "Number",
      duration: "Text",
      deliveryMethod: "Text",
      includes: "Multi-Reference",
      syllabus: "Rich Text",
      instructors: "Multi-Reference"
    }
  },
  consulting: {
    name: "Consulting Services",
    fields: {
      title: "Text",
      description: "Rich Text",
      hourlyRate: "Number",
      minimumEngagement: "Text",
      deliverables: "Rich Text",
      timeline: "Text"
    }
  }
};
```

## Stripe Integration

### Payment Processing Setup
```javascript
// File: backend/stripe-integration.js
import { getSecret } from 'wix-secrets-backend';
import { fetch } from 'wix-fetch';

export async function createStripeCheckout(productData, customerData) {
  try {
    const stripeSecretKey = await getSecret('STRIPE_SECRET_KEY');

    // Create Stripe checkout session
    const checkoutSession = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: buildStripePayload(productData, customerData)
    });

    const session = await checkoutSession.json();

    return {
      success: true,
      checkoutUrl: session.url,
      sessionId: session.id
    };

  } catch (error) {
    console.error('Stripe checkout error:', error);
    return {
      success: false,
      error: 'Payment processing failed'
    };
  }
}

function buildStripePayload(productData, customerData) {
  const params = new URLSearchParams();

  // Basic session configuration
  params.append('success_url', 'https://fhiriq.com/checkout/success?session_id={CHECKOUT_SESSION_ID}');
  params.append('cancel_url', 'https://fhiriq.com/checkout/cancel');
  params.append('mode', productData.type === 'subscription' ? 'subscription' : 'payment');

  // Customer information
  if (customerData.email) {
    params.append('customer_email', customerData.email);
  }

  // Line items
  if (productData.type === 'subscription') {
    params.append('line_items[0][price]', productData.stripePriceId);
    params.append('line_items[0][quantity]', '1');

    // Free trial if applicable
    if (productData.freeTrialDays) {
      params.append('subscription_data[trial_period_days]', productData.freeTrialDays);
    }
  } else {
    params.append('line_items[0][price_data][currency]', 'usd');
    params.append('line_items[0][price_data][product_data][name]', productData.name);
    params.append('line_items[0][price_data][unit_amount]', productData.price * 100); // Stripe uses cents
    params.append('line_items[0][quantity]', '1');
  }

  return params.toString();
}
```

### Subscription Management
```javascript
// File: backend/subscription-management.js
export async function handleSubscriptionWebhook(event) {
  const eventType = event.type;

  switch (eventType) {
    case 'customer.subscription.created':
      await activateSubscription(event.data.object);
      break;

    case 'customer.subscription.updated':
      await updateSubscription(event.data.object);
      break;

    case 'customer.subscription.deleted':
      await cancelSubscription(event.data.object);
      break;

    case 'invoice.payment_succeeded':
      await recordPayment(event.data.object);
      break;

    case 'invoice.payment_failed':
      await handleFailedPayment(event.data.object);
      break;

    default:
      console.log(`Unhandled event type: ${eventType}`);
  }
}

async function activateSubscription(subscription) {
  // Update user account with subscription details
  await updateUserSubscription(subscription.customer, {
    status: 'active',
    plan: subscription.items.data[0].price.id,
    currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    stripeSubscriptionId: subscription.id
  });

  // Grant access to subscribed features
  await grantFeatureAccess(subscription.customer, subscription.items.data[0].price.id);

  // Send welcome email
  await sendSubscriptionWelcomeEmail(subscription.customer);
}
```

## Customer Account Management

### User Dashboard
```javascript
// File: pages/account-dashboard.js
$w.onReady(function () {
  loadCustomerData();
});

async function loadCustomerData() {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    // Load subscription details
    const subscriptions = await getCustomerSubscriptions(currentUser.id);
    displaySubscriptions(subscriptions);

    // Load purchase history
    const purchases = await getCustomerPurchases(currentUser.id);
    displayPurchaseHistory(purchases);

    // Load course enrollments
    const enrollments = await getCourseEnrollments(currentUser.id);
    displayCourseEnrollments(enrollments);
  }
}

function displaySubscriptions(subscriptions) {
  const subscriptionRepeater = $w('#subscriptionRepeater');

  subscriptionRepeater.data = subscriptions.map(sub => ({
    _id: sub.id,
    planName: sub.planName,
    status: sub.status,
    nextBilling: sub.currentPeriodEnd,
    amount: sub.amount,
    manageUrl: sub.manageUrl
  }));

  subscriptionRepeater.onItemReady(($item, itemData) => {
    $item('#planName').text = itemData.planName;
    $item('#status').text = itemData.status;
    $item('#nextBilling').text = formatDate(itemData.nextBilling);
    $item('#amount').text = `$${itemData.amount}/month`;

    $item('#manageButton').onClick(() => {
      // Redirect to Stripe customer portal
      window.open(itemData.manageUrl, '_blank');
    });
  });
}
```

### Course Access Management
```javascript
export async function grantCourseAccess(userId, courseId) {
  // Add course to user's enrollments
  await addCourseEnrollment(userId, courseId);

  // Send course access email with login instructions
  await sendCourseAccessEmail(userId, courseId);

  // Create calendar events for live courses
  if (await isLiveCourse(courseId)) {
    await createCalendarInvites(userId, courseId);
  }
}
```

## Checkout Flow

### Product Selection
```javascript
// File: pages/product-page.js
$w.onReady(function () {
  const productId = getProductIdFromUrl();
  loadProductDetails(productId);
});

async function loadProductDetails(productId) {
  const product = await getProductById(productId);

  // Display product information
  $w('#productTitle').text = product.name;
  $w('#productDescription').html = product.description;
  $w('#productPrice').text = formatPrice(product.price);

  // Configure purchase button
  $w('#purchaseButton').onClick(() => {
    initiatePurchase(product);
  });

  // Show subscription options if applicable
  if (product.type === 'subscription') {
    displaySubscriptionOptions(product);
  }
}

async function initiatePurchase(product) {
  // Collect customer information
  const customerData = await collectCustomerInfo();

  // Create Stripe checkout session
  const checkout = await createStripeCheckout(product, customerData);

  if (checkout.success) {
    // Redirect to Stripe checkout
    window.location.href = checkout.checkoutUrl;
  } else {
    showError('Payment processing failed. Please try again.');
  }
}
```

### Success and Fulfillment
```javascript
// File: pages/checkout-success.js
$w.onReady(function () {
  const sessionId = getUrlParameter('session_id');
  if (sessionId) {
    processSuccessfulPayment(sessionId);
  }
});

async function processSuccessfulPayment(sessionId) {
  try {
    // Verify payment with Stripe
    const session = await verifyStripeSession(sessionId);

    if (session.payment_status === 'paid') {
      // Fulfill the order
      await fulfillOrder(session);

      // Display success message
      displaySuccessMessage(session);

      // Redirect to appropriate page
      setTimeout(() => {
        redirectAfterPurchase(session.metadata.productType);
      }, 3000);
    }

  } catch (error) {
    console.error('Payment verification failed:', error);
    displayErrorMessage();
  }
}

async function fulfillOrder(session) {
  const productType = session.metadata.productType;

  switch (productType) {
    case 'subscription':
      // Subscription is handled by webhook
      break;

    case 'course':
      await grantCourseAccess(session.customer, session.metadata.courseId);
      break;

    case 'digital_download':
      await sendDownloadLink(session.customer, session.metadata.downloadId);
      break;

    case 'consulting':
      await scheduleConsultingIntake(session.customer, session.metadata.serviceId);
      break;
  }
}
```

## Lead Capture and CRM Integration

### Lead Scoring
```javascript
const LEAD_SCORING_RULES = {
  actions: {
    'newsletter_signup': 5,
    'whitepaper_download': 10,
    'course_purchase': 25,
    'consultation_booking': 50,
    'subscription_trial': 30,
    'enterprise_inquiry': 100
  },
  demographics: {
    'healthcare_industry': 20,
    'developer_role': 15,
    'decision_maker': 25,
    'company_size_large': 15
  }
};

export async function updateLeadScore(userId, action, metadata = {}) {
  const currentScore = await getLeadScore(userId);
  const actionScore = LEAD_SCORING_RULES.actions[action] || 0;

  // Calculate demographic bonus
  const demographicBonus = calculateDemographicScore(metadata);

  const newScore = currentScore + actionScore + demographicBonus;

  await updateUserScore(userId, newScore);

  // Trigger automation if score threshold reached
  if (newScore >= 75 && currentScore < 75) {
    await triggerHighValueLeadFlow(userId);
  }
}
```

### Email Automation
```javascript
// Email sequences for different customer journeys
const EMAIL_SEQUENCES = {
  trial_started: [
    { delay: 0, template: 'trial_welcome', subject: 'Welcome to FHIR Builder AI!' },
    { delay: 3, template: 'trial_tips', subject: 'Get the most from your FHIR Builder trial' },
    { delay: 7, template: 'trial_case_study', subject: 'How Company X built their FHIR app in 1 hour' },
    { delay: 12, template: 'trial_ending', subject: 'Your trial ends in 2 days - don\'t lose your progress' }
  ],
  course_purchased: [
    { delay: 0, template: 'course_access', subject: 'Your FHIR course is ready!' },
    { delay: 1, template: 'course_getting_started', subject: 'How to get started with your FHIR training' },
    { delay: 7, template: 'course_checkpoint', subject: 'How\'s your FHIR learning going?' },
    { delay: 30, template: 'course_completion', subject: 'Claim your FHIR certification' }
  ]
};
```

## Analytics and Reporting

### E-commerce Metrics
```javascript
const ECOMMERCE_ANALYTICS = {
  revenue: {
    monthly_recurring: Number,
    one_time_sales: Number,
    average_order_value: Number,
    customer_lifetime_value: Number
  },
  conversion: {
    checkout_conversion_rate: Number,
    trial_to_paid_rate: Number,
    email_to_purchase_rate: Number,
    consultation_to_sale_rate: Number
  },
  subscription: {
    churn_rate: Number,
    retention_rate: Number,
    upgrade_rate: Number,
    downgrade_rate: Number
  },
  products: {
    best_sellers: Array,
    revenue_by_product: Object,
    refund_rate: Number
  }
};
```

### Customer Segmentation
```javascript
const CUSTOMER_SEGMENTS = {
  enterprise: {
    criteria: 'company_size > 1000 OR subscription_plan = enterprise',
    marketing_approach: 'account_based',
    sales_process: 'high_touch'
  },
  mid_market: {
    criteria: 'company_size 100-1000 OR order_value > $5000',
    marketing_approach: 'targeted_campaigns',
    sales_process: 'consultative'
  },
  small_business: {
    criteria: 'company_size < 100 AND order_value < $1000',
    marketing_approach: 'self_service',
    sales_process: 'low_touch'
  },
  developers: {
    criteria: 'role = developer OR tool_usage > 5',
    marketing_approach: 'technical_content',
    sales_process: 'product_led'
  }
};
```

## Implementation Timeline

### Phase 1: Basic E-commerce (Week 1)
- Set up Wix Stores with product catalog
- Configure Stripe payment processing
- Create basic checkout flow
- Implement order fulfillment

### Phase 2: Subscriptions (Week 2)
- Set up Stripe subscription products
- Implement subscription management
- Create customer portal integration
- Build account dashboard

### Phase 3: Advanced Features (Week 3)
- Lead scoring and CRM integration
- Email automation sequences
- Advanced analytics tracking
- Customer segmentation

### Phase 4: Optimization (Week 4)
- A/B testing checkout flow
- Conversion rate optimization
- Payment failure recovery
- Customer support integration

## Acceptance Criteria

- [ ] All product types can be purchased through Wix checkout
- [ ] Stripe payment processing works for one-time and recurring payments
- [ ] Subscription management handles all lifecycle events
- [ ] Customer accounts show purchase history and active subscriptions
- [ ] Digital product fulfillment is automated
- [ ] Email notifications are sent for all purchase events
- [ ] Analytics tracking captures all e-commerce events
- [ ] Lead scoring updates based on purchase behavior
- [ ] Mobile checkout experience is optimized
- [ ] Payment security meets PCI compliance standards

## Dependencies
- Wix Stores setup and configuration
- Stripe account and API integration
- Email service provider configuration
- CRM system for lead management
- Analytics platform for e-commerce tracking