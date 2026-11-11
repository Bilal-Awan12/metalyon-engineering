import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import type { Project } from '../../data/projects'
import { assetUrl } from '../../utils/asset'
import { EASE, SPRING_OVERSHOOT } from '../../utils/motion'
import { useQuoteList } from '../../context/QuoteListContext'
import styles from './Showcase.module.css'

interface PopupProps {
  project: Project | null
  onClose: () => void
}

export default function Popup({ project, onClose }: PopupProps) {
  const reduced = useReducedMotion()
  const { add } = useQuoteList()
  const [added, setAdded] = useState(false)
  const [selections, setSelections] = useState<Record<string, string>>({})

  // Reset state when project changes
  useEffect(() => {
    setAdded(false)
    setSelections({})
  }, [project?.id])

  useEffect(() => {
    if (!project) return
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [project, onClose])

  // Lock body scroll while open
  useEffect(() => {
    if (project) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [project])

  function handleAddToQuote() {
    if (!project) return
    add({
      productId: `project-${project.id}`,
      name: project.name,
      quantity: 1,
      options: selections,
      imageUrl: project.panel,
    })
    setAdded(true)
  }

  const rowVariants = {
    hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
    visible: (i: number) => ({
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { delay: 0.14 + i * 0.085, duration: 0.4, ease: EASE },
    }),
  }

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.popupBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            className={styles.popup}
            role="dialog"
            aria-modal="true"
            aria-label={`Project details: ${project.name}`}
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 24 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {/* Top bar */}
            <div className={styles.popupTop}>
              <span className={styles.popupNum}>{project.num}</span>
              <h2 className={styles.popupTitle}>{project.name}</h2>
              <button className={styles.popupClose} onClick={onClose} aria-label="Close">✕</button>
            </div>

            {/* Two-column body */}
            <div className={styles.popupBody}>

              {/* LEFT — image with pins */}
              <div className={styles.popupImgCol}>
                <div className={styles.popupImgWrap}>
                  <img
                    src={assetUrl(project.figure)}
                    alt={project.name}
                    className={styles.popupImg}
                    width={405}
                    height={720}
                  />
                  {project.pins.map((pin, i) => (
                    <motion.div
                      key={pin.id}
                      className={styles.pin}
                      style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                      initial={reduced ? {} : { opacity: 0, scale: 0.3 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.11, duration: 0.4, ease: SPRING_OVERSHOOT }}
                      title={pin.label}
                    >
                      <span className={styles.pinDot}>{i + 1}</span>
                      <span className={styles.pinLabel}>{pin.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* RIGHT — specs + CTA */}
              <div className={styles.popupPanel}>
                <div className={styles.popupPanelHead}>
                  <span className={styles.popupPanelLabel}>In this project</span>
                  <span className={styles.popupPanelSub}>Select your specifications</span>
                </div>

                <div className={styles.specRows}>
                  {project.specs.map((spec, i) => (
                    <motion.div
                      key={spec.label}
                      className={styles.specRow}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={rowVariants}
                    >
                      <div className={styles.specRowHead}>
                        <span className={styles.specPin}>{i + 1}</span>
                        <span className={styles.specLabel}>{spec.label}</span>
                        <span className={styles.specValue}>
                          {selections[spec.label] ?? spec.value}
                        </span>
                      </div>
                      {spec.picker && (
                        <div className={styles.specPicker}>
                          {spec.picker.options.map(opt => (
                            <button
                              key={opt}
                              className={`${styles.pickerOpt} ${
                                (selections[spec.label] ?? spec.picker!.default) === opt
                                  ? styles.pickerOptActive
                                  : ''
                              }`}
                              onClick={() =>
                                setSelections(s => ({ ...s, [spec.label]: opt }))
                              }
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Price note */}
                <div className={styles.popupPrice}>
                  <span className={styles.popupPriceLabel}>Pricing</span>
                  <span className={styles.popupPriceValue}>{project.priceNote}</span>
                </div>

                {/* CTA */}
                <motion.button
                  className={`${styles.popupCta} ${added ? styles.popupCtaDone : ''}`}
                  onClick={handleAddToQuote}
                  disabled={added}
                  whileHover={added ? {} : { scale: 1.02 }}
                  whileTap={added ? {} : { scale: 0.98 }}
                >
                  {added ? '✓ Added to quote list' : `Request a quote — ${project.bundleNote}`}
                </motion.button>

                <p className={styles.popupHint}>Esc or click backdrop to close</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
