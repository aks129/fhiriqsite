import wixLocation from 'wix-location';
import wixWindow from 'wix-window';
import { getProducts, getBlogPosts } from 'backend/data';

$w.onReady(async function () {
  try {
    console.log('Initializing FHIR IQ Home page...');

    // Initialize page components
    await Promise.all([
      loadFeaturedProducts(),
      loadRecentBlogPosts(),
      setupNavigationHandlers(),
      setupCTAButtons(),
      initializeAnalytics()
    ]);

    console.log('Home page initialization complete');

  } catch (error) {
    console.error('Home page initialization error:', error);
    showErrorMessage('Failed to load page content. Please refresh and try again.');
  }
});

/**
 * Load and display featured products
 */
async function loadFeaturedProducts() {
  try {
    const productsResult = await getProducts({
      featured: true,
      available: true,
      limit: 6
    });

    if (productsResult.items && productsResult.items.length > 0) {
      // Populate featured products repeater
      $w('#featuredProductsRepeater').data = productsResult.items.map(product => ({
        _id: product._id,
        title: product.name,
        description: product.description,
        price: formatPrice(product.price, product.currency),
        originalPrice: product.originalPrice ? formatPrice(product.originalPrice, product.currency) : null,
        image: product.image || '/images/product-placeholder.jpg',
        category: product.category,
        popular: product.popular,
        link: `/products/${product.sku}`
      }));

      // Show products section
      $w('#featuredProductsSection').show();
    } else {
      // Hide products section if no featured products
      $w('#featuredProductsSection').hide();
    }

  } catch (error) {
    console.error('Error loading featured products:', error);
    $w('#featuredProductsSection').hide();
  }
}

/**
 * Load and display recent blog posts
 */
async function loadRecentBlogPosts() {
  try {
    const blogResult = await getBlogPosts({
      published: true,
      limit: 3
    });

    if (blogResult.items && blogResult.items.length > 0) {
      // Populate blog posts repeater
      $w('#blogPostsRepeater').data = blogResult.items.map(post => ({
        _id: post._id,
        title: post.title,
        excerpt: post.excerpt || truncateText(post.content, 150),
        image: post.featuredImage || '/images/blog-placeholder.jpg',
        publishedDate: formatDate(post.publishedDate),
        author: post.author || 'FHIR IQ Team',
        link: `/blog/${post.slug || post._id}`
      }));

      // Show blog section
      $w('#blogSection').show();
    } else {
      // Hide blog section if no posts
      $w('#blogSection').hide();
    }

  } catch (error) {
    console.error('Error loading blog posts:', error);
    $w('#blogSection').hide();
  }
}

/**
 * Setup main navigation handlers
 */
function setupNavigationHandlers() {
  // Products navigation
  if ($w('#productsNavButton')) {
    $w('#productsNavButton').onClick(() => {
      wixLocation.to('/products');
    });
  }

  // AI Builder navigation
  if ($w('#builderNavButton')) {
    $w('#builderNavButton').onClick(() => {
      wixLocation.to('/builder');
    });
  }

  // Blog navigation
  if ($w('#blogNavButton')) {
    $w('#blogNavButton').onClick(() => {
      wixLocation.to('/blog');
    });
  }

  // About navigation
  if ($w('#aboutNavButton')) {
    $w('#aboutNavButton').onClick(() => {
      wixLocation.to('/about');
    });
  }

  // Contact navigation
  if ($w('#contactNavButton')) {
    $w('#contactNavButton').onClick(() => {
      wixLocation.to('/contact');
    });
  }
}

/**
 * Setup call-to-action buttons
 */
function setupCTAButtons() {
  // Hero CTA - Start Building
  if ($w('#heroStartBuildingButton')) {
    $w('#heroStartBuildingButton').onClick(() => {
      trackEvent('hero_cta_clicked', { button: 'start_building' });
      wixLocation.to('/builder');
    });
  }

  // Hero CTA - View Products
  if ($w('#heroViewProductsButton')) {
    $w('#heroViewProductsButton').onClick(() => {
      trackEvent('hero_cta_clicked', { button: 'view_products' });
      wixLocation.to('/products');
    });
  }

  // Book Consultation CTA
  if ($w('#bookConsultationButton')) {
    $w('#bookConsultationButton').onClick(() => {
      trackEvent('consultation_cta_clicked');
      wixLocation.to('/contact');
    });
  }

  // Try AI Builder CTA
  if ($w('#tryBuilderButton')) {
    $w('#tryBuilderButton').onClick(() => {
      trackEvent('builder_cta_clicked');
      wixLocation.to('/builder');
    });
  }

  // Newsletter signup
  if ($w('#newsletterSignupButton')) {
    $w('#newsletterSignupButton').onClick(handleNewsletterSignup);
  }
}

/**
 * Handle newsletter signup
 */
async function handleNewsletterSignup() {
  try {
    const email = $w('#newsletterEmailInput').value;

    if (!email) {
      showErrorMessage('Please enter your email address');
      return;
    }

    if (!isValidEmail(email)) {
      showErrorMessage('Please enter a valid email address');
      return;
    }

    // Show loading state
    $w('#newsletterSignupButton').disable();
    $w('#newsletterSignupButton').label = 'Subscribing...';

    // TODO: Implement newsletter subscription
    // This could integrate with Mailchimp, ConvertKit, or Wix's email marketing
    console.log('Newsletter signup:', email);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Show success message
    showSuccessMessage('Thank you for subscribing to our newsletter!');
    $w('#newsletterEmailInput').value = '';

    trackEvent('newsletter_signup', { email });

  } catch (error) {
    console.error('Newsletter signup error:', error);
    showErrorMessage('Failed to subscribe. Please try again.');
  } finally {
    // Reset button state
    $w('#newsletterSignupButton').enable();
    $w('#newsletterSignupButton').label = 'Subscribe';
  }
}

/**
 * Initialize analytics tracking
 */
function initializeAnalytics() {
  try {
    // Track page view
    trackEvent('page_view', {
      page: 'home',
      timestamp: new Date().toISOString()
    });

    // Track scroll depth
    wixWindow.trackEvent('scroll', () => {
      const scrollPercent = Math.round((wixWindow.scrollY / (document.body.scrollHeight - wixWindow.innerHeight)) * 100);

      if (scrollPercent >= 25 && !window.scroll25Tracked) {
        trackEvent('scroll_depth', { depth: 25 });
        window.scroll25Tracked = true;
      }

      if (scrollPercent >= 50 && !window.scroll50Tracked) {
        trackEvent('scroll_depth', { depth: 50 });
        window.scroll50Tracked = true;
      }

      if (scrollPercent >= 75 && !window.scroll75Tracked) {
        trackEvent('scroll_depth', { depth: 75 });
        window.scroll75Tracked = true;
      }

      if (scrollPercent >= 90 && !window.scroll90Tracked) {
        trackEvent('scroll_depth', { depth: 90 });
        window.scroll90Tracked = true;
      }
    });

  } catch (error) {
    console.error('Analytics initialization error:', error);
  }
}

/**
 * Setup repeater item handlers
 */
$w('#featuredProductsRepeater').onItemReady(($item, itemData) => {
  // Product click handler
  $item('#productCard').onClick(() => {
    trackEvent('product_clicked', {
      productId: itemData._id,
      productName: itemData.title,
      category: itemData.category
    });
    wixLocation.to(itemData.link);
  });

  // Add to cart button (if present)
  if ($item('#addToCartButton')) {
    $item('#addToCartButton').onClick((event) => {
      event.stopPropagation();
      trackEvent('add_to_cart_clicked', {
        productId: itemData._id,
        productName: itemData.title,
        source: 'home_featured'
      });
      // TODO: Implement add to cart functionality
      showSuccessMessage('Product added to cart!');
    });
  }
});

$w('#blogPostsRepeater').onItemReady(($item, itemData) => {
  // Blog post click handler
  $item('#blogPostCard').onClick(() => {
    trackEvent('blog_post_clicked', {
      postId: itemData._id,
      postTitle: itemData.title
    });
    wixLocation.to(itemData.link);
  });
});

// Utility functions
function formatPrice(price, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(price);
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function truncateText(text, maxLength) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showSuccessMessage(message) {
  // TODO: Implement success message display
  console.log('Success:', message);
}

function showErrorMessage(message) {
  // TODO: Implement error message display
  console.error('Error:', message);
}

function trackEvent(eventName, properties = {}) {
  try {
    // TODO: Implement analytics tracking (Google Analytics, PostHog, etc.)
    console.log('Track event:', eventName, properties);

    // Example implementation for Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, properties);
    }

    // Example implementation for PostHog
    if (typeof posthog !== 'undefined') {
      posthog.capture(eventName, properties);
    }

  } catch (error) {
    console.error('Event tracking error:', error);
  }
}