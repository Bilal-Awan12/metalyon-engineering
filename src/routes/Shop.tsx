import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { PRODUCTS, CATEGORIES, ProductCategory } from '../data/products'
import ProductCard from '../components/ProductCard/ProductCard'
import { SITE } from '../config/site'
import { EASE } from '../utils/motion'
import styles from './Shop.module.css'

type SortOption = 'category' | 'az' | 'za'

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const reduced = useReducedMotion()

  const currentCategory = searchParams.get('category') as ProductCategory | null
  const currentQuery = searchParams.get('q') || ''
  const currentSort = (searchParams.get('sort') as SortOption) || 'category'

  function updateParams(newParams: { category?: string | null; q?: string | null; sort?: string | null }) {
    const next = new URLSearchParams(searchParams)
    if (newParams.category !== undefined) {
      if (newParams.category) next.set('category', newParams.category)
      else next.delete('category')
    }
    if (newParams.q !== undefined) {
      if (newParams.q) next.set('q', newParams.q)
      else next.delete('q')
    }
    if (newParams.sort !== undefined) {
      if (newParams.sort && newParams.sort !== 'category') next.set('sort', newParams.sort)
      else next.delete('sort')
    }
    setSearchParams(next)
  }

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS

    if (currentCategory) {
      result = result.filter(p => p.category === currentCategory)
    }

    if (currentQuery.trim()) {
      const q = currentQuery.toLowerCase().trim()
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.specs.some(s => s.toLowerCase().includes(q))
      )
    }

    if (currentSort === 'az') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name))
    } else if (currentSort === 'za') {
      result = [...result].sort((a, b) => b.name.localeCompare(a.name))
    } else {
      // Group by category, then name
      result = [...result].sort((a, b) =>
        a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
      )
    }

    return result
  }, [currentCategory, currentQuery, currentSort])

  return (
    <>
      <Helmet>
        <title>Shop Catalogue — {SITE.name}</title>
        <meta
          name="description"
          content="Browse all 14 industrial metalwork and CNC fabrication lines by Metalyon Engineering. Request custom quotes directly."
        />
      </Helmet>

      <motion.div
        className={styles.page}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.header}>
          <div className="container">
            <span className="accent-bar" />
            <h1 className={styles.title}>Product Catalogue</h1>
            <p className={styles.sub}>
              All 14 precision fabrication lines. Add items to your quote list or ask questions
              directly via WhatsApp. No upfront payments.
            </p>
          </div>
        </div>

        <div className="container">
          {/* Controls Bar: Categories + Search + Sort */}
          <div className={styles.controlsBar}>
            {/* Category Filter Chips */}
            <div className={styles.chips} role="tablist" aria-label="Filter by product category">
              <button
                type="button"
                className={`${styles.chip} ${!currentCategory ? styles.chipActive : ''}`}
                onClick={() => updateParams({ category: null })}
                role="tab"
                aria-selected={!currentCategory}
              >
                All Products ({PRODUCTS.length})
              </button>
              {CATEGORIES.map(cat => {
                const count = PRODUCTS.filter(p => p.category === cat).length
                const active = currentCategory === cat
                return (
                  <button
                    key={cat}
                    type="button"
                    className={`${styles.chip} ${active ? styles.chipActive : ''}`}
                    onClick={() => updateParams({ category: active ? null : cat })}
                    role="tab"
                    aria-selected={active}
                  >
                    {cat} ({count})
                  </button>
                )
              })}
            </div>

            {/* Search and Sort Toolbar */}
            <div className={styles.toolbar}>
              <div className={styles.searchWrap}>
                <input
                  type="search"
                  placeholder="Search products, materials..."
                  value={currentQuery}
                  onChange={e => updateParams({ q: e.target.value })}
                  className={styles.searchInput}
                  aria-label="Search product catalogue"
                />
              </div>

              <div className={styles.sortWrap}>
                <label htmlFor="sort-select" className={styles.sortLabel}>Sort:</label>
                <select
                  id="sort-select"
                  value={currentSort}
                  onChange={e => updateParams({ sort: e.target.value })}
                  className={styles.sortSelect}
                >
                  <option value="category">Category</option>
                  <option value="az">Name: A to Z</option>
                  <option value="za">Name: Z to A</option>
                </select>
              </div>
            </div>
          </div>

          {/* Result Count Status */}
          <div className={styles.statusBar} aria-live="polite">
            <p className={styles.statusText}>
              Showing <strong>{filteredProducts.length}</strong> product
              {filteredProducts.length !== 1 ? 's' : ''}
              {currentCategory ? ` in "${currentCategory}"` : ''}
              {currentQuery ? ` matching "${currentQuery}"` : ''}
            </p>
            {(currentCategory || currentQuery) && (
              <button
                type="button"
                className={styles.resetBtn}
                onClick={() => updateParams({ category: null, q: null, sort: null })}
              >
                Reset filters
              </button>
            )}
          </div>

          {/* Products Grid with Layout Animation */}
          <motion.div layout className={styles.grid}>
            <AnimatePresence mode="popLayout">
              {filteredProducts.length === 0 ? (
                <motion.div
                  key="no-results"
                  className={styles.noResults}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p className={styles.noResultsTitle}>No matching products found</p>
                  <p className={styles.noResultsSub}>
                    Try clearing your search query or choosing a different category.
                  </p>
                  <button
                    type="button"
                    className={styles.clearFiltersBtn}
                    onClick={() => updateParams({ category: null, q: null })}
                  >
                    Clear All Filters
                  </button>
                </motion.div>
              ) : (
                filteredProducts.map(product => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={reduced ? {} : { opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduced ? {} : { opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.28, ease: EASE }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}
