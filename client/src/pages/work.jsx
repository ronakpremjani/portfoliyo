import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Contact } from '../features/contact/components/Contact';

// Mock data (in a real app, this would be fetched from a CMS or API)
const allProjects = [
  {
    title: "Portfolio CMS Architecture",
    overview: "A highly optimized headless CMS built from the ground up to serve developer portfolios with zero latency.",
    techStack: ["Node.js", "GraphQL", "MongoDB", "Redis", "React"],
    demoLink: "#",
    sourceLink: "#"
  },
  {
    title: "Enterprise Analytics Dashboard",
    overview: "A high-performance financial analytics dashboard processing and visualizing massive datasets in real-time.",
    techStack: ["TypeScript", "WebGL", "React", "PostgreSQL", "Go"],
    demoLink: "#",
    sourceLink: "#"
  },
  {
    title: "E-Commerce Checkout Flow",
    overview: "A seamless, high-conversion checkout experience for a modern lifestyle brand.",
    techStack: ["Next.js", "Tailwind", "Stripe", "Framer Motion"],
    demoLink: "#",
    sourceLink: "#"
  },
  {
    title: "Web3 NFT Marketplace",
    overview: "A decentralized application for minting and trading digital assets on the Ethereum blockchain.",
    techStack: ["Solidity", "Ethers.js", "React", "Hardhat"],
    demoLink: "#",
    sourceLink: "#"
  },
  {
    title: "AI Image Generator",
    overview: "Generate stunning images from text prompts using Stable Diffusion and a custom React frontend.",
    techStack: ["Python", "PyTorch", "React", "FastAPI"],
    demoLink: "#",
    sourceLink: "#"
  },
  {
    title: "Real-time Collaboration Tool",
    overview: "A workspace for remote teams featuring real-time document editing and video conferencing.",
    techStack: ["WebRTC", "Socket.io", "React", "Node.js"],
    demoLink: "#",
    sourceLink: "#"
  },
  {
    title: "Fintech Mobile App",
    overview: "A cross-platform mobile application for personal finance management and budget tracking.",
    techStack: ["React Native", "Expo", "Redux", "Firebase"],
    demoLink: "#",
    sourceLink: "#"
  },
  {
    title: "Open Source UI Library",
    overview: "A collection of accessible, highly customizable UI components built for modern web applications.",
    techStack: ["React", "Storybook", "Tailwind", "Jest"],
    demoLink: "#",
    sourceLink: "#"
  }
];

export const Work = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen text-[#E5DFD3] selection:bg-[#8C2B3D] selection:text-[#E5DFD3] font-sans bg-[#E5DFD3]">
      
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
            <Link to="/" className="inline-flex items-center text-[#E5DFD3]/60 hover:text-[#8C2B3D] transition-colors mb-8 font-sans text-sm group tracking-wider uppercase font-medium">
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" strokeWidth={2} />
              Back to Home
            </Link>
            
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
                {/* Media Placeholder */}
                <div className="w-full h-56 bg-[#111] relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#E5DFD3] to-transparent group-hover:opacity-40 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:scale-110 transition-transform duration-700 ease-out">
                    <span className="font-heading text-4xl tracking-tighter">{project.title.split(' ')[0]}</span>
                  </div>
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
