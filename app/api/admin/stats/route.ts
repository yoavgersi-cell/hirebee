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

    const [totalUsers, proUsers, totalAnalyses] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { plan: { in: ["pro", "trial"] } } }),
      prisma.analysis.count(),
    ])

    return Response.json({
      totalUsers,
      proUsers,
      freeUsers: totalUsers - proUsers,
      totalAnalyses,
    })
  } catch (err: any) {
    if (err.message === "Forbidden") return Response.json({ error: "Forbidden" }, { status: 403 })
    console.error("[admin/stats]", err)
    return Response.json({ error: "Failed" }, { status: 500 })
  }
}
