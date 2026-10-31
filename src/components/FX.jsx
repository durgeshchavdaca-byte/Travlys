import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { Plane } from 'lucide-react'
import Flag from './Flag'
import { DEST_GEO, destMedia } from '../data/destinationGeo'

// Site-wide motion pieces for the 3D redesign. Each one calms down for
// people who prefer reduced motion and, where it depends on a mouse, on
// touch screens.

const prefersReduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const finePointer = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

/* ─── Scroll plane ──────────────────────────────────────────────────────────
   Replaces the plain progress bar: a dotted flight line across the top of the
   window with a plane that flies along it as you scroll. */
export function PlaneProgress() {
  const { scrollYProgress } = useScroll()
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  const left = useTransform(p, (v) => `calc(${v * 100}% - ${v * 18}px)`)
  return (
    <div aria-hidden="true" className="fixed top-0 left-0 right-0 h-[14px] z-[100] pointer-events-none">
      <div className="absolute left-0 right-0 top-[6px] border-t border-dashed border-coral-500/30" />
      <motion.div className="absolute left-0 top-[5px] h-[3px] bg-gradient-to-r from-coral-500/0 via-coral-500 to-coral-400 origin-left" style={{ width: left }} />
      <motion.div className="absolute top-0" style={{ left }}>
        <Plane className="w-[15px] h-[15px] text-coral-500 rotate-45 drop-shadow-[0_0_6px_rgba(255,120,73,0.8)]" />
      </motion.div>
    </div>
  )
}

/* ─── 3D destination carousel ──────────────────────────────────────────────
   A ring of destination cards in real CSS 3D. It turns slowly on its own,
   can be dragged, and the card facing you plays its video. Clicking a card
   opens that visa page. */
export function Carousel3D({ destinations }) {
  const navigate = useNavigate()
  const n = destinations.length
  const step = 360 / n
  const [w, setW] = useState(240)
  const [front, setFront] = useState(0)
  const angle = useMotionValue(0)
  const ring = useTransform(angle, (a) => `translateZ(calc(var(--radius) * -1)) rotateY(${a}deg)`)
  const drag = useRef({ on: false, x: 0, moved: 0, v: 0 })
  const box = useRef(null)
  const reduce = prefersReduced()

  useEffect(() => {
    const size = () => setW(window.innerWidth < 640 ? 170 : window.innerWidth < 1024 ? 210 : 240)
    size()
    window.addEventListener('resize', size)
    return () => window.removeEventListener('resize', size)
  }, [])

  useEffect(() => {
    let raf = 0
    let visible = true
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
    })
    if (box.current) io.observe(box.current)
    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      const d = drag.current
      if (!d.on) {
        if (Math.abs(d.v) > 0.02) {
          angle.set(angle.get() + d.v)
          d.v *= 0.95
        } else if (!reduce) {
          angle.set(angle.get() - 0.12)
        }
      }
      const idx = ((Math.round(-angle.get() / step) % n) + n) % n
      setFront((f) => (f === idx ? f : idx))
    }
    tick()
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [angle, n, reduce, step])

  const radius = Math.round(w / 2 / Math.tan(Math.PI / n)) + 24
  const onDown = (e) => {
    drag.current = { on: true, x: e.clientX, moved: 0, v: 0 }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const onMove = (e) => {
    const d = drag.current
    if (!d.on) return
    const dx = e.clientX - d.x
    d.x = e.clientX
    d.moved += Math.abs(dx)
    d.v = dx * 0.22
    angle.set(angle.get() + dx * 0.22)
  }
  const onUp = () => {
    drag.current.on = false
  }
  const go = (i) => {
    if (drag.current.moved > 8) return
    if (i !== front) {
      angle.set(-i * step)
      return
    }
    navigate(`/visa/${destinations[i].slug}/`)
  }

  return (
    <div
      ref={box}
      className="relative select-none touch-pan-y"
      style={{ perspective: '1400px', height: w * 1.45 + 60, '--radius': `${radius}px` }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      <motion.div className="absolute left-1/2 top-6" style={{ transformStyle: 'preserve-3d', transform: ring, width: 0, height: 0 }}>
        {destinations.map((d, i) => {
          const isFront = i === front
          const media = destMedia(d.slug)
          return (
            <div
              key={d.slug}
              role="link"
              tabIndex={0}
              aria-label={`${d.name} visa`}
              onClick={() => go(i)}
              onKeyDown={(e) => e.key === 'Enter' && navigate(`/visa/${d.slug}/`)}
              className={`absolute rounded-3xl overflow-hidden border border-white/15 bg-ink-900 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] transition-[filter] duration-500 ${isFront ? '' : 'brightness-[0.55]'}`}
              style={{
                width: w,
                height: w * 1.4,
                left: -w / 2,
                transform: `rotateY(${i * step}deg) translateZ(${radius}px)`,
                backfaceVisibility: 'hidden',
              }}
            >
              <img src={media.posterSm} alt="" draggable="false" className="absolute inset-0 w-full h-full object-cover" />
              {isFront && !reduce && (
                <video
                  key={d.slug}
                  src={media.video}
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover animate-[fadein_0.6s_ease]"
                />
              )}
              <span className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/10 to-transparent" />
              <span className="absolute left-4 right-4 bottom-4 text-left text-white">
                <span className="block text-[0.65rem] uppercase tracking-[0.18em] text-coral-400 font-semibold">{DEST_GEO[d.slug]?.city}</span>
                <span className="flex items-center gap-2 font-display font-extrabold text-lg leading-tight mt-1">
                  <Flag code={d.code} name={d.name} size={16} /> {d.name}
                </span>
                <span className="block text-xs text-white/70 mt-1">
                  {d.visaType} · {d.price}
                </span>
              </span>
            </div>
          )
        })}
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 flex justify-center">
        <Link
          to={`/visa/${destinations[front].slug}/`}
          className="pill bg-coral-500 text-white no-underline shadow-pop"
          onPointerDown={(e) => e.stopPropagation()}
        >
          Open {destinations[front].name} guide →
        </Link>
      </div>
    </div>
  )
}

/* ─── Flip card ─────────────────────────────────────────────────────────────
   Two faces in real 3D. Flips on hover (mouse) or tap (touch); both faces stay
   in the page for search engines and screen readers. */
export function FlipCard({ front, back, className = '' }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <div
      className={`fx-flip ${className}`}
      onMouseEnter={() => finePointer() && setFlipped(true)}
      onMouseLeave={() => finePointer() && setFlipped(false)}
      onClick={() => !finePointer() && setFlipped((f) => !f)}
    >
      <div className={`fx-flip-inner ${flipped ? 'is-flipped' : ''}`}>
        <div className="fx-flip-face">{front}</div>
        <div className="fx-flip-face fx-flip-back">{back}</div>
      </div>
    </div>
  )
}
