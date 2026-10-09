import React, { useState } from 'react';
import { AmbientBackground } from './components/AmbientBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LiveCustomizer } from './components/LiveCustomizer';
import { CatalogSection } from './components/CatalogSection';
import { DistinctionBanner } from './components/DistinctionBanner';
import { Footer } from './components/Footer';
import { CheckoutModal } from './components/CheckoutModal';
import AdminPanel from './components/AdminPanel'; // Tu panel azul
import { CartItem, Product, ProductCustomization } from './types';

export default function App() {
  const [selectedProductId, setSelectedProductId] = useState<string>('tumbler-sip');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
  };

  // Reemplaza el carrito con solo la pieza actual y abre la caja directo
  const handleProceedToCheckout = (product: Product, customization: ProductCustomization, quantity: number) => {
    const newItem: CartItem = {
      cartId: `cart-${Date.now()}`,
      product,
      customization,
      quantity,
      unitPrice: product.basePrice,
    };
    setCartItems([newItem]);
    setIsCartOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7F5] text-stone-800 font-sans selection:bg-[#E8D3C8] selection:text-stone-900">
      <AmbientBackground />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar
          onSelectProduct={handleSelectProduct}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />
        <main className="flex-1">
          <HeroSection
            onCustomizeTumbler={() => handleSelectProduct('tumbler-sip')}
            onCustomizeApron={() => handleSelectProduct('apron-artisan')}
          />
          <LiveCustomizer
            selectedProductId={selectedProductId}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleProceedToCheckout}
          />
          <CatalogSection
            onSelectProductToCustomize={handleSelectProduct}
          />
          <DistinctionBanner />
        </main>
        <Footer onOpenAdmin={() => setIsAdminOpen(true)} />
      </div>

      <CheckoutModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={() => {}}
        onRemoveItem={() => {}}
        onClearCart={() => setCartItems([])}
      />

      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onBackToStore={() => setIsAdminOpen(false)}
      />
    </div>
  );
}
