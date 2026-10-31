import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight, Clock3, BadgeIndianRupee, FileCheck2, MessageCircle, Sparkles, MousePointerClick } from 'lucide-react'
import Flag from './Flag'
import { DEST_GEO, destMedia } from '../data/destinationGeo'
import { useCan3D, useMediaQuery } from '../hooks/useMedia'

const Globe3D = lazy(() => import('./Globe3D'))

// Plays a destination loop only when it is allowed and visible; otherwise the
// poster stays. Falls back to the card image if the media is missing.
export function DestVideo({ slug, fallback, className = '', small = false, play = true }) {
  const media = destMedia(slug)
  const ref = useRef(null)
  const [poster, setPoster] = useState(small ? media.posterSm : media.poster)
  const [videoOk, setVideoOk] = useState(true)
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const saveData = typeof navigator !== 'undefined' && navigator.connection?.saveData === true
  const allowVideo = play && videoOk && !reduce && !saveData

  useEffect(() => {
    const v = ref.current
    if (!v || !allowVideo) return undefined
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {})
      else v.pause()
    })
    io.observe(v)
    return () => io.disconnect()
  }, [allowVideo, slug])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={poster}
        alt=""
        onError={() => fallback && poster !== fallback && setPoster(fallback)}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {allowVideo && (
        <video
          ref={ref}
          key={slug}
          className="absolute inset-0 w-full h-full object-cover"
          src={media.video}
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
          onError={() => setVideoOk(false)}
        />
      )}
    </div>
  )
}

function Spotlight({ dest, onClose, layout = 'panel' }) {
  const geo = DEST_GEO[dest.slug]
  const wa = `https://wa.me/918200918967?text=${encodeURIComponent(`Hi Travlys, I'm interested in a ${dest.name} visa. Can you help?`)}`
  return (
    <motion.div
      key={dest.slug}
      initial={{ opacity: 0, rotateY: -28, rotateX: 8, z: -120, y: 20 }}
      animate={{ opacity: 1, rotateY: 0, rotateX: 0, z: 0, y: 0 }}
      exit={{ opacity: 0, rotateY: 22, z: -80, y: 10 }}
      transition={{ type: 'spring', stiffness: 140, damping: 18 }}
      style={{ transformPerspective: 1200 }}
      className={`${layout === 'sheet' ? 'w-full' : 'w-[min(380px,90vw)]'} rounded-3xl overflow-hidden bg-ink-950/90 backdrop-blur-xl border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] text-white`}
      role="dialog"
      aria-label={`${dest.name} visa preview`}
    >
      <div className="relative">
        <DestVideo slug={dest.slug} fallback={dest.heroImage || dest.image} className="aspect-[16/10]" />
        <span className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/10 to-transparent pointer-events-none" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close preview"
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur border border-white/20 text-white flex items-center justify-center cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="absolute left-4 bottom-3 right-4">
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-coral-400 font-semibold m-0 flex items-center gap-1.5">
            <Flag code={dest.code} name={dest.name} size={14} /> {geo?.city || dest.name}
          </p>
          <p className="font-display text-2xl font-extrabold m-0 mt-1 leading-tight">{dest.name} visa</p>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-white/75 m-0 line-clamp-2">{dest.tagline}</p>
        <dl className="grid grid-cols-3 gap-2 mt-3 text-[0.78rem]">
          <div className="rounded-xl bg-white/5 border border-white/10 p-2">
            <dt className="text-white/50 flex items-center gap-1"><FileCheck2 className="w-3 h-3" /> Type</dt>
            <dd className="m-0 mt-0.5 font-semibold leading-tight">{dest.visaType}</dd>
          </div>
          <div className="rounded-xl bg-white/5 border border-white/10 p-2">
            <dt className="text-white/50 flex items-center gap-1"><Clock3 className="w-3 h-3" /> Time</dt>
            <dd className="m-0 mt-0.5 font-semibold leading-tight">{dest.processingTimeShort || dest.processingTime}</dd>
          </div>
          <div className="rounded-xl bg-white/5 border border-white/10 p-2">
            <dt className="text-white/50 flex items-center gap-1"><BadgeIndianRupee className="w-3 h-3" /> Fee</dt>
            <dd className="m-0 mt-0.5 font-semibold leading-tight">{dest.price}</dd>
          </div>
        </dl>
        <div className="flex gap-2 mt-4">
          <Link to={`/visa/${dest.slug}/`} className="btn btn-coral flex-1 justify-center no-underline inline-flex items-center gap-1.5 py-2.5">
            See full guide <ArrowUpRight className="w-4 h-4" />
          </Link>
          <a href={wa} className="btn no-underline inline-flex items-center gap-1.5 py-2.5 bg-white/10 text-white border border-white/20 hover:bg-white/20">
            <MessageCircle className="w-4 h-4" /> Ask
          </a>
        </div>
      </div>
    </motion.div>
  )
}

function GlobeFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-[70%] aspect-square rounded-full bg-[radial-gradient(circle_at_35%_30%,#1c2a63,#0b1640_60%,#070d2a)] shadow-[0_0_120px_20px_rgba(91,124,255,0.25)] animate-pulse" />
    </div>
  )
}

// Phones: swipeable destination "stories" instead of the WebGL globe.
function MobileStories({ destinations, onPick }) {
  return (
    <div className="md:hidden -mx-4 px-4 mt-10 flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2" style={{ scrollbarWidth: 'none' }}>
      {destinations.map((d) => (
        <button
          key={d.slug}
          type="button"
          onClick={() => onPick(d.slug)}
          className="snap-start shrink-0 w-36 aspect-[3/4] rounded-2xl overflow-hidden relative border border-white/10 cursor-pointer p-0 bg-ink-900"
        >
          <img src={destMedia(d.slug).posterSm} onError={(e) => { e.currentTarget.src = d.image }} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          <span className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-transparent to-transparent" />
          <span className="absolute left-2.5 bottom-2.5 right-2.5 text-left">
            <span className="flex items-center gap-1.5 text-white font-display font-extrabold text-sm">
              <Flag code={d.code} name={d.name} size={14} /> {d.name}
            </span>
            <span className="block text-[0.7rem] text-white/70 mt-0.5">{d.price}</span>
          </span>
        </button>
      ))}
    </div>
  )
}

export default function Hero3D({ destinations, search, trust }) {
  const can3D = useCan3D()
  const isMd = useMediaQuery('(min-width: 768px)')
  const [selected, setSelected] = useState(null)
  const [hovered, setHovered] = useState(null)
  const dest = destinations.find((d) => d.slug === selected)
  const hoverDest = destinations.find((d) => d.slug === hovered)

  useEffect(() => {
    if (!selected) return undefined
    const onKey = (e) => e.key === 'Escape' && setSelected(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])

  return (
    <section className="hero-3d relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-ink-950 text-white">
      <div className="hero-stars absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_75%_45%,rgba(91,124,255,0.22),transparent_55%),radial-gradient(ellipse_at_10%_90%,rgba(255,120,73,0.18),transparent_50%)]" />

      <div className="relative z-10 container-app grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-6 lg:col-span-6">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pill bg-white/10 border border-white/15 text-white backdrop-blur"
          >
            <Sparkles className="w-3.5 h-3.5 text-coral-400" />
            Trusted by 5,000+ Indian travelers · 98% approval rate
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24, rotateX: 25 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ transformPerspective: 900 }}
            className="font-display text-[2.6rem] sm:text-5xl md:text-[3.5rem] lg:text-[4.1rem] font-extrabold mt-6 leading-[1.02]"
          >
            You pack the bags.
            <br />
            <span className="text-coral-400 italic">We handle the visa.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="text-[1.05rem] md:text-lg text-white/70 mt-6 max-w-xl leading-relaxed"
          >
            5,000+ Indian travelers have boarded with Travlys. Tell us where you’re going, we prep the application,
            book the appointment, and coach the interview.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }} className="mt-8">
            {search}
          </motion.div>
          {can3D && (
            <p className="hidden md:flex items-center gap-2 text-sm text-white/60 mt-5">
              <MousePointerClick className="w-4 h-4 text-coral-400" />
              Drag the globe, or tap a glowing city to preview its visa.
            </p>
          )}
        </div>

        {/* Globe column (tablet and desktop). */}
        <div className="hidden md:block md:col-span-6 lg:col-span-6 relative">
          <div className="relative aspect-square w-full max-w-[640px] mx-auto">
            {can3D ? (
              <Suspense fallback={<GlobeFallback />}>
                <Globe3D
                  destinations={destinations}
                  selected={selected}
                  onSelect={setSelected}
                  onHover={setHovered}
                  className="absolute inset-0"
                />
              </Suspense>
            ) : (
              <GlobeFallback />
            )}
            <AnimatePresence>
              {hoverDest && !dest && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-4 left-1/2 -translate-x-1/2 pill bg-white text-ink-900 shadow-pop pointer-events-none"
                >
                  <Flag code={hoverDest.code} name={hoverDest.name} size={14} /> {hoverDest.name} · {hoverDest.price}
                </motion.div>
              )}
            </AnimatePresence>
            <div className="absolute bottom-2 left-0 lg:-left-10 z-20">
              <AnimatePresence mode="wait">{dest && isMd && <Spotlight dest={dest} onClose={() => setSelected(null)} />}</AnimatePresence>
            </div>
          </div>
          {/* Keyboard and screen-reader friendly way to pick a destination. */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {destinations.map((d) => (
              <button
                key={d.slug}
                type="button"
                onClick={() => setSelected(d.slug === selected ? null : d.slug)}
                aria-pressed={d.slug === selected}
                className={`chip text-xs cursor-pointer transition-colors ${
                  d.slug === selected ? 'bg-coral-500! border-coral-500! text-white!' : 'bg-white/5! border-white/15! text-white/80! hover:border-coral-400!'
                }`}
              >
                <Flag code={d.code} name={d.name} size={14} /> {d.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 container-app">
        <MobileStories destinations={destinations} onPick={setSelected} />
        {trust}
      </div>

      {/* Phones: the preview opens as a bottom sheet. */}
      <AnimatePresence>
        {dest && !isMd && (
          <motion.div
            className="md:hidden fixed inset-0 z-[60] bg-ink-950/70 backdrop-blur-sm flex items-end p-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <div className="w-full" onClick={(e) => e.stopPropagation()}>
              <Spotlight dest={dest} onClose={() => setSelected(null)} layout="sheet" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
