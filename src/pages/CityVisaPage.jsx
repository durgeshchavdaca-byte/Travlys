import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Phone,
  MessageCircle,
  Clock3,
  CheckCircle2,
  CalendarRange,
  Repeat2,
  MapPin,
  Sparkles,
  Plane,
  Building2,
  ShieldCheck,
} from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { HeroBlobs, TextReveal } from '../components/MotionGraphics'
import { destinations, getCostBreakdown } from '../data/destinations'
import { CITIES, getCity } from '../data/cities'
import SEO from '../components/SEO'
import InquiryForm from '../components/InquiryForm'
import Flag from '../components/Flag'
import { buildCityVisaSchemas, getCityVisaMeta } from '../seo/config'

const BUILD_DATE = new Date().toISOString().slice(0, 10)
function prettyDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

function SnapshotItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-xl bg-sand-100 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-ink-900" />
      </div>
      <div className="min-w-0">
        <p className="text-[0.7rem] uppercase tracking-wider text-slate-faint font-semibold">{label}</p>
        <p className="font-semibold text-ink-900 text-[0.95rem] mt-0.5 leading-tight break-words">{value}</p>
      </div>
    </div>
  )
}

function inr(n) {
  return '₹' + n.toLocaleString('en-IN')
}

export default function CityVisaPage() {
  const { slug, city: citySlug } = useParams()
  const dest = destinations.find((d) => d.slug === slug)
  const city = getCity(citySlug)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!dest || !city) {
    return (
      <>
        <SEO
          title="City visa page not found"
          description="That city or destination is not in our service area. Browse our supported countries."
          path={`/visa/${slug || ''}/from/${citySlug || ''}`}
          noindex
        />
        <div className="min-h-[60vh] flex items-center justify-center bg-sand-50">
          <div className="text-center container-app">
            <h1 className="font-display text-4xl font-extrabold text-ink-900 mb-4">Not found</h1>
            <p className="text-slate-muted mb-6">We do not have a page for that combination yet.</p>
            <Link to="/" className="btn btn-primary">Back to home</Link>
          </div>
        </div>
      </>
    )
  }

  const cost = getCostBreakdown(dest)
  const meta = getCityVisaMeta(dest, city)
  const schemas = buildCityVisaSchemas(dest, city)
  const otherCities = CITIES.filter((c) => c.slug !== city.slug).slice(0, 11)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      <SEO {...meta} jsonLd={schemas} />

      {/* HERO */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ transform: `translateY(${Math.max(0, scrollY - 80) * 0.15}px)` }}
        >
          <img
            src={dest.heroImage || dest.image}
            alt={`${dest.name} visa from ${city.name} — Travlys`}
            fetchPriority="high"
            className="w-full h-[120%] object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/85 via-ink-950/72 to-ink-950/45" />
        <HeroBlobs />

        <div className="relative z-10 container-app">
          <nav className="flex items-center gap-2 text-xs text-white/70 mb-6 flex-wrap">
            <Link to="/" className="hover:text-coral-400 no-underline text-white/70">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to={`/visa/${dest.slug}`} className="hover:text-coral-400 no-underline text-white/70">{dest.name} Visa</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">From {city.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className="pill bg-white/10 border border-white/20 text-white backdrop-blur">
                  <Flag code={dest.code} name={dest.name} size={16} />
                  {dest.visaType}
                </span>
                <span className="pill bg-white/10 border border-white/20 text-white backdrop-blur">
                  <MapPin className="w-3.5 h-3.5" />
                  {city.name}, {city.state}
                </span>
                <span className="pill bg-white/5 border border-white/15 text-white/75 backdrop-blur text-[0.7rem]">
                  Updated {prettyDate(BUILD_DATE)}
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mt-5 leading-[1.02]">
                <TextReveal text={`${dest.name} visa`} as="span" />
                <br />
                <span className="text-coral-400">from {city.name}.</span>
              </h1>
              <p className="text-white/80 mt-5 text-[1.05rem] max-w-2xl leading-relaxed">
                Travlys files {dest.name} visas for {city.name} ({city.state}) applicants end-to-end.
                VFS at <strong className="font-semibold">{city.vfsCenter}</strong>, jurisdiction handled by{' '}
                <strong className="font-semibold">{city.nearestConsulate}</strong>.
                {city.isHQ ? ' Walk in to our Ahmedabad office or message us on WhatsApp.' : ' Everything is handled remotely over WhatsApp + email; the only in-person step is biometrics and the interview at the consulate (if your category needs one).'}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="https://wa.me/918200918967" className="btn btn-coral">
                  <MessageCircle className="w-4 h-4" /> WhatsApp a specialist
                </a>
                <a href="#apply" className="btn btn-on-dark">
                  Start application <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Snapshot */}
            <div className="lg:col-span-5">
              <div className="card p-6 md:p-7 bg-white relative overflow-hidden">
                <span
                  aria-hidden
                  className="absolute top-0 inset-x-0 h-[3px]"
                  style={{ background: 'linear-gradient(90deg, transparent, #d4a64a 30%, #ecc878 50%, #d4a64a 70%, transparent)' }}
                />
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[0.7rem] uppercase tracking-wider text-slate-faint font-semibold">Travlys fee</p>
                  <span className="pill bg-mint-100 text-mint-500 font-semibold">{city.name} · book now</span>
                </div>
                <p className="font-display text-4xl md:text-5xl font-extrabold text-ink-900 mt-1">
                  {dest.price}
                </p>
                <p className="text-xs text-slate-muted mt-1">Embassy / VFS fees paid separately to authorities.</p>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <SnapshotItem icon={Clock3} label="Processing" value={dest.processingTime} />
                  <SnapshotItem icon={CalendarRange} label="Validity" value={dest.validity} />
                  <SnapshotItem icon={MapPin} label="VFS Centre" value={city.vfsCenter} />
                  <SnapshotItem icon={Repeat2} label="Stay" value={dest.stayDuration} />
                </div>

                <a href="#apply" className="btn btn-primary w-full mt-6">
                  Begin {dest.name} visa from {city.name} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* City-specific applicant brief */}
      <section className="py-20 bg-white">
        <div className="container-app grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <AnimatedSection>
              <span className="pill bg-coral-50 text-coral-600">
                <Sparkles className="w-3.5 h-3.5" /> {city.name} applicants
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink-900 mt-4 leading-[1.05]">
                How {dest.name} visas work for {city.name} residents.
              </h2>
              <p className="text-slate-muted mt-5 text-[1.02rem] leading-relaxed">
                {city.name} is {city.knownFor.toLowerCase()}. {city.visaProfile}. Travlys
                processes {dest.name} visa applications from {city.name} ({city.state}) the
                same way we do from anywhere else, your file is built by a single named
                specialist who stays with you from brief to decision. The {city.name}-specific
                wrinkles are:
              </p>

              <ul className="mt-6 space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-xl bg-coral-50 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4 text-coral-500" />
                  </span>
                  <div>
                    <p className="font-semibold text-ink-900">VFS / VAC centre</p>
                    <p className="text-sm text-slate-muted mt-1 leading-relaxed">
                      Biometrics and document submission happen at {city.vfsCenter}. We book
                      the earliest available appointment slot inside {city.name}'s allocated
                      window so you do not lose travel dates to a queue.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-xl bg-coral-50 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-coral-500" />
                  </span>
                  <div>
                    <p className="font-semibold text-ink-900">Jurisdiction</p>
                    <p className="text-sm text-slate-muted mt-1 leading-relaxed">
                      Applicants from {city.name} (and the wider {city.state} region) fall
                      under the {city.nearestConsulate}. If your visa category needs an
                      in-person interview, that's the centre you travel to. We tell you well
                      in advance so flights and stay can be planned, and we coordinate
                      the appointment date with your work schedule.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-xl bg-coral-50 flex items-center justify-center shrink-0">
                    <Plane className="w-4 h-4 text-coral-500" />
                  </span>
                  <div>
                    <p className="font-semibold text-ink-900">Travel hub</p>
                    <p className="text-sm text-slate-muted mt-1 leading-relaxed">
                      Your departure airport is most likely {city.travelHub}. We help with
                      flight + insurance bundling for Schengen and embassy-stamp routes
                      where insurance is mandatory.
                    </p>
                  </div>
                </li>
              </ul>
            </AnimatedSection>
          </div>

          {dest.includes?.length > 0 && (
            <div className="lg:col-span-5">
              <AnimatedSection delay={0.1}>
                <div className="card p-7">
                  <p className="text-[0.7rem] uppercase tracking-wider text-coral-600 font-semibold">
                    What is included for {city.name} applicants
                  </p>
                  <h3 className="font-display text-2xl font-bold text-ink-900 mt-1">Travlys handles</h3>
                  <ul className="mt-5 space-y-3">
                    {dest.includes.map((line) => (
                      <li key={line} className="flex items-start gap-3 text-[0.95rem]">
                        <CheckCircle2 className="w-5 h-5 text-mint-500 shrink-0 mt-0.5" />
                        <span className="text-slate-text">{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            </div>
          )}
        </div>
      </section>

      {/* Cost breakdown */}
      {cost && (
        <section className="py-20 bg-sand-50 border-t border-line">
          <div className="container-app grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <span className="pill bg-coral-50 text-coral-600">
                <Sparkles className="w-3.5 h-3.5" /> Cost from {city.name}
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink-900 mt-4 leading-[1.05]">
                How much does a {dest.name} visa cost from {city.name}?
              </h2>
              <p className="text-slate-muted mt-4 text-[1.02rem] leading-relaxed">
                Same flat Travlys fee for {city.name} as anywhere else in India. No location
                surcharge. Embassy / VFS fees are paid directly to the authority and don't
                change by city.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="card overflow-hidden">
                <table className="w-full text-left">
                  <tbody>
                    <tr className="border-b border-line">
                      <td className="py-4 px-5">
                        <p className="font-semibold text-ink-900">Travlys service fee</p>
                        <p className="text-xs text-slate-muted mt-0.5">Flat, covers everything in the "Travlys handles" list above.</p>
                      </td>
                      <td className="py-4 px-5 text-right font-display font-bold text-ink-900 text-lg">
                        {cost.serviceLabel}
                      </td>
                    </tr>
                    <tr className="border-b border-line">
                      <td className="py-4 px-5">
                        <p className="font-semibold text-ink-900">Embassy / VFS fee</p>
                        <p className="text-xs text-slate-muted mt-0.5">Paid directly to {cost.govPayee}.</p>
                      </td>
                      <td className="py-4 px-5 text-right">
                        <p className="font-display font-bold text-ink-900 text-lg">{cost.govNative}</p>
                        <p className="text-xs text-slate-muted">≈ {inr(cost.govInr)}</p>
                      </td>
                    </tr>
                    <tr className="bg-ink-950 text-white">
                      <td className="py-5 px-5">
                        <p className="font-semibold">Total estimate from {city.name}</p>
                        <p className="text-xs text-white/65 mt-0.5">Subject to forex + visa subcategory.</p>
                      </td>
                      <td className="py-5 px-5 text-right">
                        <p className="font-display font-extrabold text-2xl text-coral-400">≈ {inr(cost.total)}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Apply */}
      <section id="apply" className="py-20 mesh-warm border-t border-line">
        <div className="container-app">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <span className="pill bg-white border border-line text-ink-900">
                <Sparkles className="w-3.5 h-3.5 text-coral-500" /> Apply now
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink-900 mt-4 leading-[1.05]">
                Start your {dest.name} visa from {city.name}.
              </h2>
              <p className="text-slate-muted mt-4">
                One brief, one specialist, one chat thread until your {dest.name} visa is in
                hand. A Travlys consultant comes back within a working day with a route,
                document checklist, timeline and quote tailored to {city.name} ({city.state}).
              </p>
            </div>
            <div className="lg:col-span-7">
              <InquiryForm defaultDestination={`${dest.name} (from ${city.name})`} />
            </div>
          </div>
        </div>
      </section>

      {/* From other cities cross-link rail */}
      <section className="py-16 bg-white border-t border-line">
        <div className="container-app">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <span className="pill bg-coral-50 text-coral-600">More cities</span>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-ink-900 mt-3 leading-tight">
                {dest.name} visa from other Indian cities.
              </h2>
            </div>
            <Link to={`/visa/${dest.slug}`} className="hidden md:inline-flex btn btn-ghost">
              See base {dest.name} page <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                to={`/visa/${dest.slug}/from/${c.slug}`}
                className="card p-4 no-underline group"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-display font-bold text-ink-900 leading-tight">
                    {dest.name} from {c.name}
                  </p>
                  <ArrowUpRight className="w-4 h-4 text-slate-faint group-hover:text-coral-500 transition-colors shrink-0" />
                </div>
                <p className="text-xs text-slate-muted mt-1">{c.state}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-20 bg-ink-950 text-white relative overflow-hidden">
        <HeroBlobs className="opacity-60" />
        <div className="relative z-10 container-app text-center">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold leading-tight">
            Speak to a {dest.name} visa specialist from {city.name}.
          </h2>
          <p className="text-white/70 mt-3 max-w-xl mx-auto">
            We have filed this route hundreds of times. Save yourself the back-and-forth.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-7 justify-center">
            <a href="https://wa.me/918200918967" className="btn btn-coral">
              <MessageCircle className="w-4 h-4" /> WhatsApp now
            </a>
            <a href="tel:+918200918967" className="btn btn-on-dark">
              <Phone className="w-4 h-4" /> +91 82009 18967
            </a>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
