import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════════════
   RONAK PREMJANI PORTFOLIO
═══════════════════════════════════════════════════════════════ */

// ── Data ────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 'proj-001',
    name: 'PayrollOS',
    category: 'Architecture & Fullstack',
    year: '2026',
    description: 'Multi-tenant HR platform. Reduced payroll processing from 12 min → 47 sec via BullMQ queuing & CQRS-lite patterns on MongoDB.',
    bg: '#e8e2d8',
  },
  {
    id: 'proj-002',
    name: 'API Sentinel',
    category: 'Backend & Distributed Systems',
    year: '2025',
    description: 'Custom API gateway unifying auth & rate-limiting across 8 Node.js microservices. Zero-downtime migration.',
    bg: '#d8e2e8',
  },
  {
    id: 'proj-003',
    name: 'ContentVault',
    category: 'Database & Schema Engineering',
    year: '2025',
    description: 'Schema-validated headless CMS backed by MongoDB. Full marketing autonomy in first sprint — zero schema breaks in 6 months.',
    bg: '#dce8d8',
  },
];

const TECH = [
  'Node.js', 'Express.js', 'React', 'MongoDB', 'Redis',
  'BullMQ', 'Docker', 'PM2', 'Tailwind CSS', 'TypeScript',
  'PostgreSQL', 'Nginx', 'REST APIs', 'Mongoose', 'Vite',
];

const GREETINGS = ['Hello.', 'नमस्ते.', 'Bonjour.', 'Ciao.', 'Hola.', 'こんにちは.'];

/* ─────────────────────────────────────────────────────────────
   LOADER
───────────────────────────────────────────────────────────── */
const Loader = ({ onDone }) => {
  const [idx, setIdx] = useState(0);
  const [sliding, setSliding] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    let i = 0;
    const iv = setInterval(() => {
      i += 1;
      if (i < GREETINGS.length) {
        setIdx(i);
      } else {
        clearInterval(iv);
        setTimeout(() => {
          setSliding(true);
          document.body.style.overflow = '';
          setTimeout(onDone, 850);
        }, 350);
      }
    }, 400);
    return () => {
      clearInterval(iv);
      document.body.style.overflow = '';
    };
  }, [onDone]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: '#1c1d20',
        zIndex: 9000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: sliding ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.85s cubic-bezier(0.76,0,0.24,1)',
        pointerEvents: sliding ? 'none' : 'all',
      }}
    >
      <span
        key={idx}
        style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: 'clamp(2.5rem, 8vw, 7rem)',
          fontWeight: 300,
          color: '#ffffff',
          letterSpacing: '-0.04em',
          animation: 'loaderWord 0.35s cubic-bezier(0.16,1,0.3,1) both',
        }}
      >
        {GREETINGS[idx]}
      </span>

      {/* Curved SVG overlay at the bottom of the loader */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          width: '100%',
          height: 'clamp(80px, 12vw, 150px)',
          pointerEvents: 'none',
        }}
      >
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', fill: '#1c1d20' }}
        >
          <path
            d={sliding ? "M0,0 Q720,0 1440,0 Z" : "M0,0 Q720,100 1440,0 Z"}
            style={{ transition: 'd 0.85s cubic-bezier(0.76, 0, 0.24, 1)' }}
          />
        </svg>
      </div>

      <style>{`
        @keyframes loaderWord {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   CURSOR
───────────────────────────────────────────────────────────── */
const Cursor = () => {
  const dotRef = useRef(null);
  const viewRef = useRef(null);
  const pos = useRef({ x: -200, y: -200 });
  const raf = useRef(null);

  useEffect(() => {
    document.body.classList.add('has-custom-cursor');

    const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };

    const tick = () => {
      if (dotRef.current) {
        dotRef.current.style.left = `${pos.current.x}px`;
        dotRef.current.style.top = `${pos.current.y}px`;
      }
      if (viewRef.current) {
        viewRef.current.style.left = `${pos.current.x}px`;
        viewRef.current.style.top = `${pos.current.y}px`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    const onOver = (e) => {
      if (e.target.closest('a, button, [data-hover]')) document.body.classList.add('cursor-hover');
      if (e.target.closest('[data-work]')) viewRef.current?.classList.add('is-visible');
    };
    const onOut = (e) => {
      if (e.target.closest('a, button, [data-hover]')) document.body.classList.remove('cursor-hover');
      if (e.target.closest('[data-work]')) viewRef.current?.classList.remove('is-visible');
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
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: '#1c1d20',
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate(-50%,-50%)',
          transition: 'width 0.35s ease, height 0.35s ease',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={viewRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: '#455ce9',
          pointerEvents: 'none',
          zIndex: 99998,
          transform: 'translate(-50%,-50%) scale(0)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Sora', sans-serif",
          fontSize: 12,
          fontWeight: 500,
          color: '#fff',
          letterSpacing: '0.05em',
          transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}
        className="ds-view-cursor"
      >
        View
      </div>

      <style>{`
        .ds-view-cursor.is-visible { transform: translate(-50%,-50%) scale(1) !important; }
        body.cursor-hover .ds-dot  { width: 44px !important; height: 44px !important; }
      `}</style>
    </>
  );
};

/* ─────────────────────────────────────────────────────────────
   SCROLL REVEAL HOOK
───────────────────────────────────────────────────────────── */
const useReveal = (ready) => {
  useEffect(() => {
    if (!ready) return;
    const timer = setTimeout(() => {
      const els = document.querySelectorAll('.rev');
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('rev-in'); }),
        { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
      );
      els.forEach((el) => io.observe(el));
      return () => io.disconnect();
    }, 100);
    return () => clearTimeout(timer);
  }, [ready]);
};

/* ─────────────────────────────────────────────────────────────
   INERTIAL SMOOTH SCROLL HOOK
───────────────────────────────────────────────────────────── */
const useSmoothScroll = (ready) => {
  useEffect(() => {
    if (!ready) return;
    const body = document.body;
    const main = document.querySelector('main');
    if (!main) return;

    const resize = () => {
      body.style.height = `${main.clientHeight}px`;
    };

    const t = setTimeout(resize, 100);
    const ro = new ResizeObserver(resize);
    ro.observe(main);

    main.style.position = 'fixed';
    main.style.top = '0';
    main.style.left = '0';
    main.style.width = '100%';
    main.style.overflow = 'hidden';
    main.style.willChange = 'transform';

    let current = 0;
    let target = 0;
    const ease = 0.08;
    let frameId;

    const smooth = () => {
      target = window.scrollY;
      current += (target - current) * ease;
      if (Math.abs(target - current) > 0.1) {
        main.style.transform = `translate3d(0, ${-current}px, 0)`;
      } else {
        main.style.transform = `translate3d(0, ${-target}px, 0)`;
      }
      frameId = requestAnimationFrame(smooth);
    };

    frameId = requestAnimationFrame(smooth);

    return () => {
      clearTimeout(t);
      cancelAnimationFrame(frameId);
      ro.disconnect();
      body.style.height = '';
      main.style.position = '';
      main.style.top = '';
      main.style.left = '';
      main.style.width = '';
      main.style.overflow = '';
      main.style.transform = '';
    };
  }, [ready]);
};

/* ─────────────────────────────────────────────────────────────
   MAGNETIC WRAPPER
───────────────────────────────────────────────────────────── */
const Magnetic = ({ children }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      el.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
      
      const inner = el.querySelector('span, div, p');
      if (inner) {
        inner.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
        inner.style.transition = 'transform 0.08s ease-out';
      }
    };

    const handleMouseLeave = () => {
      el.style.transform = '';
      const inner = el.querySelector('span, div, p');
      if (inner) {
        inner.style.transform = '';
        inner.style.transition = 'transform 0.25s ease';
      }
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return React.cloneElement(React.Children.only(children), {
    ref,
    style: {
      ...children.props.style,
      transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
      willChange: 'transform',
    },
  });
};

/* ─────────────────────────────────────────────────────────────
   NAVIGATION
───────────────────────────────────────────────────────────── */
const Nav = ({ heroVisible }) => {
  const [open, setOpen] = useState(false);

  const go = (id) => {
    setOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), open ? 600 : 0);
  };

  return (
    <>
      {/* ── Top bar ── */}
      <header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.4rem 5%',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.04em',
            color: heroVisible ? 'white' : '#1c1d20',
            pointerEvents: 'all',
            transition: 'color 0.4s ease',
          }}
        >
          © Code by Ronak
        </span>

        <nav style={{ display: 'flex', gap: '2.2rem', pointerEvents: 'all' }}>
          {['Work', 'About', 'Contact'].map((label) => (
            <button
              key={label}
              id={`nav-${label.toLowerCase()}`}
              data-hover
              onClick={() => go(label.toLowerCase())}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: "'Sora', sans-serif",
                fontSize: 13,
                fontWeight: 400,
                color: heroVisible ? 'white' : '#1c1d20',
                letterSpacing: '0.01em',
                cursor: 'none',
                transition: 'color 0.4s ease',
              }}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      {/* ── Hamburger circle ── */}
      <Magnetic>
        <button
          id="hamburger"
          data-hover
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          style={{
            position: 'fixed',
            top: '1rem', right: '1rem',
            width: 52, height: 52,
            borderRadius: '50%',
            background: '#1c1d20',
            border: 'none',
            cursor: 'none',
            zIndex: 301,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
            transition: 'background-color 0.3s ease',
          }}
        >
          <span style={{ display: 'block', width: 18, height: 1.5, background: '#fff' }} />
          <span style={{ display: 'block', width: 18, height: 1.5, background: '#fff' }} />
        </button>
      </Magnetic>

      {/* ── Overlay ── */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(28,29,32,0.45)',
          zIndex: 399,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
          transition: 'opacity 0.5s ease',
        }}
      />

      {/* ── Drawer ── */}
      <aside
        aria-hidden={!open}
        style={{
          position: 'fixed',
          top: 0, right: 0,
          width: 'min(440px, 88vw)',
          height: '100vh',
          background: '#1c1d20',
          zIndex: 400,
          display: 'flex',
          flexDirection: 'column',
          padding: '4rem 3rem 3rem',
          transform: open ? 'translateX(0)' : 'translateX(calc(100% + 100px))',
          transition: 'transform 0.75s cubic-bezier(0.76,0,0.24,1)',
        }}
      >
        {/* SVG Curve at the left edge */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: -99,
            width: 100,
            height: '100%',
            fill: '#1c1d20',
            pointerEvents: 'none',
          }}
          viewBox="0 0 100 600"
          preserveAspectRatio="none"
        >
          <path
            d={open ? "M100,0 L100,600 Q100,300 100,0 Z" : "M100,0 L100,600 Q0,300 100,0 Z"}
            style={{ transition: 'd 0.75s cubic-bezier(0.76, 0, 0.24, 1)' }}
          />
        </svg>

        {/* Close btn */}
        <Magnetic>
          <button
            id="drawer-close"
            data-hover
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute',
              top: '1rem', right: '1rem',
              width: 52, height: 52,
              borderRadius: '50%',
              background: '#ffffff',
              border: 'none',
              cursor: 'none',
              color: '#000',
              fontSize: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </Magnetic>

        {/* Label */}
        <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
          Navigation
        </p>
        <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: '2.5rem' }} />

        {/* Links */}
        <nav style={{ flex: 1 }}>
          {[{ l: 'Home', id: 'hero' }, { l: 'Work', id: 'work' }, { l: 'About', id: 'about' }, { l: 'Contact', id: 'contact' }].map(({ l, id }) => (
            <button
              key={l}
              id={`drawer-${id}`}
              data-hover
              onClick={() => go(id)}
              style={{
                display: 'block',
                width: '100%',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                fontFamily: "'Sora',sans-serif",
                fontSize: 'clamp(2.6rem,5.5vw,3.8rem)',
                fontWeight: 300,
                color: '#fff',
                letterSpacing: '-0.03em',
                lineHeight: 1.25,
                cursor: 'none',
                padding: '0.15rem 0',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#455ce9')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#fff')}
            >
              {l}
            </button>
          ))}
        </nav>

        {/* Socials */}
        <div>
          <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Socials
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { l: 'GitHub', h: 'https://github.com' },
              { l: 'LinkedIn', h: 'https://linkedin.com' },
              { l: 'Twitter', h: 'https://twitter.com' },
            ].map(({ l, h }) => (
              <a
                key={l}
                id={`social-${l.toLowerCase()}`}
                href={h}
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

/* ─────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────── */
const Hero = ({ onVisibilityChange }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const io = new IntersectionObserver(
      ([e]) => onVisibilityChange(e.isIntersecting),
      { threshold: 0.1 }
    );
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, [onVisibilityChange]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: 600,
        background: '#ffffff',
        overflow: 'hidden',
      }}
    >
      {/* ── Location badge (left-center, sticking out from edge) ── */}
      <div
        className="hero-in hero-in-1"
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          background: '#1c1d20',
          borderTopRightRadius: 100,
          borderBottomRightRadius: 100,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          padding: '1.4rem 2rem 1.4rem 2.5rem',
          zIndex: 20,
          boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
        }}
      >
        <div>
          <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 400, color: '#fff', lineHeight: 1.5 }}>
            Located in<br />
            <span style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500, fontSize: 15 }}>New Delhi, India</span>
          </div>
        </div>
        <div
          style={{
            width: 56, height: 56,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              color: '#fff',
              animation: 'spinGlobe 15s linear infinite',
            }}
          >
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
            <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="currentColor" strokeWidth="1.2" />
            <ellipse cx="12" cy="12" rx="3.5" ry="9" stroke="currentColor" strokeWidth="1.2" />
            <line x1="12" y1="3" x2="12" y2="21" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
            <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* ── Role text (right-center) ── */}
      <div
        className="hero-in hero-in-2"
        style={{
          position: 'absolute',
          right: '5%',
          top: '50%',
          transform: 'translateY(-50%)',
          textAlign: 'right',
          zIndex: 20,
        }}
      >
        <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: 'rgba(28,29,32,0.35)', marginBottom: '0.6rem' }}>↘</div>
        <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(1rem,1.6vw,1.4rem)', fontWeight: 300, color: '#1c1d20', lineHeight: 1.35 }}>
          Fullstack<br />Engineer &amp; Developer
        </div>
      </div>

      {/* ── Centre portrait silhouette ── */}
      <div
        className="hero-in hero-in-3"
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          transform: 'translateX(-50%)',
          width: 'clamp(280px,35vw,440px)',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, rgba(28,29,32,0.07) 0%, rgba(28,29,32,0.16) 100%)',
            borderRadius: '0 0 0 0',
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderTopLeftRadius: '50% 12%',
            borderTopRightRadius: '50% 12%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <img
            src="/bg.png"
            alt="Ronak Premjani"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '100%',
              objectFit: 'contain',
              display: 'block',
              transform: 'scale(1.55)',
              transformOrigin: 'bottom center',
              mixBlendMode: 'multiply',
            }}
          />

          {/* Masked Duplicate Marquee inside portrait container */}
          <div
            style={{
              position: 'absolute',
              bottom: '-2%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100vw',
              pointerEvents: 'none',
              lineHeight: 1.15,
              zIndex: 15,
            }}
          >
            <div
              style={{
                display: 'flex',
                whiteSpace: 'nowrap',
                willChange: 'transform',
                animation: 'marqL 20s linear infinite',
              }}
            >
              {[...Array(6)].map((_, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: "'Sora',sans-serif",
                    fontWeight: i % 2 === 0 ? 700 : 300,
                    fontSize: 'clamp(5.5rem,13vw,13.5rem)',
                    color: '#ffffff',
                    WebkitTextStroke: '1.5px #000000',
                    textStroke: '1.5px #000000',
                    letterSpacing: '-0.04em',
                    lineHeight: 1.15,
                    paddingRight: '0.5em',
                    paddingBottom: '0.15em',
                    userSelect: 'none',
                  }}
                >
                  {i % 2 === 0 ? 'Ronak Premjani' : '—'}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom marquee name ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '0%',
          left: 0,
          right: 0,
          overflow: 'hidden',
          zIndex: 30,
          lineHeight: 1.15,
        }}
      >
        <div
          style={{
            display: 'flex',
            whiteSpace: 'nowrap',
            willChange: 'transform',
            animation: 'marqL 20s linear infinite',
          }}
        >
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'Sora',sans-serif",
                fontWeight: i % 2 === 0 ? 700 : 300,
                fontSize: 'clamp(5.5rem,13vw,13.5rem)',
                color: '#1c1d20',
                letterSpacing: '-0.04em',
                lineHeight: 1.15,
                paddingRight: '0.5em',
                paddingBottom: '0.15em',
                userSelect: 'none',
              }}
            >
              {i % 2 === 0 ? 'Ronak Premjani' : '—'}
            </span>
          ))}
        </div>
      </div>

      {/* Marquee keyframe */}
      <style>{`
        @keyframes marqL {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   INTRO
───────────────────────────────────────────────────────────── */
const Intro = () => (
  <section
    id="about"
    style={{
      background: '#f5f5f3',
      padding: '7rem 5% 0',
    }}
  >
    {/* Two-col */}
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr minmax(auto,260px)',
        gap: '3rem',
        alignItems: 'start',
        paddingBottom: '4.5rem',
      }}
    >
      {/* Statement */}
      <p
        className="rev"
        style={{
          fontFamily: "'Sora',sans-serif",
          fontWeight: 300,
          fontSize: 'clamp(1.45rem,2.6vw,2.5rem)',
          letterSpacing: '-0.025em',
          lineHeight: 1.38,
          color: '#1c1d20',
          maxWidth: 640,
        }}
      >
        Building scalable systems that power the digital era. No shortcuts, always on the cutting edge.
      </p>

      {/* Bio + CTA */}
      <div
        className="rev"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2.5rem' }}
      >
        <p style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 400, color: 'rgba(28,29,32,0.6)', lineHeight: 1.7, textAlign: 'right' }}>
          My passion for backend architecture, distributed systems, and clean API design positions me uniquely in the engineering world.
        </p>

        {/* Circle CTA */}
        <button
          id="about-btn"
          data-hover
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            width: 112, height: 112,
            borderRadius: '50%',
            background: '#1c1d20',
            border: 'none',
            cursor: 'none',
            fontFamily: "'Sora',sans-serif",
            fontSize: 12,
            fontWeight: 400,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.3s ease, transform 0.3s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#455ce9'; e.currentTarget.style.transform = 'scale(1.06)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#1c1d20'; e.currentTarget.style.transform = 'scale(1)'; }}
        >
          About me
        </button>
      </div>
    </div>

    {/* RECENT WORK label */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
      <span
        style={{
          fontFamily: "'IBM Plex Mono',monospace",
          fontSize: 10,
          letterSpacing: '0.18em',
          color: 'rgba(28,29,32,0.38)',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
      >
        Recent Work
      </span>
      <div style={{ flex: 1, height: 1, background: 'rgba(28,29,32,0.10)' }} />
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   WORK
───────────────────────────────────────────────────────────── */
const Work = () => {
  const [hov, setHov] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section id="work" style={{ background: '#f5f5f3', padding: '0 5% 5rem' }}>
      {PROJECTS.map((proj) => (
        <div
          key={proj.id}
          id={proj.id}
          data-work
          className="rev"
          onMouseEnter={() => setHov(proj.id)}
          onMouseLeave={() => setHov(null)}
          style={{
            borderTop: '1px solid rgba(28,29,32,0.10)',
            padding: '2.5rem 0',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'center',
            gap: '2rem',
            cursor: 'none',
            opacity: hov && hov !== proj.id ? 0.38 : 1,
            transition: 'opacity 0.35s ease',
          }}
        >
          <h2
            style={{
              fontFamily: "'Sora',sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(2.4rem,5.5vw,5.5rem)',
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: '#1c1d20',
              transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
              transform: hov === proj.id ? 'translateX(14px)' : 'translateX(0)',
            }}
          >
            {proj.name}
          </h2>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 400, color: 'rgba(28,29,32,0.5)', lineHeight: 1.5 }}>
              {proj.category}
            </div>
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: 'rgba(28,29,32,0.28)', marginTop: '0.2rem' }}>
              {proj.year}
            </div>
          </div>
        </div>
      ))}

      {/* Last border */}
      <div style={{ width: '100%', height: 1, background: 'rgba(28,29,32,0.10)', marginBottom: '4rem' }} />

      {/* Floating preview — follows mouse */}
      {hov && (() => {
        const proj = PROJECTS.find((p) => p.id === hov);
        return (
          <div
            style={{
              position: 'fixed',
              left: mousePos.x + 30,
              top: mousePos.y - 80,
              width: 320,
              height: 200,
              background: proj.bg,
              borderRadius: 8,
              padding: '1.75rem',
              pointerEvents: 'none',
              zIndex: 9990,
              boxShadow: '0 20px 60px rgba(0,0,0,0.10)',
              animation: 'fadeIn 0.25s ease both',
            }}
          >
            <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: '1.05rem', color: '#1c1d20', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
              {proj.name}
            </div>
            <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 12, color: 'rgba(28,29,32,0.65)', lineHeight: 1.65 }}>
              {proj.description}
            </div>
            <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }`}</style>
          </div>
        );
      })()}

      {/* More work button */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          id="more-work"
          data-hover
          style={{
            border: '1px solid rgba(28,29,32,0.18)',
            borderRadius: 100,
            padding: '0.9rem 2.4rem',
            background: 'transparent',
            fontFamily: "'Sora',sans-serif",
            fontSize: 13,
            fontWeight: 400,
            color: '#1c1d20',
            cursor: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            transition: 'background 0.3s ease, color 0.3s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#1c1d20'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1c1d20'; }}
        >
          More work <sup style={{ fontSize: 9, opacity: 0.5 }}>{PROJECTS.length}</sup>
        </button>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   TECH STACK MARQUEE
───────────────────────────────────────────────────────────── */
const TechMarquee = () => (
  <section
    id="stack"
    style={{
      background: '#f5f5f3',
      borderTop: '1px solid rgba(28,29,32,0.07)',
      padding: '4.5rem 0',
      overflow: 'hidden',
    }}
  >
    {/* Row 1 → left */}
    <div style={{ overflow: 'hidden', marginBottom: '1.4rem' }}>
      <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'marqL 30s linear infinite' }}>
        {[...TECH, ...TECH].map((t, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Sora',sans-serif",
              fontSize: 'clamp(0.78rem,1.1vw,1rem)',
              fontWeight: 300,
              color: 'rgba(28,29,32,0.45)',
              paddingRight: '3rem',
              whiteSpace: 'nowrap',
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>

    {/* Row 2 → right */}
    <div style={{ overflow: 'hidden' }}>
      <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'marqR 26s linear infinite' }}>
        {[...TECH, ...TECH].map((t, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'IBM Plex Mono',monospace",
              fontSize: 'clamp(0.68rem,0.95vw,0.88rem)',
              fontWeight: 300,
              color: 'rgba(28,29,32,0.22)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              paddingRight: '3rem',
              whiteSpace: 'nowrap',
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>

    <style>{`
      @keyframes marqL { from{transform:translateX(0)} to{transform:translateX(-50%)} }
      @keyframes marqR { from{transform:translateX(-50%)} to{transform:translateX(0)} }
    `}</style>
  </section>
);



/* ─────────────────────────────────────────────────────────────
   LOCAL TIME COMPONENT
───────────────────────────────────────────────────────────── */
const LocalTime = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const timeStr = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      const offsetMinutes = date.getTimezoneOffset();
      const offsetHours = -offsetMinutes / 60;
      const offsetSign = offsetHours >= 0 ? '+' : '-';
      const absHours = Math.floor(Math.abs(offsetHours));
      const mins = Math.abs(offsetMinutes) % 60;
      const offsetStr = `GMT${offsetSign}${absHours}${mins ? `:${mins}` : ''}`;

      setTime(`${timeStr} ${offsetStr}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return <span style={{ color: '#fff', fontSize: '14px', fontFamily: "'Sora',sans-serif" }}>{time}</span>;
};

/* ─────────────────────────────────────────────────────────────
   FOOTER / CONTACT
───────────────────────────────────────────────────────────── */
const Footer = () => {
  const footerRef = useRef(null);
  const [curveY, setCurveY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = footerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.top < viewportHeight) {
        const delta = viewportHeight - rect.top;
        const progress = Math.min(1, Math.max(0, delta / viewportHeight));
        
        // Dennis's curve bends dynamically.
        // It starts fully curved (Y = 0) and bends/flattens out to Y = 140 as you scroll down.
        const currentY = Math.round(140 * progress);
        setCurveY(currentY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ── Full-width curved arch — same dark color as footer ── */}
      <div
        aria-hidden="true"
        style={{
          background: '#f5f5f3',
          lineHeight: 0,
          marginBottom: -2,
        }}
      >
        <svg
          viewBox="0 0 1440 140"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block', width: '100%', height: 'clamp(80px,10vw,140px)' }}
        >
          {/* Smooth cubic bezier arch — dynamic curve path bending as you scroll */}
          <path d={`M0,140 C360,${curveY} 1080,${curveY} 1440,140 L1440,140 L0,140 Z`} fill="#1c1d20" />
        </svg>
      </div>

      <footer
        id="contact"
        ref={footerRef}
        style={{
          background: '#1c1d20',
          padding: '6rem 8% 4rem',
          position: 'relative',
        }}
      >
      {/* Title block & button row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '3rem',
          marginBottom: '5rem',
        }}
      >
        {/* Left Side: Avatar + "Let's work together" */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          {/* Avatar */}
          <div
            style={{
              width: 'clamp(60px, 6vw, 80px)',
              height: 'clamp(60px, 6vw, 80px)',
              borderRadius: '50%',
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Sora',sans-serif",
              fontWeight: 500,
              fontSize: 'clamp(1.2rem, 1.8vw, 1.8rem)',
              color: 'rgba(255,255,255,0.7)',
              flexShrink: 0,
            }}
          >
            RP
          </div>

          <h2
            className="rev"
            style={{
              fontFamily: "'Sora',sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(3rem, 6.5vw, 6.5rem)',
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              color: '#fff',
              margin: 0,
            }}
          >
            Let's work<br />together
          </h2>
        </div>

        {/* Diagonal curved arrow */}
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            color: 'rgba(255,255,255,0.25)',
            display: 'none',
          }}
          className="footer-arrow"
        >
          <path
            d="M5 5L19 19M19 19H11M19 19V11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Right Side: Giant Magnetic "Get in touch" button */}
        <Magnetic>
          <a
            id="get-in-touch"
            href="mailto:ronak@example.com"
            data-hover
            style={{
              width: 'clamp(140px, 12vw, 175px)',
              height: 'clamp(140px, 12vw, 175px)',
              borderRadius: '50%',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Sora',sans-serif",
              fontSize: 'clamp(0.95rem, 1.2vw, 1.15rem)',
              fontWeight: 400,
              color: '#000000',
              textDecoration: 'none',
              textAlign: 'center',
              lineHeight: 1.4,
              transition: 'background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease',
              flexShrink: 0,
              border: 'none',
              cursor: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#000000';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.color = '#000000';
            }}
          >
            Get in touch
          </a>
        </Magnetic>
      </div>

      {/* Actionable buttons: Email and Phone */}
      <div
        style={{
          display: 'flex',
          gap: '1.5rem',
          flexWrap: 'wrap',
          marginBottom: '6rem',
        }}
      >
        <Magnetic>
          <a
            id="email-btn"
            href="mailto:ronak@example.com"
            data-hover
            style={{
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: 100,
              padding: 'clamp(1.2rem, 1.8vw, 1.8rem) clamp(2rem, 3vw, 3.2rem)',
              fontFamily: "'Sora',sans-serif",
              fontSize: 'clamp(1rem, 1.4vw, 1.3rem)',
              color: '#fff',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease',
              cursor: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.borderColor = '#ffffff';
              e.currentTarget.style.color = '#000000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
              e.currentTarget.style.color = '#ffffff';
            }}
          >
            ronak@example.com
          </a>
        </Magnetic>

        <Magnetic>
          <a
            id="phone-btn"
            href="tel:+910000000000"
            data-hover
            style={{
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: 100,
              padding: 'clamp(1.2rem, 1.8vw, 1.8rem) clamp(2rem, 3vw, 3.2rem)',
              fontFamily: "'Sora',sans-serif",
              fontSize: 'clamp(1rem, 1.4vw, 1.3rem)',
              color: '#fff',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease',
              cursor: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.borderColor = '#ffffff';
              e.currentTarget.style.color = '#000000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
              e.currentTarget.style.color = '#ffffff';
            }}
          >
            +91 00000 00000
          </a>
        </Magnetic>
      </div>

      {/* Bottom Bar: Version, Local Time, Socials */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '2.5rem',
        }}
      >
        {/* Version */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <span
            style={{
              fontFamily: "'IBM Plex Mono',monospace",
              fontSize: '10px',
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.08em',
            }}
          >
            VERSION
          </span>
          <span style={{ fontFamily: "'Sora',sans-serif", fontSize: '14px', color: '#fff' }}>
            2026 © Edition
          </span>
        </div>

        {/* Local Time */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <span
            style={{
              fontFamily: "'IBM Plex Mono',monospace",
              fontSize: '10px',
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.08em',
            }}
          >
            LOCAL TIME
          </span>
          <LocalTime />
        </div>

        {/* Socials */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <span
            style={{
              fontFamily: "'IBM Plex Mono',monospace",
              fontSize: '10px',
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.08em',
            }}
          >
            SOCIALS
          </span>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { l: 'GitHub', h: 'https://github.com' },
              { l: 'LinkedIn', h: 'https://linkedin.com' },
              { l: 'Twitter', h: 'https://twitter.com' },
              { l: 'Instagram', h: 'https://instagram.com' },
            ].map(({ l, h }) => (
              <Magnetic key={l}>
                <a
                  id={`footer-${l.toLowerCase()}`}
                  href={h}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  className="footer-social-link"
                  style={{
                    fontFamily: "'Sora',sans-serif",
                    fontSize: '13px',
                    color: '#fff',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    cursor: 'none',
                    display: 'inline-block',
                  }}
                >
                  {l}
                </a>
              </Magnetic>
            ))}
          </div>
        </div>
      </div>
    </footer>
  </>
  );
};

/* ─────────────────────────────────────────────────────────────
   MAIN
───────────────────────────────────────────────────────────── */
export const Landing = () => {
  const [ready, setReady] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);

  const onLoaderDone = useCallback(() => setReady(true), []);

  useReveal(ready);
  useSmoothScroll(ready);

  return (
    <>
      {!ready && <Loader onDone={onLoaderDone} />}
      <Cursor />
      <Nav heroVisible={heroVisible} />

      <main style={{ overflowX: 'hidden' }}>
        <Hero onVisibilityChange={setHeroVisible} />
        <Intro />
        <Work />
        <TechMarquee />
        <Footer />
      </main>

      {/* Global reveal styles */}
      <style>{`
        .rev {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1);
        }
        .rev-in { opacity: 1 !important; transform: translateY(0) !important; }
        .rev:nth-child(2) { transition-delay: 100ms; }
        .rev:nth-child(3) { transition-delay: 200ms; }
        body.has-custom-cursor, body.has-custom-cursor * { cursor: none !important; }
        input, textarea { cursor: text !important; }

        .footer-social-link {
          position: relative;
          text-decoration: none;
        }
        .footer-social-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 1px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .footer-social-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
        @keyframes spinGlobe {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @media (min-width: 768px) {
          .footer-arrow {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
};

export default Landing;
