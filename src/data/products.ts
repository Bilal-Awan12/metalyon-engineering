// All 14 products. Images reference public/placeholders/ — swap in real photos by editing this file.
export interface Product {
  id: string
  name: string
  category: ProductCategory
  shortDescription: string
  specs: string[]
  images: string[]          // paths relative to public/
  priceNote: string
  featured: boolean
}

export type ProductCategory =
  | 'Gates & Doors'
  | 'Railings'
  | 'Windows'
  | 'Agricultural Machinery'
  | 'Industrial & Structural'
  | 'CNC Laser Cutting'

export const CATEGORIES: ProductCategory[] = [
  'Gates & Doors',
  'Railings',
  'Windows',
  'Agricultural Machinery',
  'Industrial & Structural',
  'CNC Laser Cutting',
]

export const PRODUCTS: Product[] = [
  {
    id: 'pre-engineered-sheds',
    name: 'Pre-Engineered Sheds',
    category: 'Industrial & Structural',
    shortDescription: 'Prefabricated steel-frame sheds for industrial, agricultural and commercial use.',
    specs: ['Steel frame construction', 'Custom span widths', 'Galvanised or painted finish', 'Roof and cladding options', 'On-site measurement and installation'],
    images: ['placeholders/shed-9x16.svg'],
    priceNote: 'Quote on request',
    featured: true,
  },
  {
    id: 'tobacco-seed-planters',
    name: 'Tobacco Seed Planters',
    category: 'Agricultural Machinery',
    shortDescription: 'Precision-engineered seed planters designed for tobacco cultivation.',
    specs: ['Mild steel fabrication', 'Adjustable row spacing', 'Seed hopper capacity options', 'Tractor-mount compatible', 'Powder-coated finish'],
    images: ['placeholders/planter-9x16.svg'],
    priceNote: 'Quote on request',
    featured: true,
  },
  {
    id: 'ridgers',
    name: 'Ridgers',
    category: 'Agricultural Machinery',
    shortDescription: 'Heavy-duty ridgers for soil preparation and crop furrow forming.',
    specs: ['Heavy gauge steel', 'Adjustable ridge width', 'Three-point linkage mount', 'Hardened cutting edges', 'Durable painted finish'],
    images: ['placeholders/ridger-9x16.svg'],
    priceNote: 'Quote on request',
    featured: false,
  },
  {
    id: 'industrial-ladders',
    name: 'Industrial Ladders',
    category: 'Industrial & Structural',
    shortDescription: 'Fabricated steel ladders for industrial access and safety compliance.',
    specs: ['Mild or stainless steel', 'Standard and custom heights', 'Non-slip rungs', 'Safety cage options', 'Hot-dip galvanised finish'],
    images: ['placeholders/ladder-9x16.svg'],
    priceNote: 'Quote on request',
    featured: false,
  },
  {
    id: 'metal-architecture',
    name: 'Commercial & Non-Commercial Metal Architecture',
    category: 'Industrial & Structural',
    shortDescription: 'Custom structural metalwork for commercial buildings and architectural installations.',
    specs: ['Structural steel fabrication', 'Custom design from drawings', 'Welded and bolted assemblies', 'Protective coatings', 'Site measurement and installation'],
    images: ['placeholders/architecture-9x16.svg'],
    priceNote: 'Quote on request',
    featured: true,
  },
  {
    id: 'tobacco-shaker-machines',
    name: 'Tobacco Shaker Machines',
    category: 'Agricultural Machinery',
    shortDescription: 'Industrial tobacco leaf shaker machines for post-harvest processing.',
    specs: ['Welded steel frame', 'Electric motor driven', 'Adjustable shaking speed', 'Conveyor belt integration', 'Durable powder-coat finish'],
    images: ['placeholders/shaker-9x16.svg'],
    priceNote: 'Quote on request',
    featured: false,
  },
  {
    id: 'wrought-iron-gates',
    name: 'Wrought Iron Main Gates',
    category: 'Gates & Doors',
    shortDescription: 'Hand-forged wrought iron main gates with traditional scrollwork and modern strength.',
    specs: ['Mild steel, powder-coated', 'Hand-forged scrollwork', 'Single and double leaf options', 'Matte black / Antique bronze finish', 'Automated gate motor compatible'],
    images: ['placeholders/gate-9x16.svg'],
    priceNote: 'Quote on request',
    featured: true,
  },
  {
    id: 'cnc-gates',
    name: 'CNC Gates',
    category: 'Gates & Doors',
    shortDescription: 'Precision CNC laser-cut decorative gates with intricate geometric or floral patterns.',
    specs: ['CNC laser-cut mild steel', 'Custom pattern from drawing', 'Powder-coated or painted', 'Single / double leaf', 'Size: custom to your opening'],
    images: ['placeholders/cnc-gate-9x16.svg'],
    priceNote: 'Quote on request',
    featured: true,
  },
  {
    id: 'cnc-railings',
    name: 'CNC Railings',
    category: 'Railings',
    shortDescription: 'CNC laser-cut steel railings for staircases, balconies and perimeter fencing.',
    specs: ['CNC laser-cut steel panels', 'Custom pattern or design', 'Top rail and post options', 'Powder-coat or galvanised finish', 'Standard heights: 900mm / 1100mm'],
    images: ['placeholders/cnc-railing-9x16.svg'],
    priceNote: 'Quote on request',
    featured: true,
  },
  {
    id: 'wrought-iron-railings',
    name: 'Wrought Iron Railings',
    category: 'Railings',
    shortDescription: 'Traditional wrought iron railings, hand-finished for staircases and balconies.',
    specs: ['Mild steel, hand-forged', 'Scroll and bar designs', 'Welded and bolted assembly', 'Matte black standard / custom colours', 'Internal and external use'],
    images: ['placeholders/iron-railing-9x16.svg'],
    priceNote: 'Quote on request',
    featured: false,
  },
  {
    id: 'iron-windows',
    name: 'Iron Windows',
    category: 'Windows',
    shortDescription: 'Steel-frame fixed and opening windows for industrial and residential use.',
    specs: ['Welded steel frame', 'Single and multi-panel', 'Glazing-ready rebate', 'Powder-coated finish', 'Custom sizes available'],
    images: ['placeholders/iron-window-9x16.svg'],
    priceNote: 'Quote on request',
    featured: false,
  },
  {
    id: 'aluminium-windows',
    name: 'Aluminium Windows',
    category: 'Windows',
    shortDescription: 'Extruded aluminium profile windows, lightweight and corrosion-resistant.',
    specs: ['Aluminium profile frame', 'Sliding and casement options', 'Double-glazing compatible', 'Anodised or powder-coat finish', 'Custom sizes to drawing'],
    images: ['placeholders/alum-window-9x16.svg'],
    priceNote: 'Quote on request',
    featured: false,
  },
  {
    id: 'glass-railing',
    name: 'Glass Railing',
    category: 'Railings',
    shortDescription: 'Frameless and semi-frameless glass railing systems with steel posts.',
    specs: ['10mm toughened safety glass', 'Steel or stainless posts', 'Continuous top rail', 'Transparent or frosted glass', 'Standard heights: 900mm / 1100mm'],
    images: ['placeholders/glass-railing-9x16.svg'],
    priceNote: 'Quote on request',
    featured: true,
  },
  {
    id: 'cnc-doors',
    name: 'CNC Doors',
    category: 'Gates & Doors',
    shortDescription: 'CNC laser-cut decorative steel doors for interior and exterior applications.',
    specs: ['CNC laser-cut steel', 'Solid or panel construction', 'Custom pattern or design', 'Powder-coated finish', 'Standard and custom sizes'],
    images: ['placeholders/cnc-door-9x16.svg'],
    priceNote: 'Quote on request',
    featured: true,
  },
]

export const FEATURED_PRODUCTS = PRODUCTS.filter(p => p.featured).slice(0, 8)
