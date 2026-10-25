import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Download, Table2 } from 'lucide-react'
import { HeroBlobs, TextReveal } from '../components/MotionGraphics'
import SEO from '../components/SEO'
import Flag from '../components/Flag'
import { destinations } from '../data/destinations'
import { VISA_FEE_ROWS } from '../data/visaFees'
import { VISA_FEES_META, VISA_FEES_FAQS, buildVisaFeesSchemas } from '../seo/pages'

const inr = (n) => (n ? `₹${n.toLocaleString('en-IN')}` : '—')

export default function VisaFeesPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      <SEO {...VISA_FEES_META} jsonLd={buildVisaFeesSchemas()} />

      {/* HERO */}
      <section className="relative pt-32 pb-14 md:pt-40 md:pb-16 overflow-hidden mesh-warm">
        <HeroBlobs />
        <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
        <div className="relative z-10 container-app">
          <div className="max-w-3xl">
            <span className="pill bg-white border border-line text-ink-900">
              <Table2 className="w-3.5 h-3.5 text-coral-500" /> Updated 25 October 2026
            </span>
            <h1 className="font-display text-[2.4rem] sm:text-5xl md:text-[3.4rem] font-extrabold text-ink-900 mt-5 leading-[1.05]">
              <TextReveal text="Visa fees for Indians," as="span" />
              <br />
              <span className="hero-italic-mark">
                <span className="relative italic text-ink-900">every country, one table.</span>
              </span>
            </h1>
            <p className="text-slate-muted mt-5 text-[1.05rem] max-w-2xl leading-relaxed">
              The government fee, processing time, validity and entry rule for Indian passport
              holders, for every country Travlys handles. Each row links to the official source
              it was checked against. Free to use and share with credit to Travlys.
            </p>
            <a href="/data/visa-fees-for-indians-2026.csv" className="btn btn-ghost mt-6 inline-flex items-center gap-2 no-underline">
              <Download className="w-4 h-4" /> Download as CSV
            </a>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="py-14 bg-sand-50 border-t border-line">
        <div className="container-app">
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead className="bg-ink-950 text-white">
                  <tr>
                    {['Country', 'Visa needed?', 'Entry route', 'Government fee', '≈ INR', 'Processing', 'Stay', 'Travlys fee', 'Source'].map((h) => (
                      <th key={h} className="py-3.5 px-4 font-semibold whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {VISA_FEE_ROWS.map((r) => {
                    const d = destinations.find((x) => x.slug === r.slug)
                    return (
                      <tr key={r.slug} className="border-t border-line align-top">
                        <td className="py-3.5 px-4 font-semibold text-ink-900 whitespace-nowrap">
                          <Link to={`/visa/${r.slug}/`} className="no-underline text-ink-900 hover:text-coral-600 inline-flex items-center gap-2">
                            <Flag code={d.code} name={d.name} size={16} /> {r.country}
                          </Link>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">{r.needsVisa}</td>
                        <td className="py-3.5 px-4 text-slate-muted min-w-[220px]">{r.route}</td>
                        <td className="py-3.5 px-4 whitespace-nowrap">{r.governmentFee}</td>
                        <td className="py-3.5 px-4 whitespace-nowrap">{inr(r.governmentFeeInr)}</td>
                        <td className="py-3.5 px-4 min-w-[140px]">{r.processing}</td>
                        <td className="py-3.5 px-4 min-w-[140px]">{r.stay}</td>
                        <td className="py-3.5 px-4 whitespace-nowrap">{r.travlysFee}</td>
                        <td className="py-3.5 px-4">
                          <a href={r.source} target="_blank" rel="noopener noreferrer" className="text-coral-600">Official</a>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs text-slate-faint mt-4">
            Rupee amounts are approximate, at mid-October 2026 exchange rates; embassies may use their own rate.
            Government fees are paid to the embassy or immigration authority; the Travlys fee is separate.
            Rules change, so confirm on the official site before you apply.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white border-t border-line">
        <div className="container-app grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <span className="pill bg-coral-50 text-coral-600">FAQ</span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-ink-900 mt-4 leading-[1.05]">About this table.</h2>
          </div>
          <div className="lg:col-span-8">
            {VISA_FEES_FAQS.map((f) => (
              <article key={f.q} className="py-5 border-b border-line last:border-b-0">
                <h3 className="font-display text-lg font-bold text-ink-900 m-0 leading-snug">{f.q}</h3>
                <p className="text-slate-muted mt-2 text-[0.97rem] leading-relaxed m-0">{f.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
