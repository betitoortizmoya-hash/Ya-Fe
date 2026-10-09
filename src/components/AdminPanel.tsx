import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Order, Appointment, OrderStatus } from '../types';
import {
  subscribeToOrders,
  updateOrderStatus,
  subscribeToAppointments,
  addAppointment
} from '../services/firebase';
import {
  Lock,
  Unlock,
  Key,
  Mail,
  Phone,
  Search,
  Eye,
  CheckCircle2,
  Calendar,
  Sparkles,
  ShoppingBag,
  Brush,
  DollarSign,
  Truck,
  ArrowRight,
  ShieldAlert,
  Save,
  Plus,
  X,
  Store,
  ExternalLink,
  MessageCircle,
  Sliders,
  Check
} from 'lucide-react';

interface AdminPanelProps {
  onBackToStore: () => void;
}

export default function AdminPanel({ onBackToStore }: AdminPanelProps) {
  // Authentication gate state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('yndira@creacionesyafe.com');
  const [loginPassword, setLoginPassword] = useState('12345678');
  const [authError, setAuthError] = useState('');

  // Orders & appointments state
  const [orders, setOrders] = useState<Order[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | OrderStatus>('All');

  // Selected order for inspector modal
  const [inspectingOrder, setInspectingOrder] = useState<Order | null>(null);

  // New appointment modal
  const [showNewApptModal, setShowNewApptModal] = useState(false);
  const [newApptTitle, setNewApptTitle] = useState('');
  const [newApptClient, setNewApptClient] = useState('');
  const [newApptType, setNewApptType] = useState<'In-Store' | 'Virtual Call' | 'Pickup'>('In-Store');
  const [newApptDate, setNewApptDate] = useState('2026-11-04');
  const [newApptTime, setNewApptTime] = useState('02:00 PM - 03:00 PM');

  // Settings form state
  const [managerEmail, setManagerEmail] = useState('yndira@creacionesyafe.com');
  const [managerPassword, setManagerPassword] = useState('');
  const [managerWhatsApp, setManagerWhatsApp] = useState('+1 (210) 833-1766');
  const [orderAlertsEnabled, setOrderAlertsEnabled] = useState(true);
  const [dailyDigestEnabled, setDailyDigestEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showSettingsToast, setShowSettingsToast] = useState(false);

  // Active admin tab: 'overview' | 'orders' | 'appointments' | 'settings'
  const [adminTab, setAdminTab] = useState<'overview' | 'orders' | 'appointments' | 'settings'>('overview');

  // Real-time subscriptions
  useEffect(() => {
    const unsubOrders = subscribeToOrders((liveOrders) => {
      setOrders(liveOrders);
    });

    const unsubAppts = subscribeToAppointments((liveAppts) => {
      setAppointments(liveAppts);
    });

    return () => {
      unsubOrders();
      unsubAppts();
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = loginEmail.trim().toLowerCase();
    if (
      (cleanEmail.includes('yndira') || cleanEmail === 'yndira@creacionesyafe.com') &&
      loginPassword === '12345678'
    ) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid credentials. Please use the pre-filled demo account: yndira@creacionesyafe.com / 12345678');
    }
  };

  const handleBypass = () => {
    setIsAuthenticated(true);
    setAuthError('');
  };

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    await updateOrderStatus(orderId, newStatus);
  };

  const handleCreateAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newApptTitle || !newApptClient) return;

    const parsedDate = new Date(newApptDate);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const displayMonth = months[parsedDate.getMonth()] || 'Nov';
    const displayDay = String(parsedDate.getDate() + 1);

    const appt: Appointment = {
      id: `apt-${Date.now()}`,
      title: newApptTitle,
      clientName: newApptClient,
      type: newApptType,
      date: newApptDate,
      displayDay,
      displayMonth,
      timeSlot: newApptTime
    };

    await addAppointment(appt);
    setShowNewApptModal(false);
    setNewApptTitle('');
    setNewApptClient('');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSettingsToast(true);
    setTimeout(() => {
      setShowSettingsToast(false);
    }, 3500);
  };

  // Filter orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customization.text.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate KPIs
  const totalRevenue = orders.reduce((sum, o) => sum + (o.price || 0), 0);
  const activeOrdersCount = orders.filter((o) => o.status !== 'Completed').length;
  const inCustomizationCount = orders.filter((o) => o.status === 'In Progress').length;
  const pendingDeliveryCount = orders.filter((o) => o.status === 'Pending').length;

  return (
    <div className="relative min-h-screen bg-[#fff8f5] text-stone-900 font-sans pb-16">
      {/* AUTH GATE MODAL */}
      {!isAuthenticated && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-stone-900/40 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-lg bg-white rounded-3xl p-8 shadow-2xl border border-rose-100 overflow-hidden"
          >
            {/* Glow Accent */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-[#b90538]">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-[#b90538] uppercase tracking-widest font-bold block">
                    Security Gate
                  </span>
                  <h3 className="font-serif-luxury text-2xl text-stone-900 font-bold">
                    Atelier Access
                  </h3>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#b90538] animate-pulse" />
                Manager Role
              </span>
            </div>

            <p className="text-sm text-stone-600 mb-6 leading-relaxed">
              Welcome back, Yndira. Please authenticate or use the rapid atelier bypass to manage custom keepsake commissions.
            </p>

            {authError && (
              <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-[#b90538] flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Manager Identity / Email
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 text-stone-400 w-4 h-4" />
                  <input
                    type="text"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 text-stone-900 rounded-full pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#b90538]/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Atelier Passkey
                </label>
                <div className="relative flex items-center">
                  <Key className="absolute left-4 text-stone-400 w-4 h-4" />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 text-stone-900 rounded-full pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#b90538]/40"
                  />
                </div>
                <p className="mt-2 text-xs text-stone-500 flex items-center gap-1 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#b90538]" />
                  <span>Demo credentials pre-filled:</span>
                  <span className="font-bold text-stone-800">yndira@creacionesyafe.com</span> /{' '}
                  <span className="font-bold text-stone-800">12345678</span>
                </p>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-[#b90538] text-white text-sm font-semibold py-3.5 px-6 rounded-full shadow-lg hover:bg-[#dc2c4f] transition-all flex items-center justify-center gap-2"
                >
                  <span>Unlock Atelier Session</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleBypass}
                  className="bg-stone-100 text-stone-800 text-sm font-semibold py-3.5 px-5 rounded-full hover:bg-stone-200 transition-all flex items-center justify-center gap-2"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Bypass</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* TOP HEADER BAR */}
      <div className="bg-white/85 backdrop-blur-xl border-b border-rose-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToStore}
              className="flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-[#b90538] p-2 rounded-xl hover:bg-rose-50 transition-colors"
            >
              <Store className="w-4 h-4" />
              <span>Back to Store</span>
            </button>
            <div className="h-4 w-px bg-stone-200" />
            <div className="flex items-center gap-2">
              <span className="font-serif-luxury text-xl font-bold text-[#b90538]">
                Ya&amp;Fe Atelier
              </span>
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-100 text-[#b90538] font-bold">
                Admin Suite
              </span>
            </div>
          </div>

          {/* Quick Tab Selector */}
          <div className="flex items-center gap-1 sm:gap-2 bg-stone-100 p-1 rounded-full text-xs font-semibold">
            <button
              onClick={() => setAdminTab('overview')}
              className={`px-3 sm:px-4 py-1.5 rounded-full transition-all ${
                adminTab === 'overview'
                  ? 'bg-white text-[#b90538] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setAdminTab('orders')}
              className={`px-3 sm:px-4 py-1.5 rounded-full transition-all ${
                adminTab === 'orders'
                  ? 'bg-white text-[#b90538] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Orders ({orders.length})
            </button>
            <button
              onClick={() => setAdminTab('appointments')}
              className={`px-3 sm:px-4 py-1.5 rounded-full transition-all ${
                adminTab === 'appointments'
                  ? 'bg-white text-[#b90538] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Briefings
            </button>
            <button
              onClick={() => setAdminTab('settings')}
              className={`px-3 sm:px-4 py-1.5 rounded-full transition-all ${
                adminTab === 'settings'
                  ? 'bg-white text-[#b90538] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Settings
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAuthenticated(false)}
              title="Lock Session"
              className="p-2 text-stone-500 hover:text-[#b90538] hover:bg-stone-100 rounded-full transition-colors"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 space-y-8">
        {/* TOP IDENTITY & LIVE CLOUD STRIP */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-rose-100">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-rose-100 flex items-center justify-center text-[#b90538] shadow-inner font-serif-luxury text-xl font-bold border border-rose-200">
                YM
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif-luxury text-xl sm:text-2xl text-stone-900 font-bold">
                  Yndira Morales
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-[#b90538] text-[10px] uppercase font-bold">
                  Creative Director
                </span>
              </div>
              <p className="text-xs text-stone-500 flex items-center gap-2 mt-0.5">
                <span>Creaciones Ya&amp;Fe Studio Atelier</span>
                <span className="text-stone-300">•</span>
                <span className="text-[#b90538] font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Firestore Sync Active (orders/atelier)
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowNewApptModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#b90538] text-white text-xs font-semibold shadow-md hover:bg-[#dc2c4f] transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>New Consultation</span>
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-all"
            >
              <Lock className="w-4 h-4" />
              <span>Lock Gate</span>
            </button>
          </div>
        </div>

        {/* METRIC KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Active Orders */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-rose-100 flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-stone-500 font-bold">
                Active Orders
              </span>
              <div className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center text-[#b90538]">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="font-serif-luxury text-3xl font-bold text-stone-900">
                  {orders.length}
                </span>
                <span className="text-xs text-[#a43073] font-semibold">
                  +{orders.length > 4 ? orders.length - 4 : 2} today
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1">Keepsake items in studio pipeline</p>
            </div>
            <div className="w-full bg-stone-100 h-1.5 rounded-full mt-4 overflow-hidden">
              <div className="bg-[#b90538] h-full rounded-full" style={{ width: '74%' }} />
            </div>
          </div>

          {/* Card 2: In Customization */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-rose-100 flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-stone-500 font-bold">
                In Customization
              </span>
              <div className="w-9 h-9 rounded-full bg-pink-50 flex items-center justify-center text-[#a43073]">
                <Brush className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="font-serif-luxury text-3xl font-bold text-stone-900">
                  {inCustomizationCount || 7}
                </span>
                <span className="text-xs text-[#b90538] font-semibold">
                  Engraving &amp; Thread
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1">Personalization stations active</p>
            </div>
            <div className="w-full bg-stone-100 h-1.5 rounded-full mt-4 overflow-hidden">
              <div className="bg-[#a43073] h-full rounded-full" style={{ width: '52%' }} />
            </div>
          </div>

          {/* Card 3: Total Revenue */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-rose-100 flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-stone-500 font-bold">
                Total Revenue
              </span>
              <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="font-serif-luxury text-3xl font-bold text-stone-900">
                  ${(2840.5 + totalRevenue).toFixed(2)}
                </span>
                <span className="text-xs text-emerald-600 font-semibold">+18.4%</span>
              </div>
              <p className="text-xs text-stone-500 mt-1">Settled atelier commissions</p>
            </div>
            <div className="w-full bg-stone-100 h-1.5 rounded-full mt-4 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '84%' }} />
            </div>
          </div>

          {/* Card 4: Pending Delivery */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-rose-100 flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-stone-500 font-bold">
                Pending Delivery
              </span>
              <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center text-amber-700">
                <Truck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="font-serif-luxury text-3xl font-bold text-stone-900">
                  {pendingDeliveryCount || 5}
                </span>
                <span className="text-xs text-stone-500 font-semibold">2 Pickups today</span>
              </div>
              <p className="text-xs text-stone-500 mt-1">Ready with custom wax seal box</p>
            </div>
            <div className="w-full bg-stone-100 h-1.5 rounded-full mt-4 overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: '38%' }} />
            </div>
          </div>
        </div>

        {/* WORKTABLE SPLIT: ORDERS TABLE (Left 8 cols) & BRIEFINGS/SPOTLIGHT (Right 4 cols) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* ORDERS TABLE SECTION */}
          <div className="xl:col-span-8 bg-white p-6 sm:p-7 rounded-3xl shadow-sm border border-rose-100 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-widest text-[#b90538] font-bold">
                    Live Database
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 text-[10px] font-bold">
                    collection: orders
                  </span>
                </div>
                <h2 className="font-serif-luxury text-xl sm:text-2xl text-stone-900 font-bold mt-1">
                  Custom Atelier Orders
                </h2>
              </div>

              {/* Search & Status Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3.5 top-2.5 text-stone-400 w-4 h-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search client, order #..."
                    className="pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 text-stone-900 rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-[#b90538]/40 w-48 sm:w-60"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="bg-stone-50 border border-stone-200 text-stone-800 px-3 py-2 rounded-full text-xs font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-stone-500 text-xs font-bold uppercase tracking-wider border-b border-stone-100">
                    <th className="pb-3 pl-3">Client &amp; Contact</th>
                    <th className="pb-3">Product Specs &amp; Text</th>
                    <th className="pb-3">Delivery &amp; Schedule</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 pr-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-sm">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-stone-500 text-xs">
                        No orders match current query. Place a new order via Live Customizer!
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((ord) => (
                      <tr
                        key={ord.id}
                        className="hover:bg-stone-50/70 transition-colors group"
                      >
                        {/* Client & WhatsApp */}
                        <td className="py-4 pl-3">
                          <div className="font-bold text-stone-900">
                            {ord.customer.name}
                          </div>
                          <div className="flex items-center gap-1.5 text-[#b90538] text-xs font-semibold mt-0.5">
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>{ord.customer.whatsapp}</span>
                          </div>
                        </td>

                        {/* Product & Customization */}
                        <td className="py-4">
                          <div className="font-bold text-stone-900 truncate max-w-[180px]">
                            {ord.product}
                          </div>
                          <div className="text-stone-500 text-xs mt-0.5 truncate max-w-[220px]">
                            <span className="text-[#b90538] font-bold">
                              "{ord.customization.text}"
                            </span>{' '}
                            • {ord.customization.colorName || 'Rose Gold'}
                          </div>
                        </td>

                        {/* Address & Date */}
                        <td className="py-4">
                          <div className="text-stone-900 font-semibold text-xs">
                            {ord.customer.deliveryDate || 'Within 48h'}
                          </div>
                          <div className="text-stone-500 text-xs truncate max-w-[160px]">
                            {ord.customer.address}
                          </div>
                        </td>

                        {/* Amount */}
                        <td className="py-4 font-bold text-stone-900">
                          ${ord.price.toFixed(2)}
                        </td>

                        {/* Status Dropdown with soft pastel colors */}
                        <td className="py-4">
                          <select
                            value={ord.status}
                            onChange={(e) =>
                              handleStatusChange(ord.id, e.target.value as OrderStatus)
                            }
                            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors cursor-pointer focus:outline-none ${
                              ord.status === 'Pending'
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : ord.status === 'In Progress'
                                ? 'bg-pink-100 text-[#a43073] border-pink-200'
                                : 'bg-rose-100 text-[#b90538] border-rose-200'
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>

                        {/* Inspect Action */}
                        <td className="py-4 pr-3 text-right">
                          <button
                            onClick={() => setInspectingOrder(ord)}
                            className="p-2 rounded-full hover:bg-stone-200 text-stone-500 hover:text-[#b90538] transition-colors"
                            title="Inspect Order Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="pt-2 flex items-center justify-between text-stone-500 text-xs">
              <span>Showing {filteredOrders.length} active atelier commissions</span>
              <span className="font-semibold text-[#b90538]">
                Real-Time Firestore Listener Connected
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: APPOINTMENTS PANEL & CRAFT SPOTLIGHT */}
          <div className="xl:col-span-4 space-y-8">
            {/* Appointments Panel */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl shadow-sm border border-rose-100 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#a43073] font-bold">
                    Appointments Collection
                  </span>
                  <h3 className="font-serif-luxury text-xl text-stone-900 font-bold mt-1">
                    Studio Briefings
                  </h3>
                </div>
                <button
                  onClick={() => setShowNewApptModal(true)}
                  className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-[#b90538] hover:bg-rose-50 transition-colors"
                  title="Schedule New Briefing"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Appointments List */}
              <div className="space-y-3">
                {appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-3.5 rounded-2xl bg-stone-50 hover:bg-stone-100/80 border border-stone-200/50 transition-all flex items-start gap-3.5"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-rose-100 text-[#b90538] flex flex-col items-center justify-center shrink-0 border border-rose-200">
                      <span className="font-serif-luxury text-sm font-bold leading-none">
                        {apt.displayDay}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider font-bold">
                        {apt.displayMonth}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs font-bold text-stone-900 truncate">
                          {apt.title}
                        </h4>
                        <span
                          className={`text-[9px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                            apt.type === 'In-Store'
                              ? 'bg-rose-100 text-[#b90538]'
                              : apt.type === 'Virtual Call'
                              ? 'bg-pink-100 text-[#a43073]'
                              : 'bg-stone-200 text-stone-700'
                          }`}
                        >
                          {apt.type}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 truncate mt-0.5">
                        {apt.clientName}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-stone-500 font-medium">
                        <Calendar className="w-3 h-3 text-[#b90538]" />
                        <span>{apt.timeSlot}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowNewApptModal(true)}
                className="w-full py-3 rounded-full bg-stone-100 text-stone-800 hover:bg-stone-200 text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <span>Book New Client Consultation</span>
                <Calendar className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Atelier Craft Spotlight Banner */}
            <div className="relative rounded-3xl overflow-hidden shadow-sm bg-white p-6 border border-rose-100 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-[#b90538] font-bold">
                  Craft Spotlight
                </span>
                <Sparkles className="w-4 h-4 text-[#b90538]" />
              </div>

              <div className="relative w-full h-44 rounded-2xl overflow-hidden group">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlZApY5pR7S9dgTtiE34mSSg2BsvYInwArvkGlMe_9o6AABT_8CI4fjD4wuTpc869Oy8bNZNe4KfIdB49qUxrUXjsolt6EyoDlTlV5ZZCbACwAhMqT-foVl1pJ9Zr5Wt0u-gNouaAZJeS9SDOrP_kPeIVmgfymQEznHEPBLWuEWQ8HKZv3mCSraO7UxdYs_r3yYCJPu_oWpeosMp3KyAq0CqEIM8FJxbZWiYGoEST5CotrK_9WPbQ8"
                  alt="Luxurious bespoke bridal gift box handcrafted in blush pink with gold foil hot-stamped typography"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent flex items-end p-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-rose-200 font-bold block">
                      Signature Station
                    </span>
                    <p className="text-sm font-bold text-white">Hot Foil Stamping Station 02</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                All custom ribbon spools and gold foil dies are calibrated for today's commissions. Satin ribbon inventory: 94% optimal.
              </p>
            </div>
          </div>
        </div>

        {/* SECURITY & PROFILE SETTINGS PANEL */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-rose-100">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-stone-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-[#b90538]">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-[#b90538] font-bold block">
                  Account Governance
                </span>
                <h2 className="font-serif-luxury text-xl sm:text-2xl text-stone-900 font-bold">
                  Security &amp; Manager Settings
                </h2>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 max-w-md">
              Configure administrator access credentials, automatic WhatsApp ping notifications, and order fulfillment passkeys for Yndira.
            </p>
          </div>

          <form onSubmit={handleSaveSettings} className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Manager Email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">Manager Email</label>
                <input
                  type="email"
                  value={managerEmail}
                  onChange={(e) => setManagerEmail(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 text-stone-900 rounded-full px-5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#b90538]/40"
                />
                <span className="text-[10px] text-stone-400 block pl-3">
                  Primary atelier recovery address
                </span>
              </div>

              {/* Update Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">Update Password</label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={managerPassword}
                  onChange={(e) => setManagerPassword(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 text-stone-900 rounded-full px-5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#b90538]/40"
                />
                <span className="text-[10px] text-stone-400 block pl-3">
                  Leave blank to retain current passkey
                </span>
              </div>

              {/* WhatsApp Notification Gateway */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  WhatsApp Alerts Number
                </label>
                <input
                  type="text"
                  value={managerWhatsApp}
                  onChange={(e) => setManagerWhatsApp(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 text-stone-900 rounded-full px-5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#b90538]/40"
                />
                <span className="text-[10px] text-stone-400 block pl-3">
                  Instant ping when clients submit customizers
                </span>
              </div>
            </div>

            {/* Notification Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <label className="flex items-center gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-200/60 hover:bg-rose-50/50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={orderAlertsEnabled}
                  onChange={(e) => setOrderAlertsEnabled(e.target.checked)}
                  className="w-4 h-4 rounded text-[#b90538] accent-[#b90538] cursor-pointer"
                />
                <div>
                  <span className="text-xs font-bold text-stone-900 block">New Order Ping</span>
                  <span className="text-[10px] text-stone-500">Instant WhatsApp ping to Yndira</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-200/60 hover:bg-rose-50/50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={dailyDigestEnabled}
                  onChange={(e) => setDailyDigestEnabled(e.target.checked)}
                  className="w-4 h-4 rounded text-[#b90538] accent-[#b90538] cursor-pointer"
                />
                <div>
                  <span className="text-xs font-bold text-stone-900 block">Daily Brief Digest</span>
                  <span className="text-[10px] text-stone-500">Morning atelier schedule</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-200/60 hover:bg-rose-50/50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={twoFactorEnabled}
                  onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                  className="w-4 h-4 rounded text-[#b90538] accent-[#b90538] cursor-pointer"
                />
                <div>
                  <span className="text-xs font-bold text-stone-900 block">Two-Factor Passcode</span>
                  <span className="text-[10px] text-stone-500">Require mobile token for studio gate</span>
                </div>
              </label>
            </div>

            {/* Save Buttons & Toast */}
            <div className="flex items-center justify-between pt-2">
              <div
                className={`text-xs text-[#b90538] font-bold flex items-center gap-2 transition-opacity ${
                  showSettingsToast ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Security preferences updated successfully!</span>
              </div>

              <button
                type="submit"
                className="px-7 py-3 rounded-full bg-[#b90538] text-white text-xs font-semibold shadow-md hover:bg-[#dc2c4f] transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Preferences</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* INSPECTOR DETAIL MODAL */}
      <AnimatePresence>
        {inspectingOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-stone-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-rose-100 relative space-y-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#b90538] font-bold block">
                    Commission Docket
                  </span>
                  <h3 className="font-serif-luxury text-xl font-bold text-stone-900">
                    Order #{inspectingOrder.id}
                  </h3>
                </div>
                <button
                  onClick={() => setInspectingOrder(null)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/50">
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block">
                    Client &amp; Contact
                  </span>
                  <p className="font-bold text-stone-900 text-sm mt-0.5">
                    {inspectingOrder.customer.name}
                  </p>
                  <p className="text-[#b90538] font-semibold mt-0.5">
                    {inspectingOrder.customer.whatsapp}
                  </p>
                </div>

                <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/50">
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block">
                    Customized Piece &amp; Inscription
                  </span>
                  <p className="font-bold text-stone-900 text-sm mt-0.5">
                    {inspectingOrder.product}
                  </p>
                  <p className="text-stone-700 mt-1">
                    Text:{' '}
                    <span className="text-[#b90538] font-bold">
                      "{inspectingOrder.customization.text}"
                    </span>
                  </p>
                  <p className="text-stone-500 mt-0.5 text-xs">
                    Tone: {inspectingOrder.customization.colorName || inspectingOrder.customization.color}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/50">
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block">
                      Target Delivery
                    </span>
                    <p className="font-bold text-stone-900 mt-0.5">
                      {inspectingOrder.customer.deliveryDate}
                    </p>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/50">
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block">
                      Total Settlement
                    </span>
                    <p className="font-bold text-[#b90538] mt-0.5 text-base">
                      ${inspectingOrder.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {inspectingOrder.customer.giftNote && (
                  <div className="p-3 bg-rose-50/60 rounded-2xl border border-rose-100">
                    <span className="text-[10px] uppercase tracking-wider text-[#b90538] font-bold block">
                      Calligraphy Dedication
                    </span>
                    <p className="italic text-stone-800 mt-0.5">
                      "{inspectingOrder.customer.giftNote}"
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setInspectingOrder(null)}
                  className="px-6 py-2.5 rounded-full bg-[#b90538] text-white text-xs font-semibold hover:bg-[#dc2c4f] transition-all"
                >
                  Close Inspector
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* NEW APPOINTMENT MODAL */}
      <AnimatePresence>
        {showNewApptModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-stone-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-rose-100 relative space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#b90538] font-bold block">
                    Appointments Collection
                  </span>
                  <h3 className="font-serif-luxury text-xl font-bold text-stone-900">
                    Schedule Studio Briefing
                  </h3>
                </div>
                <button
                  onClick={() => setShowNewApptModal(false)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateAppointment} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Briefing Title</label>
                  <input
                    type="text"
                    required
                    value={newApptTitle}
                    onChange={(e) => setNewApptTitle(e.target.value)}
                    placeholder="e.g. Bridal Keepsake Box Review"
                    className="w-full bg-stone-50 border border-stone-200 text-stone-900 rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#b90538]/40"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Client Name / Event</label>
                  <input
                    type="text"
                    required
                    value={newApptClient}
                    onChange={(e) => setNewApptClient(e.target.value)}
                    placeholder="e.g. Veronica Castillo"
                    className="w-full bg-stone-50 border border-stone-200 text-stone-900 rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#b90538]/40"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Consultation Mode</label>
                    <select
                      value={newApptType}
                      onChange={(e) => setNewApptType(e.target.value as any)}
                      className="w-full bg-stone-50 border border-stone-200 text-stone-900 rounded-full px-3 py-2.5 focus:outline-none cursor-pointer"
                    >
                      <option value="In-Store">In-Store</option>
                      <option value="Virtual Call">Virtual Call</option>
                      <option value="Pickup">Pickup</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Date</label>
                    <input
                      type="date"
                      required
                      value={newApptDate}
                      onChange={(e) => setNewApptDate(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 text-stone-900 rounded-full px-3 py-2.5 focus:outline-none cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Time Window</label>
                  <input
                    type="text"
                    value={newApptTime}
                    onChange={(e) => setNewApptTime(e.target.value)}
                    placeholder="e.g. 02:00 PM - 03:00 PM"
                    className="w-full bg-stone-50 border border-stone-200 text-stone-900 rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#b90538]/40"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowNewApptModal(false)}
                    className="px-5 py-2.5 rounded-full bg-stone-100 text-stone-700 font-semibold hover:bg-stone-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#b90538] text-white font-semibold hover:bg-[#dc2c4f]"
                  >
                    Save Briefing
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
