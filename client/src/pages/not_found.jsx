import React from 'react';
import Container from '../components/ui/container';
import { Heading, Paragraph } from '../components/ui/typography';
import Button from '../components/ui/button';

export const NotFound = () => {
  return (
    <Container className="flex flex-col items-center justify-center min-h-[60vh] text-center select-none">
      <Heading level={1} className="font-extrabold text-brand-primary mb-2 text-7xl md:text-8xl">
        404
      </Heading>
      <Heading level={2} className="border-none font-bold mb-4">
        Page Not Found
      </Heading>
      <Paragraph className="max-w-md mb-8 text-text-secondary">
        The page you are looking for does not exist or has been relocated to another path.
      </Paragraph>
      <Button variant="primary" onClick={() => window.location.href = '/'}>
        Return Home
      </Button>
    </Container>
  );
};

export default NotFound;
