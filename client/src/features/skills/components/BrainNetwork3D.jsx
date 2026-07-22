import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const allSkills = [
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "nextdotjs" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Tailwind", icon: "tailwindcss" },
  { name: "Node.js", icon: "nodedotjs" },
  { name: "Express", icon: "express" },
  { name: "GraphQL", icon: "graphql" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "Redis", icon: "redis" },
  { name: "Docker", icon: "docker" },
  { name: "AWS", icon: "amazonwebservices" },
  { name: "Framer", icon: "framer" },
  { name: "Three.js", icon: "threedotjs" },
  { name: "Go", icon: "go" },
  { name: "Python", icon: "python" },
  { name: "Git", icon: "git" },
  { name: "Figma", icon: "figma" },
  { name: "Vercel", icon: "vercel" },
  { name: "Kubernetes", icon: "kubernetes" }
];

const randomRange = (min, max) => Math.random() * (max - min) + min;

export const BrainNetwork3D = () => {
  // 1. Procedurally generate a more accurate brain point cloud
  const { points, lines, skillNodes } = useMemo(() => {
    const numPoints = 2000; // Increased density for a solid look
    const rawPoints = [];
    
    // We want points mostly on the surface shell for that brain look
    for (let i = 0; i < numPoints; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      const r = randomRange(3.8, 4.2); // Tighter radius band for a cleaner surface
    
      let x = r * Math.sin(phi) * Math.cos(theta);
      let y = r * Math.sin(phi) * Math.sin(theta);
      let z = r * Math.cos(phi);
    
      // Anatomical shaping
      z *= 1.25; // Elongate front-to-back
      x *= 0.85; // Narrower side-to-side
      
      if (y < 0) {
        y *= 0.6; // Flatten the bottom (base of brain)
      }
      
      if (z < 0 && y > 0) {
        y += Math.abs(z) * 0.15; // Slight bulge in the back (occipital lobe)
      }

      // Longitudinal fissure (the split down the middle)
      const absX = Math.abs(x);
      if (absX < 0.3) {
        continue; // Discard points strictly in the center to create the gap
      } else {
        x += Math.sign(x) * 0.2; // Push hemispheres slightly apart
      }
    
      // Surface noise for "folds" (gyri/sulci)
      const noise = Math.sin(x * 3) * Math.cos(z * 3) * 0.15;
      x += noise;
      y += noise;
      z += noise;
    
      rawPoints.push(new THREE.Vector3(x, y, z));
    }

    // 2. Generate connections (Surface Mesh)
    const rawLines = [];
    // Only connect points that are VERY close to form a tight surface web, not a tangled mess
    for (let i = 0; i < rawPoints.length; i++) {
      let connections = 0;
      for (let j = i + 1; j < rawPoints.length; j++) {
        const dist = rawPoints[i].distanceTo(rawPoints[j]);
        if (dist < 0.7 && connections < 3) { // Shorter distance, fewer connections
          rawLines.push(rawPoints[i], rawPoints[j]);
          connections++;
        }
      }
    }

    // 3. Assign 20 specific points evenly distributed on the outer shell for the tech skills
    const skillAssignments = [];
    const usedIndices = new Set();
    
    // Sort points by how far out they are (we want skills on the extreme outside)
    const sortedPoints = [...rawPoints].map((p, index) => ({ p, index, dist: p.length() })).sort((a, b) => b.dist - a.dist);
    
    for (let i = 0; i < allSkills.length; i++) {
      let bestPoint = null;
      let maxMinDist = -1;
      
      // Search a larger pool of outer points to ensure even distribution
      for (let j = 0; j < 300; j++) { 
        if (usedIndices.has(sortedPoints[j].index)) continue;
        
        let minDist = Infinity;
        for (const assigned of skillAssignments) {
          const d = sortedPoints[j].p.distanceTo(assigned.point);
          if (d < minDist) minDist = d;
        }
        
        if (skillAssignments.length === 0 || minDist > maxMinDist) {
          maxMinDist = skillAssignments.length === 0 ? Infinity : minDist;
          bestPoint = sortedPoints[j];
        }
      }
      
      if (bestPoint) {
        usedIndices.add(bestPoint.index);
        // Push the icon slightly further OUT from the brain surface so it doesn't clip
        const outPoint = bestPoint.p.clone().multiplyScalar(1.15); 
        skillAssignments.push({
          skill: allSkills[i],
          point: outPoint
        });
      }
    }

    return { 
      points: rawPoints, 
      lines: rawLines,
      skillNodes: skillAssignments
    };
  }, []);

  const pointGeometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  const lineGeometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(lines), [lines]);

  return (
    <>
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate={true}
        autoRotateSpeed={1.0}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
      <group>
        {/* Network Surface Lines */}
        <lineSegments geometry={lineGeometry}>
          <lineBasicMaterial color="#E5DFD3" transparent opacity={0.15} />
        </lineSegments>

        {/* Neural Surface Nodes */}
        <points geometry={pointGeometry}>
          <pointsMaterial color="#8C2B3D" size={0.06} sizeAttenuation={true} transparent opacity={0.7} />
        </points>

        {/* Floating Tech Stack HTML Labels */}
        {skillNodes.map((node, i) => (
          <Html 
            key={i} 
            position={[node.point.x, node.point.y, node.point.z]}
            center
            zIndexRange={[100, 0]}
            // Removed distanceFactor so the icons stay a clean, consistent size and don't become massive
          >
            <div className="relative group cursor-pointer">
              {/* Fixed Size Icon Circle (prevents 3D layout bugs) */}
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1A2A40]/90 backdrop-blur-md border border-[#E5DFD3]/20 shadow-[0_0_15px_rgba(140,43,61,0.3)] group-hover:border-[#8C2B3D] group-hover:bg-[#8C2B3D]/30 transition-all duration-300">
                <img 
                  src={`https://cdn.simpleicons.org/${node.skill.icon}/E5DFD3`} 
                  alt={node.skill.name}
                  className="w-5 h-5 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                />
              </div>
              
              {/* Pop-up Tooltip */}
              <div className="absolute left-1/2 -translate-x-1/2 -top-12 px-3 py-1.5 rounded-lg bg-[#8C2B3D] text-[#E5DFD3] text-sm font-bold tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 pointer-events-none shadow-lg">
                {node.skill.name}
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#8C2B3D]"></div>
              </div>
            </div>
          </Html>
        ))}
      </group>
    </>
  );
};
