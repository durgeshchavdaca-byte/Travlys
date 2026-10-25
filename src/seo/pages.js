// Meta and structured data for the standalone pages (about, contact,
// pricing, blog, visa questions). Shared by the React pages and by the
// build-time prerender so the static HTML and the live page always carry
// the same metadata. Plain JS, no JSX, so Node can import it.

import { destinations } from '../data/destinations.js'
import { BLOG_POSTS, categorySlug } from '../data/blog.js'
import { VISA_FEE_ROWS, LAST_CHECKED } from '../data/visaFees.js'
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  HOME_FAQS,
  pageUrl,
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildAggregateOfferSchema,
} from './config.js'

const ORG = { '@id': `${SITE_URL}/#organization` }

function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}

function crumbs(...items) {
  return buildBreadcrumbSchema([{ name: 'Home', url: `${SITE_URL}/` }, ...items])
}

// --- About -------------------------------------------------------------------

export const ABOUT_META = {
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

export function buildAboutSchemas() {
  return [
    buildWebPageSchema(ABOUT_META),
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      '@id': `${pageUrl('/about')}#aboutpage`,
      url: pageUrl('/about'),
      name: ABOUT_META.title,
      description: ABOUT_META.description,
      mainEntity: ORG,
    },
    crumbs({ name: 'About', url: pageUrl('/about') }),
  ]
}

// --- Contact -----------------------------------------------------------------

export const CONTACT_META = {
  title: 'Contact Travlys: WhatsApp, phone, email and Ahmedabad office',
  description:
    'Reach Travlys visa consultants on WhatsApp +91 82009 18967, by email at info@travlys.com, or visit our Ahmedabad office. Hours, address, and inquiry form.',
  path: '/contact',
  keywords:
    'contact travlys, travlys whatsapp, travlys phone, travlys ahmedabad office, visa consultants contact india',
  type: 'website',
  image: DEFAULT_OG_IMAGE,
  imageAlt: 'Contact Travlys visa consultants',
}

export function buildContactSchemas() {
  return [
    buildWebPageSchema(CONTACT_META),
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      '@id': `${pageUrl('/contact')}#contactpage`,
      url: pageUrl('/contact'),
      name: CONTACT_META.title,
      description: CONTACT_META.description,
      mainEntity: ORG,
    },
    crumbs({ name: 'Contact', url: pageUrl('/contact') }),
  ]
}

// --- Pricing -----------------------------------------------------------------

export const PRICING_META = {
  title: 'Travlys visa pricing: every country, every fee (2026)',
  description:
    'Transparent flat fees for every Travlys visa service. US, UK, Canada, Schengen, Singapore, UAE, Thailand and more from ₹999. Embassy / VFS fees paid separately.',
  path: '/pricing',
  keywords:
    'travlys pricing, visa cost from india, visa consultant fees india, us visa cost, schengen visa cost, dubai visa cost',
  type: 'website',
  image: DEFAULT_OG_IMAGE,
  imageAlt: 'Travlys pricing — every visa, every fee',
}

export const PRICING_FAQS = [
  {
    q: 'Are embassy / VFS fees included?',
    a: 'No. The price shown for each country is the Travlys service fee — what you pay us for our work. Embassy / VFS / VAC fees are paid separately to the respective authority. We never mark them up.',
  },
  {
    q: 'Is there a refund if the visa is refused?',
    a: 'Our service fee is non-refundable once the application is filed — we have already done the work. The embassy / government fee you paid is non-refundable regardless of who files. We do refund our service fee if we discontinue the application at our discretion (rare).',
  },
  {
    q: 'Are there urgency or rush fees?',
    a: 'No. The price you see is the only price. We do not have urgency surcharges, premium-route fees, or "express" tiers. If the timeline is tight we work harder, not more expensively.',
  },
  {
    q: 'Do prices vary by city?',
    a: 'No. The Travlys service fee is the same whether you are applying from Mumbai, Delhi, Bengaluru or anywhere else in India. No location surcharge.',
  },
  {
    q: 'What about for groups or families?',
    a: 'Pricing is per applicant. For families filing together (3+ applicants on the same trip), we discount the second and subsequent applications. WhatsApp us with the size of your group.',
  },
]

export function buildPricingSchemas() {
  return [
    buildWebPageSchema(PRICING_META),
    crumbs({ name: 'Pricing', url: pageUrl('/pricing') }),
    buildAggregateOfferSchema(destinations),
    faqSchema(PRICING_FAQS),
  ].filter(Boolean)
}

// --- Blog --------------------------------------------------------------------

export const BLOG_INDEX_META = {
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

export function buildBlogIndexSchemas() {
  return [
    buildWebPageSchema(BLOG_INDEX_META),
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': `${pageUrl('/blog')}#blog`,
      url: pageUrl('/blog'),
      name: `${SITE_NAME} editorial`,
      description: BLOG_INDEX_META.description,
      publisher: ORG,
      blogPost: BLOG_POSTS.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.title,
        url: pageUrl(`/blog/${p.slug}`),
        datePublished: p.date,
        author: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/` },
      })),
    },
    crumbs({ name: 'Blog', url: pageUrl('/blog') }),
  ]
}

export function getPostMeta(post) {
  return {
    title: post.metaTitle || `${post.title} | ${SITE_NAME}`,
    description: post.metaDescription || post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: post.tags?.join(', '),
    type: 'article',
    image: post.heroImage,
    imageAlt: post.title,
    published: post.date,
    modified: post.updated || post.date,
    section: post.category,
    tags: post.tags,
  }
}

export function buildPostSchemas(post) {
  const meta = getPostMeta(post)
  const canonical = pageUrl(meta.path)
  const articleBody = post.body
    .filter((n) => n.type === 'p' || n.type === 'h2' || n.type === 'h3')
    .map((n) => n.text)
    .join('\n\n')

  return [
    buildWebPageSchema(meta),
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${canonical}#post`,
      headline: post.title,
      description: meta.description,
      image: [post.heroImage],
      datePublished: post.date,
      dateModified: post.updated || post.date,
      author: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/` },
      publisher: ORG,
      mainEntityOfPage: canonical,
      articleBody: articleBody.slice(0, 2500),
      wordCount: articleBody.split(/\s+/).length,
      inLanguage: 'en-IN',
      keywords: post.tags?.join(', '),
      ...(post.sources?.length
        ? { citation: post.sources.map((src) => ({ '@type': 'CreativeWork', name: src.label, url: src.url })) }
        : {}),
    },
    crumbs({ name: 'Blog', url: pageUrl('/blog') }, { name: post.title, url: canonical }),
    ...(post.faqs?.length ? [faqSchema(post.faqs)] : []),
  ]
}

// --- Visa questions answered (the FAQ hub) -------------------------------------
// One page that collects every question the site already answers, grouped by
// topic. Short, direct answers in one place are what AI assistants quote.

export const QUESTIONS_META = {
  title: 'Visa questions answered: US, UK, Canada, Schengen & more (2026)',
  description:
    'Short, direct answers to the visa questions Indian travelers ask most: cost, processing time, documents, interviews and refusals for the US, UK, Canada, Schengen, Dubai and more.',
  path: '/visa-questions',
  keywords:
    'visa questions india, us visa questions, uk visa faq, canada visa faq, schengen visa faq, dubai visa faq, visa processing time india, visa cost india',
  type: 'website',
  image: DEFAULT_OG_IMAGE,
  imageAlt: 'Visa questions answered by Travlys',
}

export function getQuestionGroups() {
  const seen = new Set()
  const keep = (faqs) =>
    faqs.filter(({ q }) => {
      const key = q.trim().toLowerCase()
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })

  const groups = [
    { id: 'travlys', title: 'Working with Travlys', faqs: keep(HOME_FAQS) },
    { id: 'fees', title: 'Fees and refunds', faqs: keep(PRICING_FAQS) },
    ...destinations.map((d) => ({
      id: d.slug,
      title: `${d.name} visa`,
      href: `/visa/${d.slug}/`,
      faqs: keep(d.faqs || []),
    })),
    ...BLOG_POSTS.filter((p) => p.faqs?.length).map((p) => ({
      id: p.slug,
      title: p.title,
      href: `/blog/${p.slug}/`,
      faqs: keep(p.faqs),
    })),
  ]
  return groups.filter((g) => g.faqs.length)
}

export function buildQuestionsSchemas() {
  const all = getQuestionGroups().flatMap((g) => g.faqs)
  return [
    buildWebPageSchema(QUESTIONS_META),
    crumbs({ name: 'Visa questions', url: pageUrl('/visa-questions') }),
    faqSchema(all),
  ]
}

// --- Blog category pages ---------------------------------------------------------

const CATEGORY_BLURBS = {
  'Visa rule updates': 'The latest visa and entry rule changes for Indian passport holders, checked against official sources.',
  'Travel planning': 'Where Indians can travel easily right now, what entry needs, and how to plan the trip.',
  'Country guides': 'Full guides to applying for a visa to a specific country from India.',
  'Study abroad': 'Student visa rules and changes for Indian students heading abroad.',
}

export function getCategoryMeta(cat) {
  const blurb = CATEGORY_BLURBS[cat.name] || `Travlys guides on ${cat.name.toLowerCase()} for Indian travelers.`
  return {
    title: `${cat.name}: visa guides for Indian travelers`,
    description: `${blurb} ${cat.posts.length} guides from the Travlys visa team.`.slice(0, 160),
    path: `/blog/category/${cat.slug}`,
    keywords: `${cat.name.toLowerCase()}, visa guides india, travlys blog`,
    type: 'website',
    image: cat.posts[0]?.heroImage || DEFAULT_OG_IMAGE,
    imageAlt: `${cat.name}, Travlys blog`,
    blurb,
  }
}

export function buildCategorySchemas(cat) {
  const meta = getCategoryMeta(cat)
  return [
    buildWebPageSchema(meta),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${pageUrl(meta.path)}#collection`,
      url: pageUrl(meta.path),
      name: meta.title,
      description: meta.description,
      isPartOf: { '@id': `${pageUrl('/blog')}#blog` },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: cat.posts.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: pageUrl(`/blog/${p.slug}`),
          name: p.title,
        })),
      },
    },
    crumbs({ name: 'Blog', url: pageUrl('/blog') }, { name: cat.name, url: pageUrl(meta.path) }),
  ]
}

export { categorySlug }

// --- Visa fees table (a citable dataset) ------------------------------------------

export const VISA_FEES_META = {
  title: 'Visa fees for Indians 2026: cost, processing time and entry rules by country',
  description:
    'One table with the 2026 visa fee, processing time, validity and entry rule for Indians travelling to the US, UK, Canada, Schengen, Australia, Dubai, Thailand and more.',
  path: '/visa-fees',
  keywords:
    'visa fees for indians 2026, visa cost from india, us visa fee india, uk visa fee india, schengen visa fee india, canada visa fee india, dubai visa cost india',
  type: 'website',
  image: DEFAULT_OG_IMAGE,
  imageAlt: 'Visa fees for Indian passport holders, 2026',
}

export const VISA_FEES_FAQS = [
  {
    q: 'Which countries are visa-free for Indians in this table?',
    a: 'Thailand (up to 30 days since 15 September 2026) and Malaysia (up to 30 days until 31 December 2026). Both need a free digital arrival card before you fly. The UAE gives a 14-day visa on arrival to Indians who hold a valid US visa or green card, or a UK or EU visa or residence permit.',
  },
  {
    q: 'Which visa is the most expensive for Indians?',
    a: 'Among these countries, the New Zealand visitor visa (from NZD 441) and the US B1/B2 visa ($185) have the highest government fees, followed by the UK (£135) and Australia (AUD 250). Rupee amounts are approximate and move with exchange rates.',
  },
  {
    q: 'Are the Travlys fees included in the government fee?',
    a: 'No. The government fee goes to the embassy or immigration authority. The Travlys service fee is separate and covers preparing, checking and filing your application. Both are listed separately in the table.',
  },
]

export function buildVisaFeesSchemas() {
  const url = pageUrl(VISA_FEES_META.path)
  return [
    buildWebPageSchema(VISA_FEES_META),
    crumbs({ name: 'Visa fees', url }),
    {
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      '@id': `${url}#dataset`,
      name: 'Visa fees and entry rules for Indian passport holders, 2026',
      description:
        'Government visa fee, approximate rupee cost, processing time, validity, stay and entry route for Indian citizens visiting 10 countries, with the official source for each row.',
      url,
      creator: ORG,
      publisher: ORG,
      license: 'https://creativecommons.org/licenses/by/4.0/',
      isAccessibleForFree: true,
      dateModified: LAST_CHECKED,
      temporalCoverage: '2026',
      spatialCoverage: { '@type': 'Place', name: 'India' },
      keywords: ['visa fees', 'Indian passport', 'visa processing time', 'visa-free countries for Indians'],
      variableMeasured: ['Government fee', 'Processing time', 'Validity', 'Stay per visit', 'Entry route'],
      distribution: [
        {
          '@type': 'DataDownload',
          encodingFormat: 'text/csv',
          contentUrl: `${SITE_URL}/data/visa-fees-for-indians-2026.csv`,
        },
      ],
      isBasedOn: VISA_FEE_ROWS.map((r) => r.source).filter(Boolean),
    },
    faqSchema(VISA_FEES_FAQS),
  ]
}
