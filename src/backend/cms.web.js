/**
 * CMS Web Module - Wix Velo Backend
 *
 * Handles CMS data operations for blog posts, case studies, tools, etc.
 * This file lives in /backend/cms.web.js in Wix Studio
 *
 * @fileoverview Backend web module for CMS operations
 */

import { webMethod } from 'wix-web-module';
import wixData from 'wix-data';

/**
 * Get blog posts with optional filtering and pagination
 * @param {Object} options - Query options
 * @param {string} options.category - Category slug to filter by
 * @param {number} options.limit - Number of posts to return (default: 10)
 * @param {number} options.skip - Number of posts to skip (default: 0)
 * @param {boolean} options.featured - Only featured posts
 * @returns {Promise<Object>} Blog posts with pagination info
 */
export const getBlogPosts = webMethod(async (options = {}) => {
  try {
    const { category, limit = 10, skip = 0, featured } = options;

    let query = wixData.query('BlogPosts')
      .eq('_status', 'published')
      .descending('publishedDate')
      .limit(limit)
      .skip(skip);

    if (category) {
      // Filter by category reference
      const categoryData = await wixData.query('BlogCategories')
        .eq('slug', category)
        .find();

      if (categoryData.items.length > 0) {
        query = query.hasAll('categories', [categoryData.items[0]._id]);
      }
    }

    if (featured) {
      query = query.eq('featured', true);
    }

    const result = await query.find();

    // Get total count for pagination
    const totalQuery = wixData.query('BlogPosts')
      .eq('_status', 'published');

    if (category) {
      const categoryData = await wixData.query('BlogCategories')
        .eq('slug', category)
        .find();
      if (categoryData.items.length > 0) {
        totalQuery.hasAll('categories', [categoryData.items[0]._id]);
      }
    }

    const totalCount = await totalQuery.count();

    return {
      items: result.items,
      totalCount,
      hasNext: result.hasNext(),
      currentPage: Math.floor(skip / limit) + 1,
      totalPages: Math.ceil(totalCount / limit)
    };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw new Error('Failed to fetch blog posts');
  }
});

/**
 * Get single blog post by slug
 * @param {string} slug - Blog post slug
 * @returns {Promise<Object>} Blog post data
 */
export const getBlogPost = webMethod(async (slug) => {
  try {
    const result = await wixData.query('BlogPosts')
      .eq('slug', slug)
      .eq('_status', 'published')
      .include('categories')
      .find();

    if (result.items.length === 0) {
      throw new Error('Blog post not found');
    }

    return result.items[0];
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw new Error('Failed to fetch blog post');
  }
});

/**
 * Get case studies with optional filtering
 * @param {Object} options - Query options
 * @param {number} options.limit - Number of case studies to return
 * @param {boolean} options.featured - Only featured case studies
 * @returns {Promise<Object>} Case studies data
 */
export const getCaseStudies = webMethod(async (options = {}) => {
  try {
    const { limit = 12, featured } = options;

    let query = wixData.query('CaseStudies')
      .eq('_status', 'published')
      .descending('publishedDate')
      .limit(limit);

    if (featured) {
      query = query.eq('featured', true);
    }

    const result = await query.find();

    return {
      items: result.items,
      hasNext: result.hasNext()
    };
  } catch (error) {
    console.error('Error fetching case studies:', error);
    throw new Error('Failed to fetch case studies');
  }
});

/**
 * Get single case study by slug
 * @param {string} slug - Case study slug
 * @returns {Promise<Object>} Case study data
 */
export const getCaseStudy = webMethod(async (slug) => {
  try {
    const result = await wixData.query('CaseStudies')
      .eq('slug', slug)
      .eq('_status', 'published')
      .find();

    if (result.items.length === 0) {
      throw new Error('Case study not found');
    }

    return result.items[0];
  } catch (error) {
    console.error('Error fetching case study:', error);
    throw new Error('Failed to fetch case study');
  }
});

/**
 * Get tools catalog with filtering
 * @param {Object} options - Query options
 * @param {string} options.category - Category to filter by
 * @param {string} options.status - Tool status filter
 * @param {boolean} options.featured - Only featured tools
 * @returns {Promise<Object>} Tools data
 */
export const getTools = webMethod(async (options = {}) => {
  try {
    const { category, status = 'Active', featured } = options;

    let query = wixData.query('Tools')
      .eq('_status', 'published')
      .eq('status', status)
      .ascending('name');

    if (category) {
      const categoryData = await wixData.query('ToolCategories')
        .eq('slug', category)
        .find();

      if (categoryData.items.length > 0) {
        query = query.eq('category', categoryData.items[0]._id);
      }
    }

    if (featured) {
      query = query.eq('featured', true);
    }

    const result = await query.find();

    return {
      items: result.items,
      hasNext: result.hasNext()
    };
  } catch (error) {
    console.error('Error fetching tools:', error);
    throw new Error('Failed to fetch tools');
  }
});

/**
 * Get podcast episodes with pagination
 * @param {Object} options - Query options
 * @param {number} options.limit - Number of episodes to return
 * @param {number} options.skip - Number of episodes to skip
 * @returns {Promise<Object>} Podcast episodes data
 */
export const getPodcastEpisodes = webMethod(async (options = {}) => {
  try {
    const { limit = 10, skip = 0 } = options;

    const result = await wixData.query('PodcastEpisodes')
      .eq('_status', 'published')
      .descending('publishedDate')
      .include('guests')
      .limit(limit)
      .skip(skip)
      .find();

    const totalCount = await wixData.query('PodcastEpisodes')
      .eq('_status', 'published')
      .count();

    return {
      items: result.items,
      totalCount,
      hasNext: result.hasNext(),
      currentPage: Math.floor(skip / limit) + 1,
      totalPages: Math.ceil(totalCount / limit)
    };
  } catch (error) {
    console.error('Error fetching podcast episodes:', error);
    throw new Error('Failed to fetch podcast episodes');
  }
});

/**
 * Get testimonials for display
 * @param {Object} options - Query options
 * @param {boolean} options.featured - Only featured testimonials
 * @param {number} options.limit - Number of testimonials to return
 * @returns {Promise<Object>} Testimonials data
 */
export const getTestimonials = webMethod(async (options = {}) => {
  try {
    const { featured, limit = 6 } = options;

    let query = wixData.query('Testimonials')
      .eq('_status', 'published')
      .descending('dateAdded')
      .limit(limit);

    if (featured) {
      query = query.eq('featured', true);
    }

    const result = await query.find();

    return {
      items: result.items
    };
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    throw new Error('Failed to fetch testimonials');
  }
});

/**
 * Search content across multiple collections
 * @param {string} searchTerm - Search term
 * @param {Object} options - Search options
 * @param {string[]} options.collections - Collections to search (default: all)
 * @param {number} options.limit - Results limit per collection
 * @returns {Promise<Object>} Search results
 */
export const searchContent = webMethod(async (searchTerm, options = {}) => {
  try {
    const { collections = ['BlogPosts', 'CaseStudies', 'Tools'], limit = 5 } = options;
    const results = {};

    // Search blog posts
    if (collections.includes('BlogPosts')) {
      const blogResults = await wixData.query('BlogPosts')
        .eq('_status', 'published')
        .contains('title', searchTerm)
        .or(wixData.query('BlogPosts')
          .contains('excerpt', searchTerm))
        .limit(limit)
        .find();

      results.blogPosts = blogResults.items;
    }

    // Search case studies
    if (collections.includes('CaseStudies')) {
      const caseStudyResults = await wixData.query('CaseStudies')
        .eq('_status', 'published')
        .contains('title', searchTerm)
        .or(wixData.query('CaseStudies')
          .contains('industry', searchTerm))
        .limit(limit)
        .find();

      results.caseStudies = caseStudyResults.items;
    }

    // Search tools
    if (collections.includes('Tools')) {
      const toolResults = await wixData.query('Tools')
        .eq('_status', 'published')
        .contains('name', searchTerm)
        .or(wixData.query('Tools')
          .contains('tagline', searchTerm))
        .limit(limit)
        .find();

      results.tools = toolResults.items;
    }

    return results;
  } catch (error) {
    console.error('Error searching content:', error);
    throw new Error('Failed to search content');
  }
});