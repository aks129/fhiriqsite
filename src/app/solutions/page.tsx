'use client';

import Link from 'next/link';

export default function Solutions() {
  const solutions = [
    {
      id: 'fpas',
      title: 'FPAS - Prior Authorization Solution',
      subtitle: 'Automated FHIR-based prior authorization',
      description: 'Streamline prior auth workflows with intelligent automation',
      benefits: [
        'Real-time eligibility checks',
        'Automated decision support',
        'FHIR-based integration',
        'Compliance tracking'
      ],
      outcomes: 'Reduce prior auth processing time by 80% and improve approval rates',
      cta: 'View FPAS Demo',
      link: '/solutions/fpas',
      featured: true
    },
    {
      id: 'payers',
      title: 'Payers',
      subtitle: 'Member data exchange & quality measurement',
      description: 'Reduce time-to-FHIR mapping by 60% in 90 days',
      benefits: [
        'Faster prior authorization',
        'Quality measure automation',
        'Claims data standardization',
        'Member portal integration'
      ],
      outcomes: 'Reduce administrative burden by 40% and improve member satisfaction',
      cta: 'Book Payer Consultation'
    },
    {
      id: 'providers',
      title: 'Providers',
      subtitle: 'Clinical data interoperability & analytics',
      description: 'Streamline clinical workflows with FHIR R4 compliance',
      benefits: [
        'EHR integration acceleration',
        'Clinical decision support',
        'Population health analytics',
        'Care coordination tools'
      ],
      outcomes: 'Improve care quality scores by 25% and reduce integration time by 70%',
      cta: 'Book Provider Consultation'
    },
    {
      id: 'aggregators',
      title: 'Aggregators',
      subtitle: 'Multi-source data harmonization',
      description: 'Scale data ingestion with automated FHIR transformation',
      benefits: [
        'Multi-format data ingestion',
        'Real-time validation',
        'Quality scoring automation',
        'Compliance reporting'
      ],
      outcomes: 'Process 10x more data sources with 95% accuracy',
      cta: 'Book Aggregator Consultation'
    },
    {
      id: 'pharma',
      title: 'Pharma',
      subtitle: 'Real-world evidence & clinical trials',
      description: 'Accelerate research with standardized health data',
      benefits: [
        'RWE data preparation',
        'Clinical trial enrollment',
        'Adverse event reporting',
        'Regulatory compliance'
      ],
      outcomes: 'Reduce study startup time by 50% and improve data quality to 98%',
      cta: 'Book Pharma Consultation'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-blue">
                FHIR IQ
              </Link>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/solutions" className="text-primary-blue font-semibold">
                Solutions
              </Link>
              <Link href="/tools" className="text-neutral-gray hover:text-primary-blue font-medium">
                Tools
              </Link>
              <Link href="/training" className="text-neutral-gray hover:text-primary-blue font-medium">
                Training
              </Link>
              <Link href="/blog" className="text-neutral-gray hover:text-primary-blue font-medium">
                Blog
              </Link>
              <Link href="/podcast" className="text-neutral-gray hover:text-primary-blue font-medium">
                Podcast
              </Link>
              <Link href="/partners" className="text-neutral-gray hover:text-primary-blue font-medium">
                Partners
              </Link>
              <Link href="/about" className="text-neutral-gray hover:text-primary-blue font-medium">
                About
              </Link>
              <Link href="/contact" className="btn-primary text-sm">
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-navy to-primary-blue text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">FHIR Solutions by Industry</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Outcome-first FHIR implementations tailored for your specific healthcare sector.
            From payer workflows to provider analytics, we deliver measurable results.
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {solutions.map((solution) => (
              <div
                key={solution.id}
                className="card hover:shadow-xl transition-shadow"
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-primary-navy mb-2">
                    {solution.title}
                  </h2>
                  <p className="text-lg text-neutral-gray mb-4">
                    {solution.subtitle}
                  </p>
                  <p className="text-lg font-semibold text-primary-blue">
                    {solution.description}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-3 text-primary-navy">Key Benefits:</h3>
                  <ul className="space-y-2">
                    {solution.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-neutral-gray">
                        <span className="text-primary-green mr-2">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6 p-4 bg-bg-accent rounded-lg">
                  <h4 className="font-semibold text-primary-navy mb-2">Expected Outcomes:</h4>
                  <p className="text-neutral-gray">{solution.outcomes}</p>
                </div>

                <div className="text-center">
                  <Link
                    href="/contact"
                    className="btn-primary inline-block"
                  >
                    {solution.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="py-16 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-primary-navy">Proven Results</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="card text-center">
              <div className="text-3xl font-bold text-primary-blue mb-2">$2.3M</div>
              <div className="text-neutral-gray">Annual savings for major payer</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-primary-green mb-2">89%</div>
              <div className="text-neutral-gray">Reduction in data quality errors</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-accent-purple mb-2">3 weeks</div>
              <div className="text-neutral-gray">Average implementation time</div>
            </div>
          </div>
          <Link href="/case-studies" className="btn-secondary">
            View All Case Studies
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your FHIR Implementation?
          </h2>
          <p className="text-xl mb-8">
            Let's discuss how FHIR IQ can accelerate your healthcare interoperability goals
            with proven solutions tailored to your industry.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Schedule Discovery Call
            </Link>
            <Link
              href="/tools"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-blue transition"
            >
              Explore Our Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FHIR IQ</h3>
              <p className="text-gray-400">
                Leading healthcare interoperability solutions powered by AI and FHIR expertise.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/solutions#payers" className="hover:text-white">Payers</Link></li>
                <li><Link href="/solutions#providers" className="hover:text-white">Providers</Link></li>
                <li><Link href="/solutions#aggregators" className="hover:text-white">Aggregators</Link></li>
                <li><Link href="/solutions#pharma" className="hover:text-white">Pharma</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/podcast" className="hover:text-white">Podcast</Link></li>
                <li><Link href="/case-studies" className="hover:text-white">Case Studies</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/partners" className="hover:text-white">Partners</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FHIR IQ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}