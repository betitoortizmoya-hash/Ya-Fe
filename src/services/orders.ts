import { Order } from '../types';
import { PRODUCTS } from '../data/products';

const ORDERS_STORAGE_KEY = 'ya_fe_atelier_orders_v1';

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'YF-8042',
    customerName: 'Sofia Ortiz',
    customerWhatsApp: '+52 55 4123 9876',
    notes: 'Please wrap with pale blush ribbon, it is a birthday gift for my mom.',
    items: [
      {
        cartId: 'item-sofia-1',
        product: PRODUCTS[0], // Tumbler
        customization: {
          productId: 'tumbler-sip',
          productType: 'tumbler',
          customText: 'Alexandra',
          secondaryText: 'Mama & Sofia Est. 2024',
          fontId: 'alex-brush',
          productColor: '#DFA398',
          textColor: '#4A3428',
          textPlacement: 'vertical',
          fontSize: 3,
          selectedPatternId: 'rose-marble',
          metallicFinish: 'rose-gold',
        },
        quantity: 1,
        unitPrice: 38,
      },
    ],
    subtotal: 38,
    shipping: 0,
    total: 38,
    status: 'in_production',
    createdAt: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
  },
  {
    id: 'YF-8041',
    customerName: 'Chef Valentina Moya',
    customerWhatsApp: '+1 (555) 349-2190',
    notes: 'For our bakery opening! Gold metallic thread please.',
    items: [
      {
        cartId: 'item-val-1',
        product: PRODUCTS[1], // Apron
        customization: {
          productId: 'apron-artisan',
          productType: 'apron',
          customText: 'Chef Valentina',
          secondaryText: 'Cuisine & Pâtisserie',
          fontId: 'great-vibes',
          productColor: '#2B3848',
          textColor: '#D4AF37',
          textPlacement: 'chest',
          fontSize: 3,
        },
        quantity: 2,
        unitPrice: 44,
      },
    ],
    subtotal: 88,
    shipping: 0,
    total: 88,
    status: 'pending',
    createdAt: new Date(Date.now() - 3600 * 1000 * 22).toISOString(),
  },
];

export const getStoredOrders = (): Order[] => {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_ORDERS;
  }
};

export const saveOrder = (order: Order): void => {
  try {
    const current = getStoredOrders();
    const updated = [order, ...current];
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save order to localStorage', err);
  }
};

export const updateOrderStatus = (orderId: string, status: Order['status']): Order[] => {
  try {
    const current = getStoredOrders();
    const updated = current.map((ord) => (ord.id === orderId ? { ...ord, status } : ord));
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
};
