// Single source of truth for SEO config. Imported by React components
// (src/components/SEO.jsx, page components) and by the build-time
// pre-render script (scripts/prerender.mjs).

export const SITE_URL = 'https://travlys.com'
export const SITE_NAME = 'Travlys'
// Default Open Graph image — currently the same aerial-travel hero as the
// home page, served from Unsplash at 1200x630. Replace by uploading a
// branded JPG/PNG to public/og-image.jpg and changing this constant to
// `${SITE_URL}/og-image.jpg`.
export const DEFAULT_OG_IMAGE =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=630&fit=crop&q=80'
export const DEFAULT_OG_ALT = 'Travlys — Premium Visa Assistance'
export const DEFAULT_LOCALE = 'en_IN'
export const DEFAULT_LANG = 'en-IN'

export const HOME_FAQS = [
  { q: 'What countries does Travlys provide visa assistance for?', a: 'Travlys offers visa assistance for the United States, United Kingdom, Canada, Australia, New Zealand, Netherlands (Schengen), Singapore, UAE, Thailand and Malaysia, with support for tourist, business, student and work categories.' },
  { q: 'How does the Travlys visa assistance process work?', a: 'We follow a six-step process — consultation, document checklist, application preparation, submission, real-time tracking, and outcome communication — designed to simplify your visa journey end-to-end.' },
  { q: 'Do you guarantee visa approval?', a: 'No consultant can guarantee approval — the final decision rests with the issuing embassy or consulate. Travlys ensures your application is complete, accurate and well-prepared, which significantly improves outcomes (98% success rate across 5,000+ applications).' },
  { q: 'How can I get in touch with a Travlys visa expert?', a: 'You can reach our visa specialists via WhatsApp at +91 8200918967, by phone at the same number, or by email at info@travlys.com.' },
  { q: 'How long does a typical visa application take?', a: 'Processing times vary by country and category — from 3-5 working days for Singapore and Malaysia e-visas, to 15-30 working days for Schengen visas. We share exact timelines during consultation.' },
]

export function buildHomeSchemas(destinations, reviews = []) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      description: 'Visa assistance services for Indian travelers',
      inLanguage: DEFAULT_LANG,
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
    ...buildReviewSchemas(reviews),
  ]
}

// HowTo schema — eligible for rich-snippet step boxes in Google when
// a user searches "how to apply for [country] visa from india".
export function buildHowToSchema(dest) {
  if (!dest.processSteps?.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to apply for a ${dest.name} visa from India`,
    description: `Step-by-step process to apply for a ${dest.name} visa with Travlys's expert guidance.`,
    totalTime: dest.processingTime ? `Approximate processing: ${dest.processingTime}` : undefined,
    supply: (dest.documents || []).slice(0, 6).map((d) => ({
      '@type': 'HowToSupply',
      name: d,
    })),
    step: dest.processSteps.map((step, i) => {
      const [name, ...rest] = String(step).split(' - ')
      return {
        '@type': 'HowToStep',
        position: i + 1,
        name: name?.trim() || `Step ${i + 1}`,
        text: rest.length ? rest.join(' - ').trim() : String(step),
      }
    }),
  }
}

// Review schema — when reviews are added in src/data/reviews.js, each
// gets emitted so star ratings are eligible to appear in SERP.
export function buildReviewSchemas(reviews, organizationId = `${SITE_URL}/#organization`) {
  if (!reviews?.length) return []
  return reviews.map((r) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: { '@type': 'Person', name: r.author },
    datePublished: r.date,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: String(r.rating),
      bestRating: '5',
      worstRating: '1',
    },
    reviewBody: r.text,
    itemReviewed: { '@id': organizationId },
  }))
}

export function buildVisaSchemas(dest) {
  const pagePath = `/visa/${dest.slug}`
  const canonical = `${SITE_URL}${pagePath}`
  const heroImage = dest.image.replace('w=600&h=400', 'w=1200&h=630')

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Visa Destinations', item: `${SITE_URL}/#featured` },
        { '@type': 'ListItem', position: 3, name: `${dest.name} Visa`, item: canonical },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${canonical}#service`,
      serviceType: `${dest.name} Visa Assistance`,
      name: `${dest.name} Visa Assistance for Indian Citizens`,
      description: dest.description,
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: { '@type': 'Country', name: 'India' },
      audience: { '@type': 'PeopleAudience', name: 'Indian passport holders' },
      url: canonical,
      image: heroImage,
      ...(dest.priceValue
        ? {
            offers: {
              '@type': 'Offer',
              price: String(dest.priceValue),
              priceCurrency: dest.currency || 'INR',
              availability: 'https://schema.org/InStock',
              url: canonical,
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
    ...(buildHowToSchema(dest) ? [buildHowToSchema(dest)] : []),
  ]
}

export function getHomeMeta() {
  return {
    title: 'Visa Assistance for Indian Travelers',
    description:
      'Travlys offers expert visa assistance for Indian citizens — tourist, business, student and work visas for the USA, UK, Canada, Australia, Schengen, Singapore, UAE and more. 5,000+ visas with a 98% success rate.',
    path: '/',
    keywords:
      'visa assistance india, visa consultants india, tourist visa, business visa, student visa, work visa, USA visa, UK visa, Canada visa, Australia visa, Schengen visa, Singapore visa, UAE visa',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    imageAlt: DEFAULT_OG_ALT,
  }
}

export function getVisaMeta(dest) {
  const pagePath = `/visa/${dest.slug}`
  const heroImage = dest.image.replace('w=600&h=400', 'w=1200&h=630')
  return {
    title: dest.metaTitle || `${dest.name} Visa for Indian Citizens`,
    description: dest.metaDescription || dest.description,
    path: pagePath,
    keywords: dest.keywords,
    type: 'article',
    image: heroImage,
    imageAlt: `${dest.name} visa assistance by Travlys`,
  }
}
