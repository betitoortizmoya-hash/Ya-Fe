import React from 'react';
import { Sparkles, Menu, X, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onSelectProduct: (productId: string) => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectProduct,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const scrollToCustomizer = (productId?: string) => {
    if (productId) onSelectProduct(productId);
    const el = document.getElementById('customizer');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-[#FAF7F5]/90 backdrop-blur-md transition-all">
      <div className="bg-[#4A3B32] py-1.5 px-4 text-center text-[11px] font-medium tracking-widest uppercase text-[#F2E5D9]">
        <span>✨ Grabado y Caja de Regalo de Cortesía en todos los pedidos ✨</span>
      </div>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-1.5 text-stone-700 lg:hidden">
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        
        <div className="flex flex-col items-center sm:items-start cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="flex items-center gap-1.5">
            <span className="font-serif text-2xl sm:text-3xl font-normal tracking-wider text-stone-900">YA&FE</span>
            <span className="text-xs font-semibold tracking-widest text-[#B76E79] uppercase">Atelier</span>
          </div>
          <span className="text-[10px] tracking-[0.25em] uppercase text-stone-600 hidden sm:block">Bespoke Keepsakes & Studio</span>
        </div>

        <div className="hidden lg:flex items-center space-x-8 text-xs font-semibold uppercase tracking-wider text-stone-600">
          <button onClick={() => scrollToCustomizer('tumbler-sip')} className="hover:text-stone-900 transition-colors cursor-pointer">Termos</button>
          <button onClick={() => scrollToCustomizer('apron-artisan')} className="hover:text-stone-900 transition-colors cursor-pointer">Mandiles</button>
          <button onClick={scrollToCatalog} className="hover:text-stone-900 transition-colors cursor-pointer">Catálogo</button>
        </div>

        <div className="flex items-center space-x-2.5">
          <button onClick={onOpenAdmin} className="flex items-center gap-1.5 rounded-full border border-stone-300/80 bg-white/90 px-3 py-1.5 text-xs font-semibold tracking-wide text-stone-700 shadow-sm hover:border-[#8C4E3A] hover:text-[#8C4E3A] transition-all cursor-pointer">
            <ShieldCheck className="h-3.5 w-3.5 text-[#8C4E3A]" />
            <span className="hidden sm:inline">Admin</span>
          </button>
          <button onClick={() => scrollToCustomizer()} className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-white/90 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-stone-800 shadow-sm hover:border-[#dfa398] hover:text-[#b76e79] transition-all cursor-pointer">
            <Sparkles className="h-3.5 w-3.5 text-[#B76E79]" />
            <span>Diseñar Ahora</span>
          </button>
        </div>
      </nav>
    </header>
  );
};
