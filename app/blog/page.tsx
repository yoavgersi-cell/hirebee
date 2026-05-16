import Link from "next/link"
import { Metadata } from "next"
import { POSTS } from "@/lib/blog"
import { HireBeeLogo } from "@/components/hirebee-logo"
import { ArrowRight } from "lucide-react"
import { LandingNav } from "@/components/landing-nav"

export const metadata: Metadata = {
  title: "Blog — Resume & Job Search Tips | HireBee",
  description: "Practical advice on resume writing, ATS optimisation, cover letters, and LinkedIn — from the HireBee team.",
  alternates: { canonical: "https://hirebee.app/blog" },
  openGraph: {
    title: "Blog — Resume & Job Search Tips | HireBee",
    description: "Practical advice on resume writing, ATS optimisation, cover letters, and LinkedIn.",
    url: "https://hirebee.app/blog",
    siteName: "HireBee",
    type: "website",
  },
}

const CATEGORY_COLORS: Record<string, string> = {
  "ATS & Job Search": "bg-teal-500/15 text-teal-300 border border-teal-500/25",
  "Resume Tips":      "bg-blue-500/15 text-blue-300 border border-blue-500/25",
  "Cover Letters":    "bg-violet-500/15 text-violet-300 border border-violet-500/25",
  "LinkedIn":         "bg-sky-500/15 text-sky-300 border border-sky-500/25",
}

const CATEGORY_DOT: Record<string, string> = {
  "ATS & Job Search": "bg-teal-400",
  "Resume Tips":      "bg-blue-400",
  "Cover Letters":    "bg-violet-400",
  "LinkedIn":         "bg-sky-400",
}

export default function BlogPage() {
  const sorted = [...POSTS].sort((a, b) => b.isoDate.localeCompare(a.isoDate))
  const [featured, ...rest] = sorted

  return (
    <div className="min-h-screen bg-gray-950">

      <LandingNav />

      {/* ── Hero ── */}
      <section className="border-b border-white/6 px-6 pt-32 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-3 py-1 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-xs font-semibold text-teal-300">Career Insights</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
            Get more interviews.<br />
            <span className="text-teal-400">Starting with your resume.</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl">
            Practical, no-fluff advice on ATS, resume writing, cover letters, and LinkedIn — so your application actually reaches a human.
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <main className="max-w-5xl mx-auto px-6 py-14">

        {/* Featured */}
        <div className="mb-12">
          <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-5">Latest article</p>
          <Link
            href={`/blog/${featured.slug}`}
            className="group block rounded-2xl bg-white/4 border border-white/8 hover:border-teal-500/30 hover:bg-white/6 transition-all duration-200 overflow-hidden"
          >
            <div className="p-8 sm:p-10">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[featured.category] ?? "bg-white/10 text-white/60"}`}>
                  {featured.category}
                </span>
                <span className="text-xs text-white/30">{featured.date}</span>
                <span className="text-xs text-white/20">·</span>
                <span className="text-xs text-white/30">{featured.readTime}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-teal-300 transition-colors mb-4 leading-snug">
                {featured.title}
              </h2>
              <p className="text-white/50 leading-relaxed max-w-2xl mb-6">{featured.description}</p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-teal-400 group-hover:gap-3 transition-all">
                Read article <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-10">
          <p className="text-xs font-semibold text-white/30 uppercase tracking-widest shrink-0">All articles</p>
          <div className="flex-1 h-px bg-white/6" />
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-xl bg-white/3 border border-white/8 hover:border-white/16 hover:bg-white/5 transition-all duration-200 p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${CATEGORY_DOT[post.category] ?? "bg-gray-400"}`} />
                <span className="text-xs text-white/35 font-medium">{post.category}</span>
              </div>
              <h2 className="text-sm font-bold text-white/85 group-hover:text-white transition-colors mb-2 leading-snug flex-1">
                {post.title}
              </h2>
              <p className="text-xs text-white/35 leading-relaxed mb-5 line-clamp-2">{post.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/25">{post.date}</span>
                <span className="text-xs text-white/25">{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 rounded-2xl bg-white/4 border border-white/8 px-8 py-10 text-center">
          <p className="text-white font-extrabold text-2xl mb-2">See how your resume really scores</p>
          <p className="text-white/45 mb-7 max-w-md mx-auto">Paste your resume and a job description. Get your ATS score, missing keywords, and AI rewrites — free in 60 seconds.</p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 bg-gradient-to-b from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-semibold px-7 py-3 rounded-full transition-all shadow-lg shadow-teal-500/30 active:scale-[0.98]"
          >
            Scan my resume free <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-white/25 mt-3">7-day free trial · No credit card to start</p>
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
