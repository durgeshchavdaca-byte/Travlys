import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, ChevronUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative bg-navy-900 text-body-on-dark overflow-hidden">
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

      {/* Gold top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 no-underline mb-5 group">
              <MapPin className="w-7 h-7 text-gold-500" />
              <span className="font-heading text-2xl font-semibold text-white tracking-wide">Travlys</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-body-on-dark">Professional visa assistance services for travelers across the globe. From documentation to submission, we ensure a smooth visa experience.</p>
            <div className="space-y-3 text-sm">
              <a href="tel:+918200918967" className="flex items-center gap-3 text-body-on-dark hover:text-gold-400 no-underline transition-colors">
                <Phone className="w-4 h-4 text-gold-500/70" /> 8200918967
              </a>
              <a href="mailto:info@travlys.com" className="flex items-center gap-3 text-body-on-dark hover:text-gold-400 no-underline transition-colors">
                <Mail className="w-4 h-4 text-gold-500/70" /> info@travlys.com
              </a>
            </div>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="text-gold-500 font-heading text-sm uppercase tracking-widest mb-5">Popular Destinations</h3>
            <ul className="space-y-3 text-sm list-none p-0 m-0">
              {[['United States Visa', 'usa-visa'], ['Singapore Visa', 'singapore-visa'], ['Thailand Visa', 'thailand-visa'], ['Australia Visa', 'australia-visa'], ['New Zealand Visa', 'new-zealand-visa'], ['Netherlands Visa', 'netherlands-visa']].map(([name, slug]) => (
                <li key={slug}>
                  <Link to={`/visa/${slug}`} className="text-body-on-dark hover:text-gold-400 no-underline transition-colors duration-200">{name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Visa Services */}
          <div>
            <h3 className="text-gold-500 font-heading text-sm uppercase tracking-widest mb-5">Visa Services</h3>
            <ul className="space-y-3 text-sm list-none p-0 m-0">
              <li><a href="/#visa-types" className="text-body-on-dark hover:text-gold-400 no-underline transition-colors">Tourist Visa</a></li>
              <li><a href="/#visa-types" className="text-body-on-dark hover:text-gold-400 no-underline transition-colors">Business Visa</a></li>
              <li><a href="/#visa-types" className="text-body-on-dark hover:text-gold-400 no-underline transition-colors">Employment Visa</a></li>
              <li><a href="/#process" className="text-body-on-dark hover:text-gold-400 no-underline transition-colors">How It Works</a></li>
              <li><a href="https://wa.me/918200918967" className="text-body-on-dark hover:text-gold-400 no-underline transition-colors">Get Assistance</a></li>
            </ul>
          </div>

          {/* More Services */}
          <div>
            <h3 className="text-gold-500 font-heading text-sm uppercase tracking-widest mb-5">More Services</h3>
            <ul className="space-y-3 text-sm list-none p-0 m-0">
              <li className="text-body-on-dark">Holiday Packages</li>
              <li className="text-body-on-dark">Flight Bookings</li>
              <li className="text-body-on-dark">Hotel & Accommodation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-body-on-dark">Visa approvals, processing time, and documentation requirements are subject to the respective embassy or immigration authority regulations and may vary by country.</p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-body-on-dark">&copy; 2026 Travlys. All rights reserved.</p>
            <button onClick={scrollToTop} className="w-9 h-9 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-500 hover:bg-gold-500 hover:text-navy-900 transition-all duration-300 cursor-pointer">
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
