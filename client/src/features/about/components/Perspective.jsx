import React, { useRef } from 'react';
import { Container } from '../../../components/ui/Container';
import { SectionTitle } from '../../../components/ui/SectionTitle';
import { useReveal } from '../../../hooks/useReveal';
import { useTextReveal } from '../../../hooks/useTextReveal';

export const Perspective = () => {
  const sectionRef = useRef(null);

  // Apply text reveal for headings and lead paragraphs
  useTextReveal(sectionRef, '.reveal-text');
  
  // Apply slide reveal for the blockquote
  useReveal(sectionRef, '.reveal-quote', { type: 'slide' }, true);

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 bg-brand-gray-light border-b border-brand-gray">
      <Container>
        <SectionTitle 
          title="About Me" 
          subtitle="// 03. The Journey" 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-16">
          <div className="lg:col-span-7 flex flex-col gap-8">
            <p className="reveal-text text-xl md:text-2xl text-brand-black font-light leading-relaxed">
              My journey into software engineering started with an insatiable curiosity about how things work under the hood. I dismantle complex problems to build simple, resilient solutions.
            </p>
            
            <p className="reveal-text text-base text-brand-gray-dark leading-relaxed">
              Early in my career, I focused heavily on building pixel-perfect interfaces. However, I quickly realized that a beautiful UI is only as good as the system powering it. This realization drove me to dive deep into backend architecture, database optimization, and scalable infrastructure.
            </p>
            
            <p className="reveal-text text-base text-brand-gray-dark leading-relaxed">
              Today, I thrive at the intersection of design and engineering. I enjoy taking an idea from raw concept through robust backend implementation all the way to a polished, highly-interactive frontend experience. Continuous learning is my default state—whether exploring a new Rust framework or refining micro-animations.
            </p>
          </div>
          
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
            <blockquote className="reveal-quote border-l-4 border-brand-black pl-8 py-2 max-w-sm">
              <p className="text-2xl font-serif italic text-brand-black leading-snug">
                "Code is written for machines to execute, but for humans to read, maintain, and build upon."
              </p>
            </blockquote>
          </div>
        </div>
      </Container>
    </section>
  );
};
