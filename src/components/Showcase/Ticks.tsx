import { motion, useReducedMotion } from 'framer-motion'
import { N_PROJECTS } from './ringMath'
import styles from './Showcase.module.css'

interface TicksProps {
  activeIdx: number
  onTick: (i: number) => void
  autoplayKey: number
}

export default function Ticks({ activeIdx, onTick, autoplayKey }: TicksProps) {
  const reduced = useReducedMotion()

  return (
    <div className={styles.ticks} role="tablist" aria-label="Project carousel progress">
      {Array.from({ length: N_PROJECTS }, (_, i) => {
        const isActive = i === activeIdx
        return (
          <button
            key={i}
            role="tab"
            aria-selected={isActive}
            aria-label={`Project ${i + 1} of ${N_PROJECTS}`}
            onClick={() => onTick(i)}
            className={`${styles.tick} ${isActive ? styles.tickActive : ''}`}
          >
            <motion.span
              key={isActive ? autoplayKey : `idle-${i}`}
              className={styles.tickFill}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isActive ? 1 : 0 }}
              transition={
                isActive && !reduced
                  ? { duration: 5, ease: 'linear' }
                  : { duration: 0 }
              }
              style={{ transformOrigin: 'left' }}
            />
          </button>
        )
      })}
    </div>
  )
}

