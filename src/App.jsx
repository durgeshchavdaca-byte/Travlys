import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import VisaPage from './pages/VisaPage'
import CityVisaPage from './pages/CityVisaPage'
import CityHubPage from './pages/CityHubPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import PricingPage from './pages/PricingPage'
import BlogIndexPage from './pages/BlogIndexPage'
import BlogPostPage from './pages/BlogPostPage'
import ScrollToTop from './components/ScrollToTop'
import StickyContact from './components/StickyContact'
import { ScrollProgress } from './components/MotionGraphics'

function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-sand-50">
      <ScrollProgress />
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/visa/:slug" element={<VisaPage />} />
            <Route path="/visa/:slug/from/:city" element={<CityVisaPage />} />
            <Route path="/from/:city" element={<CityHubPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/blog" element={<BlogIndexPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <StickyContact />
    </div>
  )
}

export default App
