/**
 * Search Box Component
 * @module components/SearchBox
 */

import React, { useState, useRef, useEffect } from 'react';

/**
 * Search input with autocomplete and keyboard navigation
 * @param {Object} props - Component props
 * @param {Function} props.onSearch - Search handler function
 * @param {Array} props.suggestions - Search suggestions array
 * @param {string} props.placeholder - Input placeholder text
 * @param {boolean} props.showSuggestions - Show autocomplete suggestions
 * @param {string} props.variant - Display variant (inline, modal)
 */
export const SearchBox = ({
  onSearch,
  suggestions = [],
  placeholder = 'Search...',
  showSuggestions = true,
  variant = 'inline',
  className = ''
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const modalRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Filter suggestions based on query
  useEffect(() => {
    if (query.length > 0 && showSuggestions) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.title?.toLowerCase().includes(query.toLowerCase()) ||
        suggestion.content?.toLowerCase().includes(query.toLowerCase()) ||
        suggestion.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredSuggestions(filtered.slice(0, 8)); // Limit to 8 results
      setIsOpen(filtered.length > 0);
    } else {
      setFilteredSuggestions([]);
      setIsOpen(false);
    }
    setActiveSuggestion(-1);
  }, [query, suggestions, showSuggestions]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
        setActiveSuggestion(-1);
      }
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle modal open/close
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      // Focus the modal input after animation
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 150);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
  };

  const handleSearch = (searchQuery = query) => {
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery.trim());
      } else {
        // Default search behavior - redirect to search page
        window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
      }
      setIsOpen(false);
      setIsModalOpen(false);
      setQuery('');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.url) {
      window.location.href = suggestion.url;
    } else {
      handleSearch(suggestion.title);
    }
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveSuggestion(prev =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;

      case 'ArrowUp':
        event.preventDefault();
        setActiveSuggestion(prev => prev > 0 ? prev - 1 : -1);
        break;

      case 'Enter':
        event.preventDefault();
        if (activeSuggestion >= 0 && filteredSuggestions[activeSuggestion]) {
          handleSuggestionClick(filteredSuggestions[activeSuggestion]);
        } else {
          handleSearch();
        }
        break;

      case 'Escape':
        setIsOpen(false);
        setIsModalOpen(false);
        setActiveSuggestion(-1);
        if (inputRef.current) {
          inputRef.current.blur();
        }
        break;

      default:
        break;
    }
  };

  const highlightMatch = (text, query) => {
    if (!query || !text) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark
          key={index}
          style={{
            backgroundColor: 'var(--color-primary-100)',
            color: 'var(--color-primary-800)',
            padding: '0'
          }}
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const SearchInput = ({ isModal = false }) => (
    <div
      className={`search-input-wrapper ${isModal ? 'modal' : 'inline'}`}
      style={{
        position: 'relative',
        width: isModal ? '100%' : '300px',
        maxWidth: isModal ? '600px' : '300px'
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <input
          ref={isModal ? inputRef : null}
          type="search"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="search-input"
          style={{
            width: '100%',
            padding: isModal
              ? 'var(--spacing-4) var(--spacing-12) var(--spacing-4) var(--spacing-4)'
              : 'var(--spacing-2) var(--spacing-10) var(--spacing-2) var(--spacing-3)',
            fontSize: isModal ? 'var(--font-size-lg)' : 'var(--font-size-sm)',
            fontFamily: 'var(--font-family-primary)',
            border: `1px solid var(--color-gray-300)`,
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--color-white)',
            color: 'var(--color-gray-900)',
            transition: 'all var(--transition-normal) var(--transition-timing)'
          }}
          onFocus={() => {
            if (query && filteredSuggestions.length > 0) {
              setIsOpen(true);
            }
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = 'var(--color-primary-300)';
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = 'var(--color-gray-300)';
          }}
          aria-label="Search"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-activedescendant={activeSuggestion >= 0 ? `suggestion-${activeSuggestion}` : undefined}
          autoComplete="off"
        />

        {/* Search icon */}
        <button
          onClick={() => handleSearch()}
          className="search-button"
          style={{
            position: 'absolute',
            right: 'var(--spacing-1)',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'var(--color-primary-500)',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            width: isModal ? '48px' : '32px',
            height: isModal ? '48px' : '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--color-white)',
            fontSize: isModal ? 'var(--font-size-lg)' : 'var(--font-size-sm)',
            transition: 'all var(--transition-normal) var(--transition-timing)'
          }}
          aria-label="Submit search"
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'var(--color-primary-600)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'var(--color-primary-500)';
          }}
        >
          🔍
        </button>
      </div>

      {/* Suggestions dropdown */}
      {isOpen && filteredSuggestions.length > 0 && (
        <ul
          ref={suggestionsRef}
          className="search-suggestions"
          style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            right: '0',
            backgroundColor: 'var(--color-white)',
            border: '1px solid var(--color-gray-200)',
            borderTop: 'none',
            borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            zIndex: '300',
            maxHeight: '400px',
            overflowY: 'auto',
            listStyle: 'none',
            margin: '0',
            padding: 'var(--spacing-2)'
          }}
          role="listbox"
          aria-label="Search suggestions"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              id={`suggestion-${index}`}
              className={`search-suggestion ${index === activeSuggestion ? 'active' : ''}`}
              style={{
                padding: 'var(--spacing-3)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                backgroundColor: index === activeSuggestion ? 'var(--color-primary-50)' : 'transparent',
                border: index === activeSuggestion ? '1px solid var(--color-primary-200)' : '1px solid transparent',
                marginBottom: 'var(--spacing-1)',
                transition: 'all var(--transition-fast) var(--transition-timing)'
              }}
              onClick={() => handleSuggestionClick(suggestion)}
              role="option"
              aria-selected={index === activeSuggestion}
              onMouseEnter={() => setActiveSuggestion(index)}
              onMouseLeave={() => setActiveSuggestion(-1)}
            >
              <div
                className="suggestion-title"
                style={{
                  fontFamily: 'var(--font-family-primary)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--color-gray-900)',
                  marginBottom: suggestion.content ? 'var(--spacing-1)' : '0'
                }}
              >
                {highlightMatch(suggestion.title, query)}
              </div>

              {suggestion.content && (
                <div
                  className="suggestion-content"
                  style={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-gray-600)',
                    lineHeight: 'var(--line-height-relaxed)'
                  }}
                >
                  {highlightMatch(
                    suggestion.content.length > 80
                      ? suggestion.content.substring(0, 80) + '...'
                      : suggestion.content,
                    query
                  )}
                </div>
              )}

              {suggestion.type && (
                <span
                  className="suggestion-type"
                  style={{
                    display: 'inline-block',
                    backgroundColor: 'var(--color-gray-100)',
                    color: 'var(--color-gray-600)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-medium)',
                    padding: 'var(--spacing-1) var(--spacing-2)',
                    borderRadius: 'var(--radius-sm)',
                    marginTop: 'var(--spacing-1)',
                    textTransform: 'capitalize'
                  }}
                >
                  {suggestion.type}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  if (variant === 'modal') {
    return (
      <>
        {/* Modal trigger button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className={`search-trigger ${className}`}
          style={{
            backgroundColor: 'var(--color-gray-50)',
            border: '1px solid var(--color-gray-300)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-2) var(--spacing-3)',
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-gray-500)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-2)',
            minWidth: '200px',
            justifyContent: 'space-between',
            transition: 'all var(--transition-normal) var(--transition-timing)'
          }}
          aria-label="Open search"
          onMouseEnter={(e) => {
            e.target.style.borderColor = 'var(--color-primary-300)';
            e.target.style.backgroundColor = 'var(--color-white)';
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = 'var(--color-gray-300)';
            e.target.style.backgroundColor = 'var(--color-gray-50)';
          }}
        >
          <span>🔍 {placeholder}</span>
          <kbd
            style={{
              backgroundColor: 'var(--color-gray-200)',
              border: '1px solid var(--color-gray-300)',
              borderRadius: 'var(--radius-sm)',
              padding: '2px 6px',
              fontSize: 'var(--font-size-xs)',
              fontFamily: 'monospace'
            }}
          >
            ⌘K
          </kbd>
        </button>

        {/* Search modal */}
        {isModalOpen && (
          <div
            className="search-modal-overlay"
            style={{
              position: 'fixed',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: '1000',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingTop: '10vh',
              animation: 'fadeIn 0.15s ease-out'
            }}
            onClick={() => setIsModalOpen(false)}
          >
            <div
              ref={modalRef}
              className="search-modal"
              style={{
                backgroundColor: 'var(--color-white)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--spacing-6)',
                width: '90%',
                maxWidth: '600px',
                boxShadow: 'var(--shadow-2xl)',
                animation: 'slideUp 0.15s ease-out'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 'var(--spacing-4)'
                }}
              >
                <h2
                  style={{
                    fontFamily: 'var(--font-family-heading)',
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-gray-900)',
                    margin: '0'
                  }}
                >
                  Search
                </h2>

                <button
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    fontSize: 'var(--font-size-xl)',
                    color: 'var(--color-gray-500)',
                    cursor: 'pointer',
                    padding: 'var(--spacing-1)'
                  }}
                  aria-label="Close search"
                >
                  ✕
                </button>
              </div>

              <SearchInput isModal={true} />
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div ref={searchRef} className={`search-box ${className}`}>
      <SearchInput isModal={false} />
    </div>
  );
};

// Keyboard shortcut for modal variant
if (typeof window !== 'undefined') {
  document.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      const modalTrigger = document.querySelector('.search-trigger');
      if (modalTrigger) {
        modalTrigger.click();
      }
    }
  });
}

export default SearchBox;

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .search-modal-overlay,
    .search-modal {
      animation: none !important;
    }
  }
`;

if (typeof document !== 'undefined' && !document.querySelector('#search-animations')) {
  style.id = 'search-animations';
  document.head.appendChild(style);
}