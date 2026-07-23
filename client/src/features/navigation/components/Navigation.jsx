import React, { useState, memo, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLenisContext } from '../../../app/app';
import { MagneticButton } from '../../../components/ui/MagneticButton';

const navItems = [
  { label: 'Home', path: '/', id: 'hero' },
  { label: 'My Journey', path: '/journey', id: null },
  { label: 'My Expertise', path: '/expertise', id: null },
  { label: 'Dev Toolkit', path: '/devtoolkit', id: null },
  { label: 'Made with Passion', path: '/work', id: null },
  { label: 'Let\'s Connect', path: '/', id: 'contact' }
];

export const Navigation = memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollTo, lenis } = useLenisContext();
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const location = useLocation();

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = '';
      lenis?.start();
    }
    
    return () => {
      document.body.style.overflow = '';
      lenis?.start();
    };
  }, [mobileMenuOpen, lenis]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  const handleNavigation = (item) => {
    setMobileMenuOpen(false);
    
    // If it's a dedicated page route (no anchor ID)
    if (!item.id) {
      navigate(item.path);
      return;
    }
    
    // If it requires scrolling to an ID
    if (location.pathname === item.path) {
      // Already on the right page, just scroll
      scrollTo(`#${item.id}`);
    } else {
      // Navigate to the page first, then scroll after it renders
      navigate(item.path);
      setTimeout(() => {
        scrollTo(`#${item.id}`);
      }, 300);
    }
  };

  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 w-full z-40 p-6 md:p-10 flex items-start justify-between text-white mix-blend-difference pointer-events-none"
        initial={{ y: "0%" }}
        animate={{ y: isHidden ? "-100%" : "0%" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        
        {/* Left Side: Copyright Logo — Dennis Snellenberg horizontal slide */}
        <div 
          className="font-sans text-lg md:text-2xl font-medium tracking-wide pointer-events-auto cursor-pointer group select-none overflow-hidden"
          onClick={() => handleNavigation({ path: '/', id: 'hero' })}
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
              key={item.label}
              onClick={() => handleNavigation(item)}
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
          onClick={() => setMobileMenuOpen(true)}
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
      </motion.header>

      {/* Floating Magnetic Burger Button */}
      <motion.div
        className="fixed top-6 right-6 md:top-10 md:right-10 z-50 pointer-events-auto mix-blend-difference"
        initial={{ scale: 0 }}
        animate={{ scale: isHidden || mobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <MagneticButton
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-16 h-16 md:w-20 md:h-20 bg-transparent rounded-full flex items-center justify-center group"
        >
          {/* Inner circle background that scales up on hover */}
          <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-[0.76,0,0.24,1]" />
          
          {/* Burger / Close Icon */}
          <div className="relative w-6 md:w-8 h-4 flex flex-col justify-between items-center z-10 overflow-hidden">
             <span className={`block w-full h-[2px] bg-white transition-all duration-300 ease-out origin-center ${mobileMenuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
             <span className={`block w-full h-[2px] bg-white transition-all duration-300 ease-out origin-center ${mobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </div>
        </MagneticButton>
      </motion.div>

      {/* Sidebar Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-30 bg-[#1A2A40]/40 backdrop-blur-sm pointer-events-auto"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Sidebar Container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="fixed top-0 right-0 h-screen w-full md:w-[450px] z-40 bg-[#1A2A40] flex flex-col items-center justify-center pointer-events-auto shadow-2xl"
            >
              <nav className="flex flex-col gap-8 font-heading text-5xl md:text-6xl uppercase font-semibold text-center w-full tracking-tighter text-[#E5DFD3]">
                {navItems.map((item, i) => (
                  <div key={item.label} className="overflow-hidden">
                    <motion.button
                      onClick={() => handleNavigation(item)}
                      initial={{ x: "20%", opacity: 0 }}
                      animate={{ x: "0%", opacity: 1 }}
                      exit={{ x: "20%", opacity: 0 }}
                      transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                      className="w-full text-[#E5DFD3] hover:text-[#8C2B3D] transition-colors group flex justify-center"
                    >
                      <span className="relative inline-block">
                        {/* Hover dot for menu (positioned at start of word) */}
                        <span className="absolute -left-6 md:-left-8 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 bg-[#8C2B3D] rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out origin-center" />
                        {item.label}
                      </span>
                    </motion.button>
                  </div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
});
