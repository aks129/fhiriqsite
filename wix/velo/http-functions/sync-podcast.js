/**
 * HTTP Function: Podcast RSS Sync
 * @module http-functions/sync-podcast
 *
 * Endpoint for triggering podcast RSS synchronization via HTTP request
 * Useful for external cron services, CI/CD pipelines, or manual triggers
 */

import { ok, badRequest, serverError, forbidden } from 'wix-http-functions';
import { syncPodcastEpisodes } from 'backend/sync/podcast';

/**
 * POST endpoint to trigger podcast RSS sync
 * @param {Object} request - HTTP request object
 * @returns {Promise<Object>} HTTP response
 *
 * Usage:
 * POST https://your-site.wixsite.com/_functions/sync-podcast
 * Headers:
 *   Authorization: Bearer YOUR_SECRET_TOKEN
 *   Content-Type: application/json
 * Body: { "rssUrl": "optional-custom-rss-url" }
 */
export async function post_syncPodcast(request) {
  const startTime = new Date();

  try {
    // Authentication (optional but recommended)
    const authHeader = request.headers['authorization'];
    const expectedToken = 'Bearer YOUR_SECRET_TOKEN'; // Replace with actual secret

    if (authHeader !== expectedToken) {
      console.warn('Unauthorized podcast sync attempt:', {
        ip: request.ip,
        userAgent: request.headers['user-agent'],
        timestamp: startTime
      });

      return forbidden({
        body: JSON.stringify({
          error: 'Unauthorized',
          message: 'Valid authorization token required'
        }),
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Parse request body for custom RSS URL
    let customRssUrl = null;
    try {
      if (request.body) {
        const body = JSON.parse(request.body);
        customRssUrl = body.rssUrl;
      }
    } catch (parseError) {
      // Ignore parse errors for body - custom URL is optional
      console.log('No valid JSON body provided, using default RSS URL');
    }

    // Log sync initiation
    console.log('HTTP podcast sync triggered:', {
      timestamp: startTime,
      customRssUrl: customRssUrl || 'default',
      ip: request.ip,
      userAgent: request.headers['user-agent']
    });

    // Execute sync
    const result = await syncPodcastEpisodes(customRssUrl);

    // Log completion
    const endTime = new Date();
    console.log('HTTP podcast sync completed:', {
      ...result,
      httpDuration: endTime - startTime,
      timestamp: endTime
    });

    // Return success response
    return ok({
      body: JSON.stringify({
        ...result,
        endpoint: 'sync-podcast',
        triggered: 'http',
        httpDuration: endTime - startTime
      }),
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });

  } catch (error) {
    const endTime = new Date();

    console.error('HTTP podcast sync error:', {
      error: error.message,
      stack: error.stack,
      duration: endTime - startTime,
      timestamp: endTime
    });

    return serverError({
      body: JSON.stringify({
        success: false,
        error: 'Internal server error',
        message: 'Podcast sync failed. Check server logs for details.',
        endpoint: 'sync-podcast',
        triggered: 'http',
        duration: endTime - startTime,
        timestamp: endTime
      }),
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

/**
 * GET endpoint for sync status and health check
 * @param {Object} request - HTTP request object
 * @returns {Promise<Object>} HTTP response with sync status
 *
 * Usage:
 * GET https://your-site.wixsite.com/_functions/sync-podcast
 */
export async function get_syncPodcast(request) {
  try {
    // Import status function
    const { getPodcastSyncStatus } = await import('backend/sync/podcast');

    const status = await getPodcastSyncStatus();

    return ok({
      body: JSON.stringify({
        endpoint: 'sync-podcast',
        status: 'healthy',
        ...status,
        timestamp: new Date()
      }),
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });

  } catch (error) {
    console.error('Podcast sync status error:', error);

    return serverError({
      body: JSON.stringify({
        endpoint: 'sync-podcast',
        status: 'error',
        error: error.message,
        timestamp: new Date()
      }),
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

/**
 * OPTIONS endpoint for CORS support
 * @param {Object} request - HTTP request object
 * @returns {Object} HTTP response with CORS headers
 */
export function options_syncPodcast(request) {
  return ok({
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
}