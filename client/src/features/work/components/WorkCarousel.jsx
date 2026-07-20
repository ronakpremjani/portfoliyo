import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const WorkCarousel = ({ projects }) => {
  // Create an artificially large array to simulate infinite looping
  // 100 copies ensures the user can swipe hundreds of times in either direction
  const extendedProjects = useMemo(() => Array(100).fill(projects).flat(), [projects]);
  
  // Start in the middle of the array
  const [currentIndex, setCurrentIndex] = useState(() => Math.floor(extendedProjects.length / 2));

  const handleDragEnd = (event, info) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      setCurrentIndex(prev => prev + 1);
    } else if (info.offset.x > threshold) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center overflow-visible" style={{ perspective: 1200 }}>
      {extendedProjects.map((project, index) => {
        const diff = index - currentIndex;
        const absDiff = Math.abs(diff);
        
        // Hide cards that are far away to keep DOM light
        // We only want 3 cards visible (center, one left, one right), so we hide if absDiff > 1
        if (absDiff > 1) return null;

        const isCurrent = diff === 0;
        
        // Calculate transforms
        const xOffset = diff * (window.innerWidth < 768 ? 120 : 250); // Distance between cards
        const rotateY = diff * -25; // Curved effect
        const zOffset = -absDiff * 100; // Push back non-current cards
        const scale = isCurrent ? 1 : 0.8;
        const opacity = isCurrent ? 1 : Math.max(1 - absDiff * 0.4, 0);
        const zIndex = 10 - absDiff;

        return (
          <motion.div
            key={`${project.title}-${index}`}
            className={`absolute w-[90%] md:w-full max-w-3xl h-full flex flex-col justify-end p-2 rounded-3xl overflow-visible cursor-pointer ${isCurrent ? 'ring-1 ring-[#E5DFD3]/20' : ''}`}
            style={{
              transformStyle: "preserve-3d",
              zIndex
            }}
            initial={false}
            animate={{
              x: xOffset,
              rotateY: rotateY,
              z: zOffset,
              scale: scale,
              opacity: opacity,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
            }}
            onClick={() => {
              if (diff === 1) setCurrentIndex(prev => prev + 1);
              else if (diff === -1) setCurrentIndex(prev => prev - 1);
            }}
            drag={isCurrent ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            {/* Card Background (Placeholder Image) */}
            <div className="absolute inset-0 bg-[#E5DFD3] rounded-2xl overflow-hidden border border-[#1A2A40]/10">
                {/* Fallback pattern if no image */}
                <div className="w-full h-full opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1A2A40] to-transparent" />
                
                {/* Simulated media content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-30 text-[#1A2A40] pointer-events-none">
                  <span className="text-2xl md:text-4xl font-serif italic mb-4">{project.title.split(' ')[0]}</span>
                </div>
            </div>

            {/* Content Container (Neon Bottom Bar) */}
            <div className="relative z-10 w-full bg-[#8C2B3D] rounded-xl flex items-center justify-between p-3 md:p-4 mt-auto text-[#E5DFD3]">
              <h3 className="text-lg md:text-2xl font-bold tracking-tight">{project.title}</h3>
              
              <div className="flex items-center gap-2 md:gap-3">
                <span className="hidden md:inline-block text-[10px] md:text-xs font-semibold uppercase tracking-widest border-b border-[#E5DFD3] pb-0.5">
                  {project.techStack?.length || 0} RESOURCES USED
                </span>
                <div className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-[#E5DFD3] flex items-center justify-center text-[#8C2B3D]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="md:w-3.5 md:h-3.5 w-2.5 h-2.5">
                    <line x1="12" y1="3" x2="12" y2="21"></line>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="5.636" y1="5.636" x2="18.364" y2="18.364"></line>
                    <line x1="18.364" y1="5.636" x2="5.636" y2="18.364"></line>
                  </svg>
                </div>
              </div>
            </div>

            {/* Floating Tags (Only visible when current) */}
            <AnimatePresence>
              {isCurrent && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.2 }}
                  className="absolute -bottom-8 md:-bottom-12 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none"
                >
                  {project.techStack?.slice(0, 3).map((tech, i) => (
                    <span key={i} className="px-2 py-1 md:px-3 md:py-1.5 rounded-full bg-[#E5DFD3] text-[#1A2A40] text-[9px] md:text-[10px] font-mono border border-[#1A2A40]/20 shadow-lg whitespace-nowrap">
                      @{tech.toUpperCase()}
                    </span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        );
      })}
    </div>
  );
};
