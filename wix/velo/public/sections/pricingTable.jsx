/**
 * Pricing Table Component
 * @module sections/pricingTable
 */

import React from 'react';

/**
 * Pricing table with multiple plans and features comparison
 * @param {Object} props - Component props
 * @param {Array} props.plans - Array of pricing plan objects
 * @param {string} props.title - Section title
 * @param {string} props.subtitle - Section subtitle
 * @param {boolean} props.annual - Show annual pricing toggle
 */
export const PricingTable = ({
  plans = [],
  title,
  subtitle,
  annual = false,
  className = ''
}) => {
  const [billingPeriod, setBillingPeriod] = React.useState('monthly');

  const toggleBilling = () => {
    setBillingPeriod(prev => prev === 'monthly' ? 'annual' : 'monthly');
  };

  const formatPrice = (plan) => {
    const price = billingPeriod === 'annual' && plan.annualPrice
      ? plan.annualPrice
      : plan.monthlyPrice;

    if (price === 0 || price === 'free') return 'Free';
    if (price === 'custom') return 'Custom';
    if (typeof price === 'string') return price;

    const period = billingPeriod === 'annual' ? '/year' : '/month';
    return `$${price}${period}`;
  };

  const getAnnualSavings = (plan) => {
    if (!plan.annualPrice || !plan.monthlyPrice || typeof plan.monthlyPrice !== 'number') return null;

    const monthlyCost = plan.monthlyPrice * 12;
    const annualCost = plan.annualPrice;
    const savings = Math.round(((monthlyCost - annualCost) / monthlyCost) * 100);

    return savings > 0 ? savings : null;
  };

  return (
    <section
      className={`pricing-table-section ${className}`}
      aria-labelledby={title ? "pricing-title" : "pricing-label"}
    >
      <div className="pricing-container">
        {/* Header */}
        <div className="pricing-header">
          {title ? (
            <h2
              id="pricing-title"
              className="pricing-title"
              style={{
                fontFamily: 'var(--font-family-heading)',
                fontSize: 'var(--font-size-3xl)',
                fontWeight: 'var(--font-weight-bold)',
                textAlign: 'center',
                color: 'var(--color-gray-900)',
                marginBottom: subtitle ? 'var(--spacing-4)' : 'var(--spacing-8)'
              }}
            >
              {title}
            </h2>
          ) : (
            <h2 id="pricing-label" className="sr-only">Pricing Plans</h2>
          )}

          {subtitle && (
            <p
              className="pricing-subtitle"
              style={{
                fontFamily: 'var(--font-family-primary)',
                fontSize: 'var(--font-size-lg)',
                color: 'var(--color-gray-600)',
                textAlign: 'center',
                maxWidth: '600px',
                margin: '0 auto',
                marginBottom: 'var(--spacing-8)',
                lineHeight: 'var(--line-height-relaxed)'
              }}
            >
              {subtitle}
            </p>
          )}

          {/* Billing toggle */}
          {annual && (
            <div
              className="billing-toggle"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--spacing-4)',
                marginBottom: 'var(--spacing-12)'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-family-primary)',
                  fontSize: 'var(--font-size-base)',
                  color: billingPeriod === 'monthly' ? 'var(--color-gray-900)' : 'var(--color-gray-500)',
                  fontWeight: billingPeriod === 'monthly' ? 'var(--font-weight-semibold)' : 'var(--font-weight-normal)'
                }}
              >
                Monthly
              </span>

              <button
                onClick={toggleBilling}
                className="toggle-switch"
                style={{
                  width: '56px',
                  height: '28px',
                  backgroundColor: billingPeriod === 'annual' ? 'var(--color-primary-500)' : 'var(--color-gray-300)',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'all var(--transition-normal) var(--transition-timing)'
                }}
                aria-label={`Switch to ${billingPeriod === 'monthly' ? 'annual' : 'monthly'} billing`}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '2px',
                    left: billingPeriod === 'annual' ? '30px' : '2px',
                    width: '24px',
                    height: '24px',
                    backgroundColor: 'var(--color-white)',
                    borderRadius: 'var(--radius-full)',
                    transition: 'all var(--transition-normal) var(--transition-timing)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                />
              </button>

              <span
                style={{
                  fontFamily: 'var(--font-family-primary)',
                  fontSize: 'var(--font-size-base)',
                  color: billingPeriod === 'annual' ? 'var(--color-gray-900)' : 'var(--color-gray-500)',
                  fontWeight: billingPeriod === 'annual' ? 'var(--font-weight-semibold)' : 'var(--font-weight-normal)'
                }}
              >
                Annual
                {billingPeriod === 'annual' && (
                  <span
                    style={{
                      marginLeft: 'var(--spacing-2)',
                      backgroundColor: 'var(--color-success)',
                      color: 'var(--color-white)',
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: 'var(--font-weight-semibold)',
                      padding: 'var(--spacing-1) var(--spacing-2)',
                      borderRadius: 'var(--radius-sm)',
                      textTransform: 'uppercase'
                    }}
                  >
                    Save up to 20%
                  </span>
                )}
              </span>
            </div>
          )}
        </div>

        {/* Pricing cards */}
        <div
          className="pricing-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
            gap: 'var(--spacing-8)',
            alignItems: 'start'
          }}
        >
          {plans.map((plan, index) => {
            const isPopular = plan.popular;
            const savings = billingPeriod === 'annual' ? getAnnualSavings(plan) : null;

            return (
              <article
                key={index}
                className={`pricing-card ${isPopular ? 'popular' : ''}`}
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
                  transition: 'all var(--transition-normal) var(--transition-timing)'
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

                {/* Plan header */}
                <div className="plan-header" style={{ textAlign: 'center', marginBottom: 'var(--spacing-6)' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-family-heading)',
                      fontSize: 'var(--font-size-xl)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--color-gray-900)',
                      marginBottom: 'var(--spacing-2)'
                    }}
                  >
                    {plan.name}
                  </h3>

                  {plan.description && (
                    <p
                      style={{
                        fontFamily: 'var(--font-family-primary)',
                        fontSize: 'var(--font-size-base)',
                        color: 'var(--color-gray-600)',
                        marginBottom: 'var(--spacing-4)'
                      }}
                    >
                      {plan.description}
                    </p>
                  )}

                  {/* Pricing */}
                  <div className="plan-pricing">
                    <div
                      style={{
                        fontFamily: 'var(--font-family-heading)',
                        fontSize: 'var(--font-size-4xl)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--color-gray-900)',
                        lineHeight: 'var(--line-height-tight)'
                      }}
                    >
                      {formatPrice(plan)}
                    </div>

                    {savings && (
                      <div
                        style={{
                          fontSize: 'var(--font-size-sm)',
                          color: 'var(--color-success)',
                          fontWeight: 'var(--font-weight-semibold)',
                          marginTop: 'var(--spacing-1)'
                        }}
                      >
                        Save {savings}% annually
                      </div>
                    )}
                  </div>
                </div>

                {/* Features list */}
                {plan.features && (
                  <ul
                    className="plan-features"
                    style={{
                      listStyle: 'none',
                      padding: '0',
                      margin: '0 0 var(--spacing-8) 0'
                    }}
                  >
                    {plan.features.map((feature, featureIndex) => (
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
                {plan.cta && (
                  <a
                    href={plan.cta.url}
                    className="plan-cta"
                    style={{
                      display: 'block',
                      backgroundColor: isPopular ? 'var(--color-primary-500)' : 'var(--color-white)',
                      color: isPopular ? 'var(--color-white)' : 'var(--color-primary-500)',
                      border: `2px solid var(--color-primary-500)`,
                      padding: 'var(--spacing-3) var(--spacing-6)',
                      borderRadius: 'var(--radius-lg)',
                      fontSize: 'var(--font-size-base)',
                      fontWeight: 'var(--font-weight-semibold)',
                      textAlign: 'center',
                      textDecoration: 'none',
                      transition: 'all var(--transition-normal) var(--transition-timing)'
                    }}
                    onMouseEnter={(e) => {
                      if (isPopular) {
                        e.target.style.backgroundColor = 'var(--color-primary-600)';
                      } else {
                        e.target.style.backgroundColor = 'var(--color-primary-500)';
                        e.target.style.color = 'var(--color-white)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (isPopular) {
                        e.target.style.backgroundColor = 'var(--color-primary-500)';
                      } else {
                        e.target.style.backgroundColor = 'var(--color-white)';
                        e.target.style.color = 'var(--color-primary-500)';
                      }
                    }}
                  >
                    {plan.cta.text}
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .pricing-table-section {
          padding: var(--spacing-20) var(--spacing-6);
          background-color: var(--color-gray-50);
        }

        .pricing-container {
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
          .pricing-table-section {
            padding: var(--spacing-12) var(--spacing-4);
          }

          .pricing-title {
            font-size: var(--font-size-2xl) !important;
          }

          .pricing-subtitle {
            font-size: var(--font-size-base) !important;
          }

          .pricing-grid {
            grid-template-columns: 1fr !important;
            gap: var(--spacing-6) !important;
          }

          .pricing-card {
            transform: none !important;
            padding: var(--spacing-6) !important;
          }

          .billing-toggle {
            flex-wrap: wrap;
            gap: var(--spacing-2) !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pricing-card,
          .toggle-switch,
          .toggle-switch span,
          .plan-cta {
            transition: none !important;
          }

          .pricing-card {
            transform: none !important;
          }
        }

        /* Focus visible styles */
        .toggle-switch:focus-visible,
        .plan-cta:focus-visible {
          outline: 3px solid var(--color-primary-500);
          outline-offset: 2px;
        }
      `}</style>
    </section>
  );
};

export default PricingTable;