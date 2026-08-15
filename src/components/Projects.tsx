import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { ThreeDTilt } from './ThreeDTilt';
import { portfolioData, Project } from '../data/portfolioData';
import { Github, ExternalLink, ArrowRight, Link2Off } from 'lucide-react';

// Custom SVG Machine Learning Salary Prediction Dashboard Mockup (for Project 1 thumbnail)
const SalaryPredictMockup: React.FC = () => {
  return (
    <div className="w-full h-40 bg-slate-900 border-b border-border/80 flex flex-col justify-between p-4 relative overflow-hidden select-none">
      {/* Background analytics grid */}
      <div className="absolute inset-0 opacity-[0.06] bg-grid-pattern bg-[size:15px_15px]" />
      
      {/* Header bar */}
      <div className="flex justify-between items-center z-10 border-b border-white/5 pb-1.5">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
          <span className="font-mono text-[9px] text-[#22D3EE] uppercase tracking-wider font-semibold">
            Salary Predictor Model
          </span>
        </div>
        <span className="font-mono text-[8px] text-slate-500">ACC: 91.8%</span>
      </div>

      {/* Main chart visual */}
      <div className="flex-1 flex items-end gap-2 mt-3 z-10">
        {/* Mock bar charts */}
        <div className="w-6 bg-slate-800 rounded-t h-[30%] relative group/bar">
          <div className="absolute inset-x-0 bottom-0 bg-[#3B82F6]/60 rounded-t h-[60%] transition-all group-hover/bar:h-[90%]" />
        </div>
        <div className="w-6 bg-slate-800 rounded-t h-[55%] relative group/bar">
          <div className="absolute inset-x-0 bottom-0 bg-[#8B5CF6]/60 rounded-t h-[75%] transition-all group-hover/bar:h-[95%]" />
        </div>
        <div className="w-6 bg-slate-800 rounded-t h-[80%] relative group/bar">
          <div className="absolute inset-x-0 bottom-0 bg-[#22D3EE]/70 rounded-t h-[85%] transition-all group-hover/bar:h-[100%]" />
        </div>
        <div className="w-6 bg-slate-800 rounded-t h-[40%] relative group/bar">
          <div className="absolute inset-x-0 bottom-0 bg-[#3B82F6]/60 rounded-t h-[50%] transition-all group-hover/bar:h-[80%]" />
        </div>

        {/* Rising line chart path overlay */}
        <svg className="absolute inset-x-0 bottom-6 h-12 w-full pointer-events-none stroke-[#22D3EE] fill-none" viewBox="0 0 300 50">
          <path d="M 10,40 Q 80,30 150,15 T 280,5" strokeWidth="2.5" />
          <circle cx="280" cy="5" r="3.5" className="fill-[#22D3EE] stroke-slate-900" />
        </svg>
      </div>

      {/* Footer stats labels */}
      <div className="flex justify-between items-center z-10 text-[9px] font-mono text-slate-400 mt-1 select-all">
        <span>$45k (MIN)</span>
        <span className="text-[#22D3EE]">$120k (AVG)</span>
        <span>$210k (MAX)</span>
      </div>
    </div>
  );
};

// Generic visual placeholder for other projects
const GenericPlaceholderMockup: React.FC<{ num: string }> = ({ num }) => {
  return (
    <div className="w-full h-40 bg-slate-950 border-b border-border/80 flex items-center justify-center p-4 relative overflow-hidden select-none">
      <div className="absolute inset-0 opacity-[0.04] bg-grid-pattern bg-[size:10px_10px]" />
      
      {/* Abstract futuristic wireframe boxes */}
      <div className="border border-white/5 w-4/5 h-3/5 rounded-lg flex flex-col justify-between p-3 relative bg-slate-900/40">
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
          <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
          <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
        </div>
        <div className="font-mono text-[9px] text-slate-500 text-center uppercase tracking-widest">
          Project Details Placeholder {num}
        </div>
        <div className="h-1 bg-slate-800 rounded w-2/3 mx-auto" />
      </div>
    </div>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const isGitHubPlaceholder = !project.githubUrl || project.githubUrl === '';
  const isLivePlaceholder = !project.liveUrl || project.liveUrl === '';

  // Get project specific colors
  const getProjectAccent = (num: string) => {
    switch (num) {
      case '01': return { border: 'group-hover:border-[#22D3EE]/40', glow: 'shadow-[#22D3EE]/5', dot: 'bg-[#22D3EE]' };
      case '02': return { border: 'group-hover:border-[#8B5CF6]/40', glow: 'shadow-[#8B5CF6]/5', dot: 'bg-[#8B5CF6]' };
      case '03': return { border: 'group-hover:border-[#3B82F6]/40', glow: 'shadow-[#3B82F6]/5', dot: 'bg-[#3B82F6]' };
      default: return { border: 'group-hover:border-[#10B981]/40', glow: 'shadow-[#10B981]/5', dot: 'bg-[#10B981]' };
    }
  };

  const accent = getProjectAccent(project.number);

  return (
    <ThreeDTilt maxTilt={5}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6, delay: index * 0.1, cubicBezier: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setShowTooltip(false);
        }}
        className={`glass-card rounded-xl overflow-hidden flex flex-col justify-between relative transition-all duration-300 bg-surface/10 border border-border/80 h-full group ${
          isHovered ? `shadow-xl ${accent.border}` : ''
        }`}
      >
        {/* Thumbnail mockups */}
        <div className="relative overflow-hidden w-full h-40">
          {project.number === '04' ? (
            <SalaryPredictMockup />
          ) : (
            <GenericPlaceholderMockup num={project.number} />
          )}

          {/* Glowing gradient indicator on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 pointer-events-none select-none" />
        </div>

        {/* Card details body */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            {/* Header metadata row */}
            <div className="flex items-center justify-between gap-4 mb-3 select-none">
              <span className="font-mono text-[10px] text-text-secondary tracking-widest uppercase">
                [ {project.number} ]
              </span>
              {project.type && (
                <span className="font-mono text-[9px] text-text-secondary tracking-wider bg-surface border border-border/60 px-2 py-0.5 rounded-full uppercase">
                  {project.type}
                </span>
              )}
            </div>

            {/* Project Title */}
            <h3 className="card-heading-custom text-text-primary mb-1 group-hover:text-text-primary/90 transition-colors leading-snug">
              {project.title}
            </h3>

            {/* Project Duration */}
            {project.duration && (
              <p className="text-[10px] font-mono text-text-secondary mb-3 select-none">
                {project.duration}
              </p>
            )}

            {/* Technology Pill Badges */}
            <div className="flex flex-wrap gap-1.5 mb-4 select-none">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-[9px] font-mono bg-surface text-text-secondary border border-border/50 px-2 py-0.5 rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-xs font-light text-text-secondary leading-relaxed mb-6">
              {project.description}
            </p>
          </div>

          {/* Action buttons footer */}
          <div className="flex items-center gap-3 mt-auto relative">
            {/* Source Code Button */}
            {isGitHubPlaceholder ? (
              <div className="flex-1 relative">
                <button
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  onClick={(e) => e.preventDefault()}
                  className="w-full py-2 px-4 rounded-lg bg-surface border border-border/80 text-text-secondary/50 font-mono text-[10px] flex items-center justify-center gap-2 cursor-not-allowed select-none opacity-60"
                  aria-label="Source link coming soon"
                >
                  <Github size={13} className="opacity-30" />
                  <span>Source Code</span>
                </button>
                
                {/* Floating Tooltip bubble */}
                {showTooltip && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900 border border-slate-700 text-white font-mono text-[9px] rounded shadow-md z-35 whitespace-nowrap select-none animate-fade-up">
                    Source link coming soon
                  </div>
                )}
              </div>
            ) : (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-4 rounded-lg bg-surface hover:bg-text-primary hover:text-background border border-border text-text-primary font-mono text-[10px] flex items-center justify-center gap-2 transition-all group/btn"
              >
                <Github size={13} />
                <span>Source Code</span>
                <ArrowRight size={11} className="opacity-0 -translate-x-1 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-200" />
              </a>
            )}

            {/* Optional Live Demo Button */}
            {!isLivePlaceholder && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 rounded-lg bg-text-primary text-background hover:bg-transparent hover:text-text-primary border border-text-primary font-mono text-[10px] flex items-center justify-center gap-1.5 transition-all"
              >
                <ExternalLink size={13} />
                <span>Live</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </ThreeDTilt>
  );
};

export const Projects: React.FC = () => {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="section bg-background py-20 select-none md:select-text">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading title="Projects" subtitle="Browse My Recent" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.number} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
