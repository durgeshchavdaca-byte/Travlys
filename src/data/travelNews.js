// Dated visa and travel news for Indian passport holders, newest first.
// Each item is a short, sourced summary that links to the guide covering it.
// Rendered at /travel-news, and fed into the homepage, llms.txt and the
// prerendered HTML so search engines and AI assistants see the latest dates.

export const NEWS_UPDATED = '2026-10-28'

export const TRAVEL_NEWS = [
  // --- Announced, not yet in force (shown under "Coming up") ---
  {
    date: '2026-11-30',
    headline: 'UK student visa funds rise to £1,570 a month in London',
    summary:
      'The UK Student visa maintenance requirement goes up from £1,529 to £1,570 a month in London and from £1,171 to £1,203 a month elsewhere, for up to nine months. Applications made before 30 November 2026 are decided under the old amounts.',
    href: '/blog/uk-student-visa-changes-2026-27-indian-students/',
    source: {
      label: 'GOV.UK: Statement of changes HC 584',
      url: 'https://www.gov.uk/government/publications/statement-of-changes-to-the-immigration-rules-hc-584-3-september-2026/statement-of-changes-to-the-immigration-rules-hc-584-3-september-2026-accessible',
    },
  },
  {
    date: '2026-12-31',
    headline: 'Malaysia visa-free entry for Indians is due to end',
    summary:
      'Malaysia’s 30-day visa waiver for Indians runs until 31 December 2026, and no extension had been announced when we checked on 28 October 2026. If you are travelling in 2027, avoid non-refundable bookings until Malaysia confirms the rule.',
    href: '/blog/malaysia-visa-free-for-indians-2026/',
    source: {
      label: 'Malay Mail: Home Ministry extends visa exemption for Indians until end of 2026',
      url: 'https://www.malaymail.com/news/malaysia/2024/12/21/home-ministry-extends-visa-exemption-for-indian-nationals-until-end-of-2026/160597',
    },
  },
  {
    date: '2027-01-01',
    headline: 'UK Graduate Route cut to 18 months',
    summary:
      'Bachelor’s and master’s graduates who apply for the Graduate Route on or after 1 January 2027 get 18 months instead of two years. PhD graduates keep three years.',
    href: '/blog/uk-student-visa-changes-2026-27-indian-students/',
    source: {
      label: 'GOV.UK: Immigration Rules Appendix Graduate',
      url: 'https://www.gov.uk/guidance/immigration-rules/immigration-rules-appendix-graduate',
    },
  },
  {
    date: '2027-02-02',
    headline: 'Air India starts non-stop Delhi–Osaka flights',
    summary:
      'Air India plans four weekly non-stop flights between Delhi and Osaka (Kansai) on Boeing 787-8 aircraft from 2 February 2027. Indians need a Japan visa, which still costs ₹500.',
    href: '/blog/new-international-flights-from-india-winter-2026/',
    source: {
      label: 'Air India newsroom',
      url: 'https://www.airindia.com/in/en/newsroom/press-release/air-india-opens-a-new-gateway-to-japan-with-non-stop-delhi-osaka-flights-starting-february-2027.html',
    },
  },
  // --- Dated news, newest first ---
  {
    date: '2026-07-20',
    headline: 'Saudi Arabia launches one-year multiple-entry Umrah visa',
    summary:
      'The new Umrah visa is valid for 365 days and allows multiple entries with a total stay of up to 90 days. Each visit needs its own Nusuk package and Umrah permit, and the visa is not valid during the Hajj season.',
    href: '/blog/saudi-arabia-visa-for-indians-2026/',
    source: { label: 'Saudi Press Agency', url: 'https://www.spa.gov.sa/en/N2637600' },
  },
  {
    date: '2026-07-18',
    headline: 'Saudi Package Visa opens for Indians without a US, UK or Schengen visa',
    summary:
      'Indians can now get a Saudi tourist eVisa by buying a flight and 4-star-plus hotel package from a Ministry of Tourism-approved provider. The visa costs SAR 402.21 including insurance and is single entry.',
    href: '/blog/saudi-arabia-visa-for-indians-2026/',
    source: { label: 'Visit Saudi', url: 'https://www.visitsaudi.com/en/campaigns/package-visa' },
  },
  {
    date: '2026-06-02',
    headline: 'Bhutan waives SDF for 24-hour visits to four border towns',
    summary:
      'Day visits of up to 24 hours to Phuentsholing, Samtse, Gelephu or Samdrup Jongkhar carry no Sustainable Development Fee until August 2027. Indians pay ₹1,200 a night once they go beyond these zones.',
    href: '/blog/bhutan-permit-for-indians-2026/',
    source: { label: 'Department of Tourism Bhutan', url: 'https://bhutan.travel/faqs' },
  },
  {
    date: '2026-04-08',
    headline: 'Bhutan requires a licensed guide for all tourists',
    summary:
      'All tourists, including on the drive from Paro airport to other districts, must be accompanied by a licensed guide. Travel up to the first designated checkpoint is the only exception.',
    href: '/blog/bhutan-permit-for-indians-2026/',
    source: {
      label: 'Department of Tourism Bhutan',
      url: 'https://a.storyblok.com/f/171618/x/d7788a48d0/notification-on-mandatory-tour-guide-requiremement.pdf',
    },
  },
  {
    date: '2026-10-25',
    headline: 'Winter flight schedule starts: Air India Express adds 40+ routes',
    summary:
      'Air India Express’s winter schedule began on 25 October 2026 and grows its international network from 83 to over 100 routes. New links include Kochi–Bangkok, Indore–Bangkok, Goa (Mopa)–Abu Dhabi, Amritsar–Abu Dhabi, Mumbai–Kuwait and Bengaluru–Kathmandu.',
    href: '/blog/new-international-flights-from-india-winter-2026/',
    source: {
      label: 'BW Travel',
      url: 'https://www.bwtravel.com/industry-insights/air-india-express-to-add-40-new-domestic-and-international-routes-in-winter-2026-12628010',
    },
  },
  {
    date: '2026-06-03',
    headline: 'Germany drops airport transit visa for Indians',
    summary:
      'Indian citizens can change planes in the international transit area of German airports without an airport transit visa. You still need a Schengen visa if your connection takes you through passport control.',
    href: '/blog/airport-transit-visa-for-indians-europe-2026/',
    source: {
      label: 'German Missions in India',
      url: 'https://india.diplo.de/in-en/2773896-2773896',
    },
  },
  {
    date: '2026-04-10',
    headline: 'France removes airport transit visa for Indian passport holders',
    summary:
      'Indians transiting by air through the international zones of French airports no longer need an airport transit visa. It covers air transit only, not entry into France.',
    href: '/blog/airport-transit-visa-for-indians-europe-2026/',
    source: {
      label: 'News On AIR (MEA briefing)',
      url: 'https://newsonair.gov.in/indian-nationals-transiting-through-mainland-france-exclusively-by-air-will-no-longer-need-transit-visa-mea-spokesperson/',
    },
  },
  {
    date: '2026-10-14',
    headline: 'Dubai Shopping Festival 2026-27 set for 4 December to 17 January',
    summary:
      'The 32nd Dubai Shopping Festival runs for 45 days, from 4 December 2026 to 17 January 2027. Indians can visit on a 30 or 60-day tourist visa, or a 14-day visa on arrival with a valid US visa or green card, or a UK or EU visa or residence permit.',
    href: '/blog/dubai-shopping-festival-2026-27-visa-from-india/',
    source: {
      label: 'Visit Dubai: Dubai Shopping Festival',
      url: 'https://www.visitdubai.com/en/festivals-and-events/dsf',
    },
  },
  {
    date: '2026-10-01',
    headline: 'New Zealand stops paper forms for visitor and transit visas',
    summary:
      'Immigration New Zealand now accepts visitor and transit visa applications only online, except in exceptional circumstances. Paper applications sent before 1 October 2026 are still processed.',
    href: '/blog/new-zealand-visa-for-indians-2026/',
    source: {
      label: 'Immigration New Zealand',
      url: 'https://www.immigration.govt.nz/about-us/news-centre/changes-to-use-of-paper-applications-for-some-visitor-and-transit-visas/',
    },
  },
  {
    date: '2026-03-04',
    headline: 'Spain drops airport transit visa for Indians',
    summary:
      'Indians changing planes in the international transit area of Spanish airports no longer need an airport transit visa. Leaving the transit area still needs a Schengen visa.',
    href: '/blog/airport-transit-visa-for-indians-europe-2026/',
    source: {
      label: 'Embassy of Spain in New Delhi',
      url: 'https://www.exteriores.gob.es/Embajadas/nuevadelhi/es/Comunicacion/Noticias/Paginas/Articulos/19022026_NOT.aspx',
    },
  },
  {
    date: '2026-01-30',
    headline: 'Singapore starts No-Boarding Directives for flagged travellers',
    summary:
      'Singapore’s ICA can now tell airlines to deny boarding to travellers who fail entry rules, such as having no valid visa or a passport with under six months’ validity. Check your visa and passport before you leave for the airport.',
    href: '/blog/singapore-visa-for-indians-2026/',
    source: {
      label: 'ICA Singapore',
      url: 'https://www.ica.gov.sg/news-and-publications/newsroom/media-release/ica-to-issue-no-boarding-directives-from-30-january-2026',
    },
  },
  {
    date: '2026-01-01',
    headline: 'Singapore visa fee for Indians set at ₹2,100',
    summary:
      'The Singapore missions in New Delhi and Mumbai list a visa fee of ₹2,100 per application from 1 January 2026, plus an agent service charge of up to ₹1,300. Indians apply through Authorised Visa Agents only.',
    href: '/blog/singapore-visa-for-indians-2026/',
    source: {
      label: 'Consulate-General of Singapore, Mumbai',
      url: 'https://mumbai.mfa.gov.sg/consular-services/visa-information/',
    },
  },
  {
    date: '2026-10-26',
    headline: 'Australia starts collecting biometrics from visa applicants in India',
    summary:
      'Applications lodged from 26 October 2026 may need fingerprints and a facial image, but only if Home Affairs sends you a request letter. VFS charges ₹1,425 per person at 16 centres, or you can use the free Australian Immi App if your letter allows it.',
    href: '/blog/australia-visa-biometrics-india-2026/',
    source: {
      label: 'Australian High Commission, India',
      url: 'https://india.highcommission.gov.au/ndli/vm_Biometric_collection_requirements_for_Australia_visa_applicants_in_India.html',
    },
  },
  {
    date: '2026-10-26',
    headline: 'China visas now filed directly with the Embassy and Mumbai Consulate',
    summary:
      'The Chinese Embassy in New Delhi and Consulate General in Mumbai now take applications themselves: fill the online form first, then submit your passport after an approval email. A single-entry visa costs ₹2,900, paid by demand draft.',
    href: '/blog/china-visa-for-indians-2026-new-process/',
    source: {
      label: 'Embassy of China in India',
      url: 'https://in.china-embassy.gov.cn/eng/gdxw/202610/t20261022_12044936.htm',
    },
  },
  {
    date: '2026-10-09',
    headline: 'Indian passport ranks 84th in the October 2026 Henley Passport Index',
    summary:
      'The October edition puts India 84th with 55 destinations open without a visa arranged in advance, as reported by Business Today. The index leaves out e-visas, so it understates how easily Indians can travel.',
    href: '/blog/visa-free-countries-for-indians-2026/',
    source: {
      label: 'Business Today',
      url: 'https://www.businesstoday.in/nri/story/henley-passport-index-2026-indian-passport-climbs-to-84th-rank-visa-free-countries-falls-to-55-561651-2026-10-14',
    },
  },
  {
    date: '2026-10-02',
    headline: 'Australia tightens student visa rules',
    summary:
      'Most temporary visa holders in Australia can no longer switch to a Student visa onshore, and most new students cannot bring a partner or children. Students must stay 12 months with their first provider before transferring.',
    href: '/blog/australia-student-visa-new-rules-2026-indian-students/',
    source: {
      label: 'Department of Home Affairs (Australia)',
      url: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/changes-to-student-visa-application-rules-500-590',
    },
  },
  {
    date: '2026-09-30',
    headline: 'US court blocks the $100,000 H-1B fee again',
    summary:
      'A California court stopped agencies from enforcing the $100,000 H-1B payment. The B1/B2 visa fee stays at $185, and almost every applicant still needs an in-person interview.',
    href: '/blog/us-visa-changes-2026-indian-applicants/',
    source: {
      label: 'USCIS: H-1B FAQ',
      url: 'https://www.uscis.gov/newsroom/alerts/h-1b-faq',
    },
  },
  {
    date: '2026-09-28',
    headline: 'US audit finds a 346-day average wait for visa interviews in India',
    summary:
      'A GAO report found India had the longest weighted average interview wait of the four countries it studied in fiscal year 2025. It is last year’s average, so check the current wait for your city before you plan.',
    href: '/blog/us-visa-appointment-wait-time-india-2026/',
    source: {
      label: 'US Government Accountability Office',
      url: 'https://www.gao.gov/products/gao-26-107902',
    },
  },
  {
    date: '2026-09-15',
    headline: 'Thailand cuts visa-free stays for Indians to 30 days',
    summary:
      'Thailand ended its 60-day visa exemption and gave Indian tourists a 30-day visa-free stay. Fill the free Thailand Digital Arrival Card within three days before you land.',
    href: '/blog/thailand-visa-free-for-indians-2026/',
    source: {
      label: 'Royal Thai Embassy, New Delhi',
      url: 'https://newdelhi.thaiembassy.org/en/content/the-revision-of-thailand-s-visa-exemption-and-voa',
    },
  },
  {
    date: '2026-09-01',
    headline: 'Uzbekistan visa-free for Indians who hold certain foreign visas',
    summary:
      'Indians with a valid multiple-entry US, UK, Schengen, Canada, Australia, New Zealand, Japan or South Korea visa can stay up to 30 days without a visa. Everyone else should use the e-visa.',
    href: '/blog/kazakhstan-uzbekistan-kyrgyzstan-visa-for-indians/',
    source: {
      label: 'Uzbekistan Tourism Committee',
      url: 'https://gov.uz/en/uzbektourism/news/view/228993',
    },
  },
  {
    date: '2026-07-01',
    headline: 'Australia raises visa charges by about 25%',
    summary:
      'A Visitor visa (subclass 600) applied for outside Australia now costs AUD 250 and a Student visa AUD 2,500. The charge depends on the date Home Affairs receives your application.',
    href: '/visa/australia-visa/',
    source: {
      label: 'Federal Register of Legislation (Australia)',
      url: 'https://www.legislation.gov.au/F2026L00874/asmade',
    },
  },
  {
    date: '2026-07-01',
    headline: 'Japan raises visa fees worldwide, but Indians still pay ₹500',
    summary:
      'Japan’s first fee revision since 1978 raised most single-entry visas to about ¥15,000. Japanese missions in India say Indian nationals still pay ₹500 plus the VFS service fee.',
    href: '/blog/japan-visa-for-indians-2026/',
    source: {
      label: 'Embassy of Japan in India',
      url: 'https://www.in.emb-japan.go.jp/itpr_en/Visa.html',
    },
  },
  {
    date: '2026-06-25',
    headline: 'UAE widens visa on arrival and keeps India on the list',
    summary:
      'Indians with a valid US visa or green card, or a UK or EU visa or residence permit, can get a 14-day UAE visa on arrival for AED 100. Residence permits from several other countries also qualify.',
    href: '/blog/uae-visa-on-arrival-for-indians-2026/',
    source: {
      label: 'UAE ICP',
      url: 'https://icp.gov.ae/en/media-center/icp-expands-eligibility-for-uae-entry-visa-for-nationals-of-certain-countries/',
    },
  },
  {
    date: '2026-05-25',
    headline: 'Sri Lanka tourist ETA becomes free for Indians',
    summary:
      'Indians are among 40 nationalities who get a free 30-day, double-entry tourist ETA. You still have to apply on eta.gov.lk before you fly.',
    href: '/blog/sri-lanka-eta-for-indians-2026/',
    source: {
      label: 'Department of Immigration and Emigration, Sri Lanka',
      url: 'https://www.immigration.gov.lk/content/files/visa/Free%20Tourist%20Visas%20for%20Nationals%20of%2040%20Selected%20Countries.pdf',
    },
  },
  {
    date: '2026-04-10',
    headline: 'Schengen Entry/Exit System fully live, passport stamps end',
    summary:
      'The EES now records your entry, exit and face image at the borders of 29 European countries and counts your 90 days in any 180. Indians still need a Schengen visa; ETIAS does not apply to them.',
    href: '/blog/schengen-ees-explained-for-indian-travellers/',
    source: {
      label: 'European Union: EES FAQs',
      url: 'https://travel-europe.europa.eu/en/ees/faq',
    },
  },
  {
    date: '2026-04-08',
    headline: 'UK visa fees go up',
    summary:
      'The standard six-month UK visitor visa rose from £127 to £135 and the Student visa from £524 to £558. The fee you pay is set by the date you apply.',
    href: '/blog/uk-visa-for-indians-2026-fees-processing-time/',
    source: {
      label: 'GOV.UK: Home Office fees, 8 April 2026',
      url: 'https://www.gov.uk/government/publications/visa-regulations-revised-table/home-office-immigration-and-nationality-fees-8-april-2026',
    },
  },
]

// Items dated after NEWS_UPDATED are announced changes that have not started
// yet; they show under "Coming up" instead of in the dated feed.
export function getLatestNews(n = 5) {
  return TRAVEL_NEWS.filter((x) => x.date <= NEWS_UPDATED)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, n)
}

export function getUpcomingNews() {
  return TRAVEL_NEWS.filter((x) => x.date > NEWS_UPDATED).sort((a, b) => a.date.localeCompare(b.date))
}

export function formatNewsDate(iso, opts = { day: 'numeric', month: 'long', year: 'numeric' }) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', { ...opts, timeZone: 'UTC' })
}

// Items grouped by month ("October 2026"), newest month first.
export function getNewsByMonth() {
  const groups = []
  for (const item of getLatestNews(TRAVEL_NEWS.length)) {
    const label = formatNewsDate(item.date, { month: 'long', year: 'numeric' })
    const last = groups[groups.length - 1]
    if (last?.label === label) last.items.push(item)
    else groups.push({ label, id: item.date.slice(0, 7), items: [item] })
  }
  return groups
}
