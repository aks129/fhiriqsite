# CMS Data Model Specification - Wix Collections

## Purpose
Define the complete data model for FHIR IQ's Wix CMS collections, ensuring structured content management, dynamic page generation, and seamless integration with the platform's AI tools and e-commerce functionality.

## Collection Architecture Overview

### Data Relationships
```
Primary Collections:
├── Tools (Core AI/FHIR development tools)
├── Products (E-commerce training and services)
├── Courses (Educational content with scheduling)
├── QuizItems (Interactive learning assessments)
├── BlogPosts (SEO-driven content, externally synced)
├── PodcastEpisodes (Thought leadership content)
├── Partners (Integration and service providers)
└── Testimonials (Social proof and case studies)

Supporting Collections:
├── Categories (Content taxonomy)
├── Tags (Cross-collection labeling)
├── Authors (Content attribution)
├── MediaAssets (Centralized media management)
└── LeadMagnets (Conversion-focused content)
```

## Core Collection Definitions

### 1. Tools Collection
```javascript
const ToolsSchema = {
  // Identity
  slug: {
    type: 'text',
    required: true,
    unique: true,
    maxLength: 100,
    pattern: '^[a-z0-9-]+$',
    description: 'URL-friendly identifier for SEO and routing'
  },

  name: {
    type: 'text',
    required: true,
    maxLength: 150,
    description: 'Display name of the tool'
  },

  summary: {
    type: 'richText',
    required: true,
    maxLength: 500,
    description: 'Brief description for cards and listings'
  },

  // Detailed Information
  description: {
    type: 'richText',
    required: true,
    description: 'Full description with formatting'
  },

  features: {
    type: 'multiReference',
    collection: 'ToolFeatures',
    description: 'List of key features and capabilities'
  },

  // Visual Assets
  logoImage: {
    type: 'image',
    required: true,
    description: 'Tool logo/icon for listings'
  },

  screenshots: {
    type: 'gallery',
    description: 'Interface screenshots and demos'
  },

  heroImage: {
    type: 'image',
    description: 'Large banner image for tool detail page'
  },

  // External Links
  docsURL: {
    type: 'url',
    description: 'Link to documentation'
  },

  demoLink: {
    type: 'url',
    description: 'Live demo or sandbox link'
  },

  githubRepo: {
    type: 'url',
    pattern: '^https://github.com/',
    description: 'GitHub repository if open source'
  },

  // Pricing and Business Model
  pricingTiers: {
    type: 'multiReference',
    collection: 'PricingTiers',
    description: 'Available pricing options'
  },

  freeTrialAvailable: {
    type: 'boolean',
    default: false,
    description: 'Whether free trial is offered'
  },

  // Status and Metadata
  status: {
    type: 'text',
    required: true,
    options: ['active', 'beta', 'coming-soon', 'deprecated'],
    default: 'active',
    description: 'Current availability status'
  },

  category: {
    type: 'reference',
    collection: 'ToolCategories',
    required: true,
    description: 'Primary tool category'
  },

  tags: {
    type: 'multiReference',
    collection: 'Tags',
    description: 'Searchable tags for filtering'
  },

  // FHIR Specific
  fhirVersions: {
    type: 'multiText',
    options: ['R4', 'R5', 'STU3', 'DSTU2'],
    description: 'Supported FHIR versions'
  },

  fhirResources: {
    type: 'multiText',
    description: 'FHIR resource types supported'
  },

  // SEO and Discovery
  metaTitle: {
    type: 'text',
    maxLength: 60,
    description: 'SEO page title'
  },

  metaDescription: {
    type: 'text',
    maxLength: 160,
    description: 'SEO meta description'
  },

  // Analytics and Ordering
  popularityScore: {
    type: 'number',
    default: 0,
    description: 'Calculated popularity for sorting'
  },

  viewCount: {
    type: 'number',
    default: 0,
    description: 'Page view tracking'
  },

  featured: {
    type: 'boolean',
    default: false,
    description: 'Featured tool promotion'
  },

  // Timestamps
  createdDate: {
    type: 'dateTime',
    default: 'now',
    description: 'Creation timestamp'
  },

  lastUpdated: {
    type: 'dateTime',
    default: 'now',
    description: 'Last modification timestamp'
  }
};
```

### 2. Products Collection
```javascript
const ProductsSchema = {
  // Identity and Commerce
  sku: {
    type: 'text',
    required: true,
    unique: true,
    maxLength: 50,
    pattern: '^[A-Z0-9-]+$',
    description: 'Stock keeping unit for inventory'
  },

  name: {
    type: 'text',
    required: true,
    maxLength: 200,
    description: 'Product display name'
  },

  slug: {
    type: 'text',
    required: true,
    unique: true,
    pattern: '^[a-z0-9-]+$',
    description: 'URL-friendly identifier'
  },

  // Product Details
  shortDescription: {
    type: 'text',
    required: true,
    maxLength: 300,
    description: 'Brief product summary'
  },

  fullDescription: {
    type: 'richText',
    required: true,
    description: 'Detailed product description'
  },

  // Categorization
  category: {
    type: 'reference',
    collection: 'ProductCategories',
    required: true,
    description: 'Primary product category'
  },

  subcategory: {
    type: 'reference',
    collection: 'ProductSubcategories',
    description: 'Secondary categorization'
  },

  tags: {
    type: 'multiReference',
    collection: 'Tags',
    description: 'Product tags for search/filtering'
  },

  // Pricing
  price: {
    type: 'number',
    required: true,
    minimum: 0,
    description: 'Base price in USD'
  },

  originalPrice: {
    type: 'number',
    description: 'Original price for discount display'
  },

  currency: {
    type: 'text',
    default: 'USD',
    options: ['USD', 'EUR', 'GBP'],
    description: 'Pricing currency'
  },

  // Licensing and Terms
  licenseType: {
    type: 'text',
    required: true,
    options: ['single-user', 'multi-user', 'enterprise', 'unlimited'],
    description: 'License scope and restrictions'
  },

  term: {
    type: 'text',
    options: ['one-time', 'monthly', 'annual', 'lifetime'],
    description: 'Billing frequency'
  },

  // Fulfillment
  fulfillmentType: {
    type: 'text',
    required: true,
    options: ['digital-download', 'online-access', 'physical-shipment', 'service-delivery'],
    description: 'How product is delivered'
  },

  downloadURL: {
    type: 'url',
    description: 'Direct download link for digital products'
  },

  accessInstructions: {
    type: 'richText',
    description: 'Instructions for accessing purchased content'
  },

  // Visual Assets
  productImage: {
    type: 'image',
    required: true,
    description: 'Primary product image'
  },

  gallery: {
    type: 'gallery',
    description: 'Additional product images'
  },

  // Inventory and Availability
  inStock: {
    type: 'boolean',
    default: true,
    description: 'Product availability status'
  },

  stockQuantity: {
    type: 'number',
    description: 'Available quantity (null = unlimited)'
  },

  // Features and Specifications
  features: {
    type: 'multiReference',
    collection: 'ProductFeatures',
    description: 'Key product features'
  },

  specifications: {
    type: 'richText',
    description: 'Technical specifications'
  },

  requirements: {
    type: 'richText',
    description: 'System or skill requirements'
  },

  // Related Products
  relatedProducts: {
    type: 'multiReference',
    collection: 'Products',
    description: 'Cross-sell recommendations'
  },

  bundledWith: {
    type: 'multiReference',
    collection: 'Products',
    description: 'Products included in bundles'
  },

  // SEO and Marketing
  metaTitle: {
    type: 'text',
    maxLength: 60,
    description: 'SEO page title'
  },

  metaDescription: {
    type: 'text',
    maxLength: 160,
    description: 'SEO meta description'
  },

  // Analytics
  salesCount: {
    type: 'number',
    default: 0,
    description: 'Total sales for popularity'
  },

  rating: {
    type: 'number',
    minimum: 0,
    maximum: 5,
    description: 'Average customer rating'
  },

  reviewCount: {
    type: 'number',
    default: 0,
    description: 'Number of customer reviews'
  },

  // Status and Timestamps
  status: {
    type: 'text',
    options: ['active', 'inactive', 'coming-soon', 'discontinued'],
    default: 'active',
    description: 'Product availability status'
  },

  createdDate: {
    type: 'dateTime',
    default: 'now'
  },

  lastUpdated: {
    type: 'dateTime',
    default: 'now'
  }
};
```

### 3. Courses Collection
```javascript
const CoursesSchema = {
  // Identity
  slug: {
    type: 'text',
    required: true,
    unique: true,
    pattern: '^[a-z0-9-]+$',
    description: 'URL-friendly course identifier'
  },

  title: {
    type: 'text',
    required: true,
    maxLength: 200,
    description: 'Course title'
  },

  subtitle: {
    type: 'text',
    maxLength: 300,
    description: 'Course subtitle or tagline'
  },

  // Course Content
  description: {
    type: 'richText',
    required: true,
    description: 'Detailed course description'
  },

  objectives: {
    type: 'multiText',
    description: 'Learning objectives and outcomes'
  },

  syllabus: {
    type: 'multiReference',
    collection: 'CourseSyllabusItems',
    description: 'Structured course content outline'
  },

  // Difficulty and Prerequisites
  level: {
    type: 'text',
    required: true,
    options: ['beginner', 'intermediate', 'advanced', 'expert'],
    description: 'Course difficulty level'
  },

  prerequisites: {
    type: 'multiText',
    description: 'Required knowledge or experience'
  },

  estimatedDuration: {
    type: 'text',
    description: 'Expected completion time'
  },

  // Scheduling
  format: {
    type: 'text',
    options: ['live-online', 'self-paced', 'hybrid', 'in-person'],
    description: 'Course delivery format'
  },

  schedule: {
    type: 'multiReference',
    collection: 'CourseSchedule',
    description: 'Available course sessions'
  },

  timezone: {
    type: 'text',
    default: 'America/New_York',
    description: 'Course timezone for live sessions'
  },

  // Enrollment and Capacity
  price: {
    type: 'number',
    required: true,
    minimum: 0,
    description: 'Course price in USD'
  },

  earlyBirdPrice: {
    type: 'number',
    description: 'Discounted early registration price'
  },

  maxSeats: {
    type: 'number',
    description: 'Maximum enrollment capacity'
  },

  seatsRemaining: {
    type: 'number',
    description: 'Available enrollment spots'
  },

  enrollmentDeadline: {
    type: 'dateTime',
    description: 'Last date for enrollment'
  },

  // Instructor Information
  instructor: {
    type: 'reference',
    collection: 'Instructors',
    description: 'Primary course instructor'
  },

  coInstructors: {
    type: 'multiReference',
    collection: 'Instructors',
    description: 'Additional instructors'
  },

  // Course Materials
  materials: {
    type: 'multiReference',
    collection: 'CourseMaterials',
    description: 'Required or supplementary materials'
  },

  certificateOffered: {
    type: 'boolean',
    default: false,
    description: 'Whether completion certificate is provided'
  },

  certificateTemplate: {
    type: 'image',
    description: 'Certificate design template'
  },

  // Assessment and Evaluation
  hasQuiz: {
    type: 'boolean',
    default: false,
    description: 'Whether course includes quiz'
  },

  quizItems: {
    type: 'multiReference',
    collection: 'QuizItems',
    description: 'Associated quiz questions'
  },

  passingScore: {
    type: 'number',
    minimum: 0,
    maximum: 100,
    description: 'Minimum score for completion'
  },

  // Visual Assets
  courseImage: {
    type: 'image',
    required: true,
    description: 'Course thumbnail and header image'
  },

  promoVideo: {
    type: 'video',
    description: 'Course introduction/promo video'
  },

  // Categories and Tags
  category: {
    type: 'reference',
    collection: 'CourseCategories',
    required: true,
    description: 'Primary course category'
  },

  tags: {
    type: 'multiReference',
    collection: 'Tags',
    description: 'Course topic tags'
  },

  // SEO
  metaTitle: {
    type: 'text',
    maxLength: 60
  },

  metaDescription: {
    type: 'text',
    maxLength: 160
  },

  // Analytics and Reviews
  enrollmentCount: {
    type: 'number',
    default: 0,
    description: 'Total historical enrollments'
  },

  completionRate: {
    type: 'number',
    minimum: 0,
    maximum: 100,
    description: 'Percentage of students who complete'
  },

  rating: {
    type: 'number',
    minimum: 0,
    maximum: 5,
    description: 'Average student rating'
  },

  // Status
  status: {
    type: 'text',
    options: ['active', 'upcoming', 'full', 'cancelled', 'completed'],
    default: 'upcoming',
    description: 'Course availability status'
  },

  createdDate: {
    type: 'dateTime',
    default: 'now'
  },

  lastUpdated: {
    type: 'dateTime',
    default: 'now'
  }
};
```

### 4. QuizItems Collection
```javascript
const QuizItemsSchema = {
  // Identity
  id: {
    type: 'text',
    required: true,
    unique: true,
    pattern: '^Q[0-9]{6}$',
    description: 'Unique question identifier (Q123456)'
  },

  // Question Content
  question: {
    type: 'richText',
    required: true,
    description: 'Question text with formatting support'
  },

  questionType: {
    type: 'text',
    options: ['multiple-choice', 'true-false', 'fill-blank', 'essay', 'code-review'],
    default: 'multiple-choice',
    description: 'Type of question format'
  },

  // Answer Options
  choices: {
    type: 'multiText',
    description: 'Available answer choices (for MC questions)'
  },

  correctAnswer: {
    type: 'text',
    required: true,
    description: 'Correct answer or answer key'
  },

  // Educational Content
  rationale: {
    type: 'richText',
    required: true,
    description: 'Explanation of correct answer'
  },

  additionalResources: {
    type: 'multiText',
    description: 'Links to relevant documentation/resources'
  },

  // Categorization
  topic: {
    type: 'reference',
    collection: 'QuizTopics',
    required: true,
    description: 'Primary topic area'
  },

  subtopic: {
    type: 'text',
    description: 'Specific subtopic within main topic'
  },

  tags: {
    type: 'multiText',
    description: 'Searchable tags for content organization'
  },

  // Difficulty and Metadata
  difficultyLevel: {
    type: 'text',
    options: ['easy', 'medium', 'hard'],
    required: true,
    description: 'Question difficulty assessment'
  },

  estimatedTime: {
    type: 'number',
    description: 'Expected time to answer (seconds)'
  },

  // FHIR Specific Fields
  fhirVersion: {
    type: 'text',
    options: ['R4', 'R5', 'STU3', 'general'],
    description: 'Applicable FHIR version'
  },

  fhirResource: {
    type: 'text',
    description: 'Relevant FHIR resource type'
  },

  implementationGuide: {
    type: 'text',
    description: 'Relevant IG or profile'
  },

  // Usage and Analytics
  timesUsed: {
    type: 'number',
    default: 0,
    description: 'How many times question has been used'
  },

  correctAnswerRate: {
    type: 'number',
    minimum: 0,
    maximum: 100,
    description: 'Percentage of correct answers'
  },

  // Content Management
  author: {
    type: 'reference',
    collection: 'Authors',
    description: 'Question author'
  },

  reviewer: {
    type: 'reference',
    collection: 'Authors',
    description: 'Question reviewer/validator'
  },

  status: {
    type: 'text',
    options: ['draft', 'review', 'approved', 'retired'],
    default: 'draft',
    description: 'Question approval status'
  },

  // Version Control
  version: {
    type: 'text',
    default: '1.0',
    description: 'Question version number'
  },

  lastReviewed: {
    type: 'dateTime',
    description: 'Last review/validation date'
  },

  createdDate: {
    type: 'dateTime',
    default: 'now'
  },

  lastUpdated: {
    type: 'dateTime',
    default: 'now'
  }
};
```

### 5. BlogPosts Collection (Synced)
```javascript
const BlogPostsSchema = {
  // Core Content (Synced from External CMS)
  title: {
    type: 'text',
    required: true,
    maxLength: 200,
    description: 'Post title'
  },

  slug: {
    type: 'text',
    required: true,
    unique: true,
    pattern: '^[a-z0-9-]+$',
    description: 'URL-friendly identifier'
  },

  summary: {
    type: 'text',
    required: true,
    maxLength: 300,
    description: 'Post excerpt/summary'
  },

  content: {
    type: 'richText',
    description: 'Full post content (if not external)'
  },

  // External Source Integration
  canonicalURL: {
    type: 'url',
    required: true,
    description: 'Original post URL (for SEO)'
  },

  externalSource: {
    type: 'text',
    options: ['medium', 'dev.to', 'linkedin', 'company-blog'],
    description: 'Original publication platform'
  },

  syncStatus: {
    type: 'text',
    options: ['synced', 'pending', 'error'],
    default: 'pending',
    description: 'Sync status from external source'
  },

  lastSyncDate: {
    type: 'dateTime',
    description: 'Last successful sync timestamp'
  },

  // Content Metadata
  author: {
    type: 'reference',
    collection: 'Authors',
    required: true,
    description: 'Post author'
  },

  coAuthors: {
    type: 'multiReference',
    collection: 'Authors',
    description: 'Additional authors'
  },

  // Categorization
  category: {
    type: 'reference',
    collection: 'BlogCategories',
    required: true,
    description: 'Primary post category'
  },

  tags: {
    type: 'multiText',
    description: 'Post tags for filtering/search'
  },

  // Publishing
  publishedAt: {
    type: 'dateTime',
    required: true,
    description: 'Original publication date'
  },

  status: {
    type: 'text',
    options: ['published', 'draft', 'archived'],
    default: 'published',
    description: 'Post visibility status'
  },

  featured: {
    type: 'boolean',
    default: false,
    description: 'Featured post promotion'
  },

  // Visual Assets
  featuredImage: {
    type: 'image',
    description: 'Post header image'
  },

  // Engagement Metrics
  readTime: {
    type: 'number',
    description: 'Estimated reading time (minutes)'
  },

  viewCount: {
    type: 'number',
    default: 0,
    description: 'Page view count'
  },

  shareCount: {
    type: 'number',
    default: 0,
    description: 'Social share count'
  },

  // SEO
  metaTitle: {
    type: 'text',
    maxLength: 60
  },

  metaDescription: {
    type: 'text',
    maxLength: 160
  },

  // Content Structure
  tableOfContents: {
    type: 'multiText',
    description: 'Extracted headings for TOC'
  },

  // Related Content
  relatedPosts: {
    type: 'multiReference',
    collection: 'BlogPosts',
    description: 'Related/similar posts'
  },

  // Comments and Social
  commentsEnabled: {
    type: 'boolean',
    default: true,
    description: 'Whether comments are allowed'
  },

  createdDate: {
    type: 'dateTime',
    default: 'now'
  },

  lastUpdated: {
    type: 'dateTime',
    default: 'now'
  }
};
```

### 6. PodcastEpisodes Collection
```javascript
const PodcastEpisodesSchema = {
  // Episode Identity
  epNo: {
    type: 'number',
    required: true,
    unique: true,
    minimum: 1,
    description: 'Episode number'
  },

  season: {
    type: 'number',
    default: 1,
    description: 'Podcast season number'
  },

  title: {
    type: 'text',
    required: true,
    maxLength: 200,
    description: 'Episode title'
  },

  slug: {
    type: 'text',
    required: true,
    unique: true,
    pattern: '^[a-z0-9-]+$',
    description: 'URL-friendly identifier'
  },

  // Content
  description: {
    type: 'richText',
    required: true,
    description: 'Episode description and summary'
  },

  showNotes: {
    type: 'richText',
    description: 'Detailed show notes with timestamps'
  },

  keyTopics: {
    type: 'multiText',
    description: 'Main topics discussed'
  },

  // Participants
  host: {
    type: 'reference',
    collection: 'PodcastHosts',
    required: true,
    description: 'Primary episode host'
  },

  coHosts: {
    type: 'multiReference',
    collection: 'PodcastHosts',
    description: 'Additional hosts'
  },

  guests: {
    type: 'multiReference',
    collection: 'PodcastGuests',
    description: 'Episode guests with details'
  },

  // Media Assets
  audioURL: {
    type: 'url',
    required: true,
    description: 'Primary audio file URL'
  },

  audioFileSize: {
    type: 'number',
    description: 'Audio file size in bytes'
  },

  duration: {
    type: 'text',
    pattern: '^\\d{1,2}:\\d{2}:\\d{2}$',
    description: 'Episode duration (HH:MM:SS)'
  },

  videoURL: {
    type: 'url',
    description: 'Video version URL (if available)'
  },

  // Transcription
  transcriptURL: {
    type: 'url',
    description: 'Link to full transcript'
  },

  hasTranscript: {
    type: 'boolean',
    default: false,
    description: 'Whether transcript is available'
  },

  transcriptText: {
    type: 'richText',
    description: 'Full episode transcript text'
  },

  // Visual Assets
  episodeImage: {
    type: 'image',
    description: 'Episode-specific artwork'
  },

  // Links and Resources
  links: {
    type: 'multiReference',
    collection: 'PodcastLinks',
    description: 'Referenced links and resources'
  },

  sponsorMentions: {
    type: 'multiReference',
    collection: 'PodcastSponsors',
    description: 'Episode sponsors and mentions'
  },

  // Publishing
  publishedAt: {
    type: 'dateTime',
    required: true,
    description: 'Episode publication date'
  },

  status: {
    type: 'text',
    options: ['published', 'scheduled', 'draft', 'archived'],
    default: 'draft',
    description: 'Episode publication status'
  },

  // Distribution
  platforms: {
    type: 'multiText',
    description: 'Distribution platforms (Spotify, Apple, etc.)'
  },

  rssIncluded: {
    type: 'boolean',
    default: true,
    description: 'Whether episode is in RSS feed'
  },

  // Analytics
  downloadCount: {
    type: 'number',
    default: 0,
    description: 'Total download count'
  },

  playCount: {
    type: 'number',
    default: 0,
    description: 'Total play count'
  },

  rating: {
    type: 'number',
    minimum: 0,
    maximum: 5,
    description: 'Average listener rating'
  },

  // SEO
  metaTitle: {
    type: 'text',
    maxLength: 60
  },

  metaDescription: {
    type: 'text',
    maxLength: 160
  },

  // Categories and Tags
  category: {
    type: 'reference',
    collection: 'PodcastCategories',
    description: 'Primary episode category'
  },

  tags: {
    type: 'multiText',
    description: 'Episode tags for discovery'
  },

  createdDate: {
    type: 'dateTime',
    default: 'now'
  },

  lastUpdated: {
    type: 'dateTime',
    default: 'now'
  }
};
```

### 7. Partners Collection
```javascript
const PartnersSchema = {
  // Identity
  name: {
    type: 'text',
    required: true,
    maxLength: 150,
    description: 'Partner company name'
  },

  slug: {
    type: 'text',
    required: true,
    unique: true,
    pattern: '^[a-z0-9-]+$',
    description: 'URL-friendly identifier'
  },

  // Company Information
  description: {
    type: 'richText',
    required: true,
    description: 'Partner company description'
  },

  shortDescription: {
    type: 'text',
    maxLength: 200,
    description: 'Brief partner summary for listings'
  },

  founded: {
    type: 'number',
    description: 'Company founding year'
  },

  headquarters: {
    type: 'text',
    description: 'Company headquarters location'
  },

  employeeCount: {
    type: 'text',
    options: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'],
    description: 'Company size range'
  },

  // Visual Identity
  logo: {
    type: 'image',
    required: true,
    description: 'Partner company logo'
  },

  logoVariant: {
    type: 'image',
    description: 'Alternative logo version (light/dark)'
  },

  brandColors: {
    type: 'multiText',
    description: 'Primary brand colors (hex codes)'
  },

  // Contact Information
  url: {
    type: 'url',
    required: true,
    description: 'Partner company website'
  },

  contactEmail: {
    type: 'email',
    description: 'Primary contact email'
  },

  socialLinks: {
    type: 'multiReference',
    collection: 'SocialLinks',
    description: 'Social media profiles'
  },

  // Partnership Details
  partnershipType: {
    type: 'text',
    options: ['technology', 'consulting', 'implementation', 'training', 'reseller'],
    required: true,
    description: 'Type of partnership'
  },

  categories: {
    type: 'multiText',
    description: 'Partner service categories'
  },

  specialties: {
    type: 'multiText',
    description: 'Areas of expertise'
  },

  certifications: {
    type: 'multiText',
    description: 'Relevant certifications and credentials'
  },

  // Geographic Coverage
  regions: {
    type: 'multiText',
    description: 'Geographic regions served'
  },

  countries: {
    type: 'multiText',
    description: 'Specific countries of operation'
  },

  // Partnership Tier
  tier: {
    type: 'text',
    options: ['platinum', 'gold', 'silver', 'bronze', 'standard'],
    default: 'standard',
    description: 'Partnership tier level'
  },

  featured: {
    type: 'boolean',
    default: false,
    description: 'Featured partner promotion'
  },

  // FHIR Specific
  fhirExpertise: {
    type: 'multiText',
    description: 'FHIR-specific capabilities'
  },

  fhirImplementations: {
    type: 'number',
    description: 'Number of FHIR implementations completed'
  },

  // Services Offered
  services: {
    type: 'multiText',
    description: 'Services provided to FHIR IQ customers'
  },

  pricingModel: {
    type: 'text',
    options: ['hourly', 'project-based', 'retainer', 'mixed'],
    description: 'Typical pricing approach'
  },

  // Performance Metrics
  customerRating: {
    type: 'number',
    minimum: 0,
    maximum: 5,
    description: 'Average customer rating'
  },

  projectsCompleted: {
    type: 'number',
    default: 0,
    description: 'Total projects completed'
  },

  responseTime: {
    type: 'text',
    description: 'Typical response time for inquiries'
  },

  // Case Studies and References
  caseStudies: {
    type: 'multiReference',
    collection: 'CaseStudies',
    description: 'Partner case studies'
  },

  clientTestimonials: {
    type: 'multiReference',
    collection: 'Testimonials',
    description: 'Client testimonials for this partner'
  },

  // Status and Approval
  status: {
    type: 'text',
    options: ['active', 'inactive', 'pending-approval', 'suspended'],
    default: 'pending-approval',
    description: 'Partner status'
  },

  approvedBy: {
    type: 'reference',
    collection: 'Authors',
    description: 'Staff member who approved partnership'
  },

  approvalDate: {
    type: 'dateTime',
    description: 'Partnership approval date'
  },

  contractEndDate: {
    type: 'dateTime',
    description: 'Partnership agreement end date'
  },

  createdDate: {
    type: 'dateTime',
    default: 'now'
  },

  lastUpdated: {
    type: 'dateTime',
    default: 'now'
  }
};
```

### 8. Testimonials Collection
```javascript
const TestimonialsSchema = {
  // Core Content
  quote: {
    type: 'richText',
    required: true,
    maxLength: 500,
    description: 'Testimonial quote content'
  },

  // Person Information
  person: {
    type: 'text',
    required: true,
    maxLength: 100,
    description: 'Person giving testimonial'
  },

  role: {
    type: 'text',
    required: true,
    maxLength: 100,
    description: 'Job title or role'
  },

  company: {
    type: 'text',
    required: true,
    maxLength: 100,
    description: 'Company or organization'
  },

  // Visual Assets
  personPhoto: {
    type: 'image',
    description: 'Photo of person giving testimonial'
  },

  logo: {
    type: 'image',
    description: 'Company logo'
  },

  // Contact and Verification
  email: {
    type: 'email',
    description: 'Contact email for verification'
  },

  linkedinProfile: {
    type: 'url',
    description: 'LinkedIn profile for verification'
  },

  verified: {
    type: 'boolean',
    default: false,
    description: 'Whether testimonial has been verified'
  },

  verifiedBy: {
    type: 'reference',
    collection: 'Authors',
    description: 'Staff member who verified testimonial'
  },

  // Context and Metrics
  productUsed: {
    type: 'reference',
    collection: 'Products',
    description: 'Product/service testimonial relates to'
  },

  toolUsed: {
    type: 'reference',
    collection: 'Tools',
    description: 'Tool testimonial relates to'
  },

  courseCompleted: {
    type: 'reference',
    collection: 'Courses',
    description: 'Course testimonial relates to'
  },

  // Quantifiable Results
  metric: {
    type: 'text',
    description: 'Quantifiable improvement or result'
  },

  metricType: {
    type: 'text',
    options: ['time-saved', 'cost-reduction', 'efficiency-gain', 'revenue-increase', 'other'],
    description: 'Type of improvement measured'
  },

  metricValue: {
    type: 'text',
    description: 'Specific value or percentage improvement'
  },

  // Additional Details
  industry: {
    type: 'text',
    description: 'Company industry or sector'
  },

  companySize: {
    type: 'text',
    options: ['startup', 'small', 'medium', 'large', 'enterprise'],
    description: 'Company size category'
  },

  useCase: {
    type: 'text',
    description: 'Specific use case or application'
  },

  // Content Attribution
  source: {
    type: 'text',
    options: ['survey', 'interview', 'review-site', 'social-media', 'email', 'case-study'],
    description: 'How testimonial was obtained'
  },

  originalURL: {
    type: 'url',
    description: 'Original source URL if applicable'
  },

  // Permission and Usage
  permissionGranted: {
    type: 'boolean',
    default: false,
    description: 'Whether explicit permission was granted'
  },

  consentDate: {
    type: 'dateTime',
    description: 'Date consent was obtained'
  },

  usageRights: {
    type: 'text',
    options: ['website-only', 'marketing-materials', 'social-media', 'all-uses'],
    description: 'Scope of usage permission'
  },

  // Display and Promotion
  featured: {
    type: 'boolean',
    default: false,
    description: 'Featured testimonial promotion'
  },

  displayOrder: {
    type: 'number',
    description: 'Order for testimonial display'
  },

  showOnHomepage: {
    type: 'boolean',
    default: false,
    description: 'Whether to display on homepage'
  },

  // External Links
  link: {
    type: 'url',
    description: 'Link to case study or full story'
  },

  videoTestimonial: {
    type: 'url',
    description: 'Video testimonial URL if available'
  },

  // Categorization
  category: {
    type: 'text',
    options: ['product', 'service', 'support', 'training', 'overall-experience'],
    description: 'Testimonial category'
  },

  tags: {
    type: 'multiText',
    description: 'Tags for filtering and search'
  },

  // Status and Approval
  status: {
    type: 'text',
    options: ['pending', 'approved', 'rejected', 'archived'],
    default: 'pending',
    description: 'Testimonial approval status'
  },

  approvedBy: {
    type: 'reference',
    collection: 'Authors',
    description: 'Staff member who approved testimonial'
  },

  // Analytics
  impressions: {
    type: 'number',
    default: 0,
    description: 'Number of times testimonial was viewed'
  },

  clickThroughs: {
    type: 'number',
    default: 0,
    description: 'Number of clicks on testimonial links'
  },

  createdDate: {
    type: 'dateTime',
    default: 'now'
  },

  lastUpdated: {
    type: 'dateTime',
    default: 'now'
  }
};
```

## Supporting Collections

### Category and Taxonomy Collections
```javascript
// Centralized category management
const CategoryCollections = {
  ToolCategories: {
    name: { type: 'text', required: true },
    slug: { type: 'text', required: true, unique: true },
    description: { type: 'text' },
    icon: { type: 'image' },
    parentCategory: { type: 'reference', collection: 'ToolCategories' }
  },

  ProductCategories: {
    name: { type: 'text', required: true },
    slug: { type: 'text', required: true, unique: true },
    description: { type: 'text' },
    sortOrder: { type: 'number' }
  },

  CourseCategories: {
    name: { type: 'text', required: true },
    slug: { type: 'text', required: true, unique: true },
    description: { type: 'text' },
    color: { type: 'text' }
  },

  Tags: {
    name: { type: 'text', required: true, unique: true },
    slug: { type: 'text', required: true, unique: true },
    usage_count: { type: 'number', default: 0 },
    category: { type: 'text', options: ['general', 'technical', 'industry', 'feature'] }
  }
};
```

### Content Management Collections
```javascript
const ContentManagementCollections = {
  Authors: {
    name: { type: 'text', required: true },
    email: { type: 'email', required: true, unique: true },
    bio: { type: 'richText' },
    avatar: { type: 'image' },
    role: { type: 'text', options: ['author', 'editor', 'admin'] },
    socialLinks: { type: 'multiText' },
    expertise: { type: 'multiText' }
  },

  MediaAssets: {
    title: { type: 'text', required: true },
    filename: { type: 'text', required: true },
    fileURL: { type: 'url', required: true },
    fileType: { type: 'text', options: ['image', 'video', 'audio', 'document'] },
    fileSize: { type: 'number' },
    altText: { type: 'text' },
    tags: { type: 'multiText' },
    usage: { type: 'multiText' }
  }
};
```

## Wix Studio Implementation

### Dynamic Page Routing
```javascript
// File: backend/router.js
export async function setupDynamicRouting() {
  // Tools dynamic pages
  $w.router.add('/tools/:slug', async (request) => {
    const tool = await wixData.query('Tools')
      .eq('slug', request.params.slug)
      .include('pricingTiers')
      .include('category')
      .find();

    if (tool.items.length === 0) {
      return { status: 404 };
    }

    return {
      data: { tool: tool.items[0] },
      seo: {
        title: tool.items[0].metaTitle || tool.items[0].name,
        description: tool.items[0].metaDescription || tool.items[0].summary
      }
    };
  });

  // Course dynamic pages
  $w.router.add('/courses/:slug', async (request) => {
    const course = await wixData.query('Courses')
      .eq('slug', request.params.slug)
      .include('instructor')
      .include('schedule')
      .find();

    return {
      data: { course: course.items[0] },
      seo: {
        title: course.items[0].metaTitle || course.items[0].title,
        description: course.items[0].metaDescription
      }
    };
  });

  // Similar patterns for Products, BlogPosts, etc.
}
```

### Search and Filtering
```javascript
// File: public/search-functionality.js
export async function performAdvancedSearch(searchParams) {
  const { query, filters, collections } = searchParams;
  const results = {};

  // Search across multiple collections
  for (const collection of collections) {
    let wixQuery = wixData.query(collection);

    // Text search
    if (query) {
      wixQuery = wixQuery.contains('name', query)
        .or(wixData.query(collection).contains('description', query));
    }

    // Apply filters
    if (filters.category) {
      wixQuery = wixQuery.eq('category', filters.category);
    }

    if (filters.tags && filters.tags.length > 0) {
      wixQuery = wixQuery.hasSome('tags', filters.tags);
    }

    // Status filtering
    wixQuery = wixQuery.eq('status', 'active');

    results[collection] = await wixQuery.find();
  }

  return results;
}
```

### Data Sync and Integration
```javascript
// File: backend/data-sync.js
import { fetch } from 'wix-fetch';

export async function syncExternalBlogPosts() {
  try {
    // Fetch from external sources (Medium, Dev.to, etc.)
    const sources = [
      { name: 'medium', url: 'https://api.medium.com/v1/users/@username/posts' },
      { name: 'dev.to', url: 'https://dev.to/api/articles?username=username' }
    ];

    for (const source of sources) {
      const response = await fetch(source.url);
      const posts = await response.json();

      for (const post of posts) {
        // Check if post already exists
        const existing = await wixData.query('BlogPosts')
          .eq('canonicalURL', post.canonical_url)
          .find();

        if (existing.items.length === 0) {
          // Create new blog post entry
          await wixData.insert('BlogPosts', {
            title: post.title,
            slug: post.slug,
            summary: post.description || post.title,
            canonicalURL: post.canonical_url,
            externalSource: source.name,
            publishedAt: new Date(post.published_at),
            tags: post.tag_list || [],
            syncStatus: 'synced',
            lastSyncDate: new Date()
          });
        }
      }
    }
  } catch (error) {
    console.error('Blog sync failed:', error);
  }
}
```

## Implementation Guidelines

### Data Validation and Integrity
```javascript
// File: backend/data-validation.js
export const validationRules = {
  beforeInsert: async (item, context) => {
    // Ensure required fields
    validateRequiredFields(item, context.collectionId);

    // Generate slugs if not provided
    if (!item.slug && item.name) {
      item.slug = generateSlug(item.name);
    }

    // Set default values
    item.createdDate = new Date();
    item.lastUpdated = new Date();

    return item;
  },

  beforeUpdate: async (item, context) => {
    // Update timestamp
    item.lastUpdated = new Date();

    // Validate business rules
    if (context.collectionId === 'Courses' && item.seatsRemaining < 0) {
      throw new Error('Seats remaining cannot be negative');
    }

    return item;
  }
};
```

### Performance Optimization
```javascript
// File: backend/performance-optimization.js
export const optimizationStrategies = {
  // Index critical fields for fast queries
  createIndexes: async () => {
    const indexConfigs = [
      { collection: 'Tools', field: 'slug' },
      { collection: 'Tools', field: 'status' },
      { collection: 'Products', field: 'sku' },
      { collection: 'Courses', field: 'status' },
      { collection: 'BlogPosts', field: 'publishedAt' }
    ];

    for (const config of indexConfigs) {
      await wixData.createIndex(config.collection, config.field);
    }
  },

  // Implement caching for frequently accessed data
  cacheStrategy: {
    popularTools: '15 minutes',
    featuredCourses: '30 minutes',
    testimonials: '1 hour',
    blogPosts: '5 minutes'
  }
};
```

## Acceptance Criteria

- [ ] All 8 primary collections defined with complete schemas
- [ ] Supporting collections for categories and content management created
- [ ] Dynamic routing configured for all content types
- [ ] Search and filtering functionality implemented
- [ ] Data validation and integrity rules established
- [ ] External content sync processes configured
- [ ] Performance optimization strategies implemented
- [ ] SEO metadata properly structured across all collections
- [ ] Analytics tracking integrated into data model
- [ ] FHIR-specific fields and categorization included
- [ ] E-commerce integration points established
- [ ] Content workflow and approval processes defined

## Dependencies
- Wix Studio CMS access and configuration
- External API integrations (Medium, Dev.to, etc.)
- Image and media asset management system
- Search functionality implementation
- Analytics and tracking system integration
- E-commerce platform integration