import React, { useState, useRef } from 'react';
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
  ArrowRight,
  ImagePlus,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight as ArrowRightIcon
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
  
  // Nuevos estados para control de posición e imagen
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    setCustomText('Mario Alberto');
    setSelectedColor(COLOR_SWATCHES[0]);
    setSelectedFont(FONT_OPTIONS[0]);
    setPositionX(0);
    setPositionY(0);
    setUploadedImage(null);
  };

  // Manejo de carga de imagen
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Funciones de movimiento
  const moveText = (direction: 'up' | 'down' | 'left' | 'right') => {
    const step = 10;
    if (direction === 'up') setPositionY(prev => prev - step);
    if (direction === 'down') setPositionY(prev => prev + step);
    if (direction === 'left') setPositionX(prev => prev - step);
    if (direction === 'right') setPositionX(prev => prev + step);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-10 w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-rose-100/60 mb-8">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-rose-100 text-[#b90538] font-bold text-xs">
            01
          </span>
          <div>
            <p className="text-xs uppercase tracking-wider text-stone-500 font-semibold font-sans">
              Taller a Medida • Alta Definición
            </p>
            <h1 className="font-serif-luxury text-2xl sm:text-3xl text-stone-900 font-normal">
              Estudio de Personalización en Vivo
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-stone-100 px-4 py-2 rounded-full shadow-xs">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#b90538] animate-pulse" />
            <span className="text-xs text-stone-800 font-semibold font-sans">
              Atelier Live Engine: Calibrado
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* IZQUIERDA: Lienzo Interactivo */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative w-full rounded-3xl bg-white shadow-xl border border-rose-100/80 p-6 sm:p-10 overflow-hidden flex flex-col items-center justify-center min-h-[520px] sm:min-h-[580px]">
            <div className="absolute w-96 h-96 rounded-full bg-pink-100/40 blur-3xl pointer-events-none -top-12 -left-12" />
            <div className="absolute w-80 h-80 rounded-full bg-rose-100/30 blur-3xl pointer-events-none -bottom-10 -right-10" />
            
            <div className="absolute top-5 left-6 right-6 flex items-center justify-between z-20">
              <span className="px-3.5 py-1.5 rounded-full bg-stone-50 text-stone-700 text-xs font-semibold tracking-wide shadow-xs border border-stone-200/60">
                {selectedProduct.name}
              </span>
              <div className="flex items-center gap-1.5 bg-stone-50/90 backdrop-blur-md px-2 py-1 rounded-full shadow-xs border border-stone-200/50">
                <button onClick={handleZoomOut} className="w-7 h-7 rounded-full flex items-center justify-center text-stone-600 hover:text-[#b90538] hover:bg-white transition-all"><ZoomOut className="w-3.5 h-3.5" /></button>
                <span className="text-xs text-stone-800 px-1 font-bold">{Math.round(zoomScale * 100)}%</span>
                <button onClick={handleZoomIn} className="w-7 h-7 rounded-full flex items-center justify-center text-stone-600 hover:text-[#b90538] hover:bg-white transition-all"><ZoomIn className="w-3.5 h-3.5" /></button>
              </div>
            </div>

            {/* Viewport del Mockup */}
            <div
              className="relative w-full max-w-md aspect-square flex items-center justify-center select-none transition-transform duration-300 ease-out"
              style={{ transform: `scale(${zoomScale})` }}
            >
              <img
                src={selectedProduct.mockupImage || selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-contain filter drop-shadow-2xl transition-all duration-500"
              />
              
              {/* Contenedor Movible para Texto e Imagen */}
              <motion.div
                className={`absolute flex flex-col items-center justify-center text-center px-4 max-w-[80%] z-10 cursor-move ${selectedProduct.textPositionClass || 'top-[44%]'}`}
                style={{ 
                  transform: `translate(calc(-50% + ${positionX}px), calc(-50% + ${positionY}px))`,
                  left: '50%'
                }}
              >
                {/* Imagen Adjunta */}
                {uploadedImage && (
                  <div className="mb-3 relative group">
                    <img src={uploadedImage} alt="Custom Graphic" className="max-w-[120px] max-h-[120px] object-contain rounded-md drop-shadow-md" />
                    <button onClick={() => setUploadedImage(null)} className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {/* Texto */}
                <span
                  className="text-lg sm:text-3xl font-bold tracking-tight transition-all duration-200 drop-shadow-sm break-words"
                  style={{ color: selectedColor.hex, fontFamily: selectedFont.fontFamily, fontStyle: selectedFont.isItalic ? 'italic' : 'normal' }}
                >
                  {customText.trim() ? customText : 'Mario Alberto'}
                </span>
                <div className="mt-2 flex items-center gap-1.5 opacity-80" style={{ color: selectedColor.hex }}>
                  <span className="inline-block w-6 h-0.5 rounded-full bg-current opacity-60" />
                  <span className="text-[10px] uppercase tracking-widest font-semibold font-sans">YA&FE ATELIER</span>
                  <span className="inline-block w-6 h-0.5 rounded-full bg-current opacity-60" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* DERECHA: Panel de Personalización */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-100/80 flex flex-col gap-6">
            
            {/* PASO 1: Producto */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#b90538] text-white text-xs flex items-center justify-center font-bold">1</span>
                <label className="text-sm font-bold text-stone-900">Selecciona tu pieza de recuerdo</label>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {PRODUCTS.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => onSelectProduct(prod)}
                    className={`p-3 rounded-2xl text-left transition-all flex items-center gap-2.5 ${selectedProduct.id === prod.id ? 'bg-rose-50 border-2 border-[#b90538] shadow-xs' : 'bg-stone-50 hover:bg-stone-100 border border-stone-200/60'}`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shrink-0 border border-stone-200/40">
                      <Sparkles className={`w-4 h-4 ${selectedProduct.id === prod.id ? 'text-[#b90538]' : 'text-stone-500'}`} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-stone-900 truncate">{prod.name.split(' ')[0]} {prod.name.split(' ')[1]}</span>
                      <span className={`text-xs font-semibold ${selectedProduct.id === prod.id ? 'text-[#b90538]' : 'text-stone-500'}`}>${prod.price.toFixed(2)}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* PASO 2: Texto y Posicionamiento */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#b90538] text-white text-xs flex items-center justify-center font-bold">2</span>
                  <label className="text-sm font-bold text-stone-900">Nombres, monograma o dedicatoria</label>
                </div>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  maxLength={40}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Ej. Mario Alberto"
                  className="w-full px-4 py-3 rounded-2xl bg-stone-50 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#b90538]/40 border border-stone-200 transition-all shadow-inner"
                />
              </div>

              {/* Controles de Posición */}
              <div className="flex items-center justify-between bg-stone-50 p-3 rounded-xl border border-stone-200 mt-1">
                <span className="text-xs font-bold text-stone-700">Ajustar Posición:</span>
                <div className="flex items-center gap-1">
                  <button onClick={() => moveText('left')} className="p-1.5 bg-white shadow-sm border border-stone-200 rounded-md hover:bg-stone-100 text-stone-600"><ArrowLeft className="w-4 h-4"/></button>
                  <div className="flex flex-col gap-1">
                    <button onClick={() => moveText('up')} className="p-1.5 bg-white shadow-sm border border-stone-200 rounded-md hover:bg-stone-100 text-stone-600"><ArrowUp className="w-4 h-4"/></button>
                    <button onClick={() => moveText('down')} className="p-1.5 bg-white shadow-sm border border-stone-200 rounded-md hover:bg-stone-100 text-stone-600"><ArrowDown className="w-4 h-4"/></button>
                  </div>
                  <button onClick={() => moveText('right')} className="p-1.5 bg-white shadow-sm border border-stone-200 rounded-md hover:bg-stone-100 text-stone-600"><ArrowRightIcon className="w-4 h-4"/></button>
                </div>
              </div>
            </div>

            {/* PASO 3: Subir Imagen (NUEVO) */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#b90538] text-white text-xs flex items-center justify-center font-bold">3</span>
                <label className="text-sm font-bold text-stone-900">Adjuntar Gráfico o Logo (Opcional)</label>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 py-2.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl text-sm font-semibold text-stone-700 flex items-center justify-center gap-2 transition-colors"
                >
                  <ImagePlus className="w-4 h-4 text-[#b90538]" /> Subir Imagen (PNG/JPG)
                </button>
                {uploadedImage && (
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4"/> Cargada
                  </span>
                )}
              </div>
            </div>

            {/* PASO 4: Colores Extendidos */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#b90538] text-white text-xs flex items-center justify-center font-bold">4</span>
                  <label className="text-sm font-bold text-stone-900">Bordado y tono de aluminio</label>
                </div>
                <span className="text-xs font-bold text-[#b90538]">{selectedColor.name}</span>
              </div>
              
              <div className="grid grid-cols-6 gap-2 p-3 bg-stone-50 rounded-2xl border border-stone-200/50">
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
                        className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-all ${isActive ? 'scale-110 ring-2 ring-[#b90538] ring-offset-1' : 'hover:scale-105'}`}
                        style={{ background: swatch.gradient }}
                      >
                        {isActive && <Check className="w-3.5 h-3.5 text-white drop-shadow-sm mix-blend-difference" />}
                      </span>
                      <span className={`text-[9px] font-semibold transition-colors truncate w-full text-center ${isActive ? 'text-[#b90538]' : 'text-stone-500'}`}>
                        {swatch.shortLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PASO 5: Tipografía */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#b90538] text-white text-xs flex items-center justify-center font-bold">5</span>
                  <label className="text-sm font-bold text-stone-900">Estilo tipográfico</label>
                </div>
                <span className="text-xs font-bold text-[#b90538]">{selectedFont.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {FONT_OPTIONS.map((fOption) => {
                  const isActive = selectedFont.name === fOption.name;
                  return (
                    <button
                      key={fOption.name}
                      onClick={() => setSelectedFont(fOption)}
                      className={`p-3 rounded-2xl text-left transition-all flex flex-col items-start gap-0.5 ${isActive ? 'bg-rose-50 text-[#b90538] border-2 border-[#b90538] shadow-xs' : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200/50'}`}
                    >
                      <span className={`text-base leading-tight ${fOption.fontClass || ''}`} style={{ fontFamily: fOption.fontFamily }}>{fOption.displayName}</span>
                      <span className="text-[11px] opacity-80 font-sans">{fOption.subLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#b90538] via-[#dc2c4f] to-[#a43073] text-white font-bold text-base shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 mt-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>Finalizar y Ordenar (${totalPrice.toFixed(2)})</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
