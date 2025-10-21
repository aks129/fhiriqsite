import mongoose, { Schema, Document } from 'mongoose';

export interface IPortfolioMetrics extends Document {
  projectId: string;
  projectName: string;
  visits: number;
  uniqueVisitors: number;
  conversions: number;
  lastUpdated: Date;
  createdAt: Date;
  analytics: {
    bounceRate: number;
    avgSessionDuration: number;
    topReferrers: string[];
    topCountries: string[];
  };
}

const PortfolioMetricsSchema: Schema = new Schema({
  projectId: {
    type: String,
    required: true,
    unique: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  visits: {
    type: Number,
    default: 0,
  },
  uniqueVisitors: {
    type: Number,
    default: 0,
  },
  conversions: {
    type: Number,
    default: 0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  analytics: {
    bounceRate: {
      type: Number,
      default: 0,
    },
    avgSessionDuration: {
      type: Number,
      default: 0,
    },
    topReferrers: [{
      type: String,
    }],
    topCountries: [{
      type: String,
    }],
  },
});

export default mongoose.models.PortfolioMetrics || mongoose.model<IPortfolioMetrics>('PortfolioMetrics', PortfolioMetricsSchema);