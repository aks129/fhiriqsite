/**
 * Navigation Component
 * @module components/Nav
 */

import React, { useState, useRef, useEffect } from 'react';

/**
 * Main site navigation with dropdown menus and mobile support
 * @param {Object} props - Component props
 * @param {Object} props.navigationData - Navigation structure and menu items
 * @param {string} props.currentPage - Current page identifier for highlighting active links
 */
export const Nav = ({
  navigationData = {},
  currentPage = '',
  className = ''
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const mobileMenuRef = useRef(null);
  const navRef = useRef(null);

  const {
    primaryMenu = [],
    secondaryMenu = []
  } = navigationData;

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent scroll when menu is open
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setActiveDropdown(null); // Close any open dropdowns
  };

  const toggleDropdown = (menuId) => {
    setActiveDropdown(activeDropdown === menuId ? null : menuId);
  };

  const handleKeyDown = (event, action, data = null) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        action(data);
        break;
      case 'Escape':
        setActiveDropdown(null);
        setMobileMenuOpen(false);
        break;
      default:
        break;
    }
  };

  const isCurrentPage = (url) => {
    if (!currentPage || !url) return false;
    return currentPage === url || currentPage.startsWith(url + '/');
  };

  const renderMenuItem = (item, isMobile = false) => {
    const hasDropdown = item.children && item.children.length > 0;
    const isActive = isCurrentPage(item.url);
    const dropdownOpen = activeDropdown === item.id;

    if (hasDropdown) {
      return (
        <li
          key={item.id}
          className={`nav-item has-dropdown ${isMobile ? 'mobile' : 'desktop'}`}
          style={{
            position: 'relative'
          }}
        >
          <button
            onClick={() => toggleDropdown(item.id)}
            onKeyDown={(e) => handleKeyDown(e, toggleDropdown, item.id)}
            className={`nav-link dropdown-toggle ${isActive ? 'active' : ''}`}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              fontFamily: 'var(--font-family-primary)',
              fontSize: 'var(--font-size-base)',
              fontWeight: 'var(--font-weight-medium)',
              color: isActive ? 'var(--color-primary-500)' : 'var(--color-gray-700)',
              padding: isMobile ? 'var(--spacing-3) 0' : 'var(--spacing-4) var(--spacing-3)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-1)',
              textDecoration: 'none',
              transition: 'color var(--transition-normal) var(--transition-timing)',
              width: isMobile ? '100%' : 'auto',
              justifyContent: isMobile ? 'space-between' : 'center'
            }}
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
            aria-current={isActive ? 'page' : undefined}
            onMouseEnter={(e) => {
              if (!isMobile && !isActive) {
                e.target.style.color = 'var(--color-primary-500)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile && !isActive) {
                e.target.style.color = 'var(--color-gray-700)';
              }
            }}
          >
            {item.title}
            <span
              style={{
                transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform var(--transition-normal) var(--transition-timing)'
              }}
              aria-hidden="true"
            >
              ▼
            </span>
          </button>

          {/* Dropdown menu */}
          <ul
            className={`dropdown-menu ${dropdownOpen ? 'open' : ''}`}
            style={{
              position: isMobile ? 'static' : 'absolute',
              top: isMobile ? '0' : '100%',
              left: isMobile ? '0' : '0',
              backgroundColor: 'var(--color-white)',
              border: isMobile ? 'none' : '1px solid var(--color-gray-200)',
              borderRadius: isMobile ? '0' : 'var(--radius-md)',
              boxShadow: isMobile ? 'none' : 'var(--shadow-lg)',
              minWidth: isMobile ? 'auto' : '200px',
              padding: isMobile ? 'var(--spacing-2) 0' : 'var(--spacing-2)',
              margin: '0',
              listStyle: 'none',
              zIndex: '200',
              display: dropdownOpen ? 'block' : 'none',
              marginLeft: isMobile ? 'var(--spacing-4)' : '0'
            }}
            role="menu"
            aria-labelledby={`dropdown-${item.id}`}
          >
            {item.children.map((child) => (
              <li key={child.id} role="none">
                <a
                  href={child.url}
                  className={`dropdown-link ${isCurrentPage(child.url) ? 'active' : ''}`}
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-normal)',
                    color: isCurrentPage(child.url) ? 'var(--color-primary-500)' : 'var(--color-gray-700)',
                    padding: 'var(--spacing-2) var(--spacing-3)',
                    textDecoration: 'none',
                    borderRadius: 'var(--radius-sm)',
                    transition: 'all var(--transition-normal) var(--transition-timing)'
                  }}
                  role="menuitem"
                  aria-current={isCurrentPage(child.url) ? 'page' : undefined}
                  onMouseEnter={(e) => {
                    if (!isCurrentPage(child.url)) {
                      e.target.style.backgroundColor = 'var(--color-gray-50)';
                      e.target.style.color = 'var(--color-primary-500)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isCurrentPage(child.url)) {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = 'var(--color-gray-700)';
                    }
                  }}
                >
                  {child.title}
                </a>
              </li>
            ))}
          </ul>
        </li>
      );
    }

    return (
      <li key={item.id} className={`nav-item ${isMobile ? 'mobile' : 'desktop'}`}>
        <a
          href={item.url}
          className={`nav-link ${isActive ? 'active' : ''}`}
          style={{
            fontFamily: 'var(--font-family-primary)',
            fontSize: 'var(--font-size-base)',
            fontWeight: 'var(--font-weight-medium)',
            color: isActive ? 'var(--color-primary-500)' : 'var(--color-gray-700)',
            padding: isMobile ? 'var(--spacing-3) 0' : 'var(--spacing-4) var(--spacing-3)',
            textDecoration: 'none',
            display: 'block',
            transition: 'color var(--transition-normal) var(--transition-timing)',
            borderBottom: isMobile ? '1px solid var(--color-gray-100)' : 'none'
          }}
          aria-current={isActive ? 'page' : undefined}
          onMouseEnter={(e) => {
            if (!isActive) {
              e.target.style.color = 'var(--color-primary-500)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isActive) {
              e.target.style.color = 'var(--color-gray-700)';
            }
          }}
        >
          {item.title}
        </a>
      </li>
    );
  };

  return (
    <nav
      ref={navRef}
      className={`site-navigation ${className}`}
      style={{
        backgroundColor: 'var(--color-white)',
        borderTop: '1px solid var(--color-gray-100)'
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div
        className="nav-container"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 var(--spacing-6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative'
        }}
      >
        {/* Desktop Navigation */}
        <ul
          className="nav-menu desktop-menu"
          style={{
            display: 'flex',
            listStyle: 'none',
            margin: '0',
            padding: '0',
            alignItems: 'center',
            gap: 'var(--spacing-2)'
          }}
        >
          {primaryMenu.map((item) => renderMenuItem(item, false))}
        </ul>

        {/* Secondary Menu (Desktop) */}
        {secondaryMenu.length > 0 && (
          <ul
            className="nav-secondary desktop-menu"
            style={{
              display: 'flex',
              listStyle: 'none',
              margin: '0',
              padding: '0',
              alignItems: 'center',
              gap: 'var(--spacing-2)'
            }}
          >
            {secondaryMenu.map((item) => renderMenuItem(item, false))}
          </ul>
        )}

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMobileMenu}
          onKeyDown={(e) => handleKeyDown(e, toggleMobileMenu)}
          className="mobile-menu-toggle"
          style={{
            display: 'none',
            backgroundColor: 'transparent',
            border: 'none',
            padding: 'var(--spacing-2)',
            cursor: 'pointer',
            fontSize: 'var(--font-size-xl)',
            color: 'var(--color-gray-700)'
          }}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle mobile menu"
        >
          <span
            style={{
              display: 'block',
              width: '24px',
              height: '2px',
              backgroundColor: 'currentColor',
              margin: '4px 0',
              transition: 'all var(--transition-normal) var(--transition-timing)',
              transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
            }}
          />
          <span
            style={{
              display: 'block',
              width: '24px',
              height: '2px',
              backgroundColor: 'currentColor',
              margin: '4px 0',
              transition: 'all var(--transition-normal) var(--transition-timing)',
              opacity: mobileMenuOpen ? '0' : '1'
            }}
          />
          <span
            style={{
              display: 'block',
              width: '24px',
              height: '2px',
              backgroundColor: 'currentColor',
              margin: '4px 0',
              transition: 'all var(--transition-normal) var(--transition-timing)',
              transform: mobileMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none'
            }}
          />
        </button>

        {/* Mobile Navigation Menu */}
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}
          style={{
            position: 'fixed',
            top: '151px', // Header + nav height
            left: '0',
            right: '0',
            bottom: '0',
            backgroundColor: 'var(--color-white)',
            borderTop: '1px solid var(--color-gray-200)',
            transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform var(--transition-normal) var(--transition-timing)',
            zIndex: '150',
            overflow: 'auto',
            display: 'none' // Will be shown in mobile styles
          }}
          aria-hidden={!mobileMenuOpen}
        >
          <div
            style={{
              padding: 'var(--spacing-6) var(--spacing-4)'
            }}
          >
            {/* Primary menu items */}
            <ul
              className="mobile-nav-list"
              style={{
                listStyle: 'none',
                margin: '0',
                padding: '0',
                marginBottom: secondaryMenu.length > 0 ? 'var(--spacing-6)' : '0'
              }}
            >
              {primaryMenu.map((item) => renderMenuItem(item, true))}
            </ul>

            {/* Secondary menu items */}
            {secondaryMenu.length > 0 && (
              <>
                <hr
                  style={{
                    border: 'none',
                    borderTop: '1px solid var(--color-gray-200)',
                    margin: 'var(--spacing-6) 0'
                  }}
                />
                <ul
                  className="mobile-nav-secondary"
                  style={{
                    listStyle: 'none',
                    margin: '0',
                    padding: '0'
                  }}
                >
                  {secondaryMenu.map((item) => renderMenuItem(item, true))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }

          .mobile-menu-toggle {
            display: block !important;
          }

          .mobile-menu {
            display: block !important;
          }

          .nav-container {
            padding: 0 var(--spacing-4) !important;
          }
        }

        @media (min-width: 769px) {
          .mobile-menu {
            display: none !important;
          }

          .mobile-menu-toggle {
            display: none !important;
          }

          .nav-item.has-dropdown:hover .dropdown-menu {
            display: block !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .nav-link,
          .dropdown-link,
          .mobile-menu,
          .dropdown-menu,
          .mobile-menu-toggle span {
            transition: none !important;
          }
        }

        /* Focus visible styles */
        .nav-link:focus-visible,
        .dropdown-link:focus-visible,
        .mobile-menu-toggle:focus-visible {
          outline: 3px solid var(--color-primary-500);
          outline-offset: 2px;
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .nav-link,
          .dropdown-link {
            border: 1px solid transparent;
          }

          .nav-link:hover,
          .nav-link.active,
          .dropdown-link:hover,
          .dropdown-link.active {
            border-color: currentColor;
          }
        }
      `}</style>
    </nav>
  );
};

export default Nav;