# Design System

This project uses Tailwind CSS to enforce a strict design system. The design language is characterized by restraint, semantic HTML, and high contrast.

## Typography
The project relies on two main typefaces, defined in `tailwind.config.js`:
- **Sans (`font-sans`)**: `Sora` - A geometric sans-serif used for body copy and headings.
- **Mono (`font-mono`)**: `IBM Plex Mono` - Used for technical details, metadata, and the navigation.

## Color Palette
The color system eschews standard colors for highly specific brand tokens:
- `brand-black`: `#111111` - Primary text and dark backgrounds.
- `brand-white`: `#fafafa` - Primary light backgrounds and light text.
- `brand-gray`: `#e5e5e5` - Borders and subtle dividers.
- `brand-gray-light`: `#f5f5f5` - Section background variations.
- `brand-gray-dark`: `#737373` - Muted text and secondary information.

## Layout & Spacing
- **Container**: Max width of `1200px` (`max-w-6xl`) with generous padding (`px-6 md:px-12`).
- **Section Spacing**: Generous vertical rhythm (`py-24 md:py-32`) to give content breathing room.
- **Grid System**: Relies on Tailwind's 12-column grid system for complex layouts.
