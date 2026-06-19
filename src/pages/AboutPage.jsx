import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldCheck, Users, FileCheck2, Globe2, MapPin, ArrowRight, Sparkles, Headphones } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { HeroBlobs, TextReveal, AnimatedCounter } from '../components/MotionGraphics'
import SEO from '../components/SEO'
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE, buildWebPageSchema } from '../seo/config'

const meta = {
  title: 'About Travlys: India-based visa consultants, 5,000+ visas filed',
  description:
    'Travlys is an India-based visa consultancy headquartered in Ahmedabad. 5,000+ visas filed, 98% approval rate, 10 destinations, flat fees from ₹999. Here is who we are and how we work.',
  path: '/about',
  keywords:
    'about travlys, travlys visa consultants, visa consultancy ahmedabad, india visa agency, travlys team',
  type: 'website',
  image: DEFAULT_OG_IMAGE,
  imageAlt: 'About Travlys, India-based visa consultancy',
}

function aboutSchemas() {
  return [
    buildWebPageSchema(meta),
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      '@id': `${SITE_URL}/about#aboutpage`,
      url: `${SITE_URL}/about`,
      name: meta.title,
      description: meta.description,
      mainEntity: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_URL}/about` },
      ],
    },
  ]
}

const STATS = [
  { value: 5000, suffix: '+', label: 'Visas filed', icon: FileCheck2 },
  { value: 98, suffix: '%', label: 'Approval rate', icon: ShieldCheck },
  { value: 10, suffix: '', label: 'Destinations', icon: Globe2 },
  { value: 24, suffix: 'h', label: 'Avg first response', icon: Headphones },
]

const VALUES = [
  {
    title: 'Flat fees, no surprises',
    body: 'One up-front service fee per country. No per-document charges, no urgency surcharges, no commission inflation. Embassy fees are quoted at face value and paid directly to the authority.',
  },
  {
    title: 'One named specialist per file',
    body: 'You get a single consultant who owns your application from brief to decision, on WhatsApp. No ticket queue, no handoffs, no chasing.',
  },
  {
    title: 'Refusal risk pre-checked, not glossed over',
    body: 'If your file is borderline, we tell you before you pay the embassy fee. Honest assessment, even when it costs us the engagement.',
  },
  {
    title: 'Focused on 10 countries we know deeply',
    body: 'We do not chase 100 destinations. We file the same 10 routes hundreds of times each. Depth over breadth.',
  },
]

export default function AboutPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      <SEO {...meta} jsonLd={aboutSchemas()} />

      {/* HERO */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden mesh-warm">
        <HeroBlobs />
        <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />

        <div className="relative z-10 container-app">
          <div className="max-w-3xl">
            <span className="pill bg-white border border-line text-ink-900">
              <Sparkles className="w-3.5 h-3.5 text-coral-500" /> About Travlys
            </span>
            <h1 className="font-display text-[2.6rem] sm:text-5xl md:text-[3.6rem] font-extrabold text-ink-900 mt-5 leading-[1.05]">
              <TextReveal text="A visa consultancy" as="span" />
              <br />
              <span className="hero-italic-mark">
                <span className="relative italic text-ink-900">built for Indian travelers.</span>
              </span>
            </h1>
            <p className="text-slate-muted mt-5 text-[1.05rem] max-w-2xl leading-relaxed">
              Travlys is an India-based visa consultancy headquartered in Ahmedabad.
              We file tourist, business, student and work visas for 10 countries,
              from a single flat service fee, with a single named specialist on
              your file. 5,000+ applications, 98% approval rate.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 mesh-deep text-white relative overflow-hidden paper-grain">
        <div className="absolute inset-0 dot-grid-light opacity-40 pointer-events-none" />
        <div className="relative z-10 container-app">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="text-center">
                  <div className="inline-flex w-12 h-12 rounded-xl bg-white/10 border border-white/15 items-center justify-center mb-3">
                    <s.icon className="w-5 h-5 text-gold-400" />
                  </div>
                  <p className="font-display text-4xl md:text-5xl font-extrabold gold-text">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-sm text-white/70 mt-1">{s.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="container-app grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          <div className="lg:col-span-12">
            <AnimatedSection>
              <span className="pill bg-coral-50 text-coral-600">
                <Users className="w-3.5 h-3.5" /> Our story
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink-900 mt-4 leading-[1.05]">
                Why Travlys exists.
              </h2>
              <div className="mt-6 space-y-5 text-[1.05rem] text-slate-text leading-[1.7]">
                <p>
                  Visa services in India have a reputation problem. Most agencies
                  charge opaquely, take commissions from VFS, run ticket queues
                  instead of personal service, and gloss over refusal risk to
                  protect their booking volume.
                </p>
                <p>
                  Travlys started because we kept hearing the same thing from
                  founders, professionals and families across India: <em>"I just
                  want someone who knows what they are doing, charges a clear
                  fee, and tells me the truth when my file is weak."</em>
                </p>
                <p>
                  That is the bar. Every Travlys file is owned by a single named
                  consultant from brief to decision. Service fees are flat,
                  posted publicly on the homepage. If your file has a refusal
                  risk, we tell you before you spend on the embassy fee.
                </p>
                <p>
                  We deliberately do not chase 100 destinations. We file the
                  same 10 routes — US, UK, Canada, Australia, Schengen,
                  Singapore, UAE, Thailand, New Zealand, Malaysia — hundreds of
                  times each. Depth beats breadth when a single document
                  oversight can cost you ₹15,000 and 3 months.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-sand-50 border-t border-line">
        <div className="container-app">
          <AnimatedSection className="max-w-2xl mb-12">
            <span className="pill bg-coral-50 text-coral-600">
              <ShieldCheck className="w-3.5 h-3.5" /> How we work
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink-900 mt-4 leading-[1.05]">
              Four things we do differently.
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {VALUES.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.06}>
                <div className="card p-7 h-full">
                  <h3 className="font-display text-xl font-extrabold text-ink-900 leading-tight">{v.title}</h3>
                  <p className="text-sm text-slate-muted mt-3 leading-relaxed">{v.body}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Office */}
      <section className="py-20 bg-white border-t border-line">
        <div className="container-app grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <span className="pill bg-coral-50 text-coral-600">
              <MapPin className="w-3.5 h-3.5" /> Headquarters
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink-900 mt-4 leading-[1.05]">
              Ahmedabad, Gujarat.
            </h2>
            <p className="text-slate-muted mt-4 text-[1.02rem] leading-relaxed">
              Travlys is headquartered at 605, Shivalik Shilp II, Near Hotel ITC
              Narmada, Keshav Baug, Vastrapur, Ahmedabad, Gujarat 380015.
              Walk-ins are by appointment; most of our work is remote across
              WhatsApp and email for clients across India.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/contact" className="btn btn-primary">
                Contact details <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="https://wa.me/918200918967" className="btn btn-ghost">WhatsApp now</a>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="card overflow-hidden h-[300px]">
              <iframe
                title="Travlys Ahmedabad office on Google Maps"
                src="https://www.google.com/maps?q=Shivalik+Shilp+II+Keshav+Baug+Vastrapur+Ahmedabad+380015&output=embed"
                style={{ border: 0, width: '100%', height: '100%' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </motion.div>
  )
}
