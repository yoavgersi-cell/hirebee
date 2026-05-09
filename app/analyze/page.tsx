"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useSession, signIn } from "next-auth/react"
import Link from "next/link"
import {
  Upload, FileText, Type, ArrowRight, ChevronRight, CheckCircle2,
  AlertTriangle, X, RotateCcw, Zap, Lock, Check,
} from "lucide-react"
import { HireBeeLogo } from "@/components/hirebee-logo"

// ─── Types ───────────────────────────────────────────────────────────────────

type Step = "start" | "input" | "jd" | "sign-in" | "loading" | "results"
type InputMode = "upload" | "paste" | "build"

interface Suggestion {
  category: string
  issue: string
  fix: string
  severity: "high" | "medium" | "low"
}

interface AnalysisResult {
  score: number
  breakdown: { formatting: number; keywords: number; experience: number; skills: number; impact: number }
  suggestions: Suggestion[]
  strengths: string[]
  teaserSummary: string
  matchScore?: number
  missingKeywords?: string[]
  matchedKeywords?: string[]
}

interface AnalysisInput {
  inputMode: InputMode
  file: File | null
  cvText: string
  jobDescription: string
}

interface PersistedState {
  pendingAnalysis: boolean
  mode: InputMode
  cvText: string
  jobDescription: string
  fileName?: string
  cvBase64?: string
  cvMime?: string
  needsReUpload?: boolean
}

// ─── Constants ───────────────────────────────────────────────────────────────

const STORAGE_KEY = "hirebee_analyze"
const LOADING_MSGS = [
  "Parsing your resume...",
  "Analyzing your experience...",
  "Extracting skills...",
  "Detecting ATS issues...",
  "Finding missing keywords...",
  "Preparing your score...",
]
const SEVERITY_CONFIG = {
  high:   { label: "High",   bg: "bg-red-500/10",   text: "text-red-400",   dot: "bg-red-400" },
  medium: { label: "Medium", bg: "bg-amber-500/10", text: "text-amber-400", dot: "bg-amber-400" },
  low:    { label: "Low",    bg: "bg-blue-500/10",  text: "text-blue-400",  dot: "bg-blue-400" },
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function scoreColor(s: number) {
  if (s >= 85) return "#22c55e"
  if (s >= 70) return "#14b8a6"
  if (s >= 50) return "#f59e0b"
  return "#f87171"
}
function scoreLabel(s: number) {
  if (s >= 85) return "Excellent"
  if (s >= 70) return "Good"
  if (s >= 50) return "Needs Work"
  return "At Risk"
}
function barColor(v: number) {
  if (v >= 75) return "#14b8a6"
  if (v >= 50) return "#f59e0b"
  return "#f87171"
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => {
      const b64 = (reader.result as string).split(",")[1]
      resolve(b64)
    }
    reader.readAsDataURL(file)
  })
}

function base64ToFile(b64: string, mime: string, name: string): File {
  const binary = atob(b64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return new File([bytes], name, { type: mime })
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function ScoreCircle({ score }: { score: number }) {
  const r = 54
  const c = 2 * Math.PI * r
  const color = scoreColor(score)
  const label = scoreLabel(score)
  return (
    <div className="relative w-36 h-36 shrink-0">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
        <circle cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={`${c * score / 100} ${c * (1 - score / 100)}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 1s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[42px] font-extrabold text-white leading-none">{score}</span>
        <span className="text-sm text-white/30 leading-none">/100</span>
        <span className="text-xs font-bold mt-2 px-2 py-0.5 rounded-full" style={{ color, backgroundColor: color + "18" }}>{label}</span>
      </div>
    </div>
  )
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  const color = barColor(value)
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-xs text-white/50">{label}</span>
        <span className="text-xs font-bold" style={{ color }}>{value}%</span>
      </div>
      <div className="h-1.5 bg-white/6 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color, transition: "width 1s ease" }} />
      </div>
    </div>
  )
}

function PaywallModal({ onClose, isPro }: { onClose: () => void; isPro: boolean }) {
  if (isPro) {
    window.location.href = "/builder"
    return null
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-gray-900 border border-white/10 rounded-2xl max-w-xl w-full p-8 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/30 hover:text-white/60 transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-7">
          <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <Zap className="w-3 h-3" /> Unlock full optimization
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-2">Your resume is almost ready</h2>
          <p className="text-white/40 text-sm">Unlock AI rewrites, PDF download, and full optimization</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Free */}
          <div className="bg-white/4 rounded-xl p-4 border border-white/8">
            <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-1">Free</p>
            <p className="text-2xl font-extrabold text-white mb-4">$0</p>
            <ul className="space-y-2">
              {["Resume score", "3 top issues", "1–2 AI suggestions", "Basic template"].map(f => (
                <li key={f} className="flex items-center gap-2 text-xs text-white/50">
                  <Check className="w-3.5 h-3.5 text-white/30 shrink-0" /> {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Pro */}
          <div className="bg-gray-950 rounded-xl p-4 border border-teal-500/30 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">MOST POPULAR</div>
            <p className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">Pro</p>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-2xl font-extrabold text-white">$19</span>
              <span className="text-white/30 text-xs">/mo</span>
            </div>
            <ul className="space-y-2">
              {[
                "Everything in Free",
                "Full AI optimization",
                "Unlimited rewrites",
                "Job-specific tailoring",
                "Cover letter generator",
                "PDF export (no branding)",
              ].map(f => (
                <li key={f} className="flex items-center gap-2 text-xs text-white/70">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0" /> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Link
          href="/upgrade"
          className="flex items-center justify-center gap-2 w-full bg-teal-500 hover:bg-teal-400 text-white font-bold py-3.5 rounded-xl text-sm transition-colors shadow-lg shadow-teal-500/20"
        >
          Start free trial <ArrowRight className="w-4 h-4" />
        </Link>
        <p className="text-center text-xs text-white/25 mt-3">No charge for 7 days · Cancel anytime</p>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AnalyzePage() {
  const { data: session, status } = useSession()
  const isPro = session?.user?.plan === "pro" || session?.user?.plan === "trial"

  // Wizard state
  const [step, setStep]             = useState<Step>("start")
  const [inputMode, setInputMode]   = useState<InputMode>("upload")
  const [file, setFile]             = useState<File | null>(null)
  const [fileName, setFileName]     = useState("")
  const [cvText, setCvText]         = useState("")
  const [jobDescription, setJD]     = useState("")
  const [fileError, setFileError]   = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  // Loading state
  const [msgIdx, setMsgIdx]         = useState(0)
  const [progress, setProgress]     = useState(0)

  // Results state
  const [result, setResult]         = useState<AnalysisResult | null>(null)
  const [analysisId, setAnalysisId] = useState<string | null>(null)
  const [error, setError]           = useState<string | null>(null)
  const [showPaywall, setShowPaywall] = useState(false)

  // Refs
  const fileInputRef    = useRef<HTMLInputElement>(null)
  const analyzeInputRef = useRef<AnalysisInput | null>(null)
  const [analyzing, setAnalyzing] = useState(false)

  // ── Restore from sessionStorage after auth redirect ──
  useEffect(() => {
    if (status !== "authenticated") return
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return
    try {
      const saved: PersistedState = JSON.parse(raw)
      if (!saved.pendingAnalysis) return
      sessionStorage.removeItem(STORAGE_KEY)

      const restoredMode = saved.mode || "upload"
      const restoredText = saved.cvText || ""
      const restoredJD   = saved.jobDescription || ""
      let   restoredFile: File | null = null

      if (saved.needsReUpload) {
        setInputMode(restoredMode)
        setCvText(restoredText)
        setJD(restoredJD)
        setFileError("Please re-upload your file to continue your analysis.")
        setStep("input")
        return
      }

      if (saved.cvBase64 && saved.cvMime && saved.fileName) {
        restoredFile = base64ToFile(saved.cvBase64, saved.cvMime, saved.fileName)
        setFile(restoredFile)
        setFileName(saved.fileName)
      }

      setInputMode(restoredMode)
      setCvText(restoredText)
      setJD(restoredJD)

      // Trigger analysis immediately
      analyzeInputRef.current = { inputMode: restoredMode, file: restoredFile, cvText: restoredText, jobDescription: restoredJD }
      setAnalyzing(true)
      setStep("loading")
    } catch {}
  }, [status])

  // ── Loading animation ──
  useEffect(() => {
    if (step !== "loading") return
    setMsgIdx(0)
    setProgress(0)
    const m = setInterval(() => setMsgIdx(i => Math.min(i + 1, LOADING_MSGS.length - 1)), 900)
    const p = setInterval(() => setProgress(v => Math.min(v + 1.2, 88)), 60)
    return () => { clearInterval(m); clearInterval(p) }
  }, [step])

  // ── Run analysis ──
  useEffect(() => {
    if (!analyzing) return
    const input = analyzeInputRef.current
    if (!input) return
    setAnalyzing(false)

    async function run() {
      try {
        let res: Response, data: any

        if (input!.inputMode === "paste" || !input!.file) {
          res = await fetch("/api/cv/analyze-text", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cvText: input!.cvText, jobDescription: input!.jobDescription || undefined }),
          })
          data = await res.json()
          if (res.status === 402) { setError("limit_reached"); setStep("results"); return }
          if (!res.ok) throw new Error(data.error || "Analysis failed")
          setAnalysisId(data.id)
          setResult(data.result)
        } else {
          const fd = new FormData()
          fd.append("file", input!.file)
          fd.append("mode", input!.jobDescription ? "jd" : "standalone")
          if (input!.jobDescription) fd.append("jobDescription", input!.jobDescription)
          res = await fetch("/api/cv/analyze", { method: "POST", body: fd })
          data = await res.json()
          if (res.status === 402) { setError("limit_reached"); setStep("results"); return }
          if (!res.ok) throw new Error(data.error || "Analysis failed")
          setAnalysisId(data.analysisId)
          setResult(data.result)
        }

        setProgress(100)
        setTimeout(() => setStep("results"), 500)
      } catch (err: any) {
        setError(err.message || "Something went wrong")
        setStep("input")
      }
    }
    run()
  }, [analyzing])

  // ── Handlers ──

  function handleFile(f: File) {
    const allowed = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ]
    if (!allowed.includes(f.type)) { setFileError("Please upload a PDF or Word document (.pdf, .doc, .docx)"); return }
    if (f.size > 5 * 1024 * 1024) { setFileError("File is too large. Maximum 5MB."); return }
    setFile(f)
    setFileName(f.name)
    setFileError(null)
  }

  function handleStartContinue() {
    if (inputMode === "build") {
      window.location.href = session ? "/builder" : "/login?callbackUrl=/builder"
      return
    }
    setStep("input")
  }

  function handleInputContinue() {
    if (inputMode === "upload" && !file) { setFileError("Please upload your resume first."); return }
    if (inputMode === "paste" && cvText.trim().length < 100) { setFileError("Please paste your full resume (minimum 100 characters)."); return }
    setFileError(null)
    setStep("jd")
  }

  async function persistState() {
    const data: PersistedState = {
      pendingAnalysis: true,
      mode: inputMode,
      cvText,
      jobDescription,
      fileName: fileName || undefined,
    }
    if (file && inputMode === "upload") {
      if (file.size <= 3 * 1024 * 1024) {
        data.cvBase64 = await fileToBase64(file)
        data.cvMime = file.type
      } else {
        data.needsReUpload = true
      }
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }

  async function handleJDContinue() {
    if (status !== "authenticated") {
      await persistState()
      await signIn("google", { callbackUrl: "/analyze" })
      return
    }
    analyzeInputRef.current = { inputMode, file, cvText, jobDescription }
    setAnalyzing(true)
    setStep("loading")
  }

  function handleFixAll() {
    if (isPro) {
      window.location.href = "/builder"
    } else {
      setShowPaywall(true)
    }
  }

  function resetFlow() {
    setStep("start")
    setFile(null)
    setFileName("")
    setCvText("")
    setJD("")
    setFileError(null)
    setResult(null)
    setError(null)
    analyzeInputRef.current = null
  }

  // ── Step indicator ──
  const STEP_MAP: Record<Step, number> = { start: 1, input: 2, jd: 3, "sign-in": 3, loading: 4, results: 4 }
  const currentStepNum = STEP_MAP[step] ?? 1

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {showPaywall && <PaywallModal onClose={() => setShowPaywall(false)} isPro={isPro} />}

      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-white/6">
        <Link href="/" className="flex items-center gap-2">
          <HireBeeLogo size={24} />
          <span className="font-extrabold text-white text-sm tracking-tight">HireBee</span>
        </Link>
        <div className="flex items-center gap-4">
          {step === "results" && (
            <button onClick={resetFlow} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors">
              <RotateCcw className="w-3.5 h-3.5" /> Analyze another
            </button>
          )}
          {!session && (
            <Link href="/login" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              Sign in
            </Link>
          )}
        </div>
      </header>

      {/* Step indicator (steps 1–3 only) */}
      {step !== "loading" && step !== "results" && (
        <div className="flex items-center justify-center gap-2 pt-8">
          {[1, 2, 3].map(n => (
            <div key={n} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                n < currentStepNum ? "bg-teal-500 text-white" :
                n === currentStepNum ? "bg-teal-500/20 border-2 border-teal-500 text-teal-400" :
                "bg-white/6 text-white/20"
              }`}>
                {n < currentStepNum ? <Check className="w-3.5 h-3.5" /> : n}
              </div>
              {n < 3 && <div className={`w-12 h-px ${n < currentStepNum ? "bg-teal-500" : "bg-white/8"}`} />}
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <main className="flex-1 flex items-start justify-center px-4 py-8 md:py-12">
        <div className="w-full max-w-xl">

          {/* ── STEP: start ── */}
          {step === "start" && (
            <div>
              <div className="text-center mb-8">
                <p className="text-xs font-semibold text-teal-400 uppercase tracking-widest mb-3">Step 1 of 3</p>
                <h1 className="text-3xl font-extrabold text-white mb-2">How do you want to start?</h1>
                <p className="text-white/40 text-sm">Get your ATS score and see exactly what&apos;s blocking you</p>
              </div>

              <div className="space-y-3 mb-8">
                {([
                  { id: "upload", icon: Upload, label: "Upload my resume", desc: "PDF or Word document — fastest way to get your score" },
                  { id: "paste",  icon: Type,   label: "Paste resume text", desc: "Copy and paste your resume content directly" },
                  { id: "build",  icon: FileText, label: "Build an ATS-ready resume", desc: "Start fresh with a template that passes ATS filters" },
                ] as { id: InputMode; icon: React.ElementType; label: string; desc: string }[]).map(({ id, icon: Icon, label, desc }) => (
                  <button
                    key={id}
                    onClick={() => setInputMode(id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
                      inputMode === id
                        ? "border-teal-500 bg-teal-500/6"
                        : "border-white/8 hover:border-white/20 bg-white/2"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      inputMode === id ? "bg-teal-500/15" : "bg-white/6"
                    }`}>
                      <Icon className={`w-6 h-6 ${inputMode === id ? "text-teal-400" : "text-white/40"}`} />
                    </div>
                    <div className="flex-1">
                      <p className={`font-semibold text-sm ${inputMode === id ? "text-white" : "text-white/70"}`}>{label}</p>
                      <p className="text-xs text-white/30 mt-0.5">{desc}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      inputMode === id ? "border-teal-500 bg-teal-500" : "border-white/15"
                    }`}>
                      {inputMode === id && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={handleStartContinue}
                className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-bold py-4 rounded-xl text-sm transition-colors shadow-lg shadow-teal-500/20"
              >
                {inputMode === "build" ? <>Build an ATS-ready resume <ArrowRight className="w-4 h-4" /></> : <>Scan my resume <ArrowRight className="w-4 h-4" /></>}
              </button>
            </div>
          )}

          {/* ── STEP: input ── */}
          {step === "input" && (
            <div>
              <div className="text-center mb-8">
                <p className="text-xs font-semibold text-teal-400 uppercase tracking-widest mb-3">Step 2 of 3</p>
                <h1 className="text-3xl font-extrabold text-white mb-2">
                  {inputMode === "paste" ? "Paste your resume" : "Upload your resume"}
                </h1>
                <p className="text-white/40 text-sm">We&apos;ll scan for ATS readability, missing keywords, structure, and impact</p>
              </div>

              {inputMode === "upload" ? (
                <div className="mb-6">
                  {/* Drop zone */}
                  <div
                    onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={e => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}
                    onClick={() => !file && fileInputRef.current?.click()}
                    className={`rounded-2xl border-2 border-dashed transition-all ${
                      isDragging ? "border-teal-400 bg-teal-400/5" :
                      file ? "border-teal-500/40 bg-teal-500/4" :
                      "border-white/12 hover:border-white/25 cursor-pointer"
                    }`}
                  >
                    {file ? (
                      <div className="flex items-center gap-4 p-5">
                        <div className="w-12 h-12 bg-teal-500/15 rounded-xl flex items-center justify-center shrink-0">
                          <FileText className="w-6 h-6 text-teal-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white truncate">{fileName}</p>
                          <p className="text-xs text-white/30 mt-0.5 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                            Ready to analyze
                          </p>
                        </div>
                        <button onClick={e => { e.stopPropagation(); setFile(null); setFileName("") }} className="text-white/20 hover:text-white/50 transition-colors">
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center py-12 px-6 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-white/6 flex items-center justify-center mb-4">
                          <Upload className="w-7 h-7 text-white/30" />
                        </div>
                        <p className="text-white/60 text-sm font-medium mb-1">Drop your resume here</p>
                        <p className="text-white/30 text-xs">or click to browse files</p>
                        <p className="text-white/15 text-xs mt-3">PDF, DOC, DOCX · Max 5MB</p>
                      </div>
                    )}
                  </div>
                  <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" className="hidden"
                    onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
                </div>
              ) : (
                <div className="mb-6">
                  <textarea
                    value={cvText}
                    onChange={e => { setCvText(e.target.value); setFileError(null) }}
                    placeholder="Paste your full resume here — including your name, experience, education, and skills..."
                    className="w-full h-72 bg-white/4 border border-white/10 rounded-2xl px-4 py-4 text-sm text-white/80 placeholder:text-white/20 resize-none focus:outline-none focus:border-teal-500/50 transition-colors"
                  />
                  <p className="text-xs text-white/20 mt-2 text-right">{cvText.length} characters {cvText.length < 100 && <span className="text-amber-500/60">(minimum 100)</span>}</p>
                </div>
              )}

              {fileError && (
                <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-5 text-sm text-red-400">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  {fileError}
                </div>
              )}

              <div className="space-y-3">
                <button onClick={handleInputContinue}
                  className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-bold py-4 rounded-xl text-sm transition-colors shadow-lg shadow-teal-500/20">
                  Scan my resume <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => setStep("start")} className="w-full text-xs text-white/25 hover:text-white/50 transition-colors py-2">
                  ← Back
                </button>
              </div>
            </div>
          )}

          {/* ── STEP: jd ── */}
          {step === "jd" && (
            <div>
              <div className="text-center mb-8">
                <p className="text-xs font-semibold text-teal-400 uppercase tracking-widest mb-3">Step 3 of 3</p>
                <h1 className="text-3xl font-extrabold text-white mb-2">Want a better match score?</h1>
                <p className="text-white/40 text-sm">Paste a job description to see how well your resume fits the role</p>
              </div>

              <div className="mb-2">
                <textarea
                  value={jobDescription}
                  onChange={e => setJD(e.target.value)}
                  placeholder="Paste the full job description here — we'll compare it against your resume and show you exactly what's missing..."
                  className="w-full h-56 bg-white/4 border border-white/10 rounded-2xl px-4 py-4 text-sm text-white/80 placeholder:text-white/20 resize-none focus:outline-none focus:border-teal-500/50 transition-colors"
                />
              </div>
              <p className="text-xs text-white/20 mb-6">Optional — skip if you just want a general ATS score</p>

              <div className="space-y-3">
                <button onClick={handleJDContinue}
                  className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-bold py-4 rounded-xl text-sm transition-colors shadow-lg shadow-teal-500/20">
                  {status !== "authenticated" ? (
                    <><Lock className="w-4 h-4" /> Sign in to see my score</>
                  ) : jobDescription.trim() ? (
                    <>See my match score <ArrowRight className="w-4 h-4" /></>
                  ) : (
                    <>Get my ATS score <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>

                {jobDescription.trim() && (
                  <button onClick={() => { setJD(""); handleJDContinue() }}
                    className="w-full text-xs text-white/30 hover:text-white/50 transition-colors py-2">
                    Skip — analyze without job description
                  </button>
                )}
                {!jobDescription.trim() && (
                  <button onClick={() => setStep("input")} className="w-full text-xs text-white/25 hover:text-white/50 transition-colors py-2">
                    ← Back
                  </button>
                )}
              </div>

              {status !== "authenticated" && (
                <p className="text-center text-xs text-white/20 mt-4">
                  We&apos;ll save your resume and bring you right back after sign-in.
                </p>
              )}
            </div>
          )}

          {/* ── STEP: loading ── */}
          {step === "loading" && (
            <div className="text-center py-8">
              <div className="relative w-20 h-20 mx-auto mb-8">
                <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90 animate-spin-slow">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="8" />
                  <circle cx="40" cy="40" r="34" fill="none" stroke="#14b8a6" strokeWidth="8"
                    strokeDasharray="60 154" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-teal-400" />
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-bold text-white mb-2">Analyzing your resume</h2>
              <p className="text-white/40 text-sm mb-8 h-5 transition-all">{LOADING_MSGS[msgIdx]}</p>

              <div className="max-w-xs mx-auto">
                <div className="h-1.5 bg-white/6 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-teal-500 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }} />
                </div>
                <div className="flex flex-col gap-2 mt-8">
                  {LOADING_MSGS.map((msg, i) => (
                    <div key={msg} className={`flex items-center gap-3 text-xs transition-all ${i <= msgIdx ? "text-white/60" : "text-white/15"}`}>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                        i < msgIdx ? "bg-teal-500" : i === msgIdx ? "bg-teal-500/30 ring-2 ring-teal-500/40" : "bg-white/6"
                      }`}>
                        {i < msgIdx && <Check className="w-2.5 h-2.5 text-white" />}
                        {i === msgIdx && <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />}
                      </div>
                      {msg}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP: results ── */}
          {step === "results" && (
            <ResultsView
              result={result}
              error={error}
              analysisId={analysisId}
              hasJD={!!jobDescription.trim()}
              isPro={isPro}
              onFixAll={handleFixAll}
              onReset={resetFlow}
            />
          )}
        </div>
      </main>
    </div>
  )
}

// ─── Results view (separate component for clarity) ───────────────────────────

function scoreContext(score: number, hasJD: boolean): { headline: string; sub: string; color: string } {
  if (score >= 80) return {
    headline: "Your resume is strong — a few tweaks could make it exceptional.",
    sub: "You're in the top tier. Fix the remaining gaps before your next application.",
    color: "text-teal-400",
  }
  if (score >= 65) return {
    headline: "Your resume is decent, but it's losing you interviews.",
    sub: "Recruiters are skimming past it. These specific issues are costing you callbacks.",
    color: "text-amber-400",
  }
  if (score >= 45) return {
    headline: "This resume is likely getting filtered out before anyone reads it.",
    sub: "ATS systems are rejecting it automatically. This is fixable — but you need to act now.",
    color: "text-orange-400",
  }
  return {
    headline: "This resume is not competitive for the roles you're applying to.",
    sub: hasJD
      ? "It's missing critical keywords and structure that hiring systems require. Every day you apply with this, you lose ground."
      : "It has fundamental gaps that will cause automatic rejection. These aren't minor issues.",
    color: "text-red-400",
  }
}

function ResultsView({
  result, error, analysisId, hasJD, isPro, onFixAll, onReset,
}: {
  result: AnalysisResult | null
  error: string | null
  analysisId: string | null
  hasJD: boolean
  isPro: boolean
  onFixAll: () => void
  onReset: () => void
}) {
  // Limit reached
  if (error === "limit_reached") {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-5">
          <Lock className="w-8 h-8 text-amber-400" />
        </div>
        <h2 className="text-2xl font-extrabold text-white mb-3">Free analysis limit reached</h2>
        <p className="text-white/40 text-sm mb-8 max-w-sm mx-auto">
          You&apos;ve used your 2 free analyses. Upgrade to Pro for unlimited analyses, AI rewrites, and PDF export.
        </p>
        <Link href="/upgrade"
          className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-colors shadow-lg shadow-teal-500/20">
          Unlock Pro <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  // Generic error
  if (error || !result) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-5">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>
        <h2 className="text-2xl font-extrabold text-white mb-3">Something went wrong</h2>
        <p className="text-white/40 text-sm mb-8 max-w-sm mx-auto">{error || "We couldn't analyze your resume. Please try again."}</p>
        <button onClick={onReset}
          className="inline-flex items-center gap-2 bg-white/8 hover:bg-white/12 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors">
          <RotateCcw className="w-4 h-4" /> Try again
        </button>
      </div>
    )
  }

  const sorted = [...result.suggestions].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 }
    return order[a.severity] - order[b.severity]
  })
  const freeSuggestions = sorted.slice(0, 2)
  const lockedSuggestions = sorted.slice(2, 4)
  const remainingCount = sorted.length - freeSuggestions.length
  const ctx = scoreContext(result.score, hasJD)

  return (
    <div className="space-y-4">

      {/* ── Diagnosis header ── */}
      <div className="bg-gray-900 border border-white/8 rounded-2xl p-6">
        <div className="flex items-start gap-5 mb-6">
          <ScoreCircle score={result.score} />
          <div className="flex-1 pt-1">
            <p className={`text-sm font-bold leading-snug mb-1.5 ${ctx.color}`}>{ctx.headline}</p>
            <p className="text-xs text-white/40 leading-relaxed">{ctx.sub}</p>
          </div>
        </div>
        <div className="space-y-3">
          <ScoreBar label="ATS Readability" value={result.breakdown.formatting} />
          <ScoreBar label="Keyword Match" value={result.breakdown.keywords} />
          <ScoreBar label="Experience Impact" value={result.breakdown.experience} />
          <ScoreBar label="Skills Coverage" value={result.breakdown.skills} />
        </div>
      </div>

      {/* ── Job match ── */}
      {result.matchScore !== undefined && (
        <div className={`rounded-2xl p-5 border ${
          result.matchScore < 50
            ? "bg-red-500/5 border-red-500/20"
            : result.matchScore < 70
            ? "bg-amber-500/5 border-amber-500/20"
            : "bg-teal-500/5 border-teal-500/20"
        }`}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-white/50 uppercase tracking-widest">Job Match</p>
            <span className="text-lg font-extrabold" style={{ color: barColor(result.matchScore) }}>
              {result.matchScore}%
            </span>
          </div>
          <div className="h-1.5 bg-white/6 rounded-full overflow-hidden mb-3">
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${result.matchScore}%`, backgroundColor: barColor(result.matchScore) }} />
          </div>
          {result.matchScore < 60 && (
            <p className="text-xs text-amber-400 flex items-center gap-1.5 mb-3">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              Likely filtered out before a recruiter sees it
            </p>
          )}
          {result.missingKeywords && result.missingKeywords.length > 0 && (
            <div>
              <p className="text-xs text-white/35 mb-2">Missing keywords recruiters scan for:</p>
              <div className="flex flex-wrap gap-1.5">
                {result.missingKeywords.slice(0, 8).map(kw => (
                  <span key={kw} className="text-xs bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full">{kw}</span>
                ))}
                {result.missingKeywords.length > 8 && (
                  <span className="text-xs text-white/25">+{result.missingKeywords.length - 8} more</span>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── What's holding you back ── */}
      <div className="bg-gray-900 border border-white/8 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-sm font-bold text-white/90">What&apos;s holding your resume back</p>
            <p className="text-xs text-white/35 mt-0.5">These are the specific reasons you&apos;re not getting interviews</p>
          </div>
          <span className="text-xs font-bold text-white/40 bg-white/6 px-2.5 py-1 rounded-full shrink-0">{sorted.length} issues</span>
        </div>
        <div className="space-y-3">
          {freeSuggestions.map((s, i) => {
            const cfg = SEVERITY_CONFIG[s.severity]
            return (
              <div key={i} className="bg-white/3 border border-white/6 rounded-xl p-4">
                <div className="flex items-start gap-3 mb-3">
                  <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${cfg.bg} ${cfg.text}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                    {cfg.label}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white/90 mb-1">{s.category.charAt(0).toUpperCase() + s.category.slice(1)}</p>
                    <p className="text-xs text-white/45 leading-relaxed">{s.issue}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-teal-500/6 border border-teal-500/15 rounded-lg px-3 py-2.5">
                  <Zap className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-semibold text-teal-400 uppercase tracking-wider mb-1">How to fix it</p>
                    <p className="text-xs text-white/55 leading-relaxed">{s.fix}</p>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Locked issues */}
          {remainingCount > 0 && (
            <div className="relative rounded-xl overflow-hidden">
              <div className="space-y-3 pointer-events-none select-none">
                {lockedSuggestions.map((s, i) => {
                  const cfg = SEVERITY_CONFIG[s.severity]
                  return (
                    <div key={i} className="bg-white/3 border border-white/6 rounded-xl p-4 blur-[3px] opacity-60">
                      <div className="flex items-start gap-3">
                        <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${cfg.bg} ${cfg.text}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                          {cfg.label}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white/90 mb-1">{s.category.charAt(0).toUpperCase() + s.category.slice(1)}</p>
                          <p className="text-xs text-white/45 leading-relaxed">{s.issue}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gray-950/60">
                <div className="flex items-center gap-2 bg-gray-900 border border-white/12 rounded-full px-4 py-2 text-xs text-white/60 shadow-lg">
                  <Lock className="w-3.5 h-3.5 text-white/40" />
                  {remainingCount} more {remainingCount === 1 ? "issue" : "issues"} — unlock full analysis
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Before / After teaser ── */}
      {result.teaserSummary && (
        <div className="bg-gray-900 border border-teal-500/25 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-xl bg-teal-500/15 flex items-center justify-center">
              <Zap className="w-4 h-4 text-teal-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-teal-400 uppercase tracking-widest">Free AI preview</p>
              <p className="text-[11px] text-white/30">See what your summary could say</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="rounded-xl border border-white/6 p-3.5">
              <p className="text-[10px] font-semibold text-white/25 uppercase tracking-wider mb-2">Your current summary</p>
              <div className="space-y-1.5">
                <div className="h-2.5 bg-white/8 rounded-full w-full" />
                <div className="h-2.5 bg-white/8 rounded-full w-4/5" />
                <div className="h-2.5 bg-white/8 rounded-full w-3/5" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-center justify-center">
              <div className="h-px flex-1 bg-teal-500/20" />
              <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">AI rewrote it as →</span>
              <div className="h-px flex-1 bg-teal-500/20" />
            </div>
            <div className="rounded-xl border border-teal-500/20 bg-teal-500/4 p-3.5">
              <p className="text-[10px] font-semibold text-teal-400 uppercase tracking-wider mb-2">AI-optimized version</p>
              <p className="text-sm text-white/75 leading-relaxed italic">&ldquo;{result.teaserSummary}&rdquo;</p>
            </div>
          </div>
          <p className="text-xs text-white/25 mt-4 text-center">Upgrade to rewrite every bullet point and section with AI</p>
        </div>
      )}

      {/* ── Strengths ── */}
      {result.strengths && result.strengths.length > 0 && (
        <div className="bg-gray-900 border border-white/8 rounded-2xl p-5">
          <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">What&apos;s working well</p>
          <div className="space-y-2.5">
            {result.strengths.map((s, i) => (
              <div key={i} className="flex items-start gap-2.5 text-sm text-white/55">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                {s}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── CTA ── */}
      <div className="bg-gray-900 border border-white/8 rounded-2xl p-6">
        {!isPro && (
          <div className="flex items-center gap-2 justify-center mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <p className="text-xs text-white/40">Most users fix these issues before their next application</p>
          </div>
        )}
        <div className="space-y-3">
          <button onClick={onFixAll}
            className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-bold py-4 rounded-xl text-sm transition-colors shadow-lg shadow-teal-500/20">
            {isPro
              ? <><Zap className="w-4 h-4" /> Fix all issues <ArrowRight className="w-4 h-4" /></>
              : <><Zap className="w-4 h-4" /> Fix all {sorted.length} issues <ArrowRight className="w-4 h-4" /></>
            }
          </button>
          {analysisId && (
            <Link href={`/results/${analysisId}`}
              className="w-full flex items-center justify-center gap-2 bg-white/6 hover:bg-white/10 text-white/60 font-semibold py-3.5 rounded-xl text-sm transition-colors">
              Edit manually
            </Link>
          )}
        </div>
        {!isPro && (
          <p className="text-center text-xs text-white/20 mt-4">Card required for trial · No charge for 7 days · Cancel anytime</p>
        )}
        {result && result.score < 75 && (
          <div className="mt-5 pt-5 border-t border-white/8 text-center">
            <p className="text-xs text-white/30 mb-3">Too many issues to fix manually?</p>
            <Link
              href="/builder?from=scan"
              onClick={() => {
                try {
                  localStorage.setItem("hirebee_scan_result", JSON.stringify({ score: result.score, ts: Date.now() }))
                } catch {}
              }}
              className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80 transition-colors"
            >
              Build a new ATS-ready resume instead <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
