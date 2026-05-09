import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { randomBytes } from "crypto"

function cuid() { return randomBytes(12).toString("base64url") }

type Params = { params: Promise<{ id: string }> }

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const existing = await prisma.coverLetter.findFirst({ where: { id, userId: session.user.id }, select: { id: true } })
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 })

  await prisma.coverLetter.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}

export async function POST(req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  if (body.action !== "duplicate") return NextResponse.json({ error: "Unknown action" }, { status: 400 })

  const source = await prisma.coverLetter.findFirst({ where: { id, userId: session.user.id } })
  if (!source) return NextResponse.json({ error: "Not found" }, { status: 404 })

  const copy = await prisma.coverLetter.create({
    data: {
      id: cuid(),
      userId: session.user.id,
      title: `${source.title} (copy)`,
      company: source.company,
      role: source.role,
      content: source.content,
      resumeId: source.resumeId ?? null,
    },
  })

  return NextResponse.json({ coverLetter: copy })
}
