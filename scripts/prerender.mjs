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
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_ALT,
  DEFAULT_LOCALE,
  buildHomeSchemas,
  buildVisaSchemas,
  buildCityVisaSchemas,
  getHomeMeta,
  getVisaMeta,
  getCityVisaMeta,
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

async function main() {
  const indexPath = path.join(dist, 'index.html')
  const template = await fs.readFile(indexPath, 'utf8')

  const routes = []

  // Home, overwrite dist/index.html with home-specific meta
  const homeMeta = getHomeMeta()
  const homeSchemas = buildHomeSchemas(destinations)
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

  // Sitemap, regenerate with today's lastmod
  const today = new Date().toISOString().slice(0, 10)
  await fs.writeFile(path.join(dist, 'sitemap.xml'), buildSitemap(destinations, CITIES, today))

  // llms.txt, AI-bot discoverability
  await fs.writeFile(path.join(dist, 'llms.txt'), buildLlmsTxt(destinations))

  console.log(`\nPre-rendered ${routes.length} routes:`)
  routes.forEach((r) => console.log(`  ✓ ${r}`))
  console.log(`\nRegenerated sitemap.xml (lastmod ${today}) and llms.txt`)

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
