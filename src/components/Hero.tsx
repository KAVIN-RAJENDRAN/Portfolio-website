import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { AssetImage } from './AssetImage';
import { ThreeDTilt } from './ThreeDTilt';
import { Linkedin, Github, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const { name, headline, profileImage, resumePdf, socials } = portfolioData.personal;
  const [typedText, setTypedText] = useState('');

  // Typing effect for the subtitle/headline
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(headline.substring(0, index));
      index++;
      if (index > headline.length) {
        clearInterval(interval);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [headline]);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const offset = 80;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', '#contact');
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-24 pb-12 relative overflow-hidden"
    >
      {/* Subtle Analytics Wave background decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-[0.12] flex items-center justify-center">
        <svg className="w-[120%] h-[120%] stroke-accent/20 dark:stroke-accent/10 fill-none" viewBox="0 0 1000 1000">
          <path d="M 0,500 Q 250,300 500,500 T 1000,500" strokeWidth="1.5" />
          <path d="M 0,400 Q 250,600 500,400 T 1000,400" strokeWidth="1.5" />
          <path d="M 0,600 Q 250,450 500,600 T 1000,600" strokeWidth="1.5" strokeDasharray="5 5" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16 z-10">
        
        {/* Profile Image with 3D Tilt and orbiting rings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="relative flex-shrink-0 order-1 md:order-2"
        >
          {/* Orbiting data rings */}
          <div className="absolute inset-0 rounded-full border border-dashed border-accent/25 animate-spin select-none pointer-events-none" style={{ animationDuration: '24s' }} />
          <div className="absolute -inset-6 rounded-full border border-dotted border-accent-secondary/20 animate-spin select-none pointer-events-none" style={{ animationDuration: '36s', animationDirection: 'reverse' }} />
          
          {/* Orbiting data points */}
          <motion.div
            animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-2 left-2 w-3 h-3 rounded-full bg-accent/40 blur-[1px] select-none pointer-events-none"
          />
          <motion.div
            animate={{ y: [12, -12, 12], x: [8, -8, 8] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-4 right-2 w-2 h-2 rounded-full bg-accent-secondary/50 blur-[1px] select-none pointer-events-none"
          />

          <ThreeDTilt maxTilt={15}>
            <div className="w-64 h-64 md:w-72 md:h-72 rounded-full p-[3px] border border-border bg-surface-elevated/40 backdrop-blur-md shadow-2xl relative group cursor-grab active:cursor-grabbing">
              {/* Colored Glow behind photo */}
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-accent to-accent-secondary opacity-30 blur-md group-hover:opacity-50 transition-opacity select-none pointer-events-none" />
              
              <AssetImage
                src={profileImage}
                alt={name}
                initials="KR"
                className="w-full h-full rounded-full object-cover transition-all duration-500 relative z-10"
                containerClassName="w-full h-full text-4xl"
              />
            </div>
          </ThreeDTilt>
        </motion.div>

        {/* Hero Text Content */}
        <div className="flex-1 text-center md:text-left order-2 md:order-1">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-text-secondary font-mono text-xs uppercase tracking-widest mb-3"
          >
            Hello, I'm
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hero-name-custom mb-4 leading-[1.05]"
          >
            <span className="bg-gradient-to-r from-accent via-accent-additional to-accent-secondary text-transparent bg-clip-text">
              {name}
            </span>
          </motion.h1>

          {/* Typing subtitle */}
          <div className="min-h-[3.75rem] md:min-h-[3rem] mb-8 max-w-lg">
            <span className="text-base md:text-lg text-text-secondary font-mono leading-relaxed select-text">
              {typedText}
              <span className="inline-block w-2 h-4 bg-accent ml-0.5 animate-terminal-blink" />
            </span>
          </div>

          {/* Glowing buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-8 select-none"
          >
            <motion.a
              href={resumePdf}
              download="Kavin_Rajendran_Resume.pdf"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden group border border-border text-text-primary bg-background/50 hover:bg-text-primary hover:text-background font-mono text-xs font-semibold py-3.5 px-6 rounded-lg transition-colors inline-block shadow-sm btn-custom"
              title="Download Kavin Rajendran's Resume PDF"
            >
              Download Resume
            </motion.a>
            
            <motion.a
              href="#contact"
              onClick={handleContactClick}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="bg-text-primary text-background hover:bg-transparent hover:text-text-primary border border-text-primary font-mono text-xs font-bold py-3.5 px-6 rounded-lg transition-all inline-block shadow-lg btn-custom"
            >
              Contact Me
            </motion.a>
          </motion.div>

          {/* Social Profiles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center md:justify-start gap-3 select-none"
          >
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 border border-border hover:border-accent text-text-secondary hover:text-accent rounded-lg bg-surface/30 hover:bg-surface transition-all duration-300 shadow-sm"
              aria-label="LinkedIn"
              title="Kavin's LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 border border-border hover:border-accent text-text-secondary hover:text-accent rounded-lg bg-surface/30 hover:bg-surface transition-all duration-300 shadow-sm"
              aria-label="GitHub"
              title="Kavin's GitHub"
            >
              <Github size={18} />
            </a>
          </motion.div>
        </div>

      </div>

      {/* Down Scroll Indicator */}
      <a
        href="#about"
        className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center w-9 h-9 border border-border rounded-full text-text-secondary hover:text-accent hover:border-accent transition-colors select-none animate-bounce"
        aria-label="Scroll down"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </a>
    </section>
  );
};
