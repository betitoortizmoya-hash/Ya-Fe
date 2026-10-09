import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowDown, Heart, Truck, ShieldCheck, Clock, Star, Edit3 } from 'lucide-react';

interface HeroSectionProps {
  onOpenCustomizer: () => void;
  onBrowseCatalog: () => void;
}

export default function HeroSection({ onOpenCustomizer, onBrowseCatalog }: HeroSectionProps) {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-6 sm:pt-10 pb-16 lg:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Editorial Headline & Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          {/* Atelier Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-rose-50 text-[#b90538] w-fit shadow-xs border border-rose-100">
            <Sparkles className="w-4 h-4 text-[#b90538]" />
            <span className="text-xs uppercase tracking-wider font-semibold">
              Couture Gift Atelier • Since 2019
            </span>
          </div>

          {/* Main Headline */}
          <div className="flex flex-col gap-3">
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-[56px] text-stone-900 font-normal tracking-tight leading-[1.08]">
              Crafted With Love, <br className="hidden sm:inline" />
              <span className="italic font-medium bg-gradient-to-r from-[#b90538] via-[#a43073] to-[#dc2c4f] bg-clip-text text-transparent">
                Personalized For You
              </span>
            </h1>
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed font-sans">
              Exquisite personalized embroidered aprons, crystal bubble balloons, artisan photo puzzles, and keepsake tumblers hand-finished in our atelier. Every detail tailored to seal timeless joy.
            </p>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onOpenCustomizer}
              className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#b90538] to-[#dc2c4f] text-white font-semibold text-base shadow-[0_16px_32px_-6px_rgba(185,5,56,0.36)] hover:shadow-[0_20px_40px_-6px_rgba(185,5,56,0.48)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <Sparkles className="w-5 h-5 transition-transform group-hover:rotate-12" />
              <span>Explore Live Customizer</span>
            </button>

            <button
              onClick={onBrowseCatalog}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-stone-800 font-semibold text-base hover:bg-stone-50 border border-stone-200/60 shadow-xs transition-all duration-200 hover:scale-[1.01]"
            >
              <span>Browse Catalog</span>
              <ArrowDown className="w-4 h-4 text-stone-500" />
            </button>
          </div>

          {/* Trust Badges Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 mt-2">
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/80 backdrop-blur-md shadow-xs border border-rose-50 hover:bg-white transition-colors">
              <Heart className="w-5 h-5 text-[#b90538] shrink-0 fill-rose-500" />
              <span className="text-xs font-semibold text-stone-800 leading-tight">
                100% Handcrafted with Love
              </span>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/80 backdrop-blur-md shadow-xs border border-rose-50 hover:bg-white transition-colors">
              <Truck className="w-5 h-5 text-[#b90538] shrink-0" />
              <span className="text-xs font-semibold text-stone-800 leading-tight">
                Nationwide Safe Delivery
              </span>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/80 backdrop-blur-md shadow-xs border border-rose-50 hover:bg-white transition-colors">
              <ShieldCheck className="w-5 h-5 text-[#b90538] shrink-0" />
              <span className="text-xs font-semibold text-stone-800 leading-tight">
                12,000+ Cherished Moments
              </span>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/80 backdrop-blur-md shadow-xs border border-rose-50 hover:bg-white transition-colors">
              <Clock className="w-5 h-5 text-[#b90538] shrink-0" />
              <span className="text-xs font-semibold text-stone-800 leading-tight">
                Personalized in Under 48h
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Visual Hero Mosaic Bento */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-white shadow-[0_24px_50px_-12px_rgba(244,63,94,0.18)] border border-rose-100">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsjC0whf3FkV8T5anxPK1LjXeSj-3UNm7dNmT4o0ov5RJPCFpANUDShnxH46zqmJVuC_1Oz4kDnNJiiyGrXoBxYSkGGqPSd9pcsEPCbinXeMLeXgrHnfxx4M0VedtzdqR0A6v6TfWrDvGcmrjFuP5txcyXY6juyUV8MOssMQuWpj8q8Prb7asgRge0SH2F9FymdUI0RMF14-zvLNpxZXEELzasCww2wq3D-5PvLV-lQZFuDGA4SUMI"
              alt="High-end studio photography of handcrafted bespoke gifts: blush embroidered chef apron draped elegantly beside transparent crystal bubble balloon"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent pointer-events-none" />

            {/* Floating Live Badge */}
            <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-xl px-4 py-2 rounded-full flex items-center gap-2 shadow-lg border border-rose-100">
              <span className="w-2.5 h-2.5 rounded-full bg-[#b90538] animate-pulse" />
              <span className="text-xs font-bold text-stone-800">Atelier Live In Progress</span>
            </div>

            {/* Floating Monogram Card Overlap */}
            <div className="absolute bottom-6 left-6 right-6 p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-xl shadow-xl border border-rose-100/80 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-200 to-pink-100 flex items-center justify-center text-[#b90538] font-serif-luxury font-bold text-lg shadow-inner border border-rose-200">
                  Y&amp;F
                </div>
                <div>
                  <p className="text-sm font-bold text-stone-900 leading-snug">
                    Personalized Heirloom Finish
                  </p>
                  <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5 font-medium">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>4.97 Star Rated Gifting Studio</span>
                  </p>
                </div>
              </div>

              <button
                onClick={onOpenCustomizer}
                title="Customize gift"
                className="shrink-0 p-3 rounded-full bg-[#b90538] text-white hover:bg-[#dc2c4f] shadow-md transition-all hover:scale-105 active:scale-95"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Decorative Floating Sparkle Stamp */}
          <div className="absolute -bottom-5 -left-5 w-20 h-20 rounded-2xl bg-white shadow-lg border border-rose-100 p-2 hidden sm:flex flex-col items-center justify-center text-center">
            <span className="font-serif-luxury text-xl font-bold text-[#b90538]">100%</span>
            <span className="text-[10px] text-stone-500 uppercase tracking-wider leading-none font-bold">
              Bespoke
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
