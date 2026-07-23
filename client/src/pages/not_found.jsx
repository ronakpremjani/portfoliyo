import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/container';
import { Button } from '../components/ui/Button';

export const NotFound = () => {
  return (
    <Container className="flex flex-col items-center justify-center min-h-[60vh] text-center select-none py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center"
      >
        <h1 className="font-extrabold text-brand-black mb-2 text-7xl md:text-8xl">
          404
        </h1>
        <h2 className="font-bold text-3xl text-brand-black mb-4">
          Page Not Found
        </h2>
        <p className="max-w-md mb-8 text-brand-gray-dark leading-relaxed">
          The page you are looking for does not exist or has been relocated to another path.
        </p>
        <Button variant="primary" size="lg" onClick={() => window.location.href = '/'}>
          Return Home
        </Button>
      </motion.div>
    </Container>
  );
};

export default NotFound;
