import React, { useRef } from 'react';
import { Container } from '../../../components/ui/Container';
import { SectionTitle } from '../../../components/ui/SectionTitle';
import { Badge } from '../../../components/ui/Badge';
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
    <section id="experience" ref={sectionRef} className="py-24 md:py-32 bg-brand-gray-light border-b border-brand-gray">
      <Container>
        <SectionTitle 
          title="Experience" 
          subtitle="// 05. Career" 
        />
        
        <div className="flex flex-col gap-12 mt-12">
          {experiences.map((exp, idx) => (
            <div key={idx} className="reveal-exp grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 border-t border-brand-gray pt-8 first:border-t-0 first:pt-0">
              <div className="md:col-span-4 lg:col-span-3">
                <span className="font-mono text-sm text-brand-gray-dark font-medium">
                  {exp.period}
                </span>
              </div>
              <div className="md:col-span-8 lg:col-span-9 flex flex-col gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-brand-black">{exp.role}</h3>
                  <span className="text-brand-gray-dark font-medium">{exp.company}</span>
                </div>
                
                <p className="text-brand-gray-dark leading-relaxed text-sm max-w-2xl">
                  {exp.description}
                </p>
                
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside text-sm text-brand-gray-dark space-y-1 max-w-2xl">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                )}
                
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {exp.technologies.map(tech => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
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
