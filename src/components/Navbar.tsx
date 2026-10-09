import React, { useState } from 'react';
import { Sparkles, ShoppingBag, User, Menu, X, Heart } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'catalog' | 'customizer' | 'admin';
  setActiveTab: (tab: 'home' | 'catalog' | 'customizer' | 'admin') => void;
  orderCount?: number;
}

export default function Navbar({ activeTab, setActiveTab, orderCount = 2 }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'catalog', label: 'Catalog' },
    { id: 'customizer', label: 'Live Customizer' },
    { id: 'admin', label: 'Admin Panel' }
  ] as const;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(244,63,94,0.06)] border-b border-rose-100/60 transition-all">
      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-6">
        {/* Brand Logo */}
        <button
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 shrink-0 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-100 to-pink-50 flex items-center justify-center text-[#b90538] border border-rose-200/60 shadow-sm group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 fill-rose-500/20 text-[#b90538]" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif-luxury text-xl md:text-2xl tracking-tight text-[#b90538] font-bold">
              Creaciones Ya&amp;Fe
            </span>
            <span className="text-[11px] tracking-widest uppercase text-stone-500 font-medium -mt-1 font-sans">
              Atelier de Cadeaux
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-sans">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`text-sm font-semibold transition-colors relative py-1 focus:outline-none ${
                  isActive
                    ? 'text-[#b90538]'
                    : 'text-stone-600 hover:text-[#b90538]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#b90538] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Desktop CTA & Actions */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <button
            onClick={() => {
              setActiveTab('customizer');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#b90538] to-[#dc2c4f] text-white text-sm font-semibold hover:shadow-[0_10px_24px_-4px_rgba(185,5,56,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4" />
            <span>Create Gift</span>
          </button>

          {/* Bag Button */}
          <button
            onClick={() => {
              setActiveTab('customizer');
            }}
            aria-label="View shopping basket"
            className="relative p-2.5 rounded-full text-stone-600 hover:text-[#b90538] hover:bg-rose-50 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#a43073] text-white text-[10px] font-bold">
              {orderCount}
            </span>
          </button>

          {/* Admin / Profile Button */}
          <button
            onClick={() => {
              setActiveTab('admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            title="Open Atelier Admin Panel"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              activeTab === 'admin'
                ? 'bg-[#b90538] text-white ring-2 ring-rose-300 ring-offset-2'
                : 'bg-rose-100 text-[#b90538] hover:bg-rose-200'
            }`}
          >
            <User className="w-4 h-4" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-stone-700 hover:bg-rose-50 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 border-b border-rose-100 px-6 py-4 shadow-xl">
          <div className="flex flex-col gap-3 font-sans">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`text-left py-2.5 px-3 rounded-xl text-base font-semibold transition-colors ${
                  activeTab === item.id
                    ? 'bg-rose-50 text-[#b90538]'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setActiveTab('customizer');
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mt-2 w-full py-3 rounded-full bg-gradient-to-r from-[#b90538] to-[#dc2c4f] text-white font-semibold text-center flex items-center justify-center gap-2 shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Customizer</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
