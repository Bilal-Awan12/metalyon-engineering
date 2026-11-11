import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, useReducedMotion, useInView, PanInfo } from 'framer-motion'
import { useCarousel } from './useCarousel'
import RingBody from './Ring'
import Panel from './Panel'
import Popup from './Popup'
import Ticks from './Ticks'
import CustomCursor, { CursorMode } from './Cursor'
import { N_BODIES, N_PROJECTS } from './ringMath'
import { PROJECTS, Project } from '../../data/projects'
import { SILK } from '../../utils/motion'
import styles from './Showcase.module.css'

export default function Showcase() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { margin: '-15% 0px' })

  const {
    cur,
    target,
    goTo,
    prev,
    next,
    activeIdx,
    pauseAutoplay,
    resumeAutoplay,
    disengageAutoplay,
  } = useCarousel(true)

  const [popupProject, setPopupProject] = useState<Project | null>(null)
  const [cursorMode, setCursorMode] = useState<CursorMode>('drag')
  const [cursorVisible, setCursorVisible] = useState(false)
  const [autoplayKey, setAutoplayKey] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [highlightedSpec, setHighlightedSpec] = useState<string | null>(null)

  // Track sweep key for the light sweep animation on active change
  const [sweepKey, setSweepKey] = useState(0)
  useEffect(() => {
    setSweepKey(k => k + 1)
  }, [activeIdx])

  // Mobile detection
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 749px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Drag physics & momentum snapping
  const UNIT = 220 // pixels per project step
  const isDragging = useRef(false)

  const handlePanStart = useCallback(() => {
    isDragging.current = true
    setCursorMode('dragging')
    pauseAutoplay()
    disengageAutoplay()
  }, [pauseAutoplay, disengageAutoplay])

  const handlePan = useCallback((_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isDragging.current) return
    target.set(target.get() - info.delta.x / UNIT)
  }, [target])

  const handlePanEnd = useCallback((_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    isDragging.current = false
    setCursorMode('drag')
    // Momentum snap
    const momentum = info.velocity.x / UNIT * 0.28
    const snap = Math.round(target.get() - momentum)
    target.set(snap)
    setAutoplayKey(k => k + 1)
  }, [target])

  // Keyboard navigation when section is in view
  useEffect(() => {
    if (!isInView || popupProject) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prev()
        disengageAutoplay()
        setAutoplayKey(k => k + 1)
      } else if (e.key === 'ArrowRight') {
        next()
        disengageAutoplay()
        setAutoplayKey(k => k + 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isInView, popupProject, prev, next, disengageAutoplay])

  // Wheel handling for horizontal trackpad gestures
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 10) {
      e.preventDefault()
      target.set(target.get() + e.deltaX / (UNIT * 2.5))
      disengageAutoplay()
    }
  }, [target, disengageAutoplay])

  const currentProject = PROJECTS[activeIdx] ?? PROJECTS[0]

  return (
    <section
      ref={sectionRef}
      className={styles.showcase}
      aria-label="Explore Our Work"
      onWheel={handleWheel}
      onMouseEnter={() => setCursorVisible(true)}
      onMouseLeave={() => setCursorVisible(false)}
    >
      {/* Custom desktop cursor */}
      {!reduced && <CustomCursor mode={cursorMode} visible={cursorVisible && !isMobile} />}

      <div className={styles.showcaseInner}>
        {/* Intro Reveal Header */}
        <div className={styles.showcaseHeader}>
          <span className="accent-bar" />
          <h2 className={styles.showcaseTitle}>Explore Our Work.</h2>
          <p className={styles.showcaseSub}>
            Precision-crafted metalwork across industrial, commercial, and agricultural sectors.
            Rotate the runway to inspect each build.
          </p>
        </div>

        {/* Dual Layout: Carousel Stage + Side Panel */}
        <div className={styles.layout}>
          {/* Stage */}
          <motion.div
            className={styles.stage}
            onPanStart={handlePanStart}
            onPan={handlePan}
            onPanEnd={handlePanEnd}
            onMouseEnter={() => {
              if (cursorMode !== 'dragging') setCursorMode('drag')
            }}
          >
            {/* Light sweep animation on change */}
            {!reduced && (
              <motion.span
                key={sweepKey}
                className={styles.lightSweep}
                initial={{ left: '-30%', opacity: 0 }}
                animate={{ left: '130%', opacity: [0, 0.8, 0] }}
                transition={{ duration: 1.2, ease: SILK }}
                aria-hidden="true"
              />
            )}

            {/* 3D Ring bodies */}
            <div className={styles.ring} aria-live="polite">
              {Array.from({ length: N_BODIES }, (_, i) => (
                <RingBody
                  key={i}
                  i={i}
                  cur={cur}
                  projects={PROJECTS}
                  isMobile={isMobile}
                  onView={p => {
                    setPopupProject(p)
                    pauseAutoplay()
                  }}
                  onSelect={idx => {
                    goTo(idx)
                    disengageAutoplay()
                    setAutoplayKey(k => k + 1)
                  }}
                />
              ))}
            </div>

            {/* Stage Controls: Prev/Next & Ticks */}
            <div className={styles.stageControls}>
              <Ticks
                activeIdx={activeIdx}
                autoplayKey={autoplayKey}
                onTick={i => {
                  goTo(i)
                  disengageAutoplay()
                  setAutoplayKey(k => k + 1)
                }}
              />
              <div className={styles.navBtns}>
                <button
                  type="button"
                  className={styles.navBtn}
                  onClick={() => {
                    prev()
                    disengageAutoplay()
                    setAutoplayKey(k => k + 1)
                  }}
                  aria-label="Previous project"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className={styles.navBtn}
                  onClick={() => {
                    next()
                    disengageAutoplay()
                    setAutoplayKey(k => k + 1)
                  }}
                  aria-label="Next project"
                >
                  ›
                </button>
              </div>
            </div>
          </motion.div>

          {/* Side Panel: "In this project" */}
          <div
            onMouseEnter={pauseAutoplay}
            onMouseLeave={resumeAutoplay}
          >
            <Panel
              project={currentProject}
              visible={!popupProject}
              highlightedSpec={highlightedSpec}
            />
          </div>
        </div>
      </div>

      {/* "View project" popup dialog */}
      <Popup
        project={popupProject}
        onClose={() => {
          setPopupProject(null)
          resumeAutoplay()
        }}
      />
    </section>
  )
}
