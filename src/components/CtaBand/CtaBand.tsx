import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SITE } from '../../config/site'
import { EASE } from '../../utils/motion'
import styles from './CtaBand.module.css'

export default function CtaBand() {
  const reduced = useReducedMotion()

  return (
    <section className={styles.section} aria-label="Call to Action">
      <div className="container">
        <motion.div
          className={styles.box}
          initial={reduced ? {} : { opacity: 0, y: 24 }}
          whileInView={reduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className={styles.content}>
            <span className={styles.tag}>Direct Workshop Inquiries</span>
            <h2 className={styles.headline}>
              Have a drawing or an idea?<br />
              <span className={styles.accent}>Let&apos;s cut it.</span>
            </h2>
            <p className={styles.sub}>
              Send us your blueprints, measurements, or design sketches. Bilal Mehmood and
              Abdul Ahad will assess tolerances and provide a prompt quotation.
            </p>
          </div>

          <div className={styles.actions}>
            <Link to="/contact" className={styles.quoteBtn}>
              Request a Quote
            </Link>
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
                'Hi Metalyon Engineering, I have a drawing and would like to get a quote.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.waBtn}
            >
              WhatsApp Us
            </a>
            <a href={`tel:${SITE.phone}`} className={styles.callBtn}>
              Call Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
