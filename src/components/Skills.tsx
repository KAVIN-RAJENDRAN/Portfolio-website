import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { ThreeDTilt } from './ThreeDTilt';
import { portfolioData } from '../data/portfolioData';
import { Code2, Server, Database, Layout, BarChart3, Settings } from 'lucide-react';

// Get matching category icons
const getCategoryIcon = (categoryName: string) => {
  const norm = categoryName.toLowerCase();
  if (norm.includes('languages')) return <Code2 size={22} className="text-accent" />;
  if (norm.includes('backend')) return <Server size={22} className="text-accent-secondary" />;
  if (norm.includes('database')) return <Database size={22} className="text-accent-additional" />;
  if (norm.includes('frontend')) return <Layout size={22} className="text-accent" />;
  if (norm.includes('ai, data')) return <BarChart3 size={22} className="text-accent-secondary" />;
  return <Settings size={22} className="text-accent-additional" />;
};

// Sleek brand-colored inline SVGs for technology logos
const getTechIcon = (name: string, iconColorClass: string) => {
  const normalized = name.toLowerCase();

  if (normalized.includes('python')) {
    return (
      <svg className={`w-3.5 h-3.5 fill-current ${iconColorClass}`} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.25.18c.9 0 1.66.73 1.66 1.65v2.77h-3.61a.83.83 0 0 0-.83.83v2.22h4.72c1.39 0 2.5 1.11 2.5 2.5v3.61c0 .9-.73 1.67-1.66 1.67h-2.78v-1.11c0-.61-.5-1.11-1.11-1.11H8.61a1.11 1.11 0 0 0-1.11 1.11v4.72c0 1.39 1.11 2.5 2.5 2.5h3.61c.9 0 1.67-.73 1.67-1.67v-2.77h3.6c.46 0 .84-.37.84-.83V14.5a.83.83 0 0 0-.84-.83h-4.72c-1.39 0-2.5-1.12-2.5-2.5V7.56c0-.9.73-1.67 1.67-1.67h2.77v1.11c0 .61.5 1.11 1.11 1.11h4.72c.62 0 1.11-.5 1.11-1.11V4.28c0-1.39-1.11-2.5-2.5-2.5H16.2V2.6c0-.46-.37-.83-.83-.83H14.25Z" />
        <path d="M9.75 23.82c-.9 0-1.66-.73-1.66-1.65v-2.77h3.61c.46 0 .83-.37.83-.83v-2.22H6.81c-1.39 0-2.5-1.11-2.5-2.5v-3.61c0-.9.73-1.67 1.66-1.67h2.78v1.11c0 .61.5 1.11 1.11 1.11h4.72a1.11 1.11 0 0 0 1.11-1.11V4.97c0-1.39-1.11-2.5-2.5-2.5H7.78c-.9 0-1.67.73-1.67 1.67v2.77H2.5c-.46 0-.84.37-.84.83v2.78c0 .46.38.83.84.83h4.72c1.39 0 2.5 1.12 2.5 2.5v3.61c0 .9-.73 1.67-1.67 1.67H5.31v-1.11c0-.61-.5-1.11-1.11-1.11H1.11C.5 13.94 0 14.44 0 15.06v4.72c0 1.39 1.11 2.5 2.5 2.5h4.72v-.83c0-.46.37-.83.83-.83h1.7v.83Z" />
      </svg>
    );
  }
  if (normalized.includes('typescript') || normalized === 'ts') {
    return (
      <svg className={`w-3.5 h-3.5 fill-current ${iconColorClass}`} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 0H2C.9 0 0 .9 0 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2ZM11.1 19.1c-.2.7-.6 1.2-1.3 1.5-.7.3-1.5.5-2.4.5-1.2 0-2.2-.3-3-.9s-1.3-1.4-1.6-2.5l2-1.2c.2.6.5 1.1.9 1.4s1 .5 1.7.5c.6 0 1.1-.1 1.4-.4.3-.3.5-.6.5-1.1 0-.4-.1-.7-.4-.9-.3-.2-.7-.4-1.3-.6L5.3 15c-.9-.3-1.5-.8-1.9-1.3-.4-.6-.6-1.3-.6-2.2 0-1.1.4-2 1.2-2.7.8-.7 1.9-1 3.2-1 1.1 0 2 .3 2.7.8.7.5 1.2 1.3 1.4 2.3l-1.9 1.2c-.1-.5-.4-.9-.7-1.1-.3-.2-.8-.4-1.4-.4-.5 0-.9.1-1.2.3-.3.2-.4.5-.4.8 0 .3.1.5.3.7.2.2.6.3 1.1.5l1.3.4c1 .3 1.7.8 2.2 1.4.5.6.8 1.4.8 2.4l-.1.8ZM22 13.9H19v6.5h-2.1v-6.5h-3v-1.8H22v1.8Z" />
      </svg>
    );
  }
  if (normalized.includes('react')) {
    return (
      <svg className={`w-3.5 h-3.5 stroke-current fill-none animate-spin ${iconColorClass}`} style={{ animationDuration: '8s' }} viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true">
        <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="2" className="fill-current" />
      </svg>
    );
  }
  if (normalized.includes('node')) {
    return (
      <svg className={`w-3.5 h-3.5 fill-current ${iconColorClass}`} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 1.33c-.3 0-.6.15-.75.4l-9 15.58c-.15.26-.15.58 0 .84L6.75 22.4c.15.26.44.42.75.42h9c.3 0 .6-.16.75-.42l4.5-7.79c.15-.26.15-.58 0-.84L12.75 1.73c-.15-.25-.45-.4-.75-.4ZM12 4.8l6.75 11.69h-4.5v3.46h-4.5v-3.46h-4.5L12 4.8Z" />
      </svg>
    );
  }
  if (normalized.includes('docker')) {
    return (
      <svg className={`w-3.5 h-3.5 fill-current ${iconColorClass}`} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13.983 11.078h2.119c.102 0 .186-.084.186-.186V8.773c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186m-2.916 0h2.117c.102 0 .186-.084.186-.186V8.773c0-.102-.084-.186-.186-.186h-2.117c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186m-2.916 0h2.119c.102 0 .185-.084.185-.186V8.773c0-.102-.083-.186-.185-.186H8.151c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186m-2.918 0h2.119c.101 0 .185-.084.185-.186V8.773c0-.102-.084-.186-.185-.186H5.233c-.101 0-.185.084-.185.186v2.119c0 .102.084.186.185.186m-2.92 0h2.12c.101 0 .185-.084.185-.186V8.773c0-.102-.084-.186-.185-.186H2.313c-.101 0-.185.084-.185.186v2.119c0 .102.084.186.185.186m2.92-2.917h2.119c.101 0 .185-.084.185-.186V5.856c0-.102-.084-.186-.185-.186H5.233c-.101 0-.185.084-.185.186v2.119c0 .102.084.186.185.186m2.918 0h2.119c.102 0 .185-.084.185-.186V5.856c0-.102-.083-.186-.185-.186H8.151c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186m2.916 0h2.117c.102 0 .186-.084.186-.186V5.856c0-.102-.084-.186-.186-.186h-2.117c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186m-2.916-2.919h2.119c.102 0 .185-.083.185-.185V2.938c0-.102-.083-.186-.185-.186H8.151c-.102 0-.186.084-.186.186v2.119c0 .102.084.185.186.185m12.33 5.485c-.007-.07-.023-.139-.06-.201-.067-.113-.19-.174-.32-.174h-2.222v2.119c0 .102.084.186.186.186h1.614c.264 0 .524-.15.654-.4.07-.132.08-.288.064-.43v-.1m-4.225 6.009c-.27 0-.54.02-.81.04-.63.06-1.25.17-1.86.33-.87.23-1.64.67-2.26 1.3-.43.43-.88.75-1.46.75-.46 0-.82-.2-.93-.65-.18-.72-.37-1.44-.6-2.15-.35-1.1-.98-1.92-1.92-2.52a6.45 6.45 0 0 0-3.32-.91h-.1c-.11.01-.22-.05-.27-.15-.05-.1-.04-.23.03-.32a3.86 3.86 0 0 1 .43-.49c.8-.75 1.58-1.58 2.06-2.59.39-.81.56-1.67.56-2.57V12.1c0-.1.08-.18.18-.18h16.27c.1 0 .18.08.18.18v.4c0 1.25-.19 2.48-.56 3.66-.46 1.48-1.26 2.76-2.45 3.73-.78.64-1.69 1.07-2.69 1.21-.29.04-.59.06-.89.06z" />
      </svg>
    );
  }
  if (normalized.includes('supabase')) {
    return (
      <svg className={`w-3.5 h-3.5 fill-current ${iconColorClass}`} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21.362 10.407H13.68v-8.24c0-.7-.687-1.144-1.32-.824L2.098 12.016a1 1 0 0 0-.097 1.577h7.682v8.24c0 .7.687 1.144 1.32.824l10.264-10.673a1 1 0 0 0 .097-1.577z" />
      </svg>
    );
  }
  if (normalized.includes('git')) {
    return (
      <svg className={`w-3.5 h-3.5 fill-current ${iconColorClass}`} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.187 0L8.708 2.624l2.76 2.76c.6-.2 1.279-.08 1.779.42c.5.5.62 1.18.42 1.779l2.76 2.76c.6-.2 1.279-.08 1.779.419c.604.604.604 1.582 0 2.185c-.604.604-1.582.604-2.185 0c-.5-.5-.62-1.18-.42-1.779l-2.76-2.76v5.39c.2.06.379.18.52.32c.604.604.604 1.582 0 2.185c-.604.604-1.582.604-2.185 0c-.604-.604-.604-1.582 0-2.185c.14-.14.32-.26.52-.32v-5.39l-2.76-2.76C8.83 8.35 8.15 8.47 7.65 7.97c-.5-.5-.62-1.18-.42-1.779l-2.76-2.76L.453 10.93c-.604.604-.604 1.582 0 2.185l10.478 10.478c.604.604 1.582.604 2.187 0l10.428-10.428c.604-.603.604-1.581 0-2.185z" />
      </svg>
    );
  }
  if (normalized.includes('database') || normalized.includes('sql') || normalized.includes('postgres') || normalized.includes('mysql')) {
    return (
      <svg className={`w-3.5 h-3.5 fill-none stroke-current ${iconColorClass}`} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5V19A9 3 0 0 0 21 19V5" />
        <path d="M3 12A9 3 0 0 0 21 12" />
      </svg>
    );
  }
  
  // Fallback generic tag/code icon
  return (
    <svg className={`w-3.5 h-3.5 fill-none stroke-current ${iconColorClass}`} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  );
};

// Custom brand-aligned colors mapping for each skill
const getSkillStyle = (name: string) => {
  const normalized = name.toLowerCase();

  switch (normalized) {
    case 'python':
      return {
        border: 'border-[#3572A5]/30 hover:border-[#3572A5]/80',
        text: 'text-[#3572A5] dark:text-[#72a1c9]',
        glow: 'hover:shadow-[0_0_12px_rgba(53,114,165,0.2)]',
        bg: 'bg-[#3572A5]/5 hover:bg-[#3572A5]/10',
        iconColor: 'text-[#3572A5] dark:text-[#ffd343]'
      };
    case 'typescript':
    case 'ts':
      return {
        border: 'border-[#3178C6]/30 hover:border-[#3178C6]/80',
        text: 'text-[#3178C6] dark:text-[#619fe8]',
        glow: 'hover:shadow-[0_0_12px_rgba(49,120,198,0.2)]',
        bg: 'bg-[#3178C6]/5 hover:bg-[#3178C6]/10',
        iconColor: 'text-[#3178C6]'
      };
    case 'react':
    case 'react.js':
    case 'react native':
      return {
        border: 'border-[#61DAFB]/30 hover:border-[#61DAFB]/80',
        text: 'text-[#005A70] dark:text-[#61DAFB]',
        glow: 'hover:shadow-[0_0_12px_rgba(97,218,251,0.2)]',
        bg: 'bg-[#61DAFB]/5 hover:bg-[#61DAFB]/10',
        iconColor: 'text-[#61DAFB]'
      };
    case 'java':
      return {
        border: 'border-[#5382A1]/30 hover:border-[#5382A1]/80',
        text: 'text-[#D94E34] dark:text-[#F4A261]',
        glow: 'hover:shadow-[0_0_12px_rgba(217,78,52,0.2)]',
        bg: 'bg-[#5382A1]/5 hover:bg-[#5382A1]/10',
        iconColor: 'text-[#f13c1c]'
      };
    case 'c++':
      return {
        border: 'border-[#00599C]/30 hover:border-[#00599C]/80',
        text: 'text-[#00599C] dark:text-[#5C9CD6]',
        glow: 'hover:shadow-[0_0_12px_rgba(0,89,156,0.2)]',
        bg: 'bg-[#00599C]/5 hover:bg-[#00599C]/10',
        iconColor: 'text-[#00599C]'
      };
    case 'node.js':
      return {
        border: 'border-[#339933]/30 hover:border-[#339933]/80',
        text: 'text-[#2b802b] dark:text-[#339933]',
        glow: 'hover:shadow-[0_0_12px_rgba(51,153,51,0.2)]',
        bg: 'bg-[#339933]/5 hover:bg-[#339933]/10',
        iconColor: 'text-[#339933]'
      };
    case 'fastapi':
      return {
        border: 'border-[#059669]/30 hover:border-[#059669]/80',
        text: 'text-[#059669] dark:text-[#34D399]',
        glow: 'hover:shadow-[0_0_12px_rgba(5,150,105,0.2)]',
        bg: 'bg-[#059669]/5 hover:bg-[#059669]/10',
        iconColor: 'text-[#059669]'
      };
    case 'docker':
      return {
        border: 'border-[#2496ED]/30 hover:border-[#2496ED]/80',
        text: 'text-[#025696] dark:text-[#2496ED]',
        glow: 'hover:shadow-[0_0_12px_rgba(36,150,237,0.2)]',
        bg: 'bg-[#2496ED]/5 hover:bg-[#2496ED]/10',
        iconColor: 'text-[#2496ED]'
      };
    case 'postgresql':
      return {
        border: 'border-[#4169E1]/30 hover:border-[#4169E1]/80',
        text: 'text-[#336791] dark:text-[#4169E1]',
        glow: 'hover:shadow-[0_0_12px_rgba(65,105,225,0.2)]',
        bg: 'bg-[#4169E1]/5 hover:bg-[#4169E1]/10',
        iconColor: 'text-[#336791]'
      };
    case 'mysql':
      return {
        border: 'border-[#00758F]/30 hover:border-[#00758F]/80',
        text: 'text-[#00758F] dark:text-[#FF9900]',
        glow: 'hover:shadow-[0_0_12px_rgba(0,117,143,0.2)]',
        bg: 'bg-[#00758F]/5 hover:bg-[#00758F]/10',
        iconColor: 'text-[#00758F]'
      };
    case 'firebase':
      return {
        border: 'border-[#FFCA28]/30 hover:border-[#FFCA28]/80',
        text: 'text-[#DD2C00] dark:text-[#FFCA28]',
        glow: 'hover:shadow-[0_0_12px_rgba(255,202,40,0.2)]',
        bg: 'bg-[#FFCA28]/5 hover:bg-[#FFCA28]/10',
        iconColor: 'text-[#FFCA28]'
      };
    case 'supabase':
      return {
        border: 'border-[#3ECF8E]/30 hover:border-[#3ECF8E]/80',
        text: 'text-[#1e9b63] dark:text-[#3ECF8E]',
        glow: 'hover:shadow-[0_0_12px_rgba(62,207,142,0.2)]',
        bg: 'bg-[#3ECF8E]/5 hover:bg-[#3ECF8E]/10',
        iconColor: 'text-[#3ECF8E]'
      };
    case 'html':
      return {
        border: 'border-[#E34F26]/30 hover:border-[#E34F26]/80',
        text: 'text-[#E34F26]',
        glow: 'hover:shadow-[0_0_12px_rgba(227,79,38,0.2)]',
        bg: 'bg-[#E34F26]/5 hover:bg-[#E34F26]/10',
        iconColor: 'text-[#E34F26]'
      };
    case 'css':
      return {
        border: 'border-[#1572B6]/30 hover:border-[#1572B6]/80',
        text: 'text-[#1572B6]',
        glow: 'hover:shadow-[0_0_12px_rgba(21,114,182,0.2)]',
        bg: 'bg-[#1572B6]/5 hover:bg-[#1572B6]/10',
        iconColor: 'text-[#1572B6]'
      };
    case 'javascript':
      return {
        border: 'border-[#F7DF1E]/30 hover:border-[#F7DF1E]/80',
        text: 'text-[#877400] dark:text-[#F7DF1E]',
        glow: 'hover:shadow-[0_0_12px_rgba(247,223,30,0.2)]',
        bg: 'bg-[#F7DF1E]/5 hover:bg-[#F7DF1E]/10',
        iconColor: 'text-[#F7DF1E]'
      };
    case 'three.js':
      return {
        border: 'border-text-primary/30 hover:border-text-primary/80',
        text: 'text-text-primary',
        glow: 'hover:shadow-[0_0_12px_rgba(var(--text-primary),0.2)]',
        bg: 'bg-text-primary/5 hover:bg-text-primary/10',
        iconColor: 'text-text-primary'
      };
    case 'pandas':
      return {
        border: 'border-[#150458]/30 hover:border-[#150458]/80',
        text: 'text-[#150458] dark:text-[#b5a9fc]',
        glow: 'hover:shadow-[0_0_12px_rgba(21,4,88,0.25)]',
        bg: 'bg-[#150458]/5 hover:bg-[#150458]/10',
        iconColor: 'text-[#150458] dark:text-[#b5a9fc]'
      };
    case 'numpy':
      return {
        border: 'border-[#013243]/30 hover:border-[#013243]/80',
        text: 'text-[#013243] dark:text-[#52c1e8]',
        glow: 'hover:shadow-[0_0_12px_rgba(1,50,67,0.25)]',
        bg: 'bg-[#013243]/5 hover:bg-[#013243]/10',
        iconColor: 'text-[#013243] dark:text-[#52c1e8]'
      };
    case 'power bi':
      return {
        border: 'border-[#F2C811]/30 hover:border-[#F2C811]/80',
        text: 'text-[#9c8100] dark:text-[#F2C811]',
        glow: 'hover:shadow-[0_0_12px_rgba(242,200,17,0.2)]',
        bg: 'bg-[#F2C811]/5 hover:bg-[#F2C811]/10',
        iconColor: 'text-[#F2C811]'
      };
    case 'kubernetes':
      return {
        border: 'border-[#326CE5]/30 hover:border-[#326CE5]/80',
        text: 'text-[#326CE5]',
        glow: 'hover:shadow-[0_0_12px_rgba(50,108,229,0.2)]',
        bg: 'bg-[#326CE5]/5 hover:bg-[#326CE5]/10',
        iconColor: 'text-[#326CE5]'
      };
    case 'git':
      return {
        border: 'border-[#F05032]/30 hover:border-[#F05032]/80',
        text: 'text-[#F05032]',
        glow: 'hover:shadow-[0_0_12px_rgba(240,80,50,0.2)]',
        bg: 'bg-[#F05032]/5 hover:bg-[#F05032]/10',
        iconColor: 'text-[#F05032]'
      };
    case 'github':
      return {
        border: 'border-text-primary/30 hover:border-text-primary/80',
        text: 'text-text-primary',
        glow: 'hover:shadow-[0_0_12px_rgba(var(--text-primary),0.2)]',
        bg: 'bg-text-primary/5 hover:bg-text-primary/10',
        iconColor: 'text-text-primary'
      };
    default:
      return {
        border: 'border-border/60 hover:border-accent/60',
        text: 'text-text-secondary hover:text-accent',
        glow: 'hover:shadow-[0_0_12px_rgba(var(--accent),0.15)]',
        bg: 'bg-surface/50 hover:bg-surface',
        iconColor: 'text-text-secondary group-hover:text-accent'
      };
  }
};

export const Skills: React.FC = () => {
  const { skills } = portfolioData;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, cubicBezier: [0.16, 1, 0.3, 1] },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section id="skills" className="section bg-background py-20 select-none md:select-text">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading title="Skills & Technologies" subtitle="Explore My" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skills.map((category) => (
            <ThreeDTilt key={category.category} maxTilt={8}>
              <motion.div
                variants={cardVariants}
                className="glass-card rounded-xl p-6 flex flex-col gap-5 hover:shadow-[0_0_30px_rgba(var(--accent),0.03)] transition-all duration-300 relative overflow-hidden group bg-surface/10 h-full"
              >
                {/* Category Gradient line overlay */}
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-accent via-accent-secondary to-accent-additional scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                {/* Card Title Header with custom matching icons */}
                <div className="flex items-center gap-3 pb-3 border-b border-border/40">
                  <div className="p-2 rounded-lg bg-surface/60 border border-border">
                    {getCategoryIcon(category.category)}
                  </div>
                  <h3 className="card-heading-custom text-text-primary">
                    {category.category}
                  </h3>
                </div>

                {/* Badges items grid */}
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill) => {
                    const style = getSkillStyle(skill.name);
                    const badgeElement = (
                      <motion.div
                        key={skill.name}
                        variants={badgeVariants}
                        whileHover={{ y: -2, scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all duration-200 cursor-pointer shadow-sm ${style.border} ${style.text} ${style.bg} ${style.glow}`}
                        title={`Explore ${skill.name}`}
                      >
                        {getTechIcon(skill.name, style.iconColor)}
                        <span className="font-semibold">{skill.name}</span>
                      </motion.div>
                    );

                    if (skill.url) {
                      return (
                        <a
                          key={skill.name}
                          href={skill.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block"
                        >
                          {badgeElement}
                        </a>
                      );
                    }

                    return badgeElement;
                  })}
                </div>
              </motion.div>
            </ThreeDTilt>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
