import React, { useRef, useState, useEffect } from 'react';

// Magnetic wrapper component (Dennis Snellenberg Style)
const Magnetic = ({ children, range = 0.35 }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    setPosition({ x: distanceX * range, y: distanceY * range });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return React.cloneElement(children, {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: {
      ...children.props.style,
      transform: `translate3d(${x}px, ${y}px, 0)`,
      transition: x === 0 && y === 0 
        ? 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' 
        : 'transform 0.08s linear'
    }
  });
};

const navItems = [
  { label: 'Perspective', id: 'perspective' },
  { label: 'Case Files', id: 'case-files' },
  { label: 'Toolkit', id: 'toolkit' },
  { label: 'Contact', id: 'contact' }
];

const projects = [
  {
    title: 'Employee Management System',
    category: 'Architecture & Fullstack',
    year: '2026',
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)'
  },
  {
    title: 'API Gateway Service',
    category: 'Backend & Devops',
    year: '2025',
    gradient: 'linear-gradient(135deg, #312e81 0%, #4f46e5 100%)'
  },
  {
    title: 'Content Management Platform',
    category: 'Database & CMS',
    year: '2025',
    gradient: 'linear-gradient(135deg, #14532d 0%, #22c55e 100%)'
  }
];

export const Landing = () => {
  // Custom cursor refs
  const dotRef = useRef(null);
  const viewRef = useRef(null);

  const [activeSection, setActiveSection] = useState('hero');
  const [showStickyBurger, setShowStickyBurger] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timeString, setTimeString] = useState('');
  
  // Follow cursor project preview state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeProjectIndex, setActiveProjectIndex] = useState(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  // Sticky burger scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowStickyBurger(true);
      } else {
        setShowStickyBurger(false);
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update dynamic clock for India timezone
  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      };
      setTimeString(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProjectMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <main className="w-full bg-[#eae9e9] text-[#1c1d20] font-sans scroll-smooth relative overflow-x-hidden">
      
      {/* ══════ Circular Sticky Burger Button ══════ */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
        className={`fixed right-[5%] top-8 w-14 h-14 bg-[#1c1d20] border-0 hover:bg-[#455ce9] rounded-full flex items-center justify-center z-50 transition-all duration-500 scale-100 hover:scale-105 active:scale-95 cursor-pointer shadow-lg ${
          showStickyBurger ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-50 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-[5px] justify-center items-center pointer-events-none">
          <span className={`block h-[1px] bg-[#eae9e9] transition-all duration-300 ${
            isMenuOpen ? 'w-5 rotate-45 translate-y-[3px]' : 'w-5'
          }`} />
          <span className={`block h-[1px] bg-[#eae9e9] transition-all duration-300 ${
            isMenuOpen ? 'w-5 -rotate-45 -translate-y-[3px]' : 'w-5'
          }`} />
        </div>
      </button>

      {/* Side Menu Drawer Overlay Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/45 z-30 transition-opacity duration-500 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* ══════ Side Drawer Menu ══════ */}
      <aside
        className={`fixed right-0 top-0 bottom-0 w-[290px] sm:w-[380px] bg-[#1c1d20] text-[#eae9e9] z-40 flex flex-col justify-between pt-32 pb-16 px-10 sm:px-12 transition-transform duration-500 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-6">
          <span className="font-mono text-[9px] tracking-[0.25em] text-[#999d9e] uppercase select-none">
            [ NAVIGATION ]
          </span>
          <nav className="flex flex-col gap-6 mt-4">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('hero');
                setIsMenuOpen(false);
              }}
              className="group flex items-baseline gap-4 py-1.5 cursor-pointer"
            >
              <span className={`font-mono text-[9.5px] ${activeSection === 'hero' ? 'text-white' : 'text-[#999d9e] group-hover:text-[#eae9e9]'}`}>
                00
              </span>
              <span className={`text-2xl lg:text-3xl font-light tracking-tight transition-colors duration-300 ${
                activeSection === 'hero' ? 'text-white' : 'text-[#999d9e] group-hover:text-white'
              }`}>
                Home
              </span>
            </a>
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.id;
              
              return (
                <a
                  key={item.label}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                    setIsMenuOpen(false);
                  }}
                  className="group flex items-baseline gap-4 py-1.5 cursor-pointer"
                >
                  <span className={`font-mono text-[9.5px] ${isActive ? 'text-white' : 'text-[#999d9e] group-hover:text-[#eae9e9]'}`}>
                    0{(idx + 1)}
                  </span>
                  <span className={`text-2xl lg:text-3xl font-light tracking-tight transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-[#999d9e] group-hover:text-white'
                  }`}>
                    {item.label}
                  </span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Drawer Footer info */}
        <div className="flex flex-col gap-2 font-mono text-[9px] tracking-[0.15em] text-[#999d9e] uppercase">
          <div>LOC. NEW DELHI, IN // {timeString}</div>
          <div>© {new Date().getFullYear()} RONAK PREMJANI</div>
        </div>
      </aside>

      {/* ══════ Global Fixed Header ══════ */}
      <header
        className="absolute left-[8%] right-[8%] top-8 flex justify-between items-start z-30 pointer-events-none select-none"
      >
        {/* Author / Title */}
        <Magnetic range={0.25}>
          <div 
            className="flex items-center gap-1.5 pointer-events-auto cursor-pointer font-sans"
            onClick={() => scrollToSection('hero')}
          >
            <span className="text-[14px] font-semibold tracking-tight text-[#1c1d20]">
              © Code by Ronak
            </span>
          </div>
        </Magnetic>

        {/* Time / Location */}
        <div className="hidden md:flex flex-col items-center">
          <span className="font-mono text-[9.5px] tracking-[0.18em] text-text-secondary uppercase">
            New Delhi, India // {timeString}
          </span>
        </div>

        {/* Navigation links (Cover status) */}
        <nav className={`hidden lg:flex items-center gap-8 pointer-events-auto transition-all duration-500 ${
          showStickyBurger ? 'opacity-0 -translate-y-2 pointer-events-none' : 'opacity-100 translate-y-0'
        }`}>
          {navItems.map((item) => (
            <Magnetic key={item.label} range={0.3}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className="group relative py-1 flex flex-col items-center cursor-pointer"
              >
                <span className="font-sans text-[13px] font-medium text-[#1c1d20] hover:text-[#455ce9] transition-colors duration-300">
                  {item.label}
                </span>
                <span className="block w-[4px] h-[4px] bg-[#455ce9] rounded-full mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </Magnetic>
          ))}
        </nav>
      </header>

      {/* ══════ CHAPTER 01: HERO SECTION ══════ */}
      <section
        id="hero"
        className="relative h-screen w-full flex flex-col justify-between pt-36 pb-0"
      >
        <div className="px-[8%] flex flex-col lg:flex-row justify-between items-start lg:items-end w-full h-[60%] lg:h-[70%]">
          {/* Main Statement Title */}
          <div className="max-w-[36rem] z-10 flex flex-col gap-4">
            {/* Spinning Globe indicator */}
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 animate-spin text-[#455ce9]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" strokeDasharray="6 6" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                <path d="M2 12h20" />
              </svg>
              <span className="font-mono text-[9px] tracking-[0.2em] text-[#455ce9] uppercase font-bold">
                Located in India
              </span>
            </div>
            <h1 className="font-heading font-semibold text-4xl lg:text-[3.25rem] text-[#1c1d20] tracking-tight leading-[1.15]">
              Software Architect <br />
              & Full-Stack Developer.
            </h1>
          </div>

          {/* Portrait frame container */}
          <div className="absolute right-[8%] top-[16%] w-[290px] h-[360px] lg:w-[350px] lg:h-[440px] bg-[#d5d4d4] overflow-hidden shadow-2xl flex items-center justify-center select-none pointer-events-auto">
            <img 
              src="/engineer_portrait.png" 
              alt="Portrait" 
              className="w-full h-full object-cover filter grayscale contrast-110 hover:scale-105 transition-transform duration-[1.5s] ease-out" 
            />
          </div>
        </div>

        {/* Huge Scrolling Banner Marquee (Dennis Snellenberg Ticker) */}
        <div className="w-full overflow-hidden whitespace-nowrap select-none pointer-events-none pb-4 relative z-10">
          <div className="flex w-[200%] border-b border-border-color pb-4">
            <div className="animate-marquee font-heading text-[12vw] font-medium uppercase text-[#1c1d20] tracking-tighter leading-none pr-8">
              Ronak Premjani — Developer — Architect —&nbsp;
            </div>
            <div className="animate-marquee font-heading text-[12vw] font-medium uppercase text-[#1c1d20] tracking-tighter leading-none pr-8">
              Ronak Premjani — Developer — Architect —&nbsp;
            </div>
          </div>
        </div>
      </section>

      {/* ══════ CHAPTER 02: ABOUT / INTRODUCTION SECTION ══════ */}
      <section
        id="perspective"
        className="relative min-h-screen w-full flex flex-col justify-center py-28 lg:py-36 px-[8%] bg-[#f5f5f5] border-b border-border-color"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 w-full items-start">
          {/* Section Marker */}
          <div className="lg:col-span-3 flex flex-col gap-2">
            <span className="font-mono text-[10px] tracking-[0.2em] text-text-muted uppercase">
              // 01. Perspective
            </span>
          </div>

          {/* High-impact Intro copy */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <p className="font-sans font-light text-2xl lg:text-3xl text-[#1c1d20] tracking-tight leading-[1.4] select-text">
              Helping teams build robust backend architectures, scalable database schemas, and highly polished user interfaces. Together, we define clean engineering guidelines and build durable systems.
            </p>
          </div>

          {/* Magnetic CTA round button */}
          <div className="lg:col-span-3 flex justify-start lg:justify-end">
            <Magnetic range={0.35}>
              <div 
                className="w-40 h-40 bg-[#1c1d20] hover:bg-[#455ce9] transition-colors duration-300 rounded-full flex items-center justify-center text-[#eae9e9] font-sans text-[14px] font-medium tracking-wide cursor-pointer shadow-lg"
                onClick={() => scrollToSection('case-files')}
              >
                Selected Work
              </div>
            </Magnetic>
          </div>
        </div>

        {/* Split Grid Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mt-28 border-t border-border-color pt-16">
          <div className="lg:col-span-3">
            <span className="font-mono text-[9px] tracking-[0.2em] text-[#999d9e] uppercase">
              Core values
            </span>
          </div>
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-8 text-[15px] leading-relaxed text-text-secondary select-text">
            <div>
              <h4 className="font-semibold text-[#1c1d20] mb-3 text-lg">Understanding Before Building</h4>
              <p className="font-light">Restraint begins with comprehension. We do not write code to discover the problem; we write code once the problem is solved in thought. Code is the byproduct of clarity.</p>
            </div>
            <div>
              <h4 className="font-semibold text-[#1c1d20] mb-3 text-lg">Simplicity Over Cleverness</h4>
              <p className="font-light">Clever code is a technical liability. True engineering craftsmanship lies in choosing the most obvious, readable, and boring solution. A system should be easy to understand.</p>
            </div>
            <div>
              <h4 className="font-semibold text-[#1c1d20] mb-3 text-lg">Systems Over Features</h4>
              <p className="font-light">Features do not exist in isolation. Every addition must respect, protect, and integrate seamlessly into the overall system architecture. We build cohesive software ecosystems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ CHAPTER 03: SELECTED WORK SECTION ══════ */}
      <section
        id="case-files"
        className="relative min-h-screen w-full py-28 lg:py-36 px-[8%] bg-[#eae9e9] relative"
        onMouseMove={handleProjectMouseMove}
      >
        {/* Section Header */}
        <div className="mb-14">
          <span className="font-mono text-[10px] tracking-[0.2em] text-text-muted uppercase">
            // 02. Selected Work
          </span>
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-[#1c1d20] mt-3">
            Recent Projects
          </h2>
        </div>

        {/* Selected Work Rows container */}
        <div className="flex flex-col border-b border-border-color">
          {projects.map((proj, idx) => (
            <div
              key={proj.title}
              onMouseEnter={() => setActiveProjectIndex(idx)}
              onMouseLeave={() => setActiveProjectIndex(null)}
              onClick={() => scrollToSection('contact')}
              className="py-10 lg:py-14 flex flex-col md:flex-row justify-between items-start md:items-center border-t border-border-color hover:opacity-40 transition-opacity duration-300 cursor-pointer select-none"
            >
              <h3 className="text-2xl lg:text-3xl font-light text-[#1c1d20] tracking-tight">
                {proj.title}
              </h3>
              <div className="flex gap-12 items-center mt-4 md:mt-0 font-mono text-[11px] uppercase tracking-wider text-text-secondary">
                <span>{proj.category}</span>
                <span>{proj.year}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ══════ Cursor Follow Preview Card ══════ */}
        <div
          className="fixed pointer-events-none z-50 rounded-lg overflow-hidden transition-all duration-300 ease-out select-none shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
          style={{
            left: mousePosition.x - 160,
            top: mousePosition.y - 110,
            width: '320px',
            height: '220px',
            transform: `scale(${activeProjectIndex !== null ? 1 : 0})`,
            opacity: activeProjectIndex !== null ? 1 : 0,
            transition: 'transform 0.4s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.3s'
          }}
        >
          <div 
            className="w-full h-full flex flex-col transition-transform duration-500 ease-in-out"
            style={{ transform: `translateY(-${activeProjectIndex * 100}%)` }}
          >
            {projects.map((proj, idx) => (
              <div 
                key={idx}
                className="w-full h-full flex items-center justify-center text-white font-mono text-xs uppercase font-medium tracking-[0.2em]"
                style={{ background: proj.gradient }}
              >
                [ {proj.title} ]
              </div>
            ))}
          </div>
        </div>

        {/* Grid outline detailing toolkit */}
        <div id="toolkit" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mt-28 border-t border-border-color pt-16">
          <div className="lg:col-span-3">
            <span className="font-mono text-[10px] tracking-[0.2em] text-text-muted uppercase">
              // 03. Development Toolkit
            </span>
          </div>
          <div className="lg:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-8 select-text">
            <div>
              <h5 className="font-semibold text-text-primary text-[14px] uppercase tracking-wider mb-4">Backend</h5>
              <div className="flex flex-col gap-2 text-text-secondary text-sm">
                <span>Node.js / Express</span>
                <span>REST / GraphQL APIs</span>
                <span>Distributed Architectures</span>
              </div>
            </div>
            <div>
              <h5 className="font-semibold text-text-primary text-[14px] uppercase tracking-wider mb-4">Databases</h5>
              <div className="flex flex-col gap-2 text-text-secondary text-sm">
                <span>MongoDB / Mongoose</span>
                <span>PostgreSQL</span>
                <span>Redis (Cache & DAG)</span>
              </div>
            </div>
            <div>
              <h5 className="font-semibold text-text-primary text-[14px] uppercase tracking-wider mb-4">Frontend</h5>
              <div className="flex flex-col gap-2 text-text-secondary text-sm">
                <span>React / Single-Page Apps</span>
                <span>Tailwind CSS</span>
                <span>Vite Bundler</span>
              </div>
            </div>
            <div>
              <h5 className="font-semibold text-text-primary text-[14px] uppercase tracking-wider mb-4">Practices</h5>
              <div className="flex flex-col gap-2 text-text-secondary text-sm">
                <span>Precision Engineering</span>
                <span>API Design & Outboxes</span>
                <span>Performance Optimization</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ CHAPTER 04: FOOTER SECTION (CTA & Socials) ══════ */}
      <section
        id="contact"
        className="relative bg-[#1c1d20] text-[#eae9e9] py-28 lg:py-36 px-[8%]"
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 border-b border-border-color/30 pb-20">
          {/* Giant Title CTA */}
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-gray-500 overflow-hidden rounded-full flex items-center justify-center shadow-lg border border-white/20 select-none">
              <img src="/engineer_portrait.png" alt="Profile" className="w-full h-full object-cover grayscale" />
            </div>
            <h2 className="font-heading font-light text-5xl lg:text-[4.5rem] tracking-tight leading-none text-white">
              Let's work <br />
              together.
            </h2>
          </div>

          {/* Magnetic Giant Button */}
          <Magnetic range={0.45}>
            <a
              href="mailto:hello@example.com"
              className="w-48 h-48 bg-[#455ce9] hover:bg-[#3346c8] transition-colors duration-300 rounded-full flex items-center justify-center text-white text-[15px] font-medium tracking-wide shadow-lg cursor-pointer border border-transparent select-none z-10"
            >
              Get in touch
            </a>
          </Magnetic>
        </div>

        {/* Footer Base grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-14 items-center">
          {/* Left block info */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 text-sm text-[#999d9e] font-sans">
            <a href="mailto:hello@example.com" className="hover:text-white transition-colors duration-300">
              hello@example.com
            </a>
            <a href="tel:+919999999999" className="hover:text-white transition-colors duration-300">
              +91 99999 99999
            </a>
          </div>

          {/* Right block socials */}
          <div className="flex justify-start lg:justify-end gap-8 text-[13px] font-mono tracking-wider text-[#999d9e] uppercase select-none">
            <a href="#github" className="hover:text-white transition-colors duration-300">GitHub</a>
            <a href="#linkedin" className="hover:text-white transition-colors duration-300">LinkedIn</a>
            <a href="#resume" className="hover:text-white transition-colors duration-300">Resume</a>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Landing;
