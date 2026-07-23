import React, { useRef, memo } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../../../components/ui/container';
import { useReveal } from '../../../hooks/useReveal';
import { trackSocialClick } from '../../../utils/analytics';

export const Footer = memo(() => {
  const footerRef = useRef(null);

  useReveal(footerRef, '.reveal-footer', { type: 'fade', duration: 1.2 }, false);

  return (
    <footer ref={footerRef} className="py-12 bg-brand-black text-brand-white">
      <Container className="reveal-footer flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <span className="font-semibold text-lg">Code by Ronak</span>
          <span className="text-brand-gray-dark text-sm font-mono tracking-widest uppercase">
            © {new Date().getFullYear()} All Rights Reserved
          </span>
        </div>
        
        <nav className="flex items-center gap-6 font-mono text-sm uppercase">
          <motion.a 
            href="#" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-gray"
            whileHover={{ y: -2, color: '#fafafa' }}
            transition={{ type: 'spring', stiffness: 400 }}
            onClick={() => trackSocialClick('GitHub')}
          >
            GitHub
          </motion.a>
          <motion.a 
            href="#" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-gray"
            whileHover={{ y: -2, color: '#fafafa' }}
            transition={{ type: 'spring', stiffness: 400 }}
            onClick={() => trackSocialClick('LinkedIn')}
          >
            LinkedIn
          </motion.a>
          <motion.a 
            href="#" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-gray"
            whileHover={{ y: -2, color: '#fafafa' }}
            transition={{ type: 'spring', stiffness: 400 }}
            onClick={() => trackSocialClick('Twitter')}
          >
            Twitter
          </motion.a>
        </nav>
      </Container>
    </footer>
  );
});
