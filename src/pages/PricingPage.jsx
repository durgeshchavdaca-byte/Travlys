import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, TrendingUp, ShieldCheck, Plus, Sparkles } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { HeroBlobs, TextReveal } from '../components/MotionGraphics'
import { destinations } from '../data/destinations'
import Flag from '../components/Flag'
import SEO from '../components/SEO'
import {
  SITE_URL,
  DEFAULT_OG_IMAGE,
  buildWebPageSchema,
  buildAggregateOfferSchema,
} from '../seo/config'

const meta = {
  title: 'Travlys visa pricing: every country, every fee (2026)',
  description:
    'Transparent flat fees for every Travlys visa service. US, UK, Canada, Schengen, Singapore, UAE, Thailand and more from ₹999. Embassy / VFS fees paid separately.',
  path: '/pricing',
  keywords:
    'travlys pricing, visa cost from india, visa consultant fees india, us visa cost, schengen visa cost, dubai visa cost',
  type: 'website',
  image: DEFAULT_OG_IMAGE,
  imageAlt: 'Travlys pricing — every visa, every fee',
}

const PRICING_FAQS = [
  {
    q: 'Are embassy / VFS fees included?',
    a: 'No. The price shown for each country is the Travlys service fee — what you pay us for our work. Embassy / VFS / VAC fees are paid separately to the respective authority. We never mark them up.',
  },
  {
    q: 'Is there a refund if the visa is refused?',
    a: 'Our service fee is non-refundable once the application is filed — we have already done the work. The embassy / government fee you paid is non-refundable regardless of who files. We do refund our service fee if we discontinue the application at our discretion (rare).',
  },
  {
    q: 'Are there urgency or rush fees?',
    a: 'No. The price you see is the only price. We do not have urgency surcharges, premium-route fees, or "express" tiers. If the timeline is tight we work harder, not more expensively.',
  },
  {
    q: 'Do prices vary by city?',
    a: 'No. The Travlys service fee is the same whether you are applying from Mumbai, Delhi, Bengaluru or anywhere else in India. No location surcharge.',
  },
  {
    q: 'What about for groups or families?',
    a: 'Pricing is per applicant. For families filing together (3+ applicants on the same trip), we discount the second and subsequent applications. WhatsApp us with the size of your group.',
  },
]

function pricingSchemas() {
  return [
    buildWebPageSchema(meta),
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Pricing', item: `${SITE_URL}/pricing` },
      ],
    },
    buildAggregateOfferSchema(destinations),
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: PRICING_FAQS.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ]
}

export default function PricingPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      <SEO {...meta} jsonLd={pricingSchemas()} />

      {/* HERO */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden mesh-warm">
        <HeroBlobs />
        <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />

        <div className="relative z-10 container-app">
          <div className="max-w-3xl">
            <span className="pill bg-white border border-line text-ink-900">
              <TrendingUp className="w-3.5 h-3.5 text-coral-500" /> Transparent pricing
            </span>
            <h1 className="font-display text-[2.6rem] sm:text-5xl md:text-[3.6rem] font-extrabold text-ink-900 mt-5 leading-[1.05]">
              <TextReveal text="One fee," as="span" />
              <br />
              <span className="hero-italic-mark">
                <span className="relative italic text-ink-900">no surprises.</span>
              </span>
            </h1>
            <p className="text-slate-muted mt-5 text-[1.05rem] max-w-2xl leading-relaxed">
              Travlys service fees are flat and posted publicly. No
              per-document charges, no urgency surcharges, no location
              premiums. Embassy / VFS fees are quoted separately at face value.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing table */}
      <section className="py-20 bg-sand-50 border-t border-line">
        <div className="container-app">
          <AnimatedSection>
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-ink-950 text-white">
                    <tr>
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
          <p className="text-center text-xs text-slate-muted mt-5">
            Government / embassy fees, biometrics charges and insurance are paid separately.
            Final quote shared after a brief.
          </p>
        </div>
      </section>

      {/* What's included */}
      <section className="py-20 bg-white border-t border-line">
        <div className="container-app grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <span className="pill bg-coral-50 text-coral-600">
              <ShieldCheck className="w-3.5 h-3.5" /> What is included
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink-900 mt-4 leading-[1.05]">
              What the Travlys fee covers.
            </h2>
            <p className="text-slate-muted mt-4 text-[1.02rem]">
              Same scope across every country we file. The fee is the only
              cost on our side, regardless of category, applicant profile,
              or city.
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Profile-tuned drafting', body: 'Cover letters, sponsor letters and SOPs written for your specific profile, not stock templates.' },
              { title: 'Appointment booking', body: 'Earliest available VFS / VAC / embassy slots locked at the earliest dates that work for your travel plan.' },
              { title: 'Mock interview', body: 'Two live practice rounds for embassy-interview routes (US, UK, Schengen). Real questions, hard feedback.' },
              { title: 'Document set + checklist', body: 'Tailored checklist with templates for cover letter, itinerary, financials. We pre-check before VFS submission.' },
              { title: 'WhatsApp support', body: 'A single named consultant on your file from brief to decision. No ticket queue, no handoffs.' },
              { title: 'Refusal-risk pre-check', body: 'If your file is borderline, we flag it before you pay the embassy fee. Honest assessment.' },
            ].map((f) => (
              <div key={f.title} className="card p-5">
                <p className="font-display text-base font-extrabold text-ink-900 leading-tight">{f.title}</p>
                <p className="text-sm text-slate-muted mt-2 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-sand-50 border-t border-line">
        <div className="container-app grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <span className="pill bg-coral-50 text-coral-600">Pricing FAQs</span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink-900 mt-4 leading-[1.05]">
              Quick answers.
            </h2>
            <p className="text-slate-muted mt-4">
              Still unsure? WhatsApp us at{' '}
              <a href="https://wa.me/918200918967" className="text-coral-500 font-medium">+91 82009 18967</a> — most queries answered within 15 minutes.
            </p>
          </div>
          <div className="lg:col-span-8 space-y-3">
            {PRICING_FAQS.map((f, i) => (
              <AnimatedSection key={i} delay={i * 0.04}>
                <details className="faq card p-6 group">
                  <summary className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-lg font-bold text-ink-900 m-0 leading-snug">{f.q}</h3>
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

      {/* CTA */}
      <section className="py-16 bg-white border-t border-line">
        <div className="container-app text-center max-w-2xl mx-auto">
          <span className="pill bg-coral-50 text-coral-600">
            <Sparkles className="w-3.5 h-3.5" /> Ready when you are
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-ink-900 mt-4 leading-tight">
            Brief us. We come back with your final quote.
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 mt-7 justify-center">
            <a href="https://wa.me/918200918967" className="btn btn-coral">WhatsApp a specialist</a>
            <Link to="/contact" className="btn btn-ghost">Send a brief →</Link>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
