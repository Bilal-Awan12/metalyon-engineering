// 6 showcase projects for the ring carousel.
// Images reference public/placeholders/ — swap in real photos by editing this file.
export interface ProjectPin {
  id: string
  label: string
  x: number   // percentage
  y: number   // percentage
}

export interface ProjectSpec {
  label: string
  value: string
  picker?: {
    type: 'size' | 'finish' | 'quantity'
    options: string[]
    default: string
  }
}

export interface Project {
  id: string
  num: string
  name: string
  figure: string        // 9:16 figure image (public path)
  panel: string         // 4:5 panel thumbnail (public path)
  pins: ProjectPin[]
  specs: ProjectSpec[]
  priceNote: string
  bundleNote: string
}

export const PROJECTS: Project[] = [
  {
    id: 'wrought-iron-gate',
    num: '01',
    name: 'Wrought Iron Main Gate',
    figure: 'placeholders/proj01-figure.svg',
    panel:  'placeholders/proj01-panel.svg',
    pins: [
      { id: 'p1', label: 'Hand-forged scrollwork', x: 30, y: 25 },
      { id: 'p2', label: 'Structural frame',       x: 60, y: 55 },
      { id: 'p3', label: 'Powder-coat finish',     x: 45, y: 80 },
    ],
    specs: [
      { label: 'Material', value: 'Mild steel, powder-coated',
        picker: { type: 'finish', options: ['Matte black', 'Antique bronze', 'Custom RAL'], default: 'Matte black' } },
      { label: 'Design', value: 'Hand-forged scrollwork',
        picker: { type: 'finish', options: ['Scrollwork', 'Bar & frame', 'Custom from drawing'], default: 'Scrollwork' } },
      { label: 'Size', value: 'Custom to your opening',
        picker: { type: 'size', options: ['Single leaf', 'Double leaf (3m)', 'Double leaf (4m)', 'Custom'], default: 'Double leaf (3m)' } },
    ],
    priceNote: 'Quote on request',
    bundleNote: 'Get this built',
  },
  {
    id: 'cnc-railing',
    num: '02',
    name: 'CNC Laser-Cut Railing',
    figure: 'placeholders/proj02-figure.svg',
    panel:  'placeholders/proj02-panel.svg',
    pins: [
      { id: 'p1', label: 'CNC laser-cut panel',   x: 50, y: 30 },
      { id: 'p2', label: 'Steel top rail',         x: 70, y: 15 },
      { id: 'p3', label: 'Post and base plate',    x: 25, y: 75 },
    ],
    specs: [
      { label: 'Material', value: 'CNC laser-cut mild steel',
        picker: { type: 'finish', options: ['Mild steel', 'Stainless steel'], default: 'Mild steel' } },
      { label: 'Finish', value: 'Powder-coated',
        picker: { type: 'finish', options: ['Powder-coat black', 'Galvanised', 'Custom colour'], default: 'Powder-coat black' } },
      { label: 'Height', value: '1100mm standard',
        picker: { type: 'size', options: ['900mm', '1100mm', 'Custom'], default: '1100mm' } },
    ],
    priceNote: 'Quote on request',
    bundleNote: 'Get this built',
  },
  {
    id: 'glass-railing',
    num: '03',
    name: 'Glass Railing System',
    figure: 'placeholders/proj03-figure.svg',
    panel:  'placeholders/proj03-panel.svg',
    pins: [
      { id: 'p1', label: '10mm toughened glass',  x: 50, y: 35 },
      { id: 'p2', label: 'Stainless steel post',  x: 20, y: 60 },
      { id: 'p3', label: 'Continuous top rail',   x: 75, y: 20 },
    ],
    specs: [
      { label: 'Glass', value: '10mm toughened safety glass',
        picker: { type: 'finish', options: ['Clear', 'Frosted', 'Tinted'], default: 'Clear' } },
      { label: 'Posts', value: 'Stainless steel',
        picker: { type: 'finish', options: ['Stainless steel', 'Mild steel powder-coat'], default: 'Stainless steel' } },
      { label: 'Height', value: '1100mm standard',
        picker: { type: 'size', options: ['900mm', '1100mm', 'Custom'], default: '1100mm' } },
    ],
    priceNote: 'Quote on request',
    bundleNote: 'Get this built',
  },
  {
    id: 'cnc-door',
    num: '04',
    name: 'CNC Decorative Door',
    figure: 'placeholders/proj04-figure.svg',
    panel:  'placeholders/proj04-panel.svg',
    pins: [
      { id: 'p1', label: 'Laser-cut pattern',     x: 50, y: 30 },
      { id: 'p2', label: 'Steel frame',            x: 20, y: 65 },
      { id: 'p3', label: 'Powder-coat finish',     x: 70, y: 80 },
    ],
    specs: [
      { label: 'Material', value: 'CNC laser-cut steel',
        picker: { type: 'finish', options: ['Mild steel', 'Stainless steel'], default: 'Mild steel' } },
      { label: 'Pattern', value: 'Custom from your drawing',
        picker: { type: 'finish', options: ['Geometric', 'Floral', 'Custom from drawing'], default: 'Geometric' } },
      { label: 'Size', value: 'Standard and custom',
        picker: { type: 'size', options: ['900×2100mm', '1000×2100mm', 'Custom'], default: '900×2100mm' } },
    ],
    priceNote: 'Quote on request',
    bundleNote: 'Get this built',
  },
  {
    id: 'tobacco-planter',
    num: '05',
    name: 'Tobacco Seed Planter',
    figure: 'placeholders/proj05-figure.svg',
    panel:  'placeholders/proj05-panel.svg',
    pins: [
      { id: 'p1', label: 'Seed hopper',           x: 55, y: 25 },
      { id: 'p2', label: 'Tractor mount linkage', x: 25, y: 70 },
      { id: 'p3', label: 'Row-spacing adjuster',  x: 70, y: 65 },
    ],
    specs: [
      { label: 'Material', value: 'Mild steel, powder-coated',
        picker: { type: 'finish', options: ['Standard paint', 'Powder-coat', 'Hot-dip galvanised'], default: 'Powder-coat' } },
      { label: 'Rows', value: 'Single or multi-row',
        picker: { type: 'size', options: ['Single row', '2 rows', '4 rows', 'Custom'], default: '2 rows' } },
      { label: 'Quantity', value: '1',
        picker: { type: 'quantity', options: ['1','2','3','4','5','6','7','8','9','10'], default: '1' } },
    ],
    priceNote: 'Quote on request',
    bundleNote: 'Get this built',
  },
  {
    id: 'pre-engineered-shed',
    num: '06',
    name: 'Pre-Engineered Shed',
    figure: 'placeholders/proj06-figure.svg',
    panel:  'placeholders/proj06-panel.svg',
    pins: [
      { id: 'p1', label: 'Steel portal frame',    x: 50, y: 20 },
      { id: 'p2', label: 'Roof sheet cladding',   x: 30, y: 45 },
      { id: 'p3', label: 'Column base plate',     x: 70, y: 80 },
    ],
    specs: [
      { label: 'Frame', value: 'Hot-rolled steel',
        picker: { type: 'finish', options: ['Painted', 'Galvanised', 'Epoxy primer'], default: 'Painted' } },
      { label: 'Span', value: 'Custom to your plot',
        picker: { type: 'size', options: ['Up to 10m', '10–20m', '20–30m', 'Custom'], default: '10–20m' } },
      { label: 'Quantity', value: '1',
        picker: { type: 'quantity', options: ['1','2','3','4','5'], default: '1' } },
    ],
    priceNote: 'Quote on request',
    bundleNote: 'Get this built',
  },
]
