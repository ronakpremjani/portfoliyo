import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../../components/ui/Container';
import { useTextReveal } from '../../../hooks/useTextReveal';
import { WorkCarousel } from './WorkCarousel';

const projects = [
  {
    title: "Employee Shop Management",
    overview: "A comprehensive management system for employees and shop inventory, built to streamline business operations.",
    challenge: "Managing physical shop inventory while handling employee shifts and permissions required fragmented, offline systems that caused sync issues.",
    solution: "Built a centralized web portal providing role-based access control, real-time inventory tracking, and employee management all in one place.",
    features: ["Role-based Access", "Inventory Sync", "Employee Dashboard", "Sales Tracking"],
    techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
    results: "Streamlined daily operations and drastically reduced inventory discrepancy.",
    lessons: "Learned how to effectively model relational data in MongoDB and handle JWT-based authentication flows securely.",
    image: "https://opengraph.githubassets.com/1/ronakpremjani/employee-shop-management",
    demoLink: "https://luckystoreem.vercel.app",
    sourceLink: "https://github.com/ronakpremjani/employee-shop-management"
  },
  {
    title: "GitHub Profile & Portfolio",
    overview: "My personal GitHub repository containing my profile readme and portfolio configurations.",
    challenge: "Creating a standout developer presence requires more than just code; it requires a centralized place to showcase identity, stats, and pinned work.",
    solution: "Designed a dynamic GitHub profile README leveraging automated workflows and a custom-built portfolio interface.",
    features: ["Dynamic Stats", "Automated Workflows", "Custom Portfolio Integration"],
    techStack: ["Markdown", "GitHub Actions", "React"],
    results: "Created a highly visible, automated developer profile that requires zero manual maintenance.",
    lessons: "Gained experience in writing robust CI/CD pipelines using GitHub Actions to automate content generation.",
    image: "https://opengraph.githubassets.com/1/ronakpremjani/ronakpremjani",
    demoLink: "https://github.com/ronakpremjani/ronakpremjani",
    sourceLink: "https://github.com/ronakpremjani/ronakpremjani"
  }
];

export const FeaturedWork = () => {
  const sectionRef = useRef(null);

  // Apply text reveal for heading
  useTextReveal(sectionRef, '.reveal-text');

  return (
    <section id="work" ref={sectionRef} className="py-24 md:py-32 bg-[#1A2A40] text-[#E5DFD3] overflow-hidden border-b border-[#E5DFD3]/10 relative z-10">
      {/* Background Radial Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center opacity-20">
         <div className="w-[800px] h-[800px] border border-[#E5DFD3]/10 rounded-full absolute" />
         <div className="w-[1200px] h-[1200px] border border-[#E5DFD3]/5 rounded-full absolute" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs tracking-[0.2em] text-[#8C2B3D] uppercase">
              // 02. Selected Projects
            </span>
            <h2 className="reveal-text text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#E5DFD3] leading-tight">
              Made with <br/> Passion
            </h2>
          </div>
          
          <div className="hidden md:block">
            <p className="font-serif italic text-xl text-[#E5DFD3]/70 max-w-[200px] text-right">
              These folks are talented *
            </p>
          </div>
        </div>
        
        <div className="mt-8 mb-16 md:mb-24">
          <WorkCarousel projects={projects.slice(0, 3)} />
        </div>
        
        <div className="flex justify-center w-full relative z-20">
          <Link 
            to="/work" 
            className="group relative inline-flex items-center justify-center px-8 py-3 font-semibold bg-white text-[#1A2A40] transition-all duration-200 rounded-full hover:bg-[#8C2B3D] hover:text-white"
          >
            <span>View All Projects</span>
            <svg 
              className="w-5 h-5 ml-2 -mr-1 transition-transform duration-200 group-hover:translate-x-1" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
};


