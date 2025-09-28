/**
 * Pricing Page Component
 * @module pages/Pricing
 */

import React, { useState, useEffect } from 'react';
import { wixStores } from 'wix-stores-frontend';
import wixLocation from 'wix-location';

/**
 * Comprehensive pricing page for FHIR IQ digital products
 * @param {Object} props - Component props
 * @param {Array} props.products - Product data (optional, will fetch from Wix Stores if not provided)
 * @param {string} props.selectedCategory - Pre-selected category filter
 */
export const Pricing = ({
  products: initialProducts = null,
  selectedCategory = 'all',
  className = ''
}) => {
  const [products, setProducts] = useState(initialProducts || []);
  const [loading, setLoading] = useState(!initialProducts);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(selectedCategory);
  const [addingToCart, setAddingToCart] = useState(new Set());
  const [cartSuccess, setCartSuccess] = useState(new Set());

  // Product categories for filtering
  const categories = [
    { id: 'all', name: 'All Products', icon: '🎯' },
    { id: 'license', name: 'Developer Licenses', icon: '⚡' },
    { id: 'training', name: 'Training & Certification', icon: '🎓' },
    { id: 'consulting', name: 'Expert Consulting', icon: '👨‍💼' },
    { id: 'bundle', name: 'Value Bundles', icon: '📦' },
    { id: 'addon', name: 'Add-ons & Support', icon: '🔧' }
  ];

  // Fetch products from Wix Stores if not provided
  useEffect(() => {
    if (!initialProducts) {
      fetchProducts();
    }
  }, [initialProducts]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get products from Wix Stores
      const storeProducts = await wixStores.queryProducts()
        .limit(50)
        .find();

      // Transform Wix Store products to our format
      const transformedProducts = storeProducts.items.map(product => ({
        id: product._id,
        sku: product.productOptions?.choices?.[0]?.value || product.slug,
        name: product.name,
        category: extractCategory(product.additionalInfoSections),
        edition: extractEdition(product.additionalInfoSections),
        term: extractTerm(product.additionalInfoSections),
        price: product.price?.price || 0,
        originalPrice: product.price?.compareAtPrice,
        currency: product.price?.currency || 'USD',
        description: product.description,
        features: extractFeatures(product.additionalInfoSections),
        deliverables: extractDeliverables(product.additionalInfoSections),
        popular: product.ribbon === 'Most Popular',
        available: product.inStock,
        digital: product.productType === 'digital',
        image: product.media?.mainMedia?.image?.url,
        slug: product.slug
      }));

      setProducts(transformedProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  // Helper functions to extract data from Wix product structure
  const extractCategory = (additionalInfo) => {
    const categorySection = additionalInfo?.find(section => section.title === 'Category');
    return categorySection?.description || 'license';
  };

  const extractEdition = (additionalInfo) => {
    const editionSection = additionalInfo?.find(section => section.title === 'Edition');
    return editionSection?.description || 'basic';
  };

  const extractTerm = (additionalInfo) => {
    const termSection = additionalInfo?.find(section => section.title === 'Term');
    return termSection?.description || 'annual';
  };

  const extractFeatures = (additionalInfo) => {
    const featuresSection = additionalInfo?.find(section => section.title === 'Features');
    return featuresSection?.description?.split('\n') || [];
  };

  const extractDeliverables = (additionalInfo) => {
    const deliverablesSection = additionalInfo?.find(section => section.title === 'Deliverables');
    try {
      return JSON.parse(deliverablesSection?.description || '{}');
    } catch {
      return {};
    }
  };

  const formatPrice = (price, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(price);
  };

  const handleCategoryFilter = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const addToCart = async (product) => {
    const productKey = `${product.id}_${Date.now()}`;
    setAddingToCart(prev => new Set([...prev, product.id]));

    try {
      // Add product to Wix cart
      await wixStores.cart.addToCart({
        productId: product.id,
        quantity: 1,
        options: product.productOptions || {}
      });

      // Show success feedback
      setCartSuccess(prev => new Set([...prev, product.id]));

      // Remove success feedback after 3 seconds
      setTimeout(() => {
        setCartSuccess(prev => {
          const newSet = new Set(prev);
          newSet.delete(product.id);
          return newSet;
        });
      }, 3000);

      console.log('Product added to cart:', product.name);

    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    } finally {
      setAddingToCart(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }
  };

  const proceedToCheckout = () => {
    // Redirect to Wix checkout
    wixLocation.to('/cart');
  };

  const contactSales = () => {
    // Redirect to contact page for enterprise sales
    wixLocation.to('/contact?inquiry=enterprise');
  };

  // Filter products by category
  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(product => product.category === activeCategory);

  // Group products by category for display
  const groupedProducts = filteredProducts.reduce((groups, product) => {
    const category = product.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(product);
    return groups;
  }, {});

  const renderProductCard = (product) => {
    const isPopular = product.popular;
    const isAddingToCart = addingToCart.has(product.id);
    const showSuccess = cartSuccess.has(product.id);

    return (
      <div
        key={product.id}
        className={`product-card ${isPopular ? 'popular' : ''}`}
        style={{
          backgroundColor: 'var(--color-white)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--spacing-8)',
          position: 'relative',
          border: isPopular
            ? '2px solid var(--color-primary-500)'
            : '1px solid var(--color-gray-200)',
          boxShadow: isPopular ? 'var(--shadow-lg)' : 'var(--shadow-md)',
          transform: isPopular ? 'scale(1.05)' : 'scale(1)',
          transition: 'all var(--transition-normal) var(--transition-timing)',
          height: 'fit-content'
        }}
      >
        {/* Popular badge */}
        {isPopular && (
          <div
            style={{
              position: 'absolute',
              top: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'var(--color-primary-500)',
              color: 'var(--color-white)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              padding: 'var(--spacing-2) var(--spacing-4)',
              borderRadius: 'var(--radius-full)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            Most Popular
          </div>
        )}

        {/* Product header */}
        <div className="product-header" style={{ textAlign: 'center', marginBottom: 'var(--spacing-6)' }}>
          <h3
            style={{
              fontFamily: 'var(--font-family-heading)',
              fontSize: 'var(--font-size-xl)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-gray-900)',
              marginBottom: 'var(--spacing-2)'
            }}
          >
            {product.name}
          </h3>

          <p
            style={{
              fontFamily: 'var(--font-family-primary)',
              fontSize: 'var(--font-size-base)',
              color: 'var(--color-gray-600)',
              marginBottom: 'var(--spacing-4)',
              lineHeight: 'var(--line-height-relaxed)'
            }}
          >
            {product.description}
          </p>

          {/* Pricing */}
          <div className="product-pricing">
            <div
              style={{
                fontFamily: 'var(--font-family-heading)',
                fontSize: 'var(--font-size-3xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-gray-900)',
                lineHeight: 'var(--line-height-tight)'
              }}
            >
              {formatPrice(product.price, product.currency)}
              {product.originalPrice && (
                <span
                  style={{
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 'var(--font-weight-normal)',
                    color: 'var(--color-gray-500)',
                    textDecoration: 'line-through',
                    marginLeft: 'var(--spacing-2)'
                  }}
                >
                  {formatPrice(product.originalPrice, product.currency)}
                </span>
              )}
            </div>

            {product.originalPrice && (
              <div
                style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-success)',
                  fontWeight: 'var(--font-weight-semibold)',
                  marginTop: 'var(--spacing-1)'
                }}
              >
                Save {formatPrice(product.originalPrice - product.price, product.currency)}
              </div>
            )}
          </div>
        </div>

        {/* Features list */}
        {product.features && product.features.length > 0 && (
          <ul
            className="product-features"
            style={{
              listStyle: 'none',
              padding: '0',
              margin: '0 0 var(--spacing-8) 0'
            }}
          >
            {product.features.map((feature, featureIndex) => (
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

        {/* CTA button */}
        <button
          onClick={() => addToCart(product)}
          disabled={!product.available || isAddingToCart}
          className="product-cta"
          style={{
            display: 'block',
            width: '100%',
            backgroundColor: showSuccess
              ? 'var(--color-success)'
              : isPopular
                ? 'var(--color-primary-500)'
                : 'var(--color-white)',
            color: showSuccess || isPopular
              ? 'var(--color-white)'
              : 'var(--color-primary-500)',
            border: `2px solid ${showSuccess ? 'var(--color-success)' : 'var(--color-primary-500)'}`,
            padding: 'var(--spacing-3) var(--spacing-6)',
            borderRadius: 'var(--radius-lg)',
            fontSize: 'var(--font-size-base)',
            fontWeight: 'var(--font-weight-semibold)',
            textAlign: 'center',
            cursor: product.available && !isAddingToCart ? 'pointer' : 'not-allowed',
            transition: 'all var(--transition-normal) var(--transition-timing)',
            opacity: product.available ? 1 : 0.6
          }}
          onMouseEnter={(e) => {
            if (product.available && !isAddingToCart && !showSuccess) {
              if (isPopular) {
                e.target.style.backgroundColor = 'var(--color-primary-600)';
              } else {
                e.target.style.backgroundColor = 'var(--color-primary-500)';
                e.target.style.color = 'var(--color-white)';
              }
            }
          }}
          onMouseLeave={(e) => {
            if (product.available && !isAddingToCart && !showSuccess) {
              if (isPopular) {
                e.target.style.backgroundColor = 'var(--color-primary-500)';
              } else {
                e.target.style.backgroundColor = 'var(--color-white)';
                e.target.style.color = 'var(--color-primary-500)';
              }
            }
          }}
        >
          {!product.available
            ? 'Currently Unavailable'
            : isAddingToCart
              ? 'Adding to Cart...'
              : showSuccess
                ? '✓ Added to Cart!'
                : 'Add to Cart'
          }
        </button>

        {/* Digital delivery notice */}
        {product.digital && (
          <p
            style={{
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-gray-500)',
              textAlign: 'center',
              marginTop: 'var(--spacing-3)',
              fontStyle: 'italic'
            }}
          >
            🚀 Instant digital delivery
          </p>
        )}
      </div>
    );
  };

  const renderCategorySection = (categoryId, categoryProducts) => {
    const categoryInfo = categories.find(cat => cat.id === categoryId);
    if (!categoryInfo || categoryProducts.length === 0) return null;

    return (
      <div key={categoryId} className="category-section" style={{ marginBottom: 'var(--spacing-16)' }}>
        <div className="category-header" style={{ textAlign: 'center', marginBottom: 'var(--spacing-12)' }}>
          <h2
            style={{
              fontFamily: 'var(--font-family-heading)',
              fontSize: 'var(--font-size-2xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-gray-900)',
              marginBottom: 'var(--spacing-2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--spacing-3)'
            }}
          >
            <span style={{ fontSize: 'var(--font-size-3xl)' }}>{categoryInfo.icon}</span>
            {categoryInfo.name}
          </h2>
        </div>

        <div
          className="products-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: 'var(--spacing-8)',
            alignItems: 'start'
          }}
        >
          {categoryProducts.map(renderProductCard)}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div
        className={`pricing-page loading ${className}`}
        style={{
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '3px solid var(--color-gray-200)',
              borderTop: '3px solid var(--color-primary-500)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto var(--spacing-4) auto'
            }}
          />
          <p style={{ color: 'var(--color-gray-600)' }}>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`pricing-page error ${className}`}
        style={{
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '500px' }}>
          <h2 style={{ color: 'var(--color-red-600)', marginBottom: 'var(--spacing-4)' }}>
            Unable to Load Products
          </h2>
          <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--spacing-6)' }}>
            {error}
          </p>
          <button
            onClick={fetchProducts}
            style={{
              backgroundColor: 'var(--color-primary-500)',
              color: 'var(--color-white)',
              border: 'none',
              padding: 'var(--spacing-3) var(--spacing-6)',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--font-size-base)',
              fontWeight: 'var(--font-weight-semibold)',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`pricing-page ${className}`}>
      {/* Hero Section */}
      <section className="pricing-hero">
        <div className="pricing-hero-container">
          <h1
            style={{
              fontFamily: 'var(--font-family-heading)',
              fontSize: 'var(--font-size-4xl)',
              fontWeight: 'var(--font-weight-bold)',
              textAlign: 'center',
              color: 'var(--color-gray-900)',
              marginBottom: 'var(--spacing-4)'
            }}
          >
            Choose Your FHIR Journey
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-family-primary)',
              fontSize: 'var(--font-size-xl)',
              color: 'var(--color-gray-600)',
              textAlign: 'center',
              maxWidth: '700px',
              margin: '0 auto',
              marginBottom: 'var(--spacing-8)',
              lineHeight: 'var(--line-height-relaxed)'
            }}
          >
            From developer tools to expert consulting, we have everything you need to succeed with FHIR implementation.
          </p>

          {/* Category filters */}
          <div
            className="category-filters"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 'var(--spacing-4)',
              marginBottom: 'var(--spacing-12)'
            }}
          >
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryFilter(category.id)}
                className={`category-filter ${activeCategory === category.id ? 'active' : ''}`}
                style={{
                  backgroundColor: activeCategory === category.id
                    ? 'var(--color-primary-500)'
                    : 'var(--color-white)',
                  color: activeCategory === category.id
                    ? 'var(--color-white)'
                    : 'var(--color-gray-700)',
                  border: `2px solid ${activeCategory === category.id ? 'var(--color-primary-500)' : 'var(--color-gray-300)'}`,
                  padding: 'var(--spacing-3) var(--spacing-5)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--font-size-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-normal) var(--transition-timing)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-2)'
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== category.id) {
                    e.target.style.borderColor = 'var(--color-primary-500)';
                    e.target.style.color = 'var(--color-primary-500)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== category.id) {
                    e.target.style.borderColor = 'var(--color-gray-300)';
                    e.target.style.color = 'var(--color-gray-700)';
                  }
                }}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="pricing-products">
        <div className="pricing-products-container">
          {activeCategory === 'all' ? (
            // Show all categories
            Object.entries(groupedProducts).map(([categoryId, categoryProducts]) =>
              renderCategorySection(categoryId, categoryProducts)
            )
          ) : (
            // Show filtered category
            renderCategorySection(activeCategory, filteredProducts)
          )}

          {filteredProducts.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: 'var(--spacing-12)',
                color: 'var(--color-gray-500)'
              }}
            >
              <p style={{ fontSize: 'var(--font-size-lg)' }}>
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="pricing-cta">
        <div className="pricing-cta-container">
          <div
            style={{
              backgroundColor: 'var(--color-primary-500)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--spacing-12)',
              textAlign: 'center',
              color: 'var(--color-white)'
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-family-heading)',
                fontSize: 'var(--font-size-3xl)',
                fontWeight: 'var(--font-weight-bold)',
                marginBottom: 'var(--spacing-4)'
              }}
            >
              Need Something Custom?
            </h2>

            <p
              style={{
                fontSize: 'var(--font-size-lg)',
                marginBottom: 'var(--spacing-8)',
                opacity: 0.9,
                maxWidth: '600px',
                margin: '0 auto var(--spacing-8) auto'
              }}
            >
              Our enterprise solutions are tailored to your specific FHIR implementation needs.
              Let's discuss how we can accelerate your healthcare interoperability goals.
            </p>

            <div
              style={{
                display: 'flex',
                gap: 'var(--spacing-4)',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}
            >
              <button
                onClick={contactSales}
                style={{
                  backgroundColor: 'var(--color-white)',
                  color: 'var(--color-primary-500)',
                  border: 'none',
                  padding: 'var(--spacing-4) var(--spacing-8)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-normal) var(--transition-timing)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'var(--color-gray-100)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'var(--color-white)';
                }}
              >
                Contact Sales
              </button>

              <button
                onClick={proceedToCheckout}
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--color-white)',
                  border: '2px solid var(--color-white)',
                  padding: 'var(--spacing-4) var(--spacing-8)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-normal) var(--transition-timing)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'var(--color-white)';
                  e.target.style.color = 'var(--color-primary-500)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = 'var(--color-white)';
                }}
              >
                View Cart & Checkout
              </button>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .pricing-page {
          background-color: var(--color-gray-50);
        }

        .pricing-hero {
          padding: var(--spacing-20) var(--spacing-6) var(--spacing-16);
          background: linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-secondary-500) 100%);
          color: var(--color-white);
        }

        .pricing-hero-container,
        .pricing-products-container,
        .pricing-cta-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .pricing-products {
          padding: var(--spacing-16) var(--spacing-6);
        }

        .pricing-cta {
          padding: var(--spacing-16) var(--spacing-6) var(--spacing-20);
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .pricing-hero {
            padding: var(--spacing-12) var(--spacing-4) var(--spacing-8);
          }

          .pricing-hero h1 {
            font-size: var(--font-size-3xl) !important;
          }

          .pricing-hero p {
            font-size: var(--font-size-lg) !important;
          }

          .pricing-products {
            padding: var(--spacing-8) var(--spacing-4);
          }

          .pricing-cta {
            padding: var(--spacing-8) var(--spacing-4) var(--spacing-12);
          }

          .products-grid {
            grid-template-columns: 1fr !important;
            gap: var(--spacing-6) !important;
          }

          .category-filters {
            justify-content: flex-start !important;
            overflow-x: auto;
            padding-bottom: var(--spacing-2);
          }

          .category-filter {
            flex-shrink: 0;
          }

          .pricing-cta-container > div {
            padding: var(--spacing-8) !important;
          }

          .pricing-cta h2 {
            font-size: var(--font-size-2xl) !important;
          }

          .pricing-cta p {
            font-size: var(--font-size-base) !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .product-card,
          .category-filter,
          .product-cta {
            transition: none !important;
          }

          .product-card.popular {
            transform: none !important;
          }
        }

        /* Focus visible styles */
        .category-filter:focus-visible,
        .product-cta:focus-visible {
          outline: 3px solid var(--color-secondary-400);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};

export default Pricing;