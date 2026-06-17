import { motion, useScroll, useMotionValue, useTransform, useSpring, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

/* Soft blurred blobs used as background on hero + CTA sections */
export function HeroBlobs({ className = '' }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div className="hero-blob-2 -top-32 -left-24 animate-blob" />
      <div
        className="hero-blob-1 top-1/3 right-[-120px] animate-blob"
        style={{ animationDelay: '-4s' }}
      />
      <div
        className="hero-blob-2 -bottom-40 left-1/3 opacity-60 animate-blob"
        style={{ animationDelay: '-8s' }}
      />
    </div>
  )
}

/* Sticky scroll progress bar */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-coral-500 z-[100] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  )
}

/* Animated number counter, runs once when scrolled into view */
export function AnimatedCounter({ value, suffix = '', prefix = '', duration = 1.6 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const count = useMotionValue(0)
  const display = useSpring(count, { duration: duration * 1000 })
  const [out, setOut] = useState(0)

  useEffect(() => {
    if (isInView) count.set(value)
  }, [isInView, value, count])

  useEffect(() => display.on('change', (v) => setOut(Math.round(v))), [display])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{out}{suffix}
    </span>
  )
}

/* Magnetic hover for chunky CTAs */
export function MagneticButton({ children, className = '', href, onClick, type, ariaLabel }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  function handleMouse(e) {
    const rect = ref.current.getBoundingClientRect()
    setPos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.18,
      y: (e.clientY - rect.top - rect.height / 2) * 0.18,
    })
  }
  function handleLeave() {
    setPos({ x: 0, y: 0 })
  }

  const Tag = href ? 'a' : 'button'
  const props = href ? { href } : { onClick, type }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 180, damping: 14 }}
      className="inline-block"
    >
      <Tag className={className} aria-label={ariaLabel} {...props}>
        {children}
      </Tag>
    </motion.div>
  )
}

/* Word-by-word fade-in headline */
export function TextReveal({ text, className = '', as: Tag = 'h2', delayBase = 0 }) {
  const words = text.split(' ')
  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.28em]"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55, delay: delayBase + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  )
}

/* Animated dotted-path travel line */
export function DottedPath({ className = '' }) {
  return (
    <div className={`pointer-events-none ${className}`}>
      <svg viewBox="0 0 600 200" fill="none" className="w-full h-full">
        <motion.path
          d="M20,150 C100,40 220,160 340,80 S540,130 580,40"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="2 8"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
        />
        <motion.circle
          r="6"
          fill="currentColor"
          initial={{ offsetDistance: '0%' }}
          whileInView={{ offsetDistance: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          style={{ offsetPath: 'path("M20,150 C100,40 220,160 340,80 S540,130 580,40")' }}
        />
      </svg>
    </div>
  )
}
