import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Globe2, Search, ArrowUpRight, MessageCircle } from 'lucide-react'
import { HeroBlobs, TextReveal } from '../components/MotionGraphics'
import SEO from '../components/SEO'
import { COUNTRIES, CHECKER_UPDATED, STATUS_LABEL, STATUS_ORDER } from '../data/visaChecker'
import { VISA_CHECKER_META, buildVisaCheckerSchemas } from '../seo/pages'

const label = 'text-[0.7rem] uppercase tracking-[0.14em] font-semibold text-slate-faint'
const nice = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

const TONE = {
  'visa-free': 'bg-mint-100 text-ink-900',
  'visa-on-arrival': 'bg-mint-100 text-ink-900',
  eta: 'bg-sand-100 text-ink-900',
  'e-visa': 'bg-sand-100 text-ink-900',
  permit: 'bg-sand-100 text-ink-900',
  'visa-required': 'bg-coral-50 text-ink-900',
}

function Badge({ status }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${TONE[status] || 'bg-sand-100'}`}>
      {STATUS_LABEL[status] || status}
    </span>
  )
}

export default function VisaCheckerPage() {
  const sorted = useMemo(() => [...COUNTRIES].sort((a, b) => a.country.localeCompare(b.country)), [])
  const [id, setId] = useState('')
  const [q, setQ] = useState('')
  const pick = sorted.find((c) => c.id === id)
  const filtered = q ? sorted.filter((c) => c.country.toLowerCase().includes(q.trim().toLowerCase())) : sorted

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      <SEO {...VISA_CHECKER_META} jsonLd={buildVisaCheckerSchemas()} />

      <section className="relative pt-32 pb-12 md:pt-40 md:pb-14 overflow-hidden mesh-warm">
        <HeroBlobs />
        <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
        <div className="relative z-10 container-app">
          <div className="max-w-3xl">
            <span className="pill bg-white border border-line text-ink-900">
              <Globe2 className="w-3.5 h-3.5 text-coral-500" /> {COUNTRIES.length} destinations · checked {nice(CHECKER_UPDATED)}
            </span>
            <h1 className="font-display text-[2.4rem] sm:text-5xl md:text-[3.4rem] font-extrabold text-ink-900 mt-5 leading-[1.05]">
              <TextReveal text="Do Indians need" as="span" />
              <br />
              <span className="hero-italic-mark">
                <span className="relative italic text-ink-900">a visa?</span>
              </span>
            </h1>
            <p className="text-slate-muted mt-5 text-[1.05rem] max-w-2xl leading-relaxed">
              Pick a country to see whether you need a visa on an Indian passport, how long you can stay, what it costs
              and what to do before you fly. Every answer links to a full, sourced guide.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-sand-50 border-t border-line">
        <div className="container-app grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 card p-5 md:p-6 lg:self-start">
            <label className="block">
              <span className={label}>Where are you going?</span>
              <select
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="mt-1 w-full bg-white border border-line rounded-xl px-3 py-2.5 text-ink-900 font-semibold"
              >
                <option value="">Choose a country</option>
                {sorted.map((c) => (
                  <option key={c.id} value={c.id}>{c.country}</option>
                ))}
              </select>
            </label>
            <p className="text-xs text-slate-faint mt-3 mb-0">For an ordinary Indian passport, travelling as a tourist. Rules for business, study or work differ.</p>
          </div>

          <div className="lg:col-span-7" aria-live="polite">
            {!pick && (
              <div className="card p-6 text-slate-muted">Choose a country to see the answer, or browse the full list below.</div>
            )}
            {pick && (
              <div className="card p-6 md:p-7">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <p className={label}>{pick.country}</p>
                  <Badge status={pick.status} />
                </div>
                <p className="font-display text-2xl md:text-3xl font-extrabold text-ink-900 m-0 mt-2 leading-tight">{pick.headline}</p>
                <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5 text-sm">
                  <div><dt className={label}>Stay</dt><dd className="m-0 mt-1 text-ink-900">{pick.stay || 'See guide'}</dd></div>
                  <div><dt className={label}>Cost</dt><dd className="m-0 mt-1 text-ink-900">{pick.cost || 'See guide'}</dd></div>
                  <div><dt className={label}>Checked</dt><dd className="m-0 mt-1 text-ink-900">{nice(pick.checked)}</dd></div>
                </dl>
                {pick.before_you_fly && <p className="text-sm text-slate-text mt-4 mb-0"><b className="text-ink-900">Before you fly:</b> {pick.before_you_fly}</p>}
                {pick.note && <p className="text-sm text-slate-text mt-2 mb-0"><b className="text-ink-900">Note:</b> {pick.note}</p>}
                <div className="flex flex-wrap gap-2 mt-6">
                  <Link to={pick.href} className="btn btn-primary no-underline inline-flex items-center gap-1.5">
                    Full {pick.country} guide <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={`https://wa.me/918200918967?text=${encodeURIComponent(`Hi Travlys, I'm planning a trip to ${pick.country}. Can you check what I need?`)}`}
                    className="btn btn-ghost no-underline inline-flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4" /> Ask on WhatsApp
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-14 bg-white border-t border-line">
        <div className="container-app">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="font-display text-3xl font-extrabold text-ink-900 m-0">Visa rules for Indians, every country</h2>
              <p className="text-slate-muted mt-1 mb-0">Sorted by how easy entry is. Tap a country for its full guide.</p>
            </div>
            <label className="relative block w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-faint absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search a country"
                aria-label="Search a country"
                className="w-full bg-white border border-line rounded-xl pl-9 pr-3 py-2.5 text-ink-900"
              />
            </label>
          </div>
          {STATUS_ORDER.map((st) => {
            const list = filtered.filter((c) => c.status === st)
            if (!list.length) return null
            return (
              <div key={st} className="mb-10">
                <h3 className="font-display text-xl font-extrabold text-ink-900 m-0 mb-3 flex items-center gap-2">
                  <Badge status={st} /> <span>{list.length} {list.length === 1 ? 'destination' : 'destinations'}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {list.map((c) => (
                    <Link key={c.id} to={c.href} className="card p-4 no-underline group">
                      <span className="block font-display text-base font-extrabold text-ink-900">{c.country}</span>
                      <span className="block text-sm text-slate-muted mt-1">{c.headline}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
          <p className="text-xs text-slate-faint mt-4 max-w-3xl leading-relaxed">
            Entry rules can change with little notice, and visa-free entry never guarantees admission: officers can ask for a
            return ticket, hotel booking and funds. Check the official source linked in each guide before you book.
          </p>
        </div>
      </section>
    </motion.div>
  )
}
