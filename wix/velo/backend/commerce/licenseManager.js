import { v4 as uuidv4 } from 'uuid';
import { createLicense, getProductBySku } from '../data.js';

/**
 * License generation and management for FHIR IQ products
 */

export async function createLicense(orderData) {
  try {
    console.log('Processing order for license generation:', orderData.orderId);

    const licenses = [];

    // Process each line item in the order
    for (const item of orderData.lineItems) {
      const product = await getProductBySku(item.sku);

      if (!product) {
        console.error('Product not found for SKU:', item.sku);
        continue;
      }

      // Generate license for digital products only
      if (product.digital && product.deliverables?.type === 'license_key') {
        const licenseData = {
          licenseKey: generateLicenseKey(product.category, product.edition),
          orderId: orderData.orderId,
          customerId: orderData.customerId,
          customerEmail: orderData.customerEmail,
          productSku: product.sku,
          productName: product.name,
          productCategory: product.category,
          edition: product.edition,
          term: product.term,
          status: 'active',
          activatedAt: null, // Will be set when first used
          expiresAt: calculateExpirationDate(product.term),
          maxUsers: product.deliverables.maxUsers || 1,
          currentUsers: 0,
          features: product.features || [],
          deliverables: product.deliverables,
          metadata: {
            orderDate: new Date(orderData.createdAt),
            price: item.price,
            currency: item.currency
          },
          lastAccessedAt: null,
          accessCount: 0,
          ipAddresses: [],
          userAgents: []
        };

        const license = await createLicense(licenseData);
        licenses.push(license);

        console.log('License created:', license.licenseKey);

        // Send license delivery email
        await sendLicenseEmail(license, orderData);
      }
    }

    return licenses;

  } catch (error) {
    console.error('Error creating licenses:', error);
    throw error;
  }
}

/**
 * Generate a unique license key based on product category and edition
 */
function generateLicenseKey(category, edition) {
  const prefixes = {
    'license': 'FHIR-LIC',
    'training': 'FHIR-TRN',
    'consulting': 'FHIR-CON',
    'bundle': 'FHIR-BDL',
    'addon': 'FHIR-ADD'
  };

  const editionCodes = {
    'basic': 'BAS',
    'professional': 'PRO',
    'enterprise': 'ENT',
    'fundamentals': 'FND',
    'advanced': 'ADV',
    'team': 'TEA',
    'starter': 'STR',
    'premium': 'PRM',
    'onsite': 'ONS',
    'startup': 'SUP'
  };

  const prefix = prefixes[category] || 'FHIR-GEN';
  const editionCode = editionCodes[edition] || 'STD';
  const uuid = uuidv4().substring(0, 8).toUpperCase();

  return `${prefix}-${editionCode}-${uuid}`;
}

/**
 * Calculate license expiration date based on term
 */
function calculateExpirationDate(term) {
  const now = new Date();
  const expirationDate = new Date(now);

  switch (term) {
    case 'annual':
      expirationDate.setFullYear(now.getFullYear() + 1);
      break;
    case 'monthly':
      expirationDate.setMonth(now.getMonth() + 1);
      break;
    case 'single_seat':
    case 'single_day':
    case 'hours_block':
      // For single-use items, set expiration to 1 year for access purposes
      expirationDate.setFullYear(now.getFullYear() + 1);
      break;
    case 'team_package':
      expirationDate.setFullYear(now.getFullYear() + 1);
      break;
    default:
      // Default to 1 year
      expirationDate.setFullYear(now.getFullYear() + 1);
  }

  return expirationDate;
}

/**
 * Send license delivery email to customer
 */
async function sendLicenseEmail(license, orderData) {
  try {
    const emailContent = generateLicenseEmailContent(license, orderData);

    // Use Wix's email service or integrate with external email provider
    // This is a placeholder - implement actual email sending
    console.log('License email would be sent to:', license.customerEmail);
    console.log('Email content:', emailContent);

    // TODO: Implement actual email sending via Wix or external service
    // await wixCRM.emails.send({
    //   to: license.customerEmail,
    //   subject: emailContent.subject,
    //   htmlBody: emailContent.html,
    //   textBody: emailContent.text
    // });

  } catch (error) {
    console.error('Error sending license email:', error);
    // Don't throw error - license creation should succeed even if email fails
  }
}

/**
 * Generate email content for license delivery
 */
function generateLicenseEmailContent(license, orderData) {
  const getStartedUrl = 'https://fhiriq.com/getting-started';
  const supportUrl = 'https://fhiriq.com/support';

  const subject = `Your FHIR IQ License Key - ${license.productName}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${subject}</title>
    </head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <img src="https://fhiriq.com/logo.png" alt="FHIR IQ" style="max-width: 200px;">
      </div>

      <h1 style="color: #1976d2;">Thank you for your purchase!</h1>

      <p>Hi there,</p>

      <p>Your FHIR IQ license is ready! Here are your license details:</p>

      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #1976d2;">License Information</h3>
        <p><strong>Product:</strong> ${license.productName}</p>
        <p><strong>License Key:</strong> <code style="background: #e3f2fd; padding: 4px 8px; border-radius: 4px; font-weight: bold;">${license.licenseKey}</code></p>
        <p><strong>Edition:</strong> ${license.edition}</p>
        <p><strong>Max Users:</strong> ${license.maxUsers === -1 ? 'Unlimited' : license.maxUsers}</p>
        <p><strong>Expires:</strong> ${license.expiresAt.toLocaleDateString()}</p>
        <p><strong>Order ID:</strong> ${license.orderId}</p>
      </div>

      <h3 style="color: #1976d2;">What's Included:</h3>
      <ul>
        ${license.features.map(feature => `<li>${feature}</li>`).join('')}
      </ul>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${getStartedUrl}" style="background: #1976d2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Get Started</a>
      </div>

      <h3 style="color: #1976d2;">Next Steps:</h3>
      <ol>
        <li>Save your license key in a secure location</li>
        <li>Visit our <a href="${getStartedUrl}">Getting Started guide</a></li>
        <li>Access your licensed tools and resources</li>
        <li>Join our community for support and updates</li>
      </ol>

      <p>If you have any questions or need assistance, please don't hesitate to <a href="${supportUrl}">contact our support team</a>.</p>

      <p>Welcome to FHIR IQ!</p>

      <p>Best regards,<br>
      The FHIR IQ Team</p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">

      <p style="font-size: 12px; color: #666;">
        This email was sent to ${license.customerEmail} regarding order ${license.orderId}.
        <br>
        FHIR IQ - Healthcare Interoperability Solutions
        <br>
        <a href="https://fhiriq.com/unsubscribe">Unsubscribe</a> |
        <a href="https://fhiriq.com/privacy">Privacy Policy</a>
      </p>
    </body>
    </html>
  `;

  const text = `
Thank you for your FHIR IQ purchase!

License Information:
- Product: ${license.productName}
- License Key: ${license.licenseKey}
- Edition: ${license.edition}
- Max Users: ${license.maxUsers === -1 ? 'Unlimited' : license.maxUsers}
- Expires: ${license.expiresAt.toLocaleDateString()}
- Order ID: ${license.orderId}

What's Included:
${license.features.map(feature => `- ${feature}`).join('\n')}

Next Steps:
1. Save your license key in a secure location
2. Visit our Getting Started guide: ${getStartedUrl}
3. Access your licensed tools and resources
4. Join our community for support and updates

Questions? Contact support: ${supportUrl}

Welcome to FHIR IQ!

The FHIR IQ Team
  `;

  return { subject, html, text };
}

/**
 * Validate and activate a license key
 */
export async function activateLicense(licenseKey, userInfo = {}) {
  try {
    const license = await getLicenseByKey(licenseKey);

    if (!license) {
      throw new Error('Invalid license key');
    }

    if (license.status !== 'active') {
      throw new Error('License is not active');
    }

    if (new Date() > new Date(license.expiresAt)) {
      throw new Error('License has expired');
    }

    // Update license with activation info
    const updatedLicense = await updateLicense(license._id, {
      activatedAt: license.activatedAt || new Date(),
      lastAccessedAt: new Date(),
      accessCount: (license.accessCount || 0) + 1,
      ipAddresses: [...new Set([...(license.ipAddresses || []), userInfo.ipAddress].filter(Boolean))],
      userAgents: [...new Set([...(license.userAgents || []), userInfo.userAgent].filter(Boolean))]
    });

    return {
      valid: true,
      license: updatedLicense,
      features: license.features,
      deliverables: license.deliverables
    };

  } catch (error) {
    console.error('License activation error:', error);
    return {
      valid: false,
      error: error.message
    };
  }
}

/**
 * Check license usage and enforce limits
 */
export async function checkLicenseUsage(licenseKey, userId) {
  try {
    const license = await getLicenseByKey(licenseKey);

    if (!license) {
      return { allowed: false, reason: 'Invalid license' };
    }

    if (license.status !== 'active') {
      return { allowed: false, reason: 'License inactive' };
    }

    if (new Date() > new Date(license.expiresAt)) {
      return { allowed: false, reason: 'License expired' };
    }

    // Check user limits (if applicable)
    if (license.maxUsers !== -1 && license.currentUsers >= license.maxUsers) {
      return { allowed: false, reason: 'User limit exceeded' };
    }

    return {
      allowed: true,
      license,
      remainingUsers: license.maxUsers === -1 ? 'unlimited' : license.maxUsers - license.currentUsers
    };

  } catch (error) {
    console.error('License usage check error:', error);
    return { allowed: false, reason: 'License check failed' };
  }
}