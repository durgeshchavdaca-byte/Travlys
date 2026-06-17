// Single source of truth for SEO config. Imported by React components
// (src/components/SEO.jsx, page components) and by the build-time
// pre-render script (scripts/prerender.mjs).

export const SITE_URL = 'https://travlys.com'
export const SITE_NAME = 'Travlys'
export const DEFAULT_OG_IMAGE =
  'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&h=630&fit=crop&q=80'
export const DEFAULT_OG_ALT = 'Travlys — Visa Assistance for Indian Travelers'
export const DEFAULT_LOCALE = 'en_IN'
export const DEFAULT_LANG = 'en-IN'

export const HOME_FAQS = [
  {
    q: 'Which visas does Travlys help with?',
    a: 'Travlys handles visa applications for the US, UK, Canada, Australia, New Zealand, the Schengen area (via the Netherlands), Singapore, UAE / Dubai, Thailand and Malaysia — across tourist, business, student and work categories.',
  },
  {
    q: 'How does the application process work?',
    a: 'Pick your destination, submit a short brief, and we’ll come back within a working day with a route, document checklist, timeline and quote. After that: we draft the application, lock the appointment, coach the interview where relevant, and track the file until you get a decision.',
  },
  {
    q: 'How much do you charge?',
    a: 'Service fees start at ₹999 for Malaysia eNTRI and ₹1,950 for Thailand, going up to ₹19,940 for the US embassy visa. Government / embassy fees are paid separately. Full pricing is on the homepage.',
  },
  {
    q: 'Do you guarantee visa approval?',
    a: 'No honest consultant can — the embassy decides. What we do guarantee is a complete, accurate, well-positioned application. We have a 98% approval rate across 5,000+ applications and we’ll flag refusal risks before you spend on embassy fees.',
  },
  {
    q: 'How do I reach a real person?',
    a: 'WhatsApp +91 82009 18967 for fastest response, or email info@travlys.com. We reply within working hours (Mon–Sat, 9 AM – 7 PM IST).',
  },
  {
    q: 'My visa was refused before — can you help?',
    a: 'Yes. Send us your refusal letter; we’ll review the reason and tell you whether a re-application is worth filing and what would need to change. There’s no charge for the assessment.',
  },
]

export function buildHomeSchemas(destinations, reviews = []) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      description: 'Visa assistance for Indian travelers — US, UK, Canada, Australia, Schengen, Singapore, UAE and more.',
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

export function buildHowToSchema(dest) {
  if (!dest.processSteps?.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to apply for a ${dest.name} visa from India`,
    description: `Step-by-step process for the ${dest.name} visa via Travlys.`,
    totalTime: dest.processingTime ? `Approximate processing: ${dest.processingTime}` : undefined,
    supply: (dest.documents || []).slice(0, 6).map((d) => ({
      '@type': 'HowToSupply',
      name: d,
    })),
    step: dest.processSteps.map((step, i) => {
      const [name, ...rest] = String(step).split(' — ')
      return {
        '@type': 'HowToStep',
        position: i + 1,
        name: name?.trim() || `Step ${i + 1}`,
        text: rest.length ? rest.join(' — ').trim() : String(step),
      }
    }),
  }
}

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
  const heroImage = dest.heroImage || dest.image

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Visa Destinations', item: `${SITE_URL}/#destinations` },
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
      'Travlys handles your visa from start to stamp — US, UK, Canada, Australia, Schengen, Singapore, UAE and more. 5,000+ visas processed at a 98% approval rate. Transparent pricing from ₹999.',
    path: '/',
    keywords:
      'visa assistance india, visa consultants india, US visa india, UK visa india, Canada visa india, Schengen visa india, Singapore visa, UAE visa, tourist visa india, business visa india, student visa india, travlys',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    imageAlt: DEFAULT_OG_ALT,
  }
}

export function getVisaMeta(dest) {
  const pagePath = `/visa/${dest.slug}`
  const heroImage = dest.heroImage || dest.image
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
