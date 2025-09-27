/**
 * Podcast Section Component
 * @module sections/Podcast
 */

import React, { useState, useEffect } from 'react';
import wixData from 'wix-data';

/**
 * Podcast section that fetches and displays episodes from PodcastEpisodes collection
 * @param {Object} props - Component props
 * @param {string} props.title - Section title
 * @param {string} props.subtitle - Section subtitle
 * @param {number} props.episodesPerPage - Number of episodes per page
 * @param {boolean} props.showPlayer - Show embedded audio player
 * @param {string} props.layout - Layout variant (grid, list, featured)
 * @param {boolean} props.showSubscribe - Show subscription buttons
 */
export const Podcast = ({
  title = 'FHIR IQ Podcast',
  subtitle = 'Conversations with healthcare technology leaders, FHIR experts, and innovators',
  episodesPerPage = 12,
  showPlayer = true,
  layout = 'list',
  showSubscribe = true,
  className = ''
}) => {
  const [episodes, setEpisodes] = useState([]);
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeGuest, setActiveGuest] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  // Fetch podcast episodes from Wix collection
  useEffect(() => {
    fetchPodcastEpisodes();
    fetchGuests();
  }, []);

  const fetchPodcastEpisodes = async () => {
    try {
      setLoading(true);
      setError(null);

      const query = wixData.query('PodcastEpisodes')
        .eq('status', 'published')
        .descending('publishedAt')
        .limit(100); // Fetch more for client-side filtering

      const results = await query.find();

      // Transform data for display
      const transformedEpisodes = results.items.map(episode => ({
        id: episode._id,
        title: episode.title,
        summary: episode.summary,
        canonicalURL: episode.canonicalURL,
        audioURL: episode.audioURL,
        tags: episode.tags || [],
        publishedAt: episode.publishedAt,
        duration: episode.duration,
        episodeNumber: episode.episodeNumber,
        seasonNumber: episode.seasonNumber,
        guests: episode.guests || [],
        showTitle: episode.showTitle || 'FHIR IQ Podcast',
        source: episode.source || 'rss',
        description: episode.summary?.substring(0, 200) + (episode.summary?.length > 200 ? '...' : '')
      }));

      setEpisodes(transformedEpisodes);
    } catch (err) {
      console.error('Error fetching podcast episodes:', err);
      setError('Failed to load podcast episodes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchGuests = async () => {
    try {
      // Extract unique guests from episodes
      const query = wixData.query('PodcastEpisodes')
        .eq('status', 'published');

      const results = await query.find();
      const allGuests = results.items
        .flatMap(episode => episode.guests || [])
        .filter(guest => guest && guest.trim().length > 0);

      const uniqueGuests = [...new Set(allGuests)]
        .sort()
        .map(guest => ({ name: guest }));

      setGuests(uniqueGuests);
    } catch (err) {
      console.error('Error fetching guests:', err);
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
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
      return `${hours}:${remainingMinutes.toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
    }
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  const handleGuestFilter = (guest) => {
    setActiveGuest(guest);
    setCurrentPage(1);
  };

  const handlePlayPause = (episodeId) => {
    if (currentlyPlaying === episodeId) {
      setCurrentlyPlaying(null);
    } else {
      setCurrentlyPlaying(episodeId);
    }
  };

  const handleSubscribeClick = (platform) => {
    // Track subscription click
    console.log(`Podcast subscribe clicked: ${platform}`);

    // Open subscription URLs
    const subscriptionUrls = {
      apple: 'https://podcasts.apple.com/us/podcast/your-podcast-id',
      spotify: 'https://open.spotify.com/show/your-podcast-id',
      google: 'https://podcasts.google.com/feed/your-feed-url',
      rss: '/podcast/rss.xml'
    };

    const url = subscriptionUrls[platform];
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Filter episodes by guest
  const filteredEpisodes = activeGuest === 'all'
    ? episodes
    : episodes.filter(episode => episode.guests.includes(activeGuest));

  // Paginate episodes
  const totalPages = Math.ceil(filteredEpisodes.length / episodesPerPage);
  const startIndex = (currentPage - 1) * episodesPerPage;
  const paginatedEpisodes = filteredEpisodes.slice(startIndex, startIndex + episodesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of podcast section
    const podcastElement = document.querySelector('.podcast-section');
    if (podcastElement) {
      podcastElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) {
    return (
      <section className={`podcast-section loading ${className}`}>
        <div className="podcast-container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '400px',
              color: 'var(--color-gray-500)'
            }}
          >
            <div style={{ textAlign: 'center' }}>
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
              <p>Loading podcast episodes...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`podcast-section error ${className}`}>
        <div className="podcast-container">
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
              onClick={fetchPodcastEpisodes}
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
      className={`podcast-section ${className}`}
      aria-labelledby="podcast-title"
    >
      <div className="podcast-container">
        {/* Header */}
        <div className="podcast-header">
          <h2
            id="podcast-title"
            className="podcast-title"
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
              className="podcast-subtitle"
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
              className="podcast-subscribe"
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 'var(--spacing-3)',
                marginBottom: 'var(--spacing-8)',
                flexWrap: 'wrap'
              }}
            >
              <button
                onClick={() => handleSubscribeClick('apple')}
                style={{
                  backgroundColor: 'var(--color-gray-900)',
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
                  e.target.style.backgroundColor = 'var(--color-gray-800)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'var(--color-gray-900)';
                }}
              >
                🎧 Apple Podcasts
              </button>

              <button
                onClick={() => handleSubscribeClick('spotify')}
                style={{
                  backgroundColor: '#1DB954',
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
                  e.target.style.backgroundColor = '#1ed760';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#1DB954';
                }}
              >
                🎵 Spotify
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

        {/* Guest filters */}
        {guests.length > 0 && (
          <div
            className="podcast-filters"
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

            {guests.slice(0, 8).map((guest, index) => (
              <button
                key={index}
                onClick={() => handleGuestFilter(guest.name)}
                className={`filter-button ${activeGuest === guest.name ? 'active' : ''}`}
                style={{
                  backgroundColor: activeGuest === guest.name ? 'var(--color-primary-500)' : 'var(--color-white)',
                  color: activeGuest === guest.name ? 'var(--color-white)' : 'var(--color-gray-600)',
                  border: `1px solid ${activeGuest === guest.name ? 'var(--color-primary-500)' : 'var(--color-gray-300)'}`,
                  padding: 'var(--spacing-2) var(--spacing-4)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-normal) var(--transition-timing)'
                }}
              >
                {guest.name}
              </button>
            ))}
          </div>
        )}

        {/* Episodes display */}
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
            {paginatedEpisodes.map((episode) => (
              <article
                key={episode.id}
                className={`episode-card layout-${layout}`}
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
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                {/* Episode artwork/thumbnail */}
                <div
                  className="episode-artwork"
                  style={{
                    width: layout === 'list' ? '200px' : '100%',
                    height: layout === 'list' ? '200px' : '240px',
                    backgroundColor: 'var(--color-gray-100)',
                    position: 'relative',
                    flexShrink: layout === 'list' ? 0 : 'initial',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {/* Podcast icon placeholder */}
                  <div
                    style={{
                      fontSize: 'var(--font-size-4xl)',
                      color: 'var(--color-gray-400)'
                    }}
                  >
                    🎙️
                  </div>

                  {/* Play button overlay */}
                  {showPlayer && episode.audioURL && (
                    <button
                      onClick={() => handlePlayPause(episode.id)}
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

                <div
                  className="episode-content"
                  style={{
                    padding: 'var(--spacing-6)',
                    flex: '1'
                  }}
                >
                  {/* Episode meta */}
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
                      <span>Episode {episode.episodeNumber}</span>
                    )}
                    <time dateTime={episode.publishedAt}>
                      {formatDate(episode.publishedAt)}
                    </time>
                    {episode.duration && (
                      <span>{formatDuration(episode.duration)}</span>
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
                      href={episode.canonicalURL}
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
                      {episode.title}
                    </a>
                  </h3>

                  {/* Guests */}
                  {episode.guests.length > 0 && (
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
                        Guests: {episode.guests.join(', ')}
                      </span>
                    </div>
                  )}

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
                    {episode.description}
                  </p>

                  {/* Tags */}
                  {episode.tags.length > 0 && (
                    <div
                      className="episode-tags"
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 'var(--spacing-2)',
                        marginBottom: 'var(--spacing-4)'
                      }}
                    >
                      {episode.tags.slice(0, 3).map((tag, tagIndex) => (
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
                  {showPlayer && episode.audioURL && currentlyPlaying === episode.id && (
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
                        <source src={episode.audioURL} type="audio/mpeg" />
                        <p>Your browser does not support the audio element.</p>
                      </audio>
                    </div>
                  )}

                  {/* Listen link */}
                  <div
                    style={{
                      marginTop: 'var(--spacing-4)',
                      textAlign: 'right'
                    }}
                  >
                    <a
                      href={episode.canonicalURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: 'var(--color-primary-500)',
                        textDecoration: 'none',
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: 'var(--font-weight-medium)'
                      }}
                    >
                      Listen Now →
                    </a>
                  </div>
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
              {activeGuest === 'all'
                ? 'No podcast episodes available.'
                : `No episodes found with guest "${activeGuest}".`}
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
            aria-label="Podcast pagination"
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
        .podcast-section {
          padding: var(--spacing-20) var(--spacing-6);
          background-color: var(--color-gray-50);
        }

        .podcast-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .podcast-section {
            padding: var(--spacing-12) var(--spacing-4);
          }

          .podcast-title {
            font-size: var(--font-size-2xl) !important;
          }

          .podcast-subtitle {
            font-size: var(--font-size-base) !important;
          }

          .episodes-grid {
            grid-template-columns: 1fr !important;
          }

          .episode-card.layout-list {
            flex-direction: column !important;
          }

          .episode-artwork {
            width: 100% !important;
            height: 200px !important;
          }

          .podcast-subscribe {
            flex-direction: column;
            align-items: center;
          }

          .podcast-filters {
            justify-content: flex-start;
            overflow-x: auto;
            padding-bottom: var(--spacing-2);
          }

          .play-button {
            width: 50px !important;
            height: 50px !important;
            font-size: var(--font-size-lg) !important;
          }

          .pagination {
            flex-wrap: wrap;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .episode-card,
          .play-button {
            transition: none !important;
          }

          .play-button:hover {
            transform: translate(-50%, -50%) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Podcast;