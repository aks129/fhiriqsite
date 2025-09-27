// FHIR IQ Hero Section Template
// Reusable hero section component for Wix Studio

export function initializeHeroSection() {
    // Hero section initialization
    $w.onReady(function () {
        // Set up responsive behavior
        setupResponsiveHero();

        // Initialize animations
        setupHeroAnimations();

        // Set up CTA tracking
        setupCTATracking();
    });
}

function setupResponsiveHero() {
    // Responsive text sizing based on design tokens
    const breakpoints = {
        mobile: 320,
        tablet: 768,
        desktop: 1024
    };

    // Adjust hero content based on screen size
    if ($w('#heroTitle')) {
        $w('#heroTitle').html = getResponsiveTitle();
    }

    if ($w('#heroSubtitle')) {
        $w('#heroSubtitle').html = getResponsiveSubtitle();
    }
}

function setupHeroAnimations() {
    // Fade in animation for hero elements
    const heroElements = ['#heroTitle', '#heroSubtitle', '#heroCTA'];

    heroElements.forEach((selector, index) => {
        if ($w(selector)) {
            setTimeout(() => {
                $w(selector).show('fade', { duration: 600 });
            }, index * 200);
        }
    });
}

function setupCTATracking() {
    // Track CTA button clicks
    if ($w('#heroCTA')) {
        $w('#heroCTA').onClick(() => {
            // Analytics tracking
            wixAnalytics.track('Hero CTA Clicked', {
                section: 'hero',
                button: 'primary_cta',
                page: wixLocation.url
            });

            // Navigate to consultation booking
            wixLocation.to('/book');
        });
    }

    // Track secondary CTA if present
    if ($w('#secondaryCTA')) {
        $w('#secondaryCTA').onClick(() => {
            wixAnalytics.track('Secondary CTA Clicked', {
                section: 'hero',
                button: 'secondary_cta',
                page: wixLocation.url
            });
        });
    }
}

function getResponsiveTitle() {
    // Return appropriate title based on page context
    const pageData = wixWindow.multilingual.currentLanguage;

    return `
        <h1 style="
            font-family: var(--font-family-heading);
            font-size: var(--font-size-5xl);
            font-weight: var(--font-weight-bold);
            line-height: var(--line-height-tight);
            color: var(--color-gray-900);
            margin: 0;
        ">
            Build on FHIR with <span style="color: var(--color-blue-500);">AI</span>
        </h1>
    `;
}

function getResponsiveSubtitle() {
    return `
        <p style="
            font-family: var(--font-family-primary);
            font-size: var(--font-size-xl);
            font-weight: var(--font-weight-normal);
            line-height: var(--line-height-relaxed);
            color: var(--color-gray-600);
            margin: var(--spacing-6) 0;
        ">
            Expert FHIR consulting, AI-powered development tools, and comprehensive training to accelerate your healthcare interoperability projects.
        </p>
    `;
}