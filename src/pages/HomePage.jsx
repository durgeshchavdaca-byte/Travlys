import { useState, useMemo, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Search,
  Plane,
  ShieldCheck,
  Clock3,
  FileCheck2,
  Users,
  MessageCircle,
  Phone,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Globe2,
  Map,
  MapPin,
  Headphones,
  Star,
  Plus,
  Calendar,
  TrendingUp,
  ChevronRight,
} from 'lucide-react'
import AnimatedSection, { StaggerContainer, StaggerItem } from '../components/AnimatedSection'
import { HeroBlobs, AnimatedCounter, TextReveal } from '../components/MotionGraphics'
import { destinations, globalCountries, regions } from '../data/destinations'
import SEO from '../components/SEO'
import InquiryForm from '../components/InquiryForm'
import Reviews from '../components/Reviews'
import FeaturedTestimonials from '../components/FeaturedTestimonials'
import Flag from '../components/Flag'
import { buildHomeSchemas, getHomeMeta, HOME_FAQS } from '../seo/config'
import { reviews } from '../data/reviews'
import { FEATURED_TESTIMONIALS } from '../data/testimonials'

/* ─── HERO ────────────────────────────────────────────────────────────────── */

function HeroSearch() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return destinations.slice(0, 5)
    return destinations.filter((d) => d.name.toLowerCase().includes(q)).slice(0, 6)
  }, [query])

  const pick = (d) => {
    setQuery('')
    setFocused(false)
    navigate(`/visa/${d.slug}`)
  }

  return (
    <div className="relative w-full max-w-2xl">
      <div className="card flex items-center pl-5 pr-2 py-2 gap-3 rounded-full shadow-pop">
        <Search className="w-5 h-5 text-slate-faint" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 180)}
          placeholder="Where do you want to go? Try USA, Schengen, Dubai…"
          className="flex-1 bg-transparent border-none outline-none text-[1rem] text-ink-900 placeholder:text-slate-faint py-2.5"
          aria-label="Search destinations"
        />
        <button
          type="button"
          onClick={() => suggestions[0] && pick(suggestions[0])}
          className="btn btn-coral py-2.5 px-5"
        >
          Search
        </button>
      </div>

      {focused && (
        <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white border border-line rounded-2xl shadow-pop overflow-hidden z-30">
          <p className="px-5 pt-4 pb-2 text-xs uppercase tracking-widest text-slate-faint font-semibold">
            {query ? 'Matches' : 'Popular this week'}
          </p>
          <ul className="list-none p-2 m-0">
            {suggestions.map((d) => (
              <li key={d.slug}>
                <button
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => pick(d)}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-sand-50 text-left bg-transparent border-none cursor-pointer transition-colors"
                >
                  <Flag code={d.code} name={d.name} size={24} />
                  <span className="flex-1">
                    <span className="font-semibold text-ink-900 block leading-tight">{d.name}</span>
                    <span className="text-xs text-slate-muted">
                      {d.visaType} · {d.processingTime}
                    </span>
                  </span>
                  <span className="text-sm font-semibold text-coral-500">{d.price}</span>
                  <ChevronRight className="w-4 h-4 text-slate-faint" />
                </button>
              </li>
            ))}
            {suggestions.length === 0 && (
              <li className="px-3 py-4 text-sm text-slate-muted">
                We don’t list that one yet, message us and we’ll see what we can do.
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

function HeroBackdrop() {
  return (
    <>
      {/* Rotating wireframe globe, sits behind the headline, very low opacity */}
      <div
        className="absolute right-[-160px] top-[80px] w-[460px] h-[460px] pointer-events-none hidden md:block"
        style={{ perspective: '900px' }}
      >
        <div className="globe-spin w-full h-full">
          <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" stroke="#0f1b4c" strokeWidth="0.45" opacity="0.18">
            <circle cx="100" cy="100" r="95" />
            <ellipse cx="100" cy="100" rx="95" ry="35" />
            <ellipse cx="100" cy="100" rx="95" ry="35" transform="rotate(30 100 100)" />
            <ellipse cx="100" cy="100" rx="95" ry="35" transform="rotate(60 100 100)" />
            <ellipse cx="100" cy="100" rx="95" ry="35" transform="rotate(90 100 100)" />
            <ellipse cx="100" cy="100" rx="95" ry="35" transform="rotate(120 100 100)" />
            <ellipse cx="100" cy="100" rx="95" ry="35" transform="rotate(150 100 100)" />
            <ellipse cx="100" cy="100" rx="60" ry="95" />
            <ellipse cx="100" cy="100" rx="28" ry="95" />
            <ellipse cx="100" cy="100" rx="85" ry="95" />
            <line x1="100" y1="5" x2="100" y2="195" />
            <line x1="5" y1="100" x2="195" y2="100" />
          </svg>
        </div>
      </div>

      {/* Mirror globe on the left, smaller, even fainter, for balance */}
      <div
        className="absolute left-[-120px] bottom-[40px] w-[300px] h-[300px] pointer-events-none hidden lg:block"
        style={{ perspective: '900px' }}
      >
        <div className="globe-spin w-full h-full" style={{ animationDirection: 'reverse', animationDuration: '90s' }}>
          <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" stroke="#d4a64a" strokeWidth="0.45" opacity="0.22">
            <circle cx="100" cy="100" r="95" />
            <ellipse cx="100" cy="100" rx="95" ry="35" />
            <ellipse cx="100" cy="100" rx="95" ry="35" transform="rotate(45 100 100)" />
            <ellipse cx="100" cy="100" rx="95" ry="35" transform="rotate(90 100 100)" />
            <ellipse cx="100" cy="100" rx="95" ry="35" transform="rotate(135 100 100)" />
            <ellipse cx="100" cy="100" rx="55" ry="95" />
            <ellipse cx="100" cy="100" rx="85" ry="95" />
          </svg>
        </div>
      </div>

      {/* Animated dashed flight-path arc near the bottom of the hero */}
      <svg
        className="absolute left-0 right-0 bottom-[-20px] w-full h-32 pointer-events-none hidden md:block"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="hero-path-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"  stopColor="#d4a64a" stopOpacity="0" />
            <stop offset="20%" stopColor="#d4a64a" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#ff7849" stopOpacity="0.85" />
            <stop offset="80%" stopColor="#d4a64a" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#d4a64a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          className="flight-path"
          d="M0,90 C200,30 400,110 600,55 C800,15 1000,95 1200,40"
          stroke="url(#hero-path-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* tiny aeroplane silhouette at the end of the path */}
        <g transform="translate(1170 40) rotate(-12)">
          <path d="M-12,-1 L8,-3 L10,0 L8,3 L-12,1 L-9,4 L-14,4 L-16,0 L-14,-4 L-9,-4 Z" fill="#ff7849" opacity="0.85" />
        </g>
      </svg>
    </>
  )
}

function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden mesh-warm">
      <HeroBlobs />
      <HeroBackdrop />
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />

      <div className="relative z-10 container-app">
        <div className="text-center max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pill bg-white border border-line text-ink-900"
          >
            <Sparkles className="w-3.5 h-3.5 text-coral-500" />
            Trusted by 5,000+ Indian travelers · 98% approval rate
          </motion.span>

          <h1 className="font-display text-[2.6rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] font-extrabold text-ink-900 mt-6 leading-[1.02]">
            <TextReveal text="You pack the bags." as="span" />
            <br />
            <span className="hero-italic-mark">
              <span className="relative italic">We handle the visa.</span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-[1.05rem] md:text-lg text-slate-muted mt-6 max-w-xl mx-auto leading-relaxed"
          >
            5,000+ Indian travelers have boarded with Travlys. Tell us
            where you’re going, we prep the application, book the
            appointment, and coach the interview.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex justify-center mt-9"
          >
            <HeroSearch />
          </motion.div>

          {/* Quick-pick chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-2"
          >
            <span className="text-xs text-slate-muted font-medium mr-1">Quick pick:</span>
            {destinations.slice(0, 6).map((d) => (
              <Link key={d.slug} to={`/visa/${d.slug}`} className="chip no-underline hover:border-coral-500 hover:text-coral-600 transition-colors">
                <Flag code={d.code} name={d.name} size={16} />
                <span>{d.name}</span>
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Mini trust row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto"
        >
          {[
            { icon: ShieldCheck, label: '98% approval', sub: '5,000+ visas filed' },
            { icon: Clock3, label: '~3 days', sub: 'avg e-Visa turnaround' },
            { icon: Headphones, label: 'WhatsApp', sub: 'support until decision' },
            { icon: TrendingUp, label: 'Transparent', sub: 'fees from ₹999' },
          ].map((t, i) => (
            <div key={i} className="card p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-coral-50 flex items-center justify-center shrink-0">
                <t.icon className="w-5 h-5 text-coral-500" />
              </div>
              <div>
                <p className="font-semibold text-ink-900 text-sm leading-tight">{t.label}</p>
                <p className="text-xs text-slate-muted">{t.sub}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─── COUNTRIES GRID ─────────────────────────────────────────────────────── */

function CountriesGrid() {
  const [region, setRegion] = useState('all')
  const filtered = useMemo(() => {
    if (region === 'all') return destinations
    return destinations.filter((d) => d.region === region)
  }, [region])

  return (
    <section id="destinations" className="py-24 bg-sand-50 border-t border-line">
      <div className="container-app">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <AnimatedSection className="max-w-2xl">
            <span className="pill bg-white border border-line text-ink-900">
              <Globe2 className="w-3.5 h-3.5 text-coral-500" />
              10 destinations · live pricing
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink-900 mt-4 leading-[1.05]">
              Pick a country.
              <br />
              See the full picture.
            </h2>
            <p className="text-slate-muted mt-4 text-[1.02rem]">
              Each country page lays out the route, documents, embassy fees and timeline, no hidden steps.
            </p>
          </AnimatedSection>

          <div className="flex flex-wrap gap-2">
            {regions.map((r) => (
              <button
                key={r.value}
                onClick={() => setRegion(r.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  region === r.value
                    ? 'bg-ink-900 border-ink-900 text-white'
                    : 'bg-white border-line text-slate-text hover:border-ink-700'
                }`}
              >
                {r.name}
              </button>
            ))}
          </div>
        </div>

        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          stagger={0.05}
        >
          {filtered.map((d) => (
            <StaggerItem key={d.slug}>
              <CountryCard dest={d} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {filtered.length === 0 && (
          <p className="text-center text-slate-muted py-8">
            We don’t list that region yet, message us, we’ll see what we can do.
          </p>
        )}
      </div>
    </section>
  )
}

function CountryCard({ dest }) {
  const isPremium = dest.visaType === 'Embassy Visa'
  return (
    <div className="tilt-3d">
      <Link
        to={`/visa/${dest.slug}`}
        className="country-card card tilt-3d-inner overflow-hidden no-underline block group"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-sand-100">
          <img
            src={dest.image}
            alt={`${dest.name} visa for Indian travelers`}
            loading="lazy"
            className="country-card-img w-full h-full object-cover"
          />
          {/* subtle bottom-gradient veil for legibility */}
          <span className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink-950/55 to-transparent pointer-events-none" />
          <span className="absolute top-3 left-3 pill bg-white/95 text-ink-900 shadow-sm">
            <Flag code={dest.code} name={dest.name} size={14} />
            {dest.visaType}
          </span>
          <span className="absolute top-3 right-3 pill bg-ink-900/85 text-white backdrop-blur">
            <Clock3 className="w-3 h-3" /> {dest.processingTimeShort}
          </span>
          {isPremium && (
            <span className="premium-badge absolute bottom-3 left-3 z-10">
              <span className="text-[0.85em]">★</span> Premium
            </span>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-display text-xl font-bold text-ink-900 leading-tight">
              {dest.name}
            </h3>
            <ArrowUpRight className="w-5 h-5 text-slate-faint group-hover:text-coral-500 transition-colors" />
          </div>
          <p className="text-sm text-slate-muted mt-1 line-clamp-1">{dest.tagline}</p>

          <div className="mt-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-[0.7rem] uppercase tracking-wider text-slate-faint font-semibold">Travlys fee</p>
              <p className="font-display text-2xl font-extrabold text-ink-900">
                {dest.price}
              </p>
            </div>
            <span className="pill bg-coral-50 text-coral-600 font-semibold">
              View details
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}

/* ─── HOW IT WORKS ──────────────────────────────────────────────────────── */

function HowItWorks() {
  const steps = [
    { num: '01', title: 'Tell us where', desc: 'Pick a destination and share a quick brief, purpose, dates, who’s travelling.', icon: Map },
    { num: '02', title: 'Get the route', desc: 'Within a working day, you get the right visa stream, document list, fees and a realistic timeline.', icon: FileCheck2 },
    { num: '03', title: 'We prep, you sign', desc: 'We draft the application, sponsor letter and cover note. You review, e-sign, pay only after.', icon: Sparkles },
    { num: '04', title: 'Book, file, track', desc: 'We lock the earliest appointment, file the visa, prep you for the interview, and track until decision.', icon: ShieldCheck },
  ]
  return (
    <section id="how-it-works" className="py-24 bg-white border-t border-line">
      <div className="container-app">
        <AnimatedSection className="max-w-2xl mb-12">
          <span className="pill bg-coral-50 text-coral-600">
            <Plane className="w-3.5 h-3.5" /> How it works
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink-900 mt-4 leading-[1.05]">
            Four steps from brief to boarding pass.
          </h2>
          <p className="text-slate-muted mt-4 text-[1.02rem]">
            One brief, one specialist, one chat thread until your visa is in hand.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <AnimatedSection key={s.num} delay={i * 0.08}>
              <div className="card p-7 h-full relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-coral-50 opacity-50" />
                <div className="relative">
                  <p className="font-display text-5xl font-extrabold text-coral-500/30 leading-none">{s.num}</p>
                  <div className="w-11 h-11 rounded-xl bg-ink-900 text-white flex items-center justify-center mt-4">
                    <s.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-ink-900 mt-5">{s.title}</h3>
                  <p className="text-sm text-slate-muted mt-2 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── TRUST + STATS BANNER ─────────────────────────────────────────────── */

function StatsBanner() {
  const stats = [
    { value: 5000, suffix: '+', label: 'Visas processed', icon: FileCheck2 },
    { value: 98, suffix: '%', label: 'Approval rate', icon: ShieldCheck },
    { value: 10, suffix: '+', label: 'Countries handled', icon: Globe2 },
    { value: 24, suffix: 'h', label: 'Avg first response', icon: Clock3 },
  ]
  return (
    <section className="py-20 mesh-deep text-white relative overflow-hidden paper-grain">
      <div className="absolute inset-0 dot-grid-light opacity-40 pointer-events-none" />
      {/* Gold flight-path arc behind the stats */}
      <svg
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-40 pointer-events-none hidden md:block opacity-60"
        viewBox="0 0 1200 160"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="stats-path-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"  stopColor="#d4a64a" stopOpacity="0" />
            <stop offset="50%" stopColor="#ecc878" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#d4a64a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,120 C300,40 600,120 900,40 C1050,5 1150,55 1200,40"
          stroke="url(#stats-path-grad)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />
      </svg>
      <div className="relative z-10 container-app">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <div className="text-center">
                <div className="inline-flex w-12 h-12 rounded-xl bg-white/10 border border-white/15 items-center justify-center mb-3">
                  <s.icon className="w-5 h-5 text-gold-400" />
                </div>
                <p className="font-display text-4xl md:text-5xl font-extrabold gold-text">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </p>
                <p className="text-sm text-white/70 mt-1">{s.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <div className="luxe-divider mt-12" />
      </div>
    </section>
  )
}

/* ─── PRICING TABLE ────────────────────────────────────────────────────── */

function PricingTable() {
  return (
    <section id="pricing" className="py-24 bg-sand-50 border-t border-line">
      <div className="container-app">
        <AnimatedSection className="max-w-2xl mx-auto text-center mb-14">
          <span className="pill bg-coral-50 text-coral-600">
            <TrendingUp className="w-3.5 h-3.5" /> Transparent pricing
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink-900 mt-4 leading-[1.05]">
            One fee. No surprises.
          </h2>
          <p className="text-slate-muted mt-4 text-[1.02rem]">
            Travlys fees below are flat, no per-document charges, no “urgency surcharges”. Embassy / VFS fees are paid directly to the authorities.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-ink-950 text-white">
                  <tr className="text-left">
                    <th className="py-4 px-5 font-semibold text-sm">Country</th>
                    <th className="py-4 px-5 font-semibold text-sm">Visa type</th>
                    <th className="py-4 px-5 font-semibold text-sm">Processing</th>
                    <th className="py-4 px-5 font-semibold text-sm">Travlys fee</th>
                    <th className="py-4 px-5 font-semibold text-sm hidden md:table-cell">Stay</th>
                    <th className="py-4 px-5 font-semibold text-sm"></th>
                  </tr>
                </thead>
                <tbody>
                  {destinations.map((d, i) => (
                    <tr
                      key={d.slug}
                      className={`border-b border-line last:border-0 transition-colors hover:bg-sand-50 ${
                        i % 2 === 1 ? 'bg-sand-50/50' : ''
                      }`}
                    >
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <Flag code={d.code} name={d.name} size={20} />
                          <span className="font-semibold text-ink-900">{d.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <span className="pill bg-sand-100 text-slate-text">{d.visaType}</span>
                      </td>
                      <td className="py-4 px-5 text-sm text-slate-text">{d.processingTime}</td>
                      <td className="py-4 px-5 font-display font-bold text-ink-900">{d.price}</td>
                      <td className="py-4 px-5 text-sm text-slate-muted hidden md:table-cell">
                        {d.stayDuration}
                      </td>
                      <td className="py-4 px-5 text-right">
                        <Link
                          to={`/visa/${d.slug}`}
                          className="btn btn-ghost py-2 px-4 text-xs"
                        >
                          Details <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>

        <p className="text-center text-xs text-slate-muted mt-6">
          Government / embassy fees, biometrics charges and insurance are paid separately. Final quote shared after the brief.
        </p>
      </div>
    </section>
  )
}

/* ─── WHY TRAVLYS ──────────────────────────────────────────────────────── */

function WhyTravlys() {
  const features = [
    { icon: Sparkles, title: 'Profile-tuned drafting', desc: 'Cover letters, SOPs and sponsor letters written for your specific profile, not stock templates.' },
    { icon: Calendar, title: 'Real appointment booking', desc: 'We grab the earliest available VFS / embassy slots so your travel dates don’t get held hostage.' },
    { icon: Users, title: 'Mock interviews', desc: 'Two live practice rounds for US, UK and Schengen interviews. Real questions, hard feedback.' },
    { icon: ShieldCheck, title: 'Refusal-risk pre-check', desc: 'If your file is borderline, we flag it before you spend on embassy fees. No surprises.' },
    { icon: Headphones, title: 'One thread, real humans', desc: 'WhatsApp chat with the same specialist from brief to decision. No ticketing carousel.' },
    { icon: Plane, title: 'Beyond the visa', desc: 'Holiday packages, flights and stays available once the visa lands. One trip, one team.' },
  ]
  return (
    <section className="py-24 bg-white border-t border-line">
      <div className="container-app grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <span className="pill bg-coral-50 text-coral-600">
            <ShieldCheck className="w-3.5 h-3.5" /> Why Travlys
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink-900 mt-4 leading-[1.05]">
            Built like the visa actually matters.
          </h2>
          <p className="text-slate-muted mt-4 text-[1.02rem]">
            Most travelers don’t need a 200-question form, they need someone who has done the route 500 times and can spot the trap before it sets. That’s the job.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href="https://wa.me/918200918967" className="btn btn-coral">
              <MessageCircle className="w-4 h-4" /> Chat with a specialist
            </a>
            <Link to="/visa/usa-visa" className="btn btn-ghost">
              See a sample country plan <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <AnimatedSection key={i} delay={i * 0.06}>
              <div className="card p-6 h-full">
                <div className="w-11 h-11 rounded-xl bg-ink-900 text-white flex items-center justify-center">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-ink-900 mt-4">{f.title}</h3>
                <p className="text-sm text-slate-muted mt-2 leading-relaxed">{f.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── COUNTRY MARQUEE ─────────────────────────────────────────────────── */

function MarqueeBar() {
  return (
    <section className="py-8 bg-ink-900 text-white overflow-hidden border-y border-white/10">
      <div className="ticker-mask">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...globalCountries, ...globalCountries].map((c, i) => (
            <span key={i} className="inline-flex items-center gap-3 mx-7 font-display text-2xl md:text-3xl font-bold text-white/30">
              <span className="w-1.5 h-1.5 rounded-full bg-coral-500" />
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── LOCAL REACH, captures "visa consultants in [city]" queries ────── */

function LocalReachBand() {
  const cities = [
    'Ahmedabad', 'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad',
    'Pune', 'Surat', 'Chennai', 'Kolkata', 'Vadodara', 'Rajkot', 'Jaipur',
  ]
  return (
    <section className="py-20 bg-white border-t border-line">
      <div className="container-app grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5">
          <span className="pill bg-coral-50 text-coral-600">
            <MapPin className="w-3.5 h-3.5" /> India-wide
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink-900 mt-4 leading-[1.05]">
            Visa help in Ahmedabad. Visa help across India.
          </h2>
          <p className="text-slate-muted mt-4 text-[1.02rem] leading-relaxed">
            Travlys is headquartered in Ahmedabad, Gujarat, and we serve clients
            from every Indian state remotely. Document collection, application
            drafting and tracking happen over WhatsApp and email; biometrics and
            embassy appointments are booked at your nearest VFS / embassy.
          </p>
          <div className="mt-5 flex items-center gap-3 text-sm text-slate-text">
            <MapPin className="w-4 h-4 text-coral-500 shrink-0" />
            <span>605, Shivalik Shilp II, Near ITC Narmada, Vastrapur, Ahmedabad 380015</span>
          </div>
        </div>
        <div className="lg:col-span-7">
          <p className="text-[0.7rem] uppercase tracking-wider text-slate-faint font-semibold mb-3">
            Recently served from
          </p>
          <div className="flex flex-wrap gap-2">
            {cities.map((c) => (
              <span key={c} className="chip">
                <MapPin className="w-3 h-3 text-coral-500" /> {c}
              </span>
            ))}
          </div>
          <p className="text-sm text-slate-muted mt-5 leading-relaxed">
            Walk-ins to the Ahmedabad office are by appointment. For everything
            else: WhatsApp <a href="https://wa.me/918200918967" className="text-coral-500 font-medium">+91 82009 18967</a> or
            email <a href="mailto:info@travlys.com" className="text-coral-500 font-medium">info@travlys.com</a>.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ─── CTA + REVIEWS + FAQ ─────────────────────────────────────────────── */

function CtaBanner() {
  return (
    <section className="py-20 bg-sand-50 border-t border-line">
      <div className="container-app">
        <AnimatedSection>
          <div className="card mesh-warm p-10 md:p-14 text-center md:text-left md:flex md:items-center md:justify-between gap-10 border-2 border-ink-900/5">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-ink-900 leading-tight">
                Ready to start your visa?
              </h2>
              <p className="text-slate-muted mt-3 max-w-xl">
                Brief us in a minute. We come back within a working day with a route, timeline and quote, free, no obligation.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6 md:mt-0 shrink-0">
              <a href="https://wa.me/918200918967?text=Hi%20Travlys%2C%20I%20want%20visa%20help." className="btn btn-coral">
                <MessageCircle className="w-4 h-4" /> WhatsApp now
              </a>
              <button
                onClick={() => document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn btn-primary"
              >
                Start application <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

function FaqSection() {
  return (
    <section id="faq" className="py-24 bg-white border-t border-line">
      <div className="container-app grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <span className="pill bg-coral-50 text-coral-600">
            <Search className="w-3.5 h-3.5" /> FAQ
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink-900 mt-4 leading-[1.05]">
            Questions, answered.
          </h2>
          <p className="text-slate-muted mt-4">
            Still stuck? <a href="https://wa.me/918200918967" className="text-coral-500 font-medium">WhatsApp us</a>, most queries answered in under 15 minutes during working hours.
          </p>
        </div>

        <div className="lg:col-span-8 space-y-3">
          {HOME_FAQS.map((f, i) => (
            <AnimatedSection key={i} delay={i * 0.04}>
              <details className="faq card p-6 group">
                <summary className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-lg font-bold text-ink-900 m-0 leading-snug">
                    {f.q}
                  </h3>
                  <span className="faq-chev w-8 h-8 rounded-full bg-sand-100 flex items-center justify-center shrink-0">
                    <Plus className="w-4 h-4 text-ink-900" />
                  </span>
                </summary>
                <p className="text-slate-muted mt-4 text-[0.97rem] leading-relaxed">{f.a}</p>
              </details>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function InquirySection() {
  return (
    <section id="inquiry" className="py-24 mesh-warm border-t border-line">
      <div className="container-app">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <span className="pill bg-white border border-line text-ink-900">
              <Sparkles className="w-3.5 h-3.5 text-coral-500" /> Free consultation
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink-900 mt-4 leading-[1.05]">
              Tell us about your trip.
            </h2>
            <p className="text-slate-muted mt-4 text-[1.02rem]">
              60 seconds to fill, one working day to get a route, document list, timeline and final quote.
            </p>

            <ul className="mt-7 space-y-3">
              {[
                'A real visa specialist reads your brief, not a bot.',
                'Realistic timelines, no “overnight” promises.',
                'You pay after we send a quote you’re happy with.',
              ].map((line) => (
                <li key={line} className="flex items-start gap-3 text-slate-text text-sm">
                  <CheckCircle2 className="w-5 h-5 text-mint-500 shrink-0 mt-0.5" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <div className="hidden lg:flex items-center gap-4 mt-8 text-sm">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-white bg-gradient-to-br from-coral-400 to-ink-900 flex items-center justify-center text-white font-semibold text-xs"
                  >
                    {['A', 'R', 'S'][i - 1]}
                  </span>
                ))}
              </div>
              <p className="text-slate-text font-medium">3 specialists online now</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <InquiryForm />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── PAGE ────────────────────────────────────────────────────────────── */

export default function HomePage() {
  const homeMeta = getHomeMeta()
  const homeSchemas = buildHomeSchemas(destinations, reviews, FEATURED_TESTIMONIALS)

  return (
    <>
      <SEO {...homeMeta} jsonLd={homeSchemas} />

      <Hero />
      <CountriesGrid />
      <HowItWorks />
      <StatsBanner />
      <PricingTable />
      <WhyTravlys />
      <MarqueeBar />
      <FeaturedTestimonials />
      <LocalReachBand />
      <Reviews />
      <CtaBanner />
      <FaqSection />
      <InquirySection />
    </>
  )
}
