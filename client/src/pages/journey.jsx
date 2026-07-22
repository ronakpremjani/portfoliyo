import React, { useRef, useMemo, useState } from 'react';
import { useScroll, useSpring } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import { Link } from 'react-router-dom';
import { Contact } from '../features/contact/components/Contact';

// Localized 3D cluster constellation
const chapters = [
  {
    id: 1, label: 'Chapter 01', title: 'The Spark.',
    text: "It didn't start with code. It started with a question: How do things work behind the glass? My curiosity about technology turned into an obsession. I wasn't just consuming the web anymore—I wanted to build it.",
    x: -50, y: 40, z: 30, dirX: -1, dirY: 1, progress: 0.05
  },
  {
    id: 2, label: 'Chapter 02', title: 'Learning to Build.',
    text: "The excitement of seeing a blank screen turn into something interactive was intoxicating. Every broken layout was a puzzle. Every late night spent wrestling with logic was a lesson in patience and precision.",
    x: 40, y: 20, z: 10, dirX: 1, dirY: 1, progress: 0.22
  },
  {
    id: 3, label: 'Chapter 03', title: 'Discovering Full-Stack.',
    text: "Beautiful interfaces weren't enough. I wanted to understand the systems that powered them. I dove deep into databases and servers, realizing that true engineering happens when the architecture is as elegant as the design.",
    x: 60, y: -15, z: -30, dirX: 1, dirY: -1, progress: 0.39
  },
  {
    id: 4, label: 'Chapter 04', title: 'Challenges & Growth.',
    text: "Growth didn't come from success—it came from broken deployments, failed ideas, and deep architectural flaws. I learned to love the friction. It forced me to think systematically, proving that persistence is a developer's greatest asset.",
    x: 0, y: -40, z: -50, dirX: -1, dirY: -1, progress: 0.56
  },
  {
    id: 5, label: 'Chapter 05', title: 'Today.',
    text: "Now, I don't just write code. I engineer experiences. I obsess over the intersection of performance, architecture, and emotion. I build systems that scale and interfaces that people actually love to use.",
    x: -40, y: -10, z: -20, dirX: -1, dirY: 1, progress: 0.73
  },
  {
    id: 6, label: 'Chapter 06', title: "What's Next.",
    text: "The web is evolving, and so am I. From intelligent AI agents to spatial user interaction, the journey is far from over. I'm building for tomorrow, and I'm just getting started.",
    x: -20, y: 20, z: -60, dirX: 1, dirY: 1, progress: 0.90
  },
];

// The wire connecting the dots inside the cluster
const trackCurve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-80, 60, 50), 
  ...chapters.map(ch => new THREE.Vector3(ch.x, ch.y, ch.z)),
  new THREE.Vector3(10, 40, -80) 
], false, 'catmullrom', 0.5);

// The camera's orbital path zooming into the cluster
const cameraOrbitCurve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-90, 60, 160),  // Far, wide shot (Zoomed Out)
  new THREE.Vector3(80, 20, 100),   // Circling right
  new THREE.Vector3(50, -30, -70),  // Circling behind and down
  new THREE.Vector3(-40, 15, -90)   // Close up on final nodes (Zoomed In)
]);



const ConnectingThread = ({ scrollProgress }) => {
  const [drawnPoints, setDrawnPoints] = useState([]);
  const [headPosition, setHeadPosition] = useState(new THREE.Vector3());
  
  const allPoints = useMemo(() => trackCurve.getPoints(300), []);

  useFrame(() => {
    if (scrollProgress) {
      const p = scrollProgress.get();
      // Draw progress starts slightly ahead so the line is visible immediately
      const drawProgress = Math.max(0.01, Math.min(1, p + 0.15));
      
      const pointsCount = Math.max(2, Math.floor(drawProgress * allPoints.length));
      setDrawnPoints(allPoints.slice(0, pointsCount));
      
      if (pointsCount > 0) {
        setHeadPosition(allPoints[pointsCount - 1]);
      }
    }
  });

  return (
    <>
      {/* Faint background track */}
      <Line points={allPoints} color="#E5DFD3" lineWidth={1} opacity={0.05} transparent />
      
      {/* Solid growing active line */}
      {drawnPoints.length > 1 && (
        <Line 
          points={drawnPoints}
          color="#8C2B3D"
          lineWidth={3.5}
          opacity={0.9}
          transparent
        />
      )}

      {/* Glowing head of the line (like a comet tip) */}
      <mesh position={headPosition}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#8C2B3D" />
      </mesh>
      
      {/* Base start point */}
      <mesh position={allPoints[0]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#E5DFD3" opacity={0.5} transparent />
      </mesh>

      {/* Chapter Nodes */}
      {chapters.map((ch) => (
        <mesh key={ch.id} position={[ch.x, ch.y, ch.z]}>
          <sphereGeometry args={[1.5, 16, 16]} />
          <meshBasicMaterial color="#E5DFD3" opacity={0.3} transparent />
        </mesh>
      ))}
    </>
  );
};

const JourneyUniverse = ({ scrollProgress }) => {
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const initialized = useRef(false);

  const starGeometry = useMemo(() => {
    const numStars = 6000;
    const RADIUS = 300; 
    const points = new Float32Array(numStars * 3);
    for (let i = 0; i < numStars; i++) {
      // Create a massive spherical shell of stars encapsulating the cluster
      const r = RADIUS + Math.random() * 400;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      points[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      points[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      points[i * 3 + 2] = r * Math.cos(phi);
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(points, 3));
    return geom;
  }, []);

  useFrame((state) => {
    if (scrollProgress) {
      const p = scrollProgress.get();
      const safeP = Math.max(0.001, Math.min(0.99, p));
      
      // Camera spirals inward along its orbital path
      const camPos = cameraOrbitCurve.getPointAt(safeP);
      
      // Camera pans to look slightly ahead of the drawing line
      const lookP = Math.max(0.001, Math.min(0.99, p + 0.1));
      const lookAtPos = trackCurve.getPointAt(lookP);
      
      // Cinematic drift
      camPos.x += Math.sin(state.clock.elapsedTime * 0.3) * 2;
      camPos.y += Math.cos(state.clock.elapsedTime * 0.2) * 2;
      
      if (!initialized.current) {
        state.camera.position.copy(camPos);
        state.camera.lookAt(lookAtPos);
        initialized.current = true;
      } else {
        state.camera.position.lerp(camPos, 0.05);
        
        dummy.position.copy(state.camera.position);
        dummy.lookAt(lookAtPos);
        state.camera.quaternion.slerp(dummy.quaternion, 0.05);
      }
      
      // Force update the camera's world matrix immediately
      // This is crucial because drei's <Html> uses it for 2D screen projection in the same frame!
      state.camera.updateMatrixWorld();
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      
      <points geometry={starGeometry}>
        <pointsMaterial color="#E5DFD3" size={1.5} transparent opacity={0.5} sizeAttenuation={false} />
      </points>

      <ConnectingThread scrollProgress={scrollProgress} />
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
  const [activeIndex, setActiveIndex] = useState(0);

  React.useEffect(() => {
    return smoothProgress.onChange((v) => {
      let index = 0;
      if (v > 0.15) index = 1;
      if (v > 0.32) index = 2;
      if (v > 0.49) index = 3;
      if (v > 0.66) index = 4;
      if (v > 0.83) index = 5;
      setActiveIndex(index);
    });
  }, [smoothProgress]);

  return (
    <>
      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link 
          to="/" 
          className="flex items-center gap-2 px-4 py-2 bg-[#050505]/80 backdrop-blur-md border border-[#E5DFD3]/20 text-[#E5DFD3] rounded-full hover:bg-[#8C2B3D] hover:border-[#8C2B3D] transition-all duration-300"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em]">Back</span>
        </Link>
      </div>

      <div 
        ref={containerRef} 
        className="relative w-full h-[600vh] bg-[#050505] text-[#E5DFD3] selection:bg-[#8C2B3D] selection:text-[#E5DFD3] font-sans z-30"
      >
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[#0B1522] z-0">
          <div className="absolute inset-0 z-0">
            <Canvas camera={{ fov: 60 }}>
              <JourneyUniverse scrollProgress={smoothProgress} />
            </Canvas>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1522] via-transparent to-[#0B1522]/30 pointer-events-none z-10 opacity-60" />
          
          {/* Guaranteed Visible UI Overlay */}
          <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center p-6 md:p-24">
            {chapters.map((chapter, index) => (
              <div 
                key={chapter.id}
                className={`absolute transition-all duration-1000 ease-out flex flex-col ${
                  index === activeIndex 
                    ? 'opacity-100 translate-y-0 scale-100 blur-none' 
                    : 'opacity-0 translate-y-12 scale-95 blur-sm'
                }`}
                style={{
                  alignItems: chapter.dirX === 1 ? 'flex-start' : 'flex-end',
                  textAlign: chapter.dirX === 1 ? 'left' : 'right',
                  left: chapter.dirX === 1 ? '10%' : 'auto',
                  right: chapter.dirX === -1 ? '10%' : 'auto',
                  maxWidth: '450px'
                }}
              >
                <div className="w-12 h-[2px] bg-[#8C2B3D] mb-4 opacity-70" />
                <span className="block font-mono text-xs md:text-sm tracking-[0.3em] text-[#E5DFD3]/60 uppercase mb-2">
                  {chapter.label}
                </span>
                <h2 className="font-serif italic font-light text-4xl md:text-6xl text-[#E5DFD3] mb-4 drop-shadow-2xl leading-tight">
                  {chapter.title}
                </h2>
                <p className="font-sans font-light text-base md:text-lg text-[#E5DFD3]/80 leading-relaxed">
                  {chapter.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Contact />
    </>
  );
};

export default Journey;
