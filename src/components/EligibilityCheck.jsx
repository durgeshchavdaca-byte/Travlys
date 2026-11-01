import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2, Clock3, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react'
import Flag from './Flag'
import { destinations } from '../data/destinations'

// Free visa check: four taps, an instant read-out, then one button that opens
// WhatsApp with the answers already written. No form, no backend; the lead
// arrives as a WhatsApp chat the team can answer straight away.

const WA = '918200918967'

const PURPOSES = ['Tourism', 'Business', 'Visiting family', 'Study', 'Work']
const WHEN = ['Within a month', '1-3 months', '3-6 months', 'Not decided']
const HISTORY = ['First trip abroad', 'Travelled abroad before', 'Had a visa refusal']

const isEmbassy = (d) => d.visaType === 'Embassy Visa' || d.visaType === 'Schengen Visa'

function advice(dest, purpose, when, history) {
  const notes = []
  if (purpose === 'Study' || purpose === 'Work') {
    notes.push(`${purpose} visas need a different file from a visitor visa: offer or admission letter, funds and, for some countries, medicals. We map the exact route for you.`)
  } else if (dest.slug === 'thailand-visa' || dest.slug === 'malaysia-visa') {
    notes.push(`${dest.name} is ${dest.visaType.toLowerCase()} for Indian tourists. We check your stay length and arrival card so you are not turned back at immigration.`)
  } else {
    notes.push(`You need a ${dest.name} ${dest.visaType === 'e-Visa' ? 'e-Visa' : 'visa'}. Typical processing: ${dest.processingTimeShort}.`)
  }
  if (isEmbassy(dest) && (when === 'Within a month' || when === '1-3 months')) {
    notes.push('Your dates are close for an embassy visa. Appointment slots fill fast, so message today and we will check the earliest slot for you.')
  }
  if (history === 'Had a visa refusal') {
    notes.push('A past refusal is not the end. Share the refusal letter and we will tell you honestly what to fix before you reapply.')
  } else if (history === 'First trip abroad') {
    notes.push('First international trip? Strong documents matter more: bank statements, leave letter and a clear itinerary. We build the file with you.')
  }
  return notes
}

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`px-4 py-2.5 rounded-full text-sm font-medium border transition-colors cursor-pointer inline-flex items-center gap-2 ${
        active ? 'bg-ink-900 border-ink-900 text-white' : 'bg-white border-line text-slate-text hover:border-ink-700'
      }`}
    >
      {children}
    </button>
  )
}

export default function EligibilityCheck({ initialSlug = null, compact = false }) {
  const [slug, setSlug] = useState(initialSlug)
  const [purpose, setPurpose] = useState(null)
  const [when, setWhen] = useState(null)
  const [history, setHistory] = useState(null)
  const dest = destinations.find((d) => d.slug === slug)

  // Step index: which question is showing (or 4 = result).
  const step = !dest ? 0 : !purpose ? 1 : !when ? 2 : !history ? 3 : 4
  const back = () => {
    if (step === 4) setHistory(null)
    else if (step === 3) setWhen(null)
    else if (step === 2) setPurpose(null)
    else if (step === 1 && !initialSlug) setSlug(null)
  }

  const message = dest
    ? `Hi Travlys, I did the free visa check on your website.\n\nDestination: ${dest.name}\nPurpose: ${purpose}\nTravel: ${when}\nHistory: ${history}\n\nPlease send my document checklist and quote.`
    : ''

  const questions = [
    { title: 'Where are you going?' },
    { title: `What is the trip to ${dest?.name} for?` },
    { title: 'When do you plan to travel?' },
    { title: 'Your travel history' },
  ]

  return (
    <div className={`card ${compact ? 'p-5 md:p-6' : 'p-6 md:p-8'} relative overflow-hidden`}>
      <div className="flex items-center justify-between gap-3 mb-5">
        <span className="pill bg-coral-50 text-coral-600">
          <Sparkles className="w-3.5 h-3.5" /> Free visa check · 30 seconds
        </span>
        <span className="text-xs text-slate-faint">{step < 4 ? `Step ${step + 1} of 4` : 'Your result'}</span>
      </div>
      <div className="h-1.5 rounded-full bg-sand-100 overflow-hidden mb-6">
        <motion.div className="h-full bg-coral-500" animate={{ width: `${(Math.min(step, 4) / 4) * 100}%` }} transition={{ duration: 0.4 }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25 }}
        >
          {step < 4 ? (
            <>
              <h3 className="font-display text-2xl font-extrabold text-ink-900 mb-4">{questions[step].title}</h3>
              <div className="flex flex-wrap gap-2">
                {step === 0 &&
                  destinations.map((d) => (
                    <Chip key={d.slug} active={slug === d.slug} onClick={() => setSlug(d.slug)}>
                      <Flag code={d.code} name={d.name} size={14} /> {d.name}
                    </Chip>
                  ))}
                {step === 1 && PURPOSES.map((p) => <Chip key={p} onClick={() => setPurpose(p)}>{p}</Chip>)}
                {step === 2 && WHEN.map((w) => <Chip key={w} onClick={() => setWhen(w)}>{w}</Chip>)}
                {step === 3 && HISTORY.map((h) => <Chip key={h} onClick={() => setHistory(h)}>{h}</Chip>)}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <Flag code={dest.code} name={dest.name} size={28} />
                <div>
                  <p className="font-display text-2xl font-extrabold text-ink-900 leading-tight m-0">{dest.name} · {purpose}</p>
                  <p className="text-sm text-slate-muted m-0 mt-0.5 flex items-center gap-1.5">
                    <Clock3 className="w-3.5 h-3.5" /> {dest.processingTimeShort} · Travlys fee {dest.price.replace(/^From /, 'from ')}
                  </p>
                </div>
              </div>
              <ul className="mt-5 space-y-3 p-0 list-none">
                {advice(dest, purpose, when, history).map((n) => (
                  <li key={n} className="flex gap-3 text-[0.97rem] text-slate-text leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-coral-500 shrink-0 mt-0.5" /> {n}
                  </li>
                ))}
              </ul>
              <a
                href={`https://wa.me/${WA}?text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noopener"
                className="btn btn-coral w-full justify-center mt-6 no-underline inline-flex items-center gap-2 py-3.5 text-base"
              >
                <MessageCircle className="w-5 h-5" /> Get my free checklist on WhatsApp
              </a>
              <p className="text-xs text-slate-faint mt-3 flex items-center gap-1.5 justify-center m-0">
                <ShieldCheck className="w-3.5 h-3.5" /> Free, no obligation. A specialist replies within a working day.
              </p>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {(step > 1 || (step === 1 && !initialSlug)) && (
        <button type="button" onClick={back} className="mt-5 text-sm text-slate-muted hover:text-ink-900 inline-flex items-center gap-1 cursor-pointer bg-transparent border-0 p-0">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      )}
    </div>
  )
}
