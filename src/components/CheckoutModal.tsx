import React, { useState } from 'react';
import { X, Check, MessageCircle, Phone, User, Sparkles } from 'lucide-react';
import { Product, ProductCustomization, Order } from '../types';
import { FONT_OPTIONS } from '../data/fonts';
import { addOrderToFirestore } from '../services/firebase';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  customization: ProductCustomization | null;
  quantity: number;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, product, customization, quantity }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerWhatsApp, setCustomerWhatsApp] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState('');
  const [formError, setFormError] = useState('');

  if (!isOpen || !product || !customization) return null;

  const total = product.basePrice * quantity;

  const handleCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerWhatsApp.trim()) {
      setFormError('Por favor ingresa tu nombre y WhatsApp.');
      return;
    }

    setIsCheckingOut(true);
    const orderData = {
      product: product.name,
      price: total,
      customization: {
        text: customization.customText,
        color: customization.textColor,
        font: customization.fontId
      },
      customer: {
        name: customerName,
        whatsapp: customerWhatsApp,
        address: 'Retiro en Atelier',
        deliveryDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
        giftNote: orderNotes
      },
      mailchimpSubscribed: true,
      status: 'Pending' as const,
      createdAt: new Date().toISOString()
    };

    try {
      const newId = await addOrderToFirestore(orderData);
      setCreatedOrderId(newId);
      setOrderComplete(true);
    } catch (error) {
      setFormError('Hubo un error al procesar el pedido.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const openWhatsAppDirect = () => {
    const msg = encodeURIComponent(`Hola, acabo de realizar el pedido #${createdOrderId} a nombre de ${customerName}. Quiero confirmar los detalles de mi ${product.name}.`);
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 bg-stone-100 rounded-full">
          <X className="w-5 h-5" />
        </button>

        {orderComplete ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-stone-900">¡Pedido Confirmado!</h3>
            <p className="text-stone-600 mt-2">Folio de seguimiento: <strong>#{createdOrderId}</strong></p>
            <button onClick={openWhatsAppDirect} className="mt-6 w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold py-4 rounded-full hover:bg-emerald-700">
              <MessageCircle className="w-5 h-5" /> Confirmar por WhatsApp
            </button>
          </div>
        ) : (
          <div>
            <h3 className="text-2xl font-serif text-stone-900 mb-6 border-b pb-4">Detalles de Entrega</h3>
            
            <div className="bg-stone-50 p-4 rounded-xl mb-6 border border-stone-200">
              <p className="font-bold text-stone-800">{product.name} (x{quantity})</p>
              <p className="text-sm text-[#b90538]">"{customization.customText}"</p>
              <p className="text-xl font-bold mt-2">${total.toFixed(2)}</p>
            </div>

            <form onSubmit={handleCompleteOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Tu Nombre Completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                  <input type="text" required value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-xl" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">WhatsApp</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                  <input type="tel" required value={customerWhatsApp} onChange={(e) => setCustomerWhatsApp(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-xl" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Notas Especiales</label>
                <input type="text" value={orderNotes} onChange={(e) => setOrderNotes(e.target.value)} placeholder="Ej. Para regalo de cumpleaños" className="w-full px-4 py-2 border rounded-xl" />
              </div>
              {formError && <p className="text-red-500 text-xs">{formError}</p>}
              
              <button type="submit" disabled={isCheckingOut} className="w-full bg-[#1a2b4c] text-white font-bold py-4 rounded-full mt-4 flex justify-center gap-2">
                <Sparkles className="w-4 h-4" /> Finalizar Pedido (${total.toFixed(2)})
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
