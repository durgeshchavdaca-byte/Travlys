import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Phone, MessageCircle, ChevronRight, Plane } from 'lucide-react'
import AnimatedSection, { StaggerContainer, StaggerItem } from '../components/AnimatedSection'
import { GradientOrbs, TwinklingStars, PassportStamp, FloatingIcons } from '../components/MotionGraphics'
import { destinations } from '../data/destinations'
import SEO, { SITE_URL } from '../components/SEO'

export default function VisaPage() {
  const { slug } = useParams()
  const dest = destinations.find(d => d.slug === slug)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!dest) {
    return (
      <>
        <SEO
          title="Destination Not Found"
          description="The visa destination you're looking for could not be found. Browse Travlys visa services for the USA, UK, Canada, Australia, Schengen and more."
          path={`/visa/${slug || ''}`}
          noindex
        />
        <div className="min-h-[60vh] flex items-center justify-center bg-cream-50">
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold text-navy-900 mb-4">Destination Not Found</h1>
            <Link to="/" className="text-gold-500 hover:text-gold-400 underline">Go back home</Link>
          </div>
        </div>
      </>
    )
  }

  const related = dest.relatedDestinations
    .map(s => destinations.find(d => d.slug === s))
    .filter(Boolean)

  const pagePath = `/visa/${dest.slug}`
  const heroImage = dest.image.replace('w=600&h=400', 'w=1200&h=630')

  const visaSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Visa Destinations', item: `${SITE_URL}/#featured` },
        { '@type': 'ListItem', position: 3, name: `${dest.name} Visa`, item: `${SITE_URL}${pagePath}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${SITE_URL}${pagePath}#service`,
      serviceType: `${dest.name} Visa Assistance`,
      name: `${dest.name} Visa Assistance for Indian Citizens`,
      description: dest.description,
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: { '@type': 'Country', name: 'India' },
      audience: { '@type': 'PeopleAudience', name: 'Indian passport holders' },
      url: `${SITE_URL}${pagePath}`,
      image: heroImage,
      ...(dest.priceValue
        ? {
            offers: {
              '@type': 'Offer',
              price: String(dest.priceValue),
              priceCurrency: dest.currency || 'INR',
              availability: 'https://schema.org/InStock',
              url: `${SITE_URL}${pagePath}`,
            },
          }
        : {}),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${dest.name} Visa Categories`,
        itemListElement: (dest.categories || []).map((c) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: c.name,
            description: c.description,
          },
        })),
      },
    },
    ...(dest.faqs?.length
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: dest.faqs.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          },
        ]
      : []),
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <SEO
        title={dest.metaTitle || `${dest.name} Visa for Indian Citizens`}
        description={dest.metaDescription || dest.description}
        path={pagePath}
        keywords={dest.keywords}
        image={heroImage}
        imageAlt={`${dest.name} visa assistance by Travlys`}
        type="article"
        jsonLd={visaSchemas}
      />

      {/* Breadcrumb */}
      <nav className="bg-cream-50 py-3 px-4 border-b border-cream-200/50">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm pt-20">
          <Link to="/" className="hover:text-gold-500 no-underline text-body transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-gold-500/50" />
          <span className="text-body">Visa Destinations</span>
          <ChevronRight className="w-3 h-3 text-gold-500/50" />
          <span className="font-heading font-semibold text-navy-900">{dest.name} Visa</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[550px] flex items-center overflow-hidden">
        <div className="absolute inset-0" style={{ transform: `translateY(${Math.max(0, (scrollY - 100)) * 0.2}px)` }}>
          <img src={dest.image.replace('w=600&h=400', 'w=1600&h=900')} alt={`${dest.name} skyline — visa assistance for Indian travelers`} fetchPriority="high" className="w-full h-[130%] object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/85 via-navy-900/60 to-navy-900/40" />

        <GradientOrbs />
        <FloatingIcons />
        <div className="absolute bottom-10 right-20 opacity-5 hidden lg:block">
          <Plane className="w-32 h-32 text-gold-400 animate-float" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 glass text-white text-sm rounded-full mb-5">{dest.processingTime}</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{dest.name} Visa Support</motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-lg text-gold-400 font-medium mb-4 font-heading italic">{dest.subtitle}</motion.p>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="text-body-on-dark max-w-2xl mb-8 text-sm leading-relaxed">{dest.description}</motion.p>
          <motion.a initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            href="https://wa.me/918200918967"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-gold-500 to-gold-400 text-navy-900 rounded-full font-semibold hover:from-gold-400 hover:to-gold-300 no-underline transition-all duration-300 shadow-lg shadow-gold-500/20 group">
            Get Visa Guidance <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>

        {/* Wave */}
        <div className="wave-divider">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" fill="#faf8f2">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,120.46,103.47,175.93,87.29,228.16,72,276.3,66,321.39,56.44Z" />
          </svg>
        </div>
      </section>

      {/* About */}
      <section className="py-20 bg-cream-50">
        <AnimatedSection className="max-w-4xl mx-auto px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy-900 mb-6">{dest.aboutTitle}</h2>
          <p className="text-navy-700/60 leading-relaxed text-lg">{dest.aboutText}</p>
        </AnimatedSection>
      </section>

      {/* Visa Categories */}
      {dest.categories?.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <AnimatedSection className="text-center mb-14">
              <p className="text-gold-500 text-sm uppercase tracking-[0.2em] font-semibold mb-3">Visa Categories</p>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy-900">{dest.name} Visa Types</h2>
              <div className="gold-divider" />
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.1}>
              {dest.categories.map((cat, i) => (
                <StaggerItem key={i}>
                  <div className="bg-cream-50 rounded-2xl p-7 border border-cream-200/50 hover:shadow-lg hover:shadow-navy-900/5 transition-all duration-500 group relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-gold-500 to-gold-400 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
                    <h3 className="text-lg font-heading font-semibold text-navy-900 mb-1">{cat.name}</h3>
                    <p className="text-sm text-gold-500 mb-3 font-medium">{cat.purpose}</p>
                    <p className="text-sm text-body leading-relaxed">{cat.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* Process Steps */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-4xl mx-auto px-4">
          <AnimatedSection className="text-center mb-14">
            <p className="text-gold-500 text-sm uppercase tracking-[0.2em] font-semibold mb-3">Application Process</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy-900">How to Apply</h2>
            <div className="gold-divider" />
          </AnimatedSection>

          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-gold-500 via-gold-400 to-gold-500/10 hidden md:block" />
            <StaggerContainer className="space-y-6" stagger={0.1}>
              {dest.processSteps.map((step, i) => (
                <StaggerItem key={i}>
                  <div className="flex items-start gap-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-gold-500 to-gold-400 text-navy-900 rounded-full flex items-center justify-center text-sm font-heading font-bold shrink-0 shadow-lg shadow-gold-500/20 relative z-10">
                      {i + 1}
                    </div>
                    <div className="bg-white rounded-xl p-5 flex-1 hover:shadow-md transition-shadow duration-300">
                      <p className="text-body">{step}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <AnimatedSection className="text-center mb-14">
            <p className="text-gold-500 text-sm uppercase tracking-[0.2em] font-semibold mb-3">Checklist</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy-900">Documentation Requirements</h2>
            <div className="gold-divider" />
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="bg-cream-50 rounded-2xl p-8 border border-cream-200/50">
              <h3 className="font-heading font-semibold text-navy-900 mb-6">Common Requirements</h3>
              <div className="space-y-4">
                {dest.documents.map((doc, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" />
                    <span className="text-navy-700/60 text-sm">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQs */}
      {dest.faqs?.length > 0 && (
        <section className="py-20 bg-cream-50">
          <div className="max-w-4xl mx-auto px-4">
            <AnimatedSection className="text-center mb-14">
              <p className="text-gold-500 text-sm uppercase tracking-[0.2em] font-semibold mb-3">FAQs</p>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy-900">Frequently Asked Questions about the {dest.name} Visa</h2>
              <div className="gold-divider" />
            </AnimatedSection>
            <StaggerContainer className="space-y-4" stagger={0.08}>
              {dest.faqs.map((f, i) => (
                <StaggerItem key={i}>
                  <details className="bg-white rounded-2xl p-6 border border-cream-200/50 group">
                    <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                      <h3 className="font-heading text-lg font-semibold text-navy-900 m-0">{f.q}</h3>
                      <ChevronRight className="w-5 h-5 text-gold-500 shrink-0 mt-1 transition-transform duration-300 group-open:rotate-90" />
                    </summary>
                    <p className="text-body text-sm leading-relaxed mt-4">{f.a}</p>
                  </details>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative py-20 bg-navy-900 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <TwinklingStars count={15} />
        <PassportStamp className="absolute -right-10 top-5 w-52 h-52 hidden lg:block" />
        <AnimatedSection className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <p className="text-gold-500 text-sm uppercase tracking-[0.2em] font-semibold mb-3">Get Started</p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-6">Need Assistance with Your {dest.name} Visa?</h2>
          <p className="text-body-on-dark mb-10">Our visa specialists can provide guidance on your visa application. Reach out to discuss your specific situation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/918200918967" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-gold-500 to-gold-400 text-navy-900 rounded-full font-semibold hover:from-gold-400 hover:to-gold-300 no-underline transition-all duration-300 shadow-lg shadow-gold-500/20">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <a href="tel:+918200918967" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-gold-500/50 text-gold-400 rounded-full font-medium hover:bg-gold-500 hover:text-navy-900 hover:border-gold-500 no-underline transition-all duration-300">
              <Phone className="w-4 h-4" /> Call Now
            </a>
          </div>
        </AnimatedSection>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-20 bg-cream-50">
          <div className="max-w-7xl mx-auto px-4">
            <AnimatedSection className="text-center mb-12">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy-900">Explore Other Destinations</h2>
              <div className="gold-divider" />
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" stagger={0.06}>
              {related.map(r => (
                <StaggerItem key={r.slug}>
                  <Link to={`/visa/${r.slug}`} className="bg-white rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-navy-900/10 transition-all duration-500 no-underline group block">
                    <div className="h-28 overflow-hidden">
                      <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <p className="text-center text-sm font-heading font-medium text-navy-900 py-3 group-hover:text-gold-500 transition-colors">{r.name}</p>
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
