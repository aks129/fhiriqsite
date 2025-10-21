'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ChatBot from '../components/ChatBot';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  image?: string;
  category: string;
  popular: boolean;
  sku: string;
}

interface BlogPost {
  _id: string;
  title: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  publishedDate: string;
  author?: string;
  slug?: string;
}

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  const initializePage = useCallback(async () => {
    try {
      console.log('Initializing FHIR IQ Home page...');

      await Promise.all([
        loadFeaturedProducts(),
        loadRecentBlogPosts()
      ]);

      console.log('Home page initialization complete');
    } catch (error) {
      console.error('Home page initialization error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const initializeAnalytics = useCallback(() => {
    try {
      // Track page view
      trackEvent('page_view', {
        page: 'home',
        timestamp: new Date().toISOString()
      });

      // Track scroll depth
      let scroll25Tracked = false;
      let scroll50Tracked = false;
      let scroll75Tracked = false;
      let scroll90Tracked = false;

      const handleScroll = () => {
        const scrollPercent = Math.round(
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        );

        if (scrollPercent >= 25 && !scroll25Tracked) {
          trackEvent('scroll_depth', { depth: 25 });
          scroll25Tracked = true;
        }
        if (scrollPercent >= 50 && !scroll50Tracked) {
          trackEvent('scroll_depth', { depth: 50 });
          scroll50Tracked = true;
        }
        if (scrollPercent >= 75 && !scroll75Tracked) {
          trackEvent('scroll_depth', { depth: 75 });
          scroll75Tracked = true;
        }
        if (scrollPercent >= 90 && !scroll90Tracked) {
          trackEvent('scroll_depth', { depth: 90 });
          scroll90Tracked = true;
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => window.removeEventListener('scroll', handleScroll);
    } catch (error) {
      console.error('Analytics initialization error:', error);
    }
  }, []);

  async function loadFeaturedProducts() {
    try {
      // For now, use mock data - replace with actual API call
      const mockProducts: Product[] = [
        {
          _id: '1',
          name: 'FHIR Developer License - Professional',
          description: 'Advanced FHIR validation and code generation tools for professional developers.',
          price: 799,
          originalPrice: 999,
          currency: 'USD',
          image: '/images/fhir-dev-license.jpg',
          category: 'license',
          popular: true,
          sku: 'FHIR-DEV-PRO-1Y'
        },
        {
          _id: '2',
          name: 'FHIR Training - Fundamentals',
          description: 'Comprehensive FHIR training course covering fundamentals and best practices.',
          price: 299,
          currency: 'USD',
          image: '/images/fhir-training.jpg',
          category: 'training',
          popular: false,
          sku: 'FHIR-TRN-FND'
        },
        {
          _id: '3',
          name: 'FHIR Consultation Package',
          description: 'Expert consultation services for FHIR implementation and optimization.',
          price: 1500,
          currency: 'USD',
          image: '/images/fhir-consultation.jpg',
          category: 'consulting',
          popular: true,
          sku: 'FHIR-CON-PKG'
        }
      ];

      setFeaturedProducts(mockProducts);
    } catch (error) {
      console.error('Error loading featured products:', error);
    }
  }

  async function loadRecentBlogPosts() {
    try {
      // For now, use mock data - replace with actual API call
      const mockBlogPosts: BlogPost[] = [
        {
          _id: '1',
          title: 'Getting Started with FHIR R4',
          excerpt: 'Learn the fundamentals of FHIR R4 and how to implement healthcare interoperability.',
          featuredImage: '/images/blog-fhir-r4.jpg',
          publishedDate: '2024-01-15',
          author: 'FHIR IQ Team',
          slug: 'getting-started-fhir-r4'
        },
        {
          _id: '2',
          title: 'AI-Powered FHIR Application Development',
          excerpt: 'Discover how AI can accelerate your FHIR application development process.',
          featuredImage: '/images/blog-ai-fhir.jpg',
          publishedDate: '2024-01-10',
          author: 'FHIR IQ Team',
          slug: 'ai-powered-fhir-development'
        },
        {
          _id: '3',
          title: 'FHIR Security Best Practices',
          excerpt: 'Essential security considerations when implementing FHIR-based healthcare systems.',
          featuredImage: '/images/blog-fhir-security.jpg',
          publishedDate: '2024-01-05',
          author: 'FHIR IQ Team',
          slug: 'fhir-security-best-practices'
        }
      ];

      setBlogPosts(mockBlogPosts);
    } catch (error) {
      console.error('Error loading blog posts:', error);
    }
  }


  useEffect(() => {
    initializePage();
    initializeAnalytics();
  }, [initializePage, initializeAnalytics]);

  async function handleNewsletterSignup(e: React.FormEvent) {
    e.preventDefault();

    if (!newsletterEmail) {
      alert('Please enter your email address');
      return;
    }

    if (!isValidEmail(newsletterEmail)) {
      alert('Please enter a valid email address');
      return;
    }

    setNewsletterLoading(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Thank you for subscribing! Check your email for confirmation.');
        setNewsletterEmail('');
        trackEvent('newsletter_signup', { email: newsletterEmail });
      } else {
        alert(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      alert('Failed to subscribe. Please try again.');
    } finally {
      setNewsletterLoading(false);
    }
  }

  function trackEvent(eventName: string, properties: Record<string, unknown> = {}) {
    try {
      console.log('Track event:', eventName, properties);

      // Example implementation for Google Analytics
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as unknown as { gtag: (type: string, event: string, properties: unknown) => void }).gtag('event', eventName, properties);
      }

      // Example implementation for PostHog
      if (typeof window !== 'undefined' && 'posthog' in window) {
        (window as unknown as { posthog: { capture: (event: string, properties: unknown) => void } }).posthog.capture(eventName, properties);
      }
    } catch (error) {
      console.error('Event tracking error:', error);
    }
  }

  function formatPrice(price: number, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(price);
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Updated per PRD IA specifications */}
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
              <Link href="/store" className="text-neutral-gray hover:text-primary-blue font-medium">
                Store
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
              <Link href="/portfolio" className="text-neutral-gray hover:text-primary-blue font-medium">
                Portfolio
              </Link>
              <Link href="/about" className="text-neutral-gray hover:text-primary-blue font-medium">
                About
              </Link>
              <a href="https://calendar.app.google/TMvRGiiYfbBKNd889" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
                Book Meeting
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Updated per PRD value proposition */}
      <section className="bg-gradient-to-r from-primary-blue to-accent-purple text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6">
              Accelerate FHIR Development with AI-Powered Tools
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Build, validate, and deploy FHIR-compliant healthcare applications faster with our integrated platform and expert guidance.
            </p>

            <div className="flex gap-4 justify-center mb-12">
              <Link
                href="/tools"
                onClick={() => trackEvent('hero_cta_clicked', { button: 'try_tools' })}
                className="bg-white text-primary-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Try Our Tools
              </Link>
              <Link
                href="/contact"
                onClick={() => trackEvent('hero_cta_clicked', { button: 'get_demo' })}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-blue transition"
              >
                Request Demo
              </Link>
            </div>
          </div>

          {/* Trusted By Section */}
          <div className="text-center border-t border-white/20 pt-8">
            <p className="text-sm opacity-80 mb-6">Trusted by healthcare organizations building FHIR solutions</p>
            <div className="flex justify-center items-center gap-12 flex-wrap">
              <div className="text-white/60 font-semibold text-lg">Healthcare Startups</div>
              <div className="text-white/60 font-semibold text-lg">Health Systems</div>
              <div className="text-white/60 font-semibold text-lg">Payer Organizations</div>
              <div className="text-white/60 font-semibold text-lg">Digital Health Companies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Overview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete FHIR Development Platform</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to build, validate, and scale FHIR-compliant healthcare applications
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent-teal/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Developer Tools</h3>
              <p className="text-gray-600">
                Code generators, validators, and testing tools built specifically for FHIR R4 development
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent-purple/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Compliance & Validation</h3>
              <p className="text-gray-600">
                Ensure conformance with US Core, CARIN BB, and other implementation guides
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent-orange/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Training & Support</h3>
              <p className="text-gray-600">
                Expert guidance, comprehensive training, and implementation support when you need it
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Built for Your Healthcare Use Case</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From payer platforms to clinical data exchange, our tools support the full spectrum of FHIR implementations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="text-3xl mb-3">🏥</div>
              <h3 className="text-lg font-semibold mb-2">Patient Portals</h3>
              <p className="text-gray-600 text-sm">Enable patients to access their health records with SMART on FHIR</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="text-3xl mb-3">💳</div>
              <h3 className="text-lg font-semibold mb-2">Payer Data Exchange</h3>
              <p className="text-gray-600 text-sm">Build CARIN Blue Button compliant member access APIs</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="text-3xl mb-3">⚕️</div>
              <h3 className="text-lg font-semibold mb-2">Clinical Decision Support</h3>
              <p className="text-gray-600 text-sm">Integrate CDS Hooks and clinical logic into EHR workflows</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-lg font-semibold mb-2">Analytics & Reporting</h3>
              <p className="text-gray-600 text-sm">Extract and analyze FHIR data for population health insights</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/solutions"
              className="inline-block text-primary-blue font-semibold hover:underline"
            >
              Explore All Use Cases →
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Tools</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Production-ready tools used by healthcare developers worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/tools" className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">FHIR Validator</h3>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Live</span>
              </div>
              <p className="text-gray-600 mb-4">
                Validate FHIR resources against implementation guides including US Core, CARIN BB, and Da Vinci
              </p>
              <div className="text-primary-blue font-semibold">Free to use →</div>
            </Link>

            <Link href="/tools" className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Data Quality Analyzer</h3>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Live</span>
              </div>
              <p className="text-gray-600 mb-4">
                Assess FHIR data completeness, conformance, and identify quality issues automatically
              </p>
              <div className="text-primary-blue font-semibold">Free to use →</div>
            </Link>

            <Link href="/tools/fhir-builder" className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">App Scaffolding Tool</h3>
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">Beta</span>
              </div>
              <p className="text-gray-600 mb-4">
                Generate starter code for FHIR applications with authentication and deployment configs
              </p>
              <div className="text-primary-blue font-semibold">Join waitlist →</div>
            </Link>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/tools"
              className="btn-primary inline-block"
            >
              View All Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Why FHIR IQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Healthcare Teams Choose FHIR IQ</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Proven expertise and practical tools that accelerate your FHIR development
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-blue/10 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Faster Time to Market</h3>
                  <p className="text-gray-600">
                    Pre-built components and templates help you launch FHIR-compliant features in weeks instead of months
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-blue/10 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Standards Compliance</h3>
                  <p className="text-gray-600">
                    Built-in validation ensures your implementations meet US Core, CARIN BB, and other IG requirements
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-blue/10 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Expert Support</h3>
                  <p className="text-gray-600">
                    Access to FHIR specialists who understand both the technical and regulatory landscape
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8">
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    <div>
                      <div className="font-semibold">Healthcare Developer</div>
                      <div className="text-sm text-gray-600">Digital Health Startup</div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">
                    "FHIR IQ's tools helped us pass our US Core validation on the first try. The data quality analyzer caught issues we would have missed."
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    <div>
                      <div className="font-semibold">Technical Architect</div>
                      <div className="text-sm text-gray-600">Regional Health System</div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">
                    "The comprehensive training and hands-on workshops brought our team up to speed on FHIR implementation best practices quickly."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Resources</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay current with FHIR best practices, implementation guides, and industry updates
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/blog" className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-6">
              <div className="text-primary-blue font-semibold text-sm mb-2">BLOG</div>
              <h3 className="text-xl font-semibold mb-2">Getting Started with FHIR R4</h3>
              <p className="text-gray-600 mb-4">Essential concepts and practical examples for developers new to FHIR</p>
              <div className="text-sm text-gray-500">5 min read</div>
            </Link>

            <Link href="/training" className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-6">
              <div className="text-accent-purple font-semibold text-sm mb-2">TRAINING</div>
              <h3 className="text-xl font-semibold mb-2">FHIR Implementation Workshop</h3>
              <p className="text-gray-600 mb-4">Hands-on training for building SMART on FHIR applications</p>
              <div className="text-sm text-gray-500">4-hour workshop</div>
            </Link>

            <Link href="/podcast" className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-6">
              <div className="text-accent-teal font-semibold text-sm mb-2">PODCAST</div>
              <h3 className="text-xl font-semibold mb-2">FHIR in Practice</h3>
              <p className="text-gray-600 mb-4">Real-world implementation stories from healthcare technology leaders</p>
              <div className="text-sm text-gray-500">Weekly episodes</div>
            </Link>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/blog"
              className="inline-block text-primary-blue font-semibold hover:underline"
            >
              View All Resources →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-blue to-accent-purple text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Accelerate Your FHIR Development?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join healthcare organizations using FHIR IQ to build compliant, production-ready applications faster
          </p>
          <div className="flex gap-4 justify-center mb-8">
            <Link
              href="/tools"
              className="bg-white text-primary-blue px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition text-lg"
            >
              Explore Tools
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-blue transition text-lg"
            >
              Talk to an Expert
            </Link>
          </div>

          <div className="border-t border-white/20 pt-8 mt-8">
            <p className="text-sm opacity-80 mb-4">Stay updated with FHIR best practices and platform updates</p>
            <form onSubmit={handleNewsletterSignup} className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                disabled={newsletterLoading}
                className="bg-white text-primary-blue px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition disabled:opacity-50 whitespace-nowrap"
              >
                {newsletterLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FHIR IQ</h3>
              <p className="text-gray-400">
                Leading healthcare interoperability solutions powered by AI and FHIR expertise.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/products" className="hover:text-white">Developer Licenses</Link></li>
                <li><Link href="/products" className="hover:text-white">Training Courses</Link></li>
                <li><Link href="/products" className="hover:text-white">Consulting</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/builder" className="hover:text-white">AI Builder</Link></li>
                <li><Link href="/docs" className="hover:text-white">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
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
