import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '../../utils/motion'
import styles from './Testimonials.module.css'

const TESTIMONIAL_CARDS = [
  {
    num: '01',
    category: 'Commercial Architecture Client',
    text: 'Placeholder testimonial, replace with real client feedback regarding pre-engineered shed and structural frame construction.',
    note: 'TODO: Replace with verified client review before launch',
  },
  {
    num: '02',
    category: 'Agricultural Machinery Client',
    text: 'Placeholder testimonial, replace with real client feedback regarding tobacco seed planter durability and custom ridger fabrication.',
    note: 'TODO: Replace with verified client review before launch',
  },
  {
    num: '03',
    category: 'Residential Gates & Railings Client',
    text: 'Placeholder testimonial, replace with real client feedback regarding CNC laser-cut entrance gate and glass railing installation.',
    note: 'TODO: Replace with verified client review before launch',
  },
]

export default function Testimonials() {
  const reduced = useReducedMotion()

  return (
    <section className={styles.section} aria-label="Client Feedback">
      <div className="container">
        <div className={styles.header}>
          <span className="accent-bar" />
          <h2 className={styles.title}>Client Testimonials</h2>
          <p className={styles.sub}>
            What project partners say about our CNC fabrication and turnaround.
          </p>
        </div>

        <div className={styles.grid}>
          {TESTIMONIAL_CARDS.map((card, i) => (
            <motion.blockquote
              key={card.num}
              className={styles.card}
              initial={reduced ? {} : { opacity: 0, y: 20 }}
              whileInView={reduced ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { delay: i * 0.1, duration: 0.5, ease: EASE }
              }
            >
              <div className={styles.topRow}>
                <span className={styles.category}>{card.category}</span>
                <span className={styles.badge}>Placeholder</span>
              </div>
              <p className={styles.quote}>"{card.text}"</p>
              <footer className={styles.footer}>
                <span className={styles.note}>{card.note}</span>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
