"use client"

import { useState, useEffect, useTransition } from "react"
import { Users, BarChart2, FileText, ShieldCheck, ChevronDown, ExternalLink, Zap, FlaskConical, Crown, Layout } from "lucide-react"
import { renderTemplate, TEMPLATES, ROLE_CVS, DEFAULT_STYLE, type CvStyle } from "@/components/cv-templates"
import { A4Preview } from "@/components/a4-preview"

interface UserRow {
  id: string
  email: string
  name: string | null
  image: string | null
  plan: string
  role: string
  analysisCount: number
  createdAt: string
}

interface AnalysisRow {
  id: string
  score: number | null
  mode: string
  fileName: string | null
  createdAt: string
  user: { email: string; name: string | null }
  jobDescription: string | null
}

interface Stats {
  totalUsers: number
  proUsers: number
  freeUsers: number
  totalAnalyses: number
}

const SAMPLE_ROLES = Object.keys(ROLE_CVS)
const SAMPLE_CV = ROLE_CVS["software-engineer"].cv

const ACCENT_COLORS: { name: string; hex: string }[] = [
  { name: "Teal",    hex: "#0d9488" },
  { name: "Indigo",  hex: "#4f46e5" },
  { name: "Rose",    hex: "#e11d48" },
  { name: "Amber",   hex: "#d97706" },
]

function PlanBadge({ plan }: { plan: string }) {
  const styles: Record<string, string> = {
    pro:   "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    trial: "bg-teal-500/15 text-teal-400 border-teal-500/20",
    free:  "bg-white/6 text-white/40 border-white/8",
  }
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${styles[plan] ?? styles.free}`}>
      {plan}
    </span>
  )
}

function RoleBadge({ role }: { role: string }) {
  if (role !== "admin") return <span className="text-xs text-white/25">user</span>
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20">
      <ShieldCheck className="w-3 h-3" /> admin
    </span>
  )
}

function ActionMenu({ user, onUpdate }: { user: UserRow; onUpdate: (id: string, data: Partial<UserRow>) => void }) {
  const [open, setOpen] = useState(false)
  const [pending, startTransition] = useTransition()

  async function update(data: { plan?: string; role?: string }) {
    setOpen(false)
    startTransition(async () => {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        const { user: updated } = await res.json()
        onUpdate(user.id, updated)
      }
    })
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        disabled={pending}
        className="flex items-center gap-1 text-xs text-white/40 hover:text-white/80 border border-white/8 hover:border-white/20 px-2.5 py-1 rounded-lg transition-all"
      >
        {pending ? "Saving..." : "Actions"} <ChevronDown className="w-3 h-3" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-20 bg-gray-900 border border-white/10 rounded-xl shadow-2xl py-1 min-w-[160px]">
            {user.plan !== "pro" && (
              <button onClick={() => update({ plan: "pro" })}
                className="w-full text-left px-3 py-2 text-xs text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                ↑ Set Pro
              </button>
            )}
            {user.plan !== "trial" && (
              <button onClick={() => update({ plan: "trial" })}
                className="w-full text-left px-3 py-2 text-xs text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                Set Trial
              </button>
            )}
            {user.plan !== "free" && (
              <button onClick={() => update({ plan: "free" })}
                className="w-full text-left px-3 py-2 text-xs text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                ↓ Set Free
              </button>
            )}
            <div className="border-t border-white/8 my-1" />
            {user.role !== "admin" ? (
              <button onClick={() => update({ role: "admin" })}
                className="w-full text-left px-3 py-2 text-xs text-amber-400/80 hover:text-amber-400 hover:bg-white/5 transition-colors">
                Make Admin
              </button>
            ) : (
              <button onClick={() => update({ role: "user" })}
                className="w-full text-left px-3 py-2 text-xs text-white/50 hover:text-white hover:bg-white/5 transition-colors">
                Remove Admin
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

// ─── Template Gallery ──────────────────────────────────────────────────────────
function TemplateGallery() {
  const [selectedRole, setSelectedRole] = useState("software-engineer")
  const [accentColor, setAccentColor] = useState(DEFAULT_STYLE.accentColor)
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null)
  const cv = ROLE_CVS[selectedRole]?.cv ?? SAMPLE_CV
  const style: CvStyle = { ...DEFAULT_STYLE, accentColor }

  return (
    <div className="bg-gray-900 border border-white/8 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
        <div className="flex items-center gap-2">
          <Layout className="w-4 h-4 text-white/40" />
          <h2 className="font-bold text-white">Template Gallery</h2>
          <span className="text-white/30 font-normal text-sm">— preview all 5 with real data</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Accent color picker */}
          <div className="flex items-center gap-1.5">
            {ACCENT_COLORS.map(c => (
              <button
                key={c.hex}
                title={c.name}
                onClick={() => setAccentColor(c.hex)}
                className="w-4 h-4 rounded-full transition-all shrink-0"
                style={{
                  backgroundColor: c.hex,
                  boxShadow: accentColor === c.hex ? `0 0 0 2px #111827, 0 0 0 3.5px ${c.hex}` : 'none',
                  transform: accentColor === c.hex ? 'scale(1.25)' : 'scale(1)',
                }}
              />
            ))}
          </div>
          {/* Role picker */}
          <select
            value={selectedRole}
            onChange={e => setSelectedRole(e.target.value)}
            className="text-xs bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-white/60 outline-none cursor-pointer"
          >
            {SAMPLE_ROLES.map(r => (
              <option key={r} value={r}>{ROLE_CVS[r].role}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {TEMPLATES.map(t => (
          <div key={t.id}>
            <p className="text-xs text-white/50 mb-2 font-semibold text-center">{t.label}</p>
            <button
              onClick={() => setActiveTemplate(activeTemplate === t.id ? null : t.id)}
              className="w-full border border-white/8 rounded-xl overflow-hidden hover:border-teal-500/40 transition-colors block"
            >
              <A4Preview clipHeight={320}>
                {renderTemplate(cv, t.id, style)}
              </A4Preview>
            </button>
            <p className="text-[10px] text-white/25 text-center mt-1.5">click to expand</p>
          </div>
        ))}
      </div>

      {/* Expanded view */}
      {activeTemplate && (
        <div className="border-t border-white/8 p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-white">
              {TEMPLATES.find(t => t.id === activeTemplate)?.label} — full preview
            </p>
            <button
              onClick={() => setActiveTemplate(null)}
              className="text-xs text-white/40 hover:text-white/80 transition-colors"
            >
              Close ×
            </button>
          </div>
          <div className="max-w-2xl border border-white/8 rounded-xl overflow-hidden">
            <A4Preview>{renderTemplate(cv, activeTemplate, style)}</A4Preview>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── My Plan Widget ────────────────────────────────────────────────────────────
function MyPlanWidget({ users, onUpdate }: { users: UserRow[]; onUpdate: (id: string, data: Partial<UserRow>) => void }) {
  const me = users.find(u => u.role === "admin")
  if (!me) return null

  const meId = me.id

  const planColors: Record<string, string> = {
    pro:   "text-emerald-400",
    trial: "text-teal-400",
    free:  "text-white/40",
  }

  async function setPlan(plan: string) {
    const res = await fetch(`/api/admin/users/${meId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    })
    if (res.ok) {
      const { user: updated } = await res.json()
      onUpdate(meId, updated)
    }
  }

  return (
    <div className="bg-gray-900 border border-amber-500/20 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <Crown className="w-4 h-4 text-amber-400" />
        <p className="text-xs font-bold text-amber-400 uppercase tracking-widest">My account</p>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-white">{me.email}</p>
          <p className={`text-xs font-semibold mt-0.5 ${planColors[me.plan] ?? planColors.free}`}>
            Current plan: {me.plan}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          {["free", "trial", "pro"].map(p => (
            <button
              key={p}
              onClick={() => setPlan(p)}
              className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                me.plan === p
                  ? "bg-white text-gray-900 border-white"
                  : "border-white/15 text-white/50 hover:border-white/30 hover:text-white/80"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <p className="text-[11px] text-white/25 mt-2">
        Switch your own plan to test gating — free/trial/pro restrictions, upgrade prompts, etc.
      </p>
    </div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [stats, setStats]       = useState<Stats | null>(null)
  const [users, setUsers]       = useState<UserRow[]>([])
  const [analyses, setAnalyses] = useState<AnalysisRow[]>([])
  const [search, setSearch]     = useState("")
  const [loading, setLoading]   = useState(true)
  const [activeTab, setActiveTab] = useState<"overview" | "testing">("overview")

  useEffect(() => {
    async function load() {
      const [sRes, uRes, aRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/users"),
        fetch("/api/admin/analyses"),
      ])
      if (sRes.ok) setStats(await sRes.json())
      if (uRes.ok) setUsers(await uRes.json())
      if (aRes.ok) setAnalyses(await aRes.json())
      setLoading(false)
    }
    load()
  }, [])

  function updateUser(id: string, data: Partial<UserRow>) {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...data } : u))
  }

  const filtered = users.filter(u =>
    !search || u.email.includes(search) || (u.name ?? "").toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-6 h-6 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Admin Dashboard</h1>
          <p className="text-white/30 text-sm mt-1">Manage users, plans, and test features</p>
        </div>
        {/* Tabs */}
        <div className="flex bg-white/5 border border-white/8 rounded-xl p-1 gap-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`text-xs font-semibold px-4 py-1.5 rounded-lg transition-all ${activeTab === "overview" ? "bg-white text-gray-900" : "text-white/50 hover:text-white"}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("testing")}
            className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 rounded-lg transition-all ${activeTab === "testing" ? "bg-white text-gray-900" : "text-white/50 hover:text-white"}`}
          >
            <FlaskConical className="w-3 h-3" />
            Testing
          </button>
        </div>
      </div>

      {/* ── OVERVIEW TAB ── */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Users,      label: "Total Users",    value: stats?.totalUsers ?? 0,    color: "text-teal-400" },
              { icon: ShieldCheck, label: "Pro + Trial",   value: stats?.proUsers ?? 0,      color: "text-emerald-400" },
              { icon: BarChart2,  label: "Free Users",     value: stats?.freeUsers ?? 0,     color: "text-white/60" },
              { icon: FileText,   label: "Analyses Run",   value: stats?.totalAnalyses ?? 0, color: "text-amber-400" },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="bg-gray-900 border border-white/8 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Icon className={`w-4 h-4 ${color}`} />
                  <span className="text-xs text-white/40">{label}</span>
                </div>
                <p className={`text-3xl font-extrabold ${color}`}>{value.toLocaleString()}</p>
              </div>
            ))}
          </div>

          {/* Users table */}
          <div className="bg-gray-900 border border-white/8 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
              <h2 className="font-bold text-white">Users <span className="text-white/30 font-normal text-sm ml-1">({users.length})</span></h2>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by email or name..."
                className="bg-white/4 border border-white/8 rounded-lg px-3 py-1.5 text-xs text-white/70 placeholder:text-white/20 focus:outline-none focus:border-teal-500/40 w-48"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/6 text-xs text-white/25 uppercase tracking-wider">
                    <th className="text-left px-6 py-3 font-medium">User</th>
                    <th className="text-left px-4 py-3 font-medium">Plan</th>
                    <th className="text-left px-4 py-3 font-medium">Role</th>
                    <th className="text-left px-4 py-3 font-medium">Analyses</th>
                    <th className="text-left px-4 py-3 font-medium">Joined</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user, i) => (
                    <tr key={user.id} className={`border-b border-white/4 hover:bg-white/2 transition-colors ${i === filtered.length - 1 ? "border-0" : ""}`}>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          {user.image ? (
                            <img src={user.image} alt="" className="w-7 h-7 rounded-full object-cover" />
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-teal-500/20 flex items-center justify-center text-xs font-bold text-teal-400">
                              {(user.name ?? user.email)[0].toUpperCase()}
                            </div>
                          )}
                          <div>
                            <p className="text-white/90 font-medium text-xs">{user.name || "—"}</p>
                            <p className="text-white/35 text-[11px]">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3"><PlanBadge plan={user.plan} /></td>
                      <td className="px-4 py-3"><RoleBadge role={user.role} /></td>
                      <td className="px-4 py-3 text-xs text-white/50">{user.analysisCount}</td>
                      <td className="px-4 py-3 text-xs text-white/30">
                        {new Date(user.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "2-digit" })}
                      </td>
                      <td className="px-4 py-3">
                        <ActionMenu user={user} onUpdate={updateUser} />
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr><td colSpan={6} className="px-6 py-8 text-center text-xs text-white/20">No users found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent analyses */}
          <div className="bg-gray-900 border border-white/8 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/8">
              <h2 className="font-bold text-white">Recent Analyses <span className="text-white/30 font-normal text-sm ml-1">({analyses.length})</span></h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/6 text-xs text-white/25 uppercase tracking-wider">
                    <th className="text-left px-6 py-3 font-medium">User</th>
                    <th className="text-left px-4 py-3 font-medium">Score</th>
                    <th className="text-left px-4 py-3 font-medium">Mode</th>
                    <th className="text-left px-4 py-3 font-medium">File</th>
                    <th className="text-left px-4 py-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {analyses.map((a, i) => (
                    <tr key={a.id} className={`border-b border-white/4 hover:bg-white/2 transition-colors ${i === analyses.length - 1 ? "border-0" : ""}`}>
                      <td className="px-6 py-3">
                        <p className="text-white/70 text-xs">{a.user.name ?? a.user.email}</p>
                        <p className="text-white/25 text-[11px]">{a.user.name ? a.user.email : ""}</p>
                      </td>
                      <td className="px-4 py-3">
                        {a.score != null ? (
                          <span className={`text-sm font-bold ${a.score >= 70 ? "text-teal-400" : a.score >= 50 ? "text-amber-400" : "text-red-400"}`}>
                            {a.score}
                          </span>
                        ) : <span className="text-white/20 text-xs">—</span>}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${a.mode === "jd" ? "bg-teal-500/10 text-teal-400" : "bg-white/6 text-white/40"}`}>
                          {a.mode === "jd" ? "Job match" : a.mode}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-white/30 max-w-[120px] truncate">{a.fileName ?? "pasted"}</td>
                      <td className="px-4 py-3 text-xs text-white/30">
                        {new Date(a.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                      </td>
                    </tr>
                  ))}
                  {analyses.length === 0 && (
                    <tr><td colSpan={5} className="px-6 py-8 text-center text-xs text-white/20">No analyses yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── TESTING TAB ── */}
      {activeTab === "testing" && (
        <div className="space-y-6">
          {/* My plan switcher */}
          <MyPlanWidget users={users} onUpdate={updateUser} />

          {/* Quick links */}
          <div className="bg-gray-900 border border-white/8 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-white/40" />
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Quick links — test each flow</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { label: "Scan my resume",   href: "/analyze",   desc: "Upload/paste → ATS score → decision block",         color: "teal" },
                { label: "Builder",          href: "/builder",   desc: "Wizard → editor → live score → download PDF",       color: "indigo" },
                { label: "Upgrade page",     href: "/upgrade",   desc: "Paddle checkout — test plan gating",                color: "amber" },
                { label: "Dashboard",        href: "/dashboard", desc: "User home — recent scans, quick actions",           color: "gray" },
                { label: "Landing page",     href: "/",          desc: "Hero, decision block, testimonials, pricing",       color: "gray" },
                { label: "CV Examples",      href: "/cv-examples", desc: "Template gallery with role samples",              color: "gray" },
                { label: "Builder (from scan)", href: "/builder?from=scan", desc: "Simulates arriving from /analyze",       color: "teal" },
              ].map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-3 bg-white/3 hover:bg-white/6 border border-white/8 hover:border-white/15 rounded-xl p-4 transition-all"
                >
                  <div>
                    <p className="text-sm font-semibold text-white group-hover:text-teal-400 transition-colors">{link.label}</p>
                    <p className="text-[11px] text-white/30 mt-0.5 leading-relaxed">{link.desc}</p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 shrink-0 mt-0.5 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Template gallery */}
          <TemplateGallery />

          {/* Plan gating cheatsheet */}
          <div className="bg-gray-900 border border-white/8 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-4 h-4 text-white/40" />
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Plan gating reference</p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs">
              {[
                {
                  plan: "Free",
                  color: "text-white/50",
                  border: "border-white/8",
                  features: ["ATS score", "2 issues shown", "Keyword gap preview", "No PDF", "No rewrite"],
                },
                {
                  plan: "Trial",
                  color: "text-teal-400",
                  border: "border-teal-500/20",
                  features: ["Full ATS scan", "All issues + fixes", "AI rewrite", "PDF download", "Builder access", "7 days free"],
                },
                {
                  plan: "Pro",
                  color: "text-emerald-400",
                  border: "border-emerald-500/20",
                  features: ["Everything in Trial", "Unlimited scans", "Unlimited rewrites", "$19/mo after trial"],
                },
              ].map(p => (
                <div key={p.plan} className={`border ${p.border} rounded-xl p-4`}>
                  <p className={`font-bold uppercase tracking-wider text-[10px] mb-2 ${p.color}`}>{p.plan}</p>
                  <ul className="space-y-1">
                    {p.features.map(f => (
                      <li key={f} className="text-white/40 text-[11px]">· {f}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
