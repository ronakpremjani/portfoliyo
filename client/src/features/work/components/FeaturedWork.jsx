import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../../components/ui/Container';
import { useTextReveal } from '../../../hooks/useTextReveal';
import { WorkCarousel } from './WorkCarousel';

const projects = [
  {
    title: "Portfolio CMS Architecture",
    overview: "A highly optimized headless CMS built from the ground up to serve developer portfolios with zero latency.",
    challenge: "Developers often rely on bloated CMS platforms or manual Markdown files, making seamless content updates and media management across different clients unnecessarily complex and slow.",
    solution: "Architected a custom headless CMS featuring real-time data sync, a robust GraphQL layer, and automated deployment webhooks. The system is designed to trigger static builds instantly upon content publishing.",
    features: ["Real-time Data Sync", "GraphQL API", "Automated Webhooks", "Custom Dashboard UI"],
    techStack: ["Node.js", "GraphQL", "MongoDB", "Redis", "React"],
    results: "Reduced content update workflow time by 80% and achieved a 99.9% cache hit ratio on the edge layer.",
    lessons: "Mastered the intricacies of cache invalidation strategies and optimizing GraphQL resolvers for deep relational queries.",
    demoLink: "#",
    sourceLink: "#"
  },
  {
    title: "Enterprise Analytics Dashboard",
    overview: "A high-performance financial analytics dashboard processing and visualizing massive datasets in real-time.",
    challenge: "Rendering millions of data points on the client-side was causing severe main-thread blocking, leading to an unresponsive UI and poor user experience for enterprise clients.",
    solution: "Implemented WebGL for hardware-accelerated data visualization and aggressive client-side caching. Offloaded heavy data transformation to Web Workers to keep the UI thread completely unblocked.",
    features: ["WebGL Rendering", "Web Worker Processing", "Real-time WebSockets", "Custom Charting"],
    techStack: ["TypeScript", "WebGL", "React", "PostgreSQL", "Go"],
    results: "Achieved a consistent 60fps rendering performance for datasets exceeding 5 million rows, eliminating UI freezing.",
    lessons: "Deepened my understanding of browser memory management, garbage collection pausing, and WebGL context limitations.",
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
    overview: "Generate stunning images from text prompts using Stable Diffusion.",
    techStack: ["Python", "PyTorch", "React", "FastAPI"],
    demoLink: "#",
    sourceLink: "#"
  }
];

export const FeaturedWork = () => {
  const sectionRef = useRef(null);

  // Apply text reveal for heading
  useTextReveal(sectionRef, '.reveal-text');

  return (
    <section id="work" ref={sectionRef} className="py-24 md:py-32 bg-[#1A2A40] text-[#E5DFD3] overflow-hidden border-b border-[#E5DFD3]/10 relative">
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


