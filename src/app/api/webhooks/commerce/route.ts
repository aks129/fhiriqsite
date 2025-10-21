import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const webhookData = await request.json();

    // Verify webhook authenticity (implement signature verification)
    const isValid = await verifyWebhookSignature(request);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 403 }
      );
    }

    // Handle different webhook events
    switch (webhookData.eventType) {
      case 'order.paid':
        await handleOrderPaid(webhookData.data);
        break;
      case 'order.cancelled':
        await handleOrderCancelled(webhookData.data);
        break;
      default:
        console.log('Unhandled webhook event:', webhookData.eventType);
    }

    return NextResponse.json({ status: 'processed' });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      {
        error: 'Webhook processing failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

async function verifyWebhookSignature(_request: NextRequest): Promise<boolean> {
  // Implement webhook signature verification
  // This is a placeholder - implement actual signature verification
  return true;
}

async function handleOrderPaid(orderData: Record<string, unknown>) {
  // Import license generation logic
  const { createLicense } = await import('@/lib/licenseManager');
  await createLicense(orderData);
}

async function handleOrderCancelled(orderData: Record<string, unknown>) {
  // Handle order cancellation
  console.log('Order cancelled:', orderData.orderId);
}