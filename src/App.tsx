import React, { useEffect } from 'react';
import { ThemeProvider } from './components/ThemeContext';
import { BackgroundSpotlight } from './components/BackgroundSpotlight';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { GitHubActivity } from './components/GitHubActivity';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = 'Come Back | Kavin Rajendran';
      } else {
        document.title = 'Kavin Rajendran | AI Engineer';
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <ThemeProvider>
      {/* Premium Spotlight Background Layer (Grid + Spotlight + Noise) */}
      <BackgroundSpotlight />
      
      {/* Desktop Custom Tracking Cursor */}
      <CustomCursor />
      
      {/* Navigation Header */}
      <Navbar />

      {/* Main Sections Wrapper */}
      <main className="relative z-10 select-none md:select-text">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <GitHubActivity />
        <Certifications />
        <Contact />
      </main>

      {/* Footer credits */}
      <Footer />
    </ThemeProvider>
  );
};

export default App;
