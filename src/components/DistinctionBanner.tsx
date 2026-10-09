import React from 'react';
import { ShieldCheck, Sparkles, Coffee, Award, Gift, Leaf } from 'lucide-react';

export const DistinctionBanner: React.FC = () => {
  return (
    <section id="distinction" className="border-y border-stone-200/80 bg-[#F6EFE9]/60 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-widest text-[#B76E79] uppercase">
            The YA&FE Standard
          </span>
          <h2 className="mt-2 font-serif text-3xl font-normal text-stone-900 sm:text-4xl">
            Heirloom Craftsmanship in Every Detail
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            We reject mass-produced shortcuts. Every piece in our atelier is tailored from culinary-grade materials and laser-etched with enduring precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/80 border border-stone-200/60 shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FAF3EE] text-[#8C4E3A] mb-4">
              <Coffee className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-lg font-medium text-stone-900">
              18/8 Food-Grade Stainless
            </h3>
            <p className="mt-2 text-xs text-stone-600 leading-relaxed">
              Double-wall vacuum insulation maintains icy drinks chilled for 24 hours and espresso hot for 8 hours without exterior sweat.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/80 border border-stone-200/60 shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FAF3EE] text-[#8C4E3A] mb-4">
              <Leaf className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-lg font-medium text-stone-900">
              Pure Stonewashed Flax
            </h3>
            <p className="mt-2 text-xs text-stone-600 leading-relaxed">
              Our French linen aprons are pre-washed with natural pumice stones for ultra-soft drape, natural breathability, and antique brass details.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/80 border border-stone-200/60 shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FAF3EE] text-[#8C4E3A] mb-4">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-lg font-medium text-stone-900">
              Sub-Millimeter Laser Etching
            </h3>
            <p className="mt-2 text-xs text-stone-600 leading-relaxed">
              Permanent fiber laser technology cuts cleanly through powder coats, revealing pristine gleaming metal that will never peel or fade.
            </p>
          </div>

          {/* Card 4 */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/80 border border-stone-200/60 shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FAF3EE] text-[#8C4E3A] mb-4">
              <Gift className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-lg font-medium text-stone-900">
              Signature Gift Boxing
            </h3>
            <p className="mt-2 text-xs text-stone-600 leading-relaxed">
              Every order arrives nestled in luxury crinkled kraft paper, embossed silk ribbon, and custom dried botanical wax seal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
