import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from './ThemeContext';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export const BackgroundSpotlight: React.FC = () => {
  const { theme } = useTheme();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(hasTouch);
    };

    // Detect reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', checkTouch);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  useEffect(() => {
    if (isTouchDevice || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isTouchDevice, prefersReducedMotion]);

  // Live Canvas Data Connections Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let tick = 0;
    let nodes: Node[] = [];
    let scatterPoints: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    
    const maxNodes = window.innerWidth < 768 ? 20 : 40; // Green graph nodes
    const maxScatter = window.innerWidth < 768 ? 15 : 30; // Orange scatter points
    const connectionDist = 125;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize green graph nodes
    nodes = Array.from({ length: maxNodes }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 2.5 + 1.2,
    }));

    // Initialize orange scatter points (smaller, slower)
    scatterPoints = Array.from({ length: maxScatter }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      radius: Math.random() * 1.5 + 0.8,
    }));

    const draw = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Colors based on current theme variables or exact matches
      const isDark = theme === 'dark';
      const greenNodeColor = isDark ? 'rgba(74, 222, 128, 0.28)' : 'rgba(22, 101, 52, 0.18)';
      const orangeScatterColor = isDark ? 'rgba(251, 146, 60, 0.22)' : 'rgba(234, 88, 12, 0.15)';
      const greenLineColor = isDark ? 'rgba(74, 222, 128, 0.05)' : 'rgba(22, 101, 52, 0.04)';
      const orangeLineColor = isDark ? 'rgba(251, 146, 60, 0.05)' : 'rgba(234, 88, 12, 0.04)';

      // 1. Update and draw orange scatter points
      scatterPoints.forEach((pt) => {
        pt.x += pt.vx;
        pt.y += pt.vy;

        if (pt.x < 0 || pt.x > canvas.width) pt.vx *= -1;
        if (pt.y < 0 || pt.y > canvas.height) pt.vy *= -1;

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fillStyle = orangeScatterColor;
        ctx.fill();
      });

      // 2. Update and draw green graph nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = greenNodeColor;
        ctx.fill();
      });

      // 3. Draw connecting lines between green graph nodes (with alternate green/orange lines)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            // Alternate connection line colors between green and orange
            ctx.strokeStyle = (i + j) % 3 === 0 ? orangeLineColor : greenLineColor;
            ctx.lineWidth = (1 - dist / connectionDist) * 1.2;
            ctx.stroke();
          }
        }
      }

      // 4. Draw a subtle green wave line chart at the bottom
      ctx.beginPath();
      const waveY = canvas.height * 0.88;
      ctx.moveTo(0, waveY);
      for (let x = 0; x < canvas.width; x += 15) {
        const offset = Math.sin(x * 0.004 + tick * 0.005) * 25 + Math.cos(x * 0.01 + tick * 0.002) * 10;
        ctx.lineTo(x, waveY + offset);
      }
      ctx.strokeStyle = isDark ? 'rgba(74, 222, 128, 0.07)' : 'rgba(22, 101, 52, 0.05)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 5. Draw low-opacity bar charts at the bottom right corner
      const barWidth = 14;
      const barGap = 6;
      const barCount = 10;
      const chartWidth = (barWidth + barGap) * barCount - barGap;
      const startX = canvas.width - chartWidth - 30;

      for (let i = 0; i < barCount; i++) {
        const factor = Math.sin(i * 0.6 + tick * 0.008) * 0.5 + 0.5; // normalized 0 to 1
        const barHeight = 20 + factor * 40;
        ctx.fillStyle = isDark ? 'rgba(74, 222, 128, 0.035)' : 'rgba(22, 101, 52, 0.025)';
        ctx.fillRect(startX + i * (barWidth + barGap), canvas.height - barHeight - 15, barWidth, barHeight);
      }

      animationId = requestAnimationFrame(draw);
    };

    if (!prefersReducedMotion) {
      draw();
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [theme, prefersReducedMotion]);

  // Mouse Spotlight Glow Style
  const glowStyle = !isTouchDevice && !prefersReducedMotion ? {
    background: theme === 'dark' 
      ? `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(34, 211, 238, 0.05), rgba(139, 92, 246, 0.03) 50%, transparent 80%)`
      : `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37, 99, 235, 0.025), rgba(124, 58, 237, 0.015) 50%, transparent 80%)`
  } : {};

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.4] dark:opacity-[0.8]" />
      
      {/* Live Node Connections canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 transition-opacity duration-500"
      />

      {/* Dynamic Mouse Spotlight Glow */}
      {!isTouchDevice && !prefersReducedMotion && (
        <div 
          className="absolute inset-0 transition-opacity duration-300"
          style={glowStyle}
        />
      )}

      {/* Faint Noise overlay */}
      <div className="absolute inset-0 noise-overlay" />
    </div>
  );
};
