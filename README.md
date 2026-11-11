# METALYON ENGINEERING

> Precision Metalwork. Since 1975.  
> CNC Laser Cutting, Gates, Railings, Windows, Doors, and Industrial Machinery.  
> Engineered and built by **Bilal Mehmood** and **Abdul Ahad**.

[![Deployment to GitHub Pages](https://github.com/Bilal-Awan12/metalyon-engineering/actions/workflows/deploy.yml/badge.svg)](https://github.com/Bilal-Awan12/metalyon-engineering/actions/workflows/deploy.yml)

---

## 🏗️ Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Motion & Animations:** Framer Motion (v14)
- **Routing:** React Router DOM (HashRouter for flawless GitHub Pages SPA hosting)
- **Design Tokens:** Plain CSS Variables (`src/styles/tokens.css`) + CSS Modules
- **SEO & Meta:** `react-helmet-async` with JSON-LD Structured Data (`LocalBusiness` & `OfferCatalog`)
- **Visual Identity:** Industrial-premium dark. Charcoal (`#0f1113`), steel-gray (`#161a1d`, `#1e2328`), off-white typography (`#f2f0ec`), and molten-orange laser-spark accent (`#ff6a1a`). 0px radius, 1px steel line dividers.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or v20+)
- npm (v9+)

### Installation
```bash
git clone https://github.com/Bilal-Awan12/metalyon-engineering.git
cd metalyon-engineering
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:5173/metalyon-engineering/](http://localhost:5173/metalyon-engineering/) in your browser.

### Production Build & Preview
```bash
npm run build
npm run preview
```

---

## 🎡 Architecture: 3D Ring Carousel & MotionValues

The centerpiece of the home page is the **Showcase 3D Ring Carousel** (`src/components/Showcase/`), a re-engineered industrial-grade 3D runway carousel.

### Key Mathematical & Performance Principles
1. **Critical Damping Springs:**
   - Evaluated using Framer Motion's `useSpring(target, { stiffness: 95, damping: 19.49, mass: 1 })`.
   - Damping ratio $\zeta = \frac{C}{2\sqrt{K}} = \frac{19.49}{2\sqrt{95}} \approx 1.0$, completely eliminating oscillation while providing instant tactile feedback.
2. **Off-React Render Path:**
   - Carousel positions ($x$, $y$, $\text{scale}$, $\text{opacity}$, $\text{blur}$, $\text{zIndex}$) are derived via `useTransform(cur, ...)` directly from the spring MotionValue.
   - Body updates bypass React component re-rendering cycles entirely, executing at 60–120 FPS directly on the GPU composite layer.
3. **Perspective Projection Geometry (`ringMath.ts`):**
   - 12 active bodies ($N = 12$, 6 projects + 6 circular clones):
     $$\phi = \text{angle}(i) - \text{cur} \times \frac{2\pi}{N}$$
     $$z = \cos(\phi) \times r_z$$
     $$x = \sin(\phi) \times \frac{\text{ringWidth}}{2}$$
   - Front figures render with zero blur and scale 1.0; back figures dynamically blur to 10px and scale to 0.58.
4. **Active Hero Hand-off:**
   - Velocity tracking determines when the spring has settled ($v < 0.05$), synchronizing hero state, progress ticks, and side-panel details.
5. **Progress Ticks:**
   - Keyed `motion.span` animates `scaleX` from 0 to 1 over 5s with linear timing, while the active tick expands smoothly from 44px to 140px.
6. **Custom Cursor:**
   - Lerped motion coordinates (`useMotionValue` + `useSpring`) with contextual `drag`, `view`, and `dragging` variants.
7. **Accessibility & Reduced Motion:**
   - Respects `prefers-reduced-motion: reduce`. Springs, depth sweeps, and autoplay automatically disable, ensuring an accessible fallback.

---

## 🖼️ How to Replace Placeholder Images

All assets are managed locally inside `public/placeholders/` and referenced cleanly through data files. **No external URLs or hotlinks are used.**

### 1. Carousel Figures & Panels
- **Figure Images (9:16 portrait silhouette/cutout):**
  - Place your image in `public/placeholders/` (e.g., `proj01-figure.webp`). Recommended size: `405 × 720px` or `540 × 960px`.
  - Open `src/data/projects.ts` and update the `figure` field:
    ```ts
    {
      id: 'wrought-iron-gate',
      num: '01',
      name: 'Wrought Iron Main Gate',
      figure: 'placeholders/my-real-gate.webp', // <-- edit here
      panel:  'placeholders/my-real-gate-panel.webp',
      ...
    }
    ```
- **Panel Thumbnails (4:5 aspect ratio):**
  - Recommended size: `400 × 500px`. Update the `panel` property in `src/data/projects.ts`.

### 2. Product Catalogue Images
- Open `src/data/products.ts`.
- Each product has an `images` array:
  ```ts
  {
    id: 'pre-engineered-sheds',
    name: 'Pre-Engineered Sheds',
    images: ['placeholders/real-shed-1.webp', 'placeholders/real-shed-2.webp'],
    ...
  }
  ```

---

## ⚙️ How to Edit Business Details, Products & Projects

### 1. Business Info & Contact Placeholders (`src/config/site.ts`)
Update all `TODO_` placeholders before production deployment:
```ts
export const SITE = {
  name: 'Metalyon Engineering',
  phone: '+92-XXX-XXXXXXX',      // Your real telephone
  whatsapp: '923001234567',       // Digits only with country code
  email: 'info@metalyon.com',     // Contact email
  address: 'Industrial Estate, Lahore, Pakistan', // Workshop location
  hours: 'Mon–Sat 8:00 AM – 6:00 PM',
  domain: 'metalyon-engineering.com',
  socials: {
    facebook: 'https://facebook.com/metalyon',
    instagram: 'https://instagram.com/metalyon',
    youtube: null,
    linkedin: null,
  },
  mapEmbed: 'https://www.google.com/maps/embed?...',
}
```

### 2. Products List (`src/data/products.ts`)
Add or edit any of the 14 product lines:
- `id`: unique kebab-case slug
- `name`: product title
- `category`: one of the 6 core categories
- `shortDescription`: concise summary
- `specs`: array of technical specifications
- `featured`: boolean (controls appearance on home page preview)

### 3. Carousel Projects (`src/data/projects.ts`)
Modify interactive pins and options:
- `pins`: percentage coordinates (`x`, `y`) with descriptive labels.
- `specs`: includes inline pickers (`size`, `finish`, `quantity`) with default selections.

---

## 🚢 Deployment to GitHub Pages

This repository includes a continuous deployment workflow at `.github/workflows/deploy.yml`.

### Setting up on GitHub
1. Go to repository **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, select **GitHub Actions**.
3. Push to `main` branch. The action will automatically run `npm run build` and publish to `https://<username>.github.io/metalyon-engineering/`.

### Switching to a Custom Domain
If you later point a custom domain (e.g., `metalyon.com`):
1. In `vite.config.ts`, change `base`:
   ```ts
   base: '/', // change from '/metalyon-engineering/'
   ```
2. In `src/config/site.ts`, update `basePath: '/'`.
3. Add your custom domain under GitHub Pages settings.

---

## ♿ Accessibility & SEO Notes

- **Keyboard Navigation:** All interactive elements have visible high-contrast focus rings (`outline: 2px solid #ff6a1a`).
- **Screen Readers:** Semantic landmarks (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`), `aria-live` announcements, and `role="dialog"` modal focus traps with Escape key dismiss.
- **Search Engine Optimization:** Every route includes dedicated `<Helmet>` titles, meta descriptions, and OpenGraph cards. A comprehensive JSON-LD `LocalBusiness` schema is included.
- **SPA Pre-rendering Note:** Because this is built as a client-side React SPA, for advanced crawler indexing on engines that do not execute JavaScript, consider pairing with `vite-plugin-ssg` or Netlify/Vercel edge pre-rendering.

---

© Metalyon Engineering. Built with precision since 1975.
Owners: Bilal Mehmood and Abdul Ahad.

