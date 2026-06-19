import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Phone,
  MessageCircle,
  MapPin,
  Plane,
  Building2,
  ShieldCheck,
  Clock3,
  Sparkles,
} from 'lucide-react'
import AnimatedSection, { StaggerContainer, StaggerItem } from '../components/AnimatedSection'
import { HeroBlobs, TextReveal } from '../components/MotionGraphics'
import { destinations } from '../data/destinations'
import { CITIES, getCity } from '../data/cities'
import SEO from '../components/SEO'
import InquiryForm from '../components/InquiryForm'
import Flag from '../components/Flag'
import { buildCityHubSchemas, getCityHubMeta } from '../seo/config'

const BUILD_DATE = new Date().toISOString().slice(0, 10)
function prettyDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default function CityHubPage() {
  const { city: citySlug } = useParams()
  const city = getCity(citySlug)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!city) {
    return (
      <>
        <SEO
          title="City not in our service area yet"
          description="That city is not on Travlys yet. Browse our city visa hubs across India."
          path={`/from/${citySlug || ''}`}
          noindex
        />
        <div className="min-h-[60vh] flex items-center justify-center bg-sand-50">
          <div className="text-center container-app">
            <h1 className="font-display text-4xl font-extrabold text-ink-900 mb-4">City not found</h1>
            <p className="text-slate-muted mb-6">We do not have a dedicated hub for that city yet, but we still file visas from there.</p>
            <Link to="/" className="btn btn-primary">Back to home</Link>
          </div>
        </div>
      </>
    )
  }

  const meta = getCityHubMeta(city, destinations)
  const schemas = buildCityHubSchemas(city, destinations)
  const otherCities = CITIES.filter((c) => c.slug !== city.slug).slice(0, 11)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      <SEO {...meta} jsonLd={schemas} />

      {/* HERO */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden mesh-warm">
        <HeroBlobs />
        <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />

        <div className="relative z-10 container-app">
          <nav className="flex items-center gap-2 text-xs text-slate-muted mb-6 flex-wrap">
            <Link to="/" className="hover:text-coral-500 no-underline">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-ink-900">Visa from {city.name}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="pill bg-white border border-line text-ink-900">
                <MapPin className="w-3.5 h-3.5 text-coral-500" />
                {city.name}, {city.state}
              </span>
              <span className="pill bg-coral-50 text-coral-600">
                <Sparkles className="w-3.5 h-3.5" /> 10 destinations
              </span>
              <span className="pill bg-white/60 border border-line text-slate-muted text-[0.7rem]">
                Updated {prettyDate(BUILD_DATE)}
              </span>
            </div>
            <h1 className="font-display text-[2.5rem] sm:text-5xl md:text-[3.6rem] font-extrabold text-ink-900 mt-5 leading-[1.05]">
              <TextReveal text={`Visa consultants in`} as="span" />
              <br />
              <span className="hero-italic-mark">
                <span className="relative italic text-ink-900">{city.name}.</span>
              </span>
            </h1>
            <p className="text-slate-muted mt-5 text-[1.05rem] max-w-2xl leading-relaxed">
              Travlys files US, UK, Canada, Schengen and 6 more visas for{' '}
              <strong className="font-semibold text-ink-900">{city.name}</strong> ({city.state}) applicants.
              VFS biometrics at <strong className="font-semibold text-ink-900">{city.vfsCenter}</strong>;
              jurisdiction handled by <strong className="font-semibold text-ink-900">{city.nearestConsulate}</strong>.
              {city.isHQ ? ' Travlys is headquartered in this city, walk in to our office or message us on WhatsApp.' : ''}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="https://wa.me/918200918967" className="btn btn-coral">
                <MessageCircle className="w-4 h-4" /> WhatsApp from {city.name}
              </a>
              <a href="#destinations" className="btn btn-primary">
                Pick a destination <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick city facts row */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl">
            <CityFact icon={Building2} label="VFS centre" value={city.vfsCenter} />
            <CityFact icon={ShieldCheck} label="Jurisdiction" value={city.nearestConsulate} />
            <CityFact icon={Plane} label="Travel hub" value={city.travelHub.replace(/\s*\(.*\)$/, '')} />
            <CityFact icon={MapPin} label="Region" value={`${city.state} · ${city.region}`} />
          </div>
        </div>
      </section>

      {/* Destinations grid */}
      <section id="destinations" className="py-20 bg-white border-t border-line">
        <div className="container-app">
          <AnimatedSection className="max-w-2xl mb-10">
            <span className="pill bg-coral-50 text-coral-600">
              <Sparkles className="w-3.5 h-3.5" /> From {city.name}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink-900 mt-4 leading-[1.05]">
              10 visa destinations for {city.name} travelers.
            </h2>
            <p className="text-slate-muted mt-4">
              Tap any country to see {city.name}-specific pricing, the document checklist,
              process and FAQ.
            </p>
          </AnimatedSection>

          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            stagger={0.04}
          >
            {destinations.map((d) => (
              <StaggerItem key={d.slug}>
                <Link
                  to={`/visa/${d.slug}/from/${city.slug}`}
                  className="card p-5 no-underline block h-full group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Flag code={d.code} name={d.name} size={28} />
                      <div>
                        <p className="font-display text-lg font-extrabold text-ink-900 leading-tight">
                          {d.name}
                        </p>
                        <p className="text-xs text-slate-muted mt-0.5">{d.visaType}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-faint group-hover:text-coral-500 transition-colors shrink-0 mt-1" />
                  </div>

                  <p className="text-sm text-slate-text mt-3 leading-snug">
                    {d.name} visa from {city.name}
                  </p>

                  <div className="mt-4 flex items-end justify-between gap-2">
                    <div>
                      <p className="text-[0.65rem] uppercase tracking-wider text-slate-faint font-semibold">From</p>
                      <p className="font-display text-xl font-extrabold text-ink-900 leading-none">{d.price}</p>
                    </div>
                    <span className="pill bg-sand-100 text-slate-text text-[0.7rem]">
                      <Clock3 className="w-3 h-3" /> {d.processingTimeShort}
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Why {city} applicants pick Travlys */}
      <section className="py-20 bg-sand-50 border-t border-line">
        <div className="container-app grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <span className="pill bg-coral-50 text-coral-600">
              <ShieldCheck className="w-3.5 h-3.5" /> Built for {city.name}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink-900 mt-4 leading-[1.05]">
              Why {city.name} chooses Travlys.
            </h2>
            <p className="text-slate-muted mt-4 text-[1.02rem]">
              {city.visaProfile}. We have filed dozens of routes from {city.name}, the
              {' '}{city.state}-specific quirks are built into our checklist so nothing
              gets missed at the VFS counter or interview.
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <WhyCard
              title={`Local VFS guidance`}
              body={`We know the queues, timings and document gotchas at the ${city.vfsCenter} VFS. Slot booking + walk-in support included.`}
            />
            <WhyCard
              title={`Right jurisdiction, first time`}
              body={`${city.name} applications go to ${city.nearestConsulate}. We file at the correct centre, not the convenient one, so your file is not rejected on jurisdiction.`}
            />
            <WhyCard
              title={`Remote-first`}
              body={`Brief, document collection, drafting and interview prep all happen over WhatsApp + email. You never come into our office unless you want to.`}
            />
            <WhyCard
              title={`One named specialist`}
              body={`A single consultant owns your file from brief to decision, no ticket queue, no handoffs, no chasing.`}
            />
          </div>
        </div>
      </section>

      {/* Inquiry */}
      <section id="apply" className="py-20 mesh-warm border-t border-line">
        <div className="container-app">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <span className="pill bg-white border border-line text-ink-900">
                <Sparkles className="w-3.5 h-3.5 text-coral-500" /> Apply now
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink-900 mt-4 leading-[1.05]">
                Start your visa from {city.name}.
              </h2>
              <p className="text-slate-muted mt-4">
                Tell us where you are going. A Travlys consultant from your {city.region} desk
                comes back within a working day with a route, document checklist, timeline
                and quote tailored to {city.name} ({city.state}).
              </p>
            </div>
            <div className="lg:col-span-7">
              <InquiryForm defaultDestination={`Visa from ${city.name}`} />
            </div>
          </div>
        </div>
      </section>

      {/* Other cities */}
      <section className="py-16 bg-white border-t border-line">
        <div className="container-app">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <span className="pill bg-coral-50 text-coral-600">More cities</span>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-ink-900 mt-3 leading-tight">
                Travlys city hubs across India.
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                to={`/from/${c.slug}`}
                className="card p-4 no-underline group"
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="font-display font-bold text-ink-900 leading-tight">
                      Visa from {c.name}
                    </p>
                    <p className="text-xs text-slate-muted mt-0.5">{c.state}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-faint group-hover:text-coral-500 transition-colors shrink-0" />
                </div>
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
            Speak to a Travlys specialist from {city.name}.
          </h2>
          <p className="text-white/70 mt-3 max-w-xl mx-auto">
            Same WhatsApp number, same fee, same named consultant — wherever in {city.state} you are.
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

function CityFact({ icon: Icon, label, value }) {
  return (
    <div className="card p-4 flex items-start gap-3">
      <div className="w-9 h-9 rounded-xl bg-coral-50 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-coral-500" />
      </div>
      <div className="min-w-0">
        <p className="text-[0.65rem] uppercase tracking-wider text-slate-faint font-semibold">{label}</p>
        <p className="text-sm font-semibold text-ink-900 leading-tight mt-0.5 break-words">{value}</p>
      </div>
    </div>
  )
}

function WhyCard({ title, body }) {
  return (
    <div className="card p-5">
      <p className="font-display text-base font-extrabold text-ink-900 leading-tight">{title}</p>
      <p className="text-sm text-slate-muted mt-2 leading-relaxed">{body}</p>
    </div>
  )
}
