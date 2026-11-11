import { Link } from 'react-router-dom'
import { SITE } from '../../config/site'
import { CATEGORIES } from '../../data/products'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.inner}`}>
        {/* Col 1: Brand & Bio */}
        <div className={styles.brandCol}>
          <div className={styles.logoWrap}>
            <span className={styles.logoMain}>METALYON</span>
            <span className={styles.logoSub}>ENGINEERING</span>
          </div>
          <p className={styles.blurb}>
            Industrial-grade CNC laser cutting, structural fabrication, gates, railings,
            windows, and agricultural machinery.
          </p>
          <p className={styles.ownersLine}>
            Owners: {SITE.owners.map(o => o.name).join(' & ')}
          </p>
          <p className={styles.estLine}>
            Serving the industry with precision since {SITE.established} (50+ years).
          </p>
        </div>

        {/* Col 2: Quick Links */}
        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Navigation</h4>
          <ul className={styles.linksList}>
            <li><Link to="/" className={styles.footerLink}>Home</Link></li>
            <li><Link to="/shop" className={styles.footerLink}>Shop Catalogue</Link></li>
            <li><Link to="/#our-work" className={styles.footerLink}>Our Work</Link></li>
            <li><Link to="/about" className={styles.footerLink}>About Us</Link></li>
            <li><Link to="/contact" className={styles.footerLink}>Contact &amp; Quotes</Link></li>
          </ul>
        </div>

        {/* Col 3: Categories */}
        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Product Lines</h4>
          <ul className={styles.linksList}>
            {CATEGORIES.map(cat => (
              <li key={cat}>
                <Link
                  to={`/shop?category=${encodeURIComponent(cat)}`}
                  className={styles.footerLink}
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Contact info */}
        <div className={styles.contactCol}>
          <h4 className={styles.colTitle}>Workshop &amp; Inquiries</h4>
          <p className={styles.contactItem}>
            <span className={styles.contactLabel}>Address:</span>
            <span className={styles.contactValue}>{SITE.address}</span>
          </p>
          <p className={styles.contactItem}>
            <span className={styles.contactLabel}>Phone:</span>
            <a href={`tel:${SITE.phone}`} className={styles.contactLink}>{SITE.phone}</a>
          </p>
          <p className={styles.contactItem}>
            <span className={styles.contactLabel}>WhatsApp:</span>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              +{SITE.whatsapp}
            </a>
          </p>
          <p className={styles.contactItem}>
            <span className={styles.contactLabel}>Email:</span>
            <a href={`mailto:${SITE.email}`} className={styles.contactLink}>{SITE.email}</a>
          </p>
          <p className={styles.contactItem}>
            <span className={styles.contactLabel}>Hours:</span>
            <span className={styles.contactValue}>{SITE.hours}</span>
          </p>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomInner}`}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} {SITE.name}. In the metal field since {SITE.established}.
          </p>
          <p className={styles.rights}>
            All rights reserved. Industrial fabrication &amp; CNC laser cutting.
          </p>
        </div>
      </div>
    </footer>
  )
}
