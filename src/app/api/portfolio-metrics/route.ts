import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import PortfolioMetrics from '@/models/PortfolioMetrics';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const url = new URL(request.url);
    const projectId = url.searchParams.get('projectId');

    if (projectId) {
      const metrics = await PortfolioMetrics.findOne({ projectId });
      return NextResponse.json(metrics || { projectId, visits: 0, uniqueVisitors: 0, conversions: 0 });
    } else {
      const allMetrics = await PortfolioMetrics.find({}).sort({ visits: -1 });
      return NextResponse.json(allMetrics);
    }
  } catch (error) {
    console.error('Error fetching portfolio metrics:', error);
    return NextResponse.json({ error: 'Failed to fetch metrics' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { projectId, projectName, action = 'visit', referrer, country } = body;

    if (!projectId || !projectName) {
      return NextResponse.json({ error: 'Project ID and name are required' }, { status: 400 });
    }

    let metrics = await PortfolioMetrics.findOne({ projectId });

    if (!metrics) {
      metrics = new PortfolioMetrics({
        projectId,
        projectName,
        visits: 0,
        uniqueVisitors: 0,
        conversions: 0,
        analytics: {
          bounceRate: 0,
          avgSessionDuration: 0,
          topReferrers: [],
          topCountries: [],
        },
      });
    }

    switch (action) {
      case 'visit':
        metrics.visits += 1;
        metrics.uniqueVisitors += 1;
        break;
      case 'conversion':
        metrics.conversions += 1;
        break;
    }

    if (referrer && !metrics.analytics.topReferrers.includes(referrer)) {
      metrics.analytics.topReferrers.push(referrer);
      if (metrics.analytics.topReferrers.length > 10) {
        metrics.analytics.topReferrers = metrics.analytics.topReferrers.slice(0, 10);
      }
    }

    if (country && !metrics.analytics.topCountries.includes(country)) {
      metrics.analytics.topCountries.push(country);
      if (metrics.analytics.topCountries.length > 20) {
        metrics.analytics.topCountries = metrics.analytics.topCountries.slice(0, 20);
      }
    }

    metrics.lastUpdated = new Date();
    await metrics.save();

    return NextResponse.json(metrics);
  } catch (error) {
    console.error('Error updating portfolio metrics:', error);
    return NextResponse.json({ error: 'Failed to update metrics' }, { status: 500 });
  }
}