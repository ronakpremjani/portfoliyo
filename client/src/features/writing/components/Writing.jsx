import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../../../components/ui/Container';
import { SectionTitle } from '../../../components/ui/SectionTitle';
import { useReveal } from '../../../hooks/useReveal';
import { useTextReveal } from '../../../hooks/useTextReveal';

const articles = [
  {
    title: "Architecting a Headless CMS for Portfolios",
    date: "October 24, 2024",
    platform: "Dev.to",
    readTime: "8 min read",
    link: "#"
  },
  {
    title: "Mastering React Render Optimization",
    date: "August 12, 2024",
    platform: "Medium",
    readTime: "6 min read",
    link: "#"
  },
  {
    title: "Smooth Scrolling & GSAP with React",
    date: "June 05, 2024",
    platform: "Hashnode",
    readTime: "5 min read",
    link: "#"
  }
];

export const Writing = () => {
  const sectionRef = useRef(null);

  // Apply batch slide reveal for articles
  useReveal(sectionRef, '.reveal-article', { type: 'slide', stagger: 0.15 }, true);
  
  // Apply text reveal for heading
  useTextReveal(sectionRef, '.reveal-text');

  return (
    <section id="writing" ref={sectionRef} className="py-24 md:py-32 bg-brand-white border-b border-brand-gray">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <SectionTitle 
            title="Writing & Thoughts" 
            subtitle="// 07. Knowledge Sharing" 
          />
          <a href="#" className="font-mono text-sm font-semibold text-brand-black hover:text-brand-gray-dark underline underline-offset-4 mb-2">
            View All Articles
          </a>
        </div>
        
        <div className="flex flex-col border-t border-brand-gray">
          {articles.map((article, idx) => (
            <motion.a 
              key={idx}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal-article group flex flex-col md:flex-row md:items-center justify-between gap-4 py-8 border-b border-brand-gray hover:bg-brand-gray-light/30 transition-colors px-4 -mx-4"
              data-cursor="pointer"
            >
              <div className="flex flex-col gap-2 max-w-2xl">
                <h3 className="text-xl md:text-2xl font-semibold text-brand-black group-hover:text-brand-gray-dark transition-colors">
                  {article.title}
                </h3>
                <div className="flex items-center gap-4 text-sm font-mono text-brand-gray-dark">
                  <span>{article.date}</span>
                  <span className="w-1 h-1 rounded-full bg-brand-gray-dark"></span>
                  <span>{article.readTime}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 self-start md:self-auto">
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-black bg-brand-gray-light px-3 py-1 rounded">
                  {article.platform}
                </span>
                <svg className="w-5 h-5 text-brand-gray-dark group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  );
};
