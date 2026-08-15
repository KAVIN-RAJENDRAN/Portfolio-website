import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { portfolioData } from '../data/portfolioData';
import { AssetImage } from './AssetImage';
import { ThreeDTilt } from './ThreeDTilt';
import { ArrowUpRight, Terminal, RefreshCw } from 'lucide-react';

const JSON_LINES = [
  '{',
  '  "name": "Kavin Rajendran",',
  '  "role": "AI Engineer",',
  '  "degree": "B.Tech CSE (AI & ML)",',
  '  "gpa": 9.57,',
  '  "internships": 2,',
  '  "projects": 4,',
  '  "skills": [',
  '    "Data Engineering",',
  '    "SQL",',
  '    "Data Science",',
  '    "Python",',
  '    "Machine Learning"',
  '  ],',
  '  "status": "Open to opportunities"',
  '}'
];

export const About: React.FC = () => {
  const { education } = portfolioData;

  // Real code terminal controls state variables
  const [isProfileClosed, setIsProfileClosed] = useState(false);
  const [isProfileMinimized, setIsProfileMinimized] = useState(false);
  const [isProfileFullscreen, setIsProfileFullscreen] = useState(false);

  // References for focus trap & restoration
  const greenButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Body scroll locking when fullscreen is active
  useEffect(() => {
    if (isProfileFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isProfileFullscreen]);

  // Escape key handler for closing fullscreen modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isProfileFullscreen) {
        handleCloseFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isProfileFullscreen]);

  // Focus trapping inside fullscreen modal
  useEffect(() => {
    if (!isProfileFullscreen) return;

    const modalElement = modalRef.current;
    if (!modalElement) return;

    const focusableElements = modalElement.querySelectorAll('button, [tabindex="0"]');
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleTab);
    firstElement.focus(); // Focus first button inside modal on mount

    return () => window.removeEventListener('keydown', handleTab);
  }, [isProfileFullscreen]);

  const handleCloseFullscreen = () => {
    setIsProfileFullscreen(false);
    // Restore focus to the green button in original view after modal closes
    setTimeout(() => {
      greenButtonRef.current?.focus();
    }, 50);
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsProfileClosed(true);
  };

  const handleMinimizeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsProfileMinimized(!isProfileMinimized);
  };

  const handleFullscreenClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsProfileFullscreen(!isProfileFullscreen);
  };

  const handleRestoreClick = () => {
    setIsProfileClosed(false);
  };

  const highlightJsonLine = (line: string) => {
    // Brackets
    if (line === '{' || line === '}' || line.trim() === ']' || line.trim() === '],') {
      return <span className="syntax-bracket">{line}</span>;
    }
    
    // Skills array opener
    if (line.trim() === '"skills": [') {
      return (
        <>
          <span className="syntax-property">  "skills"</span>
          <span className="syntax-punctuation">: </span>
          <span className="syntax-bracket">[</span>
        </>
      );
    }
    
    // Standard key-value mapping
    const match = line.match(/^(\s*)(".*?")(\s*:\s*)(.*?)(,?)$/);
    if (match) {
      const indent = match[1];
      const key = match[2];
      const colon = match[3];
      const val = match[4];
      const comma = match[5];

      let valEl = null;
      if (val.startsWith('"')) {
        const isStatusOpen = val.includes('Open to opportunities');
        valEl = (
          <span className={`syntax-string ${isStatusOpen ? 'font-semibold' : ''}`}>
            {val}
          </span>
        );
      } else if (!isNaN(Number(val.trim()))) {
        valEl = <span className="syntax-number font-mono">{val}</span>;
      } else {
        valEl = <span>{val}</span>;
      }

      return (
        <>
          <span>{indent}</span>
          <span className="syntax-property font-semibold">{key}</span>
          <span className="syntax-punctuation">{colon}</span>
          {valEl}
          {comma && <span className="syntax-punctuation">{comma}</span>}
        </>
      );
    }

    // Inside array items (strings)
    const arrayStrMatch = line.match(/^(\s*)(".*?")(,?)$/);
    if (arrayStrMatch) {
      const indent = arrayStrMatch[1];
      const val = arrayStrMatch[2];
      const comma = arrayStrMatch[3];
      return (
        <>
          <span>{indent}</span>
          <span className="syntax-string">{val}</span>
          {comma && <span className="syntax-punctuation">{comma}</span>}
        </>
      );
    }

    return <span>{line}</span>;
  };

  // Stagger reveal animation for the editor lines
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -10 },
    show: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.3, ease: 'easeOut' } 
    }
  };

  return (
    <section id="about" className="section bg-background relative py-20 select-none md:select-text">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading title="About Me" subtitle="Get to Know More" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: profile.json (5 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-4 justify-center min-h-[300px]">
            <AnimatePresence mode="wait">
              {isProfileClosed ? (
                /* Restore Code Trigger Control */
                <motion.div
                  key="restore-control"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center p-8 border border-border/80 rounded-xl bg-surface/10 glass-card text-center"
                >
                  <Terminal size={36} className="text-accent mb-3 animate-pulse" />
                  <p className="text-sm text-text-secondary mb-4">profile.json has been closed.</p>
                  
                  <button
                    onClick={handleRestoreClick}
                    className="btn-custom py-2.5 px-5 rounded-lg bg-text-primary text-background hover:bg-transparent hover:text-text-primary border border-text-primary font-mono text-xs flex items-center gap-2 transition-all shadow-md focus-visible:outline-2"
                    aria-label="Open profile window"
                  >
                    <RefreshCw size={13} />
                    <span>Open profile.json</span>
                  </button>
                </motion.div>
              ) : (
                /* Normal Profile Terminal Card (Wrapped in ThreeDTilt) */
                <motion.div
                  key="profile-card"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="w-full font-mono"
                >
                  <ThreeDTilt maxTilt={isProfileMinimized ? 2 : 6}>
                    <div className="glass-card rounded-xl overflow-hidden shadow-2xl border border-border/80 relative" style={{ backgroundColor: '#0D1F17' }}>
                      
                      {/* Editor Header Bar */}
                      <div className="flex items-center justify-between px-4 py-3 bg-[#0D1F17] border-b border-border/80 select-none">
                        {/* Interactive Window Controls */}
                        <div className="flex items-center gap-2">
                          {/* Red Close button */}
                          <button
                            onClick={handleCloseClick}
                            className="w-3.5 h-3.5 rounded-full bg-[#FC5753] hover:brightness-75 transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                            title="Close"
                            aria-label="Close profile window"
                          />
                          {/* Yellow Minimize button */}
                          <button
                            onClick={handleMinimizeClick}
                            className="w-3.5 h-3.5 rounded-full bg-[#FDBC40] hover:brightness-75 transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                            title={isProfileMinimized ? "Restore" : "Minimize"}
                            aria-label={isProfileMinimized ? "Restore profile window" : "Minimize profile window"}
                          />
                          {/* Green Fullscreen button */}
                          <button
                            ref={greenButtonRef}
                            onClick={handleFullscreenClick}
                            className="w-3.5 h-3.5 rounded-full bg-[#36C84B] hover:brightness-75 transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                            title="Maximize"
                            aria-label="Maximize profile window"
                          />
                        </div>
                        
                        {/* Tab Title */}
                        <span className="text-xs font-mono font-medium text-text-secondary flex items-center gap-1.5 select-none">
                          <span className="syntax-bracket">{`{}`}</span>
                          profile.json
                        </span>
                        
                        <div className="w-10" /> {/* Spacer */}
                      </div>

                      {/* Smooth minimized/expanded code body transition */}
                      <motion.div
                        initial={false}
                        animate={{
                          height: isProfileMinimized ? 0 : 'auto',
                          opacity: isProfileMinimized ? 0 : 1
                        }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden relative select-text"
                        style={{ backgroundColor: '#0D1F17' }}
                      >
                        <div className="p-5 font-mono text-xs md:text-sm leading-relaxed editor-code" style={{ backgroundColor: '#0D1F17' }}>
                          <motion.div
                            variants={container}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: '-10%' }}
                          >
                            {JSON_LINES.map((line, idx) => (
                              <motion.div key={idx} variants={item} className="flex font-mono">
                                {/* Line numbers */}
                                <span className="w-6 text-right syntax-line-number select-none mr-4 font-mono font-light opacity-50">
                                  {idx + 1}
                                </span>
                                {/* Line content */}
                                <span className="font-mono">{highlightJsonLine(line)}</span>
                                {/* Blinking cursor */}
                                {idx === JSON_LINES.length - 1 && (
                                  <span className="terminal-cursor ml-1" />
                                )}
                              </motion.div>
                            ))}
                          </motion.div>
                        </div>
                      </motion.div>

                    </div>
                  </ThreeDTilt>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Details & Biography (7 columns) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-mono tracking-widest text-text-secondary uppercase select-none">
                Education
              </span>
              
              {/* 3D Education Card */}
              <ThreeDTilt maxTilt={4}>
                <a
                  href={education.institutionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group glass-card p-6 rounded-xl flex items-center gap-5 cursor-pointer relative transition-all duration-300 hover:shadow-lg border border-border/80 hover:border-accent/40 bg-surface/10"
                >
                  <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-accent to-accent-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                  {/* Logo */}
                  <div className="w-16 h-16 rounded-xl bg-white p-2 border border-border flex items-center justify-center flex-shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <AssetImage
                      src={education.logo}
                      alt={education.institution}
                      initials="SRM"
                      className="max-h-full max-w-full object-contain"
                      containerClassName="w-12 h-12 text-xs rounded-xl"
                    />
                  </div>

                  {/* Content details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5 select-none">
                      <span className="bg-accent/10 text-accent font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-full font-semibold border border-accent/20">
                        {education.degree}
                      </span>
                      <span className="bg-accent-success/15 text-accent-success font-mono text-[9px] tracking-wider uppercase px-2.5 py-0.5 rounded-full font-bold border border-accent-success/20">
                        GPA {education.gpa}
                      </span>
                    </div>
                    <h4 className="card-heading-custom text-text-primary mb-0.5 group-hover:text-accent transition-colors">
                      {education.institution}
                    </h4>
                    <p className="text-text-secondary text-xs font-mono flex items-center gap-2 select-none">
                      <span>{education.duration}</span>
                      <span>·</span>
                      <span>{education.location}</span>
                    </p>
                  </div>

                  <div className="text-text-secondary group-hover:text-accent transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1 pr-1 select-none">
                    <ArrowUpRight size={20} />
                  </div>
                </a>
              </ThreeDTilt>
            </div>

            {/* Biography Paragraph */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative p-6 rounded-xl border border-border/60 bg-surface/25 backdrop-blur-sm shadow-sm text-text-secondary text-base leading-relaxed pl-7"
            >
              <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl bg-gradient-to-b from-accent via-accent-secondary to-accent-additional select-none" />
              
              <p className="font-sans">
                B.Tech student in Computer Science and Engineering with a specialization in{' '}
                <span className="text-accent font-semibold font-sans">Artificial Intelligence and Machine Learning</span> at SRM Institute of Science and Technology. Passionate about building intelligent software solutions that combine{' '}
                <span className="text-accent font-bold font-sans">AI</span>,{' '}
                <span className="text-accent-secondary font-semibold font-sans">full-stack development</span> and{' '}
                <span className="text-accent-additional font-semibold font-sans">data-driven technologies</span>. With hands-on experience through{' '}
                <span className="text-accent font-medium font-sans">industry internships</span> and{' '}
                <span className="text-accent-secondary font-medium font-sans">research projects</span>, I enjoy solving real-world problems by developing{' '}
                <span className="text-accent-success font-semibold font-sans">scalable, efficient and impactful applications</span>.{' '}
                <span className="inline-block text-accent font-mono font-bold text-xs tracking-wide bg-accent/10 px-2 py-0.5 rounded select-all mt-1">
                  Always learning, always building
                </span>
              </p>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Fullscreen Editor Modal Popup */}
      <AnimatePresence>
        {isProfileFullscreen && (
          <div
            role="dialog"
            aria-modal="true"
            ref={modalRef}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4 select-none md:select-text"
            onClick={handleCloseFullscreen}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-[88vw] h-[82vh] border border-border/80 rounded-xl overflow-hidden shadow-2xl flex flex-col justify-between"
              style={{ backgroundColor: '#0D1F17' }}
              onClick={(e) => e.stopPropagation()} // Prevent closing on clicking card itself
            >
              {/* Modal Header bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#0D1F17] border-b border-border/80 select-none">
                {/* Visual Window Controls inside modal */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsProfileClosed(true);
                      setIsProfileFullscreen(false);
                    }}
                    className="w-3.5 h-3.5 rounded-full bg-[#FC5753] hover:brightness-75 transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    title="Close"
                    aria-label="Close profile window"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsProfileMinimized(true);
                      setIsProfileFullscreen(false);
                    }}
                    className="w-3.5 h-3.5 rounded-full bg-[#FDBC40] hover:brightness-75 transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    title="Minimize"
                    aria-label="Minimize profile window"
                  />
                  <button
                    onClick={handleCloseFullscreen}
                    className="w-3.5 h-3.5 rounded-full bg-[#36C84B] hover:brightness-75 transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    title="Maximize"
                    aria-label="Exit fullscreen profile window"
                  />
                </div>

                <span className="text-xs font-mono font-medium text-text-secondary flex items-center gap-1.5 select-none">
                  <span className="syntax-bracket">{`{}`}</span>
                  profile.json
                </span>

                <button
                  onClick={handleCloseFullscreen}
                  className="text-[10px] font-mono text-text-secondary hover:text-text-primary border border-border/60 px-2 py-0.5 rounded transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Close Fullscreen
                </button>
              </div>

              {/* Fullscreen Code Body (Opaque, Scrollable, Size 18px) */}
              <div className="flex-1 p-6 font-mono text-lg overflow-y-auto select-text" style={{ backgroundColor: '#0D1F17' }}>
                <div className="editor-code-fullscreen font-mono text-base md:text-lg leading-relaxed" style={{ backgroundColor: '#0D1F17' }}>
                  {JSON_LINES.map((line, idx) => (
                    <div key={idx} className="flex font-mono">
                      {/* Line Numbers */}
                      <span className="w-8 text-right syntax-line-number select-none mr-4 font-mono font-light opacity-50">
                        {idx + 1}
                      </span>
                      {/* Line contents */}
                      <span className="font-mono">{highlightJsonLine(line)}</span>
                      {/* Blinking cursor */}
                      {idx === JSON_LINES.length - 1 && (
                        <span className="terminal-cursor ml-1" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
