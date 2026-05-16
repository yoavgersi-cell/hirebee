import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Clock, Tag } from "lucide-react"
import { POSTS, POST_CONTENT } from "@/lib/blog"
import { HireBeeLogo } from "@/components/hirebee-logo"
import { LandingNav } from "@/components/landing-nav"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = POSTS.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: `${post.title} | HireBee Blog`,
    description: post.description,
    alternates: { canonical: `https://hirebee.app/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://hirebee.app/blog/${slug}`,
      siteName: "HireBee",
      type: "article",
      publishedTime: post.isoDate,
    },
  }
}

const CATEGORY_COLORS: Record<string, string> = {
  "ATS & Job Search": "bg-teal-500/15 text-teal-300 border border-teal-500/25",
  "Resume Tips":      "bg-blue-500/15 text-blue-300 border border-blue-500/25",
  "Cover Letters":    "bg-violet-500/15 text-violet-300 border border-violet-500/25",
  "LinkedIn":         "bg-sky-500/15 text-sky-300 border border-sky-500/25",
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = POSTS.find((p) => p.slug === slug)
  if (!post) notFound()

  const content = POST_CONTENT[slug]
  if (!content) notFound()

  // Related posts: same category, excluding current
  const related = POSTS
    .filter((p) => p.slug !== slug && p.category === post.category)
    .sort((a, b) => b.isoDate.localeCompare(a.isoDate))
    .slice(0, 3)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.isoDate,
    dateModified: post.isoDate,
    author: {
      "@type": "Organization",
      name: "HireBee",
      url: "https://hirebee.app",
      logo: { "@type": "ImageObject", url: "https://hirebee.app/icon.svg" },
    },
    publisher: {
      "@type": "Organization",
      name: "HireBee",
      url: "https://hirebee.app",
      logo: { "@type": "ImageObject", url: "https://hirebee.app/icon.svg" },
    },
    url: `https://hirebee.app/blog/${slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://hirebee.app/blog/${slug}` },
    image: "https://hirebee.app/api/og",
  }

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://hirebee.app" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://hirebee.app/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://hirebee.app/blog/${slug}` },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <LandingNav />

      {/* ── Article header ── */}
      <section className="border-b border-white/6 px-6 pt-28 pb-14">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors mb-8">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to blog
          </Link>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[post.category] ?? "bg-white/10 text-white/60"}`}>
              <Tag className="w-3 h-3" /> {post.category}
            </span>
            <span className="text-xs text-white/30">{post.date}</span>
            <span className="text-white/15">·</span>
            <span className="inline-flex items-center gap-1 text-xs text-white/30">
              <Clock className="w-3 h-3" /> {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-5">{post.title}</h1>
          <p className="text-white/50 text-lg leading-relaxed">{post.description}</p>
        </div>
      </section>

      {/* ── Article body ── */}
      <main className="px-6 py-14">
        <div className="max-w-3xl mx-auto">

          {/* Inline CTA strip */}
          <div className="mb-10 rounded-xl bg-teal-500/10 border border-teal-500/20 px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-teal-300">Check your own resume score</p>
              <p className="text-xs text-white/40 mt-0.5">Paste your CV + job description. Get your ATS score in 60 seconds — free.</p>
            </div>
            <Link
              href="/analyze"
              className="shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded-full transition-colors whitespace-nowrap"
            >
              Scan free <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Article content */}
          <article className="
            text-white/70 leading-relaxed
            [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:leading-snug
            [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-white/90 [&_h3]:mt-8 [&_h3]:mb-3
            [&_p]:mb-5 [&_p]:leading-[1.85]
            [&_ul]:list-none [&_ul]:pl-0 [&_ul]:space-y-2.5 [&_ul]:mb-5
            [&_ul>li]:flex [&_ul>li]:gap-3 [&_ul>li]:before:content-['—'] [&_ul>li]:before:text-teal-500 [&_ul>li]:before:shrink-0 [&_ul>li]:before:font-bold [&_ul>li]:before:mt-0
            [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2.5 [&_ol]:mb-5 [&_ol>li]:pl-1
            [&_strong]:text-white [&_strong]:font-semibold
            [&_blockquote]:border-l-2 [&_blockquote]:border-teal-500/50 [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-white/40 [&_blockquote]:my-6
            [&_a]:text-teal-400 [&_a:hover]:underline
          ">
            {content}
          </article>

          {/* Bottom CTA */}
          <div className="mt-14 rounded-2xl bg-white/4 border border-white/8 px-8 py-10 text-center">
            <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-3 py-1 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              <span className="text-xs font-semibold text-teal-300">Free ATS Scanner</span>
            </div>
            <p className="text-white font-extrabold text-2xl mb-2">See how your resume scores</p>
            <p className="text-white/40 mb-7 max-w-sm mx-auto">Upload your CV, paste the job description, and get your ATS score with specific fixes in under a minute.</p>
            <Link
              href="/analyze"
              className="inline-flex items-center gap-2 bg-gradient-to-b from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-semibold px-7 py-3 rounded-full transition-all shadow-lg shadow-teal-500/30 active:scale-[0.98]"
            >
              Scan my resume free <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-xs text-white/20 mt-3">7-day free trial · No credit card to start</p>
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <div className="mt-14">
              <div className="flex items-center gap-4 mb-7">
                <p className="text-xs font-semibold text-white/30 uppercase tracking-widest shrink-0">Related articles</p>
                <div className="flex-1 h-px bg-white/6" />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group rounded-xl bg-white/3 border border-white/8 hover:border-white/16 hover:bg-white/5 transition-all p-5"
                  >
                    <p className="text-xs font-bold text-white/80 group-hover:text-white transition-colors leading-snug mb-2">{p.title}</p>
                    <p className="text-xs text-white/30">{p.readTime}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back link */}
          <div className="mt-12">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-white/30 hover:text-white/60 transition-colors">
              <ArrowLeft className="w-4 h-4" /> All articles
            </Link>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/6 px-6 py-8 mt-4">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-white/25">
          <div className="flex items-center gap-2">
            <HireBeeLogo size={16} />
            <span className="font-semibold text-white/40">HireBee</span>
          </div>
          <div className="flex flex-wrap gap-5">
            <Link href="/privacy" className="hover:text-white/50 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white/50 transition-colors">Terms</Link>
            <Link href="/refund" className="hover:text-white/50 transition-colors">Refunds</Link>
            <a href="mailto:hello@hirebee.app" className="hover:text-white/50 transition-colors">hello@hirebee.app</a>
          </div>
          <span>© 2026 HireBee · Operated by Planner hub</span>
        </div>
      </footer>
    </div>
  )
}
