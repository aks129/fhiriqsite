import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    // Email content
    const emailSubject = `New Newsletter Subscriber: ${email}`;
    const emailHtml = `
      <h2>New Newsletter Subscription</h2>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Time:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET</p>
      <p><strong>Source:</strong> ${request.headers.get('referer') || 'Direct'}</p>
    `;

    const emailText = `
New Newsletter Subscription

Email: ${email}
Time: ${new Date().toISOString()}
Source: ${request.headers.get('referer') || 'Direct'}
    `;

    if (resendApiKey) {
      try {
        // Send email using Resend API
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'FHIR IQ Newsletter <notifications@fhiriq.com>',
            to: ['gene@fhiriq.com'],
            subject: emailSubject,
            html: emailHtml,
            text: emailText
          })
        });

        if (!resendResponse.ok) {
          const errorData = await resendResponse.json();
          console.error('Resend API error:', errorData);
        }

        const resendData = await resendResponse.json();
        console.log('Admin notification sent:', resendData);

      } catch (emailError) {
        console.error('Email sending error:', emailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to FHIR IQ Newsletter! Check your email for confirmation.'
    });

  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json(
      { error: 'Failed to process newsletter subscription' },
      { status: 500 }
    );
  }
}
