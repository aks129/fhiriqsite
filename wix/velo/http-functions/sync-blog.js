/**
 * HTTP Function: Blog RSS Sync
 * @module http-functions/sync-blog
 *
 * Endpoint for triggering blog RSS synchronization via HTTP request
 * Useful for external cron services, CI/CD pipelines, or manual triggers
 */

import { ok, badRequest, serverError, forbidden } from 'wix-http-functions';
import { syncBlogPosts } from 'backend/sync/blog';

/**
 * POST endpoint to trigger blog RSS sync
 * @param {Object} request - HTTP request object
 * @returns {Promise<Object>} HTTP response
 *
 * Usage:
 * POST https://your-site.wixsite.com/_functions/sync-blog
 * Headers:
 *   Authorization: Bearer YOUR_SECRET_TOKEN
 *   Content-Type: application/json
 * Body: { "rssUrl": "optional-custom-rss-url" }
 */
export async function post_syncBlog(request) {
  const startTime = new Date();

  try {
    // Authentication (optional but recommended)
    const authHeader = request.headers['authorization'];
    const expectedToken = 'Bearer YOUR_SECRET_TOKEN'; // Replace with actual secret

    if (authHeader !== expectedToken) {
      console.warn('Unauthorized blog sync attempt:', {
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
    console.log('HTTP blog sync triggered:', {
      timestamp: startTime,
      customRssUrl: customRssUrl || 'default',
      ip: request.ip,
      userAgent: request.headers['user-agent']
    });

    // Execute sync
    const result = await syncBlogPosts(customRssUrl);

    // Log completion
    const endTime = new Date();
    console.log('HTTP blog sync completed:', {
      ...result,
      httpDuration: endTime - startTime,
      timestamp: endTime
    });

    // Return success response
    return ok({
      body: JSON.stringify({
        ...result,
        endpoint: 'sync-blog',
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

    console.error('HTTP blog sync error:', {
      error: error.message,
      stack: error.stack,
      duration: endTime - startTime,
      timestamp: endTime
    });

    return serverError({
      body: JSON.stringify({
        success: false,
        error: 'Internal server error',
        message: 'Blog sync failed. Check server logs for details.',
        endpoint: 'sync-blog',
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
 * GET https://your-site.wixsite.com/_functions/sync-blog
 */
export async function get_syncBlog(request) {
  try {
    // Import status function
    const { getBlogSyncStatus } = await import('backend/sync/blog');

    const status = await getBlogSyncStatus();

    return ok({
      body: JSON.stringify({
        endpoint: 'sync-blog',
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
    console.error('Blog sync status error:', error);

    return serverError({
      body: JSON.stringify({
        endpoint: 'sync-blog',
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
export function options_syncBlog(request) {
  return ok({
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
}