# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- **Phase 5 (Growth & Branding)**: Added `analytics.js` utility for event tracking.
- **Phase 5**: Introduced `Writing.jsx` component for technical blog aggregation.
- **Phase 5**: Added "Download Resume" capability and updated Hero component.
- **Phase 5**: Created `ROADMAP.md` to track future evolution goals.

## [1.0.0] - Production Launch
### Added
- **Phase 4 (Production & Optimization)**: `ErrorBoundary` component for graceful failure handling.
- **Phase 4**: SEO Optimization (meta tags, JSON-LD, Open Graph).
- **Phase 4**: Vercel configuration (`vercel.json`) with strict security headers and caching.
- **Phase 4**: Comprehensive project documentation (ARCHITECTURE, DESIGN_SYSTEM, ANIMATIONS).

### Changed
- **Phase 4**: Optimized React rendering by implementing `React.lazy` and `Suspense` for below-the-fold components.
- **Phase 4**: Added `React.memo` to `Navigation` and `Footer` to reduce layout thrashing.
- **Phase 4**: Added ARIA labels for accessibility compliance.
- **Phase 3 (Storytelling)**: Refactored `FeaturedWork`, `Perspective`, and `Toolkit` to improve narrative flow.

### Fixed
- **Phase 4**: Secured external links with `target="_blank" rel="noopener noreferrer"`.
- **Phase 3**: Fixed grid overlap issues in the `Achievements` component.
