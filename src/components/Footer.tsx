import React from 'react';
import { Heart, Sparkles, Mail, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="relative border-t border-stone-200/80 bg-[#FAF6F2] pt-14 pb-8 text-stone-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-2xl font-normal text-stone-900">YA&FE</span>
              <span className="text-xs font-semibold tracking-widest text-[#B76E79] uppercase">
                Atelier
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-stone-600">
              A bespoke studio dedicated to personalized keepsakes, culinary linen wear, and everyday luxury drinkware. Every name is etched with love and precision.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-stone-600 font-medium">
              <Sparkles className="h-3.5 w-3.5 text-[#B76E79]" />
              <span>Est. 2024 • Handcrafted Studio</span>
            </div>
          </div>

          {/* Product Care */}
          <div>
            <h4 className="text-xs font-semibold tracking-wider text-stone-900 uppercase mb-3">
              Atelier Care Guide
            </h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <strong className="text-stone-800">Stainless Tumbler:</strong> Hand wash with mild soap and warm water. Do not microwave.
              </li>
              <li>
                <strong className="text-stone-800">Flax Linen Aprons:</strong> Machine wash gentle on cold, tumble dry low or line dry in shade for softened drape.
              </li>
              <li>
                <strong className="text-stone-800">Laser Inscriptions:</strong> Permanent fiber laser etching will never chip, flake, or wash off.
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold tracking-wider text-stone-900 uppercase mb-3">
              Explore Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <a href="#customizer" className="hover:text-stone-900 transition-colors">
                  The All-Day Sip 20oz Tumbler
                </a>
              </li>
              <li>
                <a href="#customizer" className="hover:text-stone-900 transition-colors">
                  The French Bistro Linen Apron
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-stone-900 transition-colors">
                  The Parisian Market Canvas Tote
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-stone-900 transition-colors">
                  Gift Sets & Bridal Party Bundles
                </a>
              </li>
            </ul>
          </div>

          {/* Studio Newsletter */}
          <div>
            <h4 className="text-xs font-semibold tracking-wider text-stone-900 uppercase mb-3">
              Atelier Correspondence
            </h4>
            <p className="text-xs text-stone-600 mb-3">
              Receive seasonal edition releases, new typography drops, and private studio discounts.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Merci! You have been subscribed to YA&FE Atelier letters.'); }} className="flex gap-2">
              <input
                type="email"
                placeholder="atelier@domain.com"
                required
                className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-xs text-stone-800 placeholder-stone-400 focus:border-stone-500 focus:outline-hidden"
              />
              <button
                type="submit"
                className="rounded-xl bg-stone-900 px-3.5 py-2 text-xs font-medium text-white hover:bg-stone-800 transition-colors shrink-0"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-stone-200/80 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-600 gap-4">
          <div className="flex items-center gap-3">
            <p>© {new Date().getFullYear()} YA&FE ATELIER. All rights reserved.</p>
            {onOpenAdmin && (
              <>
                <span>•</span>
                <button
                  onClick={onOpenAdmin}
                  className="flex items-center gap-1 text-[#8C4E3A] hover:underline cursor-pointer"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Portal Administrador</span>
                </button>
              </>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs">
            <span>Crafted with</span>
            <Heart className="h-3 w-3 text-[#B76E79] fill-[#B76E79]" />
            <span>for Mama & Sofia • Est. 2024</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
