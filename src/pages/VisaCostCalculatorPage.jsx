import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calculator, MessageCircle, Info } from 'lucide-react'
import { HeroBlobs, TextReveal } from '../components/MotionGraphics'
import SEO from '../components/SEO'
import { VISA_FEE_ROWS, LAST_CHECKED } from '../data/visaFees'
import { VISA_COST_META, getVisaCostFaqs, buildVisaCostSchemas } from '../seo/pages'

const inr = (n) => `₹${Math.round(n).toLocaleString('en-IN')}`
const label = 'text-[0.7rem] uppercase tracking-[0.14em] font-semibold text-slate-faint'
const field = 'mt-1 w-full bg-white border border-line rounded-xl px-3 py-2.5 text-ink-900'
const checked = new Date(`${LAST_CHECKED}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

export default function VisaCostCalculatorPage() {
  const [slug, setSlug] = useState('usa-visa')
  const [people, setPeople] = useState(1)
  const [withTravlys, setWithTravlys] = useState(true)
  const row = VISA_FEE_ROWS.find((r) => r.slug === slug) || VISA_FEE_ROWS[0]
  const visaFree = row.governmentFeeInr === 0
  const gov = row.governmentFeeInr * people
  const service = withTravlys ? row.travlysFeeInr * people : 0
  const total = gov + service
  const faqs = getVisaCostFaqs()
  const whatsapp = `Hi Travlys, I used your visa cost calculator: ${row.country}, ${people} applicant${people > 1 ? 's' : ''}. Please confirm the total and next steps.`

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      <SEO {...VISA_COST_META} jsonLd={buildVisaCostSchemas()} />

      <section className="relative pt-32 pb-12 md:pt-40 md:pb-14 overflow-hidden mesh-warm">
        <HeroBlobs />
        <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
        <div className="relative z-10 container-app">
          <div className="max-w-3xl">
            <span className="pill bg-white border border-line text-ink-900">
              <Calculator className="w-3.5 h-3.5 text-coral-500" /> Free tool · fees checked {checked}
            </span>
            <h1 className="font-display text-[2.4rem] sm:text-5xl md:text-[3.4rem] font-extrabold text-ink-900 mt-5 leading-[1.05]">
              <TextReveal text="Visa cost" as="span" />
              <br />
              <span className="hero-italic-mark">
                <span className="relative italic text-ink-900">calculator.</span>
              </span>
            </h1>
            <p className="text-slate-muted mt-5 text-[1.05rem] max-w-2xl leading-relaxed">
              Pick a country and the number of travellers. See the government visa fee in rupees, the Travlys
              service fee and the total for your family or group.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-sand-50 border-t border-line">
        <div className="container-app grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 card p-5 md:p-6 space-y-4 lg:self-start">
            <label className="block">
              <span className={label}>Destination</span>
              <select value={slug} onChange={(e) => setSlug(e.target.value)} className={`${field} font-semibold`}>
                {VISA_FEE_ROWS.map((r) => (
                  <option key={r.slug} value={r.slug}>{r.country}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className={label}>Number of applicants</span>
              <select value={people} onChange={(e) => setPeople(Number(e.target.value))} className={field}>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => <option key={n}>{n}</option>)}
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm text-ink-900 cursor-pointer">
              <input type="checkbox" checked={withTravlys} onChange={(e) => setWithTravlys(e.target.checked)} />
              Include the Travlys service fee
            </label>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="card p-5 md:p-6" aria-live="polite">
              <p className={label}>{row.country} · {people} applicant{people > 1 ? 's' : ''}</p>
              <p className="font-display text-4xl font-extrabold text-ink-900 m-0 mt-1">{inr(total)}</p>
              <p className="text-sm text-slate-muted m-0 mt-1">Estimated total{withTravlys ? ', government fees plus Travlys service' : ', government fees only'}</p>

              <table className="w-full text-sm mt-5">
                <tbody>
                  <tr className="border-b border-line">
                    <td className="py-2.5 text-slate-muted">
                      Government fee{visaFree ? '' : ` · ${row.governmentFee} × ${people}`}
                      {row.paidTo && <span className="block text-xs text-slate-faint">Paid to {row.paidTo}</span>}
                    </td>
                    <td className="py-2.5 text-right font-semibold text-ink-900">{visaFree ? 'None (visa-free)' : `≈ ${inr(gov)}`}</td>
                  </tr>
                  {withTravlys && (
                    <tr className="border-b border-line">
                      <td className="py-2.5 text-slate-muted">Travlys service fee · {inr(row.travlysFeeInr)} × {people}</td>
                      <td className="py-2.5 text-right font-semibold text-ink-900">{inr(service)}</td>
                    </tr>
                  )}
                  <tr>
                    <td className="py-2.5 font-semibold text-ink-900">Total</td>
                    <td className="py-2.5 text-right font-display text-lg font-extrabold text-ink-900">≈ {inr(total)}</td>
                  </tr>
                </tbody>
              </table>

              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 text-sm">
                <div><dt className={label}>Processing</dt><dd className="m-0 mt-1 text-ink-900">{row.processing}</dd></div>
                <div><dt className={label}>Validity</dt><dd className="m-0 mt-1 text-ink-900">{row.validity}</dd></div>
                <div><dt className={label}>Stay</dt><dd className="m-0 mt-1 text-ink-900">{row.stay}</dd></div>
              </dl>

              <div className="flex flex-wrap gap-2 mt-6">
                <Link to={`/visa/${row.slug}/`} className="btn btn-primary no-underline">{row.country} visa details</Link>
                <a href={`https://wa.me/918200918967?text=${encodeURIComponent(whatsapp)}`} className="btn btn-ghost no-underline inline-flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4" /> Get an exact quote
                </a>
              </div>
            </div>

            <p className="text-xs text-slate-faint leading-relaxed flex items-start gap-2">
              <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              Rupee amounts are approximate, at mid-October 2026 exchange rates; you pay the government fee at the rate on the day.
              Not included: VFS or visa-centre service charges, courier, travel insurance, translations and optional priority services.
              Travlys fees are starting prices for a standard tourist visa. Source for each government fee: the official site linked on our visa fees table.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white border-t border-line">
        <div className="container-app max-w-3xl">
          <h2 className="font-display text-3xl font-extrabold text-ink-900 m-0">Visa costs from India, answered</h2>
          <div className="mt-4">
            {faqs.map((f) => (
              <article key={f.q} className="py-5 border-b border-line last:border-b-0">
                <h3 className="font-display text-lg font-bold text-ink-900 m-0 leading-snug">{f.q}</h3>
                <p className="text-slate-muted mt-2 text-[0.97rem] leading-relaxed m-0">{f.a}</p>
              </article>
            ))}
          </div>
          <p className="text-sm text-slate-muted mt-6">
            Compare every country in one table on the <Link to="/visa-fees/" className="text-coral-600">visa fees page</Link>.
          </p>
        </div>
      </section>
    </motion.div>
  )
}
