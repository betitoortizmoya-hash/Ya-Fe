import React from 'react';

export default function DistinctionBanner() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 my-8 sm:my-14">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#faf2ee] via-[#fff8f5] to-[#f4ece8] p-8 lg:p-14 shadow-xs border border-rose-100/70">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-pink-200/40 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-[#b90538] font-bold">
              The Ya&amp;Fe Distinction
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-normal text-stone-900 leading-tight">
              Precision Craft Meets Human Devotion
            </h2>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2 bg-white/95 p-6 rounded-2xl shadow-xs border border-rose-50 hover:border-rose-100 transition-all">
              <span className="font-serif-luxury text-2xl font-semibold text-[#b90538]">
                01
              </span>
              <h3 className="text-base font-bold text-stone-900">
                Curated Textiles &amp; Metals
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed font-sans">
                We source 100% heavy cotton canvas, velvet weaves, and kitchen-grade insulated stainless steel.
              </p>
            </div>

            <div className="flex flex-col gap-2 bg-white/95 p-6 rounded-2xl shadow-xs border border-rose-50 hover:border-rose-100 transition-all">
              <span className="font-serif-luxury text-2xl font-semibold text-[#b90538]">
                02
              </span>
              <h3 className="text-base font-bold text-stone-900">
                Micro-Precision Threading
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed font-sans">
                High-density Madeira embroidery silks and ultra-fine fiber laser engraving ensure everlasting durability.
              </p>
            </div>

            <div className="flex flex-col gap-2 bg-white/95 p-6 rounded-2xl shadow-xs border border-rose-50 hover:border-rose-100 transition-all">
              <span className="font-serif-luxury text-2xl font-semibold text-[#b90538]">
                03
              </span>
              <h3 className="text-base font-bold text-stone-900">
                Signature Unboxing
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed font-sans">
                Sealed with authentic crimson wax seals, satin ribbon pulls, and customized hot-stamped cards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
