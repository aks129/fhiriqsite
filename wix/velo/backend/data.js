import wixData from 'wix-data';

/**
 * Product management functions
 */
export async function getProducts(options = {}) {
  try {
    let query = wixData.query('Products');

    // Apply filters
    if (options.category) {
      query = query.eq('category', options.category);
    }

    if (options.featured) {
      query = query.eq('popular', true);
    }

    if (options.available !== undefined) {
      query = query.eq('available', options.available);
    }

    // Apply sorting
    if (options.sortBy) {
      const direction = options.sortOrder === 'desc' ? 'descending' : 'ascending';
      query = query.ascending(options.sortBy);
    } else {
      query = query.ascending('name');
    }

    // Apply pagination
    if (options.limit) {
      query = query.limit(options.limit);
    }

    if (options.skip) {
      query = query.skip(options.skip);
    }

    const results = await query.find();
    return {
      items: results.items,
      totalCount: results.totalCount,
      hasNext: results.hasNext(),
      hasPrev: results.hasPrev()
    };

  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
}

export async function getProduct(productId) {
  try {
    const product = await wixData.get('Products', productId);
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error(`Failed to fetch product: ${error.message}`);
  }
}

export async function getProductBySku(sku) {
  try {
    const results = await wixData.query('Products')
      .eq('sku', sku)
      .find();

    return results.items.length > 0 ? results.items[0] : null;
  } catch (error) {
    console.error('Error fetching product by SKU:', error);
    throw new Error(`Failed to fetch product by SKU: ${error.message}`);
  }
}

/**
 * License management functions
 */
export async function createLicense(licenseData) {
  try {
    const license = {
      ...licenseData,
      _id: undefined, // Let Wix generate the ID
      createdAt: new Date(),
      status: licenseData.status || 'active'
    };

    const result = await wixData.save('Licenses', license);
    return result;
  } catch (error) {
    console.error('Error creating license:', error);
    throw new Error(`Failed to create license: ${error.message}`);
  }
}

export async function getUserLicenses(userEmail) {
  try {
    const results = await wixData.query('Licenses')
      .eq('customerEmail', userEmail)
      .ascending('createdAt')
      .find();

    return results.items;
  } catch (error) {
    console.error('Error fetching user licenses:', error);
    throw new Error(`Failed to fetch user licenses: ${error.message}`);
  }
}

export async function getLicense(licenseId) {
  try {
    const license = await wixData.get('Licenses', licenseId);
    return license;
  } catch (error) {
    console.error('Error fetching license:', error);
    throw new Error(`Failed to fetch license: ${error.message}`);
  }
}

export async function getLicenseByKey(licenseKey) {
  try {
    const results = await wixData.query('Licenses')
      .eq('licenseKey', licenseKey)
      .find();

    return results.items.length > 0 ? results.items[0] : null;
  } catch (error) {
    console.error('Error fetching license by key:', error);
    throw new Error(`Failed to fetch license by key: ${error.message}`);
  }
}

export async function updateLicense(licenseId, updateData) {
  try {
    const existingLicense = await wixData.get('Licenses', licenseId);

    const updatedLicense = {
      ...existingLicense,
      ...updateData,
      lastModified: new Date()
    };

    const result = await wixData.update('Licenses', updatedLicense);
    return result;
  } catch (error) {
    console.error('Error updating license:', error);
    throw new Error(`Failed to update license: ${error.message}`);
  }
}

/**
 * Blog post management
 */
export async function getBlogPosts(options = {}) {
  try {
    let query = wixData.query('BlogPosts');

    // Filter by published status
    if (options.published !== undefined) {
      query = query.eq('published', options.published);
    }

    // Filter by featured status
    if (options.featured) {
      query = query.eq('featured', true);
    }

    // Filter by tag
    if (options.tag) {
      query = query.contains('tags', options.tag);
    }

    // Apply sorting
    query = query.descending('publishedDate');

    // Apply pagination
    if (options.limit) {
      query = query.limit(options.limit);
    }

    const results = await query.find();
    return {
      items: results.items,
      totalCount: results.totalCount
    };

  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw new Error(`Failed to fetch blog posts: ${error.message}`);
  }
}

export async function getBlogPost(postId) {
  try {
    const post = await wixData.get('BlogPosts', postId);

    // Increment view count
    await wixData.update('BlogPosts', {
      ...post,
      viewCount: (post.viewCount || 0) + 1
    });

    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw new Error(`Failed to fetch blog post: ${error.message}`);
  }
}

/**
 * Podcast episode management
 */
export async function getPodcastEpisodes(options = {}) {
  try {
    let query = wixData.query('PodcastEpisodes');

    // Filter by published status
    if (options.published !== undefined) {
      query = query.eq('published', options.published);
    }

    // Apply sorting
    query = query.descending('publishedDate');

    // Apply pagination
    if (options.limit) {
      query = query.limit(options.limit);
    }

    const results = await query.find();
    return {
      items: results.items,
      totalCount: results.totalCount
    };

  } catch (error) {
    console.error('Error fetching podcast episodes:', error);
    throw new Error(`Failed to fetch podcast episodes: ${error.message}`);
  }
}

export async function getPodcastEpisode(episodeId) {
  try {
    const episode = await wixData.get('PodcastEpisodes', episodeId);

    // Increment play count
    await wixData.update('PodcastEpisodes', {
      ...episode,
      playCount: (episode.playCount || 0) + 1
    });

    return episode;
  } catch (error) {
    console.error('Error fetching podcast episode:', error);
    throw new Error(`Failed to fetch podcast episode: ${error.message}`);
  }
}

/**
 * Analytics and reporting
 */
export async function getAnalytics(options = {}) {
  try {
    const startDate = options.startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const endDate = options.endDate || new Date();

    // Get product analytics
    const productViews = await wixData.query('Products')
      .ge('lastViewed', startDate)
      .le('lastViewed', endDate)
      .find();

    // Get license analytics
    const newLicenses = await wixData.query('Licenses')
      .ge('createdAt', startDate)
      .le('createdAt', endDate)
      .find();

    // Get blog analytics
    const blogViews = await wixData.query('BlogPosts')
      .ge('lastViewed', startDate)
      .le('lastViewed', endDate)
      .find();

    return {
      productViews: productViews.totalCount,
      newLicenses: newLicenses.totalCount,
      blogViews: blogViews.items.reduce((sum, post) => sum + (post.viewCount || 0), 0),
      period: {
        startDate,
        endDate
      }
    };

  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw new Error(`Failed to fetch analytics: ${error.message}`);
  }
}

/**
 * Search functionality
 */
export async function searchContent(searchTerm, options = {}) {
  try {
    const results = {
      products: [],
      blogPosts: [],
      podcastEpisodes: []
    };

    // Search products
    if (!options.type || options.type === 'products') {
      const productResults = await wixData.query('Products')
        .or(
          wixData.query('Products').contains('name', searchTerm),
          wixData.query('Products').contains('description', searchTerm),
          wixData.query('Products').contains('features', searchTerm)
        )
        .limit(options.limit || 10)
        .find();

      results.products = productResults.items;
    }

    // Search blog posts
    if (!options.type || options.type === 'blog') {
      const blogResults = await wixData.query('BlogPosts')
        .or(
          wixData.query('BlogPosts').contains('title', searchTerm),
          wixData.query('BlogPosts').contains('content', searchTerm),
          wixData.query('BlogPosts').contains('tags', searchTerm)
        )
        .eq('published', true)
        .limit(options.limit || 10)
        .find();

      results.blogPosts = blogResults.items;
    }

    // Search podcast episodes
    if (!options.type || options.type === 'podcast') {
      const podcastResults = await wixData.query('PodcastEpisodes')
        .or(
          wixData.query('PodcastEpisodes').contains('title', searchTerm),
          wixData.query('PodcastEpisodes').contains('description', searchTerm),
          wixData.query('PodcastEpisodes').contains('guests', searchTerm)
        )
        .eq('published', true)
        .limit(options.limit || 10)
        .find();

      results.podcastEpisodes = podcastResults.items;
    }

    return results;

  } catch (error) {
    console.error('Error searching content:', error);
    throw new Error(`Failed to search content: ${error.message}`);
  }
}