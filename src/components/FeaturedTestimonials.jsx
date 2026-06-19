import { useState } from 'react'
import { Quote, Star, ArrowUpRight } from 'lucide-react'
import AnimatedSection from './AnimatedSection'
import { FEATURED_TESTIMONIALS } from '../data/testimonials'

function RoundAvatar({ src, initials, name, accent, size = 64 }) {
  const [failed, setFailed] = useState(false)
  const dim = { width: `${size}px`, height: `${size}px` }

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={`${name} portrait`}
        width={size}
        height={size}
        style={{
          ...dim,
          objectFit: 'cover',
          objectPosition: 'center top',
          borderRadius: '9999px',
          border: '3px solid #ffffff',
          boxShadow: `0 0 0 2px ${accent}, 0 8px 24px rgba(15, 27, 76, 0.18)`,
        }}
        onError={() => setFailed(true)}
        loading="lazy"
        decoding="async"
        className="shrink-0"
      />
    )
  }
  return (
    <div
      className="shrink-0 flex items-center justify-center font-display font-extrabold text-white"
      style={{
        ...dim,
        borderRadius: '9999px',
        background: `linear-gradient(135deg, ${accent} 0%, #0F1B4C 100%)`,
        border: '3px solid #ffffff',
        boxShadow: `0 0 0 2px ${accent}, 0 8px 24px rgba(15, 27, 76, 0.18)`,
        fontSize: `${Math.round(size * 0.38)}px`,
        letterSpacing: '-0.04em',
        lineHeight: 1,
      }}
    >
      {initials}
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
        <AnimatedSection className="max-w-3xl mb-12 text-center mx-auto">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
          {FEATURED_TESTIMONIALS.map((t, i) => (
            <AnimatedSection key={t.slug} delay={i * 0.1} className="h-full">
              <article
                className="card p-6 md:p-7 relative h-full flex flex-col"
                itemScope
                itemType="https://schema.org/Review"
              >
                {/* Decorative quote glyph */}
                <Quote
                  className="absolute top-5 right-5 w-9 h-9"
                  style={{ color: 'rgba(255, 120, 73, 0.18)' }}
                  aria-hidden
                />

                {/* The quote — array or string */}
                <blockquote
                  className="font-display font-medium text-ink-900 leading-[1.4] flex-1"
                  style={{
                    fontSize: 'clamp(0.97rem, 1.25vw, 1.08rem)',
                    letterSpacing: '-0.008em',
                  }}
                  itemProp="reviewBody"
                >
                  {Array.isArray(t.quote) ? (
                    t.quote.map((para, j) => (
                      <p key={j} className={j === 0 ? '' : 'mt-3'}>
                        {j === 0 ? `"${para}` : para}
                        {j === t.quote.length - 1 ? '"' : ''}
                      </p>
                    ))
                  ) : (
                    <p>"{t.quote}"</p>
                  )}
                </blockquote>

                {t.pullQuote && (
                  <p
                    className="font-display italic text-coral-600 mt-5"
                    style={{
                      fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)',
                      letterSpacing: '-0.014em',
                    }}
                  >
                    "{t.pullQuote}"
                  </p>
                )}

                {/* Attribution */}
                <div className="mt-6 pt-5 border-t border-line flex items-start gap-3">
                  <RoundAvatar
                    src={t.image}
                    initials={t.initials}
                    name={t.name}
                    accent={t.accent}
                    size={52}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p
                          className="font-display text-[1rem] font-extrabold text-ink-900 leading-tight"
                          itemProp="author"
                          itemScope
                          itemType="https://schema.org/Person"
                        >
                          <span itemProp="name">{t.name}</span>
                        </p>
                        <p className="text-[0.78rem] text-slate-text mt-0.5">
                          <span className="font-semibold">{t.role}</span>
                          {t.company ? (
                            <>
                              ,{' '}
                              <span
                                className="font-semibold"
                                style={{ color: t.accent }}
                              >
                                {t.company}
                              </span>
                            </>
                          ) : null}
                        </p>
                      </div>

                      {t.companyUrl && (
                        <a
                          href={t.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[0.68rem] font-semibold no-underline transition-colors shrink-0 px-2.5 py-1.5 rounded-full border"
                          style={{
                            color: t.accent,
                            borderColor: `${t.accent}33`,
                            background: `${t.accent}0a`,
                          }}
                          aria-label={`Visit ${t.company}`}
                        >
                          Visit
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    {t.companyOneLiner && (
                      <p className="text-[0.72rem] text-slate-muted mt-1.5 leading-snug">
                        {t.companyOneLiner}
                      </p>
                    )}
                  </div>
                </div>

                {/* Hidden microdata */}
                <meta itemProp="reviewRating" content="5" />
                <meta itemProp="datePublished" content={t.date} />
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
