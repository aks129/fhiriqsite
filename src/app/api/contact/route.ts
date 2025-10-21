import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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
    const emailSubject = `FHIR IQ Contact: ${name}${company ? ` - ${company}` : ''}`;
    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Company:</strong> ${company || 'Not provided'}</p>
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p style="color: #666; font-size: 12px;">
        Submitted from: ${request.headers.get('origin') || 'Unknown'}<br>
        Time: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET
      </p>
    `;

    const emailText = `
New Contact Form Submission from FHIR IQ Website

From: ${name}
Email: ${email}
Company: ${company || 'Not provided'}

Message:
${message}

---
Submitted from: ${request.headers.get('origin') || 'Unknown'}
Time: ${new Date().toISOString()}
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
            from: 'FHIR IQ Contact Form <noreply@fhiriq.com>',
            to: ['gene@fhiriq.com'],
            reply_to: email,
            subject: emailSubject,
            html: emailHtml,
            text: emailText
          })
        });

        if (!resendResponse.ok) {
          const errorData = await resendResponse.json();
          console.error('Resend API error:', errorData);
          throw new Error('Failed to send email via Resend');
        }

        const resendData = await resendResponse.json();
        console.log('Email sent successfully via Resend:', resendData);

        return NextResponse.json({
          success: true,
          message: 'Thank you for contacting us! We will get back to you soon.',
          emailId: resendData.id
        });
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Log the submission even if email fails
        console.log('Contact form submission (email failed):', emailText);

        // Still return success to user, but log the error
        return NextResponse.json({
          success: true,
          message: 'Thank you for contacting us! We will get back to you soon.'
        });
      }
    } else {
      // No API key configured - log only
      console.log('⚠️  RESEND_API_KEY not configured. Contact form submission logged:');
      console.log(emailText);
      console.log('\n📧 To enable email delivery:');
      console.log('1. Sign up at https://resend.com');
      console.log('2. Verify domain fhiriq.com');
      console.log('3. Add RESEND_API_KEY to environment variables\n');

      return NextResponse.json({
        success: true,
        message: 'Thank you for contacting us! We will get back to you soon.'
      });
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    );
  }
}
