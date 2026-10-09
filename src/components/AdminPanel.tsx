import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Order, Appointment, OrderStatus } from '../types';
import { PRODUCTS } from '../data/products';
import {
  subscribeToOrders,
  updateOrderStatus,
  subscribeToAppointments,
  addAppointment,
  deleteOrder // <-- Importamos la nueva función
} from '../services/firebase';
import {
  Lock,
  Mail,
  Search,
  Eye,
  CheckCircle2,
  Calendar,
  ShoppingBag,
  Box,
  User,
  LogOut,
  Plus,
  X,
  Store,
  Edit2,
  Trash2,
  Phone
} from 'lucide-react';

interface AdminPanelProps {
  onBackToStore: () => void;
}

export default function AdminPanel({ onBackToStore }: AdminPanelProps) {
  const savedEmail = localStorage.getItem('adminEmail') || 'yndira@creacionesyafe.com';
  const savedPassword = localStorage.getItem('adminPassword') || '12345678';

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [orders, setOrders] = useState<Order[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [activeTab, setActiveTab] = useState<'pedidos' | 'catalogo' | 'agenda' | 'perfil'>('pedidos');
  const [inspectingOrder, setInspectingOrder] = useState<Order | null>(null);

  const [profileName, setProfileName] = useState(localStorage.getItem('adminName') || 'Yndira Morales');
  const [profileRole, setProfileRole] = useState('Directora Creativa');
  const [profileEmail, setProfileEmail] = useState(savedEmail);
  const [profileWhatsApp, setProfileWhatsApp] = useState(localStorage.getItem('adminPhone') || '+1 (210) 833-1766');
  const [profilePassword, setProfilePassword] = useState(savedPassword);
  const [showProfileToast, setShowProfileToast] = useState(false);

  useEffect(() => {
    const unsubOrders = subscribeToOrders((liveOrders) => setOrders(liveOrders));
    const unsubAppts = subscribeToAppointments((liveAppts) => setAppointments(liveAppts));
    return () => {
      unsubOrders();
      unsubAppts();
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail.trim() === profileEmail && loginPassword === profilePassword) {
      setIsAuthenticated(true);
      setAuthError('');
      setLoginEmail('');
      setLoginPassword('');
    } else {
      setAuthError('Credenciales incorrectas. Intente nuevamente.');
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    await updateOrderStatus(orderId, newStatus);
  };

  // Lógica para eliminar el pedido
  const handleDeleteOrder = async (orderId: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este pedido permanentemente? Esta acción no se puede deshacer.')) {
      await deleteOrder(orderId);
      if (inspectingOrder?.id === orderId) {
        setInspectingOrder(null);
      }
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('adminEmail', profileEmail);
    localStorage.setItem('adminPassword', profilePassword);
    localStorage.setItem('adminName', profileName);
    localStorage.setItem('adminPhone', profileWhatsApp);
    
    setShowProfileToast(true);
    setTimeout(() => setShowProfileToast(false), 3000);
  };

  const filteredOrders = orders.filter((o) =>
    o.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-6 font-sans">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 border border-stone-200"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-[#1a2b4c] text-white rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-[#1a2b4c]">Acceso Administrativo</h2>
            <p className="text-stone-500 text-sm mt-1">Ingrese sus credenciales para continuar</p>
          </div>

          {authError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center mb-4 border border-red-200">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1">Usuario (Correo)</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full border border-stone-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1a2b4c]/50 focus:border-[#1a2b4c]"
                placeholder="ejemplo@correo.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1">Contraseña</label>
              <input
                type="password"
                required
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
    <div className="min-h-screen bg-[#f4f7f6] flex font-sans text-stone-800">
      
      <aside className="w-64 bg-[#1a2b4c] text-white flex flex-col fixed h-full shadow-xl z-20">
        <div className="p-6 flex flex-col items-center border-b border-white/10">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-3">
            <span className="text-2xl font-bold">{profileName.charAt(0)}</span>
          </div>
          <h2 className="font-bold text-lg text-center leading-tight">{profileName}</h2>
          <p className="text-white/60 text-xs mt-1 uppercase tracking-wider">{profileRole}</p>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <button
            onClick={() => setActiveTab('pedidos')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeTab === 'pedidos' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            Gestión de Pedidos
          </button>
          <button
            onClick={() => setActiveTab('catalogo')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeTab === 'catalogo' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Box className="w-5 h-5" />
            Catálogo
          </button>
          <button
            onClick={() => setActiveTab('agenda')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeTab === 'agenda' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Calendar className="w-5 h-5" />
            Agenda de Citas
          </button>
          <button
            onClick={() => setActiveTab('perfil')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeTab === 'perfil' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <User className="w-5 h-5" />
            Mi Perfil
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-red-500/10 hover:text-red-200 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8">
        
        <header className="flex items-center justify-between mb-8 bg-white p-4 px-6 rounded-2xl shadow-sm border border-stone-200">
          <h1 className="text-2xl font-bold text-[#1a2b4c]">
            {activeTab === 'pedidos' && 'Gestión de Pedidos'}
            {activeTab === 'catalogo' && 'Catálogo de Productos'}
            {activeTab === 'agenda' && 'Mi Agenda de Citas'}
            {activeTab === 'perfil' && 'Mi Perfil'}
          </h1>
          <button onClick={onBackToStore} className="text-sm font-semibold text-stone-500 hover:text-[#b90538] flex items-center gap-2 bg-stone-100 px-4 py-2 rounded-lg">
            <Store className="w-4 h-4" />
            Ver Tienda
          </button>
        </header>

        {activeTab === 'perfil' && (
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 max-w-3xl overflow-hidden">
            <div className="p-8">
              <h2 className="text-xl font-bold text-[#1a2b4c] mb-6 border-b border-stone-100 pb-4">Personaliza tu Perfil Público</h2>
              
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-24 h-24 rounded-full bg-stone-100 border-2 border-dashed border-stone-300 flex items-center justify-center overflow-hidden">
                    <User className="w-10 h-10 text-stone-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-700 mb-2">Foto de Perfil Profesional</p>
                    <div className="flex items-center gap-3">
                      <button type="button" className="px-4 py-2 bg-[#eaf4f4] text-[#1a2b4c] font-semibold text-sm rounded-lg hover:bg-[#d5ebeb] transition-colors">
                        Elegir archivo
                      </button>
                      <span className="text-xs text-stone-400">No se ha seleccionado ningún archivo</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1">Nombre Público</label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full border border-stone-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#1a2b4c]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1">Cargo / Especialidad</label>
                    <input
                      type="text"
                      value={profileRole}
                      onChange={(e) => setProfileRole(e.target.value)}
                      className="w-full border border-stone-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#1a2b4c]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1">Correo de Acceso (Usuario)</label>
                    <input
                      type="email"
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                      className="w-full border border-stone-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#1a2b4c]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1">WhatsApp de Contacto</label>
                    <input
                      type="text"
                      value={profileWhatsApp}
                      onChange={(e) => setProfileWhatsApp(e.target.value)}
                      className="w-full border border-stone-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#1a2b4c]"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-stone-700 mb-1">Contraseña de Acceso</label>
                    <input
                      type="text"
                      value={profilePassword}
                      onChange={(e) => setProfilePassword(e.target.value)}
                      className="w-full md:w-1/2 border border-stone-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#1a2b4c]"
                    />
                    <p className="text-xs text-stone-500 mt-1">Cambie este valor para modificar su contraseña de entrada al panel.</p>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-stone-100">
                  <div className="flex items-center gap-4">
                    {showProfileToast && (
                      <span className="text-sm font-semibold text-green-600 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> ¡Cambios guardados!
                      </span>
                    )}
                    <button type="submit" className="px-6 py-2.5 bg-[#1a2b4c] text-white font-bold rounded-lg hover:bg-[#111c33] transition-colors">
                      Guardar Cambios
                    </button>
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
                    <div className="flex gap-2 text-stone-400">
                      <button className="hover:text-blue-500 bg-stone-50 p-1.5 rounded-md"><Edit2 className="w-4 h-4" /></button>
                      <button className="hover:text-red-500 bg-stone-50 p-1.5 rounded-md"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <h4 className="font-bold text-stone-900 text-lg mb-1 leading-tight">{prod.name}</h4>
                  <p className="font-bold text-xl text-[#1a2b4c] mb-4">${prod.price.toFixed(2)} <span className="text-xs text-stone-500 font-normal">USD</span></p>
                  <div className="mt-auto pt-4 border-t border-stone-100 flex items-center gap-3">
                    <img src={prod.image} alt={prod.name} className="w-12 h-12 rounded-lg object-cover bg-stone-100" />
                    <span className="text-xs text-stone-500">{prod.categoryLabel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'agenda' && (
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl text-stone-800">Octubre 2026</h3>
              <div className="flex gap-2">
                <button className="p-2 border border-stone-200 rounded-lg hover:bg-stone-50">&lt;</button>
                <button className="p-2 border border-stone-200 rounded-lg hover:bg-stone-50">&gt;</button>
              </div>
            </div>
            
            <div className="border border-stone-200 rounded-xl overflow-hidden">
              <div className="grid grid-cols-7 bg-stone-50 border-b border-stone-200 text-center text-sm font-semibold text-stone-600">
                <div className="py-3 border-r border-stone-200">Dom</div>
                <div className="py-3 border-r border-stone-200">Lun</div>
                <div className="py-3 border-r border-stone-200">Mar</div>
                <div className="py-3 border-r border-stone-200">Mié</div>
                <div className="py-3 border-r border-stone-200">Jue</div>
                <div className="py-3 border-r border-stone-200">Vie</div>
                <div className="py-3">Sáb</div>
              </div>
              
              <div className="grid grid-cols-7 text-right text-stone-500 text-sm">
                {['', '', '', '', '1', '2', '3'].map((d, i) => (
                  <div key={i} className="min-h-[100px] p-2 border-b border-r border-stone-100 bg-stone-50/30">
                    {d}
                  </div>
                ))}
                {['4', '5', '6', '7', '8', '9', '10'].map((d) => (
                  <div key={d} className="min-h-[100px] p-2 border-b border-r border-stone-100 bg-white">
                    <span className={d === '8' ? 'bg-[#1a2b4c] text-white w-6 h-6 flex items-center justify-center rounded-full ml-auto' : ''}>{d}</span>
                  </div>
                ))}
                {['11', '12', '13', '14', '15', '16', '17'].map((d) => (
                  <div key={d} className="min-h-[100px] p-2 border-b border-r border-stone-100 bg-white">
                    {d}
                  </div>
                ))}
                {['18', '19', '20', '21', '22', '23', '24'].map((d) => (
                  <div key={d} className="min-h-[100px] p-2 border-b border-r border-stone-100 bg-white text-left flex flex-col">
                    <span className="text-right mb-2">{d}</span>
                    {d === '22' && (
                      <div className="bg-[#4bc3cd] text-white text-[10px] p-1.5 rounded truncate font-semibold">
                        17:48 - Entrega Camila
                      </div>
                    )}
                  </div>
                ))}
                {['25', '26', '27', '28', '29', '30', '31'].map((d) => (
                  <div key={d} className="min-h-[100px] p-2 border-r border-stone-100 bg-white">
                    {d}
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
              <span className="text-sm text-stone-500 font-semibold">{filteredOrders.length} Pedidos en curso</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 text-sm">
                  <tr>
                    <th className="p-4 font-semibold">Cliente</th>
                    <th className="p-4 font-semibold">Producto</th>
                    <th className="p-4 font-semibold">Fecha de Entrega</th>
                    <th className="p-4 font-semibold">Total</th>
                    <th className="p-4 font-semibold">Estado</th>
                    <th className="p-4 font-semibold text-center">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-stone-50 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-stone-800">{ord.customer.name}</p>
                        <p className="text-xs text-stone-500 flex items-center gap-1 mt-1"><Phone className="w-3 h-3"/>{ord.customer.whatsapp}</p>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-sm">{ord.product}</p>
                        <p className="text-xs text-[#b90538] font-bold mt-1">"{ord.customization.text}"</p>
                      </td>
                      <td className="p-4 text-sm font-semibold">{ord.customer.deliveryDate}</td>
                      <td className="p-4 text-sm font-bold text-stone-800">${ord.price.toFixed(2)}</td>
                      <td className="p-4">
                        <select
                          value={ord.status}
                          onChange={(e) => handleStatusChange(ord.id, e.target.value as OrderStatus)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold outline-none cursor-pointer border ${
                            ord.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                            ord.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            'bg-green-50 text-green-700 border-green-200'
                          }`}
                        >
                          <option value="Pending">Pendiente</option>
                          <option value="In Progress">En Proceso</option>
                          <option value="Completed">Completado</option>
                        </select>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center items-center gap-2">
                          <button
                            onClick={() => setInspectingOrder(ord)}
                            className="p-2 text-stone-400 hover:text-[#1a2b4c] bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                            title="Ver detalle completo"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteOrder(ord.id)}
                            className="p-2 text-red-400 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                            title="Eliminar pedido"
                          >
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
              className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setInspectingOrder(null)}
                className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 bg-stone-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-xl font-bold text-[#1a2b4c] mb-6 border-b border-stone-100 pb-3">Detalle del Pedido</h3>
              
              <div className="space-y-4 text-sm text-stone-700">
                <div>
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Cliente</p>
                  <p className="font-bold text-lg">{inspectingOrder.customer.name}</p>
                  <p>{inspectingOrder.customer.whatsapp}</p>
                  <p className="text-stone-500 mt-1">{inspectingOrder.customer.address}</p>
                </div>
                
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Producto a Personalizar</p>
                  <p className="font-bold">{inspectingOrder.product}</p>
                  <p className="text-[#b90538] font-bold text-base mt-2">"{inspectingOrder.customization.text}"</p>
                  <p className="text-xs mt-1 text-stone-500">Color: {inspectingOrder.customization.colorName}</p>
                </div>

                <div className="flex justify-between items-center p-4 bg-[#1a2b4c] text-white rounded-xl">
                  <div>
                    <p className="text-xs text-white/70 font-bold uppercase">Total Pagado</p>
                    <p className="font-bold text-xl">${inspectingOrder.price.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/70 font-bold uppercase">Entrega</p>
                    <p className="font-semibold">{inspectingOrder.customer.deliveryDate}</p>
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
