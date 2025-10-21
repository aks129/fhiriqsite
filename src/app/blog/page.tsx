'use client';

import Link from 'next/link';

export default function Blog() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                FHIR IQ
              </Link>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/products" className="text-gray-700 hover:text-blue-600">
                Products
              </Link>
              <Link href="/builder" className="text-gray-700 hover:text-blue-600">
                AI Builder
              </Link>
              <Link href="/blog" className="text-blue-600 font-semibold">
                Blog
              </Link>
              <Link href="/podcast" className="text-gray-700 hover:text-blue-600">
                Podcast
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">FHIR IQ Blog</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Insights, tutorials, and best practices for healthcare interoperability
            and FHIR implementation from our team of experts.
          </p>
        </div>
      </section>

      {/* Substack Embed Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Read Our Latest Posts on Substack
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Follow our newsletter for in-depth articles about FHIR, healthcare interoperability, and AI innovations.
            </p>
            <div className="flex gap-4 justify-center mb-8">
              <a
                href="https://evestel.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Visit Our Substack
              </a>
              <a
                href="https://evestel.substack.com/subscribe"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                Subscribe to Newsletter
              </a>
            </div>
          </div>

          {/* Substack Embed */}
          <div className="bg-white rounded-lg shadow-xl p-4">
            <iframe
              src="https://evestel.substack.com/embed"
              width="100%"
              height="800"
              style={{ border: '1px solid #EEE', background: 'white' }}
              frameBorder="0"
              scrolling="no"
              title="FHIR IQ Substack Newsletter"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Archive Link Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Looking for More Content?
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            Browse our complete archive of articles, tutorials, and case studies.
          </p>
          <a
            href="https://evestel.substack.com/archive"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            View Full Archive
            <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </section>

      {/* Newsletter Subscribe Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Never Miss an Update
          </h2>
          <p className="text-xl mb-8">
            Get the latest FHIR insights, implementation guides, and industry news delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto">
            <iframe
              src="https://evestel.substack.com/embed"
              width="100%"
              height="150"
              style={{ border: 'none', background: 'transparent' }}
              frameBorder="0"
              scrolling="no"
              title="Subscribe to FHIR IQ Newsletter"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 FHIR IQ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}