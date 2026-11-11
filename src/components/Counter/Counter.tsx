import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

interface CounterProps {
  from?: number
  to: number
  duration?: number
  className?: string
  suffix?: string
}

export default function Counter({
  from = 0,
  to,
  duration = 1.8,
  className,
  suffix = '',
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const reduced = useReducedMotion()
  const [value, setValue] = useState(reduced ? to : from)

  useEffect(() => {
    if (!isInView || reduced) {
      setValue(to)
      return
    }

    const start = performance.now()
    const range = to - from

    function step(now: number) {
      const elapsed = (now - start) / 1000
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic curve
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(from + range * eased))

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }, [isInView, from, to, duration, reduced])

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  )
}
