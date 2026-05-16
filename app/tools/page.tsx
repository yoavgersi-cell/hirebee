import { Metadata } from "next"
import Link from "next/link"
import {
  Scan, FileText, Mail, Linkedin, Layout,
  ArrowRight, CheckCircle2, Lock,
} from "lucide-react"
import { HireBeeLogo } from "@/components/hirebee-logo"

export const metadata: Metadata = {
  title: "AI Resume Tools — ATS Scanner, Builder, Cover Letter & LinkedIn | HireBee",
  description:
    "HireBee's full suite of AI tools for job seekers: free ATS resume scanner, AI resume builder, cover letter generator, LinkedIn optimizer, and ATS-ready CV examples.",
  alternates: { canonical: "https://hirebee.app/tools" },
  openGraph: {
    title: "AI Resume Tools | HireBee",
    description: "Free ATS scanner, resume builder, cover letter generator, and LinkedIn optimizer — all in one place.",
    url: "https://hirebee.app/tools",
  },
}

const TOOLS = [
  {
    id: "scanner",
    href: "/analyze",
    icon: Scan,
    badge: "Free — no signup",
    badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    title: "ATS Resume Scanner",
    description:
      "Paste your resume and a job description and get an instant ATS score. See exactly which keywords are missing and what formatting issues are blocking you — in under 60 seconds.",
    features: [
      "Match score against any job description",
      "Missing keyword breakdown",
      "Formatting & structure issues",
      "Actionable fix list",
    ],
    cta: "Scan my resume free",
    accent: "teal",
  },
  {
    id: "builder",
    href: "/builder",
    icon: Layout,
    badge: "Trial / Pro",
    badgeColor: "bg-violet-500/15 text-violet-400 border-violet-500/25",
    title: "AI Resume Builder",
    description:
      "Build a polished, ATS-friendly resume from scratch or import your existing one. Choose from 5 clean templates and use AI to rewrite every bullet point as you go.",
    features: [
      "5 ATS-optimized templates",
      "AI bullet point rewriter",
      "AI summary generator",
      "Export as clean PDF",
    ],
    cta: "Build my resume",
    accent: "violet",
  },
  {
    id: "cover-letter",
    href: "/cover-letter",
    icon: Mail,
    badge: "Trial / Pro",
    badgeColor: "bg-blue-500/15 text-blue-400 border-blue-500/25",
    title: "Cover Letter Generator",
    description:
      "Generate a tailored, role-specific cover letter in seconds. Paste your resume and the job description — the AI writes a compelling letter that matches the tone and keywords of the job.",
    features: [
      "Tailored to each job description",
      "Matches your resume voice",
      "Professional structure",
      "Edit and export instantly",
    ],
    cta: "Write my cover letter",
    accent: "blue",
  },
  {
    id: "linkedin",
    href: "/linkedin",
    icon: Linkedin,
    badge: "Trial / Pro",
    badgeColor: "bg-sky-500/15 text-sky-400 border-sky-500/25",
    title: "LinkedIn Optimizer",
    description:
      "Get a detailed score for your LinkedIn profile. See your section-by-section breakdown, find missing keywords recruiters search for, and get AI rewrites for your headline and About section.",
    features: [
      "Headline & About section scoring",
      "Recruiter searchability score",
      "Missing keyword analysis",
      "AI rewrites for every section",
    ],
    cta: "Optimize my LinkedIn",
    accent: "sky",
  },
  {
    id: "examples",
    href: "/cv-examples",
    icon: FileText,
    badge: "Free",
    badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    title: "Resume Examples by Role",
    description:
      "Browse ATS-optimized resume examples for Software Engineer, Product Manager, Data Analyst, Marketing, Finance, and more. Real content, real structure — use as inspiration or start from a template.",
    features: [
      "8+ professional roles covered",
      "Real bullet points and formatting",
      "ATS-optimized structure",
      "One-click to start building",
    ],
    cta: "Browse examples",
    accent: "teal",
  },
]

const accentMap: Record<string, string> = {
  teal:   "border-teal-500/30 hover:border-teal-400/60 group-hover:bg-teal-500/10",
  violet: "border-violet-500/30 hover:border-violet-400/60 group-hover:bg-violet-500/10",
  blue:   "border-blue-500/30 hover:border-blue-400/60 group-hover:bg-blue-500/10",
  sky:    "border-sky-500/30 hover:border-sky-400/60 group-hover:bg-sky-500/10",
}
const iconAccentMap: Record<string, string> = {
  teal:   "bg-teal-500/15 text-teal-400",
  violet: "bg-violet-500/15 text-violet-400",
  blue:   "bg-blue-500/15 text-blue-400",
  sky:    "bg-sky-500/15 text-sky-400",
}
const ctaAccentMap: Record<string, string> = {
  teal:   "bg-teal-500 hover:bg-teal-400 shadow-teal-500/25",
  violet: "bg-violet-600 hover:bg-violet-500 shadow-violet-500/25",
  blue:   "bg-blue-600 hover:bg-blue-500 shadow-blue-500/25",
  sky:    "bg-sky-600 hover:bg-sky-500 shadow-sky-500/25",
}

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Nav */}
      <header className="border-b border-white/8 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <HireBeeLogo size={24} />
            <span className="font-extrabold text-white text-sm tracking-tight">HireBee</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/tools" className="text-sm text-white/80 font-medium">Tools</Link>
            <Link href="/how-it-works" className="text-sm text-white/45 hover:text-white transition-colors">How it works</Link>
            <Link href="/blog" className="text-sm text-white/45 hover:text-white transition-colors">Blog</Link>
            <Link href="/#pricing" className="text-sm text-white/45 hover:text-white transition-colors">Pricing</Link>
          </nav>
          <Link
            href="/analyze"
            className="bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
          >
            Scan free →
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 py-20 text-center border-b border-white/6">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-teal-500/10 border border-teal-500/20 rounded-full px-3 py-1 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            <span className="text-xs font-semibold text-teal-300">Powered by Claude AI</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">
            Every tool you need<br />
            <span className="text-teal-400">to get more interviews</span>
          </h1>
          <p className="text-white/50 text-lg leading-relaxed max-w-xl mx-auto">
            From a free ATS scan to a full resume build — HireBee gives you AI-powered tools that tackle every part of your job search.
          </p>
        </div>
      </section>

      {/* Tools grid */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-5">
          {TOOLS.map((tool) => {
            const Icon = tool.icon
            return (
              <Link
                key={tool.id}
                href={tool.href}
                className={`group rounded-2xl border bg-white/3 p-7 transition-all duration-200 ${accentMap[tool.accent]}`}
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconAccentMap[tool.accent]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h2 className="text-base font-bold text-white">{tool.title}</h2>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${tool.badgeColor}`}>
                        {tool.badge}
                      </span>
                    </div>
                    <p className="text-sm text-white/45 leading-relaxed">{tool.description}</p>
                  </div>
                </div>

                <ul className="space-y-1.5 mb-6">
                  {tool.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                      <span className="text-xs text-white/55">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className={`inline-flex items-center gap-1.5 text-xs font-semibold text-white px-4 py-2 rounded-full shadow-lg transition-all ${ctaAccentMap[tool.accent]}`}>
                  {tool.cta} <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Trust strip */}
      <section className="px-6 py-12 border-t border-white/6">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              { stat: "Free", label: "ATS scan — no account needed" },
              { stat: "60 sec", label: "To get your score and gap analysis" },
              { stat: "Claude AI", label: "Powers every rewrite and analysis" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-2xl font-extrabold text-white mb-1">{item.stat}</p>
                <p className="text-sm text-white/40">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 py-16 border-t border-white/6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-extrabold text-white mb-3">Start with the free scan</h2>
          <p className="text-white/40 text-sm mb-7">No account required. Paste your resume and a job description and get your ATS score in 60 seconds.</p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 bg-gradient-to-b from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-semibold px-7 py-3 rounded-full shadow-lg shadow-teal-500/25 transition-all"
          >
            Scan my resume free <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-white/20 text-xs mt-3">Or <Link href="/login" className="underline hover:text-white/40">sign in</Link> to unlock the full suite</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/6 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-white/25">
          <div className="flex items-center gap-2">
            <HireBeeLogo size={16} />
            <span className="font-semibold text-white/40">HireBee</span>
          </div>
          <div className="flex flex-wrap gap-5">
            <Link href="/privacy" className="hover:text-white/50 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white/50 transition-colors">Terms</Link>
            <Link href="/blog" className="hover:text-white/50 transition-colors">Blog</Link>
            <a href="mailto:hello@hirebee.app" className="hover:text-white/50 transition-colors">hello@hirebee.app</a>
          </div>
          <span>© 2026 HireBee · Operated by Planner hub</span>
        </div>
      </footer>
    </div>
  )
}
