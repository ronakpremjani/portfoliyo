import React, { useRef } from 'react';
import { Container } from '../../../components/ui/Container';
import { SectionTitle } from '../../../components/ui/SectionTitle';
import { useReveal } from '../../../hooks/useReveal';
import { useTextReveal } from '../../../hooks/useTextReveal';

export const Philosophy = () => {
  const sectionRef = useRef(null);

  // Apply batch fade reveal for philosophy points
  useReveal(sectionRef, '.reveal-philosophy', { type: 'fade', stagger: 0.15 }, true);
  
  // Apply text reveal for headings and lead paragraph
  useTextReveal(sectionRef, '.reveal-text');

  return (
    <section id="philosophy" ref={sectionRef} className="py-24 md:py-32 bg-brand-white border-b border-brand-gray">
      <Container>
        <SectionTitle 
          title="Philosophy" 
          subtitle="// 07. Engineering Approach" 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          <div className="lg:col-span-8">
            <p className="reveal-text text-xl md:text-2xl text-brand-black font-light leading-relaxed">
              Software is more than just code—it's a reflection of how we think. My approach is rooted in simplicity, performance, and building systems that endure.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20 pt-16 border-t border-brand-gray">
          <div className="reveal-philosophy">
            <h4 className="font-semibold text-brand-black mb-3 text-lg">Maintainability</h4>
            <p className="text-brand-gray-dark font-light leading-relaxed">
              Clever code is a technical liability. True craftsmanship lies in choosing the most obvious, readable, and boring solution. A system should be easy for the next engineer to understand and extend.
            </p>
          </div>
          <div className="reveal-philosophy">
            <h4 className="font-semibold text-brand-black mb-3 text-lg">Accessibility</h4>
            <p className="text-brand-gray-dark font-light leading-relaxed">
              The web is for everyone. Building accessible interfaces isn't an afterthought; it's a foundational requirement. I ensure deep semantic HTML and keyboard-friendly interactions from day one.
            </p>
          </div>
          <div className="reveal-philosophy">
            <h4 className="font-semibold text-brand-black mb-3 text-lg">Performance</h4>
            <p className="text-brand-gray-dark font-light leading-relaxed">
              Speed is a feature. Whether it's optimizing edge caching for backend APIs or eliminating main-thread blocking on the frontend, I engineer software to respect the user's time and device constraints.
            </p>
          </div>
          <div className="reveal-philosophy">
            <h4 className="font-semibold text-brand-black mb-3 text-lg">Scalability</h4>
            <p className="text-brand-gray-dark font-light leading-relaxed">
              Features do not exist in isolation. Every addition must respect, protect, and integrate seamlessly into the overall system architecture. We build cohesive software ecosystems, not fragmented features.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};
