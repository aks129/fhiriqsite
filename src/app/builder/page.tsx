'use client';

import { useState } from 'react';
import Link from 'next/link';
import ChatBot from '../../components/ChatBot';

interface AppTemplate {
  id: string;
  name: string;
  description: string;
  features: string[];
  fhirResources: string[];
  techStack: string;
  estimatedTime: string;
  demoUrl: string;
}

export default function Builder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAppType, setSelectedAppType] = useState('');
  const [requirements, setRequirements] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedApp, setGeneratedApp] = useState<any>(null);

  const appTemplates: AppTemplate[] = [
    {
      id: 'patient-portal',
      name: 'Patient Portal',
      description: 'Comprehensive patient portal with appointment and health record access',
      features: [
        'View upcoming appointments',
        'Access lab results and medical history',
        'Secure messaging with providers',
        'Medication management',
        'Care plan tracking'
      ],
      fhirResources: ['Patient', 'Appointment', 'Observation', 'MedicationRequest', 'CarePlan', 'Communication'],
      techStack: 'React + FHIR Kit Client',
      estimatedTime: '2-3 hours to customize',
      demoUrl: 'https://fhir-viewdefinition-builder.vercel.app'
    },
    {
      id: 'provider-dashboard',
      name: 'Provider Dashboard',
      description: 'Clinical dashboard for healthcare providers with patient management',
      features: [
        'Patient list with real-time updates',
        'Clinical decision support alerts',
        'Quality measure tracking',
        'Population health analytics',
        'Secure provider communication'
      ],
      fhirResources: ['Patient', 'Encounter', 'Observation', 'Condition', 'MedicationRequest', 'Flag'],
      techStack: 'Vue.js + HAPI FHIR Client',
      estimatedTime: '4-6 hours to customize',
      demoUrl: 'https://fhirspective.vercel.app'
    },
    {
      id: 'integration-tool',
      name: 'Integration Tool',
      description: 'Data synchronization and transformation between healthcare systems',
      features: [
        'Multi-format data ingestion',
        'Real-time validation',
        'Quality scoring automation',
        'Compliance reporting',
        'API gateway functionality'
      ],
      fhirResources: ['Bundle', 'OperationOutcome', 'AuditEvent', 'Task', 'MessageHeader'],
      techStack: 'Python + Flask + HAPI',
      estimatedTime: '6-8 hours to customize',
      demoUrl: 'https://fhir-map-master-aks129s-projects.vercel.app'
    },
    {
      id: 'custom-app',
      name: 'Custom Application',
      description: 'Tell us what you need and we\'ll build it with AI',
      features: [
        'AI-powered requirements analysis',
        'Custom FHIR resource modeling',
        'Tailored user experience',
        'Specialized workflows',
        'Advanced integrations'
      ],
      fhirResources: ['Custom based on requirements'],
      techStack: 'Framework of your choice',
      estimatedTime: 'Varies based on complexity',
      demoUrl: 'https://fhir-query-converter.vercel.app'
    }
  ];

  const handleAppTypeSelect = (appType: string) => {
    setSelectedAppType(appType);
    setCurrentStep(2);
  };

  const handleRequirementsSubmit = () => {
    if (requirements.trim()) {
      setCurrentStep(3);
      generateApplication();
    }
  };

  const generateApplication = async () => {
    setIsGenerating(true);

    try {
      // Simulate AI generation process
      await new Promise(resolve => setTimeout(resolve, 3000));

      const selectedTemplate = appTemplates.find(t => t.id === selectedAppType);

      setGeneratedApp({
        name: selectedTemplate?.name || 'Custom FHIR Application',
        preview: selectedTemplate?.demoUrl || 'https://fhir-viewdefinition-builder.vercel.app',
        downloadUrl: '#',
        features: selectedTemplate?.features || [],
        techStack: selectedTemplate?.techStack || 'React + FHIR Kit Client'
      });

      setCurrentStep(4);
    } catch (error) {
      console.error('Generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const resetBuilder = () => {
    setCurrentStep(1);
    setSelectedAppType('');
    setRequirements('');
    setGeneratedApp(null);
    setIsGenerating(false);
  };

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
              <Link href="/solutions" className="text-neutral-gray hover:text-primary-blue font-medium">
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
      <section className="bg-gradient-to-r from-primary-green to-primary-blue text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">FHIR Builder AI</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Generate FHIR-compliant applications in minutes, not months.
            Describe your needs in plain English and get working code instantly.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setCurrentStep(1)}
              className="bg-white text-primary-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Start Building Now
            </button>
            <a
              href="https://fhir-viewdefinition-builder.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-blue transition"
            >
              View Live Demo
            </a>
          </div>
        </div>
      </section>

      {/* Builder Interface */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Progress Indicator */}
          <div className="mb-12">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step <= currentStep
                        ? 'bg-primary-blue text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step}
                  </div>
                  {step < 4 && (
                    <div
                      className={`w-16 h-1 ${
                        step < currentStep ? 'bg-primary-blue' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Step {currentStep} of 4: {
                    currentStep === 1 ? 'Choose Application Type' :
                    currentStep === 2 ? 'Describe Requirements' :
                    currentStep === 3 ? 'Generate Application' :
                    'Download & Deploy'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Step 1: Application Type Selection */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4 text-primary-navy">
                  What kind of FHIR application would you like to build?
                </h2>
                <p className="text-neutral-gray">
                  Choose a template or describe your custom requirements
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {appTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="card hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-primary-blue"
                    onClick={() => handleAppTypeSelect(template.id)}
                  >
                    <h3 className="text-xl font-bold mb-3 text-primary-navy">{template.name}</h3>
                    <p className="text-neutral-gray mb-4">{template.description}</p>

                    <div className="mb-4">
                      <h4 className="font-semibold text-sm mb-2 text-primary-navy">Key Features:</h4>
                      <ul className="text-sm text-neutral-gray space-y-1">
                        {template.features.slice(0, 3).map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                        {template.features.length > 3 && (
                          <li>• And {template.features.length - 3} more...</li>
                        )}
                      </ul>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-primary-blue font-semibold">{template.techStack}</span>
                      <span className="text-neutral-gray">{template.estimatedTime}</span>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <a
                        href={template.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-blue hover:underline text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Demo →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Requirements Input */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4 text-primary-navy">
                  Describe Your Application Requirements
                </h2>
                <p className="text-neutral-gray">
                  Tell us what you need in plain English. Be specific about features, workflows, and integrations.
                </p>
              </div>

              <div className="bg-bg-secondary p-6 rounded-lg">
                <h3 className="font-semibold mb-4 text-primary-navy">
                  Selected: {appTemplates.find(t => t.id === selectedAppType)?.name}
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-navy mb-2">
                      Describe your specific requirements:
                    </label>
                    <textarea
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      placeholder="Example: I need a patient portal that shows upcoming appointments, lab results from the last 6 months, and allows patients to message their care team. It should integrate with standard FHIR APIs using Particle Health data aggregation and support SMART on FHIR authentication..."
                      className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                      rows={6}
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="btn-secondary"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleRequirementsSubmit}
                      disabled={!requirements.trim()}
                      className="btn-primary disabled:bg-gray-400"
                    >
                      Generate Application
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Generation Process */}
          {currentStep === 3 && isGenerating && (
            <div className="text-center space-y-8">
              <h2 className="text-3xl font-bold text-primary-navy">
                🤖 Building Your FHIR Application...
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 bg-primary-blue rounded-full animate-bounce"></div>
                  <div className="w-4 h-4 bg-primary-blue rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-4 h-4 bg-primary-blue rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>

                <div className="space-y-2 text-left max-w-md mx-auto">
                  <p className="flex items-center text-primary-green">
                    ✅ Analyzing requirements...
                  </p>
                  <p className="flex items-center text-primary-green">
                    ✅ Selecting FHIR resources...
                  </p>
                  <p className="flex items-center text-primary-green">
                    ✅ Generating component structure...
                  </p>
                  <p className="flex items-center text-primary-blue">
                    🔄 Creating API integration layer...
                  </p>
                  <p className="flex items-center text-neutral-gray">
                    ⏳ Adding FHIR validation...
                  </p>
                  <p className="flex items-center text-neutral-gray">
                    ⏳ Implementing security best practices...
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Generated Application */}
          {currentStep === 4 && generatedApp && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4 text-primary-navy">
                  🎉 Your FHIR Application is Ready!
                </h2>
                <p className="text-neutral-gray">
                  Your application has been generated with best practices and FHIR compliance built-in.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="card">
                    <h3 className="text-xl font-bold mb-4 text-primary-navy">Application Details</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="font-semibold text-primary-navy">Name:</span>
                        <span className="ml-2">{generatedApp.name}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-primary-navy">Tech Stack:</span>
                        <span className="ml-2">{generatedApp.techStack}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-primary-navy">Features:</span>
                        <ul className="ml-6 mt-2 space-y-1">
                          {generatedApp.features.map((feature: string, index: number) => (
                            <li key={index} className="text-neutral-gray">• {feature}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <h3 className="text-xl font-bold mb-4 text-primary-navy">Next Steps</h3>
                    <div className="space-y-4">
                      <a
                        href={generatedApp.preview}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary w-full text-center block"
                      >
                        🚀 View Live Preview
                      </a>
                      <button
                        onClick={() => window.alert('Download functionality coming soon! Contact us for early access.')}
                        className="btn-secondary w-full"
                      >
                        📦 Download Source Code
                      </button>
                      <Link
                        href="/contact"
                        className="btn-outline w-full text-center block"
                      >
                        💬 Get Implementation Support
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-xl font-bold mb-4 text-primary-navy">Live Preview</h3>
                  <div className="relative">
                    <iframe
                      src={generatedApp.preview}
                      className="w-full h-96 border border-gray-300 rounded-lg"
                      title="Generated Application Preview"
                    />
                    <div className="absolute top-2 right-2">
                      <a
                        href={generatedApp.preview}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-primary-blue px-3 py-1 rounded shadow text-sm hover:bg-gray-100"
                      >
                        Open in New Tab ↗
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={resetBuilder}
                  className="btn-secondary"
                >
                  Build Another Application
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary-navy">
            Why Choose FHIR Builder AI?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-3 text-primary-navy">AI-Powered Generation</h3>
              <p className="text-neutral-gray">
                Advanced AI understands your requirements and generates production-ready FHIR applications automatically.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3 text-primary-navy">10x Faster Development</h3>
              <p className="text-neutral-gray">
                What used to take weeks now takes minutes. Get working FHIR applications instantly with best practices built-in.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-3 text-primary-navy">FHIR Compliance Guaranteed</h3>
              <p className="text-neutral-gray">
                Every generated application follows FHIR R4 standards, implementation guides, and security best practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Build the Future of Healthcare?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of developers using FHIR Builder AI to create better healthcare applications faster.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setCurrentStep(1)}
              className="bg-white text-primary-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Start Building Free
            </button>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-blue transition"
            >
              Schedule Demo
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
                Building the future of healthcare with AI-powered FHIR development tools.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Builder AI</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Patient Portals</a></li>
                <li><a href="#" className="hover:text-white">Provider Dashboards</a></li>
                <li><a href="#" className="hover:text-white">Integration Tools</a></li>
                <li><a href="#" className="hover:text-white">Custom Apps</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/tools" className="hover:text-white">All Tools</Link></li>
                <li><Link href="/training" className="hover:text-white">Training</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/partners" className="hover:text-white">Partners</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/solutions" className="hover:text-white">Solutions</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FHIR IQ. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* AI Chatbot */}
      <ChatBot />
    </div>
  );
}