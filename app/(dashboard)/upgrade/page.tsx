"use client"

import { useSession } from "next-auth/react"
import { CheckCircle2, ShieldCheck, Crown, ArrowRight, TrendingUp, AlertTriangle, Zap } from "lucide-react"
import { PaddleButton } from "@/components/paddle-button"

const FEATURES = [
  "Fix all resume issues in one click",
  "Add missing keywords recruiters look for",
  "Turn weak bullet points into measurable impact",
  "Match your resume to any job description",
  "Download a clean, ATS-friendly PDF (no branding)",
]

const BULLETS = [
  { icon: TrendingUp, text: "See your real resume score" },
  { icon: Zap,        text: "Fix missing keywords instantly" },
  { icon: CheckCircle2, text: "Turn weak bullets into strong, measurable results" },
]

export default function UpgradePage() {
  const { data: session } = useSession()

  return (
    <div className="min-h-[calc(100vh-7rem)] flex items-center">
      <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-8">

        {/* ── LEFT: Value / Messaging ── */}
        <div className="space-y-8">
          {/* Headline */}
          <div>
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              <AlertTriangle className="w-3.5 h-3.5" />
              75% of resumes are rejected before a human sees them
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              Get more interviews with a resume that actually passes ATS
            </h1>
            <p className="text-gray-500 text-base leading-relaxed">
              Most resumes get filtered before a human sees them.<br />
              Fix yours in minutes.
            </p>
          </div>

          {/* Bullet points */}
          <div className="space-y-4">
            {BULLETS.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-teal-600" />
                </div>
                <p className="text-gray-700 font-medium text-sm leading-relaxed pt-1.5">{text}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4">
              <p className="text-2xl font-extrabold text-gray-900">75%</p>
              <p className="text-xs text-gray-400 mt-0.5">of resumes rejected by ATS</p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4">
              <p className="text-2xl font-extrabold text-gray-900">3×</p>
              <p className="text-xs text-gray-400 mt-0.5">more interviews after optimization</p>
            </div>
          </div>

          {/* Mock score UI */}
          <div className="bg-gray-950 rounded-2xl p-5 max-w-sm">
            <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest mb-4">Resume Diagnosis</p>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-16 h-16 shrink-0">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                  <circle cx="32" cy="32" r="26" fill="none" stroke="#f97316" strokeWidth="6"
                    strokeDasharray={`${0.62 * 163.36} 163.36`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-extrabold text-white">62</span>
                </div>
              </div>
              <div className="flex-1 space-y-2">
                {[
                  { label: "ATS Readability", val: 55 },
                  { label: "Keywords", val: 40 },
                  { label: "Impact", val: 70 },
                ].map(({ label, val }) => (
                  <div key={label}>
                    <div className="flex justify-between text-[10px] text-white/35 mb-1">
                      <span>{label}</span><span>{val}%</span>
                    </div>
                    <div className="h-1 bg-white/6 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-orange-500/70" style={{ width: `${val}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 bg-amber-500/8 border border-amber-500/15 rounded-lg px-3 py-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <p className="text-[11px] text-amber-300/80">Likely filtered before a recruiter sees it</p>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Pricing card ── */}
        <div className="lg:sticky lg:top-24">
          <div className="bg-gray-950 rounded-2xl p-7">
            <div className="flex items-center gap-2 mb-5">
              <Crown className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Pro — Full Resume Optimization</span>
            </div>

            <div className="mb-1">
              <div className="flex items-end gap-1.5">
                <span className="text-5xl font-extrabold text-white leading-none">$19</span>
                <span className="text-white/40 mb-1.5 text-sm">/month after trial</span>
              </div>
            </div>
            <p className="text-sm text-teal-400 font-semibold mb-6">7-day free trial — no charge today</p>

            <div className="space-y-3 mb-7">
              {FEATURES.map((f) => (
                <div key={f} className="flex items-start gap-3 text-sm text-white/65">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  {f}
                </div>
              ))}
            </div>

            {/* Before / After */}
            <div className="rounded-xl border border-white/8 bg-white/3 p-4 mb-7">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3">AI in action</p>
              <div className="space-y-2.5">
                <div>
                  <p className="text-[10px] text-red-400/70 font-semibold uppercase tracking-wider mb-1">Before</p>
                  <p className="text-xs text-white/40 italic">Responsible for managing marketing campaigns</p>
                </div>
                <div className="h-px bg-white/6" />
                <div>
                  <p className="text-[10px] text-teal-400 font-semibold uppercase tracking-wider mb-1">After</p>
                  <p className="text-xs text-white/80 italic">Increased lead conversion by 34% across 6 campaigns, generating $2.1M in pipeline</p>
                </div>
              </div>
            </div>

            {session?.user ? (
              <PaddleButton
                userId={session.user.id!}
                email={session.user.email ?? ""}
                label="Start free trial →"
                className="w-full bg-gradient-to-b from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-bold text-sm h-12 rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-teal-500/30 active:scale-[0.98]"
              />
            ) : (
              <a
                href="/login"
                className="w-full bg-gradient-to-b from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-bold text-sm h-12 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-500/30 active:scale-[0.98]"
              >
                Start free trial <ArrowRight className="w-4 h-4" />
              </a>
            )}

            <p className="text-[11px] text-white/30 text-center mt-2.5">No charge today. Cancel anytime before day 7.</p>

            <p className="text-[10px] text-white/20 text-center mt-2 leading-relaxed px-2">
              By starting your trial you agree to our{" "}
              <a href="/terms" className="underline hover:text-white/40 transition-colors">Terms of Service</a>
              {" "}and{" "}
              <a href="/privacy" className="underline hover:text-white/40 transition-colors">Privacy Policy</a>.
              After 7 days you will be charged <strong className="text-white/30">$19/month</strong> via Paddle unless you cancel.{" "}
              <a href="/refund" className="underline hover:text-white/40 transition-colors">Refund policy</a>.
            </p>

            <div className="flex items-center justify-center gap-4 mt-5 pt-5 border-t border-white/6">
              <span className="flex items-center gap-1.5 text-xs text-white/25">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> No charge for 7 days
              </span>
              <span className="flex items-center gap-1.5 text-xs text-white/25">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Cancel in 1 click
              </span>
              <span className="flex items-center gap-1.5 text-xs text-white/25">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Secure via Paddle
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
