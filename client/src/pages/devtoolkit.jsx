import React from 'react';
import { Link } from 'react-router-dom';
import { Toolkit } from '../features/skills/components/Toolkit';
import { Contact } from '../features/contact/components/Contact';
import { BackButton } from '../components/ui/BackButton';

export const DevToolkit = () => {
  return (
    <div className="w-full bg-[#1A2A40] text-brand-black min-h-screen selection:bg-[#E5DFD3] selection:text-[#1A2A40]">
      {/* Unified Back Button */}
      <BackButton />

      <main>
        <div className="relative z-10 bg-[#1A2A40]">
          <Toolkit />
        </div>
        <Contact standalone={false} />
      </main>
    </div>
  );
};

export default DevToolkit;
