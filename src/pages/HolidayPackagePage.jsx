import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BedDouble, Check, ChevronRight, Lightbulb, MessageCircle, Plus, ShieldCheck, X } from 'lucide-react'
import SEO from '../components/SEO'
import InquiryForm from '../components/InquiryForm'
import { getPackage, getPackageMeta, buildPackageSchemas } from '../seo/pages'
import { FEATURED_PACKAGES, packageWhatsApp } from '../data/holidays'

// One holiday package in full: the answer-first intro, day-by-day plan,
// hotels, inclusions, tips and FAQs, with WhatsApp quote buttons throughout.
export default function HolidayPackagePage() {
  const { slug } = useParams()
  const pkg = getPackage(slug)

  if (!pkg) {
    return (
      <section className="pt-40 pb-24 container-app text-center">
        <h1 className="font-display text-4xl font-extrabold text-ink-900">Package not found</h1>
        <Link to="/holidays/" className="btn btn-primary mt-6">See all holiday packages</Link>
      </section>
    )
  }

  const wa = packageWhatsApp(pkg.place, `I saw the ${pkg.nights}N/${pkg.days}D ${pkg.place} package on your website.`)
  const others = FEATURED_PACKAGES.filter((p) => p.slug !== pkg.slug)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      <SEO {...getPackageMeta(pkg)} jsonLd={buildPackageSchemas(pkg)} />

      {/* HERO */}
      <section className="relative pt-28 pb-14 md:pt-36 md:pb-20 overflow-hidden bg-ink-950 text-white">
        <img src={pkg.image.replace('w=1200&h=800', 'w=1800&h=1000')} alt={`${pkg.place} tour package from India`} className="absolute inset-0 w-full h-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-ink-950/60 to-ink-950/20" />
        <div className="relative z-10 container-app">
          <nav aria-label="Breadcrumb" className="text-sm text-white/70 flex items-center gap-1.5 flex-wrap">
            <Link to="/" className="text-white/70 hover:text-white no-underline">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/holidays/" className="text-white/70 hover:text-white no-underline">Holiday packages</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">{pkg.place}</span>
          </nav>
          <span className="pill bg-white/10 border border-white/20 text-white mt-6">
            {pkg.nights} nights · {pkg.days} days · Price on request
          </span>
          <h1 className="font-display text-[2.4rem] sm:text-5xl md:text-[3.6rem] font-extrabold mt-5 leading-[1.03] max-w-4xl">
            {pkg.place} tour package from India
          </h1>
          <p className="text-white/80 mt-5 text-[1.05rem] max-w-3xl leading-relaxed">{pkg.name}. {pkg.priceNote}, with the visa or ETA handled by the same team.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={wa} className="btn btn-coral no-underline inline-flex items-center gap-2">
              <MessageCircle className="w-4 h-4" /> Get my free quote
            </a>
            <a href="#itinerary" className="btn bg-white/10 text-white border border-white/25 no-underline">See the day-by-day plan</a>
          </div>
        </div>
      </section>

      {/* ANSWER + AT A GLANCE */}
      <section className="py-14 bg-white border-b border-line">
        <div className="container-app grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <h2 className="font-display text-3xl font-extrabold text-ink-900 leading-tight">The {pkg.place} package in short</h2>
            <p className="text-slate-text mt-4 text-[1.05rem] leading-relaxed">{pkg.intro}</p>
          </div>
          <aside className="lg:col-span-5 card p-6 bg-sand-50">
            <p className="text-xs uppercase tracking-widest text-coral-600 font-semibold m-0">At a glance</p>
            <dl className="mt-3 space-y-2.5 m-0">
              {pkg.glance.map(([k, v]) => (
                <div key={k} className="grid grid-cols-3 gap-3 text-sm">
                  <dt className="text-slate-faint font-semibold">{k}</dt>
                  <dd className="col-span-2 m-0 text-ink-900">{v}</dd>
                </div>
              ))}
            </dl>
            <Link to={pkg.visa.href} className="text-sm text-slate-muted hover:text-coral-600 mt-4 inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Visa guide: {pkg.visa.label}
            </Link>
          </aside>
        </div>
      </section>

      {/* ITINERARY */}
      <section id="itinerary" className="py-16 bg-sand-50 scroll-mt-24">
        <div className="container-app max-w-4xl">
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink-900 leading-[1.05]">
            {pkg.place} itinerary, day by day
          </h2>
          <ol className="mt-10 list-none p-0 m-0 relative border-l-2 border-coral-200 ml-4">
            {pkg.itinerary.map((d, i) => (
              <li key={d.title} className="relative pl-8 pb-9 last:pb-0">
                <span className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-coral-500 text-white text-sm font-bold flex items-center justify-center">{i + 1}</span>
                <h3 className="font-display text-xl font-bold text-ink-900 m-0 leading-snug">Day {i + 1}: {d.title}</h3>
                <p className="text-slate-text mt-2 mb-0 leading-relaxed">{d.text}</p>
                {d.overnight && <p className="text-xs text-slate-faint mt-2 mb-0 flex items-center gap-1.5"><BedDouble className="w-3.5 h-3.5" /> Overnight: {d.overnight}</p>}
              </li>
            ))}
          </ol>
          <div className="mt-10 rounded-2xl bg-ink-950 text-white p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className="m-0 font-display text-lg font-bold">Want this plan for your dates? Change any day and we requote.</p>
            <a href={wa} className="btn btn-coral shrink-0 no-underline inline-flex items-center gap-2"><MessageCircle className="w-4 h-4" /> Get my quote</a>
          </div>
        </div>
      </section>

      {/* HOTELS + INCLUDED */}
      <section className="py-16 bg-white border-t border-line">
        <div className="container-app grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display text-3xl font-extrabold text-ink-900">Hotels</h2>
            <div className="mt-5 space-y-3">
              {pkg.hotels.map((h) => (
                <div key={h.tier} className="card p-5">
                  <p className="text-xs uppercase tracking-widest text-coral-600 font-semibold m-0">{h.tier}</p>
                  <p className="text-sm text-slate-text mt-1.5 mb-0">{h.stays}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-faint mt-3">Subject to availability when you book; if a hotel is full we offer one of the same standard.</p>
            {pkg.addons && (
              <>
                <h3 className="font-display text-xl font-bold text-ink-900 mt-8">Popular add-ons</h3>
                <ul className="list-disc pl-5 mt-3 space-y-1.5 text-sm text-slate-text marker:text-coral-500">
                  {pkg.addons.map((a) => <li key={a}>{a}</li>)}
                </ul>
              </>
            )}
          </div>
          <div>
            <h2 className="font-display text-3xl font-extrabold text-ink-900">What is included</h2>
            <ul className="list-none p-0 mt-5 space-y-2 text-sm text-slate-text">
              {pkg.included.map((t) => <li key={t} className="flex gap-2"><Check className="w-4 h-4 text-mint-500 shrink-0 mt-0.5" /> {t}</li>)}
            </ul>
            <h3 className="font-display text-xl font-bold text-ink-900 mt-8">Not included</h3>
            <ul className="list-none p-0 mt-3 space-y-2 text-sm text-slate-muted">
              {pkg.excluded.map((t) => <li key={t} className="flex gap-2"><X className="w-4 h-4 text-slate-faint shrink-0 mt-0.5" /> {t}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* TIPS */}
      <section className="py-14 bg-sand-50 border-t border-line">
        <div className="container-app max-w-4xl">
          <h2 className="font-display text-3xl font-extrabold text-ink-900 flex items-center gap-2"><Lightbulb className="w-7 h-7 text-coral-500" /> Good to know before you go</h2>
          <ul className="list-disc pl-6 mt-5 space-y-2 text-slate-text marker:text-coral-500">
            {pkg.tips.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 bg-white border-t border-line">
        <div className="container-app grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-ink-900 leading-[1.05]">{pkg.place} trip questions, answered.</h2>
          </div>
          <div className="lg:col-span-8 space-y-3">
            {pkg.faqs.map((f) => (
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
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink-900 leading-[1.05]">Get your {pkg.place} quote.</h2>
            <p className="text-slate-muted mt-4">Tell us your month, travellers and departure city. A Travlys travel specialist sends the full itinerary and price, usually the same working day. Faster on WhatsApp: +91 82009 18967.</p>
            <a href={wa} className="btn btn-coral mt-6 no-underline inline-flex items-center gap-2"><MessageCircle className="w-4 h-4" /> WhatsApp for a quote</a>
            {others.length > 0 && (
              <p className="text-sm text-slate-muted mt-6">
                Also planned by Travlys:{' '}
                {others.map((o) => (
                  <Link key={o.slug} to={`/holidays/${o.slug}/`} className="text-ink-900 hover:text-coral-600">{o.place} tour package</Link>
                ))}
                {' · '}<Link to="/holidays/" className="text-ink-900 hover:text-coral-600">all holiday packages</Link>
              </p>
            )}
          </div>
          <div className="lg:col-span-7">
            <InquiryForm defaultDestination={`${pkg.place} holiday package`} />
          </div>
        </div>
      </section>
    </motion.div>
  )
}
