import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { portfolioData, Experience as ExperienceType } from '../data/portfolioData';
import { AssetImage } from './AssetImage';
import { ThreeDTilt } from './ThreeDTilt';
import { MapPin, Calendar, Clock, ArrowUpRight } from 'lucide-react';

interface TimelineItemProps {
  exp: ExperienceType;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (idx: number | null) => void;
}

// Get company-specific style tokens
const getCompanyTheme = (companyName: string) => {
  const norm = companyName.toLowerCase();
  
  if (norm.includes('renault') || norm.includes('nissan')) {
    return {
      borderGlow: 'hover:border-[#22C55E]/40 hover:shadow-[0_0_15px_rgba(34,197,94,0.15)] shadow-[#22C55E]/5',
      nodeColor: 'bg-[#166534] dark:bg-[#4ADE80]',
      nodeShadow: 'shadow-[#166534]',
      pillAccent: 'bg-[#22C55E]/10 text-[#166534] dark:text-[#4ADE80] border-[#22C55E]/25',
      timelineGlow: 'rgba(34, 197, 94, 0.4)'
    };
  }
  
  // Murugappa Group orange theme
  return {
    borderGlow: 'hover:border-[#EA580C]/40 hover:shadow-[0_0_15px_rgba(234,88,12,0.15)] shadow-[#EA580C]/5',
    nodeColor: 'bg-[#EA580C] dark:bg-[#FB923C]',
    nodeShadow: 'shadow-[#EA580C]',
    pillAccent: 'bg-[#EA580C]/10 text-[#EA580C] dark:text-[#FB923C] border-[#EA580C]/25',
    timelineGlow: 'rgba(234, 88, 12, 0.4)'
  };
};

const TimelineItem: React.FC<TimelineItemProps> = ({
  exp,
  index,
  hoveredIndex,
  setHoveredIndex,
}) => {
  const isLeft = index % 2 === 0;
  const isHovered = hoveredIndex === index;
  const theme = getCompanyTheme(exp.company);

  return (
    <div className="relative flex flex-col lg:flex-row items-stretch mb-16 last:mb-0 w-full">
      {/* Central Timeline Node (Dot) */}
      <div className="absolute left-4 lg:left-1/2 top-6 -translate-x-1/2 z-20">
        <motion.div
          animate={{
            scale: isHovered ? 1.6 : 1,
            backgroundColor: isHovered ? theme.nodeColor.replace('bg-', '') : 'var(--background)',
            borderColor: isHovered ? 'var(--text-primary)' : 'var(--border)',
            boxShadow: isHovered 
              ? `0 0 15px ${theme.timelineGlow}` 
              : '0 0 0px transparent'
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={`w-5 h-5 rounded-full border-2 transition-all duration-200 cursor-pointer ${theme.nodeColor}`}
        />
      </div>

      {/* Even items Left hand positioning */}
      <div className="w-full lg:w-1/2 pr-0 lg:pr-12 pl-12 lg:pl-0 flex justify-end items-center order-2 lg:order-1">
        {isLeft ? (
          <ExperienceCard 
            exp={exp} 
            index={index} 
            setHoveredIndex={setHoveredIndex} 
            isHovered={isHovered}
          />
        ) : (
          <div className="hidden lg:block w-full" />
        )}
      </div>

      {/* Odd items Right hand positioning */}
      <div className="w-full lg:w-1/2 pl-12 pr-0 lg:pr-0 lg:pl-12 flex justify-start items-center order-3">
        {!isLeft ? (
          <ExperienceCard 
            exp={exp} 
            index={index} 
            setHoveredIndex={setHoveredIndex} 
            isHovered={isHovered}
          />
        ) : (
          <div className="hidden lg:block w-full" />
        )}
      </div>
    </div>
  );
};

interface ExperienceCardProps {
  exp: ExperienceType;
  index: number;
  isHovered: boolean;
  setHoveredIndex: (idx: number | null) => void;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  exp,
  index,
  isHovered,
  setHoveredIndex,
}) => {
  const companyTheme = getCompanyTheme(exp.company);

  return (
    <ThreeDTilt maxTilt={5} className="w-full">
      <motion.a
        href={exp.companyUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.5, delay: 0.1 }}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        className={`glass-card p-6 rounded-xl w-full text-left block relative transition-all duration-300 bg-surface/10 border border-border/80 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent group ${
          isHovered ? `shadow-xl ${companyTheme.borderGlow} -translate-y-1` : ''
        }`}
        aria-label={`Visit ${exp.company} official website`}
      >
        {/* Company Logo and Role Row */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            {/* Logo wrapper */}
            <div className="w-12 h-12 rounded-lg bg-white border border-border flex items-center justify-center p-1 flex-shrink-0 shadow-sm transition-all duration-300 group-hover:scale-110">
              <AssetImage
                src={exp.logo}
                alt={exp.company}
                initials={exp.company.substring(0, 2)}
                className="max-h-full max-w-full object-contain"
                containerClassName="w-10 h-10 text-xs rounded-lg"
              />
            </div>

            <div>
              <h3 className="card-heading-custom text-text-primary leading-snug">
                {exp.role}
              </h3>
              
              {/* Clickable company label mimic */}
              <span className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wide text-text-secondary group-hover:text-text-primary transition-colors mt-0.5">
                {exp.company}
                <ArrowUpRight size={13} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
              </span>
            </div>
          </div>

          {/* Status Badge */}
          <span
            className={`self-start font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${companyTheme.pillAccent}`}
          >
            ✓ Done
          </span>
        </div>

        {/* Date, Location, and duration descriptors */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-mono text-text-secondary mb-4 border-b border-border/40 pb-3 select-none">
          <div className="flex items-center gap-1.5">
            <Calendar size={13} className="text-text-secondary/75" />
            <span>{exp.startDate.split('-')[0]}</span>
          </div>
          
          <span
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(exp.locationMapsUrl, '_blank', 'noopener,noreferrer');
            }}
            className="flex items-center gap-1 hover:text-text-primary transition-colors cursor-pointer"
          >
            <MapPin size={13} className="text-text-secondary/75" />
            <span>{exp.shortLabel || exp.location}</span>
            <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </span>

          <div className="flex items-center gap-1.5">
            <Clock size={13} className="text-text-secondary/75" />
            <span>{exp.duration}</span>
          </div>
        </div>

        {/* Description paragraph */}
        <p className="text-sm font-light text-text-secondary leading-relaxed mb-5">
          {exp.description}
        </p>

        {/* Technologiesbadges list */}
        <div className="flex flex-wrap gap-1.5 select-none">
          {exp.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono bg-surface text-text-secondary hover:text-text-primary border border-border/60 px-2 py-0.5 rounded-md transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.a>
    </ThreeDTilt>
  );
};

export const Experience: React.FC = () => {
  const { experiences } = portfolioData;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Timeline height scroll animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"]
  });
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" className="section bg-background py-20 select-none md:select-text">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading title="Experience" subtitle="My Journey" />

        <div ref={containerRef} className="relative mt-16 min-h-[400px]">
          {/* Base vertical line */}
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-[2px] bg-border -translate-x-1/2 z-0" />
          
          {/* Animated growing line */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-[2px] bg-accent origin-top -translate-x-1/2 z-10"
          />

          {/* Timeline list */}
          <div className="flex flex-col items-center w-full">
            {experiences.map((exp, index) => (
              <TimelineItem
                key={exp.company}
                exp={exp}
                index={index}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
