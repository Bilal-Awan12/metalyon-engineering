import { useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import type { Project } from '../../data/projects'
import { assetUrl } from '../../utils/asset'
import { EASE, SPRING_OVERSHOOT } from '../../utils/motion'
import styles from './Showcase.module.css'

interface PopupProps {
  project: Project | null
  onClose: () => void
  onHighlightSpec?: (label: string) => void
}

export default function Popup({ project, onClose, onHighlightSpec }: PopupProps) {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!project) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            className={styles.popupBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            className={styles.popup}
            layoutId={`project-figure-${project.id}`}
            role="dialog"
            aria-modal="true"
            aria-label={`Project details: ${project.name}`}
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <div className={styles.popupTop}>
              <span className={styles.popupNum}>{project.num}</span>
              <h2 className={styles.popupTitle}>{project.name}</h2>
              <button
                className={styles.popupClose}
                onClick={onClose}
                aria-label="Close project view"
              >
                ✕
              </button>
            </div>

            <div className={styles.popupBody}>
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
                    initial={reduced ? {} : { opacity: 0, scale: 0.4 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.5 + i * 0.11,
                      duration: 0.4,
                      ease: SPRING_OVERSHOOT,
                    }}
                    onClick={() => onHighlightSpec?.(pin.label)}
                    title={pin.label}
                  >
                    <span className={styles.pinDot}>{i + 1}</span>
                    <span className={styles.pinLabel}>{pin.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <p className={styles.popupHint}>
              Press Esc or click backdrop to return to runway carousel
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
