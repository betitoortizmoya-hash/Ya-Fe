export type ProductType = 'tumbler' | 'apron' | 'tote' | 'mug' | 'shirt';

export interface FontOption {
  id: string;
  name: string;
  family: string;
  category: 'script' | 'serif' | 'sans' | 'display' | 'handwriting';
  previewText?: string;
  description: string;
}

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  borderClass?: string;
  textColorHint?: string;
}

export interface PatternOption {
  id: string;
  name: string;
  thumbnail: string;
  cssBackground: string;
  type: 'preset' | 'custom';
}

export interface ProductCustomization {
  productId: string;
  productType: ProductType;
  customText: string;
  secondaryText?: string;
  fontId: string;
  productColor: string;
  textColor: string;
  textPlacement?: 'vertical' | 'horizontal' | 'chest' | 'pocket' | 'center';
  fontSize: number; 
  backgroundImageUrl?: string | null;
  selectedPatternId?: string;
  metallicFinish?: 'rose-gold' | 'silver' | 'gold' | 'matte' | 'laser-etched';
}

export interface Product {
  id: string;
  name: string;
  colloquialTitle: string;
  category: ProductType;
  basePrice: number;
  originalPrice?: number;
  badge?: string;
  tagline: string;
  description: string;
  specs: string[];
  defaultCustomization: ProductCustomization;
  availableColors: ColorOption[];
  textColors: ColorOption[];
}

export interface CartItem {
  cartId: string;
  product: Product;
  customization: ProductCustomization;
  quantity: number;
  unitPrice: number;
}

export type OrderStatus = 'pending' | 'in_production' | 'dispatched' | 'delivered';

export interface Order {
  id: string;
  customerName: string;
  customerWhatsApp: string;
  notes?: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  deliveryDate?: string; // Nuevo campo para la agenda
}
