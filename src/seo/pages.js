// Meta and structured data for the standalone pages (about, contact,
// pricing, blog, visa questions). Shared by the React pages and by the
// build-time prerender so the static HTML and the live page always carry
// the same metadata. Plain JS, no JSX, so Node can import it.

import { destinations } from '../data/destinations.js'
import { BLOG_POSTS } from '../data/blog.js'
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
