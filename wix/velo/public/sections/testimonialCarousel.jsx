/**
 * Testimonial Carousel Component
 * @module sections/testimonialCarousel
 */

import React, { useState, useEffect } from 'react';

/**
 * Testimonial carousel with navigation and auto-rotation
 * @param {Object} props - Component props
 * @param {Array} props.testimonials - Array of testimonial objects
 * @param {string} props.title - Section title
 * @param {boolean} props.autoRotate - Auto-rotate testimonials
 * @param {number} props.rotateInterval - Rotation interval in ms
 */
export const TestimonialCarousel = ({
  testimonials = [],
  title,
  autoRotate = true,
  rotateInterval = 5000,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoRotate);

  useEffect(() => {
    if (!isPlaying || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, rotateInterval);

    return () => clearInterval(interval);
  }, [isPlaying, testimonials.length, rotateInterval]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (!testimonials.length) return null;

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      className={`testimonial-carousel-section ${className}`}
      aria-labelledby={title ? "testimonial-carousel-title" : "testimonial-carousel-label"}
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="testimonial-carousel-container">
        {title && (
          <h2
            id="testimonial-carousel-title"
            className="testimonial-carousel-title"
            style={{
              fontFamily: 'var(--font-family-heading)',
              fontSize: 'var(--font-size-3xl)',
              fontWeight: 'var(--font-weight-bold)',
              textAlign: 'center',
              color: 'var(--color-gray-900)',
              marginBottom: 'var(--spacing-12)'
            }}
          >
            {title}
          </h2>
        )}

        <div className="testimonial-carousel">
          {/* Screen reader label when no title */}
          {!title && (
            <h2 id="testimonial-carousel-label" className="sr-only">
              Customer Testimonials
            </h2>
          )}

          {/* Main testimonial display */}
          <div
            className="testimonial-display"
            style={{
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto',
              padding: 'var(--spacing-8)',
              backgroundColor: 'var(--color-white)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-lg)',
              position: 'relative'
            }}
          >
            {/* Quote mark */}
            <div
              className="quote-mark"
              style={{
                fontSize: 'var(--font-size-6xl)',
                color: 'var(--color-primary-200)',
                lineHeight: '1',
                marginBottom: 'var(--spacing-4)'
              }}
              aria-hidden="true"
            >
              "
            </div>

            {/* Quote text */}
            <blockquote
              className="testimonial-quote"
              style={{
                fontFamily: 'var(--font-family-primary)',
                fontSize: 'var(--font-size-xl)',
                fontWeight: 'var(--font-weight-normal)',
                lineHeight: 'var(--line-height-relaxed)',
                color: 'var(--color-gray-700)',
                fontStyle: 'italic',
                marginBottom: 'var(--spacing-8)',
                margin: '0'
              }}
            >
              {currentTestimonial.quote}
            </blockquote>

            {/* Author info */}
            <div className="testimonial-author">
              {currentTestimonial.photo && (
                <img
                  src={currentTestimonial.photo}
                  alt={`Photo of ${currentTestimonial.name}`}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: 'var(--radius-full)',
                    objectFit: 'cover',
                    margin: '0 auto var(--spacing-4) auto',
                    display: 'block'
                  }}
                  loading="lazy"
                />
              )}

              <cite
                className="author-name"
                style={{
                  fontFamily: 'var(--font-family-heading)',
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-gray-900)',
                  fontStyle: 'normal',
                  display: 'block',
                  marginBottom: 'var(--spacing-1)'
                }}
              >
                {currentTestimonial.name}
              </cite>

              {currentTestimonial.title && (
                <div
                  className="author-title"
                  style={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--color-gray-600)',
                    marginBottom: 'var(--spacing-1)'
                  }}
                >
                  {currentTestimonial.title}
                </div>
              )}

              {currentTestimonial.company && (
                <div
                  className="author-company"
                  style={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--color-primary-500)',
                    fontWeight: 'var(--font-weight-medium)'
                  }}
                >
                  {currentTestimonial.company}
                </div>
              )}
            </div>
          </div>

          {/* Navigation controls */}
          {testimonials.length > 1 && (
            <div className="testimonial-controls">
              {/* Previous/Next buttons */}
              <div
                className="carousel-nav"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 'var(--spacing-4)',
                  marginTop: 'var(--spacing-8)'
                }}
              >
                <button
                  onClick={goToPrevious}
                  className="nav-button nav-prev"
                  style={{
                    backgroundColor: 'var(--color-white)',
                    border: '2px solid var(--color-primary-500)',
                    borderRadius: 'var(--radius-full)',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all var(--transition-normal) var(--transition-timing)',
                    color: 'var(--color-primary-500)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'var(--color-primary-500)';
                    e.target.style.color = 'var(--color-white)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'var(--color-white)';
                    e.target.style.color = 'var(--color-primary-500)';
                  }}
                  aria-label="Previous testimonial"
                >
                  ←
                </button>

                {/* Dots indicator */}
                <div
                  className="carousel-dots"
                  style={{
                    display: 'flex',
                    gap: 'var(--spacing-2)',
                    margin: '0 var(--spacing-4)'
                  }}
                  role="tablist"
                  aria-label="Testimonial navigation"
                >
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className="carousel-dot"
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: 'var(--radius-full)',
                        border: 'none',
                        backgroundColor: index === currentIndex
                          ? 'var(--color-primary-500)'
                          : 'var(--color-gray-300)',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast) var(--transition-timing)'
                      }}
                      aria-label={`Go to testimonial ${index + 1}`}
                      aria-selected={index === currentIndex}
                      role="tab"
                    />
                  ))}
                </div>

                <button
                  onClick={goToNext}
                  className="nav-button nav-next"
                  style={{
                    backgroundColor: 'var(--color-white)',
                    border: '2px solid var(--color-primary-500)',
                    borderRadius: 'var(--radius-full)',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all var(--transition-normal) var(--transition-timing)',
                    color: 'var(--color-primary-500)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'var(--color-primary-500)';
                    e.target.style.color = 'var(--color-white)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'var(--color-white)';
                    e.target.style.color = 'var(--color-primary-500)';
                  }}
                  aria-label="Next testimonial"
                >
                  →
                </button>
              </div>

              {/* Play/Pause button */}
              {autoRotate && (
                <button
                  onClick={togglePlayPause}
                  className="play-pause-button"
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'var(--color-gray-500)',
                    fontSize: 'var(--font-size-sm)',
                    marginTop: 'var(--spacing-4)',
                    cursor: 'pointer',
                    display: 'block',
                    margin: 'var(--spacing-4) auto 0 auto'
                  }}
                  aria-label={isPlaying ? 'Pause auto-rotation' : 'Resume auto-rotation'}
                >
                  {isPlaying ? 'Pause' : 'Play'} Auto-rotation
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .testimonial-carousel-section {
          padding: var(--spacing-20) var(--spacing-6);
          background-color: var(--color-gray-50);
        }

        .testimonial-carousel-container {
          max-width: 1000px;
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
          .testimonial-carousel-section {
            padding: var(--spacing-12) var(--spacing-4);
          }

          .testimonial-carousel-title {
            font-size: var(--font-size-2xl) !important;
            margin-bottom: var(--spacing-8) !important;
          }

          .testimonial-display {
            padding: var(--spacing-6) !important;
          }

          .testimonial-quote {
            font-size: var(--font-size-lg) !important;
          }

          .carousel-nav {
            flex-wrap: wrap;
            gap: var(--spacing-2) !important;
          }

          .carousel-dots {
            order: -1;
            margin: 0 !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .testimonial-display,
          .nav-button,
          .carousel-dot {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default TestimonialCarousel;