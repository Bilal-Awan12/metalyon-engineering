import { motion, useReducedMotion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { SITE } from '../config/site'
import styles from './About.module.css'

const TIMELINE_EVENTS = [
  {
    year: '1975',
    title: 'Foundations in Metalworking',
    desc: 'Began operations in metal fabrication, setting an industrial standard in heavy iron, structural welding, and custom agricultural tools.',
    isFixed: true,
  },
  {
    year: '1990s',
    title: 'Agricultural Machinery Line',
    desc: 'Expanded production to specialize in tobacco seed planters, field ridgers, and industrial leaf processing shakers.',
    isFixed: false,
  },
  {
    year: '2010s',
    title: 'Architectural & Gates Modernization',
    desc: 'Scaled into pre-engineered sheds, commercial metal architecture, glass balustrades, and high-security wrought iron gates.',
    isFixed: false,
  },
  {
    year: 'Present',
    title: 'CNC Laser Precision & Next Gen Leadership',
    desc: 'Under Bilal Mehmood and Abdul Ahad, integrated CNC laser cutting for micro-precision patterns and custom fabrication to CAD drawings.',
    isFixed: false,
  },
]

const WORKSHOP_CAPABILITIES = [
  {
    title: 'Fiber Laser Cutting',
    specs: 'High-power CNC cutting bed for mild steel, stainless steel, and aluminium sheet profiles with tight geometric tolerances.',
  },
  {
    title: 'Heavy Structural Fabrication',
    specs: 'Welded portal frames, industrial shed rafters, and structural trusses built for industrial loads.',
  },
  {
    title: 'Hand-Forged Wrought Iron',
    specs: 'Traditional blacksmithing and scrollwork combined with modern structural subframes.',
  },
  {
    title: 'Agricultural Engineering',
    specs: 'Field-tested seed planting mechanisms, heavy linkages, and vibration-damped machinery.',
  },
]

export default function About() {
  const reduced = useReducedMotion()

  return (
    <>
      <Helmet>
        <title>About Us — {SITE.name}</title>
        <meta
          name="description"
          content="Learn about Metalyon Engineering: over 50 years in metal fabrication since 1975, led by Bilal Mehmood and Abdul Ahad."
        />
      </Helmet>

      <motion.div
        className={styles.page}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className={styles.header}>
          <div className="container">
            <span className="accent-bar" />
            <h1 className={styles.title}>Over 50 Years in Metal</h1>
            <p className={styles.sub}>
              In the metal field since 1975. Metalyon Engineering delivers industrial-level projects
              spanning agricultural machinery, structural steel, and precision CNC laser cutting.
            </p>
          </div>
        </div>

        <div className="container">
          {/* Company Story & Facts */}
          <div className={styles.storySection}>
            <div className={styles.storyContent}>
              <span className={styles.sectionTag}>Heritage &amp; Craft</span>
              <h2 className={styles.sectionHeading}>
                Built on Practical Shop-Floor Engineering
              </h2>
              <div className={styles.storyText}>
                <p>
                  Metalyon Engineering has operated in the metal industry continuously since 1975.
                  What began over five decades ago as a focused fabrication workshop has grown into a
                  versatile engineering facility capable of delivering industrial-level metal projects.
                </p>
                <p>
                  Today, co-owners Bilal Mehmood and Abdul Ahad continue that legacy, pairing
                  traditional metal craftsmanship with modern CNC laser cutting technology. Every piece
                  that leaves our shop floor—from single decorative gates to structural shed frameworks
                  and agricultural machinery—is built to rigorous standards of strength and fit.
                </p>
              </div>

              <div className={styles.factsList}>
                <div className={styles.factItem}>
                  <span className={styles.factNum}>1975</span>
                  <span className={styles.factLabel}>Continuous metalworking heritage</span>
                </div>
                <div className={styles.factItem}>
                  <span className={styles.factNum}>50+</span>
                  <span className={styles.factLabel}>Years of combined experience</span>
                </div>
                <div className={styles.factItem}>
                  <span className={styles.factNum}>14</span>
                  <span className={styles.factLabel}>Core product &amp; service lines</span>
                </div>
              </div>
            </div>

            <div className={styles.storyPhotoSlot}>
              <div className={styles.photoFrame}>
                <div className={styles.photoTag}>WORKSHOP OVERVIEW</div>
                <p className={styles.photoTitle}>Fabrication Floor</p>
                <p className={styles.photoDesc}>Concept illustration placeholder</p>
              </div>
            </div>
          </div>

          {/* Workshop & Capabilities */}
          <div className={styles.capabilitiesSection}>
            <div className={styles.capHead}>
              <span className="accent-bar" />
              <h2 className={styles.sectionHeading}>Workshop &amp; Equipment</h2>
              <p className={styles.sectionSub}>
                Full in-house processing ensures complete quality control without third-party reliance.
              </p>
            </div>

            <div className={styles.capabilitiesGrid}>
              {WORKSHOP_CAPABILITIES.map((cap, i) => (
                <div key={i} className={styles.capCard}>
                  <span className={styles.capNum}>0{i + 1}</span>
                  <h3 className={styles.capTitle}>{cap.title}</h3>
                  <p className={styles.capSpecs}>{cap.specs}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Historical Timeline */}
          <div className={styles.timelineSection}>
            <div className={styles.capHead}>
              <span className="accent-bar" />
              <h2 className={styles.sectionHeading}>Our Evolution</h2>
              <p className={styles.sectionSub}>
                Key milestones shaping our industrial and architectural metal capabilities.
              </p>
            </div>

            <div className={styles.timelineList}>
              {TIMELINE_EVENTS.map((event, i) => (
                <motion.div
                  key={event.year}
                  className={styles.timelineItem}
                  initial={reduced ? {} : { opacity: 0, x: -20 }}
                  whileInView={reduced ? {} : { opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.45 }}
                >
                  <div className={styles.timelineYearWrap}>
                    <span className={styles.timelineYear}>{event.year}</span>
                    {event.isFixed && <span className={styles.fixedBadge}>Documented</span>}
                  </div>
                  <div className={styles.timelineContent}>
                    <h3 className={styles.timelineTitle}>{event.title}</h3>
                    <p className={styles.timelineDesc}>{event.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Leadership Spotlight */}
          <div className={styles.leadershipSection}>
            <div className={styles.capHead}>
              <span className="accent-bar" />
              <h2 className={styles.sectionHeading}>Workshop Leadership</h2>
              <p className={styles.sectionSub}>Direct owner involvement in every project.</p>
            </div>

            <div className={styles.ownersGrid}>
              {SITE.owners.map(owner => (
                <div key={owner.name} className={styles.ownerCard}>
                  <div className={styles.ownerAvatar}>
                    <span className={styles.ownerInitials}>
                      {owner.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <span className={styles.ownerRole}>{owner.role}</span>
                  <h3 className={styles.ownerName}>{owner.name}</h3>
                  <p className={styles.ownerBio}>{owner.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className={styles.bottomCta}>
            <h3 className={styles.bottomTitle}>Ready to discuss your metal project?</h3>
            <p className={styles.bottomSub}>
              Bring your design drawings, specifications, or dimensional requirements.
            </p>
            <div className={styles.bottomActions}>
              <Link to="/contact" className={styles.bottomPrimary}>
                Request a Quote
              </Link>
              <Link to="/shop" className={styles.bottomSecondary}>
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
