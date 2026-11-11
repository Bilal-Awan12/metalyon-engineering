import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero/Hero'
import Showcase from '../components/Showcase/Showcase'
import CategoryGrid from '../components/CategoryGrid/CategoryGrid'
import ShopPreview from '../components/ShopPreview/ShopPreview'
import WhyMetalyon from '../components/WhyMetalyon/WhyMetalyon'
import Process from '../components/Process/Process'
import Owners from '../components/Owners/Owners'
import Testimonials from '../components/Testimonials/Testimonials'
import CtaBand from '../components/CtaBand/CtaBand'
import { SITE } from '../config/site'

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{SITE.name} — Precision Metalwork &amp; CNC Laser Cutting Since 1975</title>
        <meta
          name="description"
          content="CNC laser cutting, gates, railings, windows, doors and industrial machinery engineered and built by Bilal Mehmood and Abdul Ahad. 50+ years of metal fabrication."
        />
        <meta property="og:title" content={`${SITE.name} — Precision Metalwork Since 1975`} />
        <meta
          property="og:description"
          content="CNC laser cutting and industrial metal fabrication by Bilal Mehmood & Abdul Ahad."
        />
      </Helmet>

      <motion.div
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* 1. HERO */}
        <Hero />

        {/* 2. EXPLORE OUR WORK (Showcase Ring Carousel) */}
        <section id="our-work">
          <Showcase />
        </section>

        {/* 3. WHAT WE BUILD (6 Category Cards) */}
        <CategoryGrid />

        {/* 4. SHOP PREVIEW (8 Featured Products) */}
        <ShopPreview />

        {/* 5. WHY METALYON (50+ Years, CNC, Counters) */}
        <WhyMetalyon />

        {/* 6. OUR PROCESS (5-Step Animated Timeline) */}
        <Process />

        {/* 7. MEET THE OWNERS (Bilal Mehmood & Abdul Ahad) */}
        <Owners />

        {/* 8. TESTIMONIALS (3 Placeholder Cards) */}
        <Testimonials />

        {/* 9. FINAL CTA BAND */}
        <CtaBand />
      </motion.div>
    </>
  )
}
