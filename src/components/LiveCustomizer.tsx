import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Product, ColorSwatch, FontOption } from '../types';
import { PRODUCTS, COLOR_SWATCHES, FONT_OPTIONS } from '../data/products';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  Check,
  X,
  ShieldCheck,
  Gift,
  Palette,
  Heart,
  Truck,
  Lock,
  ArrowRight
} from 'lucide-react';

interface LiveCustomizerProps {
  selectedProduct: Product;
  onSelectProduct: (p: Product) => void;
  customText: string;
  setCustomText: (text: string) => void;
  selectedColor: ColorSwatch;
  setSelectedColor: (c: ColorSwatch) => void;
  selectedFont: FontOption;
  setSelectedFont: (f: FontOption) => void;
  onProceedToCheckout: () => void;
}

export default function LiveCustomizer({
  selectedProduct,
  onSelectProduct,
  customText,
  setCustomText,
  selectedColor,
  setSelectedColor,
  selectedFont,
  setSelectedFont,
  onProceedToCheckout
}: LiveCustomizerProps) {
  const [zoomScale, setZoomScale] = useState(1);

  // Pricing calculation
  const customizationFee = 5.0;
  const signatureRibbonFee = 3.0;
  const totalPrice = selectedProduct.price + customizationFee + signatureRibbonFee;

  const handleZoomIn = () => {
    if (zoomScale < 1.35) setZoomScale((prev) => Math.min(prev + 0.15, 1.35));
  };

  const handleZoomOut = () => {
    if (zoomScale > 0.85) setZoomScale((prev) => Math.max(prev - 0.15, 0.85));
  };

  const handleReset = () => {
    setZoomScale(1);
    setCustomText('Mama & Sofia Est. 2024');
    setSelectedColor(COLOR_SWATCHES[0]);
    setSelectedFont(FONT_OPTIONS[0]);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-10 w-full">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-rose-100/60 mb-8">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-rose-100 text-[#b90538] font-bold text-xs">
            01
          </span>
          <div>
            <p className="text-xs uppercase tracking-wider text-stone-500 font-semibold font-sans">
              Bespoke Atelier • Haute Finition
            </p>
            <h1 className="font-serif-luxury text-2xl sm:text-3xl text-stone-900 font-normal">
              Live Customizer Studio
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-stone-100 px-4 py-2 rounded-full shadow-xs">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#b90538] animate-pulse" />
            <span className="text-xs text-stone-800 font-semibold font-sans">
              Atelier Live Engine: Calibrated
            </span>
          </div>

          <button
            onClick={handleReset}
            className="p-2 text-stone-500 hover:text-[#b90538] rounded-full hover:bg-stone-100 transition-colors"
            title="Reset Preview"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 7 / 5 Desktop Grid Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Live Interactive Preview Stage (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative w-full rounded-3xl bg-white shadow-xl border border-rose-100/80 p-6 sm:p-10 overflow-hidden flex flex-col items-center justify-center min-h-[520px] sm:min-h-[580px]">
            {/* Ambient Aura Glow behind Mockup */}
            <div className="absolute w-96 h-96 rounded-full bg-pink-100/40 blur-3xl pointer-events-none -top-12 -left-12" />
            <div className="absolute w-80 h-80 rounded-full bg-rose-100/30 blur-3xl pointer-events-none -bottom-10 -right-10" />

            {/* Stage Toolbar */}
            <div className="absolute top-5 left-6 right-6 flex items-center justify-between z-20">
              <span className="px-3.5 py-1.5 rounded-full bg-stone-50 text-stone-700 text-xs font-semibold tracking-wide shadow-xs border border-stone-200/60">
                {selectedProduct.name}
              </span>

              {/* Zoom Controls */}
              <div className="flex items-center gap-1.5 bg-stone-50/90 backdrop-blur-md px-2 py-1 rounded-full shadow-xs border border-stone-200/50">
                <button
                  onClick={handleZoomOut}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-stone-600 hover:text-[#b90538] hover:bg-white transition-all"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs text-stone-800 px-1 font-bold">
                  {Math.round(zoomScale * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-stone-600 hover:text-[#b90538] hover:bg-white transition-all"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Product Mockup Viewport */}
            <div
              className="relative w-full max-w-md aspect-square flex items-center justify-center select-none transition-transform duration-300 ease-out"
              style={{ transform: `scale(${zoomScale})` }}
            >
              {/* High-res base product image */}
              <img
                src={selectedProduct.mockupImage || selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-contain filter drop-shadow-2xl transition-all duration-500"
              />

              {/* Dynamic Text Overlay: Real-time Embroidery & Foil Stamping Simulation */}
              <motion.div
                key={`${selectedProduct.id}-${selectedFont.name}`}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                className={`absolute flex flex-col items-center justify-center text-center px-4 max-w-[70%] pointer-events-none z-10 ${
                  selectedProduct.textPositionClass || 'top-[44%]'
                } left-1/2 -translate-x-1/2 -translate-y-1/2`}
              >
                <span
                  className="text-lg sm:text-2xl font-bold tracking-tight transition-all duration-200 drop-shadow-sm select-none break-words"
                  style={{
                    color: selectedColor.hex,
                    fontFamily: selectedFont.fontFamily,
                    fontStyle: selectedFont.isItalic ? 'italic' : 'normal'
                  }}
                >
                  {customText.trim() ? customText : 'Your Custom Text Here'}
                </span>

                {/* Sub-ribbon atelier signature hallmark */}
                <div
                  className="mt-2 flex items-center gap-1.5 opacity-80 transition-opacity"
                  style={{ color: selectedColor.hex }}
                >
                  <span className="inline-block w-3.5 h-0.5 rounded-full bg-current opacity-40" />
                  <span className="text-[10px] uppercase tracking-widest font-semibold font-sans">
                    Ya&amp;Fe Atelier
                  </span>
                  <span className="inline-block w-3.5 h-0.5 rounded-full bg-current opacity-40" />
                </div>
              </motion.div>

              {/* Subtle Foil Reflection Sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none opacity-50 mix-blend-overlay" />
            </div>

            {/* Finish Status Tag Footer */}
            <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between z-20">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold hidden sm:inline">
                  Thread Tone:
                </span>
                <span className="px-3 py-1 rounded-full bg-rose-100 text-[#b90538] text-xs font-bold shadow-xs">
                  {selectedColor.name}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-stone-600 text-xs font-medium">
                <ShieldCheck className="w-4 h-4 text-[#b90538]" />
                <span>Fine Atelier 12,000 Silk Stitches</span>
              </div>
            </div>
          </div>

          {/* Craftsmanship Highlights Triplet */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200/50 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center text-[#b90538] shrink-0">
                <Palette className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900">Color-Fast Threads</p>
                <p className="text-[11px] text-stone-500">Pure vegetable silk dye &amp; gold foil</p>
              </div>
            </div>

            <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200/50 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-pink-100 flex items-center justify-center text-[#a43073] shrink-0">
                <Gift className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900">Signature Box</p>
                <p className="text-[11px] text-stone-500">Wax seal stamp &amp; satin ribbon</p>
              </div>
            </div>

            <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200/50 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900">Calligraphy Dedication</p>
                <p className="text-[11px] text-stone-500">Personal message card included</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Interactive Personalization Panel (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-100/80 flex flex-col gap-6">
            {/* STEP 1: Product Selector */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#b90538] text-white text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  <label className="text-sm font-bold text-stone-900">
                    Select Your Keepsake Piece
                  </label>
                </div>
                <span className="text-xs text-stone-500 font-medium">Step 1 of 4</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {PRODUCTS.map((prod) => {
                  const isSelected = selectedProduct.id === prod.id;
                  return (
                    <button
                      key={prod.id}
                      onClick={() => onSelectProduct(prod)}
                      className={`p-3 rounded-2xl text-left transition-all flex items-center gap-2.5 ${
                        isSelected
                          ? 'bg-rose-50 border-2 border-[#b90538] shadow-xs'
                          : 'bg-stone-50 hover:bg-stone-100 border border-stone-200/60'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shrink-0 border border-stone-200/40">
                        <Sparkles
                          className={`w-4 h-4 ${
                            isSelected ? 'text-[#b90538]' : 'text-stone-500'
                          }`}
                        />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-stone-900 truncate">
                          {prod.name.split(' ')[0]} {prod.name.split(' ')[1]}
                        </span>
                        <span
                          className={`text-xs font-semibold ${
                            isSelected ? 'text-[#b90538]' : 'text-stone-500'
                          }`}
                        >
                          ${prod.price.toFixed(2)}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: Custom Text Input */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#b90538] text-white text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  <label htmlFor="custom-text-field" className="text-sm font-bold text-stone-900">
                    Names, Monogram or Dedication
                  </label>
                </div>
                <span className="text-xs text-stone-500 font-medium">
                  {customText.length} / 36 chars
                </span>
              </div>

              <div className="relative">
                <input
                  id="custom-text-field"
                  type="text"
                  maxLength={36}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="e.g. Mama & Sofia Est. 2024"
                  className="w-full px-4 py-3 rounded-2xl bg-stone-50 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#b90538]/40 border border-stone-200 transition-all shadow-inner"
                />

                {customText.length > 0 && (
                  <button
                    onClick={() => setCustomText('')}
                    title="Clear text"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#b90538] transition-colors p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <p className="text-[11px] text-stone-500 flex items-center gap-1 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#b90538]" />
                <span>Real-time typography updates immediately on canvas.</span>
              </p>
            </div>

            {/* STEP 3: Luxury Color Swatches */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#b90538] text-white text-xs flex items-center justify-center font-bold">
                    3
                  </span>
                  <label className="text-sm font-bold text-stone-900">
                    Embroidery &amp; Foil Tone
                  </label>
                </div>
                <span className="text-xs font-bold text-[#b90538]">
                  {selectedColor.name}
                </span>
              </div>

              <div className="flex items-center justify-between gap-1 p-2 bg-stone-50 rounded-2xl border border-stone-200/50">
                {COLOR_SWATCHES.map((swatch) => {
                  const isActive = selectedColor.name === swatch.name;
                  return (
                    <button
                      key={swatch.name}
                      onClick={() => setSelectedColor(swatch)}
                      className="group relative flex flex-col items-center gap-1 p-1 focus:outline-none"
                      title={swatch.name}
                    >
                      <span
                        className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-all ${
                          isActive
                            ? 'scale-110 ring-2 ring-[#b90538] ring-offset-2'
                            : 'hover:scale-105'
                        }`}
                        style={{ background: swatch.gradient }}
                      >
                        {isActive && <Check className="w-3.5 h-3.5 text-white drop-shadow-sm" />}
                      </span>
                      <span
                        className={`text-[10px] font-semibold transition-colors ${
                          isActive ? 'text-[#b90538]' : 'text-stone-500'
                        }`}
                      >
                        {swatch.shortLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 4: Typography Styles */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#b90538] text-white text-xs flex items-center justify-center font-bold">
                    4
                  </span>
                  <label className="text-sm font-bold text-stone-900">
                    Typography Style
                  </label>
                </div>
                <span className="text-xs font-bold text-[#b90538]">
                  {selectedFont.name}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {FONT_OPTIONS.map((fOption) => {
                  const isActive = selectedFont.name === fOption.name;
                  return (
                    <button
                      key={fOption.name}
                      onClick={() => setSelectedFont(fOption)}
                      className={`p-3 rounded-2xl text-left transition-all flex flex-col items-start gap-0.5 ${
                        isActive
                          ? 'bg-rose-50 text-[#b90538] border-2 border-[#b90538] shadow-xs'
                          : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200/50'
                      }`}
                    >
                      <span
                        className={`text-base leading-tight ${fOption.fontClass || ''}`}
                        style={{ fontFamily: fOption.fontFamily }}
                      >
                        {fOption.displayName}
                      </span>
                      <span className="text-[11px] opacity-80 font-sans">
                        {fOption.subLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/50 flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-stone-600 text-xs sm:text-sm">
                <span>Base Piece ({selectedProduct.name.split(' ')[0]})</span>
                <span className="font-semibold text-stone-900">
                  ${selectedProduct.price.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between text-stone-600 text-xs sm:text-sm">
                <span>Custom Embroidery &amp; Monogramming</span>
                <span className="font-semibold text-stone-900">
                  ${customizationFee.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between text-stone-600 text-xs sm:text-sm">
                <span>Silk Ribbon &amp; Ya&amp;Fe Crimson Wax Seal</span>
                <span className="font-semibold text-stone-900">
                  ${signatureRibbonFee.toFixed(2)}
                </span>
              </div>

              <div className="pt-2 mt-1 border-t border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-base font-bold text-stone-900 block">Total Atelier</span>
                  <span className="text-[11px] text-stone-500">
                    Handcrafted box &amp; tax included
                  </span>
                </div>
                <span className="font-serif-luxury text-2xl font-bold text-[#b90538]">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Sticky Proceed to Checkout Button */}
            <button
              onClick={onProceedToCheckout}
              className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#b90538] via-[#dc2c4f] to-[#a43073] text-white font-bold text-base shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3"
            >
              <Sparkles className="w-5 h-5" />
              <span>Finalize &amp; Order (${totalPrice.toFixed(2)})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-4 text-stone-500 text-xs text-center font-medium">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#b90538]" /> Confection in Under 48h
              </span>
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-[#b90538]" /> Secure Atelier Order
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
