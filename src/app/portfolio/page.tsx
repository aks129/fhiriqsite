'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all');

  const projects = [
    {
      id: 1,
      title: "FHIR Quiz Training Platform",
      description: "Interactive FHIR knowledge assessment and training platform with real-time scoring and detailed explanations.",
      category: "training",
      tags: ["FHIR", "Education", "React", "Assessment"],
      image: "📚",
      liveUrl: "https://fhirquiz.vercel.app",
      githubUrl: "https://github.com/AKS129/fhirquiz",
      featured: true,
      metrics: {
        users: "2.5K+",
        completion: "89%",
        satisfaction: "4.8/5"
      }
    },
    {
      id: 2,
      title: "Plumly AI Summary Tool",
      description: "Advanced AI-powered document summarization tool for healthcare content with FHIR-aware processing.",
      category: "ai-tools",
      tags: ["AI", "NLP", "Summarization", "Healthcare"],
      image: "🤖",
      liveUrl: "https://plumly.vercel.app",
      githubUrl: "https://github.com/AKS129/plumly",
      featured: true,
      metrics: {
        processed: "10K+",
        accuracy: "94%",
        time_saved: "80%"
      }
    },
    {
      id: 3,
      title: "Agent Interoperability Platform",
      description: "Multi-agent system for healthcare data exchange and interoperability testing with FHIR validation.",
      category: "interoperability",
      tags: ["FHIR", "Agents", "Interoperability", "Testing"],
      image: "🔗",
      liveUrl: "https://agent-inter-op.vercel.app",
      githubUrl: "https://github.com/AKS129/agent-inter-op",
      featured: true,
      metrics: {
        integrations: "50+",
        success_rate: "96%",
        response_time: "<200ms"
      }
    },
    {
      id: 4,
      title: "FHIR View Definition Builder",
      description: "Visual builder for creating FHIR ViewDefinition resources with drag-and-drop interface and live preview.",
      category: "fhir-tools",
      tags: ["FHIR", "ViewDefinition", "Builder", "Visual"],
      image: "🏗️",
      liveUrl: "https://fhir-viewdefinition-builder.vercel.app",
      githubUrl: "https://github.com/AKS129/fhir-viewdefinition-builder",
      featured: false,
      metrics: {
        definitions: "500+",
        complexity: "Advanced",
        validation: "100%"
      }
    },
    {
      id: 5,
      title: "FHIR Query Converter",
      description: "Powerful conversion tool for transforming between different FHIR query formats and search syntaxes.",
      category: "fhir-tools",
      tags: ["FHIR", "Query", "Conversion", "Search"],
      image: "🔄",
      liveUrl: "https://fhir-query-converter.vercel.app",
      githubUrl: "https://github.com/AKS129/fhir-query-converter",
      featured: false,
      metrics: {
        conversions: "25K+",
        formats: "8",
        accuracy: "99.2%"
      }
    },
    {
      id: 6,
      title: "FHIRspective Data Quality Assessment",
      description: "Comprehensive FHIR data quality analysis tool with automated reports and improvement recommendations.",
      category: "data-quality",
      tags: ["FHIR", "Data Quality", "Analytics", "Reporting"],
      image: "📊",
      liveUrl: "https://fhirspective.vercel.app",
      githubUrl: "https://github.com/AKS129/fhirspective",
      featured: true,
      metrics: {
        assessments: "1.2K+",
        issues_found: "15K+",
        improvement: "65%"
      }
    },
    {
      id: 7,
      title: "Smart Scheduling System",
      description: "Intelligent healthcare appointment scheduling with FHIR integration and AI-powered optimization.",
      category: "scheduling",
      tags: ["FHIR", "Scheduling", "AI", "Optimization"],
      image: "📅",
      liveUrl: "https://smartscheduling.vercel.app",
      githubUrl: "https://github.com/AKS129/smartscheduling",
      featured: false,
      metrics: {
        appointments: "5K+",
        efficiency: "78%",
        satisfaction: "4.7/5"
      }
    },
    {
      id: 8,
      title: "Liara Health AI Connect",
      description: "Advanced health AI platform connecting patients, providers, and systems with intelligent FHIR workflows.",
      category: "ai-health",
      tags: ["AI", "Health", "FHIR", "Integration"],
      image: "🏥",
      liveUrl: "https://smart-health-connect.vercel.app",
      githubUrl: "https://github.com/AKS129/smart-health-connect",
      featured: true,
      metrics: {
        connections: "800+",
        uptime: "99.9%",
        response: "<100ms"
      }
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', count: projects.length },
    { id: 'training', name: 'Training & Education', count: projects.filter(p => p.category === 'training').length },
    { id: 'ai-tools', name: 'AI Tools', count: projects.filter(p => p.category === 'ai-tools').length },
    { id: 'fhir-tools', name: 'FHIR Tools', count: projects.filter(p => p.category === 'fhir-tools').length },
    { id: 'interoperability', name: 'Interoperability', count: projects.filter(p => p.category === 'interoperability').length },
    { id: 'data-quality', name: 'Data Quality', count: projects.filter(p => p.category === 'data-quality').length },
    { id: 'scheduling', name: 'Scheduling', count: projects.filter(p => p.category === 'scheduling').length },
    { id: 'ai-health', name: 'AI Health', count: projects.filter(p => p.category === 'ai-health').length }
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  const featuredProjects = projects.filter(project => project.featured);

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
              <Link href="/portfolio" className="text-primary-blue font-semibold">
                Portfolio
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
      <section className="bg-gradient-to-r from-primary-blue to-accent-purple text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">FHIR IQ Portfolio</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Showcase of innovative FHIR solutions, AI-powered healthcare tools, and interoperability platforms
            built by AKS129 for the healthcare technology community.
          </p>
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">{projects.length}</div>
              <div className="text-sm opacity-90">Live Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">50K+</div>
              <div className="text-sm opacity-90">Users Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">99.5%</div>
              <div className="text-sm opacity-90">Uptime</div>
            </div>
          </div>
          <a
            href="https://github.com/AKS129"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-primary-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            View GitHub Profile
          </a>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary-navy">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div key={project.id} className="card hover:shadow-xl transition-all duration-300 group">
                <div className="text-6xl mb-4 text-center group-hover:scale-110 transition-transform">
                  {project.image}
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary-navy">{project.title}</h3>
                <p className="text-neutral-gray mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="bg-bg-accent text-primary-blue px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="font-bold text-primary-blue">{value}</div>
                      <div className="text-neutral-gray capitalize">{key.replace('_', ' ')}</div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm flex-1 text-center"
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-sm px-4"
                  >
                    Code
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-16 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary-navy">
            All Projects
          </h2>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg transition ${
                  activeCategory === category.id
                    ? 'bg-primary-blue text-white'
                    : 'bg-white text-primary-blue hover:bg-primary-blue hover:text-white'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-4xl">{project.image}</div>
                  {project.featured && (
                    <span className="bg-accent-orange text-white px-2 py-1 rounded text-xs">
                      Featured
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold mb-2 text-primary-navy">{project.title}</h3>
                <p className="text-neutral-gray text-sm mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="bg-bg-accent text-primary-blue px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-blue hover:text-primary-navy text-sm font-medium"
                  >
                    View Live →
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-gray hover:text-primary-blue text-sm"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary-navy">
            Open Source Contributions
          </h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="card">
              <div className="text-3xl font-bold text-primary-blue mb-2">25+</div>
              <div className="text-neutral-gray">Public Repositories</div>
            </div>
            <div className="card">
              <div className="text-3xl font-bold text-primary-blue mb-2">500K+</div>
              <div className="text-neutral-gray">Lines of Code</div>
            </div>
            <div className="card">
              <div className="text-3xl font-bold text-primary-blue mb-2">50+</div>
              <div className="text-neutral-gray">Contributors</div>
            </div>
            <div className="card">
              <div className="text-3xl font-bold text-primary-blue mb-2">1.2K+</div>
              <div className="text-neutral-gray">Stars Earned</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl mb-8">
            Let's collaborate on your next FHIR project. From concept to deployment,
            we'll help you create innovative healthcare solutions.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Start a Project
            </Link>
            <a
              href="https://github.com/AKS129"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-blue transition"
            >
              Follow on GitHub
            </a>
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
                Leading FHIR innovation through open source contributions and cutting-edge healthcare technology.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Projects</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="https://fhirquiz.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-white">FHIR Quiz</a></li>
                <li><a href="https://plumly.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-white">Plumly AI</a></li>
                <li><a href="https://fhirspective.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-white">FHIRspective</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/training" className="hover:text-white">Training</Link></li>
                <li><Link href="/tools" className="hover:text-white">Tools</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="https://github.com/AKS129" target="_blank" rel="noopener noreferrer" className="hover:text-white">GitHub</a></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/podcast" className="hover:text-white">Podcast</Link></li>
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