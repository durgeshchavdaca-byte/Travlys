// Renders a country flag from the public flagcdn.com SVG endpoint.
// Falls back to nothing if no code is given. The subtle inset shadow
// keeps mostly-white flags (Japan, etc.) from disappearing on the
// site's light backgrounds.

export default function Flag({ code, name, size = 18, rounded = true, className = '' }) {
  const c = String(code || '').trim().toLowerCase()
  if (!c) return null

  return (
    <img
      src={`https://flagcdn.com/${c}.svg`}
      alt={name ? `${name} flag` : ''}
      aria-hidden={!name}
      loading="lazy"
      decoding="async"
      width={Math.round(size * 1.4)}
      height={size}
      className={`inline-block shrink-0 align-middle object-cover ${
        rounded ? 'rounded-[3px]' : ''
      } ${className}`}
      style={{
        height: `${size}px`,
        width: 'auto',
        boxShadow: 'inset 0 0 0 1px rgba(15, 27, 76, 0.10)',
      }}
    />
  )
}
