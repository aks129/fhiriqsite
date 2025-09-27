/**
 * Partners Strip Component
 * @module sections/partnersStrip
 */

import React from 'react';

/**
 * Partners/logos strip with optional animation
 * @param {Object} props - Component props
 * @param {Array} props.partners - Array of partner objects
 * @param {string} props.title - Section title
 * @param {boolean} props.animate - Enable scrolling animation
 * @param {string} props.variant - Display variant (grid, strip, carousel)
 */
export const PartnersStrip = ({
  partners = [],
  title,
  animate = false,
  variant = 'strip',
  className = ''
}) => {
  const renderPartners = () => {
    return partners.map((partner, index) => (
      <div
        key={index}
        className="partner-item"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--spacing-4)',
          opacity: 0.7,
          transition: 'opacity var(--transition-normal) var(--transition-timing)',
          minWidth: variant === 'strip' ? '200px' : 'auto'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '0.7';
        }}
      >
        {partner.url ? (
          <a
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              width: '100%',
              textDecoration: 'none'
            }}
            aria-label={`Visit ${partner.name} website`}
          >
            <PartnerLogo partner={partner} />
          </a>
        ) : (
          <PartnerLogo partner={partner} />
        )}
      </div>
    ));
  };

  const PartnerLogo = ({ partner }) => (
    <>
      {partner.logo ? (
        <img
          src={partner.logo}
          alt={`${partner.name} logo`}
          style={{
            maxHeight: '60px',
            maxWidth: '180px',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            filter: 'grayscale(1)',
            transition: 'filter var(--transition-normal) var(--transition-timing)'
          }}
          loading="lazy"
          onMouseEnter={(e) => {
            e.target.style.filter = 'grayscale(0)';
          }}
          onMouseLeave={(e) => {
            e.target.style.filter = 'grayscale(1)';
          }}
        />
      ) : (
        <div
          style={{
            fontFamily: 'var(--font-family-heading)',
            fontSize: 'var(--font-size-lg)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-gray-600)',
            textAlign: 'center',
            padding: 'var(--spacing-4)',
            border: '2px dashed var(--color-gray-300)',
            borderRadius: 'var(--radius-md)',
            minHeight: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {partner.name}
        </div>
      )}
    </>
  );

  if (!partners.length) return null;

  return (
    <section
      className={`partners-strip-section ${className}`}
      aria-labelledby={title ? "partners-title" : "partners-label"}
    >
      <div className="partners-container">
        {title ? (
          <h2
            id="partners-title"
            className="partners-title"
            style={{
              fontFamily: 'var(--font-family-heading)',
              fontSize: 'var(--font-size-2xl)',
              fontWeight: 'var(--font-weight-semibold)',
              textAlign: 'center',
              color: 'var(--color-gray-700)',
              marginBottom: 'var(--spacing-8)'
            }}
          >
            {title}
          </h2>
        ) : (
          <h2 id="partners-label" className="sr-only">
            Our Partners
          </h2>
        )}

        {variant === 'grid' && (
          <div
            className="partners-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--spacing-6)',
              alignItems: 'center'
            }}
          >
            {renderPartners()}
          </div>
        )}

        {variant === 'strip' && (
          <div
            className="partners-strip"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: 'var(--spacing-6)',
              overflow: animate ? 'hidden' : 'visible'
            }}
          >
            {animate ? (
              <div
                className="partners-scroll"
                style={{
                  display: 'flex',
                  animation: 'scroll 30s linear infinite',
                  gap: 'var(--spacing-6)'
                }}
              >
                {renderPartners()}
                {/* Duplicate for seamless loop */}
                {renderPartners()}
              </div>
            ) : (
              renderPartners()
            )}
          </div>
        )}

        {variant === 'carousel' && (
          <div
            className="partners-carousel"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--spacing-4)',
              flexWrap: 'wrap'
            }}
          >
            {renderPartners()}
          </div>
        )}
      </div>

      <style jsx>{`
        .partners-strip-section {
          padding: var(--spacing-16) var(--spacing-6);
          background-color: var(--color-white);
          border-top: 1px solid var(--color-gray-200);
          border-bottom: 1px solid var(--color-gray-200);
        }

        .partners-container {
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

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 768px) {
          .partners-strip-section {
            padding: var(--spacing-12) var(--spacing-4);
          }

          .partners-title {
            font-size: var(--font-size-xl) !important;
            margin-bottom: var(--spacing-6) !important;
          }

          .partners-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)) !important;
            gap: var(--spacing-4) !important;
          }

          .partners-strip {
            justify-content: center !important;
            gap: var(--spacing-4) !important;
          }

          .partner-item {
            min-width: 150px !important;
            padding: var(--spacing-2) !important;
          }

          .partner-item img {
            max-height: 40px !important;
            max-width: 120px !important;
          }
        }

        @media (max-width: 480px) {
          .partners-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .partners-strip {
            flex-direction: column;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .partners-scroll {
            animation: none !important;
          }

          .partner-item,
          .partner-item img {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default PartnersStrip;