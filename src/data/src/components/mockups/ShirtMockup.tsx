import React from 'react';
import { ProductCustomization } from '../../types';
import { FONT_OPTIONS } from '../../data/fonts';
import { TUMBLER_TEXTURE_PRESETS } from '../../data/products';

interface ShirtMockupProps {
  customization: ProductCustomization;
  isZoomed?: boolean;
}

export const ShirtMockup: React.FC<ShirtMockupProps> = ({ customization, isZoomed = false }) => {
  const currentFont = FONT_OPTIONS.find((f) => f.id === customization.fontId) || FONT_OPTIONS[0];
  const selectedPattern = TUMBLER_TEXTURE_PRESETS.find((p) => p.id === customization.selectedPatternId);

  const getPositionClasses = () => {
    switch (customization.textPlacement) {
      case 'pocket': return 'top-[35%] left-[65%] -translate-x-1/2 -translate-y-1/2 scale-75';
      case 'center': return 'top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 scale-125';
      case 'chest':
      default: return 'top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 scale-90';
    }
  };

  const getFontSizeClass = () => {
    const scale = customization.fontSize || 3;
    switch (scale) {
      case 1: return 'text-lg';
      case 2: return 'text-xl';
      case 3: return 'text-2xl';
      case 4: return 'text-3xl';
      case 5: return 'text-4xl';
      default: return 'text-2xl';
    }
  };

  const isPolo = customization.productId === 'shirt-polo';

  return (
    <div
      className={`relative mx-auto flex items-center justify-center transition-all duration-300 select-none ${
        isZoomed ? 'scale-110' : 'scale-100'
      }`}
      style={{ width: '100%', maxWidth: '420px', height: '500px' }}
    >
      <div className="absolute inset-x-10 bottom-6 h-8 rounded-full bg-stone-900/15 blur-xl" />
      
      <svg viewBox="0 0 400 480" className="relative h-full w-full drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="shirtFolds" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.2" />
            <stop offset="15%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#000000" stopOpacity="0.05" />
            <stop offset="85%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
          </linearGradient>
          <clipPath id="shirtBodyClip">
            <path d="M 120 70 Q 200 90 280 70 L 370 140 C 380 150 380 170 370 180 L 330 220 L 310 180 L 300 440 C 300 460 200 470 100 440 L 90 180 L 70 220 L 30 180 C 20 170 20 150 30 140 Z" />
          </clipPath>
        </defs>

        <g clipPath="url(#shirtBodyClip)">
          {/* Color Base */}
          <rect x="0" y="0" width="400" height="480" fill={customization.productColor} />
          
          {/* Fondo Personalizado */}
          {customization.backgroundImageUrl ? (
             <image href={customization.backgroundImageUrl} x="0" y="0" width="400" height="480" preserveAspectRatio="xMidYMid slice" />
          ) : selectedPattern && selectedPattern.id !== 'none' ? (
             <foreignObject x="0" y="0" width="400" height="480">
               <div className="h-full w-full opacity-90" style={{ background: selectedPattern.cssBackground }} />
             </foreignObject>
          ) : null}
          
          {/* Sombras de tela */}
          <rect x="0" y="0" width="400" height="480" fill="url(#shirtFolds)" className="mix-blend-overlay" />
          
          {/* Detalles de Costuras y Cuello */}
          <path d="M 160 70 Q 200 120 240 70" stroke="rgba(0,0,0,0.15)" strokeWidth="3" fill="none" />
          <path d="M 110 160 L 90 440 M 290 160 L 310 440" stroke="rgba(0,0,0,0.1)" strokeWidth="2" strokeDasharray="5 5" fill="none" />
          
          {/* Abertura central (botones) */}
          <line x1="200" y1="90" x2="200" y2="450" stroke="rgba(0,0,0,0.1)" strokeWidth="2" />
          {!isPolo && [150, 220, 290, 360].map(y => <circle key={y} cx="200" cy={y} r="3" fill="rgba(255,255,255,0.8)" stroke="rgba(0,0,0,0.2)" />)}
          {isPolo && [120, 150].map(y => <circle key={y} cx="200" cy={y} r="3" fill={customization.productColor} stroke="rgba(0,0,0,0.3)" />)}
          
          {/* Cuello */}
          <path d="M 120 70 L 160 110 L 200 90 L 240 110 L 280 70 L 240 50 Q 200 40 160 50 Z" fill={customization.productColor} className="drop-shadow-md" />
          <path d="M 120 70 L 160 110 L 200 90 L 240 110 L 280 70 L 240 50 Q 200 40 160 50 Z" fill="url(#shirtFolds)" className="mix-blend-overlay" />
        </g>
      </svg>

      {/* Bordado / Texto */}
      {Boolean(customization.customText?.trim() || customization.secondaryText?.trim()) && (
        <div className={`pointer-events-none absolute z-20 flex flex-col items-center text-center transition-all ${getPositionClasses()}`}>
          <div className="flex flex-col items-center justify-center px-2 mix-blend-multiply opacity-90">
            {customization.customText?.trim() && (
              <span className={`block leading-tight font-semibold ${getFontSizeClass()}`} style={{ fontFamily: currentFont.family, color: customization.textColor, textShadow: '0 1px 1px rgba(0,0,0,0.1)' }}>
                {customization.customText}
              </span>
            )}
            {customization.secondaryText?.trim() && (
              <span className="mt-1 block text-[9px] tracking-widest uppercase" style={{ fontFamily: currentFont.category === 'script' ? "'Montserrat', sans-serif" : currentFont.family, color: customization.textColor }}>
                {customization.secondaryText}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
