import { Star, Quote } from 'lucide-react'
import AnimatedSection, { StaggerContainer, StaggerItem } from './AnimatedSection'
import { reviews } from '../data/reviews'

function Stars({ value }) {
  return (
    <div className="flex gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className="w-4 h-4"
          fill={i <= value ? '#f5a524' : 'transparent'}
          stroke={i <= value ? '#f5a524' : 'rgba(0,0,0,0.18)'}
          strokeWidth={1.5}
        />
      ))}
    </div>
  )
}

export default function Reviews() {
  if (!reviews?.length) return null

  return (
    <section className="py-24 bg-white border-t border-line">
      <div className="container-app">
        <AnimatedSection className="max-w-3xl mb-14">
          <span className="pill bg-coral-50 text-coral-600">
            <Star className="w-3.5 h-3.5 fill-current" /> What travelers say
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink-900 mt-5 leading-[1.05]">
            Real travelers. Real visa wins.
          </h2>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.07}>
          {reviews.map((r, i) => (
            <StaggerItem key={i}>
              <article
                className="card p-7 h-full flex flex-col"
                itemScope
                itemType="https://schema.org/Review"
              >
                <Quote className="w-7 h-7 text-coral-500 mb-3" />
                <Stars value={r.rating} />
                <p
                  className="text-slate-text text-[0.97rem] leading-relaxed mt-4 mb-6 flex-1"
                  itemProp="reviewBody"
                >
                  “{r.text}”
                </p>
                <div className="flex items-baseline justify-between gap-3">
                  <span
                    className="font-semibold text-ink-900"
                    itemProp="author"
                    itemScope
                    itemType="https://schema.org/Person"
                  >
                    <span itemProp="name">{r.author}</span>
                  </span>
                  {r.destination && (
                    <span className="pill bg-sand-100 text-slate-muted">
                      {r.destination}
                    </span>
                  )}
                </div>
                {r.location && (
                  <p className="text-xs text-slate-faint mt-1">{r.location}</p>
                )}
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
