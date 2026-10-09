import React, { useState, useRef } from 'react';
import { Sparkles, Type, Palette, Image as ImageIcon, RotateCcw, Check, Upload, Trash2, ZoomIn, ZoomOut, ChevronDown, Sliders, AlignVerticalJustifyCenter, AlignHorizontalJustifyCenter, ArrowRight } from 'lucide-react';
import { Product, ProductCustomization } from '../types';
import { PRODUCTS, TUMBLER_TEXTURE_PRESETS } from '../data/products';
import { FONT_OPTIONS } from '../data/fonts';
import { ApronMockup } from './mockups/ApronMockup';
import { TumblerMockup } from './mockups/TumblerMockup';
import { ToteMockup } from './mockups/ToteMockup';
import { MugMockup } from './mockups/MugMockup';
import { ShirtMockup } from './mockups/ShirtMockup';

interface LiveCustomizerProps {
  selectedProductId: string;
  onSelectProduct: (productId: string) => void;
  onAddToCart: (product: Product, customization: ProductCustomization, quantity: number) => void;
}

export const LiveCustomizer: React.FC<LiveCustomizerProps> = ({ selectedProductId, onSelectProduct, onAddToCart }) => {
  const currentProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];
  const [customization, setCustomization] = useState<ProductCustomization>({ ...currentProduct.defaultCustomization });
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState<'text' | 'colors' | 'background' | 'placement'>('text');
  const [isFontDropdownOpen, setIsFontDropdownOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    setCustomization({ ...currentProduct.defaultCustomization });
    if (currentProduct.category === 'tumbler') setActiveTab('text');
  }, [currentProduct.id]);

  const currentFont = FONT_OPTIONS.find((f) => f.id === customization.fontId) || FONT_OPTIONS[0];

  const handleTextChange = (text: string) => setCustomization((prev) => ({ ...prev, customText: text }));
  const handleSecondaryTextChange = (text: string) => setCustomization((prev) => ({ ...prev, secondaryText: text }));
  const handleFontSelect = (fontId: string) => { setCustomization((prev) => ({ ...prev, fontId })); setIsFontDropdownOpen(false); };
  const handleProductColorSelect = (hex: string) => setCustomization((prev) => ({ ...prev, productColor: hex }));
  const handleTextColorSelect = (hex: string) => setCustomization((prev) => ({ ...prev, textColor: hex }));
  const handlePlacementChange = (placement: 'vertical' | 'horizontal' | 'chest' | 'pocket' | 'center') => setCustomization((prev) => ({ ...prev, textPlacement: placement }));
  const handleFontSizeChange = (size: number) => setCustomization((prev) => ({ ...prev, fontSize: size }));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setCustomization((prev) => ({ ...prev, backgroundImageUrl: uploadEvent.target?.result as string, selectedPatternId: 'custom' }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setCustomization((prev) => ({ ...prev, backgroundImageUrl: null, selectedPatternId: 'none' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePatternSelect = (patternId: string) => {
    setCustomization((prev) => ({ ...prev, selectedPatternId: patternId, backgroundImageUrl: null }));
  };

  const renderProductMockup = () => {
    switch (currentProduct.category) {
      case 'apron': return <ApronMockup customization={customization} isZoomed={isZoomed} />;
      case 'tumbler': return <TumblerMockup customization={customization} isZoomed={isZoomed} showLifestyleBackground={true} />;
      case 'tote': return <ToteMockup customization={customization} isZoomed={isZoomed} />;
      case 'mug': return <MugMockup customization={customization} isZoomed={isZoomed} />;
      case 'shirt': return <ShirtMockup customization={customization} isZoomed={isZoomed} />;
      default: return <TumblerMockup customization={customization} isZoomed={isZoomed} />;
    }
  };

  return (
    <section id="customizer" className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e8d5b5] bg-[#FBF7F2] px-3.5 py-1 text-xs font-semibold tracking-wider text-[#A66E53] uppercase">
          <Sparkles className="h-3.5 w-3.5" /> Estudio Interactivo
        </span>
        <h2 className="mt-3 font-serif text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl md:text-5xl">Diseña tu Pieza Única</h2>
      </div>

      <div className="overflow-hidden rounded-3xl border border-stone-200/80 bg-white/90 shadow-xl backdrop-blur-md">
        <div className="border-b border-stone-100 bg-[#FAF7F4] px-4 py-3 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {PRODUCTS.map((prod) => (
                <button key={prod.id} onClick={() => onSelectProduct(prod.id)} className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-medium transition-all ${selectedProductId === prod.id ? 'bg-stone-900 text-white shadow-sm' : 'bg-white/80 text-stone-600 hover:bg-white hover:text-stone-900 border border-stone-200/60'}`}>
                  {prod.name}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setCustomization({ ...currentProduct.defaultCustomization })} className="flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors">
                <RotateCcw className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Reset</span>
              </button>
              <button onClick={() => setIsZoomed(!isZoomed)} className="flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors">
                {isZoomed ? <ZoomOut className="h-3.5 w-3.5" /> : <ZoomIn className="h-3.5 w-3.5" />} <span className="hidden sm:inline">Zoom</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          <div className="relative flex flex-col items-center justify-center p-6 lg:col-span-7 bg-gradient-to-b from-[#FAF7F5] to-[#F5ECE8]/50 border-b lg:border-b-0 lg:border-r border-stone-100">
            <div className="my-auto w-full py-4 flex items-center justify-center overflow-hidden">
              {renderProductMockup()}
            </div>
          </div>

          <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5 bg-white">
            <div>
              <div className="flex border-b border-stone-200">
                <button onClick={() => setActiveTab('text')} className={`flex flex-1 items-center justify-center gap-1.5 py-3 text-xs sm:text-sm font-medium border-b-2 ${activeTab === 'text' ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-600'}`}><Type className="h-4 w-4" /> Texto</button>
                <button onClick={() => setActiveTab('colors')} className={`flex flex-1 items-center justify-center gap-1.5 py-3 text-xs sm:text-sm font-medium border-b-2 ${activeTab === 'colors' ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-600'}`}><Palette className="h-4 w-4" /> Colores</button>
                {(currentProduct.category === 'tumbler' || currentProduct.category === 'mug' || currentProduct.category === 'shirt') && (
                  <button onClick={() => setActiveTab('background')} className={`flex flex-1 items-center justify-center gap-1.5 py-3 text-xs sm:text-sm font-medium border-b-2 ${activeTab === 'background' ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-600'}`}><ImageIcon className="h-4 w-4" /> Fondo</button>
                )}
                <button onClick={() => setActiveTab('placement')} className={`flex flex-1 items-center justify-center gap-1.5 py-3 text-xs sm:text-sm font-medium border-b-2 ${activeTab === 'placement' ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-600'}`}><Sliders className="h-4 w-4" /> Diseño</button>
              </div>

              {activeTab === 'text' && (
                <div className="space-y-6 pt-5">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase mb-2">Nombre o Dedicatoria</label>
                    <input type="text" value={customization.customText} onChange={(e) => handleTextChange(e.target.value)} placeholder="Ej. Mario Alberto" className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2 text-stone-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase mb-2">Tipografía ({FONT_OPTIONS.length})</label>
                    <div className="grid grid-cols-2 gap-2">
                      {FONT_OPTIONS.map((font) => (
                        <button key={font.id} onClick={() => handleFontSelect(font.id)} className={`p-2 rounded-xl text-left border ${customization.fontId === font.id ? 'border-[#b90538] bg-rose-50' : 'border-stone-200'}`}>
                          <span className="block text-lg" style={{ fontFamily: font.family }}>{font.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'colors' && (
                <div className="space-y-6 pt-5">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase mb-2">Color del Producto</label>
                    <div className="flex flex-wrap gap-2">
                      {currentProduct.availableColors.map((color) => (
                        <button key={color.id} onClick={() => handleProductColorSelect(color.hex)} className={`w-8 h-8 rounded-full border-2 ${customization.productColor === color.hex ? 'border-stone-900' : 'border-transparent'}`} style={{ backgroundColor: color.hex }} title={color.name}></button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase mb-2">Color del Texto</label>
                    <div className="flex flex-wrap gap-2">
                      {currentProduct.textColors.map((color) => (
                        <button key={color.id} onClick={() => handleTextColorSelect(color.hex)} className={`w-8 h-8 rounded-full border-2 ${customization.textColor === color.hex ? 'border-stone-900' : 'border-transparent'}`} style={{ backgroundColor: color.hex }} title={color.name}></button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'background' && (
                <div className="space-y-6 pt-5">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase mb-2">Subir Fondo Propio</label>
                    <div className="flex items-center gap-3">
                      <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageUpload} className="hidden" />
                      <button onClick={() => fileInputRef.current?.click()} className="py-2 px-4 bg-stone-100 rounded-lg text-sm flex items-center gap-2"><Upload className="w-4 h-4"/> Elegir Imagen</button>
                      {customization.backgroundImageUrl && <button onClick={handleRemoveImage} className="text-red-500"><Trash2 className="w-5 h-5"/></button>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase mb-2">Patrones del Atelier</label>
                    <div className="grid grid-cols-2 gap-2">
                      {TUMBLER_TEXTURE_PRESETS.map((pattern) => (
                        <button key={pattern.id} onClick={() => handlePatternSelect(pattern.id)} className={`flex items-center gap-2 p-2 border rounded-lg ${customization.selectedPatternId === pattern.id ? 'border-stone-900' : 'border-stone-200'}`}>
                          <span className="w-6 h-6 rounded-full" style={{ background: pattern.thumbnail }}></span>
                          <span className="text-xs">{pattern.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'placement' && (
                <div className="space-y-6 pt-5">
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-2">Posición del Diseño</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => handlePlacementChange('vertical')} className={`p-2 border rounded-lg ${customization.textPlacement === 'vertical' ? 'bg-stone-900 text-white' : ''}`}><AlignVerticalJustifyCenter className="mx-auto w-5 h-5"/></button>
                    <button onClick={() => handlePlacementChange('horizontal')} className={`p-2 border rounded-lg ${customization.textPlacement === 'horizontal' ? 'bg-stone-900 text-white' : ''}`}><AlignHorizontalJustifyCenter className="mx-auto w-5 h-5"/></button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 border-t border-stone-100 pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif text-3xl font-semibold text-stone-900">${currentProduct.basePrice * quantity}</span>
                <div className="flex items-center rounded-xl border border-stone-200 bg-stone-50 p-1">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-lg bg-white shadow-sm">-</button>
                  <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-lg bg-white shadow-sm">+</button>
                </div>
              </div>
              <button onClick={() => onAddToCart(currentProduct, customization, quantity)} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#b90538] to-[#a43073] py-4 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.01]">
                <span>Confirmar y Finalizar Compra</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
