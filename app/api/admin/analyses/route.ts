import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

async function assertAdmin(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { role: true } })
  if (user?.role !== "admin") throw new Error("Forbidden")
}

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 })
    await assertAdmin(session.user.id)

    const analyses = await prisma.analysis.findMany({
      select: {
        id: true, score: true, mode: true, fileName: true,
        jobDescription: true, createdAt: true,
        user: { select: { email: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    })

    return Response.json(analyses)
  } catch (err: any) {
    if (err.message === "Forbidden") return Response.json({ error: "Forbidden" }, { status: 403 })
    console.error("[admin/analyses]", err)
    return Response.json({ error: "Failed" }, { status: 500 })
  }
}
