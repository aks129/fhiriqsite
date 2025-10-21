'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Training() {
  const [selectedTab, setSelectedTab] = useState('courses');

  const courses = [
    {
      id: 'fundamentals',
      title: 'FHIR Fundamentals',
      level: 'Beginner',
      duration: '4 weeks',
      price: 299,
      description: 'Master the basics of FHIR R4, resources, and implementation patterns.',
      curriculum: [
        'FHIR overview and ecosystem',
        'Core resources (Patient, Encounter, Observation)',
        'Search and RESTful API patterns',
        'Terminology and code systems',
        'Practical implementation exercises'
      ],
      nextCohort: '2024-02-15',
      seatsRemaining: 8
    },
    {
      id: 'advanced-api',
      title: 'Advanced FHIR API Development',
      level: 'Intermediate',
      duration: '6 weeks',
      price: 599,
      description: 'Build production-ready FHIR APIs with authentication, validation, and optimization.',
      curriculum: [
        'SMART on FHIR authentication',
        'Custom operations and extensions',
        'Performance optimization',
        'Security best practices',
        'Production deployment strategies'
      ],
      nextCohort: '2024-03-01',
      seatsRemaining: 12
    },
    {
      id: 'ai-workshop',
      title: 'AI-Assisted FHIR Development',
      level: 'Advanced',
      duration: '2 days',
      price: 899,
      description: 'Learn to leverage AI tools for faster FHIR application development and data quality.',
      curriculum: [
        'AI-powered code generation',
        'Automated mapping strategies',
        'Quality assessment with ML',
        'Hands-on with FHIR IQ tools',
        'Best practices and pitfalls'
      ],
      nextCohort: '2024-02-28',
      seatsRemaining: 15,
      popular: true
    }
  ];

  const quizSample = [
    {
      id: 1,
      question: 'Which FHIR resource is used to represent a healthcare provider?',
      options: [
        'Organization',
        'Practitioner',
        'Location',
        'Both A and B'
      ],
      correct: 3,
      explanation: 'Both Organization and Practitioner resources can represent healthcare providers, depending on whether you\'re referring to an institutional provider or an individual practitioner.'
    },
    {
      id: 2,
      question: 'What is the primary purpose of FHIR profiles?',
      options: [
        'To define custom resources',
        'To constrain and extend base resources',
        'To create API endpoints',
        'To manage terminology'
      ],
      correct: 1,
      explanation: 'FHIR profiles are used to constrain and extend base FHIR resources to meet specific implementation requirements while maintaining interoperability.'
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
              <Link href="/solutions" className="text-neutral-gray hover:text-primary-blue font-medium">
                Solutions
              </Link>
              <Link href="/tools" className="text-neutral-gray hover:text-primary-blue font-medium">
                Tools
              </Link>
              <Link href="/training" className="text-primary-blue font-semibold">
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
      <section className="bg-gradient-to-r from-accent-purple to-primary-blue text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">FHIR Training & Certification</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Master FHIR with expert-led courses, interactive quizzes, and hands-on workshops.
            From fundamentals to AI-assisted development, we'll accelerate your FHIR expertise.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="#quiz-sampler"
              className="bg-white text-primary-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Try FHIR Quiz
            </Link>
            <Link
              href="#courses"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-blue transition"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center">
            <div className="flex bg-white rounded-lg p-1 shadow">
              <button
                onClick={() => setSelectedTab('courses')}
                className={`px-6 py-2 rounded-md font-medium transition ${
                  selectedTab === 'courses'
                    ? 'bg-primary-blue text-white'
                    : 'text-neutral-gray hover:text-primary-blue'
                }`}
              >
                Courses
              </button>
              <button
                onClick={() => setSelectedTab('quiz')}
                className={`px-6 py-2 rounded-md font-medium transition ${
                  selectedTab === 'quiz'
                    ? 'bg-primary-blue text-white'
                    : 'text-neutral-gray hover:text-primary-blue'
                }`}
              >
                FHIR Quiz
              </button>
              <button
                onClick={() => setSelectedTab('certification')}
                className={`px-6 py-2 rounded-md font-medium transition ${
                  selectedTab === 'certification'
                    ? 'bg-primary-blue text-white'
                    : 'text-neutral-gray hover:text-primary-blue'
                }`}
              >
                Certification
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Tab */}
      {selectedTab === 'courses' && (
        <section id="courses" className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-primary-navy">
              Expert-Led FHIR Courses
            </h2>
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className={`card hover:shadow-xl transition-shadow ${
                    course.popular ? 'ring-2 ring-primary-blue' : ''
                  }`}
                >
                  {course.popular && (
                    <div className="bg-primary-blue text-white px-3 py-1 rounded-full text-sm mb-4 w-fit">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-primary-navy mb-2">
                      {course.title}
                    </h3>
                    <div className="flex gap-4 text-sm text-neutral-gray mb-2">
                      <span className="bg-bg-accent px-2 py-1 rounded">{course.level}</span>
                      <span className="bg-bg-accent px-2 py-1 rounded">{course.duration}</span>
                    </div>
                    <p className="text-neutral-gray">{course.description}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-primary-navy">Curriculum:</h4>
                    <ul className="space-y-1">
                      {course.curriculum.map((item, index) => (
                        <li key={index} className="flex items-start text-sm text-neutral-gray">
                          <span className="text-primary-green mr-2 mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-neutral-gray">Next cohort:</span>
                      <span className="font-semibold text-primary-navy">
                        {new Date(course.nextCohort).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-neutral-gray">Seats remaining:</span>
                      <span className="font-semibold text-primary-green">
                        {course.seatsRemaining}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    <div className="text-2xl font-bold text-primary-blue">
                      ${course.price}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      href="/contact"
                      className="btn-primary flex-1 text-center"
                    >
                      Enroll Now
                    </Link>
                    <button className="btn-secondary flex-1">
                      Syllabus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quiz Tab */}
      {selectedTab === 'quiz' && (
        <section id="quiz-sampler" className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-primary-navy">
              FHIR Knowledge Quiz
            </h2>
            <p className="text-center text-neutral-gray mb-12">
              Test your FHIR knowledge with our comprehensive quiz engine.
              Practice questions cover FHIR resources, search patterns, terminology, and more.
            </p>

            <div className="space-y-8">
              {quizSample.map((question, index) => (
                <div key={question.id} className="card">
                  <h3 className="font-semibold mb-4 text-primary-navy">
                    Question {index + 1}: {question.question}
                  </h3>
                  <div className="space-y-2 mb-4">
                    {question.options.map((option, optionIndex) => (
                      <label key={optionIndex} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={optionIndex}
                          className="mr-3 text-primary-blue"
                        />
                        <span className="text-neutral-gray">{option}</span>
                      </label>
                    ))}
                  </div>
                  <details className="mt-4">
                    <summary className="cursor-pointer text-primary-blue font-semibold">
                      Show Explanation
                    </summary>
                    <div className="mt-2 p-4 bg-bg-accent rounded">
                      <p className="text-neutral-gray">{question.explanation}</p>
                    </div>
                  </details>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href="https://fhirquiz.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block"
              >
                Take Full FHIR Quiz Platform (100+ questions) →
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Certification Tab */}
      {selectedTab === 'certification' && (
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8 text-primary-navy">
              FHIR IQ Certification Program
            </h2>
            <p className="text-lg text-neutral-gray mb-12">
              Validate your FHIR expertise with industry-recognized certification.
              Our comprehensive program covers implementation, security, and best practices.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="card text-left">
                <h3 className="text-xl font-bold mb-4 text-primary-navy">
                  FHIR Developer Certification
                </h3>
                <ul className="space-y-2 text-neutral-gray mb-6">
                  <li>✓ 100-question comprehensive exam</li>
                  <li>✓ Covers FHIR R4 resources and APIs</li>
                  <li>✓ Implementation scenarios</li>
                  <li>✓ Security and compliance</li>
                  <li>✓ Valid for 2 years</li>
                </ul>
                <div className="text-2xl font-bold text-primary-blue mb-4">$299</div>
                <Link href="/contact" className="btn-primary w-full text-center">
                  Schedule Exam
                </Link>
              </div>

              <div className="card text-left">
                <h3 className="text-xl font-bold mb-4 text-primary-navy">
                  FHIR Architect Certification
                </h3>
                <ul className="space-y-2 text-neutral-gray mb-6">
                  <li>✓ Advanced 150-question exam</li>
                  <li>✓ System design and architecture</li>
                  <li>✓ Performance optimization</li>
                  <li>✓ Enterprise integration patterns</li>
                  <li>✓ Valid for 3 years</li>
                </ul>
                <div className="text-2xl font-bold text-primary-blue mb-4">$499</div>
                <Link href="/contact" className="btn-primary w-full text-center">
                  Schedule Exam
                </Link>
              </div>
            </div>

            <div className="bg-bg-accent p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-primary-navy">
                HL7 FHIR Exam Preparation
              </h3>
              <p className="text-neutral-gray mb-6">
                Preparing for the official HL7 FHIR certification? Our targeted prep course
                covers all exam domains with practice questions and detailed explanations.
              </p>
              <Link href="/contact" className="btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-primary-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Master FHIR?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of healthcare professionals who have accelerated their FHIR expertise
            with our comprehensive training programs.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Enroll Today
            </Link>
            <Link
              href="/training/corporate"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-blue transition"
            >
              Corporate Training
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
                Expert FHIR training and certification for healthcare professionals.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Training</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/training#fundamentals" className="hover:text-white">FHIR Fundamentals</Link></li>
                <li><Link href="/training#advanced-api" className="hover:text-white">Advanced API Development</Link></li>
                <li><Link href="/training#ai-workshop" className="hover:text-white">AI Workshop</Link></li>
                <li><Link href="/training/quiz" className="hover:text-white">FHIR Quiz</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/tools" className="hover:text-white">Tools</Link></li>
                <li><Link href="/docs" className="hover:text-white">Documentation</Link></li>
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