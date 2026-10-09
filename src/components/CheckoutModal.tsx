import React, { useState } from 'react';
import {
  X,
  Trash2,
  ShoppingBag,
  Check,
  ArrowRight,
  ShieldCheck,
  Gift,
  MessageCircle,
  Phone,
  User,
  Sparkles
} from 'lucide-react';
import { CartItem, Order } from '../types';
import { FONT_OPTIONS } from '../data/fonts';
import { saveOrder } from '../services/orders';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Form fields requested by user: WhatsApp & Name
  const [customerName, setCustomerName] = useState('');
  const [customerWhatsApp, setCustomerWhatsApp] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const discount = promoApplied ? subtotal * 0.15 : 0;
  const shipping = subtotal > 75 || subtotal === 0 ? 0 : 7.95;
  const total = Math.max(0, subtotal - discount + shipping);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'ATELIER15' || promoCode.trim().toUpperCase() === 'WELCOME10') {
      setPromoApplied(true);
    } else {
      alert('Prueba el código: ATELIER15 para 15% de descuento en tu primera pieza.');
    }
  };

  const generateWhatsAppMessage = (order: Order) => {
    let msg = `✨ *NUEVO PEDIDO - YA&FE ATELIER* ✨\n\n`;
    msg += `📄 *Orden:* #${order.id}\n`;
    msg += `👤 *Cliente:* ${order.customerName}\n`;
    msg += `📱 *WhatsApp:* ${order.customerWhatsApp}\n\n`;
    msg += `🛍️ *PIEZAS PERSONALIZADAS:*\n`;

    order.items.forEach((item, index) => {
      const font = FONT_OPTIONS.find((f) => f.id === item.customization.fontId)?.name || item.customization.fontId;
      const textDesc = item.customization.customText?.trim()
        ? `“${item.customization.customText}” (Fuente: ${font})`
        : `[Sin Texto - Diseño liso / solo imagen de fondo]`;

      msg += `\n${index + 1}. *${item.product.name}* (x${item.quantity})\n`;
      msg += `   ✍️ *Grabado:* ${textDesc}\n`;
      if (item.customization.secondaryText?.trim()) {
        msg += `   🏷️ *Subtexto:* “${item.customization.secondaryText}”\n`;
      }
      msg += `   🎨 *Color base:* ${item.customization.productColor}\n`;
      if (item.customization.customText?.trim()) {
        msg += `   ✨ *Tono texto:* ${item.customization.textColor}\n`;
      }
      if (item.customization.backgroundImageUrl) {
        msg += `   🖼️ *Fondo:* [Imagen personalizada cargada plasmada tal cual]\n`;
      }
      msg += `   💵 *$${(item.unitPrice * item.quantity).toFixed(2)}*\n`;
    });

    if (order.notes) {
      msg += `\n📝 *Notas especiales:* ${order.notes}\n`;
    }

    msg += `\n💰 *Total a pagar:* $${order.total.toFixed(2)}\n`;
    msg += `\n_Enviado desde el estudio interactivo YA&FE Atelier_`;

    return encodeURIComponent(msg);
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim()) {
      setFormError('Por favor ingresa tu nombre completo.');
      return;
    }

    if (!customerWhatsApp.trim() || customerWhatsApp.trim().length < 8) {
      setFormError('Por favor ingresa tu número de WhatsApp válido (con lada si aplica).');
      return;
    }

    setFormError('');
    setIsCheckingOut(true);

    const newOrder: Order = {
      id: `YF-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: customerName.trim(),
      customerWhatsApp: customerWhatsApp.trim(),
      notes: orderNotes.trim() || undefined,
      items: [...cartItems],
      subtotal,
      shipping,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // Save into persistent store so Admin Panel displays it
    saveOrder(newOrder);

    setTimeout(() => {
      setIsCheckingOut(false);
      setCreatedOrder(newOrder);
      setOrderComplete(true);
      onClearCart();
    }, 900);
  };

  const openWhatsAppDirect = () => {
    if (!createdOrder) return;
    const msg = generateWhatsAppMessage(createdOrder);
    // Open WhatsApp with message
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  const resetAll = () => {
    setOrderComplete(false);
    setCreatedOrder(null);
    setCustomerName('');
    setCustomerWhatsApp('');
    setOrderNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-lg bg-[#FAF7F5] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="border-b border-stone-200/80 px-6 py-4 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-stone-900" />
                <h3 className="font-serif text-xl font-normal text-stone-900">
                  Tu Bolsa Atelier • YA&FE
                </h3>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div className="mt-2.5">
              <div className="flex justify-between text-[11px] font-medium text-stone-600 mb-1">
                <span>
                  {subtotal >= 75
                    ? '🎉 ¡Envío artesanal gratis desbloqueado!'
                    : `Agrega $${(75 - subtotal).toFixed(2)} más para Envío Gratis`}
                </span>
                <span>${subtotal.toFixed(0)} / $75</span>
              </div>
              <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#B76E79] transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / 75) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            {orderComplete && createdOrder ? (
              /* Success / WhatsApp Dispatch Screen */
              <div className="flex flex-col items-center justify-center text-center py-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 mb-3 shadow-inner">
                  <Check className="h-8 w-8" />
                </div>
                <h4 className="font-serif text-2xl font-medium text-stone-900">
                  ¡Pedido Registrado con Éxito!
                </h4>
                <p className="mt-1.5 text-xs text-stone-600 max-w-sm leading-relaxed">
                  Gracias <strong className="text-stone-900">{createdOrder.customerName}</strong>. Tu pedido ha sido guardado en el sistema del atelier. Para acelerar la producción de tu grabado, envíanos la confirmación directa a WhatsApp con un solo clic.
                </p>

                {/* Primary WhatsApp Action Button */}
                <button
                  onClick={openWhatsAppDirect}
                  className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-emerald-600 py-4 px-6 text-sm font-semibold text-white shadow-lg hover:bg-emerald-700 active:scale-[0.99] transition-all cursor-pointer"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Enviar Detalles a WhatsApp Ahora</span>
                </button>

                {/* Order Summary Receipt Box */}
                <div className="mt-5 rounded-2xl bg-white border border-stone-200 p-4 w-full text-left text-xs space-y-2">
                  <div className="flex justify-between text-stone-500">
                    <span>Folio de Pedido:</span>
                    <strong className="text-stone-900 font-mono">#{createdOrder.id}</strong>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>Cliente:</span>
                    <span className="text-stone-800 font-medium">{createdOrder.customerName}</span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>WhatsApp Registrado:</span>
                    <span className="text-stone-800 font-medium">{createdOrder.customerWhatsApp}</span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>Total:</span>
                    <strong className="text-emerald-700 font-serif text-sm">
                      ${createdOrder.total.toFixed(2)}
                    </strong>
                  </div>
                  <div className="flex justify-between text-stone-500 pt-1 border-t border-stone-100">
                    <span>Estado en Taller:</span>
                    <span className="text-amber-700 font-medium">Recibido • Pendiente de Confirmación</span>
                  </div>
                </div>

                <button
                  onClick={resetAll}
                  className="mt-5 w-full rounded-2xl border border-stone-300 bg-white py-3 text-xs font-semibold uppercase tracking-wider text-stone-800 hover:bg-stone-50 transition-colors"
                >
                  Seguir Diseñando en el Estudio
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-16">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-stone-400 mb-4">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <h4 className="font-serif text-xl font-normal text-stone-900">
                  Tu bolsa está vacía
                </h4>
                <p className="mt-1 text-xs text-stone-500 max-w-xs">
                  Elige un mandil, termo o taza en el estudio para personalizar con tu nombre y colores.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 rounded-full bg-stone-900 px-6 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-stone-800 cursor-pointer"
                >
                  Comenzar a Personalizar
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Cart Items List */}
                <div className="space-y-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 block">
                    Tus Diseños en Bolsa ({cartItems.length})
                  </span>
                  {cartItems.map((item) => {
                    const font = FONT_OPTIONS.find((f) => f.id === item.customization.fontId) || FONT_OPTIONS[0];

                    return (
                      <div
                        key={item.cartId}
                        className="rounded-2xl border border-stone-200/80 bg-white p-3.5 shadow-2xs"
                      >
                        <div className="flex gap-3">
                          {/* Thumbnail */}
                          <div
                            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl shadow-inner border border-stone-200 overflow-hidden"
                            style={{ backgroundColor: item.customization.productColor }}
                          >
                            {item.customization.backgroundImageUrl ? (
                              <img
                                src={item.customization.backgroundImageUrl}
                                alt="Custom wrap"
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span
                                className="text-xs font-bold text-center px-1"
                                style={{
                                  fontFamily: font.family,
                                  color: item.customization.textColor,
                                }}
                              >
                                {item.customization.customText?.slice(0, 5) || 'Y&F'}
                              </span>
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4 className="font-serif text-sm font-medium text-stone-900 truncate">
                                {item.product.name}
                              </h4>
                              <button
                                onClick={() => onRemoveItem(item.cartId)}
                                className="text-stone-400 hover:text-rose-500 p-1"
                                title="Eliminar pieza"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>

                            <div className="mt-1 space-y-0.5 text-[11px] text-stone-500">
                              {item.customization.customText?.trim() ? (
                                <>
                                  <p>
                                    Grabado/Bordado:{' '}
                                    <strong className="text-stone-800">
                                      “{item.customization.customText}”
                                    </strong>
                                  </p>
                                  <p>
                                    Tipografía: <span className="font-medium text-stone-700">{font.name}</span>
                                  </p>
                                </>
                              ) : (
                                <p className="text-emerald-700 font-medium">
                                  ✓ Sin texto (Diseño liso / Solo imagen)
                                </p>
                              )}
                              {item.customization.backgroundImageUrl && (
                                <p className="text-[#B76E79] font-medium">Fondo personalizado incluido (color real)</p>
                              )}
                            </div>

                            <div className="mt-2.5 flex items-center justify-between">
                              <div className="flex items-center rounded-lg border border-stone-200 bg-stone-50 p-0.5">
                                <button
                                  onClick={() => onUpdateQuantity(item.cartId, -1)}
                                  className="flex h-6 w-6 items-center justify-center rounded bg-white text-stone-600 text-xs shadow-2xs hover:bg-stone-100"
                                >
                                  -
                                </button>
                                <span className="w-6 text-center text-xs font-semibold text-stone-800">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.cartId, 1)}
                                  className="flex h-6 w-6 items-center justify-center rounded bg-white text-stone-600 text-xs shadow-2xs hover:bg-stone-100"
                                >
                                  +
                                </button>
                              </div>

                              <span className="font-serif text-sm font-semibold text-stone-900">
                                ${(item.unitPrice * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* USER REQUESTED: Solicitar Nombre y WhatsApp */}
                <div className="rounded-2xl border border-stone-200 bg-white p-4 space-y-3 shadow-2xs">
                  <div className="flex items-center gap-2 border-b border-stone-100 pb-2">
                    <MessageCircle className="h-4 w-4 text-emerald-600" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                      Datos de Contacto para tu Pedido
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 uppercase mb-1">
                      Tu Nombre Completo <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                      <input
                        type="text"
                        required
                        placeholder="ej. Sofia Alexandra Ortiz"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50 text-stone-800 placeholder-stone-400 focus:bg-white focus:border-stone-400 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 uppercase mb-1">
                      Tu Número de WhatsApp <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                      <input
                        type="tel"
                        required
                        placeholder="ej. +52 55 1234 5678"
                        value={customerWhatsApp}
                        onChange={(e) => setCustomerWhatsApp(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50 text-stone-800 placeholder-stone-400 focus:bg-white focus:border-stone-400 focus:outline-hidden"
                      />
                    </div>
                    <span className="mt-1 block text-[10px] text-stone-500">
                      Te enviaremos la confirmación y vista previa final por WhatsApp.
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 uppercase mb-1">
                      Notas o Indicaciones Especiales <span className="text-stone-400 font-normal">(Opcional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="ej. Para regalo, fecha límite, envolver en listón..."
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50 text-stone-800 placeholder-stone-400 focus:bg-white focus:border-stone-400 focus:outline-hidden"
                    />
                  </div>

                  {formError && (
                    <div className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-[11px] text-rose-700 font-medium">
                      {formError}
                    </div>
                  )}
                </div>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="pt-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Cupón (ej. ATELIER15)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs text-stone-800 uppercase placeholder-stone-400 focus:border-stone-400 focus:outline-hidden"
                    />
                    <button
                      type="submit"
                      className="rounded-xl border border-stone-300 bg-stone-100 px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-200 transition-colors"
                    >
                      Aplicar
                    </button>
                  </div>
                  {promoApplied && (
                    <span className="mt-1 block text-[11px] text-emerald-700 font-medium">
                      ✓ Descuento ATELIER15 aplicado (15% menos)
                    </span>
                  )}
                </form>
              </div>
            )}
          </div>

          {/* Footer Summary & Checkout Button */}
          {!orderComplete && cartItems.length > 0 && (
            <div className="border-t border-stone-200/80 bg-white p-5 space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-stone-900">${subtotal.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Descuento Atelier (15%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Empaque de Regalo con Cera</span>
                  <span className="text-emerald-700 font-medium">Gratis</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío Protegido</span>
                  <span>{shipping === 0 ? <strong className="text-emerald-700">GRATIS</strong> : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between border-t border-stone-100 pt-2 text-sm font-semibold text-stone-900">
                  <span className="font-serif text-base">Total Final</span>
                  <span className="font-serif text-base font-bold">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCompleteOrder}
                disabled={isCheckingOut}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-stone-900 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-stone-800 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
              >
                {isCheckingOut ? (
                  <span>Registrando Pedido en Atelier...</span>
                ) : (
                  <>
                    <MessageCircle className="h-4 w-4 text-emerald-400" />
                    <span>Confirmar Pedido y Solicitar por WhatsApp • ${total.toFixed(2)}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-stone-500 pt-0.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>Atelier Directo • Grabado permanente garantizado</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
