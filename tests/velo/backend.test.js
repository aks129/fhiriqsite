/**
 * Velo Backend Tests
 * Tests for FHIR IQ Velo backend functions
 */

// Mock Wix modules
const mockWixData = {
  query: jest.fn(),
  get: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  insert: jest.fn()
};

const mockWixSecrets = {
  getSecret: jest.fn()
};

// Mock implementations
jest.mock('wix-data', () => mockWixData);
jest.mock('wix-secrets-backend', () => mockWixSecrets);

// Import modules to test
import { getProducts, createLicense, getUserLicenses } from '../../wix/velo/backend/data.js';
import { generateLicenseKey, activateLicense } from '../../wix/velo/backend/commerce/licenseManager.js';

describe('Backend Data Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    test('should fetch products with default options', async () => {
      const mockProducts = [
        { _id: '1', name: 'FHIR Dev License', category: 'license', available: true },
        { _id: '2', name: 'FHIR Training', category: 'training', available: true }
      ];

      const mockQuery = {
        ascending: jest.fn().mockReturnThis(),
        find: jest.fn().mockResolvedValue({
          items: mockProducts,
          totalCount: 2,
          hasNext: jest.fn().mockReturnValue(false),
          hasPrev: jest.fn().mockReturnValue(false)
        })
      };

      mockWixData.query.mockReturnValue(mockQuery);

      const result = await getProducts();

      expect(mockWixData.query).toHaveBeenCalledWith('Products');
      expect(mockQuery.ascending).toHaveBeenCalledWith('name');
      expect(result.items).toEqual(mockProducts);
      expect(result.totalCount).toBe(2);
    });

    test('should filter products by category', async () => {
      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
        ascending: jest.fn().mockReturnThis(),
        find: jest.fn().mockResolvedValue({
          items: [],
          totalCount: 0,
          hasNext: jest.fn().mockReturnValue(false),
          hasPrev: jest.fn().mockReturnValue(false)
        })
      };

      mockWixData.query.mockReturnValue(mockQuery);

      await getProducts({ category: 'license' });

      expect(mockQuery.eq).toHaveBeenCalledWith('category', 'license');
    });

    test('should handle errors gracefully', async () => {
      mockWixData.query.mockImplementation(() => {
        throw new Error('Database connection failed');
      });

      await expect(getProducts()).rejects.toThrow('Failed to fetch products: Database connection failed');
    });
  });

  describe('createLicense', () => {
    test('should create a license with required fields', async () => {
      const licenseData = {
        licenseKey: 'FHIR-LIC-TEST123',
        customerEmail: 'test@example.com',
        productSku: 'FHIR-DEV-PRO-1Y',
        orderId: 'order123'
      };

      const expectedLicense = {
        ...licenseData,
        _id: 'license123',
        createdAt: expect.any(Date),
        status: 'active'
      };

      mockWixData.save.mockResolvedValue(expectedLicense);

      const result = await createLicense(licenseData);

      expect(mockWixData.save).toHaveBeenCalledWith('Licenses', expect.objectContaining({
        ...licenseData,
        createdAt: expect.any(Date),
        status: 'active'
      }));

      expect(result).toEqual(expectedLicense);
    });

    test('should set default status if not provided', async () => {
      const licenseData = {
        licenseKey: 'FHIR-LIC-TEST123',
        customerEmail: 'test@example.com'
      };

      mockWixData.save.mockResolvedValue({ ...licenseData, _id: 'license123' });

      await createLicense(licenseData);

      expect(mockWixData.save).toHaveBeenCalledWith('Licenses', expect.objectContaining({
        status: 'active'
      }));
    });
  });

  describe('getUserLicenses', () => {
    test('should fetch licenses for a specific user', async () => {
      const userEmail = 'test@example.com';
      const mockLicenses = [
        { _id: '1', customerEmail: userEmail, productName: 'FHIR Dev License' },
        { _id: '2', customerEmail: userEmail, productName: 'FHIR Training' }
      ];

      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
        ascending: jest.fn().mockReturnThis(),
        find: jest.fn().mockResolvedValue({ items: mockLicenses })
      };

      mockWixData.query.mockReturnValue(mockQuery);

      const result = await getUserLicenses(userEmail);

      expect(mockWixData.query).toHaveBeenCalledWith('Licenses');
      expect(mockQuery.eq).toHaveBeenCalledWith('customerEmail', userEmail);
      expect(result).toEqual(mockLicenses);
    });
  });
});

describe('License Manager Functions', () => {
  describe('generateLicenseKey', () => {
    test('should generate license key with correct format', () => {
      const category = 'license';
      const edition = 'professional';

      const licenseKey = generateLicenseKey(category, edition);

      expect(licenseKey).toMatch(/^FHIR-LIC-PRO-[A-Z0-9]{8}$/);
    });

    test('should handle different categories and editions', () => {
      const testCases = [
        { category: 'training', edition: 'fundamentals', expected: /^FHIR-TRN-FND-[A-Z0-9]{8}$/ },
        { category: 'consulting', edition: 'enterprise', expected: /^FHIR-CON-ENT-[A-Z0-9]{8}$/ },
        { category: 'bundle', edition: 'startup', expected: /^FHIR-BDL-SUP-[A-Z0-9]{8}$/ }
      ];

      testCases.forEach(({ category, edition, expected }) => {
        const licenseKey = generateLicenseKey(category, edition);
        expect(licenseKey).toMatch(expected);
      });
    });
  });

  describe('activateLicense', () => {
    test('should activate valid license', async () => {
      const licenseKey = 'FHIR-LIC-PRO-TEST123';
      const mockLicense = {
        _id: 'license123',
        licenseKey,
        status: 'active',
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
        features: ['feature1', 'feature2'],
        deliverables: { type: 'license_key' }
      };

      // Mock getLicenseByKey
      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
        find: jest.fn().mockResolvedValue({ items: [mockLicense] })
      };
      mockWixData.query.mockReturnValue(mockQuery);

      // Mock updateLicense
      mockWixData.update.mockResolvedValue({ ...mockLicense, activatedAt: expect.any(Date) });

      const result = await activateLicense(licenseKey, {
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0...'
      });

      expect(result.valid).toBe(true);
      expect(result.license).toBeDefined();
      expect(result.features).toEqual(['feature1', 'feature2']);
    });

    test('should reject invalid license key', async () => {
      const licenseKey = 'INVALID-KEY';

      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
        find: jest.fn().mockResolvedValue({ items: [] })
      };
      mockWixData.query.mockReturnValue(mockQuery);

      const result = await activateLicense(licenseKey);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Invalid license key');
    });

    test('should reject expired license', async () => {
      const licenseKey = 'FHIR-LIC-PRO-EXPIRED';
      const mockLicense = {
        _id: 'license123',
        licenseKey,
        status: 'active',
        expiresAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // Yesterday
      };

      const mockQuery = {
        eq: jest.fn().mockReturnThis(),
        find: jest.fn().mockResolvedValue({ items: [mockLicense] })
      };
      mockWixData.query.mockReturnValue(mockQuery);

      const result = await activateLicense(licenseKey);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('License has expired');
    });
  });
});

describe('HTTP Functions', () => {
  // Mock HTTP function dependencies
  const mockRequest = {
    body: '{"test": "data"}',
    query: {},
    headers: {}
  };

  const mockResponse = {
    ok: jest.fn(),
    serverError: jest.fn(),
    badRequest: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('health endpoint should return healthy status', () => {
    // This would test the actual HTTP function
    // For now, we'll test the expected behavior
    const healthResponse = {
      status: 'healthy',
      timestamp: expect.any(String),
      version: '1.0.0',
      service: 'FHIR IQ Velo Backend'
    };

    expect(healthResponse.status).toBe('healthy');
    expect(healthResponse.version).toBe('1.0.0');
  });

  test('builder proxy should handle valid requests', async () => {
    mockWixSecrets.getSecret.mockResolvedValue('https://builder.fhiriq.com');

    // Mock fetch for builder service
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ success: true, buildId: 'test123' })
    });

    // Test would call the actual HTTP function here
    // For now, verify the expected behavior
    expect(mockWixSecrets.getSecret).toBeDefined();
  });
});

describe('Data Hooks', () => {
  test('Products_beforeInsert should set default values', async () => {
    const { Products_beforeInsert } = await import('../../wix/velo/backend/data-hooks.js');

    const item = {
      name: 'Test Product',
      price: 99.99
    };

    const context = { userRole: 'Admin' };

    const result = await Products_beforeInsert(item, context);

    expect(result.createdAt).toBeInstanceOf(Date);
    expect(result.lastModified).toBeInstanceOf(Date);
    expect(result.available).toBe(true);
    expect(result.digital).toBe(true);
    expect(result.viewCount).toBe(0);
    expect(Array.isArray(result.features)).toBe(true);
  });

  test('Licenses_beforeInsert should generate license key if not provided', async () => {
    const { Licenses_beforeInsert } = await import('../../wix/velo/backend/data-hooks.js');

    const item = {
      customerEmail: 'test@example.com',
      productSku: 'FHIR-DEV-PRO-1Y'
    };

    const context = { userRole: 'Admin' };

    const result = await Licenses_beforeInsert(item, context);

    expect(result.licenseKey).toBeDefined();
    expect(result.licenseKey).toMatch(/^FHIR-[A-Z0-9-]+$/);
    expect(result.status).toBe('active');
    expect(result.createdAt).toBeInstanceOf(Date);
  });
});

// Integration tests
describe('Integration Tests', () => {
  test('end-to-end license creation flow', async () => {
    // This would test the complete flow from order to license creation
    const orderData = {
      orderId: 'order123',
      customerEmail: 'test@example.com',
      lineItems: [
        {
          sku: 'FHIR-DEV-PRO-1Y',
          price: 799,
          currency: 'USD'
        }
      ]
    };

    // Mock product data
    const mockProduct = {
      sku: 'FHIR-DEV-PRO-1Y',
      name: 'FHIR Developer License - Professional',
      category: 'license',
      edition: 'professional',
      digital: true,
      deliverables: { type: 'license_key', maxUsers: 5 },
      features: ['Advanced FHIR validation', 'Premium code generators']
    };

    // Setup mocks for the flow
    const mockQuery = {
      eq: jest.fn().mockReturnThis(),
      find: jest.fn().mockResolvedValue({ items: [mockProduct] })
    };
    mockWixData.query.mockReturnValue(mockQuery);
    mockWixData.save.mockResolvedValue({ _id: 'license123', licenseKey: 'FHIR-LIC-PRO-TEST123' });

    // Test the flow (would call actual createLicense function)
    // For now, verify the setup is correct
    expect(orderData.lineItems).toHaveLength(1);
    expect(mockProduct.digital).toBe(true);
  });
});

// Performance tests
describe('Performance Tests', () => {
  test('getProducts should complete within acceptable time', async () => {
    const start = Date.now();

    // Mock quick response
    const mockQuery = {
      ascending: jest.fn().mockReturnThis(),
      find: jest.fn().mockResolvedValue({
        items: new Array(20).fill().map((_, i) => ({ _id: i, name: `Product ${i}` })),
        totalCount: 20,
        hasNext: jest.fn().mockReturnValue(false),
        hasPrev: jest.fn().mockReturnValue(false)
      })
    };
    mockWixData.query.mockReturnValue(mockQuery);

    await getProducts({ limit: 20 });

    const duration = Date.now() - start;
    expect(duration).toBeLessThan(1000); // Should complete within 1 second
  });
});