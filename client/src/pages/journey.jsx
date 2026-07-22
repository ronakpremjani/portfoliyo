import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { Contact } from '../features/contact/components/Contact';

// The Narrative Data
const chapters = [
  {
    id: 1,
    label: 'Chapter 01',
    title: 'The Spark.',
    text: "It didn't start with code. It started with a question: How do things work behind the glass? My curiosity about technology turned into an obsession. I wasn't just consuming the web anymore—I wanted to build it.",
    nodeY: 50,  // vh
    nodeX: 50,  // vw
    align: 'center'
  },
  {
    id: 2,
    label: 'Chapter 02',
    title: 'Learning to Build.',
    text: "The excitement of seeing a blank screen turn into something interactive was intoxicating. Every broken layout was a puzzle. Every late night spent wrestling with logic was a lesson in patience and precision.",
    nodeY: 150,
    nodeX: 70,
    align: 'left' // Text on left, node on right
  },
  {
    id: 3,
    label: 'Chapter 03',
    title: 'Discovering Full-Stack.',
    text: "Beautiful interfaces weren't enough. I wanted to understand the systems that powered them. I dove deep into databases and servers, realizing that true engineering happens when the architecture is as elegant as the design.",
    nodeY: 250,
    nodeX: 30,
    align: 'right'
  },
  {
    id: 4,
    label: 'Chapter 04',
    title: 'Challenges & Growth.',
    text: "Growth didn't come from success—it came from broken deployments, failed ideas, and deep architectural flaws. I learned to love the friction. It forced me to think systematically, proving that persistence is a developer's greatest asset.",
    nodeY: 350,
    nodeX: 70,
    align: 'left'
  },
  {
    id: 5,
    label: 'Chapter 05',
    title: 'Today.',
    text: "Now, I don't just write code. I engineer experiences. I obsess over the intersection of performance, architecture, and emotion. I build systems that scale and interfaces that people actually love to use.",
    nodeY: 450,
    nodeX: 30,
    align: 'right'
  },
  {
    id: 6,
    label: 'Chapter 06',
    title: "What's Next.",
    text: "The web is evolving, and so am I. From intelligent AI agents to spatial user interaction, the journey is far from over. I'm building for tomorrow, and I'm just getting started.",
    nodeY: 550,
    nodeX: 50,
    align: 'center'
  },
];

// The 3D Dev Toolkit Warp Speed Effect
const JourneyWarpSpeed = ({ scrollProgress }) => {
  const cameraGroup = useRef();
  const FLIGHT_LENGTH = 1500; 

  const starGeometry = useMemo(() => {
    const numStars = 8000;
    const SPREAD = 25;
    const points = new Float32Array(numStars * 3);
    for (let i = 0; i < numStars; i++) {
      points[i * 3] = (Math.random() - 0.5) * SPREAD * 5;     
      points[i * 3 + 1] = (Math.random() - 0.5) * SPREAD * 5; 
      points[i * 3 + 2] = -Math.random() * (FLIGHT_LENGTH + 50);   
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(points, 3));
    return geom;
  }, []);

  useFrame((state) => {
    if (cameraGroup.current && scrollProgress) {
      const targetZ = -scrollProgress.get() * FLIGHT_LENGTH;
      cameraGroup.current.position.z = THREE.MathUtils.lerp(
        cameraGroup.current.position.z,
        targetZ,
        0.05 
      );
      cameraGroup.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
      cameraGroup.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
      cameraGroup.current.position.y = Math.cos(state.clock.elapsedTime * 0.4) * 0.5;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <group ref={cameraGroup}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={60} />
        <pointLight position={[0, 0, 0]} intensity={1.5} distance={50} color="#8C2B3D" />
      </group>
      <points geometry={starGeometry}>
        <pointsMaterial color="#E5DFD3" size={0.06} transparent opacity={0.6} sizeAttenuation={true} />
      </points>
    </>
  );
};

export const Journey = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 60 });
  
  // The illuminated trail grows mathematically perfectly with scroll 
  // 50vh out of 600vh is 8.333% (start)
  // 550vh out of 600vh is 91.666% (end)
  const clipHeight = useTransform(smoothProgress, [0, 1], ["8.333%", "91.666%"]);
  
  // The Explorer Dot perfectly traces the curves of the SVG
  const dotX = useTransform(
    smoothProgress, 
    [0, 0.2, 0.4, 0.6, 0.8, 1], 
    [50, 70, 30, 70, 30, 50]
  );

  return (
    <>
      <div 
        ref={containerRef} 
        className="relative w-full h-[600vh] bg-[#050505] text-[#E5DFD3] selection:bg-[#8C2B3D] selection:text-[#E5DFD3] font-sans z-30 overflow-hidden"
      >
        
        {/* Fixed Background Layer (3D Warp Speed + Map Overlay) */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[#0B1522]">
          
          {/* 3D Warp Speed */}
          <div className="absolute inset-0 z-0">
            <Canvas>
              <JourneyWarpSpeed scrollProgress={smoothProgress} />
            </Canvas>
          </div>
          <div className="absolute inset-0 bg-black/40 pointer-events-none z-10" />

          {/* The Explorer Dot (Fixed in the center of the screen, tracks X dynamically) */}
          <div className="absolute inset-0 pointer-events-none z-30">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.circle 
                cx={dotX} 
                cy="50" 
                r="0.5" 
                fill="#E5DFD3" 
                filter="drop-shadow(0 0 10px rgba(140,43,61,0.8))"
                vectorEffect="non-scaling-stroke"
              />
              <motion.circle 
                cx={dotX} 
                cy="50" 
                r="2" 
                fill="none"
                stroke="#8C2B3D" 
                strokeWidth="0.2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>

        {/* 
          ========================================
          THE MASSIVE SCROLLING OVERLAY (600VH)
          ========================================
        */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
          
          {/* The Route Maps (Uncharted & Illuminated) */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 600" preserveAspectRatio="none">
            {/* The Uncharted Route (Faint) */}
            <path 
              d="M 50 0 L 50 50 L 70 150 L 30 250 L 70 350 L 30 450 L 50 550 L 50 600" 
              fill="none" 
              stroke="rgba(229, 223, 211, 0.1)" 
              strokeWidth="0.1"
              vectorEffect="non-scaling-stroke"
            />
            
            {/* Node Waypoints */}
            {chapters.map((chapter) => (
              <circle 
                key={chapter.id}
                cx={chapter.nodeX} 
                cy={chapter.nodeY} 
                r="0.5" 
                fill="#0B1522" 
                stroke="#E5DFD3" 
                strokeWidth="0.1"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>

          {/* The Illuminated Trail (Reveals as we scroll via expanding mask) */}
          <motion.div 
            className="absolute top-0 left-0 w-full overflow-hidden z-20"
            style={{ height: clipHeight }}
          >
            <svg className="absolute top-0 left-0 w-full" style={{ height: '600vh' }} viewBox="0 0 100 600" preserveAspectRatio="none">
              <path 
                d="M 50 0 L 50 50 L 70 150 L 30 250 L 70 350 L 30 450 L 50 550 L 50 600" 
                fill="none" 
                stroke="#8C2B3D" 
                strokeWidth="0.3"
                vectorEffect="non-scaling-stroke"
                style={{ filter: 'drop-shadow(0 0 5px rgba(140,43,61,0.5))' }}
              />
            </svg>
          </motion.div>

          {/* 
            ========================================
            THE NARRATIVE WAYPOINTS
            ========================================
          */}
          {chapters.map((chapter) => {
            const isLeft = chapter.align === 'left';
            const isRight = chapter.align === 'right';
            const isCenter = chapter.align === 'center';

            return (
              <div 
                key={chapter.id} 
                className="absolute w-full px-8 md:px-12 flex items-center pointer-events-auto"
                style={{ 
                  top: `calc(${chapter.nodeY}vh - 20vh)`, // Center text block vertically on the node
                  height: '40vh',
                  justifyContent: isLeft ? 'flex-start' : isRight ? 'flex-end' : 'center'
                }}
              >
                <div className={`w-full max-w-xl ${isCenter ? 'text-center bg-[#050505]/80 backdrop-blur-md p-8 rounded-3xl border border-[#E5DFD3]/5' : ''}`}>
                  <span className="block font-mono text-xs md:text-sm tracking-[0.3em] text-[#8C2B3D] uppercase mb-4">
                    {chapter.label}
                  </span>
                  <h2 className="font-serif italic font-light text-4xl md:text-6xl tracking-tight text-[#E5DFD3] mb-6 shadow-black drop-shadow-2xl">
                    {chapter.title}
                  </h2>
                  <p className="font-sans font-light text-base md:text-xl leading-relaxed md:leading-[1.8] text-[#E5DFD3]/80 shadow-black drop-shadow-xl">
                    {chapter.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Contact />
    </>
  );
};

export default Journey;

