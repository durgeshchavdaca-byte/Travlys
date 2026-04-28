import { motion, useScroll, useMotionValue, useTransform, useSpring, useInView } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

/* Animated gradient orbs for background ambience */
export function GradientOrbs({ className = '' }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-gold-500/10 blur-[100px] animate-blob" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gold-400/8 blur-[120px] animate-blob-delay-2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gold-300/5 blur-[80px] animate-blob-delay-4" />
    </div>
  )
}

/* Animated airplane with dotted trail path */
export function AirplaneTrail({ className = '' }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg viewBox="0 0 800 400" className="absolute w-full h-full opacity-[0.07]" fill="none">
        <path
          d="M-50,300 C100,300 150,100 300,150 S500,50 600,200 S750,100 850,150"
          stroke="#c9a84c"
          strokeWidth="2"
          strokeDasharray="8 8"
          className="plane-path"
        />
        <g className="animate-float">
          <path d="M590,195 l15,-8 l-3,8 l3,8 z" fill="#c9a84c" />
          <path d="M585,195 l-10,-15 l12,12 z" fill="#c9a84c" opacity="0.7" />
          <path d="M585,199 l-10,15 l12,-12 z" fill="#c9a84c" opacity="0.7" />
        </g>
      </svg>
    </div>
  )
}

/* Twinkling stars/dots for dark sections */
export function TwinklingStars({ count = 20 }) {
  const stars = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    delay: `${Math.random() * 3}s`,
    duration: `${Math.random() * 2 + 2}s`,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full bg-gold-500"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `twinkle ${star.duration} ease-in-out infinite`,
            animationDelay: star.delay,
          }}
        />
      ))}
    </div>
  )
}

/* Animated rotating globe wireframe SVG */
export function AnimatedGlobe({ className = '' }) {
  return (
    <div className={`${className}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-slow" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.15">
        <circle cx="100" cy="100" r="80" />
        <ellipse cx="100" cy="100" rx="80" ry="30" />
        <ellipse cx="100" cy="100" rx="80" ry="30" transform="rotate(60 100 100)" />
        <ellipse cx="100" cy="100" rx="80" ry="30" transform="rotate(120 100 100)" />
        <line x1="100" y1="20" x2="100" y2="180" />
        <line x1="20" y1="100" x2="180" y2="100" />
        <ellipse cx="100" cy="100" rx="50" ry="80" />
        <ellipse cx="100" cy="100" rx="25" ry="80" />
      </svg>
    </div>
  )
}

/* Orbiting dots around a center point */
export function OrbitingDots({ className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-gold-500/30" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center animate-orbit" style={{ animationDuration: '15s' }}>
        <div className="w-2 h-2 rounded-full bg-gold-500/50" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center animate-orbit" style={{ animationDuration: '22s', animationDelay: '-5s' }}>
        <div className="w-1.5 h-1.5 rounded-full bg-gold-400/40" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center animate-orbit" style={{ animationDuration: '30s', animationDelay: '-12s' }}>
        <div className="w-1 h-1 rounded-full bg-gold-300/30" />
      </div>
    </div>
  )
}

/* Animated passport stamp graphic */
export function PassportStamp({ className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ scale: 0, rotate: -20, opacity: 0 }}
      whileInView={{ scale: 1, rotate: 0, opacity: 0.08 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
    >
      <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
        <circle cx="100" cy="100" r="85" stroke="#c9a84c" strokeWidth="3" strokeDasharray="4 4" />
        <circle cx="100" cy="100" r="70" stroke="#c9a84c" strokeWidth="1.5" />
        <text x="100" y="65" textAnchor="middle" fill="#c9a84c" fontSize="14" fontFamily="serif" fontWeight="bold">APPROVED</text>
        <line x1="40" y1="80" x2="160" y2="80" stroke="#c9a84c" strokeWidth="1" />
        <text x="100" y="105" textAnchor="middle" fill="#c9a84c" fontSize="22" fontFamily="serif" fontWeight="bold">TRAVLYS</text>
        <line x1="40" y1="115" x2="160" y2="115" stroke="#c9a84c" strokeWidth="1" />
        <text x="100" y="135" textAnchor="middle" fill="#c9a84c" fontSize="10" fontFamily="sans-serif">VISA SERVICES</text>
        <text x="100" y="155" textAnchor="middle" fill="#c9a84c" fontSize="9" fontFamily="sans-serif">★ PREMIUM ★</text>
      </svg>
    </motion.div>
  )
}

/* Floating travel icons cluster */
export function FloatingIcons({ className = '' }) {
  const icons = [
    { emoji: '✈', x: '10%', y: '20%', delay: 0, size: 'text-3xl' },
    { emoji: '🌍', x: '80%', y: '15%', delay: 1, size: 'text-2xl' },
    { emoji: '🏛', x: '70%', y: '70%', delay: 2, size: 'text-2xl' },
    { emoji: '📋', x: '15%', y: '75%', delay: 0.5, size: 'text-xl' },
    { emoji: '🛂', x: '85%', y: '45%', delay: 1.5, size: 'text-xl' },
    { emoji: '🗺', x: '25%', y: '45%', delay: 2.5, size: 'text-2xl' },
  ]

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {icons.map((icon, i) => (
        <motion.div
          key={i}
          className={`absolute ${icon.size} opacity-[0.06]`}
          style={{ left: icon.x, top: icon.y }}
          animate={{
            y: [0, -20, 0, 15, 0],
            rotate: [0, 5, -5, 3, 0],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            delay: icon.delay,
            ease: 'easeInOut',
          }}
        >
          {icon.emoji}
        </motion.div>
      ))}
    </div>
  )
}

/* Scroll Progress Bar - gold bar at top of page */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500 z-[100] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  )
}

/* Animated Counter that counts up when visible */
export function AnimatedCounter({ value, suffix = '', prefix = '', duration = 2 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))
  const display = useSpring(count, { duration: duration * 1000 })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView) {
      count.set(value)
    }
  }, [isInView, value, count])

  useEffect(() => {
    const unsubscribe = display.on('change', (v) => setDisplayValue(Math.round(v)))
    return unsubscribe
  }, [display])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{displayValue}{suffix}
    </span>
  )
}

/* 3D Tilt Card that responds to mouse position */
export function TiltCard({ children, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8])

  function handleMouse(e) {
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    x.set(px)
    y.set(py)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}

/* Magnetic Button that follows cursor on hover */
export function MagneticButton({ children, className = '', href, onClick }) {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  function handleMouse(e) {
    const rect = ref.current.getBoundingClientRect()
    setPosition({
      x: (e.clientX - rect.left - rect.width / 2) * 0.3,
      y: (e.clientY - rect.top - rect.height / 2) * 0.3,
    })
  }

  function handleLeave() {
    setPosition({ x: 0, y: 0 })
  }

  const Tag = href ? 'a' : 'button'
  const props = href ? { href } : { onClick }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="inline-block"
    >
      <Tag className={className} {...props}>{children}</Tag>
    </motion.div>
  )
}

/* Text Reveal - words animate in one by one */
export function TextReveal({ text, className = '', as: Tag = 'h2' }) {
  const words = text.split(' ')
  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  )
}

/* Morphing Wave SVG background for dark sections */
export function MorphingWave({ className = '' }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg className="absolute bottom-0 w-full h-40 opacity-10" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <motion.path
          d="M0,40 C240,100 480,0 720,50 C960,100 1200,20 1440,60 L1440,120 L0,120 Z"
          fill="url(#wave-grad)"
          animate={{
            d: [
              'M0,40 C240,100 480,0 720,50 C960,100 1200,20 1440,60 L1440,120 L0,120 Z',
              'M0,60 C240,10 480,90 720,30 C960,70 1200,100 1440,40 L1440,120 L0,120 Z',
              'M0,80 C240,50 480,60 720,90 C960,20 1200,60 1440,30 L1440,120 L0,120 Z',
              'M0,40 C240,100 480,0 720,50 C960,100 1200,20 1440,60 L1440,120 L0,120 Z',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <defs>
          <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c9a84c" />
            <stop offset="50%" stopColor="#e0cc7a" />
            <stop offset="100%" stopColor="#c9a84c" />
          </linearGradient>
        </defs>
      </svg>
      <svg className="absolute bottom-0 w-full h-32 opacity-5" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <motion.path
          d="M0,80 C360,20 720,100 1080,40 C1260,20 1380,60 1440,50 L1440,120 L0,120 Z"
          fill="#c9a84c"
          animate={{
            d: [
              'M0,80 C360,20 720,100 1080,40 C1260,20 1380,60 1440,50 L1440,120 L0,120 Z',
              'M0,30 C360,90 720,20 1080,70 C1260,90 1380,30 1440,80 L1440,120 L0,120 Z',
              'M0,80 C360,20 720,100 1080,40 C1260,20 1380,60 1440,50 L1440,120 L0,120 Z',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </svg>
    </div>
  )
}
