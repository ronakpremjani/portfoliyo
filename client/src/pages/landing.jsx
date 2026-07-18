import React, { lazy, Suspense } from 'react';
import { Navigation } from '../features/navigation/components/Navigation';
import { Hero } from '../features/hero/components/Hero';
import { FeaturedWork } from '../features/work/components/FeaturedWork';
import { Perspective } from '../features/about/components/Perspective';
import { Loader } from '../components/ui/loader';

// Lazy load below-the-fold components
const Toolkit = lazy(() => import('../features/skills/components/Toolkit').then(m => ({ default: m.Toolkit })));
const Experience = lazy(() => import('../features/experience/components/Experience').then(m => ({ default: m.Experience })));
const Achievements = lazy(() => import('../features/achievements/components/Achievements').then(m => ({ default: m.Achievements })));
const Writing = lazy(() => import('../features/writing/components/Writing').then(m => ({ default: m.Writing })));
const Philosophy = lazy(() => import('../features/philosophy/components/Philosophy').then(m => ({ default: m.Philosophy })));
const Contact = lazy(() => import('../features/contact/components/Contact').then(m => ({ default: m.Contact })));
const Footer = lazy(() => import('../features/contact/components/Footer').then(m => ({ default: m.Footer })));

export const Landing = () => {
  return (
    <div className="w-full bg-brand-white text-brand-black font-sans min-h-screen selection:bg-brand-black selection:text-brand-white">
      <Loader />
      <Navigation />
      
      <main>
        <Hero />
        <FeaturedWork />
        <Perspective />
        
        <Suspense fallback={<div className="w-full min-h-[20vh]" />}>
          <Toolkit />
          <Experience />
          <Achievements />
          <Writing />
          <Philosophy />
          <Contact />
        </Suspense>
      </main>
      
      <Suspense fallback={<div className="w-full min-h-[10vh]" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Landing;
