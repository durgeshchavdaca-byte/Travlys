import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X, Phone } from 'lucide-react'
import { destinations } from '../data/destinations'

function Logo({ tone = 'dark' }) {
  const fg = tone === 'light' ? '#ffffff' : '#0f1b4c'
  return (
    <span className="flex items-center gap-2.5">
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden>
        <rect width="40" height="40" rx="11" fill="#ff7849" />
        <path
          d="M9 24 L21 12 L31 14 L22 23 L17 22 L13 26 Z"
          fill="#ffffff"
        />
        <circle cx="27" cy="17" r="1.6" fill="#0f1b4c" />
      </svg>
      <span
        className="font-display text-[1.45rem] font-extrabold tracking-tight"
        style={{ color: fg }}
      >
        Travlys
      </span>
    </span>
  )
}
export { Logo }

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setDropdownOpen(false)
  }, [location.pathname])

  const goSection = (id) => {
    setMobileOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 60)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'bg-white/85 backdrop-blur-xl border-b border-line shadow-[0_1px_0_rgba(15,27,76,0.04)]'
          : 'bg-transparent'
      }`}
    >
      <div className="container-app flex items-center justify-between h-[72px]">
        <Link to="/" className="no-underline" aria-label="Travlys home">
          <Logo tone="dark" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink onClick={() => goSection('destinations')}>Destinations</NavLink>
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              className="flex items-center gap-1 px-4 py-2 text-[0.95rem] font-medium text-slate-text hover:text-ink-900 transition-colors bg-transparent border-none cursor-pointer"
              onClick={() => setDropdownOpen((v) => !v)}
              aria-expanded={dropdownOpen}
            >
              Countries
              <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {dropdownOpen && (
              <div
                role="menu"
                className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[640px] bg-white border border-line rounded-2xl shadow-pop p-3 grid grid-cols-2 gap-1"
              >
                {destinations.map((d) => (
                  <Link
                    key={d.slug}
                    to={`/visa/${d.slug}`}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-text hover:bg-sand-50 hover:text-ink-900 no-underline transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span className="text-xl" aria-hidden>{d.flag}</span>
                    <span className="flex-1">
                      <span className="font-semibold text-ink-900 block leading-tight">{d.name}</span>
                      <span className="text-xs text-slate-muted">{d.processingTime} · {d.price}</span>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <NavLink onClick={() => goSection('how-it-works')}>How it works</NavLink>
          <NavLink onClick={() => goSection('pricing')}>Pricing</NavLink>
          <NavLink onClick={() => goSection('faq')}>FAQ</NavLink>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+918200918967"
            className="flex items-center gap-2 text-sm font-medium text-ink-900 no-underline hover:text-coral-500 transition-colors"
          >
            <Phone className="w-4 h-4" /> +91 82009 18967
          </a>
          <button onClick={() => goSection('inquiry')} className="btn btn-primary">
            Start application
          </button>
        </div>

        <button
          className="md:hidden bg-transparent border-none cursor-pointer text-ink-900"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-line max-h-[calc(100vh-72px)] overflow-y-auto">
          <div className="container-app py-6 space-y-1">
            <button onClick={() => goSection('destinations')} className="w-full text-left py-3 text-base font-medium text-ink-900 bg-transparent border-none cursor-pointer">
              Destinations
            </button>
            <button onClick={() => goSection('how-it-works')} className="w-full text-left py-3 text-base font-medium text-ink-900 bg-transparent border-none cursor-pointer">
              How it works
            </button>
            <button onClick={() => goSection('pricing')} className="w-full text-left py-3 text-base font-medium text-ink-900 bg-transparent border-none cursor-pointer">
              Pricing
            </button>
            <button onClick={() => goSection('faq')} className="w-full text-left py-3 text-base font-medium text-ink-900 bg-transparent border-none cursor-pointer">
              FAQ
            </button>

            <p className="text-xs uppercase tracking-widest text-slate-faint pt-5 pb-2 font-semibold">
              Countries
            </p>
            <div className="grid grid-cols-2 gap-1">
              {destinations.map((d) => (
                <Link
                  key={d.slug}
                  to={`/visa/${d.slug}`}
                  className="flex items-center gap-2 py-2.5 text-sm text-slate-text no-underline"
                >
                  <span className="text-base">{d.flag}</span>
                  <span>{d.name}</span>
                </Link>
              ))}
            </div>

            <div className="pt-5 grid grid-cols-2 gap-3">
              <a href="tel:+918200918967" className="btn btn-ghost">
                <Phone className="w-4 h-4" /> Call
              </a>
              <button onClick={() => goSection('inquiry')} className="btn btn-primary">
                Start application
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function NavLink({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 text-[0.95rem] font-medium text-slate-text hover:text-ink-900 transition-colors bg-transparent border-none cursor-pointer"
    >
      {children}
    </button>
  )
}
