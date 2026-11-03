// Holiday packages Travlys plans. The two featured itineraries come from
// real Travlys proposals (Bali TRV-BL-261023, Sri Lanka TRV-LK-261208); the
// other destinations are quoted to order. Prices are not published: every
// package is quoted for the traveller's dates and group, GST and TCS extra.

export const HOLIDAYS_UPDATED = '2026-11-03'

const PROPOSAL_PACKAGES = [
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
  { place: 'Singapore', idea: 'Sentosa, Gardens by the Bay, Universal', image: '/media/destinations/singapore-visa-sm.jpg', visa: { label: 'Visa in 3-5 working days', href: '/visa/singapore-visa/' } },
  { place: 'Malaysia', idea: 'Kuala Lumpur, Genting and Langkawi', image: '/media/destinations/malaysia-visa-sm.jpg', visa: { label: 'Visa-free to 31 Dec 2026', href: '/blog/malaysia-visa-free-for-indians-2026/' } },
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
const PROPOSAL_DETAILS = {
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

// Trending winter destinations for Indian travellers (Cox & Kings, Ixigo and
// Agoda 2025-26 reports): Dubai, Vietnam, Thailand, Almaty and Georgia.
// Sample itineraries, tailored and quoted per traveller.
const TRENDING_PACKAGES = [
  {
    slug: 'dubai-tour-package',
    place: 'Dubai',
    name: 'Dubai with Burj Khalifa, desert safari and Abu Dhabi',
    nights: 4,
    days: 5,
    sample: true,
    priceNote: 'Quoted for your dates, group size and hotel category',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&h=800&fit=crop',
    stays: ['Dubai, 4 nights (3-star to 5-star, your choice)'],
    highlights: [
      'Burj Khalifa At the Top and the Dubai Mall fountain show',
      'Desert safari with dune bashing, camel ride and BBQ dinner',
      'Dhow cruise dinner along Dubai Marina',
      'Abu Dhabi day trip: Sheikh Zayed Grand Mosque and the BAPS Hindu Mandir',
    ],
    includes: ['Daily breakfast', 'Return airport transfers', 'Tours and tickets as listed', 'Dubai visa filed by Travlys'],
    visa: { label: 'Dubai e-Visa, filed by Travlys', href: '/visa/uae-visa/' },
  },
  {
    slug: 'vietnam-tour-package',
    place: 'Vietnam',
    name: 'Vietnam: Hanoi, a Ha Long Bay cruise and Da Nang',
    nights: 6,
    days: 7,
    sample: true,
    priceNote: 'Quoted for your dates, group size and hotel category',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&h=800&fit=crop',
    stays: ['Hanoi, 2 nights', 'Ha Long Bay, 1 night on a cruise', 'Da Nang, 3 nights'],
    highlights: [
      'Overnight cruise among the limestone islands of Ha Long Bay',
      'Ba Na Hills and the Golden Bridge held up by giant stone hands',
      'Hoi An Ancient Town lit by lanterns in the evening',
      'Hanoi Old Quarter, Hoan Kiem Lake and the Temple of Literature',
    ],
    includes: ['Daily breakfast, plus meals on the cruise', 'Airport and intercity transfers', 'Sightseeing as listed', 'e-Visa guidance'],
    visa: { label: 'Vietnam e-visa, USD 25 single entry', href: '/blog/vietnam-e-visa-for-indians-2026/' },
  },
  {
    slug: 'thailand-tour-package',
    place: 'Thailand',
    name: 'Thailand: Bangkok and Pattaya',
    nights: 4,
    days: 5,
    sample: true,
    priceNote: 'Quoted for your dates, group size and hotel category',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=1200&h=800&fit=crop',
    stays: ['Pattaya, 2 nights', 'Bangkok, 2 nights'],
    highlights: [
      'Coral Island (Koh Larn) by speedboat, with lunch',
      'Bangkok temples: the Golden Buddha and the Reclining Buddha',
      'Safari World and Marine Park, with lunch',
      'The Alcazar cabaret show in Pattaya',
    ],
    includes: ['Daily breakfast, plus 2 lunches', 'Airport and Pattaya-Bangkok transfers', 'Tours and tickets as listed', 'TDAC arrival card help'],
    visa: { label: '30 days visa-free for Indians', href: '/blog/thailand-visa-free-for-indians-2026/' },
  },
  {
    slug: 'almaty-kazakhstan-tour-package',
    place: 'Almaty',
    name: 'Almaty, Kazakhstan: mountains, snow and the Charyn Canyon',
    nights: 4,
    days: 5,
    sample: true,
    priceNote: 'Quoted for your dates, group size and hotel category',
    image: 'https://images.unsplash.com/photo-1572940734104-684309ed7ac9?w=1200&h=800&fit=crop',
    stays: ['Almaty, 4 nights'],
    highlights: [
      'Kok Tobe hill by cable car, with views over the city',
      'Medeu ice rink and the Shymbulak mountain resort by gondola',
      'Day trip to the Charyn Canyon',
      'Big Almaty Lake in the mountains (May to October)',
    ],
    includes: ['Daily breakfast', 'Return airport transfers', 'Tours by private car with a driver', 'Sightseeing as listed'],
    visa: { label: '14 days visa-free for Indians', href: '/blog/kazakhstan-uzbekistan-kyrgyzstan-visa-for-indians/' },
  },
  {
    slug: 'georgia-tour-package',
    place: 'Georgia',
    name: 'Georgia: Tbilisi, Kazbegi and the Kakheti wine country',
    nights: 4,
    days: 5,
    sample: true,
    priceNote: 'Quoted for your dates, group size and hotel category',
    image: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1200&h=800&fit=crop',
    stays: ['Tbilisi, 4 nights'],
    highlights: [
      'Tbilisi Old Town, the Narikala fortress cable car and the Bridge of Peace',
      'Georgian Military Road to Kazbegi and the Gergeti Trinity Church',
      'Mtskheta, the old capital, and the Ananuri fortress',
      'Sighnaghi and the Kakheti wine region',
    ],
    includes: ['Daily breakfast', 'Return airport transfers', 'Tours by private car with a driver', 'e-Visa and insurance guidance'],
    visa: { label: 'e-Visa, or visa-free with a US, UK or Schengen visa', href: '/blog/georgia-visa-for-indians-2026/' },
  },
]

const SAMPLE_NOTE = 'This is a sample itinerary: we tailor the order, nights and hotels to your dates.'

const TRENDING_DETAILS = {
  'dubai-tour-package': {
    metaTitle: 'Dubai Tour Package from India: 4N/5D with Desert Safari | Travlys',
    metaDescription:
      'Dubai tour package from India by Travlys: 4 nights with Burj Khalifa, desert safari, dhow cruise and an Abu Dhabi day trip with the BAPS Mandir. Dubai visa filed by Travlys. Free quote.',
    keywords: 'dubai tour package from india, dubai package from ahmedabad, dubai 4 nights 5 days itinerary, dubai family package, dubai honeymoon package, abu dhabi day trip from dubai',
    intro:
      'The Travlys Dubai tour package is a 4-night, 5-day trip for Indian travellers with the Dubai visa filed by Travlys: a city tour with Burj Khalifa At the Top and the Dubai Mall fountain show, a desert safari with dune bashing and BBQ dinner, a dhow cruise dinner on Dubai Marina, and a day trip to Abu Dhabi for the Sheikh Zayed Grand Mosque and the BAPS Hindu Mandir. Hotels from 3-star to 5-star are quoted for your dates. ' + SAMPLE_NOTE,
    glance: [
      ['Duration', '4 nights, 5 days'],
      ['Stays', 'Dubai, 4 nights'],
      ['Meals', 'Daily breakfast, plus dinners on the safari and the dhow cruise'],
      ['Transport', 'Airport transfers and tours, shared or private'],
      ['Best time', 'November to March, the cooler months'],
      ['Visa', 'Dubai e-Visa (14 or 30 days), filed by Travlys'],
    ],
    itinerary: [
      { title: 'Arrival and a dhow cruise dinner', text: 'Arrive in Dubai and transfer to your hotel. In the evening, a dhow cruise along Dubai Marina with a buffet dinner.', overnight: 'Dubai' },
      { title: 'Dubai city tour and Burj Khalifa', text: 'A half-day city tour with photo stops at Jumeirah Mosque, the Burj Al Arab and Atlantis The Palm, then the old souks by abra. In the evening, Burj Khalifa At the Top and the Dubai Mall fountain show.', overnight: 'Dubai' },
      { title: 'Desert safari', text: 'A free morning, then an afternoon desert safari: dune bashing, a camel ride, sandboarding and a BBQ dinner with live shows at a desert camp.', overnight: 'Dubai' },
      { title: 'Abu Dhabi day trip', text: 'Drive to Abu Dhabi for the Sheikh Zayed Grand Mosque and the BAPS Hindu Mandir, with a photo stop at Ferrari World on Yas Island. Return to Dubai in the evening.', overnight: 'Dubai' },
      { title: 'Departure', text: 'Breakfast, then a transfer to Dubai airport for your flight home.' },
    ],
    hotels: [{ tier: 'Your choice', stays: '3-star, 4-star or 5-star hotels in Bur Dubai, Deira, Downtown or Dubai Marina, quoted for your dates' }],
    included: ['4 nights with daily breakfast', 'Return airport transfers', 'Dhow cruise with dinner and desert safari with BBQ dinner', 'Burj Khalifa At the Top tickets', 'Dubai city tour and Abu Dhabi day trip', 'Dubai visa filed by Travlys'],
    excluded: ['International flights (we can add them to your quote)', 'Tourism Dirham fee, paid at the hotel per room per night', 'Meals not listed, tips and personal expenses', 'Travel insurance', 'GST and TCS, as applicable'],
    addons: ['Global Village (October to May)', 'Museum of the Future or Dubai Frame', 'IMG Worlds, Ferrari World or Warner Bros. World', 'Dubai Shopping Festival dates (December to January)'],
    tips: [
      'Cover shoulders and knees at the Sheikh Zayed Grand Mosque; women need a headscarf.',
      'Book Burj Khalifa sunset slots early; they sell out first.',
      'Hotels charge the Tourism Dirham fee at check-out, per room per night.',
      'Carry your passport on the Abu Dhabi day trip for the mosque and mandir entry checks.',
    ],
    faqs: [
      { q: 'How many days are enough for Dubai?', a: 'Four nights is enough for the Dubai city tour, Burj Khalifa, a desert safari, a dhow cruise and an Abu Dhabi day trip. Add a night for theme parks or a slower shopping trip during the Dubai Shopping Festival.' },
      { q: 'What is the best time to visit Dubai from India?', a: 'November to March is the best time, when days are warm rather than hot and outdoor attractions such as Global Village are open. Summer (June to September) is very hot but hotel rates are lower.' },
      { q: 'Does the Dubai package include the visa?', a: 'Yes. Travlys files your Dubai e-Visa as part of the package. Indians with a valid US visa or green card, or a UK or EU visa or residence permit, may get a visa on arrival instead.' },
      { q: 'Are flights included in the Dubai package?', a: 'No, the package covers hotels, transfers, tours and the visa. Travlys can add flights from Ahmedabad, Mumbai, Delhi or any Indian city to the same quote.' },
      { q: 'Is this Dubai package good for families?', a: 'Yes. The desert safari, Burj Khalifa, the dhow cruise and the Abu Dhabi day are all family-friendly, and we can add theme parks and connecting rooms for children.' },
      { q: 'Can I visit the BAPS Hindu Mandir in Abu Dhabi on this trip?', a: 'Yes, the Abu Dhabi day trip includes the BAPS Hindu Mandir along with the Sheikh Zayed Grand Mosque. Modest clothing is required at both.' },
    ],
  },
  'vietnam-tour-package': {
    metaTitle: 'Vietnam Tour Package from India: 6N/7D Hanoi, Ha Long, Da Nang | Travlys',
    metaDescription:
      'Vietnam tour package from India by Travlys: 6 nights in Hanoi, an overnight Ha Long Bay cruise and Da Nang with Ba Na Hills, the Golden Bridge and Hoi An. Day-by-day plan, free quote.',
    keywords: 'vietnam tour package from india, vietnam package from ahmedabad, vietnam 6 nights 7 days itinerary, ha long bay cruise package, da nang hoi an package, vietnam honeymoon package',
    intro:
      'The Travlys Vietnam tour package is a 6-night, 7-day trip for Indian travellers: 2 nights in Hanoi, an overnight cruise on Ha Long Bay and 3 nights in Da Nang, with Ba Na Hills and the Golden Bridge, lantern-lit Hoi An Ancient Town and the Marble Mountains. Indians need a Vietnam e-visa (USD 25 single entry), applied online on the official portal. ' + SAMPLE_NOTE,
    glance: [
      ['Duration', '6 nights, 7 days'],
      ['Stays', 'Hanoi 2 nights, Ha Long Bay cruise 1 night, Da Nang 3 nights'],
      ['Meals', 'Daily breakfast, plus meals on the cruise'],
      ['Transport', 'Transfers and tours; Hanoi to Da Nang by domestic flight'],
      ['Best time', 'February to April across the country'],
      ['Visa', 'e-Visa, USD 25 single entry, on evisa.gov.vn'],
    ],
    itinerary: [
      { title: 'Arrival in Hanoi', text: 'Arrive in Hanoi and transfer to your hotel. In the evening, walk the Old Quarter and Hoan Kiem Lake.', overnight: 'Hanoi' },
      { title: 'Hanoi city tour', text: 'The Temple of Literature, the One Pillar Pagoda, the Ho Chi Minh Mausoleum complex (outside) and a water puppet show.', overnight: 'Hanoi' },
      { title: 'Ha Long Bay cruise', text: 'Drive to Ha Long Bay and board an overnight cruise among the limestone islands, with kayaking or a cave visit and meals on board.', overnight: 'Ha Long Bay cruise' },
      { title: 'Back to Hanoi, fly to Da Nang', text: 'Breakfast on deck, cruise back to the harbour, then return to Hanoi airport for the flight to Da Nang.', overnight: 'Da Nang' },
      { title: 'Ba Na Hills and the Golden Bridge', text: 'A cable car up to Ba Na Hills for the Golden Bridge, held up by two giant stone hands, and the French Village.', overnight: 'Da Nang' },
      { title: 'Marble Mountains and Hoi An', text: 'The Marble Mountains in the afternoon, then Hoi An Ancient Town as the lanterns light up in the evening.', overnight: 'Da Nang' },
      { title: 'Departure', text: 'Breakfast, then a transfer to Da Nang airport for your flight home.' },
    ],
    hotels: [{ tier: 'Your choice', stays: '3-star, 4-star or 5-star hotels in Hanoi and Da Nang, and a cruise cabin category of your choice' }],
    included: ['6 nights with daily breakfast, including 1 night on a Ha Long Bay cruise', 'Meals on the cruise as per the cruise plan', 'Airport and intercity transfers', 'Sightseeing and entrance tickets as listed', 'Ba Na Hills cable car ticket'],
    excluded: ['International flights and the Hanoi to Da Nang domestic flight (we can add them)', 'Vietnam e-visa fee', 'Meals not listed, tips and personal expenses', 'Travel insurance', 'GST and TCS, as applicable'],
    addons: ['Phu Quoc island, visa-free for 30 days for Indians', 'Ho Chi Minh City and the Mekong Delta', 'Ninh Binh and Trang An boat ride'],
    tips: [
      'Apply for the e-visa only on the official portal, evisa.gov.vn; look-alike sites charge extra.',
      'Hanoi is cool from December to February, so carry a light jacket.',
      'Central Vietnam (Da Nang, Hoi An) gets heavy rain from September to December.',
      'Carry some US dollars or Vietnamese dong in cash for markets and street food.',
    ],
    faqs: [
      { q: 'How many days are enough for Vietnam?', a: 'Six or seven nights covers Hanoi, Ha Long Bay and Da Nang with Hoi An. Add three nights for Ho Chi Minh City and the Mekong Delta, or Phu Quoc for a beach finish.' },
      { q: 'What is the best time to visit Vietnam from India?', a: 'February to April is the best time to cover the north and centre on one trip. The north is cool from December to February, and central Vietnam gets heavy rain from September to December.' },
      { q: 'Do Indians need a visa for Vietnam?', a: 'Yes. Indians apply for Vietnam’s e-visa online at evisa.gov.vn: USD 25 for single entry or USD 50 for multiple entry, valid for up to 90 days. Phu Quoc island alone is visa-free for 30 days.' },
      { q: 'Are flights included in the Vietnam package?', a: 'No. The package covers hotels, the cruise, transfers and sightseeing. Travlys can add international flights from India and the Hanoi to Da Nang domestic flight to the same quote.' },
      { q: 'Is Vietnam good for a honeymoon?', a: 'Yes. The Ha Long Bay cruise, Hoi An by lantern light and Da Nang’s beaches make Vietnam a popular honeymoon choice, and we can upgrade the cruise cabin and hotels.' },
      { q: 'Is vegetarian food easy to find in Vietnam?', a: 'Yes, in Hanoi, Da Nang and Hoi An there are Indian and vegetarian restaurants, and we tell the cruise and hotels about your food preference in advance.' },
    ],
  },
  'thailand-tour-package': {
    metaTitle: 'Thailand Tour Package from India: 4N/5D Bangkok & Pattaya | Travlys',
    metaDescription:
      'Thailand tour package from India by Travlys: 2 nights in Pattaya and 2 in Bangkok with Coral Island, the Alcazar show, temples and Safari World. 30 days visa-free for Indians. Free quote.',
    keywords: 'thailand tour package from india, thailand package from ahmedabad, bangkok pattaya package, thailand 4 nights 5 days itinerary, coral island tour, thailand family package',
    intro:
      'The Travlys Thailand tour package is a 4-night, 5-day trip for Indian travellers: 2 nights in Pattaya with a speedboat trip to Coral Island and the Alcazar show, then 2 nights in Bangkok with the Golden Buddha and Reclining Buddha temples and Safari World and Marine Park. Indians can visit Thailand visa-free for up to 30 days and only need the free TDAC arrival card. ' + SAMPLE_NOTE,
    glance: [
      ['Duration', '4 nights, 5 days'],
      ['Stays', 'Pattaya 2 nights, Bangkok 2 nights'],
      ['Meals', 'Daily breakfast, plus lunch on Coral Island and at Safari World'],
      ['Transport', 'Airport and Pattaya-Bangkok transfers, tours as listed'],
      ['Best time', 'November to February, the cool and dry season'],
      ['Visa', '30 days visa-free, plus the free TDAC'],
    ],
    itinerary: [
      { title: 'Arrive in Bangkok, drive to Pattaya', text: 'Arrive at Bangkok airport and transfer to Pattaya, about two hours away. In the evening, the Alcazar cabaret show.', overnight: 'Pattaya' },
      { title: 'Coral Island by speedboat', text: 'A speedboat to Coral Island (Koh Larn) for beaches and optional water sports, with lunch.', overnight: 'Pattaya' },
      { title: 'Pattaya to Bangkok, temple tour', text: 'Drive to Bangkok. In the afternoon, the Golden Buddha at Wat Traimit and the Reclining Buddha at Wat Pho.', overnight: 'Bangkok' },
      { title: 'Safari World and Marine Park', text: 'A full day at Safari World and Marine Park, with lunch. Evening free for shopping.', overnight: 'Bangkok' },
      { title: 'Departure', text: 'Breakfast, then a transfer to Bangkok airport for your flight home.' },
    ],
    hotels: [{ tier: 'Your choice', stays: '3-star, 4-star or 5-star hotels in Pattaya and Bangkok, quoted for your dates' }],
    included: ['4 nights with daily breakfast', 'Lunch on Coral Island and at Safari World', 'Airport and Pattaya-Bangkok transfers', 'Coral Island speedboat tour, Alcazar show, temple tour and Safari World tickets', 'Help with the TDAC arrival card'],
    excluded: ['International flights (we can add them to your quote)', 'Water sports on Coral Island', 'Meals not listed, tips and personal expenses', 'Travel insurance', 'GST and TCS, as applicable'],
    addons: ['Phuket and Krabi beach extension', 'Floating market tour', 'Chao Phraya dinner cruise in Bangkok', 'Nong Nooch Garden near Pattaya'],
    tips: [
      'Submit the free TDAC within 3 days before arrival; never pay a website for it.',
      'Carry proof of funds (about 20,000 baht per person) and your return ticket, which immigration may ask to see.',
      'Cover shoulders and knees at temples.',
      'Use only licensed taxis or the transfers in your package.',
    ],
    faqs: [
      { q: 'How many days are enough for Thailand?', a: 'Four nights covers Bangkok and Pattaya comfortably. For beaches such as Phuket and Krabi, plan seven to eight nights in total.' },
      { q: 'What is the best time to visit Thailand from India?', a: 'November to February is the best time: cooler, dry and good for the beaches. March to May is hot, and June to October brings monsoon rain, with lower hotel rates.' },
      { q: 'Do Indians need a visa for Thailand?', a: 'No, not for a tourist trip of up to 30 days. Since 15 September 2026 Indians get 30 days visa-free, and must submit the free Thailand Digital Arrival Card (TDAC) before arrival.' },
      { q: 'Are flights included in the Thailand package?', a: 'No, the package covers hotels, transfers and tours. Travlys can add flights from Ahmedabad, Mumbai, Delhi or any Indian city to the same quote.' },
      { q: 'Is this Thailand package good for families?', a: 'Yes. Coral Island, Safari World and Marine Park are favourites with children, and we can arrange family rooms and private transfers.' },
      { q: 'Can I add Phuket or Krabi?', a: 'Yes. A three or four night Phuket and Krabi extension with the Phi Phi island tour is the most popular add-on; we requote with the domestic flight included.' },
    ],
  },
  'almaty-kazakhstan-tour-package': {
    metaTitle: 'Almaty Tour Package from India: 4N/5D Kazakhstan, Visa-Free | Travlys',
    metaDescription:
      'Almaty, Kazakhstan tour package from India by Travlys: 4 nights with Kok Tobe, Medeu, Shymbulak by gondola and the Charyn Canyon. Indians get 14 days visa-free. Day-by-day plan, free quote.',
    keywords: 'almaty tour package from india, kazakhstan tour package from india, almaty package from ahmedabad, almaty 4 nights 5 days itinerary, shymbulak snow trip, almaty honeymoon package',
    intro:
      'The Travlys Almaty tour package is a 4-night, 5-day trip to Kazakhstan for Indian travellers: Kok Tobe hill by cable car, Medeu and the Shymbulak mountain resort by gondola, a day trip to the Charyn Canyon and, from May to October, Big Almaty Lake. Indians can visit Kazakhstan visa-free for up to 14 days, which makes Almaty one of the easiest snow trips from India. ' + SAMPLE_NOTE,
    glance: [
      ['Duration', '4 nights, 5 days'],
      ['Stays', 'Almaty, 4 nights'],
      ['Meals', 'Daily breakfast'],
      ['Transport', 'Airport transfers and tours by private car with a driver'],
      ['Best time', 'December to February for snow; May to September for lakes and hikes'],
      ['Visa', '14 days visa-free for Indians'],
    ],
    itinerary: [
      { title: 'Arrival in Almaty', text: 'Arrive in Almaty and transfer to your hotel. The evening is free to walk the city centre.', overnight: 'Almaty' },
      { title: 'Almaty city and Kok Tobe', text: 'Panfilov Park and the wooden Zenkov Cathedral, the Green Bazaar, then the cable car up Kok Tobe hill for views over the city and the mountains.', overnight: 'Almaty' },
      { title: 'Medeu and Shymbulak', text: 'Drive up to the Medeu high-altitude ice rink, then the gondola to the Shymbulak mountain resort for snow, skiing lessons or the views from the top.', overnight: 'Almaty' },
      { title: 'Charyn Canyon day trip', text: 'A full-day drive east to the Charyn Canyon and the Valley of Castles. From May to October this day can be swapped for Big Almaty Lake.', overnight: 'Almaty' },
      { title: 'Departure', text: 'Breakfast, then a transfer to Almaty airport for your flight home.' },
    ],
    hotels: [{ tier: 'Your choice', stays: '3-star, 4-star or 5-star hotels in central Almaty, quoted for your dates' }],
    included: ['4 nights with daily breakfast', 'Return airport transfers', 'Tours by private car with a driver', 'City tour, Medeu and Shymbulak, and the Charyn Canyon day trip'],
    excluded: ['International flights (we can add them to your quote)', 'Cable car, gondola and ski equipment tickets', 'Meals not listed, tips and personal expenses', 'Travel insurance', 'GST and TCS, as applicable'],
    addons: ['Kolsai and Kaindy lakes (summer)', 'Ski lessons at Shymbulak (winter)', 'An extra night or a combined trip with Uzbekistan'],
    tips: [
      'Winter temperatures in Almaty often fall below zero; pack thermals, gloves and waterproof boots.',
      'Kazakhstan is phasing in the free QazETA from 1 November 2026; it becomes mandatory for Indians from 1 July 2027.',
      'Big Almaty Lake and Kolsai are reachable only from roughly May to October.',
      'Carry some Kazakh tenge in cash for markets and small cafes.',
    ],
    faqs: [
      { q: 'Do Indians need a visa for Kazakhstan?', a: 'No. Indians can stay in Kazakhstan visa-free for up to 14 days per visit, up to 42 days in any 180. From 1 July 2027 the free QazETA authorisation becomes mandatory before travel.' },
      { q: 'How many days are enough for Almaty?', a: 'Four nights covers the city, Kok Tobe, Medeu and Shymbulak, and the Charyn Canyon. Add a night or two for the Kolsai and Kaindy lakes in summer.' },
      { q: 'When can I see snow in Almaty?', a: 'December to February is the snow season, when Shymbulak runs as a ski resort and the mountains above the city are white. Snow can linger at Shymbulak into March.' },
      { q: 'Are flights included in the Almaty package?', a: 'No. The package covers hotels, transfers and tours. Travlys can add flights from India to the same quote.' },
      { q: 'Is Almaty good for a honeymoon or a family trip?', a: 'Yes. It suits couples looking for snow and mountains on a short trip and families who want an easy visa-free winter holiday. We adjust the pace and rooms to your group.' },
      { q: 'Is vegetarian food available in Almaty?', a: 'Yes. Almaty has Indian restaurants and vegetarian options, and we pass your food preference to the hotel in advance.' },
    ],
  },
  'georgia-tour-package': {
    metaTitle: 'Georgia Tour Package from India: 4N/5D Tbilisi, Kazbegi, Kakheti | Travlys',
    metaDescription:
      'Georgia tour package from India by Travlys: 4 nights in Tbilisi with Kazbegi and the Gergeti church, Mtskheta, Ananuri and the Kakheti wine country. e-Visa and insurance help. Free quote.',
    keywords: 'georgia tour package from india, georgia package from ahmedabad, tbilisi tour package, georgia 4 nights 5 days itinerary, kazbegi gudauri tour, georgia honeymoon package',
    intro:
      'The Travlys Georgia tour package is a 4-night, 5-day trip for Indian travellers based in Tbilisi: the Old Town and the Narikala fortress cable car, the Georgian Military Road to Kazbegi and the Gergeti Trinity Church, Mtskheta and the Ananuri fortress, and Sighnaghi in the Kakheti wine country. Indians need a Georgia e-visa unless they hold a valid US, UK or Schengen visa, plus mandatory travel insurance. ' + SAMPLE_NOTE,
    glance: [
      ['Duration', '4 nights, 5 days'],
      ['Stays', 'Tbilisi, 4 nights'],
      ['Meals', 'Daily breakfast'],
      ['Transport', 'Airport transfers and tours by private car with a driver'],
      ['Best time', 'May to October; December to March for snow at Gudauri'],
      ['Visa', 'e-Visa (USD 20 + 2%), or visa-free with a US, UK or Schengen visa'],
    ],
    itinerary: [
      { title: 'Arrival in Tbilisi', text: 'Arrive in Tbilisi and transfer to your hotel. Evening free in the Old Town.', overnight: 'Tbilisi' },
      { title: 'Tbilisi city tour', text: 'The Old Town and the sulphur bath district, the cable car up to Narikala fortress, the Bridge of Peace and Rustaveli Avenue.', overnight: 'Tbilisi' },
      { title: 'Mtskheta, Ananuri and Kazbegi', text: 'Mtskheta, the old capital, then the Georgian Military Road past the Ananuri fortress and Gudauri to Kazbegi and the Gergeti Trinity Church below Mount Kazbek.', overnight: 'Tbilisi' },
      { title: 'Sighnaghi and Kakheti', text: 'A day in the Kakheti wine region: the hilltop town of Sighnaghi, the Bodbe Monastery and a winery visit.', overnight: 'Tbilisi' },
      { title: 'Departure', text: 'Breakfast, then a transfer to Tbilisi airport for your flight home.' },
    ],
    hotels: [{ tier: 'Your choice', stays: '3-star, 4-star or 5-star hotels in central Tbilisi, quoted for your dates' }],
    included: ['4 nights with daily breakfast', 'Return airport transfers', 'Tours by private car with a driver', 'Tbilisi city tour, Kazbegi, Mtskheta and Kakheti day trips', 'e-Visa and insurance guidance'],
    excluded: ['International flights (we can add them to your quote)', 'Georgia e-visa fee and travel insurance', 'Entrance fees, cable car and 4x4 to the Gergeti church', 'Meals not listed, tips and personal expenses', 'GST and TCS, as applicable'],
    addons: ['A night at Gudauri for snow and skiing (winter)', 'Batumi on the Black Sea coast', 'Paragliding at Gudauri'],
    tips: [
      'Health insurance of at least 30,000 GEL for the whole stay is mandatory for visitors from 1 January 2026.',
      'If you hold a valid US, UK or Schengen visa, you may be able to enter visa-free; check the official list first.',
      'The road to Kazbegi can close in heavy snow; we keep a flexible day in winter.',
      'Carry Georgian lari in cash for markets and small cafes.',
    ],
    faqs: [
      { q: 'Do Indians need a visa for Georgia?', a: 'Yes, unless you hold a valid visa or residence permit from a listed country such as the US, UK, Canada or a Schengen state. Otherwise apply for the e-visa online (USD 20 plus 2%). Travel insurance of at least 30,000 GEL is mandatory.' },
      { q: 'How many days are enough for Georgia?', a: 'Four nights based in Tbilisi covers the city, Kazbegi, Mtskheta and Kakheti. Add two nights for Batumi on the Black Sea or a snow stay at Gudauri.' },
      { q: 'What is the best time to visit Georgia from India?', a: 'May to October for green mountains and wine country; December to March for snow at Gudauri. Spring (April to May) is mild and less crowded.' },
      { q: 'Are flights included in the Georgia package?', a: 'No. The package covers hotels, transfers and tours. Travlys can add flights from India to the same quote.' },
      { q: 'Is Georgia good for a honeymoon?', a: 'Yes. The mountains at Kazbegi, the wine country and Tbilisi’s Old Town make Georgia a popular honeymoon choice, and we can add a night in the mountains.' },
      { q: 'Is vegetarian food available in Georgia?', a: 'Yes. Georgian cuisine has many vegetarian dishes such as khachapuri and lobio, and Tbilisi has Indian restaurants.' },
    ],
  },
}

// Every package with its own page: the two from real proposals first, then
// the trending sample itineraries.
export const FEATURED_PACKAGES = [...PROPOSAL_PACKAGES, ...TRENDING_PACKAGES]
export const PACKAGE_DETAILS = { ...PROPOSAL_DETAILS, ...TRENDING_DETAILS }
