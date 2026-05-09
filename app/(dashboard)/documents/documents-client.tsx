"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FileText, Mail, Trash2, Copy, ExternalLink, Plus, Crown, Clock, CheckCircle2 } from "lucide-react"

const FREE_LIMITS = { resumes: 1, coverLetters: 3 }

type Resume = {
  id: string
  name: string
  role: string
  template: string
  createdAt: string
  updatedAt: string
}

type CoverLetter = {
  id: string
  title: string
  company: string
  role: string
  resumeId: string | null
  createdAt: string
  updatedAt: string
}

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days}d ago`
  return new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })
}

function ConfirmModal({ message, onConfirm, onCancel }: { message: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4">
        <p className="text-sm text-gray-700 mb-5">{message}</p>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="text-sm px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={onConfirm} className="text-sm px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors">Delete</button>
        </div>
      </div>
    </div>
  )
}

function UpgradeModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4 text-center">
        <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4">
          <Crown className="w-6 h-6 text-amber-500" />
        </div>
        <h3 className="font-bold text-gray-900 mb-2">Upgrade to Pro</h3>
        <p className="text-sm text-gray-500 mb-5">Free accounts can save {FREE_LIMITS.resumes} resume and {FREE_LIMITS.coverLetters} cover letters. Upgrade for unlimited documents.</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 text-sm px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">Maybe later</button>
          <Link href="/upgrade" className="flex-1 text-sm px-4 py-2 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition-colors text-center">Upgrade</Link>
        </div>
      </div>
    </div>
  )
}

export function DocumentsClient({ hasFullAccess }: { hasFullAccess: boolean }) {
  const router = useRouter()
  const [resumes, setResumes] = useState<Resume[]>([])
  const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([])
  const [loading, setLoading] = useState(true)
  const [confirmDelete, setConfirmDelete] = useState<{ type: "resume" | "cl"; id: string } | null>(null)
  const [showUpgrade, setShowUpgrade] = useState(false)
  const [busy, setBusy] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/documents")
      .then(r => r.json())
      .then(data => {
        setResumes(data.resumes ?? [])
        setCoverLetters(data.coverLetters ?? [])
      })
      .finally(() => setLoading(false))
  }, [])

  async function deleteResume(id: string) {
    setBusy(id)
    await fetch(`/api/documents/resumes/${id}`, { method: "DELETE" })
    setResumes(prev => prev.filter(r => r.id !== id))
    setBusy(null)
    setConfirmDelete(null)
  }

  async function deleteCoverLetter(id: string) {
    setBusy(id)
    await fetch(`/api/documents/cover-letters/${id}`, { method: "DELETE" })
    setCoverLetters(prev => prev.filter(c => c.id !== id))
    setBusy(null)
    setConfirmDelete(null)
  }

  async function duplicateResume(id: string) {
    if (!hasFullAccess && resumes.length >= FREE_LIMITS.resumes) {
      setShowUpgrade(true)
      return
    }
    setBusy(id)
    const res = await fetch(`/api/documents/resumes/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "duplicate" }),
    })
    const data = await res.json()
    if (data.resume) setResumes(prev => [data.resume, ...prev])
    setBusy(null)
  }

  async function duplicateCoverLetter(id: string) {
    if (!hasFullAccess && coverLetters.length >= FREE_LIMITS.coverLetters) {
      setShowUpgrade(true)
      return
    }
    setBusy(id)
    const res = await fetch(`/api/documents/cover-letters/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "duplicate" }),
    })
    const data = await res.json()
    if (data.coverLetter) setCoverLetters(prev => [data.coverLetter, ...prev])
    setBusy(null)
  }

  function handleNewResume() {
    if (!hasFullAccess && resumes.length >= FREE_LIMITS.resumes) {
      setShowUpgrade(true)
      return
    }
    router.push("/builder")
  }

  function handleNewCoverLetter() {
    if (!hasFullAccess && coverLetters.length >= FREE_LIMITS.coverLetters) {
      setShowUpgrade(true)
      return
    }
    router.push("/cover-letter")
  }

  const resumeAtLimit = !hasFullAccess && resumes.length >= FREE_LIMITS.resumes
  const clAtLimit = !hasFullAccess && coverLetters.length >= FREE_LIMITS.coverLetters

  // Unified empty state — shown when user has zero documents and loading is done
  const isFullyEmpty = !loading && resumes.length === 0 && coverLetters.length === 0

  return (
    <div className="space-y-10">
      {confirmDelete && (
        <ConfirmModal
          message="Are you sure you want to delete this document? This cannot be undone."
          onConfirm={() => confirmDelete.type === "resume" ? deleteResume(confirmDelete.id) : deleteCoverLetter(confirmDelete.id)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
      {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Documents</h1>
        <p className="text-sm text-gray-500 mt-1">Your saved resumes and cover letters</p>
      </div>

      {/* ── Unified empty state ─────────────────────────────────────────── */}
      {isFullyEmpty && (
        <div className="flex flex-col items-center text-center py-16 px-6">
          {/* Headline */}
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Land your next job faster
          </h2>

          {/* Supporting text */}
          <p className="mt-3 text-base text-gray-500 max-w-sm">
            Build an ATS-optimised resume and a tailored cover letter — powered by AI — in minutes.
          </p>

          {/* Value bullets */}
          <ul className="mt-6 space-y-2.5 text-sm text-gray-600 text-left">
            {[
              "ATS-optimised resume that gets past filters",
              "Tailored cover letters matched to each role",
              "Match score + recruiter insights for every application",
            ].map(point => (
              <li key={point} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {/* Primary CTA */}
          <button
            onClick={handleNewResume}
            className="mt-8 px-8 py-3.5 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-700 transition-colors shadow-sm"
          >
            Build my resume
          </button>

          {/* Friction-reducing text */}
          <p className="mt-3 text-xs text-gray-400">
            Takes less than 2 minutes &nbsp;•&nbsp; No experience needed
          </p>

          {/* Secondary CTA */}
          <button
            onClick={handleNewCoverLetter}
            className="mt-5 text-sm text-teal-600 font-medium hover:underline"
          >
            Already have a resume? Generate a cover letter →
          </button>
        </div>
      )}

      {/* ── Resumes section (only shown when not fully empty) ───────────── */}
      {!isFullyEmpty && <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-400" />
            <h2 className="font-semibold text-gray-800">Resumes</h2>
            {!hasFullAccess && (
              <span className="text-xs text-gray-400">{resumes.length}/{FREE_LIMITS.resumes} free</span>
            )}
          </div>
          <button
            onClick={handleNewResume}
            className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg font-medium transition-colors ${
              resumeAtLimit
                ? "text-amber-600 bg-amber-50 border border-amber-200 hover:bg-amber-100"
                : "text-teal-700 bg-teal-50 border border-teal-200 hover:bg-teal-100"
            }`}
          >
            {resumeAtLimit ? <Crown className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            New Resume
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[0, 1].map(i => (
              <div key={i} className="h-28 rounded-xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : resumes.length === 0 ? (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
            <p className="text-sm text-gray-400">No resumes yet</p>
            <button onClick={handleNewResume} className="mt-2 text-sm text-teal-600 font-medium hover:underline">
              Build your first resume →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {resumes.map(r => (
              <div key={r.id} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3 hover:border-gray-300 transition-colors group">
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">{r.name}</p>
                      {r.role && <p className="text-xs text-gray-400 truncate mt-0.5">{r.role}</p>}
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full shrink-0 capitalize">{r.template}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {timeAgo(r.updatedAt)}
                  </span>
                  <div className="flex items-center gap-1 sm:opacity-0 sm:group-hover:opacity-100 sm:transition-opacity">
                    <Link
                      href={`/builder?resumeId=${r.id}`}
                      className="p-2 sm:p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
                      title="Open"
                    >
                      <ExternalLink className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                    </Link>
                    <button
                      onClick={() => duplicateResume(r.id)}
                      disabled={busy === r.id}
                      className="p-2 sm:p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
                      title="Duplicate"
                    >
                      <Copy className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                    </button>
                    <button
                      onClick={() => setConfirmDelete({ type: "resume", id: r.id })}
                      disabled={busy === r.id}
                      className="p-2 sm:p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>}

      {/* ── Cover Letters section (only shown when not fully empty) ─────── */}
      {!isFullyEmpty && <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-400" />
            <h2 className="font-semibold text-gray-800">Cover Letters</h2>
            {!hasFullAccess && (
              <span className="text-xs text-gray-400">{coverLetters.length}/{FREE_LIMITS.coverLetters} free</span>
            )}
          </div>
          <button
            onClick={handleNewCoverLetter}
            className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg font-medium transition-colors ${
              clAtLimit
                ? "text-amber-600 bg-amber-50 border border-amber-200 hover:bg-amber-100"
                : "text-teal-700 bg-teal-50 border border-teal-200 hover:bg-teal-100"
            }`}
          >
            {clAtLimit ? <Crown className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            New Cover Letter
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[0, 1, 2].map(i => (
              <div key={i} className="h-28 rounded-xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : coverLetters.length === 0 ? (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
            <Mail className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-400">No cover letters yet</p>
            <button onClick={handleNewCoverLetter} className="mt-3 text-sm text-teal-600 font-medium hover:underline">
              Generate your first cover letter →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coverLetters.map(cl => (
              <div key={cl.id} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3 hover:border-gray-300 transition-colors group">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm truncate">{cl.title}</p>
                  {(cl.company || cl.role) && (
                    <p className="text-xs text-gray-400 truncate mt-0.5">
                      {[cl.role, cl.company].filter(Boolean).join(" @ ")}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {timeAgo(cl.createdAt)}
                  </span>
                  <div className="flex items-center gap-1 sm:opacity-0 sm:group-hover:opacity-100 sm:transition-opacity">
                    <button
                      onClick={() => duplicateCoverLetter(cl.id)}
                      disabled={busy === cl.id}
                      className="p-2 sm:p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
                      title="Duplicate"
                    >
                      <Copy className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                    </button>
                    <button
                      onClick={() => setConfirmDelete({ type: "cl", id: cl.id })}
                      disabled={busy === cl.id}
                      className="p-2 sm:p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>}
    </div>
  )
}
