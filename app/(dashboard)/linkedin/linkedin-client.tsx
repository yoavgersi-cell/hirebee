"use client"

import { useState, useEffect, useRef } from "react"
import { toast } from "sonner"
import {
  Zap, FileText, TrendingUp, UserCheck,
  CheckCircle2, AlertTriangle, Copy, Check, ArrowRight,
} from "lucide-react"

// LinkedIn icon (lucide-react doesn't export Linkedin in this version)
const LinkedInIcon = () => (
  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)
import { Button } from "@/components/ui/button"

// ─── Constants ────────────────────────────────────────────────────────────────

const LOADING_MESSAGES = [
  "Reading your profile...",
  "Identifying recruiter signals...",
  "Generating your score...",
]

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = "input" | "loading" | "result"
type ImproveType = "headline" | "about" | "impact" | "recruiter"

interface AnalysisResult {
  score: number
  strengths: string[]
  gaps: string[]
  recruiterPov: string
  optimizedFor: string[]
}

interface Improvement {
  section: "headline" | "about"
  before: string
  after: string
  delta: string
}

// ─── Score helpers ─────────────────────────────────────────────────────────────

function scoreLabel(s: number) {
  if (s >= 70) return "Strong profile — ready for recruiters 🎯"
  if (s >= 50) return "Good foundation — let's sharpen it 🚀"
  return "Needs work to get noticed 💪"
}
function scoreColor(s: number) {
  if (s >= 70) return "#22c55e"
  if (s >= 50) return "#f59e0b"
  return "#f87171"
}

// ─── Improve actions config ────────────────────────────────────────────────────

const IMPROVE_ACTIONS: { type: ImproveType; label: string; Icon: React.ElementType; desc: string }[] = [
  { type: "headline",  label: "Improve headline",        Icon: Zap,        desc: "Make it specific and recruiter-ready" },
  { type: "about",     label: "Rewrite About section",   Icon: FileText,   desc: "Stronger positioning and story" },
  { type: "impact",    label: "Add measurable impact",   Icon: TrendingUp, desc: "Quantify achievements" },
  { type: "recruiter", label: "Recruiter-friendly",      Icon: UserCheck,  desc: "Optimize for search & first impression" },
]

// ─── Main Component ───────────────────────────────────────────────────────────

export function LinkedInClient({ hasAccess }: { hasAccess: boolean }) {
  const [step, setStep] = useState<Step>("input")
  const [headline, setHeadline] = useState("")
  const [about, setAbout] = useState("")
  const [experience, setExperience] = useState("")
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [improvements, setImprovements] = useState<Map<ImproveType, Improvement>>(new Map())
  const [improving, setImproving] = useState<ImproveType | null>(null)
  const [loadingStep, setLoadingStep] = useState(0)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

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

  async function handleAnalyze() {
    if (!headline.trim() && !about.trim()) {
      toast.error("Paste your headline or about section first")
      return
    }
    setStep("loading")
    try {
      const res = await fetch("/api/linkedin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "analyze", headline, about, experience }),
      })
      const data = await res.json()
      if (res.status === 402) { setStep("input"); return }
      if (!res.ok) throw new Error(data.error ?? "Analysis failed")
      setResult(data)
      setImprovements(new Map())
      setStep("result")
    } catch (err) {
      setStep("input")
      toast.error(err instanceof Error ? err.message : "Something went wrong")
    }
  }

  async function handleImprove(type: ImproveType) {
    if (!result) return
    setImproving(type)
    try {
      const res = await fetch("/api/linkedin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "improve", headline, about, experience, type }),
      })
      const data = await res.json()
      if (res.status === 402) return
      if (!res.ok) throw new Error(data.error ?? "Improvement failed")

      const before = data.section === "headline" ? headline : about
      setImprovements(prev => {
        const next = new Map(prev)
        next.set(type, { section: data.section, before, after: data.improved, delta: data.delta })
        return next
      })
    } catch {
      toast.error("Improvement failed — please try again")
    } finally {
      setImproving(null)
    }
  }

  async function copyText(text: string, key: string) {
    await navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  function reset() {
    setStep("input")
    setResult(null)
    setHeadline("")
    setAbout("")
    setExperience("")
    setImprovements(new Map())
  }

  return (
    <div className="max-w-2xl mx-auto">
      {step === "input" && (
        <InputStep
          headline={headline} setHeadline={setHeadline}
          about={about} setAbout={setAbout}
          experience={experience} setExperience={setExperience}
          onSubmit={handleAnalyze}
        />
      )}
      {step === "loading" && <LoadingStep loadingStep={loadingStep} />}
      {step === "result" && result && (
        <ResultStep
          result={result}
          improvements={improvements}
          improving={improving}
          copiedKey={copiedKey}
          onImprove={handleImprove}
          onCopy={copyText}
          onReset={reset}
        />
      )}
    </div>
  )
}

// ─── Step: Input ──────────────────────────────────────────────────────────────

function InputStep({
  headline, setHeadline,
  about, setAbout,
  experience, setExperience,
  onSubmit,
}: {
  headline: string; setHeadline: (v: string) => void
  about: string; setAbout: (v: string) => void
  experience: string; setExperience: (v: string) => void
  onSubmit: () => void
}) {
  const canSubmit = headline.trim() || about.trim()

  return (
    <div className="space-y-6">
      <div className="text-center pt-2 pb-1">
        <div className="inline-flex items-center gap-1.5 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
          <Zap className="w-3 h-3" /> Trial feature • AI-powered
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900 mb-2 leading-tight">
          Optimize your LinkedIn Profile
        </h1>
        <p className="text-sm text-gray-400">
          Paste your profile sections — we'll score, diagnose, and rewrite them for recruiters.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
            LinkedIn Headline
          </label>
          <input
            className="w-full text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-300 placeholder:text-gray-400"
            placeholder="e.g. Product Manager | B2C Growth | SaaS"
            value={headline}
            onChange={e => setHeadline(e.target.value)}
          />
        </div>
        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
            About Section
          </label>
          <textarea
            className="w-full h-36 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-gray-300 placeholder:text-gray-400"
            placeholder="Paste your LinkedIn About section..."
            value={about}
            onChange={e => setAbout(e.target.value)}
          />
        </div>
        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
            Experience <span className="text-gray-300 font-normal normal-case tracking-normal">(optional)</span>
          </label>
          <textarea
            className="w-full h-24 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-gray-300 placeholder:text-gray-400"
            placeholder="Paste 1-2 recent roles..."
            value={experience}
            onChange={e => setExperience(e.target.value)}
          />
        </div>
        <Button
          onClick={onSubmit}
          disabled={!canSubmit}
          className="w-full bg-gray-950 hover:bg-gray-800 text-white h-11 gap-2 text-sm font-semibold rounded-xl"
        >
          Analyze my LinkedIn <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

// ─── Step: Loading ────────────────────────────────────────────────────────────

function LoadingStep({ loadingStep }: { loadingStep: number }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[420px] text-center px-4">
      <div className="w-14 h-14 rounded-2xl bg-gray-950 flex items-center justify-center mb-8 shadow-lg">
        <LinkedInIcon />
      </div>
      <div className="space-y-4 w-full max-w-xs">
        {LOADING_MESSAGES.map((msg, i) => (
          <div
            key={msg}
            className={`flex items-center gap-3 text-sm transition-all duration-500 ${
              i < loadingStep
                ? "text-gray-400"
                : i === loadingStep
                ? "text-gray-900 font-semibold"
                : "text-gray-300"
            }`}
          >
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

function ResultStep({
  result, improvements, improving, copiedKey,
  onImprove, onCopy, onReset,
}: {
  result: AnalysisResult
  improvements: Map<ImproveType, Improvement>
  improving: ImproveType | null
  copiedKey: string | null
  onImprove: (type: ImproveType) => void
  onCopy: (text: string, key: string) => void
  onReset: () => void
}) {
  const color = scoreColor(result.score)

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Your LinkedIn Score</h2>
          <p className="text-xs text-gray-400 mt-0.5">AI analysis of your profile</p>
        </div>
        <button onClick={onReset} className="text-xs text-gray-400 hover:text-gray-700 transition-colors">
          Start over
        </button>
      </div>

      {/* A. Score Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <div className="flex items-start gap-5">
          <div className="shrink-0 flex flex-col items-center">
            <div
              className="w-20 h-20 rounded-2xl border-2 flex flex-col items-center justify-center"
              style={{ borderColor: color, backgroundColor: `${color}12` }}
            >
              <span className="text-2xl font-black tabular-nums" style={{ color }}>{result.score}%</span>
              <span className="text-[9px] font-bold uppercase tracking-wide mt-0.5" style={{ color }}>score</span>
            </div>
          </div>
          <div className="flex-1 min-w-0 pt-1">
            <p className="text-sm font-bold text-gray-900 mb-2">{scoreLabel(result.score)}</p>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-3">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${result.score}%`, backgroundColor: color }}
              />
            </div>
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

      {/* B. Why this score */}
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

      {/* C. Recruiter POV */}
      {result.recruiterPov && (
        <div className="bg-gray-950 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm">💡</span>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Recruiter POV</p>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">{result.recruiterPov}</p>
        </div>
      )}

      {/* D. Improve actions */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Improve your profile</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {IMPROVE_ACTIONS.map(({ type, label, Icon, desc }) => {
            const isActive = improving === type
            const isDone = improvements.has(type)
            return (
              <button
                key={type}
                onClick={() => onImprove(type)}
                disabled={!!improving && !isActive}
                className={`flex items-start gap-2.5 p-3 rounded-xl border text-left transition-all disabled:opacity-40 group ${
                  isActive
                    ? "border-teal-300 bg-teal-50"
                    : isDone
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200 hover:border-gray-400 hover:bg-gray-50"
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isActive
                    ? <span className="w-3.5 h-3.5 border border-teal-500 border-t-transparent rounded-full animate-spin block" />
                    : isDone
                    ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
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

      {/* E. Before/After transformations */}
      {improvements.size > 0 && (
        <div className="space-y-3">
          {Array.from(improvements.entries()).map(([type, imp]) => (
            <div key={type} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                <p className="text-xs font-bold text-gray-700 capitalize">{imp.section}</p>
                <span className="text-[10px] text-green-600 font-semibold bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                  ✅ {imp.delta}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                <div className="p-4">
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-2">Before</p>
                  <p className="text-xs text-gray-500 leading-relaxed bg-gray-50 rounded-lg p-3 whitespace-pre-wrap">{imp.before}</p>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[9px] font-bold text-teal-600 uppercase tracking-wider">After</p>
                    <button
                      onClick={() => onCopy(imp.after, type)}
                      className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-gray-700 transition-colors"
                    >
                      {copiedKey === type
                        ? <><Check className="w-3 h-3 text-emerald-500" /> Copied</>
                        : <><Copy className="w-3 h-3" /> Copy</>
                      }
                    </button>
                  </div>
                  <p className="text-xs text-gray-800 leading-relaxed bg-teal-50 border border-teal-100 rounded-lg p-3 whitespace-pre-wrap shadow-[0_0_12px_rgba(20,184,166,0.08)]">{imp.after}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* F. Bottom actions */}
      <div className="flex justify-center pt-1">
        <button
          onClick={onReset}
          className="text-xs text-gray-400 hover:text-gray-700 underline transition-colors"
        >
          Start over
        </button>
      </div>
    </div>
  )
}
