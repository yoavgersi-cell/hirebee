import { notFound, redirect } from "next/navigation"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { ResultsClient } from "@/components/results-client"

interface Breakdown { formatting: number; keywords: number; experience: number; skills: number; impact: number }
interface Suggestion { category: string; issue: string; fix: string; severity: "high" | "medium" | "low" }

export default async function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()
  if (!session?.user) redirect("/login")

  const [analysis, user] = await Promise.all([
    prisma.analysis.findFirst({ where: { id, userId: session.user.id } }),
    prisma.user.findUnique({ where: { id: session.user.id }, select: { plan: true } }),
  ])
  if (!analysis) notFound()

  const breakdown = analysis.breakdown as Breakdown | null
  const suggestions = (analysis.suggestions as Suggestion[] | null) ?? []
  const sorted = [...suggestions].sort((a, b) => ({ high: 0, medium: 1, low: 2 }[a.severity] - ({ high: 0, medium: 1, low: 2 }[b.severity])))
  const isPro = user?.plan === "pro"
  const highCount = suggestions.filter((s) => s.severity === "high").length

  const scoreLabel = analysis.score === null ? ""
    : analysis.score >= 75 ? "You're in good shape — a few tweaks and this will be hard to ignore."
    : analysis.score >= 50 ? "Good bones, but there are some real gaps that are costing you callbacks."
    : "There's a lot of room to grow here — the good news is these fixes are very doable."

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Link href="/dashboard" className="hover:text-gray-700 transition-colors">Dashboard</Link>
        <span>›</span>
        <span className="text-gray-700 truncate max-w-sm">{analysis.fileName ?? "Analysis"}</span>
      </div>

      <ResultsClient
        analysis={{
          id: analysis.id,
          mode: analysis.mode,
          fileName: analysis.fileName,
          score: analysis.score,
          breakdown,
          suggestions: sorted,
          improvedCv: analysis.improvedCv as object | null,
          jobDescription: analysis.jobDescription,
          createdAt: analysis.createdAt.toISOString(),
        }}
        isPro={isPro}
        scoreLabel={scoreLabel}
        highCount={highCount}
      />
    </div>
  )
}
