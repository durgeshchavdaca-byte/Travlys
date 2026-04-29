// Customer reviews / testimonials. Add real ones below as you collect
// them — the site will automatically render them in a Reviews section
// AND emit Review JSON-LD that makes ⭐⭐⭐⭐⭐ stars eligible to appear
// next to your listings in Google search results.
//
// IMPORTANT: only add genuine reviews from real customers. Fake reviews
// can trigger a Google manual penalty.
//
// Each review supports:
//   author       — customer name (required)
//   rating       — 1-5 (required, integer or decimal)
//   date         — ISO date string e.g. "2026-04-15"
//   destination  — e.g. "USA Visa" / "Schengen Visa" (helps SEO context)
//   text         — the review body (required)
//   location     — e.g. "Mumbai, India" (optional, helps local relevance)

export const reviews = [
  // {
  //   author: 'Aarav Patel',
  //   rating: 5,
  //   date: '2026-04-12',
  //   destination: 'USA Visa',
  //   location: 'Surat, Gujarat',
  //   text: 'Travlys made my B-1/B-2 visa process completely stress-free. They prepped me for the interview and my visa was approved on the first try.',
  // },
  // ...add more
]

export const HAS_REVIEWS = reviews.length > 0
