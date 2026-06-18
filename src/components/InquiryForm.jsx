import { useState } from 'react'
import { Send, CheckCircle2, Loader2 } from 'lucide-react'
import { destinations } from '../data/destinations'

const FORM_ENDPOINT = 'https://formsubmit.co/ajax/info@travlys.com'

export default function InquiryForm({ defaultDestination = '', compact = false }) {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setError('')

    const data = new FormData(e.currentTarget)
    if (data.get('_honey')) {
      setStatus('success')
      return
    }

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json().catch(() => ({}))
      if (json.success === 'false' || json.message?.includes('error')) {
        throw new Error(json.message || 'Submission failed')
      }
      setStatus('success')
      e.target.reset()
    } catch (err) {
      setStatus('error')
      setError('Could not send right now. Please WhatsApp us at +91 82009 18967.')
    }
  }

  if (status === 'success') {
    return (
      <div className="card p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-mint-100 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-7 h-7 text-mint-500" />
        </div>
        <h3 className="font-display text-2xl font-bold text-ink-900 mb-2">
          Got it, we’re on it
        </h3>
        <p className="text-slate-muted text-[0.95rem] leading-relaxed max-w-md mx-auto">
          A Travlys visa specialist will reach out within one working day with a tailored plan, timeline and quote. Need it faster?
          <a href="https://wa.me/918200918967" className="text-coral-500 ml-1 hover:underline">WhatsApp us</a>.
        </p>
      </div>
    )
  }

  const wrap = compact
    ? ''
    : 'bg-white border border-line rounded-3xl p-6 md:p-8 shadow-[var(--shadow-card)]'

  return (
    <form
      onSubmit={handleSubmit}
      className={`${wrap} space-y-4`}
      aria-label="Visa inquiry form"
    >
      <input type="hidden" name="_subject" value="New Travlys visa inquiry" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="text" name="_honey" tabIndex="-1" autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Full name" required>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder="Your full name"
            className="input"
          />
        </Field>
        <Field label="WhatsApp / Mobile" required>
          <input
            type="tel"
            name="phone"
            required
            autoComplete="tel"
            placeholder="+91 ..."
            className="input"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Email" required>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="input"
          />
        </Field>
        <Field label="Destination">
          <select name="destination" defaultValue={defaultDestination} className="input">
            <option value="">Pick a country</option>
            {destinations.map((d) => (
              <option key={d.slug} value={d.name}>{d.name}</option>
            ))}
            <option value="Other">Other / not sure yet</option>
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Visa type">
          <select name="visa_type" className="input">
            <option value="">Pick a category</option>
            <option>Tourist</option>
            <option>Business</option>
            <option>Student</option>
            <option>Work / Employment</option>
            <option>Transit</option>
            <option>Family / Visit</option>
            <option>Not sure yet</option>
          </select>
        </Field>
        <Field label="Travel month">
          <input type="month" name="travel_date" className="input" />
        </Field>
      </div>

      <Field label="Anything we should know?">
        <textarea
          name="message"
          rows="3"
          placeholder="Travel dates, urgency, past refusals, group size, anything helps."
          className="input resize-none"
        />
      </Field>

      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 pt-1">
        <p className="text-xs text-slate-faint leading-relaxed">
          By submitting, you agree to be contacted by Travlys about your visa inquiry. We never share your details.
        </p>
        <button type="submit" disabled={status === 'sending'} className="btn btn-coral shrink-0">
          {status === 'sending' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Request callback
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {status === 'error' && (
        <p className="text-sm text-coral-600 font-medium">{error}</p>
      )}

      <style>{`
        .input {
          width: 100%;
          padding: 0.85rem 1rem;
          background: #ffffff;
          border: 1px solid var(--color-line);
          border-radius: 12px;
          font-size: 0.95rem;
          color: var(--color-slate-text);
          font-family: var(--font-family-body);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input::placeholder { color: var(--color-slate-faint); }
        .input:focus {
          outline: none;
          border-color: var(--color-ink-700);
          box-shadow: 0 0 0 4px rgba(45, 63, 137, 0.08);
        }
      `}</style>
    </form>
  )
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-ink-900 block mb-2">
        {label} {required && <span className="text-coral-500">*</span>}
      </span>
      {children}
    </label>
  )
}
