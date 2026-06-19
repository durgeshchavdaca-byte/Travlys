import { motion } from 'framer-motion'
import { MessageCircle, Phone, Mail, MapPin, Clock3, Sparkles } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { HeroBlobs, TextReveal } from '../components/MotionGraphics'
import SEO from '../components/SEO'
import InquiryForm from '../components/InquiryForm'
import { SITE_URL, BIZ, DEFAULT_OG_IMAGE, buildWebPageSchema } from '../seo/config'

const meta = {
  title: 'Contact Travlys: WhatsApp, phone, email and Ahmedabad office',
  description:
    'Reach Travlys visa consultants on WhatsApp +91 82009 18967, by email at info@travlys.com, or visit our Ahmedabad office. Hours, address, and inquiry form.',
  path: '/contact',
  keywords:
    'contact travlys, travlys whatsapp, travlys phone, travlys ahmedabad office, visa consultants contact india',
  type: 'website',
  image: DEFAULT_OG_IMAGE,
  imageAlt: 'Contact Travlys visa consultants',
}

function contactSchemas() {
  return [
    buildWebPageSchema(meta),
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      '@id': `${SITE_URL}/contact#contactpage`,
      url: `${SITE_URL}/contact`,
      name: meta.title,
      description: meta.description,
      mainEntity: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE_URL}/contact` },
      ],
    },
  ]
}

const CHANNELS = [
  { icon: MessageCircle, label: 'WhatsApp', value: '+91 82009 18967', href: 'https://wa.me/918200918967', accent: 'Most replies in 15 min during work hours' },
  { icon: Phone, label: 'Phone', value: '+91 82009 18967', href: 'tel:+918200918967', accent: 'Mon–Sat, 9 AM – 7 PM IST' },
  { icon: Mail, label: 'Email', value: 'info@travlys.com', href: 'mailto:info@travlys.com', accent: 'Replies within one working day' },
]

export default function ContactPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      <SEO {...meta} jsonLd={contactSchemas()} />

      {/* HERO */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden mesh-warm">
        <HeroBlobs />
        <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />

        <div className="relative z-10 container-app">
          <div className="max-w-3xl">
            <span className="pill bg-white border border-line text-ink-900">
              <Sparkles className="w-3.5 h-3.5 text-coral-500" /> Contact
            </span>
            <h1 className="font-display text-[2.6rem] sm:text-5xl md:text-[3.6rem] font-extrabold text-ink-900 mt-5 leading-[1.05]">
              <TextReveal text="Talk to a real" as="span" />
              <br />
              <span className="hero-italic-mark">
                <span className="relative italic text-ink-900">visa specialist.</span>
              </span>
            </h1>
            <p className="text-slate-muted mt-5 text-[1.05rem] max-w-2xl leading-relaxed">
              WhatsApp is fastest — we usually reply within 15 minutes during
              working hours. Drop a brief below if you prefer email; a consultant
              comes back within a working day with a route, timeline and quote.
            </p>
          </div>
        </div>
      </section>

      {/* Channels */}
      <section className="py-16 bg-white border-t border-line">
        <div className="container-app">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CHANNELS.map((c) => (
              <AnimatedSection key={c.label}>
                <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="card p-7 h-full block no-underline group">
                  <div className="w-11 h-11 rounded-xl bg-coral-50 flex items-center justify-center">
                    <c.icon className="w-5 h-5 text-coral-500" />
                  </div>
                  <p className="text-[0.7rem] uppercase tracking-wider text-slate-faint font-semibold mt-4">{c.label}</p>
                  <p className="font-display text-xl font-extrabold text-ink-900 mt-1 leading-tight">{c.value}</p>
                  <p className="text-sm text-slate-muted mt-2 leading-relaxed">{c.accent}</p>
                </a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Office + Map */}
      <section className="py-20 bg-sand-50 border-t border-line">
        <div className="container-app grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <AnimatedSection>
            <span className="pill bg-coral-50 text-coral-600">
              <MapPin className="w-3.5 h-3.5" /> Visit us
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-ink-900 mt-4 leading-tight">
              Travlys office, Ahmedabad.
            </h2>
            <address className="not-italic text-[1.02rem] text-slate-text mt-5 leading-relaxed">
              605, Shivalik Shilp II<br />
              Near Hotel ITC Narmada, Keshav Baug<br />
              Vastrapur, Ahmedabad<br />
              Gujarat 380015, India
            </address>
            <p className="text-sm text-slate-muted mt-5 flex items-start gap-2">
              <Clock3 className="w-4 h-4 text-coral-500 mt-0.5 shrink-0" />
              Mon – Sat: 9:00 AM – 7:00 PM IST. Walk-ins by appointment.
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Shivalik+Shilp+II+Keshav+Baug+Vastrapur+Ahmedabad+380015"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-6"
            >
              Open in Google Maps
            </a>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="card overflow-hidden h-[380px]">
              <iframe
                title="Travlys Ahmedabad office on Google Maps"
                src="https://www.google.com/maps?q=Shivalik+Shilp+II+Keshav+Baug+Vastrapur+Ahmedabad+380015&output=embed"
                style={{ border: 0, width: '100%', height: '100%' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Inquiry */}
      <section id="inquiry" className="py-20 bg-white border-t border-line">
        <div className="container-app">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <span className="pill bg-coral-50 text-coral-600">
                <Sparkles className="w-3.5 h-3.5" /> Free consultation
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-ink-900 mt-4 leading-[1.05]">
                Send a brief.
              </h2>
              <p className="text-slate-muted mt-4">
                Tell us where you are going and a specialist comes back within
                one working day with a route, document checklist, timeline and
                quote. No charge to the brief, no obligation.
              </p>
            </div>
            <div className="lg:col-span-7">
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
