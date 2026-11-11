import React, { Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton'

const Home = React.lazy(() => import('./routes/Home'))
const Shop = React.lazy(() => import('./routes/Shop'))
const Product = React.lazy(() => import('./routes/Product'))
const About = React.lazy(() => import('./routes/About'))
const Contact = React.lazy(() => import('./routes/Contact'))

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
    } else {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [pathname, hash])
  return null
}

function PageLoader() {
  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0f1113',
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          border: '2px solid rgba(255, 106, 26, 0.2)',
          borderTopColor: '#ff6a1a',
          borderRadius: '50%',
          animation: 'spin 0.75s linear infinite',
        }}
      />
    </div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <>
      <ScrollToTop />
      <Header />
      <main id="main-content">
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
