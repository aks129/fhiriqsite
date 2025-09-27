/**
 * Blog RSS Sync Module
 * @module backend/sync/blog
 *
 * Fetches Substack RSS feed and synchronizes with BlogPosts collection
 * Stores metadata only - links to canonical URLs for full content
 */

import { fetch } from 'wix-fetch';
import wixData from 'wix-data';

// Configuration
const SUBSTACK_RSS_URL = 'https://your-substack.substack.com/feed'; // Update with actual Substack URL
const COLLECTION_NAME = 'BlogPosts';

/**
 * Parse RSS XML to extract blog post data
 * @param {string} xmlString - RSS XML content
 * @returns {Array} Array of parsed blog post objects
 */
function parseRSSFeed(xmlString) {
  try {
    // Simple XML parser for RSS - in production, consider using a proper XML library
    const items = [];

    // Extract channel items using regex (basic approach for Wix environment)
    const itemMatches = xmlString.match(/<item[^>]*>[\s\S]*?<\/item>/gi);

    if (!itemMatches) {
      console.warn('No RSS items found in feed');
      return [];
    }

    itemMatches.forEach((itemXml, index) => {
      try {
        // Extract basic fields using regex
        const title = extractXMLField(itemXml, 'title');
        const description = extractXMLField(itemXml, 'description');
        const link = extractXMLField(itemXml, 'link');
        const pubDate = extractXMLField(itemXml, 'pubDate');
        const guid = extractXMLField(itemXml, 'guid');

        // Extract categories/tags
        const categoryMatches = itemXml.match(/<category[^>]*>(.*?)<\/category>/gi) || [];
        const tags = categoryMatches.map(cat =>
          cat.replace(/<\/?category[^>]*>/gi, '').trim()
        ).filter(tag => tag.length > 0);

        // Clean description (remove HTML tags for summary)
        const summary = description
          ? description.replace(/<[^>]*>/g, '').trim().substring(0, 300)
          : '';

        if (title && link) {
          items.push({
            title: title.trim(),
            summary: summary,
            canonicalURL: link.trim(),
            tags: tags,
            publishedAt: pubDate ? new Date(pubDate) : new Date(),
            externalId: guid || link, // Use GUID or link as unique identifier
            source: 'substack',
            author: 'FHIR IQ', // Default author
            status: 'published'
          });
        }
      } catch (error) {
        console.error(`Error parsing RSS item ${index}:`, error);
      }
    });

    return items;
  } catch (error) {
    console.error('Error parsing RSS feed:', error);
    return [];
  }
}

/**
 * Extract field value from XML string
 * @param {string} xml - XML content
 * @param {string} fieldName - Field name to extract
 * @returns {string} Extracted field value
 */
function extractXMLField(xml, fieldName) {
  const regex = new RegExp(`<${fieldName}[^>]*>([\\s\\S]*?)<\\/${fieldName}>`, 'i');
  const match = xml.match(regex);
  return match ? match[1].trim() : '';
}

/**
 * Fetch RSS feed from Substack
 * @param {string} rssUrl - RSS feed URL
 * @returns {Promise<string>} RSS XML content
 */
async function fetchRSSFeed(rssUrl = SUBSTACK_RSS_URL) {
  try {
    console.log(`Fetching RSS feed from: ${rssUrl}`);

    const response = await fetch(rssUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/rss+xml, application/xml, text/xml',
        'User-Agent': 'FHIR-IQ-RSS-Sync/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const xmlContent = await response.text();
    console.log('RSS feed fetched successfully');
    return xmlContent;
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    throw error;
  }
}

/**
 * Check if blog post already exists in collection
 * @param {string} externalId - External identifier (GUID or URL)
 * @returns {Promise<Object|null>} Existing blog post or null
 */
async function findExistingPost(externalId) {
  try {
    const results = await wixData.query(COLLECTION_NAME)
      .eq('externalId', externalId)
      .find();

    return results.items.length > 0 ? results.items[0] : null;
  } catch (error) {
    console.error('Error checking existing post:', error);
    return null;
  }
}

/**
 * Insert new blog post into collection
 * @param {Object} postData - Blog post data
 * @returns {Promise<Object>} Inserted blog post
 */
async function insertBlogPost(postData) {
  try {
    const result = await wixData.insert(COLLECTION_NAME, {
      ...postData,
      _id: undefined, // Let Wix generate ID
      dateCreated: new Date(),
      dateUpdated: new Date()
    });

    console.log(`Inserted new blog post: ${postData.title}`);
    return result;
  } catch (error) {
    console.error('Error inserting blog post:', error);
    throw error;
  }
}

/**
 * Update existing blog post in collection
 * @param {Object} existingPost - Existing blog post
 * @param {Object} newData - New blog post data
 * @returns {Promise<Object>} Updated blog post
 */
async function updateBlogPost(existingPost, newData) {
  try {
    const updatedPost = {
      ...existingPost,
      ...newData,
      dateUpdated: new Date()
    };

    const result = await wixData.update(COLLECTION_NAME, updatedPost);
    console.log(`Updated blog post: ${newData.title}`);
    return result;
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
}

/**
 * Upsert blog posts from RSS data
 * @param {Array} posts - Array of blog post data
 * @returns {Promise<Object>} Sync results summary
 */
async function upsertBlogPosts(posts) {
  const results = {
    inserted: 0,
    updated: 0,
    errors: 0,
    total: posts.length
  };

  for (const post of posts) {
    try {
      const existingPost = await findExistingPost(post.externalId);

      if (existingPost) {
        // Check if update is needed (compare titles, summaries, etc.)
        const needsUpdate =
          existingPost.title !== post.title ||
          existingPost.summary !== post.summary ||
          JSON.stringify(existingPost.tags) !== JSON.stringify(post.tags);

        if (needsUpdate) {
          await updateBlogPost(existingPost, post);
          results.updated++;
        }
      } else {
        await insertBlogPost(post);
        results.inserted++;
      }
    } catch (error) {
      console.error(`Error processing post "${post.title}":`, error);
      results.errors++;
    }
  }

  return results;
}

/**
 * Main sync function - fetches RSS and syncs with collection
 * @param {string} customRssUrl - Custom RSS URL (optional)
 * @returns {Promise<Object>} Sync results
 */
export async function syncBlogPosts(customRssUrl = null) {
  const startTime = new Date();
  console.log('Starting blog RSS sync...');

  try {
    // Fetch RSS feed
    const rssUrl = customRssUrl || SUBSTACK_RSS_URL;
    const xmlContent = await fetchRSSFeed(rssUrl);

    // Parse RSS content
    const posts = parseRSSFeed(xmlContent);
    console.log(`Parsed ${posts.length} blog posts from RSS feed`);

    if (posts.length === 0) {
      return {
        success: true,
        message: 'No blog posts found in RSS feed',
        results: { inserted: 0, updated: 0, errors: 0, total: 0 },
        duration: new Date() - startTime
      };
    }

    // Upsert posts to collection
    const results = await upsertBlogPosts(posts);

    const endTime = new Date();
    const duration = endTime - startTime;

    console.log('Blog sync completed:', results);

    return {
      success: true,
      message: `Sync completed: ${results.inserted} inserted, ${results.updated} updated, ${results.errors} errors`,
      results: results,
      duration: duration,
      timestamp: endTime
    };
  } catch (error) {
    console.error('Blog sync failed:', error);

    return {
      success: false,
      message: `Sync failed: ${error.message}`,
      error: error.toString(),
      duration: new Date() - startTime,
      timestamp: new Date()
    };
  }
}

/**
 * Get sync status and recent posts
 * @returns {Promise<Object>} Status information
 */
export async function getBlogSyncStatus() {
  try {
    const recentPosts = await wixData.query(COLLECTION_NAME)
      .eq('source', 'substack')
      .descending('dateUpdated')
      .limit(5)
      .find();

    const totalPosts = await wixData.query(COLLECTION_NAME)
      .eq('source', 'substack')
      .count();

    return {
      success: true,
      totalPosts: totalPosts,
      recentPosts: recentPosts.items,
      lastSync: recentPosts.items.length > 0 ? recentPosts.items[0].dateUpdated : null
    };
  } catch (error) {
    console.error('Error getting blog sync status:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Manual sync trigger for testing/admin use
 * Can be called from Wix Dashboard or HTTP function
 */
export async function triggerManualSync() {
  console.log('Manual blog sync triggered');
  return await syncBlogPosts();
}

// Wix Jobs Integration Example (requires Wix Premium plan with Jobs enabled):
//
// export async function scheduledBlogSync(jobContext) {
//   console.log('Scheduled blog sync started via Wix Jobs');
//
//   try {
//     const result = await syncBlogPosts();
//
//     // Log result to Wix site events for monitoring
//     console.log('Scheduled sync result:', result);
//
//     return result;
//   } catch (error) {
//     console.error('Scheduled sync error:', error);
//
//     // Consider sending email notification on failure
//     // await sendNotificationEmail('Blog sync failed', error.toString());
//
//     throw error;
//   }
// }
//
// To schedule this function:
// 1. Go to Wix Dashboard > Settings > Jobs
// 2. Create new job with function name: "scheduledBlogSync"
// 3. Set schedule (e.g., daily at 6 AM)
// 4. Enable job
//
// Alternative: Use Wix Automation or external cron service to call HTTP function