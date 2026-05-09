import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { analyzeCV, analyzeCVvsJD } from "@/lib/claude"
import { extractTextFromFile } from "@/lib/parse-cv"

const FREE_LIMIT = 2

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get("file") as File | null
  const mode = formData.get("mode") as string
  const jobDescription = formData.get("jobDescription") as string | null

  if (!file) return Response.json({ error: "No file uploaded" }, { status: 400 })
  if (!mode) return Response.json({ error: "Mode required" }, { status: 400 })
  if (mode === "jd" && !jobDescription?.trim()) {
    return Response.json({ error: "Job description required for JD mode" }, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { plan: true, role: true, analysisCount: true } })
  if (!user) return Response.json({ error: "User not found" }, { status: 404 })

  const isAdmin = user.role === "admin"
  if (!isAdmin && user.plan === "free" && user.analysisCount >= FREE_LIMIT) {
    return Response.json({ error: "limit_reached" }, { status: 402 })
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer())
    const cvText = await extractTextFromFile(buffer, file.type)

    if (!cvText || cvText.length < 100) {
      return Response.json({ error: "Could not extract text from file. Please ensure it contains readable text." }, { status: 400 })
    }

    const result = mode === "jd"
      ? await analyzeCVvsJD(cvText, jobDescription!)
      : await analyzeCV(cvText)

    const [analysis] = await Promise.all([
      prisma.analysis.create({
        data: {
          userId: session.user.id,
          mode,
          fileName: file.name,
          cvText,
          jobDescription: mode === "jd" ? jobDescription : null,
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

    return Response.json({ analysisId: analysis.id, result })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error("[cv/analyze] error:", msg)
    return Response.json({ error: msg.startsWith("Unsupported") ? msg : "Analysis failed — please try again." }, { status: 500 })
  }
}
