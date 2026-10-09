export type ProductCategory = 'textiles' | 'balloons' | 'puzzles' | 'tumblers';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  rating: number;
  reviewsCount?: number;
  badge?: string;
  badgeType?: 'primary' | 'secondary' | 'tertiary';
  image: string;
  mockupImage?: string;
  description: string;
  featurePill: {
    icon: string;
    text: string;
    badgeText: string;
  };
  textPositionClass?: string;
}

export interface CustomizationConfig {
  text: string;
  color: string;
  colorName: string;
  font: string;
  fontName: string;
  isItalic?: boolean;
}

export interface CustomerInfo {
  name: string;
  whatsapp: string;
  address: string;
  deliveryDate: string;
  giftNote?: string;
}

export type OrderStatus = 'Pending' | 'In Progress' | 'Completed';

export interface Order {
  id: string;
  product: string;
  price: number;
  customization: {
    text: string;
    color: string;
    colorName?: string;
    font: string;
    fontName?: string;
  };
  customer: {
    name: string;
    whatsapp: string;
    address: string;
    deliveryDate: string;
    giftNote?: string;
  };
  mailchimpSubscribed: boolean;
  status: OrderStatus;
  createdAt: string;
}

export interface Appointment {
  id: string;
  title: string;
  clientName: string;
  type: 'In-Store' | 'Virtual Call' | 'Pickup';
  date: string;
  displayDay: string;
  displayMonth: string;
  timeSlot: string;
  notes?: string;
}

export interface ColorSwatch {
  name: string;
  hex: string;
  shortLabel: string;
  gradient: string;
}

export interface FontOption {
  name: string;
  fontFamily: string;
  displayName: string;
  subLabel: string;
  isItalic?: boolean;
  fontClass?: string;
}
