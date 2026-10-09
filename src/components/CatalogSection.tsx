import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import { Product, ProductType } from '../types';
import { PRODUCTS } from '../data/products';

interface CatalogSectionProps {
  onSelectProductToCustomize: (productId: string) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({ onSelectProductToCustomize }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | ProductType>('all');

  const filteredProducts = PRODUCTS.filter((product) => {
    if (activeFilter === 'all') return true;
    return product.category === activeFilter;
  });

  const handleCustomizeClick = (productId: string) => {
    onSelectProductToCustomize(productId);
    const customizerEl = document.getElementById('customizer');
    if (customizerEl) {
      customizerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="catalog" className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <span className="text-xs font-semibold tracking-widest text-[#B76E79] uppercase">
          Curated Atelier Collection
        </span>
        <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-stone-900">
          Personalized Daily Essentials
        </h2>
        <p className="mt-2 text-stone-600 max-w-xl text-sm sm:text-base">
          Every piece is individually handcrafted and engraved with your bespoke wording in our atelier.
        </p>

        {/* Filter Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              activeFilter === 'all'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            All Creations
          </button>
          <button
            onClick={() => setActiveFilter('tumbler')}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              activeFilter === 'tumbler'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            ☕ Coffee Tumblers
          </button>
          <button
            onClick={() => setActiveFilter('apron')}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              activeFilter === 'apron'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            👩‍🍳 Linen Aprons
          </button>
          <button
            onClick={() => setActiveFilter('tote')}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              activeFilter === 'tote'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            👜 Canvas Totes
          </button>
          <button
            onClick={() => setActiveFilter('mug')}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              activeFilter === 'mug'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            ☕ Stoneware Mugs
          </button>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-stone-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-stone-300"
          >
            <div>
              {/* Product Visual Thumbnail Area */}
              <div className="relative mb-4 flex h-60 w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#FAF7F5] to-[#F3EDE6]">
                {/* Badge */}
                {product.badge && (
                  <span className="absolute top-3 left-3 z-10 rounded-full border border-stone-200/80 bg-white/90 px-2.5 py-0.5 text-[11px] font-semibold text-stone-700 shadow-2xs backdrop-blur-xs">
                    {product.badge}
                  </span>
                )}

                {/* Visual Icon / Miniature Preview */}
                <div className="flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  {product.category === 'tumbler' ? (
                    <div className="relative flex flex-col items-center">
                      <div className="h-6 w-1 -rotate-12 bg-stone-300 rounded-full mb-1" />
                      <div className="h-32 w-16 rounded-b-xl bg-gradient-to-tr from-[#dfa398] via-[#e8b5ab] to-[#c7887e] shadow-lg flex items-center justify-center relative overflow-hidden border border-white/50">
                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-white/30 to-black/30 pointer-events-none" />
                        <span
                          className="text-xs text-[#3E2723] font-medium"
                          style={{
                            fontFamily: "'Alex Brush', cursive",
                            writingMode: 'vertical-rl',
                            transform: 'rotate(180deg)',
                          }}
                        >
                          {product.defaultCustomization.customText}
                        </span>
                      </div>
                    </div>
                  ) : product.category === 'apron' ? (
                    <div className="relative flex flex-col items-center">
                      <div className="h-6 w-12 border-2 border-[#7D5C45] rounded-t-full mb-0.5" />
                      <div className="h-28 w-24 bg-[#2B3848] rounded-b-xl shadow-lg flex flex-col items-center justify-center relative overflow-hidden border border-white/30 p-2">
                        <span
                          className="text-sm text-[#D4AF37] font-semibold"
                          style={{ fontFamily: "'Great Vibes', cursive" }}
                        >
                          {product.defaultCustomization.customText}
                        </span>
                        <div className="mt-2 h-7 w-16 border-t border-white/20 bg-white/5 rounded-b" />
                      </div>
                    </div>
                  ) : product.category === 'tote' ? (
                    <div className="relative flex flex-col items-center">
                      <div className="h-8 w-12 border-4 border-[#C2B6A3] rounded-t-full" />
                      <div className="h-24 w-24 bg-[#EDE6DA] rounded-b-lg shadow-md flex items-center justify-center border border-stone-200">
                        <span className="font-serif text-xs font-semibold text-stone-800">
                          {product.defaultCustomization.customText}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative flex items-center justify-center">
                      <div className="h-20 w-20 rounded-xl bg-[#F7F2EA] border border-stone-300 shadow-md flex items-center justify-center">
                        <span className="font-serif text-xs font-medium text-[#D4AF37]">
                          {product.defaultCustomization.customText}
                        </span>
                      </div>
                      <div className="h-10 w-4 border-2 border-stone-300 rounded-r-lg" />
                    </div>
                  )}
                </div>

                <div className="absolute bottom-2 right-2 rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-medium text-stone-600 backdrop-blur-xs">
                  {product.availableColors.length} Colors
                </div>
              </div>

              {/* Title & Tagline */}
              <h3 className="font-serif text-lg font-medium text-stone-900 group-hover:text-[#B76E79] transition-colors">
                {product.name}
              </h3>
              <p className="mt-1 line-clamp-2 text-xs text-stone-500 leading-relaxed">
                {product.tagline}
              </p>

              {/* Key Features Preview */}
              <div className="mt-3 space-y-1">
                {product.specs.slice(0, 2).map((spec, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[11px] text-stone-600">
                    <Check className="h-3 w-3 text-emerald-600 shrink-0" />
                    <span className="truncate">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Price & Customization Action */}
            <div className="mt-5 border-t border-stone-100 pt-3">
              <div className="flex items-baseline justify-between mb-3">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif text-xl font-medium text-stone-900">
                    ${product.basePrice}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-stone-600 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                  Free Personalization
                </span>
              </div>

              <button
                onClick={() => handleCustomizeClick(product.id)}
                className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-stone-900 bg-white py-2.5 text-xs font-semibold text-stone-900 shadow-2xs transition-all group-hover:bg-stone-900 group-hover:text-white cursor-pointer"
              >
                <span>Customize in Studio</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
