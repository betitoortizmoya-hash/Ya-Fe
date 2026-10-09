import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Order, OrderStatus } from '../types';
import { PRODUCTS } from '../data/products';
import { getStoredOrders, updateOrderStatus } from '../services/orders';
import { Lock, Search, Eye, CheckCircle2, Calendar, ShoppingBag, Box, User, LogOut, Plus, X, Store, Edit2, Trash2, Phone, MessageCircle } from 'lucide-react';

interface AdminPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
  onBackToStore?: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen = true, onClose, onBackToStore }) => {
  if (!isOpen) return null;

  const savedUser = localStorage.getItem('adminUser') || 'Yndira';
  const savedPassword = localStorage.getItem('adminPassword') || '12345678';

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginUser, setLoginUser] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [activeTab, setActiveTab] = useState<'pedidos' | 'catalogo' | 'agenda' | 'perfil'>('pedidos');
  const [inspectingOrder, setInspectingOrder] = useState<Order | null>(null);

  const [profileName, setProfileName] = useState(localStorage.getItem('adminName') || 'Yndira Morales');
  const [profileRole, setProfileRole] = useState('Directora Creativa');
  const [profileUser, setProfileUser] = useState(savedUser);
  const [profileWhatsApp, setProfileWhatsApp] = useState(localStorage.getItem('adminPhone') || '+1 (210) 833-1766');
  const [profilePassword, setProfilePassword] = useState(savedPassword);
  const [showProfileToast, setShowProfileToast] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setOrders(getStoredOrders());
    }
  }, [isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUser.trim().toLowerCase() === profileUser.toLowerCase() && loginPassword === profilePassword) {
      setIsAuthenticated(true);
      setAuthError('');
      setLoginUser('');
      setLoginPassword('');
    } else {
      setAuthError('Credenciales incorrectas. Intente nuevamente.');
    }
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    const updated = updateOrderStatus(orderId, newStatus);
    setOrders(updated);
  };

  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este pedido permanentemente? Esta acción no se puede deshacer.')) {
      const current = getStoredOrders();
      const updated = current.filter(o => o.id !== orderId);
      localStorage.setItem('ya_fe_atelier_orders_v1', JSON.stringify(updated));
      setOrders(updated);
      if (inspectingOrder?.id === orderId) {
        setInspectingOrder(null);
      }
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('adminUser', profileUser);
    localStorage.setItem('adminPassword', profilePassword);
    localStorage.setItem('adminName', profileName);
    localStorage.setItem('adminPhone', profileWhatsApp);

    setShowProfileToast(true);
    setTimeout(() => setShowProfileToast(false), 3000);
  };

  const filteredOrders = orders.filter((o) =>
    o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const closePanel = () => {
    if (onClose) onClose();
    if (onBackToStore) onBackToStore();
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-stone-900/60 backdrop-blur-sm font-sans">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 border border-stone-200 relative"
        >
          <button onClick={closePanel} className="absolute top-4 right-4 text-stone-400 hover:text-stone-700">
            <X className="w-5 h-5" />
          </button>
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-[#1a2b4c] text-white rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-[#1a2b4c]">Acceso Administrativo</h2>
          </div>

          {authError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center mb-4 border border-red-200">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5" autoComplete="off">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1">Usuario</label>
              <input
                type="text"
                required
                autoComplete="new-password"
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
                className="w-full border border-stone-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1a2b4c]/50 focus:border-[#1a2b4c]"
                placeholder="Ingresar usuario"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1">Contraseña</label>
              <input
                type="password"
                required
                autoComplete="new-password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full border border-stone-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1a2b4c]/50 focus:border-[#1a2b4c]"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#1a2b4c] text-white font-bold py-3 rounded-lg hover:bg-[#111c33] transition-colors mt-2"
            >
              Iniciar Sesión
            </button>

            <button
              type="button"
              onClick={onBackToStore}
              className="w-full flex items-center justify-center gap-2 text-stone-500 hover:text-stone-800 text-sm mt-4 transition-colors"
            >
              <Store className="w-4 h-4" />
              Volver a la Tienda
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#f4f7f6] flex font-sans text-stone-800 overflow-hidden">
      <aside className="w-64 bg-[#1a2b4c] text-white flex flex-col fixed h-full shadow-xl z-20">
        <div className="p-6 flex flex-col items-center border-b border-white/10">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-3">
            <span className="text-2xl font-bold">{profileName.charAt(0)}</span>
          </div>
          <h2 className="font-bold text-lg text-center leading-tight">{profileName}</h2>
          <p className="text-white/60 text-xs mt-1 uppercase tracking-wider">{profileRole}</p>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <button onClick={() => setActiveTab('pedidos')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'pedidos' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}>
            <ShoppingBag className="w-5 h-5" /> Gestión de Pedidos
          </button>
          <button onClick={() => setActiveTab('catalogo')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'catalogo' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}>
            <Box className="w-5 h-5" /> Catálogo
          </button>
          <button onClick={() => setActiveTab('agenda')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'agenda' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}>
            <Calendar className="w-5 h-5" /> Agenda de Citas
          </button>
          <button onClick={() => setActiveTab('perfil')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'perfil' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}>
            <User className="w-5 h-5" /> Mi Perfil
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={() => setIsAuthenticated(false)} className="w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-red-500/10 hover:text-red-200 rounded-xl transition-colors mb-2">
            <LogOut className="w-5 h-5" /> Cerrar Sesión
          </button>
          <button onClick={closePanel} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-stone-300 hover:bg-white/10 hover:text-white rounded-xl transition-colors text-sm">
            <Store className="w-4 h-4" /> Volver a la Tienda
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8 overflow-y-auto h-full">
        <header className="flex items-center justify-between mb-8 bg-white p-4 px-6 rounded-2xl shadow-sm border border-stone-200">
          <h1 className="text-2xl font-bold text-[#1a2b4c]">
            {activeTab === 'pedidos' && 'Gestión de Pedidos'}
            {activeTab === 'catalogo' && 'Catálogo de Productos'}
            {activeTab === 'agenda' && 'Mi Agenda de Citas'}
            {activeTab === 'perfil' && 'Mi Perfil'}
          </h1>
        </header>

        {activeTab === 'perfil' && (
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 max-w-3xl overflow-hidden">
            <div className="p-8">
              <h2 className="text-xl font-bold text-[#1a2b4c] mb-6 border-b border-stone-100 pb-4">Personaliza tu Perfil Público</h2>
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1">Nombre Público</label>
                    <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} className="w-full border border-stone-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#1a2b4c]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1">Cargo / Especialidad</label>
                    <input type="text" value={profileRole} onChange={(e) => setProfileRole(e.target.value)} className="w-full border border-stone-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#1a2b4c]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1">Usuario de Acceso</label>
                    <input type="text" value={profileUser} onChange={(e) => setProfileUser(e.target.value)} className="w-full border border-stone-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#1a2b4c]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1">WhatsApp de Contacto</label>
                    <input type="text" value={profileWhatsApp} onChange={(e) => setProfileWhatsApp(e.target.value)} className="w-full border border-stone-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#1a2b4c]" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-stone-700 mb-1">Contraseña de Acceso</label>
                    <input type="text" value={profilePassword} onChange={(e) => setProfilePassword(e.target.value)} className="w-full md:w-1/2 border border-stone-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#1a2b4c]" />
                  </div>
                </div>
                <div className="flex justify-end pt-4 border-t border-stone-100">
                  <div className="flex items-center gap-4">
                    {showProfileToast && <span className="text-sm font-semibold text-green-600 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> ¡Cambios guardados!</span>}
                    <button type="submit" className="px-6 py-2.5 bg-[#1a2b4c] text-white font-bold rounded-lg hover:bg-[#111c33] transition-colors">Guardar Cambios</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'catalogo' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
              <h3 className="font-bold text-lg text-stone-800">Catálogo de Productos</h3>
              <button className="bg-[#4bc3cd] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-[#3ba8b2] transition-colors">
                <Plus className="w-4 h-4" /> Nuevo Producto
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {PRODUCTS.map(prod => (
                <div key={prod.id} className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200 hover:border-stone-300 transition-all flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 bg-[#eaf4f4] rounded-xl flex items-center justify-center text-[#4bc3cd]">
                      <Box className="w-5 h-5" />
                    </div>
                  </div>
                  <h4 className="font-bold text-stone-900 text-lg mb-1 leading-tight">{prod.name}</h4>
                  <p className="font-bold text-xl text-[#1a2b4c] mb-4">${prod.basePrice.toFixed(2)} <span className="text-xs text-stone-500 font-normal">USD</span></p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'agenda' && (
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl text-stone-800">Octubre 2026</h3>
            </div>
            <div className="border border-stone-200 rounded-xl overflow-hidden">
              <div className="grid grid-cols-7 bg-stone-50 border-b border-stone-200 text-center text-sm font-semibold text-stone-600">
                {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(d => <div key={d} className="py-3 border-r border-stone-200 last:border-r-0">{d}</div>)}
              </div>
              <div className="grid grid-cols-7 text-right text-stone-500 text-sm">
                {Array.from({length: 31}).map((_, i) => (
                  <div key={i} className="min-h-[100px] p-2 border-b border-r border-stone-100 bg-white">
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pedidos' && (
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="p-6 border-b border-stone-200 flex justify-between items-center">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-stone-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar cliente o pedido..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:border-[#1a2b4c] w-64"
                />
              </div>
              <span className="text-sm text-stone-500 font-semibold">{filteredOrders.length} Pedidos</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 text-sm">
                  <tr>
                    <th className="p-4 font-semibold">Cliente</th>
                    <th className="p-4 font-semibold">Producto Principal</th>
                    <th className="p-4 font-semibold">Fecha</th>
                    <th className="p-4 font-semibold">Total</th>
                    <th className="p-4 font-semibold">Estado</th>
                    <th className="p-4 font-semibold text-center">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-stone-50 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-stone-800">{ord.customerName}</p>
                        <p className="text-xs text-stone-500 flex items-center gap-1 mt-1"><Phone className="w-3 h-3"/>{ord.customerWhatsApp}</p>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-sm">{ord.items[0]?.product.name} {ord.items.length > 1 ? `(+${ord.items.length - 1})` : ''}</p>
                        {ord.items[0]?.customization.customText && (
                          <p className="text-xs text-[#b90538] font-bold mt-1">"{ord.items[0].customization.customText}"</p>
                        )}
                      </td>
                      <td className="p-4 text-sm font-semibold">{new Date(ord.createdAt).toLocaleDateString()}</td>
                      <td className="p-4 text-sm font-bold text-stone-800">${ord.total.toFixed(2)}</td>
                      <td className="p-4">
                        <select
                          value={ord.status}
                          onChange={(e) => handleStatusChange(ord.id, e.target.value as OrderStatus)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold outline-none cursor-pointer border ${
                            ord.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                            ord.status === 'in_production' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            'bg-green-50 text-green-700 border-green-200'
                          }`}
                        >
                          <option value="pending">Pendiente</option>
                          <option value="in_production">En Taller</option>
                          <option value="dispatched">Despachado</option>
                          <option value="delivered">Entregado</option>
                        </select>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center items-center gap-2">
                          <button onClick={() => setInspectingOrder(ord)} className="p-2 text-stone-400 hover:text-[#1a2b4c] bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors" title="Ver detalle">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeleteOrder(ord.id)} className="p-2 text-red-400 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors" title="Eliminar pedido">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <AnimatePresence>
        {inspectingOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-stone-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl relative"
            >
              <button onClick={() => setInspectingOrder(null)} className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 bg-stone-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-xl font-bold text-[#1a2b4c] mb-6 border-b border-stone-100 pb-3">Detalle del Pedido #{inspectingOrder.id}</h3>
              
              <div className="space-y-4 text-sm text-stone-700">
                <div>
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Cliente</p>
                  <p className="font-bold text-lg">{inspectingOrder.customerName}</p>
                  <p>{inspectingOrder.customerWhatsApp}</p>
                  {inspectingOrder.notes && <p className="text-stone-500 mt-1 italic">"{inspectingOrder.notes}"</p>}
                </div>
                
                <div className="max-h-48 overflow-y-auto space-y-2 pr-2">
                  {inspectingOrder.items.map((item, idx) => (
                    <div key={idx} className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                      <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Pieza {idx + 1}: {item.product.name} (x{item.quantity})</p>
                      {item.customization.customText && (
                        <p className="text-[#b90538] font-bold text-base mt-1">"{item.customization.customText}"</p>
                      )}
                      {item.customization.secondaryText && (
                        <p className="text-stone-600 font-medium text-xs mt-1">{item.customization.secondaryText}</p>
                      )}
                      <p className="text-xs mt-1 text-stone-500">Color Base: <span className="font-medium text-stone-700">{item.customization.productColor}</span></p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center p-4 bg-[#1a2b4c] text-white rounded-xl mt-4">
                  <div>
                    <p className="text-xs text-white/70 font-bold uppercase">Total Pagado</p>
                    <p className="font-bold text-xl">${inspectingOrder.total.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/70 font-bold uppercase">Fecha de Orden</p>
                    <p className="font-semibold">{new Date(inspectingOrder.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
