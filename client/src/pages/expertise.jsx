import React, { useRef, useMemo, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { Contact } from '../features/contact/components/Contact';
import { BackButton } from '../components/ui/BackButton';

// --- Data ---
const tools = [
  {
    id: '01', category: 'Core Architecture', name: 'React & Ecosystem',
    description: 'The foundation of my interactive systems. I leverage React not just for UI, but as a state-driven architecture engine. Combined with Vite for compilation speed and Framer Motion for physics-based fluidity.'
  },
  {
    id: '02', category: 'Visual Language', name: 'Tailwind & Vanilla CSS',
    description: 'I treat CSS as an engineering discipline. Tailwind provides structural utility, while custom CSS modules and variables are deployed for bespoke animations, glassmorphism, and microscopic aesthetic details.'
  },
  {
    id: '03', category: 'Server & Logic', name: 'Node.js & Express',
    description: 'The backbone of my data operations. I build thin, highly optimized API layers that prioritize response speed and clear separation of concerns to craft bespoke data pipelines without framework bloat.'
  },
  {
    id: '04', category: 'Data Persistence', name: 'MongoDB & Mongoose',
    description: 'Chosen for its document-based flexibility, MongoDB allows me to iterate rapidly on data structures while maintaining rigorous validation via Mongoose schemas.'
  },
  {
    id: '05', category: 'Spatial & 3D', name: 'Three.js & WebGL',
    description: 'Used to break the flat plane of standard web design. I deploy Three.js to create immersive, interactive environments that elevate digital products into memorable, tactile experiences.'
  },
  {
    id: '06', category: 'Deployment', name: 'Cloud & Vercel',
    description: 'My deployment pipeline is built for speed and reliability. Leveraging modern edge networks to ensure global low-latency access and seamless continuous integration.'
  }
];

// --- 3D Background Component ---
const Terrain = () => {
  const meshRef = useRef();
  
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(150, 150, 60, 60);
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const position = meshRef.current.geometry.attributes.position;
    
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const z = position.getZ(i);
      const y = Math.sin(x * 0.05 + time * 0.5) * Math.cos(z * 0.05 + time * 0.5) * 3;
      position.setY(i, y);
    }
    position.needsUpdate = true;
    
    // Subtle rotation based on mouse pointer
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, (state.pointer.x * Math.PI) / 40, 0.05);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, (state.pointer.y * Math.PI) / 40, 0.05);
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, -12, -20]}>
      <meshBasicMaterial color="#8C2B3D" wireframe transparent opacity={0.15} />
    </mesh>
  );
};

const Background3D = () => (
  <div className="absolute inset-0 z-0 pointer-events-none">
    <div className="sticky top-0 left-0 w-full h-screen opacity-60">
      <Canvas camera={{ position: [0, 5, 20], fov: 60 }} style={{ pointerEvents: 'auto' }}>
        <Terrain />
        <fog attach="fog" args={['#1A2A40', 10, 50]} />
      </Canvas>
    </div>
  </div>
);

// --- 3D Tilt Glassmorphic Card ---
const SkillCard = ({ tool, index }) => {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);

  const spotX = useSpring(useMotionValue(50), springConfig);
  const spotY = useSpring(useMotionValue(50), springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
    
    spotX.set(((e.clientX - rect.left) / rect.width) * 100);
    spotY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000, zIndex: hovered ? 10 : 1 }}
      className="relative w-full h-full p-[1px] rounded-2xl bg-[#E5DFD3]/10 cursor-default group"
    >
      {/* Outer Spotlight Border */}
      <motion.div 
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
        style={{
          background: useTransform(
            () => `radial-gradient(500px circle at ${spotX.get()}% ${spotY.get()}%, rgba(140,43,61,0.6), transparent 40%)`
          ),
          opacity: hovered ? 1 : 0
        }}
      />
      
      {/* Card Content (Glassmorphic) */}
      <div className="relative h-full w-full bg-[#0B1525]/80 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
        
        {/* Interior Glow */}
        <motion.div 
          className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
          style={{
            background: useTransform(
              () => `radial-gradient(600px circle at ${spotX.get()}% ${spotY.get()}%, rgba(140,43,61,0.08), transparent 40%)`
            ),
            opacity: hovered ? 1 : 0
          }}
        />

        <div className="relative z-10">
          <span className="inline-block px-3 py-1 mb-6 rounded-full border border-[#8C2B3D]/40 bg-[#8C2B3D]/10 font-mono text-xs tracking-widest text-[#E5DFD3]">
            {tool.id} // {tool.category}
          </span>
          <h3 className="font-serif italic text-3xl text-[#E5DFD3] mb-4 drop-shadow-md group-hover:text-[#8C2B3D] transition-colors duration-300">
            {tool.name}
          </h3>
          <p className="font-sans font-light text-[#E5DFD3]/60 leading-relaxed text-sm">
            {tool.description}
          </p>
        </div>
        
        <div className="relative z-10 w-full flex justify-between items-end mt-12 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-8 h-px bg-[#E5DFD3]/40" />
          <div className="flex gap-1.5">
            <div className="w-1 h-1 rounded-full bg-[#8C2B3D]" />
            <div className="w-1 h-1 rounded-full bg-[#8C2B3D]/50" />
            <div className="w-1 h-1 rounded-full bg-[#8C2B3D]/20" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Page ---
export const Expertise = () => {
  return (
    <div className="w-full bg-[#1A2A40] text-[#E5DFD3] selection:bg-[#8C2B3D] selection:text-[#E5DFD3]">
      <BackButton />
      
      <div className="relative z-10 bg-[#1A2A40] overflow-x-hidden min-h-screen">
        <Background3D />
        
        <div className="relative z-10 pt-32 pb-32 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">


        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 max-w-4xl"
        >
          <span className="block font-mono text-xs tracking-[0.4em] text-[#8C2B3D] uppercase mb-8">
            [ System Infrastructure ]
          </span>
          <h1 className="font-serif italic font-light text-5xl md:text-7xl lg:text-8xl mb-8 leading-[1.1]">
            Tools of <br /> the Trade.
          </h1>
          <p className="font-sans font-light text-lg md:text-xl text-[#E5DFD3]/60 max-w-2xl leading-relaxed">
            Frameworks are not silver bullets; they are instruments. 
            The technologies below represent the core of my stack, engineered for 
            high performance, extreme aesthetics, and structural integrity.
          </p>
        </motion.div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <SkillCard key={tool.id} tool={tool} index={index} />
          ))}
        </div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-32 text-center"
        >
          <span className="font-mono text-xs tracking-[0.3em] text-[#E5DFD3]/20 uppercase">
            // End of Inventory //
          </span>
        </motion.div>
        </div>
      </div>
      
      <Contact standalone={false} curveColor="#1A2A40" />
    </div>
  );
};

export default Expertise;
