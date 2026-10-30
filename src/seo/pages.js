// Meta and structured data for the standalone pages (about, contact,
// pricing, blog, visa questions). Shared by the React pages and by the
// build-time prerender so the static HTML and the live page always carry
// the same metadata. Plain JS, no JSX, so Node can import it.

import { destinations } from '../data/destinations.js'
import { BLOG_POSTS, categorySlug } from '../data/blog.js'
import { VISA_FEE_ROWS, LAST_CHECKED } from '../data/visaFees.js'
import { TRAVEL_NEWS, NEWS_UPDATED, getLatestNews, getUpcomingNews, formatNewsDate } from '../data/travelNews.js'
import { GLOSSARY, ALL_TERMS, GLOSSARY_UPDATED, termId } from '../data/glossary.js'
import { COUNTRIES, CHECKER_UPDATED, STATUS_LABEL } from '../data/visaChecker.js'
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

// --- Travel news (dated updates) ----------------------------------------------
// A dated feed of visa and entry changes. Each item names its date and source,
// which is what search engines and AI assistants look for in "latest" queries.

const NEWS_MONTH = formatNewsDate(NEWS_UPDATED, { month: 'long', year: 'numeric' })

export const NEWS_META = {
  title: `Visa and travel news for Indians: latest updates (${NEWS_MONTH})`,
  description:
    'The latest visa and entry rule changes for Indian passport holders, newest first: what changed, when, and the official source. Checked by the Travlys visa team.',
  path: '/travel-news',
  keywords:
    'visa news india, travel news india, latest visa rules for indians, visa update today, new visa rules 2026 india, visa-free countries news',
  type: 'website',
  image: DEFAULT_OG_IMAGE,
  imageAlt: 'Visa and travel news for Indian travellers',
}

export function getNewsFaqs() {
  const top = getLatestNews(3)
  const list = top.map((n) => `${n.headline} (${formatNewsDate(n.date)})`).join('; ')
  return [
    {
      q: 'What are the latest visa changes for Indian travellers?',
      a: `As of ${formatNewsDate(NEWS_UPDATED)}, the most recent changes are: ${list}. Each item on this page links to the official source and to a full Travlys guide.`,
    },
    {
      q: 'Where can I check if a visa rule has changed before I travel?',
      a: 'Always confirm on the official source for that country: its immigration department, embassy or consulate in India. Every item on this page names and links that source. If you are filing with Travlys, your specialist rechecks the rules for your destination before your application goes in.',
    },
  ]
}

export function buildNewsSchemas() {
  const url = pageUrl(NEWS_META.path)
  const items = [...getUpcomingNews(), ...getLatestNews(TRAVEL_NEWS.length)]
  return [
    { ...buildWebPageSchema(NEWS_META), dateModified: NEWS_UPDATED },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${url}#collection`,
      url,
      name: NEWS_META.title,
      description: NEWS_META.description,
      dateModified: NEWS_UPDATED,
      publisher: ORG,
      mainEntity: {
        '@type': 'ItemList',
        itemListOrder: 'https://schema.org/ItemListOrderDescending',
        numberOfItems: items.length,
        itemListElement: items.map((n, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${url}#${newsAnchor(n)}`,
          name: n.headline,
          description: n.summary,
        })),
      },
    },
    crumbs({ name: 'Travel news', url }),
    faqSchema(getNewsFaqs()),
  ]
}

// Stable in-page anchor for one news item, e.g. "2026-10-26-australia-starts".
export function newsAnchor(n) {
  const words = n.headline.toLowerCase().replace(/[^a-z0-9 ]+/g, '').split(/\s+/).slice(0, 3).join('-')
  return `${n.date}-${words}`
}

// --- Visa glossary (defined terms) ---------------------------------------------
// Plain-English definitions of visa terms. DefinedTermSet tells search engines
// and AI assistants these are definitions, each with its own anchor URL.

export const GLOSSARY_META = {
  title: 'Visa glossary: visa terms explained for Indian travellers',
  description: `${ALL_TERMS.length} visa terms explained in plain English: VFS, biometrics, 214(b), 221(g), the Schengen 90/180 rule, e-Visa vs visa on arrival, ETA, IHS, CAS, PCC and more.`,
  path: '/visa-glossary',
  keywords:
    'visa glossary, visa terms meaning, what is vfs, what is 221g, what is 214b, schengen 90 180 rule, visa on arrival meaning, e visa meaning, ok to board meaning',
  type: 'website',
  image: DEFAULT_OG_IMAGE,
  imageAlt: 'Visa terms explained by Travlys',
}

export { GLOSSARY, termId }

export function buildGlossarySchemas() {
  const url = pageUrl(GLOSSARY_META.path)
  return [
    { ...buildWebPageSchema(GLOSSARY_META), dateModified: GLOSSARY_UPDATED },
    {
      '@context': 'https://schema.org',
      '@type': 'DefinedTermSet',
      '@id': `${url}#glossary`,
      name: 'Visa glossary for Indian travellers',
      description: GLOSSARY_META.description,
      url,
      inLanguage: 'en-IN',
      publisher: ORG,
      dateModified: GLOSSARY_UPDATED,
      hasDefinedTerm: ALL_TERMS.map((t) => ({
        '@type': 'DefinedTerm',
        '@id': `${url}#${termId(t)}`,
        name: t.term,
        description: t.definition,
        url: `${url}#${termId(t)}`,
        inDefinedTermSet: { '@id': `${url}#glossary` },
      })),
    },
    crumbs({ name: 'Visa glossary', url }),
  ]
}


// --- Free tools (calculators) -----------------------------------------------------
// WebApplication + FAQPage. The FAQs carry the direct answers people search
// for, so the pages are useful to search engines and AI assistants even
// without running the calculator.

function toolSchema(meta, name) {
  const url = pageUrl(meta.path)
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${url}#app`,
    name,
    url,
    description: meta.description,
    applicationCategory: 'TravelApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    publisher: ORG,
    inLanguage: 'en-IN',
  }
}

export const SCHENGEN_CALC_META = {
  title: 'Schengen 90/180 day calculator: how many days can I stay?',
  description:
    'Free Schengen calculator for Indian travellers. Enter your past trips and next entry date to see days used, days left and the last day you can stay under the 90/180 rule.',
  path: '/schengen-calculator',
  keywords:
    'schengen calculator, schengen 90 180 calculator, 90 180 rule calculator, schengen days calculator, how many days can i stay in schengen, schengen stay calculator india',
  type: 'website',
  image: DEFAULT_OG_IMAGE,
  imageAlt: 'Schengen 90/180 day calculator by Travlys',
}

export const SCHENGEN_CALC_FAQS = [
  {
    q: 'What is the Schengen 90/180 rule?',
    a: 'You can stay up to 90 days in any rolling 180-day period across all Schengen countries combined. On any day of your trip, count back 180 days including that day: the days you spent in the Schengen area in that window must not add up to more than 90.',
  },
  {
    q: 'Do the entry and exit days count?',
    a: 'Yes. The day you enter and the day you leave both count as full days, even if you land late at night or fly out early in the morning. A trip from 1 to 10 June uses 10 days.',
  },
  {
    q: 'Which countries count towards the 90 days?',
    a: 'All 29 Schengen countries, including Bulgaria and Romania, which became full Schengen members on 1 January 2025. Days in the UK, Ireland, Cyprus or Türkiye do not count, because they are not in the Schengen area.',
  },
  {
    q: 'Does a new Schengen visa reset my 90 days?',
    a: 'No. The count follows the days you actually spent in the Schengen area, not the visa you used. If you used most of your 90 days recently, a new visa does not give you fresh days until the old ones fall outside the 180-day window.',
  },
  {
    q: 'Is the 90/180 rule the same as the days on my visa?',
    a: 'Not always. Your visa shows its own validity dates and number of days allowed, and you must respect both the visa and the 90/180 rule, whichever is stricter. A visa valid for 15 days only allows 15 days, even if you have more left under the 90/180 rule.',
  },
  {
    q: 'What happens if I overstay in the Schengen area?',
    a: 'Overstaying can lead to a fine, removal, an entry ban and refusals on future visa applications. Since April 2026 the Entry/Exit System records your entries and exits digitally, so overstays are detected automatically at the border.',
  },
]

export function buildSchengenCalcSchemas() {
  return [
    buildWebPageSchema(SCHENGEN_CALC_META),
    toolSchema(SCHENGEN_CALC_META, 'Schengen 90/180 day calculator'),
    crumbs({ name: 'Schengen calculator', url: pageUrl(SCHENGEN_CALC_META.path) }),
    faqSchema(SCHENGEN_CALC_FAQS),
  ]
}

export const VISA_COST_META = {
  title: 'Visa cost calculator: total visa fees from India for your family',
  description:
    'Free visa cost calculator for Indians. See the 2026 government visa fee in rupees for the US, UK, Canada, Schengen, Australia, Dubai, Singapore and more, plus the Travlys fee, for any number of travellers.',
  path: '/visa-cost-calculator',
  keywords:
    'visa cost calculator, visa fee calculator india, us visa cost from india, uk visa cost india, schengen visa cost india, canada visa cost india, dubai visa cost india, visa fees for family',
  type: 'website',
  image: DEFAULT_OG_IMAGE,
  imageAlt: 'Visa cost calculator by Travlys',
}

const COST_NAME = {
  'usa-visa': 'a US visa',
  'uk-visa': 'a UK visa',
  'canada-visa': 'a Canada visitor visa',
  'australia-visa': 'an Australian visa',
  'netherlands-visa': 'a Schengen visa',
  'singapore-visa': 'a Singapore visa',
  'uae-visa': 'a Dubai (UAE) visa',
  'new-zealand-visa': 'a New Zealand visa',
}

export function getVisaCostFaqs() {
  const inr = (n) => `₹${n.toLocaleString('en-IN')}`
  return VISA_FEE_ROWS.filter((r) => COST_NAME[r.slug] && r.governmentFeeInr > 0).map((r) => ({
    q: `How much does ${COST_NAME[r.slug]} cost from India in 2026?`,
    a: `The government fee is ${/^INR/.test(r.governmentFee) ? inr(r.governmentFeeInr) : `${r.governmentFee} (about ${inr(r.governmentFeeInr)})`} per applicant, paid to ${r.paidTo}. If you file with Travlys, the service fee starts at ${inr(r.travlysFeeInr)} per applicant. Visa-centre charges, courier and insurance are extra. Typical processing: ${r.processing}.`,
  }))
}

export function buildVisaCostSchemas() {
  return [
    buildWebPageSchema(VISA_COST_META),
    toolSchema(VISA_COST_META, 'Visa cost calculator for Indian travellers'),
    crumbs({ name: 'Visa cost calculator', url: pageUrl(VISA_COST_META.path) }),
    faqSchema(getVisaCostFaqs()),
  ]
}

// --- Visa checker ("Do Indians need a visa?") ------------------------------------
// One direct question and answer per destination, built from the same facts as
// the guides it links to. This is the most common visa question people ask
// search engines and AI assistants.

export const VISA_CHECKER_META = {
  title: 'Do Indians need a visa? Visa checker for Indian passport holders (2026)',
  description: `Check visa rules for Indians in ${COUNTRIES.length} destinations: visa-free, visa on arrival, e-visa or embassy visa, with stay, cost and what to do before you fly.`,
  path: '/visa-checker',
  keywords:
    'do indians need visa, visa free countries for indians, visa on arrival for indians, indian passport visa requirements, visa checker india, do i need a visa for',
  type: 'website',
  image: DEFAULT_OG_IMAGE,
  imageAlt: 'Visa checker for Indian passport holders by Travlys',
}

export function getVisaCheckerFaqs() {
  return [...COUNTRIES]
    .sort((a, b) => a.country.localeCompare(b.country))
    .map((c) => ({
      q: `Do Indians need a visa for ${c.country}?`,
      a: [
        `${c.headline}.`.replace(/\.\.$/, '.'),
        c.stay ? `Stay: ${c.stay}.` : '',
        c.cost ? `Cost: ${c.cost}.` : '',
        c.before_you_fly ? `Before you fly: ${c.before_you_fly}`.replace(/([^.])$/, '$1.') : '',
        c.note ? c.note.replace(/([^.])$/, '$1.') : '',
      ]
        .filter(Boolean)
        .join(' '),
    }))
}

export function buildVisaCheckerSchemas() {
  const url = pageUrl(VISA_CHECKER_META.path)
  return [
    { ...buildWebPageSchema(VISA_CHECKER_META), dateModified: CHECKER_UPDATED },
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      '@id': `${url}#app`,
      name: 'Visa checker for Indian passport holders',
      url,
      description: VISA_CHECKER_META.description,
      applicationCategory: 'TravelApplication',
      operatingSystem: 'Any',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
      publisher: ORG,
      inLanguage: 'en-IN',
    },
    crumbs({ name: 'Visa checker', url }),
    faqSchema(getVisaCheckerFaqs()),
  ]
}

export { COUNTRIES as CHECKER_COUNTRIES, CHECKER_UPDATED, STATUS_LABEL }

