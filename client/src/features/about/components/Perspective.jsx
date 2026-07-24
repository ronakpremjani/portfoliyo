import React, { useRef } from 'react';
import { Container } from '../../../components/ui/container';
import { useReveal } from '../../../hooks/useReveal';
import { useTextReveal } from '../../../hooks/useTextReveal';

export const Perspective = () => {
  const sectionRef = useRef(null);

  // Apply text reveal for headings and lead paragraphs
  useTextReveal(sectionRef, '.reveal-text');
  
  // Apply slide reveal for the blockquote
  useReveal(sectionRef, '.reveal-quote', { type: 'slide' }, true);

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 bg-[#1A2A40] text-[#E5DFD3] overflow-hidden border-b border-[#E5DFD3]/10 relative">
      {/* Background Radial Gradients similar to FeaturedWork */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center opacity-10">
         <div className="w-[600px] h-[600px] border border-[#E5DFD3]/20 rounded-full absolute translate-x-1/2 -translate-y-1/4" />
         <div className="w-[1000px] h-[1000px] border border-[#E5DFD3]/10 rounded-full absolute translate-x-1/3 -translate-y-1/4" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs tracking-[0.2em] text-[#8C2B3D] uppercase">
              // 01. About Me
            </span>
            <h2 className="reveal-text text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#E5DFD3] leading-tight">
              The <br/> Journey
            </h2>
          </div>
          
          <div className="hidden md:block">
            <p className="font-serif italic text-xl text-[#E5DFD3]/70 max-w-[200px] text-right reveal-text">
              Crafting digital experiences *
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-16 md:mt-24">
          <div className="lg:col-span-7 flex flex-col gap-8 relative z-20">
            <p className="reveal-text text-2xl md:text-3xl lg:text-4xl text-[#E5DFD3] font-medium leading-tight">
              I'm a software developer who enjoys building products from the first sketch to the final deployment. I love the challenge of solving complex problems while keeping the user experience simple and intuitive.</p>
            <p className="reveal-text text-lg md:text-xl lg:text-2xl text-[#E5DFD3]/80 leading-relaxed font-normal">
            My interests span across frontend development, backend architecture, and interactive web experiences. Beyond writing code, I'm constantly exploring new technologies, improving my craft, and turning ambitious ideas into real products.</p>
            <p className="reveal-text text-lg md:text-xl lg:text-2xl text-[#E5DFD3]/80 leading-relaxed font-normal">
            I believe the best developers never stop learning—and that's exactly the mindset I bring to every project.</p>
          </div>
          
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end relative z-20 mt-8 lg:mt-0">
            <blockquote className="reveal-quote border-l-4 border-[#8C2B3D] pl-8 py-4 max-w-sm bg-[#E5DFD3]/5 rounded-r-2xl backdrop-blur-sm">
              <p className="text-2xl md:text-3xl font-serif italic text-[#E5DFD3] leading-snug font-light">
                "Programs must be written for people to read, and only incidentally for machines to execute."
              </p>
            </blockquote>
          </div>
        </div>
      </Container>
    </section>
  );
};
