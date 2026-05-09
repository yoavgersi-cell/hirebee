"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Plus, Trash2, X, Download, ChevronDown, ChevronUp, Palette, Layout, Sparkles, ArrowRight, Zap, CheckCircle2, Circle, Wand2, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { type CvData, type CvStyle, DEFAULT_STYLE, TEMPLATES, renderTemplate } from "@/components/cv-templates"
import { A4Preview } from "@/components/a4-preview"

// ─── Default CV ────────────────────────────────────────────────────────────────
const DEFAULT_CV: CvData = {
  name: "Your Name",
  headline: "",
  email: "you@email.com",
  phone: "+44 7700 900000",
  location: "London, UK",
  summary: "A results-driven professional with a track record of delivering impact. Write 2-3 sentences that capture your biggest achievements and what makes you stand out.",
  experience: [
    {
      company: "Your Company",
      role: "Your Role",
      period: "Jan 2022 – Present",
      bullets: [
        "Led key initiative that delivered measurable business outcome",
        "Collaborated cross-functionally to ship product/feature",
      ],
    },
  ],
  education: [
    { institution: "Your University", degree: "Your Degree", period: "2018 – 2021" },
  ],
  skills: ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"],
}

const ACCENT_COLORS = [
  { name: 'Teal',    hex: '#0d9488' },
  { name: 'Indigo',  hex: '#4f46e5' },
  { name: 'Rose',    hex: '#e11d48' },
  { name: 'Amber',   hex: '#d97706' },
  { name: 'Blue',    hex: '#2563eb' },
  { name: 'Emerald', hex: '#059669' },
  { name: 'Violet',  hex: '#7c3aed' },
  { name: 'Slate',   hex: '#475569' },
]

const FONT_OPTIONS = [
  { label: 'System',    value: 'system-ui, -apple-system, "Segoe UI", sans-serif' },
  { label: 'Georgia',   value: 'Georgia, "Times New Roman", serif' },
  { label: 'Garamond',  value: 'Garamond, "EB Garamond", "Times New Roman", serif' },
  { label: 'Helvetica', value: '"Helvetica Neue", Arial, sans-serif' },
  { label: 'Courier',   value: '"Courier New", Courier, monospace' },
]

const POPULAR_ROLES = [
  "Software Engineer", "Product Manager", "Data Analyst",
  "Marketing Manager", "UX Designer", "Sales Executive",
  "Business Analyst", "Project Manager",
]

const EXPERIENCE_LEVELS = [
  { id: "entry", label: "Entry level", sub: "0–2 years" },
  { id: "mid", label: "Mid level", sub: "3–6 years" },
  { id: "senior", label: "Senior", sub: "7+ years" },
  { id: "change", label: "Career change", sub: "Switching fields" },
]

type Section = "contact" | "summary" | "experience" | "education" | "skills"
type WizardStep = 1 | 2

type NextAction = { id: string; text: string; detail: string; section: Section }

function calcNextActions(cv: CvData): { todo: NextAction[]; done: string[] } {
  const todo: NextAction[] = []
  const done: string[] = []

  const nameOk = cv.name && cv.name !== "Your Name"
  const emailOk = cv.email && cv.email !== "you@email.com"
  if (nameOk && emailOk) done.push("Contact info complete")
  else todo.push({ id: "contact", text: "Complete your contact info", detail: "Add your name and email", section: "contact" })

  const summaryWords = cv.summary.trim().split(/\s+/).filter(Boolean).length
  if (summaryWords >= 25) done.push("Summary written")
  else if (summaryWords >= 5) todo.push({ id: "summary-short", text: "Strengthen your summary", detail: `${summaryWords} words — aim for 25+`, section: "summary" })
  else todo.push({ id: "summary-empty", text: "Write your summary", detail: "2–3 sentences about who you are", section: "summary" })

  const realExp = cv.experience.filter(e => e.company && e.role)
  const bulletCount = cv.experience.reduce((n, e) => n + e.bullets.filter(b => b.trim().length > 10).length, 0)
  if (realExp.length === 0) todo.push({ id: "experience", text: "Add your work experience", detail: "No experience added yet", section: "experience" })
  else if (bulletCount < 4) todo.push({ id: "bullets", text: "Add achievement bullets", detail: `${bulletCount} bullet${bulletCount === 1 ? "" : "s"} — ATS needs at least 4`, section: "experience" })
  else done.push("Experience complete")

  const realSkills = cv.skills.filter(s => s && !s.startsWith("Skill "))
  if (realSkills.length >= 5) done.push(`${realSkills.length} skills added`)
  else todo.push({ id: "skills", text: "Add more skills", detail: `${realSkills.length} skill${realSkills.length === 1 ? "" : "s"} — ATS expects 5+`, section: "skills" })

  const hasEdu = cv.education.some(e => e.institution && e.degree)
  if (hasEdu) done.push("Education complete")
  else todo.push({ id: "education", text: "Add your education", detail: "Include your degree and university", section: "education" })

  return { todo, done }
}

function scoreMessage(s: number): { headline: string; sub: string } {
  if (s >= 80) return { headline: "ATS-optimized ✓", sub: "Your resume is ready to send" }
  if (s >= 66) return { headline: "Passing most ATS", sub: "One more push and you're in the top 20%" }
  if (s >= 40) return { headline: "Needs work to get through", sub: "Fix the actions below to pass screening" }
  return { headline: "Getting filtered out", sub: "ATS systems are rejecting this — let's fix it" }
}

// ─── Live ATS score ─────────────────────────────────────────────────────────────
function calcAtsScore(cv: CvData): number {
  let score = 0
  // Contact completeness (25 pts)
  if (cv.name && cv.name !== "Your Name") score += 7
  if (cv.email && cv.email !== "you@email.com") score += 6
  if (cv.phone) score += 6
  if (cv.location) score += 6
  // Summary quality (20 pts)
  const words = cv.summary.trim().split(/\s+/).filter(Boolean).length
  if (words >= 30) score += 20
  else if (words >= 15) score += 12
  else if (words >= 5) score += 5
  // Experience (25 pts)
  const expCount = cv.experience.filter(e => e.company && e.role).length
  if (expCount >= 2) score += 12
  else if (expCount === 1) score += 7
  const bulletCount = cv.experience.reduce((n, e) => n + e.bullets.filter(b => b.trim().length > 10).length, 0)
  if (bulletCount >= 6) score += 13
  else if (bulletCount >= 3) score += 8
  else if (bulletCount >= 1) score += 3
  // Education (10 pts)
  if (cv.education.some(e => e.institution && e.degree)) score += 10
  // Skills (10 pts)
  const realSkills = cv.skills.filter(s => s && !s.startsWith("Skill ")).length
  if (realSkills >= 6) score += 10
  else if (realSkills >= 3) score += 6
  else if (realSkills >= 1) score += 2
  // Keyword richness in summary (10 pts)
  const hasBulletKeyword = cv.summary.match(/\b(led|managed|built|delivered|improved|increased|reduced|launched|developed|designed|optimized|analyzed|created|implemented|achieved|grew)\b/i)
  if (hasBulletKeyword) score += 10
  return Math.min(score, 100)
}

function scoreColor(s: number) {
  if (s >= 80) return "#22c55e"
  if (s >= 60) return "#14b8a6"
  if (s >= 40) return "#f59e0b"
  return "#f87171"
}

const FREE_LIMITS = { summaryRewrites: 1, bulletImproves: 3 }

// ─── Main Component ────────────────────────────────────────────────────────────
export function BuilderClient({ hasAccess }: { hasAccess: boolean }) {
  const searchParams = useSearchParams()
  const fromScan = searchParams.get("from") === "scan"

  const [wizardDone, setWizardDone] = useState(false)
  const [wizardStep, setWizardStep] = useState<WizardStep>(1)
  const [targetRole, setTargetRole] = useState("")
  const [experienceLevel, setExperienceLevel] = useState("")
  const [scanResult, setScanResult] = useState<{ score: number; ts: number } | null>(null)

  const [cv, setCv] = useState<CvData>(DEFAULT_CV)
  const [template, setTemplate] = useState("nova")
  const [cvStyle, setCvStyle] = useState<CvStyle>(DEFAULT_STYLE)
  const [activeSection, setActiveSection] = useState<Section>("contact")
  const [activePanel, setActivePanel] = useState<"coach" | "edit" | "design">("coach")
  const [downloading, setDownloading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [baseScore, setBaseScore] = useState<number | null>(null)
  const [scoreDelta, setScoreDelta] = useState<number | null>(null)
  const [wowVisible, setWowVisible] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [aiUsage, setAiUsage] = useState({ summaryRewrites: 0, bulletImproves: 0 })
  const [resumeId, setResumeId] = useState<string | null>(null)
  const [showMobilePreview, setShowMobilePreview] = useState(false)
  const prevScoreRef = useRef<number>(0)
  const deltaTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const router = useRouter()

  const atsScore = useMemo(() => calcAtsScore(cv), [cv])

  useEffect(() => {
    if (fromScan) {
      try {
        const raw = localStorage.getItem("hirebee_scan_result")
        if (raw) setScanResult(JSON.parse(raw))
      } catch {}
    }
  }, [fromScan])

  useEffect(() => {
    const prev = prevScoreRef.current
    const diff = atsScore - prev
    if (Math.abs(diff) >= 3 && prev > 0) {
      setScoreDelta(diff)
      if (deltaTimerRef.current) clearTimeout(deltaTimerRef.current)
      deltaTimerRef.current = setTimeout(() => setScoreDelta(null), 3000)
    }
    prevScoreRef.current = atsScore
  }, [atsScore])

  useEffect(() => {
    if (baseScore !== null && atsScore - baseScore >= 15 && !wowVisible) {
      setWowVisible(true)
    }
  }, [atsScore, baseScore, wowVisible])

  // Load resume from URL param
  useEffect(() => {
    const id = searchParams.get("resumeId")
    if (!id) return
    fetch(`/api/documents/resumes/${id}`)
      .then(r => r.json())
      .then(data => {
        if (!data.resume) return
        const r = data.resume
        if (r.content) setCv(r.content as CvData)
        if (r.style) setCvStyle(r.style as CvStyle)
        if (r.template) setTemplate(r.template)
        setResumeId(r.id)
        setWizardDone(true)
      })
      .catch(() => {})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Debounced auto-save
  useEffect(() => {
    if (!resumeId || !wizardDone) return
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
    autoSaveTimer.current = setTimeout(() => {
      fetch(`/api/documents/resumes/${resumeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: cv.name || "Untitled", role: cv.headline || "", content: cv, style: cvStyle, template }),
      }).catch(() => {})
    }, 3000)
    return () => { if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current) }
  }, [cv, cvStyle, template, resumeId, wizardDone])

  function updateCv(patch: Partial<CvData>) {
    setCv((prev) => ({ ...prev, ...patch }))
  }

  function completeWizard() {
    const updatedCv = targetRole ? {
      ...cv,
      headline: cv.headline || targetRole,
      summary: cv.summary === DEFAULT_CV.summary
        ? `A results-driven ${targetRole} with a track record of delivering impact. Write 2-3 sentences that capture your biggest achievements and what makes you stand out.`
        : cv.summary,
    } : cv
    if (targetRole) setCv(updatedCv)
    setBaseScore(atsScore)
    prevScoreRef.current = atsScore
    setWizardDone(true)
    // Fire-and-forget: create resume record
    if (!resumeId) {
      fetch("/api/documents/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: updatedCv.name || "Untitled", role: updatedCv.headline || targetRole || "", content: updatedCv, style: cvStyle, template }),
      }).then(r => r.json()).then(data => {
        if (data.resume?.id) setResumeId(data.resume.id)
      }).catch(() => {})
    }
  }

  async function downloadPdf() {
    if (!hasAccess) {
      setShowUpgradeModal(true)
      return
    }
    setDownloading(true)
    try {
      const res = await fetch("/api/cv/build-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cv, template, style: cvStyle }),
      })
      if (!res.ok) throw new Error("Download failed")
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${cv.name.replace(/\s+/g, "_")}_CV.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      toast.error("Download failed — please try again")
    } finally {
      setDownloading(false)
    }
  }

  async function analyzeBuiltCv() {
    setAnalyzing(true)
    try {
      const cvText = cvToText(cv)
      const res = await fetch("/api/cv/analyze-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvText }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Analysis failed")
      router.push(`/results/${data.id}`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Analysis failed")
    } finally {
      setAnalyzing(false)
    }
  }

  // ── Setup Wizard ──────────────────────────────────────────────────────────────
  if (!wizardDone) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="w-full max-w-md">
          {/* Step label */}
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest text-center mb-3">
            Step {wizardStep} of 2
          </p>
          {/* Progress bar */}
          <div className="w-full h-1 bg-gray-100 rounded-full mb-8 overflow-hidden">
            <div
              className="h-full bg-gray-900 rounded-full transition-all duration-500"
              style={{ width: wizardStep === 1 ? "50%" : "100%" }}
            />
          </div>

          {/* Step 1: Target role */}
          {wizardStep === 1 && (
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Let's build a resume that gets past ATS</h2>
              <p className="text-sm text-gray-400 mb-6">What role are you targeting? We'll optimize every word for it.</p>
              <input
                className="w-full text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 placeholder:text-gray-300 mb-4"
                placeholder="e.g. Product Manager"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && setWizardStep(2)}
                autoFocus
              />
              <div className="flex flex-wrap gap-2 mb-8">
                {POPULAR_ROLES.map((r) => (
                  <button
                    key={r}
                    onClick={() => setTargetRole(r)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      targetRole === r
                        ? "bg-gray-900 text-white border-gray-900"
                        : "border-gray-200 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setWizardStep(2)}
                className="w-full flex items-center justify-center gap-2 bg-gray-950 hover:bg-gray-800 text-white font-bold py-3.5 rounded-xl text-sm transition-colors"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => { setBaseScore(atsScore); setWizardDone(true) }} className="w-full text-center text-xs text-gray-300 hover:text-gray-500 mt-3 py-1 transition-colors">
                Skip setup
              </button>
            </div>
          )}

          {/* Step 2: How to start */}
          {wizardStep === 2 && (
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-1">How do you want to build it?</h2>
              <p className="text-sm text-gray-400 mb-6">Pick one — you can change anything later.</p>

              <div className="space-y-3 mb-8">
                <button
                  onClick={() => completeWizard()}
                  className="w-full flex items-start gap-4 p-4 rounded-xl border-2 border-gray-900 bg-white text-left transition-all hover:bg-gray-50"
                >
                  <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Layout className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Start from scratch</p>
                    <p className="text-xs text-gray-400 mt-0.5">We'll guide you section by section</p>
                  </div>
                </button>

                {fromScan && scanResult && (
                  <button
                    onClick={() => completeWizard()}
                    className="w-full flex items-start gap-4 p-4 rounded-xl border border-gray-200 bg-white text-left transition-all hover:border-gray-400"
                  >
                    <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center shrink-0 mt-0.5">
                      <Zap className="w-4 h-4 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Fix my resume — build around my scan</p>
                      <p className="text-xs text-gray-400 mt-0.5">Your scan scored {scanResult.score}/100 — we know exactly what to fix</p>
                      <div className="flex items-center gap-1.5 mt-2">
                        <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-red-400 to-teal-400 rounded-full" style={{ width: `${scanResult.score}%` }} />
                        </div>
                        <span className="text-[10px] text-gray-400">Score: {scanResult.score} → build higher</span>
                      </div>
                    </div>
                  </button>
                )}
              </div>

              <button onClick={() => setWizardStep(1)} className="w-full text-center text-xs text-gray-300 hover:text-gray-500 py-1 transition-colors">
                ← Back
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ── Main Editor ───────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col sm:h-[calc(100vh-3.5rem-4rem)]">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Resume Builder</h1>
          <p className="text-xs text-gray-400">
            {targetRole ? `Targeting: ${targetRole}` : "Build your CV and download as PDF"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={analyzeBuiltCv}
            disabled={analyzing}
            variant="outline"
            className="h-9 gap-1.5 text-xs font-semibold border-gray-200 hidden sm:flex"
          >
            {analyzing ? (
              <span className="w-3.5 h-3.5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            ATS Check
          </Button>
          <Button
            onClick={downloadPdf}
            disabled={downloading}
            className="h-9 gap-1.5 text-xs font-semibold bg-gray-950 hover:bg-gray-800"
          >
            {downloading ? (
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            Download PDF
          </Button>
        </div>
      </div>

      {/* Format toolbar — Word-like (desktop only) */}
      <div className="hidden sm:flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-3 py-2 mb-4 flex-wrap">
        {/* Font family */}
        <select
          value={cvStyle.fontFamily}
          onChange={(e) => setCvStyle(p => ({ ...p, fontFamily: e.target.value }))}
          className="text-xs text-gray-700 bg-transparent border-0 outline-none cursor-pointer font-medium pr-1"
        >
          {FONT_OPTIONS.map(f => <option key={f.label} value={f.value}>{f.label}</option>)}
        </select>

        <div className="w-px h-4 bg-gray-200" />

        {/* Font size */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCvStyle(p => ({ ...p, fontSize: Math.max(10, +(p.fontSize - 0.5).toFixed(1)) }))}
            className="w-7 h-7 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100 text-sm font-bold leading-none transition-colors"
          >−</button>
          <span className="text-xs text-gray-700 font-semibold tabular-nums w-8 text-center">{cvStyle.fontSize}px</span>
          <button
            onClick={() => setCvStyle(p => ({ ...p, fontSize: Math.min(14, +(p.fontSize + 0.5).toFixed(1)) }))}
            className="w-7 h-7 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100 text-sm font-bold leading-none transition-colors"
          >+</button>
        </div>

        <div className="w-px h-4 bg-gray-200" />

        {/* Accent colors */}
        <div className="flex items-center gap-1.5">
          {ACCENT_COLORS.map(c => (
            <button
              key={c.hex}
              title={c.name}
              onClick={() => setCvStyle(p => ({ ...p, accentColor: c.hex }))}
              className="w-5 h-5 rounded-full transition-all shrink-0"
              style={{
                backgroundColor: c.hex,
                boxShadow: cvStyle.accentColor === c.hex ? `0 0 0 2px white, 0 0 0 3.5px ${c.hex}` : 'none',
                transform: cvStyle.accentColor === c.hex ? 'scale(1.2)' : 'scale(1)',
              }}
            />
          ))}
        </div>

        <div className="w-px h-4 bg-gray-200" />

        {/* Line height */}
        <div className="flex items-center gap-1">
          {[{ label: '÷', v: 1.3, title: 'Tight' }, { label: '≡', v: 1.5, title: 'Normal' }, { label: '⩶', v: 1.7, title: 'Relaxed' }].map(lh => (
            <button
              key={lh.v}
              title={lh.title}
              onClick={() => setCvStyle(p => ({ ...p, lineHeight: lh.v }))}
              className={`w-7 h-7 rounded text-sm flex items-center justify-center transition-colors ${cvStyle.lineHeight === lh.v ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-100'}`}
            >
              {lh.label}
            </button>
          ))}
        </div>
      </div>

      {/* Upgrade modal */}
      {showUpgradeModal && (
        <UpgradeModal
          baseScore={baseScore}
          currentScore={atsScore}
          onClose={() => setShowUpgradeModal(false)}
        />
      )}

      {/* WOW moment banner */}
      {wowVisible && (
        <div className="flex items-center justify-between gap-3 bg-teal-950 border border-teal-800 rounded-xl px-4 py-3 mb-4 animate-in slide-in-from-top-2 duration-500">
          <div className="flex items-center gap-2.5">
            <Zap className="w-4 h-4 text-teal-400 shrink-0" />
            <div>
              <p className="text-sm font-bold text-white">Your resume improved significantly</p>
              <p className="text-xs text-teal-400">You're now passing ATS screening — great progress.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button onClick={downloadPdf} disabled={downloading} className="h-8 text-xs font-semibold bg-teal-500 hover:bg-teal-400 text-white gap-1.5">
              <Download className="w-3 h-3" /> Download
            </Button>
            <button onClick={() => setWowVisible(false)} className="text-teal-600 hover:text-teal-400 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row flex-1 gap-5 sm:min-h-0 sm:overflow-hidden">
        {/* Left panel */}
        <div className="w-full sm:w-72 shrink-0 flex flex-col gap-3 sm:overflow-y-auto">
          {/* Score widget */}
          <div className="bg-white border border-gray-200 rounded-xl px-4 py-3">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Resume Score</p>
              <div className="flex items-center gap-1.5">
                {scoreDelta !== null && (
                  <span className={`text-[10px] font-bold ${scoreDelta > 0 ? "text-teal-500" : "text-red-400"}`}>
                    {scoreDelta > 0 ? `+${scoreDelta}` : scoreDelta}
                  </span>
                )}
                <span className="text-sm font-extrabold tabular-nums" style={{ color: scoreColor(atsScore) }}>{atsScore}</span>
              </div>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${atsScore}%`, backgroundColor: scoreColor(atsScore) }} />
            </div>
            <p className="text-[11px] font-semibold text-gray-700">{scoreMessage(atsScore).headline}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{scoreMessage(atsScore).sub}</p>
          </div>

          {/* Panel tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
            <button
              onClick={() => setActivePanel("coach")}
              className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-1.5 rounded-lg transition-all ${
                activePanel === "coach" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Coach
            </button>
            <button
              onClick={() => setActivePanel("edit")}
              className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-1.5 rounded-lg transition-all ${
                activePanel === "edit" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              Edit
            </button>
            <button
              onClick={() => setActivePanel("design")}
              className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-1.5 rounded-lg transition-all ${
                activePanel === "design" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              Design
            </button>
          </div>

          {activePanel === "coach" ? (
            <CoachPanel cv={cv} targetRole={targetRole} setActivePanel={setActivePanel} setActiveSection={setActiveSection} />
          ) : activePanel === "edit" ? (
            <EditPanel
              cv={cv} updateCv={updateCv} activeSection={activeSection}
              setActiveSection={setActiveSection} targetRole={targetRole}
              hasAccess={hasAccess} aiUsage={aiUsage}
              onAiUse={(type) => setAiUsage(prev => ({
                ...prev,
                summaryRewrites: type === "summary" ? prev.summaryRewrites + 1 : prev.summaryRewrites,
                bulletImproves: type === "bullet" ? prev.bulletImproves + 1 : prev.bulletImproves,
              }))}
              onUpgrade={() => setShowUpgradeModal(true)}
            />
          ) : (
            <DesignPanel template={template} setTemplate={setTemplate} cvStyle={cvStyle} setCvStyle={setCvStyle} />
          )}

          {/* Mobile preview toggle */}
          <button
            onClick={() => setShowMobilePreview(v => !v)}
            className="sm:hidden flex items-center justify-center gap-2 text-sm font-semibold text-gray-600 border border-gray-200 bg-white rounded-xl py-3 hover:bg-gray-50 transition-colors"
          >
            {showMobilePreview ? "Hide preview" : "Preview my CV"}
          </button>

          {/* Mobile-only preview */}
          {showMobilePreview && (
            <div className="sm:hidden bg-gray-100 rounded-2xl p-4 overflow-x-auto">
              <div className="min-w-[600px] border border-gray-200 rounded-xl overflow-hidden shadow-lg bg-white">
                <A4Preview>{renderTemplate(cv, template, cvStyle)}</A4Preview>
              </div>
            </div>
          )}
        </div>

        {/* Preview — desktop only */}
        <div className="hidden sm:block flex-1 overflow-auto bg-gray-100 rounded-2xl p-4 min-w-0">
          <div className="max-w-2xl mx-auto border border-gray-200 rounded-xl overflow-hidden shadow-lg bg-white">
            <A4Preview>{renderTemplate(cv, template, cvStyle)}</A4Preview>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Upgrade Modal ─────────────────────────────────────────────────────────────
function UpgradeModal({ baseScore, currentScore, onClose }: {
  baseScore: number | null
  currentScore: number
  onClose: () => void
}) {
  const delta = baseScore !== null ? currentScore - baseScore : null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-300 hover:text-gray-500 transition-colors">
          <X className="w-4 h-4" />
        </button>

        {/* Score visual */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
            <Zap className="w-6 h-6 text-teal-500" />
          </div>
          <div>
            {delta !== null && delta > 0 ? (
              <>
                <p className="text-sm font-bold text-gray-900">You improved your score by +{delta} points</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {baseScore} → <span className="font-semibold text-teal-600">{currentScore}</span> / 100
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-bold text-gray-900">Your resume score: {currentScore}/100</p>
                <p className="text-xs text-gray-400 mt-0.5">Upgrade to download and unlock AI features</p>
              </>
            )}
          </div>
        </div>

        <div className="space-y-2 mb-5">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">What you unlock</p>
          {[
            "Download your resume as a PDF",
            "Unlimited AI summary rewrites",
            "Unlimited AI bullet improvements",
            "Full ATS analysis with job description match",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />
              <p className="text-xs text-gray-700">{item}</p>
            </div>
          ))}
        </div>

        <a
          href="/upgrade"
          className="block w-full text-center bg-gray-950 hover:bg-gray-800 text-white font-bold py-3 rounded-xl text-sm transition-colors"
        >
          Unlock my resume →
        </a>
        <button onClick={onClose} className="w-full text-center text-xs text-gray-300 hover:text-gray-500 mt-3 py-1 transition-colors">
          Keep editing for free
        </button>
      </div>
    </div>
  )
}

// ─── Coach Panel ───────────────────────────────────────────────────────────────
function CoachPanel({ cv, targetRole, setActivePanel, setActiveSection }: {
  cv: CvData
  targetRole: string
  setActivePanel: (p: "coach" | "edit" | "design") => void
  setActiveSection: (s: Section) => void
}) {
  const { todo, done } = calcNextActions(cv)

  function goToSection(section: Section) {
    setActiveSection(section)
    setActivePanel("edit")
  }

  return (
    <div className="space-y-2">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">What to do next</p>
        </div>
        <div className="divide-y divide-gray-100">
          {todo.length === 0 ? (
            <div className="px-4 py-4 text-center">
              <p className="text-sm font-bold text-teal-600">All done — great resume!</p>
              <p className="text-xs text-gray-400 mt-1">Download your resume or scan it for a final ATS check.</p>
            </div>
          ) : (
            todo.map((action) => (
              <button
                key={action.id}
                onClick={() => goToSection(action.section)}
                className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors group"
              >
                <Circle className="w-4 h-4 text-gray-300 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{action.text}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{action.detail}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 mt-0.5 shrink-0 transition-colors" />
              </button>
            ))
          )}
        </div>
      </div>

      {done.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Completed</p>
          </div>
          <div className="divide-y divide-gray-100">
            {done.map((item) => (
              <div key={item} className="flex items-center gap-3 px-4 py-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                <p className="text-[11px] text-gray-400">{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Edit Panel ────────────────────────────────────────────────────────────────
function EditPanel({ cv, updateCv, activeSection, setActiveSection, targetRole, hasAccess, aiUsage, onAiUse, onUpgrade }: {
  cv: CvData
  updateCv: (patch: Partial<CvData>) => void
  activeSection: Section
  setActiveSection: (s: Section) => void
  targetRole: string
  hasAccess: boolean
  aiUsage: { summaryRewrites: number; bulletImproves: number }
  onAiUse: (type: "summary" | "bullet") => void
  onUpgrade: () => void
}) {
  const sections: { id: Section; label: string }[] = [
    { id: "contact", label: "Contact Info" },
    { id: "summary", label: "Summary" },
    { id: "experience", label: "Where have you worked?" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Your Skills" },
  ]

  return (
    <div className="space-y-2">
      {sections.map((s) => (
        <SectionCard key={s.id} label={s.label} open={activeSection === s.id} onToggle={() => setActiveSection(activeSection === s.id ? "contact" : s.id)}>
          {s.id === "contact" && <ContactForm cv={cv} updateCv={updateCv} />}
          {s.id === "summary" && <SummaryForm cv={cv} updateCv={updateCv} targetRole={targetRole} hasAccess={hasAccess} used={aiUsage.summaryRewrites} onAiUse={() => onAiUse("summary")} onUpgrade={onUpgrade} />}
          {s.id === "experience" && <ExperienceForm cv={cv} updateCv={updateCv} targetRole={targetRole} hasAccess={hasAccess} bulletUsed={aiUsage.bulletImproves} onAiUse={() => onAiUse("bullet")} onUpgrade={onUpgrade} />}
          {s.id === "education" && <EducationForm cv={cv} updateCv={updateCv} />}
          {s.id === "skills" && <SkillsForm cv={cv} updateCv={updateCv} />}
        </SectionCard>
      ))}
    </div>
  )
}

function SectionCard({ label, open, onToggle, children }: { label: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-semibold text-gray-900">{label}</span>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-3">{children}</div>}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider block mb-1">{label}</label>
      {children}
    </div>
  )
}

const inputCls = "w-full text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300 placeholder:text-gray-300"

function ContactForm({ cv, updateCv }: { cv: CvData; updateCv: (p: Partial<CvData>) => void }) {
  return (
    <>
      <Field label="Full Name"><input className={inputCls} value={cv.name} onChange={(e) => updateCv({ name: e.target.value })} placeholder="Alex Chen" /></Field>
      <Field label="Professional Headline"><input className={inputCls} value={cv.headline} onChange={(e) => updateCv({ headline: e.target.value })} placeholder="e.g. Senior Product Manager · 8 years exp" /></Field>
      <Field label="Email"><input className={inputCls} value={cv.email} onChange={(e) => updateCv({ email: e.target.value })} placeholder="you@email.com" /></Field>
      <Field label="Phone"><input className={inputCls} value={cv.phone} onChange={(e) => updateCv({ phone: e.target.value })} placeholder="+44 7700 900000" /></Field>
      <Field label="Location"><input className={inputCls} value={cv.location} onChange={(e) => updateCv({ location: e.target.value })} placeholder="London, UK" /></Field>
    </>
  )
}

function SummaryForm({ cv, updateCv, targetRole, hasAccess, used, onAiUse, onUpgrade }: {
  cv: CvData; updateCv: (p: Partial<CvData>) => void; targetRole: string
  hasAccess: boolean; used: number; onAiUse: () => void; onUpgrade: () => void
}) {
  const [rewriting, setRewriting] = useState(false)
  const [suggestion, setSuggestion] = useState<string | null>(null)
  const atLimit = !hasAccess && used >= FREE_LIMITS.summaryRewrites

  async function rewriteWithAI() {
    if (atLimit) { onUpgrade(); return }
    setRewriting(true)
    setSuggestion(null)
    try {
      const res = await fetch("/api/cv/ai-assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "rewrite-summary", data: { summary: cv.summary, role: targetRole } }),
      })
      const data = await res.json()
      if (data.result) { setSuggestion(data.result); onAiUse() }
    } catch {}
    finally { setRewriting(false) }
  }

  return (
    <div className="space-y-2">
      <Field label="Professional Summary">
        <textarea
          className={`${inputCls} h-28 resize-none`}
          value={cv.summary}
          onChange={(e) => updateCv({ summary: e.target.value })}
          placeholder="Write 2–3 sentences: who you are, what you've done, what you're targeting. Be specific."
        />
      </Field>

      {suggestion ? (
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 space-y-2">
          <p className="text-[10px] font-bold text-teal-700 uppercase tracking-wider">AI suggestion</p>
          <p className="text-xs text-gray-700 leading-relaxed">{suggestion}</p>
          <div className="flex gap-2">
            <button onClick={() => { updateCv({ summary: suggestion }); setSuggestion(null) }} className="text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 px-3 py-1.5 rounded-lg transition-colors">Use this</button>
            <button onClick={() => setSuggestion(null)} className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1.5 transition-colors">Dismiss</button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <button
            onClick={rewriteWithAI}
            disabled={rewriting}
            className="flex items-center gap-1.5 text-xs font-semibold text-teal-600 hover:text-teal-800 transition-colors disabled:opacity-50"
          >
            {rewriting ? <span className="w-3 h-3 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" /> : <Wand2 className="w-3 h-3" />}
            {rewriting ? "Rewriting..." : atLimit ? "Rewrite with AI" : "Rewrite with AI"}
          </button>
          {!hasAccess && (
            <span className="text-[10px] text-gray-400">
              {atLimit ? <button onClick={onUpgrade} className="text-teal-600 hover:underline font-semibold">Unlock unlimited</button> : `${FREE_LIMITS.summaryRewrites - used} free use left`}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

function BulletRow({ value, onChange, onRemove, targetRole, hasAccess, atLimit, onAiUse, onUpgrade }: {
  value: string; onChange: (v: string) => void; onRemove: () => void; targetRole: string
  hasAccess: boolean; atLimit: boolean; onAiUse: () => void; onUpgrade: () => void
}) {
  const [improving, setImproving] = useState(false)

  async function improve() {
    if (!value.trim()) return
    if (atLimit) { onUpgrade(); return }
    setImproving(true)
    try {
      const res = await fetch("/api/cv/ai-assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "improve-bullet", data: { bullet: value, role: targetRole } }),
      })
      const data = await res.json()
      if (data.result) { onChange(data.result); onAiUse() }
    } catch {}
    finally { setImproving(false) }
  }

  return (
    <div className="flex items-start gap-1.5">
      <span className="text-gray-300 mt-2 text-xs shrink-0">•</span>
      <input
        className={`${inputCls} flex-1`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start with an action verb: Led, Built, Grew, Reduced..."
      />
      <button
        onClick={improve}
        disabled={improving || !value.trim()}
        title={atLimit ? "Upgrade to improve more bullets" : "Improve with AI"}
        className={`mt-2 shrink-0 transition-colors disabled:opacity-30 ${atLimit ? "text-gray-200 hover:text-amber-400" : "text-gray-300 hover:text-teal-500"}`}
      >
        {improving ? (
          <span className="w-3 h-3 border border-teal-400 border-t-transparent rounded-full animate-spin block" />
        ) : (
          <Wand2 className="w-3 h-3" />
        )}
      </button>
      <button onClick={onRemove} className="text-gray-200 hover:text-red-400 mt-2 shrink-0 transition-colors">
        <X className="w-3 h-3" />
      </button>
    </div>
  )
}

function ExperienceForm({ cv, updateCv, targetRole, hasAccess, bulletUsed, onAiUse, onUpgrade }: {
  cv: CvData; updateCv: (p: Partial<CvData>) => void; targetRole: string
  hasAccess: boolean; bulletUsed: number; onAiUse: () => void; onUpgrade: () => void
}) {
  const atBulletLimit = !hasAccess && bulletUsed >= FREE_LIMITS.bulletImproves
  function addExp() {
    updateCv({ experience: [...cv.experience, { company: "", role: "", period: "", bullets: [""] }] })
  }

  function updateExp(i: number, patch: Partial<CvData["experience"][0]>) {
    const exp = cv.experience.map((e, idx) => idx === i ? { ...e, ...patch } : e)
    updateCv({ experience: exp })
  }

  function removeExp(i: number) {
    updateCv({ experience: cv.experience.filter((_, idx) => idx !== i) })
  }

  function updateBullet(ei: number, bi: number, val: string) {
    const exp = cv.experience.map((e, idx) => {
      if (idx !== ei) return e
      const bullets = e.bullets.map((b, bidx) => bidx === bi ? val : b)
      return { ...e, bullets }
    })
    updateCv({ experience: exp })
  }

  function addBullet(ei: number) {
    const exp = cv.experience.map((e, idx) => idx === ei ? { ...e, bullets: [...e.bullets, ""] } : e)
    updateCv({ experience: exp })
  }

  function removeBullet(ei: number, bi: number) {
    const exp = cv.experience.map((e, idx) => {
      if (idx !== ei) return e
      return { ...e, bullets: e.bullets.filter((_, bidx) => bidx !== bi) }
    })
    updateCv({ experience: exp })
  }

  return (
    <div className="space-y-4">
      {cv.experience.map((exp, ei) => (
        <div key={ei} className="space-y-2 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Position {ei + 1}</p>
            <button onClick={() => removeExp(ei)} className="text-gray-300 hover:text-red-400 transition-colors">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <input className={inputCls} value={exp.role} onChange={(e) => updateExp(ei, { role: e.target.value })} placeholder="Job Title" />
          <input className={inputCls} value={exp.company} onChange={(e) => updateExp(ei, { company: e.target.value })} placeholder="Company" />
          <input className={inputCls} value={exp.period} onChange={(e) => updateExp(ei, { period: e.target.value })} placeholder="Jan 2022 – Present" />
          <div className="space-y-1.5">
            {exp.bullets.map((b, bi) => (
              <BulletRow
                key={bi}
                value={b}
                onChange={(v) => updateBullet(ei, bi, v)}
                onRemove={() => removeBullet(ei, bi)}
                targetRole={targetRole}
                hasAccess={hasAccess}
                atLimit={atBulletLimit}
                onAiUse={onAiUse}
                onUpgrade={onUpgrade}
              />
            ))}
            <div className="flex items-center justify-between">
              <button onClick={() => addBullet(ei)} className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1 transition-colors">
                <Plus className="w-3 h-3" /> Add bullet
              </button>
              {!hasAccess && (
                <span className="text-[10px] text-gray-400">
                  {atBulletLimit
                    ? <button onClick={onUpgrade} className="text-teal-600 hover:underline font-semibold">Unlock AI bullets</button>
                    : `${FREE_LIMITS.bulletImproves - bulletUsed} AI improve${FREE_LIMITS.bulletImproves - bulletUsed === 1 ? "" : "s"} left`}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
      <button onClick={addExp} className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1 transition-colors">
        <Plus className="w-3.5 h-3.5" /> Add position
      </button>
    </div>
  )
}

function EducationForm({ cv, updateCv }: { cv: CvData; updateCv: (p: Partial<CvData>) => void }) {
  function addEdu() {
    updateCv({ education: [...cv.education, { institution: "", degree: "", period: "" }] })
  }

  function updateEdu(i: number, patch: Partial<CvData["education"][0]>) {
    const education = cv.education.map((e, idx) => idx === i ? { ...e, ...patch } : e)
    updateCv({ education })
  }

  function removeEdu(i: number) {
    updateCv({ education: cv.education.filter((_, idx) => idx !== i) })
  }

  return (
    <div className="space-y-4">
      {cv.education.map((edu, i) => (
        <div key={i} className="space-y-2 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Education {i + 1}</p>
            <button onClick={() => removeEdu(i)} className="text-gray-300 hover:text-red-400 transition-colors">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <input className={inputCls} value={edu.institution} onChange={(e) => updateEdu(i, { institution: e.target.value })} placeholder="University Name" />
          <input className={inputCls} value={edu.degree} onChange={(e) => updateEdu(i, { degree: e.target.value })} placeholder="Degree / Field of study" />
          <input className={inputCls} value={edu.period} onChange={(e) => updateEdu(i, { period: e.target.value })} placeholder="2018 – 2021" />
        </div>
      ))}
      <button onClick={addEdu} className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1 transition-colors">
        <Plus className="w-3.5 h-3.5" /> Add education
      </button>
    </div>
  )
}

function SkillsForm({ cv, updateCv }: { cv: CvData; updateCv: (p: Partial<CvData>) => void }) {
  function addSkill() {
    updateCv({ skills: [...cv.skills, ""] })
  }
  function updateSkill(i: number, val: string) {
    const skills = cv.skills.map((s, idx) => idx === i ? val : s)
    updateCv({ skills })
  }
  function removeSkill(i: number) {
    updateCv({ skills: cv.skills.filter((_, idx) => idx !== i) })
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {cv.skills.map((s, i) => (
          <div key={i} className="flex items-center gap-1 bg-gray-100 rounded-full pl-2.5 pr-1.5 py-1">
            <input
              className="text-xs text-gray-900 bg-transparent outline-none w-20 min-w-0"
              value={s}
              onChange={(e) => updateSkill(i, e.target.value)}
              placeholder="Skill"
            />
            <button onClick={() => removeSkill(i)} className="text-gray-300 hover:text-red-400 transition-colors shrink-0">
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={addSkill}
        className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1 transition-colors"
      >
        <Plus className="w-3.5 h-3.5" /> Add skill
      </button>
    </div>
  )
}

// ─── Design Panel ──────────────────────────────────────────────────────────────
function DesignPanel({ template, setTemplate, cvStyle, setCvStyle }: {
  template: string
  setTemplate: (t: string) => void
  cvStyle: CvStyle
  setCvStyle: (fn: (prev: CvStyle) => CvStyle) => void
}) {
  return (
    <div className="space-y-5">
      {/* Templates */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Template</p>
        <div className="grid grid-cols-1 gap-1.5">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTemplate(t.id)}
              className={`flex items-center justify-between px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                template === t.id
                  ? 'bg-gray-950 text-white border-gray-950'
                  : 'border-gray-200 text-gray-700 hover:border-gray-400 bg-white'
              }`}
            >
              <span>{t.label}</span>
              {template === t.id && <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* Accent Color */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Accent color</p>
        <div className="flex flex-wrap gap-2.5">
          {ACCENT_COLORS.map(c => (
            <button
              key={c.hex}
              title={c.name}
              onClick={() => setCvStyle(p => ({ ...p, accentColor: c.hex }))}
              className="w-7 h-7 rounded-full transition-all"
              style={{
                backgroundColor: c.hex,
                boxShadow: cvStyle.accentColor === c.hex ? `0 0 0 2px white, 0 0 0 4px ${c.hex}` : 'none',
                transform: cvStyle.accentColor === c.hex ? 'scale(1.15)' : 'scale(1)',
              }}
            />
          ))}
        </div>
        {/* Custom hex input */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
          <div className="w-5 h-5 rounded-full border border-gray-200 shrink-0" style={{ backgroundColor: cvStyle.accentColor }} />
          <input
            type="text"
            value={cvStyle.accentColor}
            onChange={(e) => {
              const v = e.target.value
              if (/^#[0-9a-fA-F]{6}$/.test(v)) setCvStyle(p => ({ ...p, accentColor: v }))
            }}
            className="text-xs font-mono text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 w-full outline-none focus:ring-1 focus:ring-gray-300"
            placeholder="#0d9488"
            maxLength={7}
          />
        </div>
      </div>

      {/* Typography */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-4">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Typography</p>

        {/* Font family */}
        <div>
          <p className="text-[10px] text-gray-400 mb-2">Font family</p>
          <div className="grid grid-cols-1 gap-1">
            {FONT_OPTIONS.map(f => (
              <button
                key={f.label}
                onClick={() => setCvStyle(p => ({ ...p, fontFamily: f.value }))}
                className={`text-left px-3 py-1.5 rounded-lg border text-xs transition-all ${
                  cvStyle.fontFamily === f.value
                    ? 'bg-gray-950 text-white border-gray-950'
                    : 'border-gray-200 text-gray-700 hover:border-gray-400'
                }`}
                style={{ fontFamily: f.value }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Font size */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] text-gray-400">Font size</p>
            <span className="text-xs font-bold text-gray-700">{cvStyle.fontSize}px</span>
          </div>
          <input
            type="range"
            min={10}
            max={14}
            step={0.5}
            value={cvStyle.fontSize}
            onChange={(e) => setCvStyle(p => ({ ...p, fontSize: +e.target.value }))}
            className="w-full accent-gray-900"
          />
          <div className="flex justify-between text-[9px] text-gray-300 mt-0.5">
            <span>10</span><span>Compact</span><span>14</span>
          </div>
        </div>

        {/* Line height */}
        <div>
          <p className="text-[10px] text-gray-400 mb-2">Line height</p>
          <div className="flex gap-1">
            {[{ label: 'Tight', v: 1.3 }, { label: 'Normal', v: 1.5 }, { label: 'Open', v: 1.7 }].map(lh => (
              <button
                key={lh.v}
                onClick={() => setCvStyle(p => ({ ...p, lineHeight: lh.v }))}
                className={`flex-1 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  cvStyle.lineHeight === lh.v
                    ? 'bg-gray-950 text-white border-gray-950'
                    : 'border-gray-200 text-gray-500 hover:border-gray-400'
                }`}
              >
                {lh.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-4">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Layout</p>

        {/* Margins */}
        <div>
          <p className="text-[10px] text-gray-400 mb-2">Page margins</p>
          <div className="flex gap-1">
            {[{ label: 'Narrow', v: 16 }, { label: 'Normal', v: 24 }, { label: 'Wide', v: 36 }].map(m => (
              <button
                key={m.v}
                onClick={() => setCvStyle(p => ({ ...p, margins: m.v }))}
                className={`flex-1 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  cvStyle.margins === m.v
                    ? 'bg-gray-950 text-white border-gray-950'
                    : 'border-gray-200 text-gray-500 hover:border-gray-400'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Section spacing */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] text-gray-400">Section spacing</p>
            <span className="text-[10px] font-bold text-gray-500">
              {cvStyle.sectionSpacing <= 14 ? 'Compact' : cvStyle.sectionSpacing <= 22 ? 'Normal' : 'Spacious'}
            </span>
          </div>
          <input
            type="range"
            min={12}
            max={32}
            step={2}
            value={cvStyle.sectionSpacing}
            onChange={(e) => setCvStyle(p => ({ ...p, sectionSpacing: +e.target.value }))}
            className="w-full accent-gray-900"
          />
        </div>
      </div>
    </div>
  )
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
function cvToText(cv: CvData): string {
  const lines: string[] = [
    cv.name,
    [cv.email, cv.phone, cv.location].filter(Boolean).join(" | "),
    "",
    "SUMMARY",
    cv.summary,
    "",
    "EXPERIENCE",
    ...cv.experience.flatMap((e) => [
      `${e.role} at ${e.company} (${e.period})`,
      ...e.bullets.map((b) => `• ${b}`),
      "",
    ]),
    "EDUCATION",
    ...cv.education.map((e) => `${e.degree}, ${e.institution} (${e.period})`),
    "",
    "SKILLS",
    cv.skills.join(", "),
  ]
  return lines.join("\n")
}
