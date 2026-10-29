import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, BookOpen, MessageCircle } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { HeroBlobs, TextReveal } from '../components/MotionGraphics'
import SEO from '../components/SEO'
import { GLOSSARY_META, GLOSSARY, termId, buildGlossarySchemas } from '../seo/pages'

const groupId = (g) => g.group.toLowerCase().replace(/[^a-z0-9]+/g, '-')

// Every definition is printed in full (no accordions), each with its own
// anchor, so a link or an AI citation can point straight at one term.
export default function VisaGlossaryPage() {
  const total = GLOSSARY.reduce((n, g) => n + g.terms.length, 0)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      <SEO {...GLOSSARY_META} jsonLd={buildGlossarySchemas()} />

      {/* HERO */}
      <section className="relative pt-32 pb-14 md:pt-40 md:pb-16 overflow-hidden mesh-warm">
        <HeroBlobs />
        <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
        <div className="relative z-10 container-app">
          <div className="max-w-3xl">
            <span className="pill bg-white border border-line text-ink-900">
              <BookOpen className="w-3.5 h-3.5 text-coral-500" /> {total} terms
            </span>
            <h1 className="font-display text-[2.4rem] sm:text-5xl md:text-[3.4rem] font-extrabold text-ink-900 mt-5 leading-[1.05]">
              <TextReveal text="Visa terms," as="span" />
              <br />
              <span className="hero-italic-mark">
                <span className="relative italic text-ink-900">explained simply.</span>
              </span>
            </h1>
            <p className="text-slate-muted mt-5 text-[1.05rem] max-w-2xl leading-relaxed">
              What VFS, 221(g), the 90/180 rule, OK to Board and other visa words actually
              mean for an Indian passport holder. Each term links to the full Travlys guide.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-sand-50 border-t border-line">
        <div className="container-app grid grid-cols-1 lg:grid-cols-12 gap-12">
          <nav aria-label="Topics" className="lg:col-span-3 lg:sticky lg:top-28 lg:self-start">
            <p className="text-[0.7rem] uppercase tracking-[0.18em] font-semibold text-coral-600 mb-3">Topics</p>
            <ul className="list-none p-0 m-0 space-y-1.5 text-sm">
              {GLOSSARY.map((g) => (
                <li key={g.group}>
                  <a href={`#${groupId(g)}`} className="text-slate-text hover:text-coral-600 no-underline">
                    {g.group} <span className="text-slate-faint">({g.terms.length})</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-9 space-y-14">
            {GLOSSARY.map((g) => (
              <AnimatedSection key={g.group}>
                <section id={groupId(g)} className="scroll-mt-28">
                  <h2 className="font-display text-2xl md:text-3xl font-extrabold text-ink-900 m-0 border-b border-line pb-3">{g.group}</h2>
                  <dl className="mt-2 m-0">
                    {g.terms.map((t) => (
                      <div key={t.term} id={termId(t)} className="py-5 border-b border-line last:border-b-0 scroll-mt-28">
                        <dt className="font-display text-lg font-bold text-ink-900 leading-snug">{t.term}</dt>
                        <dd className="m-0 mt-2">
                          <p className="text-slate-muted text-[0.97rem] leading-relaxed m-0">{t.definition}</p>
                          <Link to={t.href} className="mt-2 text-sm font-medium text-coral-600 no-underline inline-flex items-center gap-1">
                            Read more <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              </AnimatedSection>
            ))}

            <div className="card p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div>
                <h2 className="font-display text-xl font-extrabold text-ink-900 m-0">Still confused by a visa term?</h2>
                <p className="text-slate-muted mt-1 m-0">Send it on WhatsApp and a Travlys specialist will explain what it means for your application.</p>
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
