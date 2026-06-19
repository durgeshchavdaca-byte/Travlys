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

        <div className="max-w-3xl mx-auto space-y-8">
          {FEATURED_TESTIMONIALS.map((t, i) => (
            <AnimatedSection key={t.slug} delay={i * 0.1}>
              <article
                className="card p-8 md:p-10 relative"
                itemScope
                itemType="https://schema.org/Review"
              >
                {/* Big decorative quote glyph */}
                <Quote
                  className="absolute top-6 right-6 w-12 h-12"
                  style={{ color: 'rgba(255, 120, 73, 0.18)' }}
                  aria-hidden
                />

                {/* The quote — supports either a single string or an array of
                    paragraphs for testimonials with natural breaks. */}
                <blockquote
                  className="font-display font-medium text-ink-900 leading-[1.35]"
                  style={{
                    fontSize: 'clamp(1.15rem, 2.1vw, 1.55rem)',
                    letterSpacing: '-0.012em',
                  }}
                  itemProp="reviewBody"
                >
                  {Array.isArray(t.quote) ? (
                    t.quote.map((para, j) => (
                      <p key={j} className={j === 0 ? '' : 'mt-4'}>
                        {j === 0 ? `"${para}` : para}
                        {j === t.quote.length - 1 ? '"' : ''}
                      </p>
                    ))
                  ) : (
                    <>"{t.quote}"</>
                  )}
                </blockquote>

                {t.pullQuote && (
                  <p
                    className="font-display italic text-coral-600 mt-6"
                    style={{
                      fontSize: 'clamp(1.25rem, 2.4vw, 1.7rem)',
                      letterSpacing: '-0.018em',
                    }}
                  >
                    "{t.pullQuote}"
                  </p>
                )}

                {/* Attribution row, LinkedIn-style: round avatar + name + role */}
                <div className="mt-8 pt-7 border-t border-line flex flex-wrap sm:flex-nowrap items-start sm:items-center gap-4 sm:gap-5">
                  <RoundAvatar
                    src={t.image}
                    initials={t.initials}
                    name={t.name}
                    accent={t.accent}
                    size={64}
                  />

                  <div className="flex-1 min-w-0">
                    <p
                      className="font-display text-lg font-extrabold text-ink-900 leading-tight"
                      itemProp="author"
                      itemScope
                      itemType="https://schema.org/Person"
                    >
                      <span itemProp="name">{t.name}</span>
                    </p>
                    <p className="text-sm text-slate-text mt-0.5">
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
                    {t.companyOneLiner && (
                      <p className="text-xs text-slate-muted mt-1.5 leading-relaxed">
                        {t.companyOneLiner}
                      </p>
                    )}
                  </div>

                  {t.companyUrl && (
                    <a
                      href={t.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold no-underline transition-colors shrink-0 px-3 py-2 rounded-full border"
                      style={{
                        color: t.accent,
                        borderColor: `${t.accent}33`,
                        background: `${t.accent}0a`,
                      }}
                      aria-label={`Visit ${t.company}`}
                    >
                      Visit {t.company}
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
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
