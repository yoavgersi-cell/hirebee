import { NextRequest } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { analyzeCV, analyzeCVvsJD } from "@/lib/claude"

const FREE_LIMIT = 2

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { cvText, jobDescription } = await req.json()
  if (!cvText || cvText.trim().length < 100) {
    return Response.json({ error: "CV content is too short to analyze" }, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { plan: true, role: true, analysisCount: true } })
  if (!user) return Response.json({ error: "User not found" }, { status: 404 })

  const isAdmin = user.role === "admin"
  if (!isAdmin && user.plan === "free" && user.analysisCount >= FREE_LIMIT) {
    return Response.json({ error: "limit_reached" }, { status: 402 })
  }

  try {
    const hasJD = !!jobDescription?.trim()
    const mode = hasJD ? "jd" : "standard"
    const result = hasJD
      ? await analyzeCVvsJD(cvText, jobDescription)
      : await analyzeCV(cvText)

    const [analysis] = await Promise.all([
      prisma.analysis.create({
        data: {
          userId: session.user.id,
          mode,
          fileName: "pasted.txt",
          cvText,
          jobDescription: hasJD ? jobDescription : null,
          score: result.score,
          breakdown: result.breakdown as object,
          suggestions: result.suggestions as object[],
          improvedCv: result.teaserSummary ? { teaserSummary: result.teaserSummary } : undefined,
        },
      }),
      prisma.user.update({
        where: { id: session.user.id },
        data: { analysisCount: { increment: 1 } },
      }),
    ])

    return Response.json({ id: analysis.id, result })
  } catch (err) {
    console.error("[analyze-text] error:", err)
    return Response.json({ error: "Analysis failed — please try again." }, { status: 500 })
  }
}
