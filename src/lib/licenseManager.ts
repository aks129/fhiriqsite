import { v4 as uuidv4 } from 'uuid';

interface ProductDeliverables {
  type: string;
  maxUsers?: number;
  [key: string]: unknown;
}

interface Product {
  digital: boolean;
  sku: string;
  name: string;
  category: string;
  edition: string;
  term: string;
  features?: string[];
  deliverables?: ProductDeliverables;
}

export interface LicenseData {
  licenseKey?: string;
  orderId: string;
  customerId?: string;
  customerEmail: string;
  productSku: string;
  productName: string;
  productCategory: string;
  edition: string;
  term: string;
  status?: string;
  activatedAt?: Date | null;
  expiresAt?: Date;
  maxUsers?: number;
  currentUsers?: number;
  features?: string[];
  deliverables?: Record<string, unknown>;
  metadata?: {
    orderDate: Date;
    price: number;
    currency: string;
  };
  lastAccessedAt?: Date | null;
  accessCount?: number;
  ipAddresses?: string[];
  userAgents?: string[];
}

export interface License extends LicenseData {
  _id: string;
  createdAt: Date;
  lastModified?: Date;
}

/**
 * License generation and management for FHIR IQ products
 */
export async function createLicense(orderData: Record<string, unknown>): Promise<License[]> {
  try {
    console.log('Processing order for license generation:', orderData.orderId);

    const licenses: License[] = [];

    // Process each line item in the order
    const lineItems = orderData.lineItems as Array<Record<string, unknown>>;
    for (const item of lineItems) {
      const product = await getProductBySku(item.sku as string);

      if (!product) {
        console.error('Product not found for SKU:', item.sku);
        continue;
      }

      // Generate license for digital products only
      const typedProduct = product as unknown as Product;
      if (typedProduct.digital && typedProduct.deliverables?.type === 'license_key') {
        const licenseData: LicenseData = {
          licenseKey: generateLicenseKey(typedProduct.category, typedProduct.edition),
          orderId: orderData.orderId as string,
          customerId: orderData.customerId as string,
          customerEmail: orderData.customerEmail as string,
          productSku: typedProduct.sku,
          productName: typedProduct.name,
          productCategory: typedProduct.category,
          edition: typedProduct.edition,
          term: typedProduct.term,
          status: 'active',
          activatedAt: null, // Will be set when first used
          expiresAt: calculateExpirationDate(typedProduct.term),
          maxUsers: typedProduct.deliverables?.maxUsers || 1,
          currentUsers: 0,
          features: typedProduct.features || [],
          deliverables: typedProduct.deliverables,
          metadata: {
            orderDate: new Date(orderData.createdAt as string),
            price: item.price as number,
            currency: item.currency as string
          },
          lastAccessedAt: null,
          accessCount: 0,
          ipAddresses: [],
          userAgents: []
        };

        const license = await saveLicense(licenseData);
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
function generateLicenseKey(category: string, edition: string): string {
  const prefixes: Record<string, string> = {
    'license': 'FHIR-LIC',
    'training': 'FHIR-TRN',
    'consulting': 'FHIR-CON',
    'bundle': 'FHIR-BDL',
    'addon': 'FHIR-ADD'
  };

  const editionCodes: Record<string, string> = {
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
function calculateExpirationDate(term: string): Date {
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
 * Validate and activate a license key
 */
export async function activateLicense(licenseKey: string, userInfo: Record<string, unknown> = {}) {
  try {
    const license = await getLicenseByKey(licenseKey);

    if (!license) {
      throw new Error('Invalid license key');
    }

    if (license.status !== 'active') {
      throw new Error('License is not active');
    }

    if (new Date() > new Date(license.expiresAt!)) {
      throw new Error('License has expired');
    }

    // Update license with activation info
    const updatedLicense = await updateLicense(license._id, {
      activatedAt: license.activatedAt || new Date(),
      lastAccessedAt: new Date(),
      accessCount: (license.accessCount || 0) + 1,
      ipAddresses: [...new Set([...(license.ipAddresses || []), userInfo.ipAddress as string].filter(Boolean))] as string[],
      userAgents: [...new Set([...(license.userAgents || []), userInfo.userAgent as string].filter(Boolean))] as string[]
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
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Placeholder functions - these would integrate with your database
async function getProductBySku(sku: string): Promise<Record<string, unknown>> {
  // This would connect to your database
  // For now, return a mock product
  return {
    sku,
    name: 'FHIR Developer License',
    category: 'license',
    edition: 'professional',
    term: 'annual',
    digital: true,
    features: ['Advanced FHIR validation', 'Premium code generators'],
    deliverables: { type: 'license_key', maxUsers: 5 }
  };
}

async function saveLicense(licenseData: LicenseData): Promise<License> {
  // This would save to your database
  // For now, return a mock license with ID
  const license: License = {
    ...licenseData,
    _id: uuidv4(),
    createdAt: new Date()
  };
  return license;
}

async function getLicenseByKey(licenseKey: string): Promise<License | null> {
  // This would query your database
  // For now, return null
  console.log('Getting license by key:', licenseKey);
  return null;
}

async function updateLicense(licenseId: string, updateData: Partial<LicenseData>): Promise<License> {
  // This would update your database
  // For now, return a mock updated license
  console.log('Updating license:', licenseId, updateData);
  const license: License = {
    _id: licenseId,
    licenseKey: 'FHIR-LIC-PRO-TEST123',
    orderId: 'order123',
    customerEmail: 'test@example.com',
    productSku: 'FHIR-DEV-PRO-1Y',
    productName: 'FHIR Developer License',
    productCategory: 'license',
    edition: 'professional',
    term: 'annual',
    status: 'active',
    createdAt: new Date(),
    ...updateData
  };
  return license;
}

async function sendLicenseEmail(license: License, orderData: Record<string, unknown>): Promise<void> {
  // This would send an email
  console.log('License email would be sent to:', license.customerEmail);
  console.log('License key:', license.licenseKey);
  console.log('Order data:', orderData);
}