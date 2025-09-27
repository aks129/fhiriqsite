/**
 * Episode List Component
 * @module sections/episodeList
 */

import React, { useState } from 'react';

/**
 * Podcast episode listing with audio player and filtering
 * @param {Object} props - Component props
 * @param {Array} props.episodes - Array of podcast episode objects
 * @param {Array} props.guests - Array of guest filter options
 * @param {string} props.title - Section title
 * @param {string} props.subtitle - Section subtitle
 * @param {string} props.layout - Layout variant (grid, list)
 * @param {number} props.episodesPerPage - Number of episodes per page
 * @param {boolean} props.showPlayer - Show embedded audio player
 */
export const EpisodeList = ({
  episodes = [],
  guests = [],
  title,
  subtitle,
  layout = 'list',
  episodesPerPage = 10,
  showPlayer = true,
  className = ''
}) => {
  const [activeGuest, setActiveGuest] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  // Filter episodes by guest
  const filteredEpisodes = activeGuest === 'all'
    ? episodes
    : episodes.filter(episode =>
        episode.guests?.some(guest => guest === activeGuest || guest.name === activeGuest)
      );

  // Calculate pagination
  const totalPages = Math.ceil(filteredEpisodes.length / episodesPerPage);
  const startIndex = (currentPage - 1) * episodesPerPage;
  const paginatedEpisodes = filteredEpisodes.slice(startIndex, startIndex + episodesPerPage);

  const handleGuestFilter = (guest) => {
    setActiveGuest(guest);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of episode list
    const episodeListElement = document.querySelector('.episode-list-section');
    if (episodeListElement) {
      episodeListElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  const formatDuration = (seconds) => {
    if (!seconds) return '';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = (episode) => {
    if (currentlyPlaying === episode.id) {
      setCurrentlyPlaying(null);
    } else {
      setCurrentlyPlaying(episode.id);
    }
  };

  const truncateDescription = (text, maxLength = 200) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <section
      className={`episode-list-section ${className}`}
      aria-labelledby={title ? "episode-list-title" : "episode-list-label"}
    >
      <div className="episode-list-container">
        {/* Header */}
        {(title || subtitle) && (
          <div className="episode-list-header">
            {title ? (
              <h2
                id="episode-list-title"
                className="episode-list-title"
                style={{
                  fontFamily: 'var(--font-family-heading)',
                  fontSize: 'var(--font-size-3xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  textAlign: 'center',
                  color: 'var(--color-gray-900)',
                  marginBottom: subtitle ? 'var(--spacing-4)' : guests.length ? 'var(--spacing-8)' : 'var(--spacing-12)'
                }}
              >
                {title}
              </h2>
            ) : (
              <h2 id="episode-list-label" className="sr-only">Podcast Episodes</h2>
            )}

            {subtitle && (
              <p
                className="episode-list-subtitle"
                style={{
                  fontFamily: 'var(--font-family-primary)',
                  fontSize: 'var(--font-size-lg)',
                  color: 'var(--color-gray-600)',
                  textAlign: 'center',
                  maxWidth: '600px',
                  margin: '0 auto',
                  marginBottom: guests.length ? 'var(--spacing-8)' : 'var(--spacing-12)',
                  lineHeight: 'var(--line-height-relaxed)'
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Guest filters */}
        {guests.length > 0 && (
          <div
            className="episode-filters"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 'var(--spacing-3)',
              marginBottom: 'var(--spacing-12)'
            }}
            role="toolbar"
            aria-label="Filter episodes by guest"
          >
            <button
              onClick={() => handleGuestFilter('all')}
              className={`filter-button ${activeGuest === 'all' ? 'active' : ''}`}
              style={{
                backgroundColor: activeGuest === 'all' ? 'var(--color-primary-500)' : 'var(--color-white)',
                color: activeGuest === 'all' ? 'var(--color-white)' : 'var(--color-gray-600)',
                border: `1px solid ${activeGuest === 'all' ? 'var(--color-primary-500)' : 'var(--color-gray-300)'}`,
                padding: 'var(--spacing-2) var(--spacing-4)',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                cursor: 'pointer',
                transition: 'all var(--transition-normal) var(--transition-timing)'
              }}
            >
              All Episodes
            </button>

            {guests.map((guest, index) => (
              <button
                key={index}
                onClick={() => handleGuestFilter(guest.name || guest)}
                className={`filter-button ${activeGuest === (guest.name || guest) ? 'active' : ''}`}
                style={{
                  backgroundColor: activeGuest === (guest.name || guest) ? 'var(--color-primary-500)' : 'var(--color-white)',
                  color: activeGuest === (guest.name || guest) ? 'var(--color-white)' : 'var(--color-gray-600)',
                  border: `1px solid ${activeGuest === (guest.name || guest) ? 'var(--color-primary-500)' : 'var(--color-gray-300)'}`,
                  padding: 'var(--spacing-2) var(--spacing-4)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-normal) var(--transition-timing)'
                }}
              >
                {guest.name || guest}
              </button>
            ))}
          </div>
        )}

        {/* Episodes grid/list */}
        {paginatedEpisodes.length > 0 ? (
          <div
            className={`episodes-${layout}`}
            style={{
              display: layout === 'grid' ? 'grid' : 'flex',
              gridTemplateColumns: layout === 'grid' ? 'repeat(auto-fit, minmax(400px, 1fr))' : 'none',
              flexDirection: layout === 'list' ? 'column' : 'row',
              gap: 'var(--spacing-6)',
              marginBottom: 'var(--spacing-12)'
            }}
          >
            {paginatedEpisodes.map((episode, index) => (
              <article
                key={index}
                className={`episode-card layout-${layout}`}
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
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                {episode.artwork && (
                  <div
                    className="episode-artwork"
                    style={{
                      width: layout === 'list' ? '200px' : '100%',
                      height: layout === 'list' ? '200px' : '240px',
                      flexShrink: layout === 'list' ? 0 : 'initial',
                      overflow: 'hidden',
                      position: 'relative'
                    }}
                  >
                    <img
                      src={episode.artwork}
                      alt={`${episode.title} artwork`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      loading="lazy"
                    />

                    {/* Play button overlay */}
                    {showPlayer && episode.audioUrl && (
                      <button
                        onClick={() => handlePlayPause(episode)}
                        className="play-button"
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '60px',
                          height: '60px',
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          border: 'none',
                          borderRadius: 'var(--radius-full)',
                          color: 'var(--color-white)',
                          fontSize: 'var(--font-size-xl)',
                          cursor: 'pointer',
                          transition: 'all var(--transition-normal) var(--transition-timing)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        aria-label={currentlyPlaying === episode.id ? 'Pause episode' : 'Play episode'}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
                          e.target.style.transform = 'translate(-50%, -50%) scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                          e.target.style.transform = 'translate(-50%, -50%) scale(1)';
                        }}
                      >
                        {currentlyPlaying === episode.id ? '⏸️' : '▶️'}
                      </button>
                    )}
                  </div>
                )}

                <div
                  className="episode-content"
                  style={{
                    padding: 'var(--spacing-6)',
                    flex: layout === 'list' ? '1' : 'initial'
                  }}
                >
                  <div
                    className="episode-meta"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-4)',
                      marginBottom: 'var(--spacing-3)',
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-gray-500)'
                    }}
                  >
                    {episode.episodeNumber && (
                      <span className="episode-number">
                        Episode {episode.episodeNumber}
                      </span>
                    )}

                    {episode.publishedDate && (
                      <time
                        className="episode-date"
                        dateTime={episode.publishedDate}
                      >
                        {formatDate(episode.publishedDate)}
                      </time>
                    )}

                    {episode.duration && (
                      <span className="episode-duration">
                        {formatDuration(episode.duration)}
                      </span>
                    )}
                  </div>

                  <h3
                    className="episode-title"
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
                      href={episode.url}
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
                      {episode.title}
                    </a>
                  </h3>

                  {episode.guests && episode.guests.length > 0 && (
                    <div
                      className="episode-guests"
                      style={{
                        marginBottom: 'var(--spacing-3)'
                      }}
                    >
                      <span
                        style={{
                          fontSize: 'var(--font-size-sm)',
                          color: 'var(--color-gray-600)',
                          fontWeight: 'var(--font-weight-medium)'
                        }}
                      >
                        Guests: {episode.guests.map(guest => typeof guest === 'string' ? guest : guest.name).join(', ')}
                      </span>
                    </div>
                  )}

                  {episode.description && (
                    <p
                      className="episode-description"
                      style={{
                        fontFamily: 'var(--font-family-primary)',
                        fontSize: 'var(--font-size-base)',
                        color: 'var(--color-gray-600)',
                        lineHeight: 'var(--line-height-relaxed)',
                        marginBottom: 'var(--spacing-4)'
                      }}
                    >
                      {truncateDescription(episode.description)}
                    </p>
                  )}

                  {episode.tags && episode.tags.length > 0 && (
                    <div
                      className="episode-tags"
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 'var(--spacing-2)',
                        marginBottom: 'var(--spacing-4)'
                      }}
                    >
                      {episode.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="episode-tag"
                          style={{
                            backgroundColor: 'var(--color-gray-100)',
                            color: 'var(--color-gray-700)',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-medium)',
                            padding: 'var(--spacing-1) var(--spacing-2)',
                            borderRadius: 'var(--radius-sm)'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Audio player */}
                  {showPlayer && episode.audioUrl && currentlyPlaying === episode.id && (
                    <div
                      className="episode-player"
                      style={{
                        marginTop: 'var(--spacing-4)',
                        padding: 'var(--spacing-4)',
                        backgroundColor: 'var(--color-gray-50)',
                        borderRadius: 'var(--radius-md)'
                      }}
                    >
                      <audio
                        controls
                        preload="metadata"
                        style={{
                          width: '100%',
                          height: '40px'
                        }}
                        aria-label={`Audio player for ${episode.title}`}
                      >
                        <source src={episode.audioUrl} type="audio/mpeg" />
                        <p>Your browser does not support the audio element.</p>
                      </audio>
                    </div>
                  )}

                  {/* External links */}
                  {episode.externalLinks && episode.externalLinks.length > 0 && (
                    <div
                      className="episode-links"
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 'var(--spacing-3)',
                        marginTop: 'var(--spacing-4)'
                      }}
                    >
                      {episode.externalLinks.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-block',
                            backgroundColor: 'var(--color-primary-500)',
                            color: 'var(--color-white)',
                            padding: 'var(--spacing-2) var(--spacing-3)',
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--font-size-sm)',
                            fontWeight: 'var(--font-weight-semibold)',
                            textDecoration: 'none',
                            transition: 'all var(--transition-normal) var(--transition-timing)'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'var(--color-primary-600)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'var(--color-primary-500)';
                          }}
                        >
                          {link.platform}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div
            className="no-episodes"
            style={{
              textAlign: 'center',
              padding: 'var(--spacing-12)',
              color: 'var(--color-gray-500)'
            }}
          >
            <p style={{ fontSize: 'var(--font-size-lg)' }}>
              No episodes found for the selected filter.
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
            aria-label="Episode pagination"
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
        .episode-list-section {
          padding: var(--spacing-20) var(--spacing-6);
          background-color: var(--color-gray-50);
        }

        .episode-list-container {
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
          .episode-list-section {
            padding: var(--spacing-12) var(--spacing-4);
          }

          .episode-list-title {
            font-size: var(--font-size-2xl) !important;
          }

          .episode-list-subtitle {
            font-size: var(--font-size-base) !important;
          }

          .episodes-grid,
          .episodes-list {
            grid-template-columns: 1fr !important;
          }

          .episode-card.layout-list {
            flex-direction: column !important;
          }

          .episode-artwork {
            width: 100% !important;
            height: 200px !important;
          }

          .episode-content {
            padding: var(--spacing-4) !important;
          }

          .episode-title {
            font-size: var(--font-size-lg) !important;
          }

          .play-button {
            width: 50px !important;
            height: 50px !important;
            font-size: var(--font-size-lg) !important;
          }

          .episode-links {
            flex-direction: column;
          }

          .pagination {
            flex-wrap: wrap;
            gap: var(--spacing-1) !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .episode-card,
          .filter-button,
          .pagination-button,
          .pagination-number,
          .play-button {
            transition: none !important;
          }

          .play-button:hover {
            transform: translate(-50%, -50%) !important;
          }
        }

        /* Focus visible styles */
        .filter-button:focus-visible,
        .pagination-button:focus-visible,
        .pagination-number:focus-visible,
        .play-button:focus-visible {
          outline: 3px solid var(--color-primary-500);
          outline-offset: 2px;
        }

        .episode-title a:focus-visible {
          outline: 3px solid var(--color-primary-500);
          outline-offset: 2px;
        }
      `}</style>
    </section>
  );
};

export default EpisodeList;