import { ColorOption, PatternOption, Product } from '../types';

export const TUMBLER_COLOR_OPTIONS: ColorOption[] = [
  { id: 'rose-gold', name: 'Rose Gold Shimmer', hex: '#DFA398' },
  { id: 'champagne', name: 'Champagne Luster', hex: '#E6D7C3' },
  { id: 'blush-pink', name: 'Soft Blush', hex: '#F0C9CD' },
  { id: 'sage-matte', name: 'Matte Sagebrush', hex: '#9AA897' },
  { id: 'brushed-steel', name: 'Brushed Silver Steel', hex: '#D8DCE0' },
  { id: 'terracotta', name: 'Warm Terracotta', hex: '#C67D65' },
  { id: 'pearl-cream', name: 'Pearl Cream', hex: '#F7F2EA' },
  { id: 'midnight-slate', name: 'Midnight Onyx', hex: '#26292E' },
  { id: 'lavender-mist', name: 'Lavender Mist', hex: '#C8BDD4' }
];

export const APRON_COLOR_OPTIONS: ColorOption[] = [
  { id: 'linen-oatmeal', name: 'Natural Oatmeal Linen', hex: '#D8CFBC' },
  { id: 'french-navy', name: 'French Navy', hex: '#2B3848' },
  { id: 'sage-green', name: 'Eucalyptus Sage', hex: '#7A8C7A' },
  { id: 'dusty-rose', name: 'Dusty Rose Petal', hex: '#C89A94' },
  { id: 'terracotta-clay', name: 'Rustic Terracotta', hex: '#9E5B47' },
  { id: 'charcoal-noir', name: 'Artisan Charcoal Noir', hex: '#2A2928' },
  { id: 'olive-drab', name: 'Tuscan Olive', hex: '#585942' },
  { id: 'creamy-vanilla', name: 'Washed Vanilla', hex: '#EDE6DA' },
  { id: 'caramel-latte', name: 'Caramel Macchiato', hex: '#9C6E4A' }
];

export const SHIRT_COLOR_OPTIONS: ColorOption[] = [
  { id: 'classic-white', name: 'Blanco Nieve', hex: '#F9FAFB' },
  { id: 'blush-pink', name: 'Rosa Femenino', hex: '#FDF2F8' },
  { id: 'midnight-navy', name: 'Azul Noche', hex: '#1E293B' },
  { id: 'soft-lavender', name: 'Lavanda Suave', hex: '#F3E8FF' },
  { id: 'champagne-silk', name: 'Seda Champagne', hex: '#FEF3C7' },
];

export const TEXT_COLOR_OPTIONS: ColorOption[] = [
  { id: 'engraved-bronze', name: 'Laser Etched Bronze', hex: '#4A3428' },
  { id: 'metallic-gold', name: 'Gilded 24k Gold Foil', hex: '#D4AF37' },
  { id: 'rose-gold-leaf', name: 'Rose Gold Foil', hex: '#B76E79' },
  { id: 'sterling-silver', name: 'Sterling Silver Foil', hex: '#CBD5E1' },
  { id: 'crisp-white', name: 'Crisp White Enamel', hex: '#FFFFFF' },
  { id: 'noir-matte', name: 'Matte Noir Black', hex: '#1C1917' },
  { id: 'champagne-cream', name: 'Champagne Cream', hex: '#FDF6E2' },
  { id: 'espresso-deep', name: 'Espresso Roast', hex: '#3B2F2F' }
];

export const TUMBLER_TEXTURE_PRESETS: PatternOption[] = [
  {
    id: 'none',
    name: 'Clean Metallic Finish',
    thumbnail: 'linear-gradient(135deg, #dfa398 0%, #b76e79 100%)',
    cssBackground: '',
    type: 'preset'
  },
  {
    id: 'rose-marble',
    name: 'Italian Rose Marble',
    thumbnail: 'radial-gradient(circle at 50% 50%, #fbe9e7 0%, #d7ccc8 100%)',
    cssBackground: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.85) 0%, transparent 40%), linear-gradient(135deg, rgba(243,212,207,0.8) 0%, rgba(206,168,162,0.9) 50%, rgba(247,235,232,0.85) 100%)',
    type: 'preset'
  },
  {
    id: 'eucalyptus-botanical',
    name: 'Wild Eucalyptus & Bloom',
    thumbnail: 'linear-gradient(135deg, #a3b899 0%, #e8d5b5 100%)',
    cssBackground: 'linear-gradient(135deg, rgba(163,184,153,0.7) 0%, rgba(243,232,217,0.8) 50%, rgba(183,198,176,0.6) 100%)',
    type: 'preset'
  },
  {
    id: 'terrazzo-pastel',
    name: 'Artisan Terrazzo Stone',
    thumbnail: 'radial-gradient(#f0b3ad 15%, #fcf7f2 16%)',
    cssBackground: 'radial-gradient(circle at 30% 20%, rgba(224,168,153,0.5) 0%, transparent 35%), radial-gradient(circle at 75% 65%, rgba(154,168,151,0.5) 0%, transparent 40%), linear-gradient(to bottom, rgba(253,248,245,0.9), rgba(242,230,224,0.9))',
    type: 'preset'
  },
  {
    id: 'celestial-stardust',
    name: 'Golden Dust & Starlight',
    thumbnail: 'radial-gradient(circle, #fce8a6 10%, #43384f 90%)',
    cssBackground: 'radial-gradient(circle at 50% 30%, rgba(255,243,196,0.5) 0%, transparent 50%), linear-gradient(180deg, rgba(67,56,79,0.85) 0%, rgba(42,35,51,0.95) 100%)',
    type: 'preset'
  },
  {
    id: 'blush-watercolor',
    name: 'Soft Ombré Watercolor',
    thumbnail: 'linear-gradient(180deg, #f7d6d0 0%, #e7b1a8 50%, #c48277 100%)',
    cssBackground: 'linear-gradient(180deg, rgba(247,214,208,0.75) 0%, rgba(231,177,168,0.8) 50%, rgba(196,130,119,0.85) 100%)',
    type: 'preset'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'tumbler-sip',
    name: 'The All-Day Sip Tumbler',
    colloquialTitle: 'The All-Day Sip 20oz Insulated Stainless Steel Tumbler',
    category: 'tumbler',
    basePrice: 38,
    originalPrice: 48,
    badge: 'Bestseller',
    tagline: 'Colloquial barista-grade double-wall vacuum insulated coffee tumbler with straw & leakproof splash lid',
    description: 'Keep your matcha iced for 24 hours or your oat latte piping hot for 8 hours. Crafted from culinary-grade 18/8 stainless steel, precision laser-etched with your signature font, custom name, and optional custom pattern or image wrap.',
    specs: [
      '20oz (590ml) fits standard car cup holders',
      'Double-wall vacuum insulation (No sweat exterior)',
      'Culinary 18/8 food-grade stainless steel',
      'BPA-free splash lid with stainless steel reusable straw',
      'Permanent high-precision laser etching'
    ],
    defaultCustomization: {
      productId: 'tumbler-sip',
      productType: 'tumbler',
      customText: 'Alexandra',
      secondaryText: 'Mama & Sofia Est. 2024',
      fontId: 'alex-brush',
      productColor: '#DFA398',
      textColor: '#4A3428',
      textPlacement: 'vertical',
      fontSize: 3,
      backgroundImageUrl: null,
      selectedPatternId: 'none',
      metallicFinish: 'rose-gold'
    },
    availableColors: TUMBLER_COLOR_OPTIONS,
    textColors: TEXT_COLOR_OPTIONS
  },
  {
    id: 'shirt-polo',
    name: 'Polo Atelier Femenina',
    colloquialTitle: 'Camiseta Tipo Polo Premium',
    category: 'shirt',
    basePrice: 32,
    badge: 'Nuevo',
    tagline: 'Algodón pima ultra suave con corte femenino y cuello estructurado.',
    description: 'Perfecta para un look casual chic. Sube tu patrón de fondo favorito o mantenla lisa con un bordado directo en el pecho.',
    specs: [
      '100% Algodón Pima de alta transpirabilidad',
      'Corte ajustado femenino (Slim fit)',
      'Cuello acanalado que no pierde su forma',
      'Bordado o sublimado premium'
    ],
    defaultCustomization: {
      productId: 'shirt-polo',
      productType: 'shirt',
      customText: 'YA&FE',
      secondaryText: 'Atelier',
      fontId: 'montserrat',
      productColor: '#FDF2F8',
      textColor: '#1E293B',
      textPlacement: 'chest',
      fontSize: 3,
      selectedPatternId: 'none',
    },
    availableColors: SHIRT_COLOR_OPTIONS,
    textColors: TEXT_COLOR_OPTIONS
  },
  {
    id: 'shirt-formal',
    name: 'Camisa Formal de Vestir',
    colloquialTitle: 'Camisa Oxford de Vestir Customizada',
    category: 'shirt',
    basePrice: 45,
    badge: 'Elegance',
    tagline: 'Corte sastre en tela Oxford resistente a arrugas con botones nacarados.',
    description: 'Eleva tu estilo profesional. Añade un monograma discreto o un patrón floral completo para un diseño único de alta costura.',
    specs: [
      'Mezcla Oxford Premium (Anti-arrugas)',
      'Botones nacarados y cuello fusionado',
      'Costura francesa de alta durabilidad',
      'Acepta fondos completos y bordados'
    ],
    defaultCustomization: {
      productId: 'shirt-formal',
      productType: 'shirt',
      customText: 'Yndira',
      secondaryText: 'Est. 2024',
      fontId: 'alex-brush',
      productColor: '#F9FAFB',
      textColor: '#B76E79',
      textPlacement: 'pocket',
      fontSize: 3,
      selectedPatternId: 'none',
    },
    availableColors: SHIRT_COLOR_OPTIONS,
    textColors: TEXT_COLOR_OPTIONS
  },
  {
    id: 'apron-artisan',
    name: 'The French Bistro Linen Apron',
    colloquialTitle: 'The Artisan Chef & Barista Stonewashed Linen Apron',
    category: 'apron',
    basePrice: 44,
    originalPrice: 56,
    badge: 'Artisan Choice',
    tagline: 'Tailored heavyweight 100% stone-washed pure linen apron with solid brass accents & deep kangaroo pockets',
    description: 'Designed for passionate bakers, home chefs, baristas, and florists. Cut from ultra-soft pre-washed French flax linen that gets softer with every wash. Monogrammed or embroidered with your name in exquisite heirloom calligraphy.',
    specs: [
      '100% European stone-washed pure flax linen (240 GSM)',
      'Adjustable antique brass neck slider & extra-long waist ties',
      'Double-stitched kangaroo front pocket with towel loop',
      'Universal unisex fit (85cm length x 70cm width)',
      'Reinforced bar-tack stress points for lifetime durability'
    ],
    defaultCustomization: {
      productId: 'apron-artisan',
      productType: 'apron',
      customText: 'Chef Sofia',
      secondaryText: 'Pâtisserie & Atelier',
      fontId: 'great-vibes',
      productColor: '#2B3848',
      textColor: '#D4AF37',
      textPlacement: 'chest',
      fontSize: 3,
      selectedPatternId: 'none',
      metallicFinish: 'gold'
    },
    availableColors: APRON_COLOR_OPTIONS,
    textColors: TEXT_COLOR_OPTIONS
  },
  {
    id: 'tote-canvas',
    name: 'The French Market Canvas Tote',
    colloquialTitle: 'The Everyday Studio Heavyweight Cotton Canvas Tote',
    category: 'tote',
    basePrice: 28,
    originalPrice: 35,
    badge: 'Eco Luxe',
    tagline: '16oz organic heavy cotton canvas with reinforced base and magnetic brass closure',
    description: 'Your chic everyday companion for farmer\'s markets, library trips, and weekend getaways. Embellished with custom typography in rich metallic foil or clean minimalist black ink.',
    specs: [
      '100% Certified Organic 16oz cotton canvas',
      'Interior zippered slip pocket & key leash',
      'Reinforced cross-stitched handles with 12" drop',
      'Gusseted flat bottom for upright standing'
    ],
    defaultCustomization: {
      productId: 'tote-canvas',
      productType: 'tote',
      customText: 'YA&FE Atelier',
      secondaryText: 'Paris - New York - Est. 2024',
      fontId: 'playfair',
      productColor: '#EDE6DA',
      textColor: '#1C1917',
      textPlacement: 'center',
      fontSize: 3
    },
    availableColors: [
      { id: 'raw-canvas', name: 'Raw Natural Canvas', hex: '#EDE6DA' },
      { id: 'noir-tote', name: 'Washed Black', hex: '#26292E' },
      { id: 'olive-tote', name: 'Botanical Olive', hex: '#636652' },
      { id: 'blush-tote', name: 'Pastel Rose', hex: '#E2B8B5' }
    ],
    textColors: TEXT_COLOR_OPTIONS
  },
  {
    id: 'mug-glow',
    name: 'The Morning Glow Ceramic Mug',
    colloquialTitle: 'Handcrafted Speckled Stoneware Coffee Mug (14oz)',
    category: 'mug',
    basePrice: 24,
    badge: 'Gift Favorite',
    tagline: 'Wheel-thrown aesthetic stoneware with comfortable ergonomic handle & reactive glaze',
    description: 'Slow mornings deserve an artisanal vessel. Custom inscribed with initials, dates, or warm sentiments in lustrous real gold luster or rustic matte ink.',
    specs: [
      '14oz (415ml) capacity',
      'Lead-free, food-safe high-fire stoneware',
      'Dishwasher and microwave safe',
      'Individually glazed with organic speckles'
    ],
    defaultCustomization: {
      productId: 'mug-glow',
      productType: 'mug',
      customText: 'Morning Brew',
      secondaryText: 'Sofia',
      fontId: 'cormorant',
      productColor: '#F7F2EA',
      textColor: '#D4AF37',
      textPlacement: 'center',
      fontSize: 3
    },
    availableColors: [
      { id: 'speckled-cream', name: 'Speckled Cream', hex: '#F7F2EA' },
      { id: 'dusty-terracotta', name: 'Raw Terracotta', hex: '#C67D65' },
      { id: 'sage-glaze', name: 'Eucalyptus Glaze', hex: '#A2B09E' },
      { id: 'charcoal-matte', name: 'Smoky Charcoal', hex: '#37383B' }
    ],
    textColors: TEXT_COLOR_OPTIONS
  }
];
