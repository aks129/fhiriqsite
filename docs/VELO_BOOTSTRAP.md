# Velo by Wix Bootstrap Process for FHIR IQ

## Overview

This document provides a step-by-step process to bootstrap the FHIR IQ site with Velo by Wix, based on official Wix documentation and best practices.

---

## 📋 **Phase 1: Repository & Project Setup**

### Step 1.1: Prepare GitHub Repository

Our repository is already set up with the following structure:
```
FHIRIQSite/
├── wix/
│   └── velo/
│       ├── backend/
│       ├── public/
│       └── config/
├── builder-service/
├── templates/
├── data/
└── docs/
```

### Step 1.2: Velo-specific Configuration

Create Velo-specific files:

#### package.json (Root level)
```json
{
  "name": "fhir-iq-site",
  "version": "1.0.0",
  "description": "FHIR IQ Healthcare Interoperability Platform",
  "scripts": {
    "dev": "wix dev",
    "build": "wix build",
    "preview": "wix preview",
    "lint": "eslint wix/velo --ext .js,.jsx",
    "test": "jest"
  },
  "devDependencies": {
    "@wix/cli": "latest",
    "@wix/eslint-plugin-velo": "latest",
    "eslint": "^8.0.0",
    "jest": "^29.0.0"
  },
  "keywords": ["velo", "wix", "fhir", "healthcare", "interoperability"]
}
```

#### .wixignore
```
node_modules/
.git/
.env
.env.local
.DS_Store
Thumbs.db
*.log
coverage/
test-results/
builder-service/
templates/
docs/
.github/
```

#### wix.config.js
```javascript
module.exports = {
  siteId: process.env.WIX_SITE_ID,
  metaSiteId: process.env.WIX_META_SITE_ID,
  environmentName: process.env.WIX_ENVIRONMENT || 'dev',

  // Define the mapping between local files and Velo structure
  sync: {
    'wix/velo/backend': 'backend',
    'wix/velo/public': 'public'
  },

  // Configure build settings
  build: {
    exclude: [
      'builder-service/**',
      'templates/**',
      'docs/**',
      '.github/**'
    ]
  }
};
```

---

## 📋 **Phase 2: Wix Studio Setup**

### Step 2.1: Create Wix Site

1. **Go to Wix Studio**: https://www.wix.com/studio
2. **Create New Site**:
   - Choose "Start from Scratch"
   - Select "Business" category
   - Pick a professional healthcare template
   - Name: "FHIR IQ - Healthcare Interoperability"

### Step 2.2: Enable Velo Development Mode

1. **In Wix Studio Editor**:
   - Click "Dev Mode" in top menu
   - Click "Turn on Dev Mode"
   - Wait for Velo environment to initialize

2. **Verify Velo Setup**:
   - Code panel appears on right side
   - Backend and Public sections visible
   - Database collections available

### Step 2.3: Connect to GitHub

1. **In Code Panel**:
   - Click "Connect to Git"
   - Choose "GitHub" as provider
   - Authorize Wix GitHub app

2. **Repository Configuration**:
   - Select: `YOUR_USERNAME/FHIRIQSite`
   - Set branch: `main`
   - Configure sync settings

3. **Initial Sync**:
   - Click "Pull from Git"
   - Verify files appear in Velo editor
   - Test: Make small change and sync

---

## 📋 **Phase 3: Velo Project Structure**

### Step 3.1: Backend Structure

```
wix/velo/backend/
├── commerce/
│   ├── webhooks.js          # Order fulfillment
│   └── licenseManager.js    # License generation
├── ai/
│   ├── chatbot.js          # FHIR chatbot
│   └── builderProxy.js     # Builder service proxy
├── data/
│   ├── products.js         # Product management
│   ├── licenses.js         # License CRUD
│   └── blog.js            # Content management
├── auth/
│   └── userAuth.js        # User authentication
└── utils/
    ├── logger.js          # Logging utilities
    └── validation.js      # Input validation
```

### Step 3.2: Public Structure

```
wix/velo/public/
├── pages/
│   ├── Builder.jsx        # AI Builder page
│   ├── Pricing.jsx       # Products page
│   └── Dashboard.jsx     # User dashboard
├── components/
│   ├── ui/               # Reusable UI components
│   ├── forms/           # Form components
│   └── layout/          # Layout components
└── utils/
    ├── api.js           # API client
    ├── cart.js          # Shopping cart
    └── fhir.js          # FHIR utilities
```

### Step 3.3: Database Collections Configuration

```
wix/velo/config/
├── collections.json     # Collection definitions
├── permissions.json     # Access control
└── hooks.json          # Data hooks
```

---

## 📋 **Phase 4: Essential Velo Files**

### Step 4.1: Backend HTTP Functions

#### wix/velo/backend/http-functions.js
```javascript
import { ok, notFound, serverError, forbidden } from 'wix-http-functions';
import { builderProxy } from './ai/builderProxy.js';
import { chatbotHandler } from './ai/chatbot.js';
import { webhookHandler } from './commerce/webhooks.js';

// AI Builder proxy endpoint
export async function post_builder(request) {
  try {
    return await builderProxy(request);
  } catch (error) {
    console.error('Builder proxy error:', error);
    return serverError({ error: 'Builder service unavailable' });
  }
}

// Chatbot endpoint
export async function post_chat(request) {
  try {
    return await chatbotHandler(request);
  } catch (error) {
    console.error('Chatbot error:', error);
    return serverError({ error: 'Chat service unavailable' });
  }
}

// Commerce webhooks
export async function post_webhooks_commerce(request) {
  try {
    return await webhookHandler(request);
  } catch (error) {
    console.error('Webhook error:', error);
    return serverError({ error: 'Webhook processing failed' });
  }
}

// Health check
export function get_health(request) {
  return ok({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
}
```

### Step 4.2: Backend Data Access

#### wix/velo/backend/data.js
```javascript
import wixData from 'wix-data';

export async function getProducts(options = {}) {
  try {
    const query = wixData.query('Products');

    if (options.category) {
      query.eq('category', options.category);
    }

    if (options.featured) {
      query.eq('featured', true);
    }

    const results = await query.find();
    return results.items;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function createLicense(licenseData) {
  try {
    const result = await wixData.save('Licenses', licenseData);
    return result;
  } catch (error) {
    console.error('Error creating license:', error);
    throw error;
  }
}

export async function getUserLicenses(userEmail) {
  try {
    const results = await wixData.query('Licenses')
      .eq('customerEmail', userEmail)
      .find();
    return results.items;
  } catch (error) {
    console.error('Error fetching user licenses:', error);
    throw error;
  }
}
```

### Step 4.3: Public Page Code

#### wix/velo/public/pages/Home.js
```javascript
import wixLocation from 'wix-location';
import { getProducts } from 'backend/data';

$w.onReady(async function () {
  try {
    // Load featured products
    const products = await getProducts({ featured: true });

    // Populate product grid
    if (products.length > 0) {
      $w('#featuredProducts').data = products;
    }

    // Set up navigation handlers
    $w('#productsButton').onClick(() => {
      wixLocation.to('/products');
    });

    $w('#builderButton').onClick(() => {
      wixLocation.to('/builder');
    });

  } catch (error) {
    console.error('Page initialization error:', error);
  }
});
```

---

## 📋 **Phase 5: Velo-specific Configurations**

### Step 5.1: Collection Permissions

#### wix/velo/config/permissions.json
```json
{
  "Products": {
    "read": "anyone",
    "create": "admin",
    "update": "admin",
    "delete": "admin"
  },
  "Licenses": {
    "read": "owner",
    "create": "admin",
    "update": "admin",
    "delete": "admin"
  },
  "BlogPosts": {
    "read": "anyone",
    "create": "admin",
    "update": "admin",
    "delete": "admin"
  },
  "PodcastEpisodes": {
    "read": "anyone",
    "create": "admin",
    "update": "admin",
    "delete": "admin"
  }
}
```

### Step 5.2: Data Hooks

#### wix/velo/backend/data-hooks.js
```javascript
import { Permissions, webMethod } from 'wix-web-module';

// Hook for license creation
export const Licenses_beforeInsert = async (item, context) => {
  // Add creation timestamp
  item.createdAt = new Date();

  // Set default status
  if (!item.status) {
    item.status = 'active';
  }

  // Generate license key if not provided
  if (!item.licenseKey) {
    item.licenseKey = generateLicenseKey(item.productSku);
  }

  return item;
};

// Hook for product updates
export const Products_beforeUpdate = async (item, context) => {
  // Add last modified timestamp
  item.lastModified = new Date();

  return item;
};

function generateLicenseKey(productSku) {
  const prefix = productSku.split('-')[0];
  const uuid = require('uuid').v4();
  return `${prefix}-${uuid.substring(0, 8).toUpperCase()}`;
}
```

---

## 📋 **Phase 6: Testing & Validation**

### Step 6.1: Local Development

```bash
# Install Wix CLI
npm install -g @wix/cli

# Clone and setup (if not already done)
git clone https://github.com/YOUR_USERNAME/FHIRIQSite.git
cd FHIRIQSite
npm install

# Start development server
wix dev

# Test in browser
open http://localhost:3000
```

### Step 6.2: Velo-specific Tests

#### tests/velo/backend.test.js
```javascript
import { getProducts, createLicense } from 'backend/data';

describe('Backend Data Functions', () => {
  test('should fetch products', async () => {
    const products = await getProducts();
    expect(Array.isArray(products)).toBe(true);
  });

  test('should create license', async () => {
    const licenseData = {
      customerEmail: 'test@example.com',
      productSku: 'FHIR-DEV-PRO-1Y',
      orderId: 'test-order-123'
    };

    const result = await createLicense(licenseData);
    expect(result._id).toBeDefined();
    expect(result.licenseKey).toBeDefined();
  });
});
```

### Step 6.3: Integration Tests

```bash
# Run Velo-specific tests
npm run test:velo

# Test Git sync
wix sync

# Validate collections
wix data validate

# Test preview
wix preview
```

---

## 📋 **Phase 7: Deployment Process**

### Step 7.1: Feature Branch Workflow

```bash
# Create feature branch
git checkout -b feature/velo-bootstrap

# Add Velo files
git add wix/velo/
git add package.json
git add wix.config.js
git add .wixignore

# Commit changes
git commit -m "feat: bootstrap Velo project structure

- Added Velo backend and public file structure
- Configured Git integration with wix.config.js
- Set up HTTP functions for AI and commerce
- Added data access layer and hooks
- Configured collection permissions
- Added comprehensive testing setup"

# Push to GitHub
git push origin feature/velo-bootstrap
```

### Step 7.2: Pull Request & CI

1. **Create PR**: `feature/velo-bootstrap` → `main`
2. **Validate CI**: All checks pass
3. **Review**: Code review completed
4. **Merge**: Merge to main branch

### Step 7.3: Wix Studio Sync

1. **In Wix Studio**:
   - Go to Code panel
   - Click "Pull from Git"
   - Verify all files sync correctly

2. **Test in Preview**:
   - Click "Preview" in Wix Studio
   - Test all functionality
   - Verify no errors in console

---

## 📋 **Phase 8: Go Live Process**

### Step 8.1: Staging Deployment

1. **Publish to Staging**:
   - In Wix Studio: Click "Publish"
   - Select staging subdomain
   - Test all functionality

### Step 8.2: Domain Configuration

1. **Configure fhiriq.com**:
   - In Wix: Settings → Domains
   - Connect custom domain
   - Configure DNS settings
   - Verify SSL certificate

### Step 8.3: Production Launch

1. **Final Validation**:
   - All tests pass
   - Performance optimized
   - Content populated
   - Analytics configured

2. **Go Live**:
   - Publish to production
   - Monitor for issues
   - Validate all systems

---

## ✅ **Success Criteria**

Your Velo by Wix setup is complete when:

- [ ] Git integration working with automatic sync
- [ ] All backend functions operational
- [ ] Public pages rendering correctly
- [ ] Database collections accessible
- [ ] E-commerce flow functional
- [ ] AI features integrated
- [ ] Site published to fhiriq.com
- [ ] All tests passing
- [ ] Monitoring active

---

**Total Setup Time**: 4-6 hours
**Prerequisites**: GitHub account, Wix Studio access, basic JavaScript knowledge

This bootstrap process ensures a professional Velo by Wix setup with proper Git integration, testing, and deployment procedures.