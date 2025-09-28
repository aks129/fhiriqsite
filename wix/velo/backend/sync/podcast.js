/**
 * Podcast RSS Sync Module
 * @module backend/sync/podcast
 *
 * Fetches podcast RSS feed and synchronizes with PodcastEpisodes collection
 * Stores metadata only - links to canonical URLs and audio files
 */

import { fetch } from 'wix-fetch';
import wixData from 'wix-data';

// Configuration
const PODCAST_RSS_URL = 'https://feeds.buzzsprout.com/your-podcast-id.rss'; // Update with actual podcast RSS URL
const COLLECTION_NAME = 'PodcastEpisodes';

/**
 * Parse podcast RSS XML to extract episode data
 * @param {string} xmlString - RSS XML content
 * @returns {Array} Array of parsed podcast episode objects
 */
function parsePodcastRSS(xmlString) {
  try {
    const episodes = [];

    // Extract channel metadata
    const channelTitle = extractXMLField(xmlString, 'title');
    const channelDescription = extractXMLField(xmlString, 'description');

    // Extract episode items
    const itemMatches = xmlString.match(/<item[^>]*>[\s\S]*?<\/item>/gi);

    if (!itemMatches) {
      console.warn('No podcast episodes found in RSS feed');
      return [];
    }

    itemMatches.forEach((itemXml, index) => {
      try {
        // Basic episode data
        const title = extractXMLField(itemXml, 'title');
        const description = extractXMLField(itemXml, 'description');
        const link = extractXMLField(itemXml, 'link');
        const pubDate = extractXMLField(itemXml, 'pubDate');
        const guid = extractXMLField(itemXml, 'guid');

        // Podcast-specific fields
        const audioUrl = extractEnclosureUrl(itemXml);
        const duration = extractXMLField(itemXml, 'itunes:duration') || extractXMLField(itemXml, 'duration');
        const episodeNumber = extractXMLField(itemXml, 'itunes:episode');
        const seasonNumber = extractXMLField(itemXml, 'itunes:season');
        const episodeType = extractXMLField(itemXml, 'itunes:episodeType') || 'full';

        // Extract guest information from description or title
        const guests = extractGuestNames(title, description);

        // Extract categories/tags
        const categoryMatches = itemXml.match(/<category[^>]*>(.*?)<\/category>/gi) || [];
        const itunesCategories = itemXml.match(/<itunes:category[^>]*text="([^"]+)"/gi) || [];

        const tags = [
          ...categoryMatches.map(cat => cat.replace(/<\/?category[^>]*>/gi, '').trim()),
          ...itunesCategories.map(cat => {
            const match = cat.match(/text="([^"]+)"/);
            return match ? match[1] : '';
          })
        ].filter(tag => tag.length > 0);

        // Clean description for summary (remove HTML)
        const summary = description
          ? description.replace(/<[^>]*>/g, '').trim().substring(0, 500)
          : '';

        // Parse duration to seconds
        const durationSeconds = parseDuration(duration);

        if (title && (audioUrl || link)) {
          episodes.push({
            title: title.trim(),
            summary: summary,
            canonicalURL: link ? link.trim() : audioUrl,
            audioURL: audioUrl,
            tags: tags,
            publishedAt: pubDate ? new Date(pubDate) : new Date(),
            externalId: guid || link || audioUrl,
            source: 'rss',
            duration: durationSeconds,
            episodeNumber: episodeNumber ? parseInt(episodeNumber) : null,
            seasonNumber: seasonNumber ? parseInt(seasonNumber) : null,
            episodeType: episodeType,
            guests: guests,
            showTitle: channelTitle,
            status: 'published'
          });
        }
      } catch (error) {
        console.error(`Error parsing podcast episode ${index}:`, error);
      }
    });

    return episodes;
  } catch (error) {
    console.error('Error parsing podcast RSS feed:', error);
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
 * Extract audio URL from enclosure tag
 * @param {string} itemXml - Episode XML content
 * @returns {string} Audio file URL
 */
function extractEnclosureUrl(itemXml) {
  const enclosureMatch = itemXml.match(/<enclosure[^>]+url="([^"]+)"[^>]*>/i);
  return enclosureMatch ? enclosureMatch[1] : '';
}

/**
 * Extract guest names from title or description
 * @param {string} title - Episode title
 * @param {string} description - Episode description
 * @returns {Array} Array of guest names
 */
function extractGuestNames(title, description) {
  const guests = [];
  const text = `${title} ${description}`.toLowerCase();

  // Common patterns for guest mentions
  const patterns = [
    /with\s+([A-Z][a-z]+\s+[A-Z][a-z]+)/g,
    /guest:?\s*([A-Z][a-z]+\s+[A-Z][a-z]+)/g,
    /featuring\s+([A-Z][a-z]+\s+[A-Z][a-z]+)/g,
    /interview\s+with\s+([A-Z][a-z]+\s+[A-Z][a-z]+)/g
  ];

  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(title + ' ' + description)) !== null) {
      const guestName = match[1].trim();
      if (!guests.includes(guestName)) {
        guests.push(guestName);
      }
    }
  });

  return guests;
}

/**
 * Parse duration string to seconds
 * @param {string} durationStr - Duration in various formats
 * @returns {number} Duration in seconds
 */
function parseDuration(durationStr) {
  if (!durationStr) return null;

  // Handle HH:MM:SS or MM:SS format
  const timeParts = durationStr.split(':').map(part => parseInt(part) || 0);

  if (timeParts.length === 3) {
    // HH:MM:SS
    return timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2];
  } else if (timeParts.length === 2) {
    // MM:SS
    return timeParts[0] * 60 + timeParts[1];
  } else if (timeParts.length === 1) {
    // Just seconds
    return timeParts[0];
  }

  return null;
}

/**
 * Fetch podcast RSS feed
 * @param {string} rssUrl - RSS feed URL
 * @returns {Promise<string>} RSS XML content
 */
async function fetchPodcastRSS(rssUrl = PODCAST_RSS_URL) {
  try {
    console.log(`Fetching podcast RSS feed from: ${rssUrl}`);

    const response = await fetch(rssUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/rss+xml, application/xml, text/xml',
        'User-Agent': 'FHIR-IQ-Podcast-Sync/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const xmlContent = await response.text();
    console.log('Podcast RSS feed fetched successfully');
    return xmlContent;
  } catch (error) {
    console.error('Error fetching podcast RSS feed:', error);
    throw error;
  }
}

/**
 * Check if podcast episode already exists in collection
 * @param {string} externalId - External identifier (GUID or URL)
 * @returns {Promise<Object|null>} Existing episode or null
 */
async function findExistingEpisode(externalId) {
  try {
    const results = await wixData.query(COLLECTION_NAME)
      .eq('externalId', externalId)
      .find();

    return results.items.length > 0 ? results.items[0] : null;
  } catch (error) {
    console.error('Error checking existing episode:', error);
    return null;
  }
}

/**
 * Insert new podcast episode into collection
 * @param {Object} episodeData - Episode data
 * @returns {Promise<Object>} Inserted episode
 */
async function insertPodcastEpisode(episodeData) {
  try {
    const result = await wixData.insert(COLLECTION_NAME, {
      ...episodeData,
      _id: undefined, // Let Wix generate ID
      dateCreated: new Date(),
      dateUpdated: new Date()
    });

    console.log(`Inserted new podcast episode: ${episodeData.title}`);
    return result;
  } catch (error) {
    console.error('Error inserting podcast episode:', error);
    throw error;
  }
}

/**
 * Update existing podcast episode in collection
 * @param {Object} existingEpisode - Existing episode
 * @param {Object} newData - New episode data
 * @returns {Promise<Object>} Updated episode
 */
async function updatePodcastEpisode(existingEpisode, newData) {
  try {
    const updatedEpisode = {
      ...existingEpisode,
      ...newData,
      dateUpdated: new Date()
    };

    const result = await wixData.update(COLLECTION_NAME, updatedEpisode);
    console.log(`Updated podcast episode: ${newData.title}`);
    return result;
  } catch (error) {
    console.error('Error updating podcast episode:', error);
    throw error;
  }
}

/**
 * Upsert podcast episodes from RSS data
 * @param {Array} episodes - Array of episode data
 * @returns {Promise<Object>} Sync results summary
 */
async function upsertPodcastEpisodes(episodes) {
  const results = {
    inserted: 0,
    updated: 0,
    errors: 0,
    total: episodes.length
  };

  for (const episode of episodes) {
    try {
      const existingEpisode = await findExistingEpisode(episode.externalId);

      if (existingEpisode) {
        // Check if update is needed
        const needsUpdate =
          existingEpisode.title !== episode.title ||
          existingEpisode.summary !== episode.summary ||
          existingEpisode.audioURL !== episode.audioURL ||
          JSON.stringify(existingEpisode.tags) !== JSON.stringify(episode.tags);

        if (needsUpdate) {
          await updatePodcastEpisode(existingEpisode, episode);
          results.updated++;
        }
      } else {
        await insertPodcastEpisode(episode);
        results.inserted++;
      }
    } catch (error) {
      console.error(`Error processing episode "${episode.title}":`, error);
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
export async function syncPodcastEpisodes(customRssUrl = null) {
  const startTime = new Date();
  console.log('Starting podcast RSS sync...');

  try {
    // Fetch RSS feed
    const rssUrl = customRssUrl || PODCAST_RSS_URL;
    const xmlContent = await fetchPodcastRSS(rssUrl);

    // Parse RSS content
    const episodes = parsePodcastRSS(xmlContent);
    console.log(`Parsed ${episodes.length} podcast episodes from RSS feed`);

    if (episodes.length === 0) {
      return {
        success: true,
        message: 'No podcast episodes found in RSS feed',
        results: { inserted: 0, updated: 0, errors: 0, total: 0 },
        duration: new Date() - startTime
      };
    }

    // Upsert episodes to collection
    const results = await upsertPodcastEpisodes(episodes);

    const endTime = new Date();
    const duration = endTime - startTime;

    console.log('Podcast sync completed:', results);

    return {
      success: true,
      message: `Sync completed: ${results.inserted} inserted, ${results.updated} updated, ${results.errors} errors`,
      results: results,
      duration: duration,
      timestamp: endTime
    };
  } catch (error) {
    console.error('Podcast sync failed:', error);

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
 * Get sync status and recent episodes
 * @returns {Promise<Object>} Status information
 */
export async function getPodcastSyncStatus() {
  try {
    const recentEpisodes = await wixData.query(COLLECTION_NAME)
      .eq('source', 'rss')
      .descending('dateUpdated')
      .limit(5)
      .find();

    const totalEpisodes = await wixData.query(COLLECTION_NAME)
      .eq('source', 'rss')
      .count();

    return {
      success: true,
      totalEpisodes: totalEpisodes,
      recentEpisodes: recentEpisodes.items,
      lastSync: recentEpisodes.items.length > 0 ? recentEpisodes.items[0].dateUpdated : null
    };
  } catch (error) {
    console.error('Error getting podcast sync status:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Manual sync trigger for testing/admin use
 */
export async function triggerManualPodcastSync() {
  console.log('Manual podcast sync triggered');
  return await syncPodcastEpisodes();
}

// Wix Jobs Integration Example (requires Wix Premium plan with Jobs enabled):
//
// export async function scheduledPodcastSync(jobContext) {
//   console.log('Scheduled podcast sync started via Wix Jobs');
//
//   try {
//     const result = await syncPodcastEpisodes();
//
//     // Log result to Wix site events for monitoring
//     console.log('Scheduled podcast sync result:', result);
//
//     return result;
//   } catch (error) {
//     console.error('Scheduled podcast sync error:', error);
//
//     // Consider sending email notification on failure
//     // await sendNotificationEmail('Podcast sync failed', error.toString());
//
//     throw error;
//   }
// }
//
// SCHEDULING OPTIONS:
//
// 1. Wix Jobs (Premium Plan Required):
//    - Go to Wix Dashboard > Settings > Jobs
//    - Create new job with function name: "scheduledPodcastSync"
//    - Set schedule (e.g., daily at 7 AM)
//    - Enable job
//
// 2. Manual Dashboard Trigger:
//    - Create admin page with buttons to trigger sync
//    - Call triggerManualPodcastSync() from frontend
//
// 3. External Cron Service:
//    - Set up HTTP function endpoint
//    - Use external service (GitHub Actions, Heroku Scheduler, etc.)
//    - Make HTTP request to trigger sync
//
// 4. Wix Automation (if available):
//    - Use Wix Automations to trigger on schedule
//    - Connect to custom code action