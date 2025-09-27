/**
 * Hero Section Component
 * @module sections/hero
 */

import React from 'react';

/**
 * Hero section with headline, subheadline, CTAs, and optional image/video
 * @param {Object} props - Component props
 * @param {string} props.headline - Main headline text
 * @param {string} props.subheadline - Supporting text
 * @param {Object} props.primaryCTA - Primary button config
 * @param {Object} props.secondaryCTA - Secondary button config
 * @param {string} props.backgroundImage - Background image URL
 * @param {string} props.videoUrl - Background video URL
 * @param {string} props.alignment - Text alignment (left, center, right)
 */
export const Hero = ({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  videoUrl,
  alignment = 'center',
  className = ''
}) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto'
  };

  return (
    <section
      className={`hero-section ${className}`}
      aria-labelledby="hero-headline"
      style={{
        '--hero-bg-image': backgroundImage ? `url(${backgroundImage})` : 'none'
      }}
    >
      {videoUrl && (
        <div className="hero-video-wrapper">
          <video
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="hero-video"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      )}

      <div className="hero-container">
        <div className={`hero-content ${alignmentClasses[alignment]}`}>
          <h1
            id="hero-headline"
            className="hero-headline"
            style={{
              fontFamily: 'var(--font-family-heading)',
              fontSize: 'var(--font-size-5xl)',
              fontWeight: 'var(--font-weight-extrabold)',
              lineHeight: 'var(--line-height-tight)',
              color: 'var(--color-gray-900)'
            }}
          >
            {headline}
          </h1>

          {subheadline && (
            <p
              className="hero-subheadline"
              style={{
                fontFamily: 'var(--font-family-primary)',
                fontSize: 'var(--font-size-xl)',
                fontWeight: 'var(--font-weight-normal)',
                lineHeight: 'var(--line-height-relaxed)',
                color: 'var(--color-gray-600)',
                marginTop: 'var(--spacing-6)'
              }}
            >
              {subheadline}
            </p>
          )}

          {(primaryCTA || secondaryCTA) && (
            <div
              className="hero-cta-group"
              style={{
                display: 'flex',
                gap: 'var(--spacing-4)',
                marginTop: 'var(--spacing-8)',
                justifyContent: alignment === 'center' ? 'center' : 'flex-start'
              }}
            >
              {primaryCTA && (
                <a
                  href={primaryCTA.url}
                  className="btn btn-primary hero-cta-primary"
                  style={{
                    backgroundColor: 'var(--color-primary-500)',
                    color: 'var(--color-white)',
                    padding: 'var(--spacing-3) var(--spacing-6)',
                    borderRadius: 'var(--radius-lg)',
                    fontWeight: 'var(--font-weight-semibold)',
                    transition: 'all var(--transition-normal) var(--transition-timing)',
                    textDecoration: 'none',
                    display: 'inline-block'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'var(--color-primary-600)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'var(--color-primary-500)';
                  }}
                >
                  {primaryCTA.text}
                </a>
              )}

              {secondaryCTA && (
                <a
                  href={secondaryCTA.url}
                  className="btn btn-secondary hero-cta-secondary"
                  style={{
                    backgroundColor: 'var(--color-white)',
                    color: 'var(--color-primary-500)',
                    border: '2px solid var(--color-primary-500)',
                    padding: 'calc(var(--spacing-3) - 2px) calc(var(--spacing-6) - 2px)',
                    borderRadius: 'var(--radius-lg)',
                    fontWeight: 'var(--font-weight-semibold)',
                    transition: 'all var(--transition-normal) var(--transition-timing)',
                    textDecoration: 'none',
                    display: 'inline-block'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'var(--color-primary-50)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'var(--color-white)';
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
        .hero-section {
          position: relative;
          min-height: 600px;
          padding: var(--spacing-20) var(--spacing-6);
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: var(--hero-bg-image);
          background-size: cover;
          background-position: center;
          opacity: 0.1;
          z-index: -1;
        }

        .hero-video-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          overflow: hidden;
        }

        .hero-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .hero-content {
          max-width: 800px;
        }

        @media (max-width: 768px) {
          .hero-section {
            min-height: 400px;
            padding: var(--spacing-12) var(--spacing-4);
          }

          .hero-headline {
            font-size: var(--font-size-4xl) !important;
          }

          .hero-subheadline {
            font-size: var(--font-size-lg) !important;
          }

          .hero-cta-group {
            flex-direction: column;
            width: 100%;
          }

          .hero-cta-group a {
            width: 100%;
            text-align: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-video {
            display: none;
          }

          .btn {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;