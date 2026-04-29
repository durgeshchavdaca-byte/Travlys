import { Star } from 'lucide-react'
import AnimatedSection, { StaggerContainer, StaggerItem } from './AnimatedSection'
import { reviews } from '../data/reviews'

// Visible reviews section. Renders nothing when there are no reviews
// in src/data/reviews.js — so the section disappears entirely until
// you start adding real testimonials. The matching Review JSON-LD
// is emitted by buildHomeSchemas() so star ratings can show in SERP.

function Stars({ value }) {
  return (
    <div className="flex gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className="w-4 h-4"
          fill={i <= value ? '#d4af37' : 'transparent'}
          stroke={i <= value ? '#d4af37' : 'rgba(0,0,0,0.15)'}
          strokeWidth={1.5}
        />
      ))}
    </div>
  )
}

export default function Reviews() {
  if (!reviews?.length) return null

  return (
    <section className="py-32 bg-cream-50 border-t border-cream-200/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <AnimatedSection>
            <p
              className="text-gold-500 text-[10px] uppercase tracking-[0.4em] font-medium mb-6"
              style={{ fontFamily: 'var(--font-family-accent)' }}
            >
              What Travelers Say
            </p>
          </AnimatedSection>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-navy-900 italic">
            Trusted by Indian Travelers
          </h2>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.08}>
          {reviews.map((r, i) => (
            <StaggerItem key={i}>
              <article
                className="h-full bg-white rounded-2xl p-6 border border-cream-200/50 shadow-sm"
                itemScope
                itemType="https://schema.org/Review"
              >
                <Stars value={r.rating} />
                <p className="text-body text-sm leading-[1.8] mt-4 mb-6" itemProp="reviewBody">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="flex items-baseline justify-between">
                  <span
                    className="font-heading text-base text-navy-900 italic"
                    itemProp="author"
                    itemScope
                    itemType="https://schema.org/Person"
                  >
                    <span itemProp="name">{r.author}</span>
                  </span>
                  {r.destination && (
                    <span
                      className="text-[10px] text-gold-500 uppercase tracking-[0.2em]"
                      style={{ fontFamily: 'var(--font-family-accent)' }}
                    >
                      {r.destination}
                    </span>
                  )}
                </div>
                {r.location && (
                  <p
                    className="text-[11px] text-navy-700/50 mt-1"
                    style={{ fontFamily: 'var(--font-family-accent)' }}
                  >
                    {r.location}
                  </p>
                )}
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
