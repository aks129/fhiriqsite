import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const builderServiceUrl = process.env.BUILDER_SERVICE_URL;

    if (!builderServiceUrl) {
      return NextResponse.json(
        { error: 'Builder service not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();

    // Proxy request to external builder service
    const response = await fetch(`${builderServiceUrl}/api/builder/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'FHIR-IQ-Site/1.0'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`Builder service error: ${response.status}`);
    }

    const result = await response.json();
    return NextResponse.json(result);

  } catch (error) {
    console.error('Builder proxy error:', error);
    return NextResponse.json(
      {
        error: 'Builder service unavailable',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}