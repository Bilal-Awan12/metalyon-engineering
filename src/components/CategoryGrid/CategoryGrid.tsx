import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CATEGORIES, PRODUCTS, ProductCategory } from '../../data/products'
import { EASE } from '../../utils/motion'
import styles from './CategoryGrid.module.css'

const CATEGORY_DESCRIPTIONS: Record<ProductCategory, string> = {
  'Gates & Doors':
    'Custom wrought iron, CNC laser-cut decorative gates and heavy security entrance doors.',
  'Railings':
    'Architectural CNC laser-cut, wrought iron scroll, and tempered glass railing systems.',
  'Windows':
    'Heavy-gauge welded steel frames and precision extruded aluminium profile windows.',
  'Agricultural Machinery':
    'Rugged tobacco seed planters, field ridgers, and industrial leaf shaker machines.',
  'Industrial & Structural':
    'Pre-engineered structural sheds, certified industrial access ladders, and architectural builds.',
  'CNC Laser Cutting':
    'High-precision laser cutting service for custom drawings, metal sheets, and fabrication parts.',
}

export default function CategoryGrid() {
  const reduced = useReducedMotion()

  return (
    <section className={styles.section} aria-label="What We Build">
      <div className="container">
        <div className={styles.header}>
          <span className="accent-bar" />
          <h2 className={styles.title}>What We Build</h2>
          <p className={styles.sub}>
            Custom fabrication capabilities built on five decades of metal engineering expertise.
          </p>
        </div>

        <div className={styles.grid}>
          {CATEGORIES.map((cat, i) => {
            const items = PRODUCTS.filter(p => p.category === cat)
            return (
              <motion.article
                key={cat}
                className={styles.card}
                initial={reduced ? {} : { opacity: 0, y: 24 }}
                whileInView={reduced ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { delay: i * 0.08, duration: 0.5, ease: EASE }
                }
              >
                <div className={styles.cardHeader}>
                  <span className={styles.cardNum}>0{i + 1}</span>
                  <h3 className={styles.cardTitle}>{cat}</h3>
                </div>

                <p className={styles.cardDesc}>{CATEGORY_DESCRIPTIONS[cat]}</p>

                <div className={styles.productsListWrap}>
                  <p className={styles.productsHead}>Key Capabilities:</p>
                  <ul className={styles.productsList}>
                    {items.map(item => (
                      <li key={item.id} className={styles.productItem}>
                        <Link to={`/product/${item.id}`} className={styles.productLink}>
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to={`/shop?category=${encodeURIComponent(cat)}`}
                  className={styles.viewLink}
                >
                  <span>View products</span>
                  <span className={styles.arrow} aria-hidden="true">→</span>
                </Link>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
