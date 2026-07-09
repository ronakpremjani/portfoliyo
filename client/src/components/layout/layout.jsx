import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './navbar';
import { Compass, FileText, History, Send } from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { label: 'Perspective', path: '#perspective', icon: Compass },
  { label: 'Case Files', path: '#case-files', icon: FileText },
  { label: 'Evolution', path: '#evolution', icon: History },
  { label: 'Connect', path: '#connect', icon: Send },
];

export const Layout = ({ children }) => {
  const [activeItem, setActiveItem] = useState('');
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.95) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavItemClick = useCallback((e, path) => {
    setActiveItem(path);

    const targetElement = document.querySelector(path);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', path);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative">
      <a
        href="#main-content"
        className={cn(
          'sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]',
          'bg-white text-black px-4 py-2 rounded text-sm font-medium'
        )}
      >
        Skip to main content
      </a>

      <main className="flex-grow">
        {children}
      </main>

      <Navbar
        items={navItems}
        activeItem={activeItem}
        onItemClick={handleNavItemClick}
        className={cn(
          'transition-opacity duration-500',
          showNav ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      />
    </div>
  );
};

export default Layout;
