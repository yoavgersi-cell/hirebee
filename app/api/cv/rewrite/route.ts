import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { rewriteCV } from "@/lib/claude"

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (!user) return Response.json({ error: "User not found" }, { status: 404 })

  const isAdmin = user.role === "admin"
  if (!isAdmin && user.plan !== "pro") {
    return Response.json({ error: "pro_required" }, { status: 402 })
  }

  const { analysisId, templateId } = await request.json()

  const analysis = await prisma.analysis.findFirst({
    where: { id: analysisId, userId: session.user.id },
  })
  if (!analysis) return Response.json({ error: "Analysis not found" }, { status: 404 })
  if (!analysis.suggestions) return Response.json({ error: "Analyze CV first" }, { status: 400 })

  try {
    const suggestions = analysis.suggestions as { category: string; issue: string; fix: string; severity: "high" | "medium" | "low" }[]
    const improvedCv = await rewriteCV(analysis.cvText, suggestions)

    await prisma.analysis.update({
      where: { id: analysisId },
      data: { improvedCv: improvedCv as object, templateId },
    })

    return Response.json({ improvedCv })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error("[cv/rewrite] error:", msg)
    return Response.json({ error: "Rewrite failed — please try again." }, { status: 500 })
  }
}
