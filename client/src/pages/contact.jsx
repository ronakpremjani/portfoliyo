import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../components/ui/container';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/button';
import { BackButton } from '../components/ui/BackButton';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // Sending request to the backend contact route
      const res = await fetch('http://localhost:5000/api/v1/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success state after a few seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
      
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="w-full bg-[#E5DFD3] text-[#1A2A40] min-h-screen pt-32 pb-20 selection:bg-[#1A2A40] selection:text-[#E5DFD3]">
      <Container>
        <BackButton />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-12 md:mt-20">
          
          <div className="lg:col-span-5 flex flex-col gap-12">
            <SectionTitle subtitle="Get in Touch" title="Let's build something together." />
            
            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-4">Contact Information</h3>
              <p className="text-[#1A2A40]/70 text-lg leading-relaxed max-w-md">
                I'm currently available for freelance work and full-time roles. Let's discuss your next project.
              </p>
            </div>
            
            <div className="flex flex-col gap-6">
              <a href="mailto:ronakpremjani8@gmail.com" className="group flex flex-col gap-1">
                <span className="text-[#1A2A40]/50 uppercase tracking-widest text-xs font-semibold">Email</span>
                <span className="text-xl md:text-2xl font-medium group-hover:opacity-70 transition-opacity">ronakpremjani8@gmail.com</span>
              </a>
              <a href="tel:+918849240653" className="group flex flex-col gap-1">
                <span className="text-[#1A2A40]/50 uppercase tracking-widest text-xs font-semibold">Phone</span>
                <span className="text-xl md:text-2xl font-medium group-hover:opacity-70 transition-opacity">+91 88492 40653</span>
              </a>
              <div className="flex flex-col gap-1">
                <span className="text-[#1A2A40]/50 uppercase tracking-widest text-xs font-semibold">Location</span>
                <span className="text-xl md:text-2xl font-medium">Ahmedabad, India</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <motion.form 
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 bg-[#1A2A40] text-[#E5DFD3] p-8 md:p-12 rounded-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h3 className="text-2xl font-semibold mb-4">Send a message</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-[#E5DFD3]/20 text-[#E5DFD3] placeholder:text-[#E5DFD3]/40 focus:border-[#E5DFD3]"
                />
                <Input 
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-[#E5DFD3]/20 text-[#E5DFD3] placeholder:text-[#E5DFD3]/40 focus:border-[#E5DFD3]"
                />
              </div>

              <Input 
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="bg-transparent border-[#E5DFD3]/20 text-[#E5DFD3] placeholder:text-[#E5DFD3]/40 focus:border-[#E5DFD3]"
              />

              <Textarea 
                name="message"
                placeholder="Your Message..."
                value={formData.message}
                onChange={handleChange}
                required
                rows={10}
                className="bg-transparent border-[#E5DFD3]/20 text-[#E5DFD3] placeholder:text-[#E5DFD3]/40 focus:border-[#E5DFD3] resize-none"
              />

              <div className="mt-4">
                <Button 
                  type="submit" 
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full md:w-auto bg-[#E5DFD3] text-[#1A2A40] hover:bg-[#E5DFD3]/90 rounded-full px-12 py-6 text-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                </Button>
              </div>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-green-400 mt-2 text-sm"
                  >
                    Thanks for reaching out! I'll get back to you shortly.
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-400 mt-2 text-sm"
                  >
                    {errorMessage}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.form>
          </div>
          
        </div>
      </Container>
    </div>
  );
};

export default ContactPage;
