import { Product, ColorSwatch, FontOption } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'apron',
    name: 'Luxe Velvet Embroidered Apron',
    category: 'textiles',
    categoryLabel: 'Embroidered Textiles',
    price: 34.0,
    rating: 4.9,
    reviewsCount: 142,
    badge: 'Bestseller',
    badgeType: 'primary',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVTE4X1rCIXlag_JM_y9hv-wY7A4iy_3l35Xdjc2kTBZWXFXAquCntghXGxC5Zx2XrhK58eWRcJjaKkWCaelWjOJOjUNsAEkRsXINuHXb5l1mEPzyeIVv6GwXisTdiUinGcAk5ZeHF_ocbaVsSYhg7Bx11airQ3DKq8LNKEma5sDAOPFPCcWFxE1CKfr2I0rPHvAXsC6oiVHsNvL1btavVo0Py3U6Ek4v2J0oyr_XTa0ne0B6-qdt3',
    mockupImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDG7WHgTaKBiMHDIY2xyUAkF_9LUr-IYCH59-Wn0Z_waiU78Wy97Tc5kAANY0Oa8ygJm_z7tkuFTFUN1Mk3Tg__sg058s4SBHP-PLfPwU76BNHZFCH4DM27QoFIhR0uzikBibt4m-fcc2QmbczivE0CDU3aS8ouHwLc-aZIooGKRvFDED4ha1xGBcw0pynab6S__KsRXRV6oaXPaNJsCsriFI_lbdMygnLi40ZDlAKyECQaxv0z5ReF',
    description: 'Pure cotton twill with plush velvet straps, reinforced pockets, and customized silk stitch monogram.',
    featurePill: {
      icon: 'draw',
      text: 'Free Monogramming',
      badgeText: '12 Fonts'
    },
    textPositionClass: 'top-[44%]'
  },
  {
    id: 'balloon',
    name: 'Crystal Everlasting Bubble Balloon',
    category: 'balloons',
    categoryLabel: 'Crystal Spheres',
    price: 38.0,
    rating: 5.0,
    reviewsCount: 98,
    badge: 'Everlasting',
    badgeType: 'secondary',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVqrKHXRTAYdT9aaHBD4t7iaTiiQqfF94RLmCWVbIqSQBOQ6sVnyBF5JT66ZXTWtex3x4llYFZ1ihyfvJuII3NQvfH1JXqHiUQuUIi4nogPvXgeiJ-k3qxT_Rnoiqs06oP49x_wgxdC5cqC2ST-yjG73QiksQh0go2ZlEiigXo-Q0zmu4dKiA9NYSV-T2GLENx4fig7lt4koQsZoGysDK2KAouqoPHoHiIqu7u81EhhVicWU7mPvW_',
    mockupImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVqrKHXRTAYdT9aaHBD4t7iaTiiQqfF94RLmCWVbIqSQBOQ6sVnyBF5JT66ZXTWtex3x4llYFZ1ihyfvJuII3NQvfH1JXqHiUQuUIi4nogPvXgeiJ-k3qxT_Rnoiqs06oP49x_wgxdC5cqC2ST-yjG73QiksQh0go2ZlEiigXo-Q0zmu4dKiA9NYSV-T2GLENx4fig7lt4koQsZoGysDK2KAouqoPHoHiIqu7u81EhhVicWU7mPvW_',
    description: 'Seamless optical PVC sphere enclosing preserved botanical florals, fairy warm micro-LEDs, and custom foil text.',
    featurePill: {
      icon: 'spa',
      text: 'Handcrafted Florals',
      badgeText: 'Stays 3+ Mos'
    },
    textPositionClass: 'top-[38%]'
  },
  {
    id: 'puzzle',
    name: 'Artisan Keepsake Photo Puzzle',
    category: 'puzzles',
    categoryLabel: 'Memories & Games',
    price: 29.0,
    rating: 4.8,
    reviewsCount: 84,
    badge: 'Heirloom',
    badgeType: 'tertiary',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHmCWdJ9pnjcSN4wAYHXRNbN4TA_isB3ftrz2bQ8xtk_XxwggDHwEfbXKPIk1qAO0onJZYBdS6QKihWZFD-uX4OtNapA6gLvtLIYGTyak5B1-qOjGsn0QPfc-9VvN_EghgrTOUhhQ5CNAChVskEraZKiIADgOAga9B0-UdH2FJvkm37nDw4DHmNx2-Njcdg9ZSBxFskuSh4yYhpdNKXQyBP6FJY8fM6k9fL55jOv5yiNHhG7Bdz0pZ',
    mockupImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHmCWdJ9pnjcSN4wAYHXRNbN4TA_isB3ftrz2bQ8xtk_XxwggDHwEfbXKPIk1qAO0onJZYBdS6QKihWZFD-uX4OtNapA6gLvtLIYGTyak5B1-qOjGsn0QPfc-9VvN_EghgrTOUhhQ5CNAChVskEraZKiIADgOAga9B0-UdH2FJvkm37nDw4DHmNx2-Njcdg9ZSBxFskuSh4yYhpdNKXQyBP6FJY8fM6k9fL55jOv5yiNHhG7Bdz0pZ',
    description: 'Laser-cut 120-piece wooden jigsaw puzzle made from sustainable birch wood with laser-engraved slide keepsake box.',
    featurePill: {
      icon: 'inventory_2',
      text: 'Wooden Gift Chest',
      badgeText: 'HD Print'
    },
    textPositionClass: 'top-[48%]'
  },
  {
    id: 'tumbler',
    name: 'Rose Gold Insulated Shimmer Tumbler',
    category: 'tumblers',
    categoryLabel: 'Keepsake Drinkware',
    price: 26.0,
    rating: 4.9,
    reviewsCount: 110,
    badge: 'Laser Etched',
    badgeType: 'secondary',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBB3tAYrLOiLVyOdCIDIRkxB_GsV9rfJiNdYr-mtbufsRSOYZ9fQ4j3l1VehcbzCNzRJzFG1D92x-cgGQA8PbRUEaQA1UVMlkkz1alAXfruv7UO_mkQFcNWP5Blhw0GQe3I2mMD8owB33zR6e6txzjts4z0rqvu-UON78SU-qZ-_lXhZA5ksSRRSQyQE8zqo5zzG-w6v9dkMYbvTzUCaZ0qS3CiWr4XCWV77OzGGUrEoKl8yCRgskVH',
    mockupImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBB3tAYrLOiLVyOdCIDIRkxB_GsV9rfJiNdYr-mtbufsRSOYZ9fQ4j3l1VehcbzCNzRJzFG1D92x-cgGQA8PbRUEaQA1UVMlkkz1alAXfruv7UO_mkQFcNWP5Blhw0GQe3I2mMD8owB33zR6e6txzjts4z0rqvu-UON78SU-qZ-_lXhZA5ksSRRSQyQE8zqo5zzG-w6v9dkMYbvTzUCaZ0qS3CiWr4XCWV77OzGGUrEoKl8yCRgskVH',
    description: 'Double-wall vacuum insulation keeps drinks chilled for 24h. Permanent fiber-laser engraving will never fade.',
    featurePill: {
      icon: 'ac_unit',
      text: '24h Cold / 12h Hot',
      badgeText: '20 oz / 600ml'
    },
    textPositionClass: 'top-[42%]'
  }
];

export const COLOR_SWATCHES: ColorSwatch[] = [
  {
    name: 'Rose Gold Atelier',
    hex: '#b90538',
    shortLabel: 'Rose',
    gradient: 'radial-gradient(circle, #ffb2b7 0%, #b90538 100%)'
  },
  {
    name: 'Champagne Gold Ciselé',
    hex: '#d4af37',
    shortLabel: 'Gold',
    gradient: 'radial-gradient(circle, #fde68a 0%, #b45309 100%)'
  },
  {
    name: 'Pivoine Blush Pink',
    hex: '#a43073',
    shortLabel: 'Blush',
    gradient: 'radial-gradient(circle, #fbcfe8 0%, #a43073 100%)'
  },
  {
    name: 'Powder Silk Ivory',
    hex: '#4a3b32',
    shortLabel: 'Ivory',
    gradient: 'radial-gradient(circle, #ffffff 0%, #e0d8d5 100%)'
  },
  {
    name: 'Velvet Midnight Black',
    hex: '#1e1b19',
    shortLabel: 'Noir',
    gradient: 'radial-gradient(circle, #44403c 0%, #1e1b19 100%)'
  },
  {
    name: 'Botanical Emerald Sage',
    hex: '#2d5a43',
    shortLabel: 'Sage',
    gradient: 'radial-gradient(circle, #a7f3d0 0%, #064e3b 100%)'
  }
];

export const FONT_OPTIONS: FontOption[] = [
  {
    name: 'Serif Royal',
    fontFamily: "'Playfair Display', Georgia, serif",
    displayName: 'Aa Romantique',
    subLabel: 'Serif Royal Couture',
    isItalic: false,
    fontClass: 'font-serif'
  },
  {
    name: 'Modern Chic',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    displayName: 'Aa Moderne',
    subLabel: 'Modern Sans Épuré',
    isItalic: false,
    fontClass: 'font-sans font-bold'
  },
  {
    name: 'Romance Calligraphy',
    fontFamily: "'Playfair Display', Georgia, serif",
    displayName: 'Aa Calligraphie',
    subLabel: 'Romance Cursive',
    isItalic: true,
    fontClass: 'font-serif italic'
  },
  {
    name: 'Minimal Intemporal',
    fontFamily: "monospace",
    displayName: 'AA ATELIER',
    subLabel: 'Minimal Intemporel',
    isItalic: false,
    fontClass: 'font-mono tracking-widest uppercase font-semibold'
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'YF-8092',
    product: 'Silk Bridal Keepsake Box',
    price: 185.0,
    customization: {
      text: 'Forever C&J',
      color: '#b90538',
      colorName: 'Rose Gold Atelier',
      font: "'Playfair Display', serif",
      fontName: 'Serif Royal'
    },
    customer: {
      name: 'Camila Valenzuela',
      whatsapp: '+1 (809) 492-1084',
      address: 'Piantini, Santo Domingo',
      deliveryDate: '2026-10-28',
      giftNote: 'To love and cherish forever'
    },
    mailchimpSubscribed: true,
    status: 'In Progress' as const,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: 'YF-8093',
    product: 'Engraved Acrylic Memory Frame',
    price: 94.5,
    customization: {
      text: 'First Anniversary',
      color: '#d4af37',
      colorName: 'Champagne Gold',
      font: "'Playfair Display', serif",
      fontName: 'Romance Calligraphy'
    },
    customer: {
      name: 'Mateo Del Rosario',
      whatsapp: '+1 (829) 710-8832',
      address: 'Bella Vista, Santo Domingo',
      deliveryDate: '2026-11-02'
    },
    mailchimpSubscribed: false,
    status: 'Pending' as const,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: 'YF-8094',
    product: 'Velvet Keepsake Ring Pillow',
    price: 120.0,
    customization: {
      text: 'L & S • 2024',
      color: '#a43073',
      colorName: 'Pivoine Blush Pink',
      font: "'Playfair Display', serif",
      fontName: 'Serif Royal'
    },
    customer: {
      name: 'Lucia Fernandez',
      whatsapp: '+1 (809) 330-9921',
      address: 'Atelier Concierge Station',
      deliveryDate: '2026-10-22'
    },
    mailchimpSubscribed: true,
    status: 'Completed' as const,
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString()
  },
  {
    id: 'YF-8095',
    product: 'Luxury Personalized Wine Chest',
    price: 240.0,
    customization: {
      text: 'Familia Santana',
      color: '#d4af37',
      colorName: 'Champagne Gold',
      font: "'Playfair Display', serif",
      fontName: 'Serif Royal'
    },
    customer: {
      name: 'Gabriel Santana',
      whatsapp: '+1 (829) 554-1002',
      address: 'Naco, Santo Domingo',
      deliveryDate: '2026-11-05'
    },
    mailchimpSubscribed: true,
    status: 'In Progress' as const,
    createdAt: new Date(Date.now() - 3600000 * 40).toISOString()
  }
];

export const INITIAL_APPOINTMENTS = [
  {
    id: 'apt-1',
    title: 'Wedding Favors Briefing',
    clientName: 'Isabella Sterling (65 Guests)',
    type: 'In-Store' as const,
    date: '2026-10-24',
    displayDay: '24',
    displayMonth: 'Oct',
    timeSlot: '03:30 PM - 04:30 PM',
    notes: 'Sample box review and ribbon tone selection'
  },
  {
    id: 'apt-2',
    title: 'Holiday Gift Box Preview',
    clientName: 'Corporate Keepsakes (Banco BHD)',
    type: 'Virtual Call' as const,
    date: '2026-10-26',
    displayDay: '26',
    displayMonth: 'Oct',
    timeSlot: '10:00 AM - 10:45 AM',
    notes: 'Custom batch of 120 tumblers with laser logos'
  },
  {
    id: 'apt-3',
    title: 'Bridal Keepsake Collection Pickup',
    clientName: 'Lucia Fernandez',
    type: 'Pickup' as const,
    date: '2026-10-29',
    displayDay: '29',
    displayMonth: 'Oct',
    timeSlot: '02:00 PM - 02:30 PM',
    notes: 'Ready for handoff with wax seal ribbon'
  }
];
