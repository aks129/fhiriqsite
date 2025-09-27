# Claude Code Prompt: Generate Wix CMS Models

You are setting up Wix CMS collections based on the schema defined in `/specs/collections.yaml`.

## Context
This prompt helps generate Wix CMS collection configurations and related Velo code for managing content on the FHIR IQ site.

## Read These Files First
1. `/specs/collections.yaml` - CMS schema definitions
2. `/specs/design-tokens.yaml` - Design system for styling
3. `/specs/site.yaml` - Project context and objectives

## Implementation Tasks

### 1. CMS Collection Setup
For each collection defined in `collections.yaml`, create:

#### Collection Configuration Files
Generate JSON configuration files that can be imported into Wix Studio:
- Field definitions with proper types and validation
- Permission settings
- Relationships between collections
- Default values and required fields

#### Example Structure:
```json
{
  "displayName": "Blog Posts",
  "id": "BlogPosts",
  "fields": [
    {
      "key": "title",
      "displayName": "Title",
      "type": "text",
      "required": true,
      "properties": {
        "maxLength": 120
      }
    }
  ]
}
```

### 2. Velo Backend Functions
Create backend functions for each collection:

#### CRUD Operations
- `createBlogPost(data)` - Create new blog post
- `getBlogPosts(filters, pagination)` - Query blog posts
- `updateBlogPost(id, data)` - Update existing post
- `deleteBlogPost(id)` - Delete post

#### Data Validation
- Input sanitization and validation
- Required field checking
- Data type validation
- Custom business logic validation

#### SEO Helpers
- Auto-generate slugs from titles
- Meta description optimization
- Reading time calculation
- Featured image handling

### 3. Frontend Integration Components
Create Wix Studio components for content management:

#### Admin Components
- Content creation forms
- Content listing and filtering
- Bulk operations interface
- Media upload and management

#### Public Components
- Blog post listings with pagination
- Category and tag filtering
- Search functionality
- Related content suggestions

### 4. Content Migration Utilities
Build tools to migrate existing content:

#### Blog Migration
- Import from Substack export
- Convert markdown to rich text
- Handle image migration
- Preserve SEO metadata

#### Podcast Migration
- Audio file processing
- Transcript import
- Guest information setup
- Episode metadata handling

### Technical Requirements

#### Wix CMS Best Practices
- Use proper field types for performance
- Implement efficient queries with indexes
- Handle large datasets with pagination
- Optimize for SEO with structured data

#### Velo Code Standards
- Error handling and logging
- Rate limiting for API endpoints
- Caching strategies for performance
- Security validation for user inputs

#### Integration Patterns
- Connect forms to CMS collections
- Implement real-time updates
- Handle file uploads securely
- Manage user permissions properly

### Performance Considerations
- Implement query optimization
- Use appropriate caching strategies
- Minimize API calls with batch operations
- Optimize image handling and delivery

### Security Requirements
- Validate all user inputs
- Implement proper authentication
- Use role-based access control
- Sanitize rich text content

## Output Format
Provide implementation files in this structure:
```
/wix-cms/
  collections/
    blog-posts.json
    podcast-episodes.json
    case-studies.json
    tools.json
    testimonials.json
  backend/
    blog-functions.js
    podcast-functions.js
    case-study-functions.js
    tool-functions.js
    testimonial-functions.js
  components/
    admin/
      content-form.js
      content-list.js
    public/
      blog-listing.js
      podcast-player.js
      case-study-grid.js
  migration/
    substack-import.js
    podcast-import.js
    data-cleanup.js
```

## Success Criteria
- All collections from specs are properly configured
- CRUD operations work reliably
- Content migration tools successfully import existing data
- Admin interface is intuitive and efficient
- Public-facing components follow design system
- Performance meets Core Web Vitals targets
- Security measures are properly implemented