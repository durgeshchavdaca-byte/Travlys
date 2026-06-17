import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Phone,
  MessageCircle,
  Clock3,
  CheckCircle2,
  Plus,
  ShieldCheck,
  CalendarRange,
  Repeat2,
  MapPin,
  Sparkles,
  FileCheck2,
} from 'lucide-react'
import AnimatedSection, { StaggerContainer, StaggerItem } from '../components/AnimatedSection'
import { HeroBlobs, TextReveal } from '../components/MotionGraphics'
import { destinations } from '../data/destinations'
import SEO from '../components/SEO'
import InquiryForm from '../components/InquiryForm'
import { buildVisaSchemas, getVisaMeta } from '../seo/config'

function SnapshotItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-xl bg-sand-100 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-ink-900" />
      </div>
      <div className="min-w-0">
        <p className="text-[0.7rem] uppercase tracking-wider text-slate-faint font-semibold">{label}</p>
        <p className="font-semibold text-ink-900 text-[0.95rem] mt-0.5 leading-tight break-words">{value}</p>
      </div>
    </div>
  )
}

export default function VisaPage() {
  const { slug } = useParams()
  const dest = destinations.find((d) => d.slug === slug)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!dest) {
    return (
      <>
        <SEO
          title="Visa Destination Not Found"
          description="That visa destination isn’t on Travlys yet. Browse our supported countries — US, UK, Canada, Australia, Schengen, Singapore, UAE and more."
          path={`/visa/${slug || ''}`}
          noindex
        />
        <div className="min-h-[60vh] flex items-center justify-center bg-sand-50">
          <div className="text-center container-app">
            <h1 className="font-display text-4xl font-extrabold text-ink-900 mb-4">Destination not found</h1>
            <p className="text-slate-muted mb-6">We don’t have a page for that one — but we probably handle it. Let’s talk.</p>
            <Link to="/" className="btn btn-primary">Back to home</Link>
          </div>
        </div>
      </>
    )
  }

  const related = (dest.relatedDestinations || [])
    .map((s) => destinations.find((d) => d.slug === s))
    .filter(Boolean)

  const visaMeta = getVisaMeta(dest)
  const visaSchemas = buildVisaSchemas(dest)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      <SEO {...visaMeta} jsonLd={visaSchemas} />

      {/* HERO */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ transform: `translateY(${Math.max(0, scrollY - 80) * 0.15}px)` }}
        >
          <img
            src={dest.heroImage || dest.image}
            alt={`${dest.name} skyline — visa assistance for Indian travelers`}
            fetchPriority="high"
            className="w-full h-[120%] object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/85 via-ink-950/70 to-ink-950/40" />
        <HeroBlobs />

        <div className="relative z-10 container-app">
          <nav className="flex items-center gap-2 text-xs text-white/65 mb-6">
            <Link to="/" className="hover:text-coral-400 no-underline text-white/65">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/#destinations" className="hover:text-coral-400 no-underline text-white/65">Destinations</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{dest.name} Visa</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <span className="pill bg-white/10 border border-white/20 text-white backdrop-blur">
                <span className="text-base">{dest.flag}</span>
                {dest.visaType} · {dest.region}
              </span>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mt-5 leading-[1.02]">
                <TextReveal text={`${dest.name} visa`} as="span" />
                <br />
                <span className="text-coral-400">from India.</span>
              </h1>
              <p className="text-white/80 mt-5 text-[1.05rem] max-w-2xl leading-relaxed">
                {dest.tagline}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="https://wa.me/918200918967" className="btn btn-coral">
                  <MessageCircle className="w-4 h-4" /> WhatsApp a specialist
                </a>
                <a href="#apply" className="btn btn-on-dark">
                  Start application <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Snapshot card */}
            <div className="lg:col-span-5">
              <div className="card p-6 md:p-7 bg-white">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[0.7rem] uppercase tracking-wider text-slate-faint font-semibold">Travlys fee</p>
                  <span className="pill bg-mint-100 text-mint-500 font-semibold">In stock · book now</span>
                </div>
                <p className="font-display text-4xl md:text-5xl font-extrabold text-ink-900 mt-1">
                  {dest.price}
                </p>
                <p className="text-xs text-slate-muted mt-1">Embassy / VFS fees paid separately to authorities.</p>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <SnapshotItem icon={Clock3} label="Processing" value={dest.processingTime} />
                  <SnapshotItem icon={CalendarRange} label="Validity" value={dest.validity} />
                  <SnapshotItem icon={MapPin} label="Stay" value={dest.stayDuration} />
                  <SnapshotItem icon={Repeat2} label="Entry" value={dest.entryType} />
                </div>

                <a href="#apply" className="btn btn-primary w-full mt-6">
                  Begin {dest.name} visa <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 bg-white">
        <div className="container-app grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <AnimatedSection>
              <span className="pill bg-coral-50 text-coral-600">
                <Sparkles className="w-3.5 h-3.5" /> About this visa
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink-900 mt-4 leading-[1.05]">
                {dest.aboutTitle}
              </h2>
              <p className="text-slate-muted mt-5 text-[1.02rem] leading-relaxed">
                {dest.aboutText}
              </p>
              <p className="text-slate-muted mt-4 text-[1.02rem] leading-relaxed">
                {dest.description}
              </p>
            </AnimatedSection>
          </div>

          {dest.includes?.length > 0 && (
            <div className="lg:col-span-5">
              <AnimatedSection delay={0.1}>
                <div className="card p-7">
                  <p className="text-[0.7rem] uppercase tracking-wider text-coral-600 font-semibold">
                    What’s included in {dest.price}
                  </p>
                  <h3 className="font-display text-2xl font-bold text-ink-900 mt-1">Travlys handles</h3>
                  <ul className="mt-5 space-y-3">
                    {dest.includes.map((line) => (
                      <li key={line} className="flex items-start gap-3 text-[0.95rem]">
                        <CheckCircle2 className="w-5 h-5 text-mint-500 shrink-0 mt-0.5" />
                        <span className="text-slate-text">{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            </div>
          )}
        </div>
      </section>

      {/* Visa categories */}
      {dest.categories?.length > 0 && (
        <section className="py-20 bg-sand-50 border-t border-line">
          <div className="container-app">
            <AnimatedSection className="max-w-2xl mb-10">
              <span className="pill bg-white border border-line text-ink-900">
                <FileCheck2 className="w-3.5 h-3.5 text-coral-500" /> Categories
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink-900 mt-4 leading-[1.05]">
                Which {dest.name} visa do you need?
              </h2>
              <p className="text-slate-muted mt-4">
                Travlys helps you pick the right category based on travel purpose, duration and your profile.
              </p>
            </AnimatedSection>

            <StaggerContainer
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              stagger={0.06}
            >
              {dest.categories.map((cat, i) => (
                <StaggerItem key={i}>
                  <div className="card p-6 h-full">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-10 h-10 rounded-xl bg-ink-900 text-white flex items-center justify-center font-display font-bold text-sm">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="pill bg-coral-50 text-coral-600 text-[0.7rem]">{cat.purpose}</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-ink-900">{cat.name}</h3>
                    <p className="text-sm text-slate-muted mt-2 leading-relaxed">{cat.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* Process steps */}
      <section className="py-20 bg-white border-t border-line">
        <div className="container-app">
          <AnimatedSection className="max-w-2xl mb-12">
            <span className="pill bg-coral-50 text-coral-600">
              <ShieldCheck className="w-3.5 h-3.5" /> Process
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink-900 mt-4 leading-[1.05]">
              How your {dest.name} visa moves from brief to decision.
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {dest.processSteps.map((step, i) => {
              const [head, ...rest] = step.split(' — ')
              const body = rest.length ? rest.join(' — ') : ''
              return (
                <AnimatedSection key={i} delay={i * 0.05}>
                  <div className="card p-6 h-full flex gap-4">
                    <span className="font-display text-3xl font-extrabold text-coral-500/80 leading-none shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-ink-900">{head}</h3>
                      {body && <p className="text-sm text-slate-muted mt-1 leading-relaxed">{body}</p>}
                    </div>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* Documents */}
      {dest.documents?.length > 0 && (
        <section className="py-20 bg-sand-50 border-t border-line">
          <div className="container-app grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <span className="pill bg-white border border-line text-ink-900">
                <FileCheck2 className="w-3.5 h-3.5 text-coral-500" /> Documents
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink-900 mt-4 leading-[1.05]">
                The {dest.name} visa checklist.
              </h2>
              <p className="text-slate-muted mt-4">
                These are the most-common requirements — we send a profile-specific checklist within a day of your brief.
              </p>
              <a href="https://wa.me/918200918967" className="btn btn-coral mt-6">
                <MessageCircle className="w-4 h-4" /> Get my checklist
              </a>
            </div>
            <div className="lg:col-span-7">
              <AnimatedSection>
                <div className="card p-7">
                  <ul className="divide-y divide-line">
                    {dest.documents.map((doc, i) => (
                      <li key={i} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                        <CheckCircle2 className="w-5 h-5 text-mint-500 shrink-0 mt-0.5" />
                        <span className="text-slate-text text-[0.97rem] leading-relaxed">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {dest.faqs?.length > 0 && (
        <section className="py-20 bg-white border-t border-line">
          <div className="container-app grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <span className="pill bg-coral-50 text-coral-600">Frequently asked</span>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink-900 mt-4 leading-[1.05]">
                {dest.name} visa — FAQs.
              </h2>
              <p className="text-slate-muted mt-4">
                Still need clarity? <a href="https://wa.me/918200918967" className="text-coral-500 font-medium">Message us</a> — most answers in under 15 minutes.
              </p>
            </div>
            <div className="lg:col-span-8 space-y-3">
              {dest.faqs.map((f, i) => (
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
      )}

      {/* Apply / Inquiry */}
      <section id="apply" className="py-20 mesh-warm border-t border-line">
        <div className="container-app">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <span className="pill bg-white border border-line text-ink-900">
                <Sparkles className="w-3.5 h-3.5 text-coral-500" /> Apply now
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink-900 mt-4 leading-[1.05]">
                Begin your {dest.name} visa.
              </h2>
              <p className="text-slate-muted mt-4">
                Drop your details — a Travlys specialist comes back within a working day with a route, fee breakdown and earliest possible appointment dates.
              </p>
            </div>
            <div className="lg:col-span-7">
              <InquiryForm defaultDestination={dest.name} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-20 bg-ink-950 text-white relative overflow-hidden">
        <HeroBlobs className="opacity-60" />
        <div className="relative z-10 container-app text-center">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold leading-tight">
            Speak to a {dest.name} visa specialist.
          </h2>
          <p className="text-white/70 mt-3 max-w-xl mx-auto">
            We’ve filed this one hundreds of times. Save yourself the back-and-forth.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-7 justify-center">
            <a href="https://wa.me/918200918967" className="btn btn-coral">
              <MessageCircle className="w-4 h-4" /> WhatsApp now
            </a>
            <a href="tel:+918200918967" className="btn btn-on-dark">
              <Phone className="w-4 h-4" /> +91 82009 18967
            </a>
          </div>
        </div>
      </section>

      {/* Related destinations */}
      {related.length > 0 && (
        <section className="py-20 bg-sand-50 border-t border-line">
          <div className="container-app">
            <div className="flex items-end justify-between mb-8 gap-4">
              <div>
                <span className="pill bg-coral-50 text-coral-600">More countries</span>
                <h2 className="font-display text-3xl md:text-4xl font-extrabold text-ink-900 mt-3 leading-tight">
                  Often booked alongside {dest.name}.
                </h2>
              </div>
              <Link to="/#destinations" className="hidden md:inline-flex btn btn-ghost">
                See all <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <StaggerContainer
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
              stagger={0.04}
            >
              {related.map((r) => (
                <StaggerItem key={r.slug}>
                  <Link
                    to={`/visa/${r.slug}`}
                    className="card overflow-hidden no-underline block group"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-sand-100">
                      <img
                        src={r.image}
                        alt={r.name}
                        loading="lazy"
                        className="country-card-img w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <p className="font-semibold text-ink-900 text-sm leading-tight flex items-center gap-1.5">
                        <span aria-hidden>{r.flag}</span> {r.name}
                      </p>
                      <p className="text-xs text-slate-muted mt-0.5">{r.price}</p>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}
    </motion.div>
  )
}
