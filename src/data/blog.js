// Editorial guides published by the Travlys team. Each post targets a
// specific high-intent long-tail query and ships its own static HTML
// at /blog/<slug> with BlogPosting + FAQPage JSON-LD.
//
// Content is original, written from a visa-consultant's POV for an
// Indian audience. Each post links back to relevant country/city
// landing pages to build internal-link density.

export const BLOG_POSTS = [
  {
    slug: 'us-visa-from-india-2026-complete-guide',
    title: 'US visa from India in 2026: a complete, no-nonsense guide',
    metaTitle: 'US Visa from India 2026: Complete Guide (Cost, DS-160, Interview) | Travlys',
    metaDescription:
      'Everything Indian applicants need for a US visa in 2026: B1/B2, F-1, H-1B categories, DS-160 walkthrough, document checklist, interview prep, embassy + consulate map, and what Travlys handles end-to-end.',
    excerpt:
      'B1/B2, F-1, H-1B — the full 2026 US visa playbook for Indians. DS-160, documents, the 5 missions across India, interview prep and what we do for ₹19,940.',
    date: '2026-06-19',
    readMinutes: 9,
    category: 'Country guides',
    tags: ['USA', 'Embassy visa', 'B1/B2', 'F-1', 'H-1B', 'DS-160'],
    heroImage: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=1600&h=900&fit=crop',
    related: ['ds-160-form-mistakes', 'visa-consultant-vs-diy', 'visa-rejection-reasons-india'],
    cta: { slug: 'usa-visa', label: 'See full US visa pricing' },
    faqs: [
      {
        q: 'How long does a US visa take from India in 2026?',
        a: 'Interview wait times at Mumbai, Delhi, Chennai, Kolkata and Hyderabad fluctuate, but B1/B2 stamping is typically issued within 1–2 weeks after the interview. We monitor all five consular calendars and book the earliest available slot.',
      },
      {
        q: 'How much does a US visa cost from India in total?',
        a: 'About ₹35,500 end to end: Travlys service fee from ₹19,940 + US embassy MRV fee of $185 (~₹15,500). VAC biometrics and courier are included in our fee. No urgency surcharges, no per-document add-ons.',
      },
      {
        q: 'Do I need to travel to New Delhi for the interview?',
        a: 'Not always. Five US missions handle Indian applicants based on jurisdiction: Embassy New Delhi, and Consulates in Mumbai, Chennai, Kolkata and Hyderabad. Your home state decides which centre you go to.',
      },
      {
        q: 'Can Travlys help if my US visa was refused before?',
        a: 'Yes. Send us your 214(b) refusal letter — we review the reason at no cost and tell you whether a re-application is worth filing and what would need to change in your profile or documentation.',
      },
    ],
    body: [
      { type: 'h2', text: 'What category do you actually need?' },
      { type: 'p', text: 'The first decision is the visa category, not the documents. Most Indian applicants fall into one of four buckets:' },
      { type: 'ul', items: [
        '**B1/B2 (Visitor)** — tourism, family visit, medical, business meetings, conferences. The default for short stays up to 6 months.',
        '**F-1 (Student)** — full-time study at an SEVP-certified US institution with a valid I-20 form.',
        '**H-1B (Specialty Worker)** — sponsored employment for roles requiring at least a bachelor\'s degree, with an approved I-129 petition.',
        '**L-1 (Intracompany Transfer)** — managers, executives or specialised employees moving to a US office of a multinational.',
      ] },
      { type: 'p', text: 'Picking the wrong category is the most expensive mistake — once you file under the wrong route, you pay the MRV fee again to switch. We spend a 20-minute consultation on this before filing.' },

      { type: 'h2', text: 'The DS-160: where Indian applicants slip up' },
      { type: 'p', text: 'The DS-160 form is the formal US visa application. It is online, 200+ questions, and once submitted it cannot be edited. The barcode confirmation page is what you carry to the interview.' },
      { type: 'p', text: 'Common errors we see on first-time DS-160s:' },
      { type: 'ul', items: [
        'Date format confusion — DS-160 is MM/DD/YYYY, Indian habit is DD/MM. A wrong DOB on the form is a refusal trigger.',
        'Listing employer addresses without their current operating address, only the registered one.',
        'Naming a US contact who has no genuine connection to the travel purpose.',
        'Photograph dimensions — must be exactly 5cm × 5cm with neutral background and no glasses.',
        'Inconsistent travel history — what is on your passport stamps and what you declare on DS-160 must match exactly.',
      ] },
      { type: 'p', text: 'We walk through every answer with you before you submit. There is no fee for editing a DS-160 if you have not paid the MRV yet — we use that window properly.' },

      { type: 'h2', text: 'Documents that actually matter' },
      { type: 'p', text: 'The official US visa document list is small. What actually decides the interview is everything you bring beyond the minimum. For B1/B2 in particular, the consular officer wants to see:' },
      { type: 'ul', items: [
        'Bank statements for the last 6 months — not just the balance, but the income flow.',
        'Income Tax Returns for the last 2 financial years.',
        'Employment letter on company letterhead with salary, leave approval, and the dates of your trip.',
        'For self-employed applicants: GST registration, business income statements, and a cover letter explaining the business.',
        'Property ownership documents, fixed deposits, or other proof of ties to India.',
        'Cover letter that walks the officer through your trip: why now, who you are visiting, where you are staying, and when you are returning.',
      ] },

      { type: 'h2', text: 'The 5 US missions in India: where you actually go' },
      { type: 'p', text: 'Indian applicants do not all interview at the same place. Jurisdiction follows your state of residence:' },
      { type: 'ul', items: [
        '**US Embassy New Delhi** — Delhi, UP, Punjab, Haryana, J&K, HP, Uttarakhand',
        '**US Consulate Mumbai** — Maharashtra, Gujarat, Goa, MP, Chhattisgarh',
        '**US Consulate Chennai** — Tamil Nadu, Karnataka, Kerala, Puducherry',
        '**US Consulate Kolkata** — West Bengal, Bihar, Odisha, Jharkhand, NE states',
        '**US Consulate Hyderabad** — Telangana, Andhra Pradesh, Odisha (shared with Kolkata)',
      ] },
      { type: 'p', text: 'You can book biometrics (VAC) and the interview in two different cities — for example, VAC in Bengaluru and interview in Chennai. We pick the combination with the earliest available date.' },

      { type: 'h2', text: 'The interview: what 4 minutes actually decide' },
      { type: 'p', text: 'A US visa interview is short — typically 3–5 minutes of questions for B1/B2. The consular officer reads the DS-160 on their screen, asks 4–6 questions, and decides. Documents are rarely opened unless the officer is on the fence.' },
      { type: 'p', text: 'The questions are not random. They probe three things:' },
      { type: 'ul', items: [
        '**Purpose** — what are you doing in the US and how long?',
        '**Funds** — who is paying for the trip and can they show it?',
        '**Ties** — what brings you back to India?',
      ] },
      { type: 'p', text: 'Travlys runs two mock interviews before you walk in — one cold, one polished — so the real one feels familiar. Most Indian applicants who fail do so because they are surprised by basic questions, not because they have a weak file.' },

      { type: 'h2', text: 'What Travlys does and what it costs' },
      { type: 'p', text: 'Service fee starts at ₹19,940 for B1/B2. This covers DS-160 review and submission, document checklist tailored to your profile, two mock-interview sessions, VAC + embassy appointment booking, and WhatsApp support until decision.' },
      { type: 'p', text: 'You pay the US embassy MRV fee ($185, ~₹15,500) separately to the embassy — that money goes to the US government, not us, and is non-refundable regardless of the outcome.' },
      { type: 'p', text: 'Total estimate, including everything: about ₹35,500 for a B1/B2 visa from India. The total is the same whether you live in Mumbai, Delhi, Ahmedabad or anywhere else — there is no location surcharge.' },
    ],
  },

  {
    slug: 'ds-160-form-mistakes',
    title: 'DS-160 form: 8 mistakes that cause US visa refusals',
    metaTitle: 'DS-160 Mistakes That Cause US Visa Rejection (2026) | Travlys',
    metaDescription:
      'The DS-160 errors we see most often on Indian US visa applications and how to avoid them. From date format confusion to inconsistent travel history, here is what gets you refused.',
    excerpt:
      'The DS-160 form is what the consular officer reads first. These 8 mistakes are the most common reasons Indian applicants get refused — every single one is preventable.',
    date: '2026-06-19',
    readMinutes: 7,
    category: 'How-to',
    tags: ['DS-160', 'USA', 'Refusal', 'B1/B2'],
    heroImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&h=900&fit=crop',
    related: ['us-visa-from-india-2026-complete-guide', 'visa-rejection-reasons-india', 'visa-consultant-vs-diy'],
    cta: { slug: 'usa-visa', label: 'See US visa application help' },
    faqs: [
      {
        q: 'Can I edit a DS-160 after submission?',
        a: 'No, you cannot edit a submitted DS-160. You can create a new one and submit again, but you do not pay the MRV fee a second time if you have not booked the interview yet. We catch errors before submission.',
      },
      {
        q: 'How long is a DS-160 confirmation valid?',
        a: 'The barcode confirmation page is valid for 30 days. If you do not pay the MRV fee and schedule biometrics within that window, you start fresh.',
      },
      {
        q: 'Should I list every country I have visited on DS-160?',
        a: 'Yes — the last 5 years of travel. Omitting trips that show up on your passport is the fastest way to get a 214(b) refusal. We cross-check your declared travel against your passport stamps before you submit.',
      },
    ],
    body: [
      { type: 'h2', text: 'Why the DS-160 matters more than the documents' },
      { type: 'p', text: 'The DS-160 form is what the consular officer reads on their screen during your interview. Most officers do not open your document folder unless something on the DS-160 needs clarification. That means a clean, consistent DS-160 is more important than a thick file of bank statements.' },
      { type: 'p', text: 'Here are the 8 errors we catch most often when Indian applicants come to us after a refusal, in order of frequency.' },

      { type: 'h2', text: '1. Date format confusion (DD/MM vs MM/DD)' },
      { type: 'p', text: 'The DS-160 uses American date format: MM/DD/YYYY. Indians typing on autopilot enter DD/MM and end up declaring a birth date that does not match their passport. A wrong DOB on the form is an instant rejection trigger and very hard to recover from in the interview.' },

      { type: 'h2', text: '2. Inconsistent travel history' },
      { type: 'p', text: 'The officer can see every Schengen, UK, Singapore, UAE and US stamp in your passport. The DS-160 asks for your travel over the past 5 years. Missing a Dubai trip from 2023 because you forgot it tells the officer your declarations are not reliable.' },
      { type: 'p', text: 'Before submission we ask you to walk through your passport page by page and reconcile every stamp against the DS-160 entries.' },

      { type: 'h2', text: '3. Wrong employer address' },
      { type: 'p', text: 'Many Indian companies have a registered office address that is different from where you actually work. The DS-160 asks for "Present Employer" — that is your operating address, not your registered address. Big companies (TCS, Infosys, Wipro) almost never get this wrong, but smaller firms slip up.' },

      { type: 'h2', text: '4. Vague trip purpose' },
      { type: 'p', text: 'Writing "Tourism" as your trip purpose is technically correct but useless. The DS-160 has a free-text field for "Briefly describe purpose of trip" — fill it. Examples that work: "10-day vacation in California and Nevada — Yosemite, Las Vegas, San Francisco. Returning to job at <employer> in <city>."' },

      { type: 'h2', text: '5. Naming a random US contact' },
      { type: 'p', text: 'If you have no genuine US contact, do not invent one. The DS-160 asks for "Contact Person or Organisation in the United States" — listing a hotel front desk or a cousin you have never met raises flags. Leaving it as the hotel you are staying at, with full address, is fine.' },

      { type: 'h2', text: '6. Wrong photograph specs' },
      { type: 'p', text: 'The DS-160 photo must be:' },
      { type: 'ul', items: [
        '5cm × 5cm (2" × 2")',
        'Taken within the last 6 months',
        'Plain white or off-white background',
        'No glasses, no head coverings (unless religious)',
        'Neutral expression, both ears visible, eyes open',
        'Digital file under 240 KB, JPEG, 600×600 to 1200×1200 px',
      ] },
      { type: 'p', text: 'Indian passport photos taken at corner studios usually fail US specifications. We send you to a vetted photographer or run the spec check ourselves before you upload.' },

      { type: 'h2', text: '7. Skipping the cover letter slot' },
      { type: 'p', text: 'There is no formal cover-letter field on the DS-160, but you can use the "Purpose of trip" and "Anything else you would like to tell us" fields to give context. A complete narrative — who you are, what you do, why this trip, why you are coming back — does the cover letter\'s job inside the form itself. Officers read it.' },

      { type: 'h2', text: '8. Booking the interview before reviewing the DS-160 with someone' },
      { type: 'p', text: 'Once you submit the DS-160 and pay the MRV fee, the booking clock starts. Most Indian applicants then realise they had an error and have to file again. The 30 minutes you save by not having a consultant review the form costs you weeks of slot waits.' },

      { type: 'h2', text: 'How we handle it' },
      { type: 'p', text: 'Travlys reviews every DS-160 line by line before submission. We pull the actual data from your documents (passport, employment letter, bank statement) so what is on the form matches what is in your file. If your visa gets refused on a 214(b) clause despite our review, we tell you exactly what to change for re-application — at no extra cost.' },
    ],
  },

  {
    slug: 'schengen-visa-documents-checklist-2026',
    title: 'Schengen visa documents checklist for Indians (2026)',
    metaTitle: 'Schengen Visa Documents from India 2026: Complete Checklist | Travlys',
    metaDescription:
      'Every document you need for a Schengen short-stay visa from India in 2026. Cover letter template, insurance specs, accommodation proof, financial sufficiency — and the 4 documents most applicants forget.',
    excerpt:
      'A Schengen visa application is mostly about ticking the right boxes. Here is the 2026 checklist for Indian applicants, plus the 4 documents most people forget to add.',
    date: '2026-06-19',
    readMinutes: 6,
    category: 'Checklists',
    tags: ['Schengen', 'Documents', 'Europe', 'Insurance'],
    heroImage: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1600&h=900&fit=crop',
    related: ['us-visa-from-india-2026-complete-guide', 'visa-consultant-vs-diy', 'visa-rejection-reasons-india'],
    cta: { slug: 'netherlands-visa', label: 'See Schengen visa pricing' },
    faqs: [
      {
        q: 'Which Schengen country should I apply to?',
        a: 'Apply to the country where you will spend the most days. If days are equal, apply to the country you enter first. For most Indian first-time Schengen applicants, the Netherlands (via Travlys) has cleaner processing than France or Germany in peak season.',
      },
      {
        q: 'What insurance cover do I need?',
        a: 'Schengen rules require travel medical insurance with minimum €30,000 cover, valid across all 26 Schengen states for the full duration of your stay, and explicitly covering repatriation and emergency medical evacuation. Standard Indian travel insurance usually meets this; we double-check.',
      },
      {
        q: 'Do I need to book flights before applying?',
        a: 'No — and you should not. A confirmed itinerary is enough; a dummy ticket or hold-confirmed reservation from a travel agent is acceptable. Buying actual tickets before approval risks the money if the visa is refused.',
      },
    ],
    body: [
      { type: 'h2', text: 'The core checklist' },
      { type: 'p', text: 'Schengen consulates publish lengthy document lists. After thousands of applications, the actual file we submit looks like this:' },
      { type: 'ul', items: [
        '**Passport** — valid for at least 3 months beyond intended return date, with at least 2 blank pages',
        '**Schengen visa application form** — signed, dated',
        '**2 recent biometric photographs** — 35×45 mm, white background, taken in the last 3 months',
        '**Confirmed flight itinerary** — round-trip, not actual purchased tickets',
        '**Confirmed hotel bookings or invitation letter** — for the entire stay',
        '**Travel insurance certificate** — €30,000+ medical cover, valid for the full Schengen area',
        '**Cover letter** — explains the purpose, dates and who you are',
        '**Bank statements** — last 6 months, official, stamped',
        '**Income Tax Returns** — last 2 financial years',
        '**Employment letter** — on company letterhead, with leave approval and salary',
      ] },

      { type: 'h2', text: 'The 4 documents most applicants forget' },
      { type: 'p', text: 'Even with the official list in hand, these four trip people up:' },

      { type: 'h3', text: '1. Day-by-day itinerary' },
      { type: 'p', text: 'Not just the cities you are visiting — the dates and accommodation address for each city. A spreadsheet with "Day 1: Amsterdam, Hotel X" through "Day 10: Munich, Hotel Y" shows you have planned the trip. Consulates love this.' },

      { type: 'h3', text: '2. Bank statement stamp' },
      { type: 'p', text: 'Net-banking PDFs you download yourself are acceptable in many cases but rejected by some consulates. Get the bank to stamp and sign the printed statements. Takes 30 minutes at the branch, saves a refusal.' },

      { type: 'h3', text: '3. ITR Acknowledgement (ITR-V), not just the form' },
      { type: 'p', text: 'The ITR you upload is the form. The acknowledgement is a separate one-page PDF stamped by the IT department confirming filing. We need both.' },

      { type: 'h3', text: '4. Insurance certificate, not policy schedule' },
      { type: 'p', text: 'Your insurer sends two PDFs: the policy schedule (long, terms-and-conditions) and the visa certificate (1–2 pages, written in the standard Schengen format). The consulate wants the certificate. The schedule is a backup.' },

      { type: 'h2', text: 'Why this checklist matters more for Schengen than for other visas' },
      { type: 'p', text: 'Schengen processing is largely a documents check — there is no interview for short-stay applications. The case is decided on the file alone. Missing one document means a refusal you never get a chance to defend in person.' },
      { type: 'p', text: 'For an applicant with a clean travel history, a complete Schengen file is approved in 7–15 calendar days. The same applicant with a missing insurance certificate gets refused in 30 minutes and waits 3 months to re-apply.' },

      { type: 'h2', text: 'What Travlys does' },
      { type: 'p', text: 'Schengen service from ₹2,950. Includes form, cover letter, insurance sourcing, VFS appointment, document QA, and biometrics support. The embassy fee (currently €90, ~₹8,200) is paid separately at VFS.' },
    ],
  },

  {
    slug: 'visa-consultant-vs-diy',
    title: 'Visa consultant vs DIY: when does hiring one make sense?',
    metaTitle: 'Visa Consultant vs DIY in 2026: When You Need Help | Travlys',
    metaDescription:
      'Honest take from a visa consultant on when you should hire one and when DIY is genuinely fine. The 5 situations where Travlys saves you weeks, and the 2 where you do not need us.',
    excerpt:
      'Honest answer from a visa consultant: there are 5 situations where hiring one pays for itself, and 2 where you genuinely do not need help. Here is how to tell which is which.',
    date: '2026-06-19',
    readMinutes: 5,
    category: 'Honest takes',
    tags: ['Consultant', 'DIY', 'Decision'],
    heroImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&h=900&fit=crop',
    related: ['us-visa-from-india-2026-complete-guide', 'visa-rejection-reasons-india', 'ds-160-form-mistakes'],
    cta: { slug: null, label: null },
    faqs: [
      {
        q: 'Does using a consultant improve approval chances?',
        a: 'It depends on the visa. For e-Visas (Singapore, Malaysia, Thailand, UAE 14-day), the answer is essentially no — the application is straightforward. For embassy-stamp visas (US, UK, Canada, Schengen) where interviews and detailed financial framing matter, a good consultant materially improves outcomes. Our approval rate across 5,000+ applications is 98%, well above the Indian average for self-applied US visas (75-85%).',
      },
      {
        q: 'How do consultants get paid?',
        a: 'Flat service fee, paid before filing. Travlys fees range from ₹999 (Malaysia eNTRI) to ₹19,940 (US embassy). We do not take commissions from embassies or VFS, and we cannot fast-track government processing — anyone who claims to do that is lying.',
      },
    ],
    body: [
      { type: 'h2', text: 'The 5 situations where a consultant earns their fee' },

      { type: 'h3', text: '1. Embassy-stamp visas (US, UK, Canada)' },
      { type: 'p', text: 'These visas have interviews, complex forms, and significant refusal rates. A consultant who has done the route hundreds of times knows what triggers a refusal and what does not. For US, the difference between a ₹19,940 service fee and a ₹15,500 wasted MRV fee on a refusal is obvious math.' },

      { type: 'h3', text: '2. First-time Schengen application without travel history' },
      { type: 'p', text: 'Schengen refusal rates for first-time Indian applicants are around 18%. With a consultant who frames the cover letter and ties properly, that drops to under 5%. The €90 embassy fee is gone either way; the ₹2,950 service fee is the cheap part.' },

      { type: 'h3', text: '3. Previous refusal on record' },
      { type: 'p', text: 'A 214(b) on your US record, or a previous UK refusal, dramatically lowers approval chance on re-application unless something material changes. A consultant tells you what to change and how to frame the re-application. DIY re-applications after refusal are rarely worth attempting.' },

      { type: 'h3', text: '4. Self-employed, freelance or business-owner profiles' },
      { type: 'p', text: 'Salaried applicants have clean income proofs — Form 16, payslips, employer letter. Self-employed applicants have to construct income credibility from GST returns, bank statements and business documents. Consulates often refuse self-employed applications because the narrative is unclear, not because the funds are insufficient. A consultant builds that narrative.' },

      { type: 'h3', text: '5. Tight timeline' },
      { type: 'p', text: 'If you are travelling in 3 weeks and have not started, a consultant who books VFS slots professionally and prepares the file fast is genuinely the difference between catching your trip and missing it. We have routine experience filing US visas in 21 days end to end when needed.' },

      { type: 'h2', text: 'The 2 situations where you genuinely do not need a consultant' },

      { type: 'h3', text: '1. Simple e-Visas (Singapore, Malaysia, Thailand, UAE 14-day)' },
      { type: 'p', text: 'These are online forms with ~10 questions and a passport upload. If you can read English and have a stable internet connection, you can do these yourself in 20 minutes. The Indian agency markup on these is the worst value in visa services. Our pricing for them (₹999 Malaysia, ₹1,950 Thailand) is low because the value is genuinely low — but for many travellers, the convenience is worth it.' },

      { type: 'h3', text: '2. Repeat applicants with strong travel history' },
      { type: 'p', text: 'If you have travelled to 10+ countries, have a valid US/UK visa on your passport, and are applying for a Schengen short-stay, your application file basically writes itself. The risk of refusal is minimal. A consultant adds polish, not protection.' },

      { type: 'h2', text: 'How to evaluate a consultant if you do hire one' },
      { type: 'p', text: 'Most Indian visa agencies are commission shops. The legitimate ones share four traits:' },
      { type: 'ul', items: [
        'A flat fee disclosed up-front, separate from embassy fees',
        'No promises of guaranteed approval or "embassy connections"',
        'A real refusal-risk pre-check before they take your money',
        'A single named consultant on your file, not a ticket queue',
      ] },
      { type: 'p', text: 'Travlys hits all four. If the agency you are evaluating misses any of them, walk away — there are too many alternatives that do not.' },
    ],
  },

  {
    slug: 'dubai-visa-cost-from-india-2026',
    title: 'Dubai visa cost from India in 2026: 14, 30 or 60-day?',
    metaTitle: 'Dubai Visa Cost from India 2026: 14, 30, 60-day (Compared) | Travlys',
    metaDescription:
      'Full Dubai / UAE visa cost breakdown from India in 2026. 14-day, 30-day and 60-day options compared; single-entry vs multiple-entry; what GDRFA charges and what Travlys charges.',
    excerpt:
      'The Dubai visa "from ₹2,500" headline hides a lot. Here is the real cost of each UAE visa option from India in 2026, plus when each makes sense.',
    date: '2026-06-19',
    readMinutes: 4,
    category: 'Cost guides',
    tags: ['UAE', 'Dubai', 'e-Visa', 'Cost'],
    heroImage: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1600&h=900&fit=crop',
    related: ['us-visa-from-india-2026-complete-guide', 'schengen-visa-documents-checklist-2026', 'visa-consultant-vs-diy'],
    cta: { slug: 'uae-visa', label: 'See Dubai visa pricing' },
    faqs: [
      {
        q: 'Which Dubai visa do I need for a 4-day trip?',
        a: 'The 14-day single-entry e-Visa. Cheapest option, plenty of buffer over 4 days. The 30-day is overkill and costs more for no benefit.',
      },
      {
        q: 'Can I extend a Dubai visa once I am there?',
        a: 'A 30-day or 60-day tourist visa can be extended once for the same duration, at GDRFA Dubai. The 14-day cannot be extended. We tell you this before you choose so you do not get caught short.',
      },
      {
        q: 'Why are some Dubai visa portals so cheap?',
        a: 'Some travel-portal "Dubai visa" prices are misleading. They show only the GDRFA government fee and bury the markup in surcharges or "express" fees. Travlys quotes the full price up-front so you can actually compare.',
      },
    ],
    body: [
      { type: 'h2', text: 'The 4 Dubai visa options' },
      { type: 'p', text: 'For Indian tourists, UAE\'s GDRFA issues four tourist visa categories. The difference between them is duration of stay and number of entries:' },

      { type: 'h3', text: '14-day single-entry — ₹2,500 from Travlys' },
      { type: 'p', text: 'For short Dubai or Abu Dhabi trips up to 14 days. Cannot be extended. Single entry: if you leave UAE, the visa expires. Cheapest option, processed in 2-4 working days.' },

      { type: 'h3', text: '30-day single-entry — ₹3,500 from Travlys' },
      { type: 'p', text: 'The most popular UAE category. 30 days of stay, can be extended once at GDRFA Dubai for another 30. Single entry. The right choice for most Indian leisure travellers.' },

      { type: 'h3', text: '30-day multiple-entry — ₹6,500 from Travlys' },
      { type: 'p', text: 'Useful for business travellers going in and out of UAE during a 30-day window. The price jump over single-entry is significant because GDRFA charges more on its side.' },

      { type: 'h3', text: '60-day single-entry — ₹4,500 from Travlys' },
      { type: 'p', text: 'For longer leisure or family trips. 60 days of stay, single entry, extendable by another 60. Worth it for trips longer than 30 days.' },

      { type: 'h2', text: 'Total cost breakdown' },
      { type: 'p', text: 'Travlys fee + GDRFA government fee = total. GDRFA fees fluctuate slightly with currency; the table below shows the current 2026 numbers:' },
      { type: 'ul', items: [
        '14-day single: ₹2,500 Travlys + AED 180 GDRFA (~₹4,100) = **~₹6,600 total**',
        '30-day single: ₹3,500 Travlys + AED 320 GDRFA (~₹7,300) = **~₹10,800 total**',
        '30-day multiple: ₹6,500 Travlys + AED 690 GDRFA (~₹15,800) = **~₹22,300 total**',
        '60-day single: ₹4,500 Travlys + AED 670 GDRFA (~₹15,300) = **~₹19,800 total**',
      ] },

      { type: 'h2', text: 'When each makes sense' },
      { type: 'p', text: 'The choice is driven by trip length and entries. Some guidance:' },
      { type: 'ul', items: [
        'Weekend Dubai stop (3-5 days): 14-day single-entry, no question',
        'Standard 1-week or 2-week leisure: 30-day single-entry',
        'Family trip with kids, 4+ weeks: 60-day single-entry',
        'Business travel into UAE and back from a connecting country during the same month: 30-day multiple-entry',
        'Frequent flier who visits UAE 3+ times a year: ask us about the 90-day multiple-entry category, priced separately',
      ] },

      { type: 'h2', text: 'What Travlys handles' },
      { type: 'p', text: 'For all categories: application drafting, photograph review, GDRFA submission via approved channel, query handling if GDRFA asks for clarifications, and PDF visa email delivered to your inbox in 2-4 working days. We file enough Dubai visas to know which document combinations clear instantly and which trigger queries.' },
    ],
  },

  {
    slug: 'visa-rejection-reasons-india',
    title: 'Visa rejection: 7 reasons Indian applicants get refused (and what to do)',
    metaTitle: 'Why Visa Refused in India? 7 Common Reasons (2026) | Travlys',
    metaDescription:
      'The 7 reasons Indian visa applicants get refused most often — and what to change before re-applying. Covers US 214(b), UK genuine-visitor test, Schengen insufficient funds and more.',
    excerpt:
      'Visa refusals are almost never random. Here are the 7 reasons we see most often when Indian applicants come to us after a rejection, and what to fix before you re-apply.',
    date: '2026-06-19',
    readMinutes: 6,
    category: 'Honest takes',
    tags: ['Refusal', 'Re-application', '214(b)'],
    heroImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&h=900&fit=crop',
    related: ['us-visa-from-india-2026-complete-guide', 'ds-160-form-mistakes', 'visa-consultant-vs-diy'],
    cta: { slug: null, label: null },
    faqs: [
      {
        q: 'Can a refused visa be re-applied immediately?',
        a: 'Yes, you can re-apply the next day. But unless something material has changed in your profile or documentation, you will likely be refused again. We tell you whether re-application is worth filing or whether you should wait for a profile change.',
      },
      {
        q: 'Does a visa refusal affect future applications?',
        a: 'It is on your record forever — every future visa form will ask about it and you must declare it. But a single refusal does not permanently disqualify you. Many of our clients with prior refusals are now on their second, third or tenth approved visa.',
      },
    ],
    body: [
      { type: 'h2', text: 'Refusals are almost never random' },
      { type: 'p', text: 'When a visa is refused, the official refusal letter often gives a clause number (214(b) for US, paragraph reference for UK) but rarely explains the actual reason in detail. After 5,000+ applications, we have seen patterns. Here are the 7 most common.' },

      { type: 'h2', text: '1. Insufficient or unclear financial sufficiency' },
      { type: 'p', text: 'Most common cause across US, UK, Canada and Schengen. The officer is not just checking the balance — they are checking the income flow. A salary credit pattern in your bank statements is far more convincing than a one-time lump sum deposit three weeks before applying.' },
      { type: 'p', text: '**Fix:** wait until you have at least 6 months of clean salary credits showing in the bank statement, with no suspicious large deposits. Provide ITRs to back up the income.' },

      { type: 'h2', text: '2. Weak ties to India' },
      { type: 'p', text: 'For visitor visas, the officer needs to believe you will return home. Single, young applicants with no spouse, no property, no children and a short employment history are the hardest to convince. There is nothing wrong with this profile — it just needs to be framed correctly.' },
      { type: 'p', text: '**Fix:** include everything that anchors you to India — family responsibilities (ageing parents, siblings), property documents, fixed deposits, employer letter mentioning your role and tenure. The cover letter should explicitly address what you are returning for.' },

      { type: 'h2', text: '3. Inconsistent documentation' },
      { type: 'p', text: 'Salary on the employer letter says ₹85,000; bank statement shows ₹75,000 credit; DS-160 says ₹90,000. Three different numbers for the same thing. The officer notices.' },
      { type: 'p', text: '**Fix:** before filing, lay every number side by side. Salary on letter, salary in bank, salary on Form 16, salary on DS-160 — should all match. If they do not match for legitimate reasons (variable pay, bonus, allowances), explain in the cover letter.' },

      { type: 'h2', text: '4. Itinerary that does not make sense' },
      { type: 'p', text: 'Planning to spend 2 days in Paris and 12 days in Romania for a Schengen tourist visa raises questions. Romania is not Schengen, for one, but more importantly the time distribution does not match a typical leisure trip. Officers know what genuine tourism looks like.' },
      { type: 'p', text: '**Fix:** build an itinerary you could actually defend in conversation. Time in cities should match what a tourist would do — 3 days for a major city, 1-2 days for a smaller stop.' },

      { type: 'h2', text: '5. Travel history mismatch' },
      { type: 'p', text: 'You declare no Schengen travel on your DS-160 but your passport has a 2024 Spain stamp. You forgot, but the officer sees both. The forgotten stamp is the refusal.' },
      { type: 'p', text: '**Fix:** before submitting any form, list every country and date from your passport stamps. Cross-reference with the form. Always declare what is on the passport.' },

      { type: 'h2', text: '6. Wrong visa category' },
      { type: 'p', text: 'Applying for a B1/B2 to attend a conference is wrong if the conference includes paid training. Applying for a tourist visa to attend your sister\'s wedding when you have an invitation letter mentioning the wedding is fine, but framing matters.' },
      { type: 'p', text: '**Fix:** match the visa category to the actual purpose, and frame the purpose so it matches the category. The category decision is the most important one we make in your consultation.' },

      { type: 'h2', text: '7. Interview answers contradict the form' },
      { type: 'p', text: 'You wrote "10-day trip to California" on DS-160. In the interview you say "around 2-3 weeks". The officer sees the inconsistency and weighs the form, not your verbal answer.' },
      { type: 'p', text: '**Fix:** memorise key facts from the form — exact dates, exact purpose, exact employer details — before the interview. We rehearse this in our mock interviews.' },

      { type: 'h2', text: 'When to re-apply' },
      { type: 'p', text: 'After a refusal, three things matter:' },
      { type: 'ul', items: [
        '**Why** you were refused (specific reason, not just clause number)',
        '**What** has changed in your profile since the refusal',
        '**How** the next file will look different from the last one',
      ] },
      { type: 'p', text: 'If none of these have changed, do not file. Save the embassy fee. If something material has changed (new job, ITR with higher income, property purchase, spouse, completed studies abroad), file with the changes highlighted.' },

      { type: 'h2', text: 'What we do' },
      { type: 'p', text: 'Send us your refusal letter — we review it at no cost and tell you which of the 7 reasons applies, what to change, and whether re-application is worth filing. Honest assessment, no pressure to file with us afterwards.' },
    ],
  },
]

export function getPost(slug) {
  return BLOG_POSTS.find((p) => p.slug === slug) || null
}

export const BLOG_CATEGORIES = [...new Set(BLOG_POSTS.map((p) => p.category))]
