import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import VisaPage from './pages/VisaPage'
import ScrollToTop from './components/ScrollToTop'
import StickyContact from './components/StickyContact'
import { ScrollProgress } from './components/MotionGraphics'

function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-cream-50">
      <ScrollProgress />
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/visa/:slug" element={<VisaPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <StickyContact />
    </div>
  )
}

export default App
