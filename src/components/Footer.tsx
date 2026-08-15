import React from 'react';
import { portfolioData } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const { name } = portfolioData.personal;

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState(null, '', '#');
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
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
    <footer className="border-t border-border/80 bg-background py-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Terminal Brand Logo scroll to top */}
        <a
          href="#hero"
          onClick={handleLogoClick}
          className="font-mono font-bold text-sm flex items-center select-none text-text-primary tracking-tight"
          title="Scroll back to top"
        >
          <span className="text-accent mr-0.5">~/</span>Kavin Rajendran
          <span className="inline-block w-2.5 h-3.5 bg-accent ml-0.5 animate-terminal-blink" />
        </a>

        {/* Footer Navigation Links */}
        <div className="flex flex-wrap justify-center items-center gap-6 select-none">
          {['about', 'projects', 'github', 'certifications', 'contact'].map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleLinkClick(e, id)}
              className="text-xs font-mono font-medium text-text-secondary hover:text-text-primary uppercase tracking-wider transition-colors"
            >
              {id}
            </a>
          ))}
        </div>

        {/* Copyright Statement */}
        <p className="text-xs font-mono text-text-secondary select-none">
          &copy; 2026 {name}. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
};
