import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, ColorSwatch, FontOption, Order } from '../types';
import { addOrderToFirestore, handleMailchimpSync } from '../services/firebase';
import {
  X,
  CheckCircle2,
  Lock,
  Calendar,
  Phone,
  User,
  MapPin,
  Mail,
  Heart,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  customText: string;
  color: ColorSwatch;
  font: FontOption;
  onOrderCompleted: () => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  product,
  customText,
  color,
  font,
  onOrderCompleted
}: CheckoutModalProps) {
  // Form fields
  const [fullName, setFullName] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  // Set default date +3 days from now
  const defaultDate = new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0];
  const [deliveryDate, setDeliveryDate] = useState(defaultDate);
  const [giftNote, setGiftNote] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(true);

  // States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccessId, setOrderSuccessId] = useState<string | null>(null);

  const totalPrice = product.price + 5.0 + 3.0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim() || !deliveryDate) {
      return;
    }

    setIsSubmitting(true);

    try {
      const fullWhatsApp = `${countryCode} ${phone.trim()}`;

      // Firestore strict schema
      const orderData: Omit<Order, 'id'> = {
        product: product.name,
        price: totalPrice,
        customization: {
          text: customText.trim() || 'Mama & Sofia Est. 2024',
          color: color.hex,
          colorName: color.name,
          font: font.fontFamily,
          fontName: font.name
        },
        customer: {
          name: fullName.trim(),
          whatsapp: fullWhatsApp,
          address: address.trim(),
          deliveryDate: deliveryDate,
          giftNote: giftNote.trim() || undefined
        },
        mailchimpSubscribed: newsletterSubscribed,
        status: 'Pending',
        createdAt: new Date().toISOString()
      };

      // Call Firestore write
      const newOrderId = await addOrderToFirestore(orderData);

      // Call simulated Mailchimp
      handleMailchimpSync(fullWhatsApp, newsletterSubscribed);

      setOrderSuccessId(newOrderId);
      onOrderCompleted();
    } catch (err) {
      console.error('Failed placing order', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinishAndClose = () => {
    setOrderSuccessId(null);
    setFullName('');
    setPhone('');
    setAddress('');
    setGiftNote('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/40 backdrop-blur-md transition-opacity">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-rose-100 p-6 sm:p-8 max-h-[92vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={handleFinishAndClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {orderSuccessId ? (
          /* Order Success Screen */
          <div className="flex flex-col items-center justify-center text-center py-6 px-2 gap-4">
            <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center text-[#b90538] mb-1 shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="px-4 py-1 rounded-full bg-rose-50 text-[#b90538] text-xs font-bold border border-rose-200">
              Commission Order Confirmed
            </span>

            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900">
              Thank You for Your Trust
            </h3>

            <p className="text-sm sm:text-base text-stone-600 max-w-md leading-relaxed">
              Our atelier team is already preparing your bespoke keepsake. Your commission docket has been recorded under reference:
            </p>

            <div className="px-6 py-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center gap-3">
              <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
                Atelier Reference:
              </span>
              <span className="text-xl font-mono font-bold text-[#b90538]">
                #{orderSuccessId}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100 text-xs sm:text-sm text-stone-700 max-w-md text-left flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#b90538] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-stone-900">WhatsApp Atelier Ping Sent</p>
                <p className="text-stone-600 mt-0.5">
                  A high-resolution embroidery preview and tracking link will be sent to your WhatsApp number before boxing.
                </p>
              </div>
            </div>

            <button
              onClick={handleFinishAndClose}
              className="mt-4 px-8 py-3.5 rounded-full bg-[#b90538] text-white text-sm font-semibold hover:bg-[#dc2c4f] shadow-md transition-all flex items-center gap-2"
            >
              <span>Return to Atelier Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <>
            {/* Modal Header */}
            <div className="flex items-start gap-4 pb-6 border-b border-rose-100/60">
              <div className="w-14 h-14 rounded-2xl bg-stone-50 border border-stone-200/60 p-1.5 shrink-0 flex items-center justify-center overflow-hidden">
                <img
                  src={product.mockupImage || product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col pr-6">
                <span className="text-xs uppercase tracking-wider text-[#b90538] font-bold">
                  Creaciones Ya&amp;Fe Atelier
                </span>
                <h2 className="font-serif-luxury text-xl sm:text-2xl text-stone-900 font-bold leading-snug">
                  Finalize Bespoke Commission
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-0.5 truncate max-w-md">
                  {product.name} • «{customText.trim() || 'Mama & Sofia Est. 2024'}» • {color.name}
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="client-full-name" className="text-xs font-bold text-stone-800 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#b90538]" />
                    <span>Full Name</span>
                    <span className="text-[#b90538]">*</span>
                  </label>
                  <input
                    id="client-full-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Isabella Montgomery"
                    className="w-full px-4 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#b90538]/40 transition-all"
                  />
                </div>

                {/* WhatsApp Phone */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="client-phone-input" className="text-xs font-bold text-stone-800 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#b90538]" />
                    <span>WhatsApp Number</span>
                    <span className="text-[#b90538]">*</span>
                  </label>
                  <div className="flex rounded-2xl bg-stone-50 border border-stone-200 overflow-hidden focus-within:ring-2 focus-within:ring-[#b90538]/40">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="bg-transparent px-3 py-2.5 text-xs font-bold text-stone-800 border-r border-stone-200 focus:outline-none cursor-pointer"
                    >
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+1 (809)">🇩🇴 +1 (809)</option>
                      <option value="+1 (829)">🇩🇴 +1 (829)</option>
                      <option value="+52">🇲🇽 +52</option>
                      <option value="+34">🇪🇸 +34</option>
                      <option value="+44">🇬🇧 +44</option>
                    </select>
                    <input
                      id="client-phone-input"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="210-833-1766"
                      className="w-full px-3 py-2.5 bg-transparent text-stone-900 text-sm focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="client-address-input" className="text-xs font-bold text-stone-800 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#b90538]" />
                  <span>Delivery Address</span>
                  <span className="text-[#b90538]">*</span>
                </label>
                <textarea
                  id="client-address-input"
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street address, apartment/suite, city, zip code, delivery notes..."
                  className="w-full px-4 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#b90538]/40 resize-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Desired Delivery Date */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="delivery-date-input" className="text-xs font-bold text-stone-800 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#b90538]" />
                    <span>Desired Delivery Date</span>
                    <span className="text-[#b90538]">*</span>
                  </label>
                  <input
                    id="delivery-date-input"
                    type="date"
                    required
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#b90538]/40 transition-all cursor-pointer"
                  />
                </div>

                {/* Calligraphy Dedication Note */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="gift-note-input" className="text-xs font-bold text-stone-800 flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-[#b90538]" />
                    <span>Calligraphy Card Dedication</span>
                  </label>
                  <input
                    id="gift-note-input"
                    type="text"
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    placeholder="e.g. With everlasting love on your day..."
                    className="w-full px-4 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#b90538]/40 transition-all"
                  />
                </div>
              </div>

              {/* Newsletter / Mailchimp Checkbox */}
              <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-rose-50/60 border border-rose-100 hover:bg-rose-50 cursor-pointer transition-colors mt-1">
                <input
                  type="checkbox"
                  checked={newsletterSubscribed}
                  onChange={(e) => setNewsletterSubscribed(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-[#b90538] focus:ring-[#b90538] accent-[#b90538] cursor-pointer"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-stone-900">
                    Subscribe to Creaciones Ya&amp;Fe Atelier Club
                  </span>
                  <span className="text-[11px] text-stone-500">
                    Receive seasonal heirloom collections, priority holiday slots, and gift inspirations.
                  </span>
                </div>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#b90538] to-[#dc2c4f] text-white font-bold text-base shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all flex items-center justify-center gap-2 mt-2"
              >
                {isSubmitting ? (
                  <span>Recording Commission...</span>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Confirm Order (${totalPrice.toFixed(2)})</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-stone-500 flex items-center justify-center gap-1">
                <Lock className="w-3.5 h-3.5 text-[#b90538]" />
                <span>Instant dispatch confirmation sent to manager Yndira and WhatsApp.</span>
              </p>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}
