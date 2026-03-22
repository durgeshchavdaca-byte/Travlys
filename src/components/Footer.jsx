import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-1.5 text-xl font-semibold text-white no-underline mb-4">
              <MapPin className="w-6 h-6 text-sky-500" />
              travlys
            </Link>
            <p className="text-sm leading-relaxed mb-6">Professional visa assistance services for travelers across the globe. From documentation to submission, we ensure a smooth visa experience.</p>
            <div className="space-y-2 text-sm">
              <a href="tel:+918200918967" className="flex items-center gap-2 text-slate-300 hover:text-white no-underline"><Phone className="w-4 h-4" /> 8200918967</a>
              <a href="mailto:info@travlys.com" className="flex items-center gap-2 text-slate-300 hover:text-white no-underline"><Mail className="w-4 h-4" /> info@travlys.com</a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Popular Destinations</h3>
            <ul className="space-y-2 text-sm list-none p-0 m-0">
              {[['United States Visa', 'usa-visa'], ['Singapore Visa', 'singapore-visa'], ['Thailand Visa', 'thailand-visa'], ['Australia Visa', 'australia-visa'], ['New Zealand Visa', 'new-zealand-visa'], ['Netherlands Visa', 'netherlands-visa']].map(([name, slug]) => (
                <li key={slug}><Link to={`/visa/${slug}`} className="text-slate-300 hover:text-white no-underline">{name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Visa Services</h3>
            <ul className="space-y-2 text-sm list-none p-0 m-0">
              <li><a href="/#visa-types" className="text-slate-300 hover:text-white no-underline">Tourist Visa</a></li>
              <li><a href="/#visa-types" className="text-slate-300 hover:text-white no-underline">Business Visa</a></li>
              <li><a href="/#visa-types" className="text-slate-300 hover:text-white no-underline">Employment Visa</a></li>
              <li><a href="/#process" className="text-slate-300 hover:text-white no-underline">How It Works</a></li>
              <li><a href="https://wa.me/918200918967" className="text-slate-300 hover:text-white no-underline">Get Assistance</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">More Services</h3>
            <ul className="space-y-2 text-sm list-none p-0 m-0">
              <li className="text-slate-300">Holiday Packages</li>
              <li className="text-slate-300">Flight Bookings</li>
              <li className="text-slate-300">Hotel & Accommodation</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-xs text-slate-400 mb-4">Visa approvals, processing time, and documentation requirements are subject to the respective embassy or immigration authority regulations and may vary by country.</p>
          <p className="text-xs text-slate-400 text-center">&copy; 2026 Travlys. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
