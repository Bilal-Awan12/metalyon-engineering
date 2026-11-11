import { motion, useReducedMotion } from 'framer-motion'
import Counter from '../Counter/Counter'
import { SITE } from '../../config/site'
import { EASE } from '../../utils/motion'
import styles from './WhyMetalyon.module.css'

const VALUE_POINTS = [
  {
    num: '01',
    title: '50+ Years in Metalworking',
    desc: 'Delivering industrial-level metal projects since 1975 under the direct supervision of Bilal Mehmood and Abdul Ahad.',
  },
  {
    num: '02',
    title: 'In-House CNC Laser Cutting',
    desc: 'High-precision laser machinery allows complex geometric patterns, custom perforation, and exact dimensional tolerances without third-party delays.',
  },
  {
    num: '03',
    title: 'Industrial-Grade Construction',
    desc: 'Heavy structural steel, robust joints, and engineered weld profiles designed for commercial and agricultural duty.',
  },
  {
    num: '04',
    title: 'Custom Fabricated to Your Drawing',
    desc: 'Whether working from CAD drawings, blueprints, or rough sketches, we engineer and fabricate parts to exact project specifications.',
  },
  {
    num: '05',
    title: 'Durable Protective Finishes',
    desc: 'Specialized surface preparation with powder-coating, hot-dip galvanizing, and industrial anti-corrosion primer coatings.',
  },
  {
    num: '06',
    title: 'On-Site Measurement & Installation',
    desc: 'Comprehensive end-to-end service: accurate site surveying, fabrication, direct site delivery, and secure structural installation.',
  },
]

export default function WhyMetalyon() {
  const reduced = useReducedMotion()

  return (
    <section className={styles.section} aria-label="Why Metalyon Engineering">
      <div className="container">
        <div className={styles.header}>
          <span className="accent-bar" />
          <h2 className={styles.title}>Why Metalyon Engineering</h2>
          <p className={styles.sub}>
            Five decades of metal expertise backed by precision CNC technology.
          </p>
        </div>

        {/* Counter Stats Band */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statNumWrap}>
              <Counter from={1960} to={SITE.established} duration={1.6} className={styles.statNum} />
            </div>
            <p className={styles.statLabel}>Established Year</p>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumWrap}>
              <Counter from={10} to={50} duration={1.5} className={styles.statNum} suffix="+" />
            </div>
            <p className={styles.statLabel}>Years Metal Experience</p>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumWrap}>
              <Counter from={1} to={14} duration={1.2} className={styles.statNum} />
            </div>
            <p className={styles.statLabel}>Core Product Lines</p>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumWrap}>
              <span className={styles.statNum}>100%</span>
            </div>
            <p className={styles.statLabel}>In-House Workshop</p>
          </div>
        </div>

        {/* Value Points Grid */}
        <div className={styles.valuesGrid}>
          {VALUE_POINTS.map((vp, i) => (
            <motion.div
              key={vp.num}
              className={styles.valueCard}
              initial={reduced ? {} : { opacity: 0, y: 20 }}
              whileInView={reduced ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { delay: i * 0.08, duration: 0.5, ease: EASE }
              }
            >
              <span className={styles.valueNum}>{vp.num}</span>
              <h3 className={styles.valueTitle}>{vp.title}</h3>
              <p className={styles.valueDesc}>{vp.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
