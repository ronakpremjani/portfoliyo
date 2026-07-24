import React, { useRef } from 'react';
import { Container } from '../../../components/ui/container';
import { useReveal } from '../../../hooks/useReveal';
import { useTextReveal } from '../../../hooks/useTextReveal';

const experiences = [
  {
    role: "Freelance MERN Developer",
    company: "Remote • Self-Employed",
    period: "2025 - Present",
    description:
      "Building modern, responsive, and scalable web applications for clients and personal ventures using the MERN ecosystem.",
    achievements: [
      "Developed full-stack web applications with React, Node.js, Express, and MongoDB.",
      "Focused on performance, responsive UI, authentication, and clean architecture.",
      "Continuously improving client communication, UI/UX, and deployment workflows."
    ],
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
      "Git"
    ]
  },

  {
    role: "Personal Projects & Open Source",
    company: "Building in Public",
    period: "2024 - 2025",
    description:
      "Designing and developing products that solve real-world problems while exploring interactive experiences and scalable architectures.",
    achievements: [
      "Developed a portfolio with immersive animations and modern UI interactions.",
      "Built full-stack applications including authentication, dashboards, and REST APIs.",
      "Regularly publish projects on GitHub while experimenting with new technologies."
    ],
    technologies: [
      "Next.js",
      "Three.js",
      "Framer Motion",
      "PostgreSQL"
    ]
  },

  {
    role: "Computer Applications Student",
    college: "JG University",
    period: "2023 - 2024",
    description:
      "Pursuing a Bachelor's degree while building practical software engineering skills through projects, hackathons, and continuous learning.",
    achievements: [
      "Built numerous frontend and full-stack projects beyond the academic curriculum.",
      "Participated in hackathons and collaborative development projects.",
      "Learning system design, backend architecture, cloud deployment, and scalable applications."
    ],
    technologies: [
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
      "GitHub"
    ]
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
