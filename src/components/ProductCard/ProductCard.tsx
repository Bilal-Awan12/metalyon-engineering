import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { useQuoteList } from '../../context/QuoteListContext'
import type { Product } from '../../data/products'
import { assetUrl } from '../../utils/asset'
import styles from './ProductCard.module.css'

export default function ProductCard({ product }: { product: Product }) {
  const reduced = useReducedMotion()
  const { add } = useQuoteList()

  function handleAdd() {
    add({
      productId: product.id,
      name: product.name,
      quantity: 1,
      options: {},
      imageUrl: product.images[0],
    })
  }

  return (
    <motion.article
      className={styles.card}
      whileHover={reduced ? {} : { y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/product/${product.id}`} className={styles.imgLink} tabIndex={-1} aria-hidden="true">
        <div className={styles.imgWrap}>
          <img
            src={assetUrl(product.images[0])}
            alt={product.name}
            className={styles.img}
            width={280}
            height={360}
            loading="lazy"
          />
          <div className={styles.laserHover} aria-hidden="true" />
        </div>
      </Link>

      <div className={styles.body}>
        <span className={styles.category}>{product.category}</span>
        <h3 className={styles.name}>
          <Link to={`/product/${product.id}`} className={styles.nameLink}>
            {product.name}
          </Link>
        </h3>
        <p className={styles.desc}>{product.shortDescription}</p>

        <div className={styles.priceRow}>
          <span className={styles.price}>{product.priceNote}</span>
        </div>

        <div className={styles.actions}>
          <Link to={`/product/${product.id}`} className={styles.viewBtn}>
            View details
          </Link>
          <button
            type="button"
            className={styles.addBtn}
            onClick={handleAdd}
            aria-label={`Add ${product.name} to quote list`}
          >
            + Quote
          </button>
        </div>
      </div>
    </motion.article>
  )
}
