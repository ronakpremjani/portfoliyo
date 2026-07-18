# Architecture

## Feature-Based Structure
This project utilizes a highly modular feature-based architecture. Rather than grouping files by type (e.g., all components together, all hooks together), files are grouped by the specific feature they implement. This ensures high cohesion and low coupling.

```text
src/
  features/
    about/
    achievements/
    contact/
    experience/
    hero/
    navigation/
    philosophy/
    skills/
    work/
```

## Global Providers
The application is wrapped in several key global providers:
- `LenisContext.Provider`: Manages smooth scrolling globally.
- `ErrorBoundary`: Catches React lifecycle errors and prevents blank screens.
- `BrowserRouter`: Manages client-side routing.

## Separation of Concerns
- **UI Components:** (`src/components/ui`) Reusable stateless atomic elements (Buttons, Cards, Badges).
- **Hooks:** (`src/hooks`) Encapsulated side-effects (e.g., `useReveal`, `useLenis`, `useCursor`).
- **Animations:** (`src/animations`) Decoupled GSAP logic from React components to keep components clean.
