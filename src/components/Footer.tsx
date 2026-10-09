import React from 'react';
import { ShieldCheck, Sparkles, Gift, Heart, ArrowLeft } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 w-full bg-white border-t border-rose-100/60 mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-12">
        {/* 4 Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-rose-100/50">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-[#b90538] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm text-stone-900 font-bold">100% Handcrafted</h4>
              <p className="text-xs text-stone-500 mt-0.5">Artisanal curation in every box</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-[#b90538] shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm text-stone-900 font-bold">Bespoke Engraving</h4>
              <p className="text-xs text-stone-500 mt-0.5">Gold foil, deboss &amp; custom script</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-[#b90538] shrink-0">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm text-stone-900 font-bold">Luxury Unboxing</h4>
              <p className="text-xs text-stone-500 mt-0.5">Signature satin ribbon &amp; wax seal</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-[#b90538] shrink-0">
              <Heart className="w-6 h-6 fill-rose-500/20" />
            </div>
            <div>
              <h4 className="text-sm text-stone-900 font-bold">Love Guarantee</h4>
              <p className="text-xs text-stone-500 mt-0.5">Flawless delivery &amp; satisfaction</p>
            </div>
          </div>
        </div>

        {/* Narrative & Atelier Links */}
        <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex flex-col gap-1">
            <span className="font-serif-luxury text-xl font-bold text-stone-900">
              Creaciones Ya&amp;Fe
            </span>
            <p className="text-xs sm:text-sm text-stone-600">
              Elevating heartfelt moments into timeless keepsake heirlooms.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-stone-600 font-medium">
            <a href="#artisan-story" className="hover:text-[#b90538] transition-colors">
              Artisan Story
            </a>
            <a href="#concierge" className="hover:text-[#b90538] transition-colors">
              Gift Concierge
            </a>
            <a href="#care" className="hover:text-[#b90538] transition-colors">
              Care &amp; Craft
            </a>
            <a href="#privacy" className="hover:text-[#b90538] transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 pt-8 border-t border-rose-100/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-medium">
          <p>© 2025 Creaciones Ya&amp;Fe Atelier. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Handcrafted with <Heart className="w-3.5 h-3.5 text-[#b90538] fill-[#b90538]" /> for treasured memories
          </p>
        </div>
      </div>
    </footer>
  );
}
