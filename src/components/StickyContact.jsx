import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { MessageCircle, Phone } from 'lucide-react'

// The WhatsApp message names the page the visitor was reading, so every chat
// that starts here tells the team which page produced the lead (the site has
// no analytics, so this is the attribution).
function waHref(pathname) {
  const title = typeof document !== 'undefined' ? document.title.replace(/\s*\|\s*Travlys\s*$/, '') : ''
  const where = pathname === '/' ? '' : ` I was reading "${title}" (travlys.com${pathname}).`
  const text = `Hi Travlys, I need visa help.${where}`
  return `https://wa.me/918200918967?text=${encodeURIComponent(text)}`
}

export default function StickyContact() {
  const [show, setShow] = useState(false)
  const { pathname } = useLocation()
  const [href, setHref] = useState(() => waHref(pathname))

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // document.title is set by the page's SEO component after navigation.
  useEffect(() => {
    const t = setTimeout(() => setHref(waHref(pathname)), 300)
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <>
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${
          show ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        aria-hidden={!show}
      >
        <div className="flex gap-2 p-3 bg-white/95 backdrop-blur-xl border-t border-line shadow-[0_-4px_24px_rgba(15,27,76,0.08)]">
          <a href={href} aria-label="Chat with Travlys on WhatsApp" className="btn btn-coral flex-1">
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp</span>
          </a>
          <a href="tel:+918200918967" aria-label="Call Travlys" className="btn btn-ghost flex-1">
            <Phone className="w-5 h-5" />
            <span>Call</span>
          </a>
        </div>
      </div>

      {/* Desktop: a floating WhatsApp button once the reader is past the hero. */}
      <a
        href={href}
        aria-label="Chat with a Travlys visa specialist on WhatsApp"
        className={`hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-2 btn btn-coral shadow-[0_8px_30px_rgba(15,27,76,0.22)] transition-all duration-300 ${
          show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        tabIndex={show ? 0 : -1}
      >
        <MessageCircle className="w-5 h-5" />
        <span>Ask a visa specialist</span>
      </a>
    </>
  )
}
