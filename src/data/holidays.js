// Holiday packages Travlys plans. The two featured itineraries come from
// real Travlys proposals (Bali TRV-BL-261023, Sri Lanka TRV-LK-261208); the
// other destinations are quoted to order. Prices are land packages per
// person on twin sharing; GST and TCS are extra, as applicable.

export const HOLIDAYS_UPDATED = '2026-11-03'

export const FEATURED_PACKAGES = [
  {
    slug: 'bali-5-nights',
    place: 'Bali',
    name: 'Bali & Nusa Penida with a private pool villa',
    nights: 5,
    days: 6,
    price: 'From ₹40,400',
    priceValue: 40400,
    currency: 'INR',
    priceNote: 'per person, 2-3 travellers sharing; rates for travel until June 2027',
    image: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=1200&h=800&fit=crop',
    stays: ['Kuta, 3 nights (beach hotel)', 'Ubud, 2 nights (private pool villa)'],
    highlights: [
      'Uluwatu cliff temple at sunset and the Kecak fire dance',
      'Fast boat to Nusa Penida: Kelingking, Broken Beach and Crystal Bay',
      'Highland day: Handara Gate, Ulun Danu Beratan lake temple and Tanah Lot',
      'Water sports at Tanjung Benoa and white-water rafting on the Ayung River',
    ],
    includes: ['Daily breakfast plus 2 lunches', 'Private A/C car with an English-speaking driver', 'Airport welcome with a flower garland', 'Three hotel options to choose from'],
    visa: { label: 'Visa on arrival or e-VOA for Indians', href: '/blog/bali-visa-on-arrival-for-indians-2026/' },
  },
  {
    slug: 'sri-lanka-7-nights',
    place: 'Sri Lanka',
    name: 'Sri Lanka island tour: hills, tea country and the coast',
    nights: 7,
    days: 8,
    price: 'From USD 795',
    priceValue: 795,
    currency: 'USD',
    priceNote: 'per person, twin sharing; paid in INR at the day’s exchange rate',
    image: 'https://images.unsplash.com/photo-1544015759-237f87d55ef3?w=1200&h=800&fit=crop',
    stays: ['Kandy, 2 nights', 'Nuwara Eliya, 2 nights', 'Bentota, 2 nights', 'Colombo, 1 night'],
    highlights: [
      'Pinnawala Elephant Orphanage and a spice garden on the way to Kandy',
      'Temple of the Sacred Tooth Relic and the Kandyan cultural show',
      'Tea country: Ramboda Falls and a working tea factory near Nuwara Eliya',
      'Two slow days on the beaches of the south-west coast',
    ],
    includes: ['Daily breakfast and dinner', 'Private A/C van with an English-speaking chauffeur', 'Meet and assist at Colombo airport', 'Radisson and similar hotels'],
    visa: { label: 'Free tourist ETA for Indians', href: '/blog/sri-lanka-eta-for-indians-2026/' },
  },
]

// Quoted to order: no fixed price yet, so the card asks for dates instead.
export const MORE_DESTINATIONS = [
  { place: 'Thailand', idea: 'Bangkok, Pattaya, Phuket or Krabi', image: '/media/destinations/thailand-visa-sm.jpg', visa: { label: '30 days visa-free', href: '/blog/thailand-visa-free-for-indians-2026/' } },
  { place: 'Dubai', idea: 'City, desert safari and Abu Dhabi', image: '/media/destinations/uae-visa-sm.jpg', visa: { label: 'e-Visa in 2-4 days', href: '/visa/uae-visa/' } },
  { place: 'Singapore', idea: 'Sentosa, Gardens by the Bay, Universal', image: '/media/destinations/singapore-visa-sm.jpg', visa: { label: 'Visa in 3-5 working days', href: '/visa/singapore-visa/' } },
  { place: 'Malaysia', idea: 'Kuala Lumpur, Genting and Langkawi', image: '/media/destinations/malaysia-visa-sm.jpg', visa: { label: 'Visa-free to 31 Dec 2026', href: '/blog/malaysia-visa-free-for-indians-2026/' } },
  { place: 'Vietnam', idea: 'Hanoi, Ha Long Bay, Da Nang', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=900&h=600&fit=crop', visa: { label: 'e-Visa', href: '/blog/vietnam-e-visa-for-indians-2026/' } },
  { place: 'Maldives', idea: 'Resort stays with transfers', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=900&h=600&fit=crop', visa: { label: 'Visa on arrival', href: '/blog/maldives-visa-on-arrival-for-indians-2026/' } },
]

export const HOLIDAY_FAQS = [
  {
    q: 'Do Travlys holiday packages include flights?',
    a: 'The prices shown are land packages: hotels, private transfers, sightseeing and the meals listed. Flights from your city can be added to the same quote, and we compare fares before booking.',
  },
  {
    q: 'Are GST and TCS included in the package price?',
    a: 'No. GST and TCS on overseas tour packages are charged as applicable under Indian tax rules and shown as separate lines in your quote, so you see exactly what you pay.',
  },
  {
    q: 'Can you change the itinerary, hotels or number of nights?',
    a: 'Yes. Every Travlys package is tailor-made: change the nights, hotel category, rooms or sightseeing and we send a revised quote, usually the same working day.',
  },
  {
    q: 'Does Travlys handle the visa for my holiday?',
    a: 'Yes. Travlys is a visa consultancy, so the visa, e-Visa, ETA or arrival card for your trip is handled in the same file as the package.',
  },
  {
    q: 'How do I book a Travlys holiday package?',
    a: 'Send your travel month, number of travellers and departure city on WhatsApp at +91 82009 18967 or through the form on this page. A specialist sends a day-by-day itinerary and quote, and the booking is confirmed once you approve it.',
  },
]

export function packageWhatsApp(place, extra = '') {
  const text =
    `Hi Travlys, I would like a holiday package quote for ${place}.${extra ? ` ${extra}` : ''}\n\n` +
    'Travel month:\nNumber of travellers:\nDeparture city:\nBudget per person:'
  return `https://wa.me/918200918967?text=${encodeURIComponent(text)}`
}
