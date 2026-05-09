import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { randomBytes } from "crypto"

function cuid() { return randomBytes(12).toString("base64url") }

const FREE_RESUME_LIMIT = 1

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { plan: true, role: true, trialEndsAt: true },
  })

  const isAdmin = user?.role === "admin"
  const isPro = user?.plan === "pro"
  const isTrial = user?.plan === "trial"
  const trialExpired = isTrial && user?.trialEndsAt && new Date(user.trialEndsAt) < new Date()
  const hasFullAccess = isAdmin || isPro || (isTrial && !trialExpired)

  if (!hasFullAccess) {
    const count = await prisma.resume.count({ where: { userId: session.user.id } })
    if (count >= FREE_RESUME_LIMIT) {
      return NextResponse.json({ error: "Free limit reached", limit: FREE_RESUME_LIMIT }, { status: 402 })
    }
  }

  const body = await req.json()
  const { name, role, content, style, template } = body

  const resume = await prisma.resume.create({
    data: {
      id: cuid(),
      userId: session.user.id,
      name: name ?? "Untitled Resume",
      role: role ?? "",
      content: content ?? {},
      style: style ?? null,
      template: template ?? "nova",
    },
  })

  return NextResponse.json({ resume })
}
