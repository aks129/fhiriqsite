module.exports = {
  // Site configuration
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
      '.github/**',
      'node_modules/**',
      'coverage/**',
      'test-results/**'
    ]
  },

  // Development server settings
  dev: {
    port: 3000,
    open: true,
    cors: true
  },

  // Preview settings
  preview: {
    mode: 'dev' // or 'prod'
  }
};