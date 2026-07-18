import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../../../components/ui/Container';
import { SectionTitle } from '../../../components/ui/SectionTitle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { useReveal } from '../../../hooks/useReveal';
import { useTextReveal } from '../../../hooks/useTextReveal';
import { trackProjectClick } from '../../../utils/analytics';

const projects = [
  {
    title: "Portfolio CMS Architecture",
    overview: "A highly optimized headless CMS built from the ground up to serve developer portfolios with zero latency.",
    challenge: "Developers often rely on bloated CMS platforms or manual Markdown files, making seamless content updates and media management across different clients unnecessarily complex and slow.",
    solution: "Architected a custom headless CMS featuring real-time data sync, a robust GraphQL layer, and automated deployment webhooks. The system is designed to trigger static builds instantly upon content publishing.",
    features: ["Real-time Data Sync", "GraphQL API", "Automated Webhooks", "Custom Dashboard UI"],
    techStack: ["Node.js", "GraphQL", "MongoDB", "Redis", "React"],
    results: "Reduced content update workflow time by 80% and achieved a 99.9% cache hit ratio on the edge layer.",
    lessons: "Mastered the intricacies of cache invalidation strategies and optimizing GraphQL resolvers for deep relational queries.",
    demoLink: "#",
    sourceLink: "#"
  },
  {
    title: "Enterprise Analytics Dashboard",
    overview: "A high-performance financial analytics dashboard processing and visualizing massive datasets in real-time.",
    challenge: "Rendering millions of data points on the client-side was causing severe main-thread blocking, leading to an unresponsive UI and poor user experience for enterprise clients.",
    solution: "Implemented WebGL for hardware-accelerated data visualization and aggressive client-side caching. Offloaded heavy data transformation to Web Workers to keep the UI thread completely unblocked.",
    features: ["WebGL Rendering", "Web Worker Processing", "Real-time WebSockets", "Custom Charting"],
    techStack: ["TypeScript", "WebGL", "React", "PostgreSQL", "Go"],
    results: "Achieved a consistent 60fps rendering performance for datasets exceeding 5 million rows, eliminating UI freezing.",
    lessons: "Deepened my understanding of browser memory management, garbage collection pausing, and WebGL context limitations.",
    demoLink: "#",
    sourceLink: "#"
  }
];

export const FeaturedWork = () => {
  const sectionRef = useRef(null);

  // Apply scroll reveal for cards
  useReveal(sectionRef, '.reveal-card', { type: 'clip', stagger: 0.2 }, true);
  
  // Apply text reveal for heading
  useTextReveal(sectionRef, '.reveal-text');

  return (
    <section id="work" ref={sectionRef} className="py-24 md:py-32 bg-brand-white border-b border-brand-gray">
      <Container>
        <SectionTitle 
          title="Featured Work" 
          subtitle="// 02. Selected Projects" 
        />
        
        <div className="grid grid-cols-1 gap-16 mt-16">
          {projects.map((project, idx) => (
            <motion.div 
              key={idx}
              data-cursor="image"
              className="reveal-card w-full"
              whileHover="hover"
              initial="initial"
            >
              <Card className="flex flex-col border-brand-gray transition-colors duration-300 relative overflow-hidden group">
                <motion.div 
                  className="absolute inset-0 border-2 border-brand-black opacity-0 rounded-lg pointer-events-none z-10"
                  variants={{
                    initial: { opacity: 0 },
                    hover: { opacity: 1, transition: { duration: 0.3 } }
                  }}
                />
                
                <div className="flex flex-col lg:flex-row">
                  <div className="w-full lg:w-1/3 flex flex-col border-b lg:border-b-0 lg:border-r border-brand-gray bg-brand-gray-light/10">
                    <CardHeader className="pt-8 px-8 pb-6">
                      <CardTitle className="text-2xl">{project.title}</CardTitle>
                      <CardDescription className="mt-4 text-brand-gray-dark leading-relaxed text-base">
                        {project.overview}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="px-8 pb-8 flex-grow">
                      <h4 className="text-xs font-semibold text-brand-black uppercase tracking-widest mb-3">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map(tag => (
                          <motion.span 
                            key={tag}
                            variants={{
                              initial: { y: 0 },
                              hover: { y: -2, transition: { type: 'spring', stiffness: 400 } }
                            }}
                          >
                            <Badge variant="secondary">{tag}</Badge>
                          </motion.span>
                        ))}
                      </div>
                    </CardContent>
                    
                    <CardFooter className="px-8 pb-8 flex gap-4">
                      <Button variant="primary" asChild>
                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer" aria-label={`Live Demo for ${project.title}`} onClick={() => trackProjectClick(project.title, 'Live Demo')}>Live Demo</a>
                      </Button>
                      <Button variant="outline" asChild>
                        <a href={project.sourceLink} target="_blank" rel="noopener noreferrer" aria-label={`Source Code for ${project.title}`} onClick={() => trackProjectClick(project.title, 'Source Code')}>Source Code</a>
                      </Button>
                    </CardFooter>
                  </div>
                  
                  <div className="w-full lg:w-2/3 p-8 lg:p-12 flex flex-col gap-8">
                    <div>
                      <h4 className="text-xs font-semibold text-brand-black uppercase tracking-widest mb-3">The Challenge</h4>
                      <p className="text-brand-gray-dark leading-relaxed">{project.challenge}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-semibold text-brand-black uppercase tracking-widest mb-3">The Solution</h4>
                      <p className="text-brand-gray-dark leading-relaxed">{project.solution}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-xs font-semibold text-brand-black uppercase tracking-widest mb-3">Key Results</h4>
                        <p className="text-brand-gray-dark leading-relaxed">{project.results}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-brand-black uppercase tracking-widest mb-3">Lessons Learned</h4>
                        <p className="text-brand-gray-dark leading-relaxed">{project.lessons}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
