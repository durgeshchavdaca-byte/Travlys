// Stylised world map — continents are hand-drawn blob shapes, not a
// geographic atlas. India is highlighted as the origin; every supported
// destination gets a pulsing coral pin with a dashed flight-path arc
// back to India.
//
// All paths are original. No copyrighted map data is used.

import { useState } from 'react'
import { Link } from 'react-router-dom'

// SVG viewBox: 0 0 1000 520. Continent blobs are intentionally loose.
const CONTINENTS = [
  // North America
  'M 65 110 C 55 80, 110 55, 175 65 C 235 75, 270 100, 285 140 C 295 175, 280 215, 245 240 C 200 260, 145 245, 105 220 C 75 200, 60 155, 65 110 Z',
  // Central America strip
  'M 200 245 C 210 240, 230 250, 245 260 C 250 275, 235 285, 220 280 C 205 270, 195 255, 200 245 Z',
  // South America
  'M 245 270 C 240 255, 275 245, 295 265 C 315 295, 322 345, 312 388 C 302 428, 276 446, 256 422 C 240 388, 240 322, 245 270 Z',
  // Greenland
  'M 360 60 C 360 50, 395 50, 410 65 C 420 80, 410 95, 390 95 C 370 92, 355 78, 360 60 Z',
  // Europe
  'M 460 105 C 455 90, 485 85, 515 95 C 545 105, 555 125, 548 145 C 540 165, 510 175, 482 168 C 463 160, 455 125, 460 105 Z',
  // Africa
  'M 478 195 C 470 180, 502 175, 532 192 C 565 213, 582 255, 575 305 C 568 340, 543 360, 515 352 C 485 340, 470 280, 478 195 Z',
  // Middle East (wedge)
  'M 555 175 C 555 165, 590 168, 605 180 C 615 195, 605 210, 588 210 C 568 205, 552 188, 555 175 Z',
  // Asia (the big one)
  'M 555 95 C 550 80, 605 65, 695 75 C 770 85, 830 115, 855 165 C 870 205, 845 250, 795 265 C 730 278, 645 270, 595 235 C 558 205, 545 140, 555 95 Z',
  // India (handled by special marker, but a soft underlying blob anchors it)
  'M 645 200 C 645 188, 680 188, 700 200 C 715 215, 712 240, 698 252 C 680 262, 660 252, 650 235 C 643 225, 642 210, 645 200 Z',
  // SE Asia + Indonesia
  'M 740 265 C 740 257, 780 257, 800 268 C 815 280, 808 295, 790 297 C 770 295, 745 282, 740 265 Z',
  // Indonesia / archipelago dots
  'M 770 305 C 770 300, 790 300, 800 308 C 805 315, 795 320, 785 318 C 775 315, 768 310, 770 305 Z',
  // Japan
  'M 875 165 C 873 158, 887 156, 893 165 C 897 175, 890 185, 882 183 C 875 180, 873 172, 875 165 Z',
  // Australia
  'M 770 365 C 765 350, 800 345, 835 360 C 865 375, 880 400, 855 415 C 825 425, 790 410, 770 390 C 765 385, 765 370, 770 365 Z',
  // New Zealand
  'M 895 410 C 895 405, 910 405, 915 415 C 918 425, 908 432, 900 428 C 895 425, 892 415, 895 410 Z',
]

// Approximate viewBox positions for our 10 destinations.
// India origin sits at (665, 220).
const ORIGIN = { x: 665, y: 220, label: 'India' }

const DESTS = [
  { slug: 'usa-visa',         name: 'USA',       short: 'US', x: 175,  y: 150 },
  { slug: 'canada-visa',      name: 'Canada',    short: 'CA', x: 195,  y: 100 },
  { slug: 'uk-visa',          name: 'UK',        short: 'GB', x: 478,  y: 125 },
  { slug: 'netherlands-visa', name: 'Schengen',  short: 'NL', x: 502,  y: 135 },
  { slug: 'uae-visa',         name: 'UAE',       short: 'AE', x: 585,  y: 210 },
  { slug: 'thailand-visa',    name: 'Thailand',  short: 'TH', x: 752,  y: 260 },
  { slug: 'singapore-visa',   name: 'Singapore', short: 'SG', x: 780,  y: 295 },
  { slug: 'malaysia-visa',    name: 'Malaysia',  short: 'MY', x: 765,  y: 280 },
  { slug: 'new-zealand-visa', name: 'New Zealand', short: 'NZ', x: 905, y: 418 },
  { slug: 'australia-visa',   name: 'Australia', short: 'AU', x: 820,  y: 385 },
]

// Build a quadratic Bezier arc from India to a destination.
// Control point is offset perpendicular to the chord midpoint so the
// arc curves nicely (longer chords get more lift).
function arcPath(from, to) {
  const mx = (from.x + to.x) / 2
  const my = (from.y + to.y) / 2
  const dx = to.x - from.x
  const dy = to.y - from.y
  const len = Math.sqrt(dx * dx + dy * dy)
  // perpendicular offset
  const lift = Math.min(120, len * 0.28)
  // perpendicular unit, biased upward (negative y is up in SVG)
  const px = -dy / len
  const py = dx / len
  const sign = py > 0 ? -1 : 1
  const cx = mx + px * lift * sign
  const cy = my + py * lift * sign
  return `M ${from.x} ${from.y} Q ${cx} ${cy}, ${to.x} ${to.y}`
}

export default function WorldMap() {
  const [hover, setHover] = useState(null)

  return (
    <div className="relative">
      <svg
        viewBox="0 0 1000 520"
        className="w-full h-auto"
        role="img"
        aria-label="Map showing the destinations Travlys serves"
      >
        <defs>
          {/* faint dot pattern for the "ocean" background */}
          <pattern id="wm-dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#0F1B4C" fillOpacity="0.07" />
          </pattern>
          {/* gradient for flight paths */}
          <linearGradient id="wm-flight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#FF7849" stopOpacity="0.85" />
            <stop offset="60%"  stopColor="#ECC878" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0F1B4C" stopOpacity="0.35" />
          </linearGradient>
          {/* soft glow for the India origin pulse */}
          <radialGradient id="wm-origin-glow">
            <stop offset="0%"   stopColor="#FF7849" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FF7849" stopOpacity="0" />
          </radialGradient>
          {/* drop shadow for pins */}
          <filter id="wm-pin-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dy="2" />
            <feComponentTransfer><feFuncA type="linear" slope="0.35" /></feComponentTransfer>
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Ocean background */}
        <rect width="1000" height="520" fill="url(#wm-dots)" />

        {/* Continents */}
        <g fill="#0F1B4C" fillOpacity="0.10" stroke="#0F1B4C" strokeOpacity="0.18" strokeWidth="0.8">
          {CONTINENTS.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>

        {/* Flight paths from India to each destination */}
        <g fill="none" strokeLinecap="round">
          {DESTS.map((d) => (
            <path
              key={`p-${d.slug}`}
              d={arcPath(ORIGIN, d)}
              stroke="url(#wm-flight)"
              strokeWidth={hover === d.slug ? 2.2 : 1.4}
              strokeDasharray="4 5"
              opacity={hover && hover !== d.slug ? 0.25 : 0.85}
              style={{ transition: 'stroke-width 0.3s, opacity 0.3s' }}
            />
          ))}
        </g>

        {/* India origin */}
        <g>
          <circle cx={ORIGIN.x} cy={ORIGIN.y} r="34" fill="url(#wm-origin-glow)" className="animate-pulse-soft" />
          <circle cx={ORIGIN.x} cy={ORIGIN.y} r="9" fill="#FF7849" filter="url(#wm-pin-shadow)" />
          <circle cx={ORIGIN.x} cy={ORIGIN.y} r="4" fill="#FFFFFF" />
          <text
            x={ORIGIN.x}
            y={ORIGIN.y + 28}
            textAnchor="middle"
            fontFamily="'Cabinet Grotesk', sans-serif"
            fontWeight="700"
            fontSize="14"
            fill="#0F1B4C"
          >
            India
          </text>
        </g>

        {/* Destination pins */}
        <g>
          {DESTS.map((d) => {
            const active = hover === d.slug
            return (
              <Link key={d.slug} to={`/visa/${d.slug}`}>
                <g
                  onMouseEnter={() => setHover(d.slug)}
                  onMouseLeave={() => setHover(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* clickable padding circle */}
                  <circle cx={d.x} cy={d.y} r="18" fill="transparent" />
                  {/* ping ring */}
                  <circle
                    cx={d.x}
                    cy={d.y}
                    r={active ? 14 : 9}
                    fill="#FF7849"
                    fillOpacity="0.18"
                    style={{ transition: 'r 0.3s' }}
                  />
                  {/* pin head */}
                  <circle
                    cx={d.x}
                    cy={d.y}
                    r={active ? 6.5 : 5}
                    fill="#0F1B4C"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    filter="url(#wm-pin-shadow)"
                    style={{ transition: 'r 0.3s' }}
                  />
                  {/* label */}
                  <text
                    x={d.x}
                    y={d.y - 12}
                    textAnchor="middle"
                    fontFamily="'Switzer', sans-serif"
                    fontWeight="600"
                    fontSize="11"
                    fill="#0F1B4C"
                    style={{ pointerEvents: 'none' }}
                  >
                    {d.name}
                  </text>
                </g>
              </Link>
            )
          })}
        </g>
      </svg>
    </div>
  )
}
