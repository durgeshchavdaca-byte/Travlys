import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CalendarRange, Plus, Trash2, CheckCircle2, AlertTriangle, MessageCircle } from 'lucide-react'
import { HeroBlobs, TextReveal } from '../components/MotionGraphics'
import SEO from '../components/SEO'
import { LIMIT, daysUsed, maxStayFrom, checkPlannedStay } from '../data/schengenCalc'
import { SCHENGEN_CALC_META, SCHENGEN_CALC_FAQS, buildSchengenCalcSchemas } from '../seo/pages'

const todayIso = () => new Date().toISOString().slice(0, 10)
const nice = (iso) =>
  iso ? new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }) : ''

const label = 'text-[0.7rem] uppercase tracking-[0.14em] font-semibold text-slate-faint'
const field = 'mt-1 w-full bg-white border border-line rounded-xl px-3 py-2.5 text-ink-900'

export default function SchengenCalculatorPage() {
  const [stays, setStays] = useState([{ entry: '', exit: '' }])
  const [entry, setEntry] = useState('')
  const [exit, setExit] = useState('')

  const valid = useMemo(() => stays.filter((s) => s.entry && s.exit && s.exit >= s.entry), [stays])
  const badRow = stays.some((s) => s.entry && s.exit && s.exit < s.entry)
  const usedToday = useMemo(() => daysUsed(valid, todayIso()), [valid])
  const max = useMemo(() => (entry ? maxStayFrom(valid, entry) : null), [valid, entry])
  const plan = useMemo(() => (entry && exit && exit >= entry ? checkPlannedStay(valid, entry, exit) : null), [valid, entry, exit])

  const setRow = (i, key, v) => setStays((rows) => rows.map((r, j) => (j === i ? { ...r, [key]: v } : r)))

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      <SEO {...SCHENGEN_CALC_META} jsonLd={buildSchengenCalcSchemas()} />

      <section className="relative pt-32 pb-12 md:pt-40 md:pb-14 overflow-hidden mesh-warm">
        <HeroBlobs />
        <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
        <div className="relative z-10 container-app">
          <div className="max-w-3xl">
            <span className="pill bg-white border border-line text-ink-900">
              <CalendarRange className="w-3.5 h-3.5 text-coral-500" /> Free tool
            </span>
            <h1 className="font-display text-[2.4rem] sm:text-5xl md:text-[3.4rem] font-extrabold text-ink-900 mt-5 leading-[1.05]">
              <TextReveal text="Schengen 90/180" as="span" />
              <br />
              <span className="hero-italic-mark">
                <span className="relative italic text-ink-900">day calculator.</span>
              </span>
            </h1>
            <p className="text-slate-muted mt-5 text-[1.05rem] max-w-2xl leading-relaxed">
              Enter your past Schengen trips and your next entry date. See how many of your 90 days you have used,
              and the last day you can stay without breaking the 90/180 rule.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-sand-50 border-t border-line">
        <div className="container-app grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div className="card p-5 md:p-6">
              <h2 className="font-display text-xl font-extrabold text-ink-900 m-0">1. Your Schengen trips</h2>
              <p className="text-sm text-slate-muted mt-1 mb-4">Add every stay in the last 6 months, plus any trip already booked. Entry and exit days both count.</p>
              <div className="space-y-3">
                {stays.map((s, i) => (
                  <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-3 items-end">
                    <label className="block">
                      <span className={label}>Entry {i + 1}</span>
                      <input type="date" value={s.entry} onChange={(e) => setRow(i, 'entry', e.target.value)} className={field} />
                    </label>
                    <label className="block">
                      <span className={label}>Exit {i + 1}</span>
                      <input type="date" value={s.exit} min={s.entry || undefined} onChange={(e) => setRow(i, 'exit', e.target.value)} className={field} />
                    </label>
                    <button
                      type="button"
                      onClick={() => setStays((rows) => (rows.length > 1 ? rows.filter((_, j) => j !== i) : [{ entry: '', exit: '' }]))}
                      className="w-11 h-11 rounded-xl border border-line bg-white cursor-pointer flex items-center justify-center text-slate-muted hover:text-coral-600"
                      aria-label={`Remove trip ${i + 1}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              {badRow && <p className="text-sm text-coral-600 mt-3 mb-0">An exit date is before its entry date. That trip is ignored until you fix it.</p>}
              <button type="button" onClick={() => setStays((rows) => [...rows, { entry: '', exit: '' }])} className="btn btn-ghost text-sm mt-4 inline-flex items-center gap-1.5">
                <Plus className="w-4 h-4" /> Add another trip
              </button>
            </div>

            <div className="card p-5 md:p-6">
              <h2 className="font-display text-xl font-extrabold text-ink-900 m-0">2. Your next trip</h2>
              <p className="text-sm text-slate-muted mt-1 mb-4">Enter the date you will arrive. Add an exit date to check a specific plan.</p>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className={label}>Entry date</span>
                  <input type="date" value={entry} onChange={(e) => setEntry(e.target.value)} className={field} />
                </label>
                <label className="block">
                  <span className={label}>Exit date (optional)</span>
                  <input type="date" value={exit} min={entry || undefined} onChange={(e) => setExit(e.target.value)} className={field} />
                </label>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-5 space-y-4 lg:sticky lg:top-28 lg:self-start">
            <div className="card p-5 md:p-6">
              <p className={label}>Days used in the last 180 days (as of today)</p>
              <p className="font-display text-4xl font-extrabold text-ink-900 m-0 mt-1">
                {usedToday}<span className="text-xl text-slate-faint"> / {LIMIT}</span>
              </p>
              <div className="h-2 rounded-full bg-sand-100 mt-3 overflow-hidden">
                <div className={`h-full ${usedToday > LIMIT ? 'bg-coral-600' : 'bg-coral-500'}`} style={{ width: `${Math.min(100, (usedToday / LIMIT) * 100)}%` }} />
              </div>
            </div>

            <div className="card p-5 md:p-6" aria-live="polite">
              {!entry && <p className="text-slate-muted m-0">Enter your next entry date to see how long you can stay.</p>}
              {max && (
                <>
                  <p className={label}>If you enter on {nice(entry)}</p>
                  {max.days > 0 ? (
                    <>
                      <p className="font-display text-2xl font-extrabold text-ink-900 m-0 mt-1">You can stay {max.days} day{max.days > 1 ? 's' : ''}</p>
                      <p className="text-slate-muted m-0 mt-1">Last day you may be in the Schengen area: <b className="text-ink-900">{nice(max.lastIso)}</b></p>
                    </>
                  ) : (
                    <p className="font-display text-xl font-extrabold text-coral-600 m-0 mt-1">You have no days left on this date. Pick a later entry date.</p>
                  )}
                  <p className="text-sm text-slate-muted m-0 mt-2">Days already used in the 180 days before you arrive: {max.usedBefore}</p>
                </>
              )}
              {plan && (
                <div className={`mt-4 rounded-xl p-3 text-sm flex items-start gap-2 ${plan.ok ? 'bg-mint-100 text-ink-900' : 'bg-coral-50 text-ink-900'}`}>
                  {plan.ok ? <CheckCircle2 className="w-4 h-4 text-mint-500 shrink-0 mt-0.5" /> : <AlertTriangle className="w-4 h-4 text-coral-600 shrink-0 mt-0.5" />}
                  <span>
                    {plan.ok
                      ? `Your ${plan.days}-day trip to ${nice(exit)} stays within the 90/180 rule.`
                      : `Your ${plan.days}-day trip breaks the rule on ${nice(plan.overstayIso)}. Leave by ${nice(max?.lastIso)} or shorten the trip.`}
                  </span>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-faint leading-relaxed">
              This tool applies the 90/180 rule only. Your visa's own validity dates and "duration of stay" also limit you,
              and long-stay visas or residence permits follow different rules. The border officer has the final say.
            </p>
          </aside>
        </div>
      </section>

      <section className="py-14 bg-white border-t border-line">
        <div className="container-app max-w-3xl">
          <h2 className="font-display text-3xl font-extrabold text-ink-900 m-0">How the 90/180 rule works</h2>
          <div className="mt-4">
            {SCHENGEN_CALC_FAQS.map((f) => (
              <article key={f.q} className="py-5 border-b border-line last:border-b-0">
                <h3 className="font-display text-lg font-bold text-ink-900 m-0 leading-snug">{f.q}</h3>
                <p className="text-slate-muted mt-2 text-[0.97rem] leading-relaxed m-0">{f.a}</p>
              </article>
            ))}
          </div>
          <div className="card p-6 mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="font-display text-lg font-extrabold text-ink-900 m-0">Need a Schengen visa?</p>
              <p className="text-sm text-slate-muted m-0 mt-1">Travlys files Schengen visas through the Netherlands from ₹2,950 service fee.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to="/visa/netherlands-visa/" className="btn btn-primary no-underline">Schengen visa help</Link>
              <a href="https://wa.me/918200918967" className="btn btn-ghost no-underline inline-flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
