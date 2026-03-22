import { Link } from 'react-router-dom'
import { ArrowRight, Globe, Briefcase, Users, CheckCircle, Phone, Mail, MessageCircle, Plane, Building, MapPin } from 'lucide-react'
import { destinations, globalCountries } from '../data/destinations'

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[600px] flex items-center justify-center text-center text-white"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=900&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 py-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Visa Assistance Made Easy</h1>
          <p className="text-lg md:text-xl font-medium mb-3 text-slate-200">Simple, reliable, and stress-free visa solutions</p>
          <p className="text-sm md:text-base text-slate-300 mb-8 max-w-2xl mx-auto">We provide professional visa assistance services for travelers across the globe. From documentation to submission, our experts ensure a smooth and hassle-free visa experience.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 border-2 border-white text-white bg-transparent rounded-lg font-medium hover:bg-white hover:text-slate-900 transition-colors flex items-center justify-center gap-2 cursor-pointer">
              Explore Visa Options <ArrowRight className="w-4 h-4" />
            </button>
            <a href="https://wa.me/918200918967" className="px-8 py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 no-underline transition-colors text-center">
              Get Assistance
            </a>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section id="destinations" className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-12">Most Requested Visa Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map(d => (
            <Link key={d.slug} to={`/visa/${d.slug}`} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow no-underline">
              <div className="relative h-48 overflow-hidden">
                <img src={d.image} alt={`${d.name} destination`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white text-lg font-semibold">{d.name}</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
                  <span>{d.processingTime}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                </div>
                <div>
                  <span className="text-xs text-slate-400">Starting from</span>
                  <p className="text-lg font-semibold text-slate-800">{d.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Visa Types */}
      <section id="visa-types" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-12">Understanding Visa Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Globe, title: 'Tourist Visa', desc: 'A Tourist Visa permits travelers to visit a foreign country for leisure activities such as sightseeing, vacations, or visiting friends and family. We assist with the complete application process to ensure accuracy and timely submission.' },
              { icon: Briefcase, title: 'Business Visa', desc: 'A Business Visa is issued to individuals traveling abroad for professional engagements such as meetings, conferences, exhibitions, or trade-related activities. Our team supports you with documentation and procedural requirements.' },
              { icon: Users, title: 'Employment Visa', desc: 'An Employment Visa allows foreign nationals to legally work in another country for a specific duration. We guide applicants through eligibility checks, employer documentation, and application filing.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-8 shadow-sm">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-slate-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-12">What Makes Us a Trusted Visa Partner</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {[
            'Visa consultancy services for multiple countries',
            'Complete end-to-end visa application support',
            'Experienced professionals handling documentation',
            'Secure and confidential handling of client data',
            'Transparent guidance throughout the process',
            'Proven expertise across tourist, business, and work visas',
          ].map(item => (
            <div key={item} className="flex items-start gap-3 p-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
              <span className="text-slate-600">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-12">How Our Visa Process Works</h2>
          <div className="space-y-6">
            {[
              'Initial consultation and visa eligibility assessment',
              'Guidance on required documents',
              'Application preparation and verification',
              'Submission and appointment support (if required)',
              'Ongoing tracking and status updates',
              'Final passport and visa outcome communication',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center text-sm font-semibold shrink-0">{i + 1}</div>
                <p className="text-slate-600 pt-2">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Coverage */}
      <section className="py-16 max-w-7xl mx-auto px-4 text-center overflow-hidden">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Global Visa Coverage</h2>
        <p className="text-slate-500 mb-10">We provide visa assistance for a wide range of international destinations including:</p>
        <div className="overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...globalCountries, ...globalCountries].map((country, i) => (
              <span key={i} className="inline-block px-5 py-2.5 mx-2 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">{country}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 text-white"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=1600&h=600&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-slate-900/70" />
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Planning International Travel?</h2>
          <p className="text-slate-300 mb-8">Let our visa specialists handle the complexities while you focus on your journey. Reach out today to begin your visa application with confidence.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://wa.me/918200918967" className="px-8 py-3 border-2 border-white text-white bg-transparent rounded-lg font-medium hover:bg-white hover:text-slate-900 transition-colors no-underline text-center">
              Speak With an Expert
            </a>
            <button onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-white text-slate-800 rounded-lg font-medium hover:bg-slate-100 transition-colors cursor-pointer border-none">
              Apply for Visa
            </button>
          </div>
        </div>
      </section>

      {/* More Services */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-12">More Travel Services We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Plane, title: 'Holiday Packages', desc: 'Domestic and international travel packages designed to suit your preferences' },
            { icon: Building, title: 'Flight Bookings', desc: 'Assistance with domestic and international air ticket bookings' },
            { icon: MapPin, title: 'Hotel & Accommodation', desc: 'Booking support for hotels, resorts, and vacation stays at competitive prices' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-sky-50 rounded-lg flex items-center justify-center mb-6">
                <Icon className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-10">Get in Touch</h2>
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="flex flex-col sm:flex-row justify-center gap-8 mb-8">
              <a href="tel:+918200918967" className="flex flex-col items-center gap-2 text-slate-600 hover:text-slate-900 no-underline">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-sm">8200918967</span>
              </a>
              <a href="mailto:info@travlys.com" className="flex flex-col items-center gap-2 text-slate-600 hover:text-slate-900 no-underline">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-sm">info@travlys.com</span>
              </a>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/918200918967" className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 no-underline transition-colors">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <a href="tel:+918200918967" className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-slate-800 text-slate-800 rounded-lg font-medium hover:bg-slate-800 hover:text-white no-underline transition-colors">
                <Phone className="w-4 h-4" /> Call Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
