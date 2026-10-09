import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AmbientBackground from './components/AmbientBackground';
import HeroSection from './components/HeroSection';
import DistinctionBanner from './components/DistinctionBanner';
import CatalogSection from './components/CatalogSection';
import LiveCustomizer from './components/LiveCustomizer';
import CheckoutModal from './components/CheckoutModal';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import { PRODUCTS, COLOR_SWATCHES, FONT_OPTIONS } from './data/products';
import { Product, ColorSwatch, FontOption } from './types';
import { subscribeToOrders } from './services/firebase';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'catalog' | 'customizer' | 'admin'>('home');
  const [orderCount, setOrderCount] = useState(2);

  // Customizer state
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [customText, setCustomText] = useState('Mama & Sofia Est. 2024');
  const [selectedColor, setSelectedColor] = useState<ColorSwatch>(COLOR_SWATCHES[0]);
  const [selectedFont, setSelectedFont] = useState<FontOption>(FONT_OPTIONS[0]);

  // Checkout modal
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Subscribe to orders count
  useEffect(() => {
    const unsub = subscribeToOrders((orders) => {
      setOrderCount(orders.length);
    });
    return () => unsub();
  }, []);

  const handleSelectProductForCustomizer = (product: Product) => {
    setSelectedProduct(product);
    setActiveTab('customizer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLaunchCustomizer = () => {
    setActiveTab('customizer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBrowseCatalog = () => {
    if (activeTab !== 'home') {
      setActiveTab('catalog');
    }
    const elem = document.getElementById('catalog-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8f5] text-stone-900 font-sans selection:bg-[#ffd8e7] selection:text-[#85145a] relative">
      {/* Soft Ambient Floating Orbs Background */}
      <AmbientBackground />

      {activeTab === 'admin' ? (
        /* Admin Suite Dashboard View */
        <AdminPanel onBackToStore={() => setActiveTab('home')} />
      ) : (
        /* Client Facing Boutique Storefront */
        <>
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            orderCount={orderCount}
          />

          <main className="relative z-10 pt-20">
            {activeTab === 'home' && (
              <>
                <HeroSection
                  onOpenCustomizer={handleLaunchCustomizer}
                  onBrowseCatalog={handleBrowseCatalog}
                />
                <DistinctionBanner />
                <CatalogSection
                  onSelectProductForCustomizer={handleSelectProductForCustomizer}
                  onLaunchCustomizer={handleLaunchCustomizer}
                />
              </>
            )}

            {activeTab === 'catalog' && (
              <div className="pt-6">
                <CatalogSection
                  onSelectProductForCustomizer={handleSelectProductForCustomizer}
                  onLaunchCustomizer={handleLaunchCustomizer}
                />
              </div>
            )}

            {activeTab === 'customizer' && (
              <LiveCustomizer
                selectedProduct={selectedProduct}
                onSelectProduct={setSelectedProduct}
                customText={customText}
                setCustomText={setCustomText}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                selectedFont={selectedFont}
                setSelectedFont={setSelectedFont}
                onProceedToCheckout={() => setIsCheckoutOpen(true)}
              />
            )}
          </main>

          <Footer />

          {/* Checkout Modal */}
          <CheckoutModal
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            product={selectedProduct}
            customText={customText}
            color={selectedColor}
            font={selectedFont}
            onOrderCompleted={() => {
              // Notification / badge update handled by reactive listener
            }}
          />
        </>
      )}
    </div>
  );
}
