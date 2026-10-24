import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, MessageCircle, Search } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { HeroBlobs, TextReveal } from '../components/MotionGraphics'
import SEO from '../components/SEO'
import { QUESTIONS_META, getQuestionGroups, buildQuestionsSchemas } from '../seo/pages'

// Every answer is printed open (no accordions) so readers, search engines
// and AI assistants all see the full text without a click.
export default function VisaQuestionsPage() {
  const groups = getQuestionGroups()
  const total = groups.reduce((n, g) => n + g.faqs.length, 0)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      <SEO {...QUESTIONS_META} jsonLd={buildQuestionsSchemas()} />

      {/* HERO */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden mesh-warm">
        <HeroBlobs />
        <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
        <div className="relative z-10 container-app">
          <div className="max-w-3xl">
            <span className="pill bg-white border border-line text-ink-900">
              <Search className="w-3.5 h-3.5 text-coral-500" /> {total} answers
            </span>
            <h1 className="font-display text-[2.6rem] sm:text-5xl md:text-[3.6rem] font-extrabold text-ink-900 mt-5 leading-[1.05]">
              <TextReveal text="Visa questions," as="span" />
              <br />
              <span className="hero-italic-mark">
                <span className="relative italic text-ink-900">answered.</span>
              </span>
            </h1>
            <p className="text-slate-muted mt-5 text-[1.05rem] max-w-2xl leading-relaxed">
              Short, direct answers to what Indian travelers ask us most: cost,
              processing time, documents, interviews and refusals, for every
              country Travlys files. Each answer links to the full guide.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-sand-50 border-t border-line">
        <div className="container-app grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Topic index */}
          <nav aria-label="Topics" className="lg:col-span-3 lg:sticky lg:top-28 lg:self-start">
            <p className="text-[0.7rem] uppercase tracking-[0.18em] font-semibold text-coral-600 mb-3">Topics</p>
            <ul className="list-none p-0 m-0 space-y-1.5 text-sm">
              {groups.map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`} className="text-slate-text hover:text-coral-600 no-underline">
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-9 space-y-14">
            {groups.map((g) => (
              <AnimatedSection key={g.id}>
                <section id={g.id} className="scroll-mt-28">
                  <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                    <h2 className="font-display text-2xl md:text-3xl font-extrabold text-ink-900 m-0">{g.title}</h2>
                    {g.href && (
                      <Link to={g.href} className="text-sm font-medium text-coral-600 no-underline inline-flex items-center gap-1 shrink-0">
                        Full guide <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                  <div className="mt-2">
                    {g.faqs.map((f) => (
                      <article key={f.q} className="py-5 border-b border-line last:border-b-0">
                        <h3 className="font-display text-lg font-bold text-ink-900 m-0 leading-snug">{f.q}</h3>
                        <p className="text-slate-muted mt-2 text-[0.97rem] leading-relaxed m-0">{f.a}</p>
                      </article>
                    ))}
                  </div>
                </section>
              </AnimatedSection>
            ))}

            <div className="card p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div>
                <h2 className="font-display text-xl font-extrabold text-ink-900 m-0">Don't see your question?</h2>
                <p className="text-slate-muted mt-1 m-0">WhatsApp a Travlys specialist, most replies within 15 minutes in working hours.</p>
              </div>
              <a href="https://wa.me/918200918967" className="btn btn-primary no-underline inline-flex items-center gap-2 shrink-0">
                <MessageCircle className="w-4 h-4" /> Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
