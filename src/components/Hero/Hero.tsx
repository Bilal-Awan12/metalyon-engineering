import { useRef } from 'react'
import { motion, useReducedMotion, Variants } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SITE } from '../../config/site'
import { EASE } from '../../utils/motion'
import styles from './Hero.module.css'

export default function Hero() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.16,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: EASE },
    },
  }

  return (
    <section ref={ref} className={styles.hero} aria-label="Hero Section">
      {/* Animated laser line sweep & sparks */}
      {!reduced && (
        <div className={styles.bgLayer} aria-hidden="true">
          <motion.div
            className={styles.laserBeam}
            initial={{ left: '-20%', opacity: 0 }}
            animate={{ left: '120%', opacity: [0, 0.7, 0] }}
            transition={{
              duration: 2.4,
              ease: EASE,
              repeat: Infinity,
              repeatDelay: 6,
            }}
          />
          <motion.div
            className={styles.laserBeam2}
            initial={{ left: '-20%', opacity: 0 }}
            animate={{ left: '120%', opacity: [0, 0.4, 0] }}
            transition={{
              duration: 2.0,
              ease: EASE,
              delay: 3.5,
              repeat: Infinity,
              repeatDelay: 6,
            }}
          />
          {/* Subtle industrial spark drifts */}
          {[12, 28, 48, 68, 85].map((pos, idx) => (
            <motion.span
              key={idx}
              className={styles.spark}
              style={{ left: `${pos}%`, top: `${25 + (idx % 3) * 20}%` }}
              animate={{
                y: [-6, 6, -6],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 2.2 + idx * 0.4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: idx * 0.4,
              }}
            />
          ))}
        </div>
      )}

      <div className={`container ${styles.heroInner}`}>
        {/* Main Content */}
        <motion.div
          className={styles.content}
          variants={reduced ? {} : containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={reduced ? {} : itemVariants} className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span className={styles.eyebrowText}>
              Bilal Mehmood &amp; Abdul Ahad · Workshop Since 1975
            </span>
          </motion.div>

          <motion.h1 variants={reduced ? {} : itemVariants} className={styles.headline}>
            Precision<br />
            Metalwork.<br />
            <span className={styles.since}>Since 1975.</span>
          </motion.h1>

          <motion.p variants={reduced ? {} : itemVariants} className={styles.sub}>
            CNC laser cutting, gates, railings, windows, doors and industrial machinery,
            engineered and built by Bilal Mehmood and Abdul Ahad.
          </motion.p>

          <motion.div variants={reduced ? {} : itemVariants} className={styles.ctas}>
            <Link to="/shop" className={styles.ctaPrimary}>
              Shop Now
            </Link>
            <Link to="/contact" className={styles.ctaSecondary}>
              Request a Quote
            </Link>
          </motion.div>
        </motion.div>

        {/* Hero Photo Placeholder Slot */}
        <motion.div
          className={styles.heroSlot}
          initial={reduced ? { opacity: 1 } : { opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          aria-hidden="true"
        >
          <div className={styles.placeholderFrame}>
            <div className={styles.placeholderCrosshairs} />
            <div className={styles.placeholderContent}>
              <span className={styles.placeholderTag}>CONCEPT FRAME</span>
              <p className={styles.placeholderTitle}>CNC Laser Fabrication</p>
              <p className={styles.placeholderHelp}>
                Replace slot in src/components/Hero/Hero.tsx
              </p>
            </div>
            <div className={styles.cornerTL} />
            <div className={styles.cornerTR} />
            <div className={styles.cornerBL} />
            <div className={styles.cornerBR} />
          </div>
        </motion.div>
      </div>

      {/* Trust bar */}
      <div className={styles.trustBar}>
        <div className={`container ${styles.trustInner}`}>
          {SITE.trust.map((item, i) => (
            <div key={i} className={styles.trustItem}>
              {i > 0 && <span className={styles.trustSep} aria-hidden="true">·</span>}
              <span className={styles.trustText}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
