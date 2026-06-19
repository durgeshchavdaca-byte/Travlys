import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, BookOpen, Clock3, Sparkles } from 'lucide-react'
import AnimatedSection, { StaggerContainer, StaggerItem } from '../components/AnimatedSection'
import { HeroBlobs, TextReveal } from '../components/MotionGraphics'
import { BLOG_POSTS, BLOG_CATEGORIES } from '../data/blog'
import SEO from '../components/SEO'
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from '../seo/config'

// Renders a hero image; on load error, swaps to a clean gradient panel
// so a single broken Unsplash URL never dumps alt text onto the card.
function PostThumb({ src, alt }) {
  const [failed, setFailed] = useState(false)
  if (failed || !src) {
    return (
      <div
        aria-hidden
        className="w-full h-full"
        style={{
          background:
            'linear-gradient(135deg, #ffe2d6 0%, #ecc878 50%, #ffd9c2 100%)',
        }}
      />
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="country-card-img w-full h-full object-cover"
    />
  )
}

const indexMeta = {
  title: 'Visa guides and how-tos for Indian travelers | Travlys Blog',
  description:
    'Honest, no-fluff guides from Travlys visa consultants — US visa from India 2026, Schengen checklist, DS-160 mistakes, Dubai visa cost breakdown, and more.',
  path: '/blog',
  keywords:
    'visa guide india, us visa guide india, schengen visa guide, ds-160 mistakes, dubai visa cost, visa rejection india, visa consultant india, travlys blog',
  type: 'website',
  image: DEFAULT_OG_IMAGE,
  imageAlt: 'Travlys editorial — visa guides for Indian travelers',
}

function indexSchemas() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': `${SITE_URL}/blog#blog`,
      url: `${SITE_URL}/blog`,
      name: `${SITE_NAME} editorial`,
      description: indexMeta.description,
      publisher: { '@id': `${SITE_URL}/#organization` },
      blogPost: BLOG_POSTS.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.title,
        url: `${SITE_URL}/blog/${p.slug}`,
        datePublished: p.date,
        author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL + '/' },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      ],
    },
  ]
}

export default function BlogIndexPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      <SEO {...indexMeta} jsonLd={indexSchemas()} />

      {/* HERO */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden mesh-warm">
        <HeroBlobs />
        <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />

        <div className="relative z-10 container-app">
          <div className="max-w-3xl">
            <span className="pill bg-white border border-line text-ink-900">
              <BookOpen className="w-3.5 h-3.5 text-coral-500" /> Editorial
            </span>
            <h1 className="font-display text-[2.6rem] sm:text-5xl md:text-[3.6rem] font-extrabold text-ink-900 mt-5 leading-[1.05]">
              <TextReveal text="Visa guides," as="span" />
              <br />
              <span className="hero-italic-mark">
                <span className="relative italic text-ink-900">without the fluff.</span>
              </span>
            </h1>
            <p className="text-slate-muted mt-5 text-[1.05rem] max-w-2xl leading-relaxed">
              Honest, no-fluff guides from the Travlys consulting team —
              written for Indian travelers who want to know what actually
              decides a visa, not a recycled embassy press release.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 bg-white border-y border-line">
        <div className="container-app flex items-center gap-3 overflow-x-auto no-scrollbar">
          <span className="text-xs uppercase tracking-widest text-slate-faint font-semibold shrink-0">Categories</span>
          {BLOG_CATEGORIES.map((c) => (
            <span key={c} className="chip text-xs whitespace-nowrap">{c}</span>
          ))}
        </div>
      </section>

      {/* Post grid */}
      <section className="py-20 bg-sand-50">
        <div className="container-app">
          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            stagger={0.05}
          >
            {BLOG_POSTS.map((p) => (
              <StaggerItem key={p.slug}>
                <Link
                  to={`/blog/${p.slug}`}
                  className="card overflow-hidden no-underline block h-full group flex flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-sand-100">
                    <PostThumb src={p.heroImage} alt={p.title} />
                    <span className="absolute top-3 left-3 pill bg-white/95 text-ink-900 text-[0.7rem]">
                      {p.category}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h2 className="font-display text-lg font-extrabold text-ink-900 leading-tight line-clamp-2">
                      {p.title}
                    </h2>
                    <p className="text-sm text-slate-muted mt-2 line-clamp-3 leading-relaxed">{p.excerpt}</p>
                    <div className="flex items-center justify-between gap-2 mt-4 pt-4 border-t border-line">
                      <span className="text-xs text-slate-faint flex items-center gap-1.5">
                        <Clock3 className="w-3 h-3" /> {p.readMinutes} min read
                      </span>
                      <span className="text-xs font-semibold text-coral-500 flex items-center gap-1">
                        Read <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-line">
        <div className="container-app text-center max-w-2xl mx-auto">
          <span className="pill bg-coral-50 text-coral-600">
            <Sparkles className="w-3.5 h-3.5" /> Need help with your visa?
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-ink-900 mt-4 leading-tight">
            Reading is great. Filing is what gets you on the flight.
          </h2>
          <p className="text-slate-muted mt-4">
            Brief us in 60 seconds and a specialist comes back within
            a working day with a route, timeline and quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-7 justify-center">
            <a href="https://wa.me/918200918967" className="btn btn-coral">WhatsApp a specialist</a>
            <Link to="/" className="btn btn-ghost">Pick a country</Link>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
