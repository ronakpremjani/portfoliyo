import React from 'react';
import Container from '../ui/container';
import { Text } from '../ui/typography';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border-muted py-8 mt-20 bg-background-secondary/20 select-none">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Text variant="muted" className="text-sm text-center sm:text-left">
          &copy; {currentYear} Portfolio CMS. All rights reserved.
        </Text>
        <nav className="flex gap-6 text-sm" aria-label="Footer navigation">
          <a
            href="#privacy"
            className="text-text-muted hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded px-1"
          >
            Privacy Policy
          </a>
          <a
            href="#terms"
            className="text-text-muted hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded px-1"
          >
            Terms of Service
          </a>
        </nav>
      </Container>
    </footer>
  );
};

export default Footer;
