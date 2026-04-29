import { useEffect, useState } from 'react'
import { MessageCircle, Phone } from 'lucide-react'

// Mobile-only fixed bottom bar with WhatsApp + Call CTAs.
// Always visible while scrolling so visitors can reach out from any
// section without scrolling back to the contact area.

export default function StickyContact() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Show after scrolling past the hero so it doesn't obscure the
    // big initial CTAs.
    const onScroll = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-500 ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-hidden={!show}
    >
      <div className="flex gap-2 p-3 bg-navy-900/95 backdrop-blur-xl border-t border-white/10 shadow-2xl">
        <a
          href="https://wa.me/918200918967?text=Hi%20Travlys%2C%20I%E2%80%99m%20interested%20in%20visa%20assistance."
          aria-label="Chat with Travlys on WhatsApp"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gold-500 text-navy-900 rounded-xl font-semibold no-underline shadow-lg shadow-gold-500/20 active:scale-95 transition-transform"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm tracking-wide">WhatsApp</span>
        </a>
        <a
          href="tel:+918200918967"
          aria-label="Call Travlys"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white/10 border border-white/20 text-white rounded-xl font-medium no-underline backdrop-blur-sm active:scale-95 transition-transform"
        >
          <Phone className="w-5 h-5" />
          <span className="text-sm tracking-wide">Call Now</span>
        </a>
      </div>
    </div>
  )
}
