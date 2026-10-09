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
import { Product, ProductCustomization } from './types';

export default function App() {
  const [selectedProductId, setSelectedProductId] = useState<string>('tumbler-sip');
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  
  // Checkout Directo (Sin Carrito)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);
  const [checkoutCustomization, setCheckoutCustomization] = useState<ProductCustomization | null>(null);
  const [checkoutQuantity, setCheckoutQuantity] = useState(1);

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
  };

  const handleProceedToCheckout = (product: Product, customization: ProductCustomization, quantity: number) => {
    setCheckoutProduct(product);
    setCheckoutCustomization(customization);
    setCheckoutQuantity(quantity);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7F5] text-stone-800 font-sans">
      <AmbientBackground />
      
      {isAdminOpen ? (
        <AdminPanel onBackToStore={() => setIsAdminOpen(false)} />
      ) : (
        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar onSelectProduct={handleSelectProduct} onOpenAdmin={() => setIsAdminOpen(true)} />
          <main className="flex-1">
            <HeroSection onCustomizeTumbler={() => handleSelectProduct('tumbler-sip')} onCustomizeApron={() => handleSelectProduct('apron-artisan')} />
            <LiveCustomizer selectedProductId={selectedProductId} onSelectProduct={handleSelectProduct} onProceedToCheckout={handleProceedToCheckout} />
            <CatalogSection onSelectProductToCustomize={handleSelectProduct} />
            <DistinctionBanner />
          </main>
          <Footer onOpenAdmin={() => setIsAdminOpen(true)} />
        </div>
      )}

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={checkoutProduct}
        customization={checkoutCustomization}
        quantity={checkoutQuantity}
      />
    </div>
  );
}
