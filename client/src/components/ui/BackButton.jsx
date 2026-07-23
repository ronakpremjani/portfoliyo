import React from 'react';
import { Link } from 'react-router-dom';

export const BackButton = () => {
  return (
    <div className="fixed top-6 left-6 z-50">
      <Link 
        to="/" 
        className="flex items-center gap-2 px-4 py-2 bg-[#050505]/80 backdrop-blur-md border border-[#E5DFD3]/20 text-[#E5DFD3] rounded-full hover:bg-[#8C2B3D] hover:border-[#8C2B3D] transition-all duration-300 pointer-events-auto shadow-lg group"
      >
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="transform group-hover:-translate-x-1 transition-transform duration-300"
        >
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] mt-[2px]">Back</span>
      </Link>
    </div>
  );
};
