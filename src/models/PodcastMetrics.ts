import mongoose, { Schema, Document } from 'mongoose';

export interface IPodcastMetrics extends Document {
  platform: 'substack' | 'spotify' | 'apple' | 'youtube';
  totalEpisodes: number;
  totalListeners: number;
  monthlyListeners: number;
  expertGuests: number;
  countriesReached: number;
  lastUpdated: Date;
  historicalData: Array<{
    date: Date;
    listeners: number;
    episodes: number;
  }>;
  platformSpecific: {
    followers?: number;
    subscribers?: number;
    plays?: number;
    downloads?: number;
  };
}

const PodcastMetricsSchema: Schema = new Schema({
  platform: {
    type: String,
    required: true,
    enum: ['substack', 'spotify', 'apple', 'youtube'],
  },
  totalEpisodes: {
    type: Number,
    default: 0,
  },
  totalListeners: {
    type: Number,
    default: 0,
  },
  monthlyListeners: {
    type: Number,
    default: 0,
  },
  expertGuests: {
    type: Number,
    default: 0,
  },
  countriesReached: {
    type: Number,
    default: 0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  historicalData: [{
    date: {
      type: Date,
      required: true,
    },
    listeners: {
      type: Number,
      default: 0,
    },
    episodes: {
      type: Number,
      default: 0,
    },
  }],
  platformSpecific: {
    followers: Number,
    subscribers: Number,
    plays: Number,
    downloads: Number,
  },
});

export default mongoose.models.PodcastMetrics || mongoose.model<IPodcastMetrics>('PodcastMetrics', PodcastMetricsSchema);