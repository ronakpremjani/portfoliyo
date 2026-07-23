import React, { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useScroll } from 'framer-motion';
import { Container } from '../../../components/ui/container';
import { useTextReveal } from '../../../hooks/useTextReveal';
import { WarpSpeedUniverse } from './WarpSpeedUniverse';

export const Toolkit = () => {
  const sectionRef = useRef(null);
  
  // Apply text reveal for heading
  useTextReveal(sectionRef, '.reveal-text');

  // Track the scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  return (
    <section id="skills" ref={sectionRef} className="bg-[#1A2A40] text-[#E5DFD3] relative h-[400vh] w-full">
      {/* Sticky container that stays glued to the screen for the 400vh duration */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        
        {/* Floating Heading Overlay */}
        <div className="absolute top-0 left-0 w-full z-10 pt-20 md:pt-28 pointer-events-none">
          <Container>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pointer-events-auto">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs tracking-[0.2em] text-[#8C2B3D] uppercase drop-shadow-md">
                  // 03. Tech Stack
                </span>
                <h2 className="reveal-text text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#E5DFD3] leading-tight drop-shadow-2xl">
                  Dev <br/> Toolkit
                </h2>
              </div>
              
              <div className="hidden md:block">
                <p className="font-serif italic text-lg text-[#E5DFD3]/80 max-w-[250px] text-right reveal-text drop-shadow-md">
                  Scroll to explore the galaxy of technologies *
                </p>
              </div>
            </div>
          </Container>
        </div>
        
        {/* 3D Warp Speed Canvas */}
        <div className="w-full h-full">
          <Canvas>
            <Suspense fallback={null}>
              <WarpSpeedUniverse scrollProgress={scrollYProgress} />
            </Suspense>
          </Canvas>
        </div>

      </div>
    </section>
  );
};
