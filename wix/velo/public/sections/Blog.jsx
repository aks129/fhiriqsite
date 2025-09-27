/**
 * Blog Section Component
 * @module sections/Blog
 */

import React, { useState, useEffect } from 'react';
import wixData from 'wix-data';

/**
 * Blog section that fetches and displays posts from BlogPosts collection
 * @param {Object} props - Component props
 * @param {string} props.title - Section title
 * @param {string} props.subtitle - Section subtitle
 * @param {number} props.postsPerPage - Number of posts per page
 * @param {boolean} props.showFilters - Show category filters
 * @param {string} props.layout - Layout variant (grid, list, featured)
 * @param {boolean} props.showSubscribe - Show subscription buttons
 */
export const Blog = ({
  title = 'Latest from Our Blog',
  subtitle = 'Insights on FHIR, healthcare interoperability, and AI-driven development',
  postsPerPage = 9,
  showFilters = true,
  layout = 'grid',
  showSubscribe = true,
  className = ''
}) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch blog posts from Wix collection
  useEffect(() => {
    fetchBlogPosts();
    if (showFilters) {
      fetchCategories();
    }
  }, []);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      const query = wixData.query('BlogPosts')
        .eq('status', 'published')
        .descending('publishedAt')
        .limit(100); // Fetch more for client-side filtering

      const results = await query.find();

      // Transform data for display
      const transformedPosts = results.items.map(post => ({
        id: post._id,
        title: post.title,
        summary: post.summary,
        canonicalURL: post.canonicalURL,
        tags: post.tags || [],
        publishedAt: post.publishedAt,
        author: post.author || 'FHIR IQ',
        source: post.source || 'local',
        category: post.tags && post.tags.length > 0 ? post.tags[0] : 'General',
        readTime: estimateReadTime(post.summary),
        excerpt: post.summary?.substring(0, 150) + (post.summary?.length > 150 ? '...' : '')
      }));

      setPosts(transformedPosts);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError('Failed to load blog posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      // Extract unique categories from posts' tags
      const query = wixData.query('BlogPosts')
        .eq('status', 'published');

      const results = await query.find();
      const allTags = results.items
        .flatMap(post => post.tags || [])
        .filter(tag => tag && tag.trim().length > 0);

      const uniqueCategories = [...new Set(allTags)]
        .map(tag => ({ name: tag, slug: tag.toLowerCase().replace(/\s+/g, '-') }))
        .sort((a, b) => a.name.localeCompare(b.name));

      setCategories(uniqueCategories);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const estimateReadTime = (text) => {
    if (!text) return '2';
    const wordsPerMinute = 200;
    const words = text.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return Math.max(1, minutes).toString();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleSubscribeClick = (platform) => {
    // Track subscription click
    console.log(`Subscribe clicked: ${platform}`);

    // Open subscription URLs
    const subscriptionUrls = {
      substack: 'https://your-substack.substack.com/subscribe',
      rss: '/blog/rss.xml',
      email: '/newsletter-signup'
    };

    const url = subscriptionUrls[platform];
    if (url) {
      if (platform === 'rss') {
        // Download RSS file or open in new tab
        window.open(url, '_blank');
      } else {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    }
  };

  // Filter posts by category
  const filteredPosts = activeCategory === 'all'
    ? posts
    : posts.filter(post => post.tags.includes(activeCategory));

  // Paginate posts
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of blog section
    const blogElement = document.querySelector('.blog-section');
    if (blogElement) {
      blogElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) {
    return (
      <section className={`blog-section loading ${className}`}>
        <div className="blog-container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '400px',
              color: 'var(--color-gray-500)'
            }}
          >
            <div
              style={{
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  border: '3px solid var(--color-gray-200)',
                  borderTop: '3px solid var(--color-primary-500)',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto var(--spacing-4) auto'
                }}
              />
              <p>Loading blog posts...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`blog-section error ${className}`}>
        <div className="blog-container">
          <div
            style={{
              textAlign: 'center',
              padding: 'var(--spacing-12)',
              color: 'var(--color-gray-600)'
            }}
          >
            <p style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-4)' }}>
              {error}
            </p>
            <button
              onClick={fetchBlogPosts}
              style={{
                backgroundColor: 'var(--color-primary-500)',
                color: 'var(--color-white)',
                border: 'none',
                padding: 'var(--spacing-3) var(--spacing-6)',
                borderRadius: 'var(--radius-lg)',
                fontSize: 'var(--font-size-base)',
                fontWeight: 'var(--font-weight-semibold)',
                cursor: 'pointer',
                transition: 'all var(--transition-normal) var(--transition-timing)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--color-primary-600)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--color-primary-500)';
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`blog-section ${className}`}
      aria-labelledby="blog-title"
    >
      <div className="blog-container">
        {/* Header */}
        <div className="blog-header">
          <h2
            id="blog-title"
            className="blog-title"
            style={{
              fontFamily: 'var(--font-family-heading)',
              fontSize: 'var(--font-size-3xl)',
              fontWeight: 'var(--font-weight-bold)',
              textAlign: 'center',
              color: 'var(--color-gray-900)',
              marginBottom: 'var(--spacing-4)'
            }}
          >
            {title}
          </h2>

          {subtitle && (
            <p
              className="blog-subtitle"
              style={{
                fontFamily: 'var(--font-family-primary)',
                fontSize: 'var(--font-size-lg)',
                color: 'var(--color-gray-600)',
                textAlign: 'center',
                maxWidth: '600px',
                margin: '0 auto',
                marginBottom: 'var(--spacing-8)',
                lineHeight: 'var(--line-height-relaxed)'
              }}
            >
              {subtitle}
            </p>
          )}

          {/* Subscribe buttons */}
          {showSubscribe && (
            <div
              className="blog-subscribe"
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 'var(--spacing-3)',
                marginBottom: 'var(--spacing-8)',
                flexWrap: 'wrap'
              }}
            >
              <button
                onClick={() => handleSubscribeClick('substack')}
                style={{
                  backgroundColor: 'var(--color-primary-500)',
                  color: 'var(--color-white)',
                  border: 'none',
                  padding: 'var(--spacing-2) var(--spacing-4)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-normal) var(--transition-timing)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-2)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'var(--color-primary-600)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'var(--color-primary-500)';
                }}
              >
                📧 Subscribe on Substack
              </button>

              <button
                onClick={() => handleSubscribeClick('rss')}
                style={{
                  backgroundColor: 'var(--color-white)',
                  color: 'var(--color-gray-700)',
                  border: '1px solid var(--color-gray-300)',
                  padding: 'var(--spacing-2) var(--spacing-4)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-normal) var(--transition-timing)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-2)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = 'var(--color-primary-500)';
                  e.target.style.color = 'var(--color-primary-500)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = 'var(--color-gray-300)';
                  e.target.style.color = 'var(--color-gray-700)';
                }}
              >
                📡 RSS Feed
              </button>
            </div>
          )}
        </div>

        {/* Category filters */}
        {showFilters && categories.length > 0 && (
          <div
            className="blog-filters"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 'var(--spacing-3)',
              marginBottom: 'var(--spacing-12)'
            }}
            role="toolbar"
            aria-label="Filter posts by category"
          >
            <button
              onClick={() => handleCategoryChange('all')}
              className={`filter-button ${activeCategory === 'all' ? 'active' : ''}`}
              style={{
                backgroundColor: activeCategory === 'all' ? 'var(--color-primary-500)' : 'var(--color-white)',
                color: activeCategory === 'all' ? 'var(--color-white)' : 'var(--color-gray-600)',
                border: `1px solid ${activeCategory === 'all' ? 'var(--color-primary-500)' : 'var(--color-gray-300)'}`,
                padding: 'var(--spacing-2) var(--spacing-4)',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                cursor: 'pointer',
                transition: 'all var(--transition-normal) var(--transition-timing)'
              }}
            >
              All Posts
            </button>

            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryChange(category.name)}
                className={`filter-button ${activeCategory === category.name ? 'active' : ''}`}
                style={{
                  backgroundColor: activeCategory === category.name ? 'var(--color-primary-500)' : 'var(--color-white)',
                  color: activeCategory === category.name ? 'var(--color-white)' : 'var(--color-gray-600)',
                  border: `1px solid ${activeCategory === category.name ? 'var(--color-primary-500)' : 'var(--color-gray-300)'}`,
                  padding: 'var(--spacing-2) var(--spacing-4)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-normal) var(--transition-timing)'
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}

        {/* Posts display */}
        {paginatedPosts.length > 0 ? (
          <div
            className={`posts-${layout}`}
            style={{
              display: layout === 'grid' ? 'grid' : 'flex',
              gridTemplateColumns: layout === 'grid' ? 'repeat(auto-fit, minmax(350px, 1fr))' : 'none',
              flexDirection: layout === 'list' ? 'column' : 'row',
              gap: 'var(--spacing-8)',
              marginBottom: 'var(--spacing-12)'
            }}
          >
            {paginatedPosts.map((post) => (
              <article
                key={post.id}
                className={`blog-post-card layout-${layout}`}
                style={{
                  backgroundColor: 'var(--color-white)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-sm)',
                  overflow: 'hidden',
                  transition: 'all var(--transition-normal) var(--transition-timing)',
                  display: layout === 'list' ? 'flex' : 'block',
                  alignItems: layout === 'list' ? 'flex-start' : 'normal'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div
                  className="post-content"
                  style={{
                    padding: 'var(--spacing-6)',
                    flex: '1'
                  }}
                >
                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div
                      className="post-tags"
                      style={{
                        marginBottom: 'var(--spacing-3)',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 'var(--spacing-2)'
                      }}
                    >
                      {post.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="post-tag"
                          style={{
                            backgroundColor: 'var(--color-primary-100)',
                            color: 'var(--color-primary-700)',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-semibold)',
                            padding: 'var(--spacing-1) var(--spacing-3)',
                            borderRadius: 'var(--radius-full)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <h3
                    className="post-title"
                    style={{
                      fontFamily: 'var(--font-family-heading)',
                      fontSize: 'var(--font-size-xl)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--color-gray-900)',
                      marginBottom: 'var(--spacing-3)',
                      lineHeight: 'var(--line-height-snug)'
                    }}
                  >
                    <a
                      href={post.canonicalURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: 'inherit',
                        textDecoration: 'none'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = 'var(--color-primary-500)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = 'var(--color-gray-900)';
                      }}
                    >
                      {post.title}
                    </a>
                  </h3>

                  <p
                    className="post-excerpt"
                    style={{
                      fontFamily: 'var(--font-family-primary)',
                      fontSize: 'var(--font-size-base)',
                      color: 'var(--color-gray-600)',
                      lineHeight: 'var(--line-height-relaxed)',
                      marginBottom: 'var(--spacing-4)'
                    }}
                  >
                    {post.excerpt}
                  </p>

                  <div
                    className="post-meta"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-gray-500)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                      <span>{post.author}</span>
                      <time dateTime={post.publishedAt}>
                        {formatDate(post.publishedAt)}
                      </time>
                      <span>{post.readTime} min read</span>
                    </div>

                    <a
                      href={post.canonicalURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: 'var(--color-primary-500)',
                        textDecoration: 'none',
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: 'var(--font-weight-medium)'
                      }}
                    >
                      Read on {post.source === 'substack' ? 'Substack' : 'Blog'} →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div
            className="no-posts"
            style={{
              textAlign: 'center',
              padding: 'var(--spacing-12)',
              color: 'var(--color-gray-500)'
            }}
          >
            <p style={{ fontSize: 'var(--font-size-lg)' }}>
              {activeCategory === 'all'
                ? 'No blog posts available.'
                : `No posts found in "${activeCategory}" category.`}
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav
            className="pagination"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 'var(--spacing-2)',
              marginTop: 'var(--spacing-12)'
            }}
            aria-label="Blog pagination"
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                backgroundColor: 'var(--color-white)',
                border: '1px solid var(--color-gray-300)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--spacing-2) var(--spacing-3)',
                fontSize: 'var(--font-size-sm)',
                color: currentPage === 1 ? 'var(--color-gray-400)' : 'var(--color-gray-600)',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
              }}
            >
              ← Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                style={{
                  backgroundColor: page === currentPage ? 'var(--color-primary-500)' : 'var(--color-white)',
                  color: page === currentPage ? 'var(--color-white)' : 'var(--color-gray-600)',
                  border: `1px solid ${page === currentPage ? 'var(--color-primary-500)' : 'var(--color-gray-300)'}`,
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--spacing-2) var(--spacing-3)',
                  fontSize: 'var(--font-size-sm)',
                  cursor: 'pointer',
                  minWidth: '40px'
                }}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                backgroundColor: 'var(--color-white)',
                border: '1px solid var(--color-gray-300)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--spacing-2) var(--spacing-3)',
                fontSize: 'var(--font-size-sm)',
                color: currentPage === totalPages ? 'var(--color-gray-400)' : 'var(--color-gray-600)',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
              }}
            >
              Next →
            </button>
          </nav>
        )}
      </div>

      <style jsx>{`
        .blog-section {
          padding: var(--spacing-20) var(--spacing-6);
          background-color: var(--color-gray-50);
        }

        .blog-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .blog-section {
            padding: var(--spacing-12) var(--spacing-4);
          }

          .blog-title {
            font-size: var(--font-size-2xl) !important;
          }

          .blog-subtitle {
            font-size: var(--font-size-base) !important;
          }

          .posts-grid {
            grid-template-columns: 1fr !important;
          }

          .blog-post-card.layout-list {
            flex-direction: column !important;
          }

          .blog-subscribe {
            flex-direction: column;
            align-items: center;
          }

          .blog-filters {
            justify-content: flex-start;
            overflow-x: auto;
            padding-bottom: var(--spacing-2);
          }

          .pagination {
            flex-wrap: wrap;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .blog-post-card {
            transition: none !important;
          }

          .blog-post-card:hover {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Blog;