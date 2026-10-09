import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  X,
  Search,
  MessageCircle,
  Clock,
  CheckCircle,
  Truck,
  Package,
  Sparkles,
  ExternalLink,
  ChevronDown,
  RefreshCw
} from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { getStoredOrders, updateOrderStatus } from '../services/orders';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | OrderStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen) {
      setOrders(getStoredOrders());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const isUserValid = usernameInput.trim().toLowerCase() === 'yndira';
    const isPassValid = passwordInput === '12345678';

    if (isUserValid && isPassValid) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Credenciales incorrectas. Usuario requerido: Yndira | Contraseña: del 1 al 8.');
    }
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    const updated = updateOrderStatus(orderId, newStatus);
    setOrders(updated);
  };

  const openWhatsApp = (phone: string, customerName: string, orderId: string, status: OrderStatus) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const statusText =
      status === 'in_production'
        ? 'está en producción con grabado láser / bordado de alta precisión'
        : status === 'dispatched'
        ? 'ha sido despachado y está en camino'
        : status === 'delivered'
        ? 'ha sido entregado con éxito'
        : 'ha sido recibido en nuestro taller';

    const message = encodeURIComponent(
      `¡Hola ${customerName}! ✨ Te escribimos de YA&FE Atelier respecto a tu pedido #${orderId}. Queremos informarte que tu pieza ${statusText}. ¿Tienes alguna consulta adicional sobre tus detalles personalizados?`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  const filteredOrders = orders.filter((order) => {
    const matchesFilter = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerWhatsApp.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingCount = orders.filter((o) => o.status === 'pending').length;
  const inProductionCount = orders.filter((o) => o.status === 'in_production').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Main Modal Box */}
      <div className="relative w-full max-w-5xl rounded-3xl border border-stone-200 bg-white shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 bg-[#FAF7F4] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-900 text-white shadow-xs">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-medium text-stone-900">
                  YA&FE Atelier • Portal de Administrador
                </h3>
                <span className="rounded-full bg-[#FAF3EE] border border-[#E8D5B5] px-2 py-0.5 text-[10px] font-semibold text-[#8C4E3A] uppercase tracking-wider">
                  Admin Master
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Gestión de pedidos, clientes por WhatsApp y estado de producción artesanal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  setPasswordInput('');
                }}
                className="rounded-lg border border-stone-200 bg-white px-2.5 py-1 text-xs font-medium text-stone-600 hover:text-rose-600 hover:border-rose-200 transition-colors cursor-pointer"
              >
                Cerrar Sesión
              </button>
            )}
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-200 hover:text-stone-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Not Authenticated Screen */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F6EFE9] text-[#8C4E3A] mb-4 shadow-inner">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h4 className="font-serif text-2xl font-normal text-stone-900">
              Acceso a la Administración • YA&FE
            </h4>
            <p className="mt-1 text-xs text-stone-500 max-w-sm">
              Ingresa tus credenciales de administradora para revisar pedidos, teléfonos de WhatsApp de clientes y actualizar el estado de producción.
            </p>

            <form onSubmit={handleLogin} className="mt-6 w-full max-w-xs space-y-3.5 text-left">
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 uppercase mb-1">
                  Usuario Administrador
                </label>
                <input
                  type="text"
                  placeholder="ej. Yndira"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  autoFocus
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 py-2.5 px-4 text-xs text-stone-900 placeholder-stone-400 focus:border-stone-400 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-700 uppercase mb-1">
                  Contraseña (del 1 al 8)
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 py-2.5 px-4 text-xs text-stone-900 placeholder-stone-400 focus:border-stone-400 focus:bg-white focus:outline-hidden"
                />
              </div>

              {authError && (
                <p className="text-xs text-rose-600 font-medium bg-rose-50 p-2 rounded-lg border border-rose-200">
                  {authError}
                </p>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-stone-900 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:bg-stone-800 transition-all cursor-pointer"
              >
                Ingresar como Yndira
              </button>

              <button
                type="button"
                onClick={() => {
                  setUsernameInput('Yndira');
                  setPasswordInput('12345678');
                  setIsAuthenticated(true);
                }}
                className="text-xs text-[#B76E79] hover:underline block mx-auto pt-1 cursor-pointer text-center"
              >
                Autocompletar Credenciales (Yndira / 12345678)
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-2xl border border-stone-200/80 bg-[#FAF7F5] p-3.5">
                <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                  Total Pedidos
                </span>
                <span className="font-serif text-2xl font-semibold text-stone-900">
                  {orders.length}
                </span>
              </div>
              <div className="rounded-2xl border border-amber-200/80 bg-amber-50/60 p-3.5">
                <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider block">
                  Por Revisar
                </span>
                <span className="font-serif text-2xl font-semibold text-amber-900">
                  {pendingCount}
                </span>
              </div>
              <div className="rounded-2xl border border-blue-200/80 bg-blue-50/60 p-3.5">
                <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider block">
                  En Grabado / Taller
                </span>
                <span className="font-serif text-2xl font-semibold text-blue-900">
                  {inProductionCount}
                </span>
              </div>
              <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/60 p-3.5">
                <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block">
                  Ingresos
                </span>
                <span className="font-serif text-2xl font-semibold text-emerald-900">
                  ${totalRevenue.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-y border-stone-100 py-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="Buscar por cliente, WhatsApp o ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-stone-200 bg-stone-50 placeholder-stone-400 focus:bg-white focus:outline-hidden"
                />
              </div>

              {/* Status pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {(['all', 'pending', 'in_production', 'dispatched', 'delivered'] as const).map(
                  (st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        statusFilter === st
                          ? 'bg-stone-900 text-white shadow-2xs'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {st === 'all'
                        ? 'Todos'
                        : st === 'pending'
                        ? 'Pendiente'
                        : st === 'in_production'
                        ? 'En Taller'
                        : st === 'dispatched'
                        ? 'Despachado'
                        : 'Entregado'}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Orders Table / Cards */}
            <div className="space-y-4">
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12 text-stone-500 text-xs">
                  No se encontraron pedidos con los filtros seleccionados.
                </div>
              ) : (
                filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs hover:border-stone-300 transition-all"
                  >
                    {/* Top Row: ID, Date, WhatsApp action button & Status dropdown */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-stone-900 bg-stone-100 px-2.5 py-1 rounded-md">
                          #{order.id}
                        </span>
                        <span className="text-[11px] text-stone-400">
                          {new Date(order.createdAt).toLocaleDateString()} •{' '}
                          {new Date(order.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* WhatsApp Contact Button */}
                        <button
                          onClick={() =>
                            openWhatsApp(
                              order.customerWhatsApp,
                              order.customerName,
                              order.id,
                              order.status
                            )
                          }
                          className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 transition-all cursor-pointer"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          <span>WhatsApp ({order.customerWhatsApp})</span>
                        </button>

                        {/* Status selector */}
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value as OrderStatus)
                          }
                          className="rounded-xl border border-stone-200 bg-stone-50 px-2.5 py-1.5 text-xs font-medium text-stone-800 focus:outline-hidden"
                        >
                          <option value="pending">⏳ Pendiente</option>
                          <option value="in_production">🔨 En Taller / Grabado</option>
                          <option value="dispatched">🚚 Despachado</option>
                          <option value="delivered">✅ Entregado</option>
                        </select>
                      </div>
                    </div>

                    {/* Customer Info & Order Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-3 items-center">
                      {/* Customer Info */}
                      <div className="md:col-span-4">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 block">
                          Cliente Solicitante
                        </span>
                        <h4 className="font-serif text-base font-medium text-stone-900">
                          {order.customerName}
                        </h4>
                        <div className="mt-1 flex items-center gap-1 text-xs text-stone-600">
                          <MessageCircle className="h-3 w-3 text-emerald-600" />
                          <span>WhatsApp: <strong className="text-stone-800">{order.customerWhatsApp}</strong></span>
                        </div>
                        {order.notes && (
                          <p className="mt-1.5 text-[11px] text-stone-500 italic bg-[#FAF7F5] p-2 rounded-lg border border-stone-100">
                            "{order.notes}"
                          </p>
                        )}
                      </div>

                      {/* Items */}
                      <div className="md:col-span-6 space-y-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 block">
                          Detalles del Diseño Solicitado
                        </span>
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 bg-stone-50 p-2.5 rounded-xl border border-stone-100"
                          >
                            {/* Color / Image Preview */}
                            <div
                              className="h-10 w-10 shrink-0 rounded-lg shadow-inner flex items-center justify-center border border-stone-200 overflow-hidden"
                              style={{ backgroundColor: item.customization.productColor }}
                            >
                              {item.customization.backgroundImageUrl ? (
                                <img
                                  src={item.customization.backgroundImageUrl}
                                  alt="wrap"
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <span className="text-[10px] font-bold text-stone-700">
                                  {item.product.category === 'tumbler' ? '☕' : item.product.category === 'apron' ? '👩‍🍳' : item.product.category === 'mug' ? '☕' : '👜'}
                                </span>
                              )}
                            </div>

                            <div className="min-w-0 flex-1 text-xs">
                              <span className="font-medium text-stone-900 block truncate">
                                {item.product.name} (x{item.quantity})
                              </span>
                              <div className="text-[11px] text-stone-500 space-x-2">
                                <span>
                                  Texto:{' '}
                                  {item.customization.customText?.trim() ? (
                                    <strong className="text-[#8C4E3A]">“{item.customization.customText}”</strong>
                                  ) : (
                                    <span className="text-emerald-700 font-medium">[Sin texto - Diseño liso]</span>
                                  )}
                                </span>
                                {item.customization.customText?.trim() && (
                                  <>
                                    <span>•</span>
                                    <span>Fuente: {item.customization.fontId}</span>
                                  </>
                                )}
                                {item.customization.backgroundImageUrl && (
                                  <>
                                    <span>•</span>
                                    <span className="text-[#B76E79] font-medium">Fondo personalizado adjunto (color real)</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Total */}
                      <div className="md:col-span-2 text-right">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 block">
                          Total a Cobrar
                        </span>
                        <span className="font-serif text-xl font-bold text-stone-900">
                          ${order.total.toFixed(2)}
                        </span>
                        <span className="text-[11px] text-emerald-600 block">
                          Pago acordado
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-stone-100 bg-[#FAF7F4] px-6 py-3 flex items-center justify-between text-xs text-stone-500">
          <span>YA&FE Atelier v2.4 • Admin Control Session</span>
          <button
            onClick={onClose}
            className="rounded-lg bg-stone-900 px-4 py-1.5 text-xs font-medium text-white hover:bg-stone-800"
          >
            Cerrar Panel
          </button>
        </div>
      </div>
    </div>
  );
};
