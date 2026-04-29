import { useEffect } from 'react'
import {
  SITE_URL as _SITE_URL,
  SITE_NAME as _SITE_NAME,
  DEFAULT_OG_IMAGE as _DEFAULT_OG_IMAGE,
  DEFAULT_OG_ALT,
  DEFAULT_LOCALE,
} from '../seo/config'

export const SITE_URL = _SITE_URL
export const SITE_NAME = _SITE_NAME
export const DEFAULT_OG_IMAGE = _DEFAULT_OG_IMAGE

function dedupeHead(targetTitle) {
  if (typeof document === 'undefined') return
  const head = document.head

  const dedupe = (selector, getKey) => {
    const groups = new Map()
    head.querySelectorAll(selector).forEach((el) => {
      const key = getKey(el)
      if (!key) return
      if (!groups.has(key)) groups.set(key, [])
      groups.get(key).push(el)
    })
    groups.forEach((els) => {
      if (els.length < 2) return
      const hasManaged = els.some((e) => e.dataset?.rh === 'true')
      if (!hasManaged) return
      els.forEach((e) => {
        if (e.dataset?.rh !== 'true') e.parentNode?.removeChild(e)
      })
    })
  }

  if (targetTitle) {
    document.title = targetTitle
    const titles = Array.from(head.querySelectorAll('title'))
    const match = titles.find((t) => t.textContent === targetTitle) || titles[titles.length - 1]
    titles.forEach((t) => {
      if (t !== match) t.parentNode?.removeChild(t)
    })
  }

  dedupe('meta[name]', (el) => `name:${el.getAttribute('name')}`)
  dedupe('meta[property]', (el) => `property:${el.getAttribute('property')}`)
  dedupe('link[rel="canonical"]', () => 'canonical')
}

export default function SEO({
  title,
  description,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  imageAlt = DEFAULT_OG_ALT,
  type = 'website',
  keywords,
  noindex = false,
  jsonLd,
}) {
  const fullTitle = title?.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
  const canonical = `${SITE_URL}${path}`
  const schemas = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []
  const m = { 'data-rh': 'true' }

  useEffect(() => {
    dedupeHead(fullTitle)
  }, [fullTitle, description, canonical, image, type, keywords, noindex])

  return (
    <>
      <title>{fullTitle}</title>
      <meta {...m} name="description" content={description} />
      {keywords && <meta {...m} name="keywords" content={keywords} />}
      <meta
        {...m}
        name="robots"
        content={
          noindex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        }
      />
      <link {...m} rel="canonical" href={canonical} />

      <meta {...m} property="og:type" content={type} />
      <meta {...m} property="og:site_name" content={SITE_NAME} />
      <meta {...m} property="og:locale" content={DEFAULT_LOCALE} />
      <meta {...m} property="og:url" content={canonical} />
      <meta {...m} property="og:title" content={fullTitle} />
      <meta {...m} property="og:description" content={description} />
      <meta {...m} property="og:image" content={image} />
      <meta {...m} property="og:image:width" content="1200" />
      <meta {...m} property="og:image:height" content="630" />
      <meta {...m} property="og:image:alt" content={imageAlt} />

      <meta {...m} name="twitter:card" content="summary_large_image" />
      <meta {...m} name="twitter:title" content={fullTitle} />
      <meta {...m} name="twitter:description" content={description} />
      <meta {...m} name="twitter:image" content={image} />
      <meta {...m} name="twitter:image:alt" content={imageAlt} />

      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
