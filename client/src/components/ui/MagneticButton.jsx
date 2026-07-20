import React, { useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

export const MagneticButton = ({ children, className = "", onClick }) => {
  const ref = useRef(null);
  
  // Spring configurations for ultra-smooth magnetic physics
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  
  const outerX = useSpring(0, springConfig);
  const outerY = useSpring(0, springConfig);

  const innerX = useSpring(0, springConfig);
  const innerY = useSpring(0, springConfig);

  const handleMouse = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    
    // Calculate distance from center of the button
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Outer circle moves heavily towards cursor
    outerX.set(middleX * 0.4);
    outerY.set(middleY * 0.4);

    // Inner text moves slightly less, creating a 3D parallax illusion
    innerX.set(middleX * 0.15);
    innerY.set(middleY * 0.15);
  };

  const reset = () => {
    outerX.set(0);
    outerY.set(0);
    innerX.set(0);
    innerY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: outerX, y: outerY }}
      className={`relative flex items-center justify-center cursor-pointer ${className}`}
      onClick={onClick}
    >
      <motion.div style={{ x: innerX, y: innerY }} className="relative z-10 w-full h-full flex items-center justify-center">
        {children}
      </motion.div>
    </motion.div>
  );
};
