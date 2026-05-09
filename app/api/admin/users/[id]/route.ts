import { NextRequest } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

// Always verify admin from DB — never trust session alone for write operations
async function assertAdmin(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { role: true } })
  if (user?.role !== "admin") throw new Error("Forbidden")
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 })
    await assertAdmin(session.user.id)

    const { id } = await params
    const body = await req.json()
    const allowed = ["plan", "role"] as const
    const data: Record<string, string> = {}

    for (const key of allowed) {
      if (key in body) {
        if (key === "plan" && !["free", "trial", "pro"].includes(body[key])) {
          return Response.json({ error: "Invalid plan value" }, { status: 400 })
        }
        if (key === "role" && !["user", "admin"].includes(body[key])) {
          return Response.json({ error: "Invalid role value" }, { status: 400 })
        }
        data[key] = body[key]
      }
    }

    if (Object.keys(data).length === 0) {
      return Response.json({ error: "Nothing to update" }, { status: 400 })
    }

    const updated = await prisma.user.update({
      where:  { id },
      data,
      select: { id: true, email: true, plan: true, role: true },
    })

    console.log(`[admin] ${session.user.email} updated user ${id}:`, data)
    return Response.json({ user: updated })
  } catch (err: any) {
    if (err.message === "Forbidden") return Response.json({ error: "Forbidden" }, { status: 403 })
    console.error("[admin/users PATCH]", err)
    return Response.json({ error: "Update failed" }, { status: 500 })
  }
}
