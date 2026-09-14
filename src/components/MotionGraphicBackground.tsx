import React, { useEffect, useRef } from 'react';

export const MotionGraphicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Motion Graphic Geometric Objects
    interface MotionShape {
      x: number;
      y: number;
      size: number;
      type: 'ring' | 'cube' | 'plus' | 'diamond' | 'wave' | 'km_mark';
      vx: number;
      vy: number;
      angle: number;
      vAngle: number;
      color: string;
      alpha: number;
    }

    const shapes: MotionShape[] = [];
    const shapeCount = Math.min(28, Math.max(16, Math.floor(width / 55)));

    const colors = [
      '#f59e0b', // Vibrant Gold
      '#10b981', // Trust Emerald
      '#0ea5e9', // Sky Cyan
      '#6366f1', // Indigo Motion
      '#d97706', // Amber
    ];

    const types: MotionShape['type'][] = ['ring', 'cube', 'plus', 'diamond', 'wave', 'km_mark'];

    for (let i = 0; i < shapeCount; i++) {
      shapes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 18 + Math.random() * 36,
        type: types[Math.floor(Math.random() * types.length)],
        vx: (Math.random() - 0.5) * 0.9,
        vy: (Math.random() - 0.5) * 0.9,
        angle: Math.random() * Math.PI * 2,
        vAngle: (Math.random() - 0.5) * 0.025,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.35 + Math.random() * 0.35, // Clear and visible
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Draw active kinetic spline paths (Motion Graph Trajectory)
      ctx.save();
      ctx.lineWidth = 2.5;
      ctx.setLineDash([10, 10]);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.22)';

      ctx.beginPath();
      ctx.moveTo(0, height * 0.25 + Math.sin(time * 0.6) * 70);
      ctx.bezierCurveTo(
        width * 0.3,
        height * 0.12 + Math.cos(time * 0.5) * 90,
        width * 0.6,
        height * 0.45 + Math.sin(time * 0.7) * 80,
        width,
        height * 0.22 + Math.cos(time * 0.6) * 70
      );
      ctx.stroke();

      // Second ribbon path (Emerald Trust Flow)
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.22)';
      ctx.beginPath();
      ctx.moveTo(0, height * 0.78 + Math.cos(time * 0.5) * 60);
      ctx.bezierCurveTo(
        width * 0.35,
        height * 0.88 + Math.sin(time * 0.6) * 70,
        width * 0.7,
        height * 0.62 + Math.cos(time * 0.4) * 80,
        width,
        height * 0.82 + Math.sin(time * 0.5) * 60
      );
      ctx.stroke();
      ctx.restore();

      // Connect close shapes with subtle dynamic motion graph links
      for (let i = 0; i < shapes.length; i++) {
        for (let j = i + 1; j < shapes.length; j++) {
          const dx = shapes[i].x - shapes[j].x;
          const dy = shapes[i].y - shapes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.save();
            ctx.strokeStyle = shapes[i].color;
            ctx.globalAlpha = (1 - dist / 140) * 0.25;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(shapes[i].x, shapes[i].y);
            ctx.lineTo(shapes[j].x, shapes[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // Draw and update each kinetic motion graphic shape
      shapes.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.angle += s.vAngle;

        // Wrap around bounds
        if (s.x < -60) s.x = width + 60;
        if (s.x > width + 60) s.x = -60;
        if (s.y < -60) s.y = height + 60;
        if (s.y > height + 60) s.y = -60;

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.angle);
        ctx.globalAlpha = s.alpha;

        if (s.type === 'ring') {
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(0, 0, s.size, 0, Math.PI * 2);
          ctx.stroke();

          // Satellite pulse dot
          ctx.fillStyle = s.color;
          ctx.beginPath();
          ctx.arc(s.size * 0.6, 0, 3.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (s.type === 'cube') {
          // Isometric 3D outline box with sharp edges
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 2.5;
          const sz = s.size;
          ctx.strokeRect(-sz / 2, -sz / 2, sz, sz);
          ctx.beginPath();
          ctx.moveTo(-sz / 2, -sz / 2);
          ctx.lineTo(sz / 2, sz / 2);
          ctx.stroke();
        } else if (s.type === 'plus') {
          // Precision crosshair plus
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 3.5;
          const sz = s.size * 0.7;
          ctx.beginPath();
          ctx.moveTo(-sz, 0);
          ctx.lineTo(sz, 0);
          ctx.moveTo(0, -sz);
          ctx.lineTo(0, sz);
          ctx.stroke();
        } else if (s.type === 'diamond') {
          ctx.fillStyle = s.color;
          const sz = s.size * 0.65;
          ctx.beginPath();
          ctx.moveTo(0, -sz);
          ctx.lineTo(sz, 0);
          ctx.lineTo(0, sz);
          ctx.lineTo(-sz, 0);
          ctx.closePath();
          ctx.fill();
        } else if (s.type === 'km_mark') {
          // Sharp KM glyph mark
          ctx.fillStyle = s.color;
          ctx.font = `900 ${Math.floor(s.size * 0.85)}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('KM', 0, 0);
        } else {
          // Kinetic Wave Arc
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(0, 0, s.size, 0, Math.PI);
          ctx.stroke();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Animated Motion Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Kinetic Floating Ambient Gradient Glows - enhanced opacity */}
      <div className="absolute top-1/6 right-1/4 w-[520px] h-[520px] bg-amber-400/20 rounded-full blur-3xl animate-slow-motion-bg pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/5 w-[560px] h-[560px] bg-emerald-400/18 rounded-full blur-3xl animate-slow-motion-reverse pointer-events-none" />
      <div className="absolute top-2/3 right-10 w-[420px] h-[420px] bg-sky-400/16 rounded-full blur-3xl animate-slow-motion-bg pointer-events-none" />

      {/* Subtle Motion Graphic Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
    </div>
  );
};
