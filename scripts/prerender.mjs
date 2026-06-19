// Build-time prerender: generates a separate index.html for each route
// (home + every visa page) with route-specific <title>, meta, canonical,
// OG/Twitter, and JSON-LD baked into the HTML.
//
// Also regenerates dist/sitemap.xml with fresh lastmod dates so search
// engines see updated freshness signals on every deploy.
//
// Why: GitHub Pages serves the SPA shell for every URL. Crawlers that
// don't run JS (LinkedIn / Facebook / WhatsApp / Slack link previews,
// some Bing/Yandex bots) only see what's in index.html. With this
// script, every route ships static, route-specific metadata while
// React still hydrates the body for the user.
//
// The runtime SEO component dedupes head tags on mount, so the
// React-managed copy replaces the static copy for JS-enabled clients
// (no duplicates).

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { destinations } from '../src/data/destinations.js'
import { CITIES } from '../src/data/cities.js'
import { reviews } from '../src/data/reviews.js'
import { FEATURED_TESTIMONIALS } from '../src/data/testimonials.js'
import { BLOG_POSTS } from '../src/data/blog.js'
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_ALT,
  DEFAULT_LOCALE,
  buildHomeSchemas,
  buildVisaSchemas,
  buildCityVisaSchemas,
  buildCityHubSchemas,
  buildWebPageSchema,
  buildAggregateOfferSchema,
  getHomeMeta,
  getVisaMeta,
  getCityVisaMeta,
  getCityHubMeta,
} from '../src/seo/config.js'

const __filename = fileURLToPath(import.meta.url)
const dist = path.resolve(path.dirname(__filename), '..', 'dist')

function escapeAttr(s = '') {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function escapeHtml(s = '') {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function escapeXml(s = '') {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function buildHead(meta, schemas) {
  const fullTitle = meta.title?.includes(SITE_NAME)
    ? meta.title
    : `${meta.title} | ${SITE_NAME}`
  const canonical = `${SITE_URL}${meta.path}`
  const robots = meta.noindex
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

  const tags = [
    `<title>${escapeHtml(fullTitle)}</title>`,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
    meta.keywords ? `<meta name="keywords" content="${escapeAttr(meta.keywords)}" />` : '',
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<link rel="alternate" hreflang="en-in" href="${canonical}" />`,
    `<link rel="alternate" hreflang="en" href="${canonical}" />`,
    `<link rel="alternate" hreflang="x-default" href="${canonical}" />`,
    `<meta property="og:type" content="${meta.type || 'website'}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="${DEFAULT_LOCALE}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:title" content="${escapeAttr(fullTitle)}" />`,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
    `<meta property="og:image" content="${meta.image || DEFAULT_OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeAttr(meta.imageAlt || DEFAULT_OG_ALT)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(fullTitle)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`,
    `<meta name="twitter:image" content="${meta.image || DEFAULT_OG_IMAGE}" />`,
    `<meta name="twitter:image:alt" content="${escapeAttr(meta.imageAlt || DEFAULT_OG_ALT)}" />`,
    ...schemas.map(
      (s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`
    ),
  ]
    .filter(Boolean)
    .join('\n    ')

  return tags
}

function stripDefaults(html) {
  const patterns = [
    /<title>[\s\S]*?<\/title>/,
    /<meta\s+name="description"[^>]*\/?>/,
    /<meta\s+name="keywords"[^>]*\/?>/,
    /<meta\s+name="robots"[^>]*\/?>/,
    /<meta\s+name="googlebot"[^>]*\/?>/,
    /<link\s+rel="canonical"[^>]*\/?>/,
    /<link\s+rel="alternate"\s+hreflang="[^"]+"[^>]*\/?>/g,
    /<meta\s+property="og:type"[^>]*\/?>/,
    /<meta\s+property="og:site_name"[^>]*\/?>/,
    /<meta\s+property="og:locale"[^>]*\/?>/,
    /<meta\s+property="og:url"[^>]*\/?>/,
    /<meta\s+property="og:title"[^>]*\/?>/,
    /<meta\s+property="og:description"[^>]*\/?>/,
    /<meta\s+property="og:image(?::[a-z]+)?"[^>]*\/?>/g,
    /<meta\s+name="twitter:title"[^>]*\/?>/,
    /<meta\s+name="twitter:description"[^>]*\/?>/,
    /<meta\s+name="twitter:image(?::[a-z]+)?"[^>]*\/?>/g,
  ]
  let out = html
  for (const p of patterns) {
    out = out.replace(p, '')
  }
  return out
}

function renderRoute(template, meta, schemas) {
  const head = buildHead(meta, schemas)
  let html = stripDefaults(template)
  const marker = '<meta http-equiv="X-UA-Compatible" content="IE=edge" />'
  if (html.includes(marker)) {
    html = html.replace(marker, `${marker}\n\n    <!-- prerendered SEO -->\n    ${head}\n`)
  } else {
    html = html.replace('</head>', `    ${head}\n</head>`)
  }
  return html
}

function buildSitemap(destinations, cities, today) {
  const url = (path) => `${SITE_URL}${path}`
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/0.9">',
    '  <url>',
    `    <loc>${url('/')}</loc>`,
    `    <lastmod>${today}</lastmod>`,
    '    <changefreq>weekly</changefreq>',
    '    <priority>1.0</priority>',
    `    <xhtml:link rel="alternate" hreflang="en-in" href="${url('/')}" />`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${url('/')}" />`,
    '    <image:image>',
    `      <image:loc>${escapeXml(DEFAULT_OG_IMAGE)}</image:loc>`,
    '      <image:title>Travlys, Visa Assistance for Indian Travelers</image:title>',
    '      <image:caption>Apply for US, UK, Canada, Schengen and more visas from India.</image:caption>',
    '    </image:image>',
    '  </url>',
  ]
  for (const d of destinations) {
    const heroImage = (d.heroImage || d.image || '').replace(/\?.*$/, '?w=1200&h=630&fit=crop')
    lines.push(
      '  <url>',
      `    <loc>${url(`/visa/${d.slug}`)}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      '    <changefreq>monthly</changefreq>',
      `    <priority>0.9</priority>`,
      `    <xhtml:link rel="alternate" hreflang="en-in" href="${url(`/visa/${d.slug}`)}" />`,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${url(`/visa/${d.slug}`)}" />`,
      '    <image:image>',
      `      <image:loc>${escapeXml(heroImage)}</image:loc>`,
      `      <image:title>${escapeXml(d.name)} Visa for Indian Citizens</image:title>`,
      `      <image:caption>${escapeXml(d.metaDescription || d.description || '').slice(0, 200)}</image:caption>`,
      '    </image:image>',
      '  </url>',
    )
    // City × country variants — programmatic SEO for "<country> visa from <city>".
    for (const c of cities) {
      const p = `/visa/${d.slug}/from/${c.slug}`
      lines.push(
        '  <url>',
        `    <loc>${url(p)}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        '    <changefreq>monthly</changefreq>',
        `    <priority>0.7</priority>`,
        `    <xhtml:link rel="alternate" hreflang="en-in" href="${url(p)}" />`,
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${url(p)}" />`,
        '  </url>',
      )
    }
  }
  // City hub pages /from/<city>
  for (const c of cities) {
    const p = `/from/${c.slug}`
    lines.push(
      '  <url>',
      `    <loc>${url(p)}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      '    <changefreq>weekly</changefreq>',
      `    <priority>0.8</priority>`,
      `    <xhtml:link rel="alternate" hreflang="en-in" href="${url(p)}" />`,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${url(p)}" />`,
      '  </url>',
    )
  }
  // Standalone pages: about / contact / pricing / blog index
  for (const p of ['/about', '/contact', '/pricing', '/blog']) {
    lines.push(
      '  <url>',
      `    <loc>${url(p)}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      '    <changefreq>weekly</changefreq>',
      `    <priority>0.85</priority>`,
      `    <xhtml:link rel="alternate" hreflang="en-in" href="${url(p)}" />`,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${url(p)}" />`,
      '  </url>',
    )
  }
  // Blog posts
  for (const post of BLOG_POSTS) {
    const p = `/blog/${post.slug}`
    lines.push(
      '  <url>',
      `    <loc>${url(p)}</loc>`,
      `    <lastmod>${post.date || today}</lastmod>`,
      '    <changefreq>monthly</changefreq>',
      `    <priority>0.8</priority>`,
      `    <xhtml:link rel="alternate" hreflang="en-in" href="${url(p)}" />`,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${url(p)}" />`,
      '    <image:image>',
      `      <image:loc>${escapeXml(post.heroImage)}</image:loc>`,
      `      <image:title>${escapeXml(post.title)}</image:title>`,
      `      <image:caption>${escapeXml(post.excerpt).slice(0, 200)}</image:caption>`,
      '    </image:image>',
      '  </url>',
    )
  }
  lines.push('</urlset>')
  return lines.join('\n') + '\n'
}

// llms.txt, emerging convention for letting AI search tools discover
// your site's structure and key URLs. Cheap to ship, no downside.
function buildLlmsTxt(destinations) {
  const lines = [
    `# ${SITE_NAME}`,
    '',
    '> Travlys is an India-based visa-assistance service. We file tourist, business, student and work visas to 10+ countries with a 98% approval rate across 5,000+ applications, transparent flat fees from ₹999, and one named specialist per file.',
    '',
    '## Core pages',
    `- [Home](${SITE_URL}/): visa search, pricing table, how it works, FAQ`,
    `- [Pricing](${SITE_URL}/#pricing): every country, every fee, no asterisks`,
    `- [FAQ](${SITE_URL}/#faq): processing time, refunds, refusals, contact`,
    '',
    '## Visa destination pages',
    ...destinations.map(
      (d) =>
        `- [${d.name} Visa](${SITE_URL}/visa/${d.slug}): ${d.tagline || d.subtitle}, from ${d.price}, processing ${d.processingTime}`,
    ),
    '',
    '## Contact',
    `- WhatsApp: ${SITE_URL.replace(/\/$/, '')} / WhatsApp +91 82009 18967`,
    `- Email: info@travlys.com`,
    `- Office: 605, Shivalik Shilp II, Near Hotel ITC Narmada, Keshav Baug, Vastrapur, Ahmedabad, Gujarat 380015, India`,
    '',
  ]
  return lines.join('\n') + '\n'
}

function buildHtmlSitemap(destinations, cities, today) {
  const u = (p) => `${SITE_URL}${p}`
  const linkList = (items) =>
    items.map((it) => `      <li><a href="${it.href}">${escapeHtml(it.label)}</a></li>`).join('\n')

  const countryLinks = destinations.map((d) => ({ href: u(`/visa/${d.slug}`), label: `${d.name} Visa` }))
  const cityHubLinks = cities.map((c) => ({ href: u(`/from/${c.slug}`), label: `Visa from ${c.name}` }))
  const standaloneLinks = [
    { href: u('/about'), label: 'About Travlys' },
    { href: u('/pricing'), label: 'Pricing' },
    { href: u('/contact'), label: 'Contact' },
    { href: u('/blog'), label: 'Editorial blog' },
  ]
  const blogLinks = BLOG_POSTS.map((p) => ({ href: u(`/blog/${p.slug}`), label: p.title }))

  // City × country grid, 120 entries grouped by destination
  const cityVisaSections = destinations
    .map(
      (d) => `    <h3>${escapeHtml(d.name)} visa, from any city</h3>\n    <ul>\n${
        cities.map((c) => `      <li><a href="${u(`/visa/${d.slug}/from/${c.slug}`)}">${escapeHtml(d.name)} visa from ${escapeHtml(c.name)}</a></li>`).join('\n')
      }\n    </ul>`,
    )
    .join('\n\n')

  return `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Sitemap | Travlys</title>
<meta name="description" content="Every visa page on Travlys — home, 10 country pages, 12 city hubs, and 120 city × country combinations.">
<link rel="canonical" href="${u('/sitemap.html')}">
<meta name="robots" content="index, follow">
<style>
  body { font-family: 'Switzer', system-ui, sans-serif; max-width: 900px; margin: 0 auto; padding: 48px 24px; line-height: 1.6; color: #2d3142; background: #faf9f5; }
  h1 { font-size: 2rem; font-weight: 800; color: #0f1b4c; margin: 0 0 8px; letter-spacing: -0.02em; }
  h2 { font-size: 1.2rem; font-weight: 700; color: #0f1b4c; margin: 32px 0 12px; letter-spacing: -0.01em; border-bottom: 1px solid #ece9df; padding-bottom: 8px; }
  h3 { font-size: 0.95rem; font-weight: 700; color: #0f1b4c; margin: 20px 0 8px; }
  ul { padding-left: 18px; margin: 0 0 14px; columns: 2; column-gap: 32px; }
  li { margin: 4px 0; break-inside: avoid; }
  a { color: #0f1b4c; text-decoration: none; border-bottom: 1px solid transparent; }
  a:hover { border-bottom-color: #ff7849; color: #ff7849; }
  .lede { color: #5a6072; font-size: 0.95rem; margin: 0 0 32px; }
  .meta { color: #8c92a4; font-size: 0.78rem; margin-top: 48px; padding-top: 16px; border-top: 1px solid #ece9df; }
  @media (max-width: 600px) { ul { columns: 1; } }
</style>
</head>
<body>
<h1>Travlys sitemap</h1>
<p class="lede">Every page Travlys publishes, in one index. Updated ${today}.</p>

<h2>Home</h2>
<ul>
  <li><a href="${u('/')}">Travlys home, visa assistance for Indian travelers</a></li>
</ul>

<h2>Core pages</h2>
<ul>
${linkList(standaloneLinks)}
</ul>

<h2>Visa destinations</h2>
<ul>
${linkList(countryLinks)}
</ul>

<h2>City visa hubs</h2>
<ul>
${linkList(cityHubLinks)}
</ul>

<h2>Editorial blog (${blogLinks.length} posts)</h2>
<ul>
${linkList(blogLinks)}
</ul>

<h2>Visa by city + country (${destinations.length * cities.length} pages)</h2>
${cityVisaSections}

<p class="meta">
  Programmatic index. XML sitemap for search engines:
  <a href="${u('/sitemap.xml')}">sitemap.xml</a>.
  AI-bot index: <a href="${u('/llms.txt')}">llms.txt</a>.
</p>
</body>
</html>
`
}

async function main() {
  const indexPath = path.join(dist, 'index.html')
  const template = await fs.readFile(indexPath, 'utf8')

  const routes = []

  // Home, overwrite dist/index.html with home-specific meta
  const homeMeta = getHomeMeta()
  const homeSchemas = buildHomeSchemas(destinations, reviews, FEATURED_TESTIMONIALS)
  const homeHtml = renderRoute(template, homeMeta, homeSchemas)
  await fs.writeFile(indexPath, homeHtml)
  routes.push('/')

  // Visa pages, write dist/visa/<slug>/index.html
  for (const dest of destinations) {
    const meta = getVisaMeta(dest)
    const schemas = buildVisaSchemas(dest)
    const html = renderRoute(template, meta, schemas)
    const dir = path.join(dist, 'visa', dest.slug)
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(path.join(dir, 'index.html'), html)
    routes.push(meta.path)
  }

  // City × country pages, write dist/visa/<slug>/from/<city>/index.html
  // for every combination. 10 dests × 12 cities = 120 new SEO pages.
  for (const dest of destinations) {
    for (const city of CITIES) {
      const meta = getCityVisaMeta(dest, city)
      const schemas = buildCityVisaSchemas(dest, city)
      const html = renderRoute(template, meta, schemas)
      const dir = path.join(dist, 'visa', dest.slug, 'from', city.slug)
      await fs.mkdir(dir, { recursive: true })
      await fs.writeFile(path.join(dir, 'index.html'), html)
      routes.push(meta.path)
    }
  }

  // City hub pages, write dist/from/<city>/index.html for each city.
  // Captures "visa consultants in <city>" head queries with a dedicated
  // landing that lists every destination available from that city.
  for (const city of CITIES) {
    const meta = getCityHubMeta(city, destinations)
    const schemas = buildCityHubSchemas(city, destinations)
    const html = renderRoute(template, meta, schemas)
    const dir = path.join(dist, 'from', city.slug)
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(path.join(dir, 'index.html'), html)
    routes.push(meta.path)
  }

  // Standalone pages: /about, /contact, /pricing
  const standalones = [
    {
      path: '/about',
      title: 'About Travlys: India-based visa consultants, 5,000+ visas filed',
      description: 'Travlys is an India-based visa consultancy headquartered in Ahmedabad. 5,000+ visas filed, 98% approval rate, 10 destinations, flat fees from ₹999. Here is who we are and how we work.',
      keywords: 'about travlys, travlys visa consultants, visa consultancy ahmedabad, india visa agency',
      extra: [{ '@context': 'https://schema.org', '@type': 'AboutPage', '@id': `${SITE_URL}/about#aboutpage`, url: `${SITE_URL}/about`, mainEntity: { '@id': `${SITE_URL}/#organization` } }],
    },
    {
      path: '/contact',
      title: 'Contact Travlys: WhatsApp, phone, email and Ahmedabad office',
      description: 'Reach Travlys visa consultants on WhatsApp +91 82009 18967, by email at info@travlys.com, or visit our Ahmedabad office. Hours, address, and inquiry form.',
      keywords: 'contact travlys, travlys whatsapp, travlys phone, travlys ahmedabad office',
      extra: [{ '@context': 'https://schema.org', '@type': 'ContactPage', '@id': `${SITE_URL}/contact#contactpage`, url: `${SITE_URL}/contact`, mainEntity: { '@id': `${SITE_URL}/#organization` } }],
    },
    {
      path: '/pricing',
      title: 'Travlys visa pricing: every country, every fee (2026)',
      description: 'Transparent flat fees for every Travlys visa service. US, UK, Canada, Schengen, Singapore, UAE, Thailand and more from ₹999. Embassy / VFS fees paid separately.',
      keywords: 'travlys pricing, visa cost from india, visa consultant fees india',
      extra: [buildAggregateOfferSchema(destinations)].filter(Boolean),
    },
  ]
  for (const sp of standalones) {
    const meta = { ...sp, image: DEFAULT_OG_IMAGE, type: 'website' }
    const schemas = [
      buildWebPageSchema(meta),
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: sp.path.slice(1).replace(/^\w/, (c) => c.toUpperCase()), item: `${SITE_URL}${sp.path}` },
        ],
      },
      ...(sp.extra || []),
    ]
    const html = renderRoute(template, meta, schemas)
    const dir = path.join(dist, sp.path.slice(1))
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(path.join(dir, 'index.html'), html)
    routes.push(sp.path)
  }

  // Blog index + posts
  const blogIndexMeta = {
    title: 'Visa guides and how-tos for Indian travelers | Travlys Blog',
    description: 'Honest, no-fluff guides from Travlys visa consultants — US visa from India 2026, Schengen checklist, DS-160 mistakes, Dubai visa cost breakdown, and more.',
    path: '/blog',
    keywords: 'visa guide india, us visa guide india, schengen visa guide, ds-160 mistakes, dubai visa cost, travlys blog',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
  }
  const blogIndexSchemas = [
    buildWebPageSchema(blogIndexMeta),
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': `${SITE_URL}/blog#blog`,
      url: `${SITE_URL}/blog`,
      name: `${SITE_NAME} editorial`,
      description: blogIndexMeta.description,
      publisher: { '@id': `${SITE_URL}/#organization` },
      blogPost: BLOG_POSTS.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.title,
        url: `${SITE_URL}/blog/${p.slug}`,
        datePublished: p.date,
        author: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/` },
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
  {
    const html = renderRoute(template, blogIndexMeta, blogIndexSchemas)
    const dir = path.join(dist, 'blog')
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(path.join(dir, 'index.html'), html)
    routes.push('/blog')
  }

  for (const post of BLOG_POSTS) {
    const meta = {
      title: post.metaTitle || `${post.title} | ${SITE_NAME}`,
      description: post.metaDescription || post.excerpt,
      path: `/blog/${post.slug}`,
      keywords: post.tags?.join(', '),
      type: 'article',
      image: post.heroImage,
      imageAlt: post.title,
    }
    const articleBody = post.body
      .filter((n) => n.type === 'p' || n.type === 'h2' || n.type === 'h3')
      .map((n) => n.text)
      .join('\n\n')
    const schemas = [
      buildWebPageSchema(meta),
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `${SITE_URL}${meta.path}#post`,
        headline: post.title,
        description: meta.description,
        image: [post.heroImage],
        datePublished: post.date,
        dateModified: post.date,
        author: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/` },
        publisher: { '@id': `${SITE_URL}/#organization` },
        mainEntityOfPage: `${SITE_URL}${meta.path}`,
        articleBody: articleBody.slice(0, 2500),
        wordCount: articleBody.split(/\s+/).length,
        inLanguage: 'en-IN',
        keywords: post.tags?.join(', '),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}${meta.path}` },
        ],
      },
      ...(post.faqs?.length
        ? [
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: post.faqs.map(({ q, a }) => ({
                '@type': 'Question',
                name: q,
                acceptedAnswer: { '@type': 'Answer', text: a },
              })),
            },
          ]
        : []),
    ]
    const html = renderRoute(template, meta, schemas)
    const dir = path.join(dist, 'blog', post.slug)
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(path.join(dir, 'index.html'), html)
    routes.push(meta.path)
  }

  // Sitemap, regenerate with today's lastmod
  const today = new Date().toISOString().slice(0, 10)
  await fs.writeFile(path.join(dist, 'sitemap.xml'), buildSitemap(destinations, CITIES, today))

  // llms.txt, AI-bot discoverability
  await fs.writeFile(path.join(dist, 'llms.txt'), buildLlmsTxt(destinations))

  // HTML sitemap, human + crawler readable index at /sitemap.html.
  // Gives Google a deep link graph and gives visitors a discoverable
  // index of every page on the site.
  await fs.writeFile(path.join(dist, 'sitemap.html'), buildHtmlSitemap(destinations, CITIES, today))

  console.log(`\nPre-rendered ${routes.length} routes:`)
  routes.forEach((r) => console.log(`  ✓ ${r}`))
  console.log(`\nRegenerated sitemap.xml (lastmod ${today}), sitemap.html and llms.txt`)

  // IndexNow, ping Bing, Yandex, Naver, Seznam, Yep with the URL list.
  // Only runs in CI (i.e. real GitHub Actions deploys) so local builds
  // don't notify search engines about pre-prod content.
  if (process.env.CI === 'true') {
    await pingIndexNow(routes).catch((err) => {
      console.error('IndexNow ping failed (non-fatal):', err.message)
    })
  } else {
    console.log('\nSkipping IndexNow ping (set CI=true to enable).')
  }
}

async function pingIndexNow(routes) {
  const KEY = '4f8b3d92a17e4c5fb6a8d2e9c4f1b7a3'
  const host = SITE_URL.replace(/^https?:\/\//, '').replace(/\/$/, '')
  const body = JSON.stringify({
    host,
    key: KEY,
    keyLocation: `${SITE_URL}/${KEY}.txt`,
    urlList: routes.map((r) => `${SITE_URL}${r}`),
  })

  const res = await fetch('https://api.indexnow.org/IndexNow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Host': 'api.indexnow.org',
    },
    body,
  })

  if (res.ok || res.status === 202) {
    console.log(`\nIndexNow: pinged ${routes.length} URLs (status ${res.status})`)
  } else {
    const text = await res.text().catch(() => '')
    throw new Error(`IndexNow returned ${res.status}: ${text.slice(0, 200)}`)
  }
}

main().catch((err) => {
  console.error('prerender failed:', err)
  process.exit(1)
})
