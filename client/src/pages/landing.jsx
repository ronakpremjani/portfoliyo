import React from 'react';

const navItems = [
  { index: '01', label: 'Perspective' },
  { index: '02', label: 'Case Files' },
  { index: '03', label: 'Toolkit' },
  { index: '04', label: 'Connect' }
];

export const Landing = () => {
  return (
    <main
      className="relative h-screen w-full overflow-hidden select-none bg-[#0c0d0e] text-[#e2e2d9] font-sans bg-dot-grid"
    >
      {/* ══════ Sub-grid lines ══════ */}
      {/* Vertical Rule Line on Left Margin (8%) */}
      <div
        className="absolute top-0 bottom-0 w-px bg-border-color origin-top"
        style={{
          left: '8%',
          animation: 'drawRuleY 2s cubic-bezier(0.2, 0, 0.2, 1) forwards'
        }}
      />
      {/* Horizontal Rule Line separating Header (12%) */}
      <div
        className="absolute left-0 right-0 h-px bg-border-color origin-left"
        style={{
          top: '12%',
          animation: 'drawRuleX 2s cubic-bezier(0.2, 0, 0.2, 1) forwards'
        }}
      />
      {/* Horizontal Rule Line separating Footer (84%) */}
      <div
        className="absolute left-0 right-0 h-px bg-border-color origin-left"
        style={{
          bottom: '16%',
          animation: 'drawRuleX 2s cubic-bezier(0.2, 0, 0.2, 1) forwards'
        }}
      />

      {/* ══════ Corner Intersection Ticks ══════ */}
      {/* Top Left (8%, 12%) */}
      <div className="absolute font-mono text-[10px] text-text-muted select-none pointer-events-none opacity-0"
        style={{
          left: 'calc(8% - 4px)',
          top: 'calc(12% - 7px)',
          animation: 'heroFadeIn 1.5s cubic-bezier(0.2, 0, 0.2, 1) 0.8s forwards'
        }}
      >
        +
      </div>
      {/* Top Right (92%, 12%) */}
      <div className="absolute font-mono text-[10px] text-text-muted select-none pointer-events-none opacity-0"
        style={{
          right: 'calc(8% - 4px)',
          top: 'calc(12% - 7px)',
          animation: 'heroFadeIn 1.5s cubic-bezier(0.2, 0, 0.2, 1) 0.8s forwards'
        }}
      >
        +
      </div>
      {/* Bottom Left (8%, 84%) */}
      <div className="absolute font-mono text-[10px] text-text-muted select-none pointer-events-none opacity-0"
        style={{
          left: 'calc(8% - 4px)',
          bottom: 'calc(16% - 7px)',
          animation: 'heroFadeIn 1.5s cubic-bezier(0.2, 0, 0.2, 1) 0.8s forwards'
        }}
      >
        +
      </div>
      {/* Bottom Right (92%, 84%) */}
      <div className="absolute font-mono text-[10px] text-text-muted select-none pointer-events-none opacity-0"
        style={{
          right: 'calc(8% - 4px)',
          bottom: 'calc(16% - 7px)',
          animation: 'heroFadeIn 1.5s cubic-bezier(0.2, 0, 0.2, 1) 0.8s forwards'
        }}
      >
        +
      </div>

      {/* ══════ Header Metadata ══════ */}
      <header
        className="absolute left-[10%] right-[10%] top-[4%] flex justify-between items-start opacity-0"
        style={{
          animation: 'heroFadeUp 1.5s cubic-bezier(0.2, 0, 0.2, 1) 0.4s forwards'
        }}
      >
        {/* Author / Title */}
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-[#e2e2d9]">
            RONAK PREMJANI
          </span>
          <span className="font-mono text-[9px] tracking-[0.15em] text-text-secondary">
            [ LOGBOOK.VOL.001 ]
          </span>
        </div>

        {/* Coordinates */}
        <div className="hidden md:flex flex-col items-center">
          <span className="font-mono text-[9px] tracking-[0.25em] text-text-muted">
            LAT. 28° 36' 36" N // LON. 77° 12' 32" E
          </span>
        </div>

        {/* System parameters */}
        <div className="flex flex-col items-end gap-1">
          <span className="font-mono text-[9px] tracking-[0.15em] text-text-muted">
            SYS.STATUS: <span className="text-[#a1a19a] font-normal">NOMINAL</span>
          </span>
          <span className="font-mono text-[9px] tracking-[0.15em] text-text-muted">
            INDEX: 0x90F_7
          </span>
        </div>
      </header>

      {/* ══════ Hero Central Canvas ══════ */}
      <section
        className="absolute left-[12%] right-[12%] top-[12%] bottom-[16%] flex flex-col justify-center items-start"
      >
        {/* Title Group */}
        <div className="max-w-[54rem]">
          {/* Section Marker */}
          <div
            className="font-mono text-[10px] tracking-[0.3em] text-[#7c7c72] uppercase mb-6 opacity-0"
            style={{
              animation: 'heroFadeUp 1.5s cubic-bezier(0.2, 0, 0.2, 1) 0.6s forwards'
            }}
          >
            // ENTRY 001.01 — ARCHITECTURAL HYPOTHESIS
          </div>

          {/* Headline */}
          <h1
            className="font-heading font-light italic leading-[1.1] text-[#e2e2d9] select-text opacity-0"
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 6.2rem)',
              letterSpacing: '-0.02em',
              animation: 'heroFadeUp 1.8s cubic-bezier(0.2, 0, 0.2, 1) 0.8s forwards'
            }}
          >
            The architecture <br />
            of restraint.
          </h1>

          {/* Subtitle / Paragraph */}
          <p
            className="mt-10 font-sans font-light leading-relaxed text-text-secondary select-text opacity-0"
            style={{
              fontSize: 'clamp(1rem, 1.2vw, 1.35rem)',
              maxWidth: '38rem',
              animation: 'heroFadeUp 1.8s cubic-bezier(0.2, 0, 0.2, 1) 1.1s forwards'
            }}
          >
            A physical and digital logbook documenting the systematic application of order, clarity, and precision to complex software systems. Every component here is validated by necessity, and integrity is maintained by what is left out.
          </p>
        </div>

        {/* Minor Tech Annotation */}
        <div
          className="absolute bottom-6 left-0 flex items-center gap-4 opacity-0"
          style={{
            animation: 'heroFadeUp 1.8s cubic-bezier(0.2, 0, 0.2, 1) 1.3s forwards'
          }}
        >
          <span className="h-[1px] w-6 bg-border-color" />
          <span className="font-mono text-[9px] tracking-[0.2em] text-text-muted uppercase">
            Axiom I — Simplicity is the pre-requisite for reliability.
          </span>
        </div>
      </section>

      {/* ══════ Bottom Centered Navigation ══════ */}
      <footer
        className="absolute left-[10%] right-[10%] bottom-[4%] flex justify-center items-center opacity-0"
        style={{
          animation: 'heroFadeUp 1.5s cubic-bezier(0.2, 0, 0.2, 1) 1.5s forwards'
        }}
      >
        <nav
          className="flex justify-center items-center gap-12 lg:gap-16"
          aria-label="Journal chapters"
        >
          {navItems.map((item, idx) => (
            <a
              key={item.label}
              href={`#${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={(e) => e.preventDefault()}
              className="group relative flex items-center gap-2 py-2 cursor-default"
            >
              {/* Technical Indicator */}
              <span className="font-mono text-[9px] text-text-muted transition-colors duration-500 group-hover:text-[#e2e2d9]">
                {item.index}
              </span>
              {/* Nav Title */}
              <span className="font-mono text-[11px] font-normal tracking-[0.15em] text-[#929288] uppercase transition-colors duration-500 group-hover:text-[#e2e2d9]">
                {item.label}
              </span>
              {/* Minimalist dot indicator on hover */}
              <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#d1d1c7] scale-x-0 transition-transform duration-500 origin-center group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
      </footer>
    </main>
  );
};

export default Landing;
