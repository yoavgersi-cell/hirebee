import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"
import { FileText, Plus, ArrowRight, Clock } from "lucide-react"

export default async function DashboardPage() {
  const session = await auth()
  const [analyses, user] = await Promise.all([
    prisma.analysis.findMany({
      where: { userId: session!.user.id },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.user.findUnique({ where: { id: session!.user.id } }),
  ])

  const isAdmin = user?.role === "admin"
  const isPro = user?.plan === "pro"
  const isTrial = user?.plan === "trial"
  const trialExpired = isTrial && user?.trialEndsAt && new Date(user.trialEndsAt) < new Date()
  const hasAccess = isAdmin || isPro || (isTrial && !trialExpired)

  if (!hasAccess) redirect("/upgrade")

  const trialDaysLeft = isTrial && user?.trialEndsAt
    ? Math.max(0, Math.ceil((new Date(user.trialEndsAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Hi{session!.user.name ? `, ${session!.user.name.split(" ")[0]}` : ""}
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">Your resume activity</p>
        </div>
        <Link
          href="/builder"
          className="flex items-center gap-1.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          Build resume
        </Link>
      </div>

      {/* Trial banner */}
      {isTrial && !trialExpired && trialDaysLeft !== null && (
        <div className="bg-teal-50 border border-teal-200 rounded-xl px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-teal-600 shrink-0" />
            <p className="text-sm text-teal-800">
              <span className="font-semibold">{trialDaysLeft} day{trialDaysLeft !== 1 ? "s" : ""} left</span> in your free trial
            </p>
          </div>
          <Link href="/upgrade" className="text-xs font-semibold text-teal-700 hover:text-teal-900 whitespace-nowrap underline">
            Upgrade now →
          </Link>
        </div>
      )}

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/builder"
          className="bg-gray-950 rounded-2xl p-5 flex flex-col gap-3 hover:bg-gray-800 transition-colors group"
        >
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-white">Resume Builder</p>
            <p className="text-xs text-white/40 mt-0.5">Build or edit your resume with live preview</p>
          </div>
          <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
        </Link>
        <Link
          href="/cover-letter"
          className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-3 hover:border-gray-400 hover:shadow-sm transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
            <FileText className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">Cover Letter</p>
            <p className="text-xs text-gray-400 mt-0.5">Generate a tailored cover letter with AI</p>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-600 transition-colors" />
        </Link>
      </div>

      {/* Recent analyses */}
      {analyses.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Recent ATS checks</h2>
          <div className="space-y-2">
            {analyses.map((a) => {
              const scoreColor = a.score === null ? "text-gray-400"
                : a.score >= 75 ? "text-emerald-600"
                : a.score >= 50 ? "text-amber-600"
                : "text-red-600"
              const scoreBg = a.score === null ? "bg-gray-100"
                : a.score >= 75 ? "bg-emerald-50 border border-emerald-200"
                : a.score >= 50 ? "bg-amber-50 border border-amber-200"
                : "bg-red-50 border border-red-200"
              return (
                <Link
                  key={a.id}
                  href={`/results/${a.id}`}
                  className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-400 hover:shadow-sm transition-all group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{a.fileName ?? "CV Analysis"}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(a.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {a.score !== null && (
                      <span className={`text-sm font-bold px-2.5 py-0.5 rounded-full ${scoreBg} ${scoreColor}`}>
                        {a.score}
                      </span>
                    )}
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-600 transition-colors" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
