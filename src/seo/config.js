// Single source of truth for SEO config. Imported by React components
// (src/components/SEO.jsx, page components) and by the build-time
// pre-render script (scripts/prerender.mjs).

export const SITE_URL = 'https://travlys.com'
export const SITE_NAME = 'Travlys'
export const SITE_TAGLINE = 'Your visa, handled.'
export const DEFAULT_OG_IMAGE =
  'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&h=630&fit=crop&q=80'
export const DEFAULT_OG_ALT = 'Travlys, Visa Assistance for Indian Travelers'
export const DEFAULT_LOCALE = 'en_IN'
export const DEFAULT_LANG = 'en-IN'

// --- Business identity, reused across LocalBusiness / Organization / contactPoint ---
export const BIZ = {
  name: SITE_NAME,
  legalName: 'Travlys Visa Assistance',
  phone: '+91-8200918967',
  email: 'info@travlys.com',
  whatsapp: 'https://wa.me/918200918967',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/favicon.svg`,
  address: {
    streetAddress: '605, Shivalik Shilp II, Near Hotel ITC Narmada, Keshav Baug',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    postalCode: '380015',
    addressCountry: 'IN',
  },
  geo: { latitude: '23.0365', longitude: '72.5246' },
  priceRange: '₹₹',
  openingHours: 'Mo-Sa 09:00-19:00',
}

export const HOME_FAQS = [
  {
    q: 'Which visas does Travlys help with?',
    a: 'Travlys handles visa applications for the US, UK, Canada, Australia, New Zealand, the Schengen area (via the Netherlands), Singapore, UAE / Dubai, Thailand and Malaysia, across tourist, business, student and work categories.',
  },
  {
    q: 'How does the application process work?',
    a: 'Pick your destination, submit a short brief, and we’ll come back within a working day with a route, document checklist, timeline and quote. After that: we draft the application, lock the appointment, coach the interview where relevant, and track the file until you get a decision.',
  },
  {
    q: 'How much does Travlys charge for visa assistance?',
    a: 'Service fees start at ₹999 for Malaysia eNTRI and ₹1,950 for Thailand, going up to ₹19,940 for the US embassy visa. Government / embassy fees are paid separately. Full pricing is on the homepage.',
  },
  {
    q: 'Do you guarantee visa approval?',
    a: 'No honest consultant can, the embassy decides. What we do guarantee is a complete, accurate, well-positioned application. We have a 98% approval rate across 5,000+ applications and we’ll flag refusal risks before you spend on embassy fees.',
  },
  {
    q: 'How do I reach a real person?',
    a: 'WhatsApp +91 82009 18967 for fastest response, or email info@travlys.com. We reply within working hours (Mon-Sat, 9 AM - 7 PM IST).',
  },
  {
    q: 'My visa was refused before, can you help?',
    a: 'Yes. Send us your refusal letter; we’ll review the reason and tell you whether a re-application is worth filing and what would need to change. There’s no charge for the assessment.',
  },
  {
    q: 'Where is Travlys based?',
    a: 'Our office is at 605, Shivalik Shilp II, Near Hotel ITC Narmada, Keshav Baug, Vastrapur, Ahmedabad, Gujarat 380015. We serve clients from across India remotely; walk-ins by appointment.',
  },
  {
    q: 'Is Travlys better than other visa consultants?',
    a: 'We handle fewer countries (10) so we know each route deeply, charge a single flat fee (no per-document or “urgency” surcharges), and you get a named specialist who stays on your file from brief to decision instead of a ticket queue.',
  },
]

// --- Schema builders ---------------------------------------------------------

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['TravelAgency', 'LocalBusiness'],
    '@id': `${SITE_URL}/#organization`,
    name: BIZ.name,
    alternateName: BIZ.legalName,
    slogan: SITE_TAGLINE,
    url: BIZ.url,
    logo: BIZ.logo,
    image: DEFAULT_OG_IMAGE,
    description:
      'Travlys handles visa applications end-to-end for Indian travelers, US, UK, Canada, Australia, Schengen, Singapore, UAE, Thailand, Malaysia and New Zealand. Transparent pricing from ₹999, 98% approval rate across 5,000+ visas filed.',
    telephone: BIZ.phone,
    email: BIZ.email,
    priceRange: BIZ.priceRange,
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Credit Card, UPI, Bank Transfer',
    address: { '@type': 'PostalAddress', ...BIZ.address },
    geo: { '@type': 'GeoCoordinates', ...BIZ.geo },
    hasMap: 'https://www.google.com/maps/search/?api=1&query=Shivalik+Shilp+II+Keshav+Baug+Vastrapur+Ahmedabad+380015',
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'AdministrativeArea', name: 'Gujarat' },
      { '@type': 'City', name: 'Ahmedabad' },
      { '@type': 'City', name: 'Mumbai' },
      { '@type': 'City', name: 'Delhi' },
      { '@type': 'City', name: 'Bengaluru' },
      { '@type': 'City', name: 'Hyderabad' },
      { '@type': 'City', name: 'Pune' },
      { '@type': 'City', name: 'Surat' },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: BIZ.phone,
        contactType: 'customer service',
        email: BIZ.email,
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi', 'Gujarati'],
      },
      {
        '@type': 'ContactPoint',
        telephone: BIZ.phone,
        contactType: 'sales',
        email: BIZ.email,
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi', 'Gujarati'],
      },
    ],
    knowsAbout: [
      'USA visa applications',
      'UK visa applications',
      'Canada visa applications',
      'Australia visa applications',
      'Schengen visa applications',
      'Singapore visa applications',
      'UAE visa applications',
      'Dubai visa applications',
      'Thailand visa applications',
      'Malaysia visa applications',
      'New Zealand visa applications',
      'Tourist visa',
      'Business visa',
      'Student visa',
      'Work visa',
      'Visa interview preparation',
      'DS-160 form filing',
      'VFS appointment booking',
      'Visa refusal review',
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
    sameAs: [BIZ.whatsapp],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '5000',
    },
  }
}

export function buildSiteNavigationSchema() {
  const items = [
    { name: 'Destinations', url: `${SITE_URL}/#destinations` },
    { name: 'How it works', url: `${SITE_URL}/#how-it-works` },
    { name: 'Pricing', url: `${SITE_URL}/#pricing` },
    { name: 'FAQ', url: `${SITE_URL}/#faq` },
    { name: 'Inquiry', url: `${SITE_URL}/#inquiry` },
  ]
  return {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: items.map((i) => i.name),
    url: items.map((i) => i.url),
  }
}

export function buildAggregateOfferSchema(destinations) {
  const priced = destinations.filter((d) => d.priceValue)
  if (!priced.length) return null
  const prices = priced.map((d) => d.priceValue)
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateOffer',
    '@id': `${SITE_URL}/#aggregate-offer`,
    name: 'Travlys visa assistance fees',
    description: 'Flat service fees across all supported visa destinations. Embassy / VFS fees paid separately.',
    priceCurrency: 'INR',
    lowPrice: String(Math.min(...prices)),
    highPrice: String(Math.max(...prices)),
    offerCount: String(priced.length),
    offers: priced.map((d) => ({
      '@type': 'Offer',
      name: `${d.name} Visa Assistance`,
      price: String(d.priceValue),
      priceCurrency: d.currency || 'INR',
      url: `${SITE_URL}/visa/${d.slug}`,
      availability: 'https://schema.org/InStock',
      itemOffered: {
        '@type': 'Service',
        name: `${d.name} Visa Assistance for Indian Citizens`,
        provider: { '@id': `${SITE_URL}/#organization` },
      },
    })),
  }
}

export function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  }
}

export function buildWebPageSchema(meta) {
  const fullTitle = meta.title?.includes(SITE_NAME) ? meta.title : `${meta.title} | ${SITE_NAME}`
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}${meta.path}#webpage`,
    url: `${SITE_URL}${meta.path}`,
    name: fullTitle,
    description: meta.description,
    inLanguage: DEFAULT_LANG,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    primaryImageOfPage: { '@type': 'ImageObject', url: meta.image || DEFAULT_OG_IMAGE },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.faq summary h3'],
    },
    dateModified: new Date().toISOString().slice(0, 10),
  }
}

export function buildFeaturedTestimonialSchemas(featured = []) {
  return featured.map((t) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: t.name,
      jobTitle: t.role,
      worksFor: t.company ? { '@type': 'Organization', name: t.company, url: t.companyUrl } : undefined,
    },
    datePublished: t.date,
    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
    reviewBody: Array.isArray(t.quote) ? t.quote.join(' ') : t.quote,
    itemReviewed: { '@id': `${SITE_URL}/#organization` },
  }))
}

export function buildHomeSchemas(destinations, reviews = [], featured = []) {
  return [
    buildOrganizationSchema(),
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      description: 'Visa assistance for Indian travelers, US, UK, Canada, Australia, Schengen, Singapore, UAE and more.',
      inLanguage: DEFAULT_LANG,
      publisher: { '@id': `${SITE_URL}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    buildWebPageSchema(getHomeMeta()),
    buildSiteNavigationSchema(),
    buildBreadcrumbSchema([
      { name: 'Home', url: `${SITE_URL}/` },
    ]),
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
    buildAggregateOfferSchema(destinations),
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
    ...buildFeaturedTestimonialSchemas(featured),
  ].filter(Boolean)
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
      const [name, ...rest] = String(step).split(', ')
      return {
        '@type': 'HowToStep',
        position: i + 1,
        name: name?.trim() || `Step ${i + 1}`,
        text: rest.length ? rest.join(', ').trim() : String(step),
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
  const visaMeta = getVisaMeta(dest)

  return [
    buildWebPageSchema(visaMeta),
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
      brand: { '@type': 'Brand', name: SITE_NAME },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '500',
        bestRating: '5',
        worstRating: '1',
      },
      ...(dest.priceValue
        ? {
            offers: {
              '@type': 'Offer',
              price: String(dest.priceValue),
              priceCurrency: dest.currency || 'INR',
              availability: 'https://schema.org/InStock',
              url: canonical,
              validFrom: new Date().toISOString().slice(0, 10),
              priceValidUntil: new Date(Date.now() + 90 * 86400000).toISOString().slice(0, 10),
              seller: { '@id': `${SITE_URL}/#organization` },
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
    title: 'Visa from India: US, UK, Canada, Schengen & More from ₹999',
    description:
      'Apply for US, UK, Canada, Australia, Schengen, Singapore, UAE, Thailand, Malaysia and New Zealand visas from India with Travlys. 98% approval across 5,000+ visas, transparent fees from ₹999. India-based, Ahmedabad office.',
    path: '/',
    keywords:
      'visa from india, visa assistance india, visa consultants india, us visa from india, uk visa from india, canada visa from india, schengen visa india, singapore visa, dubai visa, uae visa, thailand visa, malaysia visa, new zealand visa, tourist visa, business visa, visa consultants ahmedabad, travlys',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    imageAlt: DEFAULT_OG_ALT,
  }
}

// City × country meta. Targets queries like "USA visa from Mumbai" or
// "Schengen visa from Bengaluru" with their own static HTML, title,
// description and structured data.
export function getCityVisaMeta(dest, city) {
  const pagePath = `/visa/${dest.slug}/from/${city.slug}`
  const heroImage = dest.heroImage || dest.image
  return {
    title: `${dest.name} Visa from ${city.name}: Apply with Travlys (${city.state})`,
    description:
      `Apply for a ${dest.name} visa from ${city.name}, ${city.state} with Travlys. ` +
      `${dest.processingTime} processing, VFS at ${city.vfsCenter}, jurisdiction: ${city.nearestConsulate}. ` +
      `Service from ${dest.price}. 98% approval rate across 5,000+ Indian visas.`,
    path: pagePath,
    keywords: [
      `${dest.name.toLowerCase()} visa from ${city.name.toLowerCase()}`,
      `${dest.name.toLowerCase()} visa ${city.name.toLowerCase()}`,
      `${dest.name.toLowerCase()} visa consultants ${city.name.toLowerCase()}`,
      `${dest.name.toLowerCase()} visa agent ${city.name.toLowerCase()}`,
      `${dest.name.toLowerCase()} visa appointment ${city.name.toLowerCase()}`,
      `vfs ${city.name.toLowerCase()}`,
      `${city.name.toLowerCase()} ${dest.name.toLowerCase()} visa cost`,
      `travlys ${city.name.toLowerCase()}`,
    ].join(', '),
    type: 'article',
    image: heroImage,
    imageAlt: `${dest.name} visa assistance from ${city.name}, ${city.state} — Travlys`,
    city,
    dest,
  }
}

export function buildCityVisaSchemas(dest, city) {
  const pagePath = `/visa/${dest.slug}/from/${city.slug}`
  const canonical = `${SITE_URL}${pagePath}`
  const heroImage = dest.heroImage || dest.image
  const meta = getCityVisaMeta(dest, city)

  return [
    buildWebPageSchema(meta),
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: `${dest.name} Visa`, item: `${SITE_URL}/visa/${dest.slug}` },
        { '@type': 'ListItem', position: 3, name: `From ${city.name}`, item: canonical },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${canonical}#service`,
      serviceType: `${dest.name} Visa Assistance for ${city.name} Residents`,
      name: `${dest.name} Visa from ${city.name} via Travlys`,
      description: meta.description,
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: [
        { '@type': 'City', name: city.name, containedIn: { '@type': 'AdministrativeArea', name: city.state } },
        { '@type': 'AdministrativeArea', name: city.state },
      ],
      audience: { '@type': 'PeopleAudience', name: `Indian passport holders in ${city.name}` },
      url: canonical,
      image: heroImage,
      brand: { '@type': 'Brand', name: SITE_NAME },
      ...(dest.priceValue
        ? {
            offers: {
              '@type': 'Offer',
              price: String(dest.priceValue),
              priceCurrency: dest.currency || 'INR',
              availability: 'https://schema.org/InStock',
              url: canonical,
              seller: { '@id': `${SITE_URL}/#organization` },
            },
          }
        : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Place',
      '@id': `${canonical}#place`,
      name: city.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: city.name,
        addressRegion: city.state,
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: String(city.lat),
        longitude: String(city.lng),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `Where do I submit biometrics for a ${dest.name} visa from ${city.name}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `For a ${dest.name} visa from ${city.name}, biometrics are taken at the VFS centre in ${city.vfsCenter}. Travlys books the earliest available slot and prepares your full file before the appointment.`,
          },
        },
        {
          '@type': 'Question',
          name: `Which embassy or consulate handles ${dest.name} visa applications from ${city.name}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Applicants from ${city.name} (${city.state}) fall under the jurisdiction of the ${city.nearestConsulate} for ${dest.name} visa processing.`,
          },
        },
        {
          '@type': 'Question',
          name: `Can I apply for a ${dest.name} visa from ${city.name} without travelling to ${city.nearestConsulate.includes('Embassy') ? 'New Delhi' : 'the consulate city'}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Most of the application is online or at your local VFS in ${city.name}. You only travel to the consulate or embassy on the interview day. Travlys handles document prep, form filing and appointment booking remotely.`,
          },
        },
        {
          '@type': 'Question',
          name: `How much does a ${dest.name} visa cost from ${city.name}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Travlys service fee for a ${dest.name} visa starts at ${dest.price}. Embassy / VFS fees are paid separately to the authority. Total estimate depends on the visa subcategory and current FX.`,
          },
        },
      ],
    },
  ]
}

// City hub page — /from/:city — lists all 10 visa destinations
// available from that city. Captures head queries like
// "visa consultants in mumbai", "visa from delhi".
export function getCityHubMeta(city, destinations) {
  const pagePath = `/from/${city.slug}`
  const dests = destinations.map((d) => d.name).slice(0, 6).join(', ')
  return {
    title: `Visa Consultants in ${city.name} | Apply for ${dests} Visas | Travlys`,
    description:
      `Travlys files US, UK, Canada, Schengen, Singapore and more visas for ${city.name}, ${city.state} applicants. ` +
      `VFS at ${city.vfsCenter}. 98% approval across 5,000+ Indian visas, transparent fees from ₹999.`,
    path: pagePath,
    keywords: [
      `visa consultants in ${city.name.toLowerCase()}`,
      `visa agent ${city.name.toLowerCase()}`,
      `visa from ${city.name.toLowerCase()}`,
      `${city.name.toLowerCase()} visa services`,
      `vfs ${city.name.toLowerCase()}`,
      `${city.name.toLowerCase()} travel agent`,
      `tourist visa ${city.name.toLowerCase()}`,
      `business visa ${city.name.toLowerCase()}`,
      `travlys ${city.name.toLowerCase()}`,
    ].join(', '),
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    imageAlt: `Travlys, visa services in ${city.name}, ${city.state}`,
    city,
  }
}

export function buildCityHubSchemas(city, destinations) {
  const pagePath = `/from/${city.slug}`
  const canonical = `${SITE_URL}${pagePath}`
  const meta = getCityHubMeta(city, destinations)

  return [
    buildWebPageSchema(meta),
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: `Visa from ${city.name}`, item: canonical },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Place',
      '@id': `${canonical}#place`,
      name: city.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: city.name,
        addressRegion: city.state,
        addressCountry: 'IN',
      },
      geo: { '@type': 'GeoCoordinates', latitude: String(city.lat), longitude: String(city.lng) },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${canonical}#service`,
      serviceType: 'Visa Assistance',
      name: `Visa Services in ${city.name}, ${city.state}`,
      description: meta.description,
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: { '@type': 'City', name: city.name, containedIn: { '@type': 'AdministrativeArea', name: city.state } },
      audience: { '@type': 'PeopleAudience', name: `Indian passport holders in ${city.name}` },
      url: canonical,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `Visa destinations available from ${city.name}`,
      itemListElement: destinations.map((d, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `${d.name} Visa from ${city.name}`,
        url: `${SITE_URL}/visa/${d.slug}/from/${city.slug}`,
      })),
    },
  ]
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
