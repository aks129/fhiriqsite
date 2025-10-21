'use client';

import { useEffect, useState } from 'react';

interface PodcastMetrics {
  episodes: number;
  monthlyListeners: number;
  totalDownloads: number;
  subscribers: number;
  countries: number;
  lastUpdated: string;
  platforms: {
    substack: {
      subscribers: number;
      episodes: number;
    };
    spotify: {
      followers: number;
      monthlyListeners: number;
    };
    apple: {
      followers: number;
      downloads: number;
    };
    youtube: {
      subscribers: number;
      views: number;
    };
  };
}

interface LivePodcastMetricsProps {
  className?: string;
  showPlatformBreakdown?: boolean;
}

export default function LivePodcastMetrics({
  className = '',
  showPlatformBreakdown = false
}: LivePodcastMetricsProps) {
  const [metrics, setMetrics] = useState<PodcastMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/podcast-metrics');
      const data = await response.json();

      if (data.success) {
        setMetrics(data.metrics);
        setError(null);
      } else {
        setMetrics(data.metrics); // Still show cached data
        setError(data.error || 'Failed to fetch live metrics');
      }
      setLastRefresh(new Date());
    } catch (err) {
      console.error('Failed to fetch podcast metrics:', err);
      setError('Network error fetching metrics');
      // Set fallback metrics
      setMetrics({
        episodes: 14,
        monthlyListeners: 2000,
        totalDownloads: 8500,
        subscribers: 450,
        countries: 15,
        lastUpdated: new Date().toISOString(),
        platforms: {
          substack: { subscribers: 280, episodes: 14 },
          spotify: { followers: 120, monthlyListeners: 800 },
          apple: { followers: 50, downloads: 5000 },
          youtube: { subscribers: 85, views: 2500 }
        }
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();

    // Refresh metrics every 5 minutes
    const interval = setInterval(fetchMetrics, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const refreshMetrics = async () => {
    await fetchMetrics();
  };

  if (loading && !metrics) {
    return (
      <div className={`${className}`}>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card">
              <div className="h-12 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-100 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className={`${className}`}>
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">Failed to load podcast metrics</p>
          <button
            onClick={refreshMetrics}
            className="bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {/* Main Metrics Grid */}
      <div className="grid md:grid-cols-4 gap-8 text-center mb-8">
        <div className="card group hover:shadow-xl transition-all duration-300">
          <div className="text-4xl font-bold text-primary-blue mb-2 group-hover:scale-110 transition-transform">
            {metrics.episodes}
          </div>
          <div className="text-neutral-gray">Episodes Published</div>
          <div className="text-xs text-gray-400 mt-1">
            📡 Substack Feed
          </div>
        </div>

        <div className="card group hover:shadow-xl transition-all duration-300">
          <div className="text-4xl font-bold text-primary-blue mb-2 group-hover:scale-110 transition-transform">
            {formatNumber(metrics.monthlyListeners)}
          </div>
          <div className="text-neutral-gray">Monthly Listeners</div>
          <div className="text-xs text-gray-400 mt-1">
            📊 Live Data
          </div>
        </div>

        <div className="card group hover:shadow-xl transition-all duration-300">
          <div className="text-4xl font-bold text-primary-blue mb-2 group-hover:scale-110 transition-transform">
            {formatNumber(metrics.subscribers)}
          </div>
          <div className="text-neutral-gray">Total Subscribers</div>
          <div className="text-xs text-gray-400 mt-1">
            🌐 All Platforms
          </div>
        </div>

        <div className="card group hover:shadow-xl transition-all duration-300">
          <div className="text-4xl font-bold text-primary-blue mb-2 group-hover:scale-110 transition-transform">
            {metrics.countries}
          </div>
          <div className="text-neutral-gray">Countries Reached</div>
          <div className="text-xs text-gray-400 mt-1">
            🌍 Global Reach
          </div>
        </div>
      </div>

      {/* Platform Breakdown */}
      {showPlatformBreakdown && (
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {formatNumber(metrics.platforms.substack.subscribers)}
            </div>
            <div className="text-sm text-orange-700 font-medium">📡 Substack</div>
            <div className="text-xs text-orange-600">Subscribers</div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {formatNumber(metrics.platforms.spotify.monthlyListeners)}
            </div>
            <div className="text-sm text-green-700 font-medium">🎵 Spotify</div>
            <div className="text-xs text-green-600">Monthly Listeners</div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {formatNumber(metrics.platforms.apple.downloads)}
            </div>
            <div className="text-sm text-purple-700 font-medium">🍎 Apple</div>
            <div className="text-xs text-purple-600">Total Downloads</div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600 mb-1">
              {formatNumber(metrics.platforms.youtube.views)}
            </div>
            <div className="text-sm text-red-700 font-medium">📺 YouTube</div>
            <div className="text-xs text-red-600">Total Views</div>
          </div>
        </div>
      )}

      {/* Status Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${error ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
          <span>
            {error ? 'Using cached data' : 'Live metrics'}
          </span>
          {error && (
            <span className="text-yellow-600 text-xs">({error})</span>
          )}
        </div>

        <div className="flex items-center gap-4">
          {lastRefresh && (
            <span>
              Updated: {lastRefresh.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          )}
          <button
            onClick={refreshMetrics}
            disabled={loading}
            className="text-primary-blue hover:text-blue-700 disabled:opacity-50 transition-colors"
            title="Refresh metrics"
          >
            <svg
              className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Growth Indicators */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
        <div className="text-center">
          <h4 className="font-semibold text-gray-800 mb-2">📈 Growth Tracking</h4>
          <p className="text-sm text-gray-600">
            Metrics update every 5 minutes. Subscribe to see our community grow in real-time!
          </p>
        </div>
      </div>
    </div>
  );
}