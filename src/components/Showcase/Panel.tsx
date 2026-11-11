import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion, Variants } from 'framer-motion'
import type { Project } from '../../data/projects'
import { useQuoteList } from '../../context/QuoteListContext'
import { SITE } from '../../config/site'
import { EASE, SHEET } from '../../utils/motion'
import styles from './Showcase.module.css'

interface PanelProps {
  project: Project
  visible: boolean
  highlightedSpec?: string | null
}

export default function Panel({ project, visible, highlightedSpec }: PanelProps) {
  const reduced = useReducedMotion()
  const { add } = useQuoteList()

  const [selections, setSelections] = useState<Record<string, string>>({})
  const [openPicker, setOpenPicker] = useState<string | null>(null)
  const [ctaState, setCtaState] = useState<'idle' | 'loading' | 'done'>('idle')

  // Reset or initialize selections when project changes
  useEffect(() => {
    const initial: Record<string, string> = {}
    project.specs.forEach(s => {
      if (s.picker) initial[s.label] = s.picker.default
    })
    setSelections(initial)
    setOpenPicker(null)
  }, [project])

  function getOption(label: string, fallback: string) {
    return selections[label] ?? fallback
  }

  function handleAdd() {
    setCtaState('loading')
    setTimeout(() => {
      add({
        productId: project.id,
        name: project.name,
        quantity: 1,
        options: { ...selections },
        imageUrl: project.panel,
      })
      setCtaState('done')
      setTimeout(() => setCtaState('idle'), 2500)
    }, 700)
  }

  const rowVariants: Variants = {
    hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.085 + 0.14,
        duration: 0.45,
        ease: EASE,
      },
    }),
  }

  const waMsg = encodeURIComponent(
    `Hi Metalyon Engineering, I would like to request a quote for project: ${project.name} (${project.num})\n` +
    Object.entries(selections).map(([k, v]) => `• ${k}: ${v}`).join('\n')
  )

  return (
    <div className={styles.panel} aria-label="Project details panel">
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={project.id}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={styles.panelInner}
          >
            <p className={styles.panelHead}>In this project</p>
            <h3 className={styles.panelTitle}>{project.name}</h3>

            <div className={styles.panelSpecs}>
              {project.specs.map((spec, i) => {
                const isHighlighted = highlightedSpec && spec.label.toLowerCase().includes(highlightedSpec.toLowerCase())
                return (
                  <motion.div
                    key={spec.label}
                    custom={i}
                    variants={reduced ? {} : rowVariants}
                    className={styles.specRow}
                    style={isHighlighted ? { outline: '1px solid var(--color-orange)', padding: '4px' } : undefined}
                  >
                    <span className={styles.specLabel}>{spec.label}</span>
                    {spec.picker ? (
                      <div className={styles.pickerWrap}>
                        <button
                          type="button"
                          className={styles.pickerBtn}
                          onClick={() => setOpenPicker(openPicker === spec.label ? null : spec.label)}
                          aria-expanded={openPicker === spec.label}
                          aria-label={`Select ${spec.label}: currently ${getOption(spec.label, spec.picker.default)}`}
                        >
                          <span>{getOption(spec.label, spec.picker.default)}</span>
                          <span className={styles.pickerChevron} aria-hidden="true">
                            {openPicker === spec.label ? '▲' : '▼'}
                          </span>
                        </button>
                        <AnimatePresence>
                          {openPicker === spec.label && (
                            <motion.div
                              className={styles.pickerDropdown}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22, ease: SHEET }}
                            >
                              {spec.picker.options.map(opt => (
                                <button
                                  key={opt}
                                  type="button"
                                  className={`${styles.pickerOption} ${getOption(spec.label, spec.picker!.default) === opt ? styles.pickerOptionActive : ''}`}
                                  onClick={() => {
                                    setSelections(prev => ({ ...prev, [spec.label]: opt }))
                                    setOpenPicker(null)
                                  }}
                                >
                                  {opt}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <span className={styles.specValue}>{spec.value}</span>
                    )}
                  </motion.div>
                )
              })}
            </div>

            <p className={styles.priceNote}>{project.priceNote}</p>

            <motion.button
              type="button"
              className={styles.ctaBtn}
              onClick={handleAdd}
              disabled={ctaState !== 'idle'}
              whileTap={reduced ? {} : { scale: 0.98 }}
            >
              {ctaState === 'loading' && <span className={styles.spinner} aria-hidden="true" />}
              <span>
                {ctaState === 'done'
                  ? 'Request sent to quote list ✓'
                  : ctaState === 'loading'
                  ? 'Adding…'
                  : 'Add to quote list'}
              </span>
            </motion.button>

            <div className={styles.bundleFooter}>
              <span className={styles.bundleNote}>{project.bundleNote}</span>
              <a
                href={`https://wa.me/${SITE.whatsapp}?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.waLink}
              >
                Request a quote for this project →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
