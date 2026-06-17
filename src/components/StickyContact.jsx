import { useEffect, useState } from 'react'
import { MessageCircle, Phone } from 'lucide-react'

export default function StickyContact() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-hidden={!show}
    >
      <div className="flex gap-2 p-3 bg-white/95 backdrop-blur-xl border-t border-line shadow-[0_-4px_24px_rgba(15,27,76,0.08)]">
        <a
          href="https://wa.me/918200918967?text=Hi%20Travlys%2C%20I%E2%80%99m%20interested%20in%20visa%20help."
          aria-label="Chat with Travlys on WhatsApp"
          className="btn btn-coral flex-1"
        >
          <MessageCircle className="w-5 h-5" />
          <span>WhatsApp</span>
        </a>
        <a
          href="tel:+918200918967"
          aria-label="Call Travlys"
          className="btn btn-ghost flex-1"
        >
          <Phone className="w-5 h-5" />
          <span>Call</span>
        </a>
      </div>
    </div>
  )
}
