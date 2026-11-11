import { motion, MotionValue, useTransform, useReducedMotion } from 'framer-motion'
import {
  phi,
  zFromPhi,
  xSlot,
  scaleFromZ,
  blurFromZ,
  opacityFromZ,
  zIndexFromZ,
  yOffsetFromZ,
  normalizeAngle,
  N_BODIES,
  projectIndex,
} from './ringMath'
import type { Project } from '../../data/projects'
import { assetUrl } from '../../utils/asset'
import styles from './Showcase.module.css'

interface RingBodyProps {
  i: number
  cur: MotionValue<number>
  projects: Project[]
  onView: (project: Project) => void
  onSelect: (idx: number) => void
  isMobile: boolean
}

export default function RingBody({
  i,
  cur,
  projects,
  onView,
  onSelect,
  isMobile,
}: RingBodyProps) {
  const reduced = useReducedMotion()
  const projIdx = projectIndex(i)
  const project = projects[projIdx]
  const N = N_BODIES

  // Derive transformed styles directly from `cur` MotionValue without triggering React re-renders!
  const x = useTransform(cur, (v: number) => {
    if (isMobile) {
      // Mobile classic diagonal/linear follow
      const p = phi(v, i, N)
      const norm = normalizeAngle(p)
      return norm * 140
    }
    const p = phi(v, i, N)
    return xSlot(p, 860)
  })

  const scale = useTransform(cur, (v: number) => {
    if (reduced) return 1
    const p = phi(v, i, N)
    if (isMobile) {
      const norm = Math.abs(normalizeAngle(p))
      return Math.max(0.65, 1 - norm * 0.25)
    }
    return scaleFromZ(zFromPhi(p))
  })

  const y = useTransform(cur, (v: number) => {
    if (reduced) return 0
    const p = phi(v, i, N)
    if (isMobile) return 0
    return -yOffsetFromZ(zFromPhi(p))
  })

  const opacity = useTransform(cur, (v: number) => {
    const p = phi(v, i, N)
    const norm = Math.abs(normalizeAngle(p))
    if (isMobile) {
      // In mobile, fade out back-facing figures
      return norm < Math.PI * 0.45 ? 1 : Math.max(0, 1 - (norm - 0.45) * 4)
    }
    return opacityFromZ(zFromPhi(p))
  })

  const filter = useTransform(cur, (v: number) => {
    if (reduced) return 'blur(0px)'
    const p = phi(v, i, N)
    const blurPx = blurFromZ(zFromPhi(p))
    return `blur(${blurPx.toFixed(1)}px)`
  })

  const zIndex = useTransform(cur, (v: number) => {
    const p = phi(v, i, N)
    return zIndexFromZ(zFromPhi(p))
  })

  function handleClick() {
    const p = phi(cur.get(), i, N)
    const isFront = Math.abs(normalizeAngle(p)) < Math.PI / N
    if (isFront) {
      onView(project)
    } else {
      onSelect(projIdx)
    }
  }

  return (
    <motion.div
      className={styles.ringBody}
      style={{
        position: 'absolute',
        x,
        y,
        scale,
        opacity,
        filter,
        zIndex,
      }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Project ${project.num}: ${project.name}. Click to view or rotate.`}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
    >
      <div className={styles.figureWrap}>
        <img
          src={assetUrl(project.figure)}
          alt={project.name}
          className={styles.figureImg}
          draggable={false}
          width={280}
          height={480}
          loading={i < 4 ? 'eager' : 'lazy'}
        />
        <div className={styles.figureShadow} />
      </div>
    </motion.div>
  )
}

