# Wix CMS Collections & Content Management

## Overview

This specification defines the Wix Data collections needed to support the FHIR IQ information architecture, including content relationships, field structures, and dynamic page routing.

## Core CMS Collections

### 1. Blog Posts Collection

#### Collection Name: `blogPosts`
```javascript
const blogPostsSchema = {
  // Content Fields
  title: {
    type: 'text',
    required: true,
    displayName: 'Post Title'
  },
  slug: {
    type: 'text',
    required: true,
    unique: true,
    displayName: 'URL Slug'
  },
  excerpt: {
    type: 'text',
    maxLength: 300,
    displayName: 'Post Excerpt'
  },
  content: {
    type: 'richText',
    required: true,
    displayName: 'Post Content'
  },
  featuredImage: {
    type: 'image',
    displayName: 'Featured Image'
  },

  // Meta Fields
  publishDate: {
    type: 'date',
    required: true,
    displayName: 'Publish Date'
  },
  lastModified: {
    type: 'date',
    displayName: 'Last Modified'
  },
  status: {
    type: 'text',
    options: ['draft', 'published', 'archived'],
    default: 'draft',
    displayName: 'Status'
  },
  featured: {
    type: 'boolean',
    default: false,
    displayName: 'Featured Post'
  },

  // SEO Fields
  seoTitle: {
    type: 'text',
    maxLength: 60,
    displayName: 'SEO Title'
  },
  seoDescription: {
    type: 'text',
    maxLength: 160,
    displayName: 'SEO Description'
  },
  seoKeywords: {
    type: 'text',
    displayName: 'SEO Keywords'
  },

  // Relationships
  author: {
    type: 'reference',
    collection: 'authors',
    displayName: 'Author'
  },
  categories: {
    type: 'multiReference',
    collection: 'blogCategories',
    displayName: 'Categories'
  },
  tags: {
    type: 'multiReference',
    collection: 'blogTags',
    displayName: 'Tags'
  },

  // Analytics
  viewCount: {
    type: 'number',
    default: 0,
    displayName: 'View Count'
  },
  readingTime: {
    type: 'number',
    displayName: 'Reading Time (minutes)'
  },

  // Migration Fields
  substackUrl: {
    type: 'url',
    displayName: 'Original Substack URL'
  },
  imported: {
    type: 'boolean',
    default: false,
    displayName: 'Imported from Substack'
  }
};
```

#### Dynamic Page Configuration
```javascript
// File: blog/[slug].js
export async function getStaticPaths() {
  const posts = await wixData.query('blogPosts')
    .eq('status', 'published')
    .find();

  return posts.items.map(post => ({
    params: { slug: post.slug }
  }));
}
```

### 2. Blog Categories Collection

#### Collection Name: `blogCategories`
```javascript
const blogCategoriesSchema = {
  name: {
    type: 'text',
    required: true,
    displayName: 'Category Name'
  },
  slug: {
    type: 'text',
    required: true,
    unique: true,
    displayName: 'URL Slug'
  },
  description: {
    type: 'text',
    displayName: 'Category Description'
  },
  color: {
    type: 'text',
    displayName: 'Category Color'
  },
  icon: {
    type: 'image',
    displayName: 'Category Icon'
  },
  sortOrder: {
    type: 'number',
    displayName: 'Sort Order'
  },
  postCount: {
    type: 'number',
    default: 0,
    displayName: 'Post Count'
  }
};

// Predefined Categories
const defaultCategories = [
  {
    name: 'AI Development',
    slug: 'ai-development',
    color: '#7C3AED',
    description: 'AI-powered FHIR development tools and techniques'
  },
  {
    name: 'Implementation Guides',
    slug: 'implementation-guides',
    color: '#F97316',
    description: 'Step-by-step FHIR implementation guidance'
  },
  {
    name: 'Industry Insights',
    slug: 'industry-insights',
    color: '#3B82F6',
    description: 'Healthcare industry trends and analysis'
  },
  {
    name: 'Data Quality',
    slug: 'data-quality',
    color: '#22C55E',
    description: 'FHIR data quality best practices and tools'
  },
  {
    name: 'Case Studies',
    slug: 'case-studies',
    color: '#F59E0B',
    description: 'Real-world FHIR implementation success stories'
  },
  {
    name: 'Tutorials',
    slug: 'tutorials',
    color: '#EF4444',
    description: 'Hands-on FHIR development tutorials'
  }
];
```

### 3. Tools Collection

#### Collection Name: `tools`
```javascript
const toolsSchema = {
  // Basic Info
  name: {
    type: 'text',
    required: true,
    displayName: 'Tool Name'
  },
  slug: {
    type: 'text',
    required: true,
    unique: true,
    displayName: 'URL Slug'
  },
  tagline: {
    type: 'text',
    maxLength: 100,
    displayName: 'Tool Tagline'
  },
  description: {
    type: 'richText',
    displayName: 'Tool Description'
  },
  shortDescription: {
    type: 'text',
    maxLength: 200,
    displayName: 'Short Description'
  },

  // Visual Assets
  icon: {
    type: 'image',
    displayName: 'Tool Icon'
  },
  featuredImage: {
    type: 'image',
    displayName: 'Featured Image'
  },
  screenshots: {
    type: 'gallery',
    displayName: 'Tool Screenshots'
  },
  demoVideo: {
    type: 'video',
    displayName: 'Demo Video'
  },

  // Functionality
  features: {
    type: 'multiReference',
    collection: 'toolFeatures',
    displayName: 'Tool Features'
  },
  categories: {
    type: 'multiReference',
    collection: 'toolCategories',
    displayName: 'Tool Categories'
  },
  useCases: {
    type: 'richText',
    displayName: 'Use Cases'
  },

  // Pricing & Access
  pricingModel: {
    type: 'text',
    options: ['free', 'freemium', 'paid', 'enterprise'],
    displayName: 'Pricing Model'
  },
  freeTrialDays: {
    type: 'number',
    displayName: 'Free Trial Days'
  },
  startingPrice: {
    type: 'number',
    displayName: 'Starting Price'
  },
  pricingDetails: {
    type: 'richText',
    displayName: 'Pricing Details'
  },

  // Technical Details
  apiDocumentation: {
    type: 'url',
    displayName: 'API Documentation URL'
  },
  githubRepo: {
    type: 'url',
    displayName: 'GitHub Repository'
  },
  supportedFormats: {
    type: 'text',
    displayName: 'Supported Formats'
  },
  integrations: {
    type: 'multiReference',
    collection: 'integrations',
    displayName: 'Integrations'
  },

  // Status & Metadata
  status: {
    type: 'text',
    options: ['development', 'beta', 'live', 'deprecated'],
    default: 'development',
    displayName: 'Status'
  },
  featured: {
    type: 'boolean',
    default: false,
    displayName: 'Featured Tool'
  },
  launchDate: {
    type: 'date',
    displayName: 'Launch Date'
  },
  sortOrder: {
    type: 'number',
    displayName: 'Sort Order'
  },

  // Analytics
  usageStats: {
    type: 'text',
    displayName: 'Usage Statistics'
  },
  popularityScore: {
    type: 'number',
    default: 0,
    displayName: 'Popularity Score'
  }
};
```

### 4. Podcast Episodes Collection

#### Collection Name: `podcastEpisodes`
```javascript
const podcastEpisodesSchema = {
  // Episode Info
  title: {
    type: 'text',
    required: true,
    displayName: 'Episode Title'
  },
  slug: {
    type: 'text',
    required: true,
    unique: true,
    displayName: 'URL Slug'
  },
  episodeNumber: {
    type: 'number',
    required: true,
    displayName: 'Episode Number'
  },
  season: {
    type: 'number',
    default: 1,
    displayName: 'Season Number'
  },
  description: {
    type: 'richText',
    displayName: 'Episode Description'
  },
  shortDescription: {
    type: 'text',
    maxLength: 200,
    displayName: 'Short Description'
  },

  // Media Files
  audioFile: {
    type: 'audio',
    required: true,
    displayName: 'Audio File'
  },
  transcript: {
    type: 'richText',
    displayName: 'Episode Transcript'
  },
  showNotes: {
    type: 'richText',
    displayName: 'Show Notes'
  },
  featuredImage: {
    type: 'image',
    displayName: 'Episode Artwork'
  },

  // Metadata
  duration: {
    type: 'text',
    displayName: 'Duration (MM:SS)'
  },
  publishDate: {
    type: 'date',
    required: true,
    displayName: 'Publish Date'
  },
  recordingDate: {
    type: 'date',
    displayName: 'Recording Date'
  },

  // Relationships
  guests: {
    type: 'multiReference',
    collection: 'podcastGuests',
    displayName: 'Episode Guests'
  },
  topics: {
    type: 'multiReference',
    collection: 'podcastTopics',
    displayName: 'Episode Topics'
  },
  relatedTools: {
    type: 'multiReference',
    collection: 'tools',
    displayName: 'Related Tools'
  },
  relatedPosts: {
    type: 'multiReference',
    collection: 'blogPosts',
    displayName: 'Related Blog Posts'
  },

  // Analytics
  playCount: {
    type: 'number',
    default: 0,
    displayName: 'Play Count'
  },
  averageListenDuration: {
    type: 'number',
    displayName: 'Average Listen Duration'
  },

  // Status
  status: {
    type: 'text',
    options: ['draft', 'scheduled', 'published', 'archived'],
    default: 'draft',
    displayName: 'Status'
  },
  featured: {
    type: 'boolean',
    default: false,
    displayName: 'Featured Episode'
  }
};
```

### 5. Case Studies Collection

#### Collection Name: `caseStudies`
```javascript
const caseStudiesSchema = {
  // Basic Info
  title: {
    type: 'text',
    required: true,
    displayName: 'Case Study Title'
  },
  slug: {
    type: 'text',
    required: true,
    unique: true,
    displayName: 'URL Slug'
  },
  clientName: {
    type: 'text',
    displayName: 'Client Name'
  },
  clientLogo: {
    type: 'image',
    displayName: 'Client Logo'
  },
  industry: {
    type: 'reference',
    collection: 'industries',
    displayName: 'Industry'
  },

  // Case Study Content
  challenge: {
    type: 'richText',
    displayName: 'Challenge Description'
  },
  solution: {
    type: 'richText',
    displayName: 'Solution Implementation'
  },
  results: {
    type: 'richText',
    displayName: 'Results & Outcomes'
  },
  testimonial: {
    type: 'richText',
    displayName: 'Client Testimonial'
  },

  // Metrics & Results
  keyMetrics: {
    type: 'richText',
    displayName: 'Key Metrics'
  },
  timeline: {
    type: 'text',
    displayName: 'Implementation Timeline'
  },
  teamSize: {
    type: 'text',
    displayName: 'Project Team Size'
  },
  budget: {
    type: 'text',
    displayName: 'Project Budget Range'
  },

  // Technical Details
  technologiesUsed: {
    type: 'multiReference',
    collection: 'technologies',
    displayName: 'Technologies Used'
  },
  toolsUsed: {
    type: 'multiReference',
    collection: 'tools',
    displayName: 'FHIR IQ Tools Used'
  },
  fhirResources: {
    type: 'text',
    displayName: 'FHIR Resources Implemented'
  },

  // Media
  featuredImage: {
    type: 'image',
    displayName: 'Featured Image'
  },
  images: {
    type: 'gallery',
    displayName: 'Case Study Images'
  },
  documents: {
    type: 'multiReference',
    collection: 'documents',
    displayName: 'Related Documents'
  },

  // Metadata
  publishDate: {
    type: 'date',
    displayName: 'Publish Date'
  },
  projectDate: {
    type: 'date',
    displayName: 'Project Completion Date'
  },
  featured: {
    type: 'boolean',
    default: false,
    displayName: 'Featured Case Study'
  },
  sortOrder: {
    type: 'number',
    displayName: 'Sort Order'
  },

  // Privacy & Legal
  publicationApproved: {
    type: 'boolean',
    default: false,
    displayName: 'Publication Approved'
  },
  anonymized: {
    type: 'boolean',
    default: false,
    displayName: 'Client Information Anonymized'
  }
};
```

### 6. Training Courses Collection

#### Collection Name: `trainingCourses`
```javascript
const trainingCoursesSchema = {
  // Course Info
  title: {
    type: 'text',
    required: true,
    displayName: 'Course Title'
  },
  slug: {
    type: 'text',
    required: true,
    unique: true,
    displayName: 'URL Slug'
  },
  type: {
    type: 'text',
    options: ['workshop', 'cohort', 'self-paced', 'certification'],
    displayName: 'Course Type'
  },
  level: {
    type: 'text',
    options: ['beginner', 'intermediate', 'advanced', 'expert'],
    displayName: 'Difficulty Level'
  },

  // Content
  description: {
    type: 'richText',
    displayName: 'Course Description'
  },
  learningObjectives: {
    type: 'richText',
    displayName: 'Learning Objectives'
  },
  syllabus: {
    type: 'richText',
    displayName: 'Course Syllabus'
  },
  prerequisites: {
    type: 'richText',
    displayName: 'Prerequisites'
  },

  // Logistics
  duration: {
    type: 'text',
    displayName: 'Course Duration'
  },
  format: {
    type: 'text',
    options: ['in-person', 'virtual', 'hybrid', 'self-paced'],
    displayName: 'Delivery Format'
  },
  maxParticipants: {
    type: 'number',
    displayName: 'Maximum Participants'
  },

  // Pricing
  price: {
    type: 'number',
    displayName: 'Course Price'
  },
  earlyBirdPrice: {
    type: 'number',
    displayName: 'Early Bird Price'
  },
  groupDiscount: {
    type: 'boolean',
    default: false,
    displayName: 'Group Discount Available'
  },

  // Instructors
  instructors: {
    type: 'multiReference',
    collection: 'instructors',
    displayName: 'Course Instructors'
  },

  // Scheduling
  nextSessionDate: {
    type: 'date',
    displayName: 'Next Session Date'
  },
  registrationDeadline: {
    type: 'date',
    displayName: 'Registration Deadline'
  },
  upcomingSessions: {
    type: 'richText',
    displayName: 'Upcoming Sessions'
  },

  // Assets
  featuredImage: {
    type: 'image',
    displayName: 'Course Image'
  },
  materials: {
    type: 'multiReference',
    collection: 'documents',
    displayName: 'Course Materials'
  },

  // Status
  status: {
    type: 'text',
    options: ['active', 'coming-soon', 'sold-out', 'archived'],
    default: 'active',
    displayName: 'Status'
  },
  featured: {
    type: 'boolean',
    default: false,
    displayName: 'Featured Course'
  }
};
```

### 7. Partners Collection

#### Collection Name: `partners`
```javascript
const partnersSchema = {
  // Partner Info
  name: {
    type: 'text',
    required: true,
    displayName: 'Partner Name'
  },
  slug: {
    type: 'text',
    required: true,
    unique: true,
    displayName: 'URL Slug'
  },
  logo: {
    type: 'image',
    required: true,
    displayName: 'Partner Logo'
  },
  website: {
    type: 'url',
    displayName: 'Partner Website'
  },

  // Partnership Details
  partnershipType: {
    type: 'text',
    options: ['technology', 'consulting', 'reseller', 'integration'],
    displayName: 'Partnership Type'
  },
  description: {
    type: 'richText',
    displayName: 'Partnership Description'
  },
  integrationDetails: {
    type: 'richText',
    displayName: 'Integration Details'
  },

  // Benefits
  benefits: {
    type: 'richText',
    displayName: 'Partnership Benefits'
  },
  jointSolutions: {
    type: 'richText',
    displayName: 'Joint Solutions'
  },

  // Media
  featuredImage: {
    type: 'image',
    displayName: 'Featured Image'
  },
  screenshots: {
    type: 'gallery',
    displayName: 'Integration Screenshots'
  },

  // Relationship Metadata
  partnerSince: {
    type: 'date',
    displayName: 'Partner Since'
  },
  tier: {
    type: 'text',
    options: ['strategic', 'premier', 'certified', 'standard'],
    displayName: 'Partner Tier'
  },
  featured: {
    type: 'boolean',
    default: false,
    displayName: 'Featured Partner'
  },
  active: {
    type: 'boolean',
    default: true,
    displayName: 'Active Partnership'
  },

  // Contact Info
  contactPerson: {
    type: 'text',
    displayName: 'Contact Person'
  },
  contactEmail: {
    type: 'text',
    displayName: 'Contact Email'
  }
};
```

## Supporting Collections

### Authors Collection
```javascript
const authorsSchema = {
  name: { type: 'text', required: true },
  slug: { type: 'text', required: true, unique: true },
  bio: { type: 'richText' },
  avatar: { type: 'image' },
  title: { type: 'text' },
  email: { type: 'text' },
  social: {
    linkedin: { type: 'url' },
    twitter: { type: 'url' },
    github: { type: 'url' }
  }
};
```

### Industries Collection
```javascript
const industriesSchema = {
  name: { type: 'text', required: true },
  slug: { type: 'text', required: true, unique: true },
  description: { type: 'text' },
  icon: { type: 'image' },
  color: { type: 'text' }
};

const defaultIndustries = [
  { name: 'Health Plans & Payers', slug: 'payers' },
  { name: 'Healthcare Providers', slug: 'providers' },
  { name: 'Health Data Aggregators', slug: 'aggregators' },
  { name: 'Pharmaceutical Companies', slug: 'pharma' },
  { name: 'Health Technology', slug: 'healthtech' }
];
```

### Technologies Collection
```javascript
const technologiesSchema = {
  name: { type: 'text', required: true },
  slug: { type: 'text', required: true, unique: true },
  category: { type: 'text' }, // 'fhir-server', 'database', 'framework', etc.
  description: { type: 'text' },
  logo: { type: 'image' },
  website: { type: 'url' }
};
```

## Dynamic Page Routing

### Wix Router Configuration
```javascript
// File: routes.js
export const routes = [
  // Blog routes
  {
    path: '/blog',
    component: 'BlogLanding'
  },
  {
    path: '/blog/:slug',
    component: 'BlogPost',
    data: { collection: 'blogPosts', field: 'slug' }
  },
  {
    path: '/blog/category/:slug',
    component: 'BlogCategory',
    data: { collection: 'blogCategories', field: 'slug' }
  },

  // Tool routes
  {
    path: '/tools',
    component: 'ToolsLanding'
  },
  {
    path: '/tools/:slug',
    component: 'ToolDetail',
    data: { collection: 'tools', field: 'slug' }
  },

  // Podcast routes
  {
    path: '/podcast',
    component: 'PodcastLanding'
  },
  {
    path: '/podcast/:slug',
    component: 'PodcastEpisode',
    data: { collection: 'podcastEpisodes', field: 'slug' }
  },

  // Case study routes
  {
    path: '/case-studies',
    component: 'CaseStudiesLanding'
  },
  {
    path: '/case-studies/:slug',
    component: 'CaseStudyDetail',
    data: { collection: 'caseStudies', field: 'slug' }
  },

  // Training routes
  {
    path: '/training/:slug',
    component: 'TrainingCourse',
    data: { collection: 'trainingCourses', field: 'slug' }
  },

  // Partner routes
  {
    path: '/partners/:slug',
    component: 'PartnerDetail',
    data: { collection: 'partners', field: 'slug' }
  }
];
```

## Content Relationships

### Related Content Logic
```javascript
// File: content-relationships.js
export function getRelatedContent(item, collection) {
  const relationships = {
    blogPosts: {
      relatedBy: ['categories', 'tags', 'author'],
      alsoShow: ['tools', 'caseStudies'],
      limit: 3
    },
    tools: {
      relatedBy: ['categories', 'useCases'],
      alsoShow: ['blogPosts', 'caseStudies', 'trainingCourses'],
      limit: 4
    },
    caseStudies: {
      relatedBy: ['industry', 'toolsUsed'],
      alsoShow: ['blogPosts', 'tools'],
      limit: 3
    },
    podcastEpisodes: {
      relatedBy: ['topics', 'guests'],
      alsoShow: ['blogPosts', 'tools'],
      limit: 2
    }
  };

  return findRelatedItems(item, relationships[collection]);
}
```

### Cross-Collection Queries
```javascript
// File: content-queries.js
export async function getHomepageContent() {
  const [featuredPosts, featuredTools, latestPodcast, featuredCaseStudy] = await Promise.all([
    wixData.query('blogPosts')
      .eq('featured', true)
      .eq('status', 'published')
      .limit(3)
      .descending('publishDate')
      .find(),

    wixData.query('tools')
      .eq('featured', true)
      .eq('status', 'live')
      .limit(4)
      .ascending('sortOrder')
      .find(),

    wixData.query('podcastEpisodes')
      .eq('status', 'published')
      .limit(1)
      .descending('publishDate')
      .find(),

    wixData.query('caseStudies')
      .eq('featured', true)
      .limit(1)
      .descending('publishDate')
      .find()
  ]);

  return {
    featuredPosts: featuredPosts.items,
    featuredTools: featuredTools.items,
    latestPodcast: latestPodcast.items[0],
    featuredCaseStudy: featuredCaseStudy.items[0]
  };
}
```

## Content Migration Strategy

### Substack Import Process
```javascript
// File: migration/substack-import.js
export async function importSubstackPosts(substackData) {
  const importedPosts = [];

  for (const post of substackData) {
    const blogPost = {
      title: post.title,
      slug: generateSlug(post.title),
      content: convertToWixRichText(post.body_html),
      excerpt: post.subtitle || generateExcerpt(post.body_text),
      publishDate: new Date(post.post_date),
      substackUrl: post.canonical_url,
      imported: true,
      author: await getAuthorByEmail(post.author_email),
      status: 'published'
    };

    // Set canonical URL for SEO
    blogPost.canonicalUrl = `/blog/${blogPost.slug}`;

    const result = await wixData.save('blogPosts', blogPost);
    importedPosts.push(result);

    // Create 301 redirect from old URL
    await createRedirect(post.canonical_url, `/blog/${blogPost.slug}`);
  }

  return importedPosts;
}
```

## Search Implementation

### Wix Search Configuration
```javascript
// File: search/search-config.js
export const searchConfig = {
  collections: [
    {
      name: 'blogPosts',
      fields: ['title', 'excerpt', 'content'],
      boost: {
        'title': 3,
        'excerpt': 2,
        'content': 1
      }
    },
    {
      name: 'tools',
      fields: ['name', 'description', 'shortDescription'],
      boost: {
        'name': 3,
        'shortDescription': 2,
        'description': 1
      }
    },
    {
      name: 'caseStudies',
      fields: ['title', 'challenge', 'solution'],
      boost: {
        'title': 3,
        'challenge': 1.5,
        'solution': 1.5
      }
    },
    {
      name: 'podcastEpisodes',
      fields: ['title', 'description', 'showNotes'],
      boost: {
        'title': 3,
        'description': 2,
        'showNotes': 1
      }
    }
  ],
  filters: [
    { field: 'status', value: 'published' },
    { field: 'active', value: true }
  ]
};
```

## Implementation Checklist

### CMS Setup
- [ ] All collections created with proper field types
- [ ] Relationships between collections established
- [ ] Default data imported for categories, industries, technologies
- [ ] Collection permissions configured

### Dynamic Routing
- [ ] URL patterns defined for all dynamic pages
- [ ] Router configuration implemented
- [ ] SEO-friendly URLs validated
- [ ] 404 handling for invalid slugs

### Content Management
- [ ] Editorial workflow established
- [ ] Content templates created
- [ ] Bulk import tools for migration
- [ ] Preview functionality for draft content

### Search & Filtering
- [ ] Search functionality implemented
- [ ] Filter options configured
- [ ] Related content algorithms tested
- [ ] Performance optimized for large datasets