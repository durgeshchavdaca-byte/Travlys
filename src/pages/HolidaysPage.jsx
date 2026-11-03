import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, BedDouble, Check, MessageCircle, Plane, Plus, ShieldCheck, Sparkles } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { HeroBlobs, TextReveal } from '../components/MotionGraphics'
import SEO from '../components/SEO'
import InquiryForm from '../components/InquiryForm'
import { HOLIDAYS_META, HOLIDAY_FAQS, buildHolidaysSchemas } from '../seo/pages'
import { FEATURED_PACKAGES, MORE_DESTINATIONS, packageWhatsApp } from '../data/holidays'

function FeaturedPackage({ p, flip }) {
  return (
    <AnimatedSection>
      <article id={p.slug} className="card overflow-hidden grid grid-cols-1 lg:grid-cols-12 scroll-mt-28">
        <div className={`relative lg:col-span-5 min-h-[260px] ${flip ? 'lg:order-2' : ''}`}>
          <img src={p.image} alt={`${p.place} holiday package by Travlys`} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          <span className="absolute top-4 left-4 pill bg-white/95 text-ink-900 shadow-sm">
            {p.nights} nights · {p.days} days
          </span>
        </div>
        <div className="lg:col-span-7 p-6 md:p-8">
          <p className="text-[0.7rem] uppercase tracking-[0.18em] font-semibold text-coral-600 m-0">{p.place}</p>
          <h3 className="font-display text-2xl md:text-3xl font-extrabold text-ink-900 mt-1 leading-tight">
            <Link to={`/holidays/${p.slug}/`} className="text-ink-900 hover:text-coral-600 no-underline">{p.name}</Link>
          </h3>
          <p className="mt-3 m-0">
            <span className="font-display text-2xl font-extrabold text-ink-900">Price on request</span>{' '}
            <span className="text-sm text-slate-muted">{p.priceNote}. GST &amp; TCS extra.</span>
          </p>
          <div className="mt-5 grid sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-faint font-semibold mb-2 flex items-center gap-1.5">
                <BedDouble className="w-3.5 h-3.5" /> Where you stay
              </p>
              <ul className="list-none p-0 m-0 space-y-1 text-sm text-slate-text">
                {p.stays.map((s) => <li key={s}>{s}</li>)}
              </ul>
              <p className="text-xs uppercase tracking-wider text-slate-faint font-semibold mt-4 mb-2">Included</p>
              <ul className="list-none p-0 m-0 space-y-1 text-sm text-slate-text">
                {p.includes.map((s) => (
                  <li key={s} className="flex gap-2"><Check className="w-4 h-4 text-mint-500 shrink-0 mt-0.5" /> {s}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-faint font-semibold mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Highlights
              </p>
              <ul className="list-disc pl-5 m-0 space-y-1.5 text-sm text-slate-text marker:text-coral-500">
                {p.highlights.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href={packageWhatsApp(p.place, `I saw the ${p.nights}N/${p.days}D package on your website.`)} className="btn btn-coral no-underline inline-flex items-center gap-2">
              <MessageCircle className="w-4 h-4" /> Get this itinerary
            </a>
            <Link to={`/holidays/${p.slug}/`} className="btn btn-ghost no-underline">Day-by-day plan</Link>
            <Link to={p.visa.href} className="text-sm text-slate-muted hover:text-coral-600 inline-flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Visa: {p.visa.label}
            </Link>
          </div>
        </div>
      </article>
    </AnimatedSection>
  )
}

export default function HolidaysPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      <SEO {...HOLIDAYS_META} jsonLd={buildHolidaysSchemas()} />

      {/* HERO */}
      <section className="relative pt-32 pb-14 md:pt-40 md:pb-16 overflow-hidden mesh-warm">
        <HeroBlobs />
        <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
        <div className="relative z-10 container-app">
          <div className="max-w-3xl">
            <span className="pill bg-white border border-line text-ink-900">
              <Plane className="w-3.5 h-3.5 text-coral-500" /> Holiday packages from India
            </span>
            <h1 className="font-display text-[2.4rem] sm:text-5xl md:text-[3.4rem] font-extrabold text-ink-900 mt-5 leading-[1.05]">
              <TextReveal text="Holidays planned," as="span" />{' '}
              <br />
              <span className="hero-italic-mark">
                <span className="relative italic text-ink-900">visa included.</span>
              </span>
            </h1>
            <p className="text-slate-muted mt-5 text-[1.05rem] max-w-2xl leading-relaxed">
              Tailor-made holiday packages from India by Travlys in Ahmedabad: hotels, private transfers and
              sightseeing in one day-by-day plan, with the visa, e-Visa or arrival card handled by the same team.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={packageWhatsApp('a holiday')} className="btn btn-coral no-underline inline-flex items-center gap-2">
                <MessageCircle className="w-4 h-4" /> Get a free package quote
              </a>
              <a href="#packages" className="btn btn-primary no-underline">See packages</a>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section id="packages" className="py-16 bg-sand-50 border-t border-line">
        <div className="container-app">
          <AnimatedSection className="max-w-2xl mb-10">
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink-900 leading-[1.05]">Itineraries Indians are booking now.</h2>
            <p className="text-slate-muted mt-3">Bali and Sri Lanka from real Travlys trips, plus this winter's most-booked destinations for Indian travellers. Change the nights, hotels or sightseeing and we requote the same day.</p>
          </AnimatedSection>
          <div className="space-y-8">
            {FEATURED_PACKAGES.map((p, i) => <FeaturedPackage key={p.slug} p={p} flip={i % 2 === 1} />)}
          </div>
        </div>
      </section>

      {/* MORE */}
      <section className="py-16 bg-white border-t border-line">
        <div className="container-app">
          <AnimatedSection className="max-w-2xl mb-10">
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink-900 leading-[1.05]">More places, quoted to order.</h2>
            <p className="text-slate-muted mt-3">Tell us your dates and budget and we build the itinerary around them.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MORE_DESTINATIONS.map((d) => (
              <div key={d.place} className="card overflow-hidden flex flex-col">
                <div className="relative aspect-[16/10] bg-sand-100">
                  <img src={d.image} alt={`${d.place} holiday package from India`} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display text-xl font-bold text-ink-900 m-0">{d.place} holiday package</h3>
                  <p className="text-sm text-slate-muted mt-1 mb-0">{d.idea}</p>
                  <Link to={d.visa.href} className="text-xs text-slate-muted hover:text-coral-600 mt-2 inline-flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Visa: {d.visa.label}
                  </Link>
                  <a href={packageWhatsApp(d.place)} className="btn btn-ghost mt-4 self-start no-underline inline-flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" /> Get a quote <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 bg-sand-50 border-t border-line">
        <div className="container-app grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-ink-900 leading-[1.05]">Holiday packages, answered.</h2>
          </div>
          <div className="lg:col-span-8 space-y-3">
            {HOLIDAY_FAQS.map((f) => (
              <details key={f.q} className="faq card p-5 group">
                <summary className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-base font-bold text-ink-900 m-0 leading-snug">{f.q}</h3>
                  <span className="faq-chev w-7 h-7 rounded-full bg-sand-100 flex items-center justify-center shrink-0">
                    <Plus className="w-4 h-4 text-ink-900" />
                  </span>
                </summary>
                <p className="text-slate-muted mt-3 text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ENQUIRY */}
      <section id="apply" className="py-20 mesh-warm border-t border-line">
        <div className="container-app grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink-900 leading-[1.05]">Tell us where you want to go.</h2>
            <p className="text-slate-muted mt-4">A Travlys travel specialist replies within a working day with a day-by-day itinerary and quote. Faster on WhatsApp: +91 82009 18967.</p>
          </div>
          <div className="lg:col-span-7">
            <InquiryForm defaultDestination="Holiday package" />
          </div>
        </div>
      </section>
    </motion.div>
  )
}
