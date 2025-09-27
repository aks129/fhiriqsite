/**
 * Stats Section Component
 * @module sections/stats
 */

import React from 'react';

/**
 * Statistics section with animated counters and descriptions
 * @param {Object} props - Component props
 * @param {Array} props.stats - Array of stat objects
 * @param {string} props.title - Section title (optional)
 * @param {string} props.background - Background color/style
 */
export const Stats = ({
  stats = [],
  title,
  background = 'white',
  className = ''
}) => {
  const backgroundStyles = {
    white: { backgroundColor: 'var(--color-white)' },
    gray: { backgroundColor: 'var(--color-gray-50)' },
    primary: { backgroundColor: 'var(--color-primary-500)', color: 'var(--color-white)' },
    dark: { backgroundColor: 'var(--color-gray-900)', color: 'var(--color-white)' }
  };

  return (
    <section
      className={`stats-section ${className}`}
      style={backgroundStyles[background]}
      aria-labelledby={title ? "stats-title" : undefined}
    >
      <div className="stats-container">
        {title && (
          <h2
            id="stats-title"
            className="stats-title"
            style={{
              fontFamily: 'var(--font-family-heading)',
              fontSize: 'var(--font-size-3xl)',
              fontWeight: 'var(--font-weight-bold)',
              textAlign: 'center',
              marginBottom: 'var(--spacing-12)',
              color: background === 'primary' || background === 'dark'
                ? 'var(--color-white)'
                : 'var(--color-gray-900)'
            }}
          >
            {title}
          </h2>
        )}

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-item"
              style={{
                textAlign: 'center',
                padding: 'var(--spacing-6)'
              }}
            >
              <div
                className="stat-value"
                style={{
                  fontFamily: 'var(--font-family-heading)',
                  fontSize: 'var(--font-size-5xl)',
                  fontWeight: 'var(--font-weight-extrabold)',
                  lineHeight: 'var(--line-height-tight)',
                  color: background === 'primary' || background === 'dark'
                    ? 'var(--color-white)'
                    : 'var(--color-primary-500)',
                  marginBottom: 'var(--spacing-2)'
                }}
                aria-label={`${stat.value} ${stat.label}`}
              >
                {stat.prefix}{stat.value}{stat.suffix}
              </div>

              <div
                className="stat-label"
                style={{
                  fontFamily: 'var(--font-family-primary)',
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: background === 'primary' || background === 'dark'
                    ? 'var(--color-white)'
                    : 'var(--color-gray-700)',
                  marginBottom: 'var(--spacing-2)'
                }}
              >
                {stat.label}
              </div>

              {stat.description && (
                <p
                  className="stat-description"
                  style={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-sm)',
                    color: background === 'primary' || background === 'dark'
                      ? 'var(--color-gray-200)'
                      : 'var(--color-gray-500)',
                    lineHeight: 'var(--line-height-relaxed)',
                    margin: 0
                  }}
                >
                  {stat.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .stats-section {
          padding: var(--spacing-20) var(--spacing-6);
        }

        .stats-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--spacing-8);
          align-items: start;
        }

        .stat-item {
          position: relative;
        }

        .stat-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 2px;
          background-color: ${background === 'primary' || background === 'dark'
            ? 'var(--color-white)'
            : 'var(--color-primary-500)'};
          opacity: 0.3;
        }

        @media (max-width: 768px) {
          .stats-section {
            padding: var(--spacing-12) var(--spacing-4);
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-6);
          }

          .stats-title {
            font-size: var(--font-size-2xl) !important;
            margin-bottom: var(--spacing-8) !important;
          }

          .stat-value {
            font-size: var(--font-size-4xl) !important;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .stat-item {
            padding: var(--spacing-4) !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .stat-value {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Stats;