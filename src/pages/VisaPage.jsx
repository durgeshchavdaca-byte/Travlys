import { useParams, Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Phone, MessageCircle, ChevronRight } from 'lucide-react'
import { destinations } from '../data/destinations'

export default function VisaPage() {
  const { slug } = useParams()
  const dest = destinations.find(d => d.slug === slug)

  if (!dest) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Destination Not Found</h1>
          <Link to="/" className="text-sky-600 hover:underline">Go back home</Link>
        </div>
      </div>
    )
  }

  const related = dest.relatedDestinations
    .map(s => destinations.find(d => d.slug === s))
    .filter(Boolean)

  return (
    <>
      {/* Breadcrumb */}
      <nav className="bg-slate-50 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-slate-500">
          <Link to="/" className="hover:text-slate-700 no-underline text-slate-500">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-500">Visa Destinations</span>
          <ChevronRight className="w-3 h-3" />
          <span className="font-medium text-slate-800">{dest.name} Visa</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[500px] flex items-center"
        style={{ backgroundImage: `url(${dest.image.replace('w=600&h=400', 'w=1600&h=900')})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
          <span className="inline-block px-3 py-1 bg-white/20 text-white text-sm rounded-full mb-4 backdrop-blur-sm">{dest.processingTime}</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">{dest.name} Visa Support</h1>
          <p className="text-lg text-slate-200 font-medium mb-4">{dest.subtitle}</p>
          <p className="text-slate-300 max-w-2xl mb-8 text-sm leading-relaxed">{dest.description}</p>
          <a href="https://wa.me/918200918967" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-slate-800 rounded-lg font-medium hover:bg-slate-100 no-underline transition-colors">
            Get Visa Guidance <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* About */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">{dest.aboutTitle}</h2>
        <p className="text-slate-600 leading-relaxed">{dest.aboutText}</p>
      </section>

      {/* Visa Categories */}
      {dest.categories && dest.categories.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 text-center">{dest.name} Visa Categories</h2>
            <p className="text-slate-500 text-center mb-10">Common visa categories for Indian applicants</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dest.categories.map((cat, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-800 mb-1">{cat.name}</h3>
                  <p className="text-sm text-sky-600 mb-3">{cat.purpose}</p>
                  <p className="text-sm text-slate-500 leading-relaxed">{cat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Steps */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 text-center">Visa Application Process</h2>
          <p className="text-slate-500 text-center mb-10">How we support you through each step</p>
          <div className="space-y-6">
            {dest.processSteps.map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center text-sm font-semibold shrink-0">{i + 1}</div>
                <div className="pt-2">
                  <p className="text-slate-600">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-10 text-center">Documentation Requirements</h2>
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-4">Common Requirements</h3>
            <div className="space-y-3">
              {dest.documents.map((doc, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-slate-600 text-sm">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Guidance */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">Need Assistance with Your {dest.name} Visa?</h2>
          <p className="text-slate-500 mb-8">Our visa specialists can provide guidance on your visa application. Reach out to discuss your specific situation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/918200918967" className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 no-underline transition-colors">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <a href="tel:+918200918967" className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-slate-800 text-slate-800 rounded-lg font-medium hover:bg-slate-800 hover:text-white no-underline transition-colors">
              <Phone className="w-4 h-4" /> Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Related Destinations */}
      {related.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 text-center mb-10">Explore Other Destinations</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {related.map(r => (
                <Link key={r.slug} to={`/visa/${r.slug}`} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow no-underline group">
                  <div className="h-24 overflow-hidden">
                    <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <p className="text-center text-sm font-medium text-slate-700 py-3">{r.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
