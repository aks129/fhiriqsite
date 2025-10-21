'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import LivePodcastMetrics from '@/components/LivePodcastMetrics';

interface PodcastEpisode {
  title: string;
  description: string;
  pubDate: string;
  link: string;
  enclosure?: {
    url: string;
    type: string;
    length: string;
  };
  guid: string;
  duration?: string;
}

export default function Podcast() {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch podcast episodes from RSS feed
    const fetchPodcastFeed = async () => {
      try {
        // Using a CORS proxy for client-side RSS feed fetching
        const rssUrl = 'https://api.substack.com/feed/podcast/4334682.rss';
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`;

        const response = await fetch(proxyUrl);

        if (!response.ok) {
          throw new Error('Failed to fetch RSS feed');
        }

        const text = await response.text();

        // Parse RSS XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'text/xml');

        const items = xmlDoc.querySelectorAll('item');
        const parsedEpisodes: PodcastEpisode[] = [];

        items.forEach((item, index) => {
          if (index < 12) { // Show more recent episodes
            const episode: PodcastEpisode = {
              title: item.querySelector('title')?.textContent || '',
              description: item.querySelector('description')?.textContent || '',
              pubDate: item.querySelector('pubDate')?.textContent || '',
              link: item.querySelector('link')?.textContent || '',
              guid: item.querySelector('guid')?.textContent || String(index),
            };

            const enclosureNode = item.querySelector('enclosure');
            if (enclosureNode) {
              episode.enclosure = {
                url: enclosureNode.getAttribute('url') || '',
                type: enclosureNode.getAttribute('type') || '',
                length: enclosureNode.getAttribute('length') || '',
              };
            }

            // Extract duration if available
            const duration = item.querySelector('duration, itunes\\:duration');
            if (duration) {
              episode.duration = duration.textContent || '';
            }

            parsedEpisodes.push(episode);
          }
        });

        if (parsedEpisodes.length > 0) {
          setEpisodes(parsedEpisodes);
        } else {
          // Use fallback data if no episodes parsed
          loadFallbackData();
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching podcast feed:', err);
        // Use fallback data instead of showing error
        loadFallbackData();
        setLoading(false);
      }
    };

    const loadFallbackData = () => {
      // Fallback podcast episodes if RSS feed fails
      const fallbackEpisodes: PodcastEpisode[] = [
        {
          title: 'Welcome to Out of the FHIR Podcast',
          description: 'Join us for in-depth conversations about FHIR, healthcare interoperability, and the future of health data exchange. In this episode, we introduce the podcast and discuss what you can expect in upcoming episodes.',
          pubDate: new Date().toISOString(),
          link: 'https://evestel.substack.com/podcast',
          guid: 'fallback-1',
          duration: '45:00'
        },
        {
          title: 'FHIR Implementation Best Practices',
          description: 'Exploring real-world FHIR implementation strategies, common pitfalls to avoid, and lessons learned from successful deployments in healthcare organizations.',
          pubDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          link: 'https://evestel.substack.com/podcast',
          guid: 'fallback-2',
          duration: '52:30'
        },
        {
          title: 'The Future of Healthcare Interoperability',
          description: 'A deep dive into emerging trends in healthcare data exchange, including AI integration, patient access APIs, and the evolving FHIR standards landscape.',
          pubDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          link: 'https://evestel.substack.com/podcast',
          guid: 'fallback-3',
          duration: '48:15'
        }
      ];
      setEpisodes(fallbackEpisodes);
    };

    fetchPodcastFeed();
  }, []);

  const subscriptionLinks = [
    {
      platform: "Substack",
      url: "https://evestel.substack.com/podcast",
      icon: "📡",
      color: "bg-orange-500 hover:bg-orange-600"
    },
    {
      platform: "Spotify",
      url: "https://open.spotify.com/show/6GBZT7KA1Ug8xMZ4l5LThU?si=441a0a7d66f74d52",
      icon: "🎵",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      platform: "Apple Podcasts",
      url: "https://podcasts.apple.com/us/podcast/out-of-the-fhir-podcast/id1822845248",
      icon: "🎧",
      color: "bg-purple-500 hover:bg-purple-600"
    },
    {
      platform: "YouTube",
      url: "https://www.youtube.com/@OutoftheFHIRPodcast",
      icon: "📺",
      color: "bg-red-500 hover:bg-red-600"
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
              <Link href="/training" className="text-neutral-gray hover:text-primary-blue font-medium">
                Training
              </Link>
              <Link href="/blog" className="text-neutral-gray hover:text-primary-blue font-medium">
                Blog
              </Link>
              <Link href="/podcast" className="text-primary-blue font-semibold">
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
      <section className="bg-gradient-to-r from-accent-purple via-primary-blue to-primary-navy text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
              <span className="text-3xl mr-3">🎙️</span>
              <span className="font-semibold text-lg">Out of the FHIR Podcast</span>
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Out of the FHIR Podcast
          </h1>
          <p className="text-xl mb-8 max-w-4xl mx-auto leading-relaxed">
            Deep conversations with FHIR experts, implementers, and healthcare innovators.
            Get practical insights, real-world implementation stories, and the latest developments
            in healthcare interoperability from industry leaders.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://evestel.substack.com/podcast"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary-blue px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              🎧 Listen on Substack
            </a>
            <a
              href="https://open.spotify.com/show/6GBZT7KA1Ug8xMZ4l5LThU"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              🎵 Spotify
            </a>
            <a
              href="https://podcasts.apple.com/us/podcast/out-of-the-fhir-podcast/id1822845248"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-blue transition-all duration-200 transform hover:scale-105"
            >
              🍎 Apple Podcasts
            </a>
          </div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="py-16 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-primary-navy">
              📊 Live Podcast Metrics
            </h2>
            <p className="text-lg text-neutral-gray">
              Real-time data from all platforms showing our growing community
            </p>
          </div>
          <LivePodcastMetrics showPlatformBreakdown={true} />
        </div>
      </section>

      {/* Latest Episode Highlight */}
      {!loading && !error && episodes.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-primary-navy">
                🔥 Latest Episode
              </h2>
              <p className="text-xl text-neutral-gray">
                Fresh insights from the world of FHIR and healthcare interoperability
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary-blue to-primary-navy rounded-2xl p-8 text-white shadow-2xl">
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Latest Episode
                    </span>
                    {episodes[0].duration && (
                      <span className="text-blue-100">{episodes[0].duration}</span>
                    )}
                    <span className="text-blue-100">
                      {new Date(episodes[0].pubDate).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold mb-6 leading-tight">
                    {episodes[0].title}
                  </h3>
                  <div
                    className="text-blue-100 mb-8 text-lg leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: episodes[0].description.substring(0, 300) + (episodes[0].description.length > 300 ? '...' : '')
                    }}
                  />
                  {episodes[0].enclosure && (
                    <div className="mb-6">
                      <audio controls className="w-full max-w-lg bg-white/10 rounded-lg">
                        <source src={episodes[0].enclosure.url} type={episodes[0].enclosure.type} />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}
                </div>
                <div className="lg:col-span-1">
                  <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-center">
                    <div className="text-8xl mb-6">🎙️</div>
                    <h4 className="font-bold mb-6 text-2xl">Listen Now</h4>
                    <div className="space-y-4">
                      <a
                        href={episodes[0].link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-white text-primary-navy py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105"
                      >
                        📡 View on Substack
                      </a>
                      <a
                        href="https://open.spotify.com/show/6GBZT7KA1Ug8xMZ4l5LThU"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition transform hover:scale-105"
                      >
                        🎵 Open in Spotify
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Episodes Section */}
      <section className="py-20 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-primary-navy">
              Recent Episodes
            </h2>
            <p className="text-xl text-neutral-gray max-w-3xl mx-auto">
              Explore our archive of conversations with FHIR experts, healthcare technology leaders,
              and implementation specialists from around the world.
            </p>
          </div>

          {loading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-primary-blue"></div>
              <p className="mt-6 text-xl text-gray-600">Loading episodes...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">😕</div>
              <p className="text-xl text-red-600 mb-6">{error}</p>
              <a
                href="https://evestel.substack.com/podcast"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary-blue text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Visit Substack Podcast Page
              </a>
            </div>
          )}

          {!loading && !error && episodes.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {episodes.slice(1).map((episode, index) => (
                <article key={episode.guid} className="card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-gradient-to-r from-primary-blue to-primary-navy text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Episode {episodes.length - index - 1}
                    </span>
                    {episode.duration && (
                      <span className="text-sm text-neutral-gray bg-bg-accent px-2 py-1 rounded">{episode.duration}</span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-primary-navy line-clamp-2 group-hover:text-primary-blue transition-colors">
                    {episode.title}
                  </h3>
                  <div
                    className="text-neutral-gray text-sm mb-6 line-clamp-4"
                    dangerouslySetInnerHTML={{
                      __html: episode.description.substring(0, 200) + (episode.description.length > 200 ? '...' : '')
                    }}
                  />
                  <div className="flex items-center justify-between text-sm text-neutral-gray mb-6">
                    <span className="font-medium">
                      {new Date(episode.pubDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    {episode.enclosure && (
                      <span className="bg-primary-green text-white px-2 py-1 rounded text-xs">
                        🎧 Audio Available
                      </span>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={episode.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 btn-primary text-center text-sm py-2 hover:bg-blue-700 transition"
                    >
                      Listen
                    </a>
                    <a
                      href={episode.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 btn-secondary text-center text-sm py-2 hover:bg-gray-300 transition"
                    >
                      Show Notes
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!loading && !error && episodes.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">🎙️</div>
              <p className="text-xl text-gray-600 mb-6">No episodes found at the moment.</p>
              <a
                href="https://evestel.substack.com/podcast"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-blue text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Visit Substack Podcast Page
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Subscribe Section */}
      <section id="subscribe" className="py-20 bg-gradient-to-r from-primary-blue via-primary-navy to-accent-purple text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            🔔 Never Miss an Episode
          </h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto">
            Subscribe to Out of the FHIR Podcast on your favorite platform and join our growing community of
            healthcare professionals staying current with FHIR and interoperability trends.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {subscriptionLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${link.color} text-white p-6 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex flex-col items-center gap-3 group`}
              >
                <span className="text-4xl group-hover:scale-110 transition-transform">{link.icon}</span>
                <span className="text-lg">{link.platform}</span>
              </a>
            ))}
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-10 rounded-2xl border border-white/20">
            <h3 className="text-2xl font-bold mb-4">
              📬 Get Enhanced Show Notes
            </h3>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Subscribe to our Substack for detailed show notes, full transcripts, guest resources,
              and exclusive FHIR insights between episodes.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://evestel.substack.com/subscribe"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                📡 Subscribe to Substack
              </a>
              <a
                href="https://api.substack.com/feed/podcast/4334682.rss"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-blue transition-all duration-200"
              >
                📡 RSS Feed
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Podcast Topics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-primary-navy">
              What We Cover on Out of the FHIR
            </h2>
            <p className="text-xl text-neutral-gray max-w-3xl mx-auto">
              From technical deep-dives to industry trends, we explore every aspect of FHIR
              and healthcare interoperability that matters to your work.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card text-center group hover:shadow-xl transition-all duration-300">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">🔧</div>
              <h3 className="text-xl font-bold mb-4 text-primary-navy">Real-World Implementation</h3>
              <p className="text-neutral-gray">
                Honest stories from the trenches - implementation challenges, solutions,
                and lessons learned from actual FHIR deployments in healthcare organizations.
              </p>
            </div>
            <div className="card text-center group hover:shadow-xl transition-all duration-300">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">🤖</div>
              <h3 className="text-xl font-bold mb-4 text-primary-navy">AI & Innovation</h3>
              <p className="text-neutral-gray">
                How artificial intelligence, machine learning, and emerging technologies
                are transforming FHIR implementations and healthcare data exchange.
              </p>
            </div>
            <div className="card text-center group hover:shadow-xl transition-all duration-300">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">👥</div>
              <h3 className="text-xl font-bold mb-4 text-primary-navy">Expert Interviews</h3>
              <p className="text-neutral-gray">
                In-depth conversations with FHIR architects, HL7 contributors, vendor leaders,
                and healthcare IT professionals sharing their expertise.
              </p>
            </div>
            <div className="card text-center group hover:shadow-xl transition-all duration-300">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">📚</div>
              <h3 className="text-xl font-bold mb-4 text-primary-navy">Standards Deep-Dives</h3>
              <p className="text-neutral-gray">
                Breaking down FHIR specifications, profiles, implementation guides,
                and new releases with practical examples and use cases.
              </p>
            </div>
            <div className="card text-center group hover:shadow-xl transition-all duration-300">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">🏥</div>
              <h3 className="text-xl font-bold mb-4 text-primary-navy">Industry Analysis</h3>
              <p className="text-neutral-gray">
                Market trends, regulatory updates, policy changes, and their impact
                on FHIR adoption and healthcare interoperability strategies.
              </p>
            </div>
            <div className="card text-center group hover:shadow-xl transition-all duration-300">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">🎯</div>
              <h3 className="text-xl font-bold mb-4 text-primary-navy">Practical Guidance</h3>
              <p className="text-neutral-gray">
                Actionable advice, best practices, tools, and resources for developers,
                architects, and healthcare IT professionals working with FHIR.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-navy text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            🎙️ Join the Conversation
          </h2>
          <p className="text-xl mb-10 leading-relaxed">
            Have a compelling FHIR story to share? Whether you&apos;re an implementer with hard-won insights,
            a vendor with innovative solutions, or a researcher pushing the boundaries of healthcare
            interoperability, we want to hear from you.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary-navy px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              🎯 Pitch Your Story
            </Link>
            <a
              href="https://evestel.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-navy transition-all duration-200 transform hover:scale-105"
            >
              📰 Read Our Newsletter
            </a>
            <a
              href="https://www.youtube.com/@OutoftheFHIRPodcast"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              📺 Watch on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Out of the FHIR Podcast</h3>
              <p className="text-gray-400 leading-relaxed">
                Your trusted source for FHIR expertise, implementation insights,
                and healthcare interoperability conversations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Listen & Subscribe</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="https://evestel.substack.com/podcast" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">📡 Substack</a></li>
                <li><a href="https://open.spotify.com/show/6GBZT7KA1Ug8xMZ4l5LThU" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">🎵 Spotify</a></li>
                <li><a href="https://podcasts.apple.com/us/podcast/out-of-the-fhir-podcast/id1822845248" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">🍎 Apple Podcasts</a></li>
                <li><a href="https://www.youtube.com/@OutoftheFHIRPodcast" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">📺 YouTube</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
                <li><Link href="/tools" className="hover:text-white transition">Tools</Link></li>
                <li><Link href="/training" className="hover:text-white transition">Training</Link></li>
                <li><a href="https://api.substack.com/feed/podcast/4334682.rss" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">RSS Feed</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Be a Guest</Link></li>
                <li><Link href="/partners" className="hover:text-white transition">Partners</Link></li>
                <li><a href="https://evestel.substack.com/subscribe" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Newsletter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FHIR IQ. All rights reserved. | Out of the FHIR Podcast</p>
          </div>
        </div>
      </footer>
    </div>
  );
}