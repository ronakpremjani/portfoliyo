import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Contact } from '../features/contact/components/Contact';
import { BackButton } from '../components/ui/BackButton';

// Mock data (in a real app, this would be fetched from a CMS or API)
const allProjects = [
  {
    title: "Employee Shop Management",
    overview: "A comprehensive management system for employees and shop inventory, built to streamline business operations.",
    techStack: ["React", "Node.js", "MongoDB", "Tailwind"],
    image: "https://opengraph.githubassets.com/1/ronakpremjani/employee-shop-management",
    demoLink: "https://luckystoreem.vercel.app",
    sourceLink: "https://github.com/ronakpremjani/employee-shop-management"
  },
  {
    title: "GitHub Profile & Portfolio",
    overview: "My personal GitHub repository containing my profile readme and portfolio configurations.",
    techStack: ["Markdown", "GitHub Actions", "React"],
    image: "https://opengraph.githubassets.com/1/ronakpremjani/ronakpremjani",
    demoLink: "https://github.com/ronakpremjani/ronakpremjani",
    sourceLink: "https://github.com/ronakpremjani/ronakpremjani"
  }
];

export const Work = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen text-[#E5DFD3] selection:bg-[#8C2B3D] selection:text-[#E5DFD3] font-sans bg-[#E5DFD3]">
      <BackButton />
      
      {/* SOLID WRAPPER (z-10) 
          This wrapper has a solid background and sits above the fixed Contact footer. 
          It scrolls naturally, covering the footer until the spacer is reached. */}
      <div className="relative z-10 w-full bg-[#1A2A40] min-h-screen">
        
        {/* Background Subtle Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center opacity-[0.03]">
           <div className="w-[1000px] h-[1000px] border border-[#E5DFD3] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>

        <main className="relative z-10 px-6 py-24 md:px-12 lg:px-24 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-20">
            <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] font-heading font-medium tracking-tight mb-6 leading-none">
              All <span className="text-[#8C2B3D]">Projects</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#E5DFD3]/70 max-w-2xl font-sans font-light">
              A comprehensive archive of things I've built, ranging from experimental prototypes to production-ready enterprise applications.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {allProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                className="group bg-[#1A2A40] border border-[#E5DFD3]/10 rounded-2xl overflow-hidden hover:border-[#8C2B3D]/50 hover:shadow-[0_0_30px_rgba(140,43,61,0.15)] transition-all duration-500 flex flex-col cursor-pointer"
              >
                {/* Media Image */}
                <div className="w-full h-56 bg-[#111] relative overflow-hidden">
                  <div className="absolute inset-0 opacity-40 bg-[#1A2A40] mix-blend-color z-10 group-hover:opacity-0 transition-opacity duration-500" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                </div>
                
                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-grow bg-[#1A2A40]">
                  <h3 className="text-2xl font-heading font-medium mb-3 group-hover:text-[#8C2B3D] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-[#E5DFD3]/60 text-sm md:text-base mb-8 flex-grow leading-relaxed font-light">
                    {project.overview}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.techStack.map(tech => (
                      <span key={tech} className="px-3 py-1.5 rounded-full bg-[#E5DFD3]/5 text-[#E5DFD3]/70 text-[10px] md:text-xs font-sans tracking-wide border border-[#E5DFD3]/10 group-hover:border-[#8C2B3D]/30 group-hover:text-[#E5DFD3] transition-colors duration-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>

      {/* Add the premium Contact footer to the work page too */}
      <Contact />
    </div>
  );
};

export default Work;
