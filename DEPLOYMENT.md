# Deployment Guide

This project is optimized for deployment on Vercel.

## Vercel Configuration
A `vercel.json` file is included at the root of the project to define strict HTTP headers.

- **Caching**: Aggressive caching policies (`Cache-Control: public, max-age=31536000, immutable`) are applied to static assets in the `/assets/` directory (fonts, hashed JS/CSS chunks).
- **Security**: The `vercel.json` enforces:
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Strict-Transport-Security`

## Manual Build
To build locally and test the production output:
```bash
npm run build
npm run preview
```

## Continuous Deployment
When linked to a GitHub repository, Vercel will automatically trigger a production build on pushes to the `main` branch. Ensure the Build Command is set to `vite build` and the Output Directory is set to `dist`.
