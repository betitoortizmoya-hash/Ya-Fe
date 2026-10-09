import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Type,
  Palette,
  Image as ImageIcon,
  RotateCcw,
  ShoppingBag,
  Check,
  Upload,
  Trash2,
  ZoomIn,
  ZoomOut,
  ChevronDown,
  Layers,
  Sliders,
  AlignVerticalJustifyCenter,
  AlignHorizontalJustifyCenter,
  Share2
} from 'lucide-react';
import { Product, ProductCustomization, ProductType } from '../types';
import { PRODUCTS, TUMBLER_TEXTURE_PRESETS } from '../data/products';
import { FONT_OPTIONS } from '../data/fonts';
import { ApronMockup } from './mockups/ApronMockup';
import { TumblerMockup } from './mockups/TumblerMockup';
import { ToteMockup } from './mockups/ToteMockup';
import { MugMockup } from './mockups/MugMockup';

interface LiveCustomizerProps {
  selectedProductId: string;
  onSelectProduct: (productId: string) => void;
  onAddToCart: (product: Product, customization: ProductCustomization, quantity: number) => void;
}

export const LiveCustomizer: React.FC<LiveCustomizerProps> = ({
  selectedProductId,
  onSelectProduct,
  onAddToCart,
}) => {
  const currentProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];
  const [customization, setCustomization] = useState<ProductCustomization>({
    ...currentProduct.defaultCustomization,
  });

  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState<'text' | 'colors' | 'background' | 'placement'>('text');
  const [isFontDropdownOpen, setIsFontDropdownOpen] = useState(false);
  const [isAddedToast, setIsAddedToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync default customization when product changes from outside
  React.useEffect(() => {
    setCustomization({ ...currentProduct.defaultCustomization });
    // Default to background tab for tumbler or text for apron
    if (currentProduct.category === 'tumbler') {
      setActiveTab('text');
    }
  }, [currentProduct.id]);

  const currentFont = FONT_OPTIONS.find((f) => f.id === customization.fontId) || FONT_OPTIONS[0];

  const handleTextChange = (text: string) => {
    setCustomization((prev) => ({ ...prev, customText: text }));
  };

  const handleSecondaryTextChange = (text: string) => {
    setCustomization((prev) => ({ ...prev, secondaryText: text }));
  };

  const handleFontSelect = (fontId: string) => {
    setCustomization((prev) => ({ ...prev, fontId }));
    setIsFontDropdownOpen(false);
  };

  const handleProductColorSelect = (hex: string) => {
    setCustomization((prev) => ({ ...prev, productColor: hex }));
  };

  const handleTextColorSelect = (hex: string) => {
    setCustomization((prev) => ({ ...prev, textColor: hex }));
  };

  const handlePlacementChange = (placement: 'vertical' | 'horizontal' | 'chest' | 'pocket' | 'center') => {
    setCustomization((prev) => ({ ...prev, textPlacement: placement }));
  };

  const handleFontSizeChange = (size: number) => {
    setCustomization((prev) => ({ ...prev, fontSize: size }));
  };

  // Image Upload for Tumbler Background Wrap
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      alert('Please upload an image smaller than 8MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      setCustomization((prev) => ({
        ...prev,
        backgroundImageUrl: result,
        selectedPatternId: 'custom',
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setCustomization((prev) => ({
      ...prev,
      backgroundImageUrl: null,
      selectedPatternId: 'none',
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePatternSelect = (patternId: string) => {
    setCustomization((prev) => ({
      ...prev,
      selectedPatternId: patternId,
      backgroundImageUrl: null, // Clear uploaded image when preset selected
    }));
  };

  const handleResetToDefault = () => {
    setCustomization({ ...currentProduct.defaultCustomization });
  };

  const handleQuickPreset = (presetType: 'mama' | 'chef' | 'botanical') => {
    if (presetType === 'mama') {
      onSelectProduct('tumbler-sip');
      setCustomization({
        productId: 'tumbler-sip',
        productType: 'tumbler',
        customText: 'Alexandra',
        secondaryText: 'Mama & Sofia Est. 2024',
        fontId: 'alex-brush',
        productColor: '#DFA398',
        textColor: '#4A3428',
        textPlacement: 'vertical',
        fontSize: 3,
        backgroundImageUrl: null,
        selectedPatternId: 'rose-marble',
      });
    } else if (presetType === 'chef') {
      onSelectProduct('apron-artisan');
      setCustomization({
        productId: 'apron-artisan',
        productType: 'apron',
        customText: 'Chef Valentina',
        secondaryText: 'Atelier Cuisine & Bakery',
        fontId: 'great-vibes',
        productColor: '#2B3848',
        textColor: '#D4AF37',
        textPlacement: 'chest',
        fontSize: 3,
        selectedPatternId: 'none',
      });
    } else if (presetType === 'botanical') {
      onSelectProduct('tumbler-sip');
      setCustomization({
        productId: 'tumbler-sip',
        productType: 'tumbler',
        customText: 'Camille',
        secondaryText: 'Morning Matcha & Sunshine',
        fontId: 'parisienne',
        productColor: '#9AA897',
        textColor: '#FFFFFF',
        textPlacement: 'vertical',
        fontSize: 3,
        backgroundImageUrl: null,
        selectedPatternId: 'eucalyptus-botanical',
      });
    }
  };

  const handleAdd = () => {
    onAddToCart(currentProduct, customization, quantity);
    setIsAddedToast(true);
    setTimeout(() => setIsAddedToast(false), 3000);
  };

  // Render proper canvas mockup component based on active product category
  const renderProductMockup = () => {
    switch (currentProduct.category) {
      case 'apron':
        return <ApronMockup customization={customization} isZoomed={isZoomed} />;
      case 'tumbler':
        return <TumblerMockup customization={customization} isZoomed={isZoomed} showLifestyleBackground={true} />;
      case 'tote':
        return <ToteMockup customization={customization} isZoomed={isZoomed} />;
      case 'mug':
        return <MugMockup customization={customization} isZoomed={isZoomed} />;
      default:
        return <TumblerMockup customization={customization} isZoomed={isZoomed} />;
    }
  };

  return (
    <section id="customizer" className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-8 flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e8d5b5] bg-[#FBF7F2] px-3.5 py-1 text-xs font-semibold tracking-wider text-[#A66E53] uppercase">
          <Sparkles className="h-3.5 w-3.5" /> Interactive Atelier Studio
        </span>
        <h2 className="mt-3 font-serif text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl md:text-5xl">
          Craft Your Signature Heirloom
        </h2>
        <p className="mt-2.5 max-w-2xl text-stone-600 sm:text-base">
          Personalize every curve, script, metallic hue, and background wrap in real-time.
        </p>

        {/* Quick Style Inspirations */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-stone-600 font-medium">Quick Presets:</span>
          <button
            onClick={() => handleQuickPreset('mama')}
            className="rounded-full border border-stone-200 bg-white px-3 py-1 text-stone-700 shadow-2xs hover:border-[#dfa398] hover:text-[#b76e79] transition-colors"
          >
            🌸 Mama & Sofia Tumbler
          </button>
          <button
            onClick={() => handleQuickPreset('chef')}
            className="rounded-full border border-stone-200 bg-white px-3 py-1 text-stone-700 shadow-2xs hover:border-[#dfa398] hover:text-[#b76e79] transition-colors"
          >
            👩‍🍳 Chef Valentina Apron
          </button>
          <button
            onClick={() => handleQuickPreset('botanical')}
            className="rounded-full border border-stone-200 bg-white px-3 py-1 text-stone-700 shadow-2xs hover:border-[#dfa398] hover:text-[#b76e79] transition-colors"
          >
            🌿 Botanical Sage Sip
          </button>
        </div>
      </div>

      {/* Main Studio Card Container */}
      <div className="overflow-hidden rounded-3xl border border-stone-200/80 bg-white/90 shadow-xl backdrop-blur-md">
        {/* Product Switcher Bar */}
        <div className="border-b border-stone-100 bg-[#FAF7F4] px-4 py-3 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-600 mr-1 hidden sm:inline">
                Product:
              </span>
              {PRODUCTS.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => onSelectProduct(prod.id)}
                  className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-medium transition-all ${
                    selectedProductId === prod.id
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'bg-white/80 text-stone-600 hover:bg-white hover:text-stone-900 border border-stone-200/60'
                  }`}
                >
                  <span>{prod.category === 'tumbler' ? '☕' : prod.category === 'apron' ? '👩‍🍳' : prod.category === 'tote' ? '👜' : '✨'}</span>
                  <span>{prod.name}</span>
                  {prod.badge && (
                    <span className="hidden sm:inline-block rounded-full bg-white/20 px-1.5 py-0.5 text-[10px]">
                      {prod.category === 'tumbler' ? 'Popular' : 'Artisan'}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetToDefault}
                title="Reset customizations to default"
                className="flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 hover:border-stone-300 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                title={isZoomed ? 'Zoom out' : 'Zoom in for details'}
                className="flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 hover:border-stone-300 transition-colors"
              >
                {isZoomed ? <ZoomOut className="h-3.5 w-3.5" /> : <ZoomIn className="h-3.5 w-3.5" />}
                <span className="hidden sm:inline">{isZoomed ? 'Actual' : 'Zoom'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Studio Grid: Left Canvas Preview / Right Customization Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          {/* LEFT: Live Interactive Preview Stage */}
          <div className="relative flex flex-col items-center justify-center p-6 lg:col-span-7 bg-gradient-to-b from-[#FAF7F5] to-[#F5ECE8]/50 border-b lg:border-b-0 lg:border-r border-stone-100">
            {/* Active Product Title & Subtitle */}
            <div className="w-full text-center sm:text-left mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#B76E79]">
                {currentProduct.category === 'tumbler'
                  ? 'Personalized Stainless Coffee Tumbler'
                  : currentProduct.category === 'apron'
                  ? 'Bespoke Stonewashed Kitchen Apron'
                  : 'Artisan Custom Gift'}
              </span>
              <h3 className="font-serif text-2xl font-normal text-stone-900 sm:text-3xl">
                {currentProduct.colloquialTitle}
              </h3>
            </div>

            {/* The Visual Mockup Centerpiece */}
            <div className="my-auto w-full py-4 flex items-center justify-center overflow-hidden">
              {renderProductMockup()}
            </div>

            {/* Bottom info pill */}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-stone-500">
              <span className="flex items-center gap-1">
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                Live 1:1 Scale Preview
              </span>
              <span>•</span>
              <span>
                Font: <strong className="text-stone-700">{currentFont.name}</strong>
              </span>
              <span>•</span>
              <span>
                Base: <strong className="text-stone-700">{customization.productColor}</strong>
              </span>
              {customization.backgroundImageUrl && (
                <>
                  <span>•</span>
                  <span className="text-[#B76E79] font-medium">Custom Background Wrap Active</span>
                </>
              )}
            </div>
          </div>

          {/* RIGHT: Customization Control Panel */}
          <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5 bg-white">
            <div>
              {/* Tab navigation within controls */}
              <div className="flex border-b border-stone-200">
                <button
                  onClick={() => setActiveTab('text')}
                  className={`flex flex-1 items-center justify-center gap-1.5 py-3 text-xs sm:text-sm font-medium border-b-2 transition-all ${
                    activeTab === 'text'
                      ? 'border-stone-900 text-stone-900'
                      : 'border-transparent text-stone-600 hover:text-stone-700'
                  }`}
                >
                  <Type className="h-4 w-4" />
                  <span>Text & Fonts</span>
                </button>

                <button
                  onClick={() => setActiveTab('colors')}
                  className={`flex flex-1 items-center justify-center gap-1.5 py-3 text-xs sm:text-sm font-medium border-b-2 transition-all ${
                    activeTab === 'colors'
                      ? 'border-stone-900 text-stone-900'
                      : 'border-transparent text-stone-600 hover:text-stone-700'
                  }`}
                >
                  <Palette className="h-4 w-4" />
                  <span>Colors</span>
                </button>

                {(currentProduct.category === 'tumbler' || currentProduct.category === 'mug') && (
                  <button
                    onClick={() => setActiveTab('background')}
                    className={`flex flex-1 items-center justify-center gap-1.5 py-3 text-xs sm:text-sm font-medium border-b-2 transition-all ${
                      activeTab === 'background'
                        ? 'border-stone-900 text-stone-900'
                        : 'border-transparent text-stone-600 hover:text-stone-700'
                    }`}
                  >
                    <ImageIcon className="h-4 w-4" />
                    <span>Background Image</span>
                  </button>
                )}

                <button
                  onClick={() => setActiveTab('placement')}
                  className={`flex flex-1 items-center justify-center gap-1.5 py-3 text-xs sm:text-sm font-medium border-b-2 transition-all ${
                    activeTab === 'placement'
                      ? 'border-stone-900 text-stone-900'
                      : 'border-transparent text-stone-600 hover:text-stone-700'
                  }`}
                >
                  <Sliders className="h-4 w-4" />
                  <span>Layout</span>
                </button>
              </div>

              {/* Tab 1: Text & Rich Font Dropdown Selection */}
              {activeTab === 'text' && (
                <div className="space-y-6 pt-5">
                  {/* Primary Name / Text Input with Clear/No-text Option */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold tracking-wide text-stone-700 uppercase">
                        Custom Inscription / Name
                      </label>
                      {Boolean(customization.customText?.trim() || customization.secondaryText?.trim()) ? (
                        <button
                          type="button"
                          onClick={() => {
                            setCustomization((prev) => ({ ...prev, customText: '', secondaryText: '' }));
                          }}
                          className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-medium hover:underline cursor-pointer"
                        >
                          <Trash2 className="h-3 w-3" />
                          <span>Eliminar Texto (Dejar Liso / Solo Imagen)</span>
                        </button>
                      ) : (
                        <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[11px] font-medium text-stone-600">
                          ✨ Sin Texto (Diseño Limpio)
                        </span>
                      )}
                    </div>

                    {/* Quick Mode Switcher: With Text vs Without Text */}
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (!customization.customText) {
                            setCustomization((prev) => ({
                              ...prev,
                              customText: currentProduct.defaultCustomization.customText || 'Alexandra',
                            }));
                          }
                        }}
                        className={`py-1.5 px-3 rounded-lg text-xs font-medium transition-all ${
                          customization.customText?.trim()
                            ? 'bg-stone-900 text-white shadow-2xs'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        ✍️ Con Grabado / Texto
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCustomization((prev) => ({ ...prev, customText: '', secondaryText: '' }));
                        }}
                        className={`py-1.5 px-3 rounded-lg text-xs font-medium transition-all ${
                          !customization.customText?.trim()
                            ? 'bg-stone-900 text-white shadow-2xs'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        ✨ Sin Texto (Solo Fondo / Liso)
                      </button>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        value={customization.customText}
                        onChange={(e) => handleTextChange(e.target.value)}
                        placeholder="Escribe un nombre o deja vacío para diseño liso / solo imagen..."
                        maxLength={26}
                        className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-stone-800 placeholder-stone-400 focus:border-stone-400 focus:bg-white focus:outline-hidden text-sm sm:text-base shadow-2xs"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-stone-600">
                        {customization.customText.length}/26
                      </span>
                    </div>

                    {!customization.customText?.trim() && (
                      <p className="mt-1 text-[11px] text-emerald-700">
                        ✓ Modo sin texto activo: el producto se mostrará completamente limpio con el color base o la imagen de fondo seleccionada.
                      </p>
                    )}
                  </div>

                  {/* Secondary Line Input */}
                  <div>
                    <label className="block text-xs font-semibold tracking-wide text-stone-700 uppercase">
                      Secondary Text / Tagline <span className="text-stone-600 font-normal">(Optional)</span>
                    </label>
                    <div className="mt-1.5">
                      <input
                        type="text"
                        value={customization.secondaryText || ''}
                        onChange={(e) => handleSecondaryTextChange(e.target.value)}
                        placeholder="e.g. Mama & Sofia Est. 2024"
                        maxLength={32}
                        className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2 text-sm text-stone-800 placeholder-stone-400 focus:border-stone-400 focus:bg-white focus:outline-hidden shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* RICH FONT DROPDOWN & VISUAL SELECTOR (User specifically asked for a rich dropdown of fonts) */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold tracking-wide text-stone-700 uppercase">
                        Typography Style ({FONT_OPTIONS.length} Fonts)
                      </label>
                      <span className="text-xs text-[#B76E79] font-medium">
                        Current: {currentFont.name}
                      </span>
                    </div>

                    {/* Custom Styled Dropdown Button */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsFontDropdownOpen(!isFontDropdownOpen)}
                        className="flex w-full items-center justify-between rounded-xl border border-stone-200 bg-white px-4 py-3 text-left shadow-2xs hover:border-stone-300 focus:outline-hidden transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="text-2xl text-stone-900 leading-none"
                            style={{ fontFamily: currentFont.family }}
                          >
                            {customization.customText || currentFont.previewText}
                          </span>
                          <span className="text-xs font-medium text-stone-600">
                            ({currentFont.name})
                          </span>
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 text-stone-400 transition-transform ${
                            isFontDropdownOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Dropdown Menu Popup with all font styles */}
                      {isFontDropdownOpen && (
                        <div className="absolute left-0 right-0 z-30 mt-2 max-h-72 overflow-y-auto rounded-2xl border border-stone-200 bg-white p-2 shadow-2xl">
                          <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider text-stone-600 uppercase border-b border-stone-100">
                            Select Hand-Picked Calligraphy & Typefaces
                          </div>
                          <div className="divide-y divide-stone-100">
                            {FONT_OPTIONS.map((font) => (
                              <button
                                key={font.id}
                                onClick={() => handleFontSelect(font.id)}
                                className={`flex w-full items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors ${
                                  customization.fontId === font.id
                                    ? 'bg-[#F9ECE7] text-[#8C434C]'
                                    : 'hover:bg-stone-50 text-stone-700'
                                }`}
                              >
                                <div>
                                  <div
                                    className="text-xl sm:text-2xl leading-snug"
                                    style={{ fontFamily: font.family }}
                                  >
                                    {customization.customText || font.previewText}
                                  </div>
                                  <div className="text-[11px] text-stone-600">
                                    <span className="font-semibold">{font.name}</span> • {font.description}
                                  </div>
                                </div>
                                {customization.fontId === font.id && (
                                  <Check className="h-4 w-4 text-[#8C434C]" />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Fast Quick-Switch Font Chips */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {FONT_OPTIONS.slice(0, 6).map((font) => (
                        <button
                          key={font.id}
                          onClick={() => handleFontSelect(font.id)}
                          className={`rounded-lg px-2.5 py-1 text-xs transition-all ${
                            customization.fontId === font.id
                              ? 'bg-stone-900 text-white shadow-2xs font-medium'
                              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                          }`}
                        >
                          {font.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Font Size Slider */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold tracking-wide text-stone-700 uppercase">
                      <span>Inscription Scale</span>
                      <span className="text-stone-600 font-normal">Level {customization.fontSize} of 5</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      step={1}
                      value={customization.fontSize}
                      onChange={(e) => handleFontSizeChange(Number(e.target.value))}
                      className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-stone-200 accent-stone-900"
                    />
                  </div>
                </div>
              )}

              {/* Tab 2: Colors (Both Product Base Color & Text/Embroidery Color) */}
              {activeTab === 'colors' && (
                <div className="space-y-6 pt-5">
                  {/* 1. Base Product Color (Mandil / Termo Color) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-semibold tracking-wide text-stone-700 uppercase">
                        {currentProduct.category === 'apron'
                          ? 'Apron Linen Shade'
                          : currentProduct.category === 'tumbler'
                          ? 'Tumbler Stainless Coat'
                          : 'Product Color'}
                      </label>
                      <span className="text-xs font-medium text-stone-500">
                        {currentProduct.availableColors.find((c) => c.hex.toLowerCase() === customization.productColor.toLowerCase())?.name || customization.productColor}
                      </span>
                    </div>

                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
                      {currentProduct.availableColors.map((color) => {
                        const isSelected = customization.productColor.toLowerCase() === color.hex.toLowerCase();
                        return (
                          <button
                            key={color.id}
                            onClick={() => handleProductColorSelect(color.hex)}
                            title={color.name}
                            className={`group relative flex flex-col items-center rounded-xl p-2 transition-all ${
                              isSelected
                                ? 'bg-stone-100 ring-2 ring-stone-900 ring-offset-1'
                                : 'hover:bg-stone-50 border border-stone-200/60'
                            }`}
                          >
                            <span
                              className="h-8 w-8 rounded-full shadow-inner border border-stone-900/10 transition-transform group-hover:scale-105"
                              style={{ backgroundColor: color.hex }}
                            />
                            <span className="mt-1.5 text-[10px] text-stone-600 text-center line-clamp-1 font-medium">
                              {color.name.split(' ')[0]}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Text / Engraving / Foil Color */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-semibold tracking-wide text-stone-700 uppercase">
                        {currentProduct.category === 'apron'
                          ? 'Embroidery Thread Color'
                          : 'Laser Engraving / Foil Color'}
                      </label>
                      <span className="text-xs font-medium text-stone-500">
                        {currentProduct.textColors.find((c) => c.hex.toLowerCase() === customization.textColor.toLowerCase())?.name || customization.textColor}
                      </span>
                    </div>

                    <div className="grid grid-cols-4 sm:grid-cols-4 gap-2.5">
                      {currentProduct.textColors.map((color) => {
                        const isSelected = customization.textColor.toLowerCase() === color.hex.toLowerCase();
                        return (
                          <button
                            key={color.id}
                            onClick={() => handleTextColorSelect(color.hex)}
                            title={color.name}
                            className={`group relative flex flex-col items-center rounded-xl p-2 transition-all ${
                              isSelected
                                ? 'bg-stone-100 ring-2 ring-stone-900 ring-offset-1'
                                : 'hover:bg-stone-50 border border-stone-200/60'
                            }`}
                          >
                            <span
                              className="h-8 w-8 rounded-full shadow-inner border border-stone-900/10 transition-transform group-hover:scale-105"
                              style={{ backgroundColor: color.hex }}
                            />
                            <span className="mt-1.5 text-[10px] text-stone-600 text-center line-clamp-1 font-medium">
                              {color.name.split(' ')[0]}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Background Image Wrap for Tumbler & Ceramic Mug */}
              {activeTab === 'background' && (currentProduct.category === 'tumbler' || currentProduct.category === 'mug') && (
                <div className="space-y-6 pt-5">
                  <div>
                    <label className="block text-xs font-semibold tracking-wide text-stone-700 uppercase">
                      Custom Image Wrap • {currentProduct.category === 'tumbler' ? 'Tumbler Body' : 'Ceramic Mug'}
                    </label>
                    <p className="mt-1 text-xs text-stone-500">
                      {currentProduct.category === 'tumbler'
                        ? 'Upload your favorite photo, aesthetic pattern, or floral background to wrap directly around the stainless steel tumbler.'
                        : 'Upload your favorite photo, pattern, or floral background to wrap directly around the artisanal ceramic mug.'}
                    </p>

                    {/* User requested: "Añadirle donde dice elegir una imagen, añadir una imagen del fondo del vaso... y la taza, por favor, que también se le pueda añadir imagen para el fondo" */}
                    <div className="mt-3">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="product-image-upload"
                      />

                      {!customization.backgroundImageUrl ? (
                        <label
                          htmlFor="product-image-upload"
                          className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#dfa398] bg-[#FDF8F5] p-5 text-center transition-all hover:bg-[#FBEFEA] hover:border-[#b76e79]"
                        >
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm text-[#b76e79]">
                            <Upload className="h-5 w-5" />
                          </div>
                          <span className="mt-2.5 text-sm font-semibold text-stone-800">
                            Choose an Image / Upload Background
                          </span>
                          <span className="mt-0.5 text-xs text-stone-500">
                            PNG, JPG, or WEBP (Max 8MB)
                          </span>
                        </label>
                      ) : (
                        <div className="flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 p-3.5">
                          <div className="flex items-center gap-3">
                            <img
                              src={customization.backgroundImageUrl}
                              alt="Background preview"
                              className="h-12 w-12 rounded-xl object-cover shadow-2xs border border-white"
                            />
                            <div>
                              <span className="text-xs font-semibold text-stone-800 block">
                                Custom Background Wrap Active
                              </span>
                              <span className="text-[11px] text-emerald-600 font-medium">
                                Wrapped 360° on {currentProduct.category === 'tumbler' ? 'tumbler cylinder' : 'ceramic body'}
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            title="Remove custom image"
                            className="rounded-lg p-2 text-rose-500 hover:bg-rose-50 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Preset Atelier Background Textures */}
                  <div>
                    <label className="block text-xs font-semibold tracking-wide text-stone-700 uppercase mb-2">
                      Or Pick Curated Atelier Textures
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {TUMBLER_TEXTURE_PRESETS.map((pattern) => {
                        const isSelected =
                          customization.selectedPatternId === pattern.id && !customization.backgroundImageUrl;
                        return (
                          <button
                            key={pattern.id}
                            onClick={() => handlePatternSelect(pattern.id)}
                            className={`flex items-center gap-2.5 rounded-xl border p-2 text-left transition-all ${
                              isSelected
                                ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                                : 'border-stone-200 bg-white hover:border-stone-300'
                            }`}
                          >
                            <span
                              className="h-7 w-7 shrink-0 rounded-lg shadow-inner border border-stone-300/40"
                              style={{ background: pattern.thumbnail }}
                            />
                            <span className="text-xs font-medium text-stone-700 line-clamp-1">
                              {pattern.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Placement & Layout */}
              {activeTab === 'placement' && (
                <div className="space-y-6 pt-5">
                  {currentProduct.category === 'tumbler' ? (
                    <div>
                      <label className="block text-xs font-semibold tracking-wide text-stone-700 uppercase mb-2">
                        Text Orientation on Tumbler
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => handlePlacementChange('vertical')}
                          className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-medium transition-all ${
                            customization.textPlacement === 'vertical' || !customization.textPlacement
                              ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                              : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                          }`}
                        >
                          <AlignVerticalJustifyCenter className="h-4 w-4" />
                          <span>Vertical Flow (Signature)</span>
                        </button>
                        <button
                          onClick={() => handlePlacementChange('horizontal')}
                          className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-medium transition-all ${
                            customization.textPlacement === 'horizontal'
                              ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                              : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                          }`}
                        >
                          <AlignHorizontalJustifyCenter className="h-4 w-4" />
                          <span>Horizontal Center</span>
                        </button>
                      </div>
                    </div>
                  ) : currentProduct.category === 'apron' ? (
                    <div>
                      <label className="block text-xs font-semibold tracking-wide text-stone-700 uppercase mb-2">
                        Embroidery Placement on Apron
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => handlePlacementChange('chest')}
                          className={`rounded-xl border p-2.5 text-center text-xs font-medium transition-all ${
                            customization.textPlacement === 'chest' || !customization.textPlacement
                              ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                              : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                          }`}
                        >
                          Chest Monogram
                        </button>
                        <button
                          onClick={() => handlePlacementChange('pocket')}
                          className={`rounded-xl border p-2.5 text-center text-xs font-medium transition-all ${
                            customization.textPlacement === 'pocket'
                              ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                              : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                          }`}
                        >
                          Pocket Stitched
                        </button>
                        <button
                          onClick={() => handlePlacementChange('center')}
                          className={`rounded-xl border p-2.5 text-center text-xs font-medium transition-all ${
                            customization.textPlacement === 'center'
                              ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                              : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                          }`}
                        >
                          Center Bold
                        </button>
                      </div>
                    </div>
                  ) : null}

                  {/* Highlights */}
                  <div className="rounded-2xl bg-stone-50 p-4 border border-stone-200/60">
                    <span className="text-xs font-semibold text-stone-800 uppercase tracking-wide block mb-2">
                      Atelier Specifications
                    </span>
                    <ul className="space-y-1.5 text-xs text-stone-600">
                      {currentProduct.specs.map((spec, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions: Pricing, Quantity & Add to Cart */}
            <div className="mt-8 border-t border-stone-100 pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl font-semibold text-stone-900">
                      ${currentProduct.basePrice * quantity}
                    </span>
                    {currentProduct.originalPrice && (
                      <span className="text-sm text-stone-600 line-through">
                        ${currentProduct.originalPrice * quantity}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-stone-600">
                    Includes precision laser etching & gift wrapping
                  </span>
                </div>

                {/* Quantity selector */}
                <div className="flex items-center rounded-xl border border-stone-200 bg-stone-50 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-stone-600 shadow-2xs hover:bg-stone-100"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-semibold text-stone-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-stone-600 shadow-2xs hover:bg-stone-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={handleAdd}
                className="relative flex w-full items-center justify-center gap-2 rounded-2xl bg-stone-900 py-4 text-sm font-medium tracking-wide text-white shadow-lg transition-all hover:bg-stone-800 active:scale-[0.99]"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Add Customized Piece to Bag • ${(currentProduct.basePrice * quantity).toFixed(2)}</span>
              </button>

              {/* Toast message upon adding */}
              {isAddedToast && (
                <div className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-emerald-50 py-2 px-3 text-xs font-medium text-emerald-800 border border-emerald-200/80 animate-fade-in">
                  <Check className="h-4 w-4 text-emerald-600" />
                  <span>Added to your bespoke bag! Check cart in upper right corner.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
