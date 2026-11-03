// Holiday packages Travlys plans. The two featured itineraries come from
// real Travlys proposals (Bali TRV-BL-261023, Sri Lanka TRV-LK-261208); the
// other destinations are quoted to order. Prices are not published: every
// package is quoted for the traveller's dates and group, GST and TCS extra.

export const HOLIDAYS_UPDATED = '2026-11-03'

export const FEATURED_PACKAGES = [
  {
    slug: 'bali-tour-package',
    place: 'Bali',
    name: 'Bali & Nusa Penida with a private pool villa',
    nights: 5,
    days: 6,
    priceNote: 'Quoted for your dates, group size and choice of three hotel options',
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
    slug: 'sri-lanka-tour-package',
    place: 'Sri Lanka',
    name: 'Sri Lanka island tour: hills, tea country and the coast',
    nights: 7,
    days: 8,
    priceNote: 'Quoted for your dates, group size and hotel category',
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
    a: 'The itineraries are land packages: hotels, private transfers, sightseeing and the meals listed. Flights from your city can be added to the same quote, and we compare fares before booking.',
  },
  {
    q: 'How much does a Travlys holiday package cost?',
    a: 'Every package is priced for your travel dates, number of travellers and hotel category, so we quote rather than list one fixed price. Send your dates on WhatsApp and you get a day-by-day itinerary with the full cost, usually the same working day.',
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

// Full package pages (/holidays/<slug>), built from the same proposals:
// day-by-day plan, hotel options, inclusions, timing and tips. The first
// paragraph of each is written to be quoted directly by search engines and
// AI assistants.
export const PACKAGE_DETAILS = {
  'bali-tour-package': {
    metaTitle: 'Bali Tour Package from India: 5N/6D Itinerary with Pool Villa | Travlys',
    metaDescription:
      'Bali tour package from India by Travlys: 5 nights in Kuta and an Ubud private pool villa, Nusa Penida, Uluwatu Kecak dance, rafting and private car. Day-by-day plan, hotels, inclusions.',
    keywords:
      'bali tour package from india, bali package from ahmedabad, bali 5 nights 6 days itinerary, bali honeymoon package, bali package with private pool villa, nusa penida tour, bali itinerary for indians',
    intro:
      'The Travlys Bali tour package is a 5-night, 6-day trip for Indian travellers: 3 nights in Kuta and 2 nights in a private pool villa in Ubud, with a fast-boat day trip to Nusa Penida, the Uluwatu Kecak fire dance at sunset, the highland lake temple of Ulun Danu Beratan, Tanah Lot and white-water rafting. Breakfast daily, two lunches, return airport transfers and every tour by private A/C car with an English-speaking driver are included. Indians get a visa on arrival or e-VOA for Bali, and the package is quoted for your dates.',
    glance: [
      ['Duration', '5 nights, 6 days'],
      ['Stays', 'Kuta 3 nights, Ubud 2 nights in a private pool villa'],
      ['Meals', 'Daily breakfast, plus lunch on Days 3 and 5'],
      ['Transport', 'Private A/C car with an English-speaking driver'],
      ['Best time', 'April to October, the dry season'],
      ['Visa', 'Visa on arrival or e-VOA, plus the IDR 150,000 Bali levy'],
    ],
    itinerary: [
      { title: 'Arrival in Bali', text: 'You are met at the airport with a flower garland and bottled water, then driven to your hotel in Kuta. The rest of the day is free.', overnight: 'Kuta' },
      { title: 'Water sports, Pandawa Beach and Uluwatu at sunset', text: 'Start at Tanjung Benoa with parasailing, a banana boat and a jet ski. Then the Bali Collection mall, Pandawa Beach and the cliff-cut road of Tanah Barak, ending at Uluwatu Temple for sunset and the Kecak fire dance.', overnight: 'Kuta' },
      { title: 'Day trip to Nusa Penida', text: 'An early fast boat takes you to Nusa Penida. A local car and driver take you round the west coast: Angel’s Billabong, Broken Beach, Kelingking Cliff and Crystal Bay. Return boat, Indonesian lunch, entrance fees and insurance are included.', overnight: 'Kuta' },
      { title: 'Highland temples and Tanah Lot, then on to Ubud', text: 'Drive up to the Handara Gate and the lake temple of Ulun Danu Beratan, with stops at a chocolate factory and a spice and coffee plantation, then Tanah Lot, the sea temple on its rock, at sunset. Check in to your Ubud pool villa.', overnight: 'Ubud pool villa' },
      { title: 'Rafting, Tegenungan Waterfall and the Bali swing', text: 'Guided white-water rafting with a waterfall stop and a Balinese lunch, then Tegenungan Waterfall, the Bali swing photo package and, if time allows, Ubud’s traditional market.', overnight: 'Ubud pool villa' },
      { title: 'Departure', text: 'Breakfast at your villa, then a transfer to Bali airport for your flight home.' },
    ],
    hotels: [
      { tier: 'Comfort', stays: 'Eden Hotel Kuta (Eden Room) and Suarti Boutique Village, Ubud (one-bedroom pool villa)' },
      { tier: 'Resort', stays: 'Risata Bali Resort & Spa, Kuta (Superior Room) and Dedary Resort & Spa, Ubud (villa with private pool)' },
      { tier: 'Luxury', stays: 'Ramayana Resort & Spa, Kuta (Grand Deluxe Room) and Asvara Villa Ubud (royal villa with private pool and Jacuzzi)' },
    ],
    included: [
      '3 nights in Kuta and 2 nights in an Ubud pool villa, as per your hotel option',
      'Daily breakfast, plus lunch on Days 3 and 5',
      'Return airport transfers and all tours by private A/C car with an English-speaking driver',
      'Entrance tickets and parking for the tours listed',
      'Tanjung Benoa water sports and the Kecak dance',
      'Nusa Penida day trip with return fast boat',
      'White-water rafting and the Bali swing package',
      '10% Indonesian government tax',
    ],
    excluded: [
      'International flights (we can add them to your quote)',
      'Indonesia visa on arrival and the Bali tourist levy',
      'Travel insurance',
      'Meals not listed, tips and personal expenses',
      'Transfers between 23:00 and 07:00',
      'GST and TCS, as applicable',
    ],
    tips: [
      'Cover shoulders and knees at temples; a sarong is usually provided at Uluwatu.',
      'The monkeys at Uluwatu grab sunglasses, phones and hats. Keep them in a bag.',
      'Day 4 is the long drive, about five and a half hours with stops; the highlands are cooler, so carry a light layer.',
      'Pay the IDR 150,000 Bali levy online before you fly, at lovebali.baliprov.go.id.',
    ],
    faqs: [
      { q: 'How many days are enough for a Bali trip from India?', a: 'Five nights is enough to see south Bali, Nusa Penida, the highland temples and Ubud without rushing. The Travlys Bali package splits them as 3 nights in Kuta and 2 nights in an Ubud pool villa; add a night or two in Ubud or Seminyak for a slower trip.' },
      { q: 'What is the best time to visit Bali from India?', a: 'April to October, the dry season, is the best time for Bali. December to March is the wet season, with short heavy showers, but still workable with flexible plans and lower crowds outside Christmas and New Year.' },
      { q: 'Do Indians need a visa for Bali?', a: 'Indians get a 30-day visa on arrival at Bali airport, or can buy the same visa online beforehand as an e-VOA, for IDR 500,000. Every visitor also pays the IDR 150,000 Bali tourist levy. Both are outside the package price.' },
      { q: 'Are flights included in the Bali package?', a: 'No, the package is a land package: hotels, transfers, tours and the meals listed. Travlys can add flights from Ahmedabad, Mumbai, Delhi or any Indian city to the same quote.' },
      { q: 'Is this Bali package good for a honeymoon?', a: 'Yes. The two nights in a private pool villa in Ubud, the Uluwatu sunset and the Bali swing make it popular with couples, and the luxury option adds a villa with a Jacuzzi. Tell us it is a honeymoon and we suggest extras for the villa nights.' },
      { q: 'Can I change the Bali itinerary?', a: 'Yes. Every Travlys package is tailor-made: swap a day, add nights, change hotels or remove activities, and we send a revised quote, usually the same working day.' },
    ],
  },
  'sri-lanka-tour-package': {
    metaTitle: 'Sri Lanka Tour Package from India: 7N/8D Kandy, Tea Hills, Beach | Travlys',
    metaDescription:
      'Sri Lanka tour package from India by Travlys: 7 nights in Kandy, Nuwara Eliya, Bentota and Colombo with breakfast, dinner and a private chauffeur. Day-by-day plan, hotels, free ETA.',
    keywords:
      'sri lanka tour package from india, sri lanka package from ahmedabad, sri lanka 7 nights 8 days itinerary, sri lanka honeymoon package, kandy nuwara eliya bentota package, sri lanka trip for indians',
    intro:
      'The Travlys Sri Lanka tour package is a 7-night, 8-day private trip for Indian travellers: 2 nights in Kandy, 2 nights in the tea hills of Nuwara Eliya, 2 nights on the beach at Bentota and a last night in Colombo. It includes daily breakfast and dinner, a private A/C van with an English-speaking chauffeur, airport meet and assist, and sightseeing from the Pinnawala elephants and the Temple of the Tooth to a working tea factory and a Madu River boat ride. Indians get Sri Lanka’s tourist ETA free, and the package is quoted for your dates.',
    glance: [
      ['Duration', '7 nights, 8 days'],
      ['Stays', 'Kandy 2, Nuwara Eliya 2, Bentota 2, Colombo 1'],
      ['Meals', 'Daily breakfast and dinner'],
      ['Transport', 'Private A/C van with an English-speaking chauffeur'],
      ['Best time', 'December to April for the hills and the south-west coast'],
      ['Visa', 'Free tourist ETA for Indians, applied online at eta.gov.lk'],
    ],
    itinerary: [
      { title: 'Colombo airport to Kandy, via Pinnawala', text: 'Your chauffeur meets you at Colombo airport. On the drive inland you stop at the Pinnawala Elephant Orphanage and a spice garden, depending on your flight time.', overnight: 'Kandy' },
      { title: 'Kandy: temples, gardens and a cultural show', text: 'Peradeniya Royal Botanical Gardens, the Temple of the Sacred Tooth Relic, Kandy Lake, a city tour and the Gem Gallery, then the evening Kandyan cultural show.', overnight: 'Kandy' },
      { title: 'Into tea country', text: 'The road climbs past Ramboda Falls and the Hanuman Temple, through tea plantations, with a stop at a working tea factory.', overnight: 'Nuwara Eliya' },
      { title: 'Nuwara Eliya, "Little England"', text: 'Seetha Amman Temple, Victoria Park, Gregory Lake and a tour of the town with its colonial bungalows. At about 1,868 m it is the coolest stop, so pack a warm layer.', overnight: 'Nuwara Eliya' },
      { title: 'Down to the coast at Bentota', text: 'Drive to the south-west coast, check in and spend the evening on the beach at sunset.', overnight: 'Bentota' },
      { title: 'Turtles, river and sea', text: 'A turtle hatchery, a boat ride on the Madu River, optional water sports and a tour of the town.', overnight: 'Bentota' },
      { title: 'Colombo city and shopping', text: 'Drive to Colombo for a city tour and some shopping, then check in and relax.', overnight: 'Colombo' },
      { title: 'Departure', text: 'Breakfast at the hotel, then a transfer to Colombo airport for your flight home.' },
    ],
    hotels: [
      { tier: 'As quoted', stays: 'Radisson Hotel Kandy, Araliya Red (Nuwara Eliya), Turyaa Kalutara (beach stay) and Radisson Hotel Colombo, or similar' },
    ],
    included: [
      '7 nights at the hotels listed, or similar, base room category',
      'Daily breakfast and dinner',
      'Private A/C van with an English-speaking chauffeur (groups of 2 to 8)',
      'Sightseeing as per the itinerary',
      'Complimentary Kandy cultural show with the Gem Gallery visit',
      'Two 500 ml bottles of water per person per day',
      'Meet and assist at the airport, and Sri Lankan VAT',
    ],
    excluded: [
      'International flights (we can add them to your quote)',
      'Entrance fees, boat and jeep rides',
      'Lunch',
      'Train tickets (book at least a month before arrival)',
      'Tips, porterage and personal expenses',
      'GST and TCS, as applicable',
    ],
    addons: ['First-class scenic train from Nanu Oya to Ella', 'Water sports at Bentota', 'Lotus Tower in Colombo', 'Sigiriya, Dambulla, a Yala or Minneriya safari, or whale watching'],
    tips: [
      'Cover shoulders and knees at temples; shorts and sleeveless tops are not allowed at the Temple of the Tooth.',
      'Remove hats and shoes before entering temples; most have a shoe counter.',
      'Carry a warm layer for Nuwara Eliya, which sits at about 1,868 m.',
      'Apply for your free tourist ETA at eta.gov.lk before you fly.',
    ],
    faqs: [
      { q: 'How many days are enough for Sri Lanka from India?', a: 'Seven or eight days covers the classic loop of Kandy, the tea hills and the south-west coast without rushing. Add two or three days for Sigiriya and Dambulla or a wildlife safari at Yala.' },
      { q: 'What is the best time to visit Sri Lanka from India?', a: 'December to April is the best time for Kandy, the hill country and the south-west beaches such as Bentota. May to September suits the east coast instead, when the south-west gets the monsoon.' },
      { q: 'Do Indians need a visa for Sri Lanka?', a: 'Indians need a Sri Lanka ETA, but the tourist ETA is free. Apply online at eta.gov.lk before you travel and carry the approval.' },
      { q: 'Are flights included in the Sri Lanka package?', a: 'No, the package covers hotels, meals, the private chauffeur and sightseeing. Travlys can add flights from Ahmedabad, Mumbai, Chennai or any Indian city to the same quote.' },
      { q: 'Is this Sri Lanka package suitable for families and couples?', a: 'Yes. It runs with a private chauffeur for groups of 2 to 8, mixes culture, hills and beach, and suits couples, families and small groups of friends. We adjust rooms and pace for children or older travellers.' },
      { q: 'Can I add the Ella train or Sigiriya?', a: 'Yes. The scenic first-class train to Ella, Sigiriya and Dambulla, a safari or whale watching can be added; tell us on WhatsApp and we requote with the extra nights or tickets.' },
    ],
  },
}
