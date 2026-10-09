import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, ProductCategory } from '../types';
import { PRODUCTS } from '../data/products';
import { Star, SlidersHorizontal, Sparkles, Box, Wind, Coffee, Gift } from 'lucide-react';

interface CatalogSectionProps {
  onSelectProductForCustomizer: (product: Product) => void;
  onLaunchCustomizer: () => void;
}

export default function CatalogSection({
  onSelectProductForCustomizer,
  onLaunchCustomizer
}: CatalogSectionProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | ProductCategory>('all');

  const filterTabs = [
    { id: 'all', label: 'All' },
    { id: 'textiles', label: 'Embroidered Textiles' },
    { id: 'balloons', label: 'Bubble Balloons' },
    { id: 'puzzles', label: 'Keepsake Puzzles' },
    { id: 'tumblers', label: 'Custom Tumblers' }
  ] as const;

  const filteredProducts =
    activeFilter === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeFilter);

  return (
    <section id="catalog-section" className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 pb-20 sm:pb-28">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 text-[#b90538]">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider font-bold">
              Heirloom Collection
            </span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-stone-900 tracking-tight">
            Atelier Masterpieces
          </h2>
          <p className="text-sm sm:text-base text-stone-600 max-w-xl">
            Select an artifact to preview live typography, thread colors, and personalized monograms.
          </p>
        </div>

        {/* Filter Pill Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-stone-100/90 backdrop-blur-md shadow-xs border border-stone-200/50">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 focus:outline-none ${
                  isActive
                    ? 'bg-white text-[#b90538] shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="group flex flex-col rounded-3xl bg-white p-4 shadow-[0_8px_30px_-4px_rgba(244,63,94,0.06)] hover:shadow-[0_20px_40px_-8px_rgba(244,63,94,0.16)] border border-rose-100/60 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Product Image Box */}
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-stone-50 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Badge (Bestseller, Everlasting, Laser Etched, etc.) */}
                {product.badge && (
                  <div
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs uppercase tracking-wider font-bold shadow-xs ${
                      product.badgeType === 'secondary'
                        ? 'bg-[#a43073] text-white'
                        : product.badgeType === 'tertiary'
                        ? 'bg-[#c6495e] text-white'
                        : 'bg-[#b90538] text-white'
                    }`}
                  >
                    {product.badge}
                  </div>
                )}

                {/* Rating Badge */}
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs border border-rose-100">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-bold text-stone-900">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Product Details */}
              <div className="flex flex-col flex-grow justify-between gap-4">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
                      {product.categoryLabel}
                    </span>
                    <span className="text-lg font-bold text-[#b90538]">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 group-hover:text-[#b90538] transition-colors leading-snug">
                    {product.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Monogram Detail Pill */}
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#b90538]" />
                    <span className="text-stone-800 font-medium">
                      {product.featurePill.text}
                    </span>
                  </div>
                  <span className="text-[#b90538] font-bold">
                    {product.featurePill.badgeText}
                  </span>
                </div>

                {/* Customize Trigger Button */}
                <button
                  onClick={() => onSelectProductForCustomizer(product)}
                  className="w-full py-3 rounded-full bg-stone-100/90 hover:bg-[#b90538] hover:text-white text-stone-800 text-sm font-semibold text-center transition-all duration-200 flex items-center justify-center gap-2 shadow-xs group-hover:bg-[#b90538] group-hover:text-white"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Customize Now</span>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Live Customizer Invitation Banner */}
      <div className="mt-16 rounded-3xl bg-gradient-to-r from-rose-50 via-white to-pink-50 p-8 sm:p-12 shadow-sm border border-rose-100 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-rose-100 flex items-center justify-center text-[#b90538] shrink-0 shadow-xs border border-rose-200">
            <Sparkles className="w-8 h-8" />
          </div>
          <div className="flex flex-col gap-1 text-center md:text-left">
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-stone-900">
              Design Your Unique Creation in Real Time
            </h3>
            <p className="text-sm text-stone-600 max-w-xl">
              Use our interactive 3D visual studio to change thread tones, try script calligraphy, and preview custom gift ribbons before placing your order.
            </p>
          </div>
        </div>

        <button
          onClick={onLaunchCustomizer}
          className="shrink-0 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#b90538] to-[#dc2c4f] text-white text-sm font-semibold shadow-[0_12px_24px_-4px_rgba(185,5,56,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Launch Customizer Studio</span>
        </button>
      </div>
    </section>
  );
}
