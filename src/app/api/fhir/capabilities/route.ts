import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json(
        { error: 'Capability statement URL is required' },
        { status: 400 }
      );
    }

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/fhir+json, application/json',
        'User-Agent': 'FHIR-IQ-Site/1.0'
      },
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
      throw new Error(`FHIR server error: ${response.status}`);
    }

    const capabilities = await response.json();

    return NextResponse.json({
      success: true,
      url,
      capabilities,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('FHIR capabilities error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch capability statement',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}