# Roadmap

This document outlines the strategic vision for the continuous evolution of the portfolio (Phase 5 and beyond). The goal is to transition the portfolio from a static resume into a dynamic, highly-trafficked personal brand hub.

## Near-Term Goals (Q3-Q4)
- [ ] **Analytics Provider Integration**: Replace the stub in `analytics.js` with Vercel Analytics or GA4.
- [ ] **Resume Automation**: Create a script to generate `resume.pdf` from a JSON data source, ensuring the website and PDF are always synced.
- [ ] **Blog CMS Integration**: Fetch articles in `Writing.jsx` dynamically from the dev.to API or a headless CMS instead of hardcoding.

## Mid-Term Goals
- [ ] **Open Source Showcase**: Build a dedicated interactive section to visualize GitHub contribution graphs and highlight popular open-source repositories.
- [ ] **Lighthouse CI**: Integrate a GitHub Action to automatically run Lighthouse audits on every pull request, preventing performance regressions.
- [ ] **A/B Testing**: Implement split testing on the Hero headline to determine which messaging resonates most with recruiters and clients.

## Ongoing Maintenance
- **Monthly**: Review and update dependencies via `npm audit` and Dependabot.
- **Quarterly**: Audit accessibility using Axe / Lighthouse.
- **Bi-Annually**: Review the "Featured Work" section and replace the weakest project with newer, stronger work.
