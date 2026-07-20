import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ForceGraph2D from 'react-force-graph-2d';
import { ArrowLeft, ZoomIn, ZoomOut, Maximize } from 'lucide-react';

const graphData = {
  nodes: [
    { id: 'Fullstack Engineer', group: 0, val: 5 },
    
    // Core Categories
    { id: 'Frontend', group: 1, val: 3 },
    { id: 'Backend', group: 2, val: 3 },
    { id: 'Database', group: 3, val: 3 },
    { id: 'DevOps', group: 4, val: 3 },
    { id: 'Tools', group: 5, val: 3 },

    // Frontend
    { id: 'React', group: 1, val: 2 },
    { id: 'Next.js', group: 1, val: 2 },
    { id: 'Tailwind CSS', group: 1, val: 2 },
    { id: 'Redux', group: 1, val: 1 },
    { id: 'Framer Motion', group: 1, val: 1 },
    { id: 'Three.js', group: 1, val: 1 },
    { id: 'HTML', group: 1, val: 1 },
    { id: 'CSS', group: 1, val: 1 },
    { id: 'JavaScript', group: 1, val: 2 },

    // Backend
    { id: 'Node.js', group: 2, val: 2 },
    { id: 'Express.js', group: 2, val: 2 },
    { id: 'RESTful API', group: 2, val: 1 },
    { id: 'GraphQL', group: 2, val: 1 },

    // Database
    { id: 'MongoDB', group: 3, val: 2 },
    { id: 'Mongoose', group: 3, val: 1 },
    { id: 'PostgreSQL', group: 3, val: 2 },
    { id: 'Redis', group: 3, val: 1 },

    // DevOps
    { id: 'Git', group: 4, val: 2 },
    { id: 'Docker', group: 4, val: 2 },
    { id: 'AWS', group: 4, val: 2 },
    { id: 'CI/CD', group: 4, val: 1 },

    // Tools
    { id: 'VS Code', group: 5, val: 1 },
    { id: 'Figma', group: 5, val: 1 },
    { id: 'Postman', group: 5, val: 1 },

    // Future / Learning Goals
    { id: 'Learning Path', group: 6, val: 3, isFuture: true },
    
    // Testing (Future)
    { id: 'Testing', group: 6, val: 2, isFuture: true },
    { id: 'Playwright', group: 6, val: 1, isFuture: true },
    { id: 'Jest', group: 6, val: 1, isFuture: true },

    // Advanced Backend (Future)
    { id: 'Microservices', group: 6, val: 2, isFuture: true },
    { id: 'Kafka', group: 6, val: 1, isFuture: true },
    { id: 'WebSockets', group: 6, val: 1, isFuture: true },

    // Advanced DevOps (Future)
    { id: 'Kubernetes', group: 6, val: 2, isFuture: true },
    { id: 'Terraform', group: 6, val: 1, isFuture: true },

    // Modern Data (Future)
    { id: 'Prisma', group: 6, val: 1, isFuture: true },

    // AI & Mobile (Future)
    { id: 'React Native', group: 6, val: 2, isFuture: true },
    { id: 'AI / LLMs', group: 6, val: 2, isFuture: true },
    { id: 'LangChain', group: 6, val: 1, isFuture: true },
  ],
  links: [
    { source: 'Fullstack Engineer', target: 'Frontend' },
    { source: 'Fullstack Engineer', target: 'Backend' },
    { source: 'Fullstack Engineer', target: 'Database' },
    { source: 'Fullstack Engineer', target: 'DevOps' },
    { source: 'Fullstack Engineer', target: 'Tools' },

    // Frontend links
    { source: 'Frontend', target: 'HTML' },
    { source: 'Frontend', target: 'CSS' },
    { source: 'Frontend', target: 'JavaScript' },
    { source: 'JavaScript', target: 'React' },
    { source: 'React', target: 'Next.js' },
    { source: 'React', target: 'Redux' },
    { source: 'Frontend', target: 'Tailwind CSS' },
    { source: 'Frontend', target: 'Framer Motion' },
    { source: 'React', target: 'Three.js' },

    // Backend links
    { source: 'Backend', target: 'Node.js' },
    { source: 'Node.js', target: 'Express.js' },
    { source: 'Backend', target: 'RESTful API' },
    { source: 'Backend', target: 'GraphQL' },
    { source: 'Express.js', target: 'RESTful API' },

    // Database links
    { source: 'Database', target: 'MongoDB' },
    { source: 'MongoDB', target: 'Mongoose' },
    { source: 'Database', target: 'PostgreSQL' },
    { source: 'Database', target: 'Redis' },
    { source: 'Node.js', target: 'Database' }, // Cross connection

    // DevOps links
    { source: 'DevOps', target: 'Git' },
    { source: 'DevOps', target: 'Docker' },
    { source: 'DevOps', target: 'AWS' },
    { source: 'Git', target: 'CI/CD' },
    
    // Tools links
    { source: 'Tools', target: 'VS Code' },
    { source: 'Tools', target: 'Figma' },
    { source: 'Tools', target: 'Postman' },
    
    // Cross connections for organic graph
    { source: 'Frontend', target: 'Figma' },
    { source: 'Backend', target: 'Postman' },
    { source: 'CI/CD', target: 'AWS' },

    // Future Links
    { source: 'Fullstack Engineer', target: 'Learning Path' },
    { source: 'Learning Path', target: 'Testing' },
    { source: 'Learning Path', target: 'Microservices' },
    { source: 'Learning Path', target: 'Kubernetes' },
    { source: 'Learning Path', target: 'React Native' },
    { source: 'Learning Path', target: 'AI / LLMs' },

    { source: 'Testing', target: 'Playwright' },
    { source: 'Testing', target: 'Jest' },
    { source: 'Microservices', target: 'Kafka' },
    { source: 'Backend', target: 'WebSockets' }, 
    { source: 'DevOps', target: 'Kubernetes' }, 
    { source: 'Kubernetes', target: 'Terraform' },
    { source: 'Database', target: 'Prisma' }, 
    { source: 'React', target: 'React Native' }, 
    { source: 'AI / LLMs', target: 'LangChain' }
  ]
};

const groupColors = {
  0: '#E5DFD3', 
  1: '#8C2B3D', 
  2: '#A8A29E', 
  3: '#78716C', 
  4: '#57534E', 
  5: '#44403C', 
};

// Custom hook for responsive window size
const useWindowSize = () => {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  useEffect(() => {
    const handleResize = () => setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return size;
};

export const Journey = () => {
  const fgRef = useRef();
  const [width, height] = useWindowSize();
  const [hoverNode, setHoverNode] = useState(null);

  // Pre-calculate which nodes and links to highlight based on hover
  const highlightNodes = useMemo(() => {
    const set = new Set();
    if (hoverNode) {
      set.add(hoverNode.id);
      graphData.links.forEach(link => {
        // react-force-graph mutates source/target into objects after initialization
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        
        if (sourceId === hoverNode.id) set.add(targetId);
        if (targetId === hoverNode.id) set.add(sourceId);
      });
    }
    return set;
  }, [hoverNode]);

  const highlightLinks = useMemo(() => {
    const set = new Set();
    if (hoverNode) {
      graphData.links.forEach(link => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        
        if (sourceId === hoverNode.id || targetId === hoverNode.id) {
          set.add(link);
        }
      });
    }
    return set;
  }, [hoverNode]);

  // Custom Canvas Rendering for Obsidian Aesthetic
  const paintNode = useCallback((node, ctx, globalScale) => {
    const label = node.id;
    const isHovered = hoverNode && hoverNode.id === node.id;
    const isHighlighted = highlightNodes.has(node.id);
    const isDimmed = hoverNode && !isHighlighted;
    
    // Future nodes have a distinct styling
    const color = isDimmed ? 'rgba(229, 223, 211, 0.05)' : (node.isFuture ? 'rgba(229, 223, 211, 0.15)' : (groupColors[node.group] || '#E5DFD3'));
    const radius = isHovered ? node.val * 3 : node.val * 2;

    // Draw Glow
    ctx.beginPath();
    if (isHighlighted || isHovered) {
      ctx.shadowColor = node.isFuture ? '#E5DFD3' : color;
      ctx.shadowBlur = 15;
    } else {
      ctx.shadowBlur = 0;
    }
    
    // Draw Node
    ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();

    // If future, draw a dashed stroke to indicate "learning / in progress"
    if (node.isFuture && !isDimmed) {
      ctx.setLineDash([2, 2]);
      ctx.strokeStyle = isHovered || isHighlighted ? '#E5DFD3' : 'rgba(229, 223, 211, 0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]); // reset dash
    }

    // Reset shadow for text rendering
    ctx.shadowBlur = 0;

    // Render Text (Obsidian style: scales with zoom, hides if zoomed out unless highlighted)
    if (!isDimmed && (globalScale >= 1.2 || isHighlighted)) {
      const fontSize = isHovered ? 5 : 4;
      ctx.font = `${fontSize}px Sans-Serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = isHovered ? '#E5DFD3' : 'rgba(229, 223, 211, 0.7)';
      ctx.fillText(label, node.x, node.y + radius + 4);
    }
  }, [hoverNode, highlightNodes]);

  // Handle zooming to fit all nodes
  const handleCenter = useCallback(() => {
    if (fgRef.current) {
      fgRef.current.zoomToFit(800, 50);
    }
  }, []);

  // Center immediately on load
  useEffect(() => {
    setTimeout(() => {
      handleCenter();
    }, 500);
  }, [handleCenter]);

  return (
    <div className="relative w-full h-screen bg-[#1A2A40] overflow-hidden selection:bg-[#8C2B3D] selection:text-[#E5DFD3] font-sans">
      
      {/* Floating UI Layer */}
      <div className="absolute top-0 left-0 w-full z-10 p-6 md:p-12 pointer-events-none flex flex-col md:flex-row justify-between items-start">
        
        {/* Header Text */}
        <div className="pointer-events-auto">
          <Link to="/" className="inline-flex items-center text-[#E5DFD3]/60 hover:text-[#8C2B3D] transition-colors mb-6 font-sans text-sm group tracking-wider uppercase font-medium">
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" strokeWidth={2} />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-heading font-medium tracking-tight mb-2 text-[#E5DFD3]">
            Global <span className="text-[#8C2B3D] italic">Graph</span>
          </h1>
          <p className="text-sm md:text-base text-[#E5DFD3]/50 max-w-sm font-light">
            An interactive physics map of my complete fullstack ecosystem. Drag nodes and scroll to zoom.
          </p>
        </div>

        {/* Graph Controls */}
        <div className="pointer-events-auto flex gap-4 mt-6 md:mt-0">
          <button 
            onClick={() => fgRef.current.zoom(fgRef.current.zoom() * 1.5, 400)} 
            className="p-3 rounded-full bg-[#E5DFD3]/5 border border-[#E5DFD3]/10 hover:bg-[#8C2B3D]/20 hover:border-[#8C2B3D] transition-colors text-[#E5DFD3]"
            title="Zoom In"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button 
            onClick={() => fgRef.current.zoom(fgRef.current.zoom() / 1.5, 400)} 
            className="p-3 rounded-full bg-[#E5DFD3]/5 border border-[#E5DFD3]/10 hover:bg-[#8C2B3D]/20 hover:border-[#8C2B3D] transition-colors text-[#E5DFD3]"
            title="Zoom Out"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <button 
            onClick={handleCenter} 
            className="p-3 rounded-full bg-[#E5DFD3]/5 border border-[#E5DFD3]/10 hover:bg-[#8C2B3D]/20 hover:border-[#8C2B3D] transition-colors text-[#E5DFD3]"
            title="Reset View"
          >
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Physics Engine Graph */}
      <div className="w-full h-full cursor-grab active:cursor-grabbing">
        <ForceGraph2D
          ref={fgRef}
          width={width}
          height={height}
          graphData={graphData}
          nodeRelSize={4}
          nodeId="id"
          nodeLabel={() => ''} // Disable default tooltip
          nodeCanvasObject={paintNode}
          nodeCanvasObjectMode={() => 'replace'} // We are completely overriding the node drawing
          onNodeHover={setHoverNode}
          onNodeDragStart={() => setHoverNode(null)} // Prevent sticky hover while dragging
          
          // Link Styling
          linkWidth={link => highlightLinks.has(link) ? 2 : 1}
          linkColor={link => highlightLinks.has(link) ? '#8C2B3D' : (hoverNode ? 'rgba(229, 223, 211, 0.05)' : 'rgba(229, 223, 211, 0.2)')}
          
          // Flowing energy particles on highlighted paths!
          linkDirectionalParticles={link => highlightLinks.has(link) ? 4 : 0}
          linkDirectionalParticleWidth={3}
          linkDirectionalParticleSpeed={0.015}
          linkDirectionalParticleColor={() => '#8C2B3D'}
          
          // Physics Configuration
          d3VelocityDecay={0.2} // Makes nodes feel heavier, less bouncy
          d3AlphaDecay={0.02} // Let the graph simmer into position smoothly
          cooldownTicks={100} // Stop calculating physics after it settles to save battery
        />
      </div>
    </div>
  );
};

export default Journey;
