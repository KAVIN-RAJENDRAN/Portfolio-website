import React, { useState, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X, Clock } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'GitHub', id: 'github' },
  { label: 'Certifications', id: 'certifications' },
  { label: 'Contact', id: 'contact' }
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // IST Clock Parts
  const [timeParts, setTimeParts] = useState({ hour: '12', minute: '00', second: '00', period: 'AM' });

  // Scroll handler for background glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll spy
  useEffect(() => {
    const sectionIds = ['hero', ...NAV_ITEMS.map(item => item.id)];
    const elements = sectionIds.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  // Indian Standard Time (IST) Clock synchronizer
  useEffect(() => {
    const updateTime = () => {
      try {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
        const parts = formatter.formatToParts(new Date());
        
        setTimeParts({
          hour: parts.find(p => p.type === 'hour')?.value || '12',
          minute: parts.find(p => p.type === 'minute')?.value || '00',
          second: parts.find(p => p.type === 'second')?.value || '00',
          period: parts.find(p => p.type === 'dayPeriod')?.value || 'AM'
        });
      } catch (e) {
        console.error('Error formatting clock:', e);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };

    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState(null, '', '#');
  };

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 ${
        scrolled || mobileMenuOpen
          ? 'glass-nav py-3'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        {/* Terminal Brand Logo - Full Name */}
        <a
          href="#hero"
          onClick={handleLogoClick}
          className="font-mono font-bold text-[15px] flex items-center select-none text-text-primary tracking-tight"
        >
          <span className="text-accent mr-0.5">~/</span>Kavin Rajendran
          <span className="inline-block w-1.5 h-3.5 bg-accent ml-1 animate-terminal-blink" />
        </a>

        {/* Navigation Items (Desktop & Time Zone details) */}
        <div className="hidden min-[1100px]:flex items-center gap-[14px]">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavLinkClick(e, item.id)}
              className={`relative py-1 text-[12.5px] font-sans font-semibold uppercase tracking-wider transition-colors duration-300 hover:text-text-primary ${
                activeSection === item.id ? 'text-text-primary' : 'text-text-secondary'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent rounded-full" />
              )}
            </a>
          ))}
          
          <div className="h-4 w-[1px] bg-border" />

          {/* Live Indian Time Display */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border bg-surface/50 font-mono text-[11px] text-text-secondary select-none">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
            </span>
            <Clock size={11} className="text-text-secondary/70" />
            <span className="font-semibold text-text-primary uppercase font-mono text-[11px]">
              IST {timeParts.hour}:{timeParts.minute}
              <span className="hidden sm:inline">:{timeParts.second}</span> {timeParts.period}
            </span>
          </div>

          <div className="border-l border-border pl-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 min-[1100px]:hidden">
          {/* Live Indian Time Display (Compact on mobile) */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full border border-border bg-surface/50 font-mono text-[9px] text-text-secondary select-none">
            <span className="relative flex h-1 w-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1 w-1 bg-accent"></span>
            </span>
            <span className="font-mono text-[9px]">
              {timeParts.hour}:{timeParts.minute} {timeParts.period}
            </span>
          </div>

          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 text-text-primary hover:text-text-secondary transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="min-[1100px]:hidden absolute top-full left-0 right-0 glass-nav border-t border-border flex flex-col p-6 gap-4 shadow-lg max-h-[85vh] overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavLinkClick(e, item.id)}
              className={`py-2 text-[13px] font-sans font-semibold uppercase tracking-wider border-b border-border/40 last:border-0 transition-colors ${
                activeSection === item.id ? 'text-text-primary font-bold pl-2 border-l-2 border-l-accent' : 'text-text-secondary'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};
