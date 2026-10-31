import { motion } from 'framer-motion'

const variants = {
  // Rises and tilts back into place, so sections arrive with a sense of depth.
  fadeUp: {
    hidden: { opacity: 0, y: 36, rotateX: 14, scale: 0.98 },
    visible: { opacity: 1, y: 0, rotateX: 0, scale: 1 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -28 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -28 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 28 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 },
  },
}

const EASE = [0.16, 1, 0.3, 1]

export default function AnimatedSection({
  children,
  className = '',
  variant = 'fadeUp',
  delay = 0,
  duration = 0.55,
  style,
  ...props
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={variants[variant]}
      transition={{ duration, delay, ease: EASE }}
      style={{ transformPerspective: 1200, transformOrigin: '50% 100%', ...style }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainer({ children, className = '', stagger = 0.08, ...props }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '', variant = 'fadeUp', style, ...props }) {
  return (
    <motion.div
      variants={variants[variant]}
      transition={{ duration: 0.5, ease: EASE }}
      style={{ transformPerspective: 1200, transformOrigin: '50% 100%', ...style }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
