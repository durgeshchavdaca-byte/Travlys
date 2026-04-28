import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowRight, Globe, Briefcase, Users, CheckCircle, Phone, Mail, MessageCircle, Plane, Building, MapPin, Compass, Shield, Clock, Award, Star, ArrowUpRight } from 'lucide-react'
import AnimatedSection, { StaggerContainer, StaggerItem } from '../components/AnimatedSection'
import { GradientOrbs, TwinklingStars, AnimatedGlobe, MorphingWave, AnimatedCounter, TiltCard, MagneticButton, TextReveal } from '../components/MotionGraphics'
import { destinations, globalCountries } from '../data/destinations'
import SEO, { SITE_URL } from '../components/SEO'

const HOME_FAQS = [
  { q: 'What countries does Travlys provide visa assistance for?', a: 'Travlys offers visa assistance for the United States, United Kingdom, Canada, Australia, New Zealand, Netherlands (Schengen), Singapore, UAE, Thailand and Malaysia, with support for tourist, business, student and work categories.' },
  { q: 'How does the Travlys visa assistance process work?', a: 'We follow a six-step process — consultation, document checklist, application preparation, submission, real-time tracking, and outcome communication — designed to simplify your visa journey end-to-end.' },
  { q: 'Do you guarantee visa approval?', a: 'No consultant can guarantee approval — the final decision rests with the issuing embassy or consulate. Travlys ensures your application is complete, accurate and well-prepared, which significantly improves outcomes (98% success rate across 5,000+ applications).' },
  { q: 'How can I get in touch with a Travlys visa expert?', a: 'You can reach our visa specialists via WhatsApp at +91 8200918967, by phone at the same number, or by email at info@travlys.com.' },
  { q: 'How long does a typical visa application take?', a: 'Processing times vary by country and category — from 3-5 working days for Singapore and Malaysia e-visas, to 15-30 working days for Schengen visas. We share exact timelines during consultation.' },
]

function useParallax(ref, distance = 100) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  return useTransform(scrollYProgress, [0, 1], [-distance, distance])
}

/* Large featured destination card */
function FeaturedDestination({ dest, index, reversed }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const y = useParallax(ref, 60)

  return (
    <motion.div ref={ref} className={`grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[70vh] ${reversed ? 'lg:direction-rtl' : ''}`}>
      {/* Image side */}
      <motion.div
        className={`relative overflow-hidden ${reversed ? 'lg:order-2' : ''}`}
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={isInView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <motion.img
          src={dest.image.replace('w=600&h=400', 'w=1200&h=800')}
          alt={dest.name}
          className="w-full h-full object-cover min-h-[400px] lg:min-h-full"
          style={{ y }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />
        <div className="absolute top-6 left-6">
          <span className="text-[10px] text-white/50 uppercase tracking-[0.3em]" style={{ fontFamily: 'var(--font-family-accent)' }}>
            0{index + 1}
          </span>
        </div>
      </motion.div>

      {/* Text side */}
      <div className={`flex flex-col justify-center p-8 lg:p-16 xl:p-24 bg-cream-50 ${reversed ? 'lg:order-1 lg:text-right' : ''}`}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-gold-500 text-[10px] uppercase tracking-[0.3em] mb-4" style={{ fontFamily: 'var(--font-family-accent)' }}>
            {dest.processingTime}
          </p>
          <h3 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-navy-900 italic mb-6 leading-[1.1]">
            {dest.name}
          </h3>
          <p className="text-body text-sm leading-[1.9] mb-8 max-w-md">
            {dest.description}
          </p>
          <div className="flex items-end gap-6 mb-8">
            <div>
              <span className="text-[10px] text-navy-700/50 uppercase tracking-[0.2em] block mb-1" style={{ fontFamily: 'var(--font-family-accent)' }}>Starting from</span>
              <span className="font-heading text-3xl font-light text-gold-500 italic">{dest.price}</span>
            </div>
          </div>
          <Link to={`/visa/${dest.slug}`}
            className={`group inline-flex items-center gap-3 text-navy-900 no-underline text-sm tracking-wide font-medium hover:text-gold-500 transition-colors duration-500 ${reversed ? 'flex-row-reverse' : ''}`}>
            <span>Explore {dest.name}</span>
            <div className="w-10 h-10 rounded-full border border-navy-900/20 flex items-center justify-center group-hover:bg-gold-500 group-hover:border-gold-500 transition-all duration-500">
              <ArrowUpRight className="w-4 h-4 group-hover:text-navy-900 transition-colors" />
            </div>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const heroTextY = useTransform(scrollYProgress, [0, 0.2], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroImgScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.3])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const featuredDests = destinations.slice(0, 4)
  const gridDests = destinations.slice(4)

  const homeSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: 'Travlys',
      description: 'Visa assistance services for Indian travelers',
      inLanguage: 'en-IN',
      publisher: { '@id': `${SITE_URL}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Visa Destinations Offered by Travlys',
      itemListElement: destinations.map((d, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `${d.name} Visa`,
        url: `${SITE_URL}/visa/${d.slug}`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: HOME_FAQS.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ]

  return (
    <>
      <SEO
        title="Visa Assistance for Indian Travelers"
        description="Travlys offers expert visa assistance for Indian citizens — tourist, business, student and work visas for the USA, UK, Canada, Australia, Schengen, Singapore, UAE and more. 5,000+ visas with a 98% success rate."
        path="/"
        keywords="visa assistance india, visa consultants india, tourist visa, business visa, student visa, work visa, USA visa, UK visa, Canada visa, Australia visa, Schengen visa, Singapore visa, UAE visa"
        jsonLd={homeSchemas}
      />

      {/* ===== HERO — Cinematic fullscreen ===== */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: heroImgScale }}>
          <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&q=80"
            alt="Aerial view of a global travel destination — Travlys visa assistance for Indian travelers"
            fetchPriority="high"
            className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-navy-900/50" />
        <GradientOrbs />

        <motion.div style={{ y: heroTextY, opacity: heroOpacity }}
          className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center flex flex-col items-center">

          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.5, delay: 0.3 }}
            className="w-20 h-[1px] bg-gold-500/60 mb-10 origin-center" />

          <motion.p initial={{ opacity: 0, letterSpacing: '0em' }}
            animate={{ opacity: 1, letterSpacing: '0.4em' }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="text-gold-400/80 text-[11px] uppercase font-medium mb-8"
            style={{ fontFamily: 'var(--font-family-accent)' }}>
            Premium Visa Services
          </motion.p>

          <div className="overflow-hidden mb-2">
            <motion.h1 initial={{ y: '100%' }} animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-6xl md:text-8xl lg:text-9xl font-light tracking-[-0.02em]">
              Visa Assistance
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1 initial={{ y: '100%' }} animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-6xl md:text-8xl lg:text-9xl font-light italic text-gradient-gold tracking-[-0.02em]">
              Made Easy
            </motion.h1>
          </div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.4 }}
            className="text-body-on-dark text-sm max-w-lg mx-auto leading-relaxed mb-14">
            Professional visa assistance for travelers across the globe. From documentation to submission, we ensure a seamless experience.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex gap-5">
            <MagneticButton
              onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-10 py-4 border border-white/20 text-white/80 bg-white/5 backdrop-blur-sm rounded-full text-sm tracking-wide font-medium hover:bg-gold-500 hover:text-navy-900 hover:border-gold-500 transition-all duration-500 flex items-center gap-3 cursor-pointer">
              Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
            <MagneticButton href="https://wa.me/918200918967"
              className="px-10 py-4 bg-gold-500 text-navy-900 rounded-full text-sm tracking-wide font-semibold hover:bg-gold-400 no-underline transition-all duration-500 shadow-2xl shadow-gold-500/20">
              Get Assistance
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Bottom scroll line */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <motion.div animate={{ height: ['0px', '60px', '0px'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[1px] bg-gold-500/50" />
        </motion.div>
      </section>

      {/* ===== STATS — Minimal editorial ===== */}
      <section className="py-20 bg-cream-50 border-b border-cream-200/50">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-cream-200/50">
          {[
            { value: 10, suffix: '+', label: 'Countries' },
            { value: 5000, suffix: '+', label: 'Visas Done' },
            { value: 98, suffix: '%', label: 'Success' },
            { value: 24, suffix: '/7', label: 'Support' },
          ].map((stat, i) => (
            <AnimatedSection key={i} delay={i * 0.15} className="text-center py-4">
              <p className="font-heading text-5xl md:text-6xl font-light text-navy-900 italic mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-body-light text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: 'var(--font-family-accent)' }}>
                {stat.label}
              </p>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ===== FEATURED DESTINATIONS — Editorial split layout ===== */}
      <section id="featured" className="bg-cream-50">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center py-24 px-4">
            <AnimatedSection>
              <p className="text-gold-500 text-[10px] uppercase tracking-[0.4em] font-medium mb-6" style={{ fontFamily: 'var(--font-family-accent)' }}>
                Featured Destinations
              </p>
            </AnimatedSection>
            <TextReveal text="Where Will You Go?" className="font-heading text-5xl md:text-6xl lg:text-7xl font-light text-navy-900 italic" />
          </div>

          {featuredDests.map((dest, i) => (
            <FeaturedDestination key={dest.slug} dest={dest} index={i} reversed={i % 2 !== 0} />
          ))}
        </div>
      </section>

      {/* ===== MORE DESTINATIONS — Compact grid ===== */}
      <section className="py-24 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <AnimatedSection>
              <p className="text-gold-500 text-[10px] uppercase tracking-[0.4em] font-medium mb-6" style={{ fontFamily: 'var(--font-family-accent)' }}>
                More Destinations
              </p>
            </AnimatedSection>
            <TextReveal text="Explore Further" className="font-heading text-4xl md:text-5xl font-light text-navy-900 italic" />
            <div className="gold-divider mt-6" />
          </div>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" stagger={0.05}>
            {gridDests.map((d) => (
              <StaggerItem key={d.slug} variant="scaleIn">
                <Link to={`/visa/${d.slug}`} className="group block rounded-2xl overflow-hidden no-underline relative aspect-[3/4] card-shine">
                  <img src={d.image} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-heading text-lg font-light italic">{d.name}</h3>
                    <p className="text-body-on-dark text-[10px] uppercase tracking-wider mt-1" style={{ fontFamily: 'var(--font-family-accent)' }}>
                      {d.processingTime}
                    </p>
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-100 scale-50">
                    <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== VISA TYPES — Dark cinematic ===== */}
      <section id="visa-types" className="relative py-32 bg-navy-900 overflow-hidden">
        <TwinklingStars count={35} />
        <MorphingWave />
        <AnimatedGlobe className="absolute -right-32 -top-20 w-[600px] h-[600px] text-gold-500 hidden lg:block" />

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left - heading */}
            <div>
              <AnimatedSection>
                <p className="text-gold-500/80 text-[10px] uppercase tracking-[0.4em] font-medium mb-6" style={{ fontFamily: 'var(--font-family-accent)' }}>
                  Our Expertise
                </p>
              </AnimatedSection>
              <TextReveal text="Understanding Visa Types" className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-white italic leading-[1.1]" />
              <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="w-16 h-[1px] bg-gold-500/40 mt-8 origin-left" />
            </div>

            {/* Right - cards */}
            <StaggerContainer className="space-y-6" stagger={0.15}>
              {[
                { icon: Globe, title: 'Tourist Visa', desc: 'Leisure activities, sightseeing, vacations, visiting friends and family. Complete application support for accuracy and timely submission.' },
                { icon: Briefcase, title: 'Business Visa', desc: 'Professional engagements — meetings, conferences, exhibitions, trade activities. Full documentation and procedural support.' },
                { icon: Users, title: 'Employment Visa', desc: 'Legal work authorization abroad. Eligibility checks, employer documentation, and application filing guidance.' },
              ].map(({ icon: Icon, title, desc }) => (
                <StaggerItem key={title}>
                  <div className="group flex gap-6 p-6 rounded-2xl border border-white/5 hover:border-gold-500/20 hover:bg-white/5 transition-all duration-700">
                    <div className="w-12 h-12 bg-gold-500/10 border border-gold-500/15 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-5 h-5 text-gold-500" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-light text-white italic mb-2">{title}</h3>
                      <p className="text-body-on-dark text-sm leading-[1.8]">{desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ===== PROCESS — Bold numbered ===== */}
      <section id="process" className="py-32 bg-cream-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-24">
            <AnimatedSection>
              <p className="text-gold-500 text-[10px] uppercase tracking-[0.4em] font-medium mb-6" style={{ fontFamily: 'var(--font-family-accent)' }}>The Process</p>
            </AnimatedSection>
            <TextReveal text="Six Simple Steps" className="font-heading text-5xl md:text-6xl lg:text-7xl font-light text-navy-900 italic" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {[
              { title: 'Consultation', desc: 'Assess your travel purpose, background, and visa eligibility.' },
              { title: 'Documents', desc: 'Comprehensive checklist of required documents tailored to your visa.' },
              { title: 'Preparation', desc: 'Our experts prepare and verify your complete application.' },
              { title: 'Submission', desc: 'Appointment scheduling and application submission support.' },
              { title: 'Tracking', desc: 'Real-time status updates on your application progress.' },
              { title: 'Outcome', desc: 'Final passport and visa outcome communication.' },
            ].map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="group">
                  <span className="font-heading text-7xl md:text-8xl font-light text-gold-500/15 italic leading-none block mb-4 group-hover:text-gold-500/30 transition-colors duration-700">
                    0{i + 1}
                  </span>
                  <h3 className="font-heading text-2xl font-light text-navy-900 italic mb-3">{step.title}</h3>
                  <p className="text-body-light text-sm leading-[1.9]">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <section className="py-8 bg-navy-900 overflow-hidden border-y border-white/5">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...globalCountries, ...globalCountries].map((country, i) => (
            <span key={i} className="inline-flex items-center gap-3 mx-8 text-white/15 font-heading text-2xl md:text-3xl italic">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500/30" />
              {country}
            </span>
          ))}
        </div>
      </section>

      {/* ===== CTA — Full bleed ===== */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=1920&h=800&fit=crop&q=80"
            alt="Passenger looking out an aircraft window — start your travel journey with Travlys"
            loading="lazy"
            className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-navy-900/80" />
        <TwinklingStars count={15} />

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <AnimatedSection>
            <p className="text-gold-500/80 text-[10px] uppercase tracking-[0.4em] font-medium mb-8" style={{ fontFamily: 'var(--font-family-accent)' }}>
              Start Your Journey
            </p>
          </AnimatedSection>
          <TextReveal text="Ready to Travel?" className="font-heading text-5xl md:text-7xl lg:text-8xl font-light text-white italic" />
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-body-on-dark mt-8 mb-14 text-sm leading-relaxed max-w-md mx-auto">
            Let our specialists handle the visa complexities while you focus on your journey.
          </motion.p>
          <AnimatedSection delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <MagneticButton href="https://wa.me/918200918967"
                className="group px-10 py-4 border border-white/15 text-white/70 bg-white/5 backdrop-blur-sm rounded-full text-sm tracking-wide font-medium hover:bg-gold-500 hover:text-navy-900 hover:border-gold-500 transition-all duration-500 no-underline flex items-center gap-3">
                Speak With an Expert <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
              <MagneticButton
                onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-4 bg-gold-500 text-navy-900 rounded-full text-sm tracking-wide font-semibold hover:bg-gold-400 transition-all duration-500 cursor-pointer border-none shadow-2xl shadow-gold-500/20">
                Apply for Visa
              </MagneticButton>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== SERVICES — Minimal ===== */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div className="lg:sticky lg:top-32">
              <AnimatedSection>
                <p className="text-gold-500 text-[10px] uppercase tracking-[0.4em] font-medium mb-6" style={{ fontFamily: 'var(--font-family-accent)' }}>Beyond Visas</p>
              </AnimatedSection>
              <TextReveal text="More Services" className="font-heading text-5xl md:text-6xl font-light text-navy-900 italic" />
              <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="w-16 h-[1px] bg-gold-500/40 mt-8 origin-left" />
            </div>

            <StaggerContainer className="space-y-0 divide-y divide-cream-200/50" stagger={0.1}>
              {[
                { icon: Plane, title: 'Holiday Packages', desc: 'Domestic and international travel packages designed to suit your preferences' },
                { icon: Building, title: 'Flight Bookings', desc: 'Assistance with domestic and international air ticket bookings' },
                { icon: MapPin, title: 'Hotel & Accommodation', desc: 'Booking support for hotels, resorts, and vacation stays at competitive prices' },
              ].map(({ icon: Icon, title, desc }) => (
                <StaggerItem key={title}>
                  <div className="group flex items-start gap-6 py-10 cursor-pointer">
                    <div className="w-12 h-12 bg-cream-50 border border-cream-200/50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-gold-500/10 group-hover:border-gold-500/20 transition-all duration-700">
                      <Icon className="w-5 h-5 text-body-light group-hover:text-gold-500 transition-colors duration-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-2xl font-light text-navy-900 italic mb-2 group-hover:text-gold-500 transition-colors duration-500">{title}</h3>
                      <p className="text-body-light text-sm leading-[1.9]">{desc}</p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-navy-700/15 group-hover:text-gold-500 transition-all duration-500 mt-2 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ===== CONTACT — Split ===== */}
      <section id="contact" className="relative bg-navy-900 overflow-hidden">
        <TwinklingStars count={20} />
        <MorphingWave />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
          {/* Left */}
          <div className="flex flex-col justify-center p-8 lg:p-16 xl:p-24">
            <AnimatedSection>
              <p className="text-gold-500/40 text-[10px] uppercase tracking-[0.4em] font-medium mb-6" style={{ fontFamily: 'var(--font-family-accent)' }}>Contact</p>
            </AnimatedSection>
            <TextReveal text="Get in Touch" className="font-heading text-5xl md:text-6xl font-light text-white italic" />
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-16 h-[1px] bg-gold-500/30 mt-8 mb-12 origin-left" />

            <div className="space-y-6">
              <a href="tel:+918200918967" className="flex items-center gap-4 text-cream-200/40 hover:text-gold-400 no-underline transition-all duration-500 group">
                <div className="w-12 h-12 rounded-xl border border-white/5 flex items-center justify-center group-hover:border-gold-500/20 group-hover:bg-gold-500/5 transition-all duration-500">
                  <Phone className="w-5 h-5 text-gold-500/80 group-hover:text-gold-500" />
                </div>
                <span className="text-sm" style={{ fontFamily: 'var(--font-family-accent)' }}>8200918967</span>
              </a>
              <a href="mailto:info@travlys.com" className="flex items-center gap-4 text-cream-200/40 hover:text-gold-400 no-underline transition-all duration-500 group">
                <div className="w-12 h-12 rounded-xl border border-white/5 flex items-center justify-center group-hover:border-gold-500/20 group-hover:bg-gold-500/5 transition-all duration-500">
                  <Mail className="w-5 h-5 text-gold-500/80 group-hover:text-gold-500" />
                </div>
                <span className="text-sm" style={{ fontFamily: 'var(--font-family-accent)' }}>info@travlys.com</span>
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col justify-center items-center p-8 lg:p-16 border-t lg:border-t-0 lg:border-l border-white/5">
            <AnimatedSection variant="scaleIn" className="w-full max-w-sm">
              <div className="space-y-4">
                <MagneticButton href="https://wa.me/918200918967"
                  className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-gold-500 text-navy-900 rounded-2xl font-semibold hover:bg-gold-400 no-underline transition-all duration-500 shadow-2xl shadow-gold-500/10 text-sm tracking-wide">
                  <MessageCircle className="w-5 h-5" /> WhatsApp
                </MagneticButton>
                <MagneticButton href="tel:+918200918967"
                  className="w-full flex items-center justify-center gap-3 px-8 py-5 border border-white/10 text-body-on-dark rounded-2xl font-medium hover:bg-white/5 hover:text-gold-400 hover:border-gold-500/20 no-underline transition-all duration-500 text-sm tracking-wide">
                  <Phone className="w-5 h-5" /> Call Now
                </MagneticButton>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
