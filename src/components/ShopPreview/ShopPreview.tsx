import { Link } from 'react-router-dom'
import { FEATURED_PRODUCTS } from '../../data/products'
import ProductCard from '../ProductCard/ProductCard'
import styles from './ShopPreview.module.css'

export default function ShopPreview() {
  return (
    <section className={styles.section} aria-label="Featured Products">
      <div className="container">
        <div className={styles.header}>
          <div>
            <span className="accent-bar" />
            <h2 className={styles.title}>Featured Products</h2>
            <p className={styles.sub}>
              Core machinery, architectural elements, and laser-crafted metal builds.
            </p>
          </div>
          <Link to="/shop" className={styles.browseTopLink}>
            Browse all products →
          </Link>
        </div>

        <div className={styles.grid}>
          {FEATURED_PRODUCTS.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className={styles.footer}>
          <Link to="/shop" className={styles.browseAllBtn}>
            Browse All 14 Products &amp; Services
          </Link>
        </div>
      </div>
    </section>
  )
}

