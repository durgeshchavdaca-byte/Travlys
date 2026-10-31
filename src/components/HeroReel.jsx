import { useEffect, useState } from 'react'

// Full-bleed cinematic reel behind the homepage hero: real footage of the
// journey from packed passport to arrival, cross-fading scene to scene with a slow
// Ken Burns push. Only the scene on screen (and the one fading out) carries a
// <video>; the rest are posters. Phones get the 960px encodes; reduced motion
// and data-saver get the still poster of the first scene.

const REEL = [
  { name: 'passport', caption: 'Passport ready' },
  { name: 'airport', caption: 'Through the terminal' },
  { name: 'takeoff', caption: 'Wheels up' },
  { name: 'window', caption: 'Above the clouds' },
  { name: 'arrival', caption: 'You have arrived' },
]

const SCENE_MS = 7000
const src = (name, small, ext) => `/media/hero/${name}${small ? '-sm' : ''}.${ext}`

export default function HeroReel({ small = false }) {
  const [i, setI] = useState(0)
  const [prev, setPrev] = useState(null)
  const [still] = useState(
    () =>
      typeof window !== 'undefined' &&
      (window.matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData === true),
  )

  useEffect(() => {
    if (still) return undefined
    const t = setTimeout(() => {
      setPrev(i)
      setI((i + 1) % REEL.length)
    }, SCENE_MS)
    return () => clearTimeout(t)
  }, [i, still])

  // Warm the next poster so the cross-fade never shows an empty frame.
  useEffect(() => {
    const img = new Image()
    img.src = src(REEL[(i + 1) % REEL.length].name, small, 'jpg')
  }, [i, small])

  const go = (n) => {
    if (n === i) return
    setPrev(i)
    setI(n)
  }

  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden isolate">
        {REEL.map((s, n) => {
          const on = n === i
          const showing = on || n === prev
          if (!showing) return null
          return (
            <div
              key={s.name}
              className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${on ? 'opacity-100 z-[1]' : 'opacity-0 z-0'}`}
            >
              <div key={on ? `on-${i}` : 'off'} className={`absolute inset-0 ${still ? '' : 'reel-kb'}`}>
                <img src={src(s.name, small, 'jpg')} alt="" className="absolute inset-0 w-full h-full object-cover" />
                {!still && (
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src={src(s.name, small, 'mp4')}
                    poster={src(s.name, small, 'jpg')}
                    muted
                    autoPlay
                    loop
                    playsInline
                    preload="auto"
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>
      {/* Keep the copy readable: dark on the text side, lighter toward the globe. */}
      <div className="absolute inset-0 pointer-events-none bg-ink-950/55 md:bg-transparent md:bg-gradient-to-r md:from-ink-950/90 md:via-ink-950/45 md:to-ink-950/5" />
      <div className="absolute inset-x-0 bottom-0 h-48 pointer-events-none bg-gradient-to-t from-ink-950 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-40 pointer-events-none bg-gradient-to-b from-ink-950/70 to-transparent" />

      {!still && (
        <div className="absolute z-20 right-4 md:right-8 top-24 md:top-28 flex items-center gap-3 text-white">
          <span className="hidden sm:block text-xs uppercase tracking-[0.2em] text-white/70">
            <span className="text-coral-400 font-semibold mr-2">{String(i + 1).padStart(2, '0')}</span>
            {REEL[i].caption}
          </span>
          <span className="flex gap-1.5">
            {REEL.map((s, n) => (
              <button
                key={s.name}
                type="button"
                aria-label={`Show scene: ${s.caption}`}
                onClick={() => go(n)}
                className="relative h-1 w-6 rounded-full bg-white/25 overflow-hidden cursor-pointer"
              >
                {n === i && <span key={i} className="reel-bar absolute inset-y-0 left-0 bg-coral-400" style={{ animationDuration: `${SCENE_MS}ms` }} />}
                {n < i && <span className="absolute inset-0 bg-white/70" />}
              </button>
            ))}
          </span>
        </div>
      )}
    </>
  )
}
