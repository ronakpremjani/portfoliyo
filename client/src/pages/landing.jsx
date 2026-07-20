import React, { lazy, Suspense } from 'react';
import { Navigation } from '../features/navigation/components/Navigation';
import { Hero } from '../features/hero/components/Hero';
import { Perspective } from '../features/about/components/Perspective';
import { Loader } from '../components/ui/loader';

// Lazy load below-the-fold components
const Experience = lazy(() => import('../features/experience/components/Experience').then(m => ({ default: m.Experience })));
const Toolkit = lazy(() => import('../features/skills/components/Toolkit').then(m => ({ default: m.Toolkit })));
const FeaturedWork = lazy(() => import('../features/work/components/FeaturedWork').then(m => ({ default: m.FeaturedWork })));
const Contact = lazy(() => import('../features/contact/components/Contact').then(m => ({ default: m.Contact })));
const Footer = lazy(() => import('../features/contact/components/Footer').then(m => ({ default: m.Footer })));

export const Landing = () => {
  return (
    <div className="w-full bg-brand-white text-brand-black font-sans min-h-screen selection:bg-brand-black selection:text-brand-white">
      <Loader />
      <Navigation />
      
      <main>
        <Hero />
        <Perspective />
        
        <Suspense fallback={<div className="w-full min-h-[20vh]" />}>
          <Experience />
          <Toolkit />
          <FeaturedWork />
          <Contact />
        </Suspense>
      </main>
    </div>
  );
};

export default Landing;
