import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════════════
   RONAK PREMJANI PORTFOLIO
   Inspired by dennissnellenberg.com
   — White editorial, giant typography, premium interactions —
═══════════════════════════════════════════════════════════════ */

// ── Projects data ──────────────────────────────────────────────
const PROJECTS = [
  {
    id: 'proj-001',
    name: 'PayrollOS',
    category: 'Architecture & Fullstack Engineering',
    year: '2026',
    description: 'A multi-tenant HR platform handling attendance, payroll, and leave. Reduced processing time from 12 minutes to 47 seconds using BullMQ job queuing and CQRS-lite patterns.',
    color: '#e8e4dc',
  },
  {
    id: 'proj-002',
    name: 'API Sentinel',
    category: 'Backend Engineering & Distributed Systems',
    year: '2025',
    description: 'A custom API gateway unifying authentication and rate-limiting across 8 Node.js microservices — zero downtime migration, no commercial licensing.',
    color: '#dce4e8',
  },
  {
    id: 'proj-003',
    name: 'ContentVault',
    category: 'Database Design & Schema Engineering',
    year: '2025',
    description: 'Schema-validated headless CMS backed by MongoDB. Marketing team achieved full content autonomy within first sprint. Zero schema-breaking incidents in 6 months.',
    color: '#e4e8dc',
  },
];

const TECH_STACK = [
  'Node.js', 'Express.js', 'React', 'MongoDB', 'Redis',
  'BullMQ', 'Docker', 'PM2', 'Tailwind CSS', 'TypeScript',
  'PostgreSQL', 'Nginx', 'REST APIs', 'Mongoose', 'Vite',
];

const GREETINGS = ['Hello.', 'नमस्ते.', 'Bonjour.', 'Ciao.', 'Hola.', 'こんにちは.'];

// ── Loader ────────────────────────────────────────────────────
const Loader = ({ onDone }) => {
  const [greetingIdx, setGreetingIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.classList.add('is-loading');
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < GREETINGS.length) {
        setGreetingIdx(i);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          document.body.classList.remove('is-loading');
          setTimeout(onDone, 900);
        }, 300);
      }
    }, 380);
    return () => {
      clearInterval(interval);
      document.body.classList.remove('is-loading');
    };
  }, [onDone]);

  return (
    <div
      className={`ds-loader${done ? ' is-done' : ''}`}
      aria-hidden="true"
    >
      <span
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(2.5rem, 7vw, 6rem)',
          fontWeight: 300,
          color: '#fff',
          letterSpacing: '-0.03em',
          transition: 'opacity 0.2s ease',
        }}
      >
        {GREETINGS[greetingIdx]}
      </span>
    </div>
  );
};

// ── Custom Cursor ──────────────────────────────────────────────
const Cursor = () => {
  const dotRef = useRef(null);
  const viewRef = useRef(null);
  const pos = useRef({ x: -200, y: -200 });
  const raf = useRef(null);

  useEffect(() => {
    document.body.classList.add('has-custom-cursor');

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const tick = () => {
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(calc(${pos.current.x}px - 50%), calc(${pos.current.y}px - 50%))`;
      }
      if (viewRef.current) {
        viewRef.current.style.left = `${pos.current.x}px`;
        viewRef.current.style.top = `${pos.current.y}px`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    const onOver = (e) => {
      if (e.target.closest('a, button, [data-cursor]')) {
        document.body.classList.add('cursor-hover');
      }
      if (e.target.closest('[data-work-hover]')) {
        viewRef.current?.classList.add('is-visible');
      }
    };

    const onOut = (e) => {
      if (e.target.closest('a, button, [data-cursor]')) {
        document.body.classList.remove('cursor-hover');
      }
      if (e.target.closest('[data-work-hover]')) {
        viewRef.current?.classList.remove('is-visible');
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove('has-custom-cursor', 'cursor-hover');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="ds-cursor"
        aria-hidden="true"
        style={{ position: 'fixed', top: 0, left: 0 }}
      />
      <div
        ref={viewRef}
        className="ds-cursor-view"
        aria-hidden="true"
      >
        View
      </div>
    </>
  );
};

// ── Scroll reveal hook ─────────────────────────────────────────
const useScrollReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll('.ds-in-view');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('is-visible');
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
};

// ── Navigation ─────────────────────────────────────────────────
const Nav = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    setOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  return (
    <>
      {/* Top bar */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.5rem var(--margin-h)',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.04em',
            color: 'white',
            pointerEvents: 'all',
          }}
        >
          © Code by Ronak
        </span>

        <nav
          style={{
            display: 'flex',
            gap: '2.5rem',
            pointerEvents: 'all',
          }}
          aria-label="Primary navigation"
        >
          {['Work', 'About', 'Contact'].map((label) => (
            <button
              key={label}
              id={`nav-${label.toLowerCase()}`}
              onClick={() => scrollTo(label.toLowerCase())}
              data-cursor
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 400,
                color: 'white',
                letterSpacing: '0.01em',
                cursor: 'none',
              }}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      {/* Hamburger button */}
      <button
        id="hamburger-btn"
        onClick={() => setOpen(true)}
        data-cursor
        aria-label="Open menu"
        style={{
          position: 'fixed',
          top: '1.2rem',
          right: '1.2rem',
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: '#1c1d20',
          border: 'none',
          cursor: 'none',
          zIndex: 101,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '5px',
          transition: 'background 0.3s ease',
        }}
      >
        <span style={{ width: '18px', height: '1.5px', background: 'white', display: 'block', transition: 'all 0.3s' }} />
        <span style={{ width: '18px', height: '1.5px', background: 'white', display: 'block', transition: 'all 0.3s' }} />
      </button>

      {/* Drawer overlay */}
      <div
        className={`ds-drawer-overlay${open ? ' is-open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`ds-drawer${open ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Close button */}
        <button
          id="drawer-close-btn"
          onClick={() => setOpen(false)}
          data-cursor
          aria-label="Close menu"
          style={{
            position: 'absolute',
            top: '1.2rem',
            right: '1.2rem',
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'var(--color-accent)',
            border: 'none',
            cursor: 'none',
            color: 'white',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ✕
        </button>

        {/* Nav label */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.4)',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
            marginTop: '2rem',
          }}
        >
          Navigation
        </div>
        <div
          style={{
            width: '100%',
            height: '1px',
            background: 'rgba(255,255,255,0.1)',
            marginBottom: '2.5rem',
          }}
        />

        {/* Nav links */}
        <nav style={{ flex: 1 }}>
          {[
            { label: 'Home', id: 'hero' },
            { label: 'Work', id: 'work' },
            { label: 'About', id: 'about' },
            { label: 'Contact', id: 'contact' },
          ].map(({ label, id }, i) => (
            <button
              key={label}
              id={`drawer-nav-${id}`}
              onClick={() => scrollTo(id)}
              data-cursor
              style={{
                display: 'block',
                width: '100%',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(2.8rem, 6vw, 4rem)',
                fontWeight: 300,
                color: 'white',
                letterSpacing: '-0.03em',
                lineHeight: 1.2,
                cursor: 'none',
                transition: 'color 0.2s ease',
                padding: '0.25rem 0',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Socials */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            Socials
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { label: 'GitHub', href: 'https://github.com/ronakpremjani' },
              { label: 'LinkedIn', href: 'https://linkedin.com/in/ronakpremjani' },
              { label: 'Twitter', href: 'https://twitter.com/ronakpremjani' },
            ].map(({ label, href }) => (
              <a
                key={label}
                id={`social-${label.toLowerCase()}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

// ── Hero Section ───────────────────────────────────────────────
const HeroSection = ({ loaded }) => {
  const marqueeRef = useRef(null);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#8a9198',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}
    >
      {/* Location badge */}
      <div
        className={`ds-fade d-5`}
        style={{
          position: 'absolute',
          left: 'var(--margin-h)',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          background: '#1c1d20',
          borderRadius: '100px',
          padding: '0.8rem 1.2rem 0.8rem 1rem',
          zIndex: 10,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.4,
            }}
          >
            Located in<br />New Delhi, India
          </div>
        </div>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
          }}
        >
          🌐
        </div>
      </div>

      {/* Role label — top right */}
      <div
        className="ds-fade d-3"
        style={{
          position: 'absolute',
          right: 'var(--margin-h)',
          top: '50%',
          transform: 'translateY(-50%)',
          textAlign: 'right',
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.04em',
            marginBottom: '0.5rem',
          }}
        >
          ↘
        </div>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(1rem, 1.5vw, 1.4rem)',
            fontWeight: 300,
            color: 'white',
            lineHeight: 1.3,
          }}
        >
          Fullstack<br />
          Engineer & Developer
        </div>
      </div>

      {/* Central portrait / avatar block */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(380px, 40vw)',
          height: '70%',
          bottom: 0,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          zIndex: 5,
        }}
      >
        {/* Stylized RP monogram block as portrait placeholder */}
        <div
          style={{
            width: '100%',
            height: '85%',
            background: 'linear-gradient(180deg, rgba(100,110,120,0.3) 0%, rgba(60,70,80,0.6) 100%)',
            borderRadius: '200px 200px 0 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 300,
              fontSize: 'clamp(4rem, 10vw, 9rem)',
              color: 'rgba(255,255,255,0.15)',
              letterSpacing: '-0.05em',
              userSelect: 'none',
              lineHeight: 1,
            }}
          >
            RP
          </div>
        </div>
      </div>

      {/* Marquee name strip — at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          overflow: 'hidden',
          zIndex: 20,
        }}
      >
        <div
          ref={marqueeRef}
          style={{
            display: 'flex',
            whiteSpace: 'nowrap',
            animation: 'marquee-left 18s linear infinite',
            willChange: 'transform',
          }}
        >
          {/* Duplicate for seamless loop */}
          {[...Array(4)].map((_, ri) => (
            <React.Fragment key={ri}>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: 'clamp(4rem, 12vw, 12rem)',
                  color: 'white',
                  letterSpacing: '-0.04em',
                  lineHeight: 0.85,
                  paddingRight: '0.4em',
                  opacity: 0.95,
                  userSelect: 'none',
                }}
              >
                Ronak Premjani
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 300,
                  fontSize: 'clamp(4rem, 12vw, 12rem)',
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '-0.04em',
                  lineHeight: 0.85,
                  paddingRight: '0.4em',
                  userSelect: 'none',
                }}
              >
                —
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Top spacer — gives room for the nav */}
      <div style={{ height: '7rem' }} />
    </section>
  );
};

// ── Intro Section ──────────────────────────────────────────────
const IntroSection = () => (
  <section
    id="about"
    style={{
      background: '#f5f5f3',
      padding: '7rem var(--margin-h) 0',
    }}
  >
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '4rem',
        alignItems: 'start',
        paddingBottom: '5rem',
      }}
    >
      {/* Left — statement */}
      <div>
        <p
          className="ds-in-view"
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 300,
            fontSize: 'clamp(1.5rem, 2.8vw, 2.6rem)',
            letterSpacing: '-0.025em',
            lineHeight: 1.35,
            color: '#1c1d20',
            maxWidth: '620px',
          }}
        >
          Building scalable systems that power the digital era. No shortcuts, always on the cutting edge.
        </p>
      </div>

      {/* Right — bio + CTA */}
      <div
        className="ds-in-view delay-1"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '2.5rem',
          minWidth: '220px',
          maxWidth: '260px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            fontWeight: 400,
            color: 'rgba(28,29,32,0.65)',
            lineHeight: 1.7,
            textAlign: 'right',
          }}
        >
          My passion for backend architecture, distributed systems, and clean API design positions me uniquely in the engineering world.
        </p>

        {/* Circle "About me" button */}
        <button
          id="about-me-btn"
          onClick={() =>
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
          }
          data-cursor
          style={{
            width: '110px',
            height: '110px',
            borderRadius: '50%',
            background: '#1c1d20',
            border: 'none',
            cursor: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-sans)',
            fontSize: '12px',
            fontWeight: 400,
            color: 'white',
            letterSpacing: '0.02em',
            transition: 'background 0.3s ease, transform 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--color-accent)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#1c1d20';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          About me
        </button>
      </div>
    </div>

    {/* RECENT WORK label + divider */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
      <span
        className="ds-in-view"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '0.18em',
          color: 'rgba(28,29,32,0.4)',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
      >
        Recent Work
      </span>
      <div
        style={{
          flex: 1,
          height: '1px',
          background: 'rgba(28,29,32,0.12)',
        }}
      />
    </div>
  </section>
);

// ── Work Section ──────────────────────────────────────────────
const WorkSection = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <section
      id="work"
      style={{
        background: '#f5f5f3',
        padding: '0 var(--margin-h) 5rem',
      }}
    >
      <div>
        {PROJECTS.map((proj, i) => (
          <div
            key={proj.id}
            id={proj.id}
            data-work-hover
            className="ds-work-row ds-in-view"
            onMouseEnter={() => setHovered(proj.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              borderTop: '1px solid rgba(28,29,32,0.10)',
              padding: '2.5rem 0',
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              alignItems: 'center',
              cursor: 'none',
              transition: 'opacity 0.3s ease',
              opacity: hovered && hovered !== proj.id ? 0.4 : 1,
              position: 'relative',
            }}
          >
            {/* Project name */}
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 300,
                  fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  color: '#1c1d20',
                  margin: 0,
                  transition: 'transform 0.4s var(--ease-out)',
                  transform: hovered === proj.id ? 'translateX(12px)' : 'translateX(0)',
                }}
              >
                {proj.name}
              </h2>
            </div>

            {/* Category + Year */}
            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  fontWeight: 400,
                  color: 'rgba(28,29,32,0.5)',
                  lineHeight: 1.5,
                }}
              >
                {proj.category}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'rgba(28,29,32,0.3)',
                  marginTop: '0.25rem',
                }}
              >
                {proj.year}
              </div>
            </div>

            {/* Floating preview card — appears on hover */}
            {hovered === proj.id && (
              <div
                style={{
                  position: 'fixed',
                  left: '45%',
                  top: '40%',
                  width: '340px',
                  height: '220px',
                  borderRadius: '8px',
                  background: proj.color,
                  zIndex: 50,
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  padding: '2rem',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                  animation: 'ds-fade 0.3s ease forwards',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    color: '#1c1d20',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {proj.name}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    color: 'rgba(28,29,32,0.65)',
                    lineHeight: 1.6,
                    textAlign: 'center',
                  }}
                >
                  {proj.description}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Last divider */}
        <div style={{ width: '100%', height: '1px', background: 'rgba(28,29,32,0.10)' }} />
      </div>

      {/* "More work" pill button */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '4rem' }}>
        <button
          id="more-work-btn"
          data-cursor
          className="ds-in-view"
          style={{
            border: '1px solid rgba(28,29,32,0.2)',
            borderRadius: '100px',
            padding: '1rem 2.5rem',
            background: 'transparent',
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            fontWeight: 400,
            color: '#1c1d20',
            cursor: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'background 0.3s ease, color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#1c1d20';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#1c1d20';
          }}
        >
          More work
          <sup style={{ fontSize: '9px', opacity: 0.5 }}>
            {PROJECTS.length}
          </sup>
        </button>
      </div>
    </section>
  );
};

// ── Skills Marquee Section ─────────────────────────────────────
const SkillsSection = () => (
  <section
    id="stack"
    style={{
      background: '#f5f5f3',
      padding: '5rem 0',
      borderTop: '1px solid rgba(28,29,32,0.08)',
      overflow: 'hidden',
    }}
  >
    {/* Row 1 — scrolls left */}
    <div
      className="ds-marquee-left"
      style={{ overflow: 'hidden', marginBottom: '1.5rem' }}
    >
      <div className="ds-marquee-track">
        {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.75rem, 1.2vw, 1rem)',
              fontWeight: 300,
              color: 'rgba(28,29,32,0.5)',
              letterSpacing: '0.01em',
              paddingRight: '3rem',
              whiteSpace: 'nowrap',
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>

    {/* Row 2 — scrolls right (opposite) */}
    <div
      className="ds-marquee-right"
      style={{ overflow: 'hidden' }}
    >
      <div className="ds-marquee-track">
        {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.7rem, 1.1vw, 0.9rem)',
              fontWeight: 300,
              color: 'rgba(28,29,32,0.28)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              paddingRight: '3rem',
              whiteSpace: 'nowrap',
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  </section>
);

// ── Footer / Contact Section ───────────────────────────────────
const FooterSection = () => (
  <section
    id="contact"
    style={{
      background: '#1c1d20',
      position: 'relative',
      paddingTop: '8rem',
      paddingBottom: '4rem',
      paddingLeft: 'var(--margin-h)',
      paddingRight: 'var(--margin-h)',
      /* Curved top transition */
      clipPath: 'ellipse(120% 100% at 50% 100%)',
      marginTop: '-2rem',
    }}
  >
    {/* "Let's work together" heading */}
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '1rem' }}>
      {/* Avatar circle */}
      <div
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-sans)',
          fontWeight: 600,
          fontSize: '14px',
          color: 'rgba(255,255,255,0.5)',
          marginTop: '0.5rem',
        }}
      >
        RP
      </div>
      <h2
        className="ds-in-view"
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 300,
          fontSize: 'clamp(3.5rem, 9vw, 9rem)',
          letterSpacing: '-0.04em',
          lineHeight: 0.95,
          color: 'white',
        }}
      >
        Let's work<br />together
      </h2>
    </div>

    {/* Arrow indicator */}
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '3rem',
      }}
    >
      <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '1.2rem' }}>↙</span>
    </div>

    {/* Divider */}
    <div
      style={{
        width: '100%',
        height: '1px',
        background: 'rgba(255,255,255,0.08)',
        marginBottom: '3rem',
      }}
    />

    {/* Contact actions */}
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '2rem',
        flexWrap: 'wrap',
      }}
    >
      {/* Email + Phone pills */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <a
          id="contact-email-btn"
          href="mailto:ronak@example.com"
          data-cursor
          style={{
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '100px',
            padding: '0.8rem 1.8rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.8)',
            textDecoration: 'none',
            transition: 'border-color 0.3s ease, color 0.3s ease',
            display: 'inline-block',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
          }}
        >
          ronak@example.com
        </a>
        <a
          id="contact-phone-btn"
          href="tel:+910000000000"
          data-cursor
          style={{
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '100px',
            padding: '0.8rem 1.8rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.8)',
            textDecoration: 'none',
            transition: 'border-color 0.3s ease, color 0.3s ease',
            display: 'inline-block',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
          }}
        >
          +91 00000 00000
        </a>
      </div>

      {/* Blue CTA circle */}
      <a
        id="get-in-touch-btn"
        href="mailto:ronak@example.com"
        data-cursor
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'var(--color-accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-sans)',
          fontSize: '13px',
          fontWeight: 400,
          color: 'white',
          textDecoration: 'none',
          textAlign: 'center',
          lineHeight: 1.4,
          transition: 'background 0.3s ease, transform 0.3s ease',
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--color-accent-hover)';
          e.currentTarget.style.transform = 'scale(1.06)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--color-accent)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        Get in<br />touch
      </a>
    </div>

    {/* Footer bottom bar */}
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '6rem',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: 'rgba(255,255,255,0.25)',
          letterSpacing: '0.06em',
        }}
      >
        © 2026 Ronak Premjani. All rights reserved.
      </span>

      <div style={{ display: 'flex', gap: '2rem' }}>
        {[
          { label: 'GitHub', href: 'https://github.com/ronakpremjani' },
          { label: 'LinkedIn', href: 'https://linkedin.com/in/ronakpremjani' },
          { label: 'Twitter', href: 'https://twitter.com/ronakpremjani' },
        ].map(({ label, href }) => (
          <a
            key={label}
            id={`footer-${label.toLowerCase()}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              color: 'rgba(255,255,255,0.3)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════
   MAIN LANDING COMPONENT
═══════════════════════════════════════════════════════════════ */
export const Landing = () => {
  const [loaded, setLoaded] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);

  useScrollReveal();

  const handleLoaderDone = useCallback(() => {
    setLoaderDone(true);
    setLoaded(true);
  }, []);

  return (
    <>
      {!loaderDone && <Loader onDone={handleLoaderDone} />}
      <Cursor />
      <Nav />

      <main style={{ overflowX: 'hidden' }}>
        <HeroSection loaded={loaded} />
        <IntroSection />
        <WorkSection />
        <SkillsSection />
        <FooterSection />
      </main>
    </>
  );
};

export default Landing;
