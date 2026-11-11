import { motion, useReducedMotion } from 'framer-motion'
import { SITE } from '../../config/site'
import { EASE } from '../../utils/motion'
import styles from './Owners.module.css'

export default function Owners() {
  const reduced = useReducedMotion()

  return (
    <section className={styles.section} aria-label="Meet The Owners">
      <div className="container">
        <div className={styles.header}>
          <span className="accent-bar" />
          <h2 className={styles.title}>Meet the Leadership</h2>
          <p className={styles.sub}>
            Leading the workshop and upholding five decades of industrial fabrication standards.
          </p>
        </div>

        <div className={styles.grid}>
          {SITE.owners.map((owner, i) => (
            <motion.div
              key={owner.name}
              className={styles.card}
              initial={reduced ? {} : { opacity: 0, y: 24 }}
              whileInView={reduced ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { delay: i * 0.15, duration: 0.55, ease: EASE }
              }
            >
              <div className={styles.portraitSlot}>
                <div className={styles.silhouette}>
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className={styles.silhouetteIcon}
                    aria-hidden="true"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <span className={styles.portraitLabel}>Portrait Slot</span>
              </div>

              <div className={styles.info}>
                <span className={styles.role}>{owner.role}</span>
                <h3 className={styles.name}>{owner.name}</h3>
                <p className={styles.bio}>{owner.bio}</p>
                <div className={styles.tagWrap}>
                  <span className={styles.tag}>Workshop Leadership</span>
                  <span className={styles.tag}>Fabrication Specialist</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
