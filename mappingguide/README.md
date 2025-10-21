# FHIR IQ Mapping Wiki

This directory contains the static FHIR Mapping Wiki accessible at `fhiriq.com/mappingguide`

## Deployment

The mapping wiki is deployed as static files via Vercel at the `/mappingguide` path.

The main fhiriq.com site is a Wix Studio + Velo application deployed through Wix hosting.

## Files

- `index.html` - Main wiki page with navigation
- `app.js` - Wiki content and JavaScript routing
- `styles.css` - Wiki styling

## Local Development

To test locally:
1. Open `index.html` in a browser
2. Or use a local server: `python -m http.server 8000`
3. Navigate to `http://localhost:8000`

## Content Updates

To update wiki content, edit the `app.js` file and modify the `content` object.

## Deployment

Changes pushed to the `main` branch are automatically deployed via Vercel.
