import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, CalendarClock, ExternalLink, MessageCircle, Newspaper } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { HeroBlobs, TextReveal } from '../components/MotionGraphics'
import SEO from '../components/SEO'
import { NEWS_UPDATED, getNewsByMonth, getUpcomingNews, formatNewsDate } from '../data/travelNews'
import { NEWS_META, getNewsFaqs, buildNewsSchemas, newsAnchor } from '../seo/pages'

// Every item is printed in full with its date and source, so readers, search
// engines and AI assistants see what changed and when without a click.
export default function TravelNewsPage() {
  const months = getNewsByMonth()
  const upcoming = getUpcomingNews()
  const faqs = getNewsFaqs()

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      <SEO {...NEWS_META} jsonLd={buildNewsSchemas()} />

      {/* HERO */}
      <section className="relative pt-32 pb-14 md:pt-40 md:pb-16 overflow-hidden mesh-warm">
        <HeroBlobs />
        <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
        <div className="relative z-10 container-app">
          <div className="max-w-3xl">
            <span className="pill bg-white border border-line text-ink-900">
              <Newspaper className="w-3.5 h-3.5 text-coral-500" /> Updated {formatNewsDate(NEWS_UPDATED)}
            </span>
            <h1 className="font-display text-[2.4rem] sm:text-5xl md:text-[3.4rem] font-extrabold text-ink-900 mt-5 leading-[1.05]">
              <TextReveal text="Visa and travel news" as="span" />
              <br />
              <span className="hero-italic-mark">
                <span className="relative italic text-ink-900">for Indians.</span>
              </span>
            </h1>
            <p className="text-slate-muted mt-5 text-[1.05rem] max-w-2xl leading-relaxed">
              Every visa and entry rule change that matters to Indian passport
              holders, newest first. Each item has its date, the official
              source, and a full guide on what to do next.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-sand-50 border-t border-line">
        <div className="container-app grid grid-cols-1 lg:grid-cols-12 gap-12">
          <nav aria-label="Months" className="lg:col-span-3 lg:sticky lg:top-28 lg:self-start">
            <p className="text-[0.7rem] uppercase tracking-[0.18em] font-semibold text-coral-600 mb-3">By month</p>
            <ul className="list-none p-0 m-0 space-y-1.5 text-sm">
              {upcoming.length > 0 && (
                <li>
                  <a href="#coming-up" className="text-slate-text hover:text-coral-600 no-underline">
                    Coming up <span className="text-slate-faint">({upcoming.length})</span>
                  </a>
                </li>
              )}
              {months.map((m) => (
                <li key={m.id}>
                  <a href={`#${m.id}`} className="text-slate-text hover:text-coral-600 no-underline">
                    {m.label} <span className="text-slate-faint">({m.items.length})</span>
                  </a>
                </li>
              ))}
            </ul>
            <Link
              to="/blog/visa-rule-changes-for-indians-2026-tracker/"
              className="mt-6 text-sm font-medium text-coral-600 no-underline inline-flex items-center gap-1"
            >
              Full 2026 rule tracker <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </nav>

          <div className="lg:col-span-9 space-y-12">
            {upcoming.length > 0 && (
              <section id="coming-up" className="scroll-mt-28 card p-6 md:p-8">
                <h2 className="font-display text-2xl md:text-3xl font-extrabold text-ink-900 m-0 flex items-center gap-3">
                  <CalendarClock className="w-6 h-6 text-coral-500" /> Coming up
                </h2>
                <p className="text-slate-muted mt-2 mb-0 text-[0.97rem]">Announced changes that have not started yet. Plan around these dates.</p>
                <div className="mt-2">
                  {upcoming.map((n) => (
                    <NewsItem key={newsAnchor(n)} n={n} label="Due" />
                  ))}
                </div>
              </section>
            )}
            {months.map((m) => (
              <AnimatedSection key={m.id}>
                <section id={m.id} className="scroll-mt-28">
                  <h2 className="font-display text-2xl md:text-3xl font-extrabold text-ink-900 m-0 border-b border-line pb-3">
                    {m.label}
                  </h2>
                  <div className="mt-2">
                    {m.items.map((n) => (
                      <NewsItem key={newsAnchor(n)} n={n} />
                    ))}
                  </div>
                </section>
              </AnimatedSection>
            ))}

            <section>
              <h2 className="font-display text-2xl font-extrabold text-ink-900 m-0">About this page</h2>
              <div className="mt-2">
                {faqs.map((f) => (
                  <article key={f.q} className="py-5 border-b border-line last:border-b-0">
                    <h3 className="font-display text-lg font-bold text-ink-900 m-0 leading-snug">{f.q}</h3>
                    <p className="text-slate-muted mt-2 text-[0.97rem] leading-relaxed m-0">{f.a}</p>
                  </article>
                ))}
              </div>
            </section>

            <div className="card p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div>
                <h2 className="font-display text-xl font-extrabold text-ink-900 m-0">Does a change affect your trip?</h2>
                <p className="text-slate-muted mt-1 m-0">Send your destination and dates on WhatsApp. A Travlys specialist will tell you what applies to you.</p>
              </div>
              <a
                href={`https://wa.me/918200918967?text=${encodeURIComponent('Hi Travlys, I saw your travel news page. Does a recent visa change affect my trip?')}`}
                className="btn btn-primary no-underline inline-flex items-center gap-2 shrink-0"
              >
                <MessageCircle className="w-4 h-4" /> Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}

function NewsItem({ n, label }) {
  return (
    <article
      id={newsAnchor(n)}
      className="py-6 border-b border-line last:border-b-0 scroll-mt-28 grid grid-cols-1 sm:grid-cols-[7.5rem_1fr] gap-x-6 gap-y-2"
    >
      <time dateTime={n.date} className="text-sm font-semibold text-coral-600 pt-0.5">
        {label ? `${label} ` : ''}
        {formatNewsDate(n.date, { day: 'numeric', month: 'short', year: 'numeric' })}
      </time>
      <div>
        <h3 className="font-display text-lg md:text-xl font-bold text-ink-900 m-0 leading-snug">{n.headline}</h3>
        <p className="text-slate-muted mt-2 text-[0.97rem] leading-relaxed m-0">{n.summary}</p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-3 text-sm">
          <Link to={n.href} className="font-medium text-ink-900 hover:text-coral-600 no-underline inline-flex items-center gap-1">
            Read the guide <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href={n.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-muted hover:text-coral-600 no-underline inline-flex items-center gap-1"
          >
            Source: {n.source.label} <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </article>
  )
}
