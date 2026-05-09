"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Mail, Sparkles, Copy, Check, X,
  Zap, Building2, Briefcase, CheckCircle2, Lock,
  Target, TrendingUp, UserCheck, AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"

// ─── Constants ────────────────────────────────────────────────────────────────

const LOADING_MESSAGES = [
  "Analyzing job requirements...",
  "Matching with your experience...",
  "Writing a tailored cover letter...",
]

type Step = "input" | "insights" | "loading" | "result"
type ImproveType = "match" | "impact" | "tailored" | "recruiter"

interface Insights { company: string; role: string; skills: string[] }

interface ResultData {
  letter: string
  matchScore: number
  strengths: string[]
  gaps: string[]
  recruiterPov: string
  optimizedFor: string[]
}

// ─── Score helpers ─────────────────────────────────────────────────────────────

function scoreLabel(s: number) {
  if (s >= 70) return "Strong match — ready to send 🎯"
  if (s >= 50) return "Good foundation — let's sharpen it 🚀"
  return "Let's close these gaps together 💪"
}
function scoreColor(s: number) {
  if (s >= 70) return "#22c55e"
  if (s >= 50) return "#f59e0b"
  return "#f87171"
}
function scoreBadgeCls(s: number) {
  if (s >= 70) return "bg-green-50 border-green-200 text-green-700"
  if (s >= 50) return "bg-amber-50 border-amber-200 text-amber-700"
  return "bg-red-50 border-red-200 text-red-600"
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function CoverLetterClient({ hasAccess }: { hasAccess: boolean }) {
  const router = useRouter()
  const [step, setStep] = useState<Step>("input")
  const [jobDescription, setJobDescription] = useState("")
  const [jobLink, setJobLink] = useState("")
  const [insights, setInsights] = useState<Insights | null>(null)
  const [result, setResult] = useState<ResultData | null>(null)
  const [extracting, setExtracting] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const [improving, setImproving] = useState<ImproveType | null>(null)
  const [letterFading, setLetterFading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [improvementCount, setImprovementCount] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const FREE_IMPROVEMENT_LIMIT = 3

  useEffect(() => {
    if (step === "loading") {
      setLoadingStep(0)
      intervalRef.current = setInterval(() => {
        setLoadingStep(p => Math.min(p + 1, LOADING_MESSAGES.length - 1))
      }, 1900)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [step])

  async function handleExtract() {
    if (!jobDescription.trim()) { toast.error("Paste a job description first"); return }
    setExtracting(true)
    try {
      const res = await fetch("/api/cover-letter", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "extract", jobDescription }),
      })
      const data = await res.json()
      setInsights(data.insights ?? { company: "", role: "", skills: [] })
      setStep("insights")
    } catch {
      toast.error("Failed to analyze job description")
    } finally { setExtracting(false) }
  }

  async function handleGenerate() {
    if (!hasAccess) { setShowUpgradeModal(true); return }
    setStep("loading")
    try {
      const res = await fetch("/api/cover-letter", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "generate", jobDescription }),
      })
      const data = await res.json()
      if (res.status === 402) { setStep("insights"); setShowUpgradeModal(true); return }
      if (res.status === 400 && data.error?.includes("No CV")) {
        setStep("input")
        toast.error("No CV found", {
          description: "Run a CV analysis first so we have your background on file.",
          action: { label: "Analyze CV →", onClick: () => router.push("/analyze") },
          duration: 8000,
        })
        return
      }
      if (!res.ok) throw new Error(data.error ?? "Generation failed")
      setResult(data)
      setImprovementCount(0)
      setStep("result")
    } catch (err) {
      setStep("insights")
      toast.error(err instanceof Error ? err.message : "Something went wrong")
    }
  }

  async function handleImprove(type: ImproveType) {
    if (!hasAccess) { setShowUpgradeModal(true); return }
    if (!hasAccess && improvementCount >= FREE_IMPROVEMENT_LIMIT) { setShowUpgradeModal(true); return }
    if (!result) return
    setImproving(type)
    setLetterFading(true)
    try {
      const res = await fetch("/api/cover-letter", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "improve", letter: result.letter, type, jobDescription }),
      })
      const data = await res.json()
      if (res.status === 402) { setShowUpgradeModal(true); return }
      if (!res.ok) throw new Error(data.error ?? "Improvement failed")
      setResult(prev => prev ? { ...prev, letter: data.letter } : prev)
      setImprovementCount(p => p + 1)
    } catch {
      toast.error("Improvement failed — please try again")
    } finally {
      setImproving(null)
      setTimeout(() => setLetterFading(false), 400)
    }
  }

  async function copy() {
    if (!result) return
    await navigator.clipboard.writeText(result.letter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function reset() {
    setStep("input")
    setResult(null)
    setInsights(null)
    setJobDescription("")
    setJobLink("")
    setImprovementCount(0)
  }

  return (
    <div className="max-w-2xl mx-auto">
      {showUpgradeModal && (
        <UpgradeModal onClose={() => setShowUpgradeModal(false)} />
      )}
      {step === "input" && (
        <InputStep
          hasAccess={hasAccess}
          jobDescription={jobDescription} setJobDescription={setJobDescription}
          jobLink={jobLink} setJobLink={setJobLink}
          extracting={extracting}
          onSubmit={handleExtract}
          onUpgrade={() => setShowUpgradeModal(true)}
        />
      )}
      {step === "insights" && insights && (
        <InsightsStep insights={insights} onGenerate={handleGenerate} onBack={() => setStep("input")} />
      )}
      {step === "loading" && <LoadingStep loadingStep={loadingStep} />}
      {step === "result" && result && (
        <ResultStep
          result={result}
          copied={copied}
          improving={improving}
          letterFading={letterFading}
          hasAccess={hasAccess}
          improvementCount={improvementCount}
          freeLimit={FREE_IMPROVEMENT_LIMIT}
          onCopy={copy}
          onImprove={handleImprove}
          onReset={reset}
          onUpgrade={() => setShowUpgradeModal(true)}
        />
      )}
    </div>
  )
}

// ─── Step: Input ──────────────────────────────────────────────────────────────

function InputStep({ hasAccess, jobDescription, setJobDescription, jobLink, setJobLink, extracting, onSubmit, onUpgrade }: {
  hasAccess: boolean
  jobDescription: string; setJobDescription: (v: string) => void
  jobLink: string; setJobLink: (v: string) => void
  extracting: boolean
  onSubmit: () => void
  onUpgrade: () => void
}) {
  return (
    <div className="space-y-6">
      <div className="text-center pt-2 pb-1">
        <div className="inline-flex items-center gap-1.5 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
          <Zap className="w-3 h-3" /> AI-powered • ATS optimized
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900 mb-2 leading-tight">
          Get a cover letter that<br />actually gets replies
        </h1>
        <p className="text-sm text-gray-400">Takes 10 seconds • optimized for ATS + recruiters</p>
      </div>

      {!hasAccess && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center gap-3">
          <Lock className="w-4 h-4 text-amber-600 shrink-0" />
          <p className="text-sm text-amber-800">
            <span className="font-semibold">Pro feature.</span>{" "}
            Paste a job description to preview AI insights, then{" "}
            <button onClick={onUpgrade} className="underline font-semibold hover:text-amber-900">upgrade to generate →</button>
          </p>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Job description</label>
          <textarea
            className="w-full h-44 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-gray-300 placeholder:text-gray-400"
            placeholder="Paste the full job posting here — title, responsibilities, requirements..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) onSubmit() }}
          />
        </div>
        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
            Job link <span className="text-gray-300 font-normal normal-case tracking-normal">(optional)</span>
          </label>
          <input
            className="w-full text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-300 placeholder:text-gray-400"
            placeholder="https://..."
            value={jobLink}
            onChange={(e) => setJobLink(e.target.value)}
          />
        </div>
        <Button
          onClick={onSubmit}
          disabled={extracting || !jobDescription.trim()}
          className="w-full bg-gray-950 hover:bg-gray-800 text-white h-11 gap-2 text-sm font-semibold rounded-xl"
        >
          {extracting ? (
            <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Analyzing job...</>
          ) : (
            <><Sparkles className="w-4 h-4" /> Write my cover letter</>
          )}
        </Button>
      </div>
    </div>
  )
}

// ─── Step: Insights ───────────────────────────────────────────────────────────

function InsightsStep({ insights, onGenerate, onBack }: {
  insights: Insights; onGenerate: () => void; onBack: () => void
}) {
  return (
    <div className="space-y-4">
      <div>
        <button onClick={onBack} className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1 mb-4 transition-colors">← Back</button>
        <h2 className="text-lg font-bold text-gray-900">We analyzed the job posting</h2>
        <p className="text-sm text-gray-400 mt-0.5">Confirm the details — we'll tailor every sentence to this role.</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
            <Building2 className="w-4 h-4 text-gray-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Company</p>
            <p className="text-sm font-semibold text-gray-900">{insights.company || "Not detected"}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
            <Briefcase className="w-4 h-4 text-gray-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Role</p>
            <p className="text-sm font-semibold text-gray-900">{insights.role || "Not detected"}</p>
          </div>
        </div>
        <div className="px-5 py-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Key skills detected</p>
          {insights.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {insights.skills.map(s => (
                <span key={s} className="text-xs font-medium bg-teal-50 text-teal-700 border border-teal-200 px-2.5 py-1 rounded-full">{s}</span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400">No specific skills detected</p>
          )}
        </div>
      </div>
      <Button onClick={onGenerate} className="w-full bg-gray-950 hover:bg-gray-800 text-white h-11 gap-2 text-sm font-semibold rounded-xl">
        <Sparkles className="w-4 h-4" /> Looks good — generate my letter
      </Button>
    </div>
  )
}

// ─── Step: Loading ────────────────────────────────────────────────────────────

function LoadingStep({ loadingStep }: { loadingStep: number }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[420px] text-center px-4">
      <div className="w-14 h-14 rounded-2xl bg-gray-950 flex items-center justify-center mb-8 shadow-lg">
        <Sparkles className="w-6 h-6 text-white" />
      </div>
      <div className="space-y-4 w-full max-w-xs">
        {LOADING_MESSAGES.map((msg, i) => (
          <div key={msg} className={`flex items-center gap-3 text-sm transition-all duration-500 ${i < loadingStep ? "text-gray-400" : i === loadingStep ? "text-gray-900 font-semibold" : "text-gray-300"}`}>
            {i < loadingStep
              ? <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
              : i === loadingStep
              ? <span className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin shrink-0" />
              : <span className="w-4 h-4 rounded-full border-2 border-gray-200 shrink-0" />
            }
            {msg}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Step: Result ─────────────────────────────────────────────────────────────

const IMPROVE_ACTIONS: { type: ImproveType; label: string; Icon: React.ElementType; desc: string }[] = [
  { type: "match",    label: "Improve match score",     Icon: Target,    desc: "Weave in more keywords from the JD" },
  { type: "impact",   label: "Add measurable impact",   Icon: TrendingUp, desc: "Add metrics and quantified results" },
  { type: "tailored", label: "Tailor to company",       Icon: Building2, desc: "Make it feel written for this company" },
  { type: "recruiter",label: "Impress recruiters",      Icon: UserCheck, desc: "Sharpen opening, maximize first impression" },
]

function ResultStep({
  result, copied, improving, letterFading, hasAccess, improvementCount, freeLimit,
  onCopy, onImprove, onReset, onUpgrade,
}: {
  result: ResultData
  copied: boolean
  improving: ImproveType | null
  letterFading: boolean
  hasAccess: boolean
  improvementCount: number
  freeLimit: number
  onCopy: () => void
  onImprove: (type: ImproveType) => void
  onReset: () => void
  onUpgrade: () => void
}) {
  const atLimit = !hasAccess && improvementCount >= freeLimit
  const color = scoreColor(result.matchScore)
  const badgeCls = scoreBadgeCls(result.matchScore)

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Your cover letter</h2>
          <p className="text-xs text-gray-400 mt-0.5">Tailored for this specific role</p>
        </div>
        <button onClick={onReset} className="text-xs text-gray-400 hover:text-gray-700 transition-colors">Start over</button>
      </div>

      {/* 1. Match Score Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <div className="flex items-start gap-5">
          {/* Score circle */}
          <div className="shrink-0 flex flex-col items-center">
            <div
              className="w-20 h-20 rounded-2xl border-2 flex flex-col items-center justify-center"
              style={{ borderColor: color, backgroundColor: `${color}12` }}
            >
              <span className="text-2xl font-black tabular-nums" style={{ color }}>{result.matchScore}%</span>
              <span className="text-[9px] font-bold uppercase tracking-wide mt-0.5" style={{ color }}>match</span>
            </div>
          </div>
          {/* Label + bar + tags */}
          <div className="flex-1 min-w-0 pt-1">
            <p className="text-sm font-bold text-gray-900 mb-2">{scoreLabel(result.matchScore)}</p>
            {/* Progress bar */}
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-3">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${result.matchScore}%`, backgroundColor: color }}
              />
            </div>
            {/* Optimized for */}
            {result.optimizedFor.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {result.optimizedFor.map(s => (
                  <span key={s} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">{s}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Why This Score */}
      {(result.strengths.length > 0 || result.gaps.length > 0) && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-4">Why this score</p>
          <div className="space-y-4">
            {result.strengths.length > 0 && (
              <div className="space-y-2">
                {result.strengths.map((s, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                    <p className="text-xs text-gray-700 leading-relaxed">{s}</p>
                  </div>
                ))}
              </div>
            )}
            {result.gaps.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-gray-100">
                {result.gaps.map((g, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                    <p className="text-xs text-gray-600 leading-relaxed">{g}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. Recruiter POV */}
      {result.recruiterPov && (
        <div className="bg-gray-950 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm">💡</span>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Recruiter POV</p>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">{result.recruiterPov}</p>
        </div>
      )}

      {/* 4. Action Buttons */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Improve your letter</p>
          {!hasAccess && (
            <span className="text-[10px] text-gray-400">
              {atLimit
                ? <button onClick={onUpgrade} className="text-teal-600 hover:underline font-semibold">Unlock unlimited →</button>
                : `${freeLimit - improvementCount} improvement${freeLimit - improvementCount === 1 ? "" : "s"} left`
              }
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {IMPROVE_ACTIONS.map(({ type, label, Icon, desc }) => {
            const locked = atLimit
            const isActive = improving === type
            return (
              <button
                key={type}
                onClick={() => locked ? onUpgrade() : onImprove(type)}
                disabled={!!improving && !isActive}
                className={`flex items-start gap-2.5 p-3 rounded-xl border text-left transition-all disabled:opacity-40 group ${
                  isActive
                    ? "border-teal-300 bg-teal-50"
                    : locked
                    ? "border-gray-100 bg-gray-50 cursor-pointer"
                    : "border-gray-200 hover:border-gray-400 hover:bg-gray-50"
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isActive
                    ? <span className="w-3.5 h-3.5 border border-teal-500 border-t-transparent rounded-full animate-spin block" />
                    : locked
                    ? <Lock className="w-3.5 h-3.5 text-gray-300" />
                    : <Icon className="w-3.5 h-3.5 text-gray-500 group-hover:text-gray-900 transition-colors" />
                  }
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-800 leading-tight">{label}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{desc}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* 5. Copy button row */}
      <div className="flex gap-2">
        <button
          onClick={onCopy}
          className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 border border-gray-200 hover:border-gray-400 bg-white px-4 py-2.5 rounded-xl transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied!" : "Copy letter"}
        </button>
      </div>

      {/* 6. Letter body */}
      <div className={`bg-white border border-gray-200 rounded-2xl overflow-hidden transition-opacity duration-400 ${letterFading ? "opacity-40" : "opacity-100"}`}>
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-semibold text-gray-700">Cover letter</span>
          </div>
          {improving && (
            <span className="text-[10px] text-teal-600 font-semibold animate-pulse">Rewriting...</span>
          )}
        </div>
        <div className="px-6 py-5">
          <pre className="whitespace-pre-wrap text-sm text-gray-800 leading-relaxed font-sans">{result.letter}</pre>
        </div>
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between gap-4">
          <p className="text-xs text-gray-400">Personalize any company-specific details before sending.</p>
          <button onClick={onReset} className="text-xs text-gray-500 hover:text-gray-700 underline whitespace-nowrap transition-colors">New letter</button>
        </div>
      </div>
    </div>
  )
}

// ─── Upgrade Modal ────────────────────────────────────────────────────────────

function UpgradeModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-300 hover:text-gray-500 transition-colors">
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-gray-950 flex items-center justify-center shrink-0">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Unlock full optimization</p>
            <p className="text-xs text-gray-400 mt-0.5">Pro — everything you need to get the job</p>
          </div>
        </div>
        <div className="space-y-2.5 mb-5">
          {[
            "Unlimited cover letter generations",
            "Unlimited AI rewrites & improvements",
            "Higher match scores with smart keyword matching",
            "Advanced recruiter insights",
          ].map(item => (
            <div key={item} className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />
              <p className="text-xs text-gray-700">{item}</p>
            </div>
          ))}
        </div>
        <a href="/upgrade" className="block w-full text-center bg-gray-950 hover:bg-gray-800 text-white font-bold py-3 rounded-xl text-sm transition-colors">
          Upgrade to Pro →
        </a>
        <button onClick={onClose} className="w-full text-center text-xs text-gray-300 hover:text-gray-500 mt-3 py-1 transition-colors">
          Maybe later
        </button>
      </div>
    </div>
  )
}
