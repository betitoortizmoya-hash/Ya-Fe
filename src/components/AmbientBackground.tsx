import React, { useEffect, useRef, useState } from 'react';

interface BlossomParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  rotationSpeed: number;
  opacity: number;
  type: 'petal' | 'flower' | 'bud';
  color: string;
  swayAmplitude: number;
  swayFrequency: number;
  timeOffset: number;
}

export const AmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    if (!isEnabled) return;
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

    const colors = [
      'rgba(244, 206, 201, 0.75)', // soft blush
      'rgba(248, 222, 220, 0.7)',  // baby petal
      'rgba(235, 192, 185, 0.65)', // rose dust
      'rgba(255, 237, 232, 0.8)',  // champagne blush
      'rgba(230, 215, 220, 0.6)',  // lavender rose
    ];

    const particleCount = Math.min(26, Math.max(16, Math.floor(width / 60)));
    const particles: BlossomParticle[] = [];

    const createParticle = (initialY?: number): BlossomParticle => {
      const typeRand = Math.random();
      const type: 'petal' | 'flower' | 'bud' = typeRand > 0.4 ? 'petal' : typeRand > 0.15 ? 'flower' : 'bud';
      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : Math.random() * height,
        size: type === 'flower' ? Math.random() * 7 + 7 : Math.random() * 6 + 5,
        speedY: Math.random() * 0.45 + 0.25,
        speedX: (Math.random() - 0.5) * 0.3 + 0.15,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.35 + 0.35,
        type,
        color: colors[Math.floor(Math.random() * colors.length)],
        swayAmplitude: Math.random() * 1.5 + 0.8,
        swayFrequency: Math.random() * 0.015 + 0.008,
        timeOffset: Math.random() * 1000,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    const drawPetal = (c: CanvasRenderingContext2D, size: number) => {
      c.beginPath();
      c.moveTo(0, -size);
      c.bezierCurveTo(size * 0.8, -size * 0.6, size * 0.8, size * 0.6, 0, size);
      c.bezierCurveTo(-size * 0.8, size * 0.6, -size * 0.8, -size * 0.6, 0, -size);
      c.fill();
    };

    const drawTinyFlower = (c: CanvasRenderingContext2D, size: number) => {
      const petals = 5;
      const petalSize = size * 0.42;
      for (let i = 0; i < petals; i++) {
        c.save();
        c.rotate((i * (Math.PI * 2)) / petals);
        c.beginPath();
        c.ellipse(0, petalSize, petalSize * 0.55, petalSize * 0.85, 0, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
      // Warm golden pistil center
      c.beginPath();
      c.arc(0, 0, size * 0.18, 0, Math.PI * 2);
      c.fillStyle = 'rgba(235, 184, 115, 0.75)';
      c.fill();
    };

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        p.angle += p.rotationSpeed;
        const sway = Math.sin((tick + p.timeOffset) * p.swayFrequency) * p.swayAmplitude;
        p.x += p.speedX + sway;
        p.y += p.speedY;

        // Reset if off bottom or right
        if (p.y > height + 20) {
          particles[idx] = createParticle(-20);
          return;
        }
        if (p.x > width + 20) {
          p.x = -20;
        } else if (p.x < -20) {
          p.x = width + 20;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;

        if (p.type === 'flower') {
          drawTinyFlower(ctx, p.size);
        } else {
          drawPetal(ctx, p.size);
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
  }, [isEnabled]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-85 transition-opacity duration-700"
      />
      <button
        onClick={() => setIsEnabled(!isEnabled)}
        title={isEnabled ? 'Pause floral ambient breeze' : 'Resume floral ambient breeze'}
        className="fixed bottom-4 right-4 z-40 flex items-center gap-1.5 rounded-full border border-stone-200/80 bg-white/80 px-3 py-1.5 text-xs font-medium text-stone-600 shadow-sm backdrop-blur-md transition-all hover:border-[#dfa398] hover:text-[#b76e79]"
      >
        <span className={`inline-block h-2 w-2 rounded-full ${isEnabled ? 'animate-pulse bg-[#dfa398]' : 'bg-stone-300'}`} />
        <span>{isEnabled ? 'Petal Breeze On' : 'Breeze Paused'}</span>
      </button>
    </>
  );
};
