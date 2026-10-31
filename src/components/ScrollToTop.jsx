import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Scrolls to the top on page change, or to the #anchor when the link has one
// (e.g. /travel-news/#2026-10-26-...). The target renders after the page
// transition, so retry briefly until it exists.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      // Instant, not the page's smooth scroll: the new page should open at
      // its top, not glide there from the old page's position.
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    let tries = 0
    let settle
    const id = decodeURIComponent(hash.slice(1))
    const timer = setInterval(() => {
      const el = document.getElementById(id)
      if (el || ++tries > 20) {
        clearInterval(timer)
        if (!el) return window.scrollTo(0, 0)
        el.scrollIntoView({ block: 'start', behavior: 'instant' })
        // The outgoing page is still fading out above the new one; scroll
        // again once it has been removed and the layout has settled.
        settle = setTimeout(() => el.scrollIntoView({ block: 'start', behavior: 'instant' }), 600)
      }
    }, 100)
    return () => {
      clearInterval(timer)
      clearTimeout(settle)
    }
  }, [pathname, hash])
  return null
}
