import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { MapPin, ChevronDown, Menu, X } from 'lucide-react'
import { destinations } from '../data/destinations'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const scrollToSection = (id) => {
    setMobileOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-1.5 text-xl font-semibold text-slate-800 no-underline">
          <MapPin className="w-6 h-6 text-sky-500" />
          travlys
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm text-slate-600 hover:text-slate-900 no-underline">Home</Link>
          <div className="relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
            <button className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 bg-transparent border-none cursor-pointer">
              Visa Destinations <ChevronDown className="w-4 h-4" />
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-slate-100 py-2 z-50">
                {destinations.map(d => (
                  <Link key={d.slug} to={`/visa/${d.slug}`} className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 no-underline"
                    onClick={() => setDropdownOpen(false)}>
                    {d.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => scrollToSection('process')} className="text-sm text-slate-600 hover:text-slate-900 bg-transparent border-none cursor-pointer">How It Works</button>
          <button onClick={() => scrollToSection('contact')} className="text-sm text-slate-600 hover:text-slate-900 bg-transparent border-none cursor-pointer">Contact</button>
        </div>

        <a href="https://wa.me/918200918967" className="hidden md:inline-flex items-center px-5 py-2.5 bg-slate-800 text-white text-sm font-medium rounded-lg hover:bg-slate-700 no-underline transition-colors">
          Get Assistance
        </a>

        {/* Mobile Toggle */}
        <button className="md:hidden bg-transparent border-none cursor-pointer" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-3">
          <Link to="/" className="block text-sm text-slate-600 no-underline" onClick={() => setMobileOpen(false)}>Home</Link>
          {destinations.map(d => (
            <Link key={d.slug} to={`/visa/${d.slug}`} className="block text-sm text-slate-600 no-underline pl-4" onClick={() => setMobileOpen(false)}>{d.name}</Link>
          ))}
          <button onClick={() => scrollToSection('process')} className="block text-sm text-slate-600 bg-transparent border-none cursor-pointer p-0">How It Works</button>
          <button onClick={() => scrollToSection('contact')} className="block text-sm text-slate-600 bg-transparent border-none cursor-pointer p-0">Contact</button>
          <a href="https://wa.me/918200918967" className="block text-center px-5 py-2.5 bg-slate-800 text-white text-sm font-medium rounded-lg no-underline">Get Assistance</a>
        </div>
      )}
    </header>
  )
}
