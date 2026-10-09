/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AmbientBackground } from './components/AmbientBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LiveCustomizer } from './components/LiveCustomizer';
import { CatalogSection } from './components/CatalogSection';
import { DistinctionBanner } from './components/DistinctionBanner';
import { Footer } from './components/Footer';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminPanel } from './components/AdminPanel';
import { CartItem, Product, ProductCustomization } from './types';
import { PRODUCTS } from './data/products';

export default function App() {
  const [selectedProductId, setSelectedProductId] = useState<string>('tumbler-sip');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Initial sample personalized item matching the user's reference!
    {
      cartId: 'item-demo-1',
      product: PRODUCTS[0], // The All-Day Sip Tumbler
      customization: {
        productId: 'tumbler-sip',
        productType: 'tumbler',
        customText: 'Alexandra',
        secondaryText: 'Mama & Sofia Est. 2024',
        fontId: 'alex-brush',
        productColor: '#DFA398',
        textColor: '#4A3428',
        textPlacement: 'vertical',
        fontSize: 3,
        backgroundImageUrl: null,
        selectedPatternId: 'rose-marble',
      },
      quantity: 1,
      unitPrice: 38,
    },
  ]);

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
  };

  const handleAddToCart = (product: Product, customization: ProductCustomization, quantity: number) => {
    const newItem: CartItem = {
      cartId: `cart-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      product,
      customization,
      quantity,
      unitPrice: product.basePrice,
    };
    setCartItems((prev) => [newItem, ...prev]);
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToCustomizer = (productId: string) => {
    setSelectedProductId(productId);
    const el = document.getElementById('customizer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative min-h-screen bg-[#FAF7F5] text-stone-800 font-sans selection:bg-[#E8D3C8] selection:text-stone-900">
      {/* 1. Subtle, lightweight, delicate floating floral petal ambient breeze background */}
      <AmbientBackground />

      {/* 2. Main Atelier Store Layout */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Navigation Bar */}
        <Navbar
          cartCount={totalCartCount}
          onOpenCart={() => setIsCartOpen(true)}
          onSelectProduct={handleSelectProduct}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Main Content Areas */}
        <main className="flex-1">
          {/* Lifestyle Hero with Editorial Showcase */}
          <HeroSection
            onCustomizeTumbler={() => scrollToCustomizer('tumbler-sip')}
            onCustomizeApron={() => scrollToCustomizer('apron-artisan')}
          />

          {/* Interactive Live Customizer Studio */}
          <LiveCustomizer
            selectedProductId={selectedProductId}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
          />

          {/* Curated Product Catalog */}
          <CatalogSection
            onSelectProductToCustomize={(id) => {
              setSelectedProductId(id);
            }}
          />

          {/* Atelier Craftsmanship & Materials */}
          <DistinctionBanner />
        </main>

        {/* Footer */}
        <Footer onOpenAdmin={() => setIsAdminOpen(true)} />
      </div>

      {/* 3. Shopping Bag & Checkout Drawer */}
      <CheckoutModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* 4. Atelier Administrator Management Portal */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}
