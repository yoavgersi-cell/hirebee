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

    const users = await prisma.user.findMany({
      select: {
        id: true, email: true, name: true, image: true,
        plan: true, role: true, analysisCount: true, createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: 200,
    })

    return Response.json(users)
  } catch (err: any) {
    if (err.message === "Forbidden") return Response.json({ error: "Forbidden" }, { status: 403 })
    console.error("[admin/users]", err)
    return Response.json({ error: "Failed" }, { status: 500 })
  }
}
