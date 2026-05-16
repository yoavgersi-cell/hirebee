import { Metadata } from "next"
import Link from "next/link"
import { Upload, Cpu, BarChart2, Wand2, Download, ArrowRight, CheckCircle2, Shield } from "lucide-react"
import { HireBeeLogo } from "@/components/hirebee-logo"

export const metadata: Metadata = {
  title: "How HireBee Works — ATS Resume Scanner & Optimizer",
  description:
    "See how HireBee's AI analyzes your resume against real ATS filters, finds what's missing, rewrites weak sections, and helps you land more interviews.",
  alternates: { canonical: "https://hirebee.app/how-it-works" },
  openGraph: {
    title: "How HireBee Works",
    description: "From paste to polished in 5 steps. See how HireBee finds exactly what's blocking your resume.",
    url: "https://hirebee.app/how-it-works",
  },
}

const STEPS = [
  {
    num: "01",
    icon: Upload,
    title: "Paste your resume and the job description",
    description:
      "No file formatting required. Paste your resume text directly — or upload a PDF or Word file. Then paste the job description you're applying to. That's all the input HireBee needs.",
    detail: "Works with any resume format. PDF, DOCX, or plain text — HireBee extracts the content and normalizes it for analysis.",
  },
  {
    num: "02",
    icon: Cpu,
    title: "HireBee simulates real ATS filters",
    description:
      "Our AI runs your resume through the same keyword-matching and formatting checks used by Applicant Tracking Systems like Workday, Greenhouse, and Lever — without needing access to those systems.",
    detail: "We analyze keyword density, section header names, formatting compatibility, and role-specific language patterns.",
  },
  {
    num: "03",
    icon: BarChart2,
    title: "You get a detailed score and gap breakdown",
    description:
      "Your score is broken down by keyword match, formatting, experience impact, and ATS readability. You see exactly which keywords you're missing — pulled directly from the job description.",
    detail: "Color-coded severity flags (high / medium / low) tell you what to fix first. No vague advice — every suggestion is specific.",
  },
  {
    num: "04",
    icon: Wand2,
    title: "AI rewrites what's weak",
    description:
      "HireBee rewrites your weakest bullet points, adds the missing keywords naturally, and restructures your summary to lead with impact. Every rewrite is tailored to the specific job you're applying for.",
    detail: "Powered by Claude AI (Anthropic). The rewrites match your voice and experience — not a generic template.",
  },
  {
    num: "05",
    icon: Download,
    title: "Apply with a polished, ATS-ready resume",
    description:
      "Export your improved resume as a clean PDF using one of 5 professional templates. Ready to submit. No design software, no manual formatting.",
    detail: "All templates are tested for ATS parser compatibility — no tables, no graphics, no columns that break automated reading.",
  },
]

const FAQS = [
  {
    q: "Does HireBee actually simulate real ATS systems?",
    a: "HireBee's AI is calibrated against the keyword-matching and formatting rules used by major ATS platforms. It won't perfectly replicate every system, but it catches the patterns that cause 90%+ of ATS rejections: missing keywords, non-standard headers, and formatting that breaks parsers.",
  },
  {
    q: "Do I need to create an account to use it?",
    a: "No. The ATS scanner at hirebee.app/analyze is completely free and requires no signup. To use the resume builder, cover letter generator, and LinkedIn optimizer, you'll need an account — but the 7-day free trial unlocks everything.",
  },
  {
    q: "How is HireBee different from other resume checkers?",
    a: "Most resume checkers give generic feedback like 'add more action verbs'. HireBee compares your resume to the specific job description and tells you the exact keywords to add, the exact bullets to rewrite, and exactly why your score is what it is.",
  },
  {
    q: "Is my resume data kept private?",
    a: "Yes. Your resume content is used only to generate your analysis and is not stored longer than necessary or shared with third parties. See our Privacy Policy for full details.",
  },
]

export default function HowItWorksPage() {
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
            <Link href="/tools" className="text-sm text-white/45 hover:text-white transition-colors">Tools</Link>
            <Link href="/how-it-works" className="text-sm text-white/80 font-medium">How it works</Link>
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
          <p className="text-xs font-semibold text-teal-400 uppercase tracking-widest mb-4">5 steps · under 2 minutes</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">
            From "why no callbacks"<br />
            <span className="text-teal-400">to interview-ready</span>
          </h1>
          <p className="text-white/50 text-lg leading-relaxed">
            Most resumes get rejected before a human reads them. HireBee shows you exactly why — and fixes it.
          </p>
        </div>
      </section>

      {/* Problem stat bar */}
      <section className="border-b border-white/6 px-6 py-8">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-6 text-center">
          {[
            { stat: "75%", label: "of resumes are rejected by ATS before a recruiter reads them" },
            { stat: "6 sec", label: "average time a recruiter spends on a resume that passes ATS" },
            { stat: "80%", label: "of ATS rejections are caused by missing keywords — fixable in minutes" },
          ].map((item) => (
            <div key={item.label} className="px-4">
              <p className="text-3xl font-extrabold text-teal-400 mb-1">{item.stat}</p>
              <p className="text-xs text-white/40 leading-relaxed">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-0">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              const isLast = i === STEPS.length - 1
              return (
                <div key={step.num} className="flex gap-6">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-teal-400" />
                    </div>
                    {!isLast && <div className="w-px flex-1 bg-white/8 my-3" />}
                  </div>

                  {/* Content */}
                  <div className={`flex-1 pb-10 ${isLast ? "" : ""}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold text-teal-500/60 tracking-widest">{step.num}</span>
                    </div>
                    <h2 className="text-lg font-bold text-white mb-2">{step.title}</h2>
                    <p className="text-white/55 text-sm leading-relaxed mb-3">{step.description}</p>
                    <div className="flex items-start gap-2 bg-white/4 border border-white/8 rounded-lg px-3 py-2.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                      <p className="text-xs text-white/40 leading-relaxed">{step.detail}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="px-6 py-12 border-t border-b border-white/6 bg-white/2">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-white/30 uppercase tracking-widest text-center mb-8">Why trust HireBee</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: Cpu,
                title: "Powered by Claude AI",
                desc: "Every analysis and rewrite runs on Claude (Anthropic) — one of the most capable AI models available.",
              },
              {
                icon: Shield,
                title: "Your data stays private",
                desc: "Resume content is used only to generate your analysis. Never shared, never sold. See our Privacy Policy.",
              },
              {
                icon: CheckCircle2,
                title: "Free to start, no credit card",
                desc: "The ATS scanner is completely free. No account required. The 7-day trial unlocks everything else.",
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="text-center px-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-white/50" />
                  </div>
                  <p className="text-sm font-semibold text-white mb-1">{item.title}</p>
                  <p className="text-xs text-white/35 leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-extrabold text-white mb-8 text-center">Common questions</h2>
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
      <section className="px-6 py-16 border-t border-white/6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-extrabold text-white mb-3">Try it now — it&apos;s free</h2>
          <p className="text-white/40 text-sm mb-7">No signup. Paste your resume and job description and get your score in 60 seconds.</p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 bg-gradient-to-b from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-semibold px-7 py-3 rounded-full shadow-lg shadow-teal-500/25 transition-all"
          >
            Scan my resume free <ArrowRight className="w-4 h-4" />
          </Link>
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
