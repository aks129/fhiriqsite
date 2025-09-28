/**
 * Global Layout Component
 * @module components/Layout
 */

import React from 'react';
import Nav from './Nav';
import SearchBox from './SearchBox';

/**
 * Main site layout wrapper with header, navigation, and footer
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content
 * @param {Object} props.siteSettings - Site configuration
 * @param {Object} props.navigationData - Navigation structure
 * @param {boolean} props.showSearch - Show search functionality
 * @param {string} props.currentPage - Current page identifier for nav highlighting
 */
export const Layout = ({
  children,
  siteSettings = {},
  navigationData = {},
  showSearch = true,
  currentPage = '',
  className = ''
}) => {
  const {
    siteName = 'FHIR IQ',
    logo,
    tagline = 'AI-Powered FHIR Development',
    contactInfo = {},
    socialLinks = [],
    footerLinks = []
  } = siteSettings;

  const currentYear = new Date().getFullYear();

  return (
    <div className={`site-layout ${className}`}>
      {/* Skip to main content link for screen readers */}
      <a
        href="#main-content"
        className="skip-link"
        style={{
          position: 'absolute',
          top: '-40px',
          left: '6px',
          backgroundColor: 'var(--color-primary-500)',
          color: 'var(--color-white)',
          padding: 'var(--spacing-2) var(--spacing-4)',
          borderRadius: 'var(--radius-md)',
          textDecoration: 'none',
          fontSize: 'var(--font-size-sm)',
          fontWeight: 'var(--font-weight-semibold)',
          zIndex: '9999',
          transition: 'top var(--transition-fast) var(--transition-timing)'
        }}
        onFocus={(e) => {
          e.target.style.top = '6px';
        }}
        onBlur={(e) => {
          e.target.style.top = '-40px';
        }}
      >
        Skip to main content
      </a>

      {/* Site Header */}
      <header
        className="site-header"
        style={{
          backgroundColor: 'var(--color-white)',
          borderBottom: '1px solid var(--color-gray-200)',
          position: 'sticky',
          top: '0',
          zIndex: '100',
          boxShadow: 'var(--shadow-sm)'
        }}
        role="banner"
      >
        <div
          className="header-container"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 var(--spacing-6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: '80px'
          }}
        >
          {/* Site branding */}
          <div
            className="site-branding"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-3)'
            }}
          >
            {logo ? (
              <img
                src={logo}
                alt={`${siteName} logo`}
                style={{
                  height: '40px',
                  width: 'auto'
                }}
              />
            ) : (
              <div
                className="logo-placeholder"
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'var(--color-primary-500)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-white)',
                  fontFamily: 'var(--font-family-heading)',
                  fontWeight: 'var(--font-weight-bold)',
                  fontSize: 'var(--font-size-lg)'
                }}
                aria-hidden="true"
              >
                FIQ
              </div>
            )}

            <div className="branding-text">
              <h1
                style={{
                  fontFamily: 'var(--font-family-heading)',
                  fontSize: 'var(--font-size-xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--color-gray-900)',
                  margin: '0',
                  lineHeight: 'var(--line-height-tight)'
                }}
              >
                <a
                  href="/"
                  style={{
                    color: 'inherit',
                    textDecoration: 'none'
                  }}
                >
                  {siteName}
                </a>
              </h1>

              {tagline && (
                <p
                  style={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-gray-600)',
                    margin: '0',
                    lineHeight: 'var(--line-height-tight)'
                  }}
                >
                  {tagline}
                </p>
              )}
            </div>
          </div>

          {/* Header actions */}
          <div
            className="header-actions"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-4)'
            }}
          >
            {/* Search */}
            {showSearch && (
              <SearchBox />
            )}

            {/* CTA Button */}
            <a
              href="/contact"
              className="header-cta"
              style={{
                backgroundColor: 'var(--color-primary-500)',
                color: 'var(--color-white)',
                padding: 'var(--spacing-2) var(--spacing-4)',
                borderRadius: 'var(--radius-lg)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                textDecoration: 'none',
                transition: 'all var(--transition-normal) var(--transition-timing)',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--color-primary-600)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--color-primary-500)';
              }}
            >
              Get Started
            </a>
          </div>
        </div>

        {/* Main Navigation */}
        <Nav
          navigationData={navigationData}
          currentPage={currentPage}
        />
      </header>

      {/* Main Content */}
      <main
        id="main-content"
        className="site-main"
        style={{
          minHeight: 'calc(100vh - 80px)', // Account for header height
          display: 'flex',
          flexDirection: 'column'
        }}
        role="main"
      >
        {children}
      </main>

      {/* Site Footer */}
      <footer
        className="site-footer"
        style={{
          backgroundColor: 'var(--color-gray-900)',
          color: 'var(--color-gray-300)',
          marginTop: 'auto'
        }}
        role="contentinfo"
      >
        <div
          className="footer-container"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: 'var(--spacing-12) var(--spacing-6) var(--spacing-8) var(--spacing-6)'
          }}
        >
          {/* Footer content */}
          <div
            className="footer-content"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 'var(--spacing-8)',
              marginBottom: 'var(--spacing-8)'
            }}
          >
            {/* Company info */}
            <div className="footer-company">
              <h3
                style={{
                  fontFamily: 'var(--font-family-heading)',
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-white)',
                  marginBottom: 'var(--spacing-4)'
                }}
              >
                {siteName}
              </h3>

              {tagline && (
                <p
                  style={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-base)',
                    lineHeight: 'var(--line-height-relaxed)',
                    marginBottom: 'var(--spacing-4)'
                  }}
                >
                  {tagline}
                </p>
              )}

              {contactInfo.email && (
                <p
                  style={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-sm)',
                    marginBottom: 'var(--spacing-2)'
                  }}
                >
                  <a
                    href={`mailto:${contactInfo.email}`}
                    style={{
                      color: 'var(--color-primary-400)',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.textDecoration = 'none';
                    }}
                  >
                    {contactInfo.email}
                  </a>
                </p>
              )}

              {contactInfo.phone && (
                <p
                  style={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-sm)'
                  }}
                >
                  <a
                    href={`tel:${contactInfo.phone}`}
                    style={{
                      color: 'var(--color-primary-400)',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.textDecoration = 'none';
                    }}
                  >
                    {contactInfo.phone}
                  </a>
                </p>
              )}
            </div>

            {/* Footer links */}
            {footerLinks.map((section, sectionIndex) => (
              <div key={sectionIndex} className="footer-links">
                <h4
                  style={{
                    fontFamily: 'var(--font-family-heading)',
                    fontSize: 'var(--font-size-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-white)',
                    marginBottom: 'var(--spacing-4)'
                  }}
                >
                  {section.title}
                </h4>

                <ul
                  style={{
                    listStyle: 'none',
                    padding: '0',
                    margin: '0'
                  }}
                >
                  {section.links.map((link, linkIndex) => (
                    <li
                      key={linkIndex}
                      style={{
                        marginBottom: 'var(--spacing-2)'
                      }}
                    >
                      <a
                        href={link.url}
                        style={{
                          fontFamily: 'var(--font-family-primary)',
                          fontSize: 'var(--font-size-sm)',
                          color: 'var(--color-gray-400)',
                          textDecoration: 'none',
                          transition: 'color var(--transition-normal) var(--transition-timing)'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = 'var(--color-primary-400)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = 'var(--color-gray-400)';
                        }}
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Social links */}
            {socialLinks.length > 0 && (
              <div className="footer-social">
                <h4
                  style={{
                    fontFamily: 'var(--font-family-heading)',
                    fontSize: 'var(--font-size-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-white)',
                    marginBottom: 'var(--spacing-4)'
                  }}
                >
                  Connect With Us
                </h4>

                <div
                  style={{
                    display: 'flex',
                    gap: 'var(--spacing-3)',
                    flexWrap: 'wrap'
                  }}
                >
                  {socialLinks.map((social, socialIndex) => (
                    <a
                      key={socialIndex}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        padding: 'var(--spacing-2)',
                        backgroundColor: 'var(--color-gray-800)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--color-gray-400)',
                        textDecoration: 'none',
                        transition: 'all var(--transition-normal) var(--transition-timing)'
                      }}
                      aria-label={`Follow us on ${social.platform}`}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'var(--color-primary-500)';
                        e.target.style.color = 'var(--color-white)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'var(--color-gray-800)';
                        e.target.style.color = 'var(--color-gray-400)';
                      }}
                    >
                      {social.icon || social.platform}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer bottom */}
          <div
            className="footer-bottom"
            style={{
              borderTop: '1px solid var(--color-gray-700)',
              paddingTop: 'var(--spacing-6)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 'var(--spacing-4)'
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-family-primary)',
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-gray-500)',
                margin: '0'
              }}
            >
              © {currentYear} {siteName}. All rights reserved.
            </p>

            <div
              className="footer-legal"
              style={{
                display: 'flex',
                gap: 'var(--spacing-4)',
                fontSize: 'var(--font-size-sm)'
              }}
            >
              <a
                href="/privacy"
                style={{
                  color: 'var(--color-gray-500)',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'var(--color-primary-400)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'var(--color-gray-500)';
                }}
              >
                Privacy Policy
              </a>

              <a
                href="/terms"
                style={{
                  color: 'var(--color-gray-500)',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'var(--color-primary-400)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'var(--color-gray-500)';
                }}
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .site-layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 768px) {
          .header-container {
            padding: 0 var(--spacing-4) !important;
            min-height: 70px !important;
          }

          .site-branding {
            gap: var(--spacing-2) !important;
          }

          .branding-text h1 {
            font-size: var(--font-size-lg) !important;
          }

          .branding-text p {
            display: none;
          }

          .header-actions {
            gap: var(--spacing-2) !important;
          }

          .header-cta {
            padding: var(--spacing-1) var(--spacing-3) !important;
            font-size: var(--font-size-xs) !important;
          }

          .footer-container {
            padding: var(--spacing-8) var(--spacing-4) var(--spacing-6) var(--spacing-4) !important;
          }

          .footer-content {
            grid-template-columns: 1fr !important;
            gap: var(--spacing-6) !important;
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
            gap: var(--spacing-2) !important;
          }

          .footer-legal {
            justify-content: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .skip-link,
          .header-cta,
          .footer-social a {
            transition: none !important;
          }
        }

        /* Focus visible styles */
        .skip-link:focus-visible,
        .header-cta:focus-visible {
          outline: 3px solid var(--color-white);
          outline-offset: 2px;
        }

        .site-branding a:focus-visible {
          outline: 3px solid var(--color-primary-500);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};

export default Layout;