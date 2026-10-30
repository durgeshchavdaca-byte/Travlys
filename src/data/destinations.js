// Country data powering the homepage grid, per-country pages, and SEO.
// `priceValue` drives schema.org Offer markup when set.
// Image sources: Unsplash (free for commercial use, no API key required).

export const destinations = [
  {
    name: 'United States',
    slug: 'usa-visa',
    code: 'US',
    flag: '🇺🇸',
    accent: '#3b5bdb',
    region: 'Americas',
    visaType: 'Embassy Visa',
    processingTime: '7.5-12 months (interview wait)',
    processingTimeShort: '6-12 mo',
    validity: 'Up to 10 years',
    stayDuration: 'Up to 6 months / visit',
    entryType: 'Multiple',
    price: 'From ₹19,940',
    priceValue: 19940,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=900&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=1600&h=900&fit=crop',
    tagline: 'B1/B2, F-1, H-1B and beyond',
    description:
      'Full-spectrum support for the US visa process, DS-160 review, document prep tuned to your profile, mock interview rehearsal with seasoned consular-prep coaches, and appointment booking.',
    subtitle: 'End-to-end help for the US embassy visa journey',
    aboutTitle: 'About the US visa for Indian travelers',
    aboutText:
      'Indian passport holders need a valid US visa for any visit, tourism, business, study, employment or transit. The process is managed by the US Department of State, runs through the DS-160 online form, and includes an in-person interview at a US embassy or consulate in India. Travlys handles preparation end-to-end so you walk into the interview confident.',
    metaTitle: 'US Visa from India 2026: Apply from ₹19,940 | Travlys',
    metaDescription:
      'Get your USA visa from India in 2026 with Travlys. B1/B2, F-1 and H-1B with DS-160 review, document prep, mock-interview coaching and embassy appointment booking from ₹19,940.',
    keywords:
      'us visa from india, b1 b2 visa, ds-160 help, f1 student visa, h1b visa india, us visa interview coaching, us tourist visa consultants',
    includes: [
      'DS-160 form review and submission',
      'Profile-tailored document checklist',
      'Two mock-interview sessions',
      'VAC and embassy appointment booking',
      'WhatsApp support until visa decision',
    ],
    faqs: [
      {
        q: 'How long does it take to get a US visa from India?',
        a: 'B1/B2 interview waits at US posts in India were roughly 7.5-12 months in State Department figures from 21 October 2026, and they change often. Once your interview is done, B1/B2 stamping typically arrives within 1-2 weeks. We help you grab the earliest available slot.',
      },
      {
        q: 'What documents do I need for a US tourist visa?',
        a: 'Passport (6+ months validity), DS-160 confirmation, fee receipt, visa-spec photograph, appointment letter, financial statements covering the past 3-6 months, and proof of strong ties to India (employment, family, assets).',
      },
      {
        q: 'Do you guarantee a US visa approval?',
        a: 'No consultant honestly can, the consular officer decides. What we do guarantee is a complete, accurate application and thorough interview prep, which is the single biggest factor in approvals.',
      },
      {
        q: 'How much does Travlys charge for US visa assistance?',
        a: 'Our service starts at ₹19,940 for B1/B2, covering DS-160, documentation, mock interview and appointment booking. The US embassy fee (currently $185) is paid separately to the embassy.',
      },
    ],
    categories: [
      { name: 'B-1 / B-2 Visitor', purpose: 'Tourism, business meetings, medical', description: 'For short trips covering sightseeing, conferences, negotiations or medical treatment.' },
      { name: 'F-1 Student', purpose: 'Full-time study', description: 'For students admitted to accredited US universities with a valid I-20 form. All social media accounts must be set to public before the interview.' },
      { name: 'H-1B Specialty Worker', purpose: 'Skilled employment', description: 'For roles requiring at least a bachelor’s degree, sponsored by a US employer with an approved petition. H-1B and H-4 applicants must set all social media accounts to public.' },
      { name: 'L-1 Intracompany Transfer', purpose: 'Internal company move', description: 'For managers, executives or specialized employees moving to a US office of a multinational.' },
    ],
    processSteps: [
      'Profile review, we map your travel purpose, history and financial story to the right visa category.',
      'DS-160 walkthrough, we prepare your form and review every answer before submission.',
      'Document set, a tailored checklist with templates for cover letter, itinerary and financials.',
      'Appointment booking, VAC biometrics and embassy interview slots locked at the earliest dates.',
      'Mock interview, two practice rounds with real consular questions and answer coaching.',
      'Day-of support, a quick call before you walk in, plus passport return tracking after.',
    ],
    documents: [
      'Passport with 6+ months validity beyond intended stay',
      'DS-160 confirmation page with barcode',
      'MRV fee receipt',
      'Recent 5×5 cm photograph meeting US specs',
      'Appointment confirmation (VAC + embassy)',
      'Bank statements (last 6 months) and ITR (last 2 years)',
      'Employment letter, leave approval and salary slips',
    ],
    relatedDestinations: ['uk-visa', 'canada-visa', 'australia-visa', 'singapore-visa', 'uae-visa', 'netherlands-visa'],
    // Long-form editorial content for /visa/usa-visa. Renders as an
    // in-depth guide beneath the About section. This is the SEO
    // heavy-lifter that targets the head-term cluster around
    // "US visa from India", "us b1 b2 visa", "ds-160 mistakes",
    // "us visa interview questions", "us visa fee india".
    deepGuide: {
      updatedOn: '2026-07-10',
      reviewedBy: 'The Travlys US visa desk',
      tldr:
        'The US visa from India is not a paper application, it is an evidence-based conversation with a consular officer. Cost is roughly ₹38,000-42,000 all-in (MRV fee $185, service fee, VAC, courier). Total time from brief to stamped passport is typically 7.5-12 months for a first-time B1/B2 applicant, most of it interview-wait. DS-160 accuracy and interview coaching decide the outcome more than any single document.',
      sections: [
        {
          h2: 'US visa from India in 2026: what actually decides the outcome',
          body: [
            {
              type: 'p',
              text: 'Every Indian applicant assumes the US visa is a document game. It is not. The consular officer at the US embassy or consulate has your DS-160 open on their screen and roughly 90 seconds to decide whether to approve you. The document folder in your hand almost never opens.',
            },
            {
              type: 'p',
              text: 'What decides the outcome is Section 214(b) of the US Immigration and Nationality Act, the presumption that every applicant is an intending immigrant unless they prove strong ties to India. Your job in that 90-second interview is to make that presumption fall away. That is the entire game.',
            },
            {
              type: 'p',
              text: 'Everything else, DS-160 answers, cover letter, financial statements, itinerary, is there to back up the story you will tell. If the interview story does not line up with the DS-160 answers you submitted three weeks ago, the visa is refused. So the preparation is not "collect documents", it is "build a consistent, credible narrative that the DS-160, the file and the interview all support".',
            },
          ],
        },
        {
          h2: 'How much does a US visa cost from India in 2026',
          body: [
            {
              type: 'p',
              text: 'The full cost has two independent parts: the US government fee (paid to the embassy in USD) and the service fee (paid to a consultant if you are using one). Both are separate from optional add-ons like courier, insurance and biometrics upgrades.',
            },
            { type: 'h3', text: 'US government fees (paid directly to the embassy)' },
            {
              type: 'ul',
              items: [
                'MRV (Machine Readable Visa) fee: $185 for B1/B2, F-1, M and most non-immigrant categories. About ₹18,100 at the current US consular exchange rate of ₹98 per dollar.',
                'H, L, O, P, Q and R work visas: $205 MRV.',
                'E treaty investor / trader visas: $315 MRV.',
                'Reciprocity fee: applies to specific nationalities and categories; nil for most Indian applicants on B1/B2.',
                'SEVIS I-901 (for F-1 students only): $350, paid to ICE, not the embassy.',
                'H-1B / L-1 anti-fraud and border-security fees are paid by the US employer, not the applicant.',
              ],
            },
            { type: 'h3', text: 'Travlys service fee for the US visa' },
            {
              type: 'p',
              text: 'Our flat service fee for a US B1/B2 visa from India starts at ₹19,940. That covers everything from DS-160 review through two mock interviews to embassy appointment booking. Student visas (F-1) and work visas (H-1B, L-1) carry different service fees because the paperwork depth is different, we quote those live once we have your I-20 or petition details.',
            },
            { type: 'h3', text: 'Add-ons you might see billed separately' },
            {
              type: 'ul',
              items: [
                'VFS courier delivery of your passport back home: ~₹500-800.',
                'Photograph meeting the 5×5 cm US spec: ~₹200 at any VFS-approved studio.',
                'Travel insurance (not required for the visa, but recommended for the trip): from ~₹1,500 depending on trip length.',
                'Interview waiver (drop-box) courier: same ₹500-800 range if you qualify.',
              ],
            },
            {
              type: 'callout',
              label: 'Realistic total',
              text: 'For a first-time B1/B2 applicant from India, budget ₹38,000-42,000 all-in. B1/B2 renewals that qualify for the interview waiver save on time but not much on cost. Keep another $250 per visa in reserve for the visa integrity fee: it is in US law, but as of October 2026 we could not confirm it is being collected in India.',
            },
          ],
        },
        {
          h2: 'DS-160 form: 8 mistakes that get Indian applicants refused',
          body: [
            {
              type: 'p',
              text: 'The DS-160 is a 100+ question online form and the source of most self-inflicted US visa refusals. The consular officer will read your DS-160 answers word-for-word during the interview and compare them with what you say in person. Discrepancies read as intent to deceive. Here are the eight most-common ways Indian applicants sabotage themselves.',
            },
            {
              type: 'ul',
              items: [
                '1. Vague purpose of trip. "Vacation" or "meeting friends" reads as immigration intent. Name the state, the city, the number of nights, and what you will actually do there.',
                '2. Zero travel history and no explanation for it. If your passport is blank, the officer needs a plausible reason (young applicant, first job, etc.) that lines up with your work history.',
                '3. US-based contact chosen carelessly. The person you name as your US point of contact is a signal about your intent. Naming a distant cousin who "sponsors" your trip when you are actually staying at a hotel is a red flag.',
                '4. Employer details that do not match your bank statements. If your DS-160 says you earn ₹15 lakh a year and your salary account shows ₹8 lakh in credits, the officer sees the gap.',
                '5. Previous visa refusals hidden. Every US refusal, every Schengen refusal, every UK refusal, must be declared. The embassy has API access. Hiding one guarantees another refusal.',
                '6. Family in the US listed as "no" when a cousin is on H-1B. Extended family in the US on work or student visas is not disqualifying. Hiding it is.',
                '7. Inconsistent addresses over the last 5 years. If you moved cities for work, list every address; do not compress.',
                '8. Wrong photo. The US spec is 5×5 cm, plain white background, taken in the last 6 months, no smile, no glasses. VFS rejects wrong photos on the biometrics day, and it delays your file by 2-3 weeks.',
              ],
            },
            {
              type: 'p',
              text: 'Travlys reviews the DS-160 answer-by-answer before submission and flags each of these against your real profile. It is the single most impactful part of what we do.',
            },
          ],
        },
        {
          h2: 'US visa interview: 12 questions Indian applicants actually get asked',
          body: [
            {
              type: 'p',
              text: 'The B1/B2 interview at the US embassy in New Delhi, Mumbai, Chennai, Kolkata or Hyderabad lasts 60-120 seconds. Consular officers are trained to ask short, high-signal questions in rapid succession. Here are the twelve most-frequent questions we see, in the order they usually come.',
            },
            {
              type: 'ul',
              items: [
                'Why do you want to visit the United States? (Purpose of trip.)',
                'How long will you stay?',
                'Where will you stay, and who will you visit?',
                'Have you been to the US before?',
                'Which other countries have you traveled to?',
                'What do you do for work, and how long have you been at your current employer?',
                'How much do you earn?',
                'Who is paying for the trip?',
                'Are you married? Do you have children? What do they do?',
                'Do you own property, and where?',
                'Do you have relatives in the US?',
                'What will make you come back to India?',
              ],
            },
            {
              type: 'p',
              text: 'That last question, "what will make you come back to India", is the officer directly testing the 214(b) presumption. The strongest answers reference specific, unbreakable ties: your job with a return-to-work date, a spouse or aging parent you support, a home loan in your name, a business you run, elderly parents who depend on you. Weak answers are "my family is here" or "I love India". Both are true, neither is evidence.',
            },
            {
              type: 'p',
              text: 'Our two mock interviews at Travlys drill these exact questions with your real answers, in the order they are asked, at the pace they are asked. We stop you when your answer is honest but self-defeating and rebuild the phrasing until it is honest and defensible.',
            },
          ],
        },
        {
          h2: 'US visa refused (214(b) or 221(g)): what it actually means and what to do next',
          body: [
            {
              type: 'p',
              text: 'A US visa refusal is not a lifetime ban. It is a decision on the file the officer read that morning. The two most-common refusal codes on the pink slip you walk out with are 214(b) and 221(g), and they mean very different things.',
            },
            { type: 'h3', text: '214(b): "you did not overcome the immigrant-intent presumption"' },
            {
              type: 'p',
              text: 'This is the most-common refusal. It means the officer was not convinced you would return to India. You can re-apply immediately, there is no waiting period, but re-applying with the same file gets the same result. Something material has to change: a new job, a promotion, a marriage, a home purchase, a new travel history from a hard-to-get country. Or the file itself has to be rebuilt to surface ties that the previous application under-sold.',
            },
            { type: 'h3', text: '221(g): "administrative processing / missing documents"' },
            {
              type: 'p',
              text: '221(g) means the officer needs more information before deciding. Sometimes it is a document you did not carry, sometimes it is a background check (common for H-1B applicants in specialised STEM fields, or applicants whose employer is on a watch-list). The pink slip lists what to send and where. Response windows are usually 60-365 days depending on the sub-code. Send exactly what is asked, nothing more, nothing less.',
            },
            {
              type: 'p',
              text: 'If you have been refused, send us the pink slip, we do a free assessment of whether re-application makes sense and what specifically needs to change first. Most of our re-application clients get approved on the second try because the second application is a different application, not the same one submitted twice.',
            },
          ],
        },
        {
          h2: 'US embassy vs consulate: which one handles your city',
          body: [
            {
              type: 'p',
              text: 'There is one US embassy in India (New Delhi) and four US consulates general (Mumbai, Chennai, Hyderabad, Kolkata). Which one interviews you is decided by the city and state on your DS-160, though for B1/B2 you can technically pick any post that has an open slot. Practical guidance:',
            },
            {
              type: 'ul',
              items: [
                'New Delhi Embassy: covers Punjab, Haryana, Rajasthan, Uttarakhand, Uttar Pradesh, Himachal Pradesh, J&K, Chandigarh, and Delhi NCR.',
                'Mumbai Consulate: covers Maharashtra, Gujarat, Madhya Pradesh, Goa, Chhattisgarh, Daman & Diu, Dadra & Nagar Haveli.',
                'Chennai Consulate: covers Tamil Nadu, Kerala, Karnataka, Puducherry, Andaman & Nicobar Islands, Lakshadweep.',
                'Hyderabad Consulate: covers Telangana, Andhra Pradesh and Odisha.',
                'Kolkata Consulate: covers West Bengal, Bihar, Jharkhand, Sikkim, all seven NE states.',
              ],
            },
            {
              type: 'p',
              text: 'If your assigned post has a 6-month wait, we routinely book you at a different post with a shorter queue. That is legal for B1/B2 and adds a plane ticket to your cost but subtracts months from your timeline.',
            },
          ],
        },
        {
          h2: 'US visa processing time from India: current wait times',
          body: [
            {
              type: 'p',
              text: 'Wait times at US posts in India fluctuate dramatically. The State Department publishes them at travel.state.gov/visawait, but the numbers there lag reality by weeks. What we see in live cases as of mid-2026:',
            },
            {
              type: 'ul',
              items: [
                'B1/B2 interview: roughly 6-12 months across the five posts in State Department figures for September-October 2026, with Hyderabad and Mumbai at the long end and Chennai and Kolkata shorter.',
                'Interview waiver (drop-box), now mainly for B1/B2 renewals within 12 months of expiry: much faster, as there is no interview slot to wait for.',
                'F-1 students: roughly 2 weeks to 2.5 months for an interview depending on the post (September 2026 figures); embassies prioritise student visas ahead of the academic year.',
                'H-1B: a few weeks to a few months for an interview depending on the post, subject to 221(g) administrative processing. H-1B renewals also need an interview now.',
              ],
            },
            {
              type: 'p',
              text: 'With current waits, a first-time B1/B2 file usually takes many months from brief to stamped passport, most of it waiting for the interview. We check for earlier slots every 24 hours and book the first one that opens at a post in India where the applicant can legally apply, but no one can promise an early date.',
            },
          ],
        },
        {
          h2: 'Interview waiver (drop-box): who qualifies and how it works',
          body: [
            {
              type: 'p',
              text: 'The interview waiver, informally called "drop-box", lets qualifying repeat applicants skip the in-person interview and simply drop their passport at VFS. It is the fastest way to a US visa if you qualify, but since September 2025 it is limited mainly to B1/B2 renewals. As of October 2026 the rules for Indian applicants are:',
            },
            {
              type: 'ul',
              items: [
                'You are renewing a full-validity B1, B2 or B1/B2 visa. F-1, H-1B, H-4 and other categories now need an interview.',
                'The previous visa expired less than 12 months ago, and you were at least 18 when it was issued.',
                'You have never been refused a US visa, unless that refusal was overcome or waived.',
                'You have no ineligibility findings on your record.',
                'You apply in your country of nationality or residence and are physically in India when applying from India.',
              ],
            },
            {
              type: 'p',
              text: 'Eligibility does not guarantee that the officer approves via drop-box, they can still ask you to appear for an interview. Check your eligibility before you book, because if you are called for an interview you join the regular interview queue.',
            },
          ],
        },
        {
          h2: 'US visa validity, duration of stay, and multiple entries',
          body: [
            {
              type: 'p',
              text: 'This is where every applicant gets confused. The US visa has three separate time-related fields, and they do not mean the same thing.',
            },
            { type: 'h3', text: 'Visa validity (the sticker in your passport)' },
            {
              type: 'p',
              text: 'For Indian B1/B2 applicants, the visa is typically issued for 10 years, meaning you can use it to enter the US up to the expiry printed on the sticker. This is the longest validity the US grants any nationality.',
            },
            { type: 'h3', text: 'Duration of stay (decided at the airport, not the embassy)' },
            {
              type: 'p',
              text: 'The visa lets you travel to a US port of entry. The Customs and Border Protection officer at that port decides how long you can stay, marked on your I-94 record. B1/B2 usually gets 6 months per entry; the officer can grant less if your itinerary suggests you need less, or more only in exceptional cases with prior approval.',
            },
            { type: 'h3', text: 'Number of entries (multiple, in almost all cases)' },
            {
              type: 'p',
              text: 'B1/B2 visas issued to Indian nationals are almost always multiple-entry, meaning you can enter and exit the US as many times as you want within the 10-year validity. Some rarer categories (like C-1 transit) are single-entry.',
            },
          ],
        },
        {
          h2: 'Why hire Travlys instead of applying yourself',
          body: [
            {
              type: 'p',
              text: 'Applying for a US visa yourself is legal and free (the $185 MRV goes straight to the embassy). If you have a strong profile, an unshakeable travel history and an obvious return-to-India story, you should try. Most Indian applicants do not fit that description on their first US visa, and that is where we help.',
            },
            {
              type: 'p',
              text: 'What our fee actually buys you:',
            },
            {
              type: 'ul',
              items: [
                'A DS-160 that has been reviewed by someone who has read thousands of these, cross-checked against your bank statements, employer letter and travel history for silent contradictions.',
                'A cover letter and itinerary that presents your trip the way officers assess it, not the way travel-agent templates format it.',
                'Two mock interviews with the exact question sequence Delhi / Mumbai / Chennai / Hyderabad / Kolkata are running this quarter, based on active case data.',
                'Appointment hunting across all posts you are legally allowed to appear at, until we find the earliest slot.',
                'A named specialist who stays on your file from brief to decision, so you do not re-explain your story to a ticket queue.',
                'Post-interview support: if you get 221(g), we know exactly what to send and how to package it.',
              ],
            },
            {
              type: 'p',
              text: 'The candid math: our fee is ₹19,940. A US visa refusal costs you the $185 MRV plus your travel time to the post, and it makes the next application harder because "previous refusal" is now on your record. If our involvement moves your approval odds by 20 percentage points, the expected value is very much in your favour. If you already have a 95% profile, save the money and self-file, we will tell you so at the free consult.',
            },
            {
              type: 'callout',
              label: 'Next step',
              text: 'Send us your passport bio page, current CV and travel history on WhatsApp (+91 82009 18967). We come back within one working day with a route, timeline, quote and honest read on your odds. No obligation to proceed.',
            },
          ],
        },
      ],
    },
  },
  {
    name: 'United Kingdom',
    slug: 'uk-visa',
    code: 'GB',
    flag: '🇬🇧',
    accent: '#c91432',
    region: 'Europe',
    visaType: 'Embassy Visa',
    processingTime: '3 weeks (Standard)',
    processingTimeShort: '~3 wks',
    validity: '6 months - 10 years',
    stayDuration: 'Up to 6 months / visit',
    entryType: 'Multiple',
    price: 'From ₹12,950',
    priceValue: 12950,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=900&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=1600&h=900&fit=crop',
    tagline: 'Standard Visitor, Student & Skilled Worker',
    description:
      'UKVI online application drafted by visa-trained writers, VFS appointment booking, TB-test guidance for long-stay routes, and a structured cover letter that addresses the genuine-visitor test.',
    subtitle: 'UKVI applications handled end-to-end',
    aboutTitle: 'About the UK visa for Indian travelers',
    aboutText:
      'Indian nationals need a UK visa for visits, study, work and family travel. Applications run through the UKVI online portal followed by VFS biometrics in India. We focus on the genuine-visitor test, financial credibility, travel history and clear travel purpose, which is what UKVI decision-makers actually weigh.',
    metaTitle: 'UK Visa from India 2026: Standard Visitor in 3 Weeks | Travlys',
    metaDescription:
      'Apply for a UK visa from India in 3 weeks with Travlys. UKVI form, VFS biometrics, TB-test guidance and visa-grade cover letters for Standard Visitor, Student and Skilled Worker, from ₹12,950.',
    keywords:
      'uk visa from india, uk standard visitor visa, uk student visa, uk skilled worker visa, ukvi india, uk tb test, uk visa consultants india',
    includes: [
      'UKVI online form preparation',
      'Visa-grade cover letter & sponsor letter templates',
      'VFS appointment + biometrics booking',
      'TB-test clinic referrals (long-stay routes)',
      'Priority / Super Priority advice where eligible',
    ],
    faqs: [
      { q: 'How long does a UK visa take from India?', a: 'Standard processing is around 3 weeks from biometrics. Priority (5 working days) and Super Priority (next working day) are available where slots exist, we’ll advise based on your travel dates.' },
      { q: 'Do I need a TB test for a UK visa?', a: 'Yes, Indian applicants coming to the UK for 6 months or more must submit a TB test certificate from a UKVI-approved clinic. We refer you to one near you.' },
      { q: 'What is the Standard Visitor Visa?', a: 'It’s the visa most leisure and business travelers use, valid for tourism, business meetings, short courses, and certain medical visits up to 6 months per stay.' },
      { q: 'How much do you charge for UK visa help?', a: 'Service starts at ₹12,950 for the Standard Visitor Visa. UKVI fees and VFS charges are paid separately to the respective authorities.' },
    ],
    categories: [
      { name: 'Standard Visitor', purpose: 'Tourism, business, medical, short courses', description: 'Up to 6 months per stay; long-validity options (2/5/10 years) available with travel history.' },
      { name: 'Student', purpose: 'Full-time study', description: 'For students with a CAS from a licensed student sponsor in the UK.' },
      { name: 'Skilled Worker', purpose: 'Sponsored employment', description: 'For professionals with a Certificate of Sponsorship from a licensed UK employer at the required skill level.' },
    ],
    processSteps: [
      'Profile assessment and route advice (Visitor vs Long-validity vs Family).',
      'UKVI form draft + sponsor/cover letter shaped to your travel purpose.',
      'Document set assembled with finance, ties and itinerary evidence.',
      'VFS appointment booked at your nearest centre.',
      'Biometrics day support and document submission walkthrough.',
      'Decision tracking and passport return coordination.',
    ],
    documents: [
      'Passport (6+ months validity)',
      'UKVI application reference + appointment slip',
      'Recent passport photographs',
      'Bank statements (last 6 months), ITR (last 2 years)',
      'Employment letter and salary slips',
      'Travel itinerary and accommodation bookings',
      'TB test certificate (for stays of 6 months or more)',
    ],
    relatedDestinations: ['usa-visa', 'netherlands-visa', 'canada-visa', 'australia-visa', 'singapore-visa', 'uae-visa'],
  },
  {
    name: 'Canada',
    slug: 'canada-visa',
    code: 'CA',
    flag: '🇨🇦',
    accent: '#d62828',
    region: 'Americas',
    visaType: 'Embassy Visa',
    processingTime: '4-8 weeks',
    processingTimeShort: '4-8 wks',
    validity: 'Up to 10 years',
    stayDuration: 'Up to 6 months / visit',
    entryType: 'Multiple',
    price: 'From ₹14,950',
    priceValue: 14950,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=900&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1519832979-6fa011b87667?w=1600&h=900&fit=crop',
    tagline: 'Visitor, Study Permit, Work Permit',
    description:
      'IRCC applications across Visitor (TRV), Study Permit and Work Permit streams, biometrics booking, financial-sufficiency framing and a narrative that addresses dual-intent concerns clearly.',
    subtitle: 'Visitor visas, study permits and work permits',
    aboutTitle: 'About the Canada visa for Indian travelers',
    aboutText:
      'Indians need either a Visitor Visa (TRV), Study Permit, or Work Permit depending on travel purpose. IRCC decisions weigh financial proof, ties to India and a credible travel purpose. We frame your file to address dual-intent and refusal-risk factors head-on.',
    metaTitle: 'Canada Visa from India 2026: Visitor, Study & Work | Travlys',
    metaDescription:
      'Apply for a Canada visa, study permit or work permit from India with Travlys. IRCC drafting, biometrics at VFS, financial sufficiency framing and refusal-risk review from ₹14,950.',
    keywords:
      'canada visa from india, canada visitor visa, canada study permit, canada work permit, ircc india, canada visa consultants, canada eta, canada biometrics india',
    includes: [
      'IRCC application drafting',
      'SOP (Statement of Purpose) review',
      'Biometrics appointment at VFS',
      'Financial sufficiency framing',
      'Refusal-risk pre-check',
    ],
    faqs: [
      { q: 'Do Indians need a visa for Canada?', a: 'Yes, Indian passport holders need a TRV (visitor visa), study permit or work permit. eTA is generally not available for Indian passport holders.' },
      { q: 'How long does the Canada visitor visa take?', a: 'Typical IRCC processing from India runs 4-8 weeks once biometrics are submitted. Peak season can extend this.' },
      { q: 'Is biometrics required for Canada visas in India?', a: 'Yes, most applicants in India give biometrics at a VFS centre. Biometrics stay valid for 10 years, so if you gave them recently you may not need to give them again.' },
      { q: 'How much does Travlys charge for Canada visa help?', a: 'Service starts at ₹14,950 for visitor visas. IRCC and VFS fees are paid separately to the authorities.' },
    ],
    categories: [
      { name: 'Visitor Visa (TRV)', purpose: 'Tourism, family visits', description: 'Multiple-entry visa valid up to 10 years or passport expiry, with stays up to 6 months per visit.' },
      { name: 'Study Permit', purpose: 'Study at a DLI', description: 'For students with a Letter of Acceptance from a Designated Learning Institution and, in most cases, a provincial or territorial attestation letter (PAL/TAL).' },
      { name: 'Work Permit', purpose: 'Employment in Canada', description: 'For applicants with a valid LMIA-backed job offer or LMIA-exempt category.' },
    ],
    processSteps: [
      'Eligibility assessment and route recommendation.',
      'Document checklist with finance, employment and travel evidence.',
      'IRCC online application drafted and reviewed.',
      'Biometrics appointment booked at nearest VFS.',
      'Application submitted and tracked through GCKey/IRCC portal.',
      'Passport submission for visa stamping after approval.',
    ],
    documents: [
      'Passport with 6+ months validity',
      'IRCC photo (35×45 mm with neutral background)',
      'Bank statements (6 months), ITR (2 years)',
      'Travel history and previous visas',
      'Employment letter and salary slips',
      'Purpose of visit documentation (invitation, itinerary)',
      'Property / asset proof where available',
    ],
    relatedDestinations: ['usa-visa', 'uk-visa', 'australia-visa', 'new-zealand-visa', 'netherlands-visa', 'singapore-visa'],
  },
  {
    name: 'Australia',
    slug: 'australia-visa',
    code: 'AU',
    flag: '🇦🇺',
    accent: '#0a8754',
    region: 'Oceania',
    visaType: 'Embassy Visa',
    processingTime: '2-6 weeks',
    processingTimeShort: '2-6 wks',
    validity: '1-3 years',
    stayDuration: 'Usually 3 months, up to 12 / visit',
    entryType: 'Multiple',
    price: 'From ₹4,950',
    priceValue: 4950,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=900&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1600&h=900&fit=crop',
    tagline: 'Subclass 600, 500 & Work streams',
    description:
      'Australia visa handled through ImmiAccount with profile-tuned document evidence, biometrics support, and refusal-history review for re-applications.',
    subtitle: 'Visitor, student and work visas via ImmiAccount',
    aboutTitle: 'About the Australia visa for Indian travelers',
    aboutText:
      'Indians need a valid Australian visa for any visit. Applications run through ImmiAccount. From 26 October 2026, applicants in India may be asked to give fingerprints and a facial image at an Australian Biometrics Collection Centre (run by VFS Global) once Home Affairs emails a request. Decision-makers check that you are a genuine visitor who will stay only temporarily (for students, the Genuine Student requirement), so your file must demonstrate clear ties and a credible purpose.',
    metaTitle: 'Australia Visa from India 2026: Subclass 600 from ₹4,950 | Travlys',
    metaDescription:
      'Australia visa from India in 2-6 weeks with Travlys. Subclass 600 Visitor, 500 Student and Work streams, ImmiAccount drafting, genuine visitor and Genuine Student statement help and biometrics from ₹4,950.',
    keywords:
      'australia visa from india, subclass 600, australia student visa 500, australia work visa, immiaccount india, australia visa consultants',
    includes: [
      'ImmiAccount application setup',
      'Genuine visitor / Genuine Student statement help',
      'VFS biometrics scheduling (where required)',
      'Document review and translation pointers',
      'Status tracking until decision',
    ],
    faqs: [
      { q: 'How long does an Australia visa take from India?', a: 'Visitor visas (Subclass 600) commonly process in 2-6 weeks; student visas (500) take longer and depend on the institution and course start date.' },
      { q: 'What replaced the GTE statement?', a: 'For student visas, the Genuine Temporary Entrant (GTE) test was replaced by the Genuine Student requirement in March 2024; visitors must show they are genuine visitors who will stay only temporarily. A short written statement explaining why you’ll return to India after your visit or studies helps. It’s pivotal to approvals; we draft it with you.' },
      { q: 'Do I need biometrics for an Australia visa?', a: 'Possibly. From 26 October 2026, applicants for an Australian visa in India may be asked to give fingerprints and a facial image. It applies only to applications lodged on or after that date. Do not book anything until the Department of Home Affairs emails you or your agent a biometrics request. Then visit an Australian Biometrics Collection Centre run by VFS Global, or, if you have given biometrics at a centre before and hold a valid passport, you may be able to use the free Australian Immi App. Giving biometrics promptly should not slow your application. We book the appointment for you.' },
      { q: 'How much does Travlys charge for an Australia visa?', a: 'Service starts at ₹4,950 for the visitor stream. DHA visa application charges (VAC) are paid separately.' },
    ],
    categories: [
      { name: 'Visitor Visa (600)', purpose: 'Tourism, family', description: 'Tourist or Sponsored Family stream for short visits, with multiple-entry validity up to 3 years.' },
      { name: 'Student Visa (500)', purpose: 'Full-time study', description: 'For students enrolled in CRICOS-registered Australian courses.' },
      { name: 'Skilled / Work', purpose: 'Sponsored employment', description: 'Multiple streams under Skills in Demand (482) and Skilled Independent (189) categories.' },
    ],
    processSteps: [
      'Eligibility and stream selection (Visitor / Student / Work).',
      'Document set built around the genuine visitor or Genuine Student requirement.',
      'ImmiAccount registered and application drafted.',
      'Submission and fees, then biometrics at an ABCC or via the Australian Immi App once Home Affairs asks.',
      'Status tracking via ImmiAccount until decision.',
      'Visa grant notification and travel-prep handover.',
    ],
    documents: [
      'Passport with 6+ months validity',
      'Digital passport-style photograph',
      'Travel insurance (recommended for visitors)',
      'Bank statements (6 months), ITR (2 years)',
      'Employment letter and salary slips',
      'Invitation letter (for sponsored family stream)',
      'Genuine visitor / Genuine Student statement (drafted with us)',
    ],
    relatedDestinations: ['new-zealand-visa', 'singapore-visa', 'uk-visa', 'canada-visa', 'usa-visa', 'malaysia-visa'],
  },
  {
    name: 'Schengen (Netherlands)',
    slug: 'netherlands-visa',
    code: 'NL',
    flag: '🇳🇱',
    accent: '#ff7849',
    region: 'Europe',
    visaType: 'Schengen Visa',
    processingTime: '18-21 days (up to 45)',
    processingTimeShort: '18-21 d',
    validity: 'Up to 5 years',
    stayDuration: '90 days in any 180',
    entryType: 'Multiple',
    price: 'From ₹2,950',
    priceValue: 2950,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=900&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1600&h=900&fit=crop',
    tagline: 'Schengen via Netherlands, 29 countries unlocked',
    description:
      'Netherlands-issued Schengen visa with travel-insurance bundles, VFS appointment booking and a cover letter that maps your itinerary to the main-destination rule.',
    subtitle: 'Schengen via the Netherlands, clean, fast, well-documented',
    aboutTitle: 'About the Netherlands Schengen visa',
    aboutText:
      'A Netherlands-issued Schengen short-stay visa lets you travel across all 29 Schengen states for up to 90 days in any 180-day period. The main-destination rule applies, you must apply through the country where you’ll spend the most time. Travlys aligns your itinerary, accommodation and cover letter to make that case cleanly.',
    metaTitle: 'Schengen Visa from India 2026: ₹2,950, 18-21 Day Processing | Travlys',
    metaDescription:
      'Get a Netherlands Schengen visa from India in about 18-21 days from ₹2,950. Travlys handles VFS appointment booking, €30,000+ travel insurance, biometrics and visa-grade cover letter.',
    keywords:
      'netherlands visa from india, schengen visa india, netherlands schengen visa, vfs netherlands appointment, schengen visa insurance, schengen visa consultants',
    includes: [
      'Schengen application form preparation',
      'VFS appointment booking',
      'Travel insurance (€30,000+) sourced',
      'Cover letter aligned to itinerary',
      'Biometrics-day support',
    ],
    faqs: [
      { q: 'Is a Netherlands visa the same as a Schengen visa?', a: 'A short-stay Netherlands visa is a Schengen visa, it permits travel across all 29 Schengen countries within the granted validity and duration.' },
      { q: 'How long does the Schengen visa take?', a: 'The Netherlands currently quotes an average of 18-21 calendar days, and up to 45 in some cases. We recommend applying 6-8 weeks before travel; you can apply up to 6 months ahead.' },
      { q: 'Do I need travel insurance?', a: 'Yes, Schengen rules require travel insurance with minimum €30,000 medical cover valid across the Schengen area for the full visa duration.' },
      { q: 'How much do you charge for Schengen visa help?', a: 'Service starts at ₹2,950. The embassy fee (currently €90 / ~₹9,600) is paid separately to the embassy via VFS.' },
    ],
    categories: [
      { name: 'Tourist (Type C)', purpose: 'Tourism', description: 'Single or multiple-entry short-stay visa for leisure across the Schengen area.' },
      { name: 'Business (Type C)', purpose: 'Meetings, conferences', description: 'For business meetings, trade fairs and conferences across Schengen states.' },
      { name: 'Family / Friend Visit', purpose: 'Visiting relatives', description: 'Requires an invitation letter from your host in the Schengen country.' },
    ],
    processSteps: [
      'Main-destination check and itinerary build.',
      'Form, cover letter and supporting evidence assembled.',
      'Travel insurance (€30,000+) sourced and added to file.',
      'VFS appointment booked, biometrics-day pack issued.',
      'Application submitted with full file.',
      'Decision tracked; passport return arranged after.',
    ],
    documents: [
      'Passport (valid 3+ months after leaving Schengen, issued within 10 years, 2 blank pages)',
      'Schengen application form (signed)',
      'Photo taken at the VFS appointment (no printed photo needed)',
      'Travel insurance with €30,000+ cover',
      'Confirmed flight itinerary (no advance ticket purchase needed)',
      'Hotel bookings for full stay',
      'Bank statements (6 months), ITR (2 years)',
      'Cover letter (drafted with us)',
    ],
    relatedDestinations: ['uk-visa', 'usa-visa', 'singapore-visa', 'uae-visa', 'australia-visa', 'thailand-visa'],
  },
  {
    name: 'Singapore',
    slug: 'singapore-visa',
    code: 'SG',
    flag: '🇸🇬',
    accent: '#ed2939',
    region: 'Asia',
    visaType: 'e-Visa',
    processingTime: '3-5 working days',
    processingTimeShort: '3-5 d',
    validity: 'Up to 2 years',
    stayDuration: 'Decided by ICA on arrival (shown on your e-Pass)',
    entryType: 'Multiple',
    price: 'From ₹2,950',
    priceValue: 2950,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=900&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=1600&h=900&fit=crop',
    tagline: 'e-Visa in 3-5 working days',
    description:
      'Singapore e-Visa with end-to-end documentation, ICA submission and PDF visa delivered straight to your inbox.',
    subtitle: 'Singapore e-Visa, sorted in a week',
    aboutTitle: 'About the Singapore e-Visa',
    aboutText:
      'Indian passport holders need a visa for Singapore. Applications go through an authorised visa agent of the Singapore High Commission, who submits them online; decisions usually arrive in 3-5 working days. We take care of file accuracy and the financial sufficiency narrative ICA looks for.',
    metaTitle: 'Singapore Visa from India 2026: e-Visa in 3-5 Days, ₹2,950 | Travlys',
    metaDescription:
      'Singapore e-Visa from India in 3-5 working days from ₹2,950. Travlys handles ICA submission, document quality check, query handling and email delivery of your approved e-Visa PDF.',
    keywords:
      'singapore visa from india, singapore e-visa, singapore tourist visa, singapore visa fee, singapore evisa consultants',
    includes: [
      'e-Visa application drafted and submitted',
      'Document set review and quality check',
      'ICA query handling',
      'PDF e-Visa email delivery',
      'Travel-day support',
    ],
    faqs: [
      { q: 'How long does a Singapore e-Visa take from India?', a: 'Typically 3-5 working days when the file is complete. Same-day decisions occur but are not guaranteed.' },
      { q: 'How much does it cost?', a: 'Travlys service starts at ₹2,950; the visa processing fee of INR 2,100 is paid separately.' },
      { q: 'Documents required?', a: 'Passport, photograph, travel itinerary, hotel bookings, financial documents and an employment / sponsorship letter.' },
      { q: 'Can families apply together?', a: 'Yes, we file family applications as a single batch with a consolidated travel narrative.' },
    ],
    categories: [
      { name: 'Tourist e-Visa', purpose: 'Tourism', description: 'For leisure travel and friends-family visits, up to 30 days per stay.' },
      { name: 'Business e-Visa', purpose: 'Business', description: 'For meetings, exhibitions and trade activity in Singapore.' },
    ],
    processSteps: [
      'Document collection and quality review.',
      'e-Visa form drafted and signed digitally.',
      'Submission via authorized agent route.',
      'ICA queries handled (if any).',
      'Approved e-Visa PDF delivered to your email.',
    ],
    documents: [
      'Passport (6+ months validity)',
      'Recent digital photograph (35×45 mm, white background)',
      'Confirmed flight itinerary',
      'Hotel booking or host invitation',
      'Employment letter and bank statements',
    ],
    relatedDestinations: ['thailand-visa', 'malaysia-visa', 'uae-visa', 'usa-visa', 'australia-visa', 'netherlands-visa'],
  },
  {
    name: 'United Arab Emirates',
    slug: 'uae-visa',
    code: 'AE',
    flag: '🇦🇪',
    accent: '#00723f',
    region: 'Middle East',
    visaType: 'e-Visa',
    processingTime: '2-4 working days',
    processingTimeShort: '2-4 d',
    validity: '60 days from issue',
    stayDuration: '30 or 60 days (14 days on arrival for eligible visa holders)',
    entryType: 'Single / Multiple',
    price: 'From ₹2,500',
    priceValue: 2500,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1600&h=900&fit=crop',
    tagline: '14 / 30 / 60-day Dubai e-Visa',
    description:
      'UAE / Dubai e-Visa with quick turnaround, we file via approved channels and deliver the PDF visa to your inbox before you pack.',
    subtitle: 'Dubai e-Visa with rapid turnaround',
    aboutTitle: 'About the UAE / Dubai visa',
    aboutText:
      'Most Indian passport holders need a UAE visa approved before travel, and Travlys files tourist e-Visas, single or multiple-entry, with documentation tuned to GDRFA requirements. If you hold a valid US visa or green card, a UK or EU visa or residence permit, or a residence permit from Australia, Canada, Japan, New Zealand, South Korea or Singapore, you may instead qualify for a 14-day visa on arrival for AED 100. We check your documents first and tell you which route is cheaper and safer.',
    metaTitle: 'Dubai Visa from India 2026: 14 / 30 / 60-day from ₹2,500 | Travlys',
    metaDescription:
      'Dubai and UAE tourist e-Visa from India in 2-4 working days from ₹2,500. 14, 30 and 60-day single & multiple-entry options with full documentation and PDF visa delivered to your inbox.',
    keywords:
      'uae visa on arrival for indians, uae visa from india, dubai visa from india, dubai tourist visa, uae e-visa, dubai 30 day visa, dubai 60 day visa, transit visa uae',
    includes: [
      'e-Visa application drafted and filed',
      'Document set quality check',
      'GDRFA query handling',
      'PDF visa email delivery',
      'Validity / entry advisory',
    ],
    faqs: [
      { q: 'How fast can I get a Dubai visa?', a: 'UAE e-Visas are usually issued in 2-4 working days. Express options are available for some categories.' },
      { q: 'What’s the difference between 30 and 60 day visas?', a: '30-day visa allows a 30-day stay; 60-day allows 60. Both come in single or multiple-entry. We help pick based on your itinerary.' },
      { q: 'Do I need a visa to transit through Dubai?', a: 'If you leave the airport on a layover, you need a 48-hour or 96-hour UAE transit visa, which your airline arranges with your booking. If you stay airside, you usually do not need one. We check your route case by case.' },
      { q: 'What documents are needed?', a: 'A passport valid for at least six months, a photograph, confirmed return tickets, a hotel booking and financial proof in most cases.' },
      { q: 'Can I get a UAE visa on arrival instead of an e-Visa?', a: 'Yes, if you hold a qualifying document. Indian ordinary passport holders with a valid US visa or green card, a valid UK or EU visa or residence permit, or a valid residence permit from Australia, Canada, Japan, New Zealand, South Korea or Singapore can get a 14-day visa on arrival for AED 100, extendable once. Your passport and that document should be valid for at least six months. Without one of these, you need an e-Visa before you fly.' },
    ],
    categories: [
      { name: '14-day Tourist', purpose: 'Short tourism trips', description: 'Single-entry, valid for stays up to 14 days from arrival.' },
      { name: '30-day Tourist', purpose: 'Standard tourism', description: 'Available as single or multiple-entry; the most popular UAE category.' },
      { name: '60-day Tourist', purpose: 'Extended stays', description: 'Single or multiple-entry for longer leisure and family visits.' },
      { name: 'Transit', purpose: 'Airport transit', description: '48 or 96-hour transit visas for layovers in UAE airports.' },
    ],
    processSteps: [
      'Validity / entry-type advisory based on your itinerary.',
      'Documents collected and quality-checked.',
      'Application filed via approved channel.',
      'GDRFA query handling (if any).',
      'Approved PDF visa delivered to your inbox.',
    ],
    documents: [
      'Passport (6+ months validity)',
      'Recent passport-style photograph',
      'Confirmed return flight tickets',
      'Hotel booking confirmation',
      'Salary slip / bank statement (case-dependent)',
    ],
    relatedDestinations: ['singapore-visa', 'thailand-visa', 'malaysia-visa', 'uk-visa', 'usa-visa', 'netherlands-visa'],
  },
  {
    name: 'Thailand',
    slug: 'thailand-visa',
    code: 'TH',
    flag: '🇹🇭',
    accent: '#ed1c24',
    region: 'Asia',
    visaType: 'Visa-free 30 days / e-Visa',
    processingTime: '5-10 working days',
    processingTimeShort: '5-10 d',
    validity: '90 days from issue',
    stayDuration: '30 days visa-free; up to 60 days on e-Visa',
    entryType: 'Single',
    price: 'From ₹1,950',
    priceValue: 1950,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=900&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1600&h=900&fit=crop',
    tagline: 'Visa-free for 30 days. Tourist e-Visa or DTV for longer stays',
    description:
      'Visa-free entry for trips up to 30 days; for longer stays Travlys files the tourist e-Visa or DTV through the official Royal Thai e-Visa portal, with TDAC help.',
    subtitle: 'Visa-free for short trips, e-Visa for longer ones',
    aboutTitle: 'About the Thailand visa',
    aboutText:
      'Since 15 September 2026, Indian passport holders can visit Thailand visa-free for tourism and stay up to 30 days, with a free Thailand Digital Arrival Card (TDAC) submitted within 3 days before arrival. For longer trips, a single-entry tourist e-Visa allows up to 60 days per entry, and the Destination Thailand Visa (DTV) allows up to 180 days per entry for remote workers and freelancers. Travlys files your e-Visa or DTV on thaievisa.go.th, checks your documents, and helps you with the TDAC and itinerary.',
    metaTitle: 'Thailand Visa for Indians 2026: Visa-Free 30 Days, e-Visa Help | Travlys',
    metaDescription:
      'Indians get 30 days visa-free in Thailand since 15 September 2026. Staying longer? Travlys files the 60-day tourist e-Visa or DTV from ₹1,950, with TDAC help.',
    keywords:
      'thailand visa free for indians, thailand 30 days visa free, tdac thailand, thailand visa from india, thailand tourist e-visa, thailand evisa india, thailand visa documents, thailand visa consultants',
    includes: [
      'TDAC (Thailand Digital Arrival Card) help',
      'Royal Thai e-Visa portal filing',
      'Photograph and document validation',
      'Embassy query handling',
      'Approved e-Visa email delivery',
      'Pre-travel briefing',
    ],
    faqs: [
      { q: 'Do Indians need a visa for Thailand?', a: 'Not for a tourist trip of up to 30 days. Since 15 September 2026, Indian ordinary passport holders can enter Thailand visa-free for tourism for up to 30 days. You still need a TDAC, a hotel booking, an onward ticket within 30 days and funds of about 20,000 baht per person. For longer stays, work or study, you need a visa from thaievisa.go.th.' },
      { q: 'When should I apply for a Thai tourist e-Visa?', a: 'Apply if you want to stay more than 30 days in one visit. The single-entry tourist visa (TR) is valid for 3 months and allows up to 60 days per entry. The embassy fee is ₹3,000, and applications go only through thaievisa.go.th. Travlys prepares and files the application, from ₹1,950 (Travlys fee).' },
      { q: 'What is the Destination Thailand Visa (DTV)?', a: 'The DTV is a 5-year multiple-entry visa that allows up to 180 days per entry. It is for remote workers, freelancers and people joining activities such as wellness or sports programmes, plus their spouses and children. The embassy fee is ₹30,000. Travlys checks your eligibility and documents against the embassy\'s DTV checklist before filing.' },
      { q: 'Do I need the TDAC if I am travelling visa-free?', a: 'Yes. Every foreign traveller must submit the Thailand Digital Arrival Card online at tdac.immigration.go.th within 3 days before arrival, for every entry. It is free and is not a visa. Travlys can help you fill it in correctly with your flight and hotel details.' },
      { q: 'How much does Travlys charge?', a: 'Service starts at ₹1,950 for an e-Visa filing. The embassy fee (₹3,000 for a single-entry tourist visa) is paid separately to the Royal Thai government. For visa-free trips there is no visa fee; we can still help with the TDAC and your documents.' },
    ],
    categories: [
      { name: 'Visa-free entry', purpose: 'Tourism, up to 30 days', description: 'No visa needed for Indian passport holders since 15 September 2026. Submit the free TDAC within 3 days before arrival.' },
      { name: 'Tourist e-Visa', purpose: 'Tourism, longer trips', description: 'For trips longer than 30 days: up to 60 days per entry, valid 3 months. Embassy fee ₹3,000.' },
      { name: 'Destination Thailand Visa (DTV)', purpose: 'Remote work, long stays', description: '5-year multiple-entry visa allowing up to 180 days per entry. Embassy fee ₹30,000.' },
      { name: 'Business e-Visa', purpose: 'Business meetings', description: 'For business engagements and conferences in Thailand.' },
    ],
    processSteps: [
      'Document and photograph collection.',
      'Royal Thai e-Visa portal account setup.',
      'Application filed and fee paid.',
      'Embassy queries handled if raised.',
      'Approved e-Visa emailed for printout.',
    ],
    documents: [
      'Passport (6+ months validity)',
      'Recent photograph meeting Thai specs',
      'Confirmed flight tickets',
      'Hotel booking',
      'Bank statement (last 3 months)',
    ],
    relatedDestinations: ['singapore-visa', 'malaysia-visa', 'uae-visa', 'usa-visa', 'australia-visa', 'netherlands-visa'],
  },
  {
    name: 'New Zealand',
    slug: 'new-zealand-visa',
    code: 'NZ',
    flag: '🇳🇿',
    accent: '#00247d',
    region: 'Oceania',
    visaType: 'Embassy Visa',
    processingTime: '2-6 weeks',
    processingTimeShort: '2-6 wks',
    validity: 'Up to 3 years',
    stayDuration: 'Up to 9 months',
    entryType: 'Multiple',
    price: 'From ₹6,950',
    priceValue: 6950,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1469521669194-babb45599def?w=900&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=1600&h=900&fit=crop',
    tagline: 'Visitor, Work and Student streams',
    description:
      'Immigration New Zealand applications handled online with character / health declarations, financial proof and clean itinerary narrative.',
    subtitle: 'Immigration New Zealand applications, simplified',
    aboutTitle: 'About the New Zealand visa',
    aboutText:
      'Indians need an INZ visa for New Zealand. Applications are filed online and decided by Immigration New Zealand based on character, health and credibility of intent.',
    metaTitle: 'New Zealand Visa from India 2026: INZ Visitor from ₹6,950 | Travlys',
    metaDescription:
      'Apply for an Immigration New Zealand (INZ) visa from India, visitor, work, student, from ₹6,950. Travlys handles online drafting, character/health declarations and medical/PCC referrals.',
    keywords:
      'new zealand visa from india, nz visitor visa, new zealand work visa, new zealand student visa, immigration new zealand india',
    includes: [
      'INZ online application drafting',
      'Character / health declaration support',
      'Medical exam and PCC referrals',
      'Document set with cover note',
      'Decision tracking',
    ],
    faqs: [
      { q: 'How long does an NZ visa take from India?', a: 'INZ visitor visas typically process in 2-6 weeks; longer for work and student routes depending on documents and any additional checks.' },
      { q: 'How much do you charge?', a: 'Service starts at ₹6,950 for the visitor stream. INZ visa fees and IELTS/medical costs are paid separately.' },
      { q: 'Do I need a medical?', a: 'Medicals and police clearances are required for some categories or stays. We confirm based on your specific application.' },
    ],
    categories: [
      { name: 'Visitor Visa', purpose: 'Tourism, family', description: 'Multiple-entry: up to 6 months in any 12 months. Single-entry: up to 9 months in 18 months.' },
      { name: 'Work Visa', purpose: 'Employment', description: 'For applicants with job offers from accredited NZ employers.' },
      { name: 'Student Visa', purpose: 'Study', description: 'For students enrolled in approved NZ institutions.' },
    ],
    processSteps: [
      'Stream selection and eligibility review.',
      'Document checklist tailored to your file.',
      'INZ online application drafted.',
      'Medical and PCC scheduling (if required).',
      'Submission and tracking.',
      'Visa label / e-visa receipt.',
    ],
    documents: [
      'Passport (6+ months validity)',
      'Recent photograph',
      'Bank statements (6 months), ITR (2 years)',
      'Travel itinerary and accommodation',
      'Medical certificate (if applicable)',
      'Police clearance (if applicable)',
    ],
    relatedDestinations: ['australia-visa', 'uk-visa', 'canada-visa', 'singapore-visa', 'usa-visa', 'netherlands-visa'],
  },
  {
    name: 'Malaysia',
    slug: 'malaysia-visa',
    code: 'MY',
    flag: '🇲🇾',
    accent: '#ffcc00',
    region: 'Asia',
    visaType: 'Visa-free (until 31 Dec 2026)',
    processingTime: 'No visa needed; MDAC online',
    processingTimeShort: 'Visa-free',
    validity: 'Waiver valid until 31 Dec 2026',
    stayDuration: 'Up to 30 days',
    entryType: 'Single',
    price: 'From ₹999',
    priceValue: 999,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=900&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1567892737950-30c4db37f9eb?w=1600&h=900&fit=crop',
    tagline: 'Visa-free for 30 days until 31 December 2026',
    description:
      'Visa-free for 30 days until 31 December 2026. Travlys handles the MDAC and itinerary now, and eNTRI or e-Visa for trips the waiver does not cover.',
    subtitle: 'Visa-free now; eNTRI and e-Visa when you need them',
    aboutTitle: 'About the Malaysia visa',
    aboutText:
      'Indian passport holders can visit Malaysia visa-free for up to 30 days for business, tourism, social or transit purposes until 31 December 2026. You need a passport valid for at least six months, a confirmed return ticket and hotel booking, and the free Malaysia Digital Arrival Card (MDAC) submitted three days before arrival. Travlys helps with MDAC filing and itineraries now, and with eNTRI or eVISA applications for trips after the scheme ends or for stays the waiver does not cover.',
    metaTitle: 'Malaysia Visa for Indians 2026: Visa-Free 30 Days + MDAC | Travlys',
    metaDescription:
      'Indians can visit Malaysia visa-free for 30 days until 31 December 2026 with the free MDAC. Travlys helps with MDAC, itineraries, and eNTRI or e-Visa from ₹999.',
    keywords:
      'malaysia visa free for indians, malaysia mdac, malaysia digital arrival card, malaysia visa from india, malaysia entri, malaysia evisa, malaysia tourist visa, malaysia visa documents',
    includes: [
      'MDAC (Malaysia Digital Arrival Card) filing',
      'eNTRI / e-Visa stream advisory',
      'Application drafted and filed',
      'Document quality check',
      'Imigresen query handling',
      'Approved visa emailed',
    ],
    faqs: [
      { q: 'Do Indians need a visa for Malaysia right now?', a: 'No, not for visits of up to 30 days until 31 December 2026. Malaysia\'s visa waiver for Indian nationals covers business, tourism, social and transit visits. You must carry a passport valid for six months, a confirmed return ticket and a hotel booking, and submit the MDAC online before you arrive. Work is not allowed.' },
      { q: 'What happens after 31 December 2026?', a: 'As of 24 October 2026, Malaysia has not announced whether the waiver will be extended. Before the waiver, Indians used eNTRI (up to 15 days per visit) or an eVISA. If your trip is in 2027, check with us or the High Commission before booking. Travlys files eNTRI or eVISA applications from ₹999 (Travlys fee) once the route is confirmed.' },
      { q: 'What is the MDAC and is it free?', a: 'The Malaysia Digital Arrival Card is a compulsory online form for foreign visitors, and it is free on the official portal, imigresen-online.imi.gov.my/mdac/main. The High Commission says Indian visitors must submit it three days before the arrival date. Avoid paid lookalike sites. Travlys can file it with you so the details match your bookings.' },
      { q: 'Can I work or stay longer than 30 days on visa-free entry?', a: 'No. The waiver allows up to 30 days and does not permit work. Paid work needs a work permit, employment pass or Visa With Reference arranged before travel, and longer visits need the right visa. Tell us your plans and Travlys will advise the correct visa and prepare the application.' },
      { q: 'How much do you charge?', a: 'Service starts at ₹999 for an eNTRI or e-Visa filing; Imigresen fees are paid separately. For visa-free trips there is no visa fee, and we can help with the MDAC and your documents.' },
    ],
    categories: [
      { name: 'Visa-free entry', purpose: 'Tourism, business, social, transit', description: 'Up to 30 days with no visa until 31 December 2026. Submit the free MDAC three days before arrival. Work is not allowed.' },
      { name: 'eNTRI', purpose: 'Short tourism', description: 'Single-entry, valid for stays up to 15 days. Direct entry to peninsular Malaysia required.' },
      { name: 'e-Visa', purpose: 'Tourism / Business', description: 'Single-entry, valid for stays up to 30 days. Allows entry through any Malaysian port.' },
    ],
    processSteps: [
      'Itinerary review and stream selection.',
      'Document collection and quality check.',
      'Application filed via official channel.',
      'Imigresen queries handled (if any).',
      'Approved e-Visa or eNTRI emailed.',
    ],
    documents: [
      'Passport (6+ months validity)',
      'Recent photograph',
      'Confirmed flight tickets (round-trip)',
      'Hotel booking',
      'Bank statement (last 3 months)',
    ],
    relatedDestinations: ['singapore-visa', 'thailand-visa', 'uae-visa', 'australia-visa', 'new-zealand-visa', 'usa-visa'],
  },
]

export const globalCountries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'New Zealand',
  'Singapore', 'Thailand', 'UAE', 'Malaysia', 'Netherlands',
  'France', 'Germany', 'Italy', 'Spain', 'Switzerland',
  'Japan', 'South Korea', 'Turkey', 'Vietnam', 'Indonesia',
]

export const regions = [
  { name: 'All', value: 'all' },
  { name: 'Asia', value: 'Asia' },
  { name: 'Europe', value: 'Europe' },
  { name: 'Americas', value: 'Americas' },
  { name: 'Oceania', value: 'Oceania' },
  { name: 'Middle East', value: 'Middle East' },
]

// Approximate government / embassy fees paid directly to the visa
// authority, separate from the Travlys service fee. INR conversions
// are indicative and shift with FX; we always show the original
// currency alongside so it stays honest.
export const GOV_FEES = {
  'usa-visa':         { native: '$185',        inr: 18100, payee: 'US embassy (MRV fee)' },
  'uk-visa':          { native: '£135',        inr: 17100, payee: 'UKVI (via VFS)' },
  'canada-visa':      { native: 'CAD 185',     inr: 12500, payee: 'IRCC + biometrics' },
  'australia-visa':   { native: 'AUD 250',     inr: 16600, payee: 'DHA (VAC)' },
  'netherlands-visa': { native: '€90',         inr: 9600,  payee: 'Embassy via VFS' },
  'singapore-visa':   { native: 'INR 2,100',   inr: 2100,  payee: 'Singapore High Commission (via authorised agent)' },
  'uae-visa':         { native: 'AED 200 + 5% VAT', inr: 5450, payee: 'GDRFA Dubai (30-day tourist visa)' },
  'thailand-visa':    { native: '₹3,000',      inr: 3000,  payee: 'Royal Thai e-Visa' },
  'new-zealand-visa': { native: 'NZD 441',     inr: 23700, payee: 'Immigration New Zealand' },
  'malaysia-visa':    { native: 'MYR 35',      inr: 700,   payee: 'Imigresen Malaysia' },
}

export function getCostBreakdown(dest) {
  const gov = GOV_FEES[dest.slug]
  if (!gov || !dest.priceValue) return null
  const total = dest.priceValue + gov.inr
  return {
    service: dest.priceValue,
    serviceLabel: dest.price,
    govNative: gov.native,
    govInr: gov.inr,
    govPayee: gov.payee,
    total,
  }
}
