import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { randomBytes } from "crypto"

function cuid() { return randomBytes(12).toString("base64url") }

const FREE_CL_LIMIT = 3

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
    const count = await prisma.coverLetter.count({ where: { userId: session.user.id } })
    if (count >= FREE_CL_LIMIT) {
      return NextResponse.json({ error: "Free limit reached", limit: FREE_CL_LIMIT }, { status: 402 })
    }
  }

  const body = await req.json()
  const { title, company, role, content, resumeId } = body

  const coverLetter = await prisma.coverLetter.create({
    data: {
      id: cuid(),
      userId: session.user.id,
      title: title ?? "Untitled Cover Letter",
      company: company ?? "",
      role: role ?? "",
      content: content ?? "",
      resumeId: resumeId ?? null,
    },
  })

  return NextResponse.json({ coverLetter })
}
