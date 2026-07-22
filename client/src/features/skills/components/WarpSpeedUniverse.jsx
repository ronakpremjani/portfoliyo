import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const clusters = [
  {
    id: "frontend",
    title: "FRONTEND",
    zOffset: 0.1, // 10% down the scroll flight
    skills: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextdotjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind", icon: "tailwindcss" },
      { name: "Figma", icon: "figma" },
      { name: "Three.js", icon: "threedotjs" },
    ]
  },
  {
    id: "backend",
    title: "BACKEND",
    zOffset: 0.35, // 35% down
    skills: [
      { name: "Node.js", icon: "nodedotjs" },
      { name: "Express", icon: "express" },
      { name: "GraphQL", icon: "graphql" },
      { name: "Go", icon: "go" },
      { name: "Python", icon: "python" },
    ]
  },
  {
    id: "database",
    title: "DATABASE",
    zOffset: 0.60, // 60% down
    skills: [
      { name: "MongoDB", icon: "mongodb" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Redis", icon: "redis" },
    ]
  },
  {
    id: "devops",
    title: "DEVOPS",
    zOffset: 0.85, // 85% down
    skills: [
      { name: "Docker", icon: "docker" },
      { name: "AWS", icon: "amazonwebservices" },
      { name: "Vercel", icon: "vercel" },
      { name: "Git", icon: "git" },
      { name: "Kubernetes", icon: "kubernetes" },
    ]
  }
];

const FLIGHT_LENGTH = 400; // Total Z depth of the flight
const SPREAD = 15; 

export const WarpSpeedUniverse = ({ scrollProgress }) => {
  const cameraGroup = useRef();

  // Generate a massive starfield
  const starGeometry = useMemo(() => {
    const numStars = 5000;
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

  // Compute positions for all skills so they cluster around their assigned Z-depth
  const allSkillNodes = useMemo(() => {
    const nodes = [];
    clusters.forEach(cluster => {
      const clusterZ = -cluster.zOffset * FLIGHT_LENGTH;
      
      cluster.skills.forEach((skill) => {
        // Space them out slightly around the cluster center
        const z = clusterZ + (Math.random() * 15 - 7.5); 
        
        let x = (Math.random() - 0.5) * (SPREAD * 1.5);
        let y = (Math.random() - 0.5) * (SPREAD * 1.0);
        
        // Push them away from the direct center to avoid hitting the camera lens
        if (Math.abs(x) < 2.0) x += Math.sign(x) * 2.0;
        if (Math.abs(y) < 1.5) y += Math.sign(y) * 1.5;

        nodes.push({ skill, position: [x, y, z], clusterId: cluster.id });
      });
    });
    return nodes;
  }, []);

  // Animate the camera flight based on scroll position
  useFrame((state) => {
    if (cameraGroup.current && scrollProgress) {
      // scrollProgress.get() returns a value between 0 and 1 representing the scroll of the 400vh section
      const targetZ = -scrollProgress.get() * FLIGHT_LENGTH;
      cameraGroup.current.position.z = THREE.MathUtils.lerp(
        cameraGroup.current.position.z,
        targetZ,
        0.05 
      );
      
      // Add slight organic sway to the camera
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

      {/* The Starfield */}
      <points geometry={starGeometry}>
        <pointsMaterial color="#E5DFD3" size={0.06} transparent opacity={0.4} sizeAttenuation={true} />
      </points>

      {/* Floating 3D Titles for each Zone */}
      {clusters.map((cluster) => (
         <Html
           key={cluster.id}
           position={[0, 0, -cluster.zOffset * FLIGHT_LENGTH - 20]} // 20 units deeper so it looms in the distance
           center
           distanceFactor={20}
           zIndexRange={[50, 0]}
         >
            <h3 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#E5DFD3]/20 to-[#1A2A40]/10 tracking-[0.5em] uppercase pointer-events-none whitespace-nowrap">
              {cluster.title}
            </h3>
         </Html>
      ))}

      {/* The Tech Logos */}
      {allSkillNodes.map((node, i) => (
        <Html 
          key={i} 
          position={node.position}
          center
          distanceFactor={15} 
          zIndexRange={[100, 0]}
        >
          <div className="relative group cursor-pointer animate-pulse-slow">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#1A2A40]/50 backdrop-blur-md border border-[#8C2B3D]/30 shadow-[0_0_20px_rgba(140,43,61,0.2)] group-hover:border-[#E5DFD3]/80 group-hover:bg-[#8C2B3D]/40 transition-all duration-500 group-hover:scale-110">
              <img 
                src={`https://cdn.simpleicons.org/${node.skill.icon}/E5DFD3`} 
                alt={node.skill.name}
                className="w-8 h-8 opacity-70 group-hover:opacity-100 transition-all duration-500 drop-shadow-[0_0_8px_rgba(229,223,211,0.3)]"
              />
            </div>
            
            <div className="absolute left-1/2 -translate-x-1/2 -top-12 px-4 py-2 rounded-lg border border-[#E5DFD3]/20 bg-[#1A2A40]/80 backdrop-blur-md text-[#E5DFD3] text-sm font-bold tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 pointer-events-none shadow-[0_0_15px_rgba(140,43,61,0.4)]">
              {node.skill.name.toUpperCase()}
            </div>
          </div>
        </Html>
      ))}
    </>
  );
};
