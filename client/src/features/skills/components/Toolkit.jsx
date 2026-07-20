import React, { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Container } from '../../../components/ui/Container';
import { useTextReveal } from '../../../hooks/useTextReveal';
import { BrainNetwork3D } from './BrainNetwork3D';

export const Toolkit = () => {
  const sectionRef = useRef(null);
  
  // Apply text reveal for heading
  useTextReveal(sectionRef, '.reveal-text');

  return (
    <section id="skills" ref={sectionRef} className="py-20 md:py-28 bg-[#1A2A40] text-[#E5DFD3] overflow-hidden relative min-h-screen flex flex-col">
      <Container className="relative z-20 mb-8 flex-shrink-0 pointer-events-none">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pointer-events-auto">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs tracking-[0.2em] text-[#8C2B3D] uppercase">
              // 03. Tech Stack
            </span>
            <h2 className="reveal-text text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#E5DFD3] leading-tight">
              Dev <br/> Toolkit
            </h2>
          </div>
          
          <div className="hidden md:block">
            <p className="font-serif italic text-lg text-[#E5DFD3]/70 max-w-[250px] text-right reveal-text">
              An interactive 3D neural brain of technologies *
            </p>
          </div>
        </div>
      </Container>
      
      {/* 3D Brain Container */}
      <div className="relative flex-grow w-full h-[600px] md:h-[70vh] border-t border-[#E5DFD3]/10">
        <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Suspense fallback={null}>
            <BrainNetwork3D />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};
