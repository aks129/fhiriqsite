# FHIR IQ Site Release Management Guide

## Overview

This document provides a comprehensive guide for releasing updates to the FHIR IQ website, including versioning, quality assurance, deployment procedures, and rollback strategies.

---

## 📋 **Versioning Scheme**

### Version Format: `site-vX.Y.Z`

- **X (Major)**: Breaking changes, major feature releases, significant redesigns
- **Y (Minor)**: New features, minor UI changes, new product offerings
- **Z (Patch)**: Bug fixes, content updates, security patches

### Examples:
- `site-v1.0.0` - Initial production launch
- `site-v1.1.0` - AI Builder feature release
- `site-v1.1.1` - Hotfix for checkout bug
- `site-v2.0.0` - Major redesign with new product categories

### Branch Naming:
- **Release branches**: `release/site-v1.1.0`
- **Hotfix branches**: `hotfix/site-v1.1.1`
- **Feature branches**: `feat/ai-builder-mvp`

---

## 🔍 **Pre-Release Quality Assurance**

### Preflight Checklist

Complete this checklist before every release:

#### 1. Code Quality & Security
- [ ] All CI/CD checks pass (lint, typecheck, tests)
- [ ] Security audit completed with no high-severity issues
- [ ] No hardcoded secrets or API keys in code
- [ ] All environment variables properly configured
- [ ] Code review completed by at least one team member

#### 2. Performance Testing
- [ ] **Lighthouse Audit** (run on all major pages):
  ```bash
  # Run Lighthouse CLI on key pages
  lighthouse https://fhiriq-staging.wixsite.com --output=json --output-path=./audit-home.json
  lighthouse https://fhiriq-staging.wixsite.com/products --output=json --output-path=./audit-products.json
  lighthouse https://fhiriq-staging.wixsite.com/builder --output=json --output-path=./audit-builder.json
  ```
  - [ ] Performance Score: ≥ 90
  - [ ] Accessibility Score: ≥ 95
  - [ ] Best Practices Score: ≥ 90
  - [ ] SEO Score: ≥ 95

- [ ] **Core Web Vitals**:
  - [ ] Largest Contentful Paint (LCP): < 2.5s
  - [ ] First Input Delay (FID): < 100ms
  - [ ] Cumulative Layout Shift (CLS): < 0.1

#### 3. Link Validation
- [ ] **Broken Links Check**:
  ```bash
  # Install and run link checker
  npm install -g broken-link-checker
  blc https://fhiriq-staging.wixsite.com -ro --filter-level 3
  ```
  - [ ] No broken internal links
  - [ ] All external links functional
  - [ ] Navigation menus work correctly
  - [ ] Footer links operational

#### 4. Content Management System (CMS) Validation
- [ ] **Products Collection**:
  - [ ] All products display correctly
  - [ ] Pricing information accurate
  - [ ] Product images load properly
  - [ ] Add to cart functionality works
  - [ ] Product filtering/search operational

- [ ] **Blog Posts Collection**:
  - [ ] Recent posts display on homepage
  - [ ] Blog archive page functional
  - [ ] Post detail pages render correctly
  - [ ] Author information displays
  - [ ] Tags and categories work

- [ ] **Podcast Episodes Collection**:
  - [ ] Episode list displays correctly
  - [ ] Audio players functional
  - [ ] Episode metadata accurate
  - [ ] RSS feed validates

- [ ] **Licenses Collection**:
  - [ ] Admin dashboard accessible
  - [ ] License generation working
  - [ ] Customer license portal functional
  - [ ] Permission controls enforced

#### 5. E-commerce Testing
- [ ] **Checkout Flow**:
  - [ ] Add products to cart
  - [ ] Cart persistence across sessions
  - [ ] Checkout form validation
  - [ ] Payment processing (test mode)
  - [ ] Order confirmation emails
  - [ ] License key generation and delivery

- [ ] **Wix Stores Integration**:
  - [ ] Product sync with Wix Stores
  - [ ] Inventory management
  - [ ] Tax calculation (if applicable)
  - [ ] Shipping options (for physical goods)

#### 6. AI Features Testing
- [ ] **FHIR Builder**:
  - [ ] Capability statement analysis
  - [ ] Resource selection interface
  - [ ] Application generation
  - [ ] ZIP download functionality
  - [ ] Generated app smoke test

- [ ] **Chatbot Functionality**:
  - [ ] FHIR knowledge queries respond correctly
  - [ ] Conversation flow natural
  - [ ] Fallback responses appropriate
  - [ ] Rate limiting functional
  - [ ] Admin analytics accessible

#### 7. Mobile & Cross-Browser Testing
- [ ] **Mobile Responsive Design**:
  - [ ] iPhone (Safari)
  - [ ] Android (Chrome)
  - [ ] Tablet view (iPad)
  - [ ] Touch interactions work

- [ ] **Desktop Browser Compatibility**:
  - [ ] Chrome (latest)
  - [ ] Firefox (latest)
  - [ ] Safari (latest)
  - [ ] Edge (latest)

#### 8. SEO & Analytics
- [ ] **Search Engine Optimization**:
  - [ ] Meta titles and descriptions
  - [ ] Structured data markup
  - [ ] XML sitemap updated
  - [ ] robots.txt configured
  - [ ] Canonical URLs set

- [ ] **Analytics Tracking**:
  - [ ] Google Analytics 4 events firing
  - [ ] PostHog tracking functional
  - [ ] Conversion tracking setup
  - [ ] E-commerce tracking enabled

---

## 🚀 **Release Process Workflow**

### Step 1: Prepare Release Branch

```bash
# Create release branch from main
git checkout main
git pull origin main
git checkout -b release/site-v1.1.0

# Update version in package.json (if applicable)
npm version minor --no-git-tag-version

# Commit version bump
git add .
git commit -m "chore: bump version to 1.1.0"
git push origin release/site-v1.1.0
```

### Step 2: Run Preflight Checklist

Complete all items in the **Pre-Release Quality Assurance** section above.

### Step 3: Create Release Pull Request

- [ ] Create PR: `release/site-v1.1.0` → `main`
- [ ] Title: `Release site-v1.1.0: [Feature Summary]`
- [ ] Use release PR template (see below)
- [ ] Assign reviewers
- [ ] Ensure all CI checks pass

### Step 4: Release Notes Preparation

Create detailed release notes covering:

```markdown
## Release Notes: site-v1.1.0

### 🚀 New Features
- AI Builder MVP with FHIR capability statement analysis
- Multi-step FHIR application generation wizard
- Downloadable scaffold with Docker support

### 🐛 Bug Fixes
- Fixed checkout flow for digital products
- Resolved mobile navigation menu issues
- Corrected license key generation timing

### 🔧 Improvements
- Enhanced page load performance (15% faster)
- Improved mobile responsiveness
- Updated product pricing display

### 🔒 Security
- Updated dependencies with security patches
- Enhanced API rate limiting
- Improved secret management

### 📊 Analytics & Monitoring
- Added conversion tracking for builder downloads
- Enhanced error logging and alerting
- Improved performance monitoring

### 🧪 Testing
- Added comprehensive E2E tests for checkout
- Enhanced CI/CD pipeline with security scanning
- Improved test coverage to 85%

### ⚠️ Breaking Changes
None

### 🔄 Migration Notes
No manual migration required.

### 📖 Documentation
- Updated deployment guide
- Enhanced API documentation
- Added troubleshooting guides
```

### Step 5: Deploy to Staging

```bash
# In Wix Studio
1. Connect to staging environment
2. Pull latest from release branch
3. Test deployment to staging subdomain
4. Run final validation tests
```

### Step 6: Merge and Tag Release

```bash
# After PR approval and merge
git checkout main
git pull origin main

# Create release tag
git tag -a site-v1.1.0 -m "Release site-v1.1.0: AI Builder MVP"
git push origin site-v1.1.0
```

### Step 7: Deploy to Production

```bash
# In Wix Studio
1. Switch to production environment
2. Pull from main branch
3. Run final smoke tests
4. Publish to fhiriq.com
5. Monitor deployment logs
```

### Step 8: Post-Release Validation

- [ ] Verify site loads at `https://fhiriq.com`
- [ ] Run post-deployment smoke tests
- [ ] Check analytics and monitoring dashboards
- [ ] Monitor error logs for 30 minutes
- [ ] Send release notification to team

---

## 🔄 **Rollback Procedures**

### When to Rollback

Initiate rollback immediately if:
- Site is completely inaccessible
- Critical functionality broken (checkout, payments)
- Security vulnerability detected
- Data corruption or loss
- Performance degradation > 50%

### Wix Studio Rollback (Quick - 5 minutes)

```bash
# Method 1: Revert to Previous Publish
1. In Wix Studio Editor, go to "Site History"
2. Find previous working version
3. Click "Restore" on last known good state
4. Click "Publish" to deploy rollback
5. Verify site functionality
```

### Git-Based Rollback (Complete - 15 minutes)

```bash
# Method 2: Git Revert and Redeploy
# Identify the problematic commit
git log --oneline -10

# Create revert commit
git checkout main
git revert <problematic-commit-hash> --no-edit

# Or revert to specific tag
git checkout -b hotfix/rollback-to-v1.0.0
git reset --hard site-v1.0.0

# Push rollback
git push origin hotfix/rollback-to-v1.0.0

# Deploy in Wix Studio
1. Pull from rollback branch
2. Publish to production
3. Verify functionality
```

### Database Rollback (If Required)

```bash
# For CMS data issues
1. In Wix Data Manager, go to "Collection History"
2. Export current data as backup
3. Restore from previous backup
4. Verify data integrity
5. Test dependent functionality
```

### Emergency Contact Procedures

If rollback fails or issues persist:

1. **Immediate**: Contact Wix Support (Premium Support Line)
2. **Technical Lead**: [Lead Developer Contact]
3. **Business Owner**: [Product Owner Contact]
4. **Infrastructure**: [DevOps/Platform Contact]

---

## 📊 **Post-Release Monitoring**

### Monitoring Dashboard Setup

#### Google Analytics 4
- [ ] **Real-time Monitoring** (first 2 hours):
  - Active users count
  - Page views and bounce rate
  - Conversion events
  - Error events

- [ ] **Key Metrics to Watch**:
  ```javascript
  // Custom events to monitor
  - fhir_builder_started
  - fhir_builder_completed
  - product_purchased
  - license_generated
  - chatbot_interaction
  - page_load_time
  ```

#### PostHog Analytics
- [ ] **User Behavior Tracking**:
  - Session recordings for new features
  - Funnel analysis for checkout flow
  - Feature flag performance
  - A/B test results

- [ ] **Performance Metrics**:
  - Page load times
  - User engagement scores
  - Feature adoption rates
  - Error rates by browser/device

### Error Monitoring

#### Wix Platform Monitoring
```javascript
// Set up error tracking in Velo backend
import { logger } from 'wix-monitoring';

export function monitorErrors() {
  try {
    // Your application code
  } catch (error) {
    logger.error('Release monitoring', {
      version: 'site-v1.1.0',
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  }
}
```

#### External Monitoring Tools
- [ ] **Uptime Monitoring**:
  - Pingdom/UptimeRobot checks every 5 minutes
  - Monitor all critical pages
  - Alert team if downtime > 2 minutes

- [ ] **Performance Monitoring**:
  - New Relic or DataDog APM
  - Real User Monitoring (RUM)
  - Core Web Vitals tracking

### Monitoring Schedule

#### First 2 Hours (Critical Period)
- [ ] Monitor analytics dashboards continuously
- [ ] Check error logs every 15 minutes
- [ ] Verify key user flows working
- [ ] Monitor payment processing

#### First 24 Hours (Active Monitoring)
- [ ] Check dashboards every 2 hours
- [ ] Review user feedback channels
- [ ] Monitor support ticket volume
- [ ] Track conversion metrics

#### First Week (Ongoing Monitoring)
- [ ] Daily analytics review
- [ ] Weekly performance report
- [ ] User feedback analysis
- [ ] Feature adoption tracking

### Success Metrics

#### Technical Success Criteria
- [ ] Site uptime: ≥ 99.9%
- [ ] Page load time: < 3 seconds (95th percentile)
- [ ] Error rate: < 0.1%
- [ ] Core Web Vitals: All metrics in "Good" range

#### Business Success Criteria
- [ ] Conversion rate maintained or improved
- [ ] User engagement metrics stable
- [ ] Customer satisfaction scores maintained
- [ ] No significant support ticket increase

---

## 📋 **Release Checklist Templates**

### Major Release (X.0.0) Template

```markdown
## Major Release Checklist: site-v2.0.0

### Pre-Release
- [ ] Feature freeze 1 week before release
- [ ] Comprehensive testing completed
- [ ] Security penetration testing
- [ ] Performance testing under load
- [ ] Documentation updated
- [ ] Support team trained on new features
- [ ] Marketing materials prepared

### Release Day
- [ ] Staging deployment successful
- [ ] All preflight checks completed
- [ ] Stakeholder sign-off received
- [ ] Support team on standby
- [ ] Monitoring dashboards ready
- [ ] Rollback plan confirmed

### Post-Release
- [ ] Monitor for 4 hours minimum
- [ ] User feedback collection active
- [ ] Performance metrics reviewed
- [ ] Success metrics tracked
- [ ] Post-mortem scheduled (if issues)
```

### Minor Release (X.Y.0) Template

```markdown
## Minor Release Checklist: site-v1.2.0

### Pre-Release
- [ ] Feature testing completed
- [ ] Integration testing passed
- [ ] Performance impact assessed
- [ ] Documentation updated

### Release Day
- [ ] Staging validation complete
- [ ] Preflight checklist completed
- [ ] Monitoring ready

### Post-Release
- [ ] Monitor for 2 hours
- [ ] Key metrics verified
- [ ] User feedback reviewed
```

### Patch Release (X.Y.Z) Template

```markdown
## Patch Release Checklist: site-v1.1.1

### Pre-Release
- [ ] Bug fix verified
- [ ] Regression testing completed
- [ ] Impact assessment minimal

### Release Day
- [ ] Quick smoke tests passed
- [ ] Monitoring active

### Post-Release
- [ ] Monitor for 1 hour
- [ ] Fix verification complete
```

---

## 🔧 **Hotfix Process**

### Emergency Hotfix Workflow

```bash
# Create hotfix branch from production tag
git checkout site-v1.1.0
git checkout -b hotfix/site-v1.1.1

# Make minimal fix
# ... edit files ...

# Commit fix
git add .
git commit -m "hotfix: fix critical checkout bug"

# Merge to main
git checkout main
git merge hotfix/site-v1.1.1

# Tag new patch version
git tag site-v1.1.1
git push origin main site-v1.1.1

# Deploy immediately
# ... deploy via Wix Studio ...

# Create PR to merge into develop if separate
git checkout develop
git merge main
```

### Hotfix Deployment Timeline
- **Detection to Fix**: < 30 minutes
- **Testing**: < 15 minutes
- **Deployment**: < 10 minutes
- **Verification**: < 5 minutes
- **Total**: < 60 minutes

---

## 📞 **Emergency Contacts & Escalation**

### Incident Severity Levels

#### Severity 1 (Critical - Immediate Response)
- Site completely down
- Payment processing broken
- Security breach detected
- Data loss/corruption

**Response Time**: < 15 minutes
**Escalation**: Immediate notification to all stakeholders

#### Severity 2 (High - Urgent Response)
- Major feature broken
- Performance severely degraded
- Limited user access

**Response Time**: < 2 hours
**Escalation**: Notify technical lead and product owner

#### Severity 3 (Medium - Standard Response)
- Minor feature issues
- Cosmetic problems
- Non-critical bugs

**Response Time**: < 24 hours
**Escalation**: Standard bug tracking process

### Contact Information

```yaml
Technical Lead:
  - Email: tech-lead@fhiriq.com
  - Phone: [Phone Number]
  - Slack: @tech-lead

Product Owner:
  - Email: product@fhiriq.com
  - Phone: [Phone Number]
  - Slack: @product-owner

DevOps/Platform:
  - Email: devops@fhiriq.com
  - Phone: [Phone Number]
  - Slack: @devops

Wix Support:
  - Premium Support: [Wix Support URL]
  - Phone: [Wix Support Phone]
  - Priority Ticket System: [URL]
```

---

## 📚 **Additional Resources**

### Documentation Links
- [Wix Velo Documentation](https://dev.wix.com/docs)
- [Wix Studio Publishing Guide](https://support.wix.com/en/article/wix-studio-publishing-your-site)
- [Git Flow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
- [Semantic Versioning](https://semver.org/)

### Tools & Scripts
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Broken Link Checker](https://github.com/stevenvachon/broken-link-checker)
- [Web Vitals Extension](https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma)

### Monitoring Dashboards
- Google Analytics 4: [Dashboard URL]
- PostHog: [Dashboard URL]
- Wix Analytics: [Dashboard URL]
- Uptime Monitor: [Dashboard URL]

---

**Document Version**: 1.0
**Last Updated**: 2024-01-01
**Next Review**: 2024-04-01
**Owner**: Technical Lead
**Approver**: Product Owner