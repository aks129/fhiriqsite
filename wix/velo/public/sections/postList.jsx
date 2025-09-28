/**
 * Post List Component
 * @module sections/postList
 */

import React, { useState } from 'react';

/**
 * Blog post listing with filtering and pagination
 * @param {Object} props - Component props
 * @param {Array} props.posts - Array of blog post objects
 * @param {Array} props.categories - Array of category filter options
 * @param {string} props.title - Section title
 * @param {string} props.subtitle - Section subtitle
 * @param {string} props.layout - Layout variant (grid, list)
 * @param {number} props.postsPerPage - Number of posts per page
 * @param {boolean} props.showFilters - Show category filters
 */
export const PostList = ({
  posts = [],
  categories = [],
  title,
  subtitle,
  layout = 'grid',
  postsPerPage = 9,
  showFilters = true,
  className = ''
}) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter posts by category
  const filteredPosts = activeCategory === 'all'
    ? posts
    : posts.filter(post => post.category === activeCategory || post.categories?.includes(activeCategory));

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of post list
    const postListElement = document.querySelector('.post-list-section');
    if (postListElement) {
      postListElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateExcerpt = (text, maxLength = 150) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <section
      className={`post-list-section ${className}`}
      aria-labelledby={title ? "post-list-title" : "post-list-label"}
    >
      <div className="post-list-container">
        {/* Header */}
        {(title || subtitle) && (
          <div className="post-list-header">
            {title ? (
              <h2
                id="post-list-title"
                className="post-list-title"
                style={{
                  fontFamily: 'var(--font-family-heading)',
                  fontSize: 'var(--font-size-3xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  textAlign: 'center',
                  color: 'var(--color-gray-900)',
                  marginBottom: subtitle ? 'var(--spacing-4)' : showFilters ? 'var(--spacing-8)' : 'var(--spacing-12)'
                }}
              >
                {title}
              </h2>
            ) : (
              <h2 id="post-list-label" className="sr-only">Blog Posts</h2>
            )}

            {subtitle && (
              <p
                className="post-list-subtitle"
                style={{
                  fontFamily: 'var(--font-family-primary)',
                  fontSize: 'var(--font-size-lg)',
                  color: 'var(--color-gray-600)',
                  textAlign: 'center',
                  maxWidth: '600px',
                  margin: '0 auto',
                  marginBottom: showFilters ? 'var(--spacing-8)' : 'var(--spacing-12)',
                  lineHeight: 'var(--line-height-relaxed)'
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Category filters */}
        {showFilters && categories.length > 0 && (
          <div
            className="post-filters"
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
              onMouseEnter={(e) => {
                if (activeCategory !== 'all') {
                  e.target.style.borderColor = 'var(--color-primary-500)';
                  e.target.style.color = 'var(--color-primary-500)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== 'all') {
                  e.target.style.borderColor = 'var(--color-gray-300)';
                  e.target.style.color = 'var(--color-gray-600)';
                }
              }}
            >
              All Posts
            </button>

            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryChange(category.slug || category.name)}
                className={`filter-button ${activeCategory === (category.slug || category.name) ? 'active' : ''}`}
                style={{
                  backgroundColor: activeCategory === (category.slug || category.name) ? 'var(--color-primary-500)' : 'var(--color-white)',
                  color: activeCategory === (category.slug || category.name) ? 'var(--color-white)' : 'var(--color-gray-600)',
                  border: `1px solid ${activeCategory === (category.slug || category.name) ? 'var(--color-primary-500)' : 'var(--color-gray-300)'}`,
                  padding: 'var(--spacing-2) var(--spacing-4)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-normal) var(--transition-timing)'
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== (category.slug || category.name)) {
                    e.target.style.borderColor = 'var(--color-primary-500)';
                    e.target.style.color = 'var(--color-primary-500)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== (category.slug || category.name)) {
                    e.target.style.borderColor = 'var(--color-gray-300)';
                    e.target.style.color = 'var(--color-gray-600)';
                  }
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}

        {/* Posts grid/list */}
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
            {paginatedPosts.map((post, index) => (
              <article
                key={index}
                className={`post-card layout-${layout}`}
                style={{
                  backgroundColor: 'var(--color-white)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-sm)',
                  overflow: 'hidden',
                  transition: 'all var(--transition-normal) var(--transition-timing)',
                  display: layout === 'list' ? 'flex' : 'block'
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
                {post.featuredImage && (
                  <div
                    className="post-image"
                    style={{
                      width: layout === 'list' ? '300px' : '100%',
                      height: layout === 'list' ? '200px' : '240px',
                      flexShrink: layout === 'list' ? 0 : 'initial',
                      overflow: 'hidden'
                    }}
                  >
                    <img
                      src={post.featuredImage}
                      alt={post.imageAlt || ''}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      loading="lazy"
                    />
                  </div>
                )}

                <div
                  className="post-content"
                  style={{
                    padding: 'var(--spacing-6)',
                    flex: layout === 'list' ? '1' : 'initial'
                  }}
                >
                  {post.category && (
                    <span
                      className="post-category"
                      style={{
                        display: 'inline-block',
                        backgroundColor: 'var(--color-primary-100)',
                        color: 'var(--color-primary-700)',
                        fontSize: 'var(--font-size-xs)',
                        fontWeight: 'var(--font-weight-semibold)',
                        padding: 'var(--spacing-1) var(--spacing-3)',
                        borderRadius: 'var(--radius-full)',
                        marginBottom: 'var(--spacing-3)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}
                    >
                      {post.category}
                    </span>
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
                      href={post.url}
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

                  {post.excerpt && (
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
                      {truncateExcerpt(post.excerpt)}
                    </p>
                  )}

                  <div
                    className="post-meta"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-4)',
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-gray-500)'
                    }}
                  >
                    {post.author && (
                      <span className="post-author">
                        By {post.author}
                      </span>
                    )}

                    {post.publishedDate && (
                      <time
                        className="post-date"
                        dateTime={post.publishedDate}
                      >
                        {formatDate(post.publishedDate)}
                      </time>
                    )}

                    {post.readTime && (
                      <span className="post-read-time">
                        {post.readTime} min read
                      </span>
                    )}
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
              No posts found for the selected category.
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
            aria-label="Blog post pagination"
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-button"
              style={{
                backgroundColor: 'var(--color-white)',
                border: '1px solid var(--color-gray-300)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--spacing-2) var(--spacing-3)',
                fontSize: 'var(--font-size-sm)',
                color: currentPage === 1 ? 'var(--color-gray-400)' : 'var(--color-gray-600)',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                transition: 'all var(--transition-normal) var(--transition-timing)'
              }}
              aria-label="Previous page"
            >
              ← Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`pagination-number ${page === currentPage ? 'active' : ''}`}
                style={{
                  backgroundColor: page === currentPage ? 'var(--color-primary-500)' : 'var(--color-white)',
                  color: page === currentPage ? 'var(--color-white)' : 'var(--color-gray-600)',
                  border: `1px solid ${page === currentPage ? 'var(--color-primary-500)' : 'var(--color-gray-300)'}`,
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--spacing-2) var(--spacing-3)',
                  fontSize: 'var(--font-size-sm)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-normal) var(--transition-timing)',
                  minWidth: '40px'
                }}
                aria-label={`Page ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
                onMouseEnter={(e) => {
                  if (page !== currentPage) {
                    e.target.style.borderColor = 'var(--color-primary-500)';
                    e.target.style.color = 'var(--color-primary-500)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (page !== currentPage) {
                    e.target.style.borderColor = 'var(--color-gray-300)';
                    e.target.style.color = 'var(--color-gray-600)';
                  }
                }}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-button"
              style={{
                backgroundColor: 'var(--color-white)',
                border: '1px solid var(--color-gray-300)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--spacing-2) var(--spacing-3)',
                fontSize: 'var(--font-size-sm)',
                color: currentPage === totalPages ? 'var(--color-gray-400)' : 'var(--color-gray-600)',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                transition: 'all var(--transition-normal) var(--transition-timing)'
              }}
              aria-label="Next page"
            >
              Next →
            </button>
          </nav>
        )}
      </div>

      <style jsx>{`
        .post-list-section {
          padding: var(--spacing-20) var(--spacing-6);
          background-color: var(--color-gray-50);
        }

        .post-list-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        @media (max-width: 768px) {
          .post-list-section {
            padding: var(--spacing-12) var(--spacing-4);
          }

          .post-list-title {
            font-size: var(--font-size-2xl) !important;
          }

          .post-list-subtitle {
            font-size: var(--font-size-base) !important;
          }

          .posts-grid,
          .posts-list {
            grid-template-columns: 1fr !important;
          }

          .post-card.layout-list {
            flex-direction: column !important;
          }

          .post-image {
            width: 100% !important;
            height: 200px !important;
          }

          .post-content {
            padding: var(--spacing-4) !important;
          }

          .post-title {
            font-size: var(--font-size-lg) !important;
          }

          .pagination {
            flex-wrap: wrap;
            gap: var(--spacing-1) !important;
          }

          .pagination-button {
            font-size: var(--font-size-xs) !important;
            padding: var(--spacing-1) var(--spacing-2) !important;
          }

          .pagination-number {
            font-size: var(--font-size-xs) !important;
            padding: var(--spacing-1) var(--spacing-2) !important;
            min-width: 32px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .post-card,
          .filter-button,
          .pagination-button,
          .pagination-number {
            transition: none !important;
          }

          .post-card:hover {
            transform: none !important;
          }
        }

        /* Focus visible styles */
        .filter-button:focus-visible,
        .pagination-button:focus-visible,
        .pagination-number:focus-visible {
          outline: 3px solid var(--color-primary-500);
          outline-offset: 2px;
        }

        .post-title a:focus-visible {
          outline: 3px solid var(--color-primary-500);
          outline-offset: 2px;
        }
      `}</style>
    </section>
  );
};

export default PostList;