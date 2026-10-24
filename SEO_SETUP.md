# Travlys SEO setup — the 6 things only you can do

The code side of SEO is already strong. Prerendered HTML, structured data, sitemap, IndexNow pings, 150+ indexable routes, deep long-form content on the US visa page. But right now `site:travlys.com` on Google returns **zero** results — Google has never been told this site exists. That is because Search Console verification has never been completed.

This document is the checklist for the 6 things nobody but you can do. Do them in order. Each takes 5–10 minutes. Together they are worth more to your ranking than everything the code does combined.

---

## 1. Verify travlys.com in Google Search Console (10 min)

Nothing else in this list matters until this is done.

1. Go to **https://search.google.com/search-console** and sign in with your business Google account.
2. Click **Add property** → pick **URL prefix** → enter `https://travlys.com`.
3. Pick the **HTML tag** verification method. Google shows a `<meta>` tag like `<meta name="google-site-verification" content="XXXXXXXXXXXX" />`.
4. Copy the value inside `content="..."` (only the token, not the whole tag).
5. Open `index.html` at the project root. Find this block:
   ```html
   <meta name="google-site-verification" content="" />
   ```
   Paste the token into the empty `content=""`.
6. Commit + push:
   ```
   npm run build
   git commit -am "SEO: add Google Search Console verification"
   git push
   ```
7. Wait ~2 minutes for GitHub Pages to redeploy, then in Search Console click **Verify**. You should see a green check.
8. **Immediately after** verification: in Search Console, click **Sitemaps** in the left nav → paste `sitemap.xml` → **Submit**.
9. Then click **URL inspection** at the top, paste `https://travlys.com/visa/usa-visa`, and click **Request indexing**. Do this same step for:
    - `https://travlys.com/`
    - `https://travlys.com/visa/usa-visa`
    - `https://travlys.com/visa/uk-visa`
    - `https://travlys.com/visa/canada-visa`
    - `https://travlys.com/from/ahmedabad`
    - `https://travlys.com/blog/us-visa-from-india-2026-complete-guide`

Search Console lets you request indexing on ~10 URLs per day. Do 5 today, 5 tomorrow.

---

## 2. Bing Webmaster Tools (10 min)

Bing powers ~7% of searches in India, plus ChatGPT search and DuckDuckGo. Free win.

1. Go to **https://www.bing.com/webmasters**.
2. Sign in, click **Add a site**, enter `https://travlys.com`.
3. Bing offers **"Import from Google Search Console"** — take that shortcut, it copies your sitemap over in one click.
4. If you want to verify manually instead: pick **HTML Meta Tag**, copy the token, paste into `<meta name="msvalidate.01" content="" />` in `index.html`, redeploy, verify.

IndexNow is already wired in this repo, so every future deploy will ping Bing directly with the list of changed URLs. Set-and-forget.

---

## 3. Google Business Profile — the local SEO gold mine (30 min)

This is the single highest-ROI thing you can do for "US visa consultant near me" and every "visa consultant in Ahmedabad" query.

1. Go to **https://business.google.com/create**.
2. Business name: **Travlys** (exactly this — don't add "Visa Consultants" as a suffix, Google penalises keyword-stuffed business names).
3. Category: **Visa consultant** (primary). Add secondary categories: **Travel agency**, **Immigration attorney**.
4. Address: `605, Shivalik Shilp II, Near Hotel ITC Narmada, Keshav Baug, Vastrapur, Ahmedabad, Gujarat 380015`. Toggle "I serve customers at their locations" ON (this makes you eligible for "near me" searches across India).
5. Service area: Add every major Indian city — Ahmedabad, Mumbai, Delhi, Bengaluru, Hyderabad, Chennai, Kolkata, Pune, Surat, Jaipur, Chandigarh, Lucknow.
6. Phone: `+91 82009 18967`. Website: `https://travlys.com`.
7. Google mails a postcard with a verification code to your Ahmedabad address. It arrives in 4–7 days. Enter the code, you're verified.
8. **After verification**, fill in every optional field: business hours (Mon–Sat 9–7), photos (at least 8: office exterior, interior, team, past clients if they consent, whiteboard case studies), services (US Visa, UK Visa, Canada Visa etc, each with a description), Q&A (pre-seed 5 questions your clients ask), posts (short weekly update).
9. **Ask every happy client for a Google review.** Send a WhatsApp with your review link. Aim for 20 reviews in the first month. This alone will move you from invisible to top-3 in the Ahmedabad local pack.

---

## 4. Directory listings (2 hours, one Saturday)

Free citations that Google reads as trust signals. Do these in one sitting.

- **JustDial**: https://www.justdial.com/free-listing (free listing form, they'll call to verify)
- **Sulekha**: https://businesses.sulekha.com
- **IndiaMart**: https://my.indiamart.com/register/
- **UrbanPro** (if you offer any coaching services): https://www.urbanpro.com
- **Yelp India**: https://biz.yelp.com/signup
- **Yellow Pages**: https://www.yellowpages.co.in
- **Tuugo**: https://www.tuugo.in
- **Trepup**: https://www.trepup.com

For every one of these, use the **exact same NAP** (Name, Address, Phone) as your Google Business Profile:
- Name: `Travlys`
- Address: `605, Shivalik Shilp II, Near Hotel ITC Narmada, Keshav Baug, Vastrapur, Ahmedabad, Gujarat 380015`
- Phone: `+91 8200918967`

Consistency across directories = trust signal to Google.

---

## 5. Backlinks — the slow, patient part (ongoing)

This is what takes 3–12 months and is the only real path to ranking for "US Visa" as a two-word head term.

**Free, high-quality:**
- Write one guest post a month for a travel or Indian expat blog. Contact: LBB Delhi, TripHobo, YourStory (travel section), Nomads Nation, LiveMint (opinion desk).
- Get quoted in a Q&A style article. **HARO** (Help A Reporter Out): sign up, respond to visa-related queries, get quoted in Times of India / Hindustan Times / Business Standard when the reporter picks you.
- Answer questions on Quora and Reddit r/india, r/IndiansAbroad, r/USvisa — with a real, useful answer, and a link to a specific Travlys blog post only where relevant. Don't spam.

**Paid:**
- Sponsor a page on an Indian travel blog (₹5–15k/month, gets you a permanent do-follow link).
- Guest post distribution services (₹8–20k per placement) — use sparingly, quality > quantity.

**Track everything:** Ahrefs has a free Webmaster Tools tier that shows every backlink pointing at travlys.com. Check it monthly.

---

## 6. Content velocity (ongoing)

Google rewards sites that publish consistently. Right now you have 6 blog posts. Publish one new post every 2 weeks and by January 2027 you'll have another 12 indexed pages driving traffic.

**Next 6 posts to write** (all designed to rank for specific long-tail queries):
1. "US visa slot open dates: when to book from India (2026)"
2. "How to answer 'why do you want to visit the US?' — 5 sample answers"
3. "Schengen visa: France or Netherlands, which embassy is easier?"
4. "Canada visitor visa refusal reasons: 2026 IRCC data"
5. "UK visa TB test: full list of approved clinics in India by city"
6. "USA visa for parents living in India: what actually works"

Each should be 1500+ words, target the exact query in the title/H1/URL, cite the actual government source, and end with a WhatsApp CTA.

---

## Realistic timeline

- **Week 1** (steps 1 & 2 done): travlys.com indexed by Google + Bing. Site appears in `site:travlys.com` searches. Ranking for **your brand name** ("Travlys") within 3–7 days.
- **Week 2–4** (step 3 done): "visa consultant in Ahmedabad" — top 3 local pack. "Travlys" brand searches — position 1.
- **Month 2–3** (steps 4, 5 in progress): Long-tail traffic starts. "us visa from Ahmedabad", "dubai visa cost from india", "DS-160 mistakes India" — page 1 achievable.
- **Month 6–12** (step 5, 6 sustained): Head terms enter page 2 → page 1. "US Visa consultant India", "US B1 B2 visa", "Schengen visa India" — page 1 targets.
- **Year 1–2**: "US Visa" (two-word head term) — page 1 attainable ONLY if backlink profile grows steadily.

Anyone who promises head-term rankings faster than this is either running a spam operation (which gets you deindexed) or lying.

---

## What the code side is already doing

You don't need to touch any of this — it just runs.

- Prerendered static HTML for all 153 routes (crawlers see full content, not React shell).
- Route-specific `<title>`, `<meta>`, canonical, hreflang on every page.
- JSON-LD structured data: `Organization`, `LocalBusiness`, `TravelAgency`, `WebPage`, `BreadcrumbList`, `Service`, `AggregateOffer`, `FAQPage`, `HowTo`, `BlogPosting`, `Review`, `SiteNavigationElement`, `Place`.
- Sitemap.xml regenerated on every build with today's `lastmod`, plus image sitemap entries.
- Human-readable `sitemap.html` for both users and crawler crawl-budget prioritisation.
- `llms.txt` for AI search tools (ChatGPT, Perplexity, Claude).
- `robots.txt` with explicit allow for Googlebot, Bingbot, GPTBot, ClaudeBot, PerplexityBot.
- IndexNow ping on every CI deploy — Bing, Yandex, Naver, Seznam get the URL list immediately.
- 2000+ word long-form guide on `/visa/usa-visa` targeting the exact "US visa from India" cluster.
- 6 long-form blog posts targeting DS-160 mistakes, Dubai cost, Schengen checklist, DIY vs consultant, refusal reasons, and the US visa complete guide.
- LCP hero preload + font-display swap for Core Web Vitals.

Every deploy re-pings IndexNow and refreshes lastmod. So once the manual steps above are done, indexing accelerates automatically.

---

**One-line summary:** Do step 1 today. Everything else compounds from there.

---

## AEO: getting named by ChatGPT, Gemini, Claude and Perplexity

The code side is in place:

- **Real text in every page's HTML.** AI crawlers don't run JavaScript. The build now writes each page's full content into its HTML, so GPTBot, ClaudeBot and PerplexityBot read the same text visitors see.
- **`/llms.txt` and `/llms-full.txt`.** `llms.txt` is a short brief for AI assistants (who Travlys is, key facts, every page). `llms-full.txt` is the full text of the main pages. Both regenerate on every build.
- **`robots.txt`** explicitly allows every major AI crawler.
- **`/visa-questions/`**: every question the site answers, on one page, with the answers printed in full. This is the page AI assistants are most likely to quote.

What only you can do:

1. **Link your profiles.** Open `src/seo/config.js`, find `SAME_AS_PROFILES`, and add the URL of every profile Travlys owns (Google Business Profile, Instagram, LinkedIn, Facebook, JustDial). AI assistants use these links to confirm that the website and the profiles are the same business.
2. **Collect Google reviews.** AI assistants lean heavily on reviews when recommending a business. Once you have real Google reviews, they can be added to the site and its structured data. Don't add rating numbers without reviews to back them.
3. **Test it monthly.** Ask ChatGPT, Gemini and Perplexity "best visa consultant in Ahmedabad" and "how much does a US visa cost from India". Note whether Travlys is named, and which pages get cited.
4. **Write more deep guides.** Only the US visa page has a long guide (about 19,000 characters). The other nine countries have about 3,000 each. A full guide for UK, Canada, Schengen and Dubai, like the US one, is the biggest content win left.
