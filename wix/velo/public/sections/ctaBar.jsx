/**
 * CTA Bar Component
 * @module sections/ctaBar
 */

import React from 'react';

/**
 * Call-to-action bar with headline, description, and action buttons
 * @param {Object} props - Component props
 * @param {string} props.headline - Main CTA headline
 * @param {string} props.description - Supporting description text
 * @param {Object} props.primaryCTA - Primary button config
 * @param {Object} props.secondaryCTA - Secondary button config
 * @param {string} props.background - Background style variant
 * @param {string} props.layout - Layout variant (horizontal, vertical)
 */
export const CTABar = ({
  headline,
  description,
  primaryCTA,
  secondaryCTA,
  background = 'primary',
  layout = 'horizontal',
  className = ''
}) => {
  const backgroundStyles = {
    primary: {
      backgroundColor: 'var(--color-primary-500)',
      color: 'var(--color-white)'
    },
    secondary: {
      backgroundColor: 'var(--color-secondary-500)',
      color: 'var(--color-white)'
    },
    dark: {
      backgroundColor: 'var(--color-gray-900)',
      color: 'var(--color-white)'
    },
    light: {
      backgroundColor: 'var(--color-gray-50)',
      color: 'var(--color-gray-900)'
    },
    gradient: {
      background: 'linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-secondary-500) 100%)',
      color: 'var(--color-white)'
    }
  };

  const isLightBackground = background === 'light';
  const textColor = isLightBackground ? 'var(--color-gray-900)' : 'var(--color-white)';
  const subtextColor = isLightBackground ? 'var(--color-gray-600)' : 'var(--color-gray-200)';

  return (
    <section
      className={`cta-bar-section ${className}`}
      style={backgroundStyles[background]}
      aria-labelledby="cta-bar-headline"
    >
      <div className="cta-bar-container">
        <div
          className={`cta-bar-content layout-${layout}`}
          style={{
            display: 'flex',
            alignItems: layout === 'horizontal' ? 'center' : 'flex-start',
            flexDirection: layout === 'horizontal' ? 'row' : 'column',
            gap: 'var(--spacing-6)',
            textAlign: layout === 'horizontal' ? 'left' : 'center'
          }}
        >
          {/* Content section */}
          <div
            className="cta-content"
            style={{
              flex: layout === 'horizontal' ? '1' : 'none',
              marginBottom: layout === 'vertical' ? 'var(--spacing-6)' : '0'
            }}
          >
            <h2
              id="cta-bar-headline"
              className="cta-headline"
              style={{
                fontFamily: 'var(--font-family-heading)',
                fontSize: 'var(--font-size-3xl)',
                fontWeight: 'var(--font-weight-bold)',
                lineHeight: 'var(--line-height-tight)',
                color: textColor,
                marginBottom: description ? 'var(--spacing-3)' : '0'
              }}
            >
              {headline}
            </h2>

            {description && (
              <p
                className="cta-description"
                style={{
                  fontFamily: 'var(--font-family-primary)',
                  fontSize: 'var(--font-size-lg)',
                  lineHeight: 'var(--line-height-relaxed)',
                  color: subtextColor,
                  margin: '0',
                  maxWidth: layout === 'horizontal' ? 'none' : '600px'
                }}
              >
                {description}
              </p>
            )}
          </div>

          {/* Actions section */}
          {(primaryCTA || secondaryCTA) && (
            <div
              className="cta-actions"
              style={{
                display: 'flex',
                gap: 'var(--spacing-4)',
                flexShrink: 0,
                flexWrap: 'wrap',
                justifyContent: layout === 'horizontal' ? 'flex-end' : 'center'
              }}
            >
              {primaryCTA && (
                <a
                  href={primaryCTA.url}
                  className="cta-button cta-primary"
                  style={{
                    backgroundColor: isLightBackground
                      ? 'var(--color-primary-500)'
                      : 'var(--color-white)',
                    color: isLightBackground
                      ? 'var(--color-white)'
                      : 'var(--color-primary-500)',
                    padding: 'var(--spacing-3) var(--spacing-6)',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: 'var(--font-size-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                    textDecoration: 'none',
                    display: 'inline-block',
                    transition: 'all var(--transition-normal) var(--transition-timing)',
                    border: isLightBackground
                      ? 'none'
                      : '2px solid var(--color-white)',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    if (isLightBackground) {
                      e.target.style.backgroundColor = 'var(--color-primary-600)';
                    } else {
                      e.target.style.backgroundColor = 'var(--color-gray-100)';
                      e.target.style.color = 'var(--color-primary-600)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isLightBackground) {
                      e.target.style.backgroundColor = 'var(--color-primary-500)';
                    } else {
                      e.target.style.backgroundColor = 'var(--color-white)';
                      e.target.style.color = 'var(--color-primary-500)';
                    }
                  }}
                >
                  {primaryCTA.text}
                </a>
              )}

              {secondaryCTA && (
                <a
                  href={secondaryCTA.url}
                  className="cta-button cta-secondary"
                  style={{
                    backgroundColor: 'transparent',
                    color: textColor,
                    padding: 'var(--spacing-3) var(--spacing-6)',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: 'var(--font-size-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                    textDecoration: 'none',
                    display: 'inline-block',
                    transition: 'all var(--transition-normal) var(--transition-timing)',
                    border: `2px solid ${textColor}`,
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = textColor;
                    e.target.style.color = background === 'light'
                      ? 'var(--color-white)'
                      : 'var(--color-primary-500)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = textColor;
                  }}
                >
                  {secondaryCTA.text}
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .cta-bar-section {
          padding: var(--spacing-16) var(--spacing-6);
          position: relative;
          overflow: hidden;
        }

        .cta-bar-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Gradient background effects */
        .cta-bar-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.1;
          background-image: radial-gradient(circle at 20% 80%, currentColor 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, currentColor 0%, transparent 50%);
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .cta-bar-section {
            padding: var(--spacing-12) var(--spacing-4);
          }

          .cta-bar-content {
            flex-direction: column !important;
            text-align: center !important;
            gap: var(--spacing-4) !important;
          }

          .cta-content {
            margin-bottom: var(--spacing-4) !important;
          }

          .cta-headline {
            font-size: var(--font-size-2xl) !important;
          }

          .cta-description {
            font-size: var(--font-size-base) !important;
          }

          .cta-actions {
            flex-direction: column;
            width: 100%;
            justify-content: center !important;
          }

          .cta-button {
            width: 100%;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .cta-headline {
            font-size: var(--font-size-xl) !important;
          }

          .cta-actions {
            gap: var(--spacing-3) !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cta-button {
            transition: none !important;
          }
        }

        /* Focus visible styles */
        .cta-button:focus-visible {
          outline: 3px solid ${background === 'light' ? 'var(--color-primary-500)' : 'var(--color-white)'};
          outline-offset: 2px;
        }
      `}</style>
    </section>
  );
};

export default CTABar;