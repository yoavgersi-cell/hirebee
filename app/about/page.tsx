import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Mail, Shield, Cpu, Target } from "lucide-react"
import { HireBeeLogo } from "@/components/hirebee-logo"

export const metadata: Metadata = {
  title: "About HireBee — AI Resume Optimizer for Job Seekers",
  description:
    "HireBee is an AI-powered resume tool that helps job seekers understand why they're not getting callbacks — and fix it. Built on Claude AI by Anthropic.",
  alternates: { canonical: "https://hirebee.app/about" },
  openGraph: {
    title: "About HireBee",
    description: "We built HireBee because the hiring process is broken. ATS software filters out qualified candidates before a human ever reads their resume.",
    url: "https://hirebee.app/about",
  },
}

export default function AboutPage() {
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
      <section className="px-6 py-20 border-b border-white/6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">
            The hiring system is broken.<br />
            <span className="text-teal-400">We&apos;re fixing your side of it.</span>
          </h1>
          <p className="text-white/50 text-lg leading-relaxed">
            75% of resumes are rejected by software before a recruiter ever opens them. Not because the candidates weren&apos;t qualified — because their resumes weren&apos;t formatted for machines.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="px-6 py-16 border-b border-white/6">
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-semibold text-teal-400 uppercase tracking-widest mb-4">Why we built this</p>
              <h2 className="text-2xl font-extrabold text-white mb-4 leading-tight">
                Qualified people shouldn&apos;t lose to a keyword filter
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mb-4">
                Applicant Tracking Systems were built to help recruiters manage volume — not to find the best candidates. They filter by keyword matches, section names, and formatting rules that most job seekers have never heard of.
              </p>
              <p className="text-white/50 text-sm leading-relaxed">
                HireBee levels the playing field. We give every job seeker the same insight that a recruiter consultant would charge hundreds of dollars for — in under a minute, for free.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { stat: "75%", label: "of applications never reach a human recruiter" },
                { stat: "6 sec", label: "time recruiters spend on resumes that do get through" },
                { stat: "80%", label: "of ATS rejections caused by missing keywords" },
                { stat: "3×", label: "more callbacks reported after optimizing with HireBee" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 bg-white/3 border border-white/8 rounded-xl p-4">
                  <span className="text-2xl font-extrabold text-teal-400 shrink-0 w-14 text-right">{item.stat}</span>
                  <p className="text-sm text-white/50">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="px-6 py-16 border-b border-white/6 bg-white/2">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold text-white/30 uppercase tracking-widest text-center mb-10">What we&apos;re built on</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: Cpu,
                title: "Claude AI by Anthropic",
                desc: "Every analysis, rewrite, and score is powered by Claude — one of the most capable and safety-focused AI models. We chose Claude because it follows instructions precisely, which matters when you're rewriting someone's career document.",
              },
              {
                icon: Target,
                title: "ATS-calibrated scoring",
                desc: "Our scoring model is calibrated against the keyword and formatting patterns used by major ATS platforms including Workday, Greenhouse, and Lever — the systems handling the majority of enterprise job applications.",
              },
              {
                icon: Shield,
                title: "Privacy by design",
                desc: "Your resume is your personal data. We use it only to run your analysis. We don't sell it, train on it, or share it. You can delete your account and all associated data at any time.",
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="bg-white/3 border border-white/8 rounded-2xl p-5">
                  <div className="w-9 h-9 rounded-lg bg-teal-500/15 border border-teal-500/25 flex items-center justify-center mb-4">
                    <Icon className="w-4 h-4 text-teal-400" />
                  </div>
                  <p className="text-sm font-semibold text-white mb-2">{item.title}</p>
                  <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Who we help */}
      <section className="px-6 py-16 border-b border-white/6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold text-teal-400 uppercase tracking-widest text-center mb-4">Who uses HireBee</p>
          <h2 className="text-2xl font-extrabold text-white text-center mb-10">
            Anyone who&apos;s applying and not hearing back
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Recent graduates", desc: "Building their first professional resume and not sure what ATS even means." },
              { title: "Career changers", desc: "Switching industries and unsure how to translate their experience into the right keywords." },
              { title: "Experienced professionals", desc: "Getting fewer callbacks than expected despite strong experience." },
              { title: "International job seekers", desc: "Applying in a new country where resume conventions and ATS usage are different." },
            ].map((item) => (
              <div key={item.title} className="bg-white/3 border border-white/8 rounded-xl p-5">
                <p className="text-sm font-semibold text-white mb-1.5">{item.title}</p>
                <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & company */}
      <section className="px-6 py-16 border-b border-white/6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-6">Get in touch</p>
          <a
            href="mailto:hello@hirebee.app"
            className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-semibold text-lg transition-colors mb-4"
          >
            <Mail className="w-5 h-5" />
            hello@hirebee.app
          </a>
          <p className="text-white/30 text-sm">
            We read every email. If you have feedback, a bug report, or just want to share that HireBee helped you land an interview — we want to hear it.
          </p>
          <div className="mt-8 pt-8 border-t border-white/6 text-xs text-white/20 space-y-1">
            <p>HireBee is operated by <span className="text-white/35">Planner hub</span></p>
            <p>
              <Link href="/privacy" className="hover:text-white/40 transition-colors">Privacy Policy</Link>
              {" · "}
              <Link href="/terms" className="hover:text-white/40 transition-colors">Terms of Service</Link>
              {" · "}
              <Link href="/refund" className="hover:text-white/40 transition-colors">Refund Policy</Link>
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-extrabold text-white mb-3">See what&apos;s blocking your resume</h2>
          <p className="text-white/40 text-sm mb-7">Free ATS scan · no signup required · 60 seconds</p>
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
