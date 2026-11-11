import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { EASE } from '../../utils/motion'
import styles from './Showcase.module.css'

export type CursorMode = 'drag' | 'view' | 'dot' | 'dragging'

interface CustomCursorProps {
  mode: CursorMode
  visible: boolean
}

export default function CustomCursor({ mode, visible }: CustomCursorProps) {
  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  const sx = useSpring(mx, { stiffness: 220, damping: 25 })
  const sy = useSpring(my, { stiffness: 220, damping: 25 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [mx, my])

  const variants = {
    drag: { width: 72, height: 72, opacity: 1 },
    view: { width: 64, height: 64, opacity: 1 },
    dot: { width: 10, height: 10, opacity: 1 },
    dragging: { width: 54, height: 54, opacity: 0.9 },
  }

  if (!visible) return null

  return (
    <motion.div
      className={styles.cursor}
      style={{
        x: sx,
        y: sy,
        translateX: '-50%',
        translateY: '-50%',
      }}
      variants={variants}
      animate={mode}
      transition={{ duration: 0.2, ease: EASE }}
      aria-hidden="true"
    >
      <span className={styles.cursorLabel}>
        {mode === 'drag' ? 'Drag' : mode === 'view' ? 'View' : ''}
      </span>
    </motion.div>
  )
}
