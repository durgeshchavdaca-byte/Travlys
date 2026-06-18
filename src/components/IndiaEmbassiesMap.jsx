// Real India map from the Natural Earth public-domain TopoJSON
// (world-atlas package, CC0). Renders just the India geometry and
// overlays the 5 US diplomatic missions at proper lat/long.
//
// 3D feel comes from:
// - SVG filter drop shadow under the landmass
// - vertical sand-to-gold gradient fill
// - CSS perspective tilt on the container
// - per-pin lift shadow

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from 'react-simple-maps'
import worldGeo from 'world-atlas/countries-110m.json'

// US diplomatic missions in India, with real lat/long.
const MISSIONS = [
  {
    name: 'US Embassy New Delhi',
    short: 'Embassy',
    city: 'New Delhi',
    lng: 77.2090, lat: 28.6139,
    dx: -90, dy: -45,
    note: 'Main embassy. Northern zone: Delhi, UP, Punjab, Haryana, J&K, HP, Uttarakhand.',
    embassy: true,
  },
  {
    name: 'US Consulate General Mumbai',
    short: 'Consulate',
    city: 'Mumbai',
    lng: 72.8777, lat: 19.0760,
    dx: -120, dy: 20,
    note: 'Western zone: Maharashtra, Gujarat, Goa, MP, Chhattisgarh.',
  },
  {
    name: 'US Consulate General Kolkata',
    short: 'Consulate',
    city: 'Kolkata',
    lng: 88.3639, lat: 22.5726,
    dx: 90, dy: -30,
    note: 'Eastern zone: West Bengal, Bihar, Odisha, Jharkhand, NE states.',
  },
  {
    name: 'US Consulate General Hyderabad',
    short: 'Consulate',
    city: 'Hyderabad',
    lng: 78.4867, lat: 17.3850,
    dx: 120, dy: 10,
    note: 'South-central zone: Telangana, Andhra Pradesh, Odisha.',
  },
  {
    name: 'US Consulate General Chennai',
    short: 'Consulate',
    city: 'Chennai',
    lng: 80.2707, lat: 13.0827,
    dx: 110, dy: 40,
    note: 'Southern zone: Tamil Nadu, Karnataka, Kerala, Puducherry.',
  },
]

export default function IndiaEmbassiesMap() {
  return (
    <div className="relative" style={{ perspective: '1400px' }}>
      <div
        className="relative mx-auto"
        style={{
          transform: 'rotateX(8deg) rotateY(-2deg)',
          transformStyle: 'preserve-3d',
          maxWidth: '620px',
        }}
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ center: [82, 22], scale: 950 }}
          width={620}
          height={560}
          style={{ width: '100%', height: 'auto', overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="ie-land" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#FAE8C2" />
              <stop offset="45%"  stopColor="#ECC878" />
              <stop offset="100%" stopColor="#D4A64A" />
            </linearGradient>

            <linearGradient id="ie-highlight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stopColor="#FFFFFF" stopOpacity="0.55" />
              <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            <filter id="ie-shadow" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="9" />
              <feOffset dx="0" dy="14" />
              <feComponentTransfer><feFuncA type="linear" slope="0.5" /></feComponentTransfer>
              <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>

            <filter id="ie-pin-shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
              <feOffset dy="3" />
              <feComponentTransfer><feFuncA type="linear" slope="0.45" /></feComponentTransfer>
              <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>

            <radialGradient id="ie-glow">
              <stop offset="0%"   stopColor="#FF7849" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FF7849" stopOpacity="0" />
            </radialGradient>

            <pattern id="ie-ocean" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#0F1B4C" fillOpacity="0.06" />
            </pattern>
          </defs>

          {/* Ocean / background */}
          <rect x="-200" y="-100" width="1024" height="760" fill="url(#ie-ocean)" />

          {/* India landmass with 3D-feel shadow + gradient fill */}
          <g filter="url(#ie-shadow)">
            <Geographies geography={worldGeo}>
              {({ geographies }) =>
                geographies
                  .filter((g) => g.properties?.name === 'India')
                  .map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="url(#ie-land)"
                      stroke="#A07C2C"
                      strokeOpacity={0.65}
                      strokeWidth={1.1}
                      style={{
                        default: { outline: 'none' },
                        hover:   { outline: 'none' },
                        pressed: { outline: 'none' },
                      }}
                    />
                  ))
              }
            </Geographies>
            {/* highlight gloss along the top edge */}
            <Geographies geography={worldGeo}>
              {({ geographies }) =>
                geographies
                  .filter((g) => g.properties?.name === 'India')
                  .map((geo) => (
                    <Geography
                      key={`hl-${geo.rsmKey}`}
                      geography={geo}
                      fill="url(#ie-highlight)"
                      stroke="none"
                      style={{
                        default: { outline: 'none', pointerEvents: 'none' },
                        hover:   { outline: 'none', pointerEvents: 'none' },
                        pressed: { outline: 'none', pointerEvents: 'none' },
                      }}
                    />
                  ))
              }
            </Geographies>
          </g>

          {/* Mission pins with city annotations */}
          {MISSIONS.map((m) => (
            <Annotation
              key={m.city}
              subject={[m.lng, m.lat]}
              dx={m.dx}
              dy={m.dy}
              connectorProps={{
                stroke: '#0F1B4C',
                strokeOpacity: 0.35,
                strokeWidth: 1,
                strokeDasharray: '2 3',
              }}
            >
              <text
                x={m.dx > 0 ? 4 : -4}
                y={-2}
                textAnchor={m.dx > 0 ? 'start' : 'end'}
                fontFamily="'Cabinet Grotesk', sans-serif"
                fontWeight="700"
                fontSize="13"
                fill="#0F1B4C"
              >
                {m.city}
              </text>
              <text
                x={m.dx > 0 ? 4 : -4}
                y={12}
                textAnchor={m.dx > 0 ? 'start' : 'end'}
                fontFamily="'Switzer', sans-serif"
                fontWeight="500"
                fontSize="10"
                fill="#5A6072"
              >
                {m.embassy ? '★ Embassy' : 'Consulate'}
              </text>
            </Annotation>
          ))}

          {/* Pins themselves */}
          {MISSIONS.map((m) => (
            <Marker key={`pin-${m.city}`} coordinates={[m.lng, m.lat]}>
              {m.embassy && (
                <circle r={20} fill="url(#ie-glow)" className="animate-pulse-soft" />
              )}
              <circle r={m.embassy ? 9 : 7} fill="#FF7849" fillOpacity="0.22" />
              <circle
                r={m.embassy ? 6 : 4.5}
                fill={m.embassy ? '#FF7849' : '#0F1B4C'}
                stroke="#FFFFFF"
                strokeWidth={1.5}
                filter="url(#ie-pin-shadow)"
              />
              <circle
                cx={m.embassy ? -1.2 : -1}
                cy={m.embassy ? -1.2 : -1}
                r={m.embassy ? 1.5 : 1}
                fill="#FFFFFF"
                fillOpacity="0.7"
              />
            </Marker>
          ))}
        </ComposableMap>
      </div>

      {/* Legend cards below — mobile fallback + accessibility */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {MISSIONS.map((m) => (
          <div key={m.city} className="card p-4 flex items-start gap-3">
            <span
              className={`mt-1 w-3 h-3 rounded-full shrink-0 ${
                m.embassy ? 'bg-coral-500' : 'bg-ink-900'
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
