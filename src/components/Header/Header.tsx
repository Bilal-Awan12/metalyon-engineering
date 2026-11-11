import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useQuoteList } from '../../context/QuoteListContext'
import QuoteDialog from '../QuoteDialog/QuoteDialog'
import { EASE, SPRING_OVERSHOOT } from '../../utils/motion'
import styles from './Header.module.css'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Our Work', to: '/#our-work' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Header() {
  const { count, isOpen, toggleDialog } = useQuoteList()
  const location = useLocation()
  const reduced = useReducedMotion()

  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/'
    if (to.startsWith('/#')) return location.pathname === '/' && location.hash === to.slice(1)
    return location.pathname.startsWith(to)
  }

  return (
    <>
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>

      <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
        <div className={styles.inner}>
          {/* Brand Logo */}
          <Link to="/" className={styles.brand} aria-label="Metalyon Engineering home">
            <svg
              className={styles.brandIcon}
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
            >
              <rect width="32" height="32" fill="#161a1d" />
              <circle cx="16" cy="16" r="11" stroke="#ff6a1a" strokeWidth="1.5" />
              <path d="M16 2 L16 6 M16 26 L16 30 M2 16 L6 16 M26 16 L30 16" stroke="#ff6a1a" strokeWidth="1.5" />
              <path d="M10 10 L16 16 L22 10" stroke="#f2f0ec" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="16" cy="16" r="2.5" fill="#ff6a1a" />
            </svg>
            <div className={styles.brandText}>
              <span className={styles.brandMain}>METALYON</span>
              <span className={styles.brandSub}>ENGINEERING</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.nav} role="navigation" aria-label="Main Navigation">
            <ul className={styles.navList}>
              {NAV_LINKS.map(link => {
                const active = isActive(link.to)
                return (
                  <li key={link.to} className={styles.navItem}>
                    <Link
                      to={link.to}
                      className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`}
                    >
                      {link.label}
                      {active && (
                        <motion.span
                          layoutId="nav-underline"
                          className={styles.navUnderline}
                          transition={
                            reduced
                              ? { duration: 0 }
                              : { type: 'spring', stiffness: 350, damping: 30 }
                          }
                        />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Right Actions */}
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.quoteBtn}
              onClick={toggleDialog}
              aria-label={`Open quote list, ${count} item${count !== 1 ? 's' : ''}`}
            >
              <span>Quote list</span>
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    className={styles.quoteBadge}
                    initial={reduced ? { opacity: 0 } : { scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.2, ease: SPRING_OVERSHOOT }}
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <Link to="/contact" className={styles.ctaBtn}>
              Get a Quote
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className={styles.hamburger}
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className={`${styles.bar} ${mobileMenuOpen ? styles.barTopOpen : ''}`} />
              <span className={`${styles.bar} ${mobileMenuOpen ? styles.barMidOpen : ''}`} />
              <span className={`${styles.bar} ${mobileMenuOpen ? styles.barBotOpen : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={styles.mobileDrawer}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <nav className={styles.mobileNav}>
              {NAV_LINKS.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={styles.mobileNavLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className={styles.mobileActions}>
              <button
                type="button"
                className={styles.mobileQuoteBtn}
                onClick={() => {
                  setMobileMenuOpen(false)
                  toggleDialog()
                }}
              >
                Quote list {count > 0 && `(${count})`}
              </button>
              <Link
                to="/contact"
                className={styles.mobileCtaBtn}
                onClick={() => setMobileMenuOpen(false)}
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide-in Quote Dialog */}
      {isOpen && <QuoteDialog />}
    </>
  )
}
