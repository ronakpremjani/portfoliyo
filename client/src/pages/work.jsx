import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen bg-[#0B0B0B] text-white selection:bg-[#B5F145] selection:text-[#0B0B0B]">
      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none flex items-center justify-center opacity-10">
         <div className="w-[1000px] h-[1000px] border border-white/10 rounded-full absolute" />
      </div>

      <main className="relative z-10 px-6 py-24 md:px-12 lg:px-24 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <Link to="/" className="inline-flex items-center text-brand-gray-light hover:text-[#B5F145] transition-colors mb-8 font-mono text-sm group">
            <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            All <span className="text-[#B5F145]">Projects</span>
          </h1>
          <p className="text-xl text-brand-gray-light max-w-2xl font-serif italic">
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
              transition={{ delay: index * 0.1 }}
              className="group bg-[#1A1A1A] border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 flex flex-col"
            >
              {/* Media Placeholder */}
              <div className="w-full h-48 bg-[#111] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <span className="font-serif italic text-2xl">{project.title.split(' ')[0]}</span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-3 group-hover:text-[#B5F145] transition-colors">
                  {project.title}
                </h3>
                <p className="text-brand-gray-light text-sm mb-6 flex-grow leading-relaxed">
                  {project.overview}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.techStack.map(tech => (
                    <span key={tech} className="px-2.5 py-1 rounded-md bg-black/50 text-white/70 text-[10px] font-mono border border-white/5">
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
  );
};

export default Work;
