import { useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useQuoteList } from '../../context/QuoteListContext'
import { SITE } from '../../config/site'
import { assetUrl } from '../../utils/asset'
import { EASE } from '../../utils/motion'
import styles from './QuoteDialog.module.css'

export default function QuoteDialog() {
  const { items, count, remove, updateQty, closeDialog } = useQuoteList()
  const reduced = useReducedMotion()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  // Focus management
  useEffect(() => {
    closeBtnRef.current?.focus()
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDialog()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [closeDialog])

  function buildWhatsAppMessage() {
    if (items.length === 0) return 'Hi Metalyon Engineering, I would like to request a quote.'
    const lines = items.map(item => {
      const opts = Object.entries(item.options).map(([k, v]) => `${k}: ${v}`).join(', ')
      return `• ${item.name} ×${item.quantity}${opts ? ` (${opts})` : ''}`
    })
    return encodeURIComponent(
      `Hi Metalyon Engineering,\n\nI would like to request a quotation for the following items:\n${lines.join('\n')}\n\nPlease contact me with pricing and delivery timelines.\n\nThank you!`
    )
  }

  function buildEmailBody() {
    if (items.length === 0) return 'Hi, I would like to request a quote.'
    const lines = items.map(item => {
      const opts = Object.entries(item.options).map(([k, v]) => `${k}: ${v}`).join(', ')
      return `- ${item.name} ×${item.quantity}${opts ? ` (${opts})` : ''}`
    })
    return encodeURIComponent(
      `Hi Metalyon Engineering,\n\nI would like to request a quotation for the following items:\n\n${lines.join('\n')}\n\nPlease contact me with pricing.\n\nThank you!`
    )
  }

  function downloadShortlist() {
    const lines = [
      'METALYON ENGINEERING — QUOTE SHORTLIST',
      '========================================',
      `Date: ${new Date().toLocaleDateString()}`,
      `Total items: ${count}`,
      '----------------------------------------',
      '',
    ]
    items.forEach((item, idx) => {
      lines.push(`${idx + 1}. ${item.name}  [Qty: ${item.quantity}]`)
      Object.entries(item.options).forEach(([k, v]) => {
        lines.push(`   - ${k}: ${v}`)
      })
      lines.push('')
    })
    lines.push('----------------------------------------')
    lines.push('Pricing: Quote on request.')
    lines.push(`Contact: ${SITE.email} | WhatsApp: +${SITE.whatsapp}`)
    lines.push('Website: https://' + SITE.domain + SITE.basePath)

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `metalyon-quote-list-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <AnimatePresence>
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeDialog}
        aria-hidden="true"
      />
      <motion.div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label="Quote request shortlist"
        initial={reduced ? { opacity: 0 } : { x: '100%' }}
        animate={{ x: 0, opacity: 1 }}
        exit={reduced ? { opacity: 0 } : { x: '100%' }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <div className={styles.header}>
          <div className={styles.titleWrap}>
            <h2 className={styles.title}>Quote List</h2>
            <span className={styles.badge}>{count}</span>
          </div>
          <button
            ref={closeBtnRef}
            className={styles.closeBtn}
            onClick={closeDialog}
            aria-label="Close quote list"
          >
            ✕
          </button>
        </div>

        <p className={styles.notice}>
          No payment is taken. We will contact you with a formal quotation.
        </p>

        <div className={styles.itemsList}>
          {items.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyText}>Your quote list is currently empty.</p>
              <p className={styles.emptySub}>
                Browse our products or explore the showcase projects to add specs.
              </p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className={styles.itemCard}>
                <img
                  src={assetUrl(item.imageUrl)}
                  alt={item.name}
                  className={styles.itemImg}
                  width={64}
                  height={80}
                />
                <div className={styles.itemDetails}>
                  <p className={styles.itemName}>{item.name}</p>
                  {Object.entries(item.options).map(([k, v]) => (
                    <p key={k} className={styles.itemOpt}>
                      <span className={styles.optKey}>{k}:</span> {v}
                    </p>
                  ))}
                  <div className={styles.qtyControl}>
                    <button
                      type="button"
                      className={styles.qtyBtn}
                      onClick={() => updateQty(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className={styles.qtyVal}>{item.quantity}</span>
                    <button
                      type="button"
                      className={styles.qtyBtn}
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      disabled={item.quantity >= 20}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => remove(item.id)}
                  aria-label={`Remove ${item.name} from list`}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.footer}>
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${buildWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.waBtn}
            >
              Send quote request via WhatsApp
            </a>
            <a
              href={`mailto:${SITE.email}?subject=Quote%20Request%20—%20Metalyon%20Engineering&body=${buildEmailBody()}`}
              className={styles.emailBtn}
            >
              Send via email
            </a>
            <button
              type="button"
              className={styles.downloadBtn}
              onClick={downloadShortlist}
            >
              Download shortlist (.txt)
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
