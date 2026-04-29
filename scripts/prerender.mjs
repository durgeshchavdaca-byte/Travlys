// Build-time prerender: generates a separate index.html for each route
// (home + every visa page) with route-specific <title>, meta, canonical,
// OG/Twitter, and JSON-LD baked into the HTML.
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
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_ALT,
  DEFAULT_LOCALE,
  buildHomeSchemas,
  buildVisaSchemas,
  getHomeMeta,
  getVisaMeta,
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

// Removes existing tags from the template that we'll replace, then
// returns a fresh head fragment.
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

// Strips the previous default head tags from the template so we can
// substitute the route-specific ones. We match starts of lines to be
// safe.
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
  // Inject right after the <meta http-equiv="X-UA-Compatible"> marker we
  // know exists, or fall back to right after charset.
  const marker = '<meta http-equiv="X-UA-Compatible" content="IE=edge" />'
  if (html.includes(marker)) {
    html = html.replace(marker, `${marker}\n\n    <!-- prerendered SEO -->\n    ${head}\n`)
  } else {
    html = html.replace('</head>', `    ${head}\n</head>`)
  }
  return html
}

async function main() {
  const indexPath = path.join(dist, 'index.html')
  const template = await fs.readFile(indexPath, 'utf8')

  const routes = []

  // Home — overwrite dist/index.html with home-specific meta
  const homeMeta = getHomeMeta()
  const homeSchemas = buildHomeSchemas(destinations)
  const homeHtml = renderRoute(template, homeMeta, homeSchemas)
  await fs.writeFile(indexPath, homeHtml)
  routes.push('/')

  // Visa pages — write dist/visa/<slug>/index.html
  for (const dest of destinations) {
    const meta = getVisaMeta(dest)
    const schemas = buildVisaSchemas(dest)
    const html = renderRoute(template, meta, schemas)
    const dir = path.join(dist, 'visa', dest.slug)
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(path.join(dir, 'index.html'), html)
    routes.push(meta.path)
  }

  console.log(`\nPre-rendered ${routes.length} routes:`)
  routes.forEach((r) => console.log(`  ✓ ${r}`))
}

main().catch((err) => {
  console.error('prerender failed:', err)
  process.exit(1)
})
