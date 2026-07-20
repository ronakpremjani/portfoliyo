import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenisContext } from '../../../app/app';

const navItems = [
  { label: 'Work', id: 'work' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' }
];

export const Navigation = memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollTo } = useLenisContext();

  const handleScrollTo = (id) => {
    setMobileMenuOpen(false);
    scrollTo(`#${id}`);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 p-6 md:p-10 flex items-start justify-between text-white mix-blend-difference pointer-events-none">
        
        {/* Left Side: Copyright Logo — Dennis Snellenberg horizontal slide */}
        <div 
          className="font-sans text-lg md:text-2xl font-medium tracking-wide pointer-events-auto cursor-pointer group select-none overflow-hidden"
          onClick={() => handleScrollTo('hero')}
        >
          <motion.div
            className="flex items-center"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.6 }}
          >
            {/* © symbol — rotates 360° on hover */}
            <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:rotate-[360deg]">
              ©
            </span>

            {/* The overflow mask container */}
            <span className="relative overflow-hidden inline-flex ml-1.5">
              {/* 'Code by' — slides left out of view on hover */}
              <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:-translate-x-[4.2em]">
                Code by&nbsp;
              </span>

              {/* 'Ronak' + 'Premjani' container — slides left on hover */}
              <span className="inline-flex transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:-translate-x-[4.2em]">
                <span>Ronak</span>
                {/* 'Premjani' is positioned off-screen to the right, slides into view on hover */}
                <span className="absolute left-full whitespace-nowrap">&nbsp;Premjani</span>
              </span>
            </span>
          </motion.div>
        </div>

        {/* Right Side: Links — each with masked slide-up */}
        <nav className="hidden md:flex items-center gap-10 pointer-events-auto">
          {navItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              className="relative group flex flex-col items-center justify-center outline-none text-2xl font-sans font-medium tracking-wide overflow-hidden"
            >
              <motion.span 
                className="relative z-10 block"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.7 + i * 0.1 }}
              >
                {item.label}
              </motion.span>
              {/* Dennis Snellenberg Hover Dot */}
              <div className="absolute -bottom-3 w-1.5 h-1.5 bg-white rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-[0.76,0,0.24,1] origin-center" />
            </button>
          ))}
        </nav>

        {/* Mobile Menu Toggle — masked slide-up */}
        <button 
          className="md:hidden pointer-events-auto font-sans text-base font-medium tracking-wide group flex flex-col items-center justify-center relative outline-none overflow-hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <motion.span 
            className="block"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.7 }}
          >
            Menu
          </motion.span>
          <div className="absolute -bottom-3 w-1.5 h-1.5 bg-white rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
        </button>
      </header>

      {/* Mobile Menu Fullscreen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[#111] flex flex-col items-center justify-center pointer-events-auto"
          >
            <nav className="flex flex-col gap-8 font-heading text-5xl md:text-7xl uppercase font-semibold text-center w-full tracking-tighter text-white">
              {navItems.map((item, i) => (
                <div key={item.id} className="overflow-hidden">
                  <motion.button
                    onClick={() => handleScrollTo(item.id)}
                    initial={{ y: "100%", rotate: 2 }}
                    animate={{ y: "0%", rotate: 0 }}
                    exit={{ y: "100%", rotate: 2 }}
                    transition={{ delay: i * 0.1, duration: 1, ease: [0.76, 0, 0.24, 1] }}
                    className="w-full text-white hover:text-brand-gray-light transition-colors relative group"
                  >
                    {item.label}
                    {/* Hover dot for mobile menu */}
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-3 h-3 bg-white rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out origin-center" />
                  </motion.button>
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});
