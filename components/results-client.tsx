"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Sparkles, Lock, ChevronDown, AlertTriangle, AlertCircle, Info, CheckCircle2, ChevronRight, ArrowRight, Download, Zap, Layout } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TEMPLATES } from "@/components/cv-templates"
import { CvPreview } from "@/components/cv-preview"

interface Breakdown { formatting: number; keywords: number; experience: number; skills: number; impact: number }
interface Suggestion { category: string; issue: string; fix: string; severity: "high" | "medium" | "low" }
interface ImprovedCv { name: string; email: string; phone: string; location: string; summary: string; experience: { company: string; role: string; period: string; bullets: string[] }[]; education: { institution: string; degree: string; period: string }[]; skills: string[] }

interface Props {
  analysis: {
    id: string
    mode: string
    fileName: string | null
    score: number | null
    breakdown: Breakdown | null
    suggestions: Suggestion[]
    improvedCv: object | null
    jobDescription: string | null
    createdAt: string
  }
  isPro: boolean
  scoreLabel: string
  highCount: number
}

const categoryLabel: Record<string, string> = {
  formatting: "Formatting",
  keywords: "ATS Score",
  experience: "Experience",
  skills: "Skills",
  impact: "Impact",
}

function scoreColor(val: number) {
  if (val >= 75) return "#10b981"
  if (val >= 50) return "#f59e0b"
  return "#ef4444"
}

// Highlights numbers/%, quoted phrases, and key CV terms
function HighlightText({ text, dim = false }: { text: string; dim?: boolean }) {
  const pattern = /('[\w\s\-–,./]+?'|"[\w\s\-–,./]+"|\b\d+[\d,]*%|\$[\d,]+[k]?|\b\d+[–\-]\d+\s*\w+|\bATS\b|\bOKR[s]?\b|\bKPI[s]?\b|\bROI\b|\bSEO\b|\bAPI[s]?\b|\bSQL\b)/g
  const parts = text.split(pattern)
  const baseColor = dim ? "text-gray-600" : "text-gray-800"
  return (
    <span className={`text-sm leading-relaxed ${baseColor}`}>
      {parts.map((part, i) => {
        pattern.lastIndex = 0
        return pattern.test(part) ? (
          <mark key={i} className="bg-amber-100 text-amber-900 rounded px-0.5 font-medium not-italic">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      })}
    </span>
  )
}

function ScoreRing({ score }: { score: number }) {
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const filled = (score / 100) * circumference
  const color = scoreColor(score)
  return (
    <div className="relative w-24 h-24 shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9" />
        <circle cx="50" cy="50" r={radius} fill="none" stroke={color} strokeWidth="9"
          strokeDasharray={`${filled} ${circumference}`} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-extrabold tabular-nums leading-none" style={{ color }}>{score}</span>
        <span className="text-white/30 text-[10px] mt-0.5">/100</span>
      </div>
    </div>
  )
}

const severityConfig = {
  high: { Icon: AlertTriangle, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", label: "High" },
  medium: { Icon: AlertCircle, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", label: "Medium" },
  low: { Icon: Info, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", label: "Low" },
} as const

function SuggestionCard({ s, index }: { s: Suggestion; index: number }) {
  const [open, setOpen] = useState(false)
  const cfg = severityConfig[s.severity] ?? severityConfig.low
  const { Icon } = cfg

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-3.5 flex items-start gap-3 hover:bg-gray-50 transition-colors"
      >
        {/* Index */}
        <span className="text-xs font-bold text-gray-300 w-5 mt-0.5 shrink-0 tabular-nums">
          {String(index).padStart(2, "0")}
        </span>
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {categoryLabel[s.category] ?? s.category}
            </span>
            <span className={`inline-flex items-center gap-1 text-xs font-medium px-1.5 py-0.5 rounded-md border ${cfg.color} ${cfg.bg} ${cfg.border}`}>
              <Icon className="w-2.5 h-2.5" />
              {cfg.label}
            </span>
          </div>
          <p className="font-medium leading-snug pr-4"><HighlightText text={s.issue} /></p>
        </div>
        {/* Chevron */}
        <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 mt-0.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Expanded fix */}
      {open && (
        <div className="px-4 pb-4 pt-1 border-t border-gray-100">
          <div className="flex items-center gap-1.5 mb-2 ml-8">
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">How to fix</span>
          </div>
          <div className="ml-8"><HighlightText text={s.fix} dim /></div>
        </div>
      )}
    </div>
  )
}

export function ResultsClient({ analysis, isPro, scoreLabel, highCount }: Props) {
  const [rewriting, setRewriting] = useState(false)
  const [improvedCv, setImprovedCv] = useState<ImprovedCv | null>(analysis.improvedCv as ImprovedCv | null)
  const [selectedTemplate, setSelectedTemplate] = useState("classic")
  const [showJd, setShowJd] = useState(false)
  const router = useRouter()

  async function rewrite() {
    setRewriting(true)
    try {
      const res = await fetch("/api/cv/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analysisId: analysis.id, templateId: selectedTemplate }),
      })
      const data = await res.json()
      if (res.status === 402) {
        toast.error("CV rewrite is a Pro feature.", {
          description: "Upgrade to rewrite and download your CV.",
          action: { label: "Upgrade →", onClick: () => router.push("/upgrade") },
          duration: 8000,
        })
        return
      }
      if (!res.ok) throw new Error(data.error ?? "Rewrite failed")
      setImprovedCv(data.improvedCv)
      toast.success("Your improved CV is ready!")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setRewriting(false)
    }
  }

  const score = analysis.score ?? 0
  const suggestions = analysis.suggestions
  const grouped = {
    high: suggestions.filter((s) => s.severity === "high"),
    medium: suggestions.filter((s) => s.severity === "medium"),
    low: suggestions.filter((s) => s.severity === "low"),
  }

  const strongDimensions = analysis.breakdown
    ? (Object.entries(analysis.breakdown) as [string, number][]).filter(([, v]) => v >= 70)
    : []

  let globalIndex = 1

  return (
    <div className="space-y-4">
      {/* Score hero */}
      <div className="bg-gray-950 rounded-2xl p-5 flex items-center gap-6">
        <ScoreRing score={score} />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-1">
            {analysis.mode === "jd" ? "Match Score" : "CV Score"}
          </p>
          <p className="text-white/80 text-sm leading-relaxed mb-3">{scoreLabel}</p>

          {/* Inline breakdown pills */}
          {analysis.breakdown && (
            <div className="flex flex-wrap gap-2">
              {(Object.entries(analysis.breakdown) as [string, number][])
                .sort((a, b) => a[1] - b[1])
                .map(([key, val]) => (
                  <div key={key} className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: scoreColor(val) }} />
                    <span className="text-white/50 text-xs">{categoryLabel[key]}</span>
                    <span className="text-xs font-bold tabular-nums" style={{ color: scoreColor(val) }}>{val}</span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Strengths */}
      {strongDimensions.length > 0 && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <p className="text-sm text-emerald-800">
            <span className="font-semibold">Strong: </span>
            {strongDimensions.map(([k]) => categoryLabel[k] ?? k).join(" & ")} — focus edits on lower-scoring areas.
          </p>
        </div>
      )}

      {/* Summary bar */}
      {suggestions.length > 0 && (
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-bold text-gray-900">
            What to fix
          </h2>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            {grouped.high.length > 0 && <span className="font-semibold text-red-500">{grouped.high.length} critical</span>}
            {grouped.medium.length > 0 && <span className="text-amber-500">{grouped.medium.length} medium</span>}
            {grouped.low.length > 0 && <span className="text-gray-400">{grouped.low.length} low</span>}
            <span className="text-gray-300">· click to expand</span>
          </div>
        </div>
      )}

      {/* JD toggle */}
      {analysis.mode === "jd" && analysis.jobDescription && (
        <button
          onClick={() => setShowJd(!showJd)}
          className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showJd ? "rotate-180" : ""}`} />
          {showJd ? "Hide" : "Show"} job description
        </button>
      )}
      {showJd && analysis.jobDescription && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs text-gray-600 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
          {analysis.jobDescription}
        </div>
      )}

      {/* Suggestions — grouped */}
      {(["high", "medium", "low"] as const).map((sev) => {
        const group = grouped[sev]
        if (group.length === 0) return null
        const cfg = severityConfig[sev]
        const { Icon } = cfg
        return (
          <div key={sev} className="space-y-2">
            <div className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide ${cfg.color}`}>
              <Icon className="w-3.5 h-3.5" />
              {cfg.label} priority
            </div>
            {group.map((s) => <SuggestionCard key={globalIndex} s={s} index={globalIndex++} />)}
          </div>
        )
      })}

      {/* ── Decision block ── */}
      {improvedCv ? (
        /* Rewrite done — compact result */
        <RewriteResult
          cv={improvedCv}
          template={selectedTemplate}
          analysisId={analysis.id}
          onTemplateChange={setSelectedTemplate}
        />
      ) : (
        <DecisionBlock
          score={score}
          issueCount={suggestions.length}
          highCount={highCount}
          isPro={isPro}
          rewriting={rewriting}
          teaserSummary={(analysis.improvedCv as { teaserSummary?: string } | null)?.teaserSummary}
          onFix={rewrite}
          onUpgrade={() => router.push("/upgrade")}
          onBuild={() => router.push("/builder?from=scan")}
        />
      )}
    </div>
  )
}

// ─── Decision Block ────────────────────────────────────────────────────────────
function DecisionBlock({
  score, issueCount, highCount, isPro, rewriting, teaserSummary, onFix, onUpgrade, onBuild,
}: {
  score: number
  issueCount: number
  highCount: number
  isPro: boolean
  rewriting: boolean
  teaserSummary?: string
  onFix: () => void
  onUpgrade: () => void
  onBuild: () => void
}) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-lg font-extrabold text-gray-900">
          {score < 70 ? "Your resume has issues. Here's how to fix them." : "Ready to improve your resume?"}
        </h2>
        <p className="text-sm text-gray-400 mt-0.5">Choose your path — we'll handle the rest.</p>
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-5 gap-3">
        {/* Option 1 — Primary (3/5 width) */}
        <div className="sm:col-span-3 bg-gray-950 rounded-2xl p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest bg-teal-400/10 border border-teal-400/20 px-2 py-0.5 rounded-full">
              Recommended
            </span>
          </div>

          <div className="flex items-start gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-teal-500/15 flex items-center justify-center shrink-0">
              <Zap className="w-4.5 h-4.5 text-teal-400" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Fix my resume automatically</p>
              <p className="text-xs text-white/40 mt-0.5 leading-relaxed">AI applies every fix we found — in seconds</p>
            </div>
          </div>

          {/* Teaser summary for non-pro */}
          {!isPro && teaserSummary && (
            <div className="bg-white/5 border border-white/8 rounded-xl p-3 mb-4">
              <p className="text-[10px] font-semibold text-white/30 uppercase tracking-wider mb-1.5">Preview — your rewritten summary</p>
              <p className="text-xs text-white/60 leading-relaxed italic">&ldquo;{teaserSummary}&rdquo;</p>
            </div>
          )}

          <ul className="space-y-2 mb-5 flex-1">
            {[
              "Keeps your existing experience intact",
              `Fixes all ${issueCount} issue${issueCount !== 1 ? "s" : ""} we found${highCount > 0 ? ` (${highCount} critical)` : ""}`,
              "ATS-optimized keywords added",
              "Download as PDF — ready in 60 seconds",
            ].map((b) => (
              <li key={b} className="flex items-start gap-2 text-xs text-white/55">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                {b}
              </li>
            ))}
          </ul>

          {isPro ? (
            <button
              onClick={onFix}
              disabled={rewriting}
              className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 disabled:opacity-60 text-white font-bold py-3 rounded-xl text-sm transition-colors shadow-lg shadow-teal-500/20"
            >
              {rewriting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Rewriting your resume…
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Fix my resume now
                </>
              )}
            </button>
          ) : (
            <button
              onClick={onUpgrade}
              className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-bold py-3 rounded-xl text-sm transition-colors shadow-lg shadow-teal-500/20"
            >
              <Zap className="w-4 h-4" />
              Fix my resume now <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {!isPro && (
            <p className="text-center text-[11px] text-white/20 mt-2">
              7-day free trial · No charge today · Cancel anytime
            </p>
          )}
        </div>

        {/* Option 2 — Secondary (2/5 width) */}
        <div className="sm:col-span-2 bg-white border border-gray-200 rounded-2xl p-5 flex flex-col">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
              <Layout className="w-4 h-4 text-gray-500" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Build a new resume</p>
              <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">Start fresh from a clean template</p>
            </div>
          </div>

          <ul className="space-y-2 mb-5 flex-1">
            {[
              "5 ATS-friendly templates",
              "Live ATS score as you build",
              "Download as PDF anytime",
            ].map((b) => (
              <li key={b} className="flex items-start gap-2 text-xs text-gray-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-gray-300 shrink-0 mt-0.5" />
                {b}
              </li>
            ))}
          </ul>

          <button
            onClick={onBuild}
            className="w-full flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-400 text-gray-700 font-semibold py-3 rounded-xl text-sm transition-colors"
          >
            Start fresh <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <p className="text-center text-[11px] text-gray-300 mt-2">
            Works on your existing trial
          </p>
        </div>
      </div>

      {/* Trust footer */}
      {score < 70 && (
        <p className="text-center text-xs text-gray-400">
          Most users with a score under 70 choose automatic fix
        </p>
      )}
    </div>
  )
}

// ─── Rewrite Result (compact, post-fix) ────────────────────────────────────────
function RewriteResult({ cv, template, analysisId, onTemplateChange }: {
  cv: object
  template: string
  analysisId: string
  onTemplateChange: (t: string) => void
}) {
  const [downloading, setDownloading] = useState(false)
  const cvData = cv as { name?: string }

  async function downloadPdf() {
    setDownloading(true)
    try {
      const res = await fetch(`/api/cv/download/${analysisId}?template=${template}`)
      if (!res.ok) throw new Error("Download failed")
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${(cvData.name ?? "resume").replace(/\s+/g, "_")}_CV.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      toast.error("Download failed — please try again")
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-4 h-4 text-teal-500" />
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900">Your rewritten resume is ready</p>
          <p className="text-xs text-gray-400">All issues fixed · ATS-optimized · Choose a template below</p>
        </div>
      </div>

      {/* Template picker — small pills */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-gray-400 font-medium shrink-0">Template:</span>
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            onClick={() => onTemplateChange(t.id)}
            className={`text-xs px-3 py-1 rounded-full border transition-all ${
              template === t.id
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-200 text-gray-600 hover:border-gray-400"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Download */}
      <button
        onClick={downloadPdf}
        disabled={downloading}
        className="w-full flex items-center justify-center gap-2 bg-gray-950 hover:bg-gray-800 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl text-sm transition-colors"
      >
        {downloading ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Generating PDF…
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            Download PDF
          </>
        )}
      </button>
    </div>
  )
}
