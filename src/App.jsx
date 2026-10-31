import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
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
import VisaQuestionsPage from './pages/VisaQuestionsPage'
import VisaFeesPage from './pages/VisaFeesPage'
import TravelNewsPage from './pages/TravelNewsPage'
import VisaGlossaryPage from './pages/VisaGlossaryPage'
import SchengenCalculatorPage from './pages/SchengenCalculatorPage'
import VisaCostCalculatorPage from './pages/VisaCostCalculatorPage'
import VisaCheckerPage from './pages/VisaCheckerPage'
import ScrollToTop from './components/ScrollToTop'
import StickyContact from './components/StickyContact'
import { PlaneProgress } from './components/FX'

function App() {
  const location = useLocation()
  const reduce = useReducedMotion()
  // Pages swing in like a turning page. The template drops the transform
  // entirely once the page has landed, so fixed elements inside pages still
  // position against the window.
  const turn = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, rotateY: -10, x: 60 },
        animate: { opacity: 1, rotateY: 0, x: 0, transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] } },
        exit: { opacity: 0, rotateY: 8, x: -40, transition: { duration: 0.22, ease: 'easeIn' } },
      }

  return (
    <div className="min-h-screen flex flex-col bg-sand-50">
      <PlaneProgress />
      <ScrollToTop />
      <Header />
      <main className="flex-1 overflow-x-clip">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            {...turn}
            style={{ transformOrigin: '0% 40%' }}
            transformTemplate={(_, gen) => (!gen || gen === 'none' ? 'none' : `perspective(1800px) ${gen}`)}
          >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/visa/:slug" element={<VisaPage />} />
            <Route path="/visa/:slug/from/:city" element={<CityVisaPage />} />
            <Route path="/from/:city" element={<CityHubPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/blog" element={<BlogIndexPage />} />
            <Route path="/blog/category/:cat" element={<BlogIndexPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/visa-questions" element={<VisaQuestionsPage />} />
            <Route path="/visa-fees" element={<VisaFeesPage />} />
            <Route path="/travel-news" element={<TravelNewsPage />} />
            <Route path="/visa-glossary" element={<VisaGlossaryPage />} />
            <Route path="/schengen-calculator" element={<SchengenCalculatorPage />} />
            <Route path="/visa-cost-calculator" element={<VisaCostCalculatorPage />} />
            <Route path="/visa-checker" element={<VisaCheckerPage />} />
          </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <StickyContact />
    </div>
  )
}

export default App
