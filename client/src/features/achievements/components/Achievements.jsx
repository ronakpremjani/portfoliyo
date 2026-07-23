import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../../../components/ui/container';
import { SectionTitle } from '../../../components/ui/SectionTitle';
import { useReveal } from '../../../hooks/useReveal';
import { useTextReveal } from '../../../hooks/useTextReveal';

const achievementsList = [
  {
    year: "2023",
    title: "AWS Certified Solutions Architect",
    description: "Professional certification validating expertise in designing distributed systems and robust cloud architectures."
  },
  {
    year: "2022",
    title: "Awwwards Site of the Day",
    description: "Recognized for exceptional design, fluid motion, and innovative architecture on the Enterprise Dashboard project."
  },
  {
    year: "2021",
    title: "Open Source Contributor",
    description: "Core contributor to major React ecosystem libraries, focusing on performance utilities and state management."
  },
  {
    year: "2020",
    title: "Hackathon Winner - Global Tech Summit",
    description: "First place out of 200+ teams for architecting a real-time, low-latency accessibility testing tool."
  }
];

export const Achievements = () => {
  const sectionRef = useRef(null);

  // Apply batch scale reveal for achievements cards
  useReveal(sectionRef, '.reveal-achievement', { type: 'scale', stagger: 0.1 }, true);
  
  // Apply text reveal for heading
  useTextReveal(sectionRef, '.reveal-text');

  return (
    <section id="achievements" ref={sectionRef} className="py-24 md:py-32 bg-brand-white border-b border-brand-gray">
      <Container>
        <SectionTitle 
          title="Achievements" 
          subtitle="// 06. Recognitions" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {achievementsList.map((item, idx) => (
            <motion.div 
              key={idx} 
              className="reveal-achievement flex flex-col gap-3 p-6 border border-brand-gray rounded-lg bg-brand-white"
              whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <span className="font-mono text-xs font-bold text-brand-black bg-brand-gray-light self-start px-2 py-1 rounded">
                {item.year}
              </span>
              <h4 className="font-semibold text-brand-black text-lg mt-2">{item.title}</h4>
              <p className="text-sm text-brand-gray-dark leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
