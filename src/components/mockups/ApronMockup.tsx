import React from 'react';
import { ProductCustomization } from '../../types';
import { FONT_OPTIONS } from '../../data/fonts';

interface ApronMockupProps {
  customization: ProductCustomization;
  isZoomed?: boolean;
}

export const ApronMockup: React.FC<ApronMockupProps> = ({ customization, isZoomed = false }) => {
  const currentFont = FONT_OPTIONS.find((f) => f.id === customization.fontId) || FONT_OPTIONS[0];

  const getPositionClasses = () => {
    switch (customization.textPlacement) {
      case 'pocket':
        return 'top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2';
      case 'center':
        return 'top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2';
      case 'chest':
      default:
        return 'top-[33%] left-1/2 -translate-x-1/2 -translate-y-1/2';
    }
  };

  const getFontSizeRem = () => {
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

  const isMetallic =
    customization.textColor === '#D4AF37' || customization.textColor === '#B76E79';

  return (
    <div
      className={`relative mx-auto flex items-center justify-center transition-all duration-300 select-none ${
        isZoomed ? 'scale-110' : 'scale-100'
      }`}
      style={{ width: '100%', maxWidth: '450px', height: '530px' }}
    >
      {/* Contact Drop Shadow */}
      <div className="absolute inset-x-8 bottom-4 h-9 rounded-full bg-stone-900/20 blur-xl" />

      {/* Photorealistic SVG Apron Structure */}
      <svg
        viewBox="0 0 420 500"
        className="relative h-full w-full drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Micro Linen Slub Texture Pattern */}
          <pattern id="slubLinen" width="6" height="6" patternUnits="userSpaceOnUse">
            <path d="M 0 3 L 6 3 M 3 0 L 3 6" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" />
            <path d="M 1 1 L 5 5" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
          </pattern>

          {/* Deep Natural Fabric Folds Shading */}
          <linearGradient id="fabricFolds" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.32" />
            <stop offset="15%" stopColor="#ffffff" stopOpacity="0.16" />
            <stop offset="35%" stopColor="#ffffff" stopOpacity="0.04" />
            <stop offset="50%" stopColor="#000000" stopOpacity="0.06" />
            <stop offset="70%" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="85%" stopColor="#000000" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.36" />
          </linearGradient>

          {/* Vertical Drape Shadows */}
          <linearGradient id="verticalDrape" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.1" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="75%" stopColor="#000000" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
          </linearGradient>

          {/* Leather Neck Strap Realism */}
          <linearGradient id="saddleLeather" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4A3323" />
            <stop offset="30%" stopColor="#7E5638" />
            <stop offset="70%" stopColor="#9C6B46" />
            <stop offset="100%" stopColor="#3E2A1C" />
          </linearGradient>

          {/* Antique Brass Hardware */}
          <linearGradient id="antiqueBrass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="40%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#AA8222" />
            <stop offset="100%" stopColor="#5E430B" />
          </linearGradient>

          {/* Apron Silhouette Path Clip */}
          <clipPath id="realisticApronClip">
            <path d="M 145 75 C 145 75, 175 73, 210 73 C 245 73, 275 75, 275 75 L 285 155 C 290 195, 345 200, 350 250 L 350 455 C 350 468, 338 476, 324 476 L 96 476 C 82 476, 70 468, 70 455 L 70 250 C 75 200, 130 195, 135 155 Z" />
          </clipPath>
        </defs>

        {/* 1. Leather Neck Strap with Buckle & Prong */}
        <g id="neckStrap">
          {/* Main Leather Arch */}
          <path
            d="M 158 80 C 152 10, 268 10, 262 80"
            stroke="url(#saddleLeather)"
            strokeWidth="12"
            strokeLinecap="round"
            className="filter drop-shadow-md"
          />
          {/* Stitching lines on leather strap */}
          <path
            d="M 158 80 C 152 10, 268 10, 262 80"
            stroke="rgba(255,235,200,0.5)"
            strokeWidth="1.2"
            strokeDasharray="3 2"
            fill="none"
          />
          {/* Antique brass roller buckle */}
          <rect x="151" y="68" width="16" height="12" rx="3" fill="url(#antiqueBrass)" stroke="#4A3408" strokeWidth="0.8" />
          <line x1="159" y1="68" x2="159" y2="80" stroke="#3E2A06" strokeWidth="2" />
          {/* Strap brass eyelet holes */}
          <circle cx="210" cy="24" r="1.8" fill="#3E2A1C" />
          <circle cx="225" cy="28" r="1.8" fill="#3E2A1C" />
          <circle cx="240" cy="38" r="1.8" fill="#3E2A1C" />
          {/* Strap rivets to apron */}
          <circle cx="159" cy="84" r="3.2" fill="url(#antiqueBrass)" stroke="#4A3408" strokeWidth="0.8" />
          <circle cx="261" cy="84" r="3.2" fill="url(#antiqueBrass)" stroke="#4A3408" strokeWidth="0.8" />
        </g>

        {/* 2. Side Waist Tie Straps with Natural Drape */}
        <g id="waistTies">
          {/* Left Tie Draped */}
          <path
            d="M 72 250 C 48 265, 30 310, 18 360 C 12 390, 32 400, 44 375 C 54 350, 66 300, 76 265"
            fill="url(#saddleLeather)"
            opacity="0.9"
            className="filter drop-shadow-sm"
          />
          {/* Right Tie Draped */}
          <path
            d="M 348 250 C 372 265, 390 310, 402 360 C 408 390, 388 400, 376 375 C 366 350, 354 300, 344 265"
            fill="url(#saddleLeather)"
            opacity="0.9"
            className="filter drop-shadow-sm"
          />
        </g>

        {/* 3. Main Apron Linen Body with Depth & Folds */}
        <g clipPath="url(#realisticApronClip)">
          {/* Solid Linen Base Color */}
          <path
            d="M 145 75 C 145 75, 175 73, 210 73 C 245 73, 275 75, 275 75 L 285 155 C 290 195, 345 200, 350 250 L 350 455 C 350 468, 338 476, 324 476 L 96 476 C 82 476, 70 468, 70 455 L 70 250 C 75 200, 130 195, 135 155 Z"
            fill={customization.productColor}
          />

          {/* Real European Slub Weave Texture */}
          <rect x="60" y="60" width="300" height="430" fill="url(#slubLinen)" opacity="0.85" />

          {/* Natural Horizontal Drapery Shading & Wrinkles */}
          <rect x="60" y="60" width="300" height="430" fill="url(#fabricFolds)" />

          {/* Vertical Gravity Shading */}
          <rect x="60" y="60" width="300" height="430" fill="url(#verticalDrape)" />

          {/* Tailored Dual-Needle Topstitching around perimeter */}
          <path
            d="M 148 78 L 272 78 L 282 155 C 286 193, 341 198, 345 248 L 345 450 C 345 460, 336 468, 324 468 L 96 468 C 84 468, 75 460, 75 450 L 75 248 C 79 198, 134 193, 138 155 Z"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="1.2"
            strokeDasharray="3.5 2.5"
            fill="none"
          />
        </g>

        {/* 4. Kangaroo Front Pocket Assembly with 3D Depth */}
        <g id="kangarooPocket">
          {/* Pocket Drop Shadow onto Apron Skirt */}
          <path
            d="M 112 305 L 308 305 C 312 305, 315 308, 314 312 L 308 426 C 308 432, 302 438, 296 438 L 124 438 C 118 438, 112 432, 112 426 L 106 312 C 105 308, 108 305, 112 305 Z"
            fill="rgba(0,0,0,0.18)"
            className="filter blur-xs translate-y-1"
          />

          {/* Pocket Base Color */}
          <path
            d="M 112 305 L 308 305 C 312 305, 315 308, 314 312 L 308 426 C 308 432, 302 438, 296 438 L 124 438 C 118 438, 112 432, 112 426 L 106 312 C 105 308, 108 305, 112 305 Z"
            fill={customization.productColor}
          />
          {/* Pocket Slub Texture */}
          <path
            d="M 112 305 L 308 305 C 312 305, 315 308, 314 312 L 308 426 C 308 432, 302 438, 296 438 L 124 438 C 118 438, 112 432, 112 426 L 106 312 C 105 308, 108 305, 112 305 Z"
            fill="url(#slubLinen)"
            opacity="0.85"
          />
          {/* Pocket 3D Fold Shading */}
          <path
            d="M 112 305 L 308 305 C 312 305, 315 308, 314 312 L 308 426 C 308 432, 302 438, 296 438 L 124 438 C 118 438, 112 432, 112 426 L 106 312 C 105 308, 108 305, 112 305 Z"
            fill="url(#fabricFolds)"
            opacity="0.9"
          />

          {/* Pocket Top Double-Fold Hem */}
          <path d="M 110 305 L 310 305" stroke="rgba(0,0,0,0.35)" strokeWidth="4" />
          <path d="M 111 310 L 309 310" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeDasharray="3 2" />

          {/* Kangaroo Center Dividing Seam */}
          <line x1="210" y1="308" x2="210" y2="436" stroke="rgba(0,0,0,0.3)" strokeWidth="2.5" />
          <line x1="210" y1="308" x2="210" y2="436" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 2" />

          {/* Antique Brass Stress-Point Corner Rivets */}
          <circle cx="113" cy="312" r="3" fill="url(#antiqueBrass)" stroke="#4A3408" strokeWidth="0.6" />
          <circle cx="307" cy="312" r="3" fill="url(#antiqueBrass)" stroke="#4A3408" strokeWidth="0.6" />
          <circle cx="210" cy="312" r="3" fill="url(#antiqueBrass)" stroke="#4A3408" strokeWidth="0.6" />

          {/* Barista Utility Cloth Hanging Loop */}
          <path
            d="M 314 340 C 330 340, 330 375, 314 375"
            stroke="url(#saddleLeather)"
            strokeWidth="7"
            strokeLinecap="round"
          />
        </g>
      </svg>

      {/* Photorealistic Embroidered Inscription directly on the Apron (ONLY if text exists) */}
      {Boolean(customization.customText?.trim() || customization.secondaryText?.trim()) && (
        <div
          className={`pointer-events-none absolute z-20 flex max-w-[250px] flex-col items-center justify-center text-center transition-all duration-300 ${getPositionClasses()}`}
        >
          <div
            className="relative px-3 py-1 font-semibold tracking-wide transition-all"
            style={{
              fontFamily: currentFont.family,
              color: customization.textColor,
              textShadow: isMetallic
                ? '0 0.5px 1px rgba(255,255,255,0.9), 0 1px 3px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)'
                : '0 1px 2px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.2)',
              filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.35))',
            }}
          >
            {/* Main Name / Atelier Text */}
            {customization.customText?.trim() && (
              <span className={`block leading-tight ${getFontSizeRem()}`}>
                {customization.customText}
              </span>
            )}

            {/* Secondary Subtitle Line */}
            {customization.secondaryText?.trim() && (
              <span
                className="mt-1 block text-xs tracking-widest uppercase opacity-90 sm:text-sm"
                style={{
                  fontFamily:
                    currentFont.category === 'script' ? "'Montserrat', sans-serif" : currentFont.family,
                  fontSize: '0.74rem',
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
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-stone-200/90 bg-white/95 px-3.5 py-1 text-[11px] font-medium text-stone-600 shadow-sm backdrop-blur-sm">
        100% European Stonewashed Flax Linen • Precision Embroidery
      </div>
    </div>
  );
};
