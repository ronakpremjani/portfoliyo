import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Container } from '../../../components/ui/Container';
import { useTextReveal } from '../../../hooks/useTextReveal';

const skillsData = [
  {
    category: "Frontend",
    skills: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextdotjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "Framer Motion", icon: "framer" },
      { name: "Three.js", icon: "threedotjs" }
    ]
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", icon: "nodedotjs" },
      { name: "Express", icon: "express" },
      { name: "GraphQL", icon: "graphql" },
      { name: "REST APIs", icon: "" },
      { name: "Go", icon: "go" },
      { name: "Python", icon: "python" }
    ]
  },
  {
    category: "Database",
    skills: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Redis", icon: "redis" },
      { name: "Elasticsearch", icon: "elasticsearch" },
      { name: "Prisma", icon: "prisma" }
    ]
  },
  {
    category: "Tools",
    skills: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Webpack", icon: "webpack" },
      { name: "Vite", icon: "vite" },
      { name: "Jest", icon: "jest" },
      { name: "Cypress", icon: "cypress" },
      { name: "Figma", icon: "figma" }
    ]
  },
  {
    category: "DevOps",
    skills: [
      { name: "Docker", icon: "docker" },
      { name: "Kubernetes", icon: "kubernetes" },
      { name: "AWS", icon: "amazonaws" },
      { name: "Vercel", icon: "vercel" },
      { name: "Netlify", icon: "netlify" },
      { name: "Nginx", icon: "nginx" }
    ]
  }
];

const SkillRow = ({ group, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Create an array with duplicated skills to make the marquee infinite
  const separator = { name: "•", icon: "" };
  const marqueeItems = [...group.skills, separator, ...group.skills, separator, ...group.skills, separator, ...group.skills];

  return (
    <div 
      className="group relative border-b border-[#E5DFD3]/10 py-8 md:py-12 flex flex-col xl:flex-row items-start xl:items-center justify-between cursor-crosshair overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Hover Reveal - deep ruby red */}
      <div 
        className={`absolute inset-0 bg-[#8C2B3D] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] origin-bottom ${isHovered ? 'scale-y-100' : 'scale-y-0'}`}
      />

      <div className="relative z-10 w-full xl:w-1/3 mb-6 xl:mb-0 px-4 md:px-8">
        <div className="flex items-center gap-3 md:gap-5">
          <span className={`font-mono text-xs md:text-sm transition-colors duration-500 ${isHovered ? 'text-[#E5DFD3]/70' : 'text-[#8C2B3D]'}`}>
            0{index + 1}
          </span>
          <h3 className={`font-heading text-2xl md:text-4xl font-bold uppercase tracking-tighter transition-colors duration-500 ${isHovered ? 'text-[#E5DFD3]' : 'text-[#E5DFD3]'}`}>
            {group.category}
          </h3>
        </div>
      </div>

      <div className="relative z-10 w-full xl:w-2/3 overflow-hidden flex items-center h-10 md:h-12">
        <motion.div 
          className="flex whitespace-nowrap items-center w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            repeat: Infinity, 
            duration: isHovered ? 8 : 25, 
            ease: "linear" 
          }}
        >
          {marqueeItems.map((skill, i) => (
            <div key={i} className="flex items-center px-3 md:px-5">
              {skill.icon && (
                <img 
                  src={`https://cdn.simpleicons.org/${skill.icon}/E5DFD3`} 
                  alt={skill.name}
                  className={`w-5 h-5 md:w-6 md:h-6 mr-2 transition-all duration-500 ${isHovered ? 'opacity-100 scale-110' : 'opacity-20 grayscale scale-100'}`}
                />
              )}
              <span 
                className={`font-sans text-lg md:text-2xl tracking-wide transition-colors duration-500 flex items-center ${
                  skill.name === "•" 
                    ? (isHovered ? 'text-[#E5DFD3]/30' : 'text-[#8C2B3D]') 
                    : (isHovered ? 'text-[#E5DFD3]' : 'text-[#E5DFD3]/30 text-stroke-thin')
                }`}
                style={skill.name !== "•" && !isHovered ? { WebkitTextStroke: '1px rgba(229, 223, 211, 0.2)', color: 'transparent' } : {}}
              >
                {skill.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export const Toolkit = () => {
  const sectionRef = useRef(null);
  
  // Apply text reveal for heading
  useTextReveal(sectionRef, '.reveal-text');

  return (
    <section id="skills" ref={sectionRef} className="py-20 md:py-28 bg-[#1A2A40] text-[#E5DFD3] overflow-hidden relative">
      <Container className="relative z-10 mb-14 md:mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs tracking-[0.2em] text-[#8C2B3D] uppercase">
              // 03. Tech Stack
            </span>
            <h2 className="reveal-text text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#E5DFD3] leading-tight">
              Dev <br/> Toolkit
            </h2>
          </div>
          
          <div className="hidden md:block">
            <p className="font-serif italic text-lg text-[#E5DFD3]/70 max-w-[200px] text-right reveal-text">
              Tools of the trade *
            </p>
          </div>
        </div>
      </Container>
      
      <div className="w-full border-t border-[#E5DFD3]/10">
        {skillsData.map((group, index) => (
          <SkillRow key={index} group={group} index={index} />
        ))}
      </div>
    </section>
  );
};
