import { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2, X, ArrowRight, ShieldCheck, Zap, RotateCcw } from "lucide-react"
import { LandingNav } from "@/components/landing-nav"
import { HireBeeLogo } from "@/components/hirebee-logo"

export const metadata: Metadata = {
  title: "Pricing — HireBee AI Resume Optimizer",
  description:
    "HireBee is free to start. Scan your resume free — no account needed. Upgrade to Pro for $19/month to unlock AI rewrites, cover letter generator, LinkedIn optimizer, and PDF export.",
  alternates: { canonical: "https://hirebee.app/pricing" },
  openGraph: {
    title: "HireBee Pricing — Free ATS Scan, $19/mo Pro",
    description: "Free ATS scan with no signup. Pro plan unlocks AI rewrites, resume builder, cover letter generator, LinkedIn optimizer, and more.",
    url: "https://hirebee.app/pricing",
  },
}

const FREE_FEATURES = [
  { label: "ATS resume scanner", included: true },
  { label: "ATS score + keyword gap", included: true },
  { label: "2 scans per session", included: true },
  { label: "No account required", included: true },
  { label: "AI resume rewrites", included: false },
  { label: "AI resume builder", included: false },
  { label: "Cover letter generator", included: false },
  { label: "LinkedIn optimizer", included: false },
  { label: "PDF export (5 templates)", included: false },
  { label: "Unlimited scans", included: false },
  { label: "Saved results history", included: false },
]

const PRO_FEATURES = [
  { label: "ATS resume scanner", included: true },
  { label: "ATS score + keyword gap", included: true },
  { label: "Unlimited scans", included: true },
  { label: "AI resume rewrites", included: true },
  { label: "AI resume builder", included: true },
  { label: "Cover letter generator", included: true },
  { label: "LinkedIn optimizer", included: true },
  { label: "PDF export (5 templates)", included: true },
  { label: "Saved results history", included: true },
  { label: "Job-specific keyword matching", included: true },
  { label: "Priority support", included: true },
]

const FAQS = [
  {
    q: "Is the free scan really free — no credit card?",
    a: "Yes. The ATS scanner at hirebee.app/analyze is completely free and requires no account, no email, and no credit card. Just paste your resume and job description and get your score in 60 seconds.",
  },
  {
    q: "What happens after the 7-day trial?",
    a: "After 7 days, your account automatically switches to the Pro plan at $19/month. If you cancel before day 7, you won't be charged a single cent. We send a reminder email before the trial ends.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel anytime from your account settings — no questions asked, no cancellation fees. If you cancel, you keep Pro access until the end of your current billing period.",
  },
  {
    q: "What does 'AI resume rewrites' include?",
    a: "HireBee rewrites your weakest bullet points with measurable impact, adds missing keywords naturally, and regenerates your summary to lead with results — all tailored to the specific job description you paste.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes. If you're charged and feel the product didn't deliver value, contact us within 7 days of the charge at hello@hirebee.app. We'll refund you — no questions asked. See our full Refund Policy.",
  },
  {
    q: "Is my resume data kept private?",
    a: "Absolutely. Your resume is used only to generate your analysis and is never shared with third parties, sold, or used to train AI models. You can delete your account and all data at any time.",
  },
  {
    q: "Do you offer team or student plans?",
    a: "Not yet — but we're working on it. If you have a specific need (university career centre, hiring firm, etc.) reach out at hello@hirebee.app and we'll see what we can do.",
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <LandingNav />

      {/* Hero */}
      <section className="px-6 pt-36 pb-16 text-center border-b border-white/6">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-teal-500/10 border border-teal-500/20 rounded-full px-3 py-1 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            <span className="text-xs font-semibold text-teal-300">Simple, transparent pricing</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">
            Start free.<br />
            <span className="text-teal-400">Upgrade when it works.</span>
          </h1>
          <p className="text-white/50 text-lg leading-relaxed">
            Scan your resume for free — no account needed. If the results help, try Pro free for 7 days. No charge until you decide to stay.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 items-start">

            {/* Free plan */}
            <div className="bg-white/3 border border-white/10 rounded-2xl p-7">
              <div className="mb-6">
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Free</p>
                <div className="flex items-baseline gap-1.5 mb-1">
                  <p className="text-4xl font-extrabold text-white leading-none">$0</p>
                  <span className="text-white/40 text-sm">forever</span>
                </div>
                <p className="text-sm text-white/40">No account required</p>
              </div>

              <Link
                href="/analyze"
                className="block w-full text-center bg-white/8 hover:bg-white/12 border border-white/12 text-white font-semibold py-3 rounded-full text-sm transition-all mb-7"
              >
                Scan my resume free →
              </Link>

              <ul className="space-y-3">
                {FREE_FEATURES.map((f) => (
                  <li key={f.label} className="flex items-center gap-3">
                    {f.included
                      ? <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                      : <X className="w-4 h-4 text-white/15 shrink-0" />
                    }
                    <span className={`text-sm ${f.included ? "text-white/70" : "text-white/25"}`}>{f.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro plan */}
            <div className="relative">
              {/* Glow */}
              <div className="absolute -inset-3 bg-teal-500/8 rounded-3xl blur-2xl pointer-events-none" />

              <div className="relative bg-gray-900 border border-teal-500/30 rounded-2xl p-7">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-3">Pro</p>
                    <div className="flex items-baseline gap-1.5 mb-1">
                      <p className="text-4xl font-extrabold text-white leading-none">$19</p>
                      <span className="text-white/40 text-sm">/month</span>
                    </div>
                    <p className="text-sm text-white/40">After 7-day free trial</p>
                  </div>
                  <span className="bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-bold px-3 py-1.5 rounded-full">
                    Most popular
                  </span>
                </div>

                <Link
                  href="/upgrade"
                  className="block w-full text-center bg-gradient-to-b from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-bold py-3.5 rounded-full text-sm transition-all shadow-lg shadow-teal-500/30 mb-2"
                >
                  Start 7-day free trial →
                </Link>
                <p className="text-[10px] text-white/25 text-center mb-7">
                  Cancel before day 7 and you won&apos;t be charged. No questions asked.
                </p>

                <ul className="space-y-3">
                  {PRO_FEATURES.map((f) => (
                    <li key={f.label} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                      <span className="text-sm text-white/70">{f.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="px-6 py-10 border-t border-b border-white/6 bg-white/2">
        <div className="max-w-3xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: ShieldCheck, label: "No charge for 7 days", sub: "Cancel before the trial ends — pay nothing" },
              { icon: RotateCcw,   label: "Cancel anytime",       sub: "No contracts, no cancellation fees" },
              { icon: Zap,         label: "Instant access",       sub: "All Pro features unlock immediately after signup" },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="flex flex-col items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-1">
                    <Icon className="w-4 h-4 text-teal-400" />
                  </div>
                  <p className="text-sm font-semibold text-white">{item.label}</p>
                  <p className="text-xs text-white/35 leading-relaxed">{item.sub}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* What's included — full breakdown */}
      <section className="px-6 py-16 border-b border-white/6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold text-white/30 uppercase tracking-widest text-center mb-10">Everything in Pro, explained</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: "ATS Resume Scanner",
                desc: "Paste your resume + job description. Get an instant score, missing keyword list, and formatting issues — in under 60 seconds.",
                badge: "Unlimited",
              },
              {
                title: "AI Resume Rewrites",
                desc: "HireBee rewrites your weakest bullet points, adds missing keywords naturally, and sharpens your summary — tailored to each specific job.",
                badge: "Per analysis",
              },
              {
                title: "AI Resume Builder",
                desc: "Build a polished, ATS-friendly resume from scratch or import your existing one. AI helps at every section.",
                badge: "Unlimited",
              },
              {
                title: "Cover Letter Generator",
                desc: "Generate a tailored, role-specific cover letter in seconds. Matches your resume voice and the job's tone.",
                badge: "Unlimited",
              },
              {
                title: "LinkedIn Optimizer",
                desc: "Score your LinkedIn headline, About, and experience sections. Get keyword gaps and AI rewrites for each section.",
                badge: "Unlimited",
              },
              {
                title: "PDF Export — 5 Templates",
                desc: "Export your improved resume as a clean, ATS-tested PDF. Five professional templates — no branding, no watermarks.",
                badge: "5 templates",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white/3 border border-white/8 rounded-xl p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-400 border border-teal-500/25 shrink-0">{item.badge}</span>
                </div>
                <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16 border-b border-white/6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-extrabold text-white mb-8 text-center">Pricing questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="rounded-xl bg-white/3 border border-white/8 p-5">
                <p className="text-sm font-semibold text-white mb-2">{faq.q}</p>
                <p className="text-sm text-white/45 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-extrabold text-white mb-3">Not sure yet? Start with the free scan.</h2>
          <p className="text-white/40 text-sm mb-7">No signup. No credit card. See your ATS score in 60 seconds — then decide if Pro is worth it.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/analyze"
              className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/12 border border-white/12 text-white font-semibold px-6 py-3 rounded-full transition-all text-sm"
            >
              Scan free — no account
            </Link>
            <Link
              href="/upgrade"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-b from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg shadow-teal-500/25 transition-all text-sm"
            >
              Start free trial <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-white/20 text-xs mt-5">
            <Link href="/terms" className="underline hover:text-white/40 transition-colors">Terms</Link>
            {" · "}
            <Link href="/refund" className="underline hover:text-white/40 transition-colors">Refund policy</Link>
            {" · "}
            <Link href="/privacy" className="underline hover:text-white/40 transition-colors">Privacy</Link>
          </p>
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
            <Link href="/refund" className="hover:text-white/50 transition-colors">Refund</Link>
            <Link href="/blog" className="hover:text-white/50 transition-colors">Blog</Link>
            <a href="mailto:hello@hirebee.app" className="hover:text-white/50 transition-colors">hello@hirebee.app</a>
          </div>
          <span>© 2026 HireBee · Operated by Planner hub</span>
        </div>
      </footer>
    </div>
  )
}
