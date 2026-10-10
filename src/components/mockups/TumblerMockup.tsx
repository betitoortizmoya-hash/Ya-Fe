import React, { useState } from 'react';
import { ProductCustomization } from '../../types';
import { FONT_OPTIONS } from '../../data/fonts';
import { TUMBLER_TEXTURE_PRESETS } from '../../data/products';

interface TumblerMockupProps {
  customization: ProductCustomization;
  isZoomed?: boolean;
  showLifestyleBackground?: boolean;
}

export const TumblerMockup: React.FC<TumblerMockupProps> = ({ customization, isZoomed = false, showLifestyleBackground = true }) => {
  const currentFont = FONT_OPTIONS.find((f) => f.id === customization.fontId) || FONT_OPTIONS[0];
  const selectedPattern = TUMBLER_TEXTURE_PRESETS.find((p) => p.id === customization.selectedPatternId);
  const isVertical = customization.textPlacement === 'vertical' || !customization.textPlacement;
  
  // Controlador del giro de 360 grados del vaso entero
  const [rotation, setRotation] = useState(0);

  const getFontSizeClass = () => {
    const scale = customization.fontSize || 3;
    if (isVertical) {
      switch (scale) {
        case 1: return 'text-xl sm:text-2xl tracking-[0.25em]';
        case 2: return 'text-2xl sm:text-3xl tracking-[0.28em]';
        case 3: return 'text-3xl sm:text-4xl tracking-[0.3em]';
        case 4: return 'text-4xl sm:text-5xl tracking-[0.32em]';
        case 5: return 'text-5xl sm:text-6xl tracking-[0.35em]';
        default: return 'text-3xl sm:text-4xl tracking-[0.3em]';
      }
    } else {
      switch (scale) {
        case 1: return 'text-lg sm:text-xl';
        case 2: return 'text-xl sm:text-2xl';
        case 3: return 'text-2xl sm:text-3xl';
        case 4: return 'text-3xl sm:text-4xl';
        case 5: return 'text-4xl sm:text-5xl';
        default: return 'text-2xl sm:text-3xl';
      }
    }
  };

  return (
    <div className={`relative mx-auto flex flex-col items-center justify-center transition-all duration-300 select-none ${isZoomed ? 'scale-110' : 'scale-100'}`} style={{ width: '100%', maxWidth: '460px', height: '540px' }}>
      {/* Añadimos 'perspective' para dar profundidad al giro 3D */}
      <div className="relative w-full h-[480px] flex items-center justify-center" style={{ perspective: '1200px' }}>
        {showLifestyleBackground && (
          <div className="absolute inset-4 -bottom-1 -top-2 overflow-hidden rounded-3xl border border-stone-200/60 bg-gradient-to-b from-[#F9F5F1] via-[#F4EDE7] to-[#EAE0D6] shadow-inner">
            <div className="absolute inset-x-8 bottom-6 h-14 rounded-2xl bg-[#F6EEEC] shadow-md border-t border-white/80"><div className="absolute inset-x-0 bottom-0 h-2 rounded-b-2xl bg-[#E2D2CC]" /></div>
          </div>
        )}
        
        {/* Sombra base fija que no gira con el termo */}
        <div className="absolute bottom-10 left-1/2 h-5 w-40 -translate-x-1/2 rounded-full bg-stone-900/20 blur-md" />
        
        {/* CONTENEDOR 3D: Todo lo que esté aquí adentro (vaso, imagen, popote y texto) girará en 3D */}
        <div className="relative z-10 h-full w-full" style={{ transform: `rotateY(${rotation}deg)`, transformStyle: 'preserve-3d' }}>
          
          <svg viewBox="0 0 320 480" className="absolute inset-0 h-full w-full drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="stainlessSteel" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8A929B" /><stop offset="18%" stopColor="#DFE3E7" /><stop offset="35%" stopColor="#FFFFFF" /><stop offset="55%" stopColor="#DFE3E7" /><stop offset="78%" stopColor="#ADB4BD" /><stop offset="100%" stopColor="#6C737C" />
              </linearGradient>
              <linearGradient id="strawGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7E858E" /><stop offset="40%" stopColor="#FFFFFF" /><stop offset="75%" stopColor="#ADB3BB" /><stop offset="100%" stopColor="#6C727B" />
              </linearGradient>
              <linearGradient id="acrylicLid" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" /><stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.85" /><stop offset="45%" stopColor="#CBD5E1" stopOpacity="0.3" /><stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.6" /><stop offset="100%" stopColor="#94A3B8" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="cylinderLighting" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#000000" stopOpacity="0.38" /><stop offset="16%" stopColor="#FFFFFF" stopOpacity="0.28" /><stop offset="36%" stopColor="#FFFFFF" stopOpacity="0.45" /><stop offset="58%" stopColor="#000000" stopOpacity="0.05" /><stop offset="82%" stopColor="#000000" stopOpacity="0.22" /><stop offset="100%" stopColor="#000000" stopOpacity="0.48" />
              </linearGradient>
              <clipPath id="tumblerBodyClip">
                <path d="M 88 140 L 232 140 L 218 410 C 218 418, 208 424, 196 424 L 124 424 C 112 424, 102 418, 102 410 Z" />
              </clipPath>
            </defs>

            <g id="straw"><path d="M 215 110 L 255 18" stroke="url(#strawGrad)" strokeWidth="7" strokeLinecap="round" /><ellipse cx="255" cy="18" rx="3.5" ry="2" fill="#585D64" /></g>
            <g id="tumblerLid"><ellipse cx="160" cy="120" rx="72" ry="14" fill="url(#acrylicLid)" stroke="rgba(255,255,255,0.7)" strokeWidth="1" /><path d="M 88 120 C 88 120, 88 132, 88 132 C 88 138, 120 144, 160 144 C 200 144, 232 138, 232 132 L 232 120 Z" fill="url(#acrylicLid)" stroke="rgba(200,210,220,0.5)" strokeWidth="0.8" /><path d="M 91 130 C 110 137, 210 137, 229 130" stroke="#CBD5E1" strokeWidth="1.8" opacity="0.8" /><ellipse cx="215" cy="122" rx="6" ry="3.5" fill="#475569" opacity="0.6" /></g>
            <path d="M 87 132 C 87 132, 87 142, 87 142 C 87 148, 120 154, 160 154 C 200 154, 233 148, 233 142 L 233 132 C 233 138, 200 144, 160 144 C 120 144, 87 138, 87 132 Z" fill="url(#stainlessSteel)" stroke="#7A818B" strokeWidth="0.5" />
            
            <g clipPath="url(#tumblerBodyClip)">
              <rect x="70" y="130" width="180" height="300" fill={customization.productColor} />
              
              {/* Restauramos la imagen de forma estática para que gire solidariamente con el termo */}
              {customization.backgroundImageUrl ? (
                <image href={customization.backgroundImageUrl} x="70" y="130" width="180" height="300" preserveAspectRatio="xMidYMid slice" />
              ) : selectedPattern && selectedPattern.id !== 'none' ? (
                <foreignObject x="70" y="130" width="180" height="300">
                  <div className="h-full w-full opacity-90" style={{ background: selectedPattern.cssBackground }} />
                </foreignObject>
              ) : null}

              <rect x="70" y="130" width="180" height="300" fill="url(#cylinderLighting)" opacity={customization.backgroundImageUrl ? 0.22 : 1} />
            </g>

            <g id="bottomSteelRing"><path d="M 102 406 L 102 416 C 102 423, 115 428, 160 428 C 205 428, 218 423, 218 416 L 218 406 C 218 413, 205 418, 160 418 C 115 418, 102 413, 102 406 Z" fill="url(#stainlessSteel)" stroke="#7A818B" strokeWidth="0.5" /></g>
          </svg>

          {/* El texto también está dentro del contenedor 3D, por lo que rotará con el vaso */}
          {Boolean(customization.customText?.trim() || customization.secondaryText?.trim()) && (
            <div className="pointer-events-none absolute z-20 flex items-center justify-center transition-all duration-300" style={{ top: '160px', bottom: '80px', left: '115px', right: '115px' }}>
              <div className={`flex flex-col items-center justify-center text-center font-medium transition-all ${isVertical ? 'h-full justify-center' : 'w-full'}`} style={{ fontFamily: currentFont.family, color: customization.textColor, textShadow: '0 1px 2px rgba(0,0,0,0.4)', filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.3))' }}>
                {isVertical ? (
                  <div className={`flex flex-col items-center justify-center select-none ${getFontSizeClass()}`} style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}>
                    {customization.customText?.trim() && <span className="leading-tight py-2">{customization.customText}</span>}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center px-2">
                    {customization.customText?.trim() && <span className={`block leading-tight ${getFontSizeClass()}`}>{customization.customText}</span>}
                    {customization.secondaryText?.trim() && <span className="mt-1 block text-[10px] tracking-[0.2em] uppercase opacity-90 sm:text-xs" style={{ fontFamily: currentFont.category === 'script' ? "'Montserrat', sans-serif" : currentFont.family }}>{customization.secondaryText}</span>}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="absolute -bottom-1 w-3/4 flex flex-col items-center z-30 bg-white/80 p-2 rounded-xl border border-stone-200 backdrop-blur-md">
        <span className="text-[10px] text-stone-600 font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1">🔄 Rotar Vaso en 360°</span>
        <input type="range" min="0" max="360" value={rotation} onChange={(e) => setRotation(Number(e.target.value))} className="w-full h-1.5 bg-stone-300 rounded-lg appearance-none cursor-ew-resize" />
      </div>
    </div>
  );
};
