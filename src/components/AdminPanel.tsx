import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Order, OrderStatus } from '../types';
import { PRODUCTS } from '../data/products';
import { subscribeToOrders, updateOrderStatus, deleteOrder } from '../services/firebase';
import { Lock, Search, Eye, CheckCircle2, Calendar, ShoppingBag, Box, User, LogOut, Plus, X, Store, Trash2, Phone } from 'lucide-react';

interface AdminPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
  onBackToStore?: () => void;
}

export default function AdminPanel({ isOpen = true, onClose, onBackToStore }: AdminPanelProps) {
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
      const unsub = subscribeToOrders((liveOrders) => setOrders(liveOrders));
      return () => unsub();
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

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    await updateOrderStatus(orderId, newStatus);
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este pedido permanentemente? Esta acción no se puede deshacer.')) {
      await deleteOrder(orderId);
      if (inspectingOrder?.id === orderId) setInspectingOrder(null);
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
    o.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const closePanel = () => {
    if (onClose) onClose();
    if (onBackToStore) onBackToStore();
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-stone-900/60 backdrop-blur-sm font-sans">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 border border-stone-200 relative">
          <button onClick={closePanel} className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"><X className="w-5 h-5" /></button>
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-[#1a2b4c] text-white rounded-full flex items-center justify-center mb-4"><Lock className="w-8 h-8" /></div>
            <h2 className="text-2xl font-bold text-[#1a2b4c]">Acceso Administrativo</h2>
          </div>

          {authError && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center mb-4 border border-red-200">{authError}</div>}

          <form onSubmit={handleLogin} className="space-y-5" autoComplete="off">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1">Usuario</label>
              <input type="text" required autoComplete="off" value={loginUser} onChange={(e) => setLoginUser(e.target.value)} className="w-full border border-stone-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1a2b4c]/50 focus:border-[#1a2b4c]" placeholder="Ingrese usuario" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1">Contraseña</label>
              <input type="password" required autoComplete="new-password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full border border-stone-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1a2b4c]/50 focus:border-[#1a2b4c]" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full bg-[#1a2b4c] text-white font-bold py-3 rounded-lg hover:bg-[#111c33] transition-colors mt-2">Iniciar Sesión</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#f4f7f6] flex font-sans text-stone-800 overflow-hidden">
      <aside className="w-64 bg-[#1a2b4c] text-white flex flex-col fixed h-full shadow-xl z-20">
        <div className="p-6 flex flex-col items-center border-b border-white/10">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-3"><span className="text-2xl font-bold">{profileName.charAt(0)}</span></div>
          <h2 className="font-bold text-lg text-center leading-tight">{profileName}</h2>
          <p className="text-white/60 text-xs mt-1 uppercase tracking-wider">{profileRole}</p>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <button onClick={() => setActiveTab('pedidos')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'pedidos' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}><ShoppingBag className="w-5 h-5" /> Gestión de Pedidos</button>
          <button onClick={() => setActiveTab('catalogo')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'catalogo' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}><Box className="w-5 h-5" /> Catálogo</button>
          <button onClick={() => setActiveTab('agenda')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'agenda' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}><Calendar className="w-5 h-5" /> Agenda de Citas</button>
          <button onClick={() => setActiveTab('perfil')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'perfil' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}><User className="w-5 h-5" /> Mi Perfil</button>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={() => setIsAuthenticated(false)} className="w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-red-500/10 hover:text-red-200 rounded-xl transition-colors mb-2"><LogOut className="w-5 h-5" /> Cerrar Sesión</button>
          <button onClick={closePanel} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-stone-300 hover:bg-white/10 hover:text-white rounded-xl transition-colors text-sm"><Store className="w-4 h-4" /> Volver a la Tienda</button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8 overflow-y-auto h-full">
        <header className="flex items-center justify-between mb-8 bg-white p-4 px-6 rounded-2xl shadow-sm border border-stone-200">
          <h1 className="text-2xl font-bold text-[#1a2b4c]">Panel Principal</h1>
        </header>

        {activeTab === 'pedidos' && (
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="p-6 border-b border-stone-200 flex justify-between items-center">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-stone-400 w-5 h-5" />
                <input type="text" placeholder="Buscar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:border-[#1a2b4c] w-64" />
              </div>
              <span className="text-sm text-stone-500 font-semibold">{filteredOrders.length} Pedidos</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 text-sm">
                  <tr><th className="p-4 font-semibold">Cliente</th><th className="p-4 font-semibold">Producto</th><th className="p-4 font-semibold">Total</th><th className="p-4 font-semibold text-center">Acción</th></tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-stone-50 transition-colors">
                      <td className="p-4"><p className="font-bold text-stone-800">{ord.customer?.name}</p></td>
                      <td className="p-4"><p className="font-semibold text-sm">{ord.product}</p></td>
                      <td className="p-4 text-sm font-bold text-stone-800">${ord.price?.toFixed(2)}</td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center items-center gap-2">
                          <button onClick={() => handleDeleteOrder(ord.id)} className="p-2 text-red-400 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
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
    </div>
  );
}
