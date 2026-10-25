// One row per destination: how Indians enter, what it costs and how long it
// takes. Powers the /visa-fees/ page, the downloadable CSV, the quick-answer
// box on each visa page, and the Dataset schema. Government fees and entry
// rules were checked against the official sources below on LAST_CHECKED.

import { destinations, GOV_FEES } from './destinations.js'

export const LAST_CHECKED = '2026-10-25'

const ENTRY = {
  'usa-visa': {
    needsVisa: 'Yes',
    route: 'B1/B2 visitor visa from a US consulate in India',
    answer:
      'Yes. Indian citizens need a US visa for any visit. For tourism or business that is the B1/B2 visitor visa, applied with the DS-160 form and, in most cases, an in-person interview at a US consulate in India.',
    source: 'https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html',
  },
  'uk-visa': {
    needsVisa: 'Yes',
    route: 'Standard Visitor visa, biometrics at VFS, issued as an eVisa',
    answer:
      'Yes. Indian citizens need a UK Standard Visitor visa. You apply online, give biometrics at a VFS centre in India, and an approved visa is issued as an eVisa. The UK ETA is not available to Indian passport holders.',
    source: 'https://www.gov.uk/standard-visitor',
  },
  'canada-visa': {
    needsVisa: 'Yes',
    route: 'Visitor visa (TRV) with biometrics',
    answer:
      'Yes. Indian citizens need a Canada visitor visa (TRV), applied online with biometrics at a visa application centre in India. Indian passport holders cannot use an eTA to fly to Canada.',
    source: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html',
  },
  'australia-visa': {
    needsVisa: 'Yes',
    route: 'Visitor visa (subclass 600), applied online',
    answer:
      'Yes. Indian citizens need an Australian Visitor visa (subclass 600) for tourism, family visits or business visitor activities. You apply online through ImmiAccount.',
    source: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600',
  },
  'netherlands-visa': {
    needsVisa: 'Yes',
    route: 'Schengen short-stay visa, biometrics at VFS',
    answer:
      'Yes. Indian citizens need a Schengen short-stay visa for the Netherlands and the other 28 Schengen countries. You apply with biometrics at a VFS centre in India; the visa allows up to 90 days in any 180.',
    source: 'https://www.netherlandsworldwide.nl/visa-the-netherlands/schengen-visa',
  },
  'singapore-visa': {
    needsVisa: 'Yes',
    route: 'Singapore visa through an authorised visa agent',
    answer:
      'Yes. Indian citizens need a Singapore visa. Applications from India go through an authorised visa agent, and the visa is usually issued as an e-Visa.',
    source: 'https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa_requirements',
  },
  'uae-visa': {
    needsVisa: 'Usually',
    route: 'e-Visa before travel; visa on arrival for holders of a US, UK or EU visa or residence permit',
    answer:
      'Usually yes. Most Indian citizens need a UAE visa approved before travel. If you hold a valid US visa or green card, or a UK or EU visa or residence permit, you can get a 14-day visa on arrival instead.',
    source: 'https://icp.gov.ae',
  },
  'thailand-visa': {
    needsVisa: 'No (up to 30 days)',
    route: 'Visa-free for tourism up to 30 days since 15 September 2026; TDAC before arrival',
    answer:
      'No, not for tourism of up to 30 days. Since 15 September 2026 Indian passport holders can enter Thailand visa-free for 30 days after submitting the free Thailand Digital Arrival Card. Longer stays need a tourist e-Visa or DTV.',
    source: 'https://newdelhi.thaiembassy.org/en/page/visa',
  },
  'new-zealand-visa': {
    needsVisa: 'Yes',
    route: 'Visitor visa, applied online',
    answer:
      'Yes. Indian citizens need a New Zealand Visitor Visa, applied online with Immigration New Zealand. The NZeTA is not available to Indian passport holders.',
    source: 'https://www.immigration.govt.nz/new-zealand-visas/visas/visa/visitor-visa',
  },
  'malaysia-visa': {
    needsVisa: 'No (up to 30 days, until 31 Dec 2026)',
    route: 'Visa-free up to 30 days until 31 December 2026; MDAC before arrival',
    answer:
      'No, not for visits of up to 30 days until 31 December 2026. Indian passport holders enter Malaysia visa-free under a temporary waiver, after submitting the free Malaysia Digital Arrival Card. Trips after that date may need eNTRI or an e-Visa.',
    source: 'https://www.imi.gov.my/index.php/en/main-services/visa/visa-requirement-by-country/',
  },
}

const inr = (n) => `₹${n.toLocaleString('en-IN')}`

export const VISA_FEE_ROWS = destinations.map((d) => {
  const gov = GOV_FEES[d.slug] || {}
  const entry = ENTRY[d.slug] || {}
  const visaFree = String(entry.needsVisa || '').startsWith('No')
  return {
    slug: d.slug,
    country: d.name,
    needsVisa: entry.needsVisa || 'Yes',
    route: entry.route || d.visaType,
    governmentFee: visaFree ? 'None for visa-free entry' : gov.native || '',
    governmentFeeInr: visaFree ? 0 : gov.inr || null,
    paidTo: visaFree ? '' : gov.payee || '',
    travlysFee: d.price,
    travlysFeeInr: d.priceValue,
    processing: d.processingTime,
    validity: d.validity,
    stay: d.stayDuration,
    source: entry.source || '',
    answer: entry.answer || d.aboutText,
  }
})

export function getFeeRow(slug) {
  return VISA_FEE_ROWS.find((r) => r.slug === slug) || null
}

// How the country reads inside a question ("a visa for the UK", "a UK visa").
const PLACE = {
  'usa-visa': 'the US',
  'uk-visa': 'the UK',
  'uae-visa': 'the UAE (Dubai)',
  'netherlands-visa': 'the Netherlands and Schengen',
}
const SHORT = {
  'usa-visa': 'US',
  'uk-visa': 'UK',
  'uae-visa': 'UAE (Dubai)',
  'netherlands-visa': 'Schengen',
}

// The three questions people ask first about any destination, answered from
// the row above. Shown at the top of each visa page and in its FAQ schema.
export function getQuickAnswers(dest) {
  const r = getFeeRow(dest.slug)
  if (!r) return []
  const cost = r.governmentFeeInr
    ? `The government fee is ${r.governmentFee} (about ${inr(r.governmentFeeInr)}), paid to ${r.paidTo}. The Travlys service fee is ${r.travlysFee.replace('From', 'from')}, so plan for roughly ${inr(r.governmentFeeInr + r.travlysFeeInr)} in total.`
    : `There is no visa fee for visa-free entry. If you need a visa for a longer or different trip, the Travlys service fee is ${r.travlysFee.replace('From', 'from')} plus the government fee.`
  const place = PLACE[dest.slug] || dest.name
  const short = SHORT[dest.slug] || dest.name
  // "an Australia visa", but "a UK / UAE / US visa" (U sounds like "you").
  const art = /^[AEIO]/.test(short) ? 'an' : 'a'
  return [
    { q: `Do Indian citizens need a visa for ${place}?`, a: r.answer },
    { q: `How much does ${art} ${short} visa cost from India in 2026?`, a: cost },
    {
      q: `How long does ${art} ${short} visa take from India?`,
      a: `${r.processing.charAt(0).toUpperCase()}${r.processing.slice(1)}. Validity: ${r.validity}. Stay: ${r.stay}.`,
    },
  ]
}

const CSV_COLUMNS = [
  ['country', 'Country'],
  ['needsVisa', 'Indians need a visa?'],
  ['route', 'Entry route for Indian passport holders'],
  ['governmentFee', 'Government fee'],
  ['governmentFeeInr', 'Government fee (approx. INR)'],
  ['paidTo', 'Paid to'],
  ['travlysFeeInr', 'Travlys service fee from (INR)'],
  ['processing', 'Processing time'],
  ['validity', 'Validity'],
  ['stay', 'Stay per visit'],
  ['source', 'Official source'],
]

export function visaFeesCsv() {
  const cell = (v) => {
    const s = v == null ? '' : String(v)
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }
  const lines = [CSV_COLUMNS.map(([, h]) => cell(h)).join(',')]
  for (const r of VISA_FEE_ROWS) lines.push(CSV_COLUMNS.map(([k]) => cell(r[k])).join(','))
  return lines.join('\n') + '\n'
}
