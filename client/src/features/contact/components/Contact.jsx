import React, { useState, useEffect, useRef } from 'react';
import { Container } from '../../../components/ui/Container';
import { MagneticButton } from '../../../components/ui/MagneticButton';
import { ArrowDownLeft } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const [time, setTime] = useState('');
  const spacerRef = useRef(null);
  const curveRef = useRef(null);
  const footerRef = useRef(null);
  const parallaxRef = useRef(null);

  useGSAP(() => {
    // 0. Toggle visibility to prevent the fixed footer from bleeding behind other transparent sections
    gsap.set(footerRef.current, { autoAlpha: 0 });
    
    ScrollTrigger.create({
      trigger: spacerRef.current,
      start: 'top bottom', // Show when the spacer enters the screen
      onEnter: () => gsap.set(footerRef.current, { autoAlpha: 1 }),
      onLeaveBack: () => gsap.set(footerRef.current, { autoAlpha: 0 }),
    });

    // 1. Flatten the Curve seamlessly as you scroll
    gsap.fromTo(curveRef.current,
      { height: '25vh' },
      {
        height: '0vh',
        ease: 'none',
        scrollTrigger: {
          trigger: spacerRef.current,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
        }
      }
    );

    // 2. Inner Parallax for the contact content (Text and Buttons)
    // The footer is fixed (sticky), but we move the inner content to give it depth!
    gsap.fromTo(parallaxRef.current,
      { y: '25vh' },
      {
        y: '0vh',
        ease: 'none',
        scrollTrigger: {
          trigger: spacerRef.current,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
        }
      }
    );
  }, { scope: spacerRef });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true }) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="contact" className="relative w-full">
      
      {/* 1. THE CURVE (z-20) 
          Sits exactly below FeaturedWork. Extends 25vh down and shrinks to 0 on scroll. */}
      <div className="relative w-full z-20 pointer-events-none flex justify-center">
         <div ref={curveRef} className="absolute top-0 w-full overflow-hidden pointer-events-none">
            <div 
              className="absolute top-0 bg-[#1A2A40]" 
              style={{ 
                left: '-25%', 
                width: '150%', 
                height: '100%', 
                borderBottomLeftRadius: '50% 100%', 
                borderBottomRightRadius: '50% 100%' 
              }} 
            />
         </div>
      </div>

      {/* 2. THE TRANSPARENT SPACER (z-10) 
          Allows the document to scroll exactly 100vh past FeaturedWork, peeling it up like a curtain. */}
      <div ref={spacerRef} className="w-full h-screen relative z-10 pointer-events-none" />

      {/* 3. THE FIXED STICKY FOOTER (z-0) 
          Native CSS sticky position. Zero jitter. Tucked safely behind FeaturedWork (z-10). */}
      <footer ref={footerRef} className="fixed bottom-0 left-0 w-full h-screen z-0 bg-[#E5DFD3] text-[#1A2A40] pt-16 md:pt-20 pb-6 md:pb-8 invisible">
        <Container className="h-full">
            
            {/* Entire Content Parallax Wrapper */}
            <div ref={parallaxRef} className="flex flex-col justify-between h-full w-full">
              
              {/* Top Massive Typography */}
              <div className="flex flex-col mt-4">
                <div className="flex items-center gap-4 md:gap-8 mb-2">
                  <img 
                    src="https://api.dicebear.com/7.x/notionists/svg?seed=Ronak&backgroundColor=8C2B3D" 
                    alt="Ronak Profile" 
                    className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full object-cover shrink-0"
                  />
                  <h2 className="text-[3.5rem] md:text-[5.5rem] lg:text-[7.5rem] font-medium tracking-tight leading-none whitespace-nowrap">
                    Let's work
                  </h2>
                </div>
                <div className="flex justify-between items-center w-full pr-0 md:pr-12">
                  <h2 className="text-[3.5rem] md:text-[5.5rem] lg:text-[7.5rem] font-medium tracking-tight leading-none ml-12 md:ml-24 lg:ml-32">
                    together
                  </h2>
                  {/* Premium Arrow Icon */}
                  <div className="hidden md:flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-full border border-[#1A2A40]/30 shrink-0">
                    <ArrowDownLeft className="w-8 h-8 lg:w-10 lg:h-10 text-[#1A2A40]" strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              {/* Separator Line and Magnetic Button */}
              <div className="relative w-full mb-10 md:mb-12 mt-auto">
                <div className="w-full h-px bg-[#1A2A40]/20 absolute top-1/2 -translate-y-1/2" />
                <div className="flex justify-end relative z-10 md:pr-24 lg:pr-32">
                  <MagneticButton className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#1A2A40] text-[#E5DFD3] flex items-center justify-center group overflow-hidden border-none cursor-pointer">
                    <a href="mailto:ronakpremjani@gmail.com" className="relative z-10 text-sm md:text-lg font-medium tracking-wider">
                      Get in touch
                    </a>
                    <div className="absolute inset-0 bg-[#8C2B3D] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] z-0 rounded-full" />
                  </MagneticButton>
                </div>
              </div>
              
              {/* Contact Pills */}
              <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-4 md:mb-8">
                <a href="mailto:ronakpremjani@gmail.com" className="px-6 py-4 md:px-10 md:py-5 border border-[#1A2A40]/30 rounded-full hover:bg-[#1A2A40]/5 transition-colors text-sm md:text-base lg:text-lg font-medium w-fit">
                  ronakpremjani@gmail.com
                </a>
                <a href="tel:+918849240653" className="px-6 py-4 md:px-10 md:py-5 border border-[#1A2A40]/30 rounded-full hover:bg-[#1A2A40]/5 transition-colors text-sm md:text-base lg:text-lg font-medium w-fit">
                  +91 88492 40653
                </a>
              </div>
              
              {/* Bottom Grid Row */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-12 font-mono text-xs tracking-wide border-t border-[#1A2A40]/10 pt-6 md:pt-8 shrink-0">
                <div className="flex gap-16 md:gap-32">
                  <div className="flex flex-col gap-2 md:gap-3">
                    <span className="text-[#1A2A40]/40 uppercase text-[10px] font-semibold tracking-widest">Version</span>
                    <span className="text-[#1A2A40] text-sm md:text-base">2024 © Edition</span>
                  </div>
                  <div className="flex flex-col gap-2 md:gap-3">
                    <span className="text-[#1A2A40]/40 uppercase text-[10px] font-semibold tracking-widest">Local Time</span>
                    <span className="text-[#1A2A40] text-sm md:text-base">{time}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 md:gap-3">
                  <span className="text-[#1A2A40]/40 uppercase text-[10px] font-semibold tracking-widest">Socials</span>
                  <div className="flex gap-4 md:gap-6">
                    {['LinkedIn', 'GitHub', 'Twitter', 'Instagram'].map(social => (
                      <a key={social} href="#" className="relative group overflow-hidden text-[#1A2A40] text-sm md:text-base">
                        <span className="inline-block transition-transform duration-300 group-hover:-translate-y-[120%]">{social}</span>
                        <span className="inline-block absolute left-0 top-0 translate-y-[120%] transition-transform duration-300 group-hover:translate-y-0">{social}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

            </div>
        </Container>
      </footer>
    </section>
  );
};
