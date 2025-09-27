/**
 * Commerce Webhooks Module
 * @module backend/commerce/webhooks
 *
 * Handles Wix Stores webhooks for order fulfillment
 * Generates license keys and manages digital product delivery
 */

import { fetch } from 'wix-fetch';
import { getSecret } from 'wix-secrets-backend';
import wixData from 'wix-data';
import { Permissions, webMethod } from 'wix-web-module';

/**
 * Generate a secure UUID v4 for license keys
 * @returns {string} UUID v4 string
 */
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Generate secure license key with prefix
 * @param {string} productCategory - Product category (license, training, consulting)
 * @param {string} edition - Product edition (basic, pro, enterprise)
 * @returns {string} Formatted license key
 */
function generateLicenseKey(productCategory, edition) {
  const uuid = generateUUID();
  const prefix = {
    'license': 'FHIR-LIC',
    'training': 'FHIR-TRN',
    'consulting': 'FHIR-CON',
    'bundle': 'FHIR-BND',
    'addon': 'FHIR-ADD'
  }[productCategory] || 'FHIR-GEN';

  const editionCode = {
    'basic': 'BAS',
    'professional': 'PRO',
    'enterprise': 'ENT',
    'fundamentals': 'FUN',
    'advanced': 'ADV',
    'team': 'TEA',
    'starter': 'STA',
    'premium': 'PRM',
    'onsite': 'ONS'
  }[edition] || 'STD';

  return `${prefix}-${editionCode}-${uuid.substring(0, 8).toUpperCase()}`;
}

/**
 * Calculate license expiration date based on term
 * @param {string} term - Product term (annual, monthly, etc.)
 * @returns {Date} Expiration date
 */
function calculateExpirationDate(term) {
  const now = new Date();

  switch (term) {
    case 'annual':
      return new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
    case 'monthly':
      return new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
    case 'single_seat':
    case 'single_day':
      return new Date(now.getFullYear(), now.getMonth() + 6, now.getDate()); // 6 months access
    case 'team_package':
      return new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
    case 'hours_block':
      // Consulting hours don't expire, but set validity period
      const validityMonths = {
        '6_months': 6,
        '12_months': 12,
        '18_months': 18
      };
      const months = validityMonths[term] || 12;
      return new Date(now.getFullYear(), now.getMonth() + months, now.getDate());
    default:
      return new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
  }
}

/**
 * Extract product metadata from Wix product
 * @param {Object} lineItem - Order line item
 * @returns {Object} Product metadata
 */
function extractProductMetadata(lineItem) {
  // Extract custom fields from product
  const customFields = lineItem.customTextFields || {};
  const productOptions = lineItem.productOptions || {};

  return {
    sku: lineItem.productId || lineItem.sku,
    category: customFields.category || 'license',
    edition: customFields.edition || 'basic',
    term: customFields.term || 'annual',
    deliverables: JSON.parse(customFields.deliverables || '{}')
  };
}

/**
 * Create license record in database
 * @param {Object} licenseData - License information
 * @returns {Promise<Object>} Created license record
 */
async function createLicenseRecord(licenseData) {
  try {
    const license = {
      licenseKey: licenseData.licenseKey,
      orderId: licenseData.orderId,
      customerId: licenseData.customerId,
      customerEmail: licenseData.customerEmail,
      productSku: licenseData.productSku,
      productName: licenseData.productName,
      productCategory: licenseData.productCategory,
      edition: licenseData.edition,
      term: licenseData.term,
      status: 'active',
      activatedAt: null,
      expiresAt: licenseData.expiresAt,
      maxUsers: licenseData.maxUsers || 1,
      currentUsers: 0,
      features: licenseData.features || [],
      deliverables: licenseData.deliverables || {},
      metadata: licenseData.metadata || {},
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await wixData.insert('Licenses', license);

    console.log('License record created:', {
      licenseKey: license.licenseKey,
      orderId: license.orderId,
      productSku: license.productSku
    });

    return result;
  } catch (error) {
    console.error('Error creating license record:', error);
    throw error;
  }
}

/**
 * Send license delivery email
 * @param {Object} licenseData - License and customer information
 * @returns {Promise<boolean>} Success status
 */
async function sendLicenseEmail(licenseData) {
  try {
    // TODO: Replace with actual email service integration
    // For now, log the email content that would be sent

    const emailContent = {
      to: licenseData.customerEmail,
      subject: `Your FHIR IQ ${licenseData.productName} is Ready!`,
      template: 'license-delivery',
      data: {
        customerName: licenseData.customerName,
        productName: licenseData.productName,
        licenseKey: licenseData.licenseKey,
        activationUrl: `https://fhiriq.com/activate?key=${licenseData.licenseKey}`,
        gettingStartedUrl: 'https://fhiriq.com/getting-started',
        supportUrl: 'https://fhiriq.com/support',
        expirationDate: licenseData.expiresAt.toLocaleDateString(),
        features: licenseData.features
      }
    };

    console.log('License email would be sent:', emailContent);

    // Example integration with email service:
    // const emailApiKey = await getSecret('EMAIL_API_KEY');
    // const response = await fetch('https://api.emailservice.com/send', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${emailApiKey}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(emailContent)
    // });

    return true;
  } catch (error) {
    console.error('Error sending license email:', error);
    return false;
  }
}

/**
 * Send training enrollment email
 * @param {Object} enrollmentData - Training and customer information
 * @returns {Promise<boolean>} Success status
 */
async function sendTrainingEnrollmentEmail(enrollmentData) {
  try {
    const emailContent = {
      to: enrollmentData.customerEmail,
      subject: `Welcome to ${enrollmentData.productName}!`,
      template: 'training-enrollment',
      data: {
        customerName: enrollmentData.customerName,
        courseName: enrollmentData.productName,
        courseId: enrollmentData.courseId,
        accessUrl: `https://fhiriq.com/training/access?course=${enrollmentData.courseId}`,
        scheduleUrl: 'https://fhiriq.com/training/schedule',
        materialsUrl: 'https://fhiriq.com/training/materials',
        supportUrl: 'https://fhiriq.com/support',
        duration: enrollmentData.duration
      }
    };

    console.log('Training enrollment email would be sent:', emailContent);
    return true;
  } catch (error) {
    console.error('Error sending training enrollment email:', error);
    return false;
  }
}

/**
 * Send consulting hours email
 * @param {Object} consultingData - Consulting and customer information
 * @returns {Promise<boolean>} Success status
 */
async function sendConsultingEmail(consultingData) {
  try {
    const emailContent = {
      to: consultingData.customerEmail,
      subject: `Your FHIR Consulting Hours are Ready to Use!`,
      template: 'consulting-delivery',
      data: {
        customerName: consultingData.customerName,
        packageName: consultingData.productName,
        hours: consultingData.hours,
        consultantLevel: consultingData.consultantLevel,
        bookingUrl: 'https://fhiriq.com/consulting/book',
        validUntil: consultingData.expiresAt.toLocaleDateString(),
        supportUrl: 'https://fhiriq.com/support'
      }
    };

    console.log('Consulting email would be sent:', emailContent);
    return true;
  } catch (error) {
    console.error('Error sending consulting email:', error);
    return false;
  }
}

/**
 * Process individual line item fulfillment
 * @param {Object} lineItem - Order line item
 * @param {Object} order - Complete order information
 * @returns {Promise<Object>} Fulfillment result
 */
async function processLineItemFulfillment(lineItem, order) {
  try {
    const metadata = extractProductMetadata(lineItem);
    const customer = order.billingInfo || order.shippingInfo || {};

    // Generate license key
    const licenseKey = generateLicenseKey(metadata.category, metadata.edition);
    const expirationDate = calculateExpirationDate(metadata.term);

    const licenseData = {
      licenseKey: licenseKey,
      orderId: order._id,
      customerId: order.buyerInfo?.id,
      customerEmail: customer.email || order.buyerInfo?.email,
      customerName: `${customer.firstName || ''} ${customer.lastName || ''}`.trim(),
      productSku: metadata.sku,
      productName: lineItem.name,
      productCategory: metadata.category,
      edition: metadata.edition,
      term: metadata.term,
      expiresAt: expirationDate,
      maxUsers: metadata.deliverables.maxUsers || 1,
      features: lineItem.productFeatures || [],
      deliverables: metadata.deliverables,
      metadata: {
        orderDate: order.dateCreated,
        orderTotal: order.totals?.total,
        quantity: lineItem.quantity
      }
    };

    // Create license record
    const licenseRecord = await createLicenseRecord(licenseData);

    // Send appropriate email based on product category
    let emailSent = false;
    switch (metadata.category) {
      case 'license':
      case 'bundle':
      case 'addon':
        emailSent = await sendLicenseEmail(licenseData);
        break;
      case 'training':
        emailSent = await sendTrainingEnrollmentEmail({
          ...licenseData,
          courseId: metadata.deliverables.courseId,
          duration: metadata.deliverables.duration
        });
        break;
      case 'consulting':
        emailSent = await sendConsultingEmail({
          ...licenseData,
          hours: metadata.deliverables.hours,
          consultantLevel: metadata.deliverables.consultantLevel
        });
        break;
      default:
        emailSent = await sendLicenseEmail(licenseData);
    }

    return {
      success: true,
      licenseKey: licenseKey,
      licenseId: licenseRecord._id,
      emailSent: emailSent,
      productSku: metadata.sku,
      category: metadata.category
    };

  } catch (error) {
    console.error('Error processing line item fulfillment:', error);
    return {
      success: false,
      error: error.message,
      productSku: lineItem.productId || lineItem.sku
    };
  }
}

/**
 * Main webhook handler for order paid events
 * @param {Object} orderData - Order information from webhook
 * @returns {Promise<Object>} Fulfillment results
 */
async function handleOrderPaid(orderData) {
  const startTime = new Date();

  try {
    console.log('Processing order fulfillment:', {
      orderId: orderData._id,
      customerEmail: orderData.buyerInfo?.email,
      lineItems: orderData.lineItems?.length || 0,
      total: orderData.totals?.total
    });

    const fulfillmentResults = [];

    // Process each line item
    for (const lineItem of orderData.lineItems || []) {
      // Skip non-digital products
      if (lineItem.productType !== 'digital') {
        console.log('Skipping non-digital product:', lineItem.name);
        continue;
      }

      const result = await processLineItemFulfillment(lineItem, orderData);
      fulfillmentResults.push(result);
    }

    // Log overall results
    const successCount = fulfillmentResults.filter(r => r.success).length;
    const errorCount = fulfillmentResults.filter(r => !r.success).length;

    console.log('Order fulfillment completed:', {
      orderId: orderData._id,
      totalItems: fulfillmentResults.length,
      successful: successCount,
      errors: errorCount,
      processingTime: new Date() - startTime
    });

    // Store fulfillment log
    await wixData.insert('OrderFulfillmentLogs', {
      orderId: orderData._id,
      customerEmail: orderData.buyerInfo?.email,
      fulfillmentResults: fulfillmentResults,
      successCount: successCount,
      errorCount: errorCount,
      processingTime: new Date() - startTime,
      processedAt: new Date()
    });

    return {
      success: errorCount === 0,
      orderId: orderData._id,
      results: fulfillmentResults,
      summary: {
        totalItems: fulfillmentResults.length,
        successful: successCount,
        errors: errorCount
      }
    };

  } catch (error) {
    console.error('Error in order fulfillment:', error);

    // Log error
    await wixData.insert('OrderFulfillmentLogs', {
      orderId: orderData._id,
      customerEmail: orderData.buyerInfo?.email,
      error: error.message,
      stack: error.stack,
      processingTime: new Date() - startTime,
      processedAt: new Date()
    });

    return {
      success: false,
      error: error.message,
      orderId: orderData._id
    };
  }
}

/**
 * Webhook endpoint for Wix Stores events
 * This function is called automatically by Wix when orders are paid
 */
export const wixStores_onOrderPaid = webMethod(
  Permissions.Anyone,
  async (request) => {
    try {
      console.log('Order paid webhook triggered');

      const orderData = request.body;

      if (!orderData || !orderData._id) {
        console.error('Invalid order data received');
        return { success: false, error: 'Invalid order data' };
      }

      const result = await handleOrderPaid(orderData);

      return {
        status: 'success',
        ...result
      };

    } catch (error) {
      console.error('Webhook error:', error);
      return {
        status: 'error',
        error: error.message
      };
    }
  }
);

/**
 * Manual fulfillment function for testing or re-processing orders
 * @param {string} orderId - Order ID to fulfill
 * @returns {Promise<Object>} Fulfillment result
 */
export async function manualFulfillOrder(orderId) {
  try {
    // Fetch order from Wix Stores
    const orders = await wixData.query('Stores/Orders')
      .eq('_id', orderId)
      .find();

    if (orders.items.length === 0) {
      throw new Error(`Order ${orderId} not found`);
    }

    const order = orders.items[0];

    console.log('Manual fulfillment triggered for order:', orderId);

    return await handleOrderPaid(order);

  } catch (error) {
    console.error('Manual fulfillment error:', error);
    return {
      success: false,
      error: error.message,
      orderId: orderId
    };
  }
}

/**
 * Get fulfillment status for an order
 * @param {string} orderId - Order ID
 * @returns {Promise<Object>} Fulfillment status
 */
export async function getFulfillmentStatus(orderId) {
  try {
    // Check fulfillment logs
    const logs = await wixData.query('OrderFulfillmentLogs')
      .eq('orderId', orderId)
      .descending('processedAt')
      .find();

    // Check licenses generated for this order
    const licenses = await wixData.query('Licenses')
      .eq('orderId', orderId)
      .find();

    return {
      success: true,
      orderId: orderId,
      fulfillmentLogs: logs.items,
      licensesGenerated: licenses.items.length,
      licenses: licenses.items.map(license => ({
        licenseKey: license.licenseKey,
        productSku: license.productSku,
        status: license.status,
        createdAt: license.createdAt
      }))
    };

  } catch (error) {
    console.error('Error getting fulfillment status:', error);
    return {
      success: false,
      error: error.message,
      orderId: orderId
    };
  }
}

/**
 * Test order fulfillment with sample data
 * @returns {Promise<Object>} Test result
 */
export async function testOrderFulfillment() {
  const sampleOrder = {
    _id: `test_order_${Date.now()}`,
    buyerInfo: {
      id: 'test_customer_123',
      email: 'test@example.com'
    },
    billingInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com'
    },
    lineItems: [
      {
        productId: 'FHIR-DEV-PRO-1Y',
        name: 'FHIR Developer License - Professional',
        productType: 'digital',
        quantity: 1,
        customTextFields: {
          category: 'license',
          edition: 'professional',
          term: 'annual',
          deliverables: JSON.stringify({
            type: 'license_key',
            accessLevel: 'professional',
            maxUsers: 5
          })
        }
      }
    ],
    totals: {
      total: 799.00
    },
    dateCreated: new Date()
  };

  console.log('Running test order fulfillment...');

  return await handleOrderPaid(sampleOrder);
}