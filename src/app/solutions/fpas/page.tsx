'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function FPASPage() {
  const [activeDemo, setActiveDemo] = useState('ui');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-accent-teal">
              FHIR IQ
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/solutions" className="text-accent-teal font-semibold">
                Solutions
              </Link>
              <Link href="/tools" className="text-gray-600 hover:text-accent-teal font-medium">
                Tools
              </Link>
              <Link href="/contact" className="px-6 py-2 bg-accent-teal text-white rounded-lg font-semibold hover:bg-accent-teal-dark transition-colors">
                Book Demo
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent-teal to-accent-purple text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-6">
              🚀 Production Ready • FHIR R4 Compliant
            </div>
            <h1 className="text-6xl font-bold mb-6">
              FPAS
            </h1>
            <p className="text-2xl mb-4">FHIR Prior Authorization System</p>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Reduce prior authorization processing time by 80% with intelligent automation
              and real-time FHIR-based integration.
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="https://fpas-ui.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-accent-teal font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg shadow-xl"
              >
                Launch Demo UI
              </a>
              <a
                href="https://fpas-phi.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-accent-purple text-white font-bold rounded-lg hover:bg-purple-700 transition-colors text-lg shadow-xl"
              >
                View PHI Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-5xl font-bold text-accent-teal mb-2">80%</div>
              <div className="text-gray-600">Faster Processing</div>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold text-accent-purple mb-2">95%</div>
              <div className="text-gray-600">Approval Rate</div>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold text-accent-orange mb-2">24/7</div>
              <div className="text-gray-600">Automated Processing</div>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold text-accent-teal mb-2">100%</div>
              <div className="text-gray-600">FHIR Compliant</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-14 h-14 bg-accent-teal/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-accent-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Real-Time Eligibility</h3>
              <p className="text-gray-600">
                Instant verification of patient eligibility and coverage using FHIR Coverage and Patient resources.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-14 h-14 bg-accent-purple/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Automated Decision Engine</h3>
              <p className="text-gray-600">
                AI-powered clinical criteria matching with configurable rules and automatic approval workflows.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-14 h-14 bg-accent-orange/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Clinical Documentation</h3>
              <p className="text-gray-600">
                Structured clinical notes and evidence collection using FHIR DocumentReference and QuestionnaireResponse.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-14 h-14 bg-accent-teal/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-accent-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">FHIR Integration</h3>
              <p className="text-gray-600">
                Native FHIR R4 support with ServiceRequest, CoverageEligibilityRequest, and Claim resources.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-14 h-14 bg-accent-purple/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Real-Time Tracking</h3>
              <p className="text-gray-600">
                Live status updates, audit trails, and comprehensive reporting dashboards for all requests.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-14 h-14 bg-accent-orange/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Compliance & Security</h3>
              <p className="text-gray-600">
                HIPAA compliant with role-based access control, encryption, and comprehensive audit logging.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Previews */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Interactive Demos
          </h2>

          {/* Demo Selector */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveDemo('ui')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeDemo === 'ui'
                  ? 'bg-accent-teal text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Provider Portal UI
            </button>
            <button
              onClick={() => setActiveDemo('phi')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeDemo === 'phi'
                  ? 'bg-accent-purple text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              PHI Data Demo
            </button>
          </div>

          {/* Demo Cards */}
          {activeDemo === 'ui' && (
            <div className="bg-gray-50 rounded-lg p-8 border-2 border-accent-teal">
              <div className="flex items-start gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Provider Portal UI</h3>
                  <p className="text-gray-600 mb-6">
                    Intuitive interface for healthcare providers to submit and track prior authorization
                    requests with real-time status updates and clinical documentation tools.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-accent-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Submit new prior auth requests</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-accent-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Track request status in real-time</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-accent-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Upload supporting clinical documentation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-accent-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">View approval history and analytics</span>
                    </li>
                  </ul>
                  <a
                    href="https://fpas-ui.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-accent-teal text-white rounded-lg font-semibold hover:bg-accent-teal-dark transition-colors"
                  >
                    Launch Provider Portal →
                  </a>
                </div>
                <div className="w-1/2 bg-white rounded-lg shadow-xl border border-gray-200 p-4">
                  <div className="aspect-video bg-gradient-to-br from-accent-teal to-accent-purple rounded flex items-center justify-center text-white text-lg font-semibold">
                    Interactive UI Demo
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeDemo === 'phi' && (
            <div className="bg-gray-50 rounded-lg p-8 border-2 border-accent-purple">
              <div className="flex items-start gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">PHI Data Management</h3>
                  <p className="text-gray-600 mb-6">
                    Secure handling of Protected Health Information with FHIR-based data exchange,
                    encryption, and comprehensive audit trails for regulatory compliance.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">HIPAA-compliant data storage</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">End-to-end encryption</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Role-based access control (RBAC)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Comprehensive audit logging</span>
                    </li>
                  </ul>
                  <a
                    href="https://fpas-phi.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-accent-purple text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    View PHI Demo →
                  </a>
                </div>
                <div className="w-1/2 bg-white rounded-lg shadow-xl border border-gray-200 p-4">
                  <div className="aspect-video bg-gradient-to-br from-accent-purple to-accent-orange rounded flex items-center justify-center text-white text-lg font-semibold">
                    PHI Security Demo
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Built on Modern Standards
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">FHIR Resources Used</h3>
              <div className="space-y-3">
                {[
                  'ServiceRequest - Authorization requests',
                  'Coverage - Insurance verification',
                  'Patient - Demographics & identity',
                  'CoverageEligibilityRequest - Real-time checks',
                  'Claim - Prior auth submissions',
                  'DocumentReference - Clinical evidence',
                  'QuestionnaireResponse - Structured data collection'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg">
                    <svg className="w-5 h-5 text-accent-teal mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Technology Stack</h3>
              <div className="space-y-3">
                {[
                  { name: 'Next.js 15', desc: 'Modern React framework' },
                  { name: 'FHIR R4', desc: 'Healthcare interoperability' },
                  { name: 'TypeScript', desc: 'Type-safe development' },
                  { name: 'Tailwind CSS', desc: 'Responsive UI design' },
                  { name: 'Vercel', desc: 'Enterprise hosting' },
                  { name: 'PostgreSQL', desc: 'Reliable data storage' }
                ].map((tech, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-lg">
                    <div className="font-semibold text-gray-900">{tech.name}</div>
                    <div className="text-sm text-gray-600">{tech.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent-teal to-accent-purple text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Automate Your Prior Authorization?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Schedule a personalized demo to see how FPAS can transform your prior auth workflows
            and reduce processing time by 80%.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-accent-teal font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              Schedule Demo
            </Link>
            <a
              href="https://fpas-ui.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-accent-purple text-white font-bold rounded-lg hover:bg-purple-700 transition-colors text-lg border-2 border-white"
            >
              Try It Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
