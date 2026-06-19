import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, ChevronRight, Clock3, Calendar, MessageCircle, Plus } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { HeroBlobs } from '../components/MotionGraphics'
import { getPost, BLOG_POSTS } from '../data/blog'
import { destinations } from '../data/destinations'
import SEO from '../components/SEO'
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  buildWebPageSchema,
} from '../seo/config'

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

function renderInline(text) {
  // Render **bold** spans without bringing in a markdown lib.
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g)
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) {
      return <strong key={i} className="font-semibold text-ink-900">{p.slice(2, -2)}</strong>
    }
    return <span key={i}>{p}</span>
  })
}

function PostBody({ body }) {
  return (
    <div className="prose-travlys">
      {body.map((node, i) => {
        if (node.type === 'h2') {
          return (
            <h2
              key={i}
              className="font-display text-3xl md:text-[2rem] font-extrabold text-ink-900 mt-12 mb-4 leading-tight"
            >
              {node.text}
            </h2>
          )
        }
        if (node.type === 'h3') {
          return (
            <h3
              key={i}
              className="font-display text-xl md:text-[1.4rem] font-bold text-ink-900 mt-8 mb-3 leading-tight"
            >
              {node.text}
            </h3>
          )
        }
        if (node.type === 'p') {
          return (
            <p key={i} className="text-[1.02rem] text-slate-text mt-4 leading-[1.75]">
              {renderInline(node.text)}
            </p>
          )
        }
        if (node.type === 'ul') {
          return (
            <ul key={i} className="mt-5 space-y-2.5 list-none p-0">
              {node.items.map((item, j) => (
                <li key={j} className="flex items-start gap-3 text-[1.02rem] text-slate-text leading-[1.7]">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral-500 mt-2.5 shrink-0" />
                  <span>{renderInline(item)}</span>
                </li>
              ))}
            </ul>
          )
        }
        return null
      })}
    </div>
  )
}

function buildPostSchemas(post) {
  const pagePath = `/blog/${post.slug}`
  const canonical = `${SITE_URL}${pagePath}`
  const articleBody = post.body
    .filter((n) => n.type === 'p' || n.type === 'h2' || n.type === 'h3')
    .map((n) => n.text)
    .join('\n\n')

  return [
    buildWebPageSchema({
      title: post.metaTitle || `${post.title} | ${SITE_NAME}`,
      description: post.metaDescription || post.excerpt,
      path: pagePath,
      image: post.heroImage,
    }),
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${canonical}#post`,
      headline: post.title,
      description: post.metaDescription || post.excerpt,
      image: [post.heroImage],
      datePublished: post.date,
      dateModified: post.date,
      author: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/` },
      publisher: { '@id': `${SITE_URL}/#organization` },
      mainEntityOfPage: canonical,
      articleBody: articleBody.slice(0, 2500),
      wordCount: articleBody.split(/\s+/).length,
      inLanguage: 'en-IN',
      keywords: post.tags?.join(', '),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: post.title, item: canonical },
      ],
    },
    ...(post.faqs?.length
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: post.faqs.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          },
        ]
      : []),
  ]
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = getPost(slug)

  if (!post) {
    return (
      <>
        <SEO
          title="Article not found"
          description="That article does not exist on Travlys editorial."
          path={`/blog/${slug || ''}`}
          noindex
        />
        <div className="min-h-[60vh] flex items-center justify-center bg-sand-50">
          <div className="text-center container-app">
            <h1 className="font-display text-4xl font-extrabold text-ink-900 mb-4">Article not found</h1>
            <Link to="/blog" className="btn btn-primary">Back to blog</Link>
          </div>
        </div>
      </>
    )
  }

  const meta = {
    title: post.metaTitle || `${post.title} | ${SITE_NAME}`,
    description: post.metaDescription || post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: post.tags?.join(', '),
    type: 'article',
    image: post.heroImage,
    imageAlt: post.title,
  }

  const related = (post.related || [])
    .map((s) => BLOG_POSTS.find((p) => p.slug === s))
    .filter(Boolean)
  const ctaDest = post.cta?.slug ? destinations.find((d) => d.slug === post.cta.slug) : null

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      <SEO {...meta} jsonLd={buildPostSchemas(post)} />

      {/* HERO */}
      <section className="relative pt-28 pb-12 md:pt-36 md:pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={post.heroImage} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/85 via-ink-950/70 to-ink-950/50" />
        <HeroBlobs />

        <div className="relative z-10 container-app">
          <nav className="flex items-center gap-2 text-xs text-white/70 mb-6 flex-wrap">
            <Link to="/" className="hover:text-coral-400 no-underline text-white/70">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/blog" className="hover:text-coral-400 no-underline text-white/70">Blog</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{post.category}</span>
          </nav>

          <div className="max-w-3xl">
            <span className="pill bg-white/10 border border-white/20 text-white backdrop-blur">
              {post.category}
            </span>
            <h1 className="font-display text-3xl md:text-5xl lg:text-[3.4rem] font-extrabold text-white mt-5 leading-[1.08]">
              {post.title}
            </h1>
            <p className="text-white/85 mt-5 text-[1.08rem] max-w-2xl leading-relaxed">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-white/75">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> {fmtDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock3 className="w-3.5 h-3.5" /> {post.readMinutes} min read
              </span>
              <span>By Travlys editorial</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="py-16 bg-white">
        <div className="container-app">
          <article className="max-w-3xl mx-auto">
            <PostBody body={post.body} />

            {/* Inline CTA */}
            {ctaDest && (
              <div className="card p-6 mt-12 bg-sand-50">
                <p className="text-xs uppercase tracking-widest text-coral-500 font-semibold">Apply with Travlys</p>
                <h3 className="font-display text-xl font-extrabold text-ink-900 mt-1">
                  Ready to file a {ctaDest.name} visa?
                </h3>
                <p className="text-sm text-slate-muted mt-2">
                  From {ctaDest.price}, processing {ctaDest.processingTime}.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <Link to={`/visa/${ctaDest.slug}`} className="btn btn-primary">
                    {post.cta.label}
                  </Link>
                  <a href="https://wa.me/918200918967" className="btn btn-ghost">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                </div>
              </div>
            )}

            {/* FAQs */}
            {post.faqs?.length > 0 && (
              <div className="mt-16">
                <h2 className="font-display text-3xl font-extrabold text-ink-900 mb-6 leading-tight">
                  Frequently asked
                </h2>
                <div className="space-y-3">
                  {post.faqs.map((f, i) => (
                    <details key={i} className="faq card p-5 group">
                      <summary className="flex items-start justify-between gap-4">
                        <h3 className="font-display text-base font-bold text-ink-900 m-0 leading-snug">{f.q}</h3>
                        <span className="faq-chev w-7 h-7 rounded-full bg-sand-100 flex items-center justify-center shrink-0">
                          <Plus className="w-4 h-4 text-ink-900" />
                        </span>
                      </summary>
                      <p className="text-slate-muted mt-3 text-sm leading-relaxed">{f.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 bg-sand-50 border-t border-line">
          <div className="container-app">
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-ink-900 mb-6 leading-tight">
              More guides from Travlys editorial.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link key={r.slug} to={`/blog/${r.slug}`} className="card p-5 no-underline group h-full flex flex-col">
                  <span className="pill bg-coral-50 text-coral-600 text-[0.7rem] self-start">{r.category}</span>
                  <h3 className="font-display text-base font-extrabold text-ink-900 leading-tight mt-3 line-clamp-2">
                    {r.title}
                  </h3>
                  <p className="text-xs text-slate-muted mt-2 line-clamp-2 flex-1">{r.excerpt}</p>
                  <span className="text-xs font-semibold text-coral-500 mt-4 flex items-center gap-1">
                    Read <ArrowUpRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </motion.div>
  )
}
