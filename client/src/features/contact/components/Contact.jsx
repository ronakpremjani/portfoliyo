import React, { useRef } from 'react';
import { Container } from '../../../components/ui/Container';
import { SectionTitle } from '../../../components/ui/SectionTitle';
import { Input } from '../../../components/ui/Input';
import { Textarea } from '../../../components/ui/Textarea';
import { Button } from '../../../components/ui/Button';
import { useReveal } from '../../../hooks/useReveal';
import { useTextReveal } from '../../../hooks/useTextReveal';
import { trackFormSubmission } from '../../../utils/analytics';

export const Contact = () => {
  const sectionRef = useRef(null);

  useReveal(sectionRef, '.reveal-left', { type: 'slide' });
  useReveal(sectionRef, '.reveal-right', { type: 'scale', delay: 0.2 });
  useTextReveal(sectionRef, '.reveal-text');

  const handleSubmit = (e) => {
    e.preventDefault();
    trackFormSubmission('success');
    // Implement actual form submission logic here
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-32 bg-brand-gray-light border-b border-brand-gray">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="reveal-left">
            <SectionTitle 
              title="Let's build something exceptional together." 
              subtitle="// 08. Contact" 
            />
            <p className="text-brand-gray-dark mt-6 mb-12 leading-relaxed">
              My inbox is always open. Whether you have a question, want to discuss a project, or just want to say hello, I'll do my best to get back to you quickly.
            </p>
            <div className="flex flex-col gap-4 font-mono text-sm">
              <a href="mailto:hello@example.com" className="text-brand-black hover:underline underline-offset-4">hello@example.com</a>
              <span className="text-brand-gray-dark">Based in New Delhi, India</span>
            </div>
          </div>
          
          <div className="reveal-right bg-brand-white p-8 rounded-lg border border-brand-gray shadow-sm">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-semibold text-brand-black">Name</label>
                <Input id="name" type="text" placeholder="John Doe" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold text-brand-black">Email</label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-semibold text-brand-black">Message</label>
                <Textarea id="message" placeholder="Tell me about your project..." className="min-h-[150px]" />
              </div>
              <Button type="submit" size="lg" className="mt-4">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
};
