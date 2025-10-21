'use client';

import Link from 'next/link';

export default function Products() {
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
              <Link href="/products" className="text-blue-600 font-semibold">
                Products
              </Link>
              <Link href="/builder" className="text-gray-700 hover:text-blue-600">
                AI Builder
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-blue-600">
                Blog
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
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">FHIR Products & Services</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Comprehensive suite of FHIR tools, licenses, training, and consulting services
            to accelerate your healthcare interoperability projects.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Developer Licenses */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Developer Licenses</h3>
              <p className="text-gray-600 mb-4">
                Professional FHIR development tools with advanced validation and code generation.
              </p>
              <ul className="text-sm text-gray-600 mb-6 space-y-2">
                <li>• Advanced FHIR validation</li>
                <li>• Premium code generators</li>
                <li>• Multi-user support</li>
                <li>• Priority support</li>
              </ul>
              <div className="text-2xl font-bold text-blue-600 mb-4">Starting at $299/year</div>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                View Details
              </button>
            </div>

            {/* Training Programs */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">FHIR Training</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive FHIR training programs from fundamentals to advanced implementation.
              </p>
              <ul className="text-sm text-gray-600 mb-6 space-y-2">
                <li>• Live instructor-led sessions</li>
                <li>• Hands-on exercises</li>
                <li>• Real-world case studies</li>
                <li>• Certification programs</li>
              </ul>
              <div className="text-2xl font-bold text-blue-600 mb-4">Starting at $1,299</div>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                View Training
              </button>
            </div>

            {/* Consulting Services */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Consulting</h3>
              <p className="text-gray-600 mb-4">
                Expert FHIR consulting services for architecture, implementation, and optimization.
              </p>
              <ul className="text-sm text-gray-600 mb-6 space-y-2">
                <li>• FHIR architecture design</li>
                <li>• Implementation support</li>
                <li>• Performance optimization</li>
                <li>• Compliance assessment</li>
              </ul>
              <div className="text-2xl font-bold text-blue-600 mb-4">Custom Pricing</div>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Get Quote
              </button>
            </div>

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