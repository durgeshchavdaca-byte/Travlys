// Real world map built on the Natural Earth public-domain TopoJSON
// (via the world-atlas npm package, CC0). Renders proper country
// shapes, then overlays Travlys's India origin, the 10 destination
// pins, and dashed flight-path arcs computed by react-simple-maps's
// great-circle Line component.

import { useState, memo } from 'react'
import { Link } from 'react-router-dom'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from 'react-simple-maps'
import worldGeo from 'world-atlas/countries-110m.json'

// Travlys origin (India centroid, approximately).
const ORIGIN = { lng: 78.9629, lat: 22.0, label: 'India' }

// Destinations with lng/lat (centroid of each country / capital area).
const DESTS = [
  { slug: 'usa-visa',         name: 'USA',         iso: 'USA',  lng: -98.0,   lat: 39.5 },
  { slug: 'canada-visa',      name: 'Canada',      iso: 'CAN',  lng: -106.0,  lat: 56.1 },
  { slug: 'uk-visa',          name: 'UK',          iso: 'GBR',  lng: -2.4,    lat: 54.0 },
  { slug: 'netherlands-visa', name: 'Schengen',    iso: 'NLD',  lng: 5.3,     lat: 52.1 },
  { slug: 'uae-visa',         name: 'UAE',         iso: 'ARE',  lng: 54.0,    lat: 24.0 },
  { slug: 'thailand-visa',    name: 'Thailand',    iso: 'THA',  lng: 100.9,   lat: 15.9 },
  { slug: 'singapore-visa',   name: 'Singapore',   iso: 'SGP',  lng: 103.8,   lat: 1.4 },
  { slug: 'malaysia-visa',    name: 'Malaysia',    iso: 'MYS',  lng: 102.0,   lat: 4.2 },
  { slug: 'new-zealand-visa', name: 'New Zealand', iso: 'NZL',  lng: 174.9,   lat: -40.9 },
  { slug: 'australia-visa',   name: 'Australia',   iso: 'AUS',  lng: 133.8,   lat: -25.3 },
]

const DEST_ISO = new Set(DESTS.map((d) => d.iso))

// Memoised Geographies layer — country shapes don't change with hover
// state, so we don't want to re-render them every mouse move.
const CountriesLayer = memo(function CountriesLayer({ activeIso }) {
  return (
    <Geographies geography={worldGeo}>
      {({ geographies }) =>
        geographies.map((geo) => {
          const iso = geo.id // 3-letter numeric in some sources; here it's the name code from properties
          const name = geo.properties?.name
          const isIndia = name === 'India'
          const isServed = DESTS.some((d) => d.name === name || nameMatch(name, d))
          const isActive = activeIso && nameMatch(name, DESTS.find((d) => d.iso === activeIso))
          return (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill={
                isIndia
                  ? '#FF7849'
                  : isActive
                  ? '#0F1B4C'
                  : isServed
                  ? '#0F1B4C40'
                  : '#0F1B4C18'
              }
              stroke="#0F1B4C"
              strokeOpacity={0.18}
              strokeWidth={0.4}
              style={{
                default: { outline: 'none' },
                hover:   { outline: 'none' },
                pressed: { outline: 'none' },
              }}
            />
          )
        })
      }
    </Geographies>
  )
})

function nameMatch(geoName, dest) {
  if (!dest || !geoName) return false
  if (geoName === dest.name) return true
  // Handle Natural Earth's longer names
  if (dest.iso === 'USA' && geoName === 'United States of America') return true
  if (dest.iso === 'GBR' && geoName === 'United Kingdom') return true
  return false
}

export default function WorldMap() {
  const [activeIso, setActiveIso] = useState(null)

  return (
    <div className="relative w-full">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 165, center: [40, 18] }}
        width={980}
        height={520}
        style={{ width: '100%', height: 'auto', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="wm-arc" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#FF7849" stopOpacity="0.85" />
            <stop offset="55%"  stopColor="#ECC878" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0F1B4C" stopOpacity="0.30" />
          </linearGradient>
          <radialGradient id="wm-origin-glow">
            <stop offset="0%"   stopColor="#FF7849" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FF7849" stopOpacity="0" />
          </radialGradient>
          <filter id="wm-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.6" />
            <feOffset dy="1.5" />
            <feComponentTransfer><feFuncA type="linear" slope="0.35" /></feComponentTransfer>
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <g>
          <CountriesLayer activeIso={activeIso} />

          {/* Flight paths India -> destinations */}
          {DESTS.map((d) => (
            <Line
              key={`arc-${d.slug}`}
              from={[ORIGIN.lng, ORIGIN.lat]}
              to={[d.lng, d.lat]}
              stroke="url(#wm-arc)"
              strokeWidth={activeIso === d.iso ? 2 : 1.2}
              strokeDasharray="4 5"
              strokeLinecap="round"
              opacity={activeIso && activeIso !== d.iso ? 0.25 : 0.9}
              style={{ transition: 'stroke-width 0.3s, opacity 0.3s' }}
            />
          ))}

          {/* India origin */}
          <Marker coordinates={[ORIGIN.lng, ORIGIN.lat]}>
            <circle r={18} fill="url(#wm-origin-glow)" className="animate-pulse-soft" />
            <circle r={6} fill="#FF7849" filter="url(#wm-shadow)" />
            <circle r={2.5} fill="#FFFFFF" />
            <text
              y={-12}
              textAnchor="middle"
              fontFamily="'Cabinet Grotesk', sans-serif"
              fontWeight="700"
              fontSize="9"
              fill="#0F1B4C"
            >
              India
            </text>
          </Marker>

          {/* Destination pins */}
          {DESTS.map((d) => {
            const active = activeIso === d.iso
            return (
              <Marker key={d.slug} coordinates={[d.lng, d.lat]}>
                <Link to={`/visa/${d.slug}`}>
                  <g
                    onMouseEnter={() => setActiveIso(d.iso)}
                    onMouseLeave={() => setActiveIso(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    <circle r={12} fill="transparent" />
                    <circle r={active ? 9 : 6} fill="#FF7849" fillOpacity="0.22" style={{ transition: 'r 0.3s' }} />
                    <circle
                      r={active ? 4.5 : 3.5}
                      fill="#0F1B4C"
                      stroke="#FFFFFF"
                      strokeWidth={1.1}
                      filter="url(#wm-shadow)"
                      style={{ transition: 'r 0.3s' }}
                    />
                    <text
                      y={-9}
                      textAnchor="middle"
                      fontFamily="'Switzer', sans-serif"
                      fontWeight="600"
                      fontSize="8"
                      fill="#0F1B4C"
                      style={{ pointerEvents: 'none' }}
                    >
                      {d.name}
                    </text>
                  </g>
                </Link>
              </Marker>
            )
          })}
        </g>
      </ComposableMap>
    </div>
  )
}
