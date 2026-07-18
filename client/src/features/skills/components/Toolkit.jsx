import React, { useRef } from 'react';
import { Container } from '../../../components/ui/Container';
import { SectionTitle } from '../../../components/ui/SectionTitle';
import { useReveal } from '../../../hooks/useReveal';
import { useTextReveal } from '../../../hooks/useTextReveal';

export const Toolkit = () => {
  const sectionRef = useRef(null);

  // Apply batch slide reveal for skill lists
  useReveal(sectionRef, '.reveal-skill', { type: 'slide', stagger: 0.08 }, true);
  
  // Apply text reveal for heading
  useTextReveal(sectionRef, '.reveal-text');

  return (
    <section id="skills" ref={sectionRef} className="py-24 md:py-32 bg-brand-white border-b border-brand-gray">
      <Container>
        <SectionTitle 
          title="Development Toolkit" 
          subtitle="// 04. Skills" 
        />
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12 mt-16">
          <div className="reveal-skill">
            <h5 className="font-semibold text-brand-black text-sm uppercase tracking-wider mb-6">Frontend</h5>
            <ul className="flex flex-col gap-3 text-brand-gray-dark text-sm">
              <li>React &amp; Next.js</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Framer Motion</li>
              <li>WebGL &amp; Three.js</li>
            </ul>
          </div>
          <div className="reveal-skill">
            <h5 className="font-semibold text-brand-black text-sm uppercase tracking-wider mb-6">Backend</h5>
            <ul className="flex flex-col gap-3 text-brand-gray-dark text-sm">
              <li>Node.js &amp; Express</li>
              <li>GraphQL &amp; REST APIs</li>
              <li>Go</li>
              <li>Python</li>
              <li>Microservices</li>
            </ul>
          </div>
          <div className="reveal-skill">
            <h5 className="font-semibold text-brand-black text-sm uppercase tracking-wider mb-6">Database</h5>
            <ul className="flex flex-col gap-3 text-brand-gray-dark text-sm">
              <li>PostgreSQL</li>
              <li>MongoDB</li>
              <li>Redis</li>
              <li>Elasticsearch</li>
              <li>Prisma ORM</li>
            </ul>
          </div>
          <div className="reveal-skill">
            <h5 className="font-semibold text-brand-black text-sm uppercase tracking-wider mb-6">Tools</h5>
            <ul className="flex flex-col gap-3 text-brand-gray-dark text-sm">
              <li>Git &amp; GitHub</li>
              <li>Webpack &amp; Vite</li>
              <li>Jest &amp; Cypress</li>
              <li>Figma</li>
              <li>Postman</li>
            </ul>
          </div>
          <div className="reveal-skill">
            <h5 className="font-semibold text-brand-black text-sm uppercase tracking-wider mb-6">Deployment</h5>
            <ul className="flex flex-col gap-3 text-brand-gray-dark text-sm">
              <li>Docker &amp; Kubernetes</li>
              <li>AWS (EC2, S3, RDS)</li>
              <li>Vercel &amp; Netlify</li>
              <li>CI/CD Pipelines</li>
              <li>Nginx</li>
            </ul>
          </div>
          <div className="reveal-skill">
            <h5 className="font-semibold text-brand-black text-sm uppercase tracking-wider mb-6">AI</h5>
            <ul className="flex flex-col gap-3 text-brand-gray-dark text-sm">
              <li>OpenAI API</li>
              <li>LangChain</li>
              <li>Vector Databases</li>
              <li>LLM Fine-tuning</li>
              <li>Prompt Engineering</li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
};
