import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { EASE } from '../../utils/motion'
import styles from './Process.module.css'

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Consultation & Scoping',
    desc: 'We review project requirements, site conditions, structural parameters, and client architectural drawings.',
  },
  {
    step: '02',
    title: 'Design & CAD Modeling',
    desc: 'Our design team generates precision 2D and 3D CAD files for laser path programming and joint detailing.',
  },
  {
    step: '03',
    title: 'CNC Laser & Fabrication',
    desc: 'Components are cut with micron accuracy on CNC laser cutters, then shaped and welded by senior fabricators.',
  },
  {
    step: '04',
    title: 'Surface Finishing',
    desc: 'Parts undergo blast cleaning, powder coating, zinc galvanizing, or specialized heat-cured industrial coatings.',
  },
  {
    step: '05',
    title: 'Delivery & Site Install',
    desc: 'Final assemblies are delivered to the site and installed with strict alignment, anchoring, and inspection.',
  },
]

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'center 50%'],
  })

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section className={styles.section} aria-label="Our Fabrication Process">
      <div className="container">
        <div className={styles.header}>
          <span className="accent-bar" />
          <h2 className={styles.title}>Our Process</h2>
          <p className={styles.sub}>
            A rigorous engineering workflow from initial drawing to on-site assembly.
          </p>
        </div>

        <div ref={containerRef} className={styles.timelineWrap}>
          {/* Animated Connecting Track (Desktop) */}
          <div className={styles.trackLine} aria-hidden="true">
            <motion.div
              className={styles.activeLine}
              style={{
                scaleX: reduced ? 1 : lineScale,
                transformOrigin: 'left center',
              }}
            />
          </div>

          <div className={styles.stepsGrid}>
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                className={styles.stepCard}
                initial={reduced ? {} : { opacity: 0, y: 24 }}
                whileInView={reduced ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { delay: i * 0.1, duration: 0.5, ease: EASE }
                }
              >
                <div className={styles.markerWrap}>
                  <div className={styles.stepMarker}>
                    <span className={styles.markerNum}>{step.step}</span>
                  </div>
                </div>

                <div className={styles.stepBody}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
