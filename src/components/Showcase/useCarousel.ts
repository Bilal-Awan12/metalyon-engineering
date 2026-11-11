import { useRef, useEffect, useCallback, useState } from 'react'
import { useMotionValue, useSpring, useReducedMotion, MotionValue } from 'framer-motion'
import { N_PROJECTS } from './ringMath'

export interface CarouselControls {
  cur: MotionValue<number>
  target: MotionValue<number>
  goTo: (idx: number) => void
  prev: () => void
  next: () => void
  activeIdx: number
  isSettled: boolean
  pauseAutoplay: () => void
  resumeAutoplay: () => void
  disengageAutoplay: () => void
}

export function useCarousel(autoplayEnabled: boolean = true): CarouselControls {
  const reduced = useReducedMotion()
  const target = useMotionValue(0)
  // Critically damped spring from spec: K=95, C=2*sqrt(K)=19.49, mass=1
  const cur = useSpring(target, { stiffness: 95, damping: 19.49, mass: 1 })

  const [activeIdx, setActiveIdx] = useState(0)
  const [isSettled, setIsSettled] = useState(true)

  const autoplayTimer = useRef<ReturnType<typeof setInterval> | null>(null)
  const isPaused = useRef(false)
  const userEngaged = useRef(false)

  // Track active project index and spring settled state
  useEffect(() => {
    return cur.on('change', (v: number) => {
      const rounded = Math.round(v)
      const projectNum = ((rounded % N_PROJECTS) + N_PROJECTS) % N_PROJECTS
      setActiveIdx(projectNum)

      const velocity = cur.getVelocity()
      const dist = Math.abs(v - target.get())
      setIsSettled(Math.abs(velocity) < 0.05 && dist < 0.02)
    })
  }, [cur, target])

  const goTo = useCallback((idx: number) => {
    userEngaged.current = true
    const currentVal = target.get()
    const currentBase = Math.round(currentVal)
    const currentMod = ((currentBase % N_PROJECTS) + N_PROJECTS) % N_PROJECTS
    let diff = (idx - currentMod) % N_PROJECTS
    if (diff > N_PROJECTS / 2) diff -= N_PROJECTS
    if (diff < -N_PROJECTS / 2) diff += N_PROJECTS
    target.set(currentBase + diff)
  }, [target])

  const next = useCallback(() => {
    target.set(Math.round(target.get()) + 1)
  }, [target])

  const prev = useCallback(() => {
    target.set(Math.round(target.get()) - 1)
  }, [target])

  const pauseAutoplay = useCallback(() => {
    isPaused.current = true
  }, [])

  const resumeAutoplay = useCallback(() => {
    isPaused.current = false
  }, [])

  const disengageAutoplay = useCallback(() => {
    userEngaged.current = true
    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current)
      autoplayTimer.current = null
    }
  }, [])

  // Autoplay loop
  useEffect(() => {
    if (!autoplayEnabled || reduced || userEngaged.current) return

    autoplayTimer.current = setInterval(() => {
      if (!isPaused.current && !userEngaged.current && !document.hidden) {
        next()
      }
    }, 5000)

    const onVisibilityChange = () => {
      isPaused.current = document.hidden
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [autoplayEnabled, reduced, next])

  return {
    cur,
    target,
    goTo,
    prev,
    next,
    activeIdx,
    isSettled,
    pauseAutoplay,
    resumeAutoplay,
    disengageAutoplay,
  }
}
