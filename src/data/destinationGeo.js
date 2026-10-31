// The headline city for each destination, shown on the hero preview card and
// the 3D destination ring.

export const DEST_GEO = {
  'usa-visa': { city: 'New York', lat: 40.71, lon: -74.0 },
  'uk-visa': { city: 'London', lat: 51.51, lon: -0.13 },
  'canada-visa': { city: 'Toronto', lat: 43.65, lon: -79.38 },
  'australia-visa': { city: 'Sydney', lat: -33.87, lon: 151.21 },
  'netherlands-visa': { city: 'Amsterdam', lat: 52.37, lon: 4.9 },
  'singapore-visa': { city: 'Singapore', lat: 1.35, lon: 103.82 },
  'uae-visa': { city: 'Dubai', lat: 25.2, lon: 55.27 },
  'thailand-visa': { city: 'Bangkok', lat: 13.75, lon: 100.5 },
  'new-zealand-visa': { city: 'Auckland', lat: -36.85, lon: 174.76 },
  'malaysia-visa': { city: 'Kuala Lumpur', lat: 3.14, lon: 101.69 },
}

// Looping video and poster for each destination (and the hero), served from
// /public/media/destinations. Licences are listed in credits.json there.
export function destMedia(slug) {
  return {
    video: `/media/destinations/${slug}.mp4`,
    poster: `/media/destinations/${slug}.jpg`,
    posterSm: `/media/destinations/${slug}-sm.jpg`,
  }
}
