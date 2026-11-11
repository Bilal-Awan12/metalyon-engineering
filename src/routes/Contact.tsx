import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { PRODUCTS } from '../data/products'
import { SITE } from '../config/site'
import styles from './Contact.module.css'

interface FormData {
  name: string
  phone: string
  email: string
  projectType: string
  notes: string
  fileName: string
}

export default function Contact() {
  const reduced = useReducedMotion()

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    projectType: PRODUCTS[0].name,
    notes: '',
    fileName: '',
  })

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function validate() {
    const errs: Partial<Record<keyof FormData, string>> = {}
    if (!formData.name.trim()) errs.name = 'Please provide your full name.'
    if (!formData.phone.trim()) errs.phone = 'Please provide a valid phone or WhatsApp number.'
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.'
    }
    return errs
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setSubmitting(true)

    // Simulate submission / fallback dispatch
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 800)
  }

  function handleWhatsAppDirect() {
    const msg = encodeURIComponent(
      `Hi Metalyon Engineering,\n\nName: ${formData.name || 'Not provided'}\nPhone: ${formData.phone || 'Not provided'}\nProject: ${formData.projectType}\nNotes: ${formData.notes || 'None'}\n\nPlease provide a quote.`
    )
    window.open(`https://wa.me/${SITE.whatsapp}?text=${msg}`, '_blank')
  }

  function handleMailtoDirect() {
    const subject = encodeURIComponent(`Quote Inquiry: ${formData.projectType} — ${formData.name || 'Client'}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\n\nProject Notes:\n${formData.notes}`
    )
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`
  }

  return (
    <>
      <Helmet>
        <title>Contact &amp; Request a Quote — {SITE.name}</title>
        <meta
          name="description"
          content="Request a quotation or speak with Bilal Mehmood and Abdul Ahad for CNC laser cutting, structural fabrication, gates, and agricultural equipment."
        />
      </Helmet>

      <motion.div
        className={styles.page}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.header}>
          <div className="container">
            <span className="accent-bar" />
            <h1 className={styles.title}>Contact &amp; Request a Quote</h1>
            <p className={styles.sub}>
              Speak directly with our engineering team or send your project specifications for an
              accurate quote.
            </p>
          </div>
        </div>

        <div className="container">
          <div className={styles.layout}>
            {/* Left: Contact Form */}
            <div className={styles.formCol}>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>Project Quotation Form</h2>
                <p className={styles.formSub}>
                  Fill in your project details. We will assess material requirements and respond
                  with dimensions and pricing.
                </p>
              </div>

              {submitted ? (
                <motion.div
                  className={styles.successBox}
                  initial={reduced ? {} : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <span className={styles.successIcon}>✓</span>
                  <h3 className={styles.successTitle}>Inquiry Sent Successfully</h3>
                  <p className={styles.successDesc}>
                    Thank you, <strong>{formData.name}</strong>. Bilal Mehmood and Abdul Ahad will
                    review your project requirements and follow up with you.
                  </p>
                  <div className={styles.successActions}>
                    <button
                      type="button"
                      className={styles.successBtn}
                      onClick={handleWhatsAppDirect}
                    >
                      Also Send via WhatsApp
                    </button>
                    <button
                      type="button"
                      className={styles.resetFormBtn}
                      onClick={() => {
                        setSubmitted(false)
                        setFormData({
                          name: '',
                          phone: '',
                          email: '',
                          projectType: PRODUCTS[0].name,
                          notes: '',
                          fileName: '',
                        })
                      }}
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                  {/* Name */}
                  <div className={styles.field}>
                    <label htmlFor="name-input" className={styles.label}>
                      Full Name <span className={styles.req}>*</span>
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                      placeholder="e.g. Tariq Mehmood"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                    {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                  </div>

                  {/* Phone & Email Dual */}
                  <div className={styles.dualFields}>
                    <div className={styles.field}>
                      <label htmlFor="phone-input" className={styles.label}>
                        Phone / WhatsApp <span className={styles.req}>*</span>
                      </label>
                      <input
                        id="phone-input"
                        type="tel"
                        className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                        placeholder="+92 300 1234567"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                      {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="email-input" className={styles.label}>
                        Email Address (Optional)
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                        placeholder="tariq@example.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                      />
                      {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                    </div>
                  </div>

                  {/* Project Type */}
                  <div className={styles.field}>
                    <label htmlFor="project-select" className={styles.label}>
                      Product or Service Category
                    </label>
                    <select
                      id="project-select"
                      className={styles.select}
                      value={formData.projectType}
                      onChange={e => setFormData({ ...formData, projectType: e.target.value })}
                    >
                      {PRODUCTS.map(p => (
                        <option key={p.id} value={p.name}>
                          {p.name} ({p.category})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Notes / Dimensions */}
                  <div className={styles.field}>
                    <label htmlFor="notes-input" className={styles.label}>
                      Dimensions, Scope &amp; Drawings Note
                    </label>
                    <textarea
                      id="notes-input"
                      rows={4}
                      className={styles.textarea}
                      placeholder="Specify dimensions (e.g. 12ft x 7ft gate), metal gauge, preferred finish (galvanized, powder coat), or site location..."
                      value={formData.notes}
                      onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    />
                  </div>

                  {/* File Upload (UI-only for CAD/Sketches) */}
                  <div className={styles.field}>
                    <label className={styles.label}>
                      Attach Drawing / Blueprint (Optional)
                    </label>
                    <div className={styles.uploadBox}>
                      <input
                        type="file"
                        id="file-upload"
                        className={styles.fileInput}
                        onChange={e => {
                          const file = e.target.files?.[0]
                          setFormData({ ...formData, fileName: file ? file.name : '' })
                        }}
                      />
                      <label htmlFor="file-upload" className={styles.uploadLabel}>
                        <span className={styles.uploadIcon}>📎</span>
                        <span className={styles.uploadText}>
                          {formData.fileName || 'Choose CAD / PDF / Image (UI preview)'}
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button & Direct Fallbacks */}
                  <div className={styles.formActions}>
                    <button
                      type="submit"
                      className={styles.submitBtn}
                      disabled={submitting}
                    >
                      {submitting ? 'Sending Request…' : 'Submit Quote Request'}
                    </button>

                    <div className={styles.orDivider}>
                      <span>or reach out instantly</span>
                    </div>

                    <div className={styles.quickFallbackBtns}>
                      <button
                        type="button"
                        className={styles.quickWaBtn}
                        onClick={handleWhatsAppDirect}
                      >
                        Send via WhatsApp
                      </button>
                      <button
                        type="button"
                        className={styles.quickEmailBtn}
                        onClick={handleMailtoDirect}
                      >
                        Send via Email
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Right: Direct Workshop Details & Map */}
            <div className={styles.infoCol}>
              <div className={styles.infoBox}>
                <h3 className={styles.infoBoxTitle}>Workshop Contacts</h3>

                <div className={styles.infoList}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Address / Workshop:</span>
                    <p className={styles.infoValue}>{SITE.address}</p>
                  </div>

                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Phone:</span>
                    <a href={`tel:${SITE.phone}`} className={styles.infoLink}>
                      {SITE.phone}
                    </a>
                  </div>

                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>WhatsApp Inquiries:</span>
                    <a
                      href={`https://wa.me/${SITE.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.infoLink}
                    >
                      +{SITE.whatsapp}
                    </a>
                  </div>

                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Email:</span>
                    <a href={`mailto:${SITE.email}`} className={styles.infoLink}>
                      {SITE.email}
                    </a>
                  </div>

                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Workshop Working Hours:</span>
                    <p className={styles.infoValue}>{SITE.hours}</p>
                  </div>
                </div>

                <div className={styles.leadershipNotes}>
                  <p className={styles.leaderHead}>Direct Workshop Supervisors:</p>
                  <p className={styles.leaderText}>
                    Bilal Mehmood &amp; Abdul Ahad overseeing fabrication &amp; laser tolerances.
                  </p>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className={styles.mapBox}>
                <div className={styles.mapFrame}>
                  <div className={styles.mapIconWrap}>
                    <span className={styles.mapPinIcon}>📍</span>
                    <p className={styles.mapTitle}>Workshop Location</p>
                    <p className={styles.mapAddress}>{SITE.address}</p>
                    <p className={styles.mapNote}>(Config embed placeholder: TODO_MAP_EMBED_URL)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
