import React from 'react';
import { ProductCustomization } from '../../types';
import { FONT_OPTIONS } from '../../data/fonts';
import { TUMBLER_TEXTURE_PRESETS } from '../../data/products';

interface MugMockupProps {
  customization: ProductCustomization;
  isZoomed?: boolean;
}

export const MugMockup: React.FC<MugMockupProps> = ({ customization, isZoomed = false }) => {
  const currentFont = FONT_OPTIONS.find((f) => f.id === customization.fontId) || FONT_OPTIONS[0];
  const selectedPattern = TUMBLER_TEXTURE_PRESETS.find((p) => p.id === customization.selectedPatternId);

  const getFontSizeClass = () => {
    const scale = customization.fontSize || 3;
    switch (scale) {
      case 1: return 'text-lg sm:text-xl';
      case 2: return 'text-xl sm:text-2xl';
      case 3: return 'text-2xl sm:text-3xl';
      case 4: return 'text-3xl sm:text-4xl';
      case 5: return 'text-4xl sm:text-5xl';
      default: return 'text-2xl sm:text-3xl';
    }
  };

  return (
    <div
      className={`relative mx-auto flex items-center justify-center transition-all duration-300 select-none ${
        isZoomed ? 'scale-110' : 'scale-100'
      }`}
      style={{ width: '100%', maxWidth: '460px', height: '520px' }}
    >
      {/* Studio Surface Shadow */}
      <div className="absolute inset-x-14 bottom-8 h-8 rounded-full bg-stone-900/20 blur-xl" />

      {/* Main High-Realism SVG Stoneware Mug */}
      <svg
        viewBox="0 0 420 460"
        className="relative h-full w-full drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Ceramic Glaze Reflection */}
          <linearGradient id="mugGlazeLighting" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.32" />
            <stop offset="14%" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="28%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="70%" stopColor="#000000" stopOpacity="0.05" />
            <stop offset="88%" stopColor="#000000" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.48" />
          </linearGradient>

          {/* Inner Cup Well Depth Gradient */}
          <linearGradient id="innerWellGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E1916" stopOpacity="0.75" />
            <stop offset="40%" stopColor="#3E342F" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#5E4F47" stopOpacity="0.2" />
          </linearGradient>

          {/* Handle 3D Curvature Gradient */}
          <linearGradient id="handleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="40%" stopColor="#000000" stopOpacity="0.05" />
            <stop offset="80%" stopColor="#000000" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.55" />
          </linearGradient>

          {/* Clip path for Mug Outer Cylinder Body */}
          <clipPath id="mugBodyClip">
            <path d="M 100 120 C 100 120, 100 370, 100 380 C 100 395, 120 405, 140 405 L 280 405 C 300 405, 320 395, 320 380 C 320 370, 320 120, 320 120 Z" />
          </clipPath>
        </defs>

        {/* 1. Ergonomic Ceramic Handle (Positioned at right) */}
        <g id="mugHandle">
          {/* Handle cast shadow onto body */}
          <path
            d="M 305 160 C 390 170, 395 330, 305 345"
            stroke="rgba(0,0,0,0.18)"
            strokeWidth="38"
            strokeLinecap="round"
            className="filter blur-xs"
          />
          {/* Handle base color */}
          <path
            d="M 305 160 C 390 170, 395 330, 305 345"
            stroke={customization.productColor}
            strokeWidth="32"
            strokeLinecap="round"
          />
          {/* Handle glossy ceramic shine */}
          <path
            d="M 305 160 C 390 170, 395 330, 305 345"
            stroke="url(#handleGrad)"
            strokeWidth="32"
            strokeLinecap="round"
          />
          {/* Handle inner hollow highlight */}
          <path
            d="M 308 175 C 365 185, 368 315, 308 330"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="3"
            fill="none"
          />
        </g>

        {/* 2. Mug Ceramic Cylinder Body with Clip Path */}
        <g clipPath="url(#mugBodyClip)">
          {/* Base ceramic color (shows when no custom image or under transparent parts) */}
          <rect x="90" y="100" width="240" height="320" fill={customization.productColor} />

          {/* User-uploaded custom background image wrap: 100% true vibrant original colors ("plasmada tal cual") */}
          {customization.backgroundImageUrl ? (
            <image
              href={customization.backgroundImageUrl}
              x="90"
              y="100"
              width="240"
              height="320"
              preserveAspectRatio="xMidYMid slice"
            />
          ) : selectedPattern && selectedPattern.id !== 'none' ? (
            <foreignObject x="90" y="100" width="240" height="320">
              <div
                className="h-full w-full opacity-90"
                style={{ background: selectedPattern.cssBackground }}
              />
            </foreignObject>
          ) : null}

          {/* High gloss specular glaze bar (gentle over image to preserve pure colors) */}
          <rect
            x="90"
            y="100"
            width="240"
            height="320"
            fill="url(#mugGlazeLighting)"
            opacity={customization.backgroundImageUrl ? 0.22 : 1}
          />
        </g>

        {/* 3. Ceramic Top Rim Lip & Interior Liquid Well */}
        <g id="mugRim">
          {/* Outer lip rim ellipse */}
          <ellipse cx="210" cy="120" rx="110" ry="22" fill={customization.productColor} stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
          {/* Lip glaze sheen */}
          <ellipse cx="210" cy="120" rx="110" ry="22" fill="url(#mugGlazeLighting)" opacity={0.6} />

          {/* Interior cup well cavity */}
          <ellipse cx="210" cy="120" rx="98" ry="18" fill="#2D231E" />
          <ellipse cx="210" cy="120" rx="98" ry="18" fill="url(#innerWellGrad)" />

          {/* Interior coffee / hot latte surface depth */}
          <ellipse cx="210" cy="124" rx="92" ry="15" fill="#3D291D" opacity="0.9" />
          {/* Liquid surface crema ring */}
          <ellipse cx="206" cy="123" rx="86" ry="12" fill="none" stroke="#C49B71" strokeWidth="1" opacity="0.45" />
        </g>

        {/* 4. Ceramic Foot Base Ring */}
        <g id="mugFoot">
          <path
            d="M 130 405 C 130 412, 160 416, 210 416 C 260 416, 290 412, 290 405"
            stroke="rgba(0,0,0,0.18)"
            strokeWidth="3"
            fill="none"
          />
        </g>
      </svg>

      {/* Personalized Inscribed Typography on the Mug Body (ONLY if text exists) */}
      {Boolean(customization.customText?.trim() || customization.secondaryText?.trim()) && (
        <div
          className="pointer-events-none absolute z-20 flex items-center justify-center text-center transition-all"
          style={{
            top: '165px',
            bottom: '80px',
            left: '110px',
            right: '130px',
          }}
        >
          <div className="flex flex-col items-center justify-center w-full px-2">
            {customization.customText?.trim() && (
              <span
                className={`block leading-tight font-medium ${getFontSizeClass()}`}
                style={{
                  fontFamily: currentFont.family,
                  color: customization.textColor,
                  textShadow:
                    customization.textColor === '#D4AF37' || customization.textColor === '#B76E79'
                      ? '0 0.5px 1px rgba(255,255,255,0.8), 0 1px 2px rgba(0,0,0,0.45)'
                      : '0 1px 2px rgba(0,0,0,0.3)',
                  filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.25))',
                }}
              >
                {customization.customText}
              </span>
            )}

            {customization.secondaryText?.trim() && (
              <span
                className="mt-1.5 block text-[10px] tracking-[0.22em] uppercase opacity-90 sm:text-xs"
                style={{
                  fontFamily:
                    currentFont.category === 'script' ? "'Montserrat', sans-serif" : currentFont.family,
                  color: customization.textColor,
                  letterSpacing: '0.22em',
                }}
              >
                {customization.secondaryText}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Bottom badge */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-stone-200/90 bg-white/95 px-3 py-1 text-[11px] font-medium text-stone-600 shadow-sm backdrop-blur-sm">
        14oz Artisan High-Fire Stoneware • Ceramic Wrap Preview
      </div>
    </div>
  );
};
