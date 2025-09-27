import { Permissions } from 'wix-web-module';
import { v4 as uuidv4 } from 'uuid';

/**
 * Data hooks for FHIR IQ collections
 * These hooks are automatically triggered by Wix Data operations
 */

// Products collection hooks
export const Products_beforeInsert = async (item, context) => {
  // Set creation timestamp
  item.createdAt = new Date();
  item.lastModified = new Date();

  // Ensure required fields have defaults
  if (typeof item.available === 'undefined') {
    item.available = true;
  }

  if (typeof item.digital === 'undefined') {
    item.digital = true;
  }

  if (!item.features) {
    item.features = [];
  }

  // Initialize analytics fields
  item.viewCount = 0;
  item.purchaseCount = 0;

  return item;
};

export const Products_beforeUpdate = async (item, context) => {
  // Update last modified timestamp
  item.lastModified = new Date();

  return item;
};

export const Products_afterQuery = async (results, context) => {
  // Filter out unavailable products for non-admin users
  if (context.userRole !== 'Admin') {
    results.items = results.items.filter(item => item.available !== false);
  }

  return results;
};

// Licenses collection hooks
export const Licenses_beforeInsert = async (item, context) => {
  // Set creation timestamp
  item.createdAt = new Date();

  // Set default status if not provided
  if (!item.status) {
    item.status = 'active';
  }

  // Generate license key if not provided
  if (!item.licenseKey) {
    item.licenseKey = generateLicenseKey(item.productSku || 'GENERAL');
  }

  // Initialize usage tracking
  if (typeof item.currentUsers === 'undefined') {
    item.currentUsers = 0;
  }

  if (typeof item.accessCount === 'undefined') {
    item.accessCount = 0;
  }

  if (!item.ipAddresses) {
    item.ipAddresses = [];
  }

  if (!item.userAgents) {
    item.userAgents = [];
  }

  // Set expiration date if not provided
  if (!item.expiresAt && item.term) {
    item.expiresAt = calculateExpirationDate(item.term);
  }

  return item;
};

export const Licenses_beforeUpdate = async (item, context) => {
  // Update last modified timestamp
  item.lastModified = new Date();

  // Prevent status changes to expired licenses unless by admin
  if (item.status === 'expired' && context.userRole !== 'Admin') {
    throw new Error('Cannot modify expired license');
  }

  return item;
};

export const Licenses_beforeQuery = async (query, context) => {
  // Restrict license access to owners and admins
  if (context.userRole === 'Admin') {
    // Admins can see all licenses
    return query;
  }

  if (context.currentUser && context.currentUser.email) {
    // Users can only see their own licenses
    query = query.eq('customerEmail', context.currentUser.email);
  } else {
    // Anonymous users can't see any licenses
    query = query.eq('_id', 'no-access');
  }

  return query;
};

// Blog Posts collection hooks
export const BlogPosts_beforeInsert = async (item, context) => {
  // Set creation timestamp
  item.createdAt = new Date();
  item.lastModified = new Date();

  // Set default values
  if (typeof item.published === 'undefined') {
    item.published = false;
  }

  if (typeof item.featured === 'undefined') {
    item.featured = false;
  }

  // Initialize analytics
  item.viewCount = 0;
  item.shareCount = 0;

  // Set publication date if published
  if (item.published && !item.publishedDate) {
    item.publishedDate = new Date();
  }

  // Generate URL slug if not provided
  if (!item.slug && item.title) {
    item.slug = generateSlug(item.title);
  }

  return item;
};

export const BlogPosts_beforeUpdate = async (item, context) => {
  // Update last modified timestamp
  item.lastModified = new Date();

  // Set publication date when first published
  if (item.published && !item.publishedDate) {
    item.publishedDate = new Date();
  }

  // Update slug if title changed
  if (item.title && !item.slug) {
    item.slug = generateSlug(item.title);
  }

  return item;
};

export const BlogPosts_afterQuery = async (results, context) => {
  // Filter unpublished posts for non-admin users
  if (context.userRole !== 'Admin') {
    results.items = results.items.filter(item => item.published === true);
  }

  return results;
};

// Podcast Episodes collection hooks
export const PodcastEpisodes_beforeInsert = async (item, context) => {
  // Set creation timestamp
  item.createdAt = new Date();
  item.lastModified = new Date();

  // Set default values
  if (typeof item.published === 'undefined') {
    item.published = false;
  }

  // Initialize analytics
  item.playCount = 0;
  item.downloadCount = 0;

  // Set publication date if published
  if (item.published && !item.publishedDate) {
    item.publishedDate = new Date();
  }

  // Generate episode number if not provided
  if (!item.episodeNumber) {
    item.episodeNumber = await getNextEpisodeNumber();
  }

  // Generate URL slug if not provided
  if (!item.slug && item.title) {
    item.slug = generateSlug(item.title);
  }

  return item;
};

export const PodcastEpisodes_beforeUpdate = async (item, context) => {
  // Update last modified timestamp
  item.lastModified = new Date();

  // Set publication date when first published
  if (item.published && !item.publishedDate) {
    item.publishedDate = new Date();
  }

  return item;
};

export const PodcastEpisodes_afterQuery = async (results, context) => {
  // Filter unpublished episodes for non-admin users
  if (context.userRole !== 'Admin') {
    results.items = results.items.filter(item => item.published === true);
  }

  return results;
};

// User interactions tracking hooks
export const UserInteractions_beforeInsert = async (item, context) => {
  // Set timestamp
  item.timestamp = new Date();

  // Add user context if available
  if (context.currentUser) {
    item.userId = context.currentUser.id;
    item.userEmail = context.currentUser.email;
  }

  // Add session information
  item.sessionId = context.sessionId || generateSessionId();

  return item;
};

// Helper functions
function generateLicenseKey(productSku) {
  const prefix = productSku.split('-')[0] || 'FHIR';
  const uuid = uuidv4().substring(0, 8).toUpperCase();
  return `${prefix}-${uuid}`;
}

function calculateExpirationDate(term) {
  const now = new Date();
  const expirationDate = new Date(now);

  switch (term) {
    case 'annual':
      expirationDate.setFullYear(now.getFullYear() + 1);
      break;
    case 'monthly':
      expirationDate.setMonth(now.getMonth() + 1);
      break;
    case 'single_seat':
    case 'single_day':
    case 'hours_block':
    case 'team_package':
      // For single-use items, set expiration to 1 year
      expirationDate.setFullYear(now.getFullYear() + 1);
      break;
    default:
      // Default to 1 year
      expirationDate.setFullYear(now.getFullYear() + 1);
  }

  return expirationDate;
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
}

function generateSessionId() {
  return 'session_' + Math.random().toString(36).substr(2, 9);
}

async function getNextEpisodeNumber() {
  try {
    // This would require importing wixData, but we can't in hooks
    // Instead, let the frontend handle episode numbering
    return 1;
  } catch (error) {
    console.error('Error getting next episode number:', error);
    return 1;
  }
}

// Web methods for frontend access
export const validateLicenseKey = async (licenseKey) => {
  try {
    const results = await wixData.query('Licenses')
      .eq('licenseKey', licenseKey)
      .eq('status', 'active')
      .find();

    if (results.items.length === 0) {
      return { valid: false, message: 'Invalid or inactive license key' };
    }

    const license = results.items[0];

    // Check expiration
    if (new Date() > new Date(license.expiresAt)) {
      return { valid: false, message: 'License has expired' };
    }

    return {
      valid: true,
      license: {
        productName: license.productName,
        edition: license.edition,
        expiresAt: license.expiresAt,
        features: license.features
      }
    };

  } catch (error) {
    console.error('License validation error:', error);
    return { valid: false, message: 'Validation failed' };
  }
};

export const incrementViewCount = async (collectionName, itemId) => {
  try {
    const item = await wixData.get(collectionName, itemId);

    await wixData.update(collectionName, {
      ...item,
      viewCount: (item.viewCount || 0) + 1,
      lastViewed: new Date()
    });

    return { success: true };

  } catch (error) {
    console.error('Error incrementing view count:', error);
    return { success: false, error: error.message };
  }
};