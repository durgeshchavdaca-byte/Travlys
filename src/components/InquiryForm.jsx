import { useState } from 'react'
import { Send, CheckCircle2, Loader2 } from 'lucide-react'
import { destinations } from '../data/destinations'

// Inquiry form using FormSubmit.co — submissions are emailed straight
// to info@travlys.com. Zero backend, zero signup. The first submission
// from a new install triggers a one-time confirmation email to the
// recipient address; click the link in that email to activate.
//
// To upgrade to a paid form service later (e.g. Web3Forms, Formspree),
// replace FORM_ENDPOINT with their endpoint URL — the field names below
// already match the convention.

const FORM_ENDPOINT = 'https://formsubmit.co/ajax/info@travlys.com'

export default function InquiryForm({ defaultDestination = '', compact = false }) {
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setError('')

    const data = new FormData(e.currentTarget)
    // Spam protection — FormSubmit honeypot
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
      setError('Could not send right now. Please WhatsApp us at +91 8200918967.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-cream-50 border border-gold-500/30 rounded-2xl p-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-gold-500 mx-auto mb-4" />
        <h3 className="font-heading text-2xl font-light italic text-navy-900 mb-2">
          Thank you!
        </h3>
        <p className="text-body text-sm leading-relaxed">
          Your inquiry has been sent. A Travlys visa specialist will reach out within one business day.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-4 ${compact ? '' : 'bg-cream-50 border border-cream-200/50 rounded-2xl p-6 md:p-8'}`}
      aria-label="Visa inquiry form"
    >
      {/* FormSubmit hidden config */}
      <input type="hidden" name="_subject" value="New Travlys visa inquiry" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="text" name="_honey" tabIndex="-1" autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-[10px] uppercase tracking-[0.2em] text-navy-700/60 block mb-2" style={{ fontFamily: 'var(--font-family-accent)' }}>
            Full Name *
          </span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            className="w-full px-4 py-3 bg-white border border-cream-200 rounded-xl text-sm text-navy-900 placeholder:text-navy-700/30 focus:outline-none focus:border-gold-500 transition-colors"
          />
        </label>

        <label className="block">
          <span className="text-[10px] uppercase tracking-[0.2em] text-navy-700/60 block mb-2" style={{ fontFamily: 'var(--font-family-accent)' }}>
            Phone (WhatsApp) *
          </span>
          <input
            type="tel"
            name="phone"
            required
            autoComplete="tel"
            placeholder="+91 ..."
            className="w-full px-4 py-3 bg-white border border-cream-200 rounded-xl text-sm text-navy-900 placeholder:text-navy-700/30 focus:outline-none focus:border-gold-500 transition-colors"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-[10px] uppercase tracking-[0.2em] text-navy-700/60 block mb-2" style={{ fontFamily: 'var(--font-family-accent)' }}>
            Email *
          </span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 bg-white border border-cream-200 rounded-xl text-sm text-navy-900 placeholder:text-navy-700/30 focus:outline-none focus:border-gold-500 transition-colors"
          />
        </label>

        <label className="block">
          <span className="text-[10px] uppercase tracking-[0.2em] text-navy-700/60 block mb-2" style={{ fontFamily: 'var(--font-family-accent)' }}>
            Destination
          </span>
          <select
            name="destination"
            defaultValue={defaultDestination}
            className="w-full px-4 py-3 bg-white border border-cream-200 rounded-xl text-sm text-navy-900 focus:outline-none focus:border-gold-500 transition-colors"
          >
            <option value="">Choose a country</option>
            {destinations.map((d) => (
              <option key={d.slug} value={d.name}>{d.name}</option>
            ))}
            <option value="Other">Other / Not sure yet</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-[10px] uppercase tracking-[0.2em] text-navy-700/60 block mb-2" style={{ fontFamily: 'var(--font-family-accent)' }}>
            Visa Type
          </span>
          <select
            name="visa_type"
            className="w-full px-4 py-3 bg-white border border-cream-200 rounded-xl text-sm text-navy-900 focus:outline-none focus:border-gold-500 transition-colors"
          >
            <option value="">Choose a category</option>
            <option>Tourist</option>
            <option>Business</option>
            <option>Student</option>
            <option>Work / Employment</option>
            <option>Transit</option>
            <option>Family / Visit</option>
            <option>Other</option>
          </select>
        </label>

        <label className="block">
          <span className="text-[10px] uppercase tracking-[0.2em] text-navy-700/60 block mb-2" style={{ fontFamily: 'var(--font-family-accent)' }}>
            Travel Date (approx.)
          </span>
          <input
            type="month"
            name="travel_date"
            className="w-full px-4 py-3 bg-white border border-cream-200 rounded-xl text-sm text-navy-900 focus:outline-none focus:border-gold-500 transition-colors"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-[10px] uppercase tracking-[0.2em] text-navy-700/60 block mb-2" style={{ fontFamily: 'var(--font-family-accent)' }}>
          Message
        </span>
        <textarea
          name="message"
          rows="3"
          placeholder="Tell us about your travel plans, urgency, or any questions..."
          className="w-full px-4 py-3 bg-white border border-cream-200 rounded-xl text-sm text-navy-900 placeholder:text-navy-700/30 focus:outline-none focus:border-gold-500 transition-colors resize-none"
        />
      </label>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="group w-full md:w-auto px-8 py-4 bg-navy-900 text-white rounded-xl text-sm font-semibold tracking-wide hover:bg-gold-500 hover:text-navy-900 transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-3"
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Sending...
          </>
        ) : (
          <>
            Request Free Consultation
            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      {status === 'error' && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <p className="text-[11px] text-navy-700/50 leading-relaxed">
        By submitting, you agree to be contacted by Travlys regarding your visa inquiry. We respect your privacy and never share your details.
      </p>
    </form>
  )
}
