/**
 * Feature Tabs Component
 * @module sections/featureTabs
 */

import React, { useState } from 'react';

/**
 * Tabbed feature showcase with dynamic content switching
 * @param {Object} props - Component props
 * @param {Array} props.tabs - Array of tab objects with content
 * @param {string} props.title - Section title
 * @param {string} props.subtitle - Section subtitle
 * @param {string} props.layout - Layout variant (horizontal, vertical)
 */
export const FeatureTabs = ({
  tabs = [],
  title,
  subtitle,
  layout = 'horizontal',
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index, event) => {
    setActiveTab(index);
    // Announce tab change to screen readers
    const announcement = `Selected ${tabs[index].title} tab`;
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = announcement;
    document.body.appendChild(announcer);
    setTimeout(() => document.body.removeChild(announcer), 1000);
  };

  const handleKeyDown = (index, event) => {
    const tabCount = tabs.length;
    let newIndex = activeTab;

    switch (event.key) {
      case 'ArrowLeft':
        newIndex = index > 0 ? index - 1 : tabCount - 1;
        break;
      case 'ArrowRight':
        newIndex = index < tabCount - 1 ? index + 1 : 0;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = tabCount - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    setActiveTab(newIndex);

    // Focus the new tab
    const newTabButton = event.currentTarget.parentElement.children[newIndex];
    if (newTabButton) {
      newTabButton.focus();
    }
  };

  if (!tabs.length) return null;

  const currentTab = tabs[activeTab];

  return (
    <section
      className={`feature-tabs-section ${className}`}
      aria-labelledby={title ? "feature-tabs-title" : "feature-tabs-label"}
    >
      <div className="feature-tabs-container">
        {/* Header */}
        {(title || subtitle) && (
          <div className="feature-tabs-header">
            {title ? (
              <h2
                id="feature-tabs-title"
                className="feature-tabs-title"
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
            ) : (
              <h2 id="feature-tabs-label" className="sr-only">Feature Tabs</h2>
            )}

            {subtitle && (
              <p
                className="feature-tabs-subtitle"
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
          className={`feature-tabs-wrapper layout-${layout}`}
          style={{
            display: layout === 'horizontal' ? 'block' : 'flex',
            gap: layout === 'vertical' ? 'var(--spacing-8)' : '0',
            alignItems: layout === 'vertical' ? 'flex-start' : 'normal'
          }}
        >
          {/* Tab navigation */}
          <div
            className="tab-navigation"
            style={{
              display: 'flex',
              flexDirection: layout === 'vertical' ? 'column' : 'row',
              marginBottom: layout === 'horizontal' ? 'var(--spacing-8)' : '0',
              borderBottom: layout === 'horizontal' ? '1px solid var(--color-gray-200)' : 'none',
              flexShrink: layout === 'vertical' ? 0 : 'initial',
              minWidth: layout === 'vertical' ? '200px' : 'auto'
            }}
            role="tablist"
            aria-label="Feature categories"
          >
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={(e) => handleTabClick(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`tab-button ${index === activeTab ? 'active' : ''}`}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  padding: layout === 'horizontal'
                    ? 'var(--spacing-4) var(--spacing-6)'
                    : 'var(--spacing-3) var(--spacing-4)',
                  fontFamily: 'var(--font-family-primary)',
                  fontSize: 'var(--font-size-base)',
                  fontWeight: index === activeTab ? 'var(--font-weight-semibold)' : 'var(--font-weight-normal)',
                  color: index === activeTab ? 'var(--color-primary-500)' : 'var(--color-gray-600)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-normal) var(--transition-timing)',
                  borderBottom: layout === 'horizontal' && index === activeTab
                    ? '2px solid var(--color-primary-500)'
                    : layout === 'horizontal' ? '2px solid transparent' : 'none',
                  borderLeft: layout === 'vertical' && index === activeTab
                    ? '3px solid var(--color-primary-500)'
                    : layout === 'vertical' ? '3px solid transparent' : 'none',
                  textAlign: 'left',
                  width: layout === 'vertical' ? '100%' : 'auto',
                  marginBottom: layout === 'vertical' ? 'var(--spacing-1)' : '0'
                }}
                role="tab"
                aria-selected={index === activeTab}
                aria-controls={`tabpanel-${index}`}
                id={`tab-${index}`}
                tabIndex={index === activeTab ? 0 : -1}
                onMouseEnter={(e) => {
                  if (index !== activeTab) {
                    e.target.style.color = 'var(--color-gray-700)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== activeTab) {
                    e.target.style.color = 'var(--color-gray-600)';
                  }
                }}
              >
                {tab.title}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div
            className="tab-content"
            style={{
              flex: layout === 'vertical' ? '1' : 'initial'
            }}
          >
            <div
              id={`tabpanel-${activeTab}`}
              className="tab-panel"
              role="tabpanel"
              aria-labelledby={`tab-${activeTab}`}
              style={{
                backgroundColor: 'var(--color-white)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--spacing-8)',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              {currentTab.icon && (
                <div
                  className="tab-icon"
                  style={{
                    fontSize: 'var(--font-size-4xl)',
                    color: 'var(--color-primary-500)',
                    marginBottom: 'var(--spacing-4)'
                  }}
                  aria-hidden="true"
                >
                  {currentTab.icon}
                </div>
              )}

              <h3
                className="tab-content-title"
                style={{
                  fontFamily: 'var(--font-family-heading)',
                  fontSize: 'var(--font-size-2xl)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-gray-900)',
                  marginBottom: 'var(--spacing-4)'
                }}
              >
                {currentTab.contentTitle || currentTab.title}
              </h3>

              {currentTab.description && (
                <p
                  className="tab-description"
                  style={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-lg)',
                    color: 'var(--color-gray-600)',
                    lineHeight: 'var(--line-height-relaxed)',
                    marginBottom: currentTab.features || currentTab.image ? 'var(--spacing-6)' : '0'
                  }}
                >
                  {currentTab.description}
                </p>
              )}

              {currentTab.features && (
                <ul
                  className="tab-features"
                  style={{
                    listStyle: 'none',
                    padding: '0',
                    margin: currentTab.image ? '0 0 var(--spacing-6) 0' : '0'
                  }}
                >
                  {currentTab.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      style={{
                        fontFamily: 'var(--font-family-primary)',
                        fontSize: 'var(--font-size-base)',
                        color: 'var(--color-gray-700)',
                        marginBottom: 'var(--spacing-3)',
                        paddingLeft: 'var(--spacing-6)',
                        position: 'relative',
                        lineHeight: 'var(--line-height-relaxed)'
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

              {currentTab.image && (
                <div
                  className="tab-image"
                  style={{
                    marginTop: 'var(--spacing-6)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={currentTab.image}
                    alt={currentTab.imageAlt || `${currentTab.title} illustration`}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block'
                    }}
                    loading="lazy"
                  />
                </div>
              )}

              {currentTab.cta && (
                <a
                  href={currentTab.cta.url}
                  className="tab-cta"
                  style={{
                    display: 'inline-block',
                    backgroundColor: 'var(--color-primary-500)',
                    color: 'var(--color-white)',
                    padding: 'var(--spacing-3) var(--spacing-6)',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: 'var(--font-size-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                    textDecoration: 'none',
                    marginTop: 'var(--spacing-6)',
                    transition: 'all var(--transition-normal) var(--transition-timing)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'var(--color-primary-600)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'var(--color-primary-500)';
                  }}
                >
                  {currentTab.cta.text}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .feature-tabs-section {
          padding: var(--spacing-20) var(--spacing-6);
          background-color: var(--color-gray-50);
        }

        .feature-tabs-container {
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
          .feature-tabs-section {
            padding: var(--spacing-12) var(--spacing-4);
          }

          .feature-tabs-title {
            font-size: var(--font-size-2xl) !important;
          }

          .feature-tabs-subtitle {
            font-size: var(--font-size-base) !important;
          }

          .feature-tabs-wrapper {
            display: block !important;
          }

          .tab-navigation {
            flex-direction: row !important;
            margin-bottom: var(--spacing-6) !important;
            border-bottom: 1px solid var(--color-gray-200) !important;
            overflow-x: auto;
            scrollbar-width: thin;
          }

          .tab-button {
            flex-shrink: 0;
            min-width: auto;
            width: auto !important;
            border-left: none !important;
            border-bottom: 2px solid transparent !important;
            margin-bottom: 0 !important;
          }

          .tab-button.active {
            border-bottom: 2px solid var(--color-primary-500) !important;
          }

          .tab-panel {
            padding: var(--spacing-6) !important;
          }

          .tab-content-title {
            font-size: var(--font-size-xl) !important;
          }

          .tab-description {
            font-size: var(--font-size-base) !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tab-button,
          .tab-cta {
            transition: none !important;
          }
        }

        /* Focus visible styles */
        .tab-button:focus-visible {
          outline: 3px solid var(--color-primary-500);
          outline-offset: 2px;
        }

        .tab-cta:focus-visible {
          outline: 3px solid var(--color-white);
          outline-offset: 2px;
        }
      `}</style>
    </section>
  );
};

export default FeatureTabs;