import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  Firestore,
  query,
  orderBy,
  Unsubscribe
} from 'firebase/firestore';
import { Order, Appointment, OrderStatus } from '../types';
import { INITIAL_ORDERS, INITIAL_APPOINTMENTS } from '../data/products';

// Firebase standard configuration via environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDemoAtelierYaFeKey992019',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'creaciones-yafe.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'creaciones-yafe',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'creaciones-yafe.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '105725557137',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:105725557137:web:99494afc1b1243da'
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let isFirestoreAvailable = false;

// Attempt Firebase initialization
try {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  db = getFirestore(app);
  // Mark as configured if an explicit project id is provided in environment
  if (import.meta.env.VITE_FIREBASE_PROJECT_ID) {
    isFirestoreAvailable = true;
  }
} catch (err) {
  console.info('[Firebase] Local simulated storage fallback active:', err);
}

// Reactive Local Storage Fallback Store (keeps orders synced between customizer and admin seamlessly)
const LOCAL_STORAGE_ORDERS_KEY = 'yafe_orders_v1';
const LOCAL_STORAGE_APPTS_KEY = 'yafe_appointments_v1';

function getStoredOrders(): Order[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading orders from localStorage', e);
  }
  return INITIAL_ORDERS;
}

function saveStoredOrders(orders: Order[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error('Failed saving orders to localStorage', e);
  }
}

function getStoredAppointments(): Appointment[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_APPTS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading appointments from localStorage', e);
  }
  return INITIAL_APPOINTMENTS;
}

function saveStoredAppointments(appts: Appointment[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_APPTS_KEY, JSON.stringify(appts));
  } catch (e) {
    console.error('Failed saving appointments to localStorage', e);
  }
}

// Event listeners for inter-tab / inter-component local reactive sync
const orderListeners = new Set<(orders: Order[]) => void>();
const apptListeners = new Set<(appts: Appointment[]) => void>();

function notifyOrderListeners() {
  const current = getStoredOrders();
  orderListeners.forEach((listener) => listener(current));
}

function notifyApptListeners() {
  const current = getStoredAppointments();
  apptListeners.forEach((listener) => listener(current));
}

/**
 * Real-time order listener (supports both Firestore onSnapshot and reactive local store)
 */
export function subscribeToOrders(callback: (orders: Order[]) => void): Unsubscribe {
  // If real Firestore is enabled with project connection
  if (isFirestoreAvailable && db) {
    try {
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const remoteOrders: Order[] = snapshot.docs.map((d) => ({
              id: d.id,
              ...(d.data() as Omit<Order, 'id'>)
            }));
            callback(remoteOrders);
          } else {
            callback(getStoredOrders());
          }
        },
        (error) => {
          console.warn('[Firestore onSnapshot error, falling back to local sync]:', error);
          callback(getStoredOrders());
        }
      );
      return unsubscribe;
    } catch (e) {
      console.warn('[Firestore connection error, using local store]:', e);
    }
  }

  // Reactive Local fallback
  orderListeners.add(callback);
  callback(getStoredOrders());

  return () => {
    orderListeners.delete(callback);
  };
}

/**
 * Saves a new customized order to the Firestore 'orders' collection
 */
export async function addOrderToFirestore(orderData: Omit<Order, 'id'>): Promise<string> {
  let generatedId = `YF-${Math.floor(1000 + Math.random() * 9000)}`;

  if (isFirestoreAvailable && db) {
    try {
      const docRef = await addDoc(collection(db, 'orders'), orderData);
      generatedId = docRef.id;
    } catch (err) {
      console.warn('[Firestore addDoc failed, writing to local persistent storage]:', err);
    }
  }

  // Save to persistent reactive store
  const current = getStoredOrders();
  const newOrder: Order = {
    ...orderData,
    id: generatedId
  };
  const updated = [newOrder, ...current];
  saveStoredOrders(updated);
  notifyOrderListeners();

  return generatedId;
}

/**
 * Updates order status (Pending, In Progress, Completed) in real time
 */
export async function updateOrderStatus(orderId: string, newStatus: OrderStatus): Promise<void> {
  if (isFirestoreAvailable && db) {
    try {
      const docRef = doc(db, 'orders', orderId);
      await updateDoc(docRef, { status: newStatus });
    } catch (err) {
      console.warn('[Firestore updateDoc failed, updating local store]:', err);
    }
  }

  // Update in local persistent store
  const current = getStoredOrders();
  const updated = current.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord));
  saveStoredOrders(updated);
  notifyOrderListeners();
}

/**
 * Real-time appointments listener
 */
export function subscribeToAppointments(callback: (appts: Appointment[]) => void): Unsubscribe {
  apptListeners.add(callback);
  callback(getStoredAppointments());
  return () => {
    apptListeners.delete(callback);
  };
}

/**
 * Add a new appointment / consultation
 */
export async function addAppointment(newAppt: Appointment): Promise<void> {
  const current = getStoredAppointments();
  const updated = [newAppt, ...current];
  saveStoredAppointments(updated);
  notifyApptListeners();
}

/**
 * Simulated Mailchimp Integration
 * Handles marketing newsletter subscription as required by user prompt
 */
export function handleMailchimpSync(emailOrPhone: string, optedIn: boolean): void {
  if (!optedIn) return;
  console.log('[Mailchimp Integration Simulation] ✨');
  console.log(`Subscribing contact to Creaciones Ya&Fe VIP Audience List: "${emailOrPhone}"`);
  console.log('Merge tags applied: { TAG: "LIVE_CUSTOMIZER_CHECKOUT", STATUS: "SUBSCRIBED" }');
}

export { app, db };
