import { useState, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { PRODUCTS } from '../data/products'
import { useQuoteList } from '../context/QuoteListContext'
import { SITE } from '../config/site'
import { assetUrl } from '../utils/asset'
import { EASE } from '../utils/motion'
import ProductCard from '../components/ProductCard/ProductCard'
import styles from './Product.module.css'

export default function Product() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const reduced = useReducedMotion()
  const { add } = useQuoteList()

  const product = useMemo(() => PRODUCTS.find(p => p.id === id), [id])

  // Local configuration options
  const [activeImgIndex, setActiveImgIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [finish, setFinish] = useState('Standard Matte Black')
  const [dimensionNote, setDimensionNote] = useState('')
  const [addedToast, setAddedToast] = useState(false)

  if (!product) {
    return (
      <div className={styles.notFound}>
        <div className="container">
          <span className="accent-bar" />
          <h1 className={styles.notFoundTitle}>Product Not Found</h1>
          <p className={styles.notFoundSub}>
            The product you requested does not exist or has been moved.
          </p>
          <button
            type="button"
            className={styles.backBtn}
            onClick={() => navigate('/shop')}
          >
            ← Back to Product Catalogue
          </button>
        </div>
      </div>
    )
  }

  const relatedProducts = PRODUCTS.filter(
    p => p.category === product.category && p.id !== product.id
  ).slice(0, 3)

  function handleAddToQuote() {
    add({
      productId: product!.id,
      name: product!.name,
      quantity,
      options: {
        Finish: finish,
        ...(dimensionNote.trim() ? { 'Dimensions / Notes': dimensionNote.trim() } : {}),
      },
      imageUrl: product!.images[activeImgIndex] || product!.images[0],
    })

    setAddedToast(true)
    setTimeout(() => setAddedToast(false), 3000)
  }

  const waMessage = encodeURIComponent(
    `Hi Metalyon Engineering, I'm inquiring about: ${product.name}\n` +
    `Quantity: ${quantity}\n` +
    `Finish: ${finish}\n` +
    (dimensionNote ? `Notes: ${dimensionNote}\n` : '') +
    `Please provide a quotation.`
  )

  return (
    <>
      <Helmet>
        <title>{product.name} — {SITE.name}</title>
        <meta name="description" content={product.shortDescription} />
        <meta property="og:title" content={`${product.name} — Metalyon Engineering`} />
        <meta property="og:description" content={product.shortDescription} />
      </Helmet>

      <motion.div
        className={styles.page}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container">
          {/* Breadcrumbs */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb Navigation">
            <Link to="/" className={styles.breadLink}>Home</Link>
            <span className={styles.breadSep}>/</span>
            <Link to="/shop" className={styles.breadLink}>Shop</Link>
            <span className={styles.breadSep}>/</span>
            <Link
              to={`/shop?category=${encodeURIComponent(product.category)}`}
              className={styles.breadLink}
            >
              {product.category}
            </Link>
            <span className={styles.breadSep}>/</span>
            <span className={styles.breadCurrent}>{product.name}</span>
          </nav>

          {/* Main Product Layout */}
          <div className={styles.layout}>
            {/* Left: Product Imagery */}
            <div className={styles.gallery}>
              <div className={styles.mainImgWrap}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImgIndex}
                    src={assetUrl(product.images[activeImgIndex] || product.images[0])}
                    alt={product.name}
                    className={styles.mainImg}
                    initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    width={540}
                    height={680}
                  />
                </AnimatePresence>
                <span className={styles.conceptTag}>Concept Image</span>
              </div>

              {product.images.length > 1 && (
                <div className={styles.thumbsRow}>
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`${styles.thumbBtn} ${idx === activeImgIndex ? styles.thumbActive : ''}`}
                      onClick={() => setActiveImgIndex(idx)}
                      aria-label={`View photo ${idx + 1}`}
                    >
                      <img src={assetUrl(img)} alt="" width={72} height={90} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details & Options */}
            <div className={styles.details}>
              <span className={styles.category}>{product.category}</span>
              <h1 className={styles.title}>{product.name}</h1>
              <p className={styles.priceNote}>{product.priceNote}</p>

              <p className={styles.desc}>{product.shortDescription}</p>

              {/* Specifications List */}
              <div className={styles.specsWrap}>
                <h3 className={styles.specsHead}>Engineering Specifications</h3>
                <ul className={styles.specsList}>
                  {product.specs.map((spec, i) => (
                    <li key={i} className={styles.specItem}>
                      <span className={styles.specDot} aria-hidden="true">—</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Option Selectors */}
              <div className={styles.optionsSection}>
                {/* Finish Selector */}
                <div className={styles.optionRow}>
                  <label htmlFor="finish-select" className={styles.optionLabel}>
                    Protective Finish:
                  </label>
                  <select
                    id="finish-select"
                    value={finish}
                    onChange={e => setFinish(e.target.value)}
                    className={styles.selectInput}
                  >
                    <option value="Standard Matte Black">Powder-Coated Matte Black</option>
                    <option value="Antique Bronze Patina">Antique Bronze Patina</option>
                    <option value="Hot-Dip Galvanized">Hot-Dip Galvanized (Outdoor Duty)</option>
                    <option value="Raw Steel Primer">Industrial Anti-Corrosion Primer</option>
                    <option value="Custom RAL Color">Custom RAL Specified</option>
                  </select>
                </div>

                {/* Quantity Control */}
                <div className={styles.optionRow}>
                  <label className={styles.optionLabel}>Quantity / Units:</label>
                  <div className={styles.qtyControl}>
                    <button
                      type="button"
                      className={styles.qtyBtn}
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className={styles.qtyVal}>{quantity}</span>
                    <button
                      type="button"
                      className={styles.qtyBtn}
                      onClick={() => setQuantity(q => Math.min(20, q + 1))}
                      disabled={quantity >= 20}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Dimension & Project Notes */}
                <div className={styles.optionRow}>
                  <label htmlFor="notes-area" className={styles.optionLabel}>
                    Dimensions &amp; Custom Requirements:
                  </label>
                  <textarea
                    id="notes-area"
                    rows={3}
                    placeholder="e.g. Opening width 3.5m, height 2.2m, tractor 3-point hitch..."
                    value={dimensionNote}
                    onChange={e => setDimensionNote(e.target.value)}
                    className={styles.textArea}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className={styles.actions}>
                <motion.button
                  type="button"
                  className={styles.addBtn}
                  onClick={handleAddToQuote}
                  whileTap={reduced ? {} : { scale: 0.98 }}
                >
                  {addedToast ? 'Added to Quote List ✓' : 'Add to Quote List'}
                </motion.button>

                <a
                  href={`https://wa.me/${SITE.whatsapp}?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.waBtn}
                >
                  Ask Directly on WhatsApp
                </a>
              </div>

              <p className={styles.quoteDisclaimer}>
                No online payments. Adding to the quote list sends your specification to
                Bilal Mehmood &amp; Abdul Ahad for structural assessment and pricing.
              </p>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className={styles.relatedSection}>
              <div className={styles.relatedHeader}>
                <span className="accent-bar" />
                <h2 className={styles.relatedTitle}>Related {product.category}</h2>
              </div>
              <div className={styles.relatedGrid}>
                {relatedProducts.map(rel => (
                  <ProductCard key={rel.id} product={rel} />
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  )
}
