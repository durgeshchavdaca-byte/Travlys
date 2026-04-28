import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { MapPin, ChevronDown, Menu, X } from 'lucide-react'
import { destinations } from '../data/destinations'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  const scrollToSection = (id) => {
    setMobileOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled || mobileOpen
        ? 'bg-navy-900/95 backdrop-blur-xl shadow-lg shadow-navy-900/20'
        : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2 no-underline group">
          <MapPin className="w-7 h-7 text-gold-500 transition-transform duration-300 group-hover:scale-110" />
          <span className="font-heading text-2xl font-semibold text-white tracking-wide">Travlys</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="relative text-sm text-white/80 hover:text-gold-400 no-underline transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-gold-500 after:transition-all after:duration-300">Home</Link>
          <div className="relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
            <button className="flex items-center gap-1 text-sm text-white/80 hover:text-gold-400 bg-transparent border-none cursor-pointer transition-colors duration-300">
              Visa Destinations <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-60 glass-dark rounded-xl py-2 z-50 shadow-2xl">
                {destinations.map(d => (
                  <Link key={d.slug} to={`/visa/${d.slug}`}
                    className="block px-5 py-2.5 text-sm text-white/70 hover:text-gold-400 hover:bg-white/5 no-underline transition-colors duration-200"
                    onClick={() => setDropdownOpen(false)}>
                    {d.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => scrollToSection('process')} className="relative text-sm text-white/80 hover:text-gold-400 bg-transparent border-none cursor-pointer transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-gold-500 after:transition-all after:duration-300">How It Works</button>
          <button onClick={() => scrollToSection('contact')} className="relative text-sm text-white/80 hover:text-gold-400 bg-transparent border-none cursor-pointer transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-gold-500 after:transition-all after:duration-300">Contact</button>
        </div>

        <a href="https://wa.me/918200918967"
          className="hidden md:inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-gold-500 to-gold-400 text-navy-900 text-sm font-semibold rounded-full hover:from-gold-400 hover:to-gold-300 no-underline transition-all duration-300 shadow-lg shadow-gold-500/20 hover:shadow-gold-500/40 hover:scale-105">
          Get Assistance
        </a>

        <button className="md:hidden bg-transparent border-none cursor-pointer text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-navy-900/98 backdrop-blur-xl border-t border-white/10 px-6 py-6 space-y-1">
          <Link to="/" className="block py-3 text-sm text-white/80 hover:text-gold-400 no-underline transition-colors border-b border-white/5">Home</Link>
          <p className="text-xs text-gold-500 uppercase tracking-widest pt-4 pb-2 font-semibold">Destinations</p>
          {destinations.map(d => (
            <Link key={d.slug} to={`/visa/${d.slug}`} className="block py-2 text-sm text-white/60 hover:text-gold-400 no-underline pl-3 transition-colors">{d.name}</Link>
          ))}
          <button onClick={() => scrollToSection('process')} className="block w-full text-left py-3 text-sm text-white/80 hover:text-gold-400 bg-transparent border-none cursor-pointer border-t border-white/5 mt-2 pt-4">How It Works</button>
          <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-3 text-sm text-white/80 hover:text-gold-400 bg-transparent border-none cursor-pointer">Contact</button>
          <a href="https://wa.me/918200918967" className="block text-center mt-4 px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-navy-900 text-sm font-semibold rounded-full no-underline">Get Assistance</a>
        </div>
      )}
    </header>
  )
}
