import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../../../components/ui/container';

export const Hero = () => {
  const containerRef = useRef(null);

  // Signature Dennis Snellenberg / Awwwards text animation
  const textReveal = {
    hidden: { y: "120%", rotate: 2 },
    visible: (custom) => ({
      y: "0%",
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: [0.76, 0, 0.24, 1], // Custom snappy cubic-bezier
        delay: custom * 0.1
      }
    })
  };

  return (
    <section 
      id="hero" 
      className="relative w-full h-screen bg-[#E5DFD3] flex flex-col justify-between overflow-hidden pt-32 pb-0" 
      ref={containerRef}
    >
      {/* Massive Background Image Layer */}
      <motion.div 
        className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <motion.img  
          src="/ronak-portrait.png" 
          alt="" 
          className="w-full h-full object-cover object-[center_20%] grayscale opacity-100"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
        />
      </motion.div>

      <Container className="relative z-20 flex-1 flex flex-col justify-center pb-20">
        
        {/* Top right meta info, classic Dennis style */}
        <motion.div 
          className="absolute top-0 right-4 md:right-8 flex gap-8 font-sans text-xs md:text-sm font-medium uppercase tracking-widest text-[#8C2B3D]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="flex flex-col text-right">
            <span className="opacity-50">Located in</span>
            <span>Ahemdabad , India</span>
          </div>
          <div className="flex flex-col text-right hidden md:flex">
            <span className="opacity-50">Status</span>
            <span>Available for Work</span>
          </div>
        </motion.div>

        {/* Massive Split Typography */}
        <div className="relative z-20 flex flex-col w-full text-[#1A2A40] font-sans font-bold text-[15vw] md:text-[9rem] lg:text-[12rem] leading-[0.85] tracking-tighter mt-12 md:mt-0 md:-ml-8 lg:-ml-12">
          <div className="overflow-hidden pb-6 ml-0">
            <motion.div custom={1} initial="hidden" animate="visible" variants={textReveal} className="origin-bottom-left">
              Software
            </motion.div>
          </div>
          <div className="overflow-hidden pb-6 ml-0 md:ml-[3vw] lg:ml-[4vw]">
            <motion.div custom={2} initial="hidden" animate="visible" variants={textReveal} className="origin-bottom-left">
              Engineer
            </motion.div>
          </div>
          <div className="overflow-hidden pb-6 ml-0 md:ml-[6vw] lg:ml-[8vw]">
            <motion.div custom={3} initial="hidden" animate="visible" variants={textReveal} className="origin-bottom-left flex items-center gap-4 md:gap-8">
              <span className="text-[#8C2B3D] font-light">&</span> Product
            </motion.div>
          </div>
          <div className="overflow-hidden pb-6 ml-0 md:ml-[11vw] lg:ml-[17.5vw]">
            <motion.div custom={4} initial="hidden" animate="visible" variants={textReveal} className="origin-bottom-left">
              Builder
            </motion.div>
          </div>
        </div>
      </Container>

      {/* Floating Image of the User */}
      <motion.div 
        className="absolute bottom-16 right-0 md:right-[5%] w-[80vw] md:w-[45vw] lg:w-[35vw] max-w-[600px] z-10 pointer-events-none origin-bottom"
        initial={{ y: "100%", scale: 0.9, filter: "blur(10px)" }}
        animate={{ y: "0%", scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
      >
        <img 
          src="/ronak-portrait.png" 
          alt="Ronak Premjani" 
          className="w-full h-auto object-cover opacity-90 drop-shadow-2xl" 
        />
      </motion.div>
      
      {/* Infinite Scrolling Bottom Banner */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden border-t border-[#1A2A40]/10 py-4 md:py-6 z-30 bg-[#1A2A40]">
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
           <span className="text-[#E5DFD3] font-sans text-sm md:text-xl font-medium uppercase tracking-widest px-4 md:px-8">
             - Freelance Software Engineer - Product Builder - Available for Work - Open to Relocate - Freelance Software Engineer - Product Builder - Available for Work - Open to Relocate - 
           </span>
           <span className="text-[#E5DFD3] font-sans text-sm md:text-xl font-medium uppercase tracking-widest px-4 md:px-8">
             - Freelance Software Engineer - Product Builder - Available for Work - Open to Relocate - Freelance Software Engineer - Product Builder - Available for Work - Open to Relocate - 
           </span>
        </motion.div>
      </div>
    </section>
  );
};
