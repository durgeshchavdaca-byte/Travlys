import { Link } from 'react-router-dom'
import { Phone, Mail, MessageCircle, MapPin, ArrowUpRight } from 'lucide-react'
import { Logo } from './Header'
import { destinations } from '../data/destinations'

export default function Footer() {
  const popular = destinations.slice(0, 8)

  return (
    <footer className="relative bg-ink-950 text-white overflow-hidden">
      <div className="absolute inset-0 dot-grid-light opacity-30 pointer-events-none" />
      <div className="absolute -top-32 -left-20 hero-blob-2 opacity-30 hidden md:block" />
      <div className="absolute -bottom-40 -right-20 hero-blob-1 opacity-25 hidden md:block" />

      <div className="relative z-10 container-app py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand block */}
          <div className="md:col-span-4">
            <Logo tone="light" />
            <p className="mt-5 text-[0.95rem] text-white/65 leading-relaxed max-w-sm">
              Travlys handles the visa paperwork, appointments and interview prep so you can focus on the trip. India-based, 5,000+ visas processed across 10+ destinations.
            </p>

            <div className="mt-7 space-y-3 text-sm">
              <a
                href="https://wa.me/918200918967"
                className="inline-flex items-center gap-2 text-white/85 no-underline hover:text-coral-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-coral-500" />
                WhatsApp +91 82009 18967
              </a>
              <a
                href="tel:+918200918967"
                className="flex items-center gap-2 text-white/85 no-underline hover:text-coral-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-coral-500" />
                +91 82009 18967
              </a>
              <a
                href="mailto:info@travlys.com"
                className="flex items-center gap-2 text-white/85 no-underline hover:text-coral-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-coral-500" />
                info@travlys.com
              </a>
              <p className="flex items-start gap-2 text-white/55 text-sm">
                <MapPin className="w-4 h-4 text-coral-500 mt-0.5 shrink-0" />
                <span>Mon - Sat, 9 AM - 7 PM IST</span>
              </p>
            </div>

            <address className="not-italic mt-7 pt-6 border-t border-white/10 text-sm text-white/70 leading-relaxed">
              <p className="text-coral-500 text-[0.7rem] uppercase tracking-[0.18em] font-semibold mb-2">
                Office
              </p>
              <p>
                605, Shivalik Shilp II,<br />
                Near Hotel ITC Narmada, Keshav Baug,<br />
                Vastrapur, Ahmedabad,<br />
                Gujarat 380015, India
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Shivalik+Shilp+II+Keshav+Baug+Vastrapur+Ahmedabad+380015"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-3 text-coral-400 hover:text-coral-300 no-underline text-xs font-medium"
              >
                View on map <ArrowUpRight className="w-3 h-3" />
              </a>
            </address>
          </div>

          {/* Popular destinations */}
          <div className="md:col-span-3">
            <h3 className="text-coral-500 text-[0.7rem] uppercase tracking-[0.18em] font-semibold mb-5">
              Popular visas
            </h3>
            <ul className="space-y-3 text-[0.95rem] list-none p-0 m-0">
              {popular.map((d) => (
                <li key={d.slug}>
                  <Link
                    to={`/visa/${d.slug}`}
                    className="text-white/75 hover:text-coral-400 no-underline transition-colors"
                  >
                    {d.name} Visa
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <h3 className="text-coral-500 text-[0.7rem] uppercase tracking-[0.18em] font-semibold mb-5">
              Services
            </h3>
            <ul className="space-y-3 text-[0.95rem] list-none p-0 m-0">
              <li className="text-white/75">Tourist visas</li>
              <li className="text-white/75">Business visas</li>
              <li className="text-white/75">Student visas</li>
              <li className="text-white/75">Work permits</li>
              <li className="text-white/75">Schengen bundles</li>
              <li className="text-white/75">Flight & stay</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="md:col-span-3">
            <h3 className="text-coral-500 text-[0.7rem] uppercase tracking-[0.18em] font-semibold mb-5">
              Plan your trip
            </h3>
            <p className="text-white/70 text-sm leading-relaxed mb-5">
              Tell us where you want to go. We’ll come back with the right route, price and timeline in under a day.
            </p>
            <a
              href="https://wa.me/918200918967?text=Hi%20Travlys%2C%20I%20want%20help%20with%20my%20visa%20application."
              className="btn btn-coral w-full"
            >
              Chat on WhatsApp
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="mailto:info@travlys.com"
              className="btn btn-on-dark w-full mt-3"
            >
              Email us
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10">
        <div className="container-app py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-xs text-white/50 max-w-2xl leading-relaxed">
            Visa decisions are made by embassies and immigration authorities, not by Travlys. Fees, processing windows and document requirements may change without notice. Service fees shown are exclusive of government / embassy fees.
          </p>
          <p className="text-xs text-white/55 shrink-0">© {new Date().getFullYear()} Travlys. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
