// ============================================================
// METALYON ENGINEERING — SITE CONFIG
// Replace all TODO_ values before going live.
// ============================================================
export const SITE = {
  name: 'Metalyon Engineering',
  tagline: 'Precision Metalwork. Since 1975.',
  description: 'CNC laser cutting, gates, railings, windows, doors and industrial machinery, engineered and built by Bilal Mehmood and Abdul Ahad.',

  // Contact — replace all TODO_ values
  phone:        'TODO_PHONE',          // e.g. '+92-XXX-XXXXXXX'
  whatsapp:     'TODO_WHATSAPP',       // digits only, e.g. '923001234567'
  email:        'TODO_EMAIL',          // e.g. 'info@metalyon.com'
  address:      'TODO_ADDRESS',        // e.g. 'Industrial Area, Lahore, Pakistan'
  hours:        'TODO_HOURS',          // e.g. 'Mon–Sat 8am–6pm'

  // Online
  domain:       'TODO_DOMAIN',
  basePath:     '/metalyon-engineering/',

  // Social — replace TODO_ or leave null to hide the icon
  socials: {
    facebook:   'TODO_FACEBOOK_URL',
    instagram:  'TODO_INSTAGRAM_URL',
    youtube:    null as string | null,
    linkedin:   null as string | null,
  },

  // Map embed — paste a Google Maps embed src here
  mapEmbed: 'TODO_MAP_EMBED_URL',

  // Form handler — set to 'mailto' | 'whatsapp' | 'formspree' | 'netlify'
  formHandler: 'mailto' as 'mailto' | 'whatsapp' | 'formspree' | 'netlify',
  formspreeId: 'TODO_FORMSPREE_ID',

  // Owners (factual)
  owners: [
    { name: 'Bilal Mehmood', role: 'Co-Owner', bio: 'Leading the workshop with over 50 years of combined family experience in metal fabrication.' },
    { name: 'Abdul Ahad',   role: 'Co-Owner', bio: 'Overseeing operations and CNC precision cutting for every project.' },
  ],

  // Trust bar
  trust: ['Since 1975', '50+ Years', 'CNC Precision', 'Industrial Grade'],

  // Established year
  established: 1975,
} as const
