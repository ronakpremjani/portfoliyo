import React, { useRef } from 'react';
import { Container } from '../../../components/ui/Container';
import { useReveal } from '../../../hooks/useReveal';
import { useTextReveal } from '../../../hooks/useTextReveal';

const experiences = [
  {
    role: "Senior Software Engineer",
    company: "TechNova Solutions",
    period: "2023 - Present",
    description: "Lead the architecture and development of an enterprise-level SaaS platform servicing over 10,000 daily active users.",
    achievements: [
      "Reduced core API response times by 40% through Redis caching strategies.",
      "Established a comprehensive UI component library, reducing frontend development time by 30%."
    ],
    technologies: ["React", "TypeScript", "Node.js", "Redis", "GraphQL"]
  },
  {
    role: "Full Stack Engineer",
    company: "Digital Edge Agency",
    period: "2020 - 2023",
    description: "Engineered robust web applications for diverse e-commerce and fintech clients from concept to deployment.",
    achievements: [
      "Architected a scalable payment processing microservice handling $2M+ in monthly transactions.",
      "Migrated a legacy monolith to a Next.js/Express architecture, improving SEO and load times."
    ],
    technologies: ["Next.js", "Express", "PostgreSQL", "Docker", "AWS"]
  },
  {
    role: "Frontend Developer",
    company: "StartUp Inc",
    period: "2018 - 2020",
    description: "Spearheaded the development of a highly interactive consumer-facing web application, focusing on responsive design and fluid UX.",
    achievements: [
      "Implemented complex data visualizations using D3.js and Canvas.",
      "Optimized bundle size by 50% using Webpack code-splitting."
    ],
    technologies: ["JavaScript", "React", "D3.js", "Webpack", "CSS"]
  }
];

export const Experience = () => {
  const sectionRef = useRef(null);

  // Apply batch slide reveal for experience rows
  useReveal(sectionRef, '.reveal-exp', { type: 'slide', stagger: 0.14 }, true);
  
  // Apply text reveal for heading
  useTextReveal(sectionRef, '.reveal-text');

  return (
    <section id="experience" ref={sectionRef} className="py-24 md:py-32 bg-[#E5DFD3] text-[#1A2A40] overflow-hidden border-b border-[#1A2A40]/10 relative">
      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs tracking-[0.2em] text-[#8C2B3D] uppercase">
              // 02. Skills & Experience
            </span>
            <h2 className="reveal-text text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A2A40] leading-tight">
              My <br/> Career
            </h2>
          </div>
          
          <div className="hidden md:block">
            <p className="font-serif italic text-xl text-[#1A2A40]/70 max-w-[200px] text-right reveal-text">
              Building impactful products *
            </p>
          </div>
        </div>
        
        <div className="flex flex-col gap-12 mt-16 md:mt-24 relative z-20">
          {experiences.map((exp, idx) => (
            <div key={idx} className="reveal-exp grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 border-t border-[#1A2A40]/10 pt-8 first:border-t-0 first:pt-0">
              <div className="md:col-span-4 lg:col-span-3">
                <span className="font-mono text-sm text-[#8C2B3D] font-medium tracking-wide">
                  {exp.period}
                </span>
              </div>
              <div className="md:col-span-8 lg:col-span-9 flex flex-col gap-5">
                <div>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A2A40] tracking-tight">{exp.role}</h3>
                  <span className="text-[#1A2A40]/60 font-medium text-xl md:text-2xl mt-1 block">{exp.company}</span>
                </div>
                
                <p className="text-[#1A2A40]/90 leading-relaxed font-normal text-lg md:text-xl lg:text-2xl max-w-4xl">
                  {exp.description}
                </p>
                
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside text-lg md:text-xl lg:text-2xl text-[#1A2A40]/80 font-normal space-y-3 max-w-4xl marker:text-[#8C2B3D]">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                )}
                
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.technologies.map(tech => (
                      <span key={tech} className="px-4 py-1.5 rounded-full border border-[#1A2A40]/20 text-xs md:text-sm font-medium tracking-wide text-[#1A2A40]/80 hover:bg-[#1A2A40] hover:text-[#E5DFD3] transition-colors duration-300 cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
