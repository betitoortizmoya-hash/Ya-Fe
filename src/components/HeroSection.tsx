import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Coffee } from 'lucide-react';

interface HeroSectionProps {
  onCustomizeTumbler: () => void;
  onCustomizeApron: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onCustomizeTumbler,
  onCustomizeApron,
}) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-12 lg:pt-10 lg:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left Column: Brand Story & High-Impact Typography */}
          <div className="flex flex-col items-center text-center lg:col-span-6 lg:items-start lg:text-left">
            {/* Atelier Crest Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D9BEB0] bg-[#FAF3EE] px-4 py-1.5 text-xs font-semibold tracking-widest text-[#8C4E3A] uppercase">
              <Sparkles className="h-3.5 w-3.5 text-[#B76E79]" />
              <span>YA&FE Atelier • Est. 2024</span>
            </div>

            <h1 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] text-stone-900 tracking-tight">
              Moments Engraved in{' '}
              <span className="italic font-serif text-[#B76E79]">Timeless Elegance.</span>
            </h1>

            <p className="mt-4 max-w-xl text-base text-stone-600 sm:text-lg font-light leading-relaxed">
              Bespoke everyday treasures crafted for you. From our signature{' '}
              <strong className="font-medium text-stone-900">“The All-Day Sip”</strong> double-wall insulated coffee tumbler to heirloom{' '}
              <strong className="font-medium text-stone-900">stonewashed linen aprons</strong>, personalize your signature script with live interactive preview.
            </p>

            {/* Quick Action CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onCustomizeTumbler}
                className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-stone-900 px-7 py-3.5 text-sm font-medium text-white shadow-lg transition-all hover:bg-stone-800 hover:shadow-stone-900/20 active:scale-[0.98] cursor-pointer"
              >
                <span>Customize Coffee Tumbler</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onCustomizeApron}
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-stone-300 bg-white/90 px-7 py-3.5 text-sm font-medium text-stone-800 shadow-2xs hover:border-[#dfa398] hover:bg-white hover:text-[#b76e79] transition-all cursor-pointer"
              >
                <span>Design Linen Apron</span>
              </button>
            </div>

            {/* Atelier trust proof */}
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-stone-200/80 pt-6 text-left">
              <div>
                <span className="block font-serif text-xl sm:text-2xl font-medium text-stone-900">18/8</span>
                <span className="block text-[11px] text-stone-600">Vacuum Stainless</span>
              </div>
              <div>
                <span className="block font-serif text-xl sm:text-2xl font-medium text-stone-900">100%</span>
                <span className="block text-[11px] text-stone-600">French Flax Linen</span>
              </div>
              <div>
                <span className="block font-serif text-xl sm:text-2xl font-medium text-stone-900">17+</span>
                <span className="block text-[11px] text-stone-600">Artisan Fonts</span>
              </div>
            </div>
          </div>

          {/* Right Column: Signature Editorial Showcase Card (matching user reference image) */}
          <div className="relative lg:col-span-6">
            {/* Background Glow */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#F4DDD4] via-[#F8ECE8] to-[#EAE0D6] opacity-70 blur-2xl" />

            {/* Signature Showcase Card */}
            <div className="relative overflow-hidden rounded-3xl border border-stone-200/90 bg-white p-6 shadow-2xl">
              {/* Top Banner inside card matching user's photo text */}
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <div>
                  <h4 className="font-serif text-2xl font-medium text-stone-900">
                    Mama & Sofia
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-semibold tracking-widest text-[#B76E79] uppercase">
                      Est. 2024
                    </span>
                    <span className="text-stone-300">•</span>
                    <span className="text-xs font-medium text-stone-600 uppercase tracking-widest">
                      YA&FE ATELIER
                    </span>
                  </div>
                </div>
                <span className="rounded-full bg-[#FAF3EE] px-3 py-1 text-xs font-medium text-[#8C4E3A] border border-[#E8D5B5]">
                  Signature Piece
                </span>
              </div>

              {/* Lifestyle Mockup Center Scene */}
              <div className="relative my-4 flex h-72 sm:h-80 items-center justify-center rounded-2xl bg-gradient-to-b from-[#FAF6F2] to-[#F1E8DF] p-4 overflow-hidden border border-stone-100">
                {/* Marble tray base */}
                <div className="absolute inset-x-6 bottom-4 h-16 rounded-2xl bg-gradient-to-r from-[#FAF2EF] via-[#F7ECE8] to-[#EFE2DC] shadow-md border-t border-white" />

                {/* Botanical leaves accents */}
                <div className="absolute bottom-6 left-8 text-[#8B9884] opacity-70">
                  <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
                    <path d="M 0 25 Q 30 15 50 20" stroke="#7A8775" strokeWidth="2" />
                    <ellipse cx="15" cy="18" rx="8" ry="5" fill="#8E9C88" transform="rotate(-15 15 18)" />
                    <ellipse cx="35" cy="16" rx="9" ry="6" fill="#A1B09B" transform="rotate(20 35 16)" />
                  </svg>
                </div>
                <div className="absolute bottom-6 right-8 text-[#8B9884] opacity-70">
                  <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
                    <path d="M 50 25 Q 20 15 0 20" stroke="#7A8775" strokeWidth="2" />
                    <ellipse cx="35" cy="18" rx="8" ry="5" fill="#8E9C88" transform="rotate(15 35 18)" />
                    <ellipse cx="15" cy="16" rx="9" ry="6" fill="#A1B09B" transform="rotate(-20 15 16)" />
                  </svg>
                </div>

                {/* Tumbler render preview */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative h-64 w-32 drop-shadow-2xl">
                    {/* Metal Straw */}
                    <div className="absolute -top-6 right-8 h-10 w-1.5 -rotate-12 rounded-full bg-gradient-to-b from-stone-200 via-white to-stone-400" />
                    {/* Clear Lid */}
                    <div className="absolute top-2 left-1/2 h-4 w-28 -translate-x-1/2 rounded-t-xl bg-white/70 border border-white backdrop-blur-xs shadow-xs" />
                    {/* Stainless Top Rim */}
                    <div className="absolute top-5 left-1/2 h-2 w-28 -translate-x-1/2 bg-gradient-to-r from-stone-300 via-white to-stone-400" />
                    {/* Tumbler Body */}
                    <div
                      className="absolute top-6 left-1/2 h-52 w-28 -translate-x-1/2 rounded-b-2xl shadow-xl flex items-center justify-center overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #dfa398 0%, #d8968b 45%, #b76e79 100%)',
                      }}
                    >
                      {/* Cylindrical Highlight */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-white/35 to-black/35 pointer-events-none" />

                      {/* Laser Engraved Name vertically: Alexandra */}
                      <div
                        className="relative z-10 text-2xl text-[#3E2723] font-normal drop-shadow-xs"
                        style={{
                          fontFamily: "'Alex Brush', cursive",
                          writingMode: 'vertical-rl',
                          textOrientation: 'mixed',
                          transform: 'rotate(180deg)',
                        }}
                      >
                        Alexandra
                      </div>
                    </div>
                    {/* Stainless Bottom Rim */}
                    <div className="absolute bottom-6 left-1/2 h-2 w-24 -translate-x-1/2 rounded-b-lg bg-gradient-to-r from-stone-300 via-white to-stone-400" />
                  </div>
                </div>
              </div>

              {/* Floating feature chip */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-xs text-stone-600">
                  <Coffee className="h-4 w-4 text-[#B76E79]" />
                  <span>The All-Day Sip • 20oz Vacuum Insulated Tumbler</span>
                </div>
                <button
                  onClick={onCustomizeTumbler}
                  className="text-xs font-semibold text-[#8C4E3A] hover:text-[#5E3122] transition-colors cursor-pointer"
                >
                  Customize This Piece →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
