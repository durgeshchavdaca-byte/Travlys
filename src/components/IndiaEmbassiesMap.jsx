// Stylised India outline with the 5 US diplomatic missions plotted.
// The shape is hand-drawn (not a geographic atlas asset). The mission
// locations are public information.
//
// 3D feel comes from:
// - layered SVG filter shadow under the landmass
// - vertical gradient fill (lighter top, deeper bottom)
// - per-pin lift shadow
// - CSS perspective tilt on the container

const MISSIONS = [
  {
    name: 'US Embassy New Delhi',
    short: 'Embassy',
    city: 'New Delhi',
    x: 198,
    y: 130,
    note: 'Main embassy. Handles most northern-zone applicants.',
  },
  {
    name: 'US Consulate General Mumbai',
    short: 'Consulate',
    city: 'Mumbai',
    x: 122,
    y: 270,
    note: 'Western zone: Maharashtra, Gujarat, Goa, MP, Chhattisgarh.',
  },
  {
    name: 'US Consulate General Kolkata',
    short: 'Consulate',
    city: 'Kolkata',
    x: 295,
    y: 215,
    note: 'Eastern zone: West Bengal, Bihar, Odisha, Jharkhand, NE states.',
  },
  {
    name: 'US Consulate General Hyderabad',
    short: 'Consulate',
    city: 'Hyderabad',
    x: 208,
    y: 318,
    note: 'South-central zone: Telangana, Andhra Pradesh, Odisha.',
  },
  {
    name: 'US Consulate General Chennai',
    short: 'Consulate',
    city: 'Chennai',
    x: 228,
    y: 378,
    note: 'Southern zone: Tamil Nadu, Karnataka, Kerala, Puducherry.',
  },
]

// Hand-drawn India silhouette. Intentionally simplified for visual
// clarity, not surveyed geometry.
const INDIA_PATH =
  'M 165 75 Q 195 60 240 68 Q 285 75 305 95 Q 320 115 312 140 Q 308 158 320 170 Q 335 178 342 198 Q 348 218 332 230 Q 318 240 308 258 Q 298 278 285 296 Q 272 314 258 332 Q 245 352 238 372 Q 232 392 225 410 Q 220 428 210 438 Q 200 444 195 432 Q 188 408 180 380 Q 172 354 158 332 Q 142 308 130 282 Q 118 256 112 230 Q 106 204 102 178 Q 98 152 110 132 Q 122 112 118 95 Q 115 80 130 72 Q 145 68 165 75 Z'

export default function IndiaEmbassiesMap() {
  return (
    <div className="relative" style={{ perspective: '1400px' }}>
      <div
        className="relative mx-auto"
        style={{
          transform: 'rotateX(8deg) rotateY(-2deg)',
          transformStyle: 'preserve-3d',
          maxWidth: '560px',
        }}
      >
        <svg
          viewBox="-110 0 620 520"
          className="w-full h-auto block overflow-visible"
          role="img"
          aria-label="Map of India showing the 5 US embassy and consulate locations"
        >
          <defs>
            {/* Vertical landmass gradient: warm sand at top, deep ink at bottom */}
            <linearGradient id="ie-land" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#FAE8C2" />
              <stop offset="45%"  stopColor="#ECC878" />
              <stop offset="100%" stopColor="#D4A64A" />
            </linearGradient>

            {/* Soft drop shadow under the landmass */}
            <filter id="ie-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="9" />
              <feOffset dx="0" dy="14" />
              <feComponentTransfer><feFuncA type="linear" slope="0.45" /></feComponentTransfer>
              <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>

            {/* Subtle inner highlight along the top edge */}
            <linearGradient id="ie-highlight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stopColor="#FFFFFF" stopOpacity="0.55" />
              <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* Pin shadow */}
            <filter id="ie-pin-shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
              <feOffset dy="3" />
              <feComponentTransfer><feFuncA type="linear" slope="0.45" /></feComponentTransfer>
              <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>

            {/* Stamp-look pulse for the active embassy pin (Delhi) */}
            <radialGradient id="ie-glow">
              <stop offset="0%"   stopColor="#FF7849" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FF7849" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Subtle dot pattern background suggesting ocean */}
          <pattern id="ie-ocean" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#0F1B4C" fillOpacity="0.06" />
          </pattern>
          <rect x="-110" y="0" width="620" height="520" fill="url(#ie-ocean)" />

          {/* India landmass with 3D-feel shadow + gradient fill */}
          <g filter="url(#ie-shadow)">
            <path d={INDIA_PATH} fill="url(#ie-land)" stroke="#A07C2C" strokeWidth="1.2" strokeOpacity="0.6" />
            {/* highlight along the top edge */}
            <path d={INDIA_PATH} fill="url(#ie-highlight)" opacity="0.9" />
          </g>

          {/* Mission pins */}
          <g>
            {MISSIONS.map((m, i) => {
              const isEmbassy = i === 0
              return (
                <g key={m.city}>
                  {isEmbassy && (
                    <circle
                      cx={m.x}
                      cy={m.y}
                      r="34"
                      fill="url(#ie-glow)"
                      className="animate-pulse-soft"
                    />
                  )}
                  {/* pin shaft (line from city to label anchor) */}
                  {/* outer ping */}
                  <circle cx={m.x} cy={m.y} r={isEmbassy ? 12 : 9} fill="#FF7849" fillOpacity="0.22" />
                  {/* pin head */}
                  <circle
                    cx={m.x}
                    cy={m.y}
                    r={isEmbassy ? 7 : 5.5}
                    fill={isEmbassy ? '#FF7849' : '#0F1B4C'}
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    filter="url(#ie-pin-shadow)"
                  />
                  {/* inner highlight dot */}
                  <circle
                    cx={m.x - 1.5}
                    cy={m.y - 1.5}
                    r={isEmbassy ? 1.8 : 1.2}
                    fill="#FFFFFF"
                    fillOpacity="0.7"
                  />
                </g>
              )
            })}
          </g>

          {/* City labels — placed outside the landmass to avoid overlap */}
          <g fontFamily="'Cabinet Grotesk', sans-serif" fontWeight="700" fontSize="13" fill="#0F1B4C">
            {/* New Delhi - label top-left of pin */}
            <line x1="198" y1="130" x2="80"  y2="90"  stroke="#0F1B4C" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="2 3" />
            <text x="78" y="84" textAnchor="end">New Delhi</text>
            <text x="78" y="100" textAnchor="end" fontSize="10" fontWeight="500" fill="#5A6072">★ Embassy</text>

            {/* Mumbai - label left */}
            <line x1="122" y1="270" x2="35"  y2="260" stroke="#0F1B4C" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="2 3" />
            <text x="33" y="254" textAnchor="end">Mumbai</text>
            <text x="33" y="270" textAnchor="end" fontSize="10" fontWeight="500" fill="#5A6072">Consulate</text>

            {/* Kolkata - label top-right */}
            <line x1="295" y1="215" x2="375" y2="170" stroke="#0F1B4C" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="2 3" />
            <text x="377" y="164" textAnchor="start">Kolkata</text>
            <text x="377" y="180" textAnchor="start" fontSize="10" fontWeight="500" fill="#5A6072">Consulate</text>

            {/* Hyderabad - label right */}
            <line x1="208" y1="318" x2="372" y2="335" stroke="#0F1B4C" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="2 3" />
            <text x="374" y="332" textAnchor="start">Hyderabad</text>
            <text x="374" y="348" textAnchor="start" fontSize="10" fontWeight="500" fill="#5A6072">Consulate</text>

            {/* Chennai - label bottom-right */}
            <line x1="228" y1="378" x2="372" y2="430" stroke="#0F1B4C" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="2 3" />
            <text x="374" y="426" textAnchor="start">Chennai</text>
            <text x="374" y="442" textAnchor="start" fontSize="10" fontWeight="500" fill="#5A6072">Consulate</text>
          </g>
        </svg>
      </div>

      {/* Legend / list below the map for accessibility + mobile */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {MISSIONS.map((m, i) => (
          <div key={m.city} className="card p-4 flex items-start gap-3">
            <span
              className={`mt-1 w-3 h-3 rounded-full shrink-0 ${
                i === 0 ? 'bg-coral-500' : 'bg-ink-900'
              }`}
              style={{ boxShadow: '0 0 0 3px rgba(255, 120, 73, 0.18)' }}
              aria-hidden
            />
            <div>
              <p className="font-display font-bold text-ink-900 text-[0.95rem] leading-tight">
                {m.name}
              </p>
              <p className="text-xs text-slate-muted mt-1 leading-relaxed">{m.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
