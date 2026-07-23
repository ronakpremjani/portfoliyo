import React, { useRef, useMemo, useState } from 'react';
import { useScroll, useSpring, motion, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { BackButton } from '../components/ui/BackButton';
import { Contact } from '../features/contact/components/Contact';

// --- Content ---
const chapters = [
  {
    id: 1, label: 'Chapter 01', title: 'The Spark',
    text: "It didn't start with code. It started with a question: How do things work behind the glass? My curiosity about technology turned into an obsession. I wasn't just consuming the web anymore—I wanted to build it.",
    geometry: 'Icosahedron', color: '#3b82f6', zPos: -10, xPos: 5
  },
  {
    id: 2, label: 'Chapter 02', title: 'Building the Foundation',
    text: "The excitement of seeing a blank screen turn into something interactive was intoxicating. Every broken layout was a puzzle. Every late night spent wrestling with logic was a lesson in patience and precision.",
    geometry: 'Box', color: '#8b5cf6', zPos: -30, xPos: -5
  },
  {
    id: 3, label: 'Chapter 03', title: 'Discovering Architecture',
    text: "Beautiful interfaces weren't enough. I wanted to understand the systems that powered them. I dove deep into databases and servers, realizing that true engineering happens when the architecture is as elegant as the design.",
    geometry: 'Torus', color: '#ec4899', zPos: -50, xPos: 5
  },
  {
    id: 4, label: 'Chapter 04', title: 'The Resistance',
    text: "Growth didn't come from success—it came from broken deployments, failed ideas, and deep architectural flaws. I learned to love the friction. It forced me to think systematically, proving that persistence is a developer's greatest asset.",
    geometry: 'Octahedron', color: '#ef4444', zPos: -70, xPos: -5
  },
  {
    id: 5, label: 'Chapter 05', title: 'Engineering Emotion',
    text: "Now, I don't just write code. I engineer experiences. I obsess over the intersection of performance, architecture, and emotion. I build systems that scale and interfaces that people actually love to use.",
    geometry: 'TorusKnot', color: '#ff4b69', zPos: -90, xPos: 5
  },
  {
    id: 6, label: 'Chapter 06', title: 'The Horizon',
    text: "The web is evolving, and so am I. From intelligent AI agents to spatial user interaction, the journey is far from over. I'm building for tomorrow, and I'm just getting started.",
    geometry: 'Sphere', color: '#E5DFD3', zPos: -110, xPos: -5
  },
];

// --- 3D Elements ---


const StarField = () => {
  const pointsRef = useRef();
  
  const starGeometry = useMemo(() => {
    const numStars = 3000;
    const points = new Float32Array(numStars * 3);
    for (let i = 0; i < numStars; i++) {
      points[i * 3] = (Math.random() - 0.5) * 150;
      points[i * 3 + 1] = (Math.random() - 0.5) * 150;
      points[i * 3 + 2] = (Math.random() - 0.5) * 150;
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(points, 3));
    return geom;
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef} geometry={starGeometry}>
      <pointsMaterial color="#ffffff" size={0.1} transparent opacity={0.4} />
    </points>
  );
};

// 3D Glowing Timeline Thread
const GlowingThread = ({ scrollProgress }) => {
  const lineRef = useRef();
  const headRef = useRef();
  
  // Create a beautiful sweeping curve through the geometric nodes
  const { curve, points, length } = useMemo(() => {
    const pts = [
      new THREE.Vector3(0, -10, 10), // start outside
      ...chapters.map(ch => new THREE.Vector3(ch.xPos * 0.3, 0, ch.zPos)), // thread slightly towards the objects
      new THREE.Vector3(0, -10, -130) // end deep inside
    ];
    const catmull = new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.5);
    return {
      curve: catmull,
      points: catmull.getPoints(200),
      length: catmull.getLength()
    };
  }, []);

  useFrame(() => {
    if (lineRef.current?.material && scrollProgress) {
      const p = Math.max(0.001, Math.min(1, scrollProgress.get() + 0.15));
      
      // Update dash offset to draw the line as we scroll
      const drawLength = p * length;
      lineRef.current.material.dashOffset = 1000 - drawLength;

      // Update the glowing head position
      if (headRef.current) {
        const headPos = curve.getPointAt(Math.min(0.999, p));
        headRef.current.position.copy(headPos);
      }
    }
  });

  return (
    <>
      <Line points={points} color="#ffffff" lineWidth={1} opacity={0.1} transparent />
      <Line 
        ref={lineRef}
        points={points}
        color="#ff4b69"
        lineWidth={3}
        dashed
        dashSize={1000}
        gapSize={1000}
      />
      <mesh ref={headRef}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#ff4b69" />
        <pointLight color="#ff4b69" intensity={2} distance={20} />
      </mesh>
    </>
  );
};

// Main Scene
const JourneyScene = ({ scrollProgress }) => {
  const cameraGroup = useRef();

  useFrame((state) => {
    if (cameraGroup.current && scrollProgress) {
      // Smoothly map scroll directly to Z position
      // Using Framer Motion's smoothProgress ensures this is silky smooth without lerp delays
      const p = scrollProgress.get();
      cameraGroup.current.position.z = -(p * 120);
      
      // Subtle organic floating
      cameraGroup.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 1.5;
      cameraGroup.current.position.y = Math.cos(state.clock.elapsedTime * 0.2) * 0.8;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <StarField />
      
      <group ref={cameraGroup}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />
      </group>



      <GlowingThread scrollProgress={scrollProgress} />
      
      {/* Lightweight Premium Post-Processing */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.15} mipmapBlur intensity={1.5} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </>
  );
};

// --- HTML Overlay Components ---
const ChapterPanel = ({ chapter, index, smoothProgress }) => {
  const isEven = index % 2 === 0;
  
  // Calculate the active window for this chapter based on scroll progress
  // Total progress is 0 to 1, we have 6 chapters
  const step = 1 / 6;
  const start = index * step - 0.1;
  const peak = index * step + (step / 2);
  const end = (index + 1) * step + 0.1;

  const opacity = useTransform(smoothProgress, [start, peak, end], [0, 1, 0]);
  const y = useTransform(smoothProgress, [start, peak, end], [100, 0, -100]);
  const scale = useTransform(smoothProgress, [start, peak, end], [0.8, 1, 0.8]);

  return (
    <motion.div 
      style={{ opacity, y, scale }}
      className={`absolute top-1/2 left-0 w-full -translate-y-1/2 px-6 flex ${isEven ? 'justify-start' : 'justify-end'} pointer-events-none`}
    >
      <div 
        className="max-w-lg p-10 rounded-3xl pointer-events-auto border border-white/5 shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(15,15,15,0.8) 0%, rgba(5,5,5,0.9) 100%)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)'
        }}
      >
        <span className="block font-mono text-xs tracking-[0.3em] uppercase mb-4" style={{ color: chapter.color }}>
          {chapter.label}
        </span>
        <h2 className="text-4xl md:text-5xl font-serif italic mb-6 text-[#E5DFD3]">
          {chapter.title}
        </h2>
        <p className="font-sans text-[#E5DFD3]/70 leading-relaxed text-lg font-light">
          {chapter.text}
        </p>
      </div>
    </motion.div>
  );
};

export const Journey = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Extremely smooth spring physics
  const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 60, mass: 0.5 });

  return (
    <div className="bg-[#050505] text-[#E5DFD3] selection:bg-[#ff4b69] selection:text-[#E5DFD3]">
      <BackButton />

      {/* 600vh Container to provide scrollable height */}
      <div ref={containerRef} className="relative z-10 bg-[#050505] w-full h-[600vh]">
        
        {/* Sticky viewport holding the scene */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
          
          {/* 3D Canvas */}
          <div className="absolute inset-0 z-0">
            <Canvas dpr={[1, 2]}>
              <JourneyScene scrollProgress={smoothProgress} />
            </Canvas>
          </div>

          {/* Radial dark gradient for text readability */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050505_120%)] pointer-events-none" />

          {/* HTML UI Overlay Container */}
          <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center max-w-6xl mx-auto">
            {chapters.map((chapter, index) => (
              <ChapterPanel 
                key={chapter.id} 
                chapter={chapter} 
                index={index} 
                smoothProgress={smoothProgress} 
              />
            ))}
          </div>

        </div>
      </div>
      
      {/* Contact Section at the very bottom */}
      <Contact standalone={false} curveColor="#050505" />
    </div>
  );
};

export default Journey;
