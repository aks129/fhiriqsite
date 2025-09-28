/**
 * Card Grid Section Component
 * @module sections/cardGrid
 */

import React from 'react';

/**
 * Responsive card grid for services, tools, features, etc.
 * @param {Object} props - Component props
 * @param {Array} props.cards - Array of card objects
 * @param {string} props.title - Section title
 * @param {string} props.subtitle - Section subtitle
 * @param {number} props.columns - Number of columns (responsive)
 * @param {string} props.cardStyle - Card style variant
 */
export const CardGrid = ({
  cards = [],
  title,
  subtitle,
  columns = 3,
  cardStyle = 'default',
  className = ''
}) => {
  const cardStyles = {
    default: {
      backgroundColor: 'var(--color-white)',
      border: '1px solid var(--color-gray-200)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)',
      transition: 'all var(--transition-normal) var(--transition-timing)'
    },
    elevated: {
      backgroundColor: 'var(--color-white)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-md)',
      transition: 'all var(--transition-normal) var(--transition-timing)'
    },
    outlined: {
      backgroundColor: 'var(--color-white)',
      border: '2px solid var(--color-primary-500)',
      borderRadius: 'var(--radius-lg)',
      transition: 'all var(--transition-normal) var(--transition-timing)'
    }
  };

  return (
    <section
      className={`card-grid-section ${className}`}
      aria-labelledby={title ? "card-grid-title" : undefined}
    >
      <div className="card-grid-container">
        {(title || subtitle) && (
          <div className="card-grid-header">
            {title && (
              <h2
                id="card-grid-title"
                className="card-grid-title"
                style={{
                  fontFamily: 'var(--font-family-heading)',
                  fontSize: 'var(--font-size-3xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  textAlign: 'center',
                  color: 'var(--color-gray-900)',
                  marginBottom: subtitle ? 'var(--spacing-4)' : 'var(--spacing-12)'
                }}
              >
                {title}
              </h2>
            )}

            {subtitle && (
              <p
                className="card-grid-subtitle"
                style={{
                  fontFamily: 'var(--font-family-primary)',
                  fontSize: 'var(--font-size-lg)',
                  color: 'var(--color-gray-600)',
                  textAlign: 'center',
                  maxWidth: '600px',
                  margin: '0 auto',
                  marginBottom: 'var(--spacing-12)',
                  lineHeight: 'var(--line-height-relaxed)'
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div
          className="cards-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
            gap: 'var(--spacing-8)',
            alignItems: 'start'
          }}
        >
          {cards.map((card, index) => (
            <article
              key={index}
              className="card"
              style={{
                ...cardStyles[cardStyle],
                padding: 'var(--spacing-6)'
              }}
              onMouseEnter={(e) => {
                if (cardStyle === 'default') {
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                } else if (cardStyle === 'elevated') {
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }
              }}
              onMouseLeave={(e) => {
                if (cardStyle === 'default') {
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  e.currentTarget.style.transform = 'translateY(0)';
                } else if (cardStyle === 'elevated') {
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              {card.icon && (
                <div
                  className="card-icon"
                  style={{
                    fontSize: 'var(--font-size-4xl)',
                    marginBottom: 'var(--spacing-4)',
                    color: 'var(--color-primary-500)'
                  }}
                  aria-hidden="true"
                >
                  {card.icon}
                </div>
              )}

              {card.image && (
                <div
                  className="card-image"
                  style={{
                    marginBottom: 'var(--spacing-4)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={card.image}
                    alt={card.imageAlt || ''}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover'
                    }}
                    loading="lazy"
                  />
                </div>
              )}

              <div className="card-content">
                {card.badge && (
                  <span
                    className="card-badge"
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
                    {card.badge}
                  </span>
                )}

                <h3
                  className="card-title"
                  style={{
                    fontFamily: 'var(--font-family-heading)',
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-gray-900)',
                    marginBottom: 'var(--spacing-3)',
                    lineHeight: 'var(--line-height-snug)'
                  }}
                >
                  {card.title}
                </h3>

                {card.description && (
                  <p
                    className="card-description"
                    style={{
                      fontFamily: 'var(--font-family-primary)',
                      fontSize: 'var(--font-size-base)',
                      color: 'var(--color-gray-600)',
                      lineHeight: 'var(--line-height-relaxed)',
                      marginBottom: card.cta ? 'var(--spacing-6)' : '0'
                    }}
                  >
                    {card.description}
                  </p>
                )}

                {card.features && (
                  <ul
                    className="card-features"
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: card.cta ? `var(--spacing-4) 0 var(--spacing-6) 0` : `var(--spacing-4) 0 0 0`
                    }}
                  >
                    {card.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        style={{
                          fontFamily: 'var(--font-family-primary)',
                          fontSize: 'var(--font-size-sm)',
                          color: 'var(--color-gray-600)',
                          marginBottom: 'var(--spacing-2)',
                          paddingLeft: 'var(--spacing-5)',
                          position: 'relative'
                        }}
                      >
                        <span
                          style={{
                            position: 'absolute',
                            left: '0',
                            color: 'var(--color-primary-500)',
                            fontWeight: 'var(--font-weight-bold)'
                          }}
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                {card.cta && (
                  <a
                    href={card.cta.url}
                    className="card-cta"
                    style={{
                      display: 'inline-block',
                      backgroundColor: 'var(--color-primary-500)',
                      color: 'var(--color-white)',
                      padding: 'var(--spacing-2) var(--spacing-4)',
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
                    {card.cta.text}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        .card-grid-section {
          padding: var(--spacing-20) var(--spacing-6);
          background-color: var(--color-gray-50);
        }

        .card-grid-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .card-grid-section {
            padding: var(--spacing-12) var(--spacing-4);
          }

          .cards-grid {
            grid-template-columns: 1fr !important;
            gap: var(--spacing-6) !important;
          }

          .card-grid-title {
            font-size: var(--font-size-2xl) !important;
          }

          .card-grid-subtitle {
            font-size: var(--font-size-base) !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .card {
            transition: none !important;
          }

          .card:hover {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default CardGrid;