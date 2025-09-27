# RSS Sync Scheduling Guide

This document provides detailed instructions for setting up automated RSS synchronization for blog posts and podcast episodes in the FHIR IQ Wix site.

## Overview

The RSS sync system automatically fetches content from external sources (Substack blog, podcast RSS feeds) and synchronizes it with the local Wix Data collections. This ensures the website always displays the latest content without manual intervention.

## Available Sync Functions

### Blog Sync (`/wix/velo/backend/sync/blog.js`)
- **Function**: `syncBlogPosts(customRssUrl)`
- **Target Collection**: `BlogPosts`
- **Source**: Substack RSS feed
- **Frequency**: Recommended daily sync

### Podcast Sync (`/wix/velo/backend/sync/podcast.js`)
- **Function**: `syncPodcastEpisodes(customRssUrl)`
- **Target Collection**: `PodcastEpisodes`
- **Source**: Podcast RSS feed (Buzzsprout, Anchor, etc.)
- **Frequency**: Recommended weekly sync

## Scheduling Options

### 1. Wix Jobs (Premium Plan Required)

**Best for**: Production sites with Wix Premium plans

**Setup Steps**:
1. Go to Wix Dashboard → Settings → Jobs
2. Create new job for blog sync:
   - Function name: `scheduledBlogSync`
   - Schedule: Daily at 6:00 AM
   - Timezone: Your preferred timezone
3. Create new job for podcast sync:
   - Function name: `scheduledPodcastSync`
   - Schedule: Weekly on Monday at 7:00 AM
   - Timezone: Your preferred timezone
4. Enable both jobs

**Code Example** (already included in sync modules):
```javascript
// Blog sync job
export async function scheduledBlogSync(jobContext) {
  console.log('Scheduled blog sync started via Wix Jobs');

  try {
    const result = await syncBlogPosts();
    console.log('Scheduled blog sync result:', result);
    return result;
  } catch (error) {
    console.error('Scheduled blog sync error:', error);
    throw error;
  }
}

// Podcast sync job
export async function scheduledPodcastSync(jobContext) {
  console.log('Scheduled podcast sync started via Wix Jobs');

  try {
    const result = await syncPodcastEpisodes();
    console.log('Scheduled podcast sync result:', result);
    return result;
  } catch (error) {
    console.error('Scheduled podcast sync error:', error);
    throw error;
  }
}
```

### 2. Manual Dashboard Triggers

**Best for**: Testing, development, or sites without Wix Jobs

**Implementation**:
1. Create an admin page (`/admin/sync`)
2. Add sync trigger buttons
3. Import and call sync functions directly

**Admin Page Example**:
```javascript
// /wix/velo/public/pages/admin/sync.js
import { triggerManualSync } from 'backend/sync/blog';
import { triggerManualPodcastSync } from 'backend/sync/podcast';

$w.onReady(function () {
  $w('#blogSyncButton').onClick(async () => {
    $w('#blogSyncButton').disable();
    $w('#blogStatus').text = 'Syncing blog posts...';

    try {
      const result = await triggerManualSync();
      $w('#blogStatus').text = result.message;
    } catch (error) {
      $w('#blogStatus').text = `Error: ${error.message}`;
    } finally {
      $w('#blogSyncButton').enable();
    }
  });

  $w('#podcastSyncButton').onClick(async () => {
    $w('#podcastSyncButton').disable();
    $w('#podcastStatus').text = 'Syncing podcast episodes...';

    try {
      const result = await triggerManualPodcastSync();
      $w('#podcastStatus').text = result.message;
    } catch (error) {
      $w('#podcastStatus').text = `Error: ${error.message}`;
    } finally {
      $w('#podcastSyncButton').enable();
    }
  });
});
```

### 3. HTTP Function Endpoints

**Best for**: External cron services, CI/CD integration

**Setup Steps**:
1. Create HTTP functions for external triggering
2. Set up external cron service (GitHub Actions, Heroku Scheduler, etc.)
3. Make HTTP requests to trigger sync

**HTTP Function Example**:
```javascript
// /wix/velo/http-functions/sync-blog.js
import { ok, badRequest, serverError } from 'wix-http-functions';
import { syncBlogPosts } from 'backend/sync/blog';

export async function post_syncBlog(request) {
  try {
    // Optional: Add authentication
    const authHeader = request.headers['authorization'];
    if (authHeader !== 'Bearer YOUR_SECRET_TOKEN') {
      return badRequest({ error: 'Unauthorized' });
    }

    const result = await syncBlogPosts();

    return ok({
      body: JSON.stringify(result),
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('HTTP sync error:', error);
    return serverError({
      body: JSON.stringify({ error: error.message }),
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// /wix/velo/http-functions/sync-podcast.js
import { ok, badRequest, serverError } from 'wix-http-functions';
import { syncPodcastEpisodes } from 'backend/sync/podcast';

export async function post_syncPodcast(request) {
  try {
    // Optional: Add authentication
    const authHeader = request.headers['authorization'];
    if (authHeader !== 'Bearer YOUR_SECRET_TOKEN') {
      return badRequest({ error: 'Unauthorized' });
    }

    const result = await syncPodcastEpisodes();

    return ok({
      body: JSON.stringify(result),
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('HTTP sync error:', error);
    return serverError({
      body: JSON.stringify({ error: error.message }),
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
```

**GitHub Actions Example**:
```yaml
# .github/workflows/content-sync.yml
name: Content Sync

on:
  schedule:
    - cron: '0 6 * * *'  # Daily at 6 AM UTC
    - cron: '0 7 * * 1'  # Weekly on Monday at 7 AM UTC
  workflow_dispatch:

jobs:
  sync-blog:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Blog Sync
        run: |
          curl -X POST \
            -H "Authorization: Bearer ${{ secrets.SYNC_TOKEN }}" \
            -H "Content-Type: application/json" \
            https://your-site.wixsite.com/_functions/sync-blog

  sync-podcast:
    runs-on: ubuntu-latest
    if: github.event.schedule == '0 7 * * 1' || github.event_name == 'workflow_dispatch'
    steps:
      - name: Trigger Podcast Sync
        run: |
          curl -X POST \
            -H "Authorization: Bearer ${{ secrets.SYNC_TOKEN }}" \
            -H "Content-Type: application/json" \
            https://your-site.wixsite.com/_functions/sync-podcast
```

### 4. Wix Automations (If Available)

**Best for**: Sites with Wix Automation features enabled

**Setup Steps**:
1. Go to Wix Dashboard → Automations
2. Create new automation with time-based trigger
3. Connect to custom code action
4. Configure to call sync functions

## Configuration

### RSS Feed URLs

Update the RSS URLs in the sync modules:

**Blog Sync** (`/wix/velo/backend/sync/blog.js`):
```javascript
const SUBSTACK_RSS_URL = 'https://your-substack.substack.com/feed';
```

**Podcast Sync** (`/wix/velo/backend/sync/podcast.js`):
```javascript
const PODCAST_RSS_URL = 'https://feeds.buzzsprout.com/your-podcast-id.rss';
```

### Collection Configuration

Ensure your Wix Data collections match the expected schema:

**BlogPosts Collection**:
- `title` (Text)
- `summary` (Text)
- `canonicalURL` (URL)
- `tags` (Tags)
- `publishedAt` (Date)
- `externalId` (Text) - for sync tracking
- `source` (Text) - e.g., "substack"
- `author` (Text)
- `status` (Text) - e.g., "published"

**PodcastEpisodes Collection**:
- `title` (Text)
- `summary` (Text)
- `canonicalURL` (URL)
- `audioURL` (URL)
- `tags` (Tags)
- `publishedAt` (Date)
- `duration` (Number)
- `episodeNumber` (Number)
- `guests` (Text, multi-value)
- `externalId` (Text) - for sync tracking
- `source` (Text) - e.g., "rss"
- `status` (Text) - e.g., "published"

## Monitoring and Logging

### Console Logging
All sync functions include comprehensive console logging for monitoring:
- Sync start/completion times
- Number of items processed
- Success/error counts
- Detailed error messages

### Status Functions
Use built-in status functions to monitor sync health:

```javascript
import { getBlogSyncStatus } from 'backend/sync/blog';
import { getPodcastSyncStatus } from 'backend/sync/podcast';

// Check blog sync status
const blogStatus = await getBlogSyncStatus();
console.log('Blog status:', blogStatus);

// Check podcast sync status
const podcastStatus = await getPodcastSyncStatus();
console.log('Podcast status:', podcastStatus);
```

### Error Handling
- Failed syncs are logged with detailed error information
- Partial failures continue processing remaining items
- Network errors are retried automatically by Wix fetch

## Testing

### Manual Testing
1. Use manual trigger functions for testing:
   ```javascript
   import { triggerManualSync } from 'backend/sync/blog';
   import { triggerManualPodcastSync } from 'backend/sync/podcast';

   // Test blog sync
   const blogResult = await triggerManualSync();
   console.log('Blog sync result:', blogResult);

   // Test podcast sync
   const podcastResult = await triggerManualPodcastSync();
   console.log('Podcast sync result:', podcastResult);
   ```

2. Verify data in collections using Wix Data:
   ```javascript
   import wixData from 'wix-data';

   // Check blog posts
   const blogPosts = await wixData.query('BlogPosts')
     .eq('source', 'substack')
     .descending('publishedAt')
     .limit(10)
     .find();

   // Check podcast episodes
   const episodes = await wixData.query('PodcastEpisodes')
     .eq('source', 'rss')
     .descending('publishedAt')
     .limit(10)
     .find();
   ```

### Staging Environment
- Test sync functions in Wix Preview mode before publishing
- Use test RSS feeds for initial testing
- Verify UI components display synced content correctly

## Troubleshooting

### Common Issues

1. **RSS Feed Not Found (404)**
   - Verify RSS URL is correct and accessible
   - Check if feed requires authentication
   - Ensure feed is properly formatted XML

2. **No Items Synced**
   - Check RSS feed contains valid items
   - Verify XML parsing is working correctly
   - Check collection permissions and structure

3. **Sync Timeout**
   - Large feeds may timeout; consider pagination
   - Implement batch processing for large datasets
   - Increase function timeout if possible

4. **Duplicate Items**
   - Verify `externalId` field is being set correctly
   - Check if RSS feed items have stable GUIDs
   - Implement additional deduplication logic if needed

### Debug Mode
Enable detailed logging for troubleshooting:

```javascript
// Add to sync functions for debug mode
const DEBUG_MODE = true;

if (DEBUG_MODE) {
  console.log('RSS content:', xmlContent.substring(0, 1000));
  console.log('Parsed items:', JSON.stringify(posts, null, 2));
}
```

## Security Considerations

- Store RSS feed URLs in Wix Secrets if they contain authentication
- Implement rate limiting for manual triggers
- Use authentication tokens for HTTP function endpoints
- Validate RSS content before processing
- Sanitize extracted content to prevent XSS

## Performance Optimization

- Implement incremental sync (only new items)
- Use batch operations for large datasets
- Cache RSS content if appropriate
- Limit concurrent sync operations
- Monitor collection size and implement cleanup if needed

## Maintenance

### Regular Tasks
- Monitor sync logs for errors
- Update RSS URLs if they change
- Clean up old or irrelevant content
- Review and update tag mappings
- Test sync functions after Wix platform updates

### Updates
- Keep sync functions updated with RSS feed changes
- Update UI components when collection schema changes
- Monitor RSS feed format changes
- Update external service endpoints as needed