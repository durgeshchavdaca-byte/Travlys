import { useState } from 'react'
import { Quote, Star, ArrowUpRight } from 'lucide-react'
import AnimatedSection from './AnimatedSection'
import { FEATURED_TESTIMONIALS } from '../data/testimonials'

function PortraitOrInitials({ src, initials, name, accent }) {
  const [failed, setFailed] = useState(false)
  if (src && !failed) {
    return (
      <img
        src={src}
        alt={`${name} portrait`}
        className="w-full h-full object-cover"
        onError={() => setFailed(true)}
        loading="lazy"
      />
    )
  }
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        background: `linear-gradient(135deg, ${accent} 0%, #0F1B4C 100%)`,
      }}
    >
      <span
        className="font-display font-extrabold text-white"
        style={{
          fontSize: 'min(7rem, 28vw)',
          letterSpacing: '-0.04em',
          lineHeight: 1,
        }}
      >
        {initials}
      </span>
    </div>
  )
}

export default function FeaturedTestimonials() {
  if (!FEATURED_TESTIMONIALS?.length) return null

  return (
    <section className="py-24 bg-white border-t border-line relative overflow-hidden">
      {/* Decorative coral blur */}
      <div
        aria-hidden
        className="absolute -top-32 -right-24 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 120, 73, 0.10), transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="container-app relative z-10">
        <AnimatedSection className="max-w-3xl mb-12">
          <span className="pill bg-coral-50 text-coral-600">
            <Star className="w-3.5 h-3.5 fill-current" /> Founders speak
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink-900 mt-5 leading-[1.05]">
            Builders and founders who picked Travlys.
          </h2>
          <p className="text-slate-muted mt-4 text-[1.05rem]">
            When the people running fast-moving Indian startups need their
            visas sorted, they don't want a process. They want it handled.
          </p>
        </AnimatedSection>

        {FEATURED_TESTIMONIALS.map((t, i) => (
          <AnimatedSection key={t.slug} delay={i * 0.1}>
            <article
              className="card overflow-hidden p-0 grid grid-cols-1 lg:grid-cols-12 gap-0 mb-10 last:mb-0"
              itemScope
              itemType="https://schema.org/Review"
            >
              {/* Portrait column */}
              <div className="lg:col-span-4 relative bg-sand-100 aspect-[4/5] lg:aspect-auto lg:min-h-[520px]">
                <PortraitOrInitials
                  src={t.image}
                  initials={t.initials}
                  name={t.name}
                  accent={t.accent}
                />
                {/* Coral accent strip on the edge of the portrait */}
                <span
                  aria-hidden
                  className="absolute inset-y-0 right-0 w-[3px]"
                  style={{
                    background:
                      'linear-gradient(180deg, transparent, #FF7849 35%, #ECC878 65%, transparent)',
                  }}
                />
              </div>

              {/* Quote column */}
              <div className="lg:col-span-8 p-8 md:p-12 lg:p-14 flex flex-col justify-between">
                <div>
                  <Quote className="w-10 h-10 text-coral-500" />
                  <blockquote
                    className="font-display font-medium text-ink-900 mt-6 leading-[1.3]"
                    style={{
                      fontSize: 'clamp(1.3rem, 2.4vw, 1.85rem)',
                      letterSpacing: '-0.012em',
                    }}
                    itemProp="reviewBody"
                  >
                    "{t.quote}"
                  </blockquote>

                  {t.pullQuote && (
                    <p
                      className="font-display italic text-coral-600 mt-6"
                      style={{
                        fontSize: 'clamp(1.4rem, 3vw, 2.1rem)',
                        letterSpacing: '-0.018em',
                      }}
                    >
                      "{t.pullQuote}"
                    </p>
                  )}
                </div>

                {/* Attribution */}
                <div className="mt-10 pt-8 border-t border-line flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
                  <div>
                    <p
                      className="font-display text-xl font-extrabold text-ink-900 leading-tight"
                      itemProp="author"
                      itemScope
                      itemType="https://schema.org/Person"
                    >
                      <span itemProp="name">{t.name}</span>
                    </p>
                    <p className="text-sm text-slate-muted mt-1">
                      <span className="font-semibold text-ink-900">{t.role}</span>
                      {t.company ? <>, <span style={{ color: t.accent }} className="font-semibold">{t.company}</span></> : null}
                    </p>
                    {t.companyOneLiner && (
                      <p className="text-xs text-slate-muted mt-2 max-w-md leading-relaxed">
                        <span
                          className="font-semibold"
                          style={{ color: t.accent }}
                        >
                          About {t.company}:
                        </span>{' '}
                        {t.companyOneLiner}
                      </p>
                    )}
                  </div>

                  {t.companyUrl && (
                    <a
                      href={t.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold no-underline transition-colors shrink-0"
                      style={{ color: t.accent }}
                    >
                      Visit {t.company}
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {/* Hidden microdata */}
                <meta itemProp="reviewRating" content="5" />
                <meta itemProp="datePublished" content={t.date} />
              </div>
            </article>
          </AnimatedSection>
        ))}
      </div>
    </section>
  )
}
