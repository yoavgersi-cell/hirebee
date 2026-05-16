"use client"

import { useState, useEffect, useRef } from "react"
import { toast } from "sonner"
import {
  Zap, FileText, TrendingUp, UserCheck,
  CheckCircle2, AlertTriangle, Copy, Check, ArrowRight,
  Search, Target, Lightbulb, ChevronDown, ChevronUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const LinkedInIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

const LOADING_MESSAGES = [
  "Reading your profile sections...",
  "Scoring headline & about quality...",
  "Checking keyword gaps...",
  "Writing your recruiter report...",
]

type Step = "input" | "loading" | "result"
type ImproveType = "headline" | "about" | "impact" | "recruiter"

interface SectionScores { headline: number; about: number; experience: number }

interface AnalysisResult {
  score: number
  sectionScores: SectionScores
  strengths: string[]
  gaps: string[]
  quickWins: string[]
  recruiterPov: string
  keywordsFound: string[]
  keywordsMissing: string[]
  searchabilityScore: number
  targetRoles: string[]
  headlineRewrite: string
}

interface Improvement {
  section: "headline" | "about"
  before: string
  after: string
  delta: string
}

function scoreColor(s: number) {
  if (s >= 70) return { text: "text-emerald-500", bg: "bg-emerald-500", border: "border-emerald-400", hex: "#22c55e" }
  if (s >= 50) return { text: "text-amber-500", bg: "bg-amber-500", border: "border-amber-400", hex: "#f59e0b" }
  return { text: "text-red-400", bg: "bg-red-500", border: "border-red-400", hex: "#f87171" }
}

function scoreLabel(s: number) {
  if (s >= 75) return "Strong — recruiters will notice you"
  if (s >= 55) return "Decent foundation — a few fixes will unlock more"
  return "Needs work before recruiters take it seriously"
}

const IMPROVE_ACTIONS: { type: ImproveType; label: string; Icon: React.ElementType; desc: string }[] = [
  { type: "headline",  label: "Rewrite headline",        Icon: Zap,        desc: "Specific, keyword-rich, recruiter-ready" },
  { type: "about",     label: "Rewrite About section",   Icon: FileText,   desc: "Stronger hook, story, and closing CTA" },
  { type: "impact",    label: "Add measurable impact",   Icon: TrendingUp, desc: "Replace vague language with real numbers" },
  { type: "recruiter", label: "Optimize for search",     Icon: UserCheck,  desc: "Max keywords + recruiter first impression" },
]

// ─── How-to guide ──────────────────────────────────────────────────────────────

const HOW_TO_STEPS = [
  {
    num: "1",
    title: "Open LinkedIn and go to your profile",
    hint: 'Click your photo or "Me" at the top of the LinkedIn homepage.',
  },
  {
    num: "2",
    title: "Copy your headline",
    hint: 'It\'s the line directly under your name — e.g. "Product Manager | SaaS | Growth".',
  },
  {
    num: "3",
    title: "Copy your About section",
    hint: 'Scroll down to the "About" card on your profile. Click "see more" first, then select all text and copy.',
  },
]

function HowToGuide() {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl border border-blue-100 bg-blue-50 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <div className="flex items-center gap-2">
          <LinkedInIcon />
          <span className="text-sm font-semibold text-blue-800">How to copy your LinkedIn content</span>
        </div>
        {open
          ? <ChevronUp className="w-4 h-4 text-blue-400" />
          : <ChevronDown className="w-4 h-4 text-blue-400" />
        }
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-blue-100 pt-3">
          {HOW_TO_STEPS.map((s) => (
            <div key={s.num} className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {s.num}
              </div>
              <div>
                <p className="text-xs font-semibold text-blue-900">{s.title}</p>
                <p className="text-xs text-blue-600 mt-0.5">{s.hint}</p>
              </div>
            </div>
          ))}
          <p className="text-[11px] text-blue-500 pt-1 border-t border-blue-100">
            💡 The more you paste, the more accurate your analysis will be.
          </p>
        </div>
      )}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

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
      }, 1600)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [step])

  async function handleAnalyze() {
    if (!headline.trim() && !about.trim()) {
      toast.error("Paste your headline or About section first")
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

// ─── Input step ───────────────────────────────────────────────────────────────

function InputStep({
  headline, setHeadline, about, setAbout, experience, setExperience, onSubmit,
}: {
  headline: string; setHeadline: (v: string) => void
  about: string; setAbout: (v: string) => void
  experience: string; setExperience: (v: string) => void
  onSubmit: () => void
}) {
  const canSubmit = headline.trim() || about.trim()

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center pt-2 pb-1">
        <div className="inline-flex items-center gap-1.5 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
          <Zap className="w-3 h-3" /> AI-powered LinkedIn optimizer
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900 mb-2 leading-tight">
          Optimize your LinkedIn profile
        </h1>
        <p className="text-sm text-gray-400 max-w-sm mx-auto">
          Paste your profile text below. We'll score every section, find keyword gaps, and rewrite what's holding you back.
        </p>
      </div>

      {/* How-to guide */}
      <HowToGuide />

      {/* Form */}
      <div className="bg-white border border-gray-200 rounded-2xl divide-y divide-gray-100">

        {/* Headline */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-gray-700">
              Your headline
            </label>
            <span className="text-[10px] text-gray-400">Under your name on LinkedIn</span>
          </div>
          <input
            className="w-full text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent placeholder:text-gray-300"
            placeholder='e.g. "Senior Product Manager | B2B SaaS | Turning user insights into growth"'
            value={headline}
            onChange={e => setHeadline(e.target.value)}
          />
          {!headline && (
            <p className="text-[11px] text-gray-400 mt-1.5 flex items-center gap-1">
              <span className="text-amber-400">→</span> This is the most important field for recruiter search visibility
            </p>
          )}
        </div>

        {/* About */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-gray-700">
              About section
            </label>
            <span className="text-[10px] text-gray-400">Scroll down on your profile → "About"</span>
          </div>
          <textarea
            className="w-full h-40 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent placeholder:text-gray-300"
            placeholder={"Paste your full About section here...\n\nTip: click \"see more\" on your profile first to expand it, then select all and copy."}
            value={about}
            onChange={e => setAbout(e.target.value)}
          />
          <div className="flex items-center justify-between mt-1">
            <p className="text-[11px] text-gray-400">
              {about.length > 0
                ? `${about.length} characters · ${about.split(/\s+/).filter(Boolean).length} words`
                : "LinkedIn About sections can be up to 2,600 characters"
              }
            </p>
            {about.length > 0 && about.length < 100 && (
              <p className="text-[11px] text-amber-500">Too short — add more for a better analysis</p>
            )}
          </div>
        </div>

        {/* Experience */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-gray-700">
              Experience <span className="text-gray-400 font-normal">(optional but recommended)</span>
            </label>
            <span className="text-[10px] text-gray-400">Your 1-2 most recent roles</span>
          </div>
          <textarea
            className="w-full h-28 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent placeholder:text-gray-300"
            placeholder={"Senior PM @ Acme Corp (2022–present)\n• Launched pricing feature that increased ARR by 18%\n• Led team of 6 engineers across 3 time zones\n\nPM @ StartupX (2020–2022)\n• Grew B2B pipeline from 0 to 200 accounts"}
            value={experience}
            onChange={e => setExperience(e.target.value)}
          />
          <p className="text-[11px] text-gray-400 mt-1">
            Adding experience helps us detect missing keywords and give more specific rewrite suggestions.
          </p>
        </div>

        {/* Submit */}
        <div className="p-4">
          <Button
            onClick={onSubmit}
            disabled={!canSubmit}
            className="w-full bg-gray-950 hover:bg-gray-800 text-white h-11 gap-2 text-sm font-semibold rounded-xl disabled:opacity-40"
          >
            Analyze my LinkedIn <ArrowRight className="w-4 h-4" />
          </Button>
          {!canSubmit && (
            <p className="text-center text-[11px] text-gray-400 mt-2">Paste your headline or About section above to continue</p>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Loading step ─────────────────────────────────────────────────────────────

function LoadingStep({ loadingStep }: { loadingStep: number }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[420px] text-center px-4">
      <div className="w-14 h-14 rounded-2xl bg-[#0a66c2] flex items-center justify-center mb-8 shadow-lg text-white">
        <LinkedInIcon />
      </div>
      <h2 className="text-base font-bold text-gray-900 mb-6">Analyzing your profile...</h2>
      <div className="space-y-3.5 w-full max-w-xs text-left">
        {LOADING_MESSAGES.map((msg, i) => (
          <div
            key={msg}
            className={`flex items-center gap-3 text-sm transition-all duration-500 ${
              i < loadingStep ? "text-gray-400" : i === loadingStep ? "text-gray-900 font-semibold" : "text-gray-300"
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

// ─── Result step ──────────────────────────────────────────────────────────────

function SectionBar({ label, score }: { label: string; score: number }) {
  const c = scoreColor(score)
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-600">{label}</span>
        <span className={`text-xs font-bold ${c.text}`}>{score}/100</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${c.bg} transition-all duration-700`} style={{ width: `${score}%` }} />
      </div>
    </div>
  )
}

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
  const c = scoreColor(result.score)
  const sc = scoreColor(result.searchabilityScore)

  return (
    <div className="space-y-3">

      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">LinkedIn Profile Report</h2>
          <p className="text-xs text-gray-400 mt-0.5">AI analysis · powered by Claude</p>
        </div>
        <button onClick={onReset} className="text-xs text-gray-400 hover:text-gray-700 transition-colors underline">
          Start over
        </button>
      </div>

      {/* A. Overall score + section breakdown */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <div className="flex items-start gap-5 mb-5">
          {/* Big score */}
          <div
            className="w-20 h-20 rounded-2xl border-2 flex flex-col items-center justify-center shrink-0"
            style={{ borderColor: c.hex, backgroundColor: `${c.hex}12` }}
          >
            <span className="text-3xl font-black tabular-nums" style={{ color: c.hex }}>{result.score}</span>
            <span className="text-[9px] font-bold uppercase tracking-wide mt-0.5" style={{ color: c.hex }}>/ 100</span>
          </div>
          <div className="flex-1 pt-1">
            <p className="text-sm font-bold text-gray-900 mb-1">{scoreLabel(result.score)}</p>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-3">
              <div className={`h-full rounded-full ${c.bg} transition-all duration-1000`} style={{ width: `${result.score}%` }} />
            </div>
            {result.targetRoles.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[10px] text-gray-400">Best fit for:</span>
                {result.targetRoles.map(r => (
                  <span key={r} className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full font-medium">{r}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Section breakdown */}
        <div className="border-t border-gray-100 pt-4 space-y-2.5">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Section breakdown</p>
          <SectionBar label="Headline" score={result.sectionScores.headline} />
          <SectionBar label="About section" score={result.sectionScores.about} />
          <SectionBar label="Experience" score={result.sectionScores.experience} />
        </div>

        {/* Searchability */}
        <div className="border-t border-gray-100 pt-4 mt-4 flex items-center gap-3">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-600">Recruiter searchability</span>
              <span className={`text-xs font-bold ${sc.text}`}>{result.searchabilityScore}/100</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${sc.bg}`} style={{ width: `${result.searchabilityScore}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* B. Recruiter POV */}
      {result.recruiterPov && (
        <div className="bg-gray-950 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base">👤</span>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">What a recruiter sees in 10 seconds</p>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">{result.recruiterPov}</p>
        </div>
      )}

      {/* C. Quick wins */}
      {result.quickWins.length > 0 && (
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">3 things to fix today</p>
          </div>
          <div className="space-y-2">
            {result.quickWins.map((w, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-amber-400 text-white text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <p className="text-xs text-amber-900 leading-relaxed">{w}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* D. Strengths & gaps */}
      {(result.strengths.length > 0 || result.gaps.length > 0) && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-4">Detailed feedback</p>
          <div className="space-y-4">
            {result.strengths.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold text-emerald-600 mb-2">What's working</p>
                <div className="space-y-2">
                  {result.strengths.map((s, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                      <p className="text-xs text-gray-700 leading-relaxed">{s}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {result.gaps.length > 0 && (
              <div className="pt-3 border-t border-gray-100">
                <p className="text-[10px] font-semibold text-red-500 mb-2">What's holding you back</p>
                <div className="space-y-2">
                  {result.gaps.map((g, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                      <p className="text-xs text-gray-600 leading-relaxed">{g}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* E. Keywords */}
      {(result.keywordsFound.length > 0 || result.keywordsMissing.length > 0) && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-4 h-4 text-gray-400" />
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Keyword analysis</p>
          </div>
          <div className="space-y-4">
            {result.keywordsFound.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold text-emerald-600 mb-2">Strong keywords found</p>
                <div className="flex flex-wrap gap-1.5">
                  {result.keywordsFound.map(k => (
                    <span key={k} className="text-xs bg-emerald-50 border border-emerald-200 text-emerald-700 px-2.5 py-1 rounded-full font-medium">{k}</span>
                  ))}
                </div>
              </div>
            )}
            {result.keywordsMissing.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold text-red-500 mb-2">High-value keywords missing</p>
                <div className="flex flex-wrap gap-1.5">
                  {result.keywordsMissing.map(k => (
                    <span key={k} className="text-xs bg-red-50 border border-red-200 text-red-600 px-2.5 py-1 rounded-full font-medium">{k}</span>
                  ))}
                </div>
                <p className="text-[11px] text-gray-400 mt-2">Add these naturally to your headline and About section to appear in more recruiter searches.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* F. Suggested headline rewrite */}
      {result.headlineRewrite && (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <p className="text-xs font-bold text-gray-700">Suggested headline rewrite</p>
            <button
              onClick={() => onCopy(result.headlineRewrite, "headline-rewrite")}
              className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-gray-700 transition-colors"
            >
              {copiedKey === "headline-rewrite"
                ? <><Check className="w-3 h-3 text-emerald-500" /> Copied</>
                : <><Copy className="w-3 h-3" /> Copy</>
              }
            </button>
          </div>
          <div className="p-5 bg-teal-50">
            <p className="text-sm text-gray-800 font-medium leading-relaxed">{result.headlineRewrite}</p>
          </div>
        </div>
      )}

      {/* G. AI improvement actions */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">AI rewrites</p>
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
                  isActive ? "border-teal-300 bg-teal-50"
                  : isDone ? "border-emerald-200 bg-emerald-50"
                  : "border-gray-200 hover:border-gray-400 hover:bg-gray-50"
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isActive
                    ? <span className="w-3.5 h-3.5 border border-teal-500 border-t-transparent rounded-full animate-spin block" />
                    : isDone
                    ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    : <Icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-900 transition-colors" />
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

      {/* H. Before/After transformations */}
      {improvements.size > 0 && (
        <div className="space-y-3">
          {Array.from(improvements.entries()).map(([type, imp]) => (
            <div key={type} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                <p className="text-xs font-bold text-gray-700 capitalize">{imp.section} rewrite</p>
                <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  {imp.delta}
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
                  <p className="text-xs text-gray-800 leading-relaxed bg-teal-50 border border-teal-100 rounded-lg p-3 whitespace-pre-wrap">{imp.after}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom */}
      <div className="flex justify-center pt-1 pb-4">
        <button onClick={onReset} className="text-xs text-gray-400 hover:text-gray-700 underline transition-colors">
          Analyze a different profile
        </button>
      </div>
    </div>
  )
}
