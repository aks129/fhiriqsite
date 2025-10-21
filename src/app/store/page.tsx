'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Store() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    {
      id: 'hl7-mappings',
      category: 'mappings',
      name: 'HL7 v2 to FHIR Mappings',
      description: 'Pre-built transformation mappings for common HL7 v2 message types to FHIR R4 resources.',
      features: [
        'ADT, ORM, ORU message mappings',
        'Segment-level transformations',
        'Tested with major EHR systems',
        'Custom mapping templates',
        'Documentation included'
      ],
      price: 499,
      oneTime: true,
      popular: true,
      downloadable: true
    },
    {
      id: 'ccda-mappings',
      category: 'mappings',
      name: 'C-CDA to FHIR Mappings',
      description: 'Complete C-CDA document to FHIR resource transformation mappings with validation.',
      features: [
        'All C-CDA templates covered',
        'Clinical document conversion',
        'Section-level mappings',
        'Validation rules included',
        'Implementation guide'
      ],
      price: 599,
      oneTime: true,
      popular: true,
      downloadable: true
    },
    {
      id: 'x12-mappings',
      category: 'mappings',
      name: 'X12 EDI to FHIR Mappings',
      description: 'Transform X12 837, 835, 270/271 transactions to FHIR Claim and ExplanationOfBenefit resources.',
      features: [
        '837P/I claim mappings',
        '835 remittance mappings',
        '270/271 eligibility mappings',
        'Payer-specific variations',
        'Testing utilities'
      ],
      price: 799,
      oneTime: true,
      popular: false,
      downloadable: true
    },
    {
      id: 'view-definitions-clinical',
      category: 'views',
      name: 'Clinical ViewDefinitions Pack',
      description: 'Curated FHIR ViewDefinition resources for common clinical analytics and reporting scenarios.',
      features: [
        '50+ pre-built view definitions',
        'Patient summary views',
        'Medication reconciliation',
        'Lab results analytics',
        'Care gap reporting'
      ],
      price: 299,
      oneTime: true,
      popular: true,
      downloadable: true
    },
    {
      id: 'view-definitions-quality',
      category: 'views',
      name: 'Quality Measures ViewDefinitions',
      description: 'FHIR ViewDefinitions optimized for HEDIS, CMS, and custom quality measure calculations.',
      features: [
        'HEDIS measure views',
        'CMS quality reporting',
        'Risk adjustment views',
        'Population health analytics',
        'Custom measure templates'
      ],
      price: 399,
      oneTime: true,
      popular: true,
      downloadable: true
    },
    {
      id: 'view-definitions-financial',
      category: 'views',
      name: 'Financial Analytics ViewDefinitions',
      description: 'Pre-configured views for claims, billing, and revenue cycle analytics.',
      features: [
        'Claims analytics views',
        'Revenue cycle reporting',
        'Cost analysis views',
        'Payer performance metrics',
        'Utilization tracking'
      ],
      price: 349,
      oneTime: true,
      popular: false,
      downloadable: true
    },
    {
      id: 'terminology-snomed-icd',
      category: 'terminology',
      name: 'SNOMED to ICD-10 Crosswalk',
      description: 'Comprehensive mappings between SNOMED CT concepts and ICD-10-CM codes.',
      features: [
        '500K+ concept mappings',
        'Bidirectional conversion',
        'Quarterly updates included',
        'API access available',
        'Confidence scores'
      ],
      price: 899,
      oneTime: false,
      recurring: 'annual',
      popular: true,
      downloadable: true
    },
    {
      id: 'terminology-loinc-cpt',
      category: 'terminology',
      name: 'LOINC to CPT Mappings',
      description: 'Lab and procedure code mappings between LOINC and CPT with clinical context.',
      features: [
        '100K+ mappings',
        'Clinical context included',
        'Billing code suggestions',
        'Regular updates',
        'CSV and FHIR formats'
      ],
      price: 599,
      oneTime: false,
      recurring: 'annual',
      popular: true,
      downloadable: true
    },
    {
      id: 'terminology-rxnorm',
      category: 'terminology',
      name: 'RxNorm Medication Mappings',
      description: 'Complete medication terminology mappings including NDC, ingredient, and brand mappings.',
      features: [
        'RxNorm to NDC mappings',
        'Ingredient mappings',
        'Brand/generic equivalents',
        'Dose form conversions',
        'Monthly updates'
      ],
      price: 699,
      oneTime: false,
      recurring: 'annual',
      popular: false,
      downloadable: true
    },
    {
      id: 'quality-us-core',
      category: 'quality',
      name: 'US Core Profile Validators',
      description: 'Comprehensive validation rules for all US Core FHIR profiles with detailed error reporting.',
      features: [
        'All US Core profiles',
        'Must Support validation',
        'Cardinality checking',
        'ValueSet validation',
        'Custom rule engine'
      ],
      price: 399,
      oneTime: true,
      popular: true,
      downloadable: true
    },
    {
      id: 'quality-data-quality',
      category: 'quality',
      name: 'Healthcare Data Quality Rules',
      description: 'Production-ready data quality rules and checks for clinical, administrative, and financial data.',
      features: [
        '200+ quality rules',
        'Completeness checks',
        'Consistency validation',
        'Anomaly detection',
        'Customizable thresholds'
      ],
      price: 499,
      oneTime: true,
      popular: true,
      downloadable: true
    },
    {
      id: 'quality-interop',
      category: 'quality',
      name: 'Interoperability Compliance Suite',
      description: 'Validate FHIR data against ONC, CMS, and payer-specific interoperability requirements.',
      features: [
        'ONC certification rules',
        'CMS interoperability',
        'TEFCA compliance',
        'Payer-specific rules',
        'Audit trail generation'
      ],
      price: 799,
      oneTime: true,
      popular: false,
      downloadable: true
    },
    {
      id: 'test-data-basic',
      category: 'testdata',
      name: 'FHIR Test Data - Basic',
      description: 'Realistic synthetic patient data with 1,000 patients and related resources for development.',
      features: [
        '1,000 synthetic patients',
        '10K+ FHIR resources',
        'Realistic clinical scenarios',
        'De-identified demographics',
        'JSON and XML formats'
      ],
      price: 199,
      oneTime: true,
      popular: true,
      downloadable: true
    },
    {
      id: 'test-data-enterprise',
      category: 'testdata',
      name: 'FHIR Test Data - Enterprise',
      description: 'Large-scale synthetic dataset with 100,000 patients for performance and scale testing.',
      features: [
        '100K synthetic patients',
        '1M+ FHIR resources',
        'Complex care scenarios',
        'Multi-year histories',
        'Bulk FHIR format included'
      ],
      price: 1999,
      oneTime: true,
      popular: true,
      downloadable: true
    },
    {
      id: 'test-data-specialty',
      category: 'testdata',
      name: 'Specialty Test Data Collections',
      description: 'Domain-specific test datasets for oncology, cardiology, behavioral health, and more.',
      features: [
        'Specialty-specific scenarios',
        '10+ clinical domains',
        'Realistic workflows',
        'ICD-10 and CPT coded',
        'Custom data available'
      ],
      price: 799,
      oneTime: true,
      popular: false,
      downloadable: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️' },
    { id: 'mappings', name: 'FHIR Mappings', icon: '🔄' },
    { id: 'views', name: 'ViewDefinitions', icon: '📊' },
    { id: 'terminology', name: 'Terminology', icon: '🏷️' },
    { id: 'quality', name: 'Quality Rules', icon: '✓' },
    { id: 'testdata', name: 'Test Data', icon: '🧪' }
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-accent-teal">
              FHIR IQ
            </Link>
            <div className="hidden md:flex space-x-8 items-center">
              <Link href="/solutions" className="text-gray-600 hover:text-accent-teal font-medium">
                Solutions
              </Link>
              <Link href="/tools" className="text-gray-600 hover:text-accent-teal font-medium">
                Tools
              </Link>
              <Link href="/store" className="text-accent-teal font-semibold">
                Store
              </Link>
              <Link href="/contact" className="px-6 py-2 bg-accent-teal text-white rounded-lg font-semibold hover:bg-accent-teal-dark transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent-teal to-accent-purple text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">FHIR Resources Store</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Pre-built FHIR mappings, ViewDefinitions, terminology crosswalks, and test data
            to accelerate your healthcare interoperability projects.
          </p>
          <div className="flex gap-4 justify-center">
            <div className="bg-white/20 px-6 py-3 rounded-lg">
              <div className="text-3xl font-bold">{products.length}</div>
              <div className="text-sm">Products Available</div>
            </div>
            <div className="bg-white/20 px-6 py-3 rounded-lg">
              <div className="text-3xl font-bold">100%</div>
              <div className="text-sm">FHIR Compliant</div>
            </div>
            <div className="bg-white/20 px-6 py-3 rounded-lg">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm">Instant Download</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-accent-teal text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
                {product.popular && (
                  <div className="bg-accent-orange text-white text-center py-1 text-sm font-semibold">
                    ⭐ Popular
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>

                  <div className="mb-4">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Features:</div>
                    <ul className="space-y-1">
                      {product.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                          <svg className="w-4 h-4 text-accent-teal mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {product.features.length > 3 && (
                      <div className="text-xs text-gray-500 mt-1">
                        +{product.features.length - 3} more features
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                        {product.recurring && (
                          <span className="text-sm text-gray-600 ml-2">/{product.recurring}</span>
                        )}
                        {product.oneTime && !product.recurring && (
                          <span className="text-sm text-gray-600 ml-2">one-time</span>
                        )}
                      </div>
                      {product.downloadable && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          Instant Download
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/contact?product=${product.id}`}
                      className="block w-full text-center px-6 py-3 bg-accent-teal text-white rounded-lg font-semibold hover:bg-accent-teal-dark transition-colors"
                    >
                      Purchase Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Choose FHIR IQ Resources?
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Production Ready</h3>
              <p className="text-sm text-gray-600">Battle-tested in enterprise healthcare environments</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Save Time</h3>
              <p className="text-sm text-gray-600">Accelerate development by months with pre-built assets</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Documentation</h3>
              <p className="text-sm text-gray-600">Complete docs and implementation guides included</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Support</h3>
              <p className="text-sm text-gray-600">Expert support and customization available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="py-16 bg-gradient-to-r from-accent-teal to-accent-purple text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Need Custom Solutions?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            We offer custom mapping development, bulk licensing, and enterprise support packages.
            Contact our team to discuss your specific requirements.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-accent-teal font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Contact Sales
            </Link>
            <Link
              href="/solutions"
              className="px-8 py-4 bg-accent-purple text-white font-bold rounded-lg hover:bg-purple-700 transition-colors border-2 border-white"
            >
              View Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">What format are the mappings delivered in?</h3>
              <p className="text-gray-600">
                All mappings are provided in industry-standard formats including FHIR StructureMap,
                ConceptMap resources, and documentation in JSON, XML, and human-readable formats.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Are updates included?</h3>
              <p className="text-gray-600">
                One-time purchases include 12 months of updates. Annual subscriptions include all updates
                for the duration of the subscription period.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Can I customize the products?</h3>
              <p className="text-gray-600">
                Yes! All products can be customized for your specific use case. Contact us for custom
                development, additional mappings, or enterprise licensing options.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">What support is included?</h3>
              <p className="text-gray-600">
                All purchases include email support for 30 days. Extended support packages and implementation
                assistance are available for enterprise customers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
