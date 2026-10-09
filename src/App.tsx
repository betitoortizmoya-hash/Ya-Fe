import React, { useState } from 'react';
import { AmbientBackground } from './components/AmbientBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LiveCustomizer } from './components/LiveCustomizer';
import { CatalogSection } from './components/CatalogSection';
import { DistinctionBanner } from './components/DistinctionBanner';
import { Footer } from './components/Footer';
import { CheckoutModal } from './components/CheckoutModal';
import * as AdminModule from './components/AdminPanel';
import { CartItem, Product, ProductCustomization } from './types';

// Esto soluciona a la fuerza el error de MISSING_EXPORT que aparecía en rojo
const AdminPanel = (AdminModule as any).AdminPanel || (AdminModule as any).default;

export default function App() {
  const [selectedProductId, setSelectedProductId] = useState<string>('tumbler-sip');
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  
  // Checkout Directo (Sin Carrito)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
  };

  const handleProceedToCheckout = (product: Product, customization: ProductCustomization, quantity: number) => {
    const newItem: CartItem = {
      cartId: `cart-${Date.now()}`,
      product,
      customization,
      quantity,
      unitPrice: product.basePrice,
    };
    setCartItems([newItem]);
    setIsCheckoutOpen(true);
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
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
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
