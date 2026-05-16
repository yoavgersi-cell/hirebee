import { redirect } from "next/navigation"
import { auth } from "@/auth"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "HireBee — Your Resume Isn't Bad. It's Getting Filtered.",
  description:
    "HireBee simulates real ATS filters to show exactly why your resume gets rejected, what keywords you're missing, and how to fix it before you apply. Free ATS score in 60 seconds.",
  alternates: { canonical: "https://hirebee.app" },
}
import {
  ArrowRight, CheckCircle2, Upload, Target, Zap, FileText, Layout,
  AlertTriangle, TrendingUp, Users, Clock, ChevronRight, ChevronDown, Shield, ShieldCheck,
  Bot, User, Crosshair,
} from "lucide-react"
import { LandingNav } from "@/components/landing-nav"
import { LandingFaq } from "@/components/landing-faq"
import { LandingTemplates } from "@/components/landing-templates"
import { HireBeeLogo } from "@/components/hirebee-logo"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"

// ─── Product UI Mock ────────────────────────────────────────────────────────────
function ResumeMock() {
  const bars = [
    { label: "ATS Readability", pct: 64, color: "#f59e0b" },
    { label: "Keyword Match",   pct: 41, color: "#f87171" },
    { label: "Formatting",      pct: 79, color: "#14b8a6" },
    { label: "Experience",      pct: 72, color: "#14b8a6" },
  ]
  const issues = [
    { ok: false, text: "Missing 8 keywords for this job description" },
    { ok: false, text: "3 bullet points lack measurable impact" },
    { ok: false, text: "Summary is too generic — recruiters will skim past" },
    { ok: true,  text: "Clean formatting — ATS can parse your layout" },
  ]

  return (
    <div className="w-full max-w-sm mx-auto select-none">
      {/* Browser chrome */}
      <div className="bg-gray-800 rounded-t-2xl px-4 py-3 flex items-center gap-2 border border-white/8 border-b-0">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-amber-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <div className="flex-1 bg-gray-700/60 rounded-md h-5 flex items-center px-3 ml-2">
          <span className="text-[10px] text-gray-400">hirebee.app/results</span>
        </div>
      </div>

      {/* Card */}
      <div className="bg-[#0d1117] border border-white/8 border-t-0 rounded-b-2xl p-5 shadow-2xl">
        {/* Score row */}
        <div className="flex items-center gap-4 mb-5">
          <div className="relative w-[72px] h-[72px] shrink-0">
            <svg viewBox="0 0 72 72" className="w-full h-full -rotate-90">
              <circle cx="36" cy="36" r="30" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
              <circle cx="36" cy="36" r="30" fill="none" stroke="#f59e0b" strokeWidth="7"
                strokeDasharray={`${2 * Math.PI * 30 * 0.72} ${2 * Math.PI * 30 * 0.28}`}
                strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-extrabold text-white leading-none">72</span>
              <span className="text-[10px] text-white/30 leading-none mt-0.5">/100</span>
            </div>
          </div>
          <div>
            <p className="text-white font-bold text-sm mb-1.5">Resume Score</p>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded-full">
              <AlertTriangle className="w-3 h-3" /> May be filtered out
            </span>
          </div>
        </div>

        {/* Score bars */}
        <div className="space-y-2.5 mb-5">
          {bars.map(({ label, pct, color }) => (
            <div key={label}>
              <div className="flex justify-between mb-1">
                <span className="text-[11px] text-white/45">{label}</span>
                <span className="text-[11px] font-bold" style={{ color }}>{pct}%</span>
              </div>
              <div className="h-1.5 bg-white/6 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
              </div>
            </div>
          ))}
        </div>

        {/* Issues */}
        <div className="space-y-2 mb-4">
          {issues.map(({ ok, text }) => (
            <div key={text} className="flex items-start gap-2">
              <span className={`text-xs font-bold mt-0.5 shrink-0 ${ok ? "text-teal-400" : "text-red-400"}`}>
                {ok ? "✓" : "✕"}
              </span>
              <span className="text-[11px] text-white/55 leading-snug">{text}</span>
            </div>
          ))}
        </div>

        {/* Fix CTA */}
        <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-3 flex items-center justify-between group cursor-pointer hover:bg-teal-500/15 transition-colors">
          <span className="text-xs font-semibold text-teal-300">Fix all issues with AI</span>
          <ChevronRight className="w-3.5 h-3.5 text-teal-400" />
        </div>
      </div>

      {/* Floating badge */}
      <div className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg shadow-red-500/30 animate-pulse">
        5 issues
      </div>
    </div>
  )
}

// ─── Stat pill ──────────────────────────────────────────────────────────────────
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-3xl font-extrabold text-white">{value}</p>
      <p className="text-sm text-white/40 mt-1">{label}</p>
    </div>
  )
}

// ─── Feature card ───────────────────────────────────────────────────────────────
function FeatureCard({
  icon: Icon, title, desc, preview,
}: {
  icon: React.ElementType
  title: string
  desc: string
  preview: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:border-gray-200 transition-all duration-200 group">
      <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center mb-5 shadow-sm border border-teal-100/60">
        <Icon className="w-7 h-7 text-teal-600" />
      </div>
      <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed mb-5">{desc}</p>
      {preview}
    </div>
  )
}

// ─── Testimonial ────────────────────────────────────────────────────────────────
function Testimonial({ quote, name, role, scoreBefore, scoreAfter }: {
  quote: string; name: string; role: string
  scoreBefore?: number; scoreAfter?: number
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      {scoreBefore !== undefined && scoreAfter !== undefined && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-extrabold text-red-400">{scoreBefore}</span>
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-red-400 to-teal-400 rounded-full" style={{ width: `${scoreAfter}%` }} />
          </div>
          <span className="text-sm font-extrabold text-teal-500">{scoreAfter}</span>
          <span className="text-[10px] font-bold text-teal-600 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-full">+{scoreAfter - scoreBefore} pts</span>
        </div>
      )}
      <div className="flex gap-0.5 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-4 h-4 fill-amber-400" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-gray-700 text-sm leading-relaxed mb-5">"{quote}"</p>
      <div>
        <p className="font-semibold text-gray-900 text-sm">{name}</p>
        <p className="text-xs text-gray-400">{role}</p>
      </div>
    </div>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────────
export default async function HomePage() {
  const session = await auth()
  if (session?.user) redirect("/builder")

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "HireBee",
    url: "https://hirebee.app",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: "AI-powered resume analyzer that scores your CV, identifies ATS issues, rewrites weak bullet points, and exports a clean PDF.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "7-day free trial — no charge until day 7" },
  }

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HireBee",
    url: "https://hirebee.app",
    logo: {
      "@type": "ImageObject",
      url: "https://hirebee.app/icon.svg",
      width: 512,
      height: 512,
    },
    sameAs: [
      "https://twitter.com/hirebeeapp",
      "https://www.linkedin.com/company/hirebee",
    ],
  }

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "HireBee",
    url: "https://hirebee.app",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: "https://hirebee.app/blog?q={search_term_string}" },
      "query-input": "required name=search_term_string",
    },
  }

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is HireBee?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "HireBee is an AI-powered resume analyzer that scores your CV against real ATS (Applicant Tracking System) filters, identifies missing keywords, rewrites weak bullet points, and generates a clean ATS-friendly PDF — so more of your applications reach a human recruiter.",
        },
      },
      {
        "@type": "Question",
        name: "Is HireBee free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. HireBee offers a free ATS scan with no account required. A 7-day free trial unlocks unlimited scans, the CV builder, cover letter generator, and LinkedIn optimizer. After the trial, the plan is $19/month. Cancel anytime before the trial ends and you won't be charged.",
        },
      },
      {
        "@type": "Question",
        name: "How does ATS resume scanning work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "HireBee's AI simulates the same keyword-matching and formatting checks used by Applicant Tracking Systems. It compares your resume against the job description, scores keyword coverage, flags formatting issues that confuse ATS parsers, and suggests specific rewrites to increase your chances of passing the filter.",
        },
      },
      {
        "@type": "Question",
        name: "What resume formats does HireBee support?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "HireBee accepts PDF and Word (.docx) uploads, or you can paste your resume text directly. It also has a built-in CV builder that exports a clean, ATS-optimized PDF.",
        },
      },
      {
        "@type": "Question",
        name: "How accurate is the ATS resume score?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "HireBee's scoring is calibrated against real ATS behavior across major platforms like Workday, Greenhouse, and Lever. It checks keyword density, section headers, formatting, and role-specific language. The score is a strong predictor of whether your resume passes automated screening.",
        },
      },
    ],
  }

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
      <LandingNav />


      {/* ── HERO ── */}
      <section className="bg-gray-950 pt-20 md:pt-32 pb-10 md:pb-24 px-6 overflow-hidden relative">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-500/8 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                Free scan · No account needed · 60 seconds
              </div>

              <h1 className="text-[26px] sm:text-4xl lg:text-[46px] font-extrabold text-white leading-[1.15] tracking-tight mb-5 md:mb-6">
                See exactly why your resume <span className="text-teal-400">isn&apos;t getting interviews.</span>
              </h1>

              <p className="text-base sm:text-lg text-white/55 leading-relaxed mb-6 max-w-lg">
                ATS software is rejecting your resume before any recruiter opens it. HireBee shows you exactly why — keyword by keyword — and fixes it before your next application goes in.
              </p>

              <div className="hidden md:flex flex-col sm:flex-row gap-3 mb-4">
                <Link
                  href="/analyze"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-b from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-bold px-8 py-4 md:py-3.5 rounded-full text-sm transition-all shadow-lg shadow-teal-500/30 active:scale-[0.98]"
                >
                  Scan my resume — it&apos;s free <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Mobile CTA (non-sticky, in-flow) */}
              <Link
                href="/analyze"
                className="md:hidden flex items-center justify-center gap-2 w-full bg-gradient-to-b from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-bold py-4 rounded-full text-sm transition-all shadow-lg shadow-teal-500/30 active:scale-[0.98] mb-3"
              >
                Scan my resume — it&apos;s free <ArrowRight className="w-4 h-4" />
              </Link>

              <p className="text-xs text-white/30 mb-1">No account needed · Takes 60 seconds · Instant score</p>

              {/* Bullets */}
              <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  "ATS score - see exactly where you fail",
                  "Missing keywords for this job",
                  "AI rewrites for weak bullet points",
                  "LinkedIn optimizer included",
                ].map((text) => (
                  <div key={text} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span className="text-sm text-white/55">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — product mock */}
            <div className="relative hidden lg:block">
              <div className="relative">
                <ResumeMock />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-gray-900 border-y border-white/5 py-6 md:py-10 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <Stat value="75%" label="Resumes killed by ATS before a human sees them" />
          <Stat value="6 sec" label="Time a recruiter spends on your resume" />
          <Stat value="3×" label="More interview requests after optimizing" />
          <Stat value="60 sec" label="To get your ATS score — free, no account" />
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="py-10 md:py-24 px-6 bg-slate-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">Why you&apos;re not hearing back</p>
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-4">
              The recruiter never saw your resume.<br className="hidden sm:block" />
              <span className="text-red-500">Software rejected it first.</span>
            </h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
              ATS software rejects <strong className="text-gray-700">3 out of 4 resumes</strong>{" "}automatically — before any human is involved. It doesn&apos;t care how qualified you are. It cares about keywords, formatting, and structure.
            </p>
          </div>

          {/* Flow — mobile vertical timeline */}
          <div className="md:hidden flex flex-col gap-0 mb-8">
            {[
              { label: "You apply", Icon: FileText, sub: "Your resume is submitted" },
              { label: "ATS scan", Icon: Bot, sub: "Software filters 75% out", danger: true },
              { label: "Recruiter", Icon: User, sub: "Only 25% reach a human" },
              { label: "Interview", Icon: Crosshair, sub: "A fraction are selected" },
            ].map(({ label, Icon, sub, danger }, i) => (
              <div key={label}>
                <div className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border ${
                  danger ? "bg-red-50 border-red-200" : "bg-white border-gray-200 shadow-sm"
                }`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    danger ? "bg-red-100" : "bg-gray-50"
                  }`}>
                    <Icon className={`w-5 h-5 ${danger ? "text-red-500" : "text-teal-600"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold leading-tight ${danger ? "text-red-700" : "text-gray-900"}`}>{label}</p>
                    <p className={`text-xs mt-0.5 ${danger ? "text-red-500" : "text-gray-400"}`}>{sub}</p>
                  </div>
                  {danger && (
                    <span className="shrink-0 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">75% out</span>
                  )}
                </div>
                {i < 3 && (
                  <div className="flex justify-center py-1.5">
                    <ChevronDown className={`w-4 h-4 ${i === 0 ? "text-red-300" : "text-gray-200"}`} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Flow — desktop horizontal */}
          <div className="hidden md:flex items-center justify-center gap-0 mb-12">
            {[
              { label: "You apply", Icon: FileText, sub: "Your resume is submitted" },
              { label: "ATS scan", Icon: Bot, sub: "Software filters 75% out", danger: true },
              { label: "Recruiter", Icon: User, sub: "Only 25% reach a human" },
              { label: "Interview", Icon: Crosshair, sub: "A fraction are selected" },
            ].map(({ label, Icon, sub, danger }, i) => (
              <div key={label} className="flex items-center gap-0">
                <div className={`flex flex-col items-center px-5 py-5 rounded-2xl border min-w-[140px] text-center ${
                  danger ? "bg-red-50 border-red-200" : "bg-gray-50 border-gray-200"
                }`}>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 ${
                    danger ? "bg-red-100" : "bg-white shadow-sm"
                  }`}>
                    <Icon className={`w-6 h-6 ${danger ? "text-red-500" : "text-teal-600"}`} />
                  </div>
                  <p className={`text-sm font-bold ${danger ? "text-red-700" : "text-gray-900"}`}>{label}</p>
                  <p className={`text-xs mt-0.5 ${danger ? "text-red-500" : "text-gray-400"}`}>{sub}</p>
                </div>
                {i < 3 && (
                  <div className="flex items-center">
                    <div className="w-8 h-px bg-gray-200 mx-1" />
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-gray-950 rounded-2xl px-8 py-7 text-center">
            <p className="text-lg font-bold text-white mb-2">
              You&apos;re qualified. Your resume just isn&apos;t getting through.
            </p>
            <p className="text-white/40 text-sm mb-5">Find out exactly what&apos;s blocking you — your ATS score, the missing keywords, and what to fix. In 60 seconds, free.</p>
            <Link
              href="/analyze"
              className="inline-flex items-center gap-2 bg-gradient-to-b from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-bold px-6 py-3 rounded-full text-sm transition-all shadow-lg shadow-teal-500/30 active:scale-[0.98]"
            >
              Check my resume now — free <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-white/20 text-xs mt-3">No account needed · Instant score</p>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-10 md:py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">How it works</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Diagnose. Fix. Apply with confidence.
            </h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto">
              Not vague suggestions. HireBee shows the exact keywords you&apos;re missing, the exact score, and rewrites the weak parts — so your next application actually gets through.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard
              icon={Target}
              title="See exactly what's missing"
              desc="Paste any job description and get an instant match score — plus the exact keywords your resume needs to pass that specific ATS filter."
              preview={
                <div className="bg-gray-50 rounded-xl p-3 space-y-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500 font-medium">Match score</span>
                    <span className="text-red-500 font-bold">41%</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-red-400 rounded-full" style={{ width: "41%" }} />
                  </div>
                  <p className="text-[11px] text-gray-400 pt-1">Missing: React, TypeScript, CI/CD, Agile +4 more</p>
                </div>
              }
            />

            <FeatureCard
              icon={TrendingUp}
              title="Know your score before you apply"
              desc="Get a full ATS score broken down by keyword coverage, formatting, and impact — so you know exactly what to fix before submitting."
              preview={
                <div className="space-y-1.5">
                  {[
                    { label: "ATS Readability", v: 64, c: "bg-amber-400" },
                    { label: "Keyword density", v: 41, c: "bg-red-400" },
                  ].map(({ label, v, c }) => (
                    <div key={label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">{label}</span>
                        <span className="font-semibold text-gray-700">{v}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full ${c} rounded-full`} style={{ width: `${v}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              }
            />

            <FeatureCard
              icon={Zap}
              title="Fix weak bullets in one click"
              desc="Generic bullet points get rewritten into measurable impact statements that pass ATS and make recruiters stop scrolling."
              preview={
                <div className="space-y-2">
                  <div className="bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                    <p className="text-[10px] text-red-400 font-semibold mb-0.5">Before</p>
                    <p className="text-xs text-gray-600">Responsible for managing marketing campaigns</p>
                  </div>
                  <div className="bg-teal-50 border border-teal-100 rounded-lg px-3 py-2">
                    <p className="text-[10px] text-teal-600 font-semibold mb-0.5">After (AI)</p>
                    <p className="text-xs text-gray-700">Managed 6 multi-channel campaigns that increased lead conversion by 34%</p>
                  </div>
                </div>
              }
            />

            <div className="hidden md:contents">
            <FeatureCard
              icon={FileText}
              title="Cover Letter Generator"
              desc="Generate a tailored cover letter for any job in seconds — personalised to the role, company, and your experience."
              preview={
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-3">
                  <div className="space-y-1.5">
                    <div className="h-2 bg-gray-200 rounded-full w-3/4" />
                    <div className="h-2 bg-gray-200 rounded-full w-full" />
                    <div className="h-2 bg-gray-200 rounded-full w-5/6" />
                    <div className="h-2 bg-gray-200 rounded-full w-4/5" />
                  </div>
                  <div className="mt-3 text-[10px] text-teal-600 font-semibold">✓ Tailored to job description</div>
                </div>
              }
            />

            <FeatureCard
              icon={Layout}
              title="Clean ATS Templates"
              desc="Choose from 5 professionally designed, recruiter-approved templates — all guaranteed to pass ATS parsing."
              preview={
                <div className="grid grid-cols-3 gap-1.5">
                  {["Nova", "Executive", "Clean"].map((t) => (
                    <div key={t} className="bg-gray-100 border border-gray-200 rounded-lg aspect-[3/4] flex items-end p-1.5">
                      <span className="text-[9px] font-semibold text-gray-500">{t}</span>
                    </div>
                  ))}
                </div>
              }
            />

            <FeatureCard
              icon={Upload}
              title="Instant PDF Export"
              desc="Download your optimized resume as a polished, pixel-perfect PDF — ready to submit to any application."
              preview={
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center gap-3">
                  <div className="w-8 h-10 bg-white border border-gray-200 rounded-md flex items-center justify-center shadow-sm">
                    <FileText className="w-4 h-4 text-teal-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">resume_optimized.pdf</p>
                    <p className="text-[10px] text-gray-400">Ready to download</p>
                  </div>
                </div>
              }
            />
            </div>
          </div>
        </div>
      </section>

      {/* ── MID-PAGE CTA ── */}
      <section className="py-10 px-6 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 bg-gray-950 rounded-2xl px-7 py-6">
          <div>
            <p className="text-white font-bold text-lg leading-snug">Is your resume actually passing ATS?</p>
            <p className="text-white/40 text-sm mt-1">Find out in 60 seconds — free, no account needed.</p>
          </div>
          <Link
            href="/analyze"
            className="shrink-0 inline-flex items-center gap-2 bg-gradient-to-b from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-bold px-6 py-3 rounded-full text-sm transition-all shadow-lg shadow-teal-500/30 active:scale-[0.98] whitespace-nowrap"
          >
            Scan mine free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="py-10 md:py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">Real results</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">People who stopped getting ignored</h2>
            <p className="text-gray-400 text-sm mt-2">Score before → after using HireBee</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <Testimonial
              scoreBefore={44} scoreAfter={82}
              quote="HireBee showed me exactly why my resume wasn't getting responses. I had no idea I was missing half the keywords in every job description I applied to."
              name="Marcus T."
              role="Software Engineer — London"
            />
            <Testimonial
              scoreBefore={58} scoreAfter={87}
              quote="The before/after comparison was eye-opening. My bullet points were so weak. After the AI rewrite, I got two interview requests in the same week."
              name="Aisha K."
              role="Product Manager — Manchester"
            />
            <Testimonial
              scoreBefore={48} scoreAfter={91}
              quote="I spent months applying without any callbacks. HireBee gave me a score of 48 and a list of exactly what to fix. Now I'm at 91 and finally getting responses."
              name="James R."
              role="Sales Executive — Birmingham"
            />
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
            {[
              { icon: Shield, label: "Your data is never sold" },
              { icon: Clock, label: "Results in under 60 seconds" },
              { icon: Users, label: "Trusted by thousands of job seekers" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-gray-700 font-medium bg-white border border-gray-100 shadow-sm rounded-full px-4 py-2">
                <Icon className="w-4 h-4 text-teal-500 shrink-0" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ── */}
      <section className="py-10 md:py-20 px-6 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">AI rewrites</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">
              This is what your resume could look like
            </h2>
            <p className="text-gray-400 text-sm">Weak bullets → impact statements that pass ATS and make recruiters stop scrolling.</p>
          </div>

          <div className="space-y-4">
            {[
              {
                before: "Responsible for managing marketing campaigns",
                after: "Managed 6 multi-channel campaigns generating £1.2M pipeline, improving lead conversion rate by 34%",
              },
              {
                before: "Helped the engineering team with various projects",
                after: "Contributed to 3 major product launches by building core backend APIs in Go, serving 800K+ active users",
              },
              {
                before: "Worked on improving customer satisfaction",
                after: "Drove NPS from 32 to 61 over 8 months by redesigning the onboarding flow and reducing time-to-value by 40%",
                mobileHide: true,
              },
            ].map(({ before, after, mobileHide }, i) => (
              <div key={i} className={`grid md:grid-cols-2 gap-3${mobileHide ? " hidden md:grid" : ""}`}>
                <div className="bg-red-50 border border-red-100 rounded-2xl p-5 shadow-sm">
                  <p className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">Before</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{before}</p>
                </div>
                <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5 shadow-sm relative">
                  <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-2">After (AI fix)</p>
                  <p className="text-sm text-gray-800 leading-relaxed font-medium">{after}</p>
                  <span className="absolute top-4 right-4 text-xs font-semibold text-teal-600 bg-teal-100 px-2 py-0.5 rounded-full">✓ ATS-ready</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/analyze"
              className="inline-flex items-center gap-2 bg-gradient-to-b from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-bold px-7 py-3 rounded-full text-sm transition-all shadow-lg shadow-teal-500/30 active:scale-[0.98]"
            >
              Fix my resume now <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-xs text-gray-400 mt-2">Free scan · AI fixes with 7-day trial</p>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-12 md:py-24 px-6 bg-gray-950 relative overflow-hidden">
        {/* Background depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/4 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* ── Left: Value content ── */}
            <div>
              <p className="text-xs font-semibold text-teal-400 uppercase tracking-widest mb-4">Pricing</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-5">
                Stop guessing.<br />
                <span className="text-teal-400">Start getting interviews.</span>
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-8">
                Your scan shows the problem. The trial gives you the fix — every keyword, every rewrite, every application.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  { icon: Target,       text: "Fix missing keywords before you apply" },
                  { icon: Zap,          text: "Rewrite weak bullet points into measurable results" },
                  { icon: TrendingUp,   text: "Match your resume to any job description" },
                  { icon: CheckCircle2, text: "Export clean PDF — no branding" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-teal-400" />
                    </div>
                    <p className="text-white/70 text-sm">{text}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/4 border border-white/8 rounded-2xl px-4 py-3.5">
                  <p className="text-xl font-extrabold text-white">75%</p>
                  <p className="text-xs text-white/35 mt-0.5">of resumes rejected by ATS</p>
                </div>
                <div className="bg-white/4 border border-white/8 rounded-2xl px-4 py-3.5">
                  <p className="text-xl font-extrabold text-white">3×</p>
                  <p className="text-xs text-white/35 mt-0.5">more interviews after optimization</p>
                </div>
              </div>
            </div>

            {/* ── Right: Pricing card ── */}
            <div className="relative">
              {/* Glow */}
              <div className="absolute -inset-4 bg-teal-500/8 rounded-3xl blur-2xl pointer-events-none" />

              <div className="relative bg-gray-900 border border-white/10 rounded-2xl p-7">
                <p className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-3">Pro — Full Resume Optimization</p>
                <div className="flex items-baseline gap-1.5 mb-1">
                  <p className="text-5xl font-extrabold text-white leading-none">$19</p>
                  <span className="text-white/40 text-sm">/month</span>
                </div>
                <p className="text-sm text-white/40 mb-1">Start free for 7 days</p>
                <p className="text-xs text-white/25 mb-7">Cancel before day 7 and pay nothing. No questions asked.</p>

                <ul className="space-y-3 mb-8">
                  {[
                    "Full AI optimization",
                    "Unlimited rewrites",
                    "Job-specific keyword matching",
                    "Cover letter generator",
                    "PDF export — no branding",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-white/70">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/upgrade"
                  className="block w-full text-center bg-gradient-to-b from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-bold py-3.5 rounded-full text-sm transition-all shadow-lg shadow-teal-500/30 active:scale-[0.98]"
                >
                  Start free trial →
                </Link>

                <p className="text-[10px] text-white/25 text-center mt-3 leading-relaxed px-1">
                  7-day free trial, then $19/month. Cancel before day 7 and you won&apos;t be charged.{" "}
                  <Link href="/terms" className="underline hover:text-white/40 transition-colors">Terms</Link>
                  {" · "}
                  <Link href="/refund" className="underline hover:text-white/40 transition-colors">Refund policy</Link>
                </p>

                <div className="flex items-center justify-center gap-4 mt-4">
                  <span className="flex items-center gap-1.5 text-xs text-white/25">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> No charge for 7 days
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-white/25">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Cancel anytime
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-white/25">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Secure via Paddle
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <LandingFaq />

      {/* ── TEMPLATES ── */}
      <LandingTemplates />

      {/* ── LINKEDIN ── */}
      <section className="py-12 md:py-24 px-6 bg-gray-950 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-500/4 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — mock */}
            <div className="order-2 lg:order-1">
              <div className="w-full max-w-sm mx-auto select-none">
                {/* Browser chrome */}
                <div className="bg-gray-800 rounded-t-2xl px-4 py-3 flex items-center gap-2 border border-white/8 border-b-0">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="flex-1 bg-gray-700/60 rounded-md h-5 flex items-center px-3 ml-2">
                    <span className="text-[10px] text-gray-400">hirebee.app/linkedin</span>
                  </div>
                </div>

                {/* Card */}
                <div className="bg-gray-900 border border-white/8 border-t-0 rounded-b-2xl px-5 py-5 space-y-5">
                  {/* Score row */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 shrink-0">
                      <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1f2937" strokeWidth="3.5" />
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#0ea5e9" strokeWidth="3.5"
                          strokeDasharray="72 100" strokeLinecap="round" />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-base font-extrabold text-white">72</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-0.5">LinkedIn Score</p>
                      <p className="text-white text-sm font-semibold leading-snug">Needs improvement</p>
                      <p className="text-white/35 text-xs">Recruiters can't find you easily</p>
                    </div>
                  </div>

                  {/* Section scores */}
                  <div className="space-y-2.5">
                    {[
                      { label: "Headline",      score: 58, color: "#f87171" },
                      { label: "About section", score: 71, color: "#f59e0b" },
                      { label: "Experience",    score: 83, color: "#14b8a6" },
                      { label: "Searchability", score: 65, color: "#f59e0b" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3">
                        <span className="text-[11px] text-white/40 w-24 shrink-0">{item.label}</span>
                        <div className="flex-1 h-1.5 bg-white/8 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${item.score}%`, background: item.color }} />
                        </div>
                        <span className="text-[11px] font-semibold w-6 text-right" style={{ color: item.color }}>{item.score}</span>
                      </div>
                    ))}
                  </div>

                  {/* Quick wins */}
                  <div className="bg-amber-500/8 border border-amber-500/20 rounded-xl p-3.5">
                    <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-2">3 quick wins</p>
                    <ul className="space-y-1.5">
                      {[
                        "Add "Python" and "SQL" to headline",
                        "Your About has no call to action",
                        "Missing 4 role-specific keywords",
                      ].map((w) => (
                        <li key={w} className="flex items-start gap-2 text-[11px] text-white/55">
                          <span className="text-amber-400 shrink-0 mt-0.5">→</span> {w}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Rewrite preview */}
                  <div className="bg-white/3 border border-white/8 rounded-xl p-3.5">
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">AI headline rewrite</p>
                    <p className="text-[11px] text-white/30 line-through mb-1.5">"Software Developer at Acme"</p>
                    <p className="text-[11px] text-sky-300 leading-relaxed">"Full-Stack Engineer · Python · SQL · Building data products that ship"</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — copy */}
            <div className="order-1 lg:order-2">
              <p className="text-xs font-semibold text-sky-400 uppercase tracking-widest mb-4">LinkedIn Optimizer</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-5">
                Recruiters search LinkedIn.<br />
                <span className="text-sky-400">Make sure they find you.</span>
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-8">
                Most people set up their LinkedIn once and forget it. Recruiters use keyword search — if your profile doesn&apos;t have the right terms, you&apos;re invisible. HireBee scores every section and rewrites what&apos;s holding you back.
              </p>

              <div className="space-y-4 mb-9">
                {[
                  { title: "Section-by-section scoring", desc: "Headline, About, Experience, and searchability — each scored separately so you know exactly where you lose recruiters." },
                  { title: "Keyword gap analysis", desc: "See which keywords recruiters in your field search for — and which ones are missing from your profile." },
                  { title: "AI rewrites for every section", desc: "Get a rewritten headline and About section that leads with impact and includes the keywords that matter." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-sky-500/20 border border-sky-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white mb-0.5">{item.title}</p>
                      <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/linkedin"
                className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm shadow-lg shadow-sky-500/20"
              >
                Optimize my LinkedIn <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-white/25 text-xs mt-3">Included in Pro · 7-day free trial</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-10 md:py-24 px-6 bg-gray-950">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-4">
            Before your next application
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Your next application is going out.<br />
            <span className="text-teal-400">Does your resume actually pass ATS?</span>
          </h2>
          <p className="text-white/45 mb-8 leading-relaxed max-w-lg mx-auto">
            Most rejected resumes have the same fixable problems — missing keywords, weak bullets, wrong formatting. You could be one of them and not know it. Find out in 60 seconds, free.
          </p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 bg-gradient-to-b from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-bold px-10 py-4 rounded-full text-base transition-all shadow-xl shadow-teal-500/30 active:scale-[0.98]"
          >
            Check my resume — it&apos;s free <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-white/20 text-xs mt-4">No account needed · 60 seconds · No commitment</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-950 border-t border-white/6 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <HireBeeLogo size={22} />
            <span className="text-white/60 text-sm font-semibold">HireBee</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="#features" className="text-xs text-white/30 hover:text-white/60 transition-colors">Features</a>
            <a href="#pricing" className="text-xs text-white/30 hover:text-white/60 transition-colors">Pricing</a>
            <Link href="/cv-examples" className="text-xs text-white/30 hover:text-white/60 transition-colors">CV Examples</Link>
            <Link href="/blog" className="text-xs text-white/30 hover:text-white/60 transition-colors">Blog</Link>
            <a href="mailto:hello@hirebee.app" className="text-xs text-white/30 hover:text-white/60 transition-colors">Contact</a>
            <Link href="/privacy" className="text-xs text-white/30 hover:text-white/60 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs text-white/30 hover:text-white/60 transition-colors">Terms</Link>
            <Link href="/refund" className="text-xs text-white/30 hover:text-white/60 transition-colors">Refunds</Link>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/20">© 2026 HireBee · Your data is never sold</p>
            <p className="text-xs text-white/15 mt-0.5">HireBee is operated by Planner hub</p>
          </div>
        </div>
      </footer>

      {/* ── STICKY MOBILE CTA ── */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-gray-950/95 backdrop-blur-md border-t border-white/8 px-4 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-white text-xs font-bold leading-tight truncate">Is your resume passing ATS?</p>
          <p className="text-white/35 text-[11px]">Free score in 60 seconds</p>
        </div>
        <Link
          href="/analyze"
          className="shrink-0 bg-gradient-to-b from-teal-500 to-teal-600 text-white font-bold text-sm px-5 py-2.5 rounded-full shadow-lg shadow-teal-500/30 active:scale-[0.97] transition-all"
        >
          Scan free →
        </Link>
      </div>
    </div>
  )
}
