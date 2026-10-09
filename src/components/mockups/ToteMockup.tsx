import React from 'react';
import { ProductCustomization } from '../../types';
import { FONT_OPTIONS } from '../../data/fonts';

interface ToteMockupProps {
  customization: ProductCustomization;
  isZoomed?: boolean;
}

export const ToteMockup: React.FC<ToteMockupProps> = ({ customization, isZoomed = false }) => {
  const currentFont = FONT_OPTIONS.find((f) => f.id === customization.fontId) || FONT_OPTIONS[0];

  const getFontSizeClass = () => {
    const scale = customization.fontSize || 3;
    switch (scale) {
      case 1: return 'text-xl sm:text-2xl';
      case 2: return 'text-2xl sm:text-3xl';
      case 3: return 'text-3xl sm:text-4xl';
      case 4: return 'text-4xl sm:text-5xl';
      case 5: return 'text-5xl sm:text-6xl';
      default: return 'text-3xl sm:text-4xl';
    }
  };

  const isMetallic =
    customization.textColor === '#D4AF37' || customization.textColor === '#B76E79';

  return (
    <div
      className={`relative mx-auto flex items-center justify-center transition-all duration-300 select-none ${
        isZoomed ? 'scale-110' : 'scale-100'
      }`}
      style={{ width: '100%', maxWidth: '450px', height: '530px' }}
    >
      {/* Ground Contact Shadow */}
      <div className="absolute inset-x-10 bottom-6 h-9 rounded-full bg-stone-900/20 blur-xl" />

      {/* Photorealistic SVG Tote Bag */}
      <svg
        viewBox="0 0 420 490"
        className="relative h-full w-full drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Heavy Canvas Weave Micro-Pattern */}
          <pattern id="canvasWeave" width="4" height="4" patternUnits="userSpaceOnUse">
            <rect width="2" height="2" fill="rgba(0,0,0,0.06)" />
            <rect x="2" y="2" width="2" height="2" fill="rgba(0,0,0,0.06)" />
            <rect x="2" width="2" height="2" fill="rgba(255,255,255,0.05)" />
            <rect y="2" width="2" height="2" fill="rgba(255,255,255,0.05)" />
          </pattern>

          {/* Canvas Draping Folds & Lighting */}
          <linearGradient id="toteLighting" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.25" />
            <stop offset="18%" stopColor="#ffffff" stopOpacity="0.18" />
            <stop offset="38%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="55%" stopColor="#000000" stopOpacity="0.04" />
            <stop offset="75%" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="90%" stopColor="#000000" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.32" />
          </linearGradient>

          {/* Bottom Box Corner Gusset Shadow */}
          <linearGradient id="gussetShadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.0" />
            <stop offset="70%" stopColor="#000000" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
          </linearGradient>

          {/* Webbing Handles Texture */}
          <linearGradient id="webbingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7E7260" />
            <stop offset="30%" stopColor="#BAAC98" />
            <stop offset="70%" stopColor="#C9BDAA" />
            <stop offset="100%" stopColor="#6C604F" />
          </linearGradient>

          {/* Antique Brass Hardware */}
          <linearGradient id="brassSnap" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#7D5C14" />
          </linearGradient>

          {/* Tote Body Clip Path */}
          <clipPath id="toteBodyClip">
            <path d="M 85 170 L 335 170 C 335 170, 325 435, 318 448 C 312 458, 298 460, 280 460 L 140 460 C 122 460, 108 458, 102 448 C 95 435, 85 170, 85 170 Z" />
          </clipPath>
        </defs>

        {/* 1. Woven Webbing Shoulder Handles (Back Loops) */}
        <g id="handlesBack">
          <path
            d="M 145 175 C 140 25, 275 25, 270 175"
            stroke="url(#webbingGrad)"
            strokeWidth="18"
            strokeLinecap="round"
            className="filter drop-shadow-md"
          />
          {/* Handle longitudinal weave grooves */}
          <path
            d="M 145 175 C 140 25, 275 25, 270 175"
            stroke="rgba(0,0,0,0.2)"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            fill="none"
          />
        </g>

        {/* 2. Main Canvas Body Container with Clip Path */}
        <g clipPath="url(#toteBodyClip)">
          {/* Base Fabric Color */}
          <path
            d="M 85 170 L 335 170 C 335 170, 325 435, 318 448 C 312 458, 298 460, 280 460 L 140 460 C 122 460, 108 458, 102 448 C 95 435, 85 170, 85 170 Z"
            fill={customization.productColor}
          />

          {/* Heavy 16oz Canvas Weave Grid */}
          <rect x="70" y="150" width="280" height="320" fill="url(#canvasWeave)" opacity="0.8" />

          {/* 3D Natural Fabric Lighting & Folds */}
          <rect x="70" y="150" width="280" height="320" fill="url(#toteLighting)" />

          {/* Bottom Gusset Weight Shadow */}
          <rect x="70" y="150" width="280" height="320" fill="url(#gussetShadow)" />

          {/* Top Rolled Hem Border */}
          <rect x="80" y="170" width="260" height="22" fill="rgba(0,0,0,0.06)" />
          <line x1="85" y1="192" x2="335" y2="192" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" strokeDasharray="4 2" />

          {/* Subtle Fabric Creases */}
          <path
            d="M 110 210 Q 140 320 120 440"
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="3"
            fill="none"
            className="filter blur-xs"
          />
          <path
            d="M 310 210 Q 280 320 300 440"
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="3"
            fill="none"
            className="filter blur-xs"
          />
        </g>

        {/* 3. Handle Reinforcements: Box "X" Stitching on Front */}
        <g id="handleStitches">
          {/* Left Handle Anchor */}
          <rect x="135" y="172" width="20" height="34" rx="2" fill="url(#webbingGrad)" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
          <rect x="137" y="174" width="16" height="30" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeDasharray="3 2" />
          <line x1="137" y1="174" x2="153" y2="204" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeDasharray="3 2" />
          <line x1="153" y1="174" x2="137" y2="204" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeDasharray="3 2" />

          {/* Right Handle Anchor */}
          <rect x="265" y="172" width="20" height="34" rx="2" fill="url(#webbingGrad)" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
          <rect x="267" y="174" width="16" height="30" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeDasharray="3 2" />
          <line x1="267" y1="174" x2="283" y2="204" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeDasharray="3 2" />
          <line x1="283" y1="174" x2="267" y2="204" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeDasharray="3 2" />

          {/* Center Antique Brass Magnetic Snap Button */}
          <circle cx="210" cy="180" r="4.5" fill="url(#brassSnap)" stroke="#4A3408" strokeWidth="0.8" />
        </g>
      </svg>

      {/* Personalized Center Monogram / Screenprint Artwork (ONLY if text exists) */}
      {Boolean(customization.customText?.trim() || customization.secondaryText?.trim()) && (
        <div
          className="pointer-events-none absolute z-20 flex max-w-[240px] flex-col items-center justify-center text-center transition-all"
          style={{
            top: '56%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="flex flex-col items-center justify-center px-3">
            {customization.customText?.trim() && (
              <span
                className={`block leading-tight font-semibold tracking-wide ${getFontSizeClass()}`}
                style={{
                  fontFamily: currentFont.family,
                  color: customization.textColor,
                  textShadow: isMetallic
                    ? '0 0.5px 1px rgba(255,255,255,0.8), 0 1px 3px rgba(0,0,0,0.4)'
                    : '0 1px 2px rgba(0,0,0,0.3)',
                  filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.25))',
                }}
              >
                {customization.customText}
              </span>
            )}

            {customization.secondaryText?.trim() && (
              <span
                className="mt-1.5 block text-xs tracking-widest uppercase opacity-90"
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
        16oz Organic Heavyweight Canvas • Cross-Box Reinforced Handles
      </div>
    </div>
  );
};
