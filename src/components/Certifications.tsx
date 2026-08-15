import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { ThreeDTilt } from './ThreeDTilt';
import { portfolioData, Certification } from '../data/portfolioData';
import { AssetImage } from './AssetImage';
import { Award, ShieldCheck, ExternalLink, FileCheck, ZoomIn, ZoomOut, RotateCcw, X } from 'lucide-react';

interface CertificationCardProps {
  cert: Certification;
  index: number;
  onView: (cert: Certification) => void;
}

const CertificationCard: React.FC<CertificationCardProps> = ({ cert, index, onView }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const isVerifyDisabled = !cert.verificationUrl || cert.verificationUrl === '#';

  // Category specific glows
  const getCertGlow = (category: string) => {
    const norm = category.toLowerCase();
    if (norm.includes('generative') || norm.includes('copilot')) {
      return { border: 'group-hover:border-[#8B5CF6]/40', shadow: 'shadow-[#8B5CF6]/5', textGlow: 'shadow-violet-500' };
    }
    return { border: 'group-hover:border-[#22D3EE]/40', shadow: 'shadow-[#22D3EE]/5', textGlow: 'shadow-cyan-500' };
  };

  const theme = getCertGlow(cert.category);

  return (
    <ThreeDTilt maxTilt={5}>
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.5, delay: index * 0.1, cubicBezier: [0.16, 1, 0.3, 1] }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`glass-card rounded-xl p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300 bg-surface/10 border border-border/80 h-full group ${
          isHovered ? `shadow-xl ${theme.border}` : ''
        }`}
      >
        {/* Shine highlight */}
        {isHovered && (
          <div
            className="absolute pointer-events-none rounded-full transition-opacity duration-300 opacity-100 mix-blend-screen"
            style={{
              width: '240px',
              height: '240px',
              background: 'radial-gradient(100px circle at var(--x) var(--y), rgba(255, 255, 255, 0.04), transparent 70%)',
              transform: 'translate(-50%, -50%)',
              top: `${coords.y}px`,
              left: `${coords.x}px`,
            } as React.CSSProperties & Record<string, string>}
          />
        )}

        <div>
          {/* Header row */}
          <div className="flex items-center justify-between gap-4 mb-4 select-none">
            <span className="font-mono text-[9px] text-text-secondary tracking-widest uppercase">
              {cert.category}
            </span>

            <span className="flex items-center gap-1 bg-green-500/10 text-green-600 dark:text-green-400 font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-full border border-green-500/15 font-semibold">
              <ShieldCheck size={11} />
              Verified
            </span>
          </div>

          {/* Issuer Logo and Title Row */}
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-white border border-border flex items-center justify-center p-1.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-sm">
              <AssetImage
                src={cert.logo}
                alt={cert.issuer}
                initials={cert.issuer.includes('Microsoft') ? 'MS' : 'DL'}
                className="max-h-full max-w-full object-contain"
                containerClassName="w-10 h-10 text-xs rounded-lg"
              />
            </div>

            <div>
              <h3 className="card-heading-custom text-text-primary leading-snug">
                {cert.name}
              </h3>
              <p className="text-xs text-text-secondary mt-0.5 font-medium font-sans">
                {cert.issuer}
              </p>
            </div>
          </div>

          {/* Metadata info list */}
          <div className="text-[11px] font-mono text-text-secondary flex flex-col gap-1.5 border-b border-border/40 pb-3 mb-4 select-none">
            <div className="flex items-center gap-1.5">
              <span className="opacity-55">Issued:</span>
              <span>{cert.issueDate}</span>
            </div>
            {cert.expiryDate && (
              <div className="flex items-center gap-1.5">
                <span className="opacity-55">Expires:</span>
                <span>{cert.expiryDate}</span>
              </div>
            )}
            {cert.credentialId && (
              <div className="flex items-center gap-1.5">
                <span className="opacity-55">Cred ID:</span>
                <span className="break-all">{cert.credentialId}</span>
              </div>
            )}
            {cert.certNumber && (
              <div className="flex items-center gap-1.5">
                <span className="opacity-55">Cert No:</span>
                <span className="break-all">{cert.certNumber}</span>
              </div>
            )}
          </div>

          {/* Skills Tagbadges */}
          <div className="flex flex-wrap gap-1 mb-5 select-none">
            {cert.skills.map((skill) => (
              <span
                key={skill}
                className="text-[9px] font-mono bg-surface text-text-secondary border border-border/40 px-2 py-0.5 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Action Controls footer */}
        <div className="flex items-center gap-3 mt-auto select-none">
          {/* View Certificate Modal Trigger */}
          <button
            onClick={() => onView(cert)}
            className="flex-1 py-2 px-3 rounded-lg bg-surface hover:bg-text-primary hover:text-background border border-border text-text-primary font-mono text-[10px] flex items-center justify-center gap-1.5 transition-all group/btn"
          >
            <FileCheck size={12} />
            <span>View Certificate</span>
          </button>

          {/* Verify Link */}
          {isVerifyDisabled ? (
            <button
              className="py-2 px-3 rounded-lg bg-surface border border-border/80 text-text-secondary/50 font-mono text-[10px] cursor-not-allowed select-none"
              disabled
            >
              Verify Credential
            </button>
          ) : (
            <a
              href={cert.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-4 rounded-lg bg-text-primary text-background hover:bg-transparent hover:text-text-primary border border-text-primary font-mono text-[10px] flex items-center justify-center gap-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent shadow-sm hover:shadow-[0_0_15px_rgba(var(--accent),0.15)]"
            >
              <Award size={12} />
              <span>Verify Credential ↗</span>
            </a>
          )}
        </div>
      </motion.div>
    </ThreeDTilt>
  );
};

// High-fidelity vector mockup fallbacks for certificates if physical files are missing
const HTMLCertMockup: React.FC<{ cert: Certification }> = ({ cert }) => {
  return (
    <div className="w-full max-w-2xl aspect-[1.414/1] bg-white border-[16px] border-slate-900 rounded-lg p-8 flex flex-col justify-between shadow-2xl text-slate-800 relative select-text select-none">
      {/* Decorative border overlays */}
      <div className="absolute inset-2 border-2 border-dashed border-slate-200 pointer-events-none" />
      
      {/* Header logos */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <span className="font-sans font-extrabold text-sm uppercase tracking-widest text-slate-400">
            Course Certificate
          </span>
          <span className="font-mono text-[10px] text-slate-500 mt-1">Verified Credential</span>
        </div>
        <div className="font-mono font-extrabold text-lg tracking-tight text-slate-900 border border-slate-900 px-3 py-1">
          {cert.issuer}
        </div>
      </div>

      {/* Main candidate metadata */}
      <div className="text-center my-6 flex-1 flex flex-col justify-center select-all">
        <span className="text-xs font-mono uppercase tracking-wider text-slate-400">This is to certify that</span>
        <h2 className="font-sans font-bold text-2xl md:text-3xl text-slate-900 my-2.5">
          Kavin Rajendran
        </h2>
        <span className="text-xs font-mono uppercase tracking-wider text-slate-400">has successfully completed</span>
        <p className="font-sans font-extrabold text-md md:text-lg text-slate-800 max-w-lg mx-auto my-2 leading-snug">
          {cert.name}
        </p>
      </div>

      {/* Footer stamp references */}
      <div className="flex justify-between items-end border-t border-slate-100 pt-4 font-mono text-[9px] text-slate-400">
        <div className="flex flex-col gap-0.5 select-all">
          <span>DATE OF ISSUE: {cert.issueDate}</span>
          {cert.expiryDate && <span>EXPIRY DATE: {cert.expiryDate}</span>}
          <span>CREDENTIAL ID: {cert.credentialId || 'N/A'}</span>
          {cert.certNumber && <span>CERTIFICATE NO: {cert.certNumber}</span>}
        </div>
        
        {/* Mapped signature / seal visual */}
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-full border-4 border-slate-200 flex items-center justify-center text-[10px] font-extrabold text-slate-200 select-none rotate-12">
            SEAL
          </div>
          <span className="mt-1 text-[8px] uppercase tracking-wider">OFFICIALLY SIGNED</span>
        </div>
      </div>
    </div>
  );
};

export const Certifications: React.FC = () => {
  const { certifications } = portfolioData;
  const [activeCert, setActiveCert] = useState<Certification | null>(null);
  const [zoom, setZoom] = useState(1);
  const [imgLoadError, setImgLoadError] = useState(false);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveCert(null);
        setZoom(1);
        setImgLoadError(false);
      }
    };
    if (activeCert) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCert]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.75));
  const handleZoomReset = () => setZoom(1);

  return (
    <section id="certifications" className="section bg-background py-20 select-none md:select-text">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading title="Certifications" subtitle="Verified Credentials" />

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {certifications.map((cert, index) => (
            <CertificationCard
              key={cert.name}
              cert={cert}
              index={index}
              onView={(c) => {
                setActiveCert(c);
                setZoom(1);
                setImgLoadError(false);
              }}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Viewing Modal with zoom controls */}
      <AnimatePresence>
        {activeCert && (
          <div 
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex flex-col justify-between items-center z-[999] py-6 px-4 select-none"
            aria-modal="true"
            role="dialog"
            aria-labelledby="cert-modal-title"
          >
            {/* Modal Controls Header */}
            <div className="w-full max-w-4xl flex items-center justify-between z-50 bg-slate-900/60 p-3 rounded-xl border border-white/5 backdrop-blur-sm shadow-md">
              <h4 id="cert-modal-title" className="font-sans font-extrabold text-sm text-white select-all">
                {activeCert.name} ({activeCert.issuer})
              </h4>
              
              {/* Zoom Buttons Group */}
              <div className="flex items-center gap-3">
                {/* Only show zoom keys if rendering actual image file (not fallback mockup or PDF) */}
                {!imgLoadError && activeCert.certificateUrl && !activeCert.certificateUrl.toLowerCase().endsWith('.pdf') && (
                  <div className="flex items-center gap-1.5 border-r border-white/10 pr-3">
                    <button
                      onClick={handleZoomIn}
                      className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      title="Zoom In"
                    >
                      <ZoomIn size={16} />
                    </button>
                    <button
                      onClick={handleZoomOut}
                      className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      title="Zoom Out"
                    >
                      <ZoomOut size={16} />
                    </button>
                    <button
                      onClick={handleZoomReset}
                      className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      title="Reset Zoom"
                    >
                      <RotateCcw size={15} />
                    </button>
                  </div>
                )}

                {/* Close Button */}
                <button
                  onClick={() => {
                    setActiveCert(null);
                    setZoom(1);
                    setImgLoadError(false);
                  }}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  aria-label="Close preview"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Viewport Center Area */}
            <div className="flex-1 w-full flex items-center justify-center overflow-hidden my-4">
              <div 
                className="transition-transform duration-100 ease-out flex items-center justify-center max-w-full max-h-full"
                style={{ transform: activeCert.certificateUrl && activeCert.certificateUrl.toLowerCase().endsWith('.pdf') ? 'none' : `scale(${zoom})` }}
              >
                {!imgLoadError && activeCert.certificateUrl ? (
                  activeCert.certificateUrl.toLowerCase().endsWith('.pdf') ? (
                    <iframe
                      src={activeCert.certificateUrl}
                      title={activeCert.name}
                      className="w-[85vw] max-w-[1000px] h-[70vh] rounded-lg shadow-2xl border border-white/5 bg-white"
                    />
                  ) : (
                    <img
                      src={activeCert.certificateUrl}
                      alt={activeCert.name}
                      onError={() => {
                        setImgLoadError(true);
                        console.warn(`[Cert image missing] Could not render file at "${activeCert.certificateUrl}". Rendering high-fidelity HTML mockup instead.`);
                      }}
                      className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-2xl border border-white/5"
                    />
                  )
                ) : (
                  <HTMLCertMockup cert={activeCert} />
                )}
              </div>
            </div>

            {/* Verification quick link details footer */}
            <div className="text-center font-mono text-[10px] text-slate-500 z-50 select-all">
              <span>CREDENTIAL ID: {activeCert.credentialId || 'N/A'}</span>
              {activeCert.verificationUrl && (
                <a
                  href={activeCert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-accent ml-2 hover:underline font-mono"
                >
                  Verify Online <ExternalLink size={10} />
                </a>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
