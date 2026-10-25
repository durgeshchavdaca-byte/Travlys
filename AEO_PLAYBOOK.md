# Getting Travlys named by ChatGPT, Gemini, Claude and Perplexity

**Where things stand (25 October 2026):** the website is ready for AI assistants. Every page carries its full text in plain HTML. There is an `llms.txt` brief, an `llms-full.txt` content file, a citable visa-fees dataset, 26 sourced guides and 190 answered questions. The site's structured data now says plainly that Travlys is not Travly (travly.com).

**What is still missing:** almost everything outside the website. When we searched for "Travlys", no search engine returned travlys.com. Results showed a US app called **Travly** instead. AI assistants only name a business they can find through search and that other websites mention. The steps below fix that, in order of impact. Each has ready-to-paste text.

---

## 1. Get indexed (today, about 20 minutes)

AI assistants search the web before answering. ChatGPT and Copilot use **Bing**, Gemini uses **Google**, and Claude uses **Brave**. If the site isn't indexed, the AI can't find it.

1. **Google Search Console:** follow `SEO_SETUP.md` step 1. Paste the token into `index.html`, push, verify, then submit `sitemap.xml`.
2. **Bing Webmaster Tools:** follow `SEO_SETUP.md` step 2, and choose "Import from Google Search Console". This is the single most important step for ChatGPT.
3. **Request indexing** in both tools for these pages first:
   - https://travlys.com/
   - https://travlys.com/visa-fees/
   - https://travlys.com/visa-questions/
   - https://travlys.com/blog/visa-rule-changes-for-indians-2026-tracker/
   - https://travlys.com/visa/usa-visa/
   - https://travlys.com/from/ahmedabad/

Every deploy already pings Bing through IndexNow (the last one sent 182 URLs and got status 200). Verification makes Bing trust and crawl the site faster.

## 2. Google Business Profile and Bing Places (this week)

For "visa consultant in Ahmedabad" style questions, AI assistants rely heavily on Google and Bing business listings and their reviews.

- **Google Business Profile:** https://business.google.com/create
- **Bing Places:** https://www.bingplaces.com. Choose "Import from Google Business Profile" once Google is verified.
- **Apple Business Connect:** https://businessconnect.apple.com. This feeds Apple Maps and Siri.

**Name:** Travlys
**Primary category:** Visa consultant. **Secondary:** Travel agency.
**Address:** 605, Shivalik Shilp II, Near Hotel ITC Narmada, Keshav Baug, Vastrapur, Ahmedabad, Gujarat 380015
**Phone:** +91 82009 18967 · **Website:** https://travlys.com/ · **Hours:** Mon–Sat 9:00–19:00

**Business description (paste as is; 615 characters, within Google's 750 limit):**

> Travlys is a visa consultancy in Ahmedabad that prepares and files visas for Indian passport holders: US B1/B2, UK Standard Visitor, Canada visitor, Schengen, Australia, New Zealand, Singapore, Dubai/UAE, Thailand and Malaysia. One named specialist handles your file from document checklist to decision, with a flat service fee (from ₹999) and embassy fees paid at face value. We also plan holiday packages for Bali, Sri Lanka and more. Clients across India are served on WhatsApp and email; office visits by appointment. Free visa rule updates, a visa fees table and 190 answered visa questions are on travlys.com.

**Services to add (one per destination):** "US visa assistance", "UK visa assistance", "Canada visa assistance", "Schengen visa assistance", "Australia visa assistance", "New Zealand visa assistance", "Singapore visa assistance", "Dubai visa assistance", "Thailand visa assistance", "Malaysia travel assistance", "Visa refusal review", "Holiday packages". Use the first two sentences of each visa page's "Quick answers" as the service description.

**Q&A to post on the profile (ask, then answer as the owner):**
- *Do you help with US visa interviews?* Yes. We review your DS-160, prepare your documents and run a mock interview. US interview waits in India are currently about 6–12 months, so start early.
- *Do I need to visit your office?* No. Most clients work with us entirely on WhatsApp and email. Office visits are by appointment.
- *Can you help after a visa refusal?* Yes. Send us the refusal letter and we'll tell you honestly whether a re-application makes sense. There's no charge for the assessment.

## 3. Reviews (ongoing, the strongest trust signal)

AI assistants repeat what reviews say. Aim for 20 Google reviews in the first month, then a steady flow. Never buy reviews or write them yourself: it breaks Google's rules and AI tools discount suspicious patterns.

**WhatsApp message to send after each approved visa:**

> Congratulations on your [country] visa, [name]. If Travlys helped, would you leave a short Google review? It takes a minute and helps other travellers find us: [your Google review link]. Mentioning the visa type and how quickly it was handled is most useful. Thank you, and have a great trip.

## 4. Consistent listings everywhere (one Saturday)

Use exactly the same name, address and phone everywhere (copy the block in section 2). Mismatches confuse both search engines and AI assistants.

- JustDial: https://www.justdial.com/free-listing
- Sulekha: https://businesses.sulekha.com
- IndiaMart: https://seller.indiamart.com
- Trustpilot (free business profile): https://business.trustpilot.com
- Yelp: https://biz.yelp.com
- LinkedIn company page: https://www.linkedin.com/company/setup/new
- Instagram and Facebook business pages
- YouTube channel (short "visa rule of the week" videos work well)

**Short bio for social profiles:**

> Travlys: visa help for Indian travellers. US, UK, Canada, Schengen, Australia, Dubai and more. Ahmedabad · travlys.com · WhatsApp +91 82009 18967

**Then:** send me every profile URL. I'll add them to the website's structured data (`SAME_AS_PROFILES` in `src/seo/config.js`), which is how Google and AI tools link those profiles to travlys.com.

## 5. Be mentioned on other websites (monthly)

Mentions from other sites carry the most weight with AI assistants.

- **Media pitch:** each month, send the updated visa rule tracker to Indian travel media (Travel Trade Journal, TravTalk, Outlook Traveller, Business Today NRI desk, Times of India travel). Sample email:

  > Subject: What changed for Indian travellers' visas in [month]: a sourced tracker
  >
  > Hi [name], Travlys keeps a dated tracker of every visa and entry rule change affecting Indian passport holders, each checked against the official source: https://travlys.com/blog/visa-rule-changes-for-indians-2026-tracker/. This month: [two or three headline changes]. Happy to give a quote or answer readers' questions. [Your name], Travlys, +91 82009 18967.

- **Answer real questions:** on Quora, Reddit (r/IndiaTravel, r/f1visa, r/ukvisa, r/IWantOut) and LinkedIn, answer visa questions properly and in full, and link the relevant Travlys guide only where it genuinely helps. Always say you work at Travlys. Undisclosed self-promotion gets removed and hurts trust.
- **Offer the visa fees table** (https://travlys.com/visa-fees/, free under CC BY 4.0) to travel bloggers and student-abroad communities as a reference they can embed or cite.

## 6. Check where you stand (first Monday of each month, 15 minutes)

Ask each of ChatGPT, Gemini, Claude, Perplexity and Microsoft Copilot these questions. Note whether Travlys is named and which pages are cited.

1. Best visa consultant in Ahmedabad
2. Who can help me with a US visa from Gujarat?
3. Do Indians need a visa for Thailand in 2026?
4. How much does a UK visa cost from India in 2026?
5. Visa rule changes for Indians this month
6. What is Travlys?

Expect first results after indexing, the Business Profile and the first 10–20 reviews. That's usually 4–8 weeks, though it isn't guaranteed. No one can force an AI assistant to rank a business first; what you can do is be the best-documented and most-trusted answer.

## 7. Keep it fresh (monthly, I can do this)

- **Update the tracker.** Add the month's rule changes, update the `updated` date, and redeploy.
- **Re-check the visa fees table** against its official sources.
- **Publish two or three new guides** on whatever is trending that month.

## What I need from you to go further

- **Founder or lead consultant:** name and background (years in visa work, any IATA or other accreditation). Pages written or reviewed by a named expert are trusted more.
- **Year Travlys started.**
- **Profile links** from section 4, once created.
- **Real client reviews or testimonials** you're allowed to publish.
