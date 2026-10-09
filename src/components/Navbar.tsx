import React from 'react';
import { ShoppingBag, Sparkles, Heart, Menu, X, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onSelectProduct: (productId: string) => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onSelectProduct,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const scrollToCustomizer = (productId?: string) => {
    if (productId) {
      onSelectProduct(productId);
    }
    const el = document.getElementById('customizer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-[#FAF7F5]/90 backdrop-blur-md transition-all">
      {/* Top micro-announcement banner */}
      <div className="bg-[#4A3B32] py-1.5 px-4 text-center text-[11px] font-medium tracking-widest uppercase text-[#F2E5D9]">
        <span>✨ Complimentary Bespoke Engraving & Gift Box on all Studio Orders ✨</span>
      </div>

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 text-stone-700 lg:hidden"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Brand Logo & Monogram */}
        <div className="flex flex-col items-center sm:items-start cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="flex items-center gap-1.5">
            <span className="font-serif text-2xl sm:text-3xl font-normal tracking-wider text-stone-900">
              YA&FE
            </span>
            <span className="text-xs font-semibold tracking-widest text-[#B76E79] uppercase">
              Atelier
            </span>
          </div>
          <span className="text-[10px] tracking-[0.25em] uppercase text-stone-600 hidden sm:block">
            Bespoke Keepsakes & Studio
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-8 text-xs font-semibold uppercase tracking-wider text-stone-600">
          <button
            onClick={() => scrollToCustomizer('tumbler-sip')}
            className="hover:text-stone-900 transition-colors cursor-pointer"
          >
            Coffee Tumblers
          </button>
          <button
            onClick={() => scrollToCustomizer('apron-artisan')}
            className="hover:text-stone-900 transition-colors cursor-pointer"
          >
            Linen Aprons
          </button>
          <button
            onClick={scrollToCatalog}
            className="hover:text-stone-900 transition-colors cursor-pointer"
          >
            Full Catalog
          </button>
          <a
            href="#distinction"
            className="hover:text-stone-900 transition-colors cursor-pointer"
          >
            Our Craft
          </a>
        </div>

        {/* Right Action Icons: Customizer jump, Admin & Cart */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={onOpenAdmin}
            title="Panel de Administrador (Pedidos y WhatsApp)"
            className="flex items-center gap-1.5 rounded-full border border-stone-300/80 bg-white/90 px-3 py-1.5 text-xs font-semibold tracking-wide text-stone-700 shadow-2xs hover:border-[#8C4E3A] hover:text-[#8C4E3A] transition-all cursor-pointer"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-[#8C4E3A]" />
            <span className="hidden sm:inline">Admin</span>
          </button>

          <button
            onClick={() => scrollToCustomizer()}
            className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-white/90 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-stone-800 shadow-2xs hover:border-[#dfa398] hover:text-[#b76e79] transition-all cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#B76E79]" />
            <span>Open Customizer</span>
          </button>

          <button
            onClick={onOpenCart}
            aria-label="View Shopping Cart"
            className="relative flex items-center gap-2 rounded-full bg-stone-900 px-3.5 py-2 text-xs font-medium text-white shadow-md transition-all hover:bg-stone-800 active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Bag</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#dfa398] text-[11px] font-bold text-stone-900">
              {cartCount}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-stone-200 bg-[#FAF7F5] px-4 py-4 lg:hidden space-y-3 text-sm font-medium text-stone-700">
          <button
            onClick={() => scrollToCustomizer('tumbler-sip')}
            className="block w-full text-left py-2 hover:text-[#b76e79]"
          >
            ☕ The All-Day Sip Coffee Tumbler
          </button>
          <button
            onClick={() => scrollToCustomizer('apron-artisan')}
            className="block w-full text-left py-2 hover:text-[#b76e79]"
          >
            👩‍🍳 Artisan Stonewashed Linen Apron
          </button>
          <button
            onClick={scrollToCatalog}
            className="block w-full text-left py-2 hover:text-[#b76e79]"
          >
            Catalog & All Products
          </button>
          <button
            onClick={() => {
              onOpenAdmin();
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 w-full text-left py-2 text-[#8C4E3A] font-semibold border-t border-stone-200/80 pt-3"
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Portal de Administrador (Pedidos & WhatsApp)</span>
          </button>
          <button
            onClick={() => scrollToCustomizer()}
            className="w-full mt-2 rounded-xl bg-stone-900 py-2.5 text-center text-white"
          >
            Start Customizing Now
          </button>
        </div>
      )}
    </header>
  );
};
