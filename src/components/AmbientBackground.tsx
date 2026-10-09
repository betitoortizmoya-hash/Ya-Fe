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
  type: 'petal' | 'flower' | 'leaf' | 'emoji';
  emojiValue?: string;
  color: string;
  swayAmplitude: number;
  swayFrequency: number;
  timeOffset: number;
}

export const AmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const [activeTheme, setActiveTheme] = useState(localStorage.getItem('ya_fe_theme') || 'spring');

  useEffect(() => {
    const handleThemeChange = () => {
      setActiveTheme(localStorage.getItem('ya_fe_theme') || 'spring');
    };
    window.addEventListener('themeChanged', handleThemeChange);
    return () => window.removeEventListener('themeChanged', handleThemeChange);
  }, []);

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

    const THEMES = {
      spring: {
        types: ['petal', 'flower', 'leaf'],
        colors: ['rgba(255, 77, 148, 0.85)', 'rgba(255, 20, 147, 0.8)', 'rgba(255, 133, 179, 0.9)'],
        leafColors: ['rgba(144, 238, 144, 0.85)', 'rgba(110, 210, 130, 0.8)']
      },
      christmas: {
        types: ['emoji'],
        emojis: ['🎅', '🦌', '🌿', '❄️', '🎁', '✨', '🎄'],
      },
      halloween: {
        types: ['emoji'],
        emojis: ['🎃', '🦇', '🍁', '👻', '🍂', '🕷️'],
      },
      easter: {
        types: ['emoji'],
        emojis: ['🐰', '🥚', '🌸', '🌷', '🎀', '🐣'],
      },
      valentine: {
        types: ['emoji'],
        emojis: ['❤️', '💖', '✨', '🌹', '💌', '💘'],
      }
    };

    const currentThemeConfig = THEMES[activeTheme as keyof typeof THEMES] || THEMES.spring;
    const particleCount = Math.min(30, Math.max(16, Math.floor(width / 50)));
    const particles: BlossomParticle[] = [];

    const createParticle = (initialY?: number): BlossomParticle => {
      const isEmojiTheme = currentThemeConfig.types.includes('emoji');
      let type: BlossomParticle['type'] = 'petal';
      let emojiValue = '';
      let color = 'rgba(255,255,255,0.8)';

      if (isEmojiTheme) {
        type = 'emoji';
        emojiValue = currentThemeConfig.emojis![Math.floor(Math.random() * currentThemeConfig.emojis!.length)];
      } else {
        const typeRand = Math.random();
        if (typeRand > 0.7) {
          type = 'petal';
          color = currentThemeConfig.colors[Math.floor(Math.random() * currentThemeConfig.colors.length)];
        } else if (typeRand > 0.4) {
          type = 'flower';
          color = currentThemeConfig.colors[Math.floor(Math.random() * currentThemeConfig.colors.length)];
        } else {
          type = 'leaf';
          color = currentThemeConfig.leafColors![Math.floor(Math.random() * currentThemeConfig.leafColors!.length)];
        }
      }

      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : Math.random() * height,
        // Tamaño ajustado para ser visible pero elegante
        size: isEmojiTheme ? Math.random() * 16 + 22 : (type === 'flower' ? Math.random() * 8 + 8 : Math.random() * 7 + 6),
        
        // Físicas restauradas EXACTAMENTE a las originales para máxima fluidez
        speedY: Math.random() * 0.45 + 0.25,
        speedX: (Math.random() - 0.5) * 0.3 + 0.15,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.35 + 0.45,
        type,
        emojiValue,
        color,
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
      c.beginPath();
      c.arc(0, 0, size * 0.18, 0, Math.PI * 2);
      c.fillStyle = 'rgba(255, 220, 100, 0.9)'; 
      c.fill();
    };

    const drawLeaf = (c: CanvasRenderingContext2D, size: number) => {
      c.beginPath();
      c.moveTo(0, 0);
      c.quadraticCurveTo(size * 0.8, -size * 0.4, size, -size);
      c.quadraticCurveTo(size * 0.3, 0, 0, 0);
      c.fill();
      c.beginPath();
      c.moveTo(0, 0);
      c.lineTo(size * 0.75, -size * 0.75);
      c.strokeStyle = 'rgba(255,255,255,0.4)';
      c.lineWidth = 1.2;
      c.stroke();
    };

    const drawEmoji = (c: CanvasRenderingContext2D, emoji: string, size: number) => {
      c.font = `${size}px sans-serif`;
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillText(emoji, 0, 0);
    };

    let tick = 0;
    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        // Rotación continua y fluida para todos los elementos
        p.angle += p.rotationSpeed;
        
        // Empuje de viento suave
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
        ctx.rotate(p.angle); // Rotación aplicada por igual
        ctx.globalAlpha = p.opacity;

        if (p.type === 'emoji' && p.emojiValue) {
          drawEmoji(ctx, p.emojiValue, p.size);
        } else {
          ctx.fillStyle = p.color;
          if (p.type === 'flower') {
            drawTinyFlower(ctx, p.size);
          } else if (p.type === 'leaf') {
            drawLeaf(ctx, p.size);
          } else {
            drawPetal(ctx, p.size);
          }
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
  }, [isEnabled, activeTheme]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-85 transition-opacity duration-700"
      />
      <button
        onClick={() => setIsEnabled(!isEnabled)}
        className="fixed bottom-4 right-4 z-40 flex items-center gap-1.5 rounded-full border border-stone-200/80 bg-white/80 px-3 py-1.5 text-xs font-medium text-stone-600 shadow-sm backdrop-blur-md transition-all hover:border-[#ff4d94] hover:text-[#ff4d94]"
      >
        <span className={`inline-block h-2 w-2 rounded-full ${isEnabled ? 'animate-pulse bg-[#ff4d94]' : 'bg-stone-300'}`} />
        <span>{isEnabled ? 'Animación On' : 'Animación Pausa'}</span>
      </button>
    </>
  );
};
