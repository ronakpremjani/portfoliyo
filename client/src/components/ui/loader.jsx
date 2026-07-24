import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenisContext } from '../../app/app';

let hasVisitedThisSession = false;

export const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isLoading, setIsLoading] = useState(() => !hasVisitedThisSession);
  const [isScrollLocked, setIsScrollLocked] = useState(() => !hasVisitedThisSession);
  const { lenis } = useLenisContext();
  
  const canvasRef = useRef(null);
  const progressRef = useRef(0);

  // Lock body scroll while loading
  useEffect(() => {
    if (isScrollLocked) {
      window.scrollTo(0, 0);
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.touchAction = 'none';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.documentElement.style.touchAction = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.documentElement.style.touchAction = '';
    };
  }, [isScrollLocked]);

  // Handle the progress incrementing
  useEffect(() => {
    if (!isLoading) return;

    if (lenis) lenis.stop();
    
    const interval = setInterval(() => {
      progressRef.current += Math.floor(Math.random() * 8) + 2;
      if (progressRef.current >= 100) {
        progressRef.current = 100;
        clearInterval(interval);
        
        // Trigger the NeoLeaf exit sequence
        setTimeout(() => setIsExiting(true), 200); // Small hold at 100%
        setTimeout(() => {
          setIsLoading(false);
          hasVisitedThisSession = true;
          
          // 2 second pause before unlocking scrolling
          setTimeout(() => {
            setIsScrollLocked(false);
            if (lenis) lenis.start();
          }, 2000);
        }, 1200); // Wait for exit animation to finish
      }
      setProgress(progressRef.current);
    }, 80);

    return () => {
      clearInterval(interval);
      if (lenis) lenis.start();
    };
  }, [lenis, isLoading]);

  // Handle the Canvas rendering
  useEffect(() => {
    if (!isLoading) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let phase = 0;
    let visualProgress = 0; // For smooth interpolation
    
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    window.addEventListener('resize', resize);
    resize();

    const render = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      
      ctx.clearRect(0, 0, width, height);

      // Smoothly interpolate the wave's rising height (lerp)
      const targetProgress = progressRef.current / 100;
      visualProgress += (targetProgress - visualProgress) * 0.08;

      // 1. Draw the dimmed text
      ctx.globalCompositeOperation = 'source-over';
      const fontFamily = window.getComputedStyle(document.body).fontFamily || 'sans-serif';
      const fontSize = width > 1024 ? '110px' : width > 768 ? '80px' : '40px';
      ctx.font = `800 ${fontSize} ${fontFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(229, 223, 211, 0.15)'; // Dimmed Khaki
      ctx.fillText('RONAK PREMJANI', width / 2, height / 2);

      // 2. Draw the liquid wave
      ctx.fillStyle = '#E5DFD3'; // Bright Khaki
      ctx.beginPath();
      ctx.moveTo(0, height);
      
      const amplitude = width > 768 ? 50 : 25;
      // When visualProgress is 0, wave is below screen. When 100, wave is above screen.
      const baseY = height - (height * visualProgress);
      
      for (let x = 0; x <= width; x += 5) {
        // NeoLeaf 3-sine wave formula
        const wave = Math.sin(0.02 * x + phase) * Math.sin(0.01 * x + phase) * Math.sin(0.05 * x + phase) * amplitude;
        ctx.lineTo(x, baseY - wave);
      }
      
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();

      // 3. Mask everything to the text shape
      ctx.globalCompositeOperation = 'destination-in';
      ctx.fillText('RONAK PREMJANI', width / 2, height / 2);

      phase += 0.05;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[999] flex select-none items-center justify-center bg-[#1A2A40] text-center text-[#E5DFD3]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div 
            className="relative w-full max-w-[80%] md:max-w-[70%] lg:max-w-[740px] xl:max-w-[965px]"
            animate={isExiting ? { scale: 6, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* The Box */}
            <motion.div 
              className="relative aspect-[962/192] w-full flex items-center justify-center overflow-hidden"
            >
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
