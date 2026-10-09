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
  type: 'petal' | 'flower' | 'bud' | 'leaf';
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

    // Paleta súper femenina: Rosas brillantes, fucsias y verdes vivos para las hojas
    const pinkColors = [
      'rgba(255, 77, 148, 0.85)', // Rosa fuerte vibrante
      'rgba(255, 20, 147, 0.8)',  // Fucsia profundo
      'rgba(255, 133, 179, 0.9)', // Rosa chic chicle
      'rgba(255, 105, 180, 0.85)',// Hot pink clásico
    ];
    const leafColors = [
      'rgba(144, 238, 144, 0.85)', // Verde claro fresco
      'rgba(110, 210, 130, 0.8)',  // Verde hoja vibrante
      'rgba(163, 230, 150, 0.75)', // Verde menta suave
    ];

    const particleCount = Math.min(35, Math.max(20, Math.floor(width / 45)));
    const particles: BlossomParticle[] = [];

    const createParticle = (initialY?: number): BlossomParticle => {
      const typeRand = Math.random();
      let type: 'petal' | 'flower' | 'bud' | 'leaf';
      let colorArray = pinkColors;

      if (typeRand > 0.7) {
        type = 'petal';
      } else if (typeRand > 0.4) {
        type = 'flower';
      } else if (typeRand > 0.15) {
        type = 'leaf';
        colorArray = leafColors; // Las hojas usan la paleta verde
      } else {
        type = 'bud';
      }

      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : Math.random() * height,
        size: type === 'flower' ? Math.random() * 12 + 14 : Math.random() * 9 + 8, // Flores más grandes
        speedY: Math.random() * 0.6 + 0.3,
        speedX: (Math.random() - 0.5) * 0.4 + 0.2,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        opacity: Math.random() * 0.4 + 0.5, // Más opacidad para que brillen
        type,
        color: colorArray[Math.floor(Math.random() * colorArray.length)],
        swayAmplitude: Math.random() * 2 + 1,
        swayFrequency: Math.random() * 0.02 + 0.01,
        timeOffset: Math.random() * 1000,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    const drawPetal = (c: CanvasRenderingContext2D, size: number) => {
      c.beginPath();
      c.moveTo(0, -size);
      c.bezierCurveTo(size * 0.9, -size * 0.7, size * 0.9, size * 0.7, 0, size);
      c.bezierCurveTo(-size * 0.9, size * 0.7, -size * 0.9, -size * 0.7, 0, -size);
      c.fill();
    };

    const drawTinyFlower = (c: CanvasRenderingContext2D, size: number) => {
      const petals = 5;
      const petalSize = size * 0.45;
      for (let i = 0; i < petals; i++) {
        c.save();
        c.rotate((i * (Math.PI * 2)) / petals);
        c.beginPath();
        c.ellipse(0, petalSize, petalSize * 0.6, petalSize * 0.9, 0, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
      c.beginPath();
      c.arc(0, 0, size * 0.2, 0, Math.PI * 2);
      c.fillStyle = 'rgba(255, 220, 100, 0.9)'; // Centro amarillo brillante
      c.fill();
    };

    const drawLeaf = (c: CanvasRenderingContext2D, size: number) => {
      c.beginPath();
      c.moveTo(0, 0);
      c.quadraticCurveTo(size * 0.8, -size * 0.4, size, -size);
      c.quadraticCurveTo(size * 0.3, 0, 0, 0);
      c.fill();
      // Nervadura de la hojita
      c.beginPath();
      c.moveTo(0, 0);
      c.lineTo(size * 0.75, -size * 0.75);
      c.strokeStyle = 'rgba(255,255,255,0.4)';
      c.lineWidth = 1.2;
      c.stroke();
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
        } else if (p.type === 'leaf') {
          drawLeaf(ctx, p.size);
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
        className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-90 transition-opacity duration-700"
      />
      <button
        onClick={() => setIsEnabled(!isEnabled)}
        className="fixed bottom-4 right-4 z-40 flex items-center gap-1.5 rounded-full border border-stone-200/80 bg-white/80 px-3 py-1.5 text-xs font-medium text-stone-600 shadow-sm backdrop-blur-md transition-all hover:border-[#ff4d94] hover:text-[#ff4d94]"
      >
        <span className={`inline-block h-2 w-2 rounded-full ${isEnabled ? 'animate-pulse bg-[#ff4d94]' : 'bg-stone-300'}`} />
        <span>{isEnabled ? 'Petal Breeze On' : 'Breeze Paused'}</span>
      </button>
    </>
  );
};
