import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const [resumes, coverLetters] = await Promise.all([
    prisma.resume.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: "desc" },
      select: { id: true, name: true, role: true, template: true, createdAt: true, updatedAt: true },
    }),
    prisma.coverLetter.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: "desc" },
      select: { id: true, title: true, company: true, role: true, resumeId: true, createdAt: true, updatedAt: true },
    }),
  ])

  return NextResponse.json({ resumes, coverLetters })
}
